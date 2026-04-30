{include(/kz/_includes/_translated_by_ai.md)}

Таңдалған жүктеме теңгергіштерін басқара аласыз: оларды қарап шығу, өңдеу және жою, жария IP-мекенжайлармен әрекет жасау.

## Жүктеме теңгергіштерінің тізімін және олар туралы ақпаратты қарау

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **Виртуалды желілер** → **Жүктеме теңгергіштері**.

   Теңгергіштер тізімі көрсетіледі.

1. Қажетті теңгергіштің атауын басыңыз.

   Ол туралы толық ақпараты бар бет ашылады. Бұл бетте теңгергіш параметрлерін де [өңдеуге](#zhukteme_tengergishinin_atauyn_ondeu) болады.

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

   1. OpenStack CLI [орнатылған](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz)  [қосымша пакетімен](/kz/tools-for-using-services/cli/openstack-cli#2_opcionaldy_kosymsha_paketterdi_ornatynyz) `python-octaviaclient`.
   1. OpenStack CLI ішінде [авторизациялана](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz) аласыз.

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

## Жүктеме теңгергішін қосу

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **Виртуалды желілер** → **Жүктеме теңгергіштері**.
1. батырмасын басыңыз **Теңгергішті қосу** немесе **Қосу**.
1. Теңгергіш параметрлерін орнатыңыз:

   - **Теңгергіштің атауы**.
   - **Желі**: теңгергіш орналастырылатын желі мен ішкі желі.

     Теңгергіш осы ішкі желіде орналасқан таңдалған сервистерге кіріс трафикті бөледі.

     {note:warn}

     Бұл параметрді кейін өзгерту мүмкін емес.

     {/note}

   - **Қолжетімділік аймағы**: тізімнен [қолжетімділік аймағын](/kz/start/concepts/architecture#az) таңдаңыз. ВМ-ді теңгергішке қосу жұмысын оңтайландыру және жеделдету үшін оларды бір аймақта орналастырыңыз.
   - **DNS-атау**: (қосымша) теңгергіш үшін DNS-атау.
   - **Сыртқы IP тағайындау**: егер бұл опция таңдалса, теңгергішке интернеттен қолжетімді болатын жария IP-мекенжай тағайындалады. Әйтпесе, теңгергіш ішкі жүктеме теңгергіші ретінде жұмыс істейді. Мұндай IP-мекенжайды [кейін тағайындауға](#zhariya_ip_mekenzhaylaryn_baskaru).

     Бұл опцияны теңгергіштің артына интернеттен қолжетімді болуы тиіс сервистерді орналастыру жоспарланса таңдаңыз.
     Опцияны тек бұрын таңдалған желі интернетке қолжетімді маршрутизатордың артында орналасқан жағдайда ғана таңдауға болады.

1. Теңгеру ережелерін орнатыңыз.
1. батырмасын басыңыз **Теңгергішті қосу**.

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

   1. OpenStack CLI [орнатылған](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz)  [қосымша пакетімен](/kz/tools-for-using-services/cli/openstack-cli#2_opcionaldy_kosymsha_paketterdi_ornatynyz) `python-octaviaclient`.
   1. OpenStack CLI ішінде [авторизациялана](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz) аласыз.

1. Теңгергіш орналастырылатын желі мен ішкі желіні таңдаңыз. Ішкі желінің. [идентификаторын алыңыз](../../../vnet/instructions/net#zheliler_men_ishki_zheliler_tizimin_sonday_ak_olar_turaly_akparatty_karau) ішкі желісінде.

1. Теңгергіш орналастырылатын [қолжетімділік аймағын](/kz/start/concepts/architecture#az), таңдаңыз. Қолжетімділік аймақтарының тізімін алу үшін команданы пайдаланыңыз:

   ```console
   openstack availability zone list
   ```

   ВМ-ді теңгергішке қосу жұмысын оңтайландыру және жеделдету үшін оларды бір қолжетімділік аймағына орналастырыңыз.

1. Теңгергішті жасаңыз:

   ```console
   openstack loadbalancer create --name <ИМЯ_БАЛАНСИРОВЩИКА> --vip-subnet-id <ID_ПОДСЕТИ> --availability-zone <ЗОНА_ДОСТУПНОСТИ>
   ```

1. (Қосымша) [Теңгергішке сыртқы IP-мекенжайын тағайындаңыз](#zhariya_ip_mekenzhaylaryn_baskaru). Осы мекенжай арқылы ол интернеттен қолжетімді болады. Әйтпесе, теңгергіш ішкі жүктеме теңгергіші ретінде жұмыс істейді.

   Егер теңгергіштің артына интернеттен қолжетімді болуы тиіс сервистерді орналастыру жоспарланса, мекенжайды тағайындау қажет. Мекенжайды тек бұрын таңдалған ішкі желіге арналған желі интернетке қолжетімді маршрутизатордың артында орналасқан жағдайда ғана тағайындауға болады.

{/tab}

{/tabs}

## Жүктеме теңгергішінің атауын өңдеу

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **Виртуалды желілер** → **Жүктеме теңгергіштері**.
1. Өңдеу қажет теңгергіш үшін әрекеттердің бірін орындаңыз:

   - Теңгергіш атауын басыңыз.
   - Теңгергіш үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып **Өңдеу**.

   Теңгергіш туралы толық ақпараты бар бет ашылады.

1. Атауын өзгерту үшін:

   1. Теңгергіштің ағымдағы атауының жанындағы қарындаш белгішесін басыңыз.
   1. Жаңа атауды орнатыңыз.
    1. батырмасын басыңыз **Атауын өзгерту**.

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

   1. OpenStack CLI [орнатылған](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz)  [қосымша пакетімен](/kz/tools-for-using-services/cli/openstack-cli#2_opcionaldy_kosymsha_paketterdi_ornatynyz) `python-octaviaclient`.
   1. OpenStack CLI ішінде [авторизациялана](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz) аласыз.

1. [идентификаторын алыңыз](#zhukteme_tengergishterinin_tizimin_zhne_olar_turaly_akparatty_karau) OpenStack CLI-ге қосылыңыз.

1. Теңгергіш атауын өзгертіңіз:

   {tabs}
   
   {tab(Linux/macOS (bash, zsh))}

   ```console
   openstack loadbalancer <ID_БАЛАНСИРОВЩИКА> \
     --name <НОВОЕ_ИМЯ>
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

## Жария IP-мекенжайларын басқару

### Жария IP-мекенжайын тағайындау

Егер теңгергіш желісі интернетке қолжетімді маршрутизаторға қосылған болса, теңгергішке жария (сыртқы) IP-мекенжайын тағайындауға болады.

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **Виртуалды желілер** → **Жүктеме теңгергіштері**.
1. Келесі әрекеттердің бірін орындаңыз:

   - Қажетті теңгергіштің атауын басыңыз.

      Теңгергіш туралы толық ақпараты бар бетте **Сыртқы** блогында **Тағайындау** → **Сыртқы**.

   - Қажетті теңгергіш үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып **Сыртқы IP тағайындау**.

1. Тізімнен қажетті жария IP-мекенжайын таңдаңыз немесе жаңасын жасаңыз.
 1. батырмасын басыңыз **Растау**.
 
 {/tab}
 
 {tab(OpenStack CLI)}
 
 1. Мыналарға көз жеткізіңіз:
 
    1. OpenStack CLI [орнатылған](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz)  [қосымша пакетімен](/kz/tools-for-using-services/cli/openstack-cli#2_opcionaldy_kosymsha_paketterdi_ornatynyz) `python-octaviaclient`.
    1. OpenStack CLI ішінде [авторизациялана](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz) аласыз.
 
 1. Қажетті жүктеме теңгергіші үшін Virtual IP бар порттың [идентификаторын алыңыз](../../../vnet/instructions/ports#porttar_tizimin_zhne_olar_turaly_akparatty_karau).
 1. Осы идентификаторы бар портқа [Floating IP-мекенжайын ажыратыңыз](../../../vnet/instructions/ip/floating-ip#associate).

{/tab}

{/tabs}

### Жария IP-мекенжайын ажырату

Егер теңгергіш желісі интернетке қолжетімді маршрутизаторға қосылған болса және теңгергішке жария (сыртқы) IP-мекенжайы тағайындалған болса, бұл мекенжайды ажыратуға болады.

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **Виртуалды желілер** → **Жүктеме теңгергіштері**.
1. Келесі әрекеттердің бірін орындаңыз:

   - Қажетті теңгергіштің атауын басыңыз.

     Теңгергіш туралы толық ақпараты бар бетте **Сыртқы** бөліміндегі IP-мекенжайының жанындағы **IP-адрестер** → **x**.

   - Қажетті теңгергіш үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып **Сыртқы IP ажырату**.

 1. батырмасын басыңыз **Растау**.
 
 {/tab}
 
 {tab(OpenStack CLI)}
 
 1. Мыналарға көз жеткізіңіз:
 
    1. OpenStack CLI [орнатылған](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz)  [қосымша пакетімен](/kz/tools-for-using-services/cli/openstack-cli#2_opcionaldy_kosymsha_paketterdi_ornatynyz) `python-octaviaclient`.
    1. OpenStack CLI ішінде [авторизациялана](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz) аласыз.
 
 1. Қажетті жүктеме теңгергіші үшін Virtual IP бар порттың [идентификаторын алыңыз](../../../vnet/instructions/ports#porttar_tizimin_zhne_olar_turaly_akparatty_karau).
 1. Осы идентификаторы бар порттан [Floating IP-мекенжайын ажыратыңыз](../../../vnet/instructions/ip/floating-ip#disassociate).

{/tab}

{/tabs}

## Жүктеме теңгергішін жою

{tabs}

{tab(Жеке кабинет)}

Бұл топтық операция: қажет болса, жалаушалар арқылы бірден бірнеше жүктеме теңгергішін жоюға болады.

Теңгергішті жою үшін:

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Қажетті теңгергіш орналасқан жобаны таңдаңыз.
1. Бөлімге өтіңіз **Виртуалды желілер** → **Жүктеме теңгергіштері**.
1. Қажетті теңгергіш үшін келесі әрекеттердің бірін орындаңыз:

   - Жалауша арқылы теңгергішті таңдап, содан кейін **Жою**.
   - Теңгергіш үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып **Теңгергішті жою**.

1. Теңгергішті жоюды растаңыз.

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

   1. OpenStack CLI [орнатылған](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz)  [қосымша пакетімен](/kz/tools-for-using-services/cli/openstack-cli#2_opcionaldy_kosymsha_paketterdi_ornatynyz) `python-octaviaclient`.
   1. OpenStack CLI ішінде [авторизациялана](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz) аласыз.

1. [идентификаторын алыңыз](#zhukteme_tengergishterinin_tizimin_zhne_olar_turaly_akparatty_karau) OpenStack CLI-ге қосылыңыз.

1. Теңгергішті жойыңыз:

   ```console
   openstack loadbalancer delete <ID_БАЛАНСИРОВЩИКА>
   ```

{/tab}

{/tabs}
