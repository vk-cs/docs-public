После добавления сетевого интерфейса к ВМ проверьте и при необходимости откорректируйте его настройки в операционной системе ВМ.

## Подготовительные шаги

Получите информацию о конфигурации сетевого интерфейса виртуальной машины:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится виртуальная машина.
1. Перейдите в раздел **Облачные вычисления → Виртуальные машины**.
1. Нажмите на имя нужной виртуальной машины.
1. Перейдите на вкладку **Сети**.
1. Запишите следующую информацию о сети:

   - имя сети и подсети;
   - шлюз и CIDR для подсети;
   - IP-адреса: приватный IP-адрес и Floating IP-адрес (если есть);
   - MAC-адрес;
   - настройки Firewall (список групп безопасности).

   Для примера будут использоваться следующие значения:

   <!-- prettier-ignore-start -->
   | Параметр                                            | Значение              |
   |-----------------------------------------------------| --------------------- |
   | Имя сети                                            | `demoNetwork`         |
   | Имя подсети                                         | `demoSubnet`          |
   | Шлюз                                                | `10.0.0.1`            |
   | CIDR                                                | `10.0.0.0/24`         |
   | Приватный IP-адрес                                  | `10.0.0.5`            |
   | Приватный IP-адрес в комбинации с префиксом из CIDR | `10.0.0.5/24`         |
   | Floating IP-адрес                                   | `192.0.2.22`          |
   | MAC-адрес                                           | `fa:16:3e:aa:bb:cc`   |
   | Настройки Firewall                                  | `default`             |
   <!-- prettier-ignore-end -->

## 1. Проверьте корректность настройки сетевого интерфейса

1. Подключитесь к консоли виртуальной машины и авторизуйтесь.

1. Выполните команду:

   ```console
    ip link show
   ```

   {caption(Пример вывода)[align=left;position=above]}
    ```text
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT                   group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode                   DEFAULT group default qlen 1000
    link/ether fa:16:3e:aa:bb:cc brd ff:ff:ff:ff:ff:ff
    altname enp0s3
   ```
   {/caption}

   Найдите в выводе команды имя интерфейса, для которого параметр `link\ether` совпадает с MAC-адресом, полученным ранее. В этом примере — `ens3`.

   {note:info}

   Для разных дистрибутивов Linux имя интерфейса различается.

   {/note}

1. Выполните команду, подставив в нее полученное на предыдущем шаге имя интерфейса:

   ```console
   ip address show ens3
   ```

   {caption(Пример вывода)[align=left;position=above]}
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

   Вывод должен содержать:

   - Сведения о состоянии интерфейса: `state UP`.
   - Приватный IP-адрес виртуальной машины, скомбинированный с префиксом `/24` из CIDR подсети. В примере вывода этот IP-адрес (`10.0.0.5/24`) указан в параметре `inet`.

1. Выполните команду:

   ```console
   ip route show default
   ```

   {caption(Пример вывода)[align=left;position=above]}
   ```text
   default via 10.0.0.1 dev ens3 proto dhcp src 10.0.0.5 metric 100
   ```
   {/caption}

   Убедитесь, что вывод содержит:

   - IP-адрес шлюза (`via 10.0.0.1`).
   - Имя интерфейса, полученное ранее (`dev ens3`).
   - Приватный IP-адрес виртуальной машины (`src 10.0.0.5`).

   Если вывод команд `ip address show` и `ip route show` содержит в себе приведенные сведения, то настройки сетевого интерфейса корректны. Пропустите остальные шаги инструкции. 

   Если вывод команд `ip address show` и `ip route show` не содержит в себе приведенных сведений, то настройки сетевого интерфейса некорректны. Настройте сетевой интерфейс.

## 2. Настройте сетевой интерфейс ВМ

{tabs}
{tab(Ubuntu)}

1. Приведите файл `/etc/netplan/50-cloud-init.yaml` к следующему виду:

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

    При необходимости укажите другие DNS-серверы в параметре `networks.ethernets.ens3.nameservers.addresses`.

1. Выполните команду:

    ```console
    sudo netplan apply
    ```

1. Запретите вносить автоматические изменения в отредактированный конфигурационный файл:

    ```console
    echo 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
    ```

{/tab}
{tab(Debian)}

1. Приведите файл `/etc/network/interfaces.d/50-cloud-init` к следующему виду:

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

    При необходимости укажите другие DNS-серверы в параметре `dns-nameservers`.

1. Перезапустите сетевое соединение:

    ```console
    sudo systemctl restart networking
    ```

1. Запретите вносить автоматические изменения в отредактированный конфигурационный файл:

    ```console
    echo 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
    ```

{/tab}
{tab(AlmaLinux, CentOS)}

1. Приведите файл `/etc/sysconfig/network-scripts/ifcfg-<ИМЯ_ИНТЕРФЕЙСА>` к следующему виду:

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

    При необходимости укажите другие DNS-серверы в параметрах `DNS1` и `DNS2`.

1. Перезапустите сетевое соединение:

    ```console
    sudo nmcli con up "System eth0"
    ```

1. Запретите вносить автоматические изменения в отредактированный конфигурационный файл:

    ```console
    echo 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
    ```

{/tab}
{tab(openSUSE)}

1. Приведите файл `/etc/sysconfig/network/ifcfg-<ИМЯ_ИНТЕРФЕЙСА>` к следующему виду:

    ```ini
    IPADDR='10.0.0.5/24' # Приватный IP-адрес + префикс из CIDR
    BOOTPROTO='static'
    STARTMODE='hotplug'
    ```

1. В файле `/etc/sysconfig/network/routes` укажите адрес шлюза:

    ```ini
    default 10.0.0.1 - -
    ```

1. В файле `/etc/sysconfig/network/config` укажите адреса DNS-серверов:

    ```ini
    NETCONFIG_DNS_STATIC_SERVERS="5.61.237.120 5.61.237.127"
    ```

    При необходимости укажите другие DNS-серверы.

1. Примените настройки DNS-серверов:

    ```console
    sudo netconfig update
    ```

1. Перезапустите сетевое соединение:

    ```console
    sudo systemctl restart network
    ```

1. Запретите вносить автоматические изменения в отредактированный конфигурационный файл:

    ```console
    echo 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
    ```

{/tab}
{/tabs}

## 3. Проверьте наличие доступа к ВМ

Попытайтесь [подключиться](/ru/computing/iaas/instructions/vm/vm-connect) к виртуальной машине. 

Если подключиться не удалось, на ВМ [выполните диагностику](/ru/computing/iaas/troubleshooting/linux-vm-network#2_proverte_chto_nuzhnye_prilozheniya_zapushcheny_na_virtualnoy_mashine) проблем с сетью, начиная с шага 2.