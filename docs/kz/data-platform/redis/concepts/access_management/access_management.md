# {heading(VK Private Cloud-та қолжетімділікті басқару)[id=redis-concepts-iam]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Рөлдік моделінің мысалы)[id=redis-concepts-iam-example]}

{note:info}
Рөлдерді және рұқсаттарды тек `Жоба иесі` және `Жоба серіктес иесі` рөлдері бар жоба қатысушылары тағайындай алады. Толығырақ — {var(cloud)} әкімшісінің нұсқаулығы құжатының [Жобаға қолжетімділік беру](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/access_management/project) бөлімінде.
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Толық қолжетімділік)[id=redis-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(Redis-те қолжетімді рұқсаттардың толық тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_backups_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_innerips_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_maintenance]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_scaledisk]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_updateinfo]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_versionupdate]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_settings_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_users_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_users_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_users_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_users_update]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_users_viewhistory]}

{/cut}

### {heading(Инфрақұрылымды әкімшілік ету)[id=redis-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(Redis инфрақұрылымын әкімшілік етуге арналған рұқсаттар тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_backups_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_innerips_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_maintenance]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_scaledisk]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_updateinfo]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_versionupdate]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_settings_change]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_users_create]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_users_delete]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_users_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_users_update]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_users_viewhistory]}

{/cut}

### {heading(Сервисті пайдалану)[id=redis-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(Redis сервісін пайдалануға арналған рұқсаттар тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_users_list]}

{/cut}

### {heading(Қауіпсіздікті аудиттеу)[id=redis-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(Redis қауіпсіздігін аудиттеуге арналған рұқсаттар тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_redis_users_list]}

{/cut}