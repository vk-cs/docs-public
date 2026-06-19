# {heading(Сервис данасымен жұмыс істеу)[id=opensearch_management]}

{include(/kz/_includes/_translated_by_ai.md)}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(Жалпы ақпарат)[id=opensearch_info]}

### {heading(Жалпы ақпаратты қарау)[id=opensearch_view_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

### {heading(Жалпы ақпаратты өңдеу)[id=opensearch_edit_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(IP және порттарды өзгерту)[id=opensearch_change-ip]}

{note:warn} Тек Standalone режиміндегі {var(data-p)} үшін қолжетімді. {/note}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Компоненттер күйін қарау)[id=opensearch_view_status]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дана атауын басыңыз.
1. Дана бетінде **Компоненттер күйі** қойындысына өтіңіз.

{/tab}

{/tabs}

## {heading(Көлденең масштабтау)[id=opensearch_horizontal_scaling]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

## {heading(Пайдаланушылардың тіркелгі деректері)[id=opensearch_users]}

### {heading(Тіркелгі деректерін қарау)[id=opensearch_users_view]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

### {heading(Тіркелгі деректерін құру)[id=opensearch_users_create]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дана атауын басыңыз.
1. **Тіркелгі деректері** қойындысына өтіңіз.
1. **Тіркелгі дерегін қосу** түймесін басыңыз.
1. Тіркелгі дерегі үшін логинді, рөлді және құпиясөзді көрсетіңіз. Қазіргі уақытта пайдаланушы үшін тек `Администратор` рөлі қолжетімді.

   {note:info}

   Пайдаланушыны құру ерекшеліктері туралы толығырақ {linkto(../create#opensearch_create_user)[text=4-қадам. Тіркелгі деректері]} бөлімінен қараңыз

   {/note}

1. **Өзгерістерді сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Данаға қызмет көрсету)[id=opensearch_service]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Дананың резервтік көшірмелері)[id=opensearch_backup]}

### {heading(Резервтік көшірмелерді қарау)[id=opensearch_backup_view]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_view]}

{/tab}

{/tabs}

### {heading(Резервтік көшірме жасау)[id=opensearch_backup_create]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_create]}

{/tab}

{/tabs}

### {heading(Резервтік көшірмені қалпына келтіру)[id=opensearch_backup_recovery]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_recovery]}

{/tab}

{/tabs}

## {heading(Өзгерістер тарихын қарау)[id=opensearch_changes_history]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дана атауын басыңыз.
1. Қызықтыратын қойындыға өтіп, оң жақтағы ![белгіше](../../../assets/clock-icon.svg "inline") белгішесін басыңыз.
1. Өзгерістер тарихымен танысыңыз.

{/tab}

{/tabs}

## {heading(Сервис данасын жою)[id=opensearch_delete]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}
