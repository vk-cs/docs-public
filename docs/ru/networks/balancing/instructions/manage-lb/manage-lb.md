# {heading(Управление балансировщиками нагрузки)[id=balancing-manage-lb]}

Вы можете управлять балансировщиками нагрузки: просматривать, редактировать и удалять их, манипулировать публичными IP-адресами.

## {heading(Просмотр списка балансировщиков нагрузки и информации о них)[id=balancing-manage-lb-list]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Балансировщики нагрузки**.

   Будет отображен список балансировщиков.

1. Нажмите на имя нужного балансировщика.

   Откроется страница с подробной информацией о нем. На этой странице можно также {linkto(#balancing-manage-lb-edit)[text=редактировать]} параметры балансировщика.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]} вместе с {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=дополнительным пакетом]} `python-octaviaclient`.
   1. Вы можете {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизоваться]} в OpenStack CLI.

1. Чтобы посмотреть список балансировщиков нагрузки и их идентификаторы, выполните команду:

   ```console
   openstack loadbalancer list
   ```

1. Чтобы посмотреть детальную информацию о балансировщике нагрузки, выполните команду:

   ```console
   openstack loadbalancer show <ID_БАЛАНСИРОВЩИКА>
   ```

   Будет выведена общая информация о балансировщике нагрузки и идентификаторы:

   - `vip_port_id` — идентификатор порта, который используется в качестве виртуального IP-адреса на балансировщике нагрузки. На этот порт можно назначить Floating IP-адрес.
   - `listeners` — список идентификаторов прослушивателей (listener). Эти объекты слушают входящие соединения к балансировщику нагрузки и служат точкой входа для трафика.
   - `pools` — список идентификаторов пулов (pools). Эти объекты служат для группировки конечных потребителей трафика. Потребители выступают участниками (members) пула. Трафик от прослушивателей балансируется между несколькими участниками, входящими в пул, сконфигурированный для прослушивателя.

1. Чтобы посмотреть настройки прослушивателей и их связь с пулами, выполните команду:

   ```console
   openstack loadbalancer listener show <ID_ПРОСЛУШИВАТЕЛЯ>
   ```

1. Чтобы посмотреть настройки пула и список участников этого пула, выполните команду:

   ```console
   openstack loadbalancer pool show <ID_ПУЛА>
   ```

1. Чтобы посмотреть настройки отдельного участника из пула, выполните команду:

   ```console
   openstack loadbalancer member show <ID_ПУЛА> <ID_УЧАСТНИКА>
   ```

   Для участника будет выведена информация, в том числе порт назначения трафика.

{/tab}

{/tabs}

## {heading(Добавление балансировщика нагрузки)[id=balancing-manage-lb-add]}

{ifndef(public)}
{note:info}
К ВМ балансировщика нагрузки после создания применяется политика `soft-anti-affinity`: ВМ по возможности размещаются на разных вычислительных узлах.
{/note}
{/ifndef}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Балансировщики нагрузки**.
1. Нажмите кнопку **Добавить балансировщик** или **Добавить**.
1. Задайте параметры балансировщика:

   - **Название балансировщика**.
   - **Сеть**: сеть и подсеть, в которой будет размещаться балансировщик.

     Балансировщик будет распределять входящий трафик на выбранные сервисы, которые размещены в этой подсети.

     {note:warn}
     Изменить этот параметр позднее невозможно.
     {/note}

   - **Зона доступности**: выберите {ifdef(public)}{linkto(../../../../start/concepts/architecture#architecture-az)[text=зону доступности]}{/ifdef}{ifndef(public)}зону доступности{/ifndef} в списке. {ifndef(private-cert)}Для оптимизации и ускорения подключения ВМ к балансировщику размещайте их в одной зоне.{/ifndef}
   - **DNS-имя**: (опционально) DNS-имя для балансировщика.
   - **Назначить внешний IP**: если эта опция выбрана, то балансировщику будет назначен публичный IP-адрес, через который он будет доступен из интернета. В противном случае балансировщик будет выступать в качестве внутреннего балансировщика нагрузки. Такой IP-адрес можно {linkto(#balancing-manage-lb-assign-ip)[text=назначить позднее]}.

     Выберите эту опцию, если планируется размещать за балансировщиком сервисы, которые должны быть доступны из интернета.
     Опцию можно выбрать только при условии, что сеть, выбранная ранее, находится за маршрутизатором, который имеет доступ в интернет.

1. Задайте правила балансировки.
1. Нажмите кнопку **Добавить балансировщик**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]} вместе с {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=дополнительным пакетом]} `python-octaviaclient`.
   1. Вы можете {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизоваться]} в OpenStack CLI.

1. Выберите сеть и подсеть, в которых будет размещен балансировщик. {linkto(../../../../networks/vnet/instructions/net#vnet-net-view)[text=Получите идентификатор]} подсети.
1. Выберите {ifdef(public)}{linkto(../../../../start/concepts/architecture#architecture-az)[text=зону доступности]}{/ifdef}{ifndef(public)}зону доступности{/ifndef}, в которой будет размещен балансировщик. Чтобы получить список зон доступности, используйте команду:

   ```console
   openstack availability zone list
   ```

   Для оптимизации и ускорения подключения ВМ к балансировщику размещайте их в одной зоне доступности.

1. Создайте балансировщик:

   ```console
   openstack loadbalancer create --name <ИМЯ_БАЛАНСИРОВЩИКА> --vip-subnet-id <ID_ПОДСЕТИ> --availability-zone <ЗОНА_ДОСТУПНОСТИ>
   ```

1. (Опционально) {linkto(#balancing-manage-lb-assign-ip)[text=Назначьте балансировщику внешний IP-адрес]}. Через этот адрес он будет доступен из интернета. В противном случае балансировщик будет выступать в качестве внутреннего балансировщика нагрузки.

   Адрес требуется назначить, если планируется размещать за балансировщиком сервисы, которые должны быть доступны из интернета. Назначить адрес можно только при условии, что сеть для подсети, выбранной ранее, находится за маршрутизатором, который имеет доступ в интернет.

{/tab}

{/tabs}

## {heading(Редактирование имени балансировщика нагрузки)[id=balancing-manage-lb-edit]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Балансировщики нагрузки**.
1. Выполните одно из действий для балансировщика, который нужно отредактировать:

   - Нажмите на имя балансировщика.
   - Нажмите ![ ](../../../../assets/more-icon.svg "inline") для балансировщика и выберите пункт **Редактировать**.

   Откроется страница с подробной информацией о балансировщике.

1. Чтобы изменить имя:

   1. Нажмите на значок карандаша рядом с текущим именем балансирощика.
   1. Задайте новое имя.
   1. Нажмите кнопку **Переименовать**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]} вместе с {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=дополнительным пакетом]} `python-octaviaclient`.
   1. Вы можете {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизоваться]} в OpenStack CLI.

1. {linkto(#balancing-manage-lb-list)[text=Получите идентификатор]} нужного балансировщика нагрузки.
1. Измените имя балансировщика:

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

## {heading(Управление публичными IP-адресами)[id=balancing-manage-lb-ip]}

### {heading(Назначить публичный IP-адрес)[id=balancing-manage-lb-assign-ip]}

Если сеть балансировщика подключена к маршрутизатору с доступом в интернет, то можно назначить балансировщику публичный (внешний) IP-адрес.

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Балансировщики нагрузки**.
1. Выполните одно из действий:

   - Нажмите на имя нужного балансировщика.

     На странице с подробной информацией о балансировщике нажмите **Назначить внешний IP** в блоке **IP-адреса** → **Внешний**.

   - Нажмите ![ ](../../../../assets/more-icon.svg "inline") для нужного балансировщика и выберите пункт **Назначить внешний IP**.

1. Выберите нужный публичный IP-адрес из списка либо создайте новый.
1. Нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]} вместе с {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=дополнительным пакетом]} `python-octaviaclient`.
   1. Вы можете {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизоваться]} в OpenStack CLI.

1. {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=Получите идентификатор порта]} с Virtual IP для нужного балансировщика нагрузки.
1. {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-disassociate)[text=Отвяжите Floating IP-адрес]} от порта с этим идентификатором.

