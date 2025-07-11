## Подготовительные шаги

1. Выберите проект для миграции.
1. [Посмотрите](/ru/tools-for-using-services/account/instructions/project-settings/manage#sdn_view), какие SDN подключены в вашем проекте. Если SDN Sprut не подключена, обратитесь в [техническую поддержку](/ru/contacts).
1. Подготовьте рабочее место администратора для выполнения миграции:

    1. [Создайте ВМ](/ru/computing/iaas/instructions/vm/vm-create) в подсети с доступом к интернету. Укажите следующие параметры:

        - **Операционная система**: выберите Ubuntu.
        - **Настройки Firewall**: укажите `ssh` для доступа к ВМ через CLI.
        - **Назначить внешний IP**: включите опцию.
        - Остальные параметры выберите на свое усмотрение.

    1. Дождитесь, когда ВМ будет создана, и [подключитесь к ней по SSH](/ru/computing/iaas/instructions/vm/vm-connect/vm-connect-nix).

    1. Обновите индексы пакетов, выполнив команду:

        ```console
        sudo apt-get update
        ```

    1. Установите утилиту [jq](https://jqlang.github.io/jq/):

        ```console
        sudo apt-get install -y jq
        ```

    1. Установите [клиент OpenStack](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

    1. Скопируйте репозиторий со скриптами для выполнения миграции:

        ```console
        git clone https://github.com/vk-cs/neutron-2-sprut.git
        ```
    1. Перейдите в директорию `neutron-2-sprut`.
    1. Выполните команду, которая добавит права на выполнение всех файлов с расширением `.sh` в этой директории:

        ```console
        chmod +x .sh
        ```

## 1. Соберите данные об инфраструктуре проекта для миграции

Проведите оценку сетевой инфраструктуры проекта и определите сущности, которые нужно перенести:

1. Подключитесь к ВМ администратора по SSH.
1. Получите список ВМ:

    ```console
    openstack server list
    ```
    В ответе найдите и сохраните следующие сведения:

     - ID тех виртуальных машин, которые имеют несколько сетевых интерфейсов.
     - ID и IP-адреса тех виртуальных машин, которые имеют назначенные Floating IP-адреса.
     - ID всех остальных ВМ, которые нужно перенести.
1. Получите список маршрутизаторов:

    ```console
    openstack router list
    ```

    Сохраните ID маршрутизаторов, которые нужно перенести.

1. Если в вашем проекте есть IPsec-туннели, сохраните ID маршрутизаторов, которые используются для построения туннеля.

1. Получите список групп безопасности:

    ```console
    ```

    Сохраните названия всех групп безопасности, кроме групп по умолчанию: `all`, `default`, `ssh+www`.

1. Группы по умолчанию `all`, `default`, `ssh+www` имеют одинаковые названия в SDN Sprut и Neutron. Узнайте и сохраните идентификаторы этих групп:

    1. [Перейдите](https://cloud.vk.com/app/) в личный кабинет VK Cloud.
    1. Выберите проект.
    1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.
    1. Найдите и сохраните ID групп `all`, `default`, `ssh+www` в SDN Sprut и Neutron.

## 2. Скопируйте маршрутизаторы, сети и подсети в SDN Sprut

1. Подключитесь к ВМ администратора по SSH и перейдите в директорию `neutron-2-sprut`.
1. Создайте конфигурационный файл в формате CSV со списком маршрутизаторов. Файл понадобится для копирования базовых сетевых сущностей при помощи скрипта.

    Формат файла:

    ```csv
    <ID маршрутизатора 1>,<std|adv>
    <ID маршрутизатора 2>,<std|adv>
    ```

    Здесь `<std|adv>` — тип копии маршрутизатора в SDN Sprut:

      - `std` — копия будет создана в виде [стандартного](/ru/networks/vnet/concepts/router#standard) маршрутизатора.
      - `adv` — копия будет создана в виде [продвинутого](/ru/networks/vnet/concepts/router#advanced) маршрутизатора. Укажите этот параметр, если маршрутизатор в вашем проекте используется для построения IPsec-туннеля.

    {cut(Пример конфигурационного файла для копирования маршрутизаторов)}

    ```csv
    35fbfb7c-aaaa-aaaa-aaaa-c3fb4d833dee,adv
    a2dd20ca-bbbb-bbbb-bbbb-7ea8b00a81a6,std
    ```
    {/cut}

1. Запустите скрипт миграции маршрутизаторов:

    ```console
    ./copy-router-and-networks.sh config.csv
    ```

    Здесь `config.csv` — имя конфигурационного файла со списком маршрутизаторов.

    В результате выполнения скрипта указанные маршрутизаторы будут скопированы в SDN Sprut вместе со статическими маршрутами, сетями и подсетями, к которым они подключены. В название каждой скопированной сущности будет добавлен постфикс `-sprut`.

## 3. Проверьте выполнение скрипта

Просмотрите скопированные сущности и убедитесь в том, что все маршрутизаторы, сети и подсети были скопированы:

1. Проверьте список сетей:

    ```console
    openstack network list
    ```

1. Проверьте список подсетей:

    ```console
    openstack subnet list
    ```

1. Проверьте список стандартных маршрутизаторов:

    ```console
    openstack router list
    ```

1. Проверьте список добавленных продвинутых маршрутизаторов. Для этого перейдите в личный кабинет или выполните запрос REST API:

    ```html
    sprut_api_base="https://infra.mail.ru:9696/v2.0"

    token=$(openstack token issue -c id -f value)

    sprut_advanced_routers=$(curl -s -X GET "${sprut_api_base}/direct_connect/dc_routers" \
        -H "Content-Type: application/json" \
        -H "X-Auth-Token: $token" \
        -H "X-SDN:SPRUT")
    echo "Advanced routers collected:"
    echo "$sprut_advanced_routers" | jq .
    echo ""
    ```

    {note:info}
    OpenStack CLI не показывает продвинутые маршрутизаторы в списке.
    {/note}

## 4. (Опционально) Настройте продвинутый маршрутизатор

Если в проекте используется IPsec-туннель, [настройте](/ru/networks/vnet/how-to-guides/onpremise-connect/advanced-router) созданный скриптом продвинутый маршрутизатор и подготовьте его к подключению IPsec-туннеля.

## 5. (Опционально) Перенесите IPsec-туннель

Туннели с одинаковыми селекторами (исходными и целевыми диапазонами подсетей) не могут существовать одновременно, даже если они находятся в разных SDN. Поэтому нельзя заранее создать туннель в SDN Sprut, аналогичный туннелю в SDN Neutron, так как это приведет к проблемам в работе исходного туннеля.

1. [Удалите](/ru/networks/vnet/instructions/vpn#udalenie_vpn_tunnelya) исходный туннель в SDN Neutron.
1. [Добавьте](/ru/networks/vnet/instructions/vpn#dobavlenie_vpn_tunnelya) новый VPN-туннель для продвинутого маршрутизатора, настроенного в SDN Sprut, и задайте параметры IPsec-политики.

## 6. Скопируйте группы безопасности в SDN Sprut

1. Подключитесь к ВМ администратора по SSH.
1. Перейдите в директорию `neutron-2-sprut`.
1. Скопируйте группы безопасности в SDN Sprut:

    ```console
     ./copy-security-group.sh \
        --group-mapping=<id группы 1 в SDN Neutron>=<id группы 1 в SDN Sprut>,<id группы 2 в SDN Neutron>=<id группы 2 в SDN Sprut>,... \
        --groups=<название группы 3>,<название группы 4>,...
    ```

    Здесь:

    - `--group-mapping`: параметр позволяет соотнести уже имеющиеся группы безопасности разных SDN между собой по ID. Это нужно, если в копируемых группах есть правила, в которых источник не CIDR, а другая группа безопасности. Как правило, это группы `all`, `default`, `ssh+www`.
    - `--groups`: имя группы безопасности в SDN Neutron, которую нужно скопировать в SDN Sprut.

    Пример команды:

    ```console
    ./copy-security-group.sh \
        --group-mapping=4a361c99-cccc-cccc-cccc-b59fb469d354=121a7574-dddd-dddd-dddd-66baa01400d6,14f303dc-aaaa-aaaa-aaaa-9637c9c342df=3371584a-bbbb-bbbb-bbbb-1cc9f3e89601 \
        --groups=web-server-security,spark-k8s-6681-master,ml_sec_group
    ```

    Группы безопасности будут скопированы с постфиксом `-sprut`.

## 7. Выполните проверку групп безопасности

Убедитесь, что группы безопасности в SDN Sprut аналогичны группам безопасности в SDN Neutron. Группы SDN Sprut, скопированные с SDN Neutron имеют постфикс `-sprut`.

1. Подключитесь к ВМ администратора по SSH и перейдите в директорию `neutron-2-sprut`.
1. Запустите скрипт:

    ```console
    ./check-if-all-sprut-sg-present.sh
    ```

    Если все нужные группы скопированы, в результате выполнения скрипта вернется сообщение:

    ```console
    All security groups have corresponding '-sprut' groups.
    ```

## 8. (Опционально) Создайте Floating IP-адрес в SDN Sprut

Floating IP-адреса нельзя перенести в другую SDN. Если в инфраструктуре вашего проекта есть Floating IP-адреса, [создайте новые Floating IP-адреса](/ru/networks/vnet/instructions/ip/floating-ip#add) в SDN Sprut и запишите их.

## 9. Переключите сетевые интерфейсы ВМ в SDN Sprut

{note:warn}
Эта операция выполняется с разрывом сетевой связности. Если вы выполняете миграцию рабочей сетевой инфраструктуры, предупредите пользователей сервиса о технических работах и выполняйте эту операцию в часы наименьшей нагрузки.
{/note}

Чтобы переместить ВМ в SDN Sprut, нужно подключить ее порты к новым подсетям. Это выполняется различными способами в зависимости от количества портов ВМ и типа подключений:

- Несколько ВМ можно переключить выполнением одного скрипта, но эти ВМ должны иметь только по одному сетевому интерфейсу и не иметь прямых подключений к внешней сети `ext-net`.
- Одну ВМ можно переключить выполнением отдельного скрипта. Такой способ подойдет, если в вашем проекте есть ВМ, которая имеет несколько сетевых интерфейсов, то есть выступает в роли маршрутизатора, прокси или пограничного файервола.
- Если в вашей конфигурации ВМ подключена напрямую к внешней сети `ext-net`, перенесите ее в SDN Sprut любым удобным способом:

  - [Добавьте](/ru/networks/vnet/instructions/ip/floating-ip#add) Floating IP-адрес в SDN Sprut и подключите к нему ВМ.
  - [Пересоздайте](/ru/computing/iaas/instructions/vm/vm-create) ВМ в SDN Sprut и подключите ее к внешней сети `internet`.

<tabs>
<tablist>
<tab>Миграция нескольких ВМ</tab>
<tab>Миграция одной ВМ</tab>
</tablist>
<tabpanel>

1. Подключитесь к ВМ администратора по SSH и перейдите в директорию `neutron-2-sprut`.
1. Создайте файл формата CSV со списком ВМ, которые нужно перенести.

    Формат файла:

    ```csv
    <VM-1>,<sprut-network-1>,<sprut-subnet-1>,<sprut-floating-ip>
    <VM-2>,<sprut-network-2>,<sprut-subnet-2>
    ```

    Здесь:

    - `<VM-1>`, `<VM-2>` — имена ВМ, которые нужно перенести в SDN Sprut.
    - `<sprut-network-1>`,`<sprut-network-2>` — имена сетей в SDN Sprut, к которым нужно подключить ВМ.
    - `<sprut-subnet-1>`, `<sprut-subnet-2>` — имена подсетей в SDN Sprut, к которым нужно подключить ВМ.
    - (Опционально) `<sprut-floating-ip>` — Floating IP-адрес в SDN Sprut, который нужно привязать к ВМ.

    Пример файла со списком ВМ:

    ```csv
    web-server-1,web-app-network-sprut,app-subnet-sprut,83.166.236.59
    web-server-2,web-app-network-sprut,app-subnet-sprut
    ```

1. Выделите техническое окно, во время которого будет проведена миграция. На время переключения ВМ потеряет сетевую связность. Переключение одной ВМ выполняется примерно за 45 секунд.

1. Убедитесь, что ВМ активны:

    ```console
    openstack server list
    ```

    У всех ВМ, которые нужно перенести в SDN Sprut, должен быть статус **ACTIVE**.

1. Запустите скрипт миграции:

    ```console
    ./migrator-multiple.sh <имя файла со списком ВМ>
    ```

    Пример команды:

    ```console
    ./migrator-multiple.sh  migrate-vm.csv
    ```

    Здесь:

    - `migrate-vm.csv`: файл с описанием ВМ, который создавался ранее.
    - `--all-secgroup-sprut-id`: группа безопасности `all` добавляется в проект по умолчанию и имеет одно название в SDN Sprut и Neutron. Если группа используется в ВМ, укажите ID группы в Sprut, чтобы  OpenStack CLI мог различить принадлежность группы безопасности к SDN.
    - `--ssh-www-secgroup-sprut-id`: группа безопасности `ssh+www` добавляется в проект по умолчанию и имеет одно название в SDN Sprut и Neutron. Если группа используется в ВМ, укажите ID группы в Sprut, чтобы  OpenStack CLI мог различить принадлежность группы безопасности к SDN.

1. Для каждой ВМ откройте консоль или подключитесь по SSH и выполните опрос DHCP-сервера для получения IP-адреса на добавленный сетевой интерфейс:

    <tabs>
    <tablist>
    <tab>Linux</tab>
    <tab>Windows</tab>
    </tablist>
    <tabpanel>

    ```console
    dhclient
    ```
    </tabpanel>
    <tabpanel>

    ```console
    ipconfig /release
    ipconfig /renew
    ```
    </tabpanel>
    </tabs>

</tabpanel>
<tabpanel>

1. Соберите необходимую информацию:

    - имя ВМ;
    - имя сети назначения в SDN Sprut;
    - имя подсети назначения в SDN Sprut.

1. Выделите техническое окно, во время которого будет проведена миграция. На время переключения ВМ потеряет сетевую связность. Переключение одной ВМ выполняется примерно за 45 секунд.
1. Подключитесь к ВМ администратора по SSH и перейдите в директорию `neutron-2-sprut`.
1. Убедитесь, что ВМ активна:

    ```console
    openstack server show <имя ВМ>
    ```

    В ответе у ВМ должен быть статус **ACTIVE**.
1. Перейдите в директорию `neutron-2-sprut`.
1. Запустите скрипт миграции:

    ```console
    ./migrator.sh --opt <clone/noclone>
    ```

    Здесь `<clone/noclone>` позволяет сохранить информацию о MAC и IP-адресах:

      - `clone` — миграция с сохранением информации о MAC и IP-адресах.
      - `noclone` — миграция назначением случайных MAC и IP-адресов из целевой подсети.

1. Введите имя ВМ, которую нужно мигрировать в SDN Sprut.
1. Введите имя сети в SDN Sprut, к которой нужно подключить ВМ.
1. Введите имя подсети в SDN Sprut, к которой нужно подключить ВМ.
1. После выполнения скрипта откройте консоль ВМ, которая была перенесена, или подключитесь по SSH и выполните опрос DHCP-сервера для получения IP-адреса на добавленные сетевые интерфейсы:

    <tabs>
    <tablist>
    <tab>Linux</tab>
    <tab>Windows</tab>
    </tablist>
    <tabpanel>

    ```console
    dhclient
    ```
    </tabpanel>
    <tabpanel>

    ```console
    ipconfig /release
    ipconfig /renew
    ```
    </tabpanel>
    </tabs>

</tabpanel>
</tabs>

## 10. Проверьте созданную конфигурацию

Проверьте доступность всех ВМ после миграции.

## Удалите неиспользуемые ресурсы

Если ресурсы SDN Neutron вам больше не нужны, удалите их:

1. [Уберите](/ru/networks/vnet/instructions/ip/floating-ip#delete) Floating IP-адреса из проекта.
1. [Удалите](/ru/networks/vnet/instructions/secgroups#udalenie_gruppy_bezopasnosti) группы безопасности.
1. Удалите [сети](/ru/networks/vnet/instructions/net#udalenie_seti) и [подсети](/ru/networks/vnet/instructions/net#udalenie_podseti).
1. [Удалите](/ru/networks/vnet/instructions/router#udalenie_marshrutizatora) маршрутизаторы.
