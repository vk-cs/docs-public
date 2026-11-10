# {heading(Дискілерді басқару)[id=iaas-volumes-manage]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
## {heading(Диск өлшемін ұлғайту)[id=iaas-volumes-manage-disk-size]}
{/ifdef}

{ifdef(public)}
## {heading(Диск өлшемін ВМ-ді қайта жүктеу арқылы ұлғайту)[id=iaas-volumes-manage-disk-size]}
{/ifdef}

{ifdef(public,private,private-pg,private-pdf,private-pg-pdf)}
{note:warn}
- Диск өлшемін кішірейтуге болмайды.
- Егер High IOPS SSD және Low Latency NVMe түріндегі дискілердің суреттері болса, бұл дискілердің өлшемін ұлғайтуға болмайды.
{/note}
{/ifdef}

{ifdef(private-cert)}
{note:warn}
Диск өлшемін кішірейтуге болмайды.
{/note}
{/ifdef}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.kz/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті дискілер тізімі бар бетті ашыңыз.

   - Барлық дискілер: **Бұлттық есептеулер** → **Дискілер** бөліміне өтіңіз.
   - Белгілі бір виртуалды машинаның дискілері:

     1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
     1. Виртуалды машиналар тізімінде дискісінің өлшемін ұлғайту қажет ВМ атауын басыңыз.
     1. ВМ бетінде **Дискілер** қойындысына өтіңіз.

1. Диск өлшемін өзгерту терезесін ашу үшін тәсілдердің бірін қолданыңыз.

   - Дискінің контекстік мәзірі арқылы:

     1. Дискілер тізімінде қажетті диск үшін ![ ](../../../../../assets/more-icon.svg "inline") басыңыз.
     1. **Диск өлшемін өзгерту** тармағын таңдаңыз.

   - Диск бетінде:

     1. Өлшемін өзгерту қажет дискінің атауын басыңыз.
     1. Диск бетінде **Жалпы ақпарат** қойындысына өтіңіз.
     1. Диск параметрлері кестесінің үстінде **Диск өлшемін өзгерту** батырмасын басыңыз.

1. Ашылған терезеде **Диск өлшемі** параметрін көрсетіңіз.
1. **Сақтау** батырмасын басыңыз.
1. ВМ-ді {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=қайта жүктеңіз]}.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіп, жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. Дискілер тізімін шығарыңыз:

   ```console
   openstack volume list
   ```

1. Дискінің күйін `Status` бағанында тексеріңіз. Сәтті ұлғайту тек `available` немесе `in-use` күйіндегі дискілер үшін ғана кепілдендіріледі.
1. Дискінің идентификаторын көшіріп алыңыз.

   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
1. Өлшемін өзгерту қажет дискінің ВМ-ін тоқтатыңыз:

   ```console
   openstack volume set --size <РАЗМЕР> <ID_ДИСКА>
   ```

