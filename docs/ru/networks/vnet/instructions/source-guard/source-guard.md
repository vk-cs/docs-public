 Использование [IP Source Guard](/ru/networks/vnet/concepts/traffic-limiting#source_guard) защищает от атак с подменой IP-адреса с помощью списка разрешенных IP-адресов `allowed-address`. Через порт будет проходить только трафик с IP-адресов, указанных в списке.

Примеры использования IP Source Guard приведены в практических руководствах по организации [виртуального IP-адреса](/ru/networks/vnet/how-to-guides/vip-keepalived) и [VPN-туннеля](/ru/networks/vnet/how-to-guides/onpremise-connect/vpn-tunnel).

## Добавление IP-адреса в список разрешенных адресов

{note:warn}

 С осторожностью применяйте список разрешенных IP-адресов на портах с [группой безопасности](/ru/networks/vnet/concepts/traffic-limiting#secgroups), которая ссылается сама на себя (пример: группа `default`).  Если вы создадите список разрешенных IP-адресов для порта с такой группой безопасности, трафик с этих IP-адресов окажется разрешен на всех портах сети, которым назначена эта же группа.

{cut(Как это работает?)}

Предположим, в сети `network` создан порт `port-vm-1`, которому назначена группа `default`. Для этого порта в список разрешенных IP-адресов добавлен `192.168.0.3`.

Тогда если в сети `network` создать порт `port-vm-2` и назначить ему группу `default`, то этот порт будет пропускать трафик с IP-адреса `192.168.0.3`, даже если для `port-vm-2` список разрешенных адресов пуст.

{/cut}

{/note}

<tabs>
<tablist>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. [Получите имя или идентификатор](/ru/networks/vnet/instructions/ports#prosmotr_spiska_portov_i_informacii_o_nih) нужного порта.

1. Выполните команду:

   ```console
   openstack port set <ИМЯ_ИЛИ_ИДЕНТИФИКАТОР_ПОРТА> --allowed-address ip-address=<IP-АДРЕС>
   ```

1. (Опционально) Повторите команду для других IP-адресов.

   Если необходимо разрешить выход с порта всего трафика, проходящего через виртуальную машину, используйте значение IP-адреса `0.0.0.0\0`. Опция полезна для промежуточных узлов сети, например для маршрутизатора, файервола или VPN-шлюза. Используйте опцию с осторожностью — она может сделать сеть уязвимой для атак.

</tabpanel>
</tabs>

## Удаление IP-адреса из списка разрешенных адресов

<tabs>
<tablist>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. [Получите имя или идентификатор](/ru/networks/vnet/instructions/ports#prosmotr_spiska_portov_i_informacii_o_nih) нужного порта.

1. Выполните команду:

   ```console
   openstack port unset <ИМЯ_ИЛИ_ИДЕНТИФИКАТОР_ПОРТА> --allowed-address ip-address=<IP-АДРЕС>,mac-address=<MAC-АДРЕС>
   ```

</tabpanel>
</tabs>

## Очистка списка разрешенных адресов для порта

<tabs>
<tablist>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. [Получите имя или идентификатор](/ru/networks/vnet/instructions/ports#prosmotr_spiska_portov_i_informacii_o_nih) нужного порта.

1. Выполните команду:

   ```console
   openstack port set --no-allowed-address <ИМЯ_ИЛИ_ИДЕНТИФИКАТОР_ПОРТА>
   ```

</tabpanel>
</tabs>

## Получение информации о поддерживаемых параметрах

<tabs>
<tablist>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

2. Узнайте, как изменять настройки порта, выполнив команду:

   ```console
   openstack port set --help
   ```

3. Узнайте, как сбросить настройки порта, выполнив команду:

   ```console
   openstack port unset --help
   ```

</tabpanel>
</tabs>
