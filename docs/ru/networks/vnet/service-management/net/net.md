Помимо облачной сети вы можете создавать подсети. По умолчанию в проекте уже создана одна сеть с несколькими подсетями. После создания сети и подсети становятся доступны сразу для всех виртуальных машин проекта.

<warn>

[Общими сетями](../../concepts/net-types#shared_net) можно управлять только из проекта-владельца.

</warn>

## Просмотр списка сетей и подсетей, а также информации о них

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. В личном кабинете перейдите в раздел **Виртуальные сети** → **Сети**.

   Будет отображен список сетей.

1. Нажмите на имя нужной сети.

   Откроется страница с подробной информацией о ней. В том числе будет отображен список подсетей в этой сети.

1. Нажмите на имя нужной подсети.

   Откроется страница с подробной информацией о ней.

</tabpanel>
<tabpanel>

1. Убедитесь, что:

   1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
   1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в OpenStack CLI.

1. Чтобы посмотреть список сетей и их идентификаторы, выполните команду:

   ```bash
   openstack network list
   ```

1. Чтобы посмотреть подробную информацию о сети, выполните команду:

   ```bash
   openstack network show <идентификатор сети>
   ```

1. Чтобы посмотреть список всех подсетей и их идентификаторы, выполните команду:

   ```bash
   openstack subnet list
   ```

1. Чтобы посмотреть список всех подсетей, принадлежащих конкретной сети, и их идентификаторы выполните команду:

   ```bash
   openstack subnet list --network <идентификатор сети>
   ```

1. Чтобы посмотреть подробную информацию о подсети, выполните команду:

   ```bash
   openstack subnet show <идентификатор подсети>
   ```

</tabpanel>
</tabs>

## Создание сети

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. В личном кабинете перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите кнопку **Создать**.
1. Задайте имя сети.
1. (Опционально) Дайте доступ в интернет. Это необходимо, если вы планируете воспользоваться сервисами VPN, SNAT.
1. Выберите из предложенного списка маршрутизатор.
1. Укажите зону для приватного DNS.
1. (Опционально) [Добавьте подсети](#sozdanie_podseti).
1. Нажмите **Добавить сеть**.

После создания сети она появится в общем списке сетей.

</tabpanel>
<tabpanel>

1. Убедитесь, что:

   1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
   1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в OpenStack CLI.

1. Выполните команду:

   ```bash
   openstack network create <название сети>
   ```

</tabpanel>
</tabs>

## Редактирование сети

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. В личном кабинете перейдите в раздел **Виртуальные сети** → **Сети**.
2. Нажмите на имя облачной сети.
3. Перейдите в раздел **Настройка сети**.
4. Внесите нужные изменения.
5. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

1. Убедитесь, что:

   1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
   1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в OpenStack CLI.

1. [Получите идентификатор](#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) сети, которую нужно отредактировать.

1. Познакомьтесь со справкой команды.

   ```bash
   openstack network set --help
   ```

   Далее приведены только основные аргументы команды.

1. Чтобы применить нужные настройки к сети, выполните команду:

   <tabs>
   <tablist>
   <tab>Linux/macOS (bash, zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   openstack network set <идентификатор сети> \
     --name <новое имя сети> \
     --dns-domain <новый DNS-домен>
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   openstack network set <идентификатор сети> `
     --name <новое имя сети> `
     --dns-domain <новый DNS-домен>
   ```

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Удаление сети

<warn>

Вместе с сетью будут удалены все подсети и порты.

</warn>

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_delete_net.md)}

</tabpanel>
<tabpanel>

1. Убедитесь, что:

   1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
   1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в OpenStack CLI.

1. [Получите идентификатор](#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) сети, которую нужно удалить.

1. Выполните команду:

   ```bash
   openstack network delete <идентификатор сети>
   ```

</tabpanel>
</tabs>

## Создание подсети

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. В личном кабинете перейдите в раздел **Виртуальные сети** → **Сети**.
2. Нажмите на имя облачной сети.
3. Нажмите кнопку **Добавить подсеть**.
4. Укажите название подсети.
5. Введите IP-адрес и шлюз подсети.
6. (опционально) По умолчанию DHCP включен. Адреса, выданные DHCP-сервером, будут оставаться постоянными. Отключение DHCP приведет к тому, что IP-адреса, выданные DHCP-сервисом, перестанут обслуживаться. Это может привести к недоступности виртуальных машин. Если необходимо, отключите его.
7. Укажите пул DHCP IP-адресов.
8. (опционально) По умолчанию включен **Приватный DNS**. В случае его отключения укажите DNS-серверы.
9. (опционально) Включите **Показать поле статических маршрутов**, чтобы указать статические маршруты.
10. Нажмите кнопку **Создать подсеть**.

</tabpanel>
<tabpanel>

1. Убедитесь, что:

   1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
   1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в OpenStack CLI.

1. [Получите идентификатор](#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) сети, в которой нужно создать подсеть.

1. Познакомьтесь со справкой команды.

   ```bash
   openstack subnet create --help
   ```

   Далее приведены только основные аргументы команды.

1. Выполните команду:

   <tabs>
   <tablist>
   <tab>Linux/macOS (bash, zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   openstack subnet create <название> \
     --subnet-range <адрес подсети> \
     --network <идентификатор сети> \
     --dns-nameserver <адрес DNS-сервера> \
     --gateway <адрес шлюза>
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   openstack subnet create <название> `
     --subnet-range <адрес подсети> `
     --network <идентификатор сети> `
     --dns-nameserver <адрес DNS-сервера> `
     --gateway <адрес шлюза>
   ```

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Редактирование подсети

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. В личном кабинете перейдите в раздел **Виртуальные сети** → **Сети**.
2. Нажмите на имя облачной сети, в которой находится подсеть.
3. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для подсети, которую требуется изменить, и выберите пункт **Редактировать подсеть**.
5. Внесите нужные изменения.
6. Нажмите кнопку **Сохранить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что:

   1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
   1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в OpenStack CLI.

1. [Получите идентификатор](#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) подсети, которую нужно отредактировать.

1. Чтобы применить (`set`) нужные настройки к подсети или отменить их (`unset`):

   1. Познакомьтесь со справкой команд.

      ```bash
      openstack subnet set --help
      ```

      ```bash
      openstack subnet unset --help
      ```

      Далее приведены только основные аргументы команд.

   1. Выполните команду:

      <tabs>
      <tablist>
      <tab>Linux/macOS (bash, zsh)</tab>
      <tab>Windows (PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
      openstack subnet <set или unset> <идентификатор подсети> \
        --allocation-pool start=<начальный IP-адрес для DHCP>,end=<конечный IP-адрес для DHCP> \
        --dns-nameserver <адрес DNS-сервера> \
        --host-route destination=<адрес сети назначения статического маршрута>,gateway=<адрес шлюза статического маршрута>
      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      openstack subnet <set или unset> <идентификатор подсети> `
        --allocation-pool start=<начальный IP-адрес для DHCP>,end=<конечный IP-адрес для DHCP> `
        --dns-nameserver <адрес DNS-сервера> `
        --host-route destination=<адрес сети назначения статического маршрута>,gateway=<адрес шлюза статического маршрута>
      ```

      </tabpanel>
      </tabs>

</tabpanel>
</tabs>

## Удаление подсети

<warn>

В облачной сети должна быть хотя бы одна подсеть.
После удаления подсеть невозможно восстановить.

</warn>

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. В личном кабинете перейдите в раздел **Виртуальные сети** → **Сети**.
2. Нажмите на имя облачной сети, в которой находится подсеть.
3. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для подсети, которую требуется удалить, и выберите пункт **Удалить подсеть**.
5. В открывшемся окне нажмите кнопку **Подтвердить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что:

   1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
   1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в OpenStack CLI.

1. [Получите идентификатор](#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) подсети, которую нужно удалить.

1. Выполните команду:

   ```bash
   openstack subnet delete <идентификатор подсети>
   ```

</tabpanel>
</tabs>
