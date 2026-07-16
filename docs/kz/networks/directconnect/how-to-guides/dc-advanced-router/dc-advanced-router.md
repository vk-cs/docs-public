# {heading({var(cloud)} жүйесіне Cloud Direct Connect желісі арқылы қосылу)[id=directconnect-dc-advanced-router]}

{include(/kz/_includes/_translated_by_ai.md)}

Cloud Direct Connect сіздің жергілікті инфрақұрылымыңызда орналасқан желіні {linkto(/kz/networks/vnet/concepts/onpremise-connect#vnet-onpremise-connect)[text=қосудың әртүрлі нұсқаларын]} {var(cloud)} виртуалды желілеріне ұйымдастыруға мүмкіндік береді. Бұл мысалда қосылу Cloud Direct Connect бөлінген байланыс арнасы және [BGP](https://datatracker.ietf.org/doc/html/rfc1163) протоколы бойынша динамикалық маршруттауы бар кеңейтілген маршрутизатор арқылы жасалады.

{note:info}
Мұндай қосылу нұсқасы үшін BGP протоколын пайдалану міндетті емес. Сіздің қосылу сызбаңыз осы нұсқаулықта қолданылған сызбадан өзгеше болуы мүмкін.
{/note}

Бұл конфигурацияда кеңейтілген маршрутизатор жоба ішіндегі жалғыз маршрутизатор болып табылады және оған қосылған желідегі виртуалды машиналар үшін шлюз рөлін атқарады. Бұл — жергілікті инфрақұрылымыңызбен желілік байланысты ұйымдастырудың ең қарапайым тәсілі, ол тестілеуге немесе бұлтта желілік байланыстың істен шығуға төзімділігін қажет етпейтін қолданбаны орналастыруға қолайлы.

Желілік байланысты ұйымдастыру сызбасы келесі түрде көрінеді:

![Желілік байланысты ұйымдастыру сызбасы](/kz/networks/directconnect/how-to-guides/dc-advanced-router/assets/cdc_p1.png){params[noBorder=true]}

Конфигурация шектеулері:

- {linkto(/kz/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP мекенжайын]} пайдалану мүмкін емес. Балама ретінде DNAT (Destination NAT) трансляциясын баптауға болады.
- {linkto(/kz/start/concepts/architecture#architecture-delivery-models)[text=PaaS-сервистерін]} қосу мүмкін емес, өйткені оларды орналастыру үшін {var(cloud)} {linkto(/kz/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-internet-address-pool)[text=жария IP мекенжайлары]} арқылы интернетке қолжетімділік қажет.
- Тек SDN Sprut бар жобаларда қолжетімді.

{note:info}
{var(cloud)} қашықтағы инфрақұрылымға {linkto(/kz/networks/vnet/concepts/onpremise-connect#vnet-onpremise-connect)[text=қосудың әртүрлі нұсқаларын]} баптауға мүмкіндік береді. Нұсқаны таңдау жоба SDN-іне, қашықтағы инфрақұрылымнан интернетке қолжетімділікке және қосылымның істен шығуға төзімділігіне қойылатын талаптарға байланысты.
{/note}

## {heading(Дайындық қадамдары)[id=directconnect-dc-advanced-router-prep]}

1. Егер әлі жасалмаса, {linkto(/kz/tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=API арқылы қолжетімділікті белсендіріңіз]}.
1. OpenStack клиенті {linkto(/kz/tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. Компьютеріңізде [curl](https://curl.se/docs) және [jq](https://jqlang.org) пакеттері орнатылғанына көз жеткізіңіз.
1. Жергілікті инфрақұрылымыңызда желіні таңдаңыз немесе жасаңыз. Желінің интернетке қолжетімділігі болмауы мүмкін, бірақ ол мынадай маршрутизаторға қосылған болуы керек:

    - BGP протоколы бойынша қосылымды қолдайтын;
    - (опционалды түрде) BFD протоколын қолдайтын: бұл ақау болған жағдайда маршруттауды қалпына келтіру уақытын қысқартуға мүмкіндік береді;
    - клиенттік желідегі құрылғы немесе виртуалды машина бола алатын.

   Келесі ақпаратты жазып алыңыз:

    - ішкі желінің атауы мен IP мекенжайы;
    - ішкі желі орналасқан желінің атауы;
    - желілер арасындағы байланысты тексеру үшін пайдаланылатын ішкі желідегі машинаның IP мекенжайы;
    - BGP маршрутизаторының атауы.

   Мысал ретінде BGP маршрутизаторы функцияларын орындайтын Router OS 7.10 (MikroTik) виртуалды машинасы бар желі пайдаланылады.

1. {var(cloud)} жобасында виртуалды желіні таңдаңыз немесе {linkto(/kz/networks/vnet/instructions/net#vnet-net-add)[text=жасаңыз]}. Желіні маршрутизаторға қоспау керек.

   Келесі ақпаратты жазып алыңыз:

    - ішкі желінің атауы мен IP мекенжайы;
    - ішкі желі орналасқан желінің атауы.

1. Таңдалған желіде {linkto(/kz/computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=виртуалды машина жасаңыз]}.

   ВМ IP мекенжайын жазып алыңыз.
1. Егер әлі жасалмаса, Cloud Direct Connect сервисіне {linkto(/kz/networks/directconnect/connect#directconnect-connect)[text=қосылыңыз]}.
1. Қосылған желінің UUID мәнін біліңіз:

    1. {var(cloud)} жеке кабинетіне [өтіңіз](https://cloud.vk.com/app/).
    1. Жобаны таңдаңыз.
    1. **Виртуалды желілер** → **Желілер** бөліміне өтіңіз.
    1. Желілер тізімінен `external-vni-10XXX` атауы бар желіні табыңыз. Мұнда `XXX` — қосылымыңыздың жеке реттік нөмірі.
    1. Осы желінің UUID мәнін сақтаңыз. Бұл мысалда желілік түйіспенің UUID мәні — `b2b8468e-aaaa-bbbb-cccc-327c8c2670d4`.

1. Әрі қарай жұмыс істеуге қажетті барлық мәлімет жиналғанына көз жеткізіңіз.

[cols="1,1,1,1", options="header"]
|===
|Нысан
|Клиенттік желі
|Виртуалды желі
|Cloud Direct Connect желісі

|Желі
|`customer-net`
|`vkcloud-net`
|`external-vni-10XXX`, `b2b8468e-aaaa-bbbb-cccc-327c8c2670d4`

|Ішкі желі
|`customer-subnet`, `10.0.0.0/24`
|`vkcloud-subnet`, `172.17.0.0/24`
|![](/kz/assets/no.svg "inline")

|Виртуалды машина
|`10.0.0.5`
|`172.17.0.8`
|![](/kz/assets/no.svg "inline")

|BGP маршрутизаторы
|`MikroTik`
|![](/kz/assets/no.svg "inline")
|![](/kz/assets/no.svg "inline")
|===

## {heading(1. Транзиттік ішкі желіні қосыңыз)[id=directconnect-dc-advanced-router-add-subnet]}

Cloud Direct Connect желісіне `/30` маскасымен транзиттік ішкі желіні {linkto(/kz/networks/vnet/how-to-guides/custom-subnet#vnet-custom-subnet)[text=қосыңыз]}. Ортаның айнымалыларын қосу кезінде `N_ID="<ЖЕЛІЛІК_ТҮЙІСПЕ_UUID>"` параметрін көрсетіңіз.

Ішкі желінің атауы мен CIDR мәнін жазып алыңыз. Бұл мысалда: `dc-subnet`, `192.168.0.0/30`.

## {heading(2. Кеңейтілген маршрутизаторды қосыңыз)[id=directconnect-dc-advanced-router-add-advanced-router]}

Келесі параметрлері бар кеңейтілген маршрутизаторды {linkto(/kz/networks/vnet/instructions/advanced-router/manage-advanced-routers#vnet-manage-advanced-routers-add)[text=жасаңыз]}:

- **Атауы**: бұл мысалда `Advanced router`;
- **SNAT**: опция өшірілген.

## {heading(3. Кеңейтілген маршрутизатордың желілік интерфейстерін баптаңыз)[id=directconnect-dc-advanced-router-network-configure]}

1. Виртуалды желіге бағытталған кеңейтілген маршрутизатор интерфейсін {linkto(/kz/networks/vnet/instructions/advanced-router/manage-interfaces#vnet-manage-interfaces-add)[text=қосыңыз]}:

    - **Атауы**: `vkcloud-net-iface`;
    - **Ішкі желі**: `vkcloud-subnet`;
    - **Интерфейс IP мекенжайы**: `172.17.0.100`.
1. Cloud Direct Connect желісіне бағытталған кеңейтілген маршрутизатор интерфейсін қосыңыз:

    - **Атауы**: `dc-iface`;
    - **Ішкі желі**: `dc-subnet`;
    - **Интерфейс IP мекенжайы**: `192.168.0.1`.

## {heading(4. Клиенттік желідегі BGP маршрутизаторының желілік интерфейстерін баптаңыз)[id=directconnect-dc-advanced-router-client-configure]}

1. Желілік интерфейстерді қосыңыз:

    - Cloud Direct Connect желісіне бағытталған — `dc-subnet`. Бұл интерфейс {var(cloud)} пен клиенттік желі арасындағы байланысты ұйымдастыруға көмектеседі.
    - BGP маршрутизаторы орналасқан клиенттік желіге бағытталған. Бұл интерфейстер желі ішіндегі ресурстарға қосылу үшін пайдаланылады. Мұндай интерфейстер саны желі құрылымына байланысты.

   Бұл мысалда:

    - `192.168.0.2` — `dc-subnet` ішкі желісіне интерфейс;
    - `10.0.0.15` — `10.0.0.5` виртуалды машинасына дейінгі клиенттік желіге интерфейс.

1. Интерфейстерді DHCP көмегімен баптаңыз.
1. Жүйелік идентификаторды (System ID) баптаңыз.
1. BGP анонсы үшін желілер тізімін дайындаңыз.
1. (Опционалды түрде) Егер маршрутизатор BFD-ні қолдаса, BFD протоколын баптаңыз.

{cut(MikroTik үшін баптау мысалы)}

1. Желілік интерфейстерді қосу үшін MikroTik-ке SSH арқылы қосылып, команданы орындаңыз:

   ```console
    /ip address add address=192.168.0.2/30 interface ether1
    /ip address add address=10.0.0.15/24 interface ether2
   ```

1. Интерфейстерді DHCP көмегімен баптаңыз:

   ```console
    /ip dhcp-client
    add add-default-route=no interface=ether1
    add add-default-route=no interface=ether2
   ```

1. Жүйелік идентификаторды (System ID) баптаңыз:

   ```console
    /system identity
    set name=bgp-customer
   ```

1. BGP анонсы үшін желілер тізімін дайындаңыз:

   ```console
    /ip firewall address-list
    add address=10.0.0.0/24 list=bgp_networks
   ```

1. BFD протоколын баптаңыз:

   ```console
    /routing bfd configuration
    add disabled=no interfaces=ether1
   ```

{/cut}

## {heading(5. Кеңейтілген маршрутизатор үшін eBGP көршілігін баптаңыз)[id=directconnect-dc-advanced-router-ebgp-router]}

BGP протоколы бойынша байланысты баптау үшін динамикалық маршруттарды қосып, BGP көршілерін көрсету керек. Динамикалық маршруттауды баптау үшін автономды желілердің нөмірлері — ASN қажет. Баптауды `64512`–`65534` ауқымындағы жеке ASN нөмірлерін пайдаланып орындау керек, бұл ретте {var(cloud)} жүйесіндегі маршрутизаторлар мен қашықтағы инфрақұрылым жағындағы маршрутизаторлардағы ASN нөмірлері әртүрлі болуы тиіс. Мысалда келесі нөмірлер пайдаланылады:

- `65512` — `customer-net` желісі үшін;
- `64512` — `vkcloud-net` желісі үшін.

Кеңейтілген маршрутизаторда динамикалық маршруттарды баптау үшін:

1. [Жеке кабинетте](https://kz.cloud.vk.com/app/) **Виртуалды желілер** → **Маршрутизаторлар** бөліміне өтіңіз.
1. Қосылған кеңейтілген маршрутизаторды ашып, **Динамикалық маршруттау** қойындысына өтіңіз.
1. **BGP маршрутизаторын жасау** батырмасын басыңыз.
1. BGP маршрутизаторының параметрлерін көрсетіңіз:

    - **Атауы**: `to-MikroTik`;
    - **Router ID**: `192.168.0.1`;
    - **ASN**: `64512`.

1. **Жасау** батырмасын басыңыз.
1. Қосылған BGP маршрутизаторын ашып, **BGP көршілері** қойындысына өтіңіз.
1. BGP көршісін қосыңыз. Параметрлерді көрсетіңіз:

    - **Атауы**: `MikroTik`;
    - **Remote neighbor**: `192.168.0.2`;
    - **Remote ASN**: `65512`.

1. **Жасау** батырмасын басыңыз.

Маршрутизатор көршімен байланыс орнатқанына көз жеткізіңіз: атаудың жанындағы маркер жасыл түсте болуы тиіс. Егер BFD пайдаланылса, BFD маркерінің де жасыл жанып тұрғанына көз жеткізіңіз.

Кеңейтілген маршрутизатор BGP көршілігі сәтті келісілгеннен кейін бірден өз көршісіне BGP анонстарын жібере бастайды. **BGP анонстары** қойындысына өтіп, маршрутизатор интерфейстері бағытталған барлық желілердің анонстарын жіберіп тұрғанына көз жеткізіңіз:

- `172.17.0.0/24`;
- `192.168.0.0/30`.

Екі анонста да жасыл маркерлер болуы тиіс.

## {heading(6. Клиенттік желі маршрутизаторы үшін BGP көршілігін баптаңыз)[id=directconnect-dc-advanced-router-bgp-client]}

1. Жергілікті желіңіздегі маршрутизаторға қосылыңыз.
1. BGP протоколы бойынша қосылу параметрлерін көрсетіңіз:

    - жергілікті желінің ASN: `65512`;
    - маршрутизатор идентификаторы: `192.168.0.2`;
    - сыртқы желінің ASN: `64512`;
    - BGP көршісінің ID: `192.168.0.1`;
    - BFD пайдалану.

1. (Опционалды түрде) BFD протоколы бойынша байланыс орнатылғанын тексеріңіз.
1. BGP көршісімен байланыс орнатылғанын тексеріңіз. Егер BGP қосылымы орнатылса, жауапта нөлден өзгеше `keepalive-time` және `uptime` мәндері келуі тиіс.
1. Қолжетімді барлық BGP маршруттарын қарап шығыңыз. Маршруттар тізімінде `172.17.0.0/24` және `192.168.0.0/30` желілері көрсетілуі тиіс.

{cut(MikroTik үшін баптау мысалы)}

1. MikroTik-ке SSH арқылы қосылып, команданы орындаңыз:

    ```console
    /routing bgp connection
    add address-families=ip as=65512 local.address=192.168.0.2 .role=ebgp name=bgp-customer output.network=bgp_networks remote.address=192.168.0.1 .as=64512 router-id=192.168.0.2 use-bfd=yes
    ```
1. BFD протоколы бойынша байланыс орнатылғанын тексеріңіз. Команданы орындаңыз:

   ```console
   /routing bfd session print
   ```

   Жауап мысалы:

   ```console
      Flags: U - up, I - inactive 
   0 U multihop=no vrf=main remote-address=192.168.0.1%ether1 local-address=192.168.0.2 state=up state-changes=1 uptime=3h27m12s desired-tx-interval=200ms actual-tx-interval=100ms 
     required-min-rx=200ms remote-min-rx=10ms multiplier=5 hold-time=1s packets-rx=75343 packets-tx=72203
   ```

1. MikroTik жағында BGP көршісімен байланыс орнатылғанын тексеріңіз. Команданы орындаңыз:

   ```console
   /routing bgp session print
   ```

   Жауап мысалы:

   ```console
      Flags: E - established
   0 E name="tw-bgp-mikrotik-1"
        remote.address=192.168.0.1 .as=64512 .id=192.168.0.1 .capabilities=mp,rr,gr,as4,ap,err,llgr .hold-time=4m
       .messages=5 .bytes=131 .gr-time=120 .eor=ip
      local.address=192.168.0.2 .as=65512 .id=192.168.0.2 .capabilities=mp,rr,gr,as4 .messages=4 .bytes=105 .eor=""
        output.procid=20 .network=bgp_networks
       input.procid=20 ebgp
      hold-time=3m keepalive-time=1m uptime=2m51s380ms last-started=aug/28/2023 07:27:15
   ```
1. Барлық MikroTik маршруттарын көру үшін команданы орындаңыз:

   ```console
   /ip route print where bgp
   ```

   Жауап мысалы:

   ```console
   Flags: D - DYNAMIC; A - ACTIVE; b, y - BGP-MPLS-VPN
   Columns: DST-ADDRESS, GATEWAY, DISTANCE
       DST-ADDRESS    GATEWAY       DISTANCE
   DAb 172.17.0.0/24  192.168.0.1        20
   D b 192.168.0.0/30 192.168.0.1        20   
   ```

{/cut}

## {heading(7. Желілер арасындағы статикалық маршруттарды баптаңыз)[id=directconnect-dc-advanced-router-static-routs]}

1. `vkcloud-net` виртуалды желісінен `customer-net` клиенттік желісіне кеңейтілген маршрутизатор арқылы статикалық маршрутты баптаңыз:

    1. [Жеке кабинетте](https://kz.cloud.vk.com/app/) **Виртуалды желілер** → **Желілер** бөліміне өтіңіз.
    1. `vkcloud-net` желісін таңдап, ішкі желі қасиеттерін ашыңыз.
    1. **Статикалық маршруттар өрісін көрсету** тармағын таңдаңыз.
    1. Маршрутты көрсетіңіз: `10.0.0.0/24 - 172.17.0.100`.
    1. **Сақтау** батырмасын басыңыз.

1. `customer-net` клиенттік желісінен `vkcloud-net` виртуалды желісіне клиенттік желідегі BGP маршрутизаторы арқылы статикалық маршрутты баптаңыз. Маршрут `172.17.0.0/24` желісіне `10.0.0.15` арқылы болуы тиіс.
1. Маршруттар олардың маршруттау желісіне түсуі үшін `172.17.0.8` және `10.0.0.5` машиналарын қайта жүктеңіз.
1. `vkcloud-net` виртуалды желісінде орналасқан `172.17.0.8` ВМ-де статикалық маршруттар жазылғанын тексеріңіз:

    1. `vkcloud-vm` ВМ-мен терминал сессиясын ашыңыз.
    1. Команданы орындаңыз:

        ```console
        ip route
        ```

       Маршруттар тізімінде `10.0.0.0/24` және `192.168.0.0/30` желілері көрсетілуі тиіс.

1. `customer-net` клиенттік желісінде орналасқан `10.0.0.5` машинасы үшін маршруттар тізімін тексеріңіз. Маршруттар тізімінде `172.17.0.0/24` және `192.168.0.0/30` желілері көрсетілуі тиіс.

## {heading(8. Жұмысқа қабілеттілікті тексеріңіз)[id=directconnect-dc-advanced-router-check]}

Тексеру үшін қарама-қарсы желідегі машинаға дейін `ping` немесе `traceout` жіберіңіз. Егер басқа желіден жауап келсе, желілердің байланысы дұрыс бапталған.

Мысалы, виртуалды желідегі `172.17.0.8` машинасынан клиенттік желідегі `10.0.0.5` машинасына пинг орындаңыз:

1. `vkcloud-vm` ВМ-мен терминал сессиясын ашыңыз.
1. Клиенттік желідегі машинаның ішкі IP мекенжайына пинг орындаңыз:

   ```console
   ping 10.0.0.5
   ```

IP мекенжайы пингке жауап беруі тиіс.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=directconnect-dc-advanced-router-delete]}

Егер жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. {linkto(/kz/computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=Виртуалды машинаны жойыңыз]}.
1. {linkto(/kz/networks/vnet/instructions/router#vnet-router-delete)[text=Маршрутизаторларды жойыңыз]}.
1. ВМ орналастырылған {linkto(/kz/networks/vnet/instructions/net#vnet-net-subnet-delete)[text=ішкі желіні]} және {linkto(/kz/networks/vnet/instructions/net#vnet-net-delete)[text=желіні]} жойыңыз.
