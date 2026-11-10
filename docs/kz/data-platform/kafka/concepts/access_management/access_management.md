# {heading(VK Private Cloud-та қолжетімділікті басқару)[id=kafka-concepts-iam]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_intro]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_roles]}

## {heading(Рөлдік модельдің мысалы)[id=kafka-concepts-iam-example]}

{note:info}
Рөлдерді және рұқсаттарды тек `Жоба иегері` және `Жоба серіктес иегері` рөлдері бар жоба қатысушылары тағайындай алады. Толығырақ — {var(cloud)} әкімшісінің нұсқаулығы құжатының [Жобаға қолжетімділікті беру](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/access_management/project) бөлімінде.
{/note}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_observer]}

### {heading(Толық қолжетімділік)[id=kafka-concepts-iam-example-full-access]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_full_desc]}

{cut(Cloud Kafka-да қолжетімді рұқсаттардың толық тізімі)}

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

### {heading(Инфрақұрылымды әкімшіліктеу)[id=kafka-concepts-iam-example-admin]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_infra_desc]}

{cut(Cloud Kafka инфрақұрылымын әкімшіліктеуге арналған рұқсаттар тізімі)}

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

### {heading(Сервисті пайдалану)[id=kafka-concepts-iam-example-usage]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_usage_desc]}

{cut(Cloud Kafka сервісін пайдалануға арналған рұқсаттар тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_mirrormaker_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_settings_list]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_settings_viewhistory]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_users_list]}

{/cut}

### {heading(Қауіпсіздікті аудиттеу)[id=kafka-concepts-iam-example-security-audit]}

{include(../../../_includes/_access_management.md)[tags=dp_private_access_audit_desc]}

{cut(Cloud Kafka қауіпсіздігін аудиттеуге арналған рұқсаттар тізімі)}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_instances_audit]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_logs_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_monitoring_view]}

{include(../../../_includes/_iam_dp_private.md)[tags=dp_kafka_users_list]}

{/cut}