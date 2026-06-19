# {heading(Сети и подсети)[id=vnet-net]}

Помимо облачной сети вы можете создавать подсети. По умолчанию в проекте уже создана одна сеть с несколькими подсетями. После создания сети и подсети становятся доступны сразу для всех виртуальных машин проекта.

{ifdef(public)}
{note:warn}
{linkto(../../../../networks/vnet/concepts/net-types#vnet-net-types)[text=Общими сетями]} можно управлять только из проекта-владельца.
{/note}
{/ifdef}

## {heading(Просмотр списка сетей и подсетей, а также информации о них)[id=vnet-net-view]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.

   Будет отображен список сетей.

1. Нажмите на имя нужной сети.

   Откроется страница с подробной информацией о ней. В том числе будет отображен список подсетей в этой сети.

1. Нажмите на имя нужной подсети.

   Откроется страница с подробной информацией о ней.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}.
   1. Вы можете {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизоваться]} в OpenStack CLI.

1. Чтобы посмотреть список сетей и их идентификаторы, выполните команду:

   ```console
   openstack network list
   ```

1. Чтобы посмотреть подробную информацию о сети, выполните команду:

   ```console
   openstack network show <ID_СЕТИ>
   ```

1. Чтобы посмотреть список всех подсетей и их идентификаторы, выполните команду:

   ```console
   openstack subnet list
   ```

1. Чтобы посмотреть список всех подсетей, принадлежащих конкретной сети, и их идентификаторы, выполните команду:

   ```console
   openstack subnet list --network <ID_СЕТИ>
   ```

1. Чтобы посмотреть подробную информацию о подсети, выполните команду:

   ```console
   openstack subnet show <ID_ПОДСЕТИ>
   ```

{/tab}

{/tabs}

## {heading(Создание сети)[id=vnet-net-add]}

{ifndef(public)}
{note:warn}
По умолчанию в личном кабинете создаются сети с типом `vxlan`. Для создания сетей других типов используйте OpenStack CLI.
{/note}
{/ifndef}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите кнопку **Создать**.
1. Задайте имя сети.
{ifdef(public)}
1. Выберите SDN: `Sprut` (по умолчанию) или `Neutron`. Выбор доступен для проектов, в которых подключены оба [типа SDN](/ru/networks/vnet/concepts/sdn).

   {note:info}
   SDN Neutron в {var(cloud)} выводится из эксплуатации и не подключается для новых проектов. Также SDN Neutron не используется в [зоне доступности](/ru/start/concepts/architecture#architecture-az) `PA2`.
   {/note}
{/ifdef}

1. (Опционально) Включите опцию **Доступ в интернет**, чтобы к ВМ в сети был доступ из интернета. Доступ в интернет является обязательным для VPN, SNAT.
{ifdef(public)}
1. (Опционально) Включите опцию **Доступ к сервисам {var(cloud)}**, чтобы подключить {linkto(../../concepts/ips-and-inet#vnet-ips-and-inet-shadow-port)[text=Shadow port]} к сети. Опция позволяет размещать кластеры Kubernetes в приватных сетях без доступа в интернет. Опция доступна, если Shadow port добавлен в проект и для сети отключен доступ в интернет.

   {note:info}
   Чтобы подключить Shadow port в ваш проект, обратитесь в [техническую поддержку](/ru/contacts).
   {/note}
{/ifdef}

1. Выберите {linkto(../../concepts/router#vnet-router)[text=маршрутизатор]} из списка. Если включена опция **Доступ в интернет**, то в списке будут только маршрутизаторы, подключенные к {linkto(../../concepts/net-types#vnet-net-types-external-net)[text=внешней сети]}.
1. Укажите {ifdef(public)}{linkto(../../../dns/instructions/private-dns#dns-private-dns)[text=зону]}{/ifdef}{ifndef(public)}{linkto(../../instructions/private-dns#vnet-private-dns)[text=зону]}{/ifndef} для приватного DNS.
1. По умолчанию подсеть уже создана, но вы можете добавить еще. Если нужно добавить подсети позже, пропустите этот шаг.
1. Нажмите **Добавить сеть**.

{ifdef(private-cert)}
Для корректного создания сети рекомендуется не выходить из личного кабинета.
{/ifdef}

После создания сети она появится в общем списке сетей.

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}

Сеть будет создана в течение 5 минут.

{ifndef(private-cert)}
При создании сети в правом нижнем углу страницы отобразится значок прогресса создания. Нажмите на значок и на название процесса, чтобы посмотреть процент и стадию выполнения (подготовка, создание, настройка).

После завершения процесса значок будет отображаться в одном из статусов:

- `Все процессы завершены` (зеленый значок) — сеть создана и готова к работе.
- `Все процессы завершены` (желтый значок) — сеть создана, но на одной из стадий возникла ошибка. Приведено описание ошибки и код, с которым можно обратиться к администратору {var(cloud)} для выяснения причины ее появления.
- `Возникла ошибка` (красный значок) — сеть не создана, возникла ошибка. Приведено описание ошибки и код, с которым можно обратиться к администратору {var(cloud)} для выяснения причины ее появления.

Процесс создания сети не блокирует параллельные действия на {var(cloud)}.
{/ifndef}

{note:warn}
Использование DHCP-сервера и приватного DNS-сервера всегда включено для виртуальных сетей, но может быть отключено для их отдельных подсетей.
{/note}

{/ifdef}

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}.
   1. Вы можете {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизоваться]} в OpenStack CLI.

1. Выполните команду:

   ```console
   openstack network create <ИМЯ_СЕТИ>
   ```

{/tab}

{/tabs}

## {heading(Редактирование сети)[id=vnet-net-edit]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите на имя облачной сети.
1. Перейдите в раздел **Настройка сети**.
1. Внесите нужные изменения.
1. Нажмите кнопку **Сохранить изменения**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}.
   1. Вы можете {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизоваться]} в OpenStack CLI.

1. {linkto(#vnet-net-view)[text=Получите идентификатор]} сети, которую нужно отредактировать.
1. Познакомьтесь со справкой команды.

   ```console
   openstack network set --help
   ```

   Далее приведены только основные аргументы команды.

   {tabs}

   {tab(Linux/macOS (bash, zsh))}

   ```console
   openstack network set <ID_СЕТИ> \
     --name <НОВОЕ_ИМЯ_СЕТИ> \
     --dns-domain <НОВЫЙ_DNS-ДОМЕН>
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   openstack network set <ID_СЕТИ> `
     --name <НОВОЕ_ИМЯ_СЕТИ> `
     --dns-domain <НОВЫЙ_DNS-ДОМЕН>
   ```

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Удаление сети)[id=vnet-net-delete]}

{note:warn}
Вместе с сетью будут удалены все подсети и порты.
{/note}

{tabs}

{tab(Личный кабинет)}

{include(../../../../_includes/_delete_net.md)}

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}.
   1. Вы можете {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизоваться]} в OpenStack CLI.

