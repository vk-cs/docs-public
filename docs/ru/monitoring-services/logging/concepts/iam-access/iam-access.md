# {heading(Управление доступом)[id=logging-concepts-iam]}

Чтобы разграничить права для {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=приглашенных]} участников {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проекта]} или {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервисных учетных записей]}, в Cloud Logging используется единый сервис управления идентификацией и доступом — {linkto(../../../../access/iam#iam)[text=IAM]}. Управлять доступами можно централизованно из личного кабинета {var(cloud)}.

Список доступных участнику проекта действий в сервисе Cloud Logging определяет:

- {linkto(#logging-concepts-iam-basic-roles)[text=Базовая роль]} — определяет права пользователя на уровне всех сервисов {var(cloud)}.
- {linkto(#logging-concepts-iam-special-roles)[text=Специализированная роль]} — определяет права пользователя на уровне отдельных сервисов {var(cloud)}.

Настройка отдельных {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешений]} для Cloud Logging не поддерживается.

Роли могут {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=назначать]} только участники проекта с ролями `Владелец проекта`, `Суперадминистратор` и `Администратор пользователей (IAM)`. Выбирая роли, придерживайтесь принципа минимальных привилегий: пользователь должен иметь только те права, без которых невозможно выполнить его задачи.

## {heading(Базовые роли)[id=logging-concepts-iam-basic-roles]}

Базовые роли `Владелец проекта`, `Суперадминистратор` и `Администратор проекта` получают полный доступ ко всем операциям Cloud Logging, настраивать отдельные роли не нужно.

### {heading(mcs_owner)[id=logging-concepts-iam-basic-roles-mcs_owner]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_owner]}

### {heading(mcs_co_owner)[id=logging-concepts-iam-basic-roles-mcs_co_owner]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_co_owner]}

### {heading(mcs_admin)[id=logging-concepts-iam-basic-roles-mcs_admin]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin]}

### {heading(mcs_admin_security)[id=logging-concepts-iam-basic-roles-mcs_admin_security]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_security]}

### {heading(mcs_viewer)[id=logging-concepts-iam-basic-roles-mcs_viewer]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_viewer]}

## {heading(Специализированные роли)[id=logging-concepts-iam-special-roles]}

Для Cloud Logging своих специализированных ролей нет, но права на определенные действия есть у специализированных ролей для других сервисов {var(cloud)}.

### {heading(mcs_admin_billing)[id=logging-concepts-iam-special-mcs_admin_billing]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_billing]}

### {heading(mcs_admin_network)[id=logging-concepts-iam-special-mcs_admin_network]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_network]}

### {heading(mcs_admin_network_security)[id=logging-concepts-iam-special-mcs_admin_network_security]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_network_security]}

### {heading(mcs_admin_network_objects)[id=logging-concepts-iam-special-mcs_admin_network_objects]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_network_objects]}

### {heading(mcs_k8s_viewer)[id=logging-concepts-iam-special-mcs_k8s_viewer]}

{include(/ru/_includes/_iam_roles.md)[tags=k8s-viewer-managed]}

### {heading(mcs_k8s_editor)[id=logging-concepts-iam-special-mcs_k8s_editor]}

{include(/ru/_includes/_iam_roles.md)[tags=k8s-editor-managed]}

### {heading(mcs_k8s_admin)[id=logging-concepts-iam-special-mcs_k8s_admin]}

{include(/ru/_includes/_iam_roles.md)[tags=k8s-admin-managed]}

### {heading(mcs_admin_vm)[id=logging-concepts-iam-special-mcs_admin_vm]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_vm]}

### {heading(mcs_admin_vm_junior)[id=logging-concepts-iam-special-mcs_admin_vm_junior]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_vm_junior]}

### {heading(mcs_operator_vm)[id=logging-concepts-iam-special-mcs_operator_vm]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_operator_vm]}
