# {heading(Управление доступом)[id=trino-concepts-iam]}

Чтобы разграничить права для {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=приглашенных]} участников {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проекта]} или {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервисных учетных записей]}, в Cloud Trino используется единый сервис управления идентификацией и доступом — {linkto(../../../../access/iam#iam)[text=IAM]}. Управлять доступами можно централизованно из личного кабинета {var(cloud)}.

Список доступных участнику проекта действий в сервисе Cloud Trino определяет:
- Присвоенная {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference#iam-roles-reference-basic)[text=базовая роль]} — задает набор {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешений]}, доступных по умолчанию. {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=Специализированные роли]} для Cloud Trino отсутствуют.

    Базовые роли `Владелец проекта`, `Суперадминистратор` и `Администратор проекта` получают полный доступ ко всем операциям Cloud Trino, настраивать отдельные {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешения]} не нужно.

- Отдельные {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешения]} — {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-invite-user)[text=назначаются]} дополнительно, если входящих в {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=базовую роль]} недостаточно.

    {note:info}

    Доступы, предоставляемые вместе базовой ролью, имеют приоритет над отдельными разрешениями.

    {/note}

При выдаче ролей и разрешений придерживайтесь принципа минимальных привилегий: пользователь должен иметь только те права, без которых невозможно выполнить его задачи.

## {heading(Пример ролевой модели)[id=trino-concepts-iam-example]}

{note:info}

Роли и разрешения могут {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-invite-user)[text=назначать]} только участники проекта с ролями `Владелец проекта`, `Суперадминистратор` и `Администратор пользователей (IAM)`.

{/note}

Для сервиса Cloud Trino нет {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=специализированных ролей]}. Для разграничения доступа может использоваться {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference#iam-roles-reference-basic)[text=базовая роль]} `Администратор пользователей (IAM)` или `Наблюдатель` с дополнительными {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешениями]}. По умолчанию доступ к Cloud Trino у этих базовых ролей ограничен:

- `Администратор пользователей (IAM)`: нет доступа.
- `Наблюдатель`: только просмотр части информации о ранее созданных экземплярах сервиса Cloud Trino.

Вы можете выдать любые {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешения]}, создав подходящую для вас ролевую модель.

### {heading(Полный доступ)[id=trino-concepts-iam-example-full-access]} 

Разрешены все действия, в том числе создание и удаление экземпляров сервиса Cloud Trino. Участник проекта с широкими компетенциями и высокой долей ответственности может использовать этот уровень доступа. Создание новых экземпляров сервиса может увеличить затраты на инфраструктуру, а удаление — безвозвратная операция, способная нарушить работу приложения, которое использует ваш экземпляр сервиса Cloud Trino.

{cut(Полный список разрешений, доступных в Cloud Trino)}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_logs_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_versionupdate]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_monitoring_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_ui]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_reboot]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_viewhistory]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_install]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_audit]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_execsql]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_uninstall]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_scaledisk]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_update]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_maintenance]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_list]}

{/cut}

### {heading(Администрирование инфраструктуры)[id=trino-concepts-iam-example-admin]}

Имеет почти все разрешения, кроме создания и удаления экземпляров сервиса Cloud Trino. Может использоваться участником проекта, выполняющим роль оператора инфраструктуры или DevOps-инженера для управления уже созданными экземплярами сервиса. Также предполагает влияние на стоимость услуг, но только за счет масштабирования уже существующих экземпляров сервиса.

{cut(Список разрешений для администрирования инфраструктуры)}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_logs_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_versionupdate]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_monitoring_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_ui]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_reboot]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_viewhistory]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_install]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_audit]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_execsql]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_uninstall]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_scaledisk]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_update]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_maintenance]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_list]}

{/cut}

### {heading(Использование сервиса)[id=trino-concepts-iam-example-usage]}

Не имеет доступа к управлению экземплярами сервиса, может только просматривать информацию о них, за исключением данных для аудита. Также имеет доступ к выполнению SQL-запросов через консоль в личном кабинете, может использоваться участниками проекта, которые работают с данными, например, разработчиками или аналитиками.

{cut(Список разрешений для использования сервиса)}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_monitoring_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_execsql]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_list]}

{/cut}

### {heading(Аудит безопасности)[id=trino-concepts-iam-example-security-audit]}

Не может изменять параметры экземпляра сервиса Cloud Trino и не имеет доступа к консоли в личном кабинете. Используется исключительно для аудита: изучение логов и истории событий, а также просмотр списка пользователей. Как правило, подходит для сотрудников службы безопасности.

{cut(Список разрешений для аудита безопасности)}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_logs_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_monitoring_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_audit]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_list]}

{/cut}