Для кластеров Kubernetes [второго поколения](/ru/kubernetes/k8s/concepts/cluster-generations) в сервисе Cloud Containers настроена политика аудита ([audit policy](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/#audit-policy)). Она определяет, какие события [Kubernetes API](/ru/kubernetes/k8s/concepts/architecture#kubernetes-api-integration) в кластере и в каком объеме записываются в журнал аудита [Cloud Audit](/ru/monitoring-services/event-log/concepts/about) на платформе VK Cloud. Политика аудита настроена для всех кластеров, которые вы создаете в сервисе Cloud Containers, и изменить ее нельзя.

Политика аудита помогает:

- обеспечивать соответствие кластера установленным требованиям безопасности;
- отслеживать действия в кластерах, ошибки и попытки получения несанкционированного доступа;
- предотвращать и расследовать инциденты безопасности в работе кластеров.

Политика аудита определяет правила, через которые последовательно проходят все события в кластере. Если событие подходит под какое-то правило, то оно применяется. Попадет ли событие в журнал, зависит от установленного уровня аудита и дополнительных настроек.

## {heading(Структура политики аудита)[id=policy-structure]}

Ниже представлен полный файл с настройками политики аудита кластеров Kubernetes второго поколения.

{cut(Файл политики аудита)}
```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
omitStages:
  - "RequestReceived"
  - "ResponseStarted"

rules:
  - level: None
    users: ["system:kube-proxy"]
    verbs: ["watch"]
    resources:
      - group: ""
        resources: ["endpoints", "services", "services/status"]
  - level: None
    users: ["kubelet"] # Legacy kubelet identity.
    verbs: ["get"]
    resources:
      - group: ""
        resources: ["nodes", "nodes/status"]
  - level: None
    userGroups:
      [
        "system:nodes",
        "system:serviceaccounts",
        "calico-node",
        "calico-kube-controllers",
        "system:kube-controller-manager",
        "system:kube-scheduler",
        "cluster-autoscaler",
        "system:serviceaccounts:monitoring",
        "csi-cinder-controller-sa",
      ]
    verbs: ["get", "list", "watch"]
  - level: None
    users: ["system:apiserver"]
    verbs: ["get", "list", "watch"]
  - level: None
    nonResourceURLs:
      - /healthz*
      - /version
      - /swagger*
      - /livez
  - level: None
    resources:
      - group: ""
        resources: ["events"]
      - group: "coordination.k8s.io"
        resources: ["leases"]
  - level: None
    userGroups:
      [
        "calico-kube-controllers",
        "system:serviceaccount:kube-system:calico-node",
      ]
    resources:
      - group: "crd.projectcalico.org"
        resources: ["tiers"]
  - level: None
    users: ["cluster-autoscaler"]
    verbs: ["update"]
    namespaces: ["kube-system"]
    resources:
      - group: ""
        resources: ["configmaps", "endpoints"]

  - level: RequestResponse
    users: ["system:anonymous"]

  - level: Metadata
    resources:
      - group: ""
        resources: ["secrets", "configmaps", "serviceaccounts/token"]
      - group: authentication.k8s.io
        resources: ["tokenreviews"]

  - level: RequestResponse
    verbs: ["create", "update", "patch", "delete"]
    resources:
      - group: ""
      - group: "admissionregistration.k8s.io"
      - group: "authentication.k8s.io"
      - group: "authorization.k8s.io"
      - group: "certificates.k8s.io"
      - group: "networking.k8s.io"
      - group: "policy"
      - group: "rbac.authorization.k8s.io"
      - group: "settings.k8s.io"
      - group: "storage.k8s.io"

  - level: Request
    verbs: ["create", "update", "patch", "delete"]

  - level: Metadata
    verbs: ["get", "list", "watch"]
```
{/cut}

Здесь:

- Блок `omitStages` указывает этапы обработки запросов к API Kubernetes, которые не нужно записывать в журнал событий: 

   - `RequestReceived` — получение запроса;
   - `ResponseStarted` — начало формирования ответа.

  Это помогает сократить объем логов, так как эти этапы не несут критической информации для целей аудита.

- Блок `rules` содержит конкретные правила политики. Для каждого правила определены:

   - `level` — уровень аудита, то есть степень детализации, с которой Kubernetes должен записывать события в журнал аудита:
      - `None` — указанные ресурсы и события исключены из аудита (не записываются в журнал аудита).
      - `Metadata` — записываются только метаданные запроса (например, имя пользователя, время, тип ресурса, метод), но не содержимое ресурса (например, содержимое секрета, токена, конфигурации).
      - `Request` — записывается весь запрос, но не ответ.
      - `RequestResponse` — записывается и запрос, и ответ, то есть осуществляется полный аудит событий.
   
   - `users`, `userGroups` — пользователь или группа пользователей, для которых определено правило.
   - `verbs` — операции (`watch`, `create`, `update`, `patch`, `delete`) над пользователем или группой пользователей, которые, в зависимости от уровня, должны или не должны записываться в журнал аудита. Подробнее об этих операциях в [официальной документации Kubernetes](https://kubernetes.io/docs/reference/using-api/api-concepts/#api-verbs).
   - `resources` — ресурсы кластера, к которым применяется правило.

## {heading(Какие события попадают в журнал аудита)[id=audited-events]}

- Все запросы на изменение (`create`, `update`, `patch`, `delete`) на уровне `RequestResponse`:

    - Для всех запросов от анонимных пользователей `system:anonymous`.
    - Для всех запросов на изменение перечисленных в правиле ресурсов, не попавших под другие правила.

- Все запросы к чувствительным ресурсам (`secrets`, `configmaps`, `serviceaccounts/token`, `tokenreviews`) на уровне `Metadata`.
- Запросы на чтение информации (`get`, `list`, `watch`) на уровне `Metadata` для большинства ресурсов, не попавших под другие правила.
- Все остальные запросы на изменение (`create`, `update`, `patch`, `delete`) на уровне `Request` для ресурсов, не попавших под другие правила.

## {heading(Какие события исключаются из журнала аудита)[id=excluded-from-audit]}

- Запросы на наблюдение (`watch`) за ресурсами `endpoints`, `services`, `services/status` от системного пользователя `kube-proxy`.   
- Запросы на получение информации (`get`) о ресурсах `nodes`, `nodes/status` от служб kubelet.
- Массовые запросы на чтение информации (`get`, `list`, `watch`) о системных компонентах и сервисных аккаунтах:
     
  - `system:nodes`;
  - `system:serviceaccounts`;
  - `calico-node`;
  - `calico-kube-controllers`;
  - `system:kube-controller-manager`;
  - `system:kube-scheduler`;
  - `cluster-autoscaler`;
  - `system:serviceaccounts:monitoring`;
  - `csi-cinder-controller-sa`.
     
  Такой подход помогает значительно сократить объем логов.
- Запросы на чтение информации (`get`, `list`, `watch`) о специальных эндпоинтах Kubernetes API: `healthz`, `livez`, `version`, `swagger`. Эти эндпоинты предназначены для проверки состояния самого API-сервера, а не для работы с ресурсами кластера.
- Запросы на чтение информации (`get`, `list`, `watch`) о событиях API-сервера от пользователя `system:apiserver`.
- Любые события специфических ресурсов `events` и `leases`, а также `tiers` для сервисных аккаунтов Calico.
- Обновление ресурсов `configmaps` и `endpoints` в пространстве имен `kube-system` для пользователя `cluster-autoscaler`.
