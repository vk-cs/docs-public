# {heading(Группы безопасности)[id=vnet-secgroups]}

Группа безопасности — это набор настраиваемых разрешающих правил прохождения трафика, которые возможно назначать на порты инстансов.

## {heading(Просмотр списка групп безопасности и информации о них)[id=vnet-secgroups-view]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.

   Будет отображен список групп безопасности.

1. Нажмите на имя группы безопасности.

   Откроется страница с подробной информацией о ней.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Чтобы посмотреть список групп безопасности, выполните команду:

   ```console
   openstack security group list
   ```

1. Чтобы посмотреть детальную информацию о группе безопасности, выполните команду:

   ```console
   openstack security group show <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

1. Чтобы просмотреть правила группы безопасности:

   ```console
   openstack security group rule list --long <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

{/tab}

{/tabs}


## {heading(Создание группы безопасности)[id=vnet-secgroups-add]}

{note:warn}
Идентификатор группы отображается не во всех сервисах платформы. Создавайте группы с уникальными именами, чтобы в дальнейшем их было просто идентифицировать.
{/note}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.
1. Нажмите кнопку **Добавить**.
1. Введите имя группы безопасности.
1. Добавьте описание.
1. Нажмите **Создать группу**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Просмотрите группы безопасности в проекте:

   ```console
   openstack security group list
   ```

1. Получите информацию о группе безопасности:

   ```console
   openstack security group show <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

1. Создайте группу безопасности:

   ```console
   openstack security group create --description <ОПИСАНИЕ_ГРУППЫ> <НАЗВАНИЕ_НОВОЙ_ГРУППЫ>
   ```

{/tab}

{/tabs}

## {heading(Редактирование имени и описания группы безопасности)[id=vnet-secgroups-edit]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.
1. Нажмите на имя группы безопасности.

   Откроется страница с подробной информацией о ней.

1. Нажмите на значок карандаша рядом с именем группы безопасности.

   Отредактируйте имя и (при необходимости) имя группы безопасности.

1. Нажмите кнопку **Сохранить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.

1. Чтобы изменить описание и название группы безопасности, выполните команду:

   ```console
   openstack security group set --description <ОПИСАНИЕ_ГРУППЫ_БЕЗОПАСНОСТИ> --name <ИМЯ_ГРУППЫ_БЕЗОПАСНОСТИ> <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

{/tab}

{/tabs}

## {heading(Добавление правила)[id=vnet-secgroups-add-rule]}

Правило группы безопасности — это набор параметров, определяющих условия прохождения трафика. Правила добавляются к группам безопасности, которые в свою очередь применяются для портов инстансов.

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.
1. Нажмите на имя группы безопасности.
1. В блоке **Входящий трафик** и **Исходящий трафик** нажмите **+ Добавить правило**.
1. Выберите тип трафика (SSH, HTTP, HTTPS и т.д). При выборе некоторых типов, остальные параметры правила будут преднастроены или недоступны.
1. Укажите нужный протокол.
1. Укажите порт, через который будет разрешен трафик.
1. В разделе **Удаленный адрес** укажите адрес, для которого выбранный тип трафика будет разрешен:

   {tabs}
   
   {tab(Все IP-адреса)}
      
   Правило будет разрешать трафик для всех IP-адресов.

   {/tab}
   
   {tab(Диапазон IP-адресов)}
   
   Правило будет разрешать трафик только для указанного IP-адреса:

   {ifdef(public)}
   1. В появившемся поле укажите IP-адрес узла или подсети с маской в формате `0.0.0.0/0`.
   1. (Опционально) Чтобы разрешить трафик для вашего устройства, нажмите **Использовать мой IP**.
   {/ifdef}{ifndef(public)}
   В появившемся поле укажите IP-адрес узла или подсети с маской в формате `0.0.0.0/0`.
   {/ifndef}

   {/tab}
   
   {tab(Группа безопасности)}
   
   Правило будет разрешать обмен трафиком с узлами, для которых назначена указанная группа безопасности.

   В появившемся поле выберите группу безопасности.

   {/tab}

   {/tabs}

