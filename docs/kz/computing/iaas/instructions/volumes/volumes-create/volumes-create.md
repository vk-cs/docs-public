# {heading(Дискіні жасау)[id=iaas-volumes-create]}

{include(/kz/_includes/_translated_by_ai.md)}

Low Latency NVMe түріндегі дискіні жасау үшін [техникалық қолдауға хабарласыңыз](/kz/contacts) және [жоғары өнімді конфигурацияларға](../../../concepts/vm/cpu-generation) және дискілерге қол жеткізуді сұраңыз. Қалған [диск түрлерін](../../../concepts/data-storage/disk-types) жасау барлық конфигурацияларда әдепкі бойынша қолжетімді.

{note:info}
Белгілі бір ВМ үшін дискіні жасау [ВМ басқару](/kz/computing/iaas/instructions/vm/vm-manage#iaas-vm-mount-disk) бөлімінде сипатталған.
{/note}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Бұлтты есептеулер** → **Дискілер** бөліміне өтіңіз.
1. Дискілер тізімінің үстіндегі **Дискіні жасау** батырмасын басыңыз.

{include(/kz/_includes/_disk_params.md)[tags=disk]}

1. **Дискіні жасау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Дискінің [түрін таңдаңыз](../../../concepts/data-storage/disk-types), оның API-дегі атауын және орналастыруға қолайлы қолжетімділік аймағын анықтаңыз.
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

   Ең үлкен өлшем шектеулі. Толығырақ ақпаратты [Квоталар мен лимиттер](/kz/tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-images-volumes-no-quotas-limits) бөлімінен қараңыз.

   Команданың қосымша параметрлері:

   - `--image <ID_ОБРАЗА>` — диск жасалатын образдың идентификаторы;
   - `--snapshot <ID_СНИМКА>` — диск жасалатын снимоктың идентификаторы;
   - `--description <ОПИСАНИЕ>` — дискінің еркін сипаттамасы;
   - `--property <КЛЮЧ>=<ЗНАЧЕНИЕ>` — дискінің пайдаланушылық қасиеттері;
   - `--bootable` — жүктелетін дискіні жасау.

{/tab}

{/tabs}