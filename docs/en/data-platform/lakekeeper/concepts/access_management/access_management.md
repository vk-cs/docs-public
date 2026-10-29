# {heading(Access management in VK Private Cloud)[id=lakekeeper-concepts-iam]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Role model example)[id=lakekeeper-concepts-iam-example]}

{note:info}
Only project participants with the `Project owner` and `Project co-owner` roles can assign roles and permissions. For more information, see the {var(cloud)} Administrator Guide in the [Granting access to a project](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/access_management/project) section.
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Full access)[id=lakekeeper-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(Full list of permissions available in Lakekeeper)}

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

### {heading(Infrastructure administration)[id=lakekeeper-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(List of permissions for administering Lakekeeper infrastructure)}

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

### {heading(Service usage)[id=lakekeeper-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(List of permissions for using the Lakekeeper service)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_rbac_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_settings_viewhistory]}

{/cut}

### {heading(Security audit)[id=lakekeeper-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(List of permissions for Lakekeeper security audit)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_lakekeeper_monitoring_view]}

{/cut}