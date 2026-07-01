# {heading(Желілер мен ішкі желілер)[id=vnet-net]}

{include(/kz/_includes/_translated_by_ai.md)}

Бұлттық желіден бөлек, сіз ішкі желілерді де жасай аласыз. Әдепкі бойынша жобада бірнеше ішкі желісі бар бір желі әлдеқашан жасалған. Желіні және ішкі желіні жасағаннан кейін олар жобаға тиесілі барлық виртуалды машиналар үшін бірден қолжетімді болады.

{ifdef(public)}
{note:warn}

[Ортақ желілерді](/kz/networks/vnet/concepts/net-types) тек иесі болып табылатын жобадан басқаруға болады.

{/note}
{/ifdef}

## {heading(Желілер мен ішкі желілер тізімін, сондай-ақ олар туралы ақпаратты қарау)[id=vnet-net-view]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
1. Желі орналасқан жобаны таңдаңыз.
1. **Виртуалды желілер → Желілер** бөліміне өтіңіз.

   Желілер тізімі көрсетіледі.

1. Қажетті желінің атауын басыңыз.

   Ол туралы толық ақпарат бар бет ашылады. Соның ішінде осы желідегі ішкі желілер тізімі де көрсетіледі.

1. Қажетті ішкі желінің атауын басыңыз.

   Ол туралы толық ақпарат бар бет ашылады.

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

    1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылған]}.
    1. Сіз OpenStack CLI-де {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторлана аласыз]}.

1. Желілер тізімін және олардың идентификаторларын көру үшін пәрменді орындаңыз:

   ```console
   openstack network list
   ```

1. Желі туралы толық ақпаратты көру үшін пәрменді орындаңыз:

   ```console
   openstack network show <ID_СЕТИ>
   ```

1. Барлық ішкі желілер тізімін және олардың идентификаторларын көру үшін пәрменді орындаңыз:

   ```console
   openstack subnet list
   ```

1. Белгілі бір желіге тиесілі барлық ішкі желілер тізімін және олардың идентификаторларын көру үшін пәрменді орындаңыз:

   ```console
   openstack subnet list --network <ID_СЕТИ>
   ```

1. Ішкі желі туралы толық ақпаратты көру үшін пәрменді орындаңыз:

   ```console
   openstack subnet show <ID_ПОДСЕТИ>
   ```

{/tab}

{/tabs}

## {heading(Желі жасау)[id=vnet-net-add]}

