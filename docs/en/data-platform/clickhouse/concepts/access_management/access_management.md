# {heading(Access management in VK Private Cloud)[id=clickhouse-concepts-iam]}

{include(/en/_includes/_translated_by_ai.md)}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Role model example)[id=clickhouse-concepts-iam-example]}

{note:info}
Only project participants with the `Project Owner` and `Project Co-owner` roles can assign roles and permissions. For more information, see the {var(cloud)} Administrator Guide, section [Granting access to a project](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/access_management/project).
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Full access)[id=clickhouse-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(Full list of permissions available in Cloud ClickHouse)}

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

### {heading(Infrastructure administration)[id=clickhouse-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(List of permissions for Cloud ClickHouse infrastructure administration)}

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

### {heading(Service usage)[id=clickhouse-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(List of permissions for using the Cloud ClickHouse service)}

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

### {heading(Security audit)[id=clickhouse-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(List of permissions for Cloud ClickHouse security audit)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_users_list]}

{/cut}
