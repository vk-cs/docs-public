# {heading(Сервис данасымен жұмыс істеу)[id=airflow_management]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Жалпы ақпаратты қарау)[id=airflow_view_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

## {heading(Сервис данасы туралы ақпаратты өңдеу)[id=airflow_edit]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(Компоненттер күйін қарау)[id=airflow_view_status]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_status]}

{/tab}

{/tabs}

## {heading(Компоненттер конфигурациясын өзгерту)[id=airflow_edit_components]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_components]}

{/tab}

{/tabs}

## {heading(Әкімшінің есептік деректерін өзгерту)[id=airflow_admin_edit]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_admin_edit]}

{/tab}

{/tabs}

## {heading(Әкімші құпиясөзін өзгерту)[id=airflow_change_password]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_admin_password]}

{/tab}

{/tabs}

## {heading(Дананы жою)[id=airflow_delete]}

{ifdef(public)}
Бұл топтық операция: қажет болса, жалаушалар арқылы бірнеше сервис данасын бірден жоюға болады.
{/ifdef}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}

{ifdef(public)}

## {heading(Байланысқан Kubernetes кластері туралы ақпаратты қарау)[id=airflow_k8s]}

{tabs}

{tab(Жеке кабинет)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
1. **Data Platform → Сервис даналары** бөліміне өтіңіз.
1. Қажетті дана үшін **•••** батырмасын басып, **k8s кластеріне өту** тармағын таңдаңыз.

{/tab}

{/tabs}

{/ifdef}