{ifndef(public)}
{note:warn}
Әдепкі бойынша жеке кабинетте `vxlan` түріндегі желілер жасалады. Басқа түрдегі желілерді жасау үшін OpenStack CLI пайдаланыңыз.
{/note}
{/ifndef}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
1. Желі орналасқан жобаны таңдаңыз.
1. **Виртуалды желілер → Желілер** бөліміне өтіңіз.
1. **Создать** түймесін басыңыз.
1. Желі атауын орнатыңыз.
1. SDN таңдаңыз: `Sprut` (әдепкі бойынша) немесе `Neutron`. Таңдау екі [SDN түрі](/kz/networks/vnet/concepts/sdn) де қосылған жобалар үшін қолжетімді.

   {note:info}

   VK Cloud-тағы SDN Neutron пайдаланудан шығарылуда және жаңа жобалар үшін қосылмайды. Сондай-ақ SDN Neutron `PA2` [қолжетімділік аймағында](/kz/start/concepts/architecture#az) қолданылмайды.

   {/note}

1. (Қалауыңызша) Желідегі ВМ интернеттен қолжетімді болуы үшін **Доступ в интернет** опциясын қосыңыз. Интернетке қолжетімділік VPN және SNAT үшін міндетті.
   {ifdef(public)}
1. (Қалауыңызша) Желiге {linkto(../../concepts/ips-and-inet#vnet-ips-and-inet-shadow-port)[text=Shadow port]} қосу үшін **Доступ к сервисам {var(cloud)}** опциясын қосыңыз. Бұл опция Kubernetes кластерлерін интернетке қолжетімділігі жоқ жекеменшік желілерде орналастыруға мүмкіндік береді. Опция Shadow port жобаға қосылған және желі үшін интернетке қолжетімділік өшірілген жағдайда қолжетімді.

   {note:info}
   Shadow port-ты жобаңызға қосу үшін [техникалық қолдауға](/kz/contacts) жүгініңіз.
   {/note}
   {/ifdef}

1. Тізімнен {linkto(../../concepts/router#vnet-router)[text=маршрутизаторды]} таңдаңыз. Егер **Доступ в интернет** опциясы қосылған болса, тізімде тек {linkto(../../concepts/net-types#vnet-net-types-external-net)[text=сыртқы желіге]} қосылған маршрутизаторлар ғана болады.
1. Жекеменшік DNS үшін {ifdef(public)}{linkto(../../../dns/instructions/private-dns#dns-private-dns)[text=аймақты]}{/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../instructions/private-dns#vnet-private-dns)[text=аймақты]}{/ifdef} көрсетіңіз.
1. Әдепкі бойынша ішкі желі әлдеқашан жасалған, бірақ сіз тағы біреуін қоса аласыз. Егер ішкі желілерді кейін қосу керек болса, бұл қадамды өткізіп жіберіңіз.
1. **Добавить сеть** түймесін басыңыз.

Желі жасалғаннан кейін ол желілердің жалпы тізімінде пайда болады.

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

    1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылған]}.
    1. Сіз OpenStack CLI-де {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторлана аласыз]}.

1. Пәрменді орындаңыз:

   ```console
   openstack network create <ИМЯ_СЕТИ>
   ```

{/tab}

{/tabs}

## {heading(Желіні өңдеу)[id=vnet-net-edit]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
1. Желі орналасқан жобаны таңдаңыз.
1. **Виртуалды желілер → Желілер** бөліміне өтіңіз.
1. Бұлттық желінің атауын басыңыз.
1. **Настройка сети** бөліміне өтіңіз.
1. Қажетті өзгерістерді енгізіңіз.
1. **Сохранить изменения** түймесін басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

    1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылған]}.
    1. Сіз OpenStack CLI-де {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторлана аласыз]}.

1. Өңделуі керек желінің {linkto(#vnet-net-view)[text=идентификаторын алыңыз]}.

1. Пәрмен анықтамасымен танысыңыз.

   ```console
   openstack network set --help
   ```

   Төменде пәрменнің тек негізгі аргументтері берілген.

1. Желiге қажетті баптауларды қолдану үшін пәрменді орындаңыз:

   {tabs}

   {tab(Linux/macOS (bash, zsh))}

   ```console
   openstack network set <ID_СЕТИ>      --name <НОВОЕ_ИМЯ_СЕТИ>      --dns-domain <НОВЫЙ_DNS-ДОМЕН>
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   openstack network set <ID_СЕТИ> `
     --name <НОВОЕ_ИМЯ_СЕТИ> `
     --dns-domain <НОВЫЙ_DNS-ДОМЕН>
   ```

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Желіні жою)[id=vnet-net-delete]}

{note:warn}
Желімен бірге барлық ішкі желілер мен порттар жойылады.
{/note}

{tabs}

{tab(Жеке кабинет)}

{include(../../../../_includes/_delete_net.md)}

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

    1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылған]}.
    1. Сіз OpenStack CLI-де {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторлана аласыз]}.

