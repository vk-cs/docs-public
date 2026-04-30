{include(/kz/_includes/_translated_by_ai.md)}

Low Latency NVMe түріндегі дискіні жасау үшін [техникалық қолдауға хабарласыңыз](/kz/contacts) және [жоғары өнімді конфигурацияларға](../../../concepts/vm/cpu-generation) және дискілерге қол жеткізуді сұраңыз. Қалған [диск түрлерін](../../../concepts/data-storage/disk-types#disk_types) жасау барлық конфигурацияларда әдепкі бойынша қолжетімді.

{note:info}

Белгілі бір ВМ үшін дискіні жасау [ВМ басқару](/kz/computing/iaas/instructions/vm/vm-manage#mount_disk) бөлімінде сипатталған.

{/note}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. **Бұлтты есептеулер** → **Дискілер** бөліміне өтіңіз.
1. Дискілер тізімінің үстіндегі **Дискіні жасау** батырмасын басыңыз.

{include(/kz/_includes/_disk_params.md)[tags=disk]}

1. **Дискіні жасау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz).

1. Дискінің [түрін таңдаңыз](../../../concepts/data-storage/disk-types#disk_types), оның API-дегі атауын және орналастыруға қолайлы қолжетімділік аймағын анықтаңыз.

1. Қолжетімді диск түрлерін қарап шығып, API-дегі атауға сәйкес келетін түр идентификаторын көшіріп алыңыз.

   ```console
   openstack volume type list
   ```

1. Қолжетімділік аймақтарын қарап шығып, таңдалған аймақтың атауын көшіріп алыңыз:

   ```console
   openstack availability zone list --volume
   ```

1. Таңдалған қолжетімділік аймағында белгілі бір түрдегі және өлшемдегі дискіні жасаңыз:

   ```console
   openstack volume create --type <ID_ТИПА_ДИСКА> --size <РАЗМЕР> --availability-zone <ЗОНА_ДОСТУПНОСТИ> <НАЗВАНИЕ>
   ```

   Ең үлкен өлшем шектеулі. Толығырақ ақпаратты [Квоталар мен лимиттер](/kz/tools-for-using-services/account/concepts/quotasandlimits#no_quotas_limits) бөлімінен қараңыз.

   Команданың қосымша параметрлері:

   - `--image <ID_ОБРАЗА>` — диск жасалатын образдың идентификаторы;
   - `--snapshot <ID_СНИМКА>` — диск жасалатын снимоктың идентификаторы;
   - `--description <ОПИСАНИЕ>` — дискінің еркін сипаттамасы;
   - `--property <КЛЮЧ>=<ЗНАЧЕНИЕ>` — дискінің пайдаланушылық қасиеттері;
   - `--bootable` — жүктелетін дискіні жасау.

{/tab}

{/tabs}
