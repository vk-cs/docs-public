# {heading(Жүктеме теңгергіштерін басқару)[id=balancing-manage-lb]}

{include(/kz/_includes/_translated_by_ai.md)}

Таңдалған жүктеме теңгергіштерін басқара аласыз: оларды қарап шығу, өңдеу және жою, жария IP-мекенжайлармен әрекет жасау.

## {heading(Жүктеме теңгергіштерінің тізімін және олар туралы ақпаратты қарау)[id=balancing-manage-lb-list]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Жүктеме теңгергіштері** бөліміне өтіңіз.

   Теңгергіштер тізімі көрсетіледі.

1. Қажетті теңгергіштің атауын басыңыз.

   Ол туралы толық ақпараты бар бет ашылады. Бұл бетте теңгергіш параметрлерін де {linkto(#balancing-manage-lb-edit)[text=өңдеуге]} болады.

{/tab}

{tab(OpenStack CLI)}

{ifdef(public)}
1. Мыналарға көз жеткізіңіз:

   1. OpenStack CLI `python-octaviaclient` {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылған]} {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=қосымша пакетімен]} бірге.
   1. OpenStack CLI ішінде {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизациялана]} аласыз.
{/ifdef}
{ifdef(private,private_pdf,private_pg,private_pg_pdf)}
1. OpenStack CLI-ге қосылыңыз.
{/ifdef}

1. Жүктеме теңгергіштерінің тізімін және олардың идентификаторларын көру үшін команданы орындаңыз:

   ```console
   openstack loadbalancer list
   ```

1. Жүктеме теңгергіші туралы толық ақпаратты көру үшін команданы орындаңыз:

   ```console
   openstack loadbalancer show <ID_БАЛАНСИРОВЩИКА>
   ```

   Жүктеме теңгергіші туралы жалпы ақпарат және келесі идентификаторлар шығарылады:

   - `vip_port_id` — жүктеме теңгергішінде виртуалды IP-мекенжай ретінде пайдаланылатын порттың идентификаторы. Осы портқа Floating IP-мекенжайын тағайындауға болады.

   - `listeners` — тыңдаушылар (listener) идентификаторларының тізімі. Бұл объектілер жүктеме теңгергішіне келетін кіріс қосылымдарды тыңдайды және трафик үшін кіру нүктесі ретінде қызмет етеді.

   - `pools` — пулдар (pools) идентификаторларының тізімі. Бұл объектілер трафиктің соңғы тұтынушыларын топтастыру үшін қызмет етеді. Тұтынушылар пулдың қатысушылары (members) болады. Тыңдаушылардан келетін трафик тыңдаушы үшін конфигурацияланған пулға кіретін бірнеше қатысушы арасында теңгеріледі.

1. Тыңдаушылардың баптауларын және олардың пулдармен байланысын көру үшін команданы орындаңыз:

   ```console
   openstack loadbalancer listener show <ID_ПРОСЛУШИВАТЕЛЯ>
   ```

1. Пулдың баптауларын және осы пул қатысушыларының тізімін көру үшін команданы орындаңыз:

   ```console
   openstack loadbalancer pool show <ID_ПУЛА>
   ```

1. Пулдан алынған жеке қатысушының баптауларын көру үшін команданы орындаңыз:

   ```console
   openstack loadbalancer member show <ID_ПУЛА> <ID_УЧАСТНИКА>
   ```

   Қатысушы үшін, соның ішінде трафиктің тағайындалу порты туралы ақпарат көрсетіледі.

{/tab}

{/tabs}

## {heading(Жүктеме теңгергіштерінің күйлерін қарау)[id=balancing-manage-lb-statuses]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Жүктеме теңгергіштері** бөліміне өтіңіз.

   {linkto(../../concepts/lb-statuses#balancing-lb-statuses-provisioning)[text=Орналастыру күйлері]} және {linkto(../../concepts/lb-statuses#balancing-lb-statuses-operating-common)[text=негізгі жұмыс күйі статустары]} бар теңгергіштер тізімі көрсетіледі.

{/tab}
{tab(OpenStack CLI)}
1. Мыналарға көз жеткізіңіз:

   1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылған]} және {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=қосымша пакетпен]} `python-octaviaclient` бірге.
   2. OpenStack CLI ішінде {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизациядан өте аласыз]}.
