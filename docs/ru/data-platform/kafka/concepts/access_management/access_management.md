# {heading(Управление доступом в VK Private Cloud)[id=kafka-concepts-iam]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Пример ролевой модели)[id=kafka-concepts-iam-example]}

{note:info}
Роли и разрешения могут назначать только участники проекта с ролями `Владелец проекта` и `Совладелец проекта`. Подробнее — в документе Руководство администратора {var(cloud)} в разделе [Предоставление доступа к проекту](https://cloud.vk.com/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/access_management/project).
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Полный доступ)[id=kafka-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(Полный список разрешений, доступных в Cloud Kafka)}

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

### {heading(Администрирование инфраструктуры)[id=kafka-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(Список разрешений для администрирования инфраструктуры Cloud Kafka)}

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

### {heading(Использование сервиса)[id=kafka-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(Список разрешений для использования сервиса Cloud Kafka)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_mirrormaker_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_users_list]}

{/cut}

### {heading(Аудит безопасности)[id=kafka-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(Список разрешений для аудита безопасности Cloud Kafka)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_users_list]}

{/cut}