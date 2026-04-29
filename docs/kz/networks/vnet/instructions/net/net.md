{include(/kz/_includes/_translated_by_ai.md)}

Бұлттық желіден бөлек, сіз ішкі желілерді де жасай аласыз. Әдепкі бойынша жобада бірнеше ішкі желісі бар бір желі әлдеқашан жасалған. Желі мен ішкі желі жасалғаннан кейін олар жобаға тиесілі барлық виртуалды машиналар үшін бірден қолжетімді болады.

{note:warn}

[Ортақ желілерді](../../concepts/net-types#shared_net) тек олардың иесі болып табылатын жобадан басқаруға болады.

{/note}

## Желілер мен ішкі желілер тізімін, сондай-ақ олар туралы ақпаратты қарау

{tabs}

{tab(Жеке кабинет)}

1. Жеке кабинетте **Виртуалды желілер** → **Желілер** бөліміне өтіңіз.

   Желілер тізімі көрсетіледі.

1. Қажетті желінің атауын басыңыз.

   Ол туралы толық ақпарат бар бет ашылады. Соның ішінде осы желідегі ішкі желілер тізімі де көрсетіледі.

1. Қажетті ішкі желінің атауын басыңыз.

   Ол туралы толық ақпарат бар бет ашылады.

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

    1. OpenStack CLI [орнатылған](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
    1. OpenStack CLI-де [авторлануыңыз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) мүмкін.

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

## Желіні жасау

{tabs}

{tab(Жеке кабинет)}

1. VK Cloud [жеке кабинетіне](https://kz.cloud.vk.com/app/) өтіңіз.
1. Қажетті IP-мекенжай орналасқан жобаны таңдаңыз.
1. **Виртуалды желілер** → **Желілер** бөліміне өтіңіз.
1. **Жасау** батырмасын басыңыз.
1. Желінің атауын беріңіз.
1. SDN таңдаңыз: `Sprut` (әдепкі бойынша) немесе `Neutron`. Екі [SDN түрі](/kz/networks/vnet/concepts/sdn) де қосылған жобалар үшін таңдау қолжетімді.

   {note:info}

   VK Cloud-та SDN Neutron пайдаланудан шығарылады және жаңа жобалар үшін қосылмайды. Сондай-ақ SDN Neutron `PA2` [қолжетімділік аймағында](/kz/start/concepts/architecture#az) пайдаланылмайды.

   {/note}

1. (Міндетті емес) Желідегі ВМ-ге интернеттен қатынау болуы үшін **Интернетке қатынау** опциясын қосыңыз. Интернетке қатынау VPN, SNAT үшін міндетті.
1. (Міндетті емес) [Shadow port](../../concepts/ips-and-inet#shadow_port) желіге қосу үшін **VK Cloud сервистеріне қатынау** опциясын қосыңыз. Опция Kubernetes кластерлерін интернетке қатынауы жоқ приваттық желілерде орналастыруға мүмкіндік береді. Опция жобаға Shadow port қосылған және желі үшін интернетке қатынау өшірілген болса қолжетімді.

   {note:info}

   Shadow port-ты жобаңызға қосу үшін [техникалық қолдауға](/kz/contacts) хабарласыңыз.

   {/note}
1. Тізімнен [маршрутизаторды](../../concepts/router) таңдаңыз. Егер **Интернетке қатынау** опциясы қосылған болса, тізімде тек [сыртқы желіге](../../concepts/net-types#external_net) қосылған маршрутизаторлар болады.
1. Приваттық DNS үшін [аймақты](../../../dns/instructions/private-dns) көрсетіңіз.
1. Әдепкі бойынша ішкі желі әлдеқашан жасалған, бірақ тағы ішкі желі қоса аласыз. Егер ішкі желілерді кейін қосу қажет болса, бұл қадамды өткізіп жіберіңіз.
1. **Желі қосу** батырмасын басыңыз.

Желі жасалғаннан кейін ол желілердің жалпы тізімінде пайда болады.

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

    1. OpenStack CLI [орнатылған](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
    1. OpenStack CLI-де [авторлануыңыз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) мүмкін.

1. Пәрменді орындаңыз:

   ```console
   openstack network create <ИМЯ_СЕТИ>
   ```

{/tab}

{/tabs}

## Желіні редакциялау

{tabs}

{tab(Жеке кабинет)}

1. Жеке кабинетте **Виртуалды желілер** → **Желілер** бөліміне өтіңіз.
2. Бұлттық желінің атауын басыңыз.
3. **Желіні баптау** бөліміне өтіңіз.
4. Қажетті өзгерістерді енгізіңіз.
5. **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

    1. OpenStack CLI [орнатылған](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
    1. OpenStack CLI-де [авторлануыңыз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) мүмкін.

1. Редакциялау қажет желінің [идентификаторын алыңыз](#zheliler_men_ishki_zheliler_tizimin_sonday_ak_olar_turaly_akparatty_karau).

1. Пәрмен анықтамасымен танысыңыз.

   ```console
   openstack network set --help
   ```

   Төменде пәрменнің негізгі аргументтері ғана келтірілген.

   {tabs}

   {tab(Linux/macOS (bash, zsh))}

   ```console
   openstack network set <ID_СЕТИ> \
     --name <НОВОЕ_ИМЯ_СЕТИ>
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   openstack network set <ID_СЕТИ> `
     --name <НОВОЕ_ИМЯ_СЕТИ>
   ```

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## Желіні жою

{note:warn}

Желімен бірге барлық ішкі желілер мен порттар жойылады.

{/note}

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_delete_net.md)}

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

    1. OpenStack CLI [орнатылған](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
    1. OpenStack CLI-де [авторлануыңыз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) мүмкін.

1. Жою қажет желінің [идентификаторын алыңыз](#zheliler_men_ishki_zheliler_tizimin_sonday_ak_olar_turaly_akparatty_karau).

1. Пәрменді орындаңыз:

   ```console
   openstack network delete <ID_СЕТИ>
   ```

{/tab}

{/tabs}

## Ішкі желіні жасау

{tabs}

{tab(Жеке кабинет)}

1. Жеке кабинетте **Виртуалды желілер** → **Желілер** бөліміне өтіңіз.
1. Бұлттық желінің атауын басыңыз.
1. **Ішкі желі қосу** батырмасын басыңыз.
1. Ішкі желі атауын көрсетіңіз.
1. Ішкі желінің IP-мекенжайын және шлюзін енгізіңіз.
1. (Міндетті емес) Қажет болса, DHCP-ті өшіріңіз. DHCP-ті өшіру DHCP сервисі берген IP-мекенжайларға қызмет көрсетудің тоқтауына әкеледі. Бұл виртуалды машиналардың қолжетімсіз болуына әкелуі мүмкін. Опция қосылған кезде DHCP сервері берген мекенжайлар тұрақты болып қалады.
1. DHCP IP-мекенжайларының пулын көрсетіңіз.
1. (Міндетті емес) Қажет болса, **Приваттық DNS** опциясын өшіріңіз. Өшірілген жағдайда DNS серверлерін көрсетіңіз.
1. (Міндетті емес) Статикалық маршруттарды көрсету үшін **Статикалық маршруттар өрісін көрсету** опциясын қосыңыз.
1. **Ішкі желі жасау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

    1. OpenStack CLI [орнатылған](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
    1. OpenStack CLI-де [авторлануыңыз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) мүмкін.

1. Ішкі желі жасалуы керек желінің [идентификаторын алыңыз](#zheliler_men_ishki_zheliler_tizimin_sonday_ak_olar_turaly_akparatty_karau).

1. Пәрмен анықтамасымен танысыңыз.

   ```console
   openstack subnet create --help
   ```

   Төменде пәрменнің негізгі аргументтері ғана келтірілген.

1. Пәрменді орындаңыз:

   {tabs}

   {tab(Linux/macOS (bash, zsh))}

   ```console
   openstack subnet create <ИМЯ_ПОДСЕТИ> \
     --network <ID_СЕТИ> \
     --subnet-range <CIDR_ПОДСЕТИ> \
     --gateway <IP_ШЛЮЗА> \
     --allocation-pool start=<НАЧАЛЬНЫЙ_IP_ДЛЯ_DHCP>,end=<КОНЕЧНЫЙ_IP_ДЛЯ_DHCP>
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   openstack subnet create <ИМЯ_ПОДСЕТИ> `
     --network <ID_СЕТИ> `
     --subnet-range <CIDR_ПОДСЕТИ> `
     --gateway <IP_ШЛЮЗА> `
     --allocation-pool start=<НАЧАЛЬНЫЙ_IP_ДЛЯ_DHCP>,end=<КОНЕЧНЫЙ_IP_ДЛЯ_DHCP>
   ```

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## Ішкі желіні редакциялау

{tabs}

{tab(Жеке кабинет)}

1. Жеке кабинетте **Виртуалды желілер** → **Желілер** бөліміне өтіңіз.
1. Ішкі желі орналасқан бұлттық желінің атауын басыңыз.
1. Өзгерту қажет ішкі желі үшін ![ ](/kz/assets/more-icon.svg "inline") басып, **Ішкі желіні редакциялау** тармағын таңдаңыз.
1. Қажетті өзгерістерді енгізіңіз.
1. **Сақтау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

    1. OpenStack CLI [орнатылған](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
    1. OpenStack CLI-де [авторлануыңыз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) мүмкін.

1. Редакциялау қажет ішкі желінің [идентификаторын алыңыз](#zheliler_men_ishki_zheliler_tizimin_sonday_ak_olar_turaly_akparatty_karau).

1. Ішкі желіге қажетті баптауларды қолдану немесе олардан бас тарту үшін:

    1. Пәрмендер анықтамасымен танысыңыз.

       ```console
       openstack subnet set --help
       ```

       ```console
       openstack subnet unset --help
       ```

       Төменде DHCP үшін мекенжайлар пулын, DNS сервері мекенжайын және статикалық маршрутты өзгерту арқылы ішкі желіні редакциялау мысалы келтірілген.

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

        - `<ДЕЙСТВИЕ>` — ішкі желіге қажетті баптауларды қолдану (`set`) немесе олардан бас тарту (`unset`) пәрмені.
        - `<ID_ПОДСЕТИ>` — редакциялағыңыз келетін ішкі желі идентификаторы.
        - `<НАЧАЛЬНЫЙ_IP_ДЛЯ_DHCP>` — DHCP үшін мекенжайлар пулының бастапқы IP-мекенжайы.
        - `<КОНЕЧНЫЙ_IP_ДЛЯ_DHCP>` — DHCP үшін мекенжайлар пулының соңғы IP-мекенжайы.
        - `<АДРЕС_DNS>` — DNS серверінің мекенжайы.
        - `<АДРЕС_СЕТИ_НАЗНАЧЕНИЯ>` — статикалық маршруттың тағайындалған желі мекенжайы.
        - `<АДРЕС_ШЛЮЗА>` — статикалық маршрут шлюзінің мекенжайы.

{/tab}

{/tabs}

## Ішкі желіні жою

{note:warn}

Бұлттық желіде кемінде бір ішкі желі болуы керек.
Ішкі желіні жойғаннан кейін оны қалпына келтіру мүмкін емес.

{/note}

{tabs}

{tab(Жеке кабинет)}

1. Жеке кабинетте **Виртуалды желілер** → **Желілер** бөліміне өтіңіз.
2. Ішкі желі орналасқан бұлттық желінің атауын басыңыз.
3. Жою қажет ішкі желі үшін ![ ](/kz/assets/more-icon.svg "inline") басып, **Ішкі желіні жою** тармағын таңдаңыз.
5. Ашылған терезеде **Растау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. Мыналарға көз жеткізіңіз:

    1. OpenStack CLI [орнатылған](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
    1. OpenStack CLI-де [авторлануыңыз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) мүмкін.

1. Жою қажет ішкі желінің [идентификаторын алыңыз](#zheliler_men_ishki_zheliler_tizimin_sonday_ak_olar_turaly_akparatty_karau).

1. Пәрменді орындаңыз:

   ```console
   openstack subnet delete <ID_ПОДСЕТИ>
   ```

{/tab}

{/tabs}
