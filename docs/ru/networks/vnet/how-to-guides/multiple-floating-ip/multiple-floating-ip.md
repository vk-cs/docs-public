# {heading(Привязка нескольких Floating IP-адресов к одной ВМ)[id=vnet-multiple-floating-ip]}

По умолчанию при создании ВМ ей назначается один внутренний IP-адрес. К нему можно привязать один Floating IP-адрес. Чтобы привязать несколько Floating IP-адресов к одной ВМ, нужно создать дополнительные порты в подсети, подключить их к ВМ и привязать к каждому порту свой Floating IP-адрес.

## {heading(Подготовительные шаги)[id=vnet-multiple-floating-ip-prep]}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Выберите или {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=создайте]} виртуальную машину в вашем проекте {var(cloud)}.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-add-net#iaas-vm-add-net-connect)[text=Подключите]} виртуальную машину к сети. Запишите идентификаторы сети и подсети.
1. {linkto(../../instructions/ip/floating-ip#vnet-floating-ip-add)[text=Добавьте]} в проект нужное количество Floating IP-адресов.

## {heading(1. Создайте дополнительные порты)[id=vnet-multiple-floating-ip-add-port]}

1. Для каждого дополнительного Floating IP-адреса {linkto(../../instructions/ports#vnet-ports-add)[text=добавьте порт]} в подсеть виртуальной машины.

1. Убедитесь, что порты созданы:

   ```console
   openstack port list --network <ИМЯ_ИЛИ_ID_СЕТИ>
   ```

## {heading(2. Подключите порты к ВМ)[id=vnet-multiple-floating-ip-connect-port]}

1. Присоедините созданные порты к ВМ:

   ```console
   openstack server add port <ID_ВМ> <ID_ПОРТА>
   ```

1. Убедитесь, что порты успешно подключены к ВМ:

   ```console
   openstack port list --server <ID_ВМ>
   ```

## {heading(3. Привяжите Floating IP-адреса к портам ВМ)[id=vnet-multiple-floating-ip-connect-fip]}

1. {linkto(../../instructions/ip/floating-ip#vnet-floating-ip-associate)[text=Привяжите]} каждый свободный Floating IP-адрес к соответствующему порту ВМ.

1. Убедитесь, что Floating IP-адреса успешно привязаны к портам:

   ```console
   openstack floating ip list
   ```

## {heading(4. Настройте сетевые интерфейсы на ВМ)[id=vnet-multiple-floating-ip-interface]}

После добавления портов на ВМ появятся дополнительные сетевые интерфейсы.

Для каждого нового порта {linkto(../../../../computing/iaas/how-to-guides/interface-settings-check#iaas-interface-settings-check)[text=проверьте и настройте сетевой интерфейс]} внутри операционной системы ВМ.

## {heading(5. Настройте маршрутизацию)[id=vnet-multiple-floating-ip-routing]}

По умолчанию все исходящие пакеты отправляются через основной интерфейс ВМ. Из-за этого ответы на запросы, пришедшие через дополнительные интерфейсы, уходят через основной интерфейс, и привязанные к ним Floating IP-адреса не работают.

Чтобы каждый интерфейс использовал свой маршрут, настройте правила маршрутизации (policy routing). Для каждого интерфейса создайте таблицу маршрутизации и правило, которое направляет пакеты с IP-адреса этого интерфейса через его шлюз.

Далее приведены примеры для интерфейса `eth1` с внутренним IP-адресом `10.0.1.97/24` и шлюзом `10.0.1.1`.

{tabs}

{tab(Ubuntu/Debian)}

1. Добавьте в файл `/etc/netplan/50-cloud-init.yaml` для каждого дополнительного интерфейса параметры `routes` и `routing-policy`. 

   Пример: 

   ```yaml
   network:
     version: 2
     ethernets:
       eth0:
         dhcp4: true
       eth1:
         dhcp4: true
         routes:
           - to: 0.0.0.0/0
             via: 10.0.1.1
             table: 101
         routing-policy:
           - from: 10.0.1.97/32
             table: 101
   ```

   Для каждого следующего интерфейса используйте следующий номер таблицы (102, 103 и т. д.) и укажите соответствующие IP-адрес и шлюз.

1. Примените настройки:

   ```console
   sudo netplan apply
   ```

{/tab}

{tab(RHEL)}

1. Создайте файл `/etc/sysconfig/network-scripts/route-<ИМЯ_ИНТЕРФЕЙСА>` для каждого дополнительного интерфейса. 

   Пример:

   ```ini
   0.0.0.0/0 via 10.0.1.1 dev eth1 table 101
   ```

1. Создайте файл `/etc/sysconfig/network-scripts/rule-<ИМЯ_ИНТЕРФЕЙСА>` для каждого дополнительного интерфейса:

   Пример:

   ```ini
   from 10.0.1.97/32 table 101
   ```

1. Перезапустите сеть:

   ```console
   sudo systemctl restart network
   ```

{/tab}

{tab(Windows)}

1. Получите номера интерфейсов:

   ```powershell
   Get-NetAdapter | Format-Table Name, InterfaceIndex
   ```
   
1. Для каждого дополнительного адаптера добавьте маршрут с указанием шлюза и номера интерфейса:

   Пример:

   ```powershell
   route add 0.0.0.0 mask 0.0.0.0 10.0.1.1 metric 101 if <НОМЕР_ИНТЕРФЕЙСА>
   ```

{/tab}

{/tabs}

## {heading(6. Проверьте доступность Floating IP-адресов)[id=vnet-multiple-floating-ip-verify]}

1. Убедитесь, что каждый Floating IP-адрес доступен извне. Выполните проверку с вашего компьютера:

   ```console
   ping <FLOATING_IP_1>
   ping <FLOATING_IP_2>
   ```

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь к ВМ]}. 

1. Убедитесь, что каждый интерфейс имеет внутренний IP-адрес из подсети:

   {tabs}
   {tab(Linux)}

   ```console
   ip addr show
   ```
   {/tab}

   {tab(Windows)}

   ```powershell
   Get-NetIPAddress -AddressFamily IPv4 | Format-Table InterfaceAlias, IPAddress
   ```
   {/tab}
   {/tabs}

1. Проверьте связность между Floating IP-адресом и внутренним IP-адресом:

   {tabs}
   {tab(Linux)}

   ```console
   curl --interface <ИМЯ_ИНТЕРФЕЙСА> ifconfig.me
   ```
   {/tab}

   {tab(Windows)}

   ```powershell
   curl.exe --interface <ИМЯ_ИНТЕРФЕЙСА> ifconfig.me
   ```
   {/tab}
   {/tabs}

   Команда вернет Floating IP-адрес, привязанный к этому интерфейсу.

1. Убедитесь, что правила маршрутизации применены:

   {tabs}
   {tab(Linux)}

   ```console
   ip rule list
   ip route show table <НОМЕР_ТАБЛИЦЫ>
   ```
   {/tab}

   {tab(Windows)}

   ```powershell
   route print
   ```
   {/tab}
   {/tabs}