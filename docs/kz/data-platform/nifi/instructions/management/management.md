# {heading(Сервис компоненттерімен жұмыс)[id=nifi_management]}

{include(/kz/_includes/_translated_by_ai.md)}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(Жалпы ақпаратты қарау)[id=nifi_view_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

## {heading(Жалпы ақпаратты өңдеу)[id=nifi_edit_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(IP және порттарды өзгерту)[id=nifi_change-ip]}

{note:warn} Тек Standalone нұсқасындағы {var(data-p)} үшін қолжетімді. {/note}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Компоненттер күйін қарау)[id=nifi_view_status]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Дана бетінде **Компоненттер күйі** қойындысына өтіңіз.

{/tab}

{/tabs}

## {heading(Көлденең масштабтау)[id=nifi_horizontal_scaling]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

## {heading(Әкімші тіркелгісін қарау)[id=nifi_admin_view]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

## {heading(Баптауларды қарау және өңдеу)[id=nifi_edit_settings]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings]}

{/tab}

{/tabs}

## {heading(Данаға қызмет көрсету)[id=nifi_service]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Өзгерістер тарихын қарау)[id=postgresql_changes_history]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Қызықтыратын қойындыға өтіп, оң жақтағы ![белгіше](../../../assets/clock-icon.svg "inline") белгішесін басыңыз.
1. Өзгерістер тарихымен танысыңыз.

{/tab}

{/tabs}

## {heading(Сервис данасын жою)[id=nifi_delete]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}
