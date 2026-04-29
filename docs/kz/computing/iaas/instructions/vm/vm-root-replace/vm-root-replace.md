{include(/kz/_includes/_translated_by_ai.md)}

{note:warn}
Жаңа [root-диск](/kz/computing/iaas/concepts/data-storage/disk-types#root_boot_disk) виртуалды машинаның операциялық жүйесін іске қосу және оның жұмысын қамтамасыз ету үшін қажетті компоненттер мен жүйелік файлдарды қамтуы керек. Олардың болмауы ВМ жұмыс істемеуіне әкеледі.
{/note}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Root-дискі ауыстырылуы тиіс [ВМ-ді тоқтатыңыз](../vm-manage#start_stop_restart_vm).
1. Root-дискті ауыстыру үшін пайдаланылатын дискіні [ВМ-ден ажыратыңыз](../../volumes/volumes-connect#dismount_disk).
1. Қажет болса, мақсатты дискіні [клондаңыз](../../volumes/volumes-manage#clone_volume).
1. Қажетті дисктер тізімі бар бетті ашыңыз.

    - Барлық дисктер: **Облачные вычисления → Диски** бөліміне өтіңіз.

    - Белгілі бір виртуалды машинаның дисктері:

        1. **Облачные вычисления → Виртуальные машины** бөліміне өтіңіз.
        1. Виртуалды машиналар тізімінен root-дискі ауыстырылуы тиіс ВМ атауын басыңыз.
        1. ВМ бетінде **Диски** қойындысына өтіңіз.

1. Дискіні ауыстыру терезесін ашу үшін тәсілдердің бірін қолданыңыз.

    - Дискінің контекстік мәзірі арқылы:

        1. Дисктер тізімінде қажетті диск үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басыңыз.
        1. **Заменить root-диск** тармағын таңдаңыз.

    - Диск бетінде:

        1. Ауыстыру қажет диск атауын басыңыз.
        1. Диск бетінде **Общая информация** қойындысына өтіңіз.
        1. Дисктер тізімінің үстіндегі **Еще** батырмасын басып, **Заменить root-диск** таңдаңыз.

1. Ашылған терезеде **Новый root-диск** таңдаңыз және **Заменить** батырмасын басыңыз.

   {note:info}

   Егер қажетті диск тізімде болмаса, оның [ВМ-ден ажыратылғанын](../../volumes/volumes-connect#dismount_disk) тексеріңіз.

   {/note}

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu).

1. [Қол жеткізу токенін алыңыз](/kz/tools-for-using-services/api/rest-api/case-keystone-token).
1. Виртуалды машиналар тізімін қарап шығып, root-дискі ауыстырылуы тиіс виртуалды машинаның ID мәнін көшіріп алыңыз:

   ```console
   openstack server list
   ```
1. Осы ВМ-ді [тоқтатыңыз](../vm-manage#start_stop_restart_vm).

1. Дисктер тізімін қараңыз:

   ```console
   openstack volume list --long
   ```

1. Root-дискті ауыстыру үшін таңдалған диск параметрлерін тексеріңіз:

    - Диск ВМ-ден ажыратылған (`Status`: `available`). Егер олай болмаса, [дискіні ажыратыңыз](../../volumes/volumes-connect#dismount_disk).
    - Диск жүктелетін (`Bootable`: `true`). Егер олай болмаса, [жүктелетін етіп жасаңыз](/kz/computing/iaas/instructions/volumes/volumes-manage#changing_bootable_attribute).

1. Таңдалған дискінің идентификаторын көшіріп алыңыз.
1. Root-дискті ауыстырыңыз:

   {tabs}

   {tab(Linux)}

   Команданы орындаңыз:

   ```console
   curl -g -i -X POST https://infra.mail.ru:8774/v2.1/servers/<ID_ВИРТУАЛЬНОЙ_МАШИНЫ>/action \
   -H "Accept: application/json" \
   -H "Content-Type: application/json" \
   -H "User-Agent: python-cinderclient" \
   -H "X-Auth-Token: <ТОКЕН>" \
   -d '{"replaceRoot": {"volume_id": "<ID_ЗАМЕНЯЮЩЕГО_ДИСКА>"}}'
   ```

   {/tab}

   {tab(Windows)}

   PowerShell ішінде команданы орындаңыз:

   ```console
   curl.exe -g -i -X POST "https://infra.mail.ru:8774/v2.1/servers/<ID_ВИРТУАЛЬНОЙ_МАШИНЫ>/action" `
   -H "Accept: application/json" `
   -H "Content-Type: application/json" `
   -H "User-Agent: python-cinderclient" `
   -H "X-Auth-Token: <ТОКЕН>" `
   -d "{\"replaceRoot\": {\"volume_id\": \"<ID_ЗАМЕНЯЮЩЕГО_ДИСКА>\"}}"
   ```

   {/tab}

   {/tabs}


{/tab}

{/tabs}
