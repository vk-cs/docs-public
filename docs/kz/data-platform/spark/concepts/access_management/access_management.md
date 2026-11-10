# {heading(VK Private Cloud-та қолжетімділікті басқару)[id=spark-concepts-iam]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Рөлдік модель мысалы)[id=spark-concepts-iam-example]}

{note:info}
Рөлдерді мен рұқсаттарды тек `Жоба иесі` және `Жоба серіктес иесі` рөлдері бар жоба қатысушылары тағайындай алады. Толығырақ — {var(cloud)} әкімшісінің нұсқаулығы құжатының [Жобаға қолжетімділік беру](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/access_management/project) бөлімінде.
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Толық қолжетімділік)[id=spark-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(Cloud Spark-та қолжетімді рұқсаттардың толық тізімі)}

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

### {heading(Инфрақұрылымды әкімшілік басқару)[id=spark-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(Cloud Spark инфрақұрылымын әкімшілік басқаруға арналған рұқсаттар тізімі)}

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

### {heading(Сервисті пайдалану)[id=spark-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(Cloud Spark сервісін пайдалануға арналған рұқсаттар тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_connections_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_ui]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_monitoring_view]}

{/cut}

### {heading(Қауіпсіздікті аудит)[id=spark-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(Cloud Spark қауіпсіздігін аудиттеуге арналған рұқсаттар тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_spark_monitoring_view]}

{/cut}