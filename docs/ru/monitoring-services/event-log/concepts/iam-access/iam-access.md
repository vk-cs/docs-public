# {heading(Управление доступом)[id=event-log-concepts-iam]}

Чтобы разграничить права для {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=приглашенных]} участников {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проекта]} или {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервисных учетных записей]}, в Cloud Audit используется единый сервис управления идентификацией и доступом — {linkto(../../../../access/iam#iam)[text=IAM]}. Управлять доступами можно централизованно из личного кабинета {var(cloud)}.

Список доступных участнику проекта действий в сервисе Cloud Audit определяет:

- {linkto(#event-log-concepts-iam-basic-roles)[text=Базовая роль]} — определяет права пользователя на уровне всех сервисов {var(cloud)}.
- {linkto(#event-log-concepts-iam-special-roles)[text=Специализированная роль]} — определяет права пользователя на уровне отдельных сервисов {var(cloud)}.

Настройка отдельных {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешений]} для Cloud Audit не поддерживается.

Роли могут {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=назначать]} только участники проекта с ролями `Владелец проекта`, `Суперадминистратор` и `Администратор пользователей (IAM)`. Выбирая роли, придерживайтесь принципа минимальных привилегий: пользователь должен иметь только те права, без которых невозможно выполнить его задачи.

## {heading(Базовые роли)[id=event-log-concepts-iam-basic-roles]}

Базовые роли `Владелец проекта`, `Суперадминистратор` и `Администратор проекта` получают полный доступ ко всем операциям Cloud Audit, настраивать отдельные роли не нужно.

### {heading(mcs_owner)[id=event-log-concepts-iam-basic-roles-mcs_owner]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_owner]}

### {heading(mcs_co_owner)[id=event-log-concepts-iam-basic-roles-mcs_co_owner]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_co_owner]}

### {heading(mcs_admin)[id=event-log-concepts-iam-basic-roles-mcs_admin]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin]}

### {heading(mcs_admin_security)[id=event-log-concepts-iam-basic-roles-mcs_admin_security]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_security]}

### {heading(mcs_viewer)[id=event-log-concepts-iam-basic-roles-mcs_viewer]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_viewer]}

## {heading(Специализированные роли)[id=event-log-concepts-iam-special-roles]}

Для Cloud Audit своих специализированных ролей нет, но права на определенные действия есть у специализированных ролей для других сервисов {var(cloud)}.

### {heading(mcs_admin_billing)[id=event-log-concepts-iam-special-mcs_admin_billing]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_billing]}

### {heading(mcs_admin_network)[id=event-log-concepts-iam-special-mcs_admin_network]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_network]}

### {heading(mcs_admin_network_security)[id=event-log-concepts-iam-special-mcs_admin_network_security]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_network_security]}

### {heading(mcs_admin_network_objects)[id=event-log-concepts-iam-special-mcs_admin_network_objects]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_network_objects]}

### {heading(mcs_k8s_viewer)[id=event-log-concepts-iam-special-mcs_k8s_viewer]}

{include(/ru/_includes/_iam_roles.md)[tags=k8s-viewer-managed]}

### {heading(mcs_k8s_editor)[id=event-log-concepts-iam-special-mcs_k8s_editor]}

{include(/ru/_includes/_iam_roles.md)[tags=k8s-editor-managed]}

### {heading(mcs_k8s_admin)[id=event-log-concepts-iam-special-mcs_k8s_admin]}

{include(/ru/_includes/_iam_roles.md)[tags=k8s-admin-managed]}

### {heading(mcs_admin_vm)[id=event-log-concepts-iam-special-mcs_admin_vm]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_vm]}

### {heading(mcs_admin_vm_junior)[id=event-log-concepts-iam-special-mcs_admin_vm_junior]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_vm_junior]}

### {heading(mcs_operator_vm)[id=event-log-concepts-iam-special-mcs_operator_vm]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_operator_vm]}
