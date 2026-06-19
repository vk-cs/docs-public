# {heading(Подключение сети к ВМ)[id=iaas-vm-add-net]}

Виртуальную машину можно подключить к сети с помощью порта. Порт — виртуальная сетевая карта ВМ, для которой настраиваются сущности:

- группы безопасности;
- подключенная сеть;
- DNS-имя.

Подробнее про сети и порты в разделах {linkto(../../../../../networks/vnet/instructions/net#vnet-net)[text=Управление сетями и подсетями]} и {linkto(../../../../../networks/vnet/instructions/ports#vnet-ports)[text=Управление портами]}.

## {heading(Подключение сети к ВМ)[id=iaas-vm-add-net-connect]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Выберите нужную ВМ и перейдите на вкладку **Сети**.
1. Нажмите кнопку **Добавить подключение**.
1. В появившемся окне:

   1. **Имя**: задайте имя сети.
   1. **Сеть для подключения**: выберите значение из списка:

      - `Создать новую сеть`: подробнее о создании новой сети в разделе {linkto(../../../../../networks/vnet/instructions/net#vnet-net)[text=Управление сетями и подсетями]}.
      - `Внешняя сеть (<ИМЯ_СЕТИ>)`: виртуальной машине будет автоматически назначен IP-адрес.
      - Существующая сеть.

      При выборе уже существующей сети задайте следующие параметры:

      - **Назначить внешний IP**: включите, если нужен доступ к ВМ через интернет.
      - **DNS-имя**: имя, по которому можно обратиться к ВМ через {ifdef(public)}{linkto(../../../../../networks/dns/instructions/private-dns#dns-private-dns)[text=приватный DNS]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef}.
      - **Задать IP-адрес**: включите, чтобы задать конкретный IP-адрес из пула адресов подсети.

   1. **Настройки Firewall**: укажите нужные группы безопасности. Подробнее в разделе {linkto(../../../../../networks/vnet/instructions/secgroups#vnet-secgroups)[text=Группы безопасности]}.

1. Нажмите кнопку **Сохранить**.

{/tab}

{tab(OpenStack CLI)}

Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.

### {heading(Подключение к существующему порту)[id=iaas-vm-add-net-connect]}

1. Получите идентификатор виртуальной машины, которую планируется подключить к сети:

   ```console
   openstack server list
   ```

1. Получите список сетей и входящих в них подсетей:

   ```console
   openstack network list
   ```

1. Получите список доступных портов в нужной сети:

   ```console
   openstack port list --network <ИМЯ_ИЛИ_ID_СЕТИ>
   ```

1. Присоедините выбранный порт к ВМ:

   ```console
   openstack server add port <ID_ВМ> <ID_ПОРТА>
   ```

1. Убедитесь, что порт успешно подключен к ВМ:

   ```console
   openstack port list --server <ID_ВМ>
   ```

### {heading(Создание нового порта)[id=iaas-vm-add-net-create-port]}

1. Получите список сетей и входящих в них подсетей:

   ```console
   openstack network list
   ```

1. Получите список IP-адресов для подсети, к которой планируется выполнить подключение:

   ```console
   openstack subnet list --network <ИМЯ_ИЛИ_ID_СЕТИ>
   ```

1. Получите список групп безопасности:

   ```console
   openstack security group list
   ```

1. Создайте порт одним из способов:

   - В нужной сети и с группой безопасности `default`:

     ```console
     openstack port create <ИМЯ_ПОРТА> --network <ИМЯ_ИЛИ_ID_СЕТИ>
     ```

   - С указанием параметров:

     ```console
     openstack port create <ИМЯ_ПОРТА> \
                           --network <ИМЯ_ИЛИ_ID_СЕТИ> \
                           --mac-address <MAC-АДРЕС> \
                           --fixed-ip subnet=<ИМЯ_ИЛИ_ID_ПОДСЕТИ>,ip-address=<IP-АДРЕС_ПОРТА> \
                           --security-group <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
     ```

     Чтобы посмотреть полный перечень поддерживаемых параметров, выполните команду:

     ```console
     openstack port create --help
     ```

     Также возможно создать порт с [опциями DHCP](https://github.com/Juniper/contrail-controller/wiki/Extra-DHCP-Options).

     При необходимости {linkto(../../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-add)[text=установите порту Floating IP-адрес]}.

   В результате будет выведен идентификатор созданного порта и другая информация о нем.

1. Получите идентификатор виртуальной машины, которую планируется подключить к сети:

   ```console
   openstack server list
   ```

1. Присоедините созданный порт к ВМ:

   ```console
   openstack server add port <ID_ВМ> <ID_ПОРТА>
   ```

1. Убедитесь, что порт успешно подключен к ВМ:

   ```console
   openstack port list --server <ID_ВМ>
   ```

{/tab}

{/tabs}

## {heading(Удаление сети ВМ)[id=iaas-vm-add-net-delete]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Выберите нужную ВМ и перейдите на вкладку **Сети**.
1. Выполните одно из действий для нужной сети:

   - Выберите с помощью флажка сеть, затем нажмите кнопку **Удалить**.
   - Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для подключенной сети и выберите пункт **Удалить подключение**.

1. В появившемся окне нажмите кнопку **Подтвердить**.

Подключение сети к ВМ будет удалено, но созданный ранее порт останется в статусе **Не подключен**. Подробнее об удалении портов в разделе {linkto(../../../../../networks/vnet/instructions/ports#vnet-ports)[text=Управление портами]}.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Получите ID виртуальной машины:

   ```console
   openstack server list
   ```

1. Получите список портов у ВМ:

   ```console
   openstack port list --server <ID_ВМ>
   ```

1. Удалите ненужный порт:

   ```console
   openstack port delete <ИМЯ_ИЛИ_ID_ПОРТА>
   ```

{/tab}

{/tabs}