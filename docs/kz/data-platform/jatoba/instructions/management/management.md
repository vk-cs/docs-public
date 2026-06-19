# {heading(Сервис компоненттерімен жұмыс)[id=jatoba_management]}

{include(/kz/_includes/_translated_by_ai.md)}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(Жалпы ақпарат)[id=jatoba_info]}

### {heading(Жалпы ақпаратты қарау)[id=jatoba_view_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

### {heading(Жалпы ақпаратты өңдеу)[id=jatoba_edit_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(IP мен порттарды өзгерту)[id=jatoba_change-ip]}

{note:warn} Тек Standalone түріндегі {var(data-p)} үшін қолжетімді. {/note}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Компоненттер мәртебелерін қарау)[id=jatoba_view_status]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Дана бетінде **Компоненттер мәртебесі** қойындысына өтіңіз.

{/tab}

{/tabs}

## {heading(Масштабтау)[id=jatoba_horizontal_scaling]}

### {heading(Көлденең масштабтау)[id=jatoba_horizontal_scaling]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

### {heading(Дискілерді тік масштабтау)[id=jatoba_vertical_scaling]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_vertical_disk_scaling]}

{/tab}

{/tabs}

## {heading(Пайдаланушылардың тіркелгілері)[id=jatoba_users]}

### {heading(Тіркелгілерді қарау)[id=jatoba_users_view]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

### {heading(Тіркелгі қосу)[id=jatoba_users_create]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Дана бетінде **Тіркелгі деректері** қойындысына өтіңіз.
1. **Тіркелгі қосу** түймесін басыңыз.
1. Ашылған терезеде Jatoba данасына қол жеткізу үшін пайдаланушы логинін орнатыңыз.
1. Рөлді таңдаңыз:

   {include(../../../_includes/_data_p.md)[tags=roles_db]}

1. Пайдаланушының құпиясөзін ойлап табыңыз немесе генерациялаңыз.
1. **Өзгерістерді сақтау** түймесін басыңыз.

{/tab}

{/tabs}

### {heading(Желілік қолжетімділікті өңдеу)[id=jatoba_users_access_network]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. **Тіркелгі деректері** қойындысына өтіңіз.
1. Пайдаланушы тіркелгісінің оң жағындағы **•••** белгішесін басып, **Желілік қолжетімділікті өңдеу** тармағын таңдаңыз.
1. Тіркелгі үшін қосылуға жаңа құқықтарды таңдаңыз.

   {note:info}

   Желілік қолжетімділік баптауларының ерекшеліктері туралы толығырақ {linkto(../create#jatoba_network_access)[text=5-қадам. Желілік қолжетімділіктер]} бөлімінде

   {/note}

1. **Сақтау** түймесін басыңыз.

{/tab}

{/tabs}

### {heading(Тіркелгілерді жою)[id=jatoba_users_delete]}

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

## {heading(Баптауларды қарау және өңдеу)[id=jatoba_edit_settings]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings]}

{/tab}

{/tabs}

## {heading(Данаға қызмет көрсету)[id=jatoba_service]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Дананың резервтік көшірмелері)[id=jatoba_backup]}

### {heading(Резервтік көшірмелерді қарау)[id=jatoba_backup_view]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_view]}

{/tab}

{/tabs}

### {heading(Резервтік көшірме жасау)[id=jatoba_backup_create]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_create]}

{/tab}

{/tabs}

### {heading(Резервтік көшірмеден қалпына келтіру)[id=jatoba_backup_recovery]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_recovery]}

{/tab}

{/tabs}

## {heading(Өзгерістер тарихын қарау)[id=jatoba_changes_history]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Қызықтыратын қойындыға өтіп, оң жақтағы ![белгіше](../../../assets/clock-icon.svg "inline") белгішесін басыңыз.
1. Өзгерістер тарихымен танысыңыз.

{/tab}

{/tabs}

## {heading(Сервис данасын жою)[id=jatoba_delete]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}
