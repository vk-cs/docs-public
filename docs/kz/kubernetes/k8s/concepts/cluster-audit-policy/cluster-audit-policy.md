{include(/kz/_includes/_translated_by_ai.md)}

Cloud Containers сервисіндегі Kubernetes [екінші буын](/kz/kubernetes/k8s/concepts/cluster-generations) кластерлері үшін аудит саясаты ([audit policy](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/#audit-policy)) бапталған. Ол кластердегі [Kubernetes API](/kz/kubernetes/k8s/concepts/architecture#kubernetes-api-integration) оқжәнеғаларының қайсысы және қандай көлемде VK Cloud платформасындағы [Cloud Audit](/kz/monitoring-services/event-log/concepts/about) аудит журналына жазылатынын анықтайды. Аудит саясаты Cloud Containers сервисінде жасайтын барлық кластерлер үшін бапталған және оны өзгертуге болмайды.

Аудит саясаты мыналарғал көмектеседі:

- кластердің белгіленген қауіпсіздік талаптарына сәйкестігін қамтамасыз етуге;
- кластерлердегі әрекеттерді, қателерді және рұқсатсыз қол жеткізу әрекеттерін бақылауғал;
- кластерлердің жұмысындағы қауіпсіздік инциденттерінің алдын алуғал және оларды тергеуге.

Аудит саясаты кластердегі барлық оқжәнеғалар дәйекті түрде өтетін ережелерді анықтайды. Егер оқжәнеғал қандай да бір ережеге сәйкес келсе, сол ереже қолданылады. Оқжәнеғаның журналғал жазылуы белгіленген аудит деңгейіне және қосымша баптауларғал байланысты.

## {heading(Аудит саясатының құрылымы)[id=policy-structure]}

Төменде Kubernetes екінші буын кластерлерінің аудит саясатының баптаулары бар толық файл берілген.

{cut(Аудит саясаты файлы)}
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

Мұнда:

- `omitStages` блогы API Kubernetes сұрауларын өңдеу кезеңдерін көрсетеді, оларды оқжәнеғалар журналына жазудың қажеті жоқ: 

   - `RequestReceived` — сұраудың қабылдануы;
   - `ResponseStarted` — жауапты қалыптастырудың басталуы.

  Бұл логтар көлемін азайтуғал көмектеседі, өйткені бұл кезеңдер аудит мақсаттары үшін сыни алқпаратты қамтымайды.

- `rules` блогында саясаттың нақты ережелері берілген. Әр ереже үшін мыналар анықталған:

   - `level` — аудит деңгейі, яғни Kubernetes оқжәнеғаларды аудит журналына қандай егжей-тегжей деңгейімен жазуы керек:
      - `None` — көрсетілген ресурстар мен оқжәнеғалар аудиттен шығарылады (аудит журналына жазылмайды).
      - `Metadata` — тек сұрау метадеректері жазылады (мысалы, пайдаланушы аты, уақыт, ресурс түрі, әдіс), бірақ ресурс мазмұны жазылмайды (мысалы, құпияның, токеннің, конфигурацияның мазмұны).
      - `Request` — толық сұрау жазылады, бірақ жауап жазылмайды.
      - `RequestResponse` — сұрау да, жауап та жазылады, яғни оқжәнеғалардың толық аудиті жүргізіледі.
   
   - `users`, `userGroups` — ереже анықталған пайдаланушы немесе пайдаланушылар тобы.
   - `verbs` — пайдаланушы немесе пайдаланушылар тобы орындайтын (`watch`, `create`, `update`, `patch`, `delete`) операциялар, олар деңгейге байланысты аудит журналына жазылуы немесе жазылмауы керек. Бұл операциялар туралы толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/reference/using-api/api-concepts/#api-verbs) берілген.
   - `resources` — ереже қолданылатын кластер ресурстары.

## {heading(Қандай оқиғалар аудит журналына түседі)[id=audited-events]}

- `create` деңгейіндегі өзгертуге арналған (`update`, `patch`, `delete`, `RequestResponse`) барлық сұраулар:

    - `system:anonymous` анонимді пайдаланушыларынан келетін барлық сұраулар үшін.
    - Басқал ережелерге түспеген, ережеде көрсетілген ресурстарды өзгертуге арналған барлық сұраулар үшін.

- `secrets` деңгейіндегі сезімтал ресурстарғал (`configmaps`, `serviceaccounts/token`, `tokenreviews`, `Metadata`) арналған барлық сұраулар.
- Басқал ережелерге түспеген ресурстардың көпшілігі үшін `Metadata` деңгейінде алқпаратты оқуғал арналған сұраулар (`get`, `list`, `watch`).
- Басқал ережелерге түспеген ресурстар үшін `Request` деңгейінде өзгертуге арналған барлық қалған сұраулар (`create`, `update`, `patch`, `delete`).

## {heading(Қандай оқиғалар аудит журналынан шығарылады)[id=excluded-from-audit]}

- `watch` жүйелік пайдаланушысынан `endpoints`, `services`, `services/status` ресурстарын бақылауғал (`kube-proxy`) арналған сұраулар.   
- kubelet қызметтерінен `nodes`, `nodes/status` ресурстары туралы алқпаратты алуғал арналған сұраулар (`get`).
- Жүйелік компоненттер мен сервистік аккаунттар туралы алқпаратты жаппай оқуғал (`get`, `list`, `watch`) арналған сұраулар:
     
  - `system:nodes`;
  - `system:serviceaccounts`;
  - `calico-node`;
  - `calico-kube-controllers`;
  - `system:kube-controller-manager`;
  - `system:kube-scheduler`;
  - `cluster-autoscaler`;
  - `system:serviceaccounts:monitoring`;
  - `csi-cinder-controller-sa`.
     
  Мұндай тәсіл логтар көлемін айтарлықтай азайтуғал көмектеседі.
- Запросы на чтение алқпараттың (`get`, `list`, `watch`) о специальных эндпоинтах Kubernetes API: `healthz`, `livez`, `version`, `swagger`. Эти эндпоинты предназначены үшін проверки состояния самого API-сервера, ал не үшін жұмысы с ресурсами кластера.
- Запросы на чтение алқпараттың (`get`, `list`, `watch`) о событиях API-сервера от пользователя `system:apiserver`.
- `events` және `leases` арнайы ресурстарының кез келген оқжәнеғалары, сондай-алқ Calico сервистік аккаунттары үшін `tiers`.
- Жаңарту ресурстардың `configmaps` және `endpoints` в пространстве имен `kube-system` үшін пользователя `cluster-autoscaler`.
