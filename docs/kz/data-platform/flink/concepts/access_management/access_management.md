# {heading(VK Private Cloud-та қолжетімділікті басқару)[id=flink-concepts-iam]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Рөлдік модельдің мысалы)[id=flink-concepts-iam-example]}

{note:info}
Рөлдерді және рұқсаттарды тек `Жоба иесі` және `Жоба серіктес иесі` рөлдері бар жоба қатысушылары ғана тағайындай алады. Толығырақ — {var(cloud)} әкімшісінің нұсқаулығы құжатының [Жобаға қолжетімділік беру](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/access_management/project) бөлімінде.
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Толық қолжетімділік)[id=flink-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(Cloud Flink-те қолжетімді рұқсаттардың толық тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_backups_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_connections_install]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_connections_uninstall]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_connections_update]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_connections_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_extensions_install]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_extensions_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_extensions_uninstall]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_extensions_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_innerips_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_maintenance]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_scaledisk]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_updateinfo]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_versionupdate]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_settings_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_users_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_users_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_users_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_users_update]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_users_viewhistory]}

{/cut}

### {heading(Инфрақұрылымды әкімшіліктеру)[id=flink-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(Cloud Flink инфрақұрылымын әкімшіліктеруге арналған рұқсаттар тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_backups_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_connections_install]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_connections_uninstall]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_connections_update]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_connections_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_extensions_install]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_extensions_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_extensions_uninstall]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_extensions_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_innerips_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_maintenance]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_scaledisk]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_updateinfo]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_versionupdate]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_settings_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_users_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_users_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_users_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_users_update]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_users_viewhistory]}

{/cut}

### {heading(Сервисті пайдалану)[id=flink-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(Cloud Flink сервисін пайдалануға арналған рұқсаттар тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_extensions_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_users_list]}

{/cut}

### {heading(Қауіпсіздікті аудиттеу)[id=flink-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(Cloud Flink қауіпсіздігін аудиттеуге арналған рұқсаттар тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_flinkatom_users_list]}

{/cut}