# {heading(Сервис компоненттерімен жұмыс істеу)[id=postgresql_management]}

{include(/kz/_includes/_translated_by_ai.md)}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(Жалпы ақпарат)[id=postgresql_info]}

### {heading(Жалпы ақпаратты қарау)[id=postgresql_view_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

### {heading(Жалпы ақпаратты өңдеу)[id=postgresql_edit_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(IP және порттарды өзгерту)[id=postgresql_change-ip]}

{note:warn} Тек Standalone жүйесіндегі {var(data-p)} үшін қолжетімді. {/note}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Компоненттер күйлерін қарау)[id=postgresql_view_status]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
{/ifdef}

1. **Data Platform** → **Қызмет экземплярлары** бөліміне өтіңіз.
1. Қажетті экземплярдың атауын басыңыз.
1. Экземпляр бетінде **Компоненттер күйі** қойындысына өтіңіз.

{/tab}

{/tabs}

## {heading(Көлденең масштабтау)[id=postgresql_horizontal_scaling]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

## {heading(Диск өлшемін ұлғайту)[id=postgresql_disk_resize]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_disk_resize]}

{/tab}

{/tabs}

## {heading(Пайдаланушылардың есептік жазбалары)[id=postgresql_users]}

### {heading(Есептік жазбаларды қарау)[id=postgresql_users_view]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

### {heading(Есептік жазбаны қосу)[id=postgresql_users_create]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
{/ifdef}

1. **Data Platform** → **Қызмет экземплярлары** бөліміне өтіңіз.
1. Қажетті экземплярдың атауын басыңыз.
1. Экземпляр бетінде **Есептік деректер** қойындысына өтіңіз.
1. **Есептік жазба қосу** түймесін басыңыз.
1. Ашылған терезеде Cloud PostgreSQL экземплярына кіруге арналған пайдаланушы логинін көрсетіңіз.
1. Рөлді таңдаңыз:

   {include(../../../_includes/_data_p.md)[tags=roles_db]}

1. Пайдаланушының құпиясөзін ойлап табыңыз немесе генерациялаңыз.
1. **Өзгерістерді сақтау** түймесін басыңыз.

{/tab}

{/tabs}

### {heading(Желілік қолжетімділікті өңдеу)[id=postgresql_users_access_network]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
{/ifdef}

1. **Data Platform** → **Қызмет экземплярлары** бөліміне өтіңіз.
1. Қажетті экземплярдың атауын басыңыз.
1. **Есептік деректер** қойындысына өтіңіз.
1. Пайдаланушы есептік жазбасының оң жағындағы **•••** белгішесін басып, **Желілік қолжетімділікті өңдеу** тармағын таңдаңыз.
1. Есептік жазба үшін қосылымдарға жаңа құқықтарды таңдаңыз.

   {note:info}

   Желілік қолжетімділік баптауларының ерекшеліктері туралы толығырақ {linkto(../create#postgresql_network_access)[text=5-қадам. Желілік қолжетімділіктер]} бөлімінде

   {/note}

1. **Сақтау** түймесін басыңыз.

{/tab}

{/tabs}

### {heading(Есептік жазбаларды жою)[id=postgresql_users_delete]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_user_delete]}

{/tab}

{/tabs}

## {heading(Кеңейтімдерді қосу және өшіру)[id=postgresql_extensions]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_extensions]}

{/tab}

{/tabs}

## {heading(Баптауларды қарау және өңдеу)[id=postgresql_edit_settings]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings]}

{/tab}

{/tabs}

## {heading(Экземплярға қызмет көрсету)[id=postgresql_service]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Экземплярдың резервтік көшірмелері)[id=postgresql_backup]}

### {heading(Резервтік көшірмелерді қарау)[id=postgresql_backup_view]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_view]}

{/tab}

{/tabs}

### {heading(Резервтік көшірме жасау)[id=postgresql_backup_create]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_create]}

{/tab}

{/tabs}

### {heading(Резервтік көшірмені қалпына келтіру)[id=postgresql_backup_recovery]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_recovery]}

{/tab}

{/tabs}

## {heading(Өзгерістер тарихын қарау)[id=postgresql_changes_history]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
{/ifdef}

1. **Data Platform** → **Қызмет экземплярлары** бөліміне өтіңіз.
1. Қажетті экземплярдың атауын басыңыз.
1. Қызықтыратын қойындыға өтіп, оң жақтағы ![белгіше](../../../assets/clock-icon.svg "inline") белгішесін басыңыз.
1. Өзгерістер тарихымен танысыңыз.

{/tab}

{/tabs}

## {heading(Қызмет экземплярын жою)[id=postgresql_delete]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}
