# {heading(IP Source Guard)[id=vnet-source-guard]}

Использование {linkto(../../../../networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-source-guard)[text=IP Source Guard]} защищает от атак с подменой IP-адреса с помощью списка разрешенных IP-адресов `allowed-address`. Через порт будет проходить только трафик с IP-адресов, указанных в списке.

Примеры использования IP Source Guard приведены в практических руководствах по организации {linkto(../../../../networks/vnet/how-to-guides/vip-keepalived#vnet-vip-keepalived)[text=виртуального IP-адреса]} и {linkto(../../../../networks/vnet/how-to-guides/onpremise-connect/vpn-tunnel#vnet-vpn-tunnel)[text=VPN-туннеля]}.

## {heading(Добавление IP-адреса в список разрешенных адресов)[id=vnet-source-guard-allowed-ip-add]}

{note:warn}
 С осторожностью применяйте список разрешенных IP-адресов на портах с {linkto(../../../../networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-secgroups)[text=группой безопасности]}, которая ссылается сама на себя (пример: группа `default`).  Если вы создадите список разрешенных IP-адресов для порта с такой группой безопасности, трафик с этих IP-адресов окажется разрешен на всех портах сети, которым назначена эта же группа.

{cut(Как это работает?)}

Предположим, в сети `network` создан порт `port-vm-1`, которому назначена группа `default`. Для этого порта в список разрешенных IP-адресов добавлен `192.168.0.3`.

Тогда если в сети `network` создать порт `port-vm-2` и назначить ему группу `default`, то этот порт будет пропускать трафик с IP-адреса `192.168.0.3`, даже если для `port-vm-2` список разрешенных адресов пуст.

{/cut}
{/note}

{tabs}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=Получите имя или идентификатор]} нужного порта.
1. Выполните команду:

   ```console
   openstack port set <ИМЯ_ИЛИ_ID_ПОРТА> --allowed-address ip-address=<IP-АДРЕС>
   ```

1. (Опционально) Повторите команду для других IP-адресов.

   Если необходимо разрешить выход с порта всего трафика, проходящего через виртуальную машину, используйте значение IP-адреса `0.0.0.0/0`. Опция полезна для промежуточных узлов сети, например для маршрутизатора, файервола или VPN-шлюза. Используйте опцию с осторожностью — она может сделать сеть уязвимой для атак.

{/tab}

{/tabs}

## {heading(Удаление IP-адреса из списка разрешенных адресов)[id=vnet-source-guard-allowed-ip-delete]}

{tabs}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=Получите имя или идентификатор]} нужного порта.
1. Выполните команду:

   ```console
   openstack port unset <ИМЯ_ИЛИ_ID_ПОРТА> --allowed-address ip-address=<IP-АДРЕС>,mac-address=<MAC-АДРЕС>
   ```

{/tab}

{/tabs}

## {heading(Очистка списка разрешенных адресов для порта)[id=vnet-source-guard-port-no-allowed]}

{tabs}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=Получите имя или идентификатор]} нужного порта.
1. Выполните команду:

   ```console
   openstack port set --no-allowed-address <ИМЯ_ИЛИ_ID_ПОРТА>
   ```

{/tab}

{/tabs}

## {heading(Получение информации о поддерживаемых параметрах)[id=vnet-source-guard-port-set-help]}

{tabs}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Узнайте, как изменять настройки порта, выполнив команду:

   ```console
   openstack port set --help
   ```

1. Узнайте, как сбросить настройки порта, выполнив команду:

   ```console
   openstack port unset --help
   ```

{/tab}

{/tabs}
