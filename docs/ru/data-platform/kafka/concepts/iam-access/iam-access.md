# {heading(Управление доступом)[id=kafka-concepts-iam]}

Чтобы разграничить права для {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=приглашенных]} участников {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проекта]} или {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервисных учетных записей]}, в Cloud Kafka используется единый сервис управления идентификацией и доступом — {linkto(../../../../access/iam#iam)[text=IAM]}. Управлять доступами можно централизованно из личного кабинета {var(cloud)}.

Список доступных участнику проекта действий в сервисе Cloud Kafka определяет:

- {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=Базовая роль]} — задает набор прав, доступных по умолчанию.
- Отдельные {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешения]} — {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=назначаются]} дополнительно, если входящих в {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=базовую роль]} недостаточно.

    {note:info}
    Для экземпляров сервиса Cloud Kafka, созданных до 15.01.2026, используются разрешения, имена которых начинаются с `dp_kafka_`.  В личном кабинете они отображаются с дополнением `(legacy)` в названии.
    {/note}

Для сервиса Cloud Kafka нет {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=специализированных ролей]}.

Роли и разрешения могут {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=назначать]} только участники проекта с ролями `Владелец проекта`, `Суперадминистратор` и `Администратор пользователей (IAM)`. При выдаче ролей и разрешений придерживайтесь принципа минимальных привилегий: пользователь должен иметь только те права, без которых невозможно выполнить его задачи.

## {heading(Пример ролевой модели)[id=kafka-concepts-iam-example]}

Базовые роли `Владелец проекта`, `Суперадминистратор` и `Администратор проекта` получают полный доступ ко всем операциям Cloud Kafka, настраивать отдельные {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешения]} не нужно.

Для разграничения доступа может использоваться {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=базовая роль]} `Администратор пользователей (IAM)` или `Наблюдатель` с дополнительными {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешениями]}. По умолчанию доступ к Cloud Kafka у этих базовых ролей ограничен:

- `Администратор пользователей (IAM)`: нет доступа.
- `Наблюдатель`: только просмотр части информации о ранее созданных экземплярах сервиса Cloud Kafka.

Вы можете выдать любые {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешения]}, создав подходящую для вас ролевую модель.

### {heading(Полный доступ)[id=kafka-concepts-iam-example-full-access]}

Разрешены все действия, в том числе создание и удаление экземпляров сервиса Cloud Kafka. Участник проекта с широкими компетенциями и высокой долей ответственности может использовать этот уровень доступа. Создание новых экземпляров сервиса может увеличить затраты на инфраструктуру, а удаление — безвозвратная операция, способная нарушить работу приложения, которое использует ваш экземпляр сервиса Cloud Kafka.

{cut(Полный список разрешений, доступных в Cloud Kafka)}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_cruisecontrol]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_ui]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_viewhistory]}

{/cut}

### {heading(Администрирование инфраструктуры)[id=kafka-concepts-iam-example-admin]}

Имеет почти все разрешения, кроме создания и удаления экземпляров сервиса Cloud Kafka. Может использоваться участником проекта, выполняющим роль оператора инфраструктуры или DevOps-инженера для управления уже созданными экземплярами сервиса. Также предполагает влияние на стоимость услуг, но только за счет масштабирования уже существующих экземпляров сервиса.

{cut(Список разрешений для администрирования инфраструктуры)}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_cruisecontrol]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_ui]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_viewhistory]}

{/cut}

### {heading(Использование сервиса)[id=kafka-concepts-iam-example-usage]}

Не имеет доступа к управлению экземплярами сервиса, может только просматривать информацию о них, за исключением данных для аудита. Также позволяет создавать, удалять и просматривать mirror-подключения для репликации данных между кластерами Kafka. Может использоваться участниками проекта, которые работают с данными, например, разработчиками или инженерами данных.

{cut(Список разрешений для использования сервиса)}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_list]}

{/cut}

### {heading(Аудит безопасности)[id=kafka-concepts-iam-example-security-audit]}

Не может изменять параметры экземпляра сервиса Cloud Kafka и не имеет доступа к графическому интерфейсу сервиса в личном кабинете. Используется исключительно для аудита: изучение логов и истории событий, а также просмотр списка пользователей. Как правило, подходит для сотрудников службы безопасности.

{cut(Список разрешений для аудита безопасности)}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_viewhistory]}

{/cut}
