# {heading(Қызмет данасымен жұмыс)[id=spark_management]}

{include(/kz/_includes/_translated_by_ai.md)}

{ifndef(public)}
{include(../../../_includes/_standalone.md)[tags=difference_management]}
{/ifndef}

## {heading(Дана туралы ақпаратты қарау)[id=spark_view]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

## {heading(Дана атауы мен сипаттамасын өңдеу)[id=spark_edit]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

{ifndef(public)}
## {heading(IP мекенжайы мен порттарды өзгерту)[id=spark_change-ip]}
{note:warn} Тек Standalone режиміндегі {var(data-p)} үшін қолжетімді. {/note}
{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}
{/ifndef}

## {heading(Компоненттер күйін қарау)[id=spark_status]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_status]}

{/tab}

{/tabs}

## {heading(Көлденеңінен масштабтау)[id=spark_horizontal_scaling]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

## {heading(Spark нұсқасын қарау және өзгерту)[id=spark_settings]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_spark.md)[tags=open]}

1. Дана бетінде **Баптаулар** қойындысына өтіңіз.
1. Spark нұсқасының өзгеру тарихын қарау үшін **•••** түймесін басыңыз.
1. Қажет болса, тапсырмаларды іске қосу кезінде қолданылатын Spark нұсқасын өзгертіңіз:

    1. **Өңдеу** түймесін басыңыз.
    1. **Мәні** бағанында тізімнен қажетті нұсқаны таңдаңыз.
    1. **Өзгерістерді сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Қосылымдарды қарау)[id=spark_view_connect]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_connect]}

{/tab}

{/tabs}

## {heading(Қосылымдарды қосу)[id=spark_create_connect]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_spark.md)[tags=open]}

1. Дана бетінде **Қосылымдар** қойындысына өтіңіз.

   {include(../../../_includes/_spark.md)[tags=connection]}

{/tab}

{/tabs}

## {heading(Данаға қызмет көрсету параметрлерін өзгерту)[id=spark_maintenance]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_spark.md)[tags=open]}

1. Дана бетінде **Қызмет көрсету** қойындысына өтіңіз.

{include(../../../_includes/_spark.md)[tags=maintenance]}

1. **Өзгерістерді сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Дананы жою)[id=spark_delete]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_user_delete]}

{/tab}

{/tabs}