{/tab}

{/tabs}

### {heading(Отвязать публичный IP-адрес)[id=balancing-manage-lb-unlink-ip]}

Если сеть балансировщика подключена к маршрутизатору с доступом в интернет, и балансировщику назначен публичный (внешний) IP-адрес, то этот адрес можно отвязать.

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Балансировщики нагрузки**.
1. Выполните одно из действий:

   - Нажмите на имя нужного балансировщика.

     На странице с подробной информацией о балансировщике нажмите символ **x** рядом с IP-адресом в секции **IP-адреса** → **Внешний**.

   - Нажмите ![ ](../../../../assets/more-icon.svg "inline") для нужного балансировщика и выберите пункт **Отвязать внешний IP**.

1. Нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]} вместе с {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=дополнительным пакетом]} `python-octaviaclient`.
   1. Вы можете {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизоваться]} в OpenStack CLI.

1. {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=Получите идентификатор порта]} с Virtual IP для нужного балансировщика нагрузки.
1. {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-disassociate)[text=Отвяжите Floating IP-адрес]} от порта с этим идентификатором.

{/tab}

{/tabs}

## {heading(Удаление балансировщика нагрузки)[id=balancing-manage-lb-delete]}

{tabs}

{tab(Личный кабинет)}

Это групповая операция: при необходимости можно удалить сразу несколько балансировщиков нагрузки, выбрав их с помощью флажков.

Для удаления балансировщика:

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный балансировщик.
1. Перейдите в раздел **Виртуальные сети** → **Балансировщики нагрузки**.
1. Выполните одно из действий для нужного балансировщика:

   - Выберите с помощью флажка балансировщик, затем нажмите кнопку **Удалить**.
   - Нажмите ![ ](../../../../assets/more-icon.svg "inline") для балансировщика и выберите пункт **Удалить балансировщик**.

1. Подтвердите удаление балансировщика.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]} вместе с {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=дополнительным пакетом]} `python-octaviaclient`.
   1. Вы можете {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизоваться]} в OpenStack CLI.

1. {linkto(#balancing-manage-lb-list)[text=Получите идентификатор]} балансировщика нагрузки.
1. Удалите балансировщик:

   ```console
   openstack loadbalancer delete <ID_БАЛАНСИРОВЩИКА>
   ```

{/tab}

{/tabs}
