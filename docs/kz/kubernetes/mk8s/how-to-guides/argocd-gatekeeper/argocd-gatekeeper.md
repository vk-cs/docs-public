# {heading(GitOps қолдауы: автоматтандыру нысандарын белгілеу және қолмен өзгертулерді шектеу Argo CD және Gatekeeper көмегімен)[id=mk8s-ag]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(Дайындық қадамдар)[id=mk8s-ag-prepare]}

{include(/kz/_includes/_create-test-cluster.md)[tags=managed]}
1. `kubectl` орнатылмаған болса, {linkto(../../connect/kubectl#mk8s-kubectl)[text=орнатыңыз және баптаңыз]}.
1. `kubectl` көмегімен кластерге {linkto(../../connect/kubectl#mk8s-kubectl-check-connection)[text=қосылыңыз]}.
1. Орнатылмаған болса, Argo CD аддонын {linkto(../../instructions/addons/advanced-installation/install-advanced-argo-cd#mk8s-install-advanced-argo-cd)[text=орнатыңыз]}.

   Әдепкі бойынша {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервистік тіркелгілер]}: `argocd-application-controller` және `argocd-server`.

## {heading({counter(ag)}. Gatekeeper орнату (Helm))[id=mk8s-ag-gatekeeper]}

1. Командаларды орындаңыз: 

   ```bash
   helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts
   helm repo update
   helm install gatekeeper/gatekeeper --name-template=gatekeeper \
     --namespace opa-gatekeeper --create-namespace
   ```

   {note:info}
   Егер Argo CD немесе Gatekeeper басқа аттар кеңістіктеріне орнатылған болса, командаларда оларды қолданыңыз.
   {/note}

1. Подтар жұмыс істеп тұрғанын тексеріңіз:

   ```bash
   kubectl -n opa-gatekeeper get pods

   # gatekeeper-audit-... және gatekeeper-controller-manager-... Running күйінде
   ```

   Чартта `gatekeeper-update-namespace-label` хугі бар (аттар кеңістігіне {linkto(../../reference/labels-and-taints#mk8s-labels-and-taints)[text=мөтақтау]} (label) іліп қояды). VK Cloud платформасында бұл `job` жиі қатеге ұшырайды (`BackoffLimitExceeded`), ал `helm install` `INSTALLATION FAILED` күйімен аяқталады. Сонымен бірге Gatekeeper өзегі орнатылып, жұмыс істейді (CRD, вебхук және подтар жасалады). Мұны келесі командалармен тексеріңіз:

   ```console
   kubectl -n opa-gatekeeper get pods
   kubectl get crd | grep gatekeeper
   ```

   `opa-gatekeeper` аттар кеңістігі `match.excludedNamespaces` ішінде ескерілмеген, сондықтан мөтақтаудың болмауы кедергі келтірмейді.

## {heading({counter(ag)}. Шешім архитектурасымен танысыңыз)[id=mk8s-ag-arch]}

```text
Git (source of truth)
   │  манифесттер
   ▼
Argo CD (SA argocd-application-controller)
   │  apply + трекинг маркері (annotation argocd.argoproj.io/tracking-id)
   ▼
Кластердегі нысандар  ──►  "managed by GitOps" деп белгіленген
   ▲
   │  UPDATE / DELETE
Пайдаланушы (kubectl edit/delete)
   │
   ▼
Gatekeeper (admission) ──► инициатор ≠ Argo CD болып, нысан белгіленген болса — DENY
```

## {heading({counter(ag)}. Argo CD-де нысандарды ашық белгілеуді қосыңыз)[id=mk8s-ag-mark]}

Әдепкі бойынша Argo CD нысандарды `app.kubernetes.io/instance` мөтақтауы бойынша бақылайды, ол жиі басқа құралдармен де қолданылады және ұзындығы бойынша қиылып қалады. Бірегей маркер алу үшін annotation‑трекингті қосыңыз — содан кейін әр басқарылатын нысанға аннотация қойылады:

```text
argocd.argoproj.io/tracking-id: <app>:<group>/<kind>:<namespace>/<name>
```

Мұны істеу үшін:

1. Argo CD конфигурациясында трекинг әдісін орнатыңыз. Аддонда бұл `configs.cm` өрісіндегі {linkto(../../instructions/addons/manage-addons#mk8s-manage-addons-edit-code)[text=аддон баптау коды]} арқылы жасалады:

   ```yaml
   configs:
     cm:

       # annotation — тек аннотация; annotation+label — аннотация және label (UI-фильтрлермен үйлесімділік)
       application.resourceTrackingMethod: annotation
   ```

1. Аддон кодын өзгертіңіз немесе ConfigMap-те өзгерісті қолданып, контроллерді қайта іске қосыңыз:

   ```bash
   kubectl -n argocd patch configmap argocd-cm --type merge \
     -p '{"data":{"application.resourceTrackingMethod":"annotation"}}'

   kubectl -n argocd rollout restart deployment/argocd-applicationset-controller statefulset/argocd-application-controller 2>/dev/null || \
   kubectl -n argocd rollout restart statefulset/argocd-application-controller
   ```

   Трекинг әдісін жеке кабинет арқылы өзгерту қалаулы, өйткені бұл аддонды қайта орнатуға немесе жаңартуға төзімді.

## {heading({counter(ag)}. Белгілеуді тексеріңіз)[id=mk8s-ag-mark-check]}

1. Git-тен Argo CD `Application` арқылы тесттік қосымшаны орнатыңыз (мысал — ашық demo‑репозиторий). Ол үшін `app-guestbook.yaml` манифестін жасаңыз:

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

1. Манифестті қолданыңыз: 

   ```bash
   kubectl apply -f app-guestbook.yaml

   # синхрондалуын күтіңіз, содан кейін нысанның маркермен белгіленгенін тексеріңіз:
   kubectl -n gitops-demo get deploy guestbook-ui \
     -o jsonpath='{.metadata.annotations.argocd\.argoproj\.io/tracking-id}{"\n"}'
   ```

   Команда шығарындысында `guestbook:apps/Deployment:gitops-demo/guestbook-ui` түріндегі жол болуы тиіс. Бұл — автоматтандырумен жасалған нысанның айқын белгісі.

## {heading({counter(ag)}. Gatekeeper-ге DELETE операцияларын қадағалауға рұқсат беріңіз)[id=mk8s-ag-allow]}

Gatekeeper валидациялық вебхугы әдепкі бойынша тек `CREATE` және `UPDATE` әрекеттерін тексереді. GitOps‑нысандарын қолмен өшіруді де тыйу үшін вебхук конфигурациясына `DELETE` операциясын қосыңыз. Мұны істеу үшін:

1. Ағымдағы операцияларды қарап шығыңыз:

   ```bash
   kubectl get validatingwebhookconfiguration gatekeeper-validating-webhook-configuration \
     -o jsonpath='{range .webhooks[*]}{.name}{" -> "}{.rules[*].operations}{"\n"}{end}'
   ```

1. `validation.gatekeeper.sh` негізгі вебхугының ережесіне `DELETE` операциясын қосыңыз:

   ```bash
   kubectl patch validatingwebhookconfiguration gatekeeper-validating-webhook-configuration \
     --type=json \
     -p='[{"op":"add","path":"/webhooks/0/rules/0/operations/-","value":"DELETE"}]'
   ```

`/webhooks/0` индексі `validation.gatekeeper.sh` вебхугына сәйкес келеді. Алдыңғы бөлімшедегі команда шығарындысымен салыстырыңыз және рет басқаша болса, индексті түзетіңіз. Екінші вебхукқа (`check-ignore-label.gatekeeper.sh`) тиісу қажет емес.

`DELETE` операциясында тексерілген нысан `oldObject` арқылы келеді (ал `object` бос) — бұл төмендегі `Rego`-да ескерілген.

{note:info} 
Тексеру аумағы тым кең болса, барлық ресурстар бойынша `DELETE`/`UPDATE` тексеруі `admission`-ді жүктеп жіберуге мүмкін. Төменде аумақ аттар кеңістігімен және (қалау бойынша) нақты түрлермен шектелген.
{/note}

## {heading({counter(ag)}. Жүйелік аттар кеңістіктерін ескеруден шығарыңыз)[id=mk8s-ag-exclude]}

Саясат платформалық контроллерлерге және өз аддондарға кедергі келтірмеуі үшін қызметтік аттар кеңістіктерін ескеруден шығарыңыз. Оларды Gatekeeper `Config` нысанында да, өзі `match.excludedNamespaces` шектеуінде де глобальді түрде көрсетуге болады. Ескеруден шығару тізімі (кластеріңізге бейімдеңіз): 

- `kube-system`; 
- `kube-public`; 
- `kube-node-lease`;
- `opa-gatekeeper`;
- `argocd`;
- `monitoring` немесе `prometheus-monitoring`;
- `ingress-nginx`.

## {heading({counter(ag)}. Қолмен өзгертулерге тыйым салу ережесін жасаңыз)[id=mk8s-ag-template]}

Қолмен өзгертулерге тыйым салу ережесінің үлгісі (ConstraintTemplate) мынадай логиканы сипаттайды: егер нысан Argo CD маркерімен белгіленген және операция — `UPDATE`/`DELETE` болса, ал инициатор `allowlist`-ке кірмесе — өзгертуге тыйым салынады.

Status‑нысандардың атаулары Gatekeeper ережелеріне сәйкес қысқа болуы тиіс:

- Үлгінің `metadata.name` өрісінің мәні `kind` мәнінің кіші әріптермен жазылуы болуы тиіс, әйтпесе `name is not equal to the lowercase of CRD's Kind` қатесі пайда болады. Сондықтан `kind: GitOps` үшін бұл — `name: gitops`.

- Gatekeeper қызметтік status‑нысандардың атауларын `<имя-пода-с-удвоенными-дефисами>-<template>[-<constraint>]` түрінде құрастырады. VK Cloud платформасында Gatekeeper подтарының атаулары ұзын, мысалы, `gatekeeper-controller-manager-<rs>-<id>`, және `kind` мәндері мен атаулары ұзын болғанда қорытынды 63 таңба шегінен асып кетеді. Осыған байланысты status‑нысанды өзі Gatekeeper `resource cannot have metadata.name larger than 63 char` қатесімен қабылдамайды, шектеу webhook‑подтарға жүктелмейді, ал `failurePolicy: Ignore` кезінде (әдепкі мән) `admission` сұрауларды үнсіз өткізіп жібереді және саясат айқын қатесіз іске қоспайды. Сондықтан `kind`/`Constraint` атаулары қысқа болуы тиіс (`GitOps`, `gp` және т.б.).

1. `ct-gitops-protected.yaml` манифестін жасаңыз:

   ```yaml
   # ct-gitops-protected.yaml
   apiVersion: templates.gatekeeper.sh/v1
   kind: ConstraintTemplate
   metadata:
     name: gitops               # МІНДЕТТІ == lowercase(kind)
     annotations:
       metadata.gatekeeper.sh/title: "GitOps Protected Objects"
       description: >-
         Argo CD трекинг маркерімен белгіленген нысандарды қолмен өзгерту мен өшіруге
         тыйым салады. Өзгертулер тек Git (Argo CD) арқылы мүмкін.
   spec:
     crd:
       spec:
         names:
           kind: GitOps         # kind мәні қысқа
         validation:
           openAPIV3Schema:
             type: object
             properties:
               trackingAnnotation:
                 type: string
                 description: "Басқарылатын нысанның аннотация-маркері."
               allowServiceAccounts:
                 type: boolean
                 description: "Кез келген ServiceAccount-қа (контроллерлерге) өзгертулерге рұқсат беру."
               allowedUsers:
                 type: array
                 items:
                   type: string
                 description: "Рұқсат етілген пайдаланушылардың/СУЗ-дің нақты тізімі (апаттық қолжетім, Argo CD)."
               allowedGroups:
                 type: array
                 items:
                   type: string
                 description: "Рұқсат етілген топтар (мысалы, апаттық админ-топ)."
     targets:
       - target: admission.k8s.gatekeeper.sh
         rego: |
           package gitops

           # Маркер-кілт (әдепкі бойынша — Argo CD трекинг аннотациясы)
           tracking_key = k { k := input.parameters.trackingAnnotation }
           tracking_key = "argocd.argoproj.io/tracking-id" {
             not input.parameters.trackingAnnotation
           }

           # Нысанның аннотациялары: DELETE кезінде oldObject, әйтпесе object
           annotations[key] = value {
             input.review.operation != "DELETE"
             value := input.review.object.metadata.annotations[key]
           }
           annotations[key] = value {
             input.review.operation == "DELETE"
             value := input.review.oldObject.metadata.annotations[key]
           }

           # Хабарлама үшін нысанның атауы
           obj_name = n { input.review.operation != "DELETE"; n := input.review.object.metadata.name }
           obj_name = n { input.review.operation == "DELETE"; n := input.review.oldObject.metadata.name }

           is_protected { annotations[tracking_key] }

           is_write_op { input.review.operation == "UPDATE" }
           is_write_op { input.review.operation == "DELETE" }

           username := input.review.userInfo.username

           # Рұқсаттар (allowlist)
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
               "'%v' нысаны GitOps (Argo CD, маркер %v) арқылы басқарылады. '%v' операциясы '%v' пайдаланушысы үшін тыйым салынған: өзгертулерді Git-репозиторий арқылы енгізіңіз.",
               [obj_name, tracking_key, input.review.operation, username]
             )
           }
   ```

1. Манифестті қолданыңыз:

   ```bash
   kubectl apply -f ct-gitops-protected.yaml

   # үлгі компиляцияланып, шектеу CRD-сі Established күйіне келгенше күтіңіз:
   kubectl get constrainttemplate gitops -o jsonpath='{.status.created}{"\n"}'
   kubectl get crd gitops.constraints.gatekeeper.sh \
     -o jsonpath='{.status.conditions[?(@.type=="Established")].status}{"\n"}'
   ```

`allowServiceAccounts: true` параметрі арқылы саясат пайдаланушылардың қолмен әрекеттерін бөгейді (мысалы: `kubectl edit` немесе `kubectl delete`), бірақ контроллерге (HPA репликаларды өзгертеді, оператор — өз CR-лерін өзгертеді және т.б.) және өзі Argo CD-ге кедергі келтірмейді. Қатаңдау режим керек болса, `allowServiceAccounts: false` орнатыңыз және рұқсат етілген [сервистік тіркелгілерді](/kz/access/iam/concepts/service-accounts#iam-concepts-service-accounts) `allowedUsers` ішінде тізіп көрсетіңіз (ең болмағанда Argo CD).

## {heading({counter(ag)}. Әрекет аумағын (Constraint) және allowlist жасаңыз)[id=mk8s-ag-constraint]}

Бұғаттаусыз іске қосылуларды көру үшін «жұмсақ» `enforcementAction: dryrun` режимінен бастаңыз, содан кейін `deny` режиміне ауыстырыңыз.

1. `constraint-gitops-protected.yaml` манифестін жасаңыз:

   ```yaml
   # constraint-gitops-protected.yaml
   apiVersion: constraints.gatekeeper.sh/v1beta1
   kind: GitOps
   metadata:
     name: gp                    # қысқа атау
   spec:
     enforcementAction: dryrun   # енгізу кезеңдері: dryrun -> warn -> deny
     match:

       # Argo CD басқаратын жоғары деңгейлі түрлермен шектеңіз
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

         # Argo CD SA (sync және prune кезінде нысандарды жасайды/өзгертеді/өшіреді)
         - "system:serviceaccount:argocd:argocd-application-controller"
         - "system:serviceaccount:argocd:argocd-server"
       allowedGroups:

         # қалау бойынша: апаттық (break-glass) администраторлар тобы
         # - "gitops-break-glass"
         []
   ```

1. Манифестті қолданыңыз: 

   ```bash
   kubectl apply -f constraint-gitops-protected.yaml
   ```

   Егер `missing ConstraintTemplate: template "gitops" not found` қатесі пайда болса, бұл Gatekeeper-дің жаңа шектеу түрін әлі тіркемегенін білдіреді. `gitops.constraints.gatekeeper.sh` CRD-сі `Established` күйін алғанша күтіңіз және манифестті қайта қолданыңыз.

1. Шектеу барлық подтарға жүктелгенін тексеріңіз, әйтпесе `failurePolicy: Ignore` кезінде қорғаныс webhook‑подтардың бір бөлігінде жұмыс істемейді:

   ```bash
   kubectl get gitops gp -o jsonpath='{range .status.byPod[*]}{.id}{"="}{.enforced}{"\n"}{end}'

   # барлық gatekeeper-controller-manager-* және gatekeeper-audit-* подтарында =true болуы тиіс
   ```

   Егер қандай да бір подта жол болмаса немесе `enforced` параметрінің мәні `true` болмаса, бұл іс жүзінде әрқашан status‑нысан атауындағы [63 таңба шегінен асу](#mk8s-ag-template). Мұндай жағдайда `kind` мәні мен шектеу атауын қысқартыңыз. Status‑нысандардың болуын тексеру үшін команданы орындаңыз:

   ```console
   kubectl get constraintpodstatuses -n opa-gatekeeper | grep gitops
   ```
1. Кластеріңізде Argo CD сервистік тіркелгісінің атауын тексеріңіз — `argocd` аттар кеңістігіндегі `argocd-application-controller`, `argocd-server`:

   ```bash
   kubectl -n argocd get sa | grep -E 'application-controller|argocd-server'
   ```

1. Қажет болса, `allowedUsers` түзетіңіз. Сұраудағы нақты `username` мәні `system:serviceaccount:<namespace>:<sa>` түрінде болады.

## {heading({counter(ag)}. (Қалау бойынша) Маркерді алып тастаудан қорғаңыз)[id=mk8s-ag-protect]}

Нысанды GitOps-тен ажыратып, аннотация‑маркерді өшіріп, содан кейін оны еркін өзгертуге болмауы үшін `UPDATE` әрекетіне тыйым салатын ереже қосыңыз. Атаулар осында да қысқа болуы тиіс (`kind: GitMark`, `name: gitmark`).

1. `ct-gitops-marker-protect.yaml` манифестін жасаңыз:

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
             input.review.oldObject.metadata.annotations[tracking_key]      # маркер БОЛҒАН
             not input.review.object.metadata.annotations[tracking_key]     # маркер ЖОҚ
             not is_allowed
             msg := sprintf("'%v' нысанынан GitOps-маркервін ('%v') өшіруге болмайды.", [tracking_key, input.review.object.metadata.name])
           }
   ```
1. `constraint-gitops-marker-protect.yaml` манифестін жасаңыз:

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

1. Манифесттерді қолданыңыз:

   ```bash
   kubectl apply -f ct-gitops-marker-protect.yaml -f constraint-gitops-marker-protect.yaml
   ```

## {heading({counter(ag)}. Саясатты тексеріңіз)[id=mk8s-ag-protect]}

Мыналарды тексеріңіз:

1. Шектеу барлық подтарға жүктелген және іске қосылған:

   ```bash
   kubectl get constrainttemplate
   kubectl get gitops gp -o jsonpath='{range .status.byPod[*]}{.id}{"="}{.enforced}{"\n"}{end}'
   ```

1. GitOps‑нысанды қолмен өзгерту қабылданбайды (`deny` режимінде):

   ```bash
   kubectl -n gitops-demo annotate deploy guestbook-ui demo.test/manual=1 --overwrite

   # Error from server (Forbidden): admission webhook "validation.gatekeeper.sh" denied the request:
   # [gp] 'guestbook-ui' нысаны GitOps (Argo CD, argocd.argoproj.io/tracking-id маркері) арқылы басқарылады.
   # '<ваш-пользователь>' пайдаланушысының 'UPDATE' операциясына тыйым салынған: өзгертулерді Git арқылы енгізіңіз.
   ```

1. Қолмен өшіру қабылданбайды:

   ```bash
   kubectl -n gitops-demo delete deploy guestbook-ui

1. Argo CD объектіні басқаруды жалғастырады: `selfHeal` өзгерістерді қайтарады, `sync`/`prune` өтеді, себебі әрекеттерді `allowlist` ішінен `argocd-application-controller` сервистік жазба жасайды. Қосымша `Synced/Healthy` күйінде қалады.

1. Маркерсіз (қолмен жасалған) объект еркін өзгертіледі: `kubectl create deployment manual-nginx ...` командалары және одан кейінгі `annotate`/`delete` тыйымсыз өтеді (маркер жоқ — қорғаныс жоқ).

1. `scale` субресурсы арқылы өзгерту блокталмайды**: `kubectl scale deploy guestbook-ui --replicas=3` командасы өтеді.

   Себебі: сұрау `deployments/scale` субресурсына бағытталады, `admission`-ға маркер-аннотациясыз `Scale` объектісі келеді, сондықтан ереже оны ұстамайды (және осы HPA-ның жұмыс істеуіне мүмкіндік береді). Репликалар дрейфын Argo CD `selfHeal` арқылы (ол Git-тен мәнді қайтарады) немесе Kubernetes RBAC-та `scale`-ге тыйым салу арқылы жабуға болады.

1. `dryrun`/`warn` режимінде нақты блоктау жоқ — іске қосылуedі `audit`-те қараңыз:

   ```bash
   kubectl -n opa-gatekeeper logs deploy/gatekeeper-audit --tail=100 | grep -i gitops
   kubectl get gitops gp -o yaml | sed -n '/status:/,$p'
   ```
   ## {heading({counter(ag)}. enforcementAction режимдерін кезең-кезеңмен енгізіңіз)[id=mk8s-ag-stages]}

`enforcementAction` параметрінің келесі режимдері бар:

- `dryrun` — бұзушылықтарды тек статус/аудитте тіркейді, ештеңені блоктамайды. `allowlist`-ке қосу керектердің тізімін жинаңыз.
- `warn` — пайдаланушы `kubectl` арқылы ескерту көреді, бірақ операция өтеді.
- `deny` — операциялар блокталады.

Режимді ауыстыру үшін команданы орындаңыз:

```bash
kubectl patch gitops gp \
  --type merge -p '{"spec":{"enforcementAction":"deny"}}'
```

## {heading({counter(ag)}. Argo CD жағынан қосымша қорғаныс конфигурациялаңыз)[id=mk8s-ag-additional]}

Бақылауды Argo CD құралдарымен қайталап, мыналарды конфигурациялаңыз:

- `syncPolicy.automated.selfHeal: true`: Argo CD Git-пен кез келген сәйкессіздікті автоматты түрде қайтарады (есептеу өзгерісі өтіп кетсе).
- `prune: true`: Git-тен алынып тасталған объектілерді өшіреді (бірыңғай өмірлік цикл).
- Argo CD RBAC (`configs.rbac`): Argo CD-ның өзінде `sync`, `override` және `delete` операцияларын кім жасай алатынын шектеңіз.
- {linkto(../../concepts/iam-access#mk8s-concepts-iam)[text=Managed Containers-тағы рұқсаттарды басқару]}: қолданбалы namespace-терде пайдаланушыларға `Аудитор Kubernetes` рөлін беріңіз, жазу құқығын тек автоматтандыруға қалдырыңыз. Рөлдер [тағайындалады](/kz/access/iam/instructions/access-manage#iam-access-manage-user-role-edit) жеке кабинет арқылы және namespace шегіндегі рөл байланыстары арқылы.

Осылайша RBAC тұлғалар шегін шектейді, Gatekeeper маркерленген объектілерге қолмен манипуляцияға тыйым салады, ал Argo CD күйді Git-тен қалпына келтіреді.

## {heading({counter(ag)}. Диагностиканы жүргізіңіз)[id=mk8s-ag-diagnostics]}

[cols="1a,2a", options="header"]
|===
| Симптом
| Себебі/шешімі

| Саясат іске қоспайды және қате шығармайды
| Шектеу webhook-подтарға status-объект атауындағы 63 символ шектеуіне байланысты жүктелмеген. `kind` немесе шектеу атауын қысқартыңыз

| Шектеу жасағанда `missing ConstraintTemplate: ... not found`
| `gitops.constraints.gatekeeper.sh` CRD-да `Established` күйін күтіп, `apply`-ті қайталаңыз

| `name is not equal to the lowercase of CRD's Kind`
| Шаблонның `metadata.name` мәні `kind` мәнінің кіші әріптермен жазылған нұсқасына тең емес. Сәйкестендіріңіз, мысалы `GitOps` → `gitops`

| Саясат `UPDATE`-те іске қоспайды
| Объект `argocd.argoproj.io/tracking-id` маркерімен белгіленбеген ([3-қадамды](#mk8s-ag-mark) қараңыз), немесе `enforcementAction` параметрі `deny` режиміне қойылмаған

| `DELETE` блокталмайды
| Webhook-қа `DELETE` операциясы қосылмаған ([5-қадамды](#mk8s-ag-allow) қараңыз). `validatingwebhookconfiguration` тексеріңіз

| `kubectl scale` блокталмайды
| Күтілген жағдай: маркерсіз `deployments/scale` субресурсы. Argo CD `selfHeal` немесе RBAC қолданыңыз

| Argo CD синхрондай алмайды (`Forbidden`)
| `allowedUsers` ішінде Argo CD сервистік жазбасы дұрыс емес; `kubectl -n argocd get sa` → `system:serviceaccount:argocd:...` мәнін салыстырыңыз

| Контроллерлер бұзылады (HPA және т.б.)
| `allowServiceAccounts: true` орнатыңыз немесе олардың сервистік жазбаларын `allowlist`-ке қосыңыз; олардың namespace-терін алып тастаңыз

| Шаблон компиляция қатесі
| `kubectl get constrainttemplate gitops -o yaml` → Rego қатесі бар `status` блогы

| Апараттық рұқсат қажет
| Уақытша пайдаланушыны/топты `allowedUsers`/`allowedGroups`-ке қосыңыз немесе шектеуді `dryrun` режиміне ауыстырыңыз
|===

{note:info}
Webhook `validation.gatekeeper.sh` ішіндегі `failurePolicy: Ignore` — әдепкі мән: егер OPA қолжетімсіз болса немесе шектеу жүктелмеген болса, admission-сұраулар өтіп кетеді (fail-open). Қатаң қауіпсіздік үшін `Fail` мәніне ауыстыруға болады, бірақ бұл Gatekeeper мәселелері кезінде API қолжетімсіздігі тәуекелін арттырады.
{/note}

Пайдалы командалар:

```bash
kubectl get constraints
kubectl get constraintpodstatuses -n opa-gatekeeper | grep gitops
kubectl -n opa-gatekeeper logs deploy/gatekeeper-controller-manager --tail=200
kubectl -n opa-gatekeeper logs deploy/gatekeeper-audit --tail=200
```

## {heading(Қолданылмайтын ресурстарды өшіріңіз)[id=mk8s-ag-remove]}

Жұмыс істеп тұрған кластер тарифтенеді және есептеу ресурстарын тұтынады. Осы практикалық нұсқаулықты орындау үшін жасалған Kubernetes ресурстары сізге қажет болмаса, оларды өшіріңіз:

1. Командаларды орындаңыз:

   ```bash
   kubectl delete gitops gp 2>/dev/null
   kubectl delete gitmark gm 2>/dev/null
   kubectl delete constrainttemplate gitops gitmark 2>/dev/null

# webhook-ты әдепкі операцияларға қайтару қажет болса (DELETE-ті алып тастау) —

# validatingwebhookconfiguration gatekeeper-validating-webhook-configuration түзетіңіз

1. Тесттік қосымшаны өшіріңіз:

   ```console
   kubectl delete -f app-guestbook.yaml  
   ```

1. Gatekeeper-ді өшіріңіз:

   ```console
   helm delete gatekeeper --namespace opa-gatekeeper
   kubectl delete crd -l gatekeeper.sh/system=yes
   ```

{include(/kz/_includes/_delete-test-cluster-short.md)}