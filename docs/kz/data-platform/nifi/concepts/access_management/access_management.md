# {heading(VK Private Cloud-та қолжетімділікті басқару)[id=nifi-concepts-iam]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Рөлдік моделінің мысалы)[id=nifi-concepts-iam-example]}

{note:info}
Рөлдер мен рұқсаттарды тек `Жоба иесі` және `Жоба серіктес иесі` рөлдері бар жоба қатысушылары тағайындай алады. Толығырақ — {var(cloud)} Әкімшілік нұсқаулығы құжатының [Жобаға қолжетімділік беру](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/access_management/project) бөлімінде.
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Толық қолжетімділік)[id=nifi-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(NiFi-де қолжетімді рұқсаттардың толық тізімі)}

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

### {heading(Инфрақұрылымды әкімшілікке алу)[id=nifi-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(NiFi инфрақұрылымын әкімшілікке алуға арналған рұқсаттар тізімі)}

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

### {heading(Сервисді пайдалану)[id=nifi-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(NiFi сервисін пайдалануға арналған рұқсаттар тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_ui]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_monitoring_view]}

{/cut}

### {heading(Қауіпсіздік аудиті)[id=nifi-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(NiFi қауіпсіздік аудитіне арналған рұқсаттар тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_nifi_monitoring_view]}

{/cut}