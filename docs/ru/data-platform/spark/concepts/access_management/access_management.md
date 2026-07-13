# {heading(Управление доступом в VK Private Cloud)[id=spark-concepts-iam]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Пример ролевой модели)[id=spark-concepts-iam-example]}

{note:info}
Роли и разрешения могут назначать только участники проекта с ролями `Владелец проекта` и `Совладелец проекта`. Подробнее — в документе Руководство администратора {var(cloud)} в разделе [Предоставление доступа к проекту](https://cloud.vk.com/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/access_management/project).
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Полный доступ)[id=spark-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(Полный список разрешений, доступных в Cloud Spark)}

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

### {heading(Администрирование инфраструктуры)[id=spark-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(Список разрешений для администрирования инфраструктуры Cloud Spark)}

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

### {heading(Использование сервиса)[id=spark-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(Список разрешений для использования сервиса Cloud Spark)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_ui]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_monitoring_view]}

{/cut}

### {heading(Аудит безопасности)[id=spark-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(Список разрешений для аудита безопасности Cloud Spark)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_monitoring_view]}

{/cut}