# {heading(Қолжетімділікті басқару)[id=logging-concepts-iam]}

{linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=Шақырылған]} {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=жоба]} қатысушыларының немесе {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервистік есептік жазбалардың]} құқықтарын шектеу үшін Cloud Logging сервисінде сәйкестендіру және қолжетімділікті басқарудың бірыңғай сервисі — {linkto(../../../../access/iam#iam)[text=IAM]} қолданылады. Қолжетімділіктерді {var(cloud)} жеке кабинетінен орталықтандырылған түрде басқаруға болады.

Cloud Logging сервисінде жоба қатысушысына қолжетімді әрекеттер тізімін мыналар анықтайды:

- {linkto(#logging-concepts-iam-basic-roles)[text=Базалық рөл]} — {var(cloud)} барлық сервистері деңгейінде пайдаланушы құқықтарын анықтайды.
- {linkto(#logging-concepts-iam-special-roles)[text=Мамандандырылған рөл]} — {var(cloud)} жекелеген сервистері деңгейінде пайдаланушы құқықтарын анықтайды.

Cloud Logging үшін жеке {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттарды]} баптауға қолдау көрсетілмейді.

Рөлдерді тек `Жоба иесі`, `Суперадминистратор` және `Пайдаланушылар әкімшісі (IAM)` рөлдері бар жоба қатысушылары ғана {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=тағайындай]} алады. Рөлдерді таңдау кезінде ең аз артықшылықтар қағидатын ұстаныңыз: пайдаланушы өз міндеттерін орындау үшін қажет құқықтарға ғана ие болуы тиіс.

## {heading(Базалық рөлдер)[id=logging-concepts-iam-basic-roles]}

`Жоба иесі`, `Суперадминистратор` және `Жоба әкімшісі` базалық рөлдері Cloud Logging сервисінің барлық операцияларына толық қолжетімділік алады, жекелеген рөлдерді баптаудың қажеті жоқ.

### {heading(mcs_owner)[id=logging-concepts-iam-basic-roles-mcs_owner]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_owner]}

### {heading(mcs_co_owner)[id=logging-concepts-iam-basic-roles-mcs_co_owner]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_co_owner]}

### {heading(mcs_admin)[id=logging-concepts-iam-basic-roles-mcs_admin]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_admin]}

### {heading(mcs_admin_security)[id=logging-concepts-iam-basic-roles-mcs_admin_security]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_admin_security]}

### {heading(mcs_viewer)[id=logging-concepts-iam-basic-roles-mcs_viewer]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_viewer]}

## {heading(Мамандандырылған рөлдер)[id=logging-concepts-iam-special-roles]}

Cloud Logging үшін өзінің мамандандырылған рөлдері жоқ, бірақ {var(cloud)} басқа сервистеріне арналған мамандандырылған рөлдерде белгілі бір әрекеттерге құқықтар бар.

### {heading(mcs_admin_billing)[id=logging-concepts-iam-special-mcs_admin_billing]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_admin_billing]}

### {heading(mcs_admin_network)[id=logging-concepts-iam-special-mcs_admin_network]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_admin_network]}

### {heading(mcs_admin_network_security)[id=logging-concepts-iam-special-mcs_admin_network_security]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_admin_network_security]}

### {heading(mcs_admin_network_objects)[id=logging-concepts-iam-special-mcs_admin_network_objects]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_admin_network_objects]}

### {heading(mcs_k8s_viewer)[id=logging-concepts-iam-special-mcs_k8s_viewer]}

{include(/kz/_includes/_iam_roles.md)[tags=k8s-viewer-managed]}

### {heading(mcs_k8s_editor)[id=logging-concepts-iam-special-mcs_k8s_editor]}

{include(/kz/_includes/_iam_roles.md)[tags=k8s-editor-managed]}

### {heading(mcs_k8s_admin)[id=logging-concepts-iam-special-mcs_k8s_admin]}

{include(/kz/_includes/_iam_roles.md)[tags=k8s-admin-managed]}

### {heading(mcs_admin_vm)[id=logging-concepts-iam-special-mcs_admin_vm]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_admin_vm]}

### {heading(mcs_admin_vm_junior)[id=logging-concepts-iam-special-mcs_admin_vm_junior]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_admin_vm_junior]}

### {heading(mcs_operator_vm)[id=logging-concepts-iam-special-mcs_operator_vm]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_operator_vm]}
