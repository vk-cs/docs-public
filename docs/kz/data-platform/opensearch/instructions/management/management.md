# {heading(Сервис данаҢымен жұмыс істеу)[id=opensearch_management]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

### {heading(Жалпы ақпаратты өңдеу)[id=opensearch_edit_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(TLS-сертификатын көру және ауыстыру)[id=opensearch_certificate]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_tls_certificate]}

Сертификаттармен жұмыс істеу туралы толығырақ — {linkto(../../../certificates/manage#certificates_manage)[text=Сертификаттар]} бөлімінде.

{/tab}

{/tabs}

## {heading(IP және порттарды өзгерту)[id=opensearch_change-ip]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Компоненттер күйін көру)[id=opensearch_view_status]}

{tabs}

{tab(Жеке кабинет)}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Дана бетінде **Компоненттер күйі** қойындысына өтіңіз.

{/tab}

{/tabs}

### {heading(Пайдаланушы аккаунттерін жасау)[id=opensearch_users_create]}

{tabs}

{tab(Жеке кабинет)}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. **Растамалы деректер** қойындысына өтіңіз.
1. **Аккаунт қосу** түймесін басыңыз.
1. Аккаунт үшін логин, рөл және құпиясөзді көрсетіңіз. Қазіргі уақытта пайдаланушыға тек `Әкімші` рөлі қолжетімді.

   {note:info}
   Пайдаланушыны жасау ерекшеліктері туралы толығырақ {linkto(../create#opensearch_create_user)[text=4-қадам. Растамалы деректер]} бөлімінде
   {/note}

1. **Өзгерістерді сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Өзгерістердің тарихын көру)[id=opensearch_changes_history]}

{tabs}

{tab(Жеке кабинет)}

1. **Data Platform** → **Сервистік инстанстар** бөліміне өтіңіз.
1. Қажетті инстанстың атауын басыңыз.
1. Қызығушылық танытқан қойындыға өтіңіз және оң жақтағы ![белгіше](../../../assets/clock-icon.svg "inline") белгішесін басыңыз.
1. Өзгерістердің тарихымен танысыңыз.

{/tab}

{/tabs}