1. Дискіні инстанстан ажыратыңыз немесе {linkto(../../../../../computing/iaas/instructions/vm/vm-root-replace#iaas-vm-root-replace)[text=root-дискіні ауыстырыңыз]}.

   {note:warn}
   Root-дискіні ауыстыруды, оның ішінде оның өлшемін өзгертуді, тек жеке кабинет арқылы ғана орындауға болады.
   {/note}

   Дискіні ВМ-ден ажырату командасы:

   ```console
   openstack server remove volume <ID_ВИРТУАЛЬНОЙ_МАШИНЫ> <ID_ДИСКА>
   ```
   {/ifdef}

1. Жаңа өлшемді гигабайтпен көрсетіп, дискіні ұлғайтыңыз.

   {ifdef(public)}
   - Егер диск ВМ-ден ажыратылған болса (`Status`: `available`):

     ```console
     openstack volume set --size <РАЗМЕР> <ID_ДИСКА>
     ```

   - Егер диск ВМ-ге қосылған болса (`Status`: `in-use`):

     ```console
     cinder extend <ID_ДИСКА> <РАЗМЕР>
     ```
   {/ifdef}
   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
   ```console
   openstack volume set --size <РАЗМЕР> <ID_ДИСКА>
   ```
   {/ifdef}

1. ВМ-ді {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=қайта жүктеңіз]}.

{/tab}

{/tabs}

{ifdef(public)}
## {heading(Диск өлшемін ВМ-ді қайта жүктемей ұлғайту)[id=iaas-volumes-manage-disk-size-not-restart]}

{note:warn}
- Диск өлшемін кішірейтуге болмайды.
- Егер High IOPS SSD және Low Latency NVMe түріндегі дискілердің суреттері болса, бұл дискілердің өлшемін ұлғайтуға болмайды.
{/note}

1. {var(cloud)} жеке кабинетінде немесе OpenStack CLI арқылы виртуалды дискінің өлшемін {linkto(#iaas-volumes-manage-disk-size)[text=ұлғайтыңыз]}, бірақ ВМ-ді қайта жүктемеңіз. Бұл дискінің өлшемін өзгертеді, бірақ ОЖ-дегі диск бөлімдерінің өлшемін өзгертпейді.
1. ВМ операциялық жүйесінде диск бөлімдерінің өлшемін ұлғайтыңыз:

   {tabs}

   {tab(Windows)}

   1. ВМ-ге {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=RDP]} арқылы немесе {linkto(../../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console)[text=консоль]} арқылы қосылыңыз.
   1. Диск басқару құралын (`diskmgmt.msc`) әкімші құқығымен ашыңыз.
   1. Қажетті бөлімнің контекстік мәзірінде **Томды кеңейту** тармағын таңдаңыз.
   1. [Диск өлшемін ұлғайтыңыз](https://learn.microsoft.com/ru-ru/windows-server/storage/disk-management/extend-a-basic-volume).

   {/tab}

   {tab(Linux)}

   1. ВМ-ге {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=SSH]} арқылы немесе {linkto(../../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console)[text=консоль]} арқылы қосылыңыз.
   1. ВМ-де қандай диск бөлімдері бар екенін және олардың файлдық жүйелерін анықтаңыз. Ол үшін команданы орындаңыз:

      ```console
      df -Th
      ```

      Жауапта өлшемін өзгерту қажет бөлімді тауып, оның файлдық жүйесін **Type** бағанынан қараңыз. Әдетте `/dev/vda1` өлшемін өзгерту қажет болады.

   1. Бөлім өлшемін ұлғайтыңыз.

      Команда мысалы:

      ```console
      growpart /dev/vda 1 # 1-ден алдында бос орын қажет
      ```

   1. Файлдық жүйенің өлшемін бөлім өлшеміне дейін ұлғайтыңыз. Каталогтың файлдық жүйесіне байланысты команданы қолданыңыз:

      {tabs}

      {tab(Ext1, Ext2, Ext3, Ext4)}

      ```console
      sudo resize2fs /dev/vda1 # 1-ден алдында бос орын болмауы керек
      ```

      {/tab}

      {tab(XFS)}

      ```console
      sudo xfs_growfs -d /dev/vda1
      ```

      {/tab}

      {/tabs}

   1. `df -Th` командасының көмегімен бөлім өлшемінің өзгергенін тексеріңіз.

{/tab}

{/tabs}

{/ifdef}

## {heading(Дискіні клондау)[id=iaas-volumes-manage-clone-volume]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.kz/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті дискілер тізімі бар бетті ашыңыз.

   - Барлық дискілер: **Бұлттық есептеулер** → **Дискілер** бөліміне өтіңіз.
   - Белгілі бір виртуалды машинаның дискілері:

     1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
     1. Виртуалды машиналар тізімінде дискісін клондау қажет ВМ атауын басыңыз.
     1. ВМ бетінде **Дискілер** қойындысына өтіңіз.

1. Дискіні клондау терезесін ашу үшін тәсілдердің бірін қолданыңыз.

   - Дискінің контекстік мәзірі арқылы:

     1. Дискілер тізімінде қажетті диск үшін ![ ](../../../../../assets/more-icon.svg "inline") басыңыз.
     1. **Дискіні клондау** тармағын таңдаңыз.

   - Диск бетінде:

     1. Клондау қажет дискінің атауын басыңыз.
     1. Диск бетінде **Жалпы ақпарат** қойындысына өтіңіз.
     1. Диск параметрлері кестесінің үстінде **Тағы** түймесін басып, **Дискіні клондау** опциясын таңдаңыз.

1. Ашылған бетте жаңа дискінің параметрлерін көрсетіңіз.
1. **Дискіні жасау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіп, жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=Анықтаңыз]}:

   - қажетті диск түрін;
   - оның API-дегі атауын;
   - орналастыруға қолайлы қолжетімділік аймағын.

1. Қолжетімді диск түрлерін қарап шығып, API-дегі атауға сәйкес келетін түр идентификаторын көшіріп алыңыз.

   ```console
   openstack volume type list
   ```

1. Қолжетімділік аймақтарын қарап шығып, қажетті аймақтың атауын көшіріп алыңыз:

   ```console
   openstack availability zone list --volume
   ```

