# {heading(Қызмет компоненттерімен жұмыс)[id=redis_management]}

{include(/kz/_includes/_translated_by_ai.md)}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(Жалпы ақпарат)[id=redis_info]}

### {heading(Жалпы ақпаратты қарау)[id=redis_view_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

### {heading(Жалпы ақпаратты өңдеу)[id=redis_edit_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(IP және порттарды өзгерту)[id=redis_change-ip]}

{note:warn} Тек Standalone-тағы {var(data-p)} үшін қолжетімді. {/note}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Компоненттер күйін қарау)[id=redis_view_status]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
{/ifdef}

1. **Data Platform** → **Қызмет даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Дана бетінде **Компоненттер күйі** қойындысына өтіңіз.

{/tab}

{/tabs}

## {heading(Масштабтау)[id=redis_scaling]}

### {heading(Көлденең масштабтау)[id=redis_horizontal_scaling]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

### {heading(Дискілерді тік масштабтау)[id=redis_vertical_disk_scaling]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_vertical_disk_scaling]}

{/tab}

{/tabs}

## {heading(Әкімші тіркелгісі)[id=redis_admin]}

### {heading(Тіркелгіні қарау)[id=redis_admin_view]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

### {heading(Тіркелгі қосу)[id=redis_admin_create]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
{/ifdef}

1. **Data Platform** → **Қызмет даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Дана бетінде **Тіркелгі деректері** қойындысына өтіңіз.
1. **Тіркелгі қосу** батырмасын басыңыз.
1. Тіркелгінің логині мен құпиясөзін көрсетіңіз.

   {note:info}

   Логин мен құпиясөзді енгізу ерекшеліктері туралы толығырақ — {linkto(../create#redis_create_user)[text=4-қадам. Тіркелгі деректері]} бөлімінде.

   {/note}

1. **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{/tabs}

## {heading(Баптауларды қарау және өңдеу)[id=redis_edit_settings]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings]}

{/tab}

{/tabs}

## {heading(Данаға қызмет көрсету)[id=redis_service]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Дананың резервтік көшірмелері)[id=redis_backup]}

### {heading(Резервтік көшірмелерді қарау)[id=redis_backup_view]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_view]}

{/tab}

{/tabs}

### {heading(Резервтік көшірме жасау)[id=redis_backup_create]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_create]}

{/tab}

{/tabs}

### {heading(Резервтік көшірмені қалпына келтіру)[id=redis_backup_recovery]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_recovery]}

{/tab}

{/tabs}


## {heading(Өзгерістер тарихын қарау)[id=redis_changes_history]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
{/ifdef}

1. **Data Platform** → **Қызмет даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Қызықтыратын қойындыға өтіп, оң жақтағы ![белгіше](../../../assets/clock-icon.svg "inline") белгішесін басыңыз.
1. Өзгерістер тарихымен танысыңыз.

{/tab}

{/tabs}

## {heading(Қызмет данасын жою)[id=redis_delete]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}
