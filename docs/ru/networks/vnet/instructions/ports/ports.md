# {heading(Порты)[id=vnet-ports]}

Вы можете управлять портами OpenStack: просматривать порты, добавлять, редактировать и удалять их.

{note:warn}
- Все перечисленные ниже операции недоступны во внешней сети.
- Нельзя управлять портами устройства `SNAT`.
{/note}

## {heading(Просмотр списка портов и информации о них)[id=vnet-ports-view]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите на имя нужной сети, затем на имя нужной подсети.
1. Перейдите на вкладку **Порты**.

   Будет отображен список портов.

1. Нажмите на имя нужного порта.

   Будет отображена информация о нем.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.

1. Чтобы посмотреть список всех портов, выполните команду:

   ```console
   openstack port list
   ```

1. Чтобы посмотреть список всех портов в подсети:

   1. Выполните команду для получения идентификаторов и имен подсетей:

      ```console
      openstack subnet list
      ```

   1. Выполните команду:

      ```console
      openstack port list --fixed-ip subnet=<ИМЯ_ИЛИ_ID_ПОДСЕТИ>
      ```

1. Чтобы посмотреть подробную информацию о порте, выполните команду, подставив идентификатор или имя порта, полученные ранее:

   ```console
   openstack port show <ИМЯ_ИЛИ_ID_ПОРТА>
   ```

Для получения подробной информации о поддерживаемых параметрах воспользуйтесь одной из команд:

```console
openstack port list --help
```

```console
openstack subnet list --help
```

```console
openstack port show --help
```

{/tab}

{/tabs}

## {heading(Добавление порта)[id=vnet-ports-add]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите на имя нужной сети, затем на имя нужной подсети.
1. Перейдите на вкладку **Порты**.
1. Нажмите кнопку **Добавить порт**.
1. Задайте параметры порта:

   - имя порта,
   - (опционально) DNS-имя порта,
   - IP-адрес порта{ifndef(public)} — должен быть в диапазоне адресов, принадлежащих данной подсети{/ifndef}.

1. Нажмите кнопку **Создать порт**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.

1. Выполните команду:

   ```console
   openstack port create <ИМЯ_ПОРТА> --network <ИМЯ_ИЛИ_ID_СЕТИ> --mac-address <MAC-АДРЕС> --fixed-ip subnet=<ИМЯ_ИЛИ_ID_ПОДСЕТИ>,ip-address=<IP-АДРЕС_ПОРТА>
   ```

Для получения подробной информации о поддерживаемых параметрах воспользуйтесь командой:

```console
openstack port create --help
```

{/tab}

{/tabs}

## {heading(Включение или отключение порта)[id=vnet-ports-on-off]}

### {heading(Включение порта)[id=vnet-ports-on]}

{tabs}

{tab(Личный кабинет)}

Это групповая операция: при необходимости можно включить сразу несколько выключенных портов, выбрав их с помощью флажков.

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите на имя нужной сети, затем на имя нужной подсети.
1. Перейдите на вкладку **Порты**.
1. Включите порт одним из способов:

   - С помощью флажков:

     1. Выберите с помощью флажка нужный порт.
     1. Нажмите кнопку **Включить порт**.
     1. Подтвердите выполнение операции.

   - С помощью меню:

     1. Нажмите ![ ](../../../../assets/more-icon.svg "inline") для нужного порта и выберите пункт **Включить порт**.
     1. Подтвердите выполнение операции.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.

