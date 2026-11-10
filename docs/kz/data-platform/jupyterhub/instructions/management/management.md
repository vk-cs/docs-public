# {heading(Сервис данасымен жұмыс істеу)[id=jupyterhub_management]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

## {heading(Жалпы ақпарат)[id=jupyterhub_info]}

### {heading(Жалпы ақпаратты қарау)[id=jupyterhub_view_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

### {heading(Жалпы ақпаратты өңдеу)[id=jupyterhub_edit_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(IP мен порттарды өзгерту)[id=jupyterhub_change-ip]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Компоненттер күйін көру)[id=jupyterhub_view_status]}

{tabs}

{tab(Жеке кабинет)}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Дана бетінде **Компоненттер күйі** қойындысына өтіңіз.

{/tab}

{/tabs}

## {heading(Көлденең масштабтау)[id=jupyterhub_horizontal_scaling]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

## {heading(Тіркесіпті қарау)[id=jupyterhub_admin_view]}

{note:warn}
Тек {var(cloud)} құрамындағы {var(data-p)} үшін.
{/note}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

## {heading(Тіркесімді қосу)[id=jupyterhub_admin_create]}

{note:warn}
Тек {var(cloud)} құрамындағы {var(data-p)} үшін.
{/note}

{tabs}

{tab(Жеке кабинет)}

1. **Data Platform** → **Сервис инстанстары** бөліміне өтіңіз.
1. Қажетті инстанстың атауын басыңыз.
1. **Тіркелгі деректері** қойындысына өтіңіз.
1. **Тіркесімді қосу** батырмасын басыңыз.
1. Тіркесімнің логині мен құпиясөзін көрсетіңіз.

   {note:info}
   Логин мен құпиясөзді енгізу ерекшеліктері туралы толығырақ — {linkto(../create#jupyterhub_create_user)[text=5-қадам. Тіркелгі деректері]} бөлімінде
   {/note}

1. **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{/tabs}

## {heading(Қосылымдар)[id=jupyterhub_connect]}

### {heading(Қосылымдарды қарау)[id=jupyterhub_view_connect]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_connect]}

{/tab}

{/tabs}

### {heading(Қосылымдарды қосу)[id=jupyterhub_create_connect]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_create_connect]}

{/tab}

{/tabs}

## {heading(Данаға қызмет көрсету)[id=jupyterhub_service]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_service_no_backup]}

{/tab}

{/tabs}

## {heading(Өзгерістер тарихын көру)[id=jupyterhub_changes_history]}

{tabs}

{tab(Жеке кабинет)}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Қызығушылық танытқан қойындыға өтіңіз және оң жақтағы ![значок](../../../assets/clock-icon.svg "inline") белгішесін басыңыз.
1. Өзгерістер тарихымен танысыңыз.

{/tab}

{/tabs}

## {heading(Сервис данасын жою)[id=jupyterhub_delete]}
{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}