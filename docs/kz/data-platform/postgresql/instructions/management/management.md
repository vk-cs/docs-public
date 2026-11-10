# {heading(Сервистің құрамдастарымен жұмыс)[id=postgresql_management]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

### {heading(Жалпы ақпаратты өңдеу)[id=postgresql_edit_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(TLS-сертификатын қарау және ауыстыру)[id=postgresql_certificate]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_tls_certificate]}

Сертификаттармен жұмыс істеу туралы толығырақ — {linkto(../../../certificates/manage#certificates_manage)[text=Сертификаттар]} бөлімінде.

{/tab}

{/tabs}

## {heading(IP мен порттарды өзгерту)[id=postgresql_change-ip]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Компоненттер күйін қарау)[id=postgresql_view_status]}

{tabs}

{tab(Жеке кабинет)}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Дана бетінде **Компоненттер күйі** қойындысына өтіңіз.

{/tab}

{/tabs}

### {heading(Тіркелгі қосу)[id=postgresql_users_create]}

{tabs}

{tab(Жеке кабинет)}

1. **Data Platform** → **Сервистік инстанстар** бөліміне өтіңіз.
1. Қажетті инстанстың атауын басыңыз.
1. Инстанс бетінде **Тіркелгі деректемелері** қойындысына өтіңіз.
1. **Тіркелгі қосу** батырмасын басыңыз.
1. Ашылған терезеде Cloud PostgreSQL инстансына кіру үшін пайдаланушы логинін тағайындаңыз.
1. Рөлді таңдаңыз:

   {include(../../../_includes/_data_p.md)[tags=roles_db]}

1. Пайдаланушы құпиясөзін ойлап табыңыз немесе генерациялаңыз.
1. **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{/tabs}

### {heading(Желілік рұқсаттарды өңдеу)[id=postgresql_users_access_network]}

{tabs}

{tab(Жеке кабинет)}

1. **Data Platform** → **Қызмет экземплярлары** бөліміне өтіңіз.
1. Қажетті экземплярдың атауын басыңыз.
1. **Есептік деректер** қойындысына өтіңіз.
1. Пайдаланушы есептік жазбасының оң жағындағы ![белгіше](../../../assets/more-icon.svg "inline") белгішесін басып, **Желілік қолжетімділікті өңдеу** тармағын таңдаңыз.
1. Есептік жазба үшін қосылымдарға жаңа құқықтарды таңдаңыз.

   {note:info}
   Желілік рұқсаттар баптауларының ерекшеліктері туралы толығырақ {linkto(../create#postgresql_network_access)[text=5-қадам. Желілік рұқсаттар]} бөлімінде
   {/note}

1. **Сақтау** батырмасын басыңыз.

{/tab}

{/tabs}

## {heading(Өзгертулер тарихын көру)[id=postgresql_changes_history]}

{tabs}

{tab(Жеке кабинет)}

1. **Data Platform** → **Сервистік даналар** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Қызығушылық танытқан қойындыға өтіңіз және оң жақтағы ![значок](../../../assets/clock-icon.svg "inline") белгішесін басыңыз.
1. Өзгертулер тарихымен танысыңыз.

{/tab}

{/tabs}