1. {linkto(#vnet-net-view)[text=Получите идентификатор]} сети, которую нужно удалить.
1. Выполните команду:

   ```console
   openstack network delete <ID_СЕТИ>
   ```

{/tab}

{/tabs}

## {heading(Создание подсети)[id=vnet-net-subnet-add]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите на имя облачной сети.
1. Нажмите кнопку **Добавить подсеть**.
1. Укажите название подсети.
1. Введите IP-адрес и шлюз подсети.
1. (Опционально) Отключите DHCP, если необходимо. Отключение DHCP приведет к тому, что IP-адреса, выданные DHCP-сервисом, перестанут обслуживаться. Это может привести к недоступности виртуальных машин. При включенной опции адреса, выданные DHCP-сервером, будут оставаться постоянными.
1. Укажите пул DHCP IP-адресов.
1. (Опционально) Отключите опцию **Приватный DNS**, если необходимо. В случае отключения укажите DNS-серверы.
1. (Опционально) Включите опцию **Показать поле статических маршрутов**, чтобы указать статические маршруты.
1. Нажмите кнопку {ifdef(public)}**Создать подсеть**{/ifdef}{ifndef(public)}**Создать**{/ifndef}.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}.
   1. Вы можете {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизоваться]} в OpenStack CLI.

