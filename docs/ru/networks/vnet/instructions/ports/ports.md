Вы можете управлять портами OpenStack: просматривать порты, добавлять, редактировать и удалять их.

{note:warn}

- Все перечисленные ниже операции недоступны во внешней сети.
- Нельзя управлять портами устройства `SNAT`.

{/note}

## Просмотр списка портов и информации о них

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите на имя нужной сети, затем на имя нужной подсети.
1. Перейдите на вкладку **Порты**.

   Будет отображен список портов.

1. Нажмите на имя нужного порта.

   Будет отображена информация о нем.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

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
      openstack port list --fixed-ip subnet=<имя или идентификатор подсети>
      ```

1. Чтобы посмотреть подробную информацию о порте, выполните команду, подставив идентификатор или имя порта, полученные ранее:

   ```console
   openstack port show <идентификатор или имя порта>
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

</tabpanel>
</tabs>

## Добавление порта

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите на имя нужной сети, затем на имя нужной подсети.
1. Перейдите на вкладку **Порты**.
1. Нажмите кнопку **Добавить порт**.
1. Задайте параметры порта:

   - имя порта,
   - (опционально) DNS-имя порта,
   - IP-адрес порта.

1. Нажмите кнопку **Создать порт**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. Выполните команду:

   ```console
   openstack port create <имя порта> --network <имя или идентификатор сети> --fixed-ip subnet=<имя или идентификатор подсети>,ip-address=<IP-адрес порта>
   ```

Для получения подробной информации о поддерживаемых параметрах воспользуйтесь командой:

```console
openstack port create --help
```

</tabpanel>
</tabs>

## Включение или выключение порта

### Включение порта

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

Это групповая операция: при необходимости можно включить сразу несколько выключенных портов, выбрав их с помощью флажков.

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
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

     1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного порта и выберите пункт **Включить порт**.
     1. Подтвердите выполнение операции.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. [Получите имя или идентификатор](#prosmotr_spiska_portov_i_informacii_o_nih) нужного порта.

1. Выполните команду:

   ```console
   openstack port set <имя или идентификатор порта> --enable
   ```

Для получения подробной информации о поддерживаемых параметрах воспользуйтесь командой:

```console
openstack port set --help
```

</tabpanel>
</tabs>

### Выключение порта

Выключенный порт не пропускает никакой трафик.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

Это групповая операция: при необходимости можно выключить сразу несколько включенных портов, выбрав их с помощью флажков.

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
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

     1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного порта и выберите пункт **Выключить порт**.
     1. Подтвердите выполнение операции.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. [Получите имя или идентификатор](#prosmotr_spiska_portov_i_informacii_o_nih) нужного порта.

1. Выполните команду:

   ```console
   openstack port set <имя или идентификатор порта> --disable
   ```

Для получения подробной информации о поддерживаемых параметрах воспользуйтесь командой:

```console
openstack port set --help
```

</tabpanel>
</tabs>

## Редактирование порта

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите на имя нужной сети, затем — на имя нужной подсети.
1. Перейдите на вкладку **Порты**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного порта и выберите пункт **Редактировать**.
1. Задайте параметры порта:

   - имя порта,
   - DNS-имя порта,
   - IP-адрес порта.

1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. [Получите имя или идентификатор](#prosmotr_spiska_portov_i_informacii_o_nih) нужного порта.

1. Измените параметры порта:

   - Имя порта:

     ```console
     openstack port set <имя или идентификатор порта> --name <новое имя>
     ```

   - DNS-имя порта:

     ```console
     openstack port set <имя или идентификатор порта> --dns-name <новое доменное имя>
     ```

   - IP-адрес порта:

     ```console
     openstack port set <имя или идентификатор порта> --no-fixed-ip --fixed-ip subnet=<имя или идентификатор подсети>,ip-address=<новый IP-адрес порта>
     ```

Для получения подробной информации о поддерживаемых параметрах воспользуйтесь командой:

```console
openstack port set --help
```

</tabpanel>
</tabs>

## Настройка IP Source Guard для порта

Этот механизм позволяет разрешать выход с порта только того трафика, для которого IP-адрес источника содержится в списке `allowed-address`.

<tabs>
<tablist>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. [Получите имя или идентификатор](#prosmotr_spiska_portov_i_informacii_o_nih) нужного порта.

1. Чтобы добавить один IP-адрес источника, выполните команду:

   ```console
   openstack port set <имя или идентификатор порта> --allowed-address ip-address=<IP-адрес>
   ```

   Если необходимо добавить еще несколько IP-адресов, повторите эту команду для каждого из них.

1. Чтобы удалить один IP-адрес источника, выполните команду:

   ```console
   openstack port unset <имя или идентификатор порта> --allowed-address ip-address=<IP-адрес>,mac-address=<mac-address>
   ```

   Если необходимо удалить еще несколько IP-адресов, повторите эту команду для каждого их них.

Для получения подробной информации о поддерживаемых параметрах воспользуйтесь одной из команд:

```console
openstack port set --help
```

```console
openstack port unset --help
```

</tabpanel>
</tabs>

## Удаление порта

{note:info}

Невозможно удалить порт, если он используется маршрутизатором.

{/note}

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

Это групповая операция: при необходимости можно удалить сразу несколько портов, выбрав их с помощью флажков.

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
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

     1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного порта и выберите пункт **Удалить порт**.
     1. Подтвердите выполнение операции.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. [Получите имя или идентификатор](#prosmotr_spiska_portov_i_informacii_o_nih) нужного порта.

1. Выполните команду:

   ```console
   openstack port delete <имя или идентификатор порта>
   ```

Для получения подробной информации о поддерживаемых параметрах воспользуйтесь командой:

```console
openstack port delete --help
```

</tabpanel>
</tabs>
