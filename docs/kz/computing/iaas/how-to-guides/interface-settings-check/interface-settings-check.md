{include(/kz/_includes/_translated_by_ai.md)}

ВМ-ге желілік интерфейс қосылғаннан кейін оны тексеріп, қажет болса ВМ операциялық жүйесінде оның баптауларын түзетіңіз.

## Дайындық қадамдары

Виртуалды машинаның желілік интерфейс конфигурациясы туралы ақпаратты алыңыз:

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне өтіңіз.
1. Виртуалды машина орналасқан жобаны таңдаңыз.
1. **Бұлтты есептеулер → Виртуалды машиналар** бөліміне өтіңіз.
1. Қажетті виртуалды машинаның атауын басыңыз.
1. **Желілер** қойындысына өтіңіз.
1. Желі туралы келесі ақпаратты жазып алыңыз:

   - желі мен ішкі желінің атауы;
   - ішкі желі үшін шлюз және CIDR;
   - IP-адрестер: private IP-адрес және Floating IP-адрес (бар болса);
   - MAC-адрес;
   - Firewall баптаулары (қауіпсіздік топтарының тізімі).

   Мысал үшін келесі мәндер қолданылады:

   <!-- prettier-ignore-start -->
   | Параметр                                            | Мәні                  |
   |-----------------------------------------------------| --------------------- |
   | Желі атауы                                          | `demoNetwork`         |
   | Ішкі желі атауы                                     | `demoSubnet`          |
   | Шлюз                                                | `10.0.0.1`            |
   | CIDR                                                | `10.0.0.0/24`         |
   | Private IP-адрес                                    | `10.0.0.5`            |
   | CIDR префиксімен бірге private IP-адрес             | `10.0.0.5/24`         |
   | Floating IP-адрес                                   | `192.0.2.22`          |
   | MAC-адрес                                           | `fa:16:3e:aa:bb:cc`   |
   | Firewall баптаулары                                 | `default`             |
   <!-- prettier-ignore-end -->

## 1. Желілік интерфейс баптауының дұрыстығын тексеріңіз

1. Виртуалды машинаның консоліне қосылып, авторизациядан өтіңіз.

1. Команданы орындаңыз:

   ```console
    ip link show
   ```

   {caption(Шығыс мысалы)[align=left;position=above]}
    ```text
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT                   group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode                   DEFAULT group default qlen 1000
    link/ether fa:16:3e:aa:bb:cc brd ff:ff:ff:ff:ff:ff
    altname enp0s3
   ```
   {/caption}

   Команда шығысынан `link\ether` параметрі бұрын алынған MAC-адреспен сәйкес келетін интерфейс атауын табыңыз. Бұл мысалда — `ens3`.

   {note:info}

   Linux-тың әртүрлі дистрибутивтері үшін интерфейс атауы әртүрлі болады.

   {/note}

1. Алдыңғы қадамда алынған интерфейс атауын қойып, команданы орындаңыз:

   ```console
   ip address show ens3
   ```

   {caption(Шығыс мысалы)[align=left;position=above]}
   ```text
   2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
        link/ether fa:16:3e:aa:bb:cc brd ff:ff:ff:ff:ff:ff
        altname enp0s3
        inet 10.0.0.5/24 metric 100 brd 10.0.0.255 scope global dynamic ens3
        valid_lft 603373sec preferred_lft 603373sec
        inet6 fe80::f816:3eff:feb4:d70f/64 scope link
           valid_lft forever preferred_lft forever
   ```
   {/caption}

   Шығыста мыналар болуы керек:

   - Интерфейс күйі туралы мәлімет: `state UP`.
   - Виртуалды машинаның private IP-адресі, ішкі желінің CIDR-індегі `/24` префиксімен біріктірілген. Шығыс мысалында бұл IP-адрес (`10.0.0.5/24`) `inet` параметрінде көрсетілген.

1. Команданы орындаңыз:

   ```console
   ip route show default
   ```

   {caption(Шығыс мысалы)[align=left;position=above]}
   ```text
   default via 10.0.0.1 dev ens3 proto dhcp src 10.0.0.5 metric 100
   ```
   {/caption}

   Шығыста мыналардың бар екеніне көз жеткізіңіз:

   - Шлюздің IP-адресі (`via 10.0.0.1`).
   - Бұрын алынған интерфейс атауы (`dev ens3`).
   - Виртуалды машинаның private IP-адресі (`src 10.0.0.5`).

   Егер `ip address show` және `ip route show` командаларының шығысында келтірілген мәліметтер болса, онда желілік интерфейс баптаулары дұрыс. Нұсқаулықтың қалған қадамдарын өткізіп жіберіңіз. 

   Егер `ip address show` және `ip route show` командаларының шығысында келтірілген мәліметтер болмаса, онда желілік интерфейс баптаулары дұрыс емес. Желілік интерфейсті баптаңыз.

## 2. ВМ желілік интерфейсін баптаңыз

{tabs}
{tab(Ubuntu)}

