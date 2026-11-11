# {heading(«Кибер Бэкап Облачный» сервисі үшін S3 шлюзін баптау)[id=s3-cyber-backup-s3-gateway]}

{include(/kz/_includes/_translated_by_ai.md)}

«Кибер Бэкап Облачный» {linkto(../../../marketplace/initial-configuration/cyber-backup-quick-start#marketplace-cyber-backup-quick-start)[text=сервисі]} үшін {linkto(../../concepts/about#s3-cyber-backup-about)[text=S3 шлюзі]} резервтік көшірмелерді сақтау үшін жария бұлттық {linkto(../../../../storage/s3/concepts/about#s3-concepts-about)[text=VK Object Storage]} сервисін пайдалануға мүмкіндік береді.

Баптау мысалы ретінде үш түйіннен тұратын сақтау кластері бар жоғары қолжетімділік конфигурациясында «Кибер Бэкап Облачный» сервисі үшін S3 шлюзі құрылады.

## {heading(Дайындық қадамдары)[id=s3-cyber-backup-s3-gateway-prep]}

1. S3 шлюзі үшін есептік жазба мен ұйым тенантын құру, сондай-ақ тенантқа серіктес сақтау орындарын қосу мүмкіндігін алу үшін [техникалық қолдауға](/kz/contacts) хабарласыңыз.
1. VK Cloud [жеке кабинетіне өтіңіз](https://kz.cloud.vk.kz/app).
1. Үш ВМ-ден және әрқайсысы 1 ТБ болатын үш дискіден тұратын сақтау кластерін құруға жобада қажетті {linkto(../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=квоталардың]} жеткілікті екеніне, ал лимиттердің мұны істеуге мүмкіндік беретініне {linkto(../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=көз жеткізіңіз]}.
1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. ВМ-ге SSH арқылы қосылу үшін кілт жұбын {linkto(../../../../tools-for-using-services/vk-cloud-account/instructions/account-manage/keypairs#vk-cloud-account-manage-keypairs-create)[text=құрыңыз]}. Мысалы, `vk-ssh` атымен.

## {heading({counter(s3-gateway)}. VK Object Storage бакетін дайындаңыз)[id=s3-cyber-backup-s3-gateway-bucket]}

1. Бакет {linkto(../../../../storage/s3/instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=құрыңыз]} және оның URL мекенжайын жазып алыңыз.
1. Бакетке қолжетімділік кілттерін {linkto(../../../../storage/s3/instructions/access-management/bucket-keys#s3-instructions-bucket-keys)[text=құрыңыз]} және жазып алыңыз.

## {heading({counter(s3-gateway)}. Желілер мен ішкі желілерді құрыңыз)[id=s3-cyber-backup-s3-gateway-nets]}

1. Интернетке қолжетімділігі және маршрутизаторы жоқ желі {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=құрыңыз]}. Бұл мысалда: `private-storage-network`.
1. Осы желі үшін құрылған ішкі желіні қажетті параметрлерді көрсетіп {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=өңдеңіз]}. Бұл мысалда:
   - ішкі желі атауы: `private-storage-subnet`;
   - ішкі желі мекенжайы: `192.168.0.0/24`.
1. Интернетке қолжетімділігі және маршрутизаторы бар желі {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=құрыңыз]}. Бұл мысалда: `public-storage-network`.
1. Осы желі үшін құрылған ішкі желіні қажетті параметрлерді көрсетіп {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=өңдеңіз]}. Бұл мысалда:
   - ішкі желі атауы: `public-storage-subnet`;
   - ішкі желі мекенжайы: `10.0.0.0/24`;
   - DHCP IP-мекенжайлар пулы: `10.0.0.10–10.0.0.250`.

## {heading({counter(s3-gateway)}. Қауіпсіздік топтары мен ережелерін құрыңыз)[id=s3-cyber-backup-s3-gateway-secgroups]}

1. Оңай танылатын атауы бар қауіпсіздік тобын {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-add)[text=құрыңыз]}. Бұл мысалда: `cyber`.
1. Оған кіретін трафик үшін ережелерді {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-add-rule)[text=қосыңыз]}:

   1. Бірінші ереже:

     - **Түрі**: `SSH`,
     - **Хаттама**: `TCP`,
     - **Порттар**: `22`,
     - **Қашықтағы мекенжай**: `Барлық IP-мекенжайлар`.
   1. Екінші ереже:

     - **Түрі**: `ALL TCP`,
     - **Хаттама**: `TCP`,
     - **Порттар**: `8888`,
     - **Қашықтағы мекенжай**: `Барлық IP-мекенжайлар`.
1. Осы қауіпсіздік тобына шығатын трафик үшін ережені {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-add-rule)[text=қосыңыз]}:
  
   - **Түрі**: `Барлық хаттамалар мен порттар`,
   - **Қашықтағы мекенжай**: `Барлық IP-мекенжайлар`.

