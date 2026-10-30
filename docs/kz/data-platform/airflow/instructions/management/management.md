# {heading(Сервис данасымен жұмыс істеу)[id=airflow_management]}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Жалпы ақпаратты қарау)[id=airflow_view_info]}

{tabs}

{tab(Жеке кабинет)}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Дананың атауын басыңыз.
1. Дана бетінің қойындыларындағы ақпаратты қараңыз:

   - **Жалпы ақпарат** — дана параметрлері және негізгі эндпоинттер.
   - **Архитектура** — Cloud Airflow тораптары және олардың сипаттамалары.
   - **Тіркелгі деректері** — тіркелгілерді қарау және басқару.
   - **Баптаулар** — сервис конфигурациясын қарау және өңдеу.

     Белгілі бір параметрдің сипаттамасын қарау үшін оның атауын басыңыз.

   - **Қосылымдар** — деректер көздеріне қосылымдарды қарау.
   - **Қызмет көрсету** — Cloud Airflow қызмет көрсету параметрлерін қарау және басқару.

{/tab}

{/tabs}

## {heading(Дана туралы ақпаратты өңдеу)[id=airflow_edit_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

{ifndef(public)}
## {heading(TLS сертификатын қарау және ауыстыру)[id=airflow_certificate]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_tls_certificate]}

Сертификаттармен жұмыс істеу туралы толығырақ {linkto(../../../certificates/manage#certificates_manage)[text=Сертификаттар]} бөлімінен оқыңыз.

{/tab}

{/tabs}

{/ifndef}

## {heading(IP-мекенжайлар мен порттарды өзгерту)[id=airflow_change_ip]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Дана тораптары туралы ақпаратты қарау)[id=airflow_view_status]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_status]}

{/tab}

{/tabs}

## {heading(Көлденең масштабтау)[id=airflow_horizontal_scaling]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

## {heading(Баптауларды қарау және өңдеу)[id=airflow_edit_settings]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings_new]}

{/tab}

{/tabs}

## {heading(Данаға қызмет көрсету)[id=airflow_service]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Қосылымдарды қарау)[id=airflow_view_connect]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_connect]}

{/tab}

{/tabs}

## {heading(Тіркелгі деректерін қарау)[id=airflow_users_view]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

## {heading(Тіркелгі қосу)[id=airflow_user_add]}

{tabs}

{tab(Жеке кабинет)}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Дананың атауын басыңыз.
1. **Тіркелгі деректері** қойындысына өтіңіз.
1. **Тіркелгі қосу** түймесін басыңыз.
1. Ашылған терезеде Cloud Airflow данасына қол жеткізу үшін пайдаланушы логинін көрсетіңіз.
1. Тіркелгі рөлін таңдаңыз:

   {include(../../../_includes/_airflow.md)[tags=roles_airflow]}

1. Құпиясөзді ойлап табыңыз немесе жасаңыз.

   {note:err}
   Құпиясөзді сақтаңыз. Ұмытылған құпиясөзді қалпына келтіру қолжетімсіз.
   {/note}

1. **Өзгерістерді сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Тіркелгіні жою)[id=airflow_user_delete]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_user_delete]}

{/tab}

{/tabs}

## {heading(Дананы жою)[id=airflow_delete]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}

## {heading(Өзгерістер тарихын қарау)[id=airflow_changes_history]}

{tabs}

{tab(Жеке кабинет)}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Дананың атауын басыңыз.
1. Қажетті қойындыға өтіп, оң жақтағы ![белгіше](../../../assets/icon-clock.svg "inline") белгішесін басыңыз.
1. Өзгерістер тарихымен танысыңыз.

{/tab}

{/tabs}
