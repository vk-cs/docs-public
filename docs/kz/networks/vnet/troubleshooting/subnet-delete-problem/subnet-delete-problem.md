# {heading(Ішкі желіні жою мүмкін емес)[id=vnet-subnet-delete-problem]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Ішкі желіні жою кезінде қате пайда болады:

```text
Unable to complete operation on subnet: One or more ports have an IP allocation from this subnet. 1 of 1 subnets failed to delete
```

Ішкі желідегі барлық қолжетімді порттар жойылған, бірақ жою мүмкін болмайтын порттар бар.

Мәселе виртуалды машина жойылғаннан кейін порт қалып қойып, әлі де осы ВМ-ге қосылған болып есептелген жағдайда туындайды. Сондықтан осындай порты бар ішкі желіні жою әрекеті кезінде қате пайда болады.

### {heading(Шешім)[id=vnet-subnet-delete-problem-resolve]}

1. Портты өшірілген ВМ-ден ажыратыңыз, ол үшін оны жоқ ресурсқа байланыстырыңыз:

   ```console
   openstack port set --device-owner <КЕЗКЕЛГЕН_МӘТІН> <ПОРТ_АТЫ_НЕМЕСЕ_ID_СІ>
   ```
   Мұнда:

   - `<КЕЗКЕЛГЕН_МӘТІН>` — жоқ ресурстың кез келген аты немесе идентификаторы.
   - `<ПОРТ_АТЫ_НЕМЕСЕ_ID_СІ>` — өшірілген ВМ-ден қалған порттың аты немесе идентификаторы. Поджелі порттарын көру: `openstack port list --network <ЖЕЛІ_АТЫ_НЕМЕСЕ_ID_СІ>`.

1. Поджелі жойып көріңіз:

   ```console
   openstack subnet delete <ПОДЖЕЛІ_ID_СІ>
   ```
   Мұнда `<ПОДЖЕЛІ_ID_СІ>` — {linkto(../../../../networks/vnet/instructions/net#vnet-net-view)[text=поджель идентификаторы]}, оны жою қажет.

1. Егер мәселе сақталса, {ifdef(public)}[техникалық қолдау көрсету қызметіне](/kz/contacts){/ifdef}{ifdef(private,private-pg)}{var(cloud)} әкімшісіне өтініңіз{/ifdef}.