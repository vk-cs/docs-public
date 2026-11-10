# {heading(Жобаны басқару)[id=tools-account-project-manage]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(private,private-pg,private-pdf,private-pg-pdf)}

## {heading(Жобаны таңдау)[id=tools-account-project-select]}

1. {var(cloud)} жеке кабинетына {linkto(../../lk-entry#tools-account-lk-entry)[text=өтіңіз]}.
1. Жеке кабинеттің жоғарғы жағындағы жоба атауын басыңыз.

   Сіз қатысушы болып табылатын жобалардың тізімі ашылады.

1. (Қалауыңыз бойынша) Егер {var(cloud)} ішінде бесден көп жоба болса, мыналарды пайдаланыңыз:

   * жоба идентификаторы немесе атауы бойынша іздеу;
   * пайдаланушы рөлдері бойынша сүзгі.

1. Жобаны таңдаңыз.
{/ifdef}

## {heading(Жоба идентификаторын алу)[id=project-pid-view]}

{include(../../../../../_includes/_project_pid_common.md)}

Жоба идентификаторын алу үшін:

{ifdef(public)}
{tabs}

{tab(Жеке кабинет)}
{/ifdef}

{include(../../../../../_includes/_project_pid_tab_lk.md)}

{ifdef(public)}
{/tab}

{tab({var(cloud)} Аккаунт)}

{include(../../../../../_includes/_project_pid_tab_account.md)}

{/tab}

{/tabs}
{/ifdef}

## {heading(Жоба атауын өзгерту)[id=project-name-edit]}

Жоба атауын жобаның өмірлік циклінің кез келген кезеңінде өзгертуге болады.

{ifdef(public)}
{tabs}

{tab(Жеке кабинет)}
{/ifdef}

{include(../../../../../_includes/_project_rename_tab_lk.md)}

{ifdef(public)}
{/tab}

{tab({var(cloud)} Аккаунт)}

{include(../../../../../_includes/_project_rename_tab_account.md)}

{/tab}

{/tabs}
{/ifdef}

{include(../../../../../_includes/_project_rename_common.md)}

{ifdef(public)}

## {heading(Жоба иесін ауыстыру)[id=project-owner-edit]}

Жобаның тек бір ғана иесі болуы мүмкін. Басқа пайдаланушыны ие етіп тағайындағаннан кейін сіз онымен {linkto(../../../../../access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=рөлдермен] ауысасыз}.

{note:info}
Иені ауыстыру жобаның балансының кез келген күйінде мүмкін.
{/note}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетына.

1. Дайындық қадамдарын орындаңыз:

   1. Қажет болса, жобадан төлем картасын ажыратыңыз, ол үшін [техникалық қолдауға](/kz/contacts) жүгініңіз.
   1. Ие еткіңіз келетін пайдаланушы мыналарға сәйкес келетініне көз жеткізіңіз:

      - {linkto(../../../../../access/iam/instructions/access-manage#iam-access-manage)[text=Қатысушылар тізіміне] қосылған} және жобаға шақыруды қабылдаған.

        Бұл жағдайда ол тізімде **Иә** белсендіру күйімен көрсетіледі.

      - (Қалауыңыз бойынша) Жобада суперәкімші, жоба әкімшісі немесе пайдаланушылар әкімшісі (IAM) рөліне ие.

        Бұл сіз ие болуды тоқтатқаннан кейін рөлдерді ауыстыруды бақылауға мүмкіндік береді.

      - Жобаны қабылдауға келіскен.

        Жобаны беру жаңа иенің келісімімен ғана мүмкін.

1. Ағымдағы ие атынан [техникалық қолдауға](/kz/contacts) жүгініп, мына деректерді хабарлаңыз:

   - жобаның {linkto(#project-pid-view)[text=идентификаторы]} (PID);
   - жаңа иенің поштасы.

1. (Қалауыңыз бойынша) Жобаның {linkto(../../../../../access/iam/instructions/access-manage#iam-access-manage)[text=Қатысушылар тізімінде]} рөлдердің ауысуын тексеріңіз.

{note:info}
Жаңа иеге, егер жобада байланыстырылған карта болмаса, {linkto(../../../../../intro/billing/instructions/add-card#billing-add-card-bind)[text=төлем картасын байланыстыру]} және {linkto(../../../../../intro/onboarding/account/create-account#onboarding-create-account-confirm-phone)[text=телефон нөмірін растау]} қажет болуы мүмкін.
{/note}

{/tab}

{/tabs}

{/ifdef}

## {heading(Жобаны консервациялау)[id=project-freeze]}

Егер жобадағы жұмысты тоқтатқыңыз келсе, қаражат есептен шығаруды тоқтату үшін жобаны консервациялаңыз.{ifdef(public)} Егер жоба минусқа кетсе, ол нысандар мен деректерді кейіннен жоюмен {linkto(../../../concepts/projects#projects-auto-freeze)[text=мұздатылады]}.{/ifdef}

Жобаны консервациялау үшін:

{ifdef(public)}
{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетына.
{/ifdef}

1. Жобадан қандай деректерді сақтағыңыз келетінін анықтаңыз:

   1. Жеке кабинет бетінің жоғарғы жағындағы пайдаланушы атауын басып, **Баланс және төлемдер** тармағын таңдаңыз.
   1. Деректер сақталатын нысандарды және олардың құнын көру үшін әр сервистің мазмұнын ашыңыз.

1. Деректерін сақтағыңыз келетін барлық виртуалды машиналарды тоқтатыңыз.
1. Барлық қажетті деректерді тасымалдаңыз немесе көшіріңіз.

   Мысалы, алдыңғы қадамда тоқтатылған виртуалды машиналардың дискілерінің бейнелерін {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-create)[text=жасаңыз]} және {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-export)[text=экспорттаңыз]}.

1. Тарифтенетін немесе диск кеңістігін алатын барлық нысандарды жойыңыз — Floating IP-адрестер, дискілер, {ifdef(public)}бакеттер, {/ifdef}жүктеме балансирлеушілер және басқалары.

   Мұндай нысандардың толық тізімі — сонымен қатар **Баланс және төлемдер** бетінде.

   Виртуалды машиналардың жүктеме дискілерін бөлек жоюға болмайтындықтан, виртуалды машиналарды {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=жойыңыз]}.

   Ресурстарды тұтынмайтын нысандарды — мысалы, желілер мен подсеттерді — жобада қалдыруға болады.

{ifdef(public)}
{/tab}
{/tabs} 
{/ifdef}

Сақталған деректерді жүктеп, инфрақұрылымды қалпына келтіру арқылы жобаны кез келген уақыт өткен соң қайта іске қоса аласыз.

## {heading(Жоба квоталарын көру)[id=project-view-quotas]}

{ifdef(public)}
{tabs}

{tab(Жеке кабинет)}
{/ifdef}

Ең жиі пайдаланылатын ресурстарға квоталар {ifdef(public)}[жеке кабинеттің](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../lk-entry#tools-account-lk-entry)[text=жеке кабинетінің]}{/ifndef} басты бетінде көрсетіледі.

Квоталардың толығырақ тізімін көріп, тізімдегі әр квота туралы толық ақпарат алу үшін:

{ifdef(public)}
1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетына.
{/ifdef}

{include(../../../../../_includes/_project_quotas.md)[tags=manage]}

{ifdef(public)}
Жоба үшін квоталардың кеңейтілген тізімін OpenStack CLI арқылы алуға болады. Барлық квоталар және оларды арттыру мүмкіндіктері туралы ақпарат {linkto(../../../concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоталар және лимиттер]} бөлімінде.

{/tab}

{tab(OpenStack CLI)}

Жоба үшін квоталардың кеңейтілген тізімін алу үшін:

1. OpenStack клиенті {linkto(../../../../cli/openstack-cli#openstack-install)[text=орнатылғанын]} тексеріп, жобада {linkto(../../../../cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. Консольге команданы енгізіңіз:

   ```console
   openstack quota show
   ```

   {cut(Мәскеу регионы үшін команданың шығару мысалы)}

   ```console
   +----------------------------+--------------------------------------------------+
   | Field                      | Value                                            |
   +----------------------------+--------------------------------------------------+
   | backup-gigabytes           | -1                                               |
   | backups                    | 400                                              |
   | cores                      | 9                                                |
   | fixed-ips                  | -1                                               |
   | floating-ips               | 6                                                |
   | gigabytes                  | 200                                              |
   | gigabytes_ceph             | -1                                               |
   | gigabytes_ceph-hdd         | -1                                               |
   | gigabytes_ceph-ssd         | -1                                               |
   | gigabytes_dev-ceph         | -1                                               |
   | gigabytes_dp1              | -1                                               |
   | gigabytes_dp1-high-iops    | 200                                              |
   | gigabytes_dp1-local-ssd    | -1                                               |
   | gigabytes_dp1-ssd          | -1                                               |
   | gigabytes_ef-nvme          | -1                                               |
   | gigabytes_high-iops        | 200                                              |
   | gigabytes_ko1-high-iops    | 200                                              |
   | gigabytes_ko1-local-ssd    | -1                                               |
   | gigabytes_ko1-local-ssd-g2 | -1                                               |
   | gigabytes_ko1-ssd          | -1                                               |
   | gigabytes_local-ssd        | -1                                               |
   | gigabytes_manila           | -1                                               |
   | gigabytes_ms1              | -1                                               |
   | gigabytes_octavia-hdd      | -1                                               |
   | gigabytes_octavia-ssd      | -1                                               |
   | gigabytes_perf-test        | -1                                               |
   | gigabytes_ssd              | -1                                               |
   | health_monitors            | -1                                               |
   | injected-file-size         | 10240                                            |
   | injected-files             | 5                                                |
   | injected-path-size         | 255                                              |
   | instances                  | 6                                                |
   | key-pairs                  | 100                                              |
   | l7_policies                | -1                                               |
   | listeners                  | -1                                               |
   | load_balancers             | 12                                               |
   | location                   | ...                                              |
   | networks                   | 10                                               |
   | per-volume-gigabytes       | -1                                               |
   | pools                      | 30                                               |
   | ports                      | 120                                              |
   | project                    | b5b7ffd4ef0547e5b222f44555dfXXXX                 |
   | project_name               | mcsXXXXXXXXXX                                    |
   | properties                 | 128                                              |
   | ram                        | 10240                                            |
   | rbac_policies              | 10                                               |
   | routers                    | 12                                               |
   | secgroup-rules             | 200                                              |
   | secgroups                  | 12                                               |
   | server-group-members       | 100                                              |
   | server-groups              | 50                                               |
   | snapshots                  | 200                                              |
   | snapshots_ceph             | -1                                               |
   | snapshots_ceph-hdd         | -1                                               |
   | snapshots_ceph-ssd         | -1                                               |
   | snapshots_dev-ceph         | -1                                               |
   | snapshots_dp1              | -1                                               |
   | snapshots_dp1-high-iops    | -1                                               |
   | snapshots_dp1-local-ssd    | -1                                               |
   | snapshots_dp1-ssd          | -1                                               |
   | snapshots_ef-nvme          | -1                                               |
   | snapshots_high-iops        | -1                                               |
   | snapshots_ko1-high-iops    | -1                                               |
   | snapshots_ko1-local-ssd    | -1                                               |
   | snapshots_ko1-local-ssd-g2 | -1                                               |
   | snapshots_ko1-ssd          | -1                                               |
   | snapshots_local-ssd        | -1                                               |
   | snapshots_manila           | -1                                               |
   | snapshots_ms1              | -1                                               |
   | snapshots_octavia-hdd      | -1                                               |
   | snapshots_octavia-ssd      | -1                                               |
   | snapshots_perf-test        | -1                                               |
   | snapshots_ssd              | -1                                               |
   | subnet_pools               | -1                                               |
   | subnets                    | 10                                               |
   | volumes                    | 10                                               |
   | volumes_ceph               | -1                                               |
   | volumes_ceph-hdd           | -1                                               |
   | volumes_ceph-ssd           | -1                                               |
   | volumes_dev-ceph           | -1                                               |
   | volumes_dp1                | -1                                               |
   | volumes_dp1-high-iops      | 10                                               |
   | volumes_dp1-local-ssd      | -1                                               |
   | volumes_dp1-ssd            | -1                                               |
   | volumes_ef-nvme            | -1                                               |
   | volumes_high-iops          | 10                                               |
   | volumes_ko1-high-iops      | 10                                               |
   | volumes_ko1-local-ssd      | -1                                               |
   | volumes_ko1-local-ssd-g2   | -1                                               |
   | volumes_ko1-ssd            | -1                                               |
   | volumes_local-ssd          | -1                                               |
   | volumes_manila             | -1                                               |
   | volumes_ms1                | -1                                               |
   | volumes_octavia-hdd        | -1                                               |
   | volumes_octavia-ssd        | -1                                               |
   | volumes_perf-test          | -1                                               |
   | volumes_ssd                | -1                                               |
   +----------------------------+--------------------------------------------------+
   ```
   {/cut}

   Квота үшін `-1` мәні «шектеусіз» дегенді білдіреді. Тізімдегі квоталар қандай ресурстарға сәйкес келетіні туралы {linkto(../../../concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоталар және лимиттер]} бөлімінен оқыңыз.

   `nova` және `cinder` компоненттері үшін квоталарды бөлек шығаруға болады:

   {tabs}

   {tab(nova)}

   ```console
   nova quota-show
   ```

   {/tab}

   {tab(cinder)}

   ```console
   cinder quota-show <project_id>
   ```

   {/tab}

   {/tabs}

   OpenStack-тің басқа компоненттері бойынша квоталарды көру үшін OpenStack клиентінің сәйкес пакеттерін (`manila`, `neutron` және т.б.) {linkto(../../../../cli/openstack-cli#openstack-install-package)[text=орнатыңыз]} және пакетке тән команданы пайдаланыңыз. Команда синтаксисін білу үшін сәйкес пакетті орнатыңыз да, `<component> help quota-show` командасын орындаңыз, мысалы, `manila help quota-show`.

{/tab}

{/tabs}
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
{note:info}
Квоталарды өзгерту үшін {var(cloud)} әкімшісіне жүгініңіз.
{/note}
{/ifdef}

{ifdef(public)}

## {heading(Жоба квоталарын арттыру)[id=project-increase-quota]}

Квоталарды арттыру жоба иесінің {linkto(../../../../../access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=рөліне]} ие пайдаланушы атынан арнайы форма арқылы орындалады:

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетына.
1. Жеке кабинеттің жоғарғы жағындағы жоба атауын басып, **Квоталарды басқару** тармағын таңдаңыз.
1. **Квоталар қосу** түймесін басыңыз. Квоталарды арттыру формасы ашылады.
1. Егер жоба үшін жедел немесе автоматты квота арттыруға рұқсат етілген болса, сұраныс түрін таңдау мүмкін болады. Олардың бірін таңдаңыз:

   - **Квоталарды жедел арттыру** — менеджермен келіспей, бір басу арқылы квоталарды арттыру.

     {cut(Квоталарды жедел арттыру шарттары)}

     {include(/kz/_includes/_quotas.md)[tags=fastquota-conditions]}

     {/cut}

   - **Квоталарды автоматты арттыру** — квоталар менеджермен келіспей автоматты түрде кеңейтіледі. Әр квотаның мәнін ағымдағы мәннен небәрі 30%-ға дейін арттыруға болады.

     {cut(Квоталарды автоматты арттыру шарттары)}

     {include(/kz/_includes/_quotas.md)[tags=autoquota-conditions]}

     {/cut}

   - **Қосымша ресурстар** — сұраныс менеджермен келісіледі. Автоматты квота арттыру жеткіліксіз болса пайдаланыңыз.

   Егер сұраныс түрін таңдау болмаса, квоталарды арттыру сұранысы менеджермен келісіледі.

1. Квоталарды арттыру қажет ресурс таңдаңыз. Бірнеше ресурс түріне квоталарды арттыру үшін **Тағы қосу** түймесін басыңыз.

   Квоталарды арттыру сұранысынан ресурс жою үшін ![delete-icon](../../../../../assets/delete-icon.svg "inline") белгішесін басыңыз.

1. Қолжетімді тәсілдердің бірімен таңдауды растаңыз:

   - **Жіберу** түймесін басыңыз. Менеджерге сұраныс құрылады.
   - **Арттыру** түймесін басыңыз. Квоталар автоматты түрде арттырылады. Тек жедел немесе автоматты квота арттыруға рұқсат етілген жобалар үшін қолжетімді.

{/tab}

{/tabs}

{note:info}
GeekBrains бағдарламасының қатысушылары үшін квоталарды арттыру туралы ақпарат {linkto(../../../faq#tools-account-faq)[text=Сұрақтар мен жауаптарда]} берілген.
{/note}

## {heading(Жоба қызметтерінің бағаларын көру)[id=project-prices-view]}

{include(/kz/_includes/_project_prices.md)[tags=prices]}

## {heading(Жобаның SDN көрінісі)[id=project-sdn-view]}

{tabs}

{tab(Жеке кабинет)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app/).
1. Жоба параметрлерін келесі тәсілдердің бірімен ашыңыз:

   - Жеке кабинеттің жоғарғы жағындағы жоба атауын басыңыз. Қажетті жоба үшін ![more-icon](../../../../../assets/more-icon.svg "inline") басып, **Жоба параметрлері** тармағын таңдаңыз.
   - Жеке кабинеттің жоғарғы жағындағы пайдаланушы атауын басып, **Жоба параметрлері** тармағын таңдаңыз.

1. **Виртуалды желілер** қойыншасына өтіңіз.

Қойыншада әдепкі SDN және қосылған болса, жобаның қосымша {linkto(../../../../../networks/vnet/concepts/sdn#vnet-sdn)[text=SDN]} көрсетіледі. Жобада тек SDN Neutron қолданылса, SDN Sprut қосу үшін [техникалық қолдау көрсету қызметіне](/kz/contacts) жүгініңіз.

{/tab}

{/tabs}

{/ifdef}

## {heading(Жобаны жою)[id=project-delete]}

{ifdef(public)}
Жобаны жою теріс баланс кезінде де мүмкін.

Жобаны жою үшін:

{tabs}

{tab(Жеке кабинет)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app/).
1. Жобадан барлық қажетті деректерді ауыстырғаныңызға көз жеткізіңіз.
1. Жоба иесі атынан [техникалық қолдау көрсету қызметіне](/kz/contacts) жүгініп, көрсетіңіз:

   - {linkto(#project-pid-view)[text=идентификатор]} (PID);
   - жойылатын жобаның {linkto(../../../concepts/regions#tools-account-concepts-regions)[text=өңірі]}.
1. (Заңды тұлғалар үшін) Қандай кезеңге {linkto(../../../../../intro/billing/concepts/report#billing-report-legal-entities)[text=есептік құжаттар]} қажет екенін көрсетіңіз.

    Жоюды растау үшін сізбен байланысқа шығады.

{/tab}

{/tabs}

{/ifdef}

{ifndef(public)}
1. Байланған автоматты төлем тәсілдерінің жоқтығына көз жеткізіңіз.
1. Барлық қажетті деректер жобадан экспортталғанын тексеріңіз.
1. Жобаны жою туралы өтінішпен жоба иесі атынан {var(cloud)} әкімшісіне жүгініңіз.
{/ifndef}

{note:err}
Расталғаннан кейін жоба және оның деректері қалпына келтіру мүмкіндігі жоқ күйде жойылады.
{/note}