1. {linkto(#vnet-ports-view)[text=Получите имя или идентификатор]} нужного порта.

1. Выполните команду:

   ```console
   openstack port set <ИМЯ_ИЛИ_ID_ПОРТА> --enable
   ```

Для получения подробной информации о поддерживаемых параметрах воспользуйтесь командой:

```console
openstack port set --help
```

{/tab}

{/tabs}

### {heading(Отключение порта)[id=vnet-ports-off]}

Отключенный порт не пропускает никакой трафик.

{tabs}

{tab(Личный кабинет)}

Это групповая операция: при необходимости можно отключить сразу несколько включенных портов, выбрав их с помощью флажков.

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите на имя нужной сети, затем на имя нужной подсети.
1. Перейдите на вкладку **Порты**.
1. Выключите порт одним из способов:

   - С помощью флажков:

     1. Выберите с помощью флажка нужный порт.
     1. Нажмите кнопку **Выключить порт**.
     1. Подтвердите выполнение операции.

   - С помощью меню:

     1. Нажмите ![ ](../../../../assets/more-icon.svg "inline") для нужного порта и выберите пункт **Выключить порт**.
     1. Подтвердите выполнение операции.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.

1. {linkto(#vnet-ports-view)[text=Получите имя или идентификатор]} нужного порта.

1. Выполните команду:

   ```console
   openstack port set <ИМЯ_ИЛИ_ID_ПОРТА> --disable
   ```

Для получения подробной информации о поддерживаемых параметрах воспользуйтесь командой:

```console
openstack port set --help
```

{/tab}

{/tabs}

## {heading(Редактирование порта)[id=vnet-ports-edit]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите на имя нужной сети, затем — на имя нужной подсети.
1. Перейдите на вкладку **Порты**.
1. Нажмите ![ ](../../../../assets/more-icon.svg "inline") для нужного порта и выберите пункт **Редактировать**.
1. Задайте параметры порта:

   - имя порта,
   - DNS-имя порта,
   - IP-адрес порта.

1. Нажмите кнопку **Сохранить изменения**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.

1. {linkto(#vnet-ports-view)[text=Получите имя или идентификатор]} нужного порта.

1. Измените параметры порта:

   - Имя порта:

     ```console
     openstack port set <ИМЯ_ИЛИ_ID_ПОРТА> --name <НОВОЕ_ИМЯ>
     ```

   - DNS-имя порта:

     ```console
     openstack port set <ИМЯ_ИЛИ_ID_ПОРТА> --dns-name <НОВОЕ_ДОМЕННОЕ_ИМЯ>
     ```

   - IP-адрес порта:

     ```console
     openstack port set <ИМЯ_ИЛИ_ID_ПОРТА> --no-fixed-ip --fixed-ip subnet=<ИМЯ_ИЛИ_ID_ПОДСЕТИ>,ip-address=<НОВЫЙ_IP-АДРЕС_ПОРТА>
     ```

Для получения подробной информации о поддерживаемых параметрах воспользуйтесь командой:

```console
openstack port set --help
```

{/tab}

{/tabs}

## {heading(Настройка групп безопасности для порта)[id=vnet-ports-sg-manage]}

### {heading(Назначение группы на порт)[id=vnet-ports-sg-set]}

{include(../../../../_includes/_sg-port-set.md)}

### {heading(Отвязка группы от порта)[id=vnet-ports-sg-unset]}

{include(../../../../_includes/_sg-port-unset.md)}

{ifdef(public)}

## {heading(Настройка IP Source Guard для порта)[id=vnet-ports-ip-source-guard-manage]}

Этот механизм позволяет разрешать выход с порта только того трафика, для которого IP-адрес источника содержится в списке `allowed-address`.

{tabs}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.

1. {linkto(#vnet-ports-view)[text=Получите имя или идентификатор]} нужного порта.

1. Чтобы добавить один IP-адрес источника, выполните команду:

   ```console
   openstack port set <ИМЯ_ИЛИ_ID_ПОРТА> --allowed-address ip-address=<IP-АДРЕС>
   ```

   Если необходимо добавить еще несколько IP-адресов, повторите эту команду для каждого из них.

1. Чтобы удалить один IP-адрес источника, выполните команду:

   ```console
   openstack port unset <ИМЯ_ИЛИ_ID_ПОРТА> --allowed-address ip-address=<IP-АДРЕС>,mac-address=<MAC_АДРЕС>
   ```

   Если необходимо удалить еще несколько IP-адресов, повторите эту команду для каждого их них.

Для получения подробной информации о поддерживаемых параметрах воспользуйтесь одной из команд:

```console
openstack port set --help
```

```console
openstack port unset --help
```

{/tab}

{/tabs}

{/ifdef}

## {heading(Удаление порта)[id=vnet-ports-delete]}

{note:info}
Невозможно удалить порт, если он используется маршрутизатором.
{/note}

{tabs}

{tab(Личный кабинет)}

Это групповая операция: при необходимости можно удалить сразу несколько портов, выбрав их с помощью флажков.

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите на имя нужной сети, затем на имя нужной подсети.
1. Перейдите на вкладку **Порты**.
1. Удалите порт одним из способов:

   - С помощью флажков:

     1. Выберите с помощью флажка нужный порт.
     1. Нажмите кнопку **Удалить порт**.
     1. Подтвердите выполнение операции.

   - С помощью меню:

     1. Нажмите ![ ](../../../../assets/more-icon.svg "inline") для нужного порта и выберите пункт **Удалить порт**.
     1. Подтвердите выполнение операции.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.

1. {linkto(#vnet-ports-view)[text=Получите имя или идентификатор]} нужного порта.

1. Выполните команду:

   ```console
   openstack port delete <ИМЯ_ИЛИ_ID_ПОРТА>
   ```

Для получения подробной информации о поддерживаемых параметрах воспользуйтесь командой:

```console
openstack port delete --help
```

{/tab}

{/tabs}