1. Жойылуы керек желінің {linkto(#vnet-net-view)[text=идентификаторын алыңыз]}.

1. Пәрменді орындаңыз:

   ```console
   openstack network delete <ID_СЕТИ>
   ```

{/tab}

{/tabs}

## {heading(Ішкі желіні жасау)[id=vnet-net-subnet-add]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
1. Желі орналасқан жобаны таңдаңыз.
1. **Виртуалды желілер → Желілер** бөліміне өтіңіз..
1. Бұлттық желінің атауын басыңыз.
1. **Добавить подсеть** түймесін басыңыз.
1. Ішкі желінің атауын көрсетіңіз.
1. Ішкі желінің IP-мекенжайын және шлюзін енгізіңіз.
1. (Қалауыңызша) Қажет болса, DHCP-ті өшіріңіз. DHCP-ті өшіру DHCP сервисі берген IP-мекенжайлардың қызмет көрсетілуін тоқтатуға әкеледі. Бұл виртуалды машиналардың қолжетімсіз болуына әкелуі мүмкін. Опция қосылып тұрған кезде DHCP сервері берген мекенжайлар тұрақты болып қалады.
1. DHCP IP-мекенжайлар пулын көрсетіңіз.
1. (Қалауыңызша) Қажет болса, **Приватный DNS** опциясын өшіріңіз. Өшірілген жағдайда DNS серверлерін көрсетіңіз.

   {note:info}
   Ішкі желіні жасағаннан кейін {linkto(../../../dns/concepts/about#dns-about-private)[text=жеке DNS-серверлердің]} мекенжайларын тек жаңа ішкі желі құру арқылы ғана өзгертуге болады.

   Қолмен көрсетілген DNS-серверлердің мекенжайларын OpenStack CLI көмегімен {linkto(#vnet-net-subnet-edit)[text=өңдеуге]} болады.
   {/note}
   
1. (Қалауыңызша) Статикалық маршруттарды көрсету үшін **Показать поле статических маршрутов** опциясын қосыңыз.
1. **Создать подсеть** түймесін басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

    1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылған]}.
    1. Сіз OpenStack CLI-де {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторлана аласыз]}.

1. Ішкі желі жасалуы керек желінің {linkto(#vnet-net-view)[text=идентификаторын алыңыз]}.

1. Пәрмен анықтамасымен танысыңыз.

   ```console
   openstack subnet create --help
   ```

   Төменде пәрменнің тек негізгі аргументтері берілген.

1. Пәрменді орындаңыз:

   {tabs}

   {tab(Linux/macOS (bash, zsh))}

   ```console
   openstack subnet create <ИМЯ_ПОДСЕТИ> \
     --subnet-range <АДРЕС_ПОДСЕТИ> \
     --network <ID_СЕТИ> \
     --dns-nameserver <АДРЕС_DNS-СЕРВЕРА> \
     --gateway <АДРЕС_ШЛЮЗА>
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   openstack subnet create <ИМЯ_ПОДСЕТИ> `
     --subnet-range <АДРЕС_ПОДСЕТИ> `
     --network <ID_СЕТИ> `
     --dns-nameserver <АДРЕС_DNS-СЕРВЕРА> `
     --gateway <АДРЕС_ШЛЮЗА>
   ```

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Ішкі желіні өңдеу)[id=vnet-net-subnet-edit]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
1. Желі орналасқан жобаны таңдаңыз.
1. **Виртуалды желілер → Желілер** бөліміне өтіңіз.
1. Ішкі желі орналасқан бұлттық желінің атауын басыңыз.
1. Өзгерту қажет ішкі желі үшін ![ ](../../../../assets/more-icon.svg "inline") басып, **Редактировать подсеть** тармағын таңдаңыз.
1. Қажетті өзгерістерді енгізіңіз.
1. **Сохранить** түймесін басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

    1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылған]}.
    1. Сіз OpenStack CLI-де {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторлана аласыз]}.

1. Өңделуі керек ішкі желінің {linkto(#vnet-net-view)[text=идентификаторын алыңыз]}.

1. Ішкі желіге қажетті баптауларды қолдану немесе олардан бас тарту үшін:

    1. Пәрмендер анықтамасымен танысыңыз.

       ```console
       openstack subnet set --help
       ```

       ```console
       openstack subnet unset --help
       ```

       Төменде DHCP үшін мекенжайлар пулын, DNS серверінің мекенжайын және статикалық маршрутты өзгерте отырып, ішкі желіні өңдеудің мысалы келтірілген.

       {note:warn}
       DNS параметрлерін өзгерту PaaS қызметтерінде мәселелер тудыруы мүмкін.
       {/note}

    1. Пәрменді орындаңыз:

       {tabs}

       {tab(Linux/macOS (bash, zsh))}

       ```console
       openstack subnet <ДЕЙСТВИЕ> <ID_ПОДСЕТИ> \
         --allocation-pool start=<НАЧАЛЬНЫЙ_IP_ДЛЯ_DHCP>,end=<КОНЕЧНЫЙ_IP_ДЛЯ_DHCP> \
         --dns-nameserver <АДРЕС_DNS> \
         --host-route destination=<АДРЕС_СЕТИ_НАЗНАЧЕНИЯ>,gateway=<АДРЕС_ШЛЮЗА>
       ```
       {/tab}

       {tab(Windows (PowerShell))}

       ```console
       openstack subnet <ДЕЙСТВИЕ> <ID_ПОДСЕТИ> `
         --allocation-pool start=<НАЧАЛЬНЫЙ_IP_ДЛЯ_DHCP>,end=<КОНЕЧНЫЙ_IP_ДЛЯ_DHCP> `
         --dns-nameserver <АДРЕС_DNS> `
         --host-route destination=<АДРЕС_СЕТИ_НАЗНАЧЕНИЯ>,gateway=<АДРЕС_ШЛЮЗА>
       ```

       {/tab}

       {/tabs}

       Мұнда:

        - `<ДЕЙСТВИЕ>` — ішкі желіге қажетті баптауларды қолдану (`set`) немесе олардан бас тарту (`unset`) үшін қолданылатын пәрмен.
        - `<ID_ПОДСЕТИ>` — өңдегіңіз келетін ішкі желінің идентификаторы.
        - `<НАЧАЛЬНЫЙ_IP_ДЛЯ_DHCP>` — DHCP үшін мекенжайлар пулының бастапқы IP-мекенжайы.
        - `<КОНЕЧНЫЙ_IP_ДЛЯ_DHCP>` — DHCP үшін мекенжайлар пулының соңғы IP-мекенжайы.
        - `<АДРЕС_DNS>` — DNS серверінің мекенжайы.
        - `<АДРЕС_СЕТИ_НАЗНАЧЕНИЯ>` — статикалық маршруттың тағайындалу желісінің мекенжайы.
        - `<АДРЕС_ШЛЮЗА>` — статикалық маршрут шлюзінің мекенжайы.

{/tab}

{/tabs}

## {heading(Ішкі желіні жою)[id=vnet-net-subnet-delete]}

{note:warn}
Бұлттық желіде кемінде бір ішкі желі болуы керек.
Ішкі желі жойылғаннан кейін оны қалпына келтіру мүмкін емес.
{/note}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
1. Желі орналасқан жобаны таңдаңыз.
1. **Виртуалды желілер → Желілер** бөліміне өтіңіз.
1. Ішкі желі орналасқан бұлттық желінің атауын басыңыз.
1. Жойылуы керек ішкі желі үшін ![ ](../../../../assets/more-icon.svg "inline") басып, **Удалить подсеть** тармағын таңдаңыз.
1. Ашылған терезеде **Подтвердить** түймесін басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

    1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылған]}.
    1. Сіз OpenStack CLI-де {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторлана аласыз]}.

1. Жойылуы керек ішкі желінің {linkto(#vnet-net-view)[text=идентификаторын алыңыз]}.

1. Пәрменді орындаңыз:

   ```console
   openstack subnet delete <ID_ПОДСЕТИ>
   ```

{/tab}

{/tabs}
