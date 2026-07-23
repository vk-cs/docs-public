# {heading(Поддержка GitOps: маркировка объектов автоматизации и ограничение ручных изменений с помощью Argo CD и Gatekeeper)[id=k8s-ag]}

{note:info}
Argo CD доступен только для кластеров {linkto(/ru/kubernetes/k8s/concepts/cluster-generations#k8s-cluster-generations)[text=второго поколения]}.
{/note}

## {heading(Подготовительные шаги)[id=k8s-ag-prepare]}

1. {linkto(../../instructions/create-cluster/create-webui-gen-2#k8s-create-webui-gen-2)[text=Создайте]} кластер актуальной версии, если это еще не сделано.
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Установите и настройте]} `kubectl`, если это еще не сделано.
1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=Подключитесь]} к кластеру при помощи `kubectl`.
1. [Установите](/ru/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-argo-cd#k8s-install-advanced-argo-cd) аддон Argo CD, если это еще не сделано.
   
   [Сервисные учетные записи](/ru/access/iam/concepts/service-accounts#iam-concepts-service-accounts) по умолчанию: `argocd-application-controller` и `argocd-server`.

## {heading({counter(ag)}. Установите Gatekeeper (Helm))[id=k8s-ag-gatekeeper]}

1. Выполните команды: 

   ```bash
   helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts
   helm repo update
   helm install gatekeeper/gatekeeper --name-template=gatekeeper \
     --namespace opa-gatekeeper --create-namespace
   ```

   {note:info}
   Если Argo CD или Gatekeeper установлены в другие пространства имен, в командах используйте их.
   {/note}
 
1. Убедитесь, что поды работают:

   ```bash
   kubectl -n opa-gatekeeper get pods
   # gatekeeper-audit-... и gatekeeper-controller-manager-... в статусе Running
   ```

   У чарта есть хук `gatekeeper-update-namespace-label` (навешивает на пространство имен [метку](/ru/kubernetes/k8s/reference/labels-and-taints#k8s-labels-and-taints) (label) исключения). На платформе VK Cloud этот `job` часто завершается ошибкой (`BackoffLimitExceeded`), и `helm install` завершается статусом `INSTALLATION FAILED`. Само ядро Gatekeeper при этом устанавливается и работает (CRD, вебхук и поды создаются). Проверьте это, используя команды:
   
   ```console
   kubectl -n opa-gatekeeper get pods
   kubectl get crd | grep gatekeeper
   ```
   
   Пространство имен `opa-gatekeeper` исключается в `match.excludedNamespaces`, так что отсутствие метки не мешает.


## {heading({counter(ag)}. Ознакомьтесь с архитектурой решения)[id=k8s-ag-arch]}

```text
Git (source of truth)
   │  манифесты
   ▼
Argo CD (SA argocd-application-controller)
   │  apply + маркер трекинга (annotation argocd.argoproj.io/tracking-id)
   ▼
Объекты в кластере  ──►  помечены как "managed by GitOps"
   ▲
   │  UPDATE / DELETE
Пользователь (kubectl edit/delete)
   │
   ▼
Gatekeeper (admission) ──► DENY, если инициатор ≠ Argo CD и объект помечен
```

## {heading({counter(ag)}. Включите явную маркировку объектов в Argo CD)[id=k8s-ag-mark]}

По умолчанию Argo CD отслеживает объекты по метке `app.kubernetes.io/instance`, которая часто используется и другими инструментами и обрезается по длине. Для однозначного маркера включите annotation‑трекинг — тогда на каждый управляемый объект ставится аннотация:

```text
argocd.argoproj.io/tracking-id: <app>:<group>/<kind>:<namespace>/<name>
```

Для этого:

1. Задайте метод трекинга в конфигурации Argo CD. В аддоне это делается через [код настройки аддона](/ru/kubernetes/k8s/instructions/addons/manage-addons#k8s-manage-addons-edit-code) в поле `configs.cm`:

   ```yaml
   configs:
     cm:
       # annotation — только аннотация; annotation+label — аннотация и label (совместимость с UI-фильтрами)
       application.resourceTrackingMethod: annotation
   ```

1. Отредактируйте код аддона или примените изменение в ConfigMap и перезапустите контроллер:

   ```bash
   kubectl -n argocd patch configmap argocd-cm --type merge \
     -p '{"data":{"application.resourceTrackingMethod":"annotation"}}'

   kubectl -n argocd rollout restart deployment/argocd-applicationset-controller statefulset/argocd-application-controller 2>/dev/null || \
   kubectl -n argocd rollout restart statefulset/argocd-application-controller
   ```

   Изменение метода трекинга через личный кабинет предпочтительнее, так как оно устойчиво к переустановке или обновлению аддона.

## {heading({counter(ag)}. Проверьте маркировку)[id=k8s-ag-mark-check]}

1. Разверните тестовое приложение из Git через Argo CD `Application` (пример — публичный demo‑репозиторий). Для этого создайте манифест `app-guestbook.yaml`:

   ```yaml
   # app-guestbook.yaml
   apiVersion: argoproj.io/v1alpha1
   kind: Application
   metadata:
     name: guestbook
     namespace: argocd
   spec:
     project: default
     source:
       repoURL: https://github.com/argoproj/argocd-example-apps.git
       targetRevision: HEAD
       path: guestbook
     destination:
       server: https://kubernetes.default.svc
       namespace: gitops-demo
     syncPolicy:
       automated:
         prune: true
         selfHeal: true
       syncOptions:
         - CreateNamespace=true
   ```

1. Примените манифест: 

   ```bash
   kubectl apply -f app-guestbook.yaml
   # дождитесь синхронизации, затем убедитесь, что объект помечен маркером:
   kubectl -n gitops-demo get deploy guestbook-ui \
     -o jsonpath='{.metadata.annotations.argocd\.argoproj\.io/tracking-id}{"\n"}'
   ```

   В выводе команды должна быть строка вида `guestbook:apps/Deployment:gitops-demo/guestbook-ui`. Это и есть явный признак объекта, созданного автоматизацией.

## {heading({counter(ag)}. Разрешите Gatekeeper перехватывать операции DELETE)[id=k8s-ag-allow]}

Валидационный вебхук Gatekeeper по умолчанию проверяет только `CREATE` и `UPDATE`. Чтобы запретить еще и ручное удаление GitOps‑объектов, добавьте операцию `DELETE` в конфигурацию вебхука. Для этого:

1. Посмотрите текущие операции:

   ```bash
   kubectl get validatingwebhookconfiguration gatekeeper-validating-webhook-configuration \
     -o jsonpath='{range .webhooks[*]}{.name}{" -> "}{.rules[*].operations}{"\n"}{end}'
   ```

1. Добавьте `DELETE` в правило основного вебхука `validation.gatekeeper.sh`:

   ```bash
   kubectl patch validatingwebhookconfiguration gatekeeper-validating-webhook-configuration \
     --type=json \
     -p='[{"op":"add","path":"/webhooks/0/rules/0/operations/-","value":"DELETE"}]'
   ```

Индекс `/webhooks/0` соответствует вебхуку `validation.gatekeeper.sh`. Сверьтесь с выводом команды из предыдущего подраздела, и если порядок иной, поправьте индекс. Второй вебхук (`check-ignore-label.gatekeeper.sh`) трогать не нужно.

На операции `DELETE` проверяемый объект приходит в `oldObject` (а `object` пуст) — это учтено в `Rego` ниже.

{note:info} 
При слишком широкой области действия проверка `DELETE`/`UPDATE` по всем ресурсам может нагружать `admission`. Ниже область ограничена пространством имен и (опционально) конкретными типами.
{/note}

## {heading({counter(ag)}. Исключите системные пространства имен)[id=k8s-ag-exclude]}

Чтобы политика не мешала работе платформенных контроллеров и самих аддонов, исключите служебные пространства имен. Их можно задать и глобально в объекте `Config` Gatekeeper, и в самом ограничении `match.excludedNamespaces`. Список для исключения (скорректируйте под свой кластер): 

- `kube-system`; 
- `kube-public`; 
- `kube-node-lease`;
- `opa-gatekeeper`;
- `argocd`;
- `monitoring` или `prometheus-monitoring`;
- `ingress-nginx`.

## {heading({counter(ag)}. Создайте правило запрета ручных изменений)[id=k8s-ag-template]}

Шаблон правила запрета ручных изменений (ConstraintTemplate) описывает следующую логику: если объект помечен маркером Argo CD и операция — `UPDATE`/`DELETE`, а инициатор не входит в `allowlist` — изменение запрещено.

Имена status-объектов должны быть короткими в соответствии с правилами Gatekeeper:

- `metadata.name` шаблона должен иметь значение `kind` в нижнем регистре, иначе будет ошибка `name is not equal to the lowercase of CRD's Kind`. Поэтому для `kind: GitOps` это `name: gitops`.

- Gatekeeper формирует имена служебных status‑объектов как `<имя-пода-с-удвоенными-дефисами>-<template>[-<constraint>]`. На платформе VK Cloud имена подов Gatekeeper длинные, например, `gatekeeper-controller-manager-<rs>-<id>`, и при длинных значениях `kind` и именах итог превышает лимит 63 символа. Из-за этого status‑объект отклоняется самим Gatekeeper с ошибкой `resource cannot have metadata.name larger than 63 char`, ограничение не загружается на webhook‑поды, а при `failurePolicy: Ignore` (значение по умолчанию) `admission` молча пропускает запросы, и политика не cрабатывает без явной ошибки. Поэтому имена `kind`/`Constraint` должны быть короткими (`GitOps`, `gp` и так далее).

1. Создайте манифест `ct-gitops-protected.yaml`:

   ```yaml
   # ct-gitops-protected.yaml
   apiVersion: templates.gatekeeper.sh/v1
   kind: ConstraintTemplate
   metadata:
     name: gitops               # ОБЯЗАТЕЛЬНО == lowercase(kind)
     annotations:
       metadata.gatekeeper.sh/title: "GitOps Protected Objects"
       description: >-
         Запрещает ручные изменения и удаление объектов, помеченных
         маркером трекинга Argo CD. Изменения возможны только через Git (Argo CD).
   spec:
     crd:
       spec:
         names:
           kind: GitOps         # короткое значение kind
         validation:
           openAPIV3Schema:
             type: object
             properties:
               trackingAnnotation:
                 type: string
                 description: "Аннотация-маркер управляемого объекта."
               allowServiceAccounts:
                 type: boolean
                 description: "Разрешать изменения любым ServiceAccount (контроллерам)."
               allowedUsers:
                 type: array
                 items:
                   type: string
                 description: "Точный список разрешенных пользователей/СУЗ (аварийный доступ, Argo CD)."
               allowedGroups:
                 type: array
                 items:
                   type: string
                 description: "Разрешенные группы (например, аварийная админ-группа)."
     targets:
       - target: admission.k8s.gatekeeper.sh
         rego: |
           package gitops

           # Ключ-маркер (по умолчанию — аннотация трекинга Argo CD)
           tracking_key = k { k := input.parameters.trackingAnnotation }
           tracking_key = "argocd.argoproj.io/tracking-id" {
             not input.parameters.trackingAnnotation
           }

           # Аннотации объекта: на DELETE берем oldObject, иначе object
           annotations[key] = value {
             input.review.operation != "DELETE"
             value := input.review.object.metadata.annotations[key]
           }
           annotations[key] = value {
             input.review.operation == "DELETE"
             value := input.review.oldObject.metadata.annotations[key]
           }

           # Имя объекта для сообщения
           obj_name = n { input.review.operation != "DELETE"; n := input.review.object.metadata.name }
           obj_name = n { input.review.operation == "DELETE"; n := input.review.oldObject.metadata.name }

           is_protected { annotations[tracking_key] }

           is_write_op { input.review.operation == "UPDATE" }
           is_write_op { input.review.operation == "DELETE" }

           username := input.review.userInfo.username

           # Разрешения (allowlist)
           is_allowed { username == input.parameters.allowedUsers[_] }
           is_allowed {
             input.parameters.allowServiceAccounts == true
             startswith(username, "system:serviceaccount:")
           }
           is_allowed { input.review.userInfo.groups[_] == input.parameters.allowedGroups[_] }

           violation[{"msg": msg}] {
             is_write_op
             is_protected
             not is_allowed
             msg := sprintf(
               "Объект '%v' управляется GitOps (Argo CD, маркер %v). Операция '%v' от пользователя '%v' запрещена: вносите изменения через Git-репозиторий.",
               [obj_name, tracking_key, input.review.operation, username]
             )
           }
   ```

1. Примените манифест:

   ```bash
   kubectl apply -f ct-gitops-protected.yaml
   # дождитесь, пока шаблон скомпилируется и CRD ограничения станет Established:
   kubectl get constrainttemplate gitops -o jsonpath='{.status.created}{"\n"}'
   kubectl get crd gitops.constraints.gatekeeper.sh \
     -o jsonpath='{.status.conditions[?(@.type=="Established")].status}{"\n"}'
   ```

С помощью параметра `allowServiceAccounts: true` политика блокирует ручные действия пользователей (например: `kubectl edit` или `kubectl delete`), но не мешает контроллерам (HPA меняет реплики, оператор — свои CR и так далее) и самому Argo CD.  Если нужен более строгий режим, установите `allowServiceAccounts: false` и перечислите разрешенные [сервисные учетные записи](/ru/access/iam/concepts/service-accounts#iam-concepts-service-accounts) в `allowedUsers` (как минимум Argo CD).

## {heading({counter(ag)}. Создайте область действия (Constraint) и allowlist)[id=k8s-ag-constraint]}

Начните с «мягкого» режима `enforcementAction: dryrun`, чтобы увидеть срабатывания без блокировок, а затем переключите на режим `deny`.

1. Создайте манифест `constraint-gitops-protected.yaml`:

   ```yaml
   # constraint-gitops-protected.yaml
   apiVersion: constraints.gatekeeper.sh/v1beta1
   kind: GitOps
   metadata:
     name: gp                    # короткое имя
   spec:
     enforcementAction: dryrun   # этапы внедрения: dryrun -> warn -> deny
     match:
       # ограничьте типами верхнего уровня, которыми управляет Argo CD
       kinds:
         - apiGroups: ["apps"]
           kinds: ["Deployment", "StatefulSet", "DaemonSet"]
         - apiGroups: [""]
           kinds: ["Service", "ConfigMap", "Secret", "ServiceAccount"]
         - apiGroups: ["networking.k8s.io"]
           kinds: ["Ingress"]
       excludedNamespaces:
         - kube-system
         - kube-public
         - kube-node-lease
         - opa-gatekeeper
         - argocd
         - monitoring
         - prometheus-monitoring
         - ingress-nginx
     parameters:
       trackingAnnotation: "argocd.argoproj.io/tracking-id"
       allowServiceAccounts: true
       allowedUsers:
         # SA Argo CD (создает/меняет/удаляет объекты при sync и prune)
         - "system:serviceaccount:argocd:argocd-application-controller"
         - "system:serviceaccount:argocd:argocd-server"
       allowedGroups:
         # опционально: аварийная (break-glass) группа администраторов
         # - "gitops-break-glass"
         []
   ```

1. Примените манифест: 

   ```bash
   kubectl apply -f constraint-gitops-protected.yaml
   ```

   Если появится ошибка `missing ConstraintTemplate: template "gitops" not found`, это значит, что Gatekeeper еще не зарегистрировал новый вид ограничения. Дождитесь, пока CRD `gitops.constraints.gatekeeper.sh` получит статус `Established`, и повторно примените манифест.

1. Проверьте, что ограничение загрузилось на все поды, иначе при `failurePolicy: Ignore` защита не работает на части webhook‑подов:

   ```bash
   kubectl get gitops gp -o jsonpath='{range .status.byPod[*]}{.id}{"="}{.enforced}{"\n"}{end}'
   # у всех подов gatekeeper-controller-manager-* и gatekeeper-audit-* должно быть =true
   ```

   Если у какого-то пода строки нет, или значение параметра `enforced` не `true`, почти всегда это [превышение лимита в 63 символа](#k8s-ag-template) в имени status‑объекта. В таком случае сократите значение параметра `kind` и имени ограничения. Чтобы проверите наличие status‑объектов, выполните команду:

   ```console
   kubectl get constraintpodstatuses -n opa-gatekeeper | grep gitops
   ```
1. Проверьте имя сервисной учетной записи Argo CD в вашем кластере — `argocd-application-controller`, `argocd-server` в пространстве имен `argocd`:

   ```bash
   kubectl -n argocd get sa | grep -E 'application-controller|argocd-server'
   ```

1.  Исправьте `allowedUsers`, если нужно. Точный `username` в запросе имеет вид `system:serviceaccount:<namespace>:<sa>`.

## {heading({counter(ag)}. (Опционально) Защитите маркер от снятия)[id=k8s-ag-protect]}

Чтобы нельзя было отвязать объект от GitOps, удалив аннотацию‑маркер, и затем свободно его править, добавьте правило, которое будет запрещать `UPDATE`. Имена так же должны быть короткими (`kind: GitMark`, `name: gitmark`).

1. Создайте манифест `ct-gitops-marker-protect.yaml`:

   ```yaml
   # ct-gitops-marker-protect.yaml
   apiVersion: templates.gatekeeper.sh/v1
   kind: ConstraintTemplate
   metadata:
     name: gitmark               # == lowercase(kind)
   spec:
     crd:
       spec:
         names:
           kind: GitMark
         validation:
           openAPIV3Schema:
             type: object
             properties:
               trackingAnnotation: { type: string }
               allowedUsers: { type: array, items: { type: string } }
     targets:
       - target: admission.k8s.gatekeeper.sh
         rego: |
           package gitmark

           tracking_key = k { k := input.parameters.trackingAnnotation }
           tracking_key = "argocd.argoproj.io/tracking-id" { not input.parameters.trackingAnnotation }

           username := input.review.userInfo.username
           is_allowed { username == input.parameters.allowedUsers[_] }
           is_allowed { startswith(username, "system:serviceaccount:") }

           violation[{"msg": msg}] {
             input.review.operation == "UPDATE"
             input.review.oldObject.metadata.annotations[tracking_key]      # маркер БЫЛ
             not input.review.object.metadata.annotations[tracking_key]     # маркера НЕТ
             not is_allowed
             msg := sprintf("Нельзя удалять GitOps-маркер '%v' с объекта '%v'.", [tracking_key, input.review.object.metadata.name])
           }
   ```
1. Создайте манифест `constraint-gitops-marker-protect.yaml`:

   ```yaml
   # constraint-gitops-marker-protect.yaml
   apiVersion: constraints.gatekeeper.sh/v1beta1
   kind: GitMark
   metadata:
     name: gm
   spec:
     enforcementAction: deny
     match:
       excludedNamespaces: ["kube-system","kube-public","kube-node-lease","opa-gatekeeper","argocd","monitoring","prometheus-monitoring","ingress-nginx"]
     parameters:
       trackingAnnotation: "argocd.argoproj.io/tracking-id"
       allowedUsers: []
   ```

1. Примение манифесты:

   ```bash
   kubectl apply -f ct-gitops-marker-protect.yaml -f constraint-gitops-marker-protect.yaml
   ```

## {heading({counter(ag)}. Проверьте политику)[id=k8s-ag-protect]}

Убедитесь, что:

1. Ограничение загружено и запущено на всех подах:

   ```bash
   kubectl get constrainttemplate
   kubectl get gitops gp -o jsonpath='{range .status.byPod[*]}{.id}{"="}{.enforced}{"\n"}{end}'
   ```

1. Ручное изменение GitOps‑объекта отклоняется (в режиме `deny`):

   ```bash
   kubectl -n gitops-demo annotate deploy guestbook-ui demo.test/manual=1 --overwrite
   # Error from server (Forbidden): admission webhook "validation.gatekeeper.sh" denied the request:
   # [gp] Объект 'guestbook-ui' управляется GitOps (Argo CD, маркер argocd.argoproj.io/tracking-id).
   # Операция 'UPDATE' от '<ваш-пользователь>' запрещена: вносите изменения через Git.
   ```

1. Ручное удаление отклоняется:

   ```bash
   kubectl -n gitops-demo delete deploy guestbook-ui
    # Error from server (Forbidden): ... Операция 'DELETE' ... запрещена ...
   ```

1. Argo CD продолжает управлять объектом: `selfHeal` откатывает изменения, `sync`/`prune` проходят, так как действия выполняет сервисная учетная запись `argocd-application-controller` из `allowlist`. Приложение остается в состоянии `Synced/Healthy`.

1. Немаркированный (созданный вручную) объект меняется свободно: команды `kubectl create deployment manual-nginx ...` с последующими `annotate`/`delete` проходят без запрета (так как нет маркера — нет защиты).

1. Изменение через субресурс `scale` не блокируется**: команда `kubectl scale deploy guestbook-ui --replicas=3` проходит. 

   Причина: запрос идет к субресурсу `deployments/scale`, в `admission` приходит объект `Scale` без аннотации‑маркера, поэтому правило его не отлавливает (и это же позволяет работать HPA). Дрейф реплик можно закрыть через Argo CD `selfHeal` (он вернет значение из Git) или запретом `scale` в Kubernetes RBAC.

1. В режиме `dryrun`/`warn` реальной блокировки нет — срабатывания смотрите в `audit`:

   ```bash
   kubectl -n opa-gatekeeper logs deploy/gatekeeper-audit --tail=100 | grep -i gitops
   kubectl get gitops gp -o yaml | sed -n '/status:/,$p'
   ```

## {heading({counter(ag)}. Последовательно внедрите режимы enforcementAction)[id=k8s-ag-stages]}

Параметр `enforcementAction` имеет следующие режимы:

- `dryrun` — только фиксирует нарушения в статусе/аудите, ничего не блокирует. Соберите список тех, которых нужно добавить в `allowlist`.
- `warn` — пользователь при `kubectl` видит предупреждение, но операция проходит.
- `deny` — операции блокируются.

Чтобы переключить режим, выполните команду:

```bash
kubectl patch gitops gp \
  --type merge -p '{"spec":{"enforcementAction":"deny"}}'
```

## {heading({counter(ag)}. Настройте дополнительную защиту на стороне Argo CD)[id=k8s-ag-additional]}

Продублируйте контроль средствами Argo CD, настроив:

- `syncPolicy.automated.selfHeal: true`: Argo CD автоматически откатывает любые расхождения с Git (если правка все же прошла).
- `prune: true`: удаляет объекты, убранные из Git (единый жизненный цикл).
- Argo CD RBAC (`configs.rbac`): ограничьте, кто может совершать операции `sync`, `override` и `delete` в самом Argo CD.
- [Управление доступом в Cloud Containers](/ru/kubernetes/k8s/concepts/iam-access#k8s-concepts-iam): в прикладных пространствах имен выдавайте пользователям роль `Аудитор Kubernetes`, а право на запись оставьте только автоматизации. Роли [назначаются](/ru/access/iam/instructions/access-manage#iam-access-manage-user-role-edit) через личный кабинет и связывания ролей в пределах пространства имен.

Так, RBAC ограничивает круг лиц, Gatekeeper запрещает ручные манипуляции над помеченными объектами, а Argo CD восстанавливает состояние из Git.

## {heading({counter(ag)}. Проведите диагностику)[id=k8s-ag-diagnostics]}

[cols="1a,2a", options="header"]
|===
| Симптом 
| Причина/решение

| Политика не срабатывает и не выдает ошибку
| Ограничение не загрузилось на webhook‑поды из‑за лимита в 63 символа в имени status‑объекта. Сократите `kind` или имя ограничения

| `missing ConstraintTemplate: ... not found` при создании ограничения
| Дождитесь `Established` у CRD `gitops.constraints.gatekeeper.sh` и повторите `apply`

| `name is not equal to the lowercase of CRD's Kind`
| `metadata.name` шаблона не равен значению `kind` в нижнем регистре. Приведите в соответствие, например `GitOps` → `gitops`

| Политика не срабатывает на `UPDATE`
| Объект не помечен `argocd.argoproj.io/tracking-id` (см. [шаг 3](#k8s-ag-mark)), либо параметр `enforcementAction` не установлен в режим `deny`

| Не блокируется `DELETE`
| Не добавлена операция `DELETE` в webhook (см. [шаг 5](#k8s-ag-allow)). Проверьте `validatingwebhookconfiguration`

| Не блокируется `kubectl scale`
| Ожидаемо: субресурс `deployments/scale` без маркера. Используйте Argo CD `selfHeal` или RBAC

| Argo CD не может синхронизировать (`Forbidden`)
| В `allowedUsers` неверная сервисная учетная запись Argo CD; сверьте `kubectl -n argocd get sa` → `system:serviceaccount:argocd:...`

| Ломаются контроллеры (HPA и так далее)
| Установите `allowServiceAccounts: true` или добавьте их сервисные учетные записи в `allowlist`; исключите их пространства имен

| Ошибка компиляции шаблона
| `kubectl get constrainttemplate gitops -o yaml` → блок `status` с ошибкой Rego

| Нужен аварийный доступ
| Временно добавьте пользователя/группу в `allowedUsers`/`allowedGroups` или переведите ограничение в режим `dryrun`
|===

{note:info}
`failurePolicy: Ignore` у webhook `validation.gatekeeper.sh` — значение по умолчанию: если OPA недоступен или ограничение не загружено, admission‑запросы проходят (fail‑open). Для строгой безопасности можно переключить на `Fail`, но это повышает риск недоступности API при проблемах Gatekeeper.
{/note}

Полезные команды:

```bash
kubectl get constraints
kubectl get constraintpodstatuses -n opa-gatekeeper | grep gitops
kubectl -n opa-gatekeeper logs deploy/gatekeeper-controller-manager --tail=200
kubectl -n opa-gatekeeper logs deploy/gatekeeper-audit --tail=200
```

## {heading(Удалите неиспользуемые ресурсы)[id=k8s-ag-remove]}

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если ресурсы Kubernetes, созданные для прохождения этого практического руководства, вам больше не нужны, удалите их:

1. Выполните команды:

   ```bash
   kubectl delete gitops gp 2>/dev/null
   kubectl delete gitmark gm 2>/dev/null
   kubectl delete constrainttemplate gitops gitmark 2>/dev/null

   # при необходимости вернуть webhook к дефолтным операциям (убрать DELETE) —
   # отредактируйте validatingwebhookconfiguration gatekeeper-validating-webhook-configuration

1. Удалите тестовое приложение:

   ```console
   kubectl delete -f app-guestbook.yaml  
   ```

1. Удалите Gatekeeper:

   ```console
   helm delete gatekeeper --namespace opa-gatekeeper
   kubectl delete crd -l gatekeeper.sh/system=yes
   ```

{include(/ru/_includes/_delete-test-cluster-short.md)}