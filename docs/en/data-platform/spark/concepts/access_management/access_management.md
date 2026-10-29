# {heading(Access management in VK Private Cloud)[id=spark-concepts-iam]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Role model example)[id=spark-concepts-iam-example]}

{note:info}
Roles and permissions can only be assigned by project participants with the `Project Owner` and `Project Co-Owner` roles. For more information, see the {var(cloud)} Administrator Guide in the section [Granting access to a project](https://cloud.vk.ru/docs/on-premises/private-cloud/en/4_3/admin-guide/users_and_access_control/access_management/project).
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Full access)[id=spark-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(Full list of permissions available in Cloud Spark)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_backups_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_connections_install]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_connections_uninstall]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_connections_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_extensions_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_innerips_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_maintenance]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_scaledisk]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_ui]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_updateinfo]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_versionupdate]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_users_viewhistory]}

{/cut}

### {heading(Infrastructure administration)[id=spark-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(List of permissions for Cloud Spark infrastructure administration)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_backups_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_connections_install]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_connections_uninstall]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_connections_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_extensions_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_innerips_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_maintenance]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_scaledisk]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_ui]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_updateinfo]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_versionupdate]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_users_viewhistory]}

{/cut}

### {heading(Service usage)[id=spark-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(List of permissions for using the Cloud Spark service)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_ui]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_monitoring_view]}

{/cut}

### {heading(Security audit)[id=spark-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(List of permissions for Cloud Spark security audit)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_monitoring_view]}

{/cut}