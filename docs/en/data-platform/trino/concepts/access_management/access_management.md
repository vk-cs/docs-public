# {heading(Access management in VK Private Cloud)[id=trino-concepts-iam]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Role model example)[id=trino-concepts-iam-example]}

{note:info}
Roles and permissions can be assigned only by project members with the `Project owner` and `Project co-owner` roles. For more information, see the {var(cloud)} Administrator Guide in the [Granting access to a project](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/access_management/project) section.
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Full access)[id=trino-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(Full list of permissions available in Cloud Trino)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_settings_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_extensions_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_versionupdate]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_ui]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_users_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_users_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_extensions_install]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_extensions_uninstall]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_scaledisk]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_users_update]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_maintenance]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_users_list]}

{/cut}

### {heading(Infrastructure administration)[id=trino-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(List of permissions for administering Cloud Trino infrastructure)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_settings_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_extensions_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_versionupdate]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_ui]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_users_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_users_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_extensions_install]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_extensions_uninstall]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_scaledisk]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_users_update]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_maintenance]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_users_list]}

{/cut}

### {heading(Using the service)[id=trino-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(List of permissions for using the Cloud Trino service)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_extensions_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_users_list]}

{/cut}

### {heading(Security audit)[id=trino-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(List of permissions for auditing Cloud Trino security)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_users_list]}

{/cut}