1. Бар дискінің негізінде жаңа дискіні клондаңыз:

   ```console
   openstack volume create --type <ID_ТИПА_ДИСКА> --size <РАЗМЕР> --availability-zone <ЗОНА_ДОСТУПНОСТИ> --source <ID_ДИСКА> <НАЗВАНИЕ>
   ```

{/tab}

{/tabs}

{ifndef(public)}
## {heading(Дискінің атауын өзгерту)[id=iaas_volumes_manage_rename]}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]} {var(cloud)} жеке кабинетіне.
1. Қажетті дискілер тізімі бар бетті ашыңыз.

    - Барлық дискілер: **Бұлттық есептеулер** → **Дискілер** бөліміне өтіңіз.
    - Белгілі бір виртуалды машинаның дискілері:

        1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
        1. Виртуалды машиналар тізімінде дискісінің түрін өзгерту қажет ВМ атауын басыңыз.
        1. ВМ бетінде **Дискілер** қойындысына өтіңіз.

1. Дискінің атауын өзгерту терезесін ашу үшін тәсілдердің бірін қолданыңыз.

   - Дискінің контекстік мәзірі арқылы:

       1. Дискілер тізімінде қажетті диск үшін ![ ](../../../../../assets/more-icon.svg "inline") басыңыз.
       1. **Дискінің атауын өзгерту** тармағын таңдаңыз.

   - Диск бетінде:

       1. Түрін өзгерту қажет дискінің атауын басыңыз.
       1. Диск бетінде **Жалпы ақпарат** қойындысына өтіңіз.
       1. Диск параметрлері кестесінің үстінде **Дискінің атауын өзгерту** батырмасын басыңыз.

   {note:info}
   Егер **Дискінің атауын өзгерту** опциясы белсенді болмаса, дискіні ВМ-ден {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=ажыратыңыз]}.
   {/note}

1. Дискінің жаңа атауын енгізіп, **Сақтау** батырмасын басыңыз.
{/ifndef}

## {heading(Диск түрін өзгерту)[id=iaas-volumes-manage-chance-disk-type]}

{ifndef(private-cert)}
Диск түрін Low Latency NVMe-ге өзгерту үшін {ifdef(public)}[техникалық қолдауға](/kz/contacts) хабарласып, {linkto(../../../../../computing/iaas/concepts/vm/cpu-generation#iaas-cpu-generation)[text=жоғары өнімді конфигурацияларға]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{var(cloud)} әкімшісіне хабарласып, жоғары өнімді конфигурацияларға{/ifdef} және дискілерге қолжетімділікті сұраңыз. Қалған {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=диск түрлері]} барлық конфигурацияларда әдепкі бойынша қолжетімді.
{/ifndef}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.kz/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті дискілер тізімі бар бетті ашыңыз.

   - Барлық дискілер: **Бұлттық есептеулер** → **Дискілер** бөліміне өтіңіз.
   - Белгілі бір виртуалды машинаның дискілері:

     1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
     1. Виртуалды машиналар тізімінде дискісінің түрін өзгерту қажет ВМ атауын басыңыз.
     1. ВМ бетінде **Дискілер** қойындысына өтіңіз.

1. Диск түрін өзгерту терезесін ашу үшін тәсілдердің бірін қолданыңыз.

   - Дискінің контекстік мәзірі арқылы:

     1. Дискілер тізімінде қажетті диск үшін ![ ](../../../../../assets/more-icon.svg "inline") басыңыз.
     1. **Диск түрін өзгерту** тармағын таңдаңыз.

   - Диск бетінде:

     1. Түрін өзгерту қажет дискінің атауын басыңыз.
     1. Диск бетінде **Жалпы ақпарат** қойындысына өтіңіз.
     1. Диск параметрлері кестесінің үстінде **Диск түрін өзгерту** батырмасын басыңыз.

   {note:info}
   Егер **Диск түрін өзгерту** опциясы белсенді болмаса, дискіні ВМ-ден {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=ажыратыңыз]}.
   {/note}

1. Ашылған терезеде **Диск түрі** параметрін таңдап, **Растау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіп, жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. Дискінің жаңа түрін {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=таңдаңыз]} және оның API-дегі атауын анықтаңыз.
1. Қолжетімді диск түрлерінің тізімін қарап шығып, API-дегі атауға сәйкес келетін түр идентификаторын көшіріп алыңыз.

   ```console
   openstack volume type list
   ```

1. Дискілер тізімін қарап шығып, түрін өзгерту қажет дискінің идентификаторын көшіріп алыңыз:

   ```console
   openstack volume list --long
   ```

