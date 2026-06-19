# {heading(Сервис данасымен жұмыс)[id=flink_management]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Дана туралы ақпаратты қарау)[id=flink_view]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

## {heading(Дананың атауы мен сипаттамасын өңдеу)[id=flink_edit]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(Компоненттер күйін қарау)[id=flink_status]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_clickhouse.md)[tags=open]}

1. Дана бетінде **Компоненттер күйі** қойындысына өтіңіз.

{/tab}

{/tabs}

## {heading(Әкімші құпиясөзін өзгерту)[id=flink_change_password]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_admin_password]}

{/tab}

{/tabs}

## {heading(Дананы жою)[id=flink_delete]}

Бұл топтық операция: қажет болған жағдайда сервистің бірнеше данасын бірден жалаушалар арқылы таңдап жоюға болады.

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}

{ifdef(public)}

## {heading(Байланыстырылған Kubernetes кластеры туралы ақпаратты қарау)[id=flink_k8s]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. **Data Platform → Сервис даналары** бөліміне өтіңіз.
1. Қажетті дана үшін **•••** батырмасын басып, **k8s кластеріне өту** тармағын таңдаңыз.

{/tab}

{/tabs}
{/ifdef}
