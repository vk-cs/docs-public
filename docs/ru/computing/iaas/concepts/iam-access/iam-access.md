# {heading(Управление доступом)[id=iaas-concepts-iam]}

Чтобы разграничить права для {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=приглашенных]} участников {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проекта]} или {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервисных учетных записей]}, в Cloud Servers используется единый сервис управления идентификацией и доступом — {linkto(../../../../access/iam#iam)[text=IAM]}. Управлять доступами можно централизованно из личного кабинета {var(cloud)}.

Список доступных участнику проекта действий в сервисе Cloud Servers определяет:

- {linkto(#iaas-concepts-iam-basic-roles)[text=Базовая роль]} — определяет права пользователя на уровне всех сервисов {var(cloud)}.
- {linkto(#iaas-concepts-iam-special-roles)[text=Специализированная роль]} — определяет права пользователя на уровне отдельных сервисов {var(cloud)}.

Настройка отдельных {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешений]} для Cloud Servers не поддерживается.

Роли могут {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=назначать]} только участники проекта с ролями `Владелец проекта`, `Суперадминистратор` и `Администратор пользователей (IAM)`. Выбирая роли, придерживайтесь принципа минимальных привилегий: пользователь должен иметь только те права, без которых невозможно выполнить его задачи.

## {heading(Базовые роли)[id=iaas-concepts-iam-basic-roles]}

Базовые роли `Владелец проекта`, `Суперадминистратор` и `Администратор проекта` получают полный доступ ко всем операциям Cloud Servers, настраивать отдельные роли не нужно.

### {heading(mcs_owner)[id=iaas-concepts-iam-basic-roles-mcs_owner]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_owner]}

### {heading(mcs_co_owner)[id=iaas-concepts-iam-basic-roles-mcs_co_owner]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_co_owner]}

### {heading(mcs_admin)[id=iaas-concepts-iam-basic-roles-mcs_admin]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin]}

### {heading(mcs_admin_security)[id=iaas-concepts-iam-basic-roles-mcs_admin_security]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_security]}

### {heading(mcs_viewer)[id=iaas-concepts-iam-basic-roles-mcs_viewer]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_viewer]}

## {heading(Специализированные роли)[id=iaas-concepts-iam-special-roles]}

Для сервиса Cloud Servers доступно несколько {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=специализированных ролей]}, которые можно использовать вместе с {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=базовой ролью]} или самостоятельно.

### {heading(mcs_admin_vm)[id=iaas-concepts-iam-special-roles-mcs_admin_vm]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_vm]}

### {heading(mcs_admin_vm_junior)[id=iaas-concepts-iam-special-roles-mcs_admin_vm_junior]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_vm_junior]}

### {heading(mcs_operator_vm)[id=iaas-concepts-iam-special-roles-mcs_operator_vm]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_operator_vm]}