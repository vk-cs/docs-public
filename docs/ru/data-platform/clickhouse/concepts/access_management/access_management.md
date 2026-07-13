# {heading(Управление доступом в VK Private Cloud)[id=clickhouse-concepts-iam]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Пример ролевой модели)[id=clickhouse-concepts-iam-example]}

{note:info}
Роли и разрешения могут назначать только участники проекта с ролями `Владелец проекта` и `Совладелец проекта`. Подробнее — в документе Руководство администратора {var(cloud)} в разделе [Предоставление доступа к проекту](https://cloud.vk.com/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/access_management/project).
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Полный доступ)[id=clickhouse-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(Полный список разрешений, доступных в Cloud ClickHouse)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_backups_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_backups_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_backups_restore]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_backups_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_connections_install]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_connections_uninstall]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_connections_update]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_connections_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_databases_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_extensions_install]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_extensions_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_extensions_uninstall]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_extensions_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_innerips_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_maintenance]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_scaledisk]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_updateinfo]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_versionupdate]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_settings_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_users_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_users_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_users_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_users_update]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_users_viewhistory]}

{/cut}

### {heading(Администрирование инфраструктуры)[id=clickhouse-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(Список разрешений для администрирования инфраструктуры Cloud ClickHouse)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_backups_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_backups_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_backups_restore]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_backups_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_connections_install]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_connections_uninstall]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_connections_update]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_connections_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_databases_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_extensions_install]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_extensions_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_extensions_uninstall]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_extensions_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_innerips_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_maintenance]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_scaledisk]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_updateinfo]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_versionupdate]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_settings_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_users_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_users_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_users_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_users_update]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_users_viewhistory]}

{/cut}

### {heading(Использование сервиса)[id=clickhouse-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(Список разрешений для использования сервиса Cloud ClickHouse)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_databases_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_extensions_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_users_list]}

{/cut}

### {heading(Аудит безопасности)[id=clickhouse-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(Список разрешений для аудита безопасности Cloud ClickHouse)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_users_list]}

{/cut}