# {heading(Рұқсаттарды басқару)[id=mk8s-concepts-iam]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=шақырылған]} {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=жоба]} қатысушыларына немесе {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервистік тіркелгілерге]} құқықтарды шектеу үшін Managed Containers қызметінде бірыңғай идентификация және рұқсаттарды басқару қызметі — {linkto(../../../../access/iam#iam)[text=IAM]} қолданылады. Рұқсаттарды {var(cloud)} жеке кабинетынан орталықтандырылған түрде басқаруға болады.

Managed Containers қызметінде жоба қатысушысына қолжетімді әрекеттер тізімін анықтайды:

- {linkto(#mk8s-concepts-iam-basic-roles)[text=Негізгі рөл]} — пайдаланушының {var(cloud)} барлық қызметтері деңгейіндегі құқықтарын анықтайды.
- {linkto(#mk8s-concepts-iam-special-roles)[text=Мамандандырылған рөл]} — пайдаланушының {var(cloud)} жекелеген қызметтері деңгейіндегі құқықтарын анықтайды.

Managed Containers үшін жекелеген {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттарды]} баптауға қолдау көрсетілмейді.

Рөлдерді {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=тағайындау]} тек `Жоба иесі`, `Суперәкімші` және `Пайдаланушылар әкімшісі (IAM)` рөлдері бар жоба қатысушыларына ғана болады. Рөлдерді таңдауда ең аз артықшылық қағидасын ұстаныңыз: пайдаланушыда тек оның міндеттерін орындауға қажетті құқықтар ғана болуы тиіс.

## {heading(Негізгі рөлдер)[id=mk8s-concepts-iam-basic-roles]}

`Жоба иесі`, `Суперәкімші` және `Жоба әкімшісі` негізгі рөлдері Managed Containers-тің барлық операцияларына толық рұқсат алады, жекелеген рөлдерді баптаудың қажеті жоқ.

### {heading(mcs_owner)[id=mk8s-concepts-iam-basic-roles-mcs_owner]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_owner]}

### {heading(mcs_co_owner)[id=mk8s-concepts-iam-basic-roles-mcs_co_owner]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_co_owner]}

### {heading(mcs_admin)[id=mk8s-concepts-iam-basic-roles-mcs_admin]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_admin]}

### {heading(mcs_admin_security)[id=mk8s-concepts-iam-basic-roles-mcs_admin_security]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_admin_security]}

### {heading(mcs_viewer)[id=mk8s-concepts-iam-basic-roles-mcs_viewer]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_viewer]}

## {heading(Мамандандырылған рөлдер)[id=mk8s-concepts-iam-special-roles]}

Managed Containers қызметі үшін {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=мамандандырылған рөлдердің]} бірнешеуі қолжетімді, оларды {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=негізгі рөлмен]} бірге немесе жеке қолдануға болады.

### {heading(mcs_k8s_viewer)[id=mk8s-concepts-iam_viewer]}

{include(/kz/_includes/_iam_roles.md)[tags=k8s-viewer-managed]}

### {heading(mcs_k8s_editor)[id=mk8s-concepts-iam_editor]}

{include(/kz/_includes/_iam_roles.md)[tags=k8s-editor-managed]}

### {heading(mcs_k8s_admin)[id=mk8s-concepts-iam_admin]}

{include(/kz/_includes/_iam_roles.md)[tags=k8s-admin-managed]}

## {heading(Жеке кабинет рөлдері мен Kubernetes байланысы)[id=mk8s-concepts-iam-k8s-roles]}

Пайдаланушы Kubernetes кластерінде {var(cloud)} жеке кабинетына кіру кезіндегімен бірдей деректемелермен, бірыңғай кіру технологиясы (Single Sign-On, SSO) арқылы {linkto(../access-management#mk8s-access-management)[text=ауттендификацияланады]}. Әрбір мамандандырылған рөл — Kubernetes әкімшісі, операторы немесе аудиторы — пайдаланушыға қолжетімді ішкі [Kubernetes рөлін](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles) де анықтайды. Kubernetes рөлі пайдаланушыға кластердің қандай объектілері қолжетімді екенін және осы объектілер үстінде қандай әрекеттер жасауға рұқсат етілгенін анықтайды.

Рөл үшін қолжетімді ресурстар тізімін көру үшін кластерге қосылып, мына пәрменді орындаңыз:

```console
kubectl describe clusterrole <KUBERNETES_РЕӨЛІ>
```

{tabs}

{tab(Kubernetes аудиторы)}

Kubernetes-тегі рөл: `view`.

Рөл атау кеңістігіндегі объектілердің көпшілігіне оқу рұқсатын береді.

Рөл бермейді:

- Рөлдерді және рөлдерді байланыстыруды көру немесе өзгерту рұқсаты.
- Құпияларға (secrets) рұқсат.

  Құпияларға рұқсаты бар пайдаланушы атау кеңістігіндегі кез келген сервистік тіркелгінің тіркелу деректеріне қол жеткізе алады. Бұл атау кеңістігіндегі кез келген сервистік тіркелгі атынан API-ға қол жеткізуге мүмкіндік береді. «Тек оқу» құқықтары бар рөл үшін бұл артықшылықтан асып кету (privilege escalation) ретінде бағаланады.

{/tab}

{tab(Kubernetes операторы)}

Kubernetes-тегі рөл: `edit`.

Рөл береді:

- Атау кеңістігіндегі объектілердің көпшілігіне оқу және жазу рұқсаты.
- Құпияларға рұқсат, бұл атау кеңістігіндегі кез келген сервистік тіркелгі атынан подтарды іске қосуға мүмкіндік береді. Рөлды, мысалы, API-ға қол жеткізу үшін қолдануға болады.

Рөл бермейді:

- Рөлдерді және рөлдерді байланыстыруды көру немесе өзгерту рұқсаты.
- 1.22 және одан жоғары нұсқалы Kubernetes кластерлерінің [эндпоинттерге жазу рұқсаты](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#write-access-for-endpoints).

{/tab}

{tab(Kubernetes әкімшісі)}

Kubernetes-тегі рөл: `admin`.

`admin` рөлін атау кеңістігі шегінде рөлдерді байланыстыру (role binding) арқылы тағайындау ұсынылады.

Рөл береді:

- Атау кеңістігіндегі объектілердің көпшілігіне оқу және жазу рұқсаты, соның ішінде басқа рөлдерді және рөлдерді байланыстыруды (role binding) жасау мүмкіндігі.
- Құпияларға рұқсат, бұл атау кеңістігіндегі кез келген сервистік тіркелгі атынан подтарды іске қосуға мүмкіндік береді. Рөлды, мысалы, API-ға қол жеткізу үшін қолдануға болады.

Рөл бермейді:

- Ресурстық квотаға (resource quota) немесе атау кеңістігінің өзіне жазу рұқсаты.
- 1.22 және одан жоғары нұсқалы Kubernetes кластерлерінің [эндпоинттерге жазу рұқсаты](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#write-access-for-endpoints).

Kubernetes әкімшісі пайдаланушының тіркелгісін өшіргенде немесе оның рөлін жеке кабинеттен алып тастағанда, бұл пайдаланушының Kubernetes кластерлеріне қолжетімділік құқықтары да алынып тасталады.

{/tab}

{/tabs}