# {heading(Кластерлердің аудит саясаты)[id=k8s-cluster-audit-policy]}

{include(/kz/_includes/_translated_by_ai.md)}

Cloud Containers сервисіндегі Kubernetes {linkto(../cluster-generations#k8s-cluster-generations)[text=екінші буын]} кластерлері үшін аудит саясаты ([audit policy](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/#audit-policy)) бапталған. Ол кластердегі {linkto(../architecture#k8s-architecture-kubernetes-api-integration)[text=Kubernetes API]} оқиғаларының қайсысы және қандай көлемде VK Cloud платформасындағы {linkto(../../../../monitoring-services/event-log/concepts/about#event-log-about)[text=Cloud Audit]} аудит журналына жазылатынын анықтайды. Аудит саясаты Cloud Containers сервисінде жасайтын барлық кластерлер үшін бапталған және оны өзгертуге болмайды.

Аудит саясаты мыналарға көмектеседі:

- кластердің белгіленген қауіпсіздік талаптарына сәйкестігін қамтамасыз етуге;
- кластерлердегі әрекеттерді, қателерді және рұқсатсыз қол жеткізу әрекеттерін бақылауға;
- кластерлердің жұмысындағы қауіпсіздік инциденттерінің алдын алуға және оларды тергеуге.

Аудит саясаты кластердегі барлық оқиғалар дәйекті түрде өтетін ережелерді анықтайды. Егер оқиға қандай да бір ережеге сәйкес келсе, сол ереже қолданылады. Оқиғаның журналға жазылуы белгіленген аудит деңгейіне және қосымша баптауларға байланысты.

## {heading(Аудит саясатының құрылымы)[id=k8s-cluster-audit-policy-structure]}

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

- `omitStages` блогы API Kubernetes сұрауларын өңдеу кезеңдерін көрсетеді, оларды оқиғалар журналына жазудың қажеті жоқ: 

   - `RequestReceived` — сұраудың қабылдануы;
   - `ResponseStarted` — жауапты қалыптастырудың басталуы.

  Бұл логтар көлемін азайтуға көмектеседі, өйткені бұл кезеңдер аудит мақсаттары үшін сыни ақпаратты қамтымайды.

- `rules` блогында саясаттың нақты ережелері берілген. Әр ереже үшін мыналар анықталған:

   - `level` — аудит деңгейі, яғни Kubernetes оқиғаларды аудит журналына қандай егжей-тегжей деңгейімен жазуы керек:
      - `None` — көрсетілген ресурстар мен оқиғалар аудиттен шығарылады (аудит журналына жазылмайды).
      - `Metadata` — тек сұрау метадеректері жазылады (мысалы, пайдаланушы аты, уақыт, ресурс түрі, әдіс), бірақ ресурс мазмұны жазылмайды (мысалы, құпияның, токеннің, конфигурацияның мазмұны).
      - `Request` — толық сұрау жазылады, бірақ жауап жазылмайды.
      - `RequestResponse` — сұрау да, жауап та жазылады, яғни оқиғалардың толық аудиті жүргізіледі.

   - `users`, `userGroups` — ереже анықталған пайдаланушы немесе пайдаланушылар тобы.
   - `verbs` — пайдаланушы немесе пайдаланушылар тобы орындайтын (`watch`, `create`, `update`, `patch`, `delete`) операциялар, олар деңгейге байланысты аудит журналына жазылуы немесе жазылмауы керек. Бұл операциялар туралы толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/reference/using-api/api-concepts/#api-verbs) берілген.
   - `resources` — ереже қолданылатын кластер ресурстары.

## {heading(Қандай оқиғалар аудит журналына түседі)[id=k8s-cluster-audit-policy-events]}

- `RequestResponse` деңгейіндегі өзгертуге арналған (`create`, `update`, `patch`, `delete`) барлық сұраулар:

    - `system:anonymous` анонимді пайдаланушыларынан келетін барлық сұраулар үшін.
    - Басқа ережелерге түспеген, ережеде көрсетілген ресурстарды өзгертуге арналған барлық сұраулар үшін.

- `Metadata` деңгейіндегі сезімтал ресурстарға (`secrets`, `configmaps`, `serviceaccounts/token`, `tokenreviews`) арналған барлық сұраулар.
- Басқа ережелерге түспеген ресурстардың көпшілігі үшін `Metadata` деңгейіндегі ақпаратты оқу (`get`, `list`, `watch`) сұраулары.
- Басқа ережелерге түспеген ресурстар үшін `Request` деңгейіндегі қалған барлық өзгерту (`create`, `update`, `patch`, `delete`) сұраулары.

## {heading(Қандай оқиғалар аудит журналынан шығарылады)[id=k8s-cluster-audit-policy-excluded-events]}

- `kube-proxy` жүйелік пайдаланушысынан `endpoints`, `services`, `services/status` ресурстарын бақылауға (`watch`) арналған сұраулар.   
- kubelet қызметтерінен `nodes`, `nodes/status` ресурстары туралы ақпаратты алуға (`get`) арналған сұраулар.
- Жүйелік компоненттер мен сервистік аккаунттар туралы ақпаратты жаппай оқуға (`get`, `list`, `watch`) арналған сұраулар:

  - `system:nodes`;
  - `system:serviceaccounts`;
  - `calico-node`;
  - `calico-kube-controllers`;
  - `system:kube-controller-manager`;
  - `system:kube-scheduler`;
  - `cluster-autoscaler`;
  - `system:serviceaccounts:monitoring`;
  - `csi-cinder-controller-sa`.

  Мұндай тәсіл логтар көлемін айтарлықтай азайтуға көмектеседі.
- `healthz`, `livez`, `version`, `swagger` арнайы Kubernetes API эндпоинттері туралы ақпаратты оқуға (`get`, `list`, `watch`) арналған сұраулар. Бұл эндпоинттер кластер ресурстарымен жұмыс істеу үшін емес, API-сервердің өзінің күйін тексеруге арналған.
- `system:apiserver` пайдаланушысынан API-сервер оқиғалары туралы ақпаратты оқуға (`get`, `list`, `watch`) арналған сұраулар.
- `events` және `leases` арнайы ресурстарының кез келген оқиғалары, сондай-ақ Calico сервистік аккаунттары үшін `tiers`.
- `cluster-autoscaler` пайдаланушысы үшін `kube-system` аттар кеңістігіндегі `configmaps` және `endpoints` ресурстарын жаңарту.