Помимо облачной сети вы можете создавать подсети. По умолчанию в проекте уже создана одна сеть с несколькими подсетями. После создания сети и подсети становятся доступны сразу для всех виртуальных машин проекта.

{note:warn}

[Общими сетями](../../concepts/net-types#shared_net) можно управлять только из проекта-владельца.

{/note}

## Просмотр списка сетей и подсетей, а также информации о них

{tabs}

{tab(Личный кабинет)}

1. В личном кабинете перейдите в раздел **Виртуальные сети** → **Сети**.

   Будет отображен список сетей.

1. Нажмите на имя нужной сети.

   Откроется страница с подробной информацией о ней. В том числе будет отображен список подсетей в этой сети.

1. Нажмите на имя нужной подсети.

   Откроется страница с подробной информацией о ней.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
   1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в OpenStack CLI.

1. Чтобы посмотреть список сетей и их идентификаторы, выполните команду:

   ```console
   openstack network list
   ```

1. Чтобы посмотреть подробную информацию о сети, выполните команду:

   ```console
   openstack network show <идентификатор сети>
   ```

1. Чтобы посмотреть список всех подсетей и их идентификаторы, выполните команду:

   ```console
   openstack subnet list
   ```

1. Чтобы посмотреть список всех подсетей, принадлежащих конкретной сети, и их идентификаторы выполните команду:

   ```console
   openstack subnet list --network <идентификатор сети>
   ```

1. Чтобы посмотреть подробную информацию о подсети, выполните команду:

   ```console
   openstack subnet show <идентификатор подсети>
   ```

{/tab}

{/tabs}

## Создание сети

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите кнопку **Создать**.
1. Задайте имя сети.
1. (Oпционально) Включите опцию **Доступ в интернет**, чтобы к ВМ в сети был доступ из интернета. Доступ в интернет является обязательным для VPN, SNAT.
1. (Опционально) Включите опцию **Доступ к сервисам VK Cloud**, чтобы подключить [Shadow port](../../concepts/ips-and-inet#shadow_port) к сети. Опция позволяет размещать кластеры Kubernetes в приватных сетях без доступа в интернет. Опция доступна, если Shadow port добавлен в проект и для сети отключен доступ в интернет.
   
   {note:info}
   
   Чтобы подключить Shadow port в ваш проект, обратитесь в [техническую поддержку](/ru/contacts).
   
   {/note}
1. Выберите [маршрутизатор](../../concepts/router) из списка. Если включена опция **Доступ в интернет**, то в списке будут только маршрутизаторы, подключенные к [внешней сети](../../concepts/net-types#external_net).
1. Укажите [зону](../../../dns/instructions/private-dns) для приватного DNS.
1. По умолчанию подсеть уже создана, но вы можете добавить еще. Если нужно добавить подсети позже, пропустите этот шаг.
1. Нажмите **Добавить сеть**.

После создания сети она появится в общем списке сетей.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
   1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в OpenStack CLI.

1. Выполните команду:

   ```console
   openstack network create <название сети>
   ```

{/tab}

{/tabs}

## Редактирование сети

{tabs}

{tab(Личный кабинет)}

1. В личном кабинете перейдите в раздел **Виртуальные сети** → **Сети**.
2. Нажмите на имя облачной сети.
3. Перейдите в раздел **Настройка сети**.
4. Внесите нужные изменения.
5. Нажмите кнопку **Сохранить изменения**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
   1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в OpenStack CLI.

1. [Получите идентификатор](#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) сети, которую нужно отредактировать.

1. Познакомьтесь со справкой команды.

   ```console
   openstack network set --help
   ```

   Далее приведены только основные аргументы команды.

1. Чтобы применить нужные настройки к сети, выполните команду:

   {tabs}
   
   {tab(Linux/macOS (bash, zsh))}
      
   ```console
   openstack network set <идентификатор сети> \
     --name <новое имя сети> \
     --dns-domain <новый DNS-домен>
   ```

   {/tab}
   
   {tab(Windows (PowerShell))}
   
   ```console
   openstack network set <идентификатор сети> `
     --name <новое имя сети> `
     --dns-domain <новый DNS-домен>
   ```

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

## Удаление сети

{note:warn}

Вместе с сетью будут удалены все подсети и порты.

{/note}

{tabs}

{tab(Личный кабинет)}

{include(/ru/_includes/_delete_net.md)}

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
   1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в OpenStack CLI.

1. [Получите идентификатор](#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) сети, которую нужно удалить.

1. Выполните команду:

   ```console
   openstack network delete <идентификатор сети>
   ```

{/tab}

{/tabs}

## Создание подсети

{tabs}

{tab(Личный кабинет)}

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

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
   1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в OpenStack CLI.

1. [Получите идентификатор](#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) сети, в которой нужно создать подсеть.

1. Познакомьтесь со справкой команды.

   ```console
   openstack subnet create --help
   ```

   Далее приведены только основные аргументы команды.

1. Выполните команду:

   {tabs}
   
   {tab(Linux/macOS (bash, zsh))}
      
   ```console
   openstack subnet create <название> \
     --subnet-range <адрес подсети> \
     --network <идентификатор сети> \
     --dns-nameserver <адрес DNS-сервера> \
     --gateway <адрес шлюза>
   ```

   {/tab}
   
   {tab(Windows (PowerShell))}
   
   ```console
   openstack subnet create <название> `
     --subnet-range <адрес подсети> `
     --network <идентификатор сети> `
     --dns-nameserver <адрес DNS-сервера> `
     --gateway <адрес шлюза>
   ```

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## Редактирование подсети

{tabs}

{tab(Личный кабинет)}

1. В личном кабинете перейдите в раздел **Виртуальные сети** → **Сети**.
2. Нажмите на имя облачной сети, в которой находится подсеть.
3. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для подсети, которую требуется изменить, и выберите пункт **Редактировать подсеть**.
5. Внесите нужные изменения.
6. Нажмите кнопку **Сохранить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
   1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в OpenStack CLI.

1. [Получите идентификатор](#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) подсети, которую нужно отредактировать.

1. Чтобы применить (`set`) нужные настройки к подсети или отменить их (`unset`):

   1. Познакомьтесь со справкой команд.

      ```console
      openstack subnet set --help
      ```

      ```console
      openstack subnet unset --help
      ```

      Далее приведены только основные аргументы команд.

   1. Выполните команду:

      {tabs}
      
      {tab(Linux/macOS (bash, zsh))}
            
      ```console
      openstack subnet <set или unset> <идентификатор подсети> \
        --allocation-pool start=<начальный IP-адрес для DHCP>,end=<конечный IP-адрес для DHCP> \
        --dns-nameserver <адрес DNS-сервера> \
        --host-route destination=<адрес сети назначения статического маршрута>,gateway=<адрес шлюза статического маршрута>
      ```

      {/tab}
      
      {tab(Windows (PowerShell))}
      
      ```console
      openstack subnet <set или unset> <идентификатор подсети> `
        --allocation-pool start=<начальный IP-адрес для DHCP>,end=<конечный IP-адрес для DHCP> `
        --dns-nameserver <адрес DNS-сервера> `
        --host-route destination=<адрес сети назначения статического маршрута>,gateway=<адрес шлюза статического маршрута>
      ```

      {/tab}

      {/tabs}

{/tab}

{/tabs}

## Удаление подсети

{note:warn}

В облачной сети должна быть хотя бы одна подсеть.
После удаления подсеть невозможно восстановить.

{/note}

{tabs}

{tab(Личный кабинет)}

1. В личном кабинете перейдите в раздел **Виртуальные сети** → **Сети**.
2. Нажмите на имя облачной сети, в которой находится подсеть.
3. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для подсети, которую требуется удалить, и выберите пункт **Удалить подсеть**.
5. В открывшемся окне нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack).
   1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в OpenStack CLI.

1. [Получите идентификатор](#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) подсети, которую нужно удалить.

1. Выполните команду:

   ```console
   openstack subnet delete <идентификатор подсети>
   ```

{/tab}

{/tabs}
