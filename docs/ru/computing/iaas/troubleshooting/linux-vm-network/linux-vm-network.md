В этом руководстве приведены рекомендации по устранению проблем с конфигурацией сети на виртуальных машинах Linux.

В качестве примера предполагается, что:

- виртуальная машина имеет только один сетевой интерфейс;
- решается проблема отсутствующего доступа к виртуальной машине по SSH.

Описанные подходы также могут быть использованы, когда потерян доступ до другого приложения (например, веб-сервера NGINX) или когда у виртуальной машины есть несколько сетевых интерфейсов.

## Пример проблемы

- Невозможно подключиться к виртуальной машине по SSH по ее приватному IP-адресу или Floating IP-адресу (если он есть).
- Некоторое время назад проблем с подключением не было.

## Перед началом работы

1. Выполните принудительную перезагрузку.

   Эта операция может помочь, если виртуальная машина не отвечает или ее сетевой интерфейс инициализируется некорректно:
   1. [Остановите](../../instructions/vm/vm-manage#start_stop_restart_vm) виртуальную машину.
   1. Для остановленной виртуальной машины [выполните](../../instructions/vm/vm-manage#prinuditelnyy_perezapusk_vm) принудительный перезапуск.

   Если это не решило проблему, выполните остальные шаги и перейдите к диагностике.

1. [Убедитесь](../../instructions/vm/vm-manage#start_stop_restart_vm), что виртуальная машина запущена.

1. [Убедитесь](../../instructions/vm/vm-console#vnc_konsol), что вы можете получить доступ к VNC-консоли виртуальной машины и авторизоваться в ней.

   Если это необходимо, [восстановите пароль](../../instructions/vm/vm-manage#vosstanovlenie_parolya) для логина.

1. Получите информацию о конфигурации сетевого интерфейса виртуальной машины:

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужная виртуальная машина.
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
      | --------------------------------------------------- | --------------------- |
      | Имя сети                                            | `demoNetwork`         |
      | Имя подсети                                         | `demoSubnet`          |
      | Шлюз                                                | `10.0.0.1`            |
      | CIDR                                                | `10.0.0.0/24`         |
      | Приватный IP-адрес                                  | `10.0.0.5`            |
      | Приватный IP-адрес в комбинации с префиксом из CIDR | `10.0.0.5/24`         |
      | Floating IP-адрес                                  | `192.0.2.22`          |
      | MAC-адрес                                           | `fa:16:3e:aa:bb:cc`   |
      | Настройки Firewall                                  | `default`             |
      <!-- prettier-ignore-end -->

## 1. Проверьте настройки сетевого интерфейса

Иногда подключению препятствуют некорректная инициализация сетевого интерфейса виртуальной машины или его неверные настройки.

Проверьте корректность настройки сетевого интерфейса:

1. Подключитесь к консоли виртуальной машины и авторизуйтесь.

2. Выполните команду:

    ```console
    ip link show
    ```

    Пример вывода:

    ```text
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT                   group default qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode                   DEFAULT group default qlen 1000
        link/ether fa:16:3e:aa:bb:cc brd ff:ff:ff:ff:ff:ff
        altname enp0s3
    ```

    Найдите в выводе команды имя интерфейса, для которого параметр `link\ether` совпадает с MAC-адресом, полученным ранее.
    В данном примере это будет `ens3`.

    {note:info}

    Для разных дистрибутивов Linux имя интерфейса будет различаться.

    {/note}

3.  Выполните команду, подставив в нее полученное на предыдущем шаге имя интерфейса:

    ```console
    ip address show ens3
    ```

    Пример вывода:

    ```text
    2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
        link/ether fa:16:3e:aa:bb:cc brd ff:ff:ff:ff:ff:ff
        altname enp0s3
        inet 10.0.0.5/24 metric 100 brd 10.0.0.255 scope global dynamic ens3
           valid_lft 603373sec preferred_lft 603373sec
        inet6 fe80::f816:3eff:feb4:d70f/64 scope link
           valid_lft forever preferred_lft forever
    ```

    Вывод должен содержать:

    - Сведения о состоянии интерфейса: `state UP`.
    - Приватный IP-адрес виртуальной машины, скомбинированный с префиксом `/24` из CIDR подсети, в параметре `inet` (`10.0.0.5/24`).

4. Выполните команду:

    ```console
    ip route show default
    ```

    Пример вывода:

    ```text
    default via 10.0.0.1 dev ens3 proto dhcp src 10.0.0.5 metric 100
    ```

    Убедитесь, что вывод содержит:

    - IP-адрес шлюза (`via 10.0.0.1`).
    - Имя интерфейса, полученное ранее (`dev ens3`).
    - Приватный IP-адрес виртуальной машины (`src 10.0.0.5`).

    Если вывод команд `ip address show` и `ip route show` содержит в себе приведенные сведения, то настройки сетевого интерфейса корректны. Перейдите к [проверке приложений](#2_proverte_chto_nuzhnye_prilozheniya_zapushcheny_na_virtualnoy_mashine).

    Если вывод команд `ip address show` и `ip route show` не содержит в себе приведенных сведений, то настройки сетевого интерфейса некорректны.

5. Настройте сетевой интерфейс вручную:

    <tabs>
    <tablist>
    <tab>Ubuntu</tab>
    <tab>Debian</tab>
    <tab>AlmaLinux, CentOS</tab>
    <tab>openSUSE</tab>
    </tablist>
    <tabpanel>

    1. Отредактируйте файл `/etc/netplan/50-cloud-init.yaml` и приведите его к следующему виду:

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

    </tabpanel>
    <tabpanel>

    1. Отредактируйте файл `/etc/network/interfaces.d/50-cloud-init` и приведите его к следующему виду:

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

    1. Перезапустите сетевое соединение, выполнив команду:

        ```console
        sudo systemctl restart networking
        ```

    </tabpanel>
    <tabpanel>

    1. Отредактируйте файл `/etc/sysconfig/network-scripts/ifcfg-<имя интерфейса>` и приведите его к следующему виду:

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

    1. Перезапустите сетевое соединение, выполнив команду:

        ```console
        sudo nmcli con up "System eth0"
        ```

    </tabpanel>
    <tabpanel>

    1. Отредактируйте файл `/etc/sysconfig/network/ifcfg-<имя интерфейса>` и приведите его к следующему виду:

       ```ini
       IPADDR='10.0.0.5/24' # Приватный IP-адрес + префикс из CIDR
       BOOTPROTO='static'
       STARTMODE='hotplug'
       ```

    1. Отредактируйте файл `/etc/sysconfig/network/routes` и укажите адрес шлюза:

       ```ini
       default 10.0.0.1 - -
       ```

    1. Отредактируйте файл `/etc/sysconfig/network/config` и укажите адреса DNS-серверов:

       ```ini
       NETCONFIG_DNS_STATIC_SERVERS="5.61.237.120 5.61.237.127"
       ```

       При необходимости укажите другие DNS-серверы.

    1. Примените настройки DNS-серверов:

       ```console
       sudo netconfig update
       ```

    1. Перезапустите сетевое соединение, выполнив команду:

        ```console
        sudo systemctl restart network
        ```

    </tabpanel>
    </tabs>

6. Запретите вносить автоматические изменения в отредактированный конфигурационный файл:

    ```console
    echo 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
    ```

7. Проверьте наличие доступа по SSH к виртуальной машине. Если доступ не появился, [перейдите к проверке приложений](#2_proverte_chto_nuzhnye_prilozheniya_zapushcheny_na_virtualnoy_mashine).

## 2. Проверьте, что нужные приложения запущены на виртуальной машине

Сетевой интерфейс может быть исправен, но приложения и сервисы могут быть не запущены или работать на нестандартном порте.

Проверьте работу SSH:

1. Подключитесь к консоли виртуальной машины и авторизуйтесь.

1. Выполните команду:

    ```console
    sudo systemctl status ssh
    ```

    По выводу команды определите, запущен ли сервис:

    - `Active: active (running)`: сервис SSH запущен.
    - `Active: inactive (dead)`: сервис SSH не запущен.

1. В зависимости от статуса сервиса SSH выполните следующие действия:

    <tabs>
    <tablist>
    <tab>Если сервис SSH запущен</tab>
    <tab>Если сервис SSH не запущен</tab>
    </tablist>
    <tabpanel>

    1. Определите, на каком порте работает сервис SSH:

       ```console
       sudo cat /etc/ssh/sshd_config | grep -w Port
       ```

       В выводе будет содержаться номер порта:

       ```text
       Port 22
       ```

        Если сервис работает на стандартном порте `22` — [перейдите к проверке настроек файервола ВМ](#3_proverte_nastroyki_fayervola_virtualnoy_mashiny). В противном случае переходите к следующему шагу.

    1. Подключитесь, используя номер нестандартного порта. Например, если сервис SSH работает на порте `222`:

        ```console
        ssh -i /path/to/private_key_file username@192.0.2.22 -p 222
        ```

    1. Проверьте наличие доступа по SSH к виртуальной машине. Если доступ не появился, [перейдите к проверке настроек файервола ВМ](#3_proverte_nastroyki_fayervola_virtualnoy_mashiny).

    </tabpanel>
    <tabpanel>

    1. Определите, на каком порте работает сервис SSH:

        ```console
        sudo cat /etc/ssh/sshd_config | grep -w Port
        ```

        В выводе будет содержаться номер порта:

        ```text
        Port 22
        ```

    1. Убедитесь, что другие процессы не используют этот порт. Просмотрите логи сервиса SSH:

        ```console
        sudo journalctl -xeu ssh
        ```

        Если в логах есть подобная строка, то порт сервиса SSH используется другим процессом:

        ```text
        error: Bind to port 22 on 0.0.0.0 failed: Address already in use.
        ```

        Если в логах нет такой строки, [перейдите к проверке настроек файервола ВМ](#3_proverte_nastroyki_fayervola_virtualnoy_mashiny).

    1. Определите, какой процесс занял порт:

        1. Установите утилиту `netstat`:

            <tabs>
            <tablist>
            <tab>Debian, Ubuntu</tab>
            <tab>AlmaLinux, CentOS<tab>
            </tablist>
            <tabpanel>

            ```console
            sudo apt install net-tools -y
            ```

            </tabpanel>
            <tabpanel>

            ```console
            sudo yum install net-tools -y
            ```

            </tabpanel>
            </tabs>

        1. Выполните команду:

            ```console
            sudo netstat -plntu | grep :22
            ```

            В этом примере вывода порт `22` используется процессом `some-other-service` с PID `1234`:

            ```text
            tcp   0   0 0.0.0.0:22   0.0.0.0:*  LISTEN   1234/some-other-service
            tcp6  0   0 :::22        :::*       LISTEN   1234/some-other-service
            ```

    1. Остановите процесс, использующий порт SSH:

        - либо с помощью `systemctl`:

            ```console
            sudo systemctl stop some-other-service
            ```

        - либо принудительно завершив работу процесса:

            ```console
            sudo kill 1234
            ```

    1. Измените настройки сервиса, соответствующего остановленному процессу, чтобы сервис использовал порт, отличный от `22`.

    1. Перезапустите сервис:

        ```console
        sudo systemctl restart some-other-service
        ```

    1. Перезапустите сервис SSH:

        ```console
        sudo systemctl restart sshd
        ```

    1. Убедитесь, что сервис SSH успешно запущен:

        ```console
        sudo systemctl status sshd
        ```

        Пример части вывода:

        ```text
        Active: active (running)
        ```

        Если сервис SSH не запускается, проверьте настройки сервиса в конфигурационном файле `/etc/ssh/sshd_config`.
        Для получения дополнительной информации о проблемах в работе сервиса посмотрите логи:

        ```console
        sudo journalctl -xeu ssh
        ```

    1. Проверьте наличие доступа по SSH к виртуальной машине. Если доступ не появился, [перейдите к проверке настроек файервола ВМ](#3_proverte_nastroyki_fayervola_virtualnoy_mashiny).

    </tabpanel>
    </tabs>

## 3. Проверьте настройки файервола виртуальной машины

Если на виртуальной машине настроен файервол (например, `iptables`, `ufw`, `firewalld`), то он может препятствовать подключению, даже если IP-адрес виртуальной машины корректный, а сервис SSH настроен и работает.

Далее будет показано, как временно отключить все правила файервола, разрешив весь трафик. Это поможет убедиться, что проблема именно в файерволе.

{note:warn}

После того, как проблема с SSH-подключением будет локализована, включите правила файервола обратно (с необходимыми корректировками). Если весь трафик разрешен, безопасность виртуальной машины снизится.

{/note}

Чтобы проверить настройки файервола:

1. Подключитесь к консоли виртуальной машины и авторизуйтесь.

1. Отключите файервол:

    <tabs>
    <tablist>
    <tab>ufw</tab>
    <tab>firewalld</tab>
    <tab>iptables</tab>
    </tablist>
    <tabpanel>

    ```console
    sudo ufw disable
    ```

    </tabpanel>
    <tabpanel>

    ```console
    sudo systemctl stop firewalld
    ```

    </tabpanel>
    <tabpanel>

    1. Сохраните существующие правила `iptables`:

        ```console
        sudo iptables-save | sudo tee ~/iptables.rules
        ```

    1. Выполните команды:

        ```console
        sudo iptables -P INPUT ACCEPT
        sudo iptables -P FORWARD ACCEPT
        sudo iptables -P OUTPUT ACCEPT
        sudo iptables -t nat -F
        sudo iptables -t mangle -F
        sudo iptables -F
        sudo iptables -X

        ```

    </tabpanel>
    </tabs>

1. Проверьте наличие доступа по SSH к виртуальной машине.

   Если доступ появился, скорректируйте правила файервола и снова включите его.

   Если доступ не появился, снова включите файервол и [проверьте настройки групп безопасности файервола VK Cloud](#4_proverte_nastroyki_grupp_bezopasnosti_fayervola_vk_cloud).

Чтобы снова включить файервол:

1. Подключитесь к консоли виртуальной машины и авторизуйтесь.

1. Выполните команду:

    <tabs>
    <tablist>
    <tab>ufw</tab>
    <tab>firewalld</tab>
    <tab>iptables</tab>
    </tablist>
    <tabpanel>

    ```console
    sudo ufw enable
    ```

    </tabpanel>
    <tabpanel>

    ```console
    sudo systemctl start firewalld
    ```

    </tabpanel>
    <tabpanel>

    ```console
    sudo iptables-restore < ~/iptables.rules
    ```

    </tabpanel>
    </tabs>

## 4. Проверьте настройки групп безопасности файервола VK Cloud

Некорректно настроенные группы безопасности могут препятствовать подключению по SSH, даже если на уровне виртуальной машины препятствий нет.

Далее будет показано, как временно настроить правила файервола так, чтобы разрешить весь трафик. Это поможет убедиться, что проблема именно в файерволе.

{note:warn}

После того, как проблема с SSH-подключением будет локализована, заново настройте правила файервола (с необходимыми корректировками). Если весь трафик разрешен, безопасность виртуальной машины снизится.

{/note}

Чтобы проверить настройки файервола:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужная виртуальная машина.
1. Перейдите в раздел **Облачные вычисления → Виртуальные машины**.
1. Нажмите на имя нужной виртуальной машины.
1. Перейдите на вкладку **Сети**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного сетевого подключения и выберите пункт **Редактировать подключение**.
1. В параметре **Настройки Firewall**:

    1. Удалите все выбранные группы безопасности.
    1. Выберите из выпадающего списка группы безопасности `default` и `all` («все разрешено»).

       Группа безопасности `default` разрешает любой исходящий трафик. Группа безопасности `all` разрешает любой входящий трафик.

1. Нажмите кнопку **Сохранить**.

1. Проверьте наличие доступа по SSH к виртуальной машине.

    Если доступ появился, скорректируйте группы безопасности файервола и добавьте их снова вместо группы `all`.

    Если доступ не появился, вернитесь к исходным настройкам файервола и [обратитесь в техническую поддержку](#5_obratites_v_tehnicheskuyu_podderzhku).

Чтобы снова настроить правила файервола:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужная виртуальная машина.
1. Перейдите в раздел **Облачные вычисления → Виртуальные машины**.
1. Нажмите на имя нужной виртуальной машины.
1. Перейдите на вкладку **Сети**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного сетевого подключения и выберите пункт **Редактировать подключение**.
1. В параметре **Настройки Firewall**:

    1. Удалите группу безопасности `all`.
    1. Выберите из выпадающего списка необходимые группы безопасности.

        Если выбранные группы безопасности не содержат правила, разрешающие исходящий трафик, выберите также группу безопасности `default`. Эта группа разрешает исходящий трафик. В противном случае у виртуальной машины не будет доступа в сеть.

    {note:info}

    Чтобы файервол пропускал трафик SSH-сервиса, работающего на стандартном порте `22`, достаточно выбрать правила `default` и `ssh` («разрешен только ssh»).

    {/note}

## 5. Обратитесь в техническую поддержку

Если диагностика не помогла в решении проблемы, [обратитесь в техническую поддержку](/ru/contacts), предоставив информацию, полученную при диагностике.
