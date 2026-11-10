# {heading(Сервистің құрамдас бөлігімен жұмыс істеу)[id=redis_management]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

### {heading(Жалпы ақпаратты өңдеу)[id=redis_edit_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(TLS-сертификатын көру және ауыстыру)[id=redis_certificate]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_tls_certificate]}

Сертификаттармен жұмыс істеу туралы толығырақ — {linkto(../../../certificates/manage#certificates_manage)[text=Сертификаттар]} бөлімінде.

{/tab}

{/tabs}

## {heading(IP және порттарды өзгерту)[id=redis_change-ip]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Компоненттер күйін көру)[id=redis_view_status]}

{tabs}

{tab(Жеке кабинет)}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атын басыңыз.
1. Дана бетінде **Компоненттер күйі** қойындысына өтіңіз.

{/tab}

{/tabs}

## {heading(Тіркелгіні көру)[id=redis_admin_view]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

## {heading(Тіркелгіні қосу)[id=redis_admin_create]}

{tabs}

{tab(Жеке кабинет)}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Дана парақшасында **Тіркелгі деректері** қойыншасына өтіңіз.
1. **Тіркелгі қосу** түймесін басыңыз.
1. Тіркелгінің логині мен құпиясөзін көрсетіңіз.

   {note:info}
   Логин мен құпиясөзді енгізу ерекшеліктері туралы толығырақ — {linkto(../create#redis_create_user)[text=4-қадам. Тіркелгі деректері]} бөлімінде
   {/note}

1. **Өзгерістерді сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Өзгертулер тарихын көру)[id=redis_changes_history]}

{tabs}

{tab(Жеке кабинет)}

1. **Data Platform** → **Сервистер даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Қызығушылық танытқан қойындыға өтіңіз және оң жақтағы ![белгіше](../../../assets/clock-icon.svg "inline") белгішесін басыңыз.
1. Өзгертулер тарихымен танысыңыз.

{/tab}

{/tabs}