1. `/etc/netplan/50-cloud-init.yaml` файлын келесі түрге келтіріңіз:

    ```yaml
    network:
        ethernets:
            ens3: # Имя интерфейса
                dhcp4: false
                addresses:
                    - 10.0.0.5/24 # Приватный IP-адрес + префикс из CIDR
                routes:
                    - to: 0.0.0.0/0
                      via: 10.0.0.1 # Адрес шлюза
                nameservers:
                    addresses:
                        - 5.61.237.120
                        - 5.61.237.127
                match:
                    macaddress: fa:16:3e:aa:bb:cc # MAC-адрес
                set-name: ens3
        version: 2
    ```

   Қажет болса, `networks.ethernets.ens3.nameservers.addresses` параметрінде басқа DNS-серверлерді көрсетіңіз.

1. Команданы орындаңыз:

    ```console
    sudo netplan apply
    ```

1. Өңделген конфигурациялық файлға автоматты өзгерістер енгізуге тыйым салыңыз:

    ```console
    echo 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
    ```

{/tab}
{tab(Debian)}

1. `/etc/network/interfaces.d/50-cloud-init` файлын келесі түрге келтіріңіз:

    ```ini
    # This file is generated from information provided by the datasource.  Changes
    # to it will not persist across an instance reboot.  To disable cloud-init's
    # network configuration capabilities, write a file
    # /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg with the following:
    # network: {config: disabled}
    auto lo
    iface lo inet loopback

    auto eth0 # Имя интерфейса
    iface eth0 inet static
    address 10.0.0.5/24 # Приватный IP-адрес + префикс из CIDR
    gateway 10.0.0.1 # Адрес шлюза
    dns-nameservers 5.61.237.120 5.61.237.127
    ```

   Қажет болса, `dns-nameservers` параметрінде басқа DNS-серверлерді көрсетіңіз.

1. Желілік қосылымды қайта іске қосыңыз:

    ```console
    sudo systemctl restart networking
    ```

1. Өңделген конфигурациялық файлға автоматты өзгерістер енгізуге тыйым салыңыз:

    ```console
    echo 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
    ```

{/tab}
{tab(AlmaLinux, CentOS)}

1. `/etc/sysconfig/network-scripts/ifcfg-<ИМЯ_ИНТЕРФЕЙСА>` файлын келесі түрге келтіріңіз:

    ```ini
    # Created by cloud-init on instance boot automatically, do not edit.
    #
    BOOTPROTO=none
    DEVICE=eth0 # Имя интерфейса
    HWADDR=FA:16:3E:AA:BB:CC # MAC-адрес
    MTU=1500
    ONBOOT=yes
    TYPE=Ethernet
    USERCTL=no
    PROXY_METHOD=none
    BROWSER_ONLY=no
    IPADDR=10.0.0.5 # Приватный IP-адрес
    PREFIX=24 # Префикс из CIDR
    DEFROUTE=yes
    IPV4_FAILURE_FATAL=no
    IPV6INIT=no
    NAME="System eth0" # Используйте это имя позднее для перезапуска сетевого соединения
    UUID=5fb06bd0-aaaa-bbbb-cccc-d6edd65f3e03 # Для вашей ВМ UUID будет другим
    GATEWAY=10.0.0.1 # Адрес шлюза
    DNS1=5.61.237.120 # DNS-сервер 1
    DNS2=5.61.237.127 # DNS-сервер 2
    ```

   Қажет болса, `DNS1` және `DNS2` параметрлерінде басқа DNS-серверлерді көрсетіңіз.

1. Желілік қосылымды қайта іске қосыңыз:

    ```console
    sudo nmcli con up "System eth0"
    ```

1. Өңделген конфигурациялық файлға автоматты өзгерістер енгізуге тыйым салыңыз:

    ```console
    echo 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
    ```

{/tab}
{tab(openSUSE)}

1. `/etc/sysconfig/network/ifcfg-<ИМЯ_ИНТЕРФЕЙСА>` файлын келесі түрге келтіріңіз:

    ```ini
    IPADDR='10.0.0.5/24' # Приватный IP-адрес + префикс из CIDR
    BOOTPROTO='static'
    STARTMODE='hotplug'
    ```

1. `/etc/sysconfig/network/routes` файлында шлюз адресін көрсетіңіз:

    ```ini
    default 10.0.0.1 - -
    ```

1. `/etc/sysconfig/network/config` файлында DNS-серверлердің адрестерін көрсетіңіз:

    ```ini
    NETCONFIG_DNS_STATIC_SERVERS="5.61.237.120 5.61.237.127"
    ```

   Қажет болса, басқа DNS-серверлерді көрсетіңіз.

1. DNS-серверлер баптауларын қолданыңыз:

    ```console
    sudo netconfig update
    ```

1. Желілік қосылымды қайта іске қосыңыз:

    ```console
    sudo systemctl restart network
    ```

1. Өңделген конфигурациялық файлға автоматты өзгерістер енгізуге тыйым салыңыз:

    ```console
    echo 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
    ```

{/tab}
{/tabs}

## 3. ВМ-ге қолжетімділіктің бар екенін тексеріңіз

Виртуалды машинаға [қосылып көріңіз](/kz/computing/iaas/instructions/vm/vm-connect). 

Егер қосылу мүмкін болмаса, ВМ-де 2-қадамнан бастап желі мәселелеріне [диагностика жүргізіңіз](/kz/computing/iaas/troubleshooting/linux-vm-network#2_kazhetti_koldanbalardyn_virtualdy_mashinada_iske_kosylganyn_tekseriniz).
