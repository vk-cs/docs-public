# {heading(VK Private Cloud-тағы қолжетімділікті басқару)[id=clickhouse-concepts-iam]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Рөлдік моделдің мысалы)[id=clickhouse-concepts-iam-example]}

{note:info}
Рөлдер мен рұқсаттарды тек `Жоба иегері` және `Жоба серіктес иегері` рөлдері бар жоба қатысушылары тағайындай алады. Толығырақ — {var(cloud)} әкімшісінің нұсқаулығы құжатының [Жобаға қолжетімділік беру](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/access_management/project) бөлімінде.
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Толық қолжетімділік)[id=clickhouse-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(Cloud ClickHouse-та қолжетімді рұқсаттардың толық тізімі)}

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

### {heading(Инфрақұрылымды әкімшілендіру)[id=clickhouse-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(Cloud ClickHouse инфрақұрылымын әкімшілендіруге арналған рұқсаттар тізімі)}

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

### {heading(Сервисті пайдалану)[id=clickhouse-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(Cloud ClickHouse сервісін пайдалануға арналған рұқсаттар тізімі)}

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

### {heading(Қауіпсіздікті аудиттеу)[id=clickhouse-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(Cloud ClickHouse қауіпсіздігін аудиттеуге арналған рұқсаттар тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_clickhouse_users_list]}

{/cut}