1. {linkto(#vnet-net-view)[text=Получите идентификатор]} сети, в которой нужно создать подсеть.
1. Познакомьтесь со справкой команды.

   ```console
   openstack subnet create --help
   ```

   Далее приведены только основные аргументы команды.

1. Выполните команду:

   {tabs}

   {tab(Linux/macOS (bash, zsh))}

   ```console
   openstack subnet create <ИМЯ_ПОДСЕТИ> \
     --subnet-range <АДРЕС_ПОДСЕТИ> \
     --network <ID_СЕТИ> \
     --dns-nameserver <АДРЕС_DNS-СЕРВЕРА> \
     --gateway <АДРЕС_ШЛЮЗА>
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   openstack subnet create <ИМЯ_ПОДСЕТИ> `
     --subnet-range <АДРЕС_ПОДСЕТИ> `
     --network <ID_СЕТИ> `
     --dns-nameserver <АДРЕС_DNS-СЕРВЕРА> `
     --gateway <АДРЕС_ШЛЮЗА>
   ```

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Редактирование подсети)[id=vnet-net-subnet-edit]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите на имя облачной сети, в которой находится подсеть.
1. Нажмите ![ ](../../../../assets/more-icon.svg "inline") для подсети, которую требуется изменить, и выберите пункт **Редактировать подсеть**.
1. Внесите нужные изменения.
1. Нажмите кнопку **Сохранить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}.
   1. Вы можете {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизоваться]} в OpenStack CLI.

1. {linkto(#vnet-net-view)[text=Получите идентификатор]} подсети, которую нужно отредактировать.
1. Чтобы применить нужные настройки к подсети или отменить их:

   1. Познакомьтесь со справкой команд.

      ```console
      openstack subnet set --help
      ```

      ```console
      openstack subnet unset --help
      ```

      Далее приведен пример редактирования подсети с изменением пула адресов для DHCP, адреса DNS-сервера и статического маршрута.

   1. Выполните команду:

      {tabs}

      {tab(Linux/macOS (bash, zsh))}

      ```console
      openstack subnet <ДЕЙСТВИЕ> <ID_ПОДСЕТИ> \
        --allocation-pool start=<НАЧАЛЬНЫЙ_IP_ДЛЯ_DHCP>,end=<КОНЕЧНЫЙ_IP_ДЛЯ_DHCP> \
        --dns-nameserver <АДРЕС_DNS> \
        --host-route destination=<АДРЕС_СЕТИ_НАЗНАЧЕНИЯ>,gateway=<АДРЕС_ШЛЮЗА>
      ```
      {/tab}

      {tab(Windows (PowerShell))}

      ```console
      openstack subnet <ДЕЙСТВИЕ> <ID_ПОДСЕТИ> `
        --allocation-pool start=<НАЧАЛЬНЫЙ_IP_ДЛЯ_DHCP>,end=<КОНЕЧНЫЙ_IP_ДЛЯ_DHCP> `
        --dns-nameserver <АДРЕС_DNS> `
        --host-route destination=<АДРЕС_СЕТИ_НАЗНАЧЕНИЯ>,gateway=<АДРЕС_ШЛЮЗА>
      ```

      {/tab}

      {/tabs}

      Здесь:

      - `<ДЕЙСТВИЕ>` — команда, чтобы применить (`set`) нужные настройки к подсети или отменить их (`unset`).
      - `<ID_ПОДСЕТИ>` — идентификатор подсети, которую вы хотите отредактировать.
      - `<НАЧАЛЬНЫЙ_IP_ДЛЯ_DHCP>` — начальный IP-адрес пула адресов для DHCP.
      - `<КОНЕЧНЫЙ_IP_ДЛЯ_DHCP>` — конечный IP-адрес пула адресов для DHCP.
      - `<АДРЕС_DNS>` — адрес DNS-сервера.
      - `<АДРЕС_СЕТИ_НАЗНАЧЕНИЯ>` — адрес сети назначения статического маршрута.
      - `<АДРЕС_ШЛЮЗА>` — адрес шлюза статического маршрута.

{/tab}

{/tabs}

## {heading(Удаление подсети)[id=vnet-net-subnet-delete]}

{ifdef(public)}
{note:warn}
В облачной сети должна быть хотя бы одна подсеть.
После удаления подсеть невозможно восстановить.
{/note}
{/ifdef}
{ifndef(public)}
Удаление подсети не поддерживается в случаях:

- Если порты подсети используются в активных инстансах.
- Если это единственная подсеть: у каждой сети должна быть хотя бы одна подсеть.

{note:warn}
После удаления подсеть невозможно восстановить.
{/note}
{/ifndef}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите на имя облачной сети, в которой находится подсеть.
1. Нажмите ![ ](../../../../assets/more-icon.svg "inline") для подсети, которую требуется удалить, и выберите пункт **Удалить подсеть**.
1. В открывшемся окне нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что:

   1. OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}.
   1. Вы можете {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=авторизоваться]} в OpenStack CLI.

1. {linkto(#vnet-net-view)[text=Получите идентификатор]} подсети, которую нужно удалить.
1. Выполните команду:

   ```console
   openstack subnet delete <ID_ПОДСЕТИ>
   ```

{/tab}

{/tabs}