1. Теңгерімдеу пулдарының тізімін олардың идентификаторларымен бірге алыңыз:

   ```console
   openstack loadbalancer pool list
   ```

1. Қажетті пулдың ID мәнін көшіріңіз.
1. Қажетті теңгерімдеу пулы туралы ақпаратты алыңыз:

   ```console
   openstack loadbalancer member list <ID_ПУЛА>
   ```
   {linkto(../../concepts/lb-statuses#balancing-lb-statuses-provisioning)[text=Орналастыру күйі]} `provisioning_status` бағанында, ал {linkto(../../concepts/lb-statuses#balancing-lb-statuses-operating)[text=жұмыс күйі статусы]} — `operating_status` бағанында орналасқан.

{/tab}
{/tabs}

## {heading(Жүктеме теңгергішін қосу)[id=balancing-manage-lb-add]}

{ifndef(public)}
{note:info}
Жасалғаннан кейін жүктеме теңгергішінің ВМ-іне `soft-anti-affinity` саясаты қолданылады: ВМ мүмкіндігінше әртүрлі есептеу тораптарына орналастырылады.
{/note}
{/ifndef}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Жүктеме теңгергіштері** бөліміне өтіңіз.
1. **Теңгергішті қосу** немесе **Қосу** батырмасын басыңыз.
1. Теңгергіш параметрлерін орнатыңыз:

   - **Теңгергіштің атауы**.
   - **Желі**: теңгергіш орналастырылатын желі мен ішкі желі.

     Теңгергіш осы ішкі желіде орналасқан таңдалған сервистерге кіріс трафикті бөледі.

     {note:warn}
     Бұл параметрді кейін өзгерту мүмкін емес.
     {/note}

   - **Қолжетімділік аймағы**: тізімнен {linkto(../../../../start/concepts/architecture#architecture-az)[text=қолжетімділік аймағын]} таңдаңыз. ВМ-ді теңгергішке қосу жұмысын оңтайландыру және жеделдету үшін оларды бір аймақта орналастырыңыз.
   - **DNS-атау**: (қосымша) теңгергіш үшін DNS-атау.
   - **Сыртқы IP тағайындау**: егер бұл опция таңдалса, теңгергішке интернеттен қолжетімді болатын жария IP-мекенжай тағайындалады. Әйтпесе, теңгергіш ішкі жүктеме теңгергіші ретінде жұмыс істейді. Мұндай IP-мекенжайды {linkto(#balancing-manage-lb-assign-ip)[text=кейін тағайындауға]} болады.

     Бұл опцияны теңгергіштің артына интернеттен қолжетімді болуы тиіс сервистерді орналастыру жоспарланса таңдаңыз.
     Опцияны тек бұрын таңдалған желі интернетке қолжетімді маршрутизатордың артында орналасқан жағдайда ғана таңдауға болады.

1. Теңгеру ережелерін орнатыңыз.
1. **Теңгергішті қосу** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

{ifdef(public)}
1. Мыналарға көз жеткізіңіз:

   1. OpenStack CLI `python-octaviaclient` {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылған]} {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=қосымша пакетімен]} бірге.
   1. OpenStack CLI ішінде {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизациялана]} аласыз.
{/ifdef}

{ifdef(private,private_pdf,private_pg,private_pg_pdf)}
1. OpenStack CLI-ге қосылыңыз.
{/ifdef}

1. Теңгергіш орналастырылатын желі мен ішкі желіні таңдаңыз. Ішкі желінің {linkto(../../../../networks/vnet/instructions/net#vnet-net-view)[text=идентификаторын алыңыз]}.

1. Теңгергіш орналастырылатын {linkto(../../../../start/concepts/architecture#architecture-az)[text=қолжетімділік аймағын]} таңдаңыз. Қолжетімділік аймақтарының тізімін алу үшін команданы пайдаланыңыз:

   ```console
   openstack availability zone list
   ```

   ВМ-ді теңгергішке қосу жұмысын оңтайландыру және жеделдету үшін оларды бір қолжетімділік аймағына орналастырыңыз.

1. Теңгергішті жасаңыз:

   ```console
   openstack loadbalancer create --name <ИМЯ_БАЛАНСИРОВЩИКА> --vip-subnet-id <ID_ПОДСЕТИ> --availability-zone <ЗОНА_ДОСТУПНОСТИ>
   ```

1. (Қосымша) {linkto(#balancing-manage-lb-assign-ip)[text=Теңгергішке сыртқы IP-мекенжайын тағайындаңыз]}. Осы мекенжай арқылы ол интернеттен қолжетімді болады. Әйтпесе, теңгергіш ішкі жүктеме теңгергіші ретінде жұмыс істейді.

   Егер теңгергіштің артына интернеттен қолжетімді болуы тиіс сервистерді орналастыру жоспарланса, мекенжайды тағайындау қажет. Мекенжайды тек бұрын таңдалған ішкі желіге арналған желі интернетке қолжетімді маршрутизатордың артында орналасқан жағдайда ғана тағайындауға болады.

{/tab}

{/tabs}

## {heading(Жүктеме теңгергішінің атауын өңдеу)[id=balancing-manage-lb-edit]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Жүктеме теңгергіштері** бөліміне өтіңіз.
1. Өңдеу қажет теңгергіш үшін әрекеттердің бірін орындаңыз:

   - Теңгергіш атауын басыңыз.
   - Теңгергіш үшін ![ ](../../../../assets/more-icon.svg "inline") белгішесін басып, **Өңдеу** тармағын таңдаңыз.

   Теңгергіш туралы толық ақпараты бар бет ашылады.

1. Атауын өзгерту үшін:

   1. Теңгергіштің ағымдағы атауының жанындағы қарындаш белгішесін басыңыз.
   1. Жаңа атауды орнатыңыз.
   1. **Қайта атау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

{ifdef(public)}
1. Мыналарға көз жеткізіңіз:

   1. OpenStack CLI `python-octaviaclient` {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылған]} {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=қосымша пакетімен]} бірге.
   1. OpenStack CLI ішінде {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизациялана]} аласыз.
{/ifdef}
{ifdef(private,private_pdf,private_pg,private_pg_pdf)}
1. OpenStack CLI-ге қосылыңыз.
{/ifdef}

1. Қажетті жүктеме теңгергішінің {linkto(#balancing-manage-lb-list)[text=идентификаторын алыңыз]}.

1. Теңгергіш атауын өзгертіңіз:

   {tabs}

   {tab(Linux/macOS (bash, zsh))}

   ```console
   openstack loadbalancer <ID_БАЛАНСИРОВЩИКА>      --name <НОВОЕ_ИМЯ>
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   openstack loadbalancer <ID_БАЛАНСИРОВЩИКА> `
     --name <НОВОЕ_ИМЯ>
   ```

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Жария IP-мекенжайларын басқару)[id=balancing-manage-lb-ip]}

### {heading(Жария IP-мекенжайын тағайындау)[id=balancing-manage-lb-assign-ip]}

Егер теңгергіш желісі интернетке қолжетімді маршрутизаторға қосылған болса, теңгергішке жария (сыртқы) IP-мекенжайын тағайындауға болады.

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Жүктеме теңгергіштері** бөліміне өтіңіз.
1. Келесі әрекеттердің бірін орындаңыз:

   - Қажетті теңгергіштің атауын басыңыз.

     Теңгергіш туралы толық ақпараты бар бетте **IP-мекенжайлар** → **Сыртқы** блогында **Тағайындау** сілтемесін басыңыз.

   - Қажетті теңгергіш үшін ![ ](../../../../assets/more-icon.svg "inline") белгішесін басып, **Сыртқы IP тағайындау** тармағын таңдаңыз.

1. Тізімнен қажетті жария IP-мекенжайын таңдаңыз немесе жаңасын жасаңыз.
1. **Растау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

{ifdef(public)}
1. Мыналарға көз жеткізіңіз:

   1. OpenStack CLI `python-octaviaclient` {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылған]} {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=қосымша пакетімен]} бірге.
   1. OpenStack CLI ішінде {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизациялана]} аласыз.
{/ifdef}
{ifdef(private,private_pdf,private_pg,private_pg_pdf)}
1. OpenStack CLI-ге қосылыңыз.
{/ifdef}

1. Қажетті жүктеме теңгергіші үшін Virtual IP бар порттың {linkto(../../../../networks/vnet/instructions/ports#vnet-net-view)[text=идентификаторын алыңыз]}.
1. Осы идентификаторы бар порттан {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-disassociate)[text=Floating IP-мекенжайын ажыратыңыз]}.

{/tab}

{/tabs}

### {heading(Жария IP-мекенжайын ажырату)[id=balancing-manage-lb-unlink-ip]}

Егер теңгергіш желісі интернетке қолжетімді маршрутизаторға қосылған болса және теңгергішке жария (сыртқы) IP-мекенжайы тағайындалған болса, бұл мекенжайды ажыратуға болады.

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Жүктеме теңгергіштері** бөліміне өтіңіз.
1. Келесі әрекеттердің бірін орындаңыз:

   - Қажетті теңгергіштің атауын басыңыз.

     Теңгергіш туралы толық ақпараты бар бетте **IP-мекенжайлар** → **Сыртқы** бөліміндегі IP-мекенжайының жанындағы **x** таңбасын басыңыз.

   - Қажетті теңгергіш үшін ![ ](../../../../assets/more-icon.svg "inline") белгішесін басып, **Сыртқы IP ажырату** тармағын таңдаңыз.

1. **Растау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

{ifdef(public)}
1. Мыналарға көз жеткізіңіз:

   1. OpenStack CLI `python-octaviaclient` {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылған]} {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=қосымша пакетімен]} бірге.
   1. OpenStack CLI ішінде {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизациялана]} аласыз.
{/ifdef}
{ifdef(private,private_pdf,private_pg,private_pg_pdf)}
1. OpenStack CLI-ге қосылыңыз.
{/ifdef}
1. Қажетті жүктеме теңгергіші үшін Virtual IP бар порттың {linkto(../../../../networks/vnet/instructions/ports#vnet-net-view)[text=идентификаторын алыңыз]}.
1. Осы идентификаторы бар порттан {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-disassociate)[text=Floating IP-мекенжайын ажыратыңыз]}.

{/tab}

{/tabs}

## {heading(Жүктеме теңгергішін жою)[id=balancing-manage-lb-delete]}

{tabs}

{tab(Жеке кабинет)}

Бұл топтық операция: қажет болса, жалаушалар арқылы бірден бірнеше жүктеме теңгергішін жоюға болады.

Теңгергішті жою үшін:

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті теңгергіш орналасқан жобаны таңдаңыз.
1. **Виртуалды желілер** → **Жүктеме теңгергіштері** бөліміне өтіңіз.
1. Қажетті теңгергіш үшін келесі әрекеттердің бірін орындаңыз:

   - Жалауша арқылы теңгергішті таңдап, содан кейін **Жою** батырмасын басыңыз.
   - Теңгергіш үшін ![ ](../../../../assets/more-icon.svg "inline") белгішесін басып, **Теңгергішті жою** тармағын таңдаңыз.

1. Теңгергішті жоюды растаңыз.

{/tab}

{tab(OpenStack CLI)}

{ifdef(public)}
1. Мыналарға көз жеткізіңіз:

   1. OpenStack CLI `python-octaviaclient` {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылған]} {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=қосымша пакетімен]} бірге.
   1. OpenStack CLI ішінде {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизациялана]} аласыз.
{/ifdef}
{ifdef(private,private_pdf,private_pg,private_pg_pdf)}
1. OpenStack CLI-ге қосылыңыз.
{/ifdef}

1. Жүктеме теңгергішінің {linkto(#balancing-manage-lb-list)[text=идентификаторын алыңыз]}.

1. Теңгергішті жойыңыз:

   ```console
   openstack loadbalancer delete <ID_БАЛАНСИРОВЩИКА>
   ```

{/tab}

{/tabs}