## {heading({counter(s3-gateway)}. Басқару түйіні үшін ВМ құрыңыз және баптаңыз)[id=s3-cyber-backup-s3-gateway-vm-main]}

1. Кибер Бэкап шешімдерінен жасалған резервтік көшірмелерді жалпыға қолжетімді бұлттарда сақтауға және S3 шлюзін ұйымдастыруға мүмкіндік беретін бағдарламалық жасақтама — Кибер Хранилище бейнесін [жүктеп алыңыз](http://download.cyberprotect.ru/releases/CyberInfrastructure/6.7.1/x86_64/cloud/cyber-storage.qcow2).
1. OpenStack CLI көмегімен бейнені {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=импорттаңыз]}:

   ```console
   openstack image create --progress \
     --file cyber-storage.qcow2 \
     --disk-format qcow2 \
     --container-format bare \
     Cyber-storage
   ```

1. Келесі параметрлері бар виртуалды машина {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=құрыңыз]}:

   - **Операциялық жүйе**: бұрын импортталған `Cyber-storage` бейнесі;
   - **Атауы**: кез келген ыңғайлы атау, бұл мысалда — `cb-01`;
   - **Виртуалды машина түрі**: `STD3-4-8`;
   - **Қолжетімділік аймағы**: кез келген қолайлы қолжетімділік аймағы;
   - **Диск өлшемі**: `250 ГБ`;
   - **Диск түрі**: `SSD`;
   - **Желі**: `public-storage-network`;
   - **Виртуалды машина кілті**: `vk-ssh`;
   - **Firewall параметрлері**: `Default`, `cyber`;
   - **Сыртқы IP тағайындау**: опция қосулы.

   Құрылған ВМ жүктелгенше және кіру үшін шақыру пайда болғанша күтіңіз.

