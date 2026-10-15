# {heading(Управление доступом)[id=sm-concepts-iam]}

Чтобы разграничить права для {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=приглашенных]} участников {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проекта]} или {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервисных учетных записей]}, в менеджере секретов используется единый сервис управления идентификацией и доступом — {linkto(../../../../access/iam#iam)[text=IAM]}. Управлять доступами можно централизованно из личного кабинета {var(cloud)}.

Список доступных участнику проекта действий в менеджере секретов определяет:

- {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=Базовая роль]} — задает набор прав, доступных по умолчанию.
- Отдельные {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешения]} — {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=назначаются]} дополнительно, если входящих в {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=базовую роль]} недостаточно.

Для менеджера секретов нет {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=специализированных ролей]}.

Роли и разрешения могут {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=назначать]} только участники проекта с ролями `Владелец проекта`, `Суперадминистратор` и `Администратор пользователей (IAM)`. При выдаче ролей и разрешений придерживайтесь принципа минимальных привилегий: пользователь должен иметь только те права, без которых невозможно выполнить его задачи.

## {heading(Разрешения)[id=sm-concepts-iam-permissions]}

Базовые роли `Владелец проекта`, `Суперадминистратор` и `Администратор проекта` получают полный доступ к менеджеру секретов, настраивать отдельные разрешения не нужно.

Для остальных базовых ролей доступ к менеджеру секретов можно настроить с помощью отдельных разрешений:

{include(/ru/_includes/_iam_permissions.md)[tags=mcs_kms_reader]}

{include(/ru/_includes/_iam_permissions.md)[tags=mcs_kms_writer]}
