# {heading(Access management in VK Private Cloud)[id=nifi-concepts-iam]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Role model example)[id=nifi-concepts-iam-example]}

{note:info}
Only project members with the `Project owner` and `Project co-owner` roles can assign roles and permissions. For more information, see the {var(cloud)} Administrator Guide document, in the [Granting project access](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/access_management/project) section.
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Full access)[id=nifi-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(Full list of permissions available in NiFi)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_backups_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_connections_install]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_connections_uninstall]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_connections_update]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_connections_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_extensions_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_innerips_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_maintenance]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_scaledisk]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_ui]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_updateinfo]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_versionupdate]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_users_viewhistory]}

{/cut}

### {heading(Infrastructure administration)[id=nifi-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(List of permissions for NiFi infrastructure administration)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_backups_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_connections_install]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_connections_uninstall]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_connections_update]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_connections_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_extensions_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_innerips_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_maintenance]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_scaledisk]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_ui]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_updateinfo]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_versionupdate]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_users_viewhistory]}

{/cut}

### {heading(Using the service)[id=nifi-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(List of permissions for using the NiFi service)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_ui]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_monitoring_view]}

{/cut}

### {heading(Security audit)[id=nifi-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(List of permissions for NiFi security audit)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_monitoring_view]}

{/cut}