1. ВМ-ге `private-storage-network` желісін {linkto(../../../../computing/iaas/instructions/vm/vm-add-net#iaas-vm-add-net-connect)[text=қосыңыз]}. Қосу кезінде көрсетіңіз:

   - `private-storage-subnet` ішкі желісінің қолжетімді мекенжайлар ауқымынан нақты IP-мекенжай;
   - `Барлығына рұқсат етілген` (`all`) қауіпсіздік тобы.
1. ВМ үшін таңдалған қолжетімділік аймағында қажетті көлемде сақтауға арналған диск {linkto(../../../../computing/iaas/instructions/volumes/volumes-create#iaas-volumes-create)[text=құрыңыз]} және оны ВМ-ге {linkto(../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect)[text=қосыңыз]}. Диск атауын жазып алыңыз.

    {note:info}
    Кемінде 1 ТБ көлемде диск құру ұсынылады.
    {/note}

## {heading({counter(s3-gateway)}. Бағыныңқы түйіндер үшін ВМ құрыңыз және баптаңыз)[id=s3-cyber-backup-s3-gateway-vm-sub]}

1. Келесі параметрлері бар екі виртуалды машина {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=құрыңыз]}:

    - **Операциялық жүйе**: бұрын импортталған `Cyber-storage` бейнесі;
    - **Атауы**: кез келген ыңғайлы атаулар, бұл мысалда — `cb-02` және `cb-03`;
    - **Виртуалды машина түрі**: `STD3-4-8`;
    - **Қолжетімділік аймағы**: кез келген қолайлы қолжетімділік аймағы;
    - **Диск өлшемі**: `250 ГБ`;
    - **Диск түрі**: `SSD`;
    - **Желі**: `public-storage-network`;
    - **Виртуалды машина кілті**: `vk-ssh`;
    - **Firewall параметрлері**: `Default`, `cyber` — әр ВМ үшін екі қауіпсіздік тобы да;
    - **Сыртқы IP тағайындау**: опция өшірулі.

    Құрылған ВМ-дердің әрқайсысы жүктелгенше және кіру үшін шақыру пайда болғанша күтіңіз.

1. Құрылған ВМ-дерге `private-storage-network` желісін {linkto(../../../../computing/iaas/instructions/vm/vm-add-net#iaas-vm-add-net-connect)[text=қосыңыз]}. Әр ВМ үшін қосу кезінде көрсетіңіз:
    - ішкі желінің қолжетімді мекенжайлар ауқымынан нақты IP-мекенжай;
    - `Барлығына рұқсат етілген` (`all`) қауіпсіздік тобы.
1. Таңдалған қолжетімділік аймағында әр ВМ үшін басқару түйінімен бірдей көлемдегі дискілерді {linkto(../../../../computing/iaas/instructions/volumes/volumes-create#iaas-volumes-create)[text=құрыңыз]} және дискілерді тиісті ВМ-дерге {linkto(../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect)[text=қосыңыз]}. Диск атауларын жазып алыңыз.

## {heading({counter(s3-gateway)}. Кибер Хранилищені баптаңыз)[id=s3-cyber-backup-s3-gateway-storage-server]}

1. `cloud-user` пайдаланушы атын және бұрын құрылған кілт жұбының жеке кілтін пайдаланып, `cb-01` виртуалды машинасына {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=қосылыңыз]}.
1. Кибер Хранилище басқару панелі үшін парольді алыңыз және сақтаңыз:

   ```console
   cat /.initial-admin-password
   ```

   {cut(Шығыс мысалы)}
   ```console
   ❯❯❯ ssh cloud-user@195.211.119.185 -i .ssh/vk-bk
   Cyber Infrastructure release 5.0
   ========================================================================
   = Warning! Do not enable third-party repositories. Install third-party =
   = software only from the default repository. Use only commands allowed =
   = in the product documentation.                                        =
   ========================================================================
   [cloud-user@abgw-vk-a1 ~]$ cat /.initial-admin-password
   pass-example
   [cloud-user@abgw-vk-a1 ~]$
   ```
   {/cut}

   Бұл парольді сақтап қойыңыз.
1. Кибер Хранилище басқару панеліне өтіңіз:

   1. Браузерде `<ВМ-ДІҢ_СЫРТҚЫ_IP-МЕКЕНЖАЙЫ>:8888` мекенжайын ашыңыз.
   1. `admin` логинін және бұрын алынған парольді енгізіңіз.
1. **Инфрақұрылым → Желілер** бөліміне өтіп, `Private` желісін `Public` деп қайта атаңыз.
1. **Желі құру** түймесін басып, `Private` желісін құрыңыз.
1. Сақтау кластерін құрыңыз:
   1. **Инфрақұрылым → Серверлер** бөліміне өтіңіз.
   1. **Сақтау кластерін құру** түймесін басыңыз.
   1. Кластер атауын көрсетіңіз. Мысалы, `backupcloud`.
   1. (Қосымша) Шифрлау түрін таңдаңыз.
   1. **Құру** түймесін басыңыз.

1. Қосымша түйіндерді қосыңыз:
   1. **Серверлер** бөліміне өтіп, **Серверді қосу** түймесін басыңыз.
   1. Түйіндерді қосуға арналған IP-мекенжай мен токенді жазып алыңыз.
   1. `cb-02` және `cb-03` ВМ-деріне SSH арқылы кезекпен қосылыңыз және олардың әрқайсысында мына команданы орындаңыз:

        ```console
        sudo -i
           /usr/libexec/init-ifaces
           /usr/libexec/vstorage-ui-agent/bin/register-storage-node.sh -m <IP-МЕКЕНЖАЙ> -t <ТОКЕН>
        ```

   1. Кибер Хранилище басқару панеліне қайта оралып, **Инфрақұрылым → Серверлер** бөліміне өтіңіз. Серверлер тізімінде үш түйін бар екеніне көз жеткізіңіз: `cb-01`, `cb-02`, `cb-03`.

1. Желілік интерфейстерді баптаңыз:
   1. Түйін атауын басып, **Желілік интерфейстер** қойындысына өтіңіз.
   1. Интерфейс параметрлерін өзгертіңіз:

      {tabs}
      {tab(eth0)}
      1. Интерфейс үшін ![more-icon](/kz/assets/more-icon.svg "inline") басып, **Өзгерту** таңдаңыз.
      1. Интерфейске `Public` желісін тағайындаңыз.
      1. Өзгерістерді сақтаңыз.
      {/tab}
      {tab(eth1)}
      1. Интерфейс үшін ![more-icon](/kz/assets/more-icon.svg "inline") басып, **Өзгерту** таңдаңыз.
      1. Интерфейске `Private` желісін тағайындаңыз.
      1. `private-storage-subnet` ішкі желісіне апаратын тиісті ВМ интерфейсінің IP-мекенжайын `/24` маскасымен интерфейске қолмен қосыңыз. Бұл мекенжай әр ВМ-ді `private-storage-network` желісіне {linkto(#s3-cyber-backup-s3-gateway-vm-main)[text=қосу]} кезінде қолмен енгізілген болатын.
      1. Өзгерістерді сақтаңыз.
      {/tab}
      {/tabs}

   1. Бұл әрекеттерді әр түйін үшін қайталаңыз.
1. Қосымша түйіндерді сақтау кластеріне қосыңыз:
   1. **Инфрақұрылым → Серверлер** бөліміне өтіңіз.
   1. `cb-02` және `cb-03` түйіндері үшін кезекпен ![more-icon](/kz/assets/more-icon.svg "inline") басып, **Кластерге қосылу** → **Қолдану** таңдаңыз.
   1. Барлық түйіндер **«Жарамды»** күйіне өткенше күтіңіз.

1. Желілерге әртүрлі трафик түрлерін тағайындаңыз:
   1. **Инфрақұрылым → Серверлер** бөліміне өтіңіз.
   1. **Желілерді тағайындау** және **Желілерге тағайындау** түймелерінің көмегімен желілер үшін келесі трафик түрлерін тағайындаңыз.

      {tabs}
      {tab(Private желісі)}
      - `Storage`;
      - `Internal management`;
      - `OSTOR private`;
      - `(Backup (ABGW) private`.
      {/tab}
      {tab(Public желісі)}
      - `Admin-panel`
      - `SSH`;
      - `S3 public`;
      - `iSCSI`;
      - `NFS`;
      - `Backup (ABGW) public`.
      {/tab}
      {/tabs}

1. Дискілерді инициализациялаңыз және оларға рөлдер тағайындаңыз:
   1. **Инфрақұрылым → Серверлер** бөліміне өтіңіз.
   1. `cb-01` түйінінің атауын басыңыз, **Дискілер** қойындысы ашылады.
   1. Дискілерге рөлдер тағайындаңыз:
      - `vda` үшін — **«Метадеректер»** рөлі;
      - `vdb` үшін — **«Хранилище»** рөлі.
   1. Операцияны растап, түйінді кластерге қосу аяқталғанша күтіңіз.
   1. Осы әрекеттерді `cb-02` және `cb-03` түйіндері үшін қайталаңыз.

## {heading({counter(s3-gateway)}. Кластер үшін жоғары қолжетімділік пен жүктеме теңгерімін баптаңыз)[id=s3-cyber-backup-s3-gateway-ha]}

1. `public-storage-subnet` ішкі желісінің порттар тізімін {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=алыңыз]}. Осы ішкі желідегі `cb-01`, `cb-02` және `cb-03` ВМ-дерінің порт ID-лерін жазып алыңыз.
1. `public-storage-network` желісі мен `public-storage-subnet` ішкі желісінде ішкі желінің мекенжайлар пулынан нақты IP-мекенжай мен порт атауын көрсетіп порт құрыңыз. Бұл мысалда — `10.0.0.252`.

   ```console
   openstack port create -network <ЖЕЛІ_ID> -fixed-ip subnet=<ІШКІ_ЖЕЛІ_ID>,ip-address=10.0.0.252 <ПОРТ_АТАУЫ>
   ```

1. Бұл IP-мекенжайды `public-storage-subnet` ішкі желісіне бағытталған ВМ порттары үшін рұқсат етілген мекенжайлар тізіміне қосыңыз:

   ```console
   openstack port set --allowed-address ip-address=10.0.0.252 <CB-01_ВМ_ПОРТЫНЫҢ_ID>
   openstack port set --allowed-address ip-address=10.0.0.252 <CB-02_ВМ_ПОРТЫНЫҢ_ID>
   openstack port set --allowed-address ip-address=10.0.0.252 <CB-03_ВМ_ПОРТЫНЫҢ_ID>
   ```

1. Келесі параметрлері бар жүктеме теңгергішін {linkto(../../../../networks/balancing/instructions/manage-lb#balancing-manage-lb-add)[text=құрыңыз]}:

   - **Теңгергіш атауы**: `cb-balancer`;
   - **Желі**: `public-storage-network`;
   - **Сыртқы IP тағайындау**: опция қосулы.

1. Теңгергіш құрылғанша күтіп, оның сыртқы IP-мекенжайын жазып алыңыз.
1. Осы теңгергіш үшін ережені {linkto(../../../../networks/balancing/instructions/manage-rules#balancing-manage-rules-add)[text=қосыңыз]}:

   1. Тыңдаушы құрыңыз:

      ```console
      openstack loadbalancer listener create --name <ТЫҢДАУШЫ_АТАУЫ> \
       --protocol TCP --protocol-port 8888 <ТЕҢГЕРГІШ_ID>
      ```
   1. Теңгерім пулын құрыңыз:

      ```console
      openstack loadbalancer pool create --name <ПУЛ_АТАУЫ> \
       --protocol TCP --lb-algorithm ROUND_ROBIN --listener <ТЫҢДАУШЫ_АТАУЫ>
   1. Пул мүшелерін қосыңыз:

      ```console
      openstack loadbalancer member create --address 10.0.0.252 \
       --subnet-id <PUBLIC-STORAGE-SUBNET_ID> --protocol-port 8888 <ПУЛ_АТАУЫ>
      ```
   1. Қолжетімділікті тексеруді құрыңыз:

      ```console
      openstack loadbalancer healthmonitor create --type TCP \
       --delay 5 --timeout 3 --max-retries 3 <ПУЛ_АТАУЫ>
      ```

1. Кибер Хранилище басқару панеліне өтіп, **Баптаулар → Басқару сервері → Жоғары қолжетімділік** бөлімін ашыңыз.
1. Құрылған үш түйінді таңдап, **Жоғары қолжетімділік конфигурациясын құру** түймесін, содан кейін **Жалғастыру** түймесін басыңыз.
1. `public-storage-subnet` ішкі желісі үшін `10.0.0.252` виртуалды IP-мекенжайын көрсетіңіз.
1. Конфигурация құруды растаңыз.
1. Браузердің мекенжай жолағына `https://<ТЕҢГЕРГІШТІҢ_СЫРТҚЫ_IP-МЕКЕНЖАЙЫ>:8888` деп теріп, басқару серверінің теңгергіштің сыртқы IP-мекенжайы бойынша қолжетімділігін тексеріңіз.
1. (Қосымша) `cb-01` ВМ-іне байланған жария IP-мекенжайды {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete)[text=жойыңыз]}. Енді Кибер Хранилище басқару панеліне жүктеме теңгергішінің сыртқы IP-мекенжайы арқылы өте аласыз.
1. Бұрын құрылған жүктеме теңгергішіне келесі параметрлері бар ережені {linkto(../../../../networks/balancing/instructions/manage-rules#balancing-manage-rules-add)[text=қосыңыз]}:

   - **Теңгеру хаттамасы**: `TCP`;
   - **Порт**: `44445`;
   - **Келесі инстанстар үшін қолдану**: `cb-01`, `cb-02`, `cb-03`.
1. Теңгергіштің сыртқы IP-мекенжайына сыртқы домен атауын тағайындаңыз.

## {heading({counter(s3-gateway)}. Шлюзді тіркеңіз)[id=s3-cyber-backup-s3-gateway-register]}

1. Кибер Хранилище басқару панеліне өтіңіз.
1. **Қызметтер → Резервтік көшірмелер** бөліміне өтіп, **Резервтік сақтау орнын құру** түймесін басыңыз.
1. **Резервтік көшірмелердің мақсатты орны** қадамында **Бұлттық қызмет** таңдап, **Келесі** түймесін басыңыз.
1. **Серверлер** қадамында сақтауға арналған барлық түйіндерді таңдап, **Келесі** түймесін басыңыз.
1. **Бұлттық қызмет** қадамында:
   1. Нысан сақтау орнының түрін таңдаңыз: `AuthV2-үйлесімді (S3)`.
   1. VK Object Storage эндпоинтінің URL мекенжайын енгізіңіз:
      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
   1. {linkto(#s3-cyber-backup-s3-gateway-bucket)[text=Бакет]} атауы мен оған қолжетімділік кілттерін енгізіңіз.
   1. **Эндпоинтке дейін өзіндік қол қойылған сертификатты пайдалануға рұқсат беру** опциясын қосыңыз.
   1. **Келесі** түймесін басыңыз.
1. **Сақтау саясаттары** қадамында:
   1. `Түйін` істен шығу аймағын таңдаңыз.
   1. Ұйымыңыздың саясаттарына сәйкес келетін резервтеу режимін таңдаңыз.
   1. **Келесі** түймесін басыңыз.
1. **DNS** қадамында:
   1. Жүктеме теңгергішіне тағайындалған сыртқы домен атауын көрсетіңіз.
   1. DNS серверіңіздің конфигурациясы интерфейсте көрсетілген мысалға сәйкес келетініне көз жеткізіңіз. Қажет болса, оны өзгертіңіз.
   1. **Келесі** түймесін басыңыз.
1. **Cyberprotect есептік жазбасы** қадамында:
   1. Бұлттық консоль URL мекенжайын көрсетіңіз: `https://ru01-cloud.cyberprotect.ru`.
   1. Техникалық қолдаудан алынған ұйым тенантына қолжетімділік үшін логин мен парольді енгізіңіз.
   1. **Келесі** түймесін басыңыз.

      {note:info}
      Есептік жазбада екі факторлы аутентификация өшірулі болуы керек. Қызметтік есептік жазбаны пайдаланған жөн.
      {/note}

1. **Қорытынды** қадамында конфигурацияны қарап шығып, **Құру** түймесін басыңыз және шлюз құрылғанша күтіңіз.

## {heading({counter(s3-gateway)}. Пайдаланушыларды қосыңыз)[id=s3-cyber-backup-s3-gateway-clients]}

1. `https://ru01-cloud.cyberprotect.ru` мекенжайында авторизациядан өтіңіз.
1. Пайдаланушылар мен әкімшілерді құрыңыз.
1. Пайдаланушыны құру немесе өңдеу кезінде оның баптауларында резервтік көшірмелер үшін қосылған шлюзді делегирлеңіз.
1. **Клиенттер** бөліміне өтіңіз.
1. Ұйым тенантында клиенттік тенанттар құрыңыз, олар үшін жаңа S3 резервтік көшірмелер сақтау орнын көрсетіңіз.

## {heading({counter(s3-gateway)}. Жұмысқа қабілеттілігін тексеріңіз)[id=s3-cyber-backup-s3-gateway-check]}

1. «Кибер Бэкап Облачный» сервисінде резервтік көшірмені {linkto(../../../marketplace/initial-configuration/cyber-backup-quick-start#marketplace-cyber-backup-quick-start)[text=құрыңыз]}.
1. Резервтік көшірменің VK Object Storage бакетінде сақталғанына көз жеткізіңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=s3-cyber-backup-s3-gateway-delete]}

Қызметтің жұмыс істеп тұрған инфрақұрылымы есептеу ресурстарын тұтынады. Егер S3 шлюзі мен сақтау кластері сізге енді қажет болмаса, оларды жойыңыз:

1. Виртуалды машиналарды {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=жойыңыз]}.
1. ВМ-мен бірге барлық дискілердің жойылғанына көз жеткізіңіз, олай болмаса, оларды {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=жойыңыз]}.
1. Маршрутизаторды {linkto(../../../../../networks/vnet/instructions/router#vnet-router-delete)[text=жойыңыз]}.
1. Жүктеме теңгергішін {linkto(../../../../networks/balancing/instructions/manage-lb#balancing-manage-lb-delete)[text=жойыңыз]}.
1. Жария IP-мекенжайларды {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete)[text=жойыңыз]}.
