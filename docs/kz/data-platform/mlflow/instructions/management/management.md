# {heading(Сервис данасымен жұмыс істеу)[id=mlflow_management]}

{include(/kz/_includes/_translated_by_ai.md)}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(Жалпы ақпарат)[id=mlflow_info]}

### {heading(Жалпы ақпаратты қарау)[id=mlflow_view_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

### {heading(Жалпы ақпаратты өңдеу)[id=mlflow_edit_info]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(IP мен порттарды өзгерту)[id=mlflow_change-ip]}

{note:warn} Тек Standalone ішіндегі {var(data-p)} үшін қолжетімді. {/note}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Компоненттер мәртебесін қарау)[id=mlflow_view_status]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Дана бетінде **Компоненттер мәртебесі** қойындысына өтіңіз.

{/tab}

{/tabs}

## {heading(Әкімші тіркелгісі)[id=mlflow_admin]}

### {heading(Тіркелгіні қарау)[id=mlflow_admin_view]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

### {heading(Тіркелгі қосу)[id=mlflow_admin_create]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. **Тіркелгі деректері** қойындысына өтіңіз.
1. **Тіркелгі қосу** түймесін басыңыз.
1. Тіркелгінің логині мен құпиясөзін көрсетіңіз.

   {note:info}

   Логин мен құпиясөзді енгізу ерекшеліктері туралы толығырақ {linkto(../create#mlflow_create_user)[text=5-қадам. Тіркелгі деректері]} бөлімінде қараңыз

   {/note}

1. **Өзгерістерді сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Қосылымдар)[id=mlflow_connect]}

### {heading(Қосылымдарды қарау)[id=mlflow_view_connect]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_connect]}

{/tab}

{/tabs}

### {heading(Қосылымдар қосу)[id=mlflow_create_connect]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_create_connect]}

{/tab}

{/tabs}

## {heading(Данаға қызмет көрсету)[id=mlflow_service]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_service_no_backup]}

{/tab}

{/tabs}

## {heading(Өзгерістер тарихын қарау)[id=mlflow_changes_history]}

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

## {heading(Сервис данасын жою)[id=mlflow_delete]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}
