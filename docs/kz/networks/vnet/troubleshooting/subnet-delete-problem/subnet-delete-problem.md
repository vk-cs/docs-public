# {heading(Ішкі желіні жою мүмкін емес)[id=vnet-subnet-delete-problem]}

{include(/kz/_includes/_translated_by_ai.md)}

Ішкі желіні жою кезінде қате пайда болады:

```text
Unable to complete operation on subnet: One or more ports have an IP allocation from this subnet. 1 of 1 subnets failed to delete
```

Ішкі желідегі барлық қолжетімді порттар жойылған, бірақ жою мүмкін болмайтын порттар бар.

Мәселе виртуалды машина жойылғаннан кейін порт қалып қойып, әлі де осы ВМ-ге қосылған болып есептелген жағдайда туындайды. Сондықтан осындай порты бар ішкі желіні жою әрекеті кезінде қате пайда болады.

### {heading(Шешім)[id=vnet-subnet-delete-problem-resolve]}

1. Портты жойылған ВМ-ден ажыратыңыз, ол үшін оны жоқ ресурсқа байланыстырыңыз: 

   ```console
   openstack port set --device-owner <ПРОИЗВОЛЬНЫЙ_ТЕКСТ> <ИМЯ_ИЛИ_ID_ПОРТА>
   ```
   Мұнда:

   - `<ПРОИЗВОЛЬНЫЙ_ТЕКСТ>` — жоқ ресурстың кез келген атауы немесе идентификаторы.
   - `<ИМЯ_ИЛИ_ID_ПОРТА>` — жойылған ВМ-ге байланысқан {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-view)[text=қауіпсіздік тобының идентификаторы]}.

1. Ішкі желіні жойып көріңіз:

   ```console
   openstack subnet delete <ID_ПОДСЕТИ>
   ```
   Мұнда `<ID_ПОДСЕТИ>` — жою қажет {linkto(../../../../networks/vnet/instructions/net#vnet-net-view)[text=ішкі желінің идентификаторы]}.

1. Егер мәселе сақталса, [техникалық қолдау қызметіне хабарласыңыз](/kz/contacts).
