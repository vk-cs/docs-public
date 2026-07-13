# {heading(Управление доступом в VK Private Cloud)[id=lakekeeper-concepts-iam]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Пример ролевой модели)[id=lakekeeper-concepts-iam-example]}

{note:info}
Роли и разрешения могут назначать только участники проекта с ролями `Владелец проекта` и `Совладелец проекта`. Подробнее — в документе Руководство администратора {var(cloud)} в разделе [Предоставление доступа к проекту](https://cloud.vk.com/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/access_management/project).
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Полный доступ)[id=lakekeeper-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(Полный список разрешений, доступных в Lakekeeper)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_backups_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_connections_install]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_connections_uninstall]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_connections_update]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_connections_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_extensions_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_innerips_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_maintenance]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_scaledisk]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_updateinfo]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_versionupdate]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_rbac_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_rbac_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_rbac_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_settings_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_users_viewhistory]}

{/cut}

### {heading(Администрирование инфраструктуры)[id=lakekeeper-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(Список разрешений для администрирования инфраструктуры Lakekeeper)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_backups_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_connections_install]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_connections_uninstall]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_connections_update]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_connections_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_extensions_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_innerips_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_maintenance]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_scaledisk]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_updateinfo]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_versionupdate]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_rbac_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_rbac_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_rbac_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_settings_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_users_viewhistory]}

{/cut}

### {heading(Использование сервиса)[id=lakekeeper-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(Список разрешений для использования сервиса Lakekeeper)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_rbac_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_settings_viewhistory]}

{/cut}

### {heading(Аудит безопасности)[id=lakekeeper-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(Список разрешений для аудита безопасности Lakekeeper)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_monitoring_view]}

{/cut}