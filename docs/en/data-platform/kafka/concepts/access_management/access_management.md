# {heading(Access management in VK Private Cloud)[id=kafka-concepts-iam]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Role model example)[id=kafka-concepts-iam-example]}

{note:info}
Only project participants with the `Project Owner` and `Project Co-Owner` roles can assign roles and permissions. For more information, see the {var(cloud)} Administrator Guide document in the section [Granting access to a project](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/access_management/project).
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Full access)[id=kafka-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(Full list of permissions available in Cloud Kafka)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_maintenance]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_scaledisk]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_updateinfo]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_versionupdate]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_mirrormaker_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_mirrormaker_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_mirrormaker_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_settings_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_users_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_users_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_users_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_users_update]}

{/cut}

### {heading(Infrastructure administration)[id=kafka-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(List of permissions for administering Cloud Kafka infrastructure)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_maintenance]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_scaledisk]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_updateinfo]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_versionupdate]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_mirrormaker_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_mirrormaker_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_mirrormaker_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_settings_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_users_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_users_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_users_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_users_update]}

{/cut}

### {heading(Using the service)[id=kafka-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(List of permissions for using the Cloud Kafka service)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_mirrormaker_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_users_list]}

{/cut}

### {heading(Security audit)[id=kafka-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(List of permissions for the Cloud Kafka security audit)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_users_list]}

{/cut}