# {heading({var(s3)} жүйесіне интернетсіз қосылу)[id=vnet-s3-service-net]}

{include(/kz/_includes/_translated_by_ai.md)}

{linkto(../../../../networks/vnet/concepts/net-types#vnet-net-types-service-net)[text=Сервистік желі]} интернетке қолжетімділіксіз VK Object Storage объектілік қоймасымен жұмыс істеуге мүмкіндік береді. Сіз объектілік қоймаға приватты бұлттық желіде орналасқан немесе {var(cloud)} жүйесіне {linkto(../../../../networks/directconnect/connect#directconnect-connect)[text=Direct Connect]} арқылы қосылған серверлерді қоса аласыз.

Мақалада ВМ-ден VK Object Storage жүйесіне қол жеткізу үшін сервистік желіні баптау мысалы көрсетілген.

Баптауды жеңілдету үшін ВМ SSH арқылы қолжетімді болу үшін жария желіге қосылады. Сервистік желіге қосылуды SSH арқылы қолжетімділіксіз де баптауға болады. Бұл жағдайда барлық баптаулар VNC-консоль арқылы орындалады.

{note:info}
Егер сіз сервистік желіге қосылуды Direct Connect арқылы баптасаңыз, ВМ-ге SSH арқылы қолжетімділік жария желісіз де қолжетімді болады.
{/note}

## {heading(Дайындық қадамдары)[id=vnet-s3-service-net-prep]}

1. Сервистік желіні жобаңызға қосу үшін [техникалық қолдау қызметіне](/kz/contacts) хабарласыңыз.

   Желінің атауы мен IP-мекенжайын жазып алыңыз. Бұл мысалда — `s3-ephn` және `198.18.0.0/20`.

1. {linkto(../../../../storage/s3/instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Бакет құрыңыз]} VK Object Storage сервисінде, егер бұл әлі жасалмаған болса.
1. {linkto(../../../../storage/s3/instructions/access-management/access-keys#s3-instructions-access-keys)[text=Аккаунт құрыңыз]} VK Object Storage сервисінде, егер бұл әлі жасалмаған болса. Кілт идентификаторы мен құпия кілтті сақтап қойыңыз.
1. VK Object Storage жүйесіне қолжетімділікті қосу қажет ВМ-ді дайындаңыз:

    1. {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=ВМ құрыңыз]} келесі параметрлермен:

        - **Операциялық жүйе**: бұл мысалда Ubuntu ОЖ пайдаланылады. Сіз басқа ОЖ пайдалана аласыз, бірақ ондағы желіні баптау өзгеше болады.
        - **Желі**: интернетке қолжетімді кез келген желі.
        - **Firewall баптаулары**: `default`, `ssh`.
        - **Сыртқы IP тағайындау**: опцияны қосыңыз.
        - **Резервтік көшіруді пайдалану**: қаражатты үнемдеу үшін опцияны өшіріңіз.
        - Қалған баптауларды өз қалауыңыз бойынша таңдаңыз.
    1. {linkto(../../../../computing/iaas/instructions/vm/vm-add-net#iaas-vm-add-net-connect)[text=Сервистік желіні]} ВМ-ге қосыңыз. Жобаңызға қосылған сервистік желіні таңдаңыз. Бұл мысалда — `s3-ephn`. Қалған параметрлерді әдепкі мәндерде қалдырыңыз.
    1. **Желілер** қойындысында сервистік желінің ВМ-ге қосылуындағы IP-мекенжайы мен MAC-мекенжайын қараңыз. Оларды жазып алыңыз. Бұл мысалда — `198.18.14.1` және `fa:16:3e:d8:86:43`.
    1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=ВМ-ге қосылыңыз]} SSH арқылы.
    1. Пакеттерді өзекті нұсқаға дейін жаңартып, командалар көмегімен ВМ-ді қайта жүктеңіз:

        ```console
        sudo apt update && sudo apt upgrade -y
        sudo reboot
        ```

    1. (Опционалды) Желілік баптаулармен жұмыс істеу үшін [Netplan](https://www.altlinux.org/Netplan) утилитасын орнатыңыз. Ubuntu 18 және одан жоғары ОЖ бар виртуалды машиналарда бұл утилита әдепкі бойынша орнатылған.
    1. {linkto(../../../../storage/s3/connect/s3-cli#s3-connect-cli)[text=AWS CLI баптаңыз]} VK Object Storage жүйесімен жұмыс істеу үшін.

## {heading(1. Сервистік желіге қосылуды баптаңыз)[id=vnet-s3-service-net-service-network-connection]}

Сервистік желіні ВМ-ге қосқаннан кейін онда жаңа желілік интерфейс пайда болады. Сервистік желіде DHCP жоқ, сондықтан интерфейсті қолмен баптау керек.

Сервистік желіге бағытталған ВМ желілік интерфейсін баптау үшін:

1. ВМ-мен терминал сессиясын ашып, root-пайдаланушы құқықтарын алыңыз:

    ```console
    sudo bash
    ```

1. ВМ желілік интерфейстерінің тізімін қараңыз:

    ```console
    ip a
    ```

   Тізімнен MAC-мекенжайы жеке кабинеттегі сервистік желіге қосылу интерфейсінің MAC-мекенжайымен сәйкес келетін интерфейсті табыңыз.

   Жауап мысалы:

    ```console
    ens7: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether fa:16:3e:d8:86:43 brd ff:ff:ff:ff:ff:ff
    altname enp0s7
    ```
1. Netplan үшін желілік интерфейстің жаңа конфигурация файлын жасаңыз:

    ```console
    nano /etc/netplan/service.yaml
    ```

1. Конфигурация файлына келесі желілік баптауларды көрсетіп, сақтаңыз:

    ```yaml
    network:
    version: 2
    ethernets:
        ens7:
            addresses:
            - 198.18.14.1/20
            match:
                macaddress: fa:16:3e:d8:86:43
            mtu: 1500
            set-name: ens7
    ```

   Мұнда:

    - `ens7` — сервистік желіге бағытталған ВМ интерфейсінің атауы;
    - `addresses` — сервистік желінің IP-мекенжайы;
    - `macaddress` — сервистік желінің MAC-мекенжайы.

1. Команданы орындап, баптауларды қолданыңыз:

    ```console
    netplan apply
    ```

1. VK Object Storage трафигін сервистік желі арқылы бағыттаңыз. Ол үшін сервис домені мен сервистік желідегі оның IP-мекенжайы арасындағы сәйкестікті көрсетіңіз:

    1. `hosts` файлын ашыңыз:

        ```console
        nano /etc/hosts
        ```

    1. Файлға жолды қосып, өзгерістерді сақтаңыз:

        ```txt
        198.18.0.1   hb.ru-msk.vkcloud-storage.ru
        ```

1. VK Object Storage жүйесіне қосылу сервистік желі арқылы орнатылатынын тексеріңіз:

    ```console
    curl hb.ru-msk.vkcloud-storage.ru -v
    ```

   Жауапта мына жол болуы тиіс:

    ```console
    Connected to hb.ru-msk.vkcloud-storage.ru (198.18.0.1) port 80 (#0)
    ```

## {heading(2. (Опционалды) Жария желіні өшіріңіз)[id=vnet-s3-service-net-disconnect-public-network]}

Егер сізге ВМ-ге SSH арқылы қолжетімділік енді қажет болмаса, ВМ-ді құру кезінде қосылған интернетке қолжетімді желіні {linkto(../../../../computing/iaas/instructions/vm/vm-add-net#iaas-vm-add-net-delete)[text=өшіріңіз]}.

## {heading(3. VK Object Storage сервисіне қосылуды тексеріңіз)[id=vnet-s3-service-net-check]}

1. ВМ-ге қосылыңыз:

    - жария желі өшірілген болса, {linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console)[text=VNC-консоль арқылы]}.
    - жария желі өшірілмеген болса, {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=SSH арқылы]}.
1. Команданы орындаңыз:

    ```console
    aws s3 ls --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Мұнда `--endpoint-url` — VK Object Storage сервисінің домені, ол аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймағына]} сәйкес келуі тиіс. Мүмкін мәндер:

    - `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
    - `https://hb.kz-ast.bizmrg.com` — Қазақстан аймағының домені.

   Жауапта VK Object Storage бакеттерінің тізімі қайтарылуы тиіс.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=vnet-s3-service-net-delete]}

Егер құрылған ресурстар сізге енді қажет болмаса, оларды жойыңыз:

1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=Виртуалды машинаны жойыңыз]}.
1. ВМ орналастырылған желілерді {linkto(../../../../networks/vnet/instructions/net#vnet-net-delete)[text=жойыңыз]}.
