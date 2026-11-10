# {heading(VK Private Cloud-та рұқсаттарды басқару)[id=trino-concepts-iam]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Рөлдік моделінің мысалы)[id=trino-concepts-iam-example]}

{note:info}
Рөлдерді және рұқсаттарды тек `Жоба иесі` және `Жоба серіктес иесі` рөлдері бар жоба қатысушылары тағайындай алады. Толығырақ — {var(cloud)} әкімшісінің нұсқаулығы құжатының [Жобаға қолжетімділік беру](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/access_management/project) бөлімінде.
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Толық қолжетімділік)[id=trino-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(Cloud Trino-да қолжетімді рұқсаттардың толық тізімі)}

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

### {heading(Инфрақұрылымды әкімшілік жүргізу)[id=trino-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(Cloud Trino инфрақұрылымын әкімшілік жүргізуге арналған рұқсаттар тізімі)}

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

### {heading(Сервисті пайдалану)[id=trino-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(Cloud Trino сервісін пайдалануға арналған рұқсаттар тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_extensions_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_users_list]}

{/cut}

### {heading(Қауіпсіздікті аудиттеу)[id=trino-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(Cloud Trino қауіпсіздігін аудиттеуге арналған рұқсаттар тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_trino_users_list]}

{/cut}