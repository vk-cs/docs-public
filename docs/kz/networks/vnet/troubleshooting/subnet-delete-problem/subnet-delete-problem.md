{include(/kz/_includes/_translated_by_ai.md)}

Ішкі желіні жою кезінде қате пайда болады:

```text
Unable to complete operation on subnet: One or more ports have an IP allocation from this subnet. 1 of 1 subnets failed to delete
```

Ішкі желідегі барлық қолжетімді порттар жойылған, бірақ жою мүмкін болмайтын порттар бар.

Мәселе виртуалды машина жойылғаннан кейін порт қалып қойып, әлі де осы ВМ-ге қосылған болып есептелген жағдайда туындайды. Сондықтан осындай порты бар ішкі желіні жою әрекеті кезінде қате пайда болады.

### Шешім

1. Портты жойылған ВМ-ден ажыратыңыз, ол үшін оны жоқ ресурсқа байланыстырыңыз: 

   ```console
   openstack port set --device-owner <ПРОИЗВОЛЬНЫЙ_ТЕКСТ> <ИМЯ_ИЛИ_ИДЕНТИФИКАТОР_ПОРТА>
   ```
   Мұнда:

   - `<ПРОИЗВОЛЬНЫЙ_ТЕКСТ>` — жоқ ресурстың кез келген атауы немесе идентификаторы.
   - `<ИМЯ_ИЛИ_ИДЕНТИФИКАТОР_ПОРТА>` — [имя или идентификатор порта](/kz/networks/vnet/instructions/ports#porttar_tizimin_zhne_olar_turaly_akparatty_karau), жойылған ВМ-ге байланысқан.

1. Ішкі желіні жойып көріңіз:

   ```console
   openstack subnet delete <ИДЕНТИФИКАТОР_ПОДСЕТИ>
   ```
   Мұнда `<ИДЕНТИФИКАТОР_ПОДСЕТИ>` — [ішкі желінің идентификаторы](/kz/networks/vnet/instructions/net#zheliler_men_ishki_zheliler_tizimin_sonday_ak_olar_turaly_akparatty_karau), которую нужно удалить.

1. Егер мәселе сақталса, [техникалық қолдау қызметіне хабарласыңыз](/kz/contacts).
