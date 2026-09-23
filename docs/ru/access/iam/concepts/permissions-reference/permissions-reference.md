# {heading(Справочник разрешений)[id=iam-permissions-reference]}

Разрешения используются когда предустановленных [ролей](/ru/access/iam/concepts/roles-reference) недостаточно или необходима более тонкая настройка ролевой модели.  

Отдельные разрешения доступны не во всех сервисах. 

## {heading(Менеджер секретов)[id=iam-permissions-kms]}

{include(/ru/_includes/_iam_permissions.md)[tags=mcs_kms_reader]}

{include(/ru/_includes/_iam_permissions.md)[tags=mcs_kms_writer]}

## {heading(Bare Metal)[id=iam-permissions-bm]}

Управление серверами [Bare Metal](/ru/computing/bare-metal).

{include(/ru/_includes/_iam_permissions.md)[tags=bm_console_access]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_flavor_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_flavor_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_image_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_image_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_server_boot_order]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_server_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_server_device_action]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_server_device_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_server_device_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_server_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_server_lock]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_server_power_action]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_server_provision]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_server_rent]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_server_unlock]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_server_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=bm_server_view]}

## {heading(Data Platform Kafka)[id=iam-permissions-dp-kafka]}

Управление сервисом [Cloud Kafka](/ru/data-platform/kafka) на VK Data Platform.

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_instances_cruisecontrol]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_mirrormaker_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_mirrormaker_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_mirrormaker_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_settings_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_settings_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_settings_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_users_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_users_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_users_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafka_users_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_backups_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_backups_download]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_backups_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_backups_restore]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_backups_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_connections_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_connections_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_connections_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_connections_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_connections_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_databases_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_databases_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_databases_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_extensions_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_extensions_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_extensions_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_extensions_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_instances_execsql]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_instances_killquery]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_instances_listqueries]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_settings_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_settings_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_settings_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_users_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_users_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_users_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_users_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_clickhouse_users_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_backups_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_settings_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_settings_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_settings_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_users_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_users_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_users_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_users_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_redis_users_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_backups_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_backups_download]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_backups_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_backups_restore]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_backups_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_databases_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_databases_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_databases_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_extensions_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_extensions_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_extensions_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_extensions_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_instances_execsql]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_instances_killquery]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_instances_listqueries]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_settings_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_settings_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_settings_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_users_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_users_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_users_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_users_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jatoba_users_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_backups_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_connections_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_connections_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_connections_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_connections_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_connections_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_extensions_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_instances_ui]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_nifi_users_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_backups_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_connections_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_connections_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_connections_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_connections_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_connections_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_extensions_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_settings_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_settings_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_settings_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_opensearch_users_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_backups_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_connections_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_connections_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_connections_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_connections_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_connections_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_extensions_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_instances_ui]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_spark_users_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_backups_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_connections_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_connections_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_connections_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_connections_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_connections_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_extensions_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_extensions_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_extensions_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_extensions_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_grants_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_grants_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_grants_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_grants_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_instances_execsql]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_instances_ui]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_settings_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_settings_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_settings_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_users_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_users_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_users_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_users_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_trino_users_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_backups_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_connections_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_connections_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_connections_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_connections_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_connections_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_extensions_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_instances_ui]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_airflowatom_users_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_backups_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_backups_download]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_backups_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_backups_restore]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_backups_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_databases_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_databases_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_databases_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_extensions_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_extensions_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_extensions_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_extensions_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_instances_execsql]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_instances_killquery]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_instances_listqueries]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_settings_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_settings_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_settings_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_users_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_users_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_users_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_users_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_cloudpostgres_users_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_connectionstore_connectionstore]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_backups_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_connections_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_connections_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_connections_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_connections_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_connections_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_extensions_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_extensions_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_extensions_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_extensions_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_instances_killquery]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_instances_listqueries]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_settings_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_settings_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_settings_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_users_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_users_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_users_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_users_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_flinkatom_users_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_backups_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_backups_download]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_backups_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_backups_restore]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_backups_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_databases_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_databases_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_databases_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_extensions_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_extensions_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_extensions_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_extensions_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_instances_execsql]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_instances_killquery]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_instances_listqueries]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_settings_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_settings_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_settings_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_users_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_users_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_users_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_users_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_icebergmetastore_users_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_backups_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_connections_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_connections_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_connections_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_connections_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_connections_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_extensions_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_settings_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_settings_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_settings_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_users_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_users_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_users_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_users_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_jupyterhub_users_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_cruisecontrol]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_ui]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_backups_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_connections_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_connections_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_connections_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_connections_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_connections_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_extensions_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_rbac_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_rbac_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_rbac_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_settings_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_settings_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_settings_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_lakekeeper_users_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_backups_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_connections_install]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_connections_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_connections_uninstall]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_connections_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_connections_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_extensions_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_innerips_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_instances_audit]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_instances_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_instances_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_instances_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_instances_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_instances_maintenance]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_instances_reboot]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_instances_scaledisk]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_instances_updateinfo]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_instances_versionupdate]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_instances_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_instances_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_logs_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_monitoring_view]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_settings_change]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_settings_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_settings_viewhistory]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_users_create]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_users_delete]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_users_list]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_users_update]}

{include(/ru/_includes/_iam_permissions.md)[tags=dp_mlflow_users_viewhistory]}