1. Диск түрін өзгертіңіз:

   ```console
   openstack volume set --type <ID_ТИПА_ДИСКА> --retype-policy on-demand <ID_ДИСКА>
   ```

{/tab}

{/tabs}

## {heading(«Жүктелетін» атрибутін өзгерту)[id=iaas-volumes-manage-changing-bootable-attribute]}

{linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-root-boot)[text=Жүктелетін диск]} ВМ операциялық жүйесін іске қосуға және жұмыс істеуіне қажетті компоненттер мен жүйелік файлдардан тұруы тиіс.

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетына.
1. Қажетті дисктер тізімі бар бетті ашыңыз.

   - Барлық дисктер: **Облачные вычисления** → **Диски** бөліміне өтіңіз.
   - Белгілі бір виртуалды машиинаның дисктері:

     1. **Облачные вычисления** → **Виртуальные машины** бөліміне өтіңіз.
     1. Виртуалды машиналар тізімінде ВМ атауын басыңыз.
     1. ВМ бетінде **Диски** қойындысына өтіңіз.

1. «Жүктелетін» атрибутін келесі тәсілдердің бірімен өзгертіңіз.

   - Дисктің контекстілік мәзірі арқылы:

     1. Дисктер тізімінде қажетті диск үшін ![ ](../../../../../assets/more-icon.svg "inline") басыңыз.
     1. **Сделать загрузочным** (**Сделать не загрузочным**) тармағын таңдаңыз.

   - Диск бетінде:

     1. Диск атауын басыңыз.
     1. Диск бетінде **Общая информация** қойындысына өтіңіз.
     1. Диск параметрлері кестесінің үстінде **Еще** түймесін басып, **Сделать загрузочным** (**Сделать не загрузочным**) таңдаңыз.

1. Ашылған терезеде **Подтвердить** түймесін басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіп, жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. Қажетті команданы орындаңыз.

   - Дискті жүктелетін ету:

     ```console
     openstack volume set --bootable <ID_ДИСКА>
     ```

   - Дискті жүктелетін емес ету:

     ```console
     openstack volume set --non-bootable <ID_ДИСКА>
     ```

1. Нәтижені тексеріңіз:

   ```console
   openstack volume show <ID_ДИСКА>
   ```

{/tab}

{/tabs}

## {heading(Дискіні жою)[id=iaas-volumes-manage-delete]}

{note:err}
Дискіні жойған кезде оның барлық суреттері де жойылады.
{/note}

{tabs}

{tab(Жеке кабинет)}

1. Дискіні ВМ-ден {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=ажыратыңыз]}.
1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.kz/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті дискілер тізімі бар бетті ашыңыз.

   - Барлық дискілер: **Бұлттық есептеулер** → **Дискілер** бөліміне өтіңіз.
   - Белгілі бір виртуалды машинаның дискілері:

     1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
     1. Виртуалды машиналар тізімінде дискісін жою қажет ВМ атауын басыңыз.
     1. ВМ бетінде **Дискілер** қойындысына өтіңіз.

1. Дискіні тәсілдердің бірімен жойыңыз.

   - Топтық әрекеттер арқылы — бірнеше диск үшін:

     1. Жою қажет дискілерді жалаушалармен таңдаңыз.
     1. Дискілер тізімінің үстінде **Дискіні жою** батырмасын басыңыз.

   - Дискінің контекстік мәзірі арқылы:

     1. Дискілер тізімінде қажетті диск үшін ![ ](../../../../../assets/more-icon.svg "inline") басыңыз.
     1. **Дискіні жою** тармағын таңдаңыз.

   - Диск бетінде:

     1. Жою қажет дискінің атауын басыңыз.
     1. Диск бетінде **Жалпы ақпарат** қойындысына өтіңіз.
     1. Диск параметрлері кестесінің үстінде оң жақта қоқыс себеті белгішесін басыңыз.

1. Ашылған терезеде дискінің атауын тексеріп, **Растау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. Дискіні ВМ-ден {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=ажыратыңыз]}.
1. OpenStack клиенті {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіп, жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. `openstack volume list` командасының көмегімен дискілер тізімін шығарып, оның күйін тексеріңіз: егер диск ВМ-ге қосылған болса (`Status`: `in-use`), оны {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=ажыратыңыз]}.
1. Дискінің идентификаторын көшіріп алыңыз.
1. Дискіні жойыңыз.

   ```console
   openstack volume delete <ID_ДИСКА>
   ```

{/tab}

{/tabs}