1. (Опционально) Нажмите **Добавить описание** и в появившимся поле опишите новое правило.
1. Нажмите **Сохранить правило**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Просмотрите список правил группы:

   ```console
   openstack security group rule list --long <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

1. Создайте правило:

   ```console
   openstack security group rule create <АРГУМЕНТЫ> <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

   Доступные аргументы команды создания правила:

   - `--remote-ip` — указывает адрес, с которого может осуществляться подключения (в формате CIDR).
   - `--remote-group` — указывает группу, инстансы которой могут быть источником трафика.
   - `--dst-port` — порт назначения, требуется для TCP и UDP протоколов.
   - `--protocol` — протокол, возможно указание названия, номера или разрешение всех протоколов (any).
   - `--description` — произвольное описание.
   - `--icmp-type` — тип ICMP.
   - `--icmp-code` — код ICMP.
   - `--ingress` — применить правило для входящего трафика.
   - `--egress` — применить правило для исходящего трафика.
   - `--ethertype` — значение EtherType (IPv4, IPv6).

{/tab}

{/tabs}

## {heading(Удаление правила)[id=vnet-secgroups-delete-rule]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.
1. Нажмите на имя группы безопасности.
1. Нажмите на значок корзины в строке с ВМ, на которые назначено нужное правило.
1. Нажмите кнопку **Подтвердить**.
1. Нажмите ![ ](../../../../assets/more-icon.svg "inline") для правила, которое требуется удалить, и выберите пункт **Удалить**.
1. Нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Чтобы посмотреть детальную информацию для правила, выполните команду:

   ```console
   openstack security group rule show <ID_ПРАВИЛА>
   ```

1. Чтобы удалить правило, выполните команду:

   ```console
   openstack security group rule delete <ID_ПРАВИЛА>
   ```

{/tab}

{/tabs}

## {heading(Назначение группы на инстанс)[id=vnet-secgroups-instance-add-sg]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.
1. Нажмите на имя группы безопасности.
1. В разделе **Виртуальные машины с группой правил** нажмите **Добавить виртуальную машину**.
1. Выберите инстансы, к которым будет добавлена группа.
1. Нажмите **Добавить группу правил**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Выполните команду:

   ```console
   openstack server add security group <ID_ИНСТАНСА> <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

{/tab}

{/tabs}

## {heading(Назначение группы на порт)[id=vnet-secgroups-port-set-sg]}

{include(../../../../_includes/_sg-port-set.md)}

## {heading(Отвязка группы от инстанса)[id=vnet-secgroups-instance-remove-sg]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.
1. Нажмите на имя группы безопасности.
1. В разделе **Виртуальные машины с группой правил** наведите мышь на строку инстанса.
1. Нажмите значок корзины.
1. Нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Выполните команду:

   ```console
   openstack server remove security group <ID_ИНСТАНСА> <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

{/tab}

{/tabs}

## {heading(Отвязка группы от порта)[id=vnet-secgroups-port-unset-sg]}

{include(../../../../_includes/_sg-port-unset.md)}

## {heading(Удаление группы безопасности)[id=vnet-secgroups-delete]}

{tabs}

{tab(Личный кабинет)}

{note:warn}
Группа не может быть удалена до тех пор, пока есть порты, которые используют эту группу. Также не может быть удалена группа безопасности `default` и другие преднастроенные группы.
{/note}

Это групповая операция: при необходимости можно удалить сразу несколько групп безопасности, выбрав их с помощью флажков.

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.
1. Нажмите ![ ](../../../../assets/more-icon.svg "inline") для группы безопасности, которую требуется удалить, и выберите пункт **Удалить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Выполните команду:

   ```console
   openstack security group delete <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

{/tab}

{/tabs}
