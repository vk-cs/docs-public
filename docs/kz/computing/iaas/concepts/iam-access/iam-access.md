# {heading(Қолжетімділікті басқару)[id=iaas-concepts-iam]}

{linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=Шақырылған]} {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=жоба]} қатысушыларының немесе {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервистік есептік жазбалардың]} құқықтарын шектеу үшін Cloud Servers сервисінде сәйкестендіру және қолжетімділікті басқарудың бірыңғай сервисі — {linkto(../../../../access/iam#iam)[text=IAM]} қолданылады. Қолжетімділіктерді {var(cloud)} жеке кабинетінен орталықтандырылған түрде басқаруға болады.

Cloud Servers сервисінде жоба қатысушысына қолжетімді әрекеттер тізімін мыналар анықтайды:

- {linkto(#iaas-concepts-iam-basic-roles)[text=Базалық рөл]} — {var(cloud)} барлық сервистері деңгейінде пайдаланушы құқықтарын анықтайды.
- {linkto(#iaas-concepts-iam-special-roles)[text=Мамандандырылған рөл]} — {var(cloud)} жекелеген сервистері деңгейінде пайдаланушы құқықтарын анықтайды.

Cloud Servers үшін жеке {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттарды]} баптауға қолдау көрсетілмейді.

Рөлдерді тек `Жоба иесі`, `Суперадминистратор` және `Пайдаланушылар әкімшісі (IAM)` рөлдері бар жоба қатысушылары ғана {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=тағайындай]} алады. Рөлдерді таңдау кезінде ең аз артықшылықтар қағидатын ұстаныңыз: пайдаланушы өз міндеттерін орындау үшін қажет құқықтарға ғана ие болуы тиіс.

## {heading(Базалық рөлдер)[id=iaas-concepts-iam-basic-roles]}

`Жоба иесі`, `Суперадминистратор` және `Жоба әкімшісі` базалық рөлдері Cloud Servers сервисінің барлық операцияларына толық қолжетімділік алады, жекелеген рөлдерді баптаудың қажеті жоқ.

### {heading(mcs_owner)[id=iaas-concepts-iam-basic-roles-mcs_owner]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_owner]}

### {heading(mcs_co_owner)[id=iaas-concepts-iam-basic-roles-mcs_co_owner]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_co_owner]}

### {heading(mcs_admin)[id=iaas-concepts-iam-basic-roles-mcs_admin]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_admin]}

### {heading(mcs_admin_security)[id=iaas-concepts-iam-basic-roles-mcs_admin_security]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_admin_security]}

### {heading(mcs_viewer)[id=iaas-concepts-iam-basic-roles-mcs_viewer]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_viewer]}

## {heading(Мамандандырылған рөлдер)[id=iaas-concepts-iam-special-roles]}

Cloud Servers сервисі үшін {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=базалық рөлмен]} бірге немесе жеке пайдалануға болатын бірнеше {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=мамандандырылған рөлдер]} қолжетімді.

### {heading(mcs_admin_vm)[id=iaas-concepts-iam-special-roles-mcs_admin_vm]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_admin_vm]}

### {heading(mcs_admin_vm_junior)[id=iaas-concepts-iam-special-roles-mcs_admin_vm_junior]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_admin_vm_junior]}

### {heading(mcs_operator_vm)[id=iaas-concepts-iam-special-roles-mcs_operator_vm]}

{include(/kz/_includes/_iam_roles.md)[tags=mcs_operator_vm]}
