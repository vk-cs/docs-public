# {heading(Управление доступом)[id=iaas-concepts-iam]}

Чтобы разграничить права для {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=приглашенных]} участников {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проекта]} или {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервисных учетных записей]}, в Cloud Servers используется единый сервис управления идентификацией и доступом — {linkto(../../../../access/iam#iam)[text=IAM]}. Управлять доступами можно централизованно из личного кабинета {var(cloud)}.

Список доступных участнику проекта действий в сервисе Cloud Servers определяет:
- Присвоенная {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference#iam-roles-reference-basic)[text=базовая роль]} — задает набор действий, доступных по умолчанию.

    Базовые роли `Владелец проекта`, `Суперадминистратор` и `Администратор проекта` получают полный доступ ко всем операциям во всех сервисах.

- Отдельная {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=специализированная роль]} — {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=назначается]} дополнительно, если прав, входящих в {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=базовую роль]}, недостаточно. Настройка отдельных {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешений]} для Cloud Servers не поддерживается.

    {note:info}
    Доступы, предоставляемые вместе базовой ролью, имеют приоритет над отдельными специализированными ролями.
    {/note}

При выдаче ролей придерживайтесь принципа минимальных привилегий: пользователь должен иметь только те права, без которых невозможно выполнить его задачи.

## {heading(Специализированные роли)[id=iaas-concepts-iam-special-roles]}

{note:info}

Специализированные роли могут {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=назначать]} только участники проекта с ролями `Владелец проекта`, `Суперадминистратор` и `Администратор пользователей (IAM)`.

{/note}

Для сервиса Cloud Servers доступно несколько {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=специализированных ролей]}, которые можно использовать дополнительно к {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=базовым ролям]} `Администратор пользователей (IAM)` или `Наблюдатель`. По умолчанию доступ к Cloud Servers у этих базовых ролей ограничен:

- `Администратор пользователей (IAM)`: нет доступа.
- `Наблюдатель`: только просмотр информации о ранее созданных ресурсах.

### {heading(mcs_admin_vm)[id=iaas-concepts-iam-special-roles-mcs_admin_vm]}

{include(/ru/_includes/_iam_iaas.md)[tags=mcs_admin_vm]}

### {heading(mcs_junior_admin_vm)[id=iaas-concepts-iam-special-roles-mcs_junior_admin_vm]}

{include(/ru/_includes/_iam_iaas.md)[tags=mcs_junior_admin_vm]}

### {heading(mcs_operator_vm)[id=iaas-concepts-iam-special-roles-mcs_operator_vm]}

{include(/ru/_includes/_iam_iaas.md)[tags=mcs_operator_vm]}