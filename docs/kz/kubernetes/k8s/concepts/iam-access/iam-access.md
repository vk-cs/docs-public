# {heading(Қолжетімділікті басқару)[id=k8s-concepts-iam]}

{linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=Шақырылған]} {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=жоба]} қатысушыларының немесе {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервистік есептік жазбалардың]} құқықтарын шектеу үшін Managed Containers сервисінде сәйкестендіру және қолжетімділікті басқарудың бірыңғай сервисі — {linkto(../../../../access/iam#iam)[text=IAM]} қолданылады. Қолжетімділіктерді {var(cloud)} жеке кабинетінен орталықтандырылған түрде басқаруға болады.

Managed Containers сервисінде жоба қатысушысына қолжетімді әрекеттер тізімін мыналар анықтайды:

- {linkto(#k8s-concepts-iam-basic-roles)[text=Базалық рөл]} — {var(cloud)} барлық сервистері деңгейінде пайдаланушы құқықтарын анықтайды.
- {linkto(#k8s-concepts-iam-special-roles)[text=Мамандандырылған рөл]} — {var(cloud)} жекелеген сервистері деңгейінде пайдаланушы құқықтарын анықтайды.

Managed Containers үшін жеке {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттарды]} баптауға қолдау көрсетілмейді.

Рөлдерді тек `Жоба иесі`, `Суперадминистратор` және `Пайдаланушылар әкімшісі (IAM)` рөлдері бар жоба қатысушылары ғана {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=тағайындай]} алады. Рөлдерді таңдау кезінде ең аз артықшылықтар қағидатын ұстаныңыз: пайдаланушы өз міндеттерін орындау үшін қажет құқықтарға ғана ие болуы тиіс.

## {heading(Базалық рөлдер)[id=k8s-concepts-iam-basic-roles]}

`Жоба иесі`, `Суперадминистратор` және `Жоба әкімшісі` базалық рөлдері Managed Containers сервисінің барлық операцияларына толық қолжетімділік алады, жекелеген рөлдерді баптаудың қажеті жоқ.

### {heading(mcs_owner)[id=k8s-concepts-iam-basic-roles-mcs_owner]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_owner]}

### {heading(mcs_co_owner)[id=k8s-concepts-iam-basic-roles-mcs_co_owner]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_co_owner]}

### {heading(mcs_admin)[id=k8s-concepts-iam-basic-roles-mcs_admin]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_admin]}

### {heading(mcs_admin_security)[id=k8s-concepts-iam-basic-roles-mcs_admin_security]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_admin_security]}

### {heading(mcs_viewer)[id=k8s-concepts-iam-basic-roles-mcs_viewer]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_viewer]}

## {heading(Мамандандырылған рөлдер)[id=k8s-concepts-iam-special-roles]}

Managed Containers сервисі үшін {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=базалық рөлмен]} бірге немесе жеке пайдалануға болатын бірнеше {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=мамандандырылған рөлдер]} қолжетімді.

### {heading(mcs_k8s_viewer)[id=k8s-concepts-iam_viewer]}

{include(/kz/_includes/_iam_roles.md)[tags=k8s-viewer-magnum]}

### {heading(mcs_k8s_editor)[id=k8s-concepts-iam_editor]}

{include(/kz/_includes/_iam_roles.md)[tags=k8s-editor-magnum]}

### {heading(mcs_k8s_admin)[id=k8s-concepts-iam_admin]}

{include(/kz/_includes/_iam_roles.md)[tags=k8s-admin-magnum]}

## {heading(Жеке кабинет пен Kubernetes рөлдерінің өзара байланысы)[id=k8s-concepts-iam-k8s-roles]}

Пайдаланушы {var(cloud)} жеке кабинетіне кіру кезіндегідей бірыңғай кіру технологиясы (Single Sign-On, SSO) арқылы сол реквизиттермен Kubernetes кластерінде {linkto(../access-management#k8s-access-management)[text=аутентификациядан өтеді]}. Әрбір мамандандырылған рөл — Kubernetes әкімшісінің, операторының немесе аудиторының рөлі — пайдаланушыға қолжетімді ішкі [Kubernetes рөлін](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles) де анықтайды. Kubernetes рөлі пайдаланушыға кластердің қандай объектілері қолжетімді екенін және осы объектілермен қандай әрекеттерді орындауға рұқсат етілгенін анықтайды.

Рөл үшін қолжетімді ресурстар тізімін қарау үшін кластерге қосылып, мына команданы орындаңыз:

```console
kubectl describe clusterrole <KUBERNETES_РӨЛІ>
```

{tabs}

{tab(Kubernetes аудиторы)}

Kubernetes рөлі: `view`.

Рөл атаулар кеңістігіндегі объектілердің көпшілігіне оқу құқығымен қатынасу береді.

Рөл мыналарды бермейді:

- Рөлдер мен рөлдерді байланыстыруларды қарау немесе өзгерту құқығын.
- Секреттерге қолжетімділікті.

  Секреттерге қолжетімділігі бар пайдаланушы атаулар кеңістігіндегі кез келген сервистік аккаунттың есептік деректеріне қол жеткізе алады. Бұл атаулар кеңістігіндегі кез келген сервистік аккаунт атынан API-ге қатынасуға мүмкіндік береді. Тек оқу құқықтары бар рөл үшін бұл артықшылықтарды ұлғайту (privilege escalation) ретінде бағаланады.

{/tab}

{tab(Kubernetes операторы)}

Kubernetes рөлі: `edit`.

Рөл мыналарды береді:

- Атаулар кеңістігіндегі объектілердің көпшілігіне оқу және жазу құқығымен қатынасу.
- Секреттерге қолжетімділік, бұл атаулар кеңістігіндегі кез келген сервистік аккаунт атынан подтарды іске қосуға мүмкіндік береді. Рөл, мысалы, API-ге қатынасу алу үшін пайдаланылуы мүмкін.

Рөл мыналарды бермейді:

- Рөлдер мен рөлдерді байланыстыруларды қарау немесе өзгерту құқығын.
- Kubernetes-тің 1.22 және одан жоғары нұсқадағы кластерлерінің [эндпоинттеріне жазу құқығын](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#write-access-for-endpoints).

{/tab}

{tab(Kubernetes әкімшісі)}

Kubernetes рөлі: `admin`.

`admin` рөлін атаулар кеңістігі шегінде рөлдерді байланыстыру арқылы тағайындау ұсынылады.

Рөл мыналарды береді:

- Атаулар кеңістігіндегі объектілердің көпшілігіне оқу және жазу құқығымен қатынасу, соның ішінде басқа рөлдер мен рөлдерді байланыстыруларды (role binding) жасау мүмкіндігін.
- Секреттерге қолжетімділік, бұл атаулар кеңістігіндегі кез келген сервистік аккаунт атынан подтарды іске қосуға мүмкіндік береді. Рөл, мысалы, API-ге қатынасу алу үшін пайдаланылуы мүмкін.

Рөл мыналарды бермейді:

- Ресурстық квотаға (resource quota) немесе атаулар кеңістігінің өзіне жазу құқығын.
- Kubernetes-тің 1.22 және одан жоғары нұсқадағы кластерлерінің [эндпоинттеріне жазу құқығын](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#write-access-for-endpoints).

Егер Kubernetes әкімшісі пайдаланушының есептік жазбасын өшірсе немесе оның жеке кабинеттегі рөлін кері қайтарса, осы пайдаланушының Kubernetes кластерлеріне қатынасу құқығы да кері қайтарылады.

{/tab}

{/tabs}
