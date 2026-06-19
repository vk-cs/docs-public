# {heading(Создание сетей)[id=terraform-network]}

В статье приведены примеры создания облачных сетей в сервисе Cloud Network при помощи Terraform:

- приватной сети;
- сети с доступом в интернет;
- сети с портом, привязанным к Floating IP-адресу.

При создании сетей используются:

- Ресурсы (resource):

  - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md);
  - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md);
  - [vkcs_networking_router](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_router.md);
  - [vkcs_networking_router_interface](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_router_interface.md);
  - [vkcs_networking_port](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_port.md);
  - [vkcs_networking_floatingip](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_floatingip.md).

- Источники данных (data source):

  - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md);
  - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_subnet.md);
  - [vkcs_networking_router](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_router.md);
  - [vkcs_networking_port](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_port.md).

Полное описание параметров — в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Подготовительные шаги)[id=terraform-network-prepare]}

1. Проверьте {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квоты]}. Убедитесь, что в выбранном {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=регионе]} достаточно ресурсов для создания CDN-ресурса. Для разных регионов могут быть настроены разные квоты.

   При необходимости {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=увеличьте]} квоты.

1. {linkto(../../../quick-start#terraform-quick-start)[text=Установите Terraform и настройте провайдер]}, если этого еще не сделано.

## {heading({counter(tf-network)}. Создайте файл с описанием сети)[id=terraform-network-net-file]}

Создайте файл конфигурации Terraform `network.tf`. Содержание зависит от нужного типа сети:

{tabs}

{tab(Создание приватной сети)}

В файле описана сетевая инфраструктура в следующей конфигурации:

1. Создается сеть `example-tf-net` в SDN `Sprut`.
1. Создается подсеть `example-tf-subnet` в сети `example-tf-net`.
1. Создается маршрутизатор `example-tf-router` в SDN `Sprut`, без подключения к {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=внешней сети]}.
1. Связываются подсеть `example-tf-subnet` и маршрутизатор `example-tf-router`.

{include(../../../../../_includes/_create_network_tf.md)[tags=net,router,shift=2]}

{/tab}

{tab(Создание сети с доступом в интернет)}

В файле описана сетевая инфраструктура в следующей конфигурации:

1. Создается сеть `example-tf-net` в SDN `Sprut`.
1. Создается подсеть `example-tf-subnet` в сети `example-tf-net`.
1. Создается маршрутизатор `example-tf-router` в SDN `Sprut`, с подключением к {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=внешней сети]} в SDN `Sprut`.
1. Связываются подсеть `example-tf-subnet` и маршрутизатор `example-tf-router`.

{include(../../../../../_includes/_create_network_tf.md)[tags=extnet,net,extrouter,shift=2]}

{/tab}

{tab(Создание сети с портом, привязанным к Floating IP-адресу)}

В файле описана сетевая инфраструктура в следующей конфигурации:

1. Создается сеть `example-tf-net` в SDN `Sprut`.
1. Создается подсеть `example-tf-subnet` в сети `example-tf-net`.
1. Создается маршрутизатор `example-tf-router` в SDN `Sprut`, с подключением к {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=внешней сети]} в SDN `Sprut`.
1. Связываются подсеть `example-tf-subnet` и маршрутизатор `example-tf-router`.
1. Создается порт, которому присваивается IP-адрес `192.168.199.23`.
1. Порт связывается с Floating IP-адресом.

{include(../../../../../_includes/_create_network_tf.md)[tags=extnet,net,extrouter,port]}

{/tab}

{/tabs}

Здесь:

- `admin_state_up` — создание ресурса в статусе включен `true` или выключен `false`.
- `external` — признак {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=внешней сети]}: `true` или `false`.
- `external_network_id` — идентификатор внешней сети для доступа к интернету. Идентификатор можно указать в манифесте или получить из источника данных.

  {cut(Примеры)}

  - `external_network_id = data.vkcs_networking_network.extnet.id`: идентификатор берется из источника данных `vkcs_networking_network`.
  - `external_network_id = "bb76507d-dddd-dddd-dddd-2bca1a4c4cfc"`: указывается идентификатор, полученный из {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=списка сетей]} в личном кабинете {var(cloud)} или через Openstack CLI.

  {/cut}

- `fixed_ip` — фиксированный IP-адрес для порта. Укажите в блоке следующие аргументы:

  - `subnet_id` — порт будет связан с одним из IP-адресов этой подсети. Если будет указан только этот аргумент, IP-адрес для порта будет автоматически выбран из пула IP-адресов подсети.
  - (Опционально) `ip_address` — порт будет связан с указанным IP-адресом.

- `network_id` — идентификатор сети. В примерах подсеть размещена в новой сети. Подсеть также можно разместить в существующей сети, а идентификатор можно указать в манифесте или получить из источника данных.

  {cut(Примеры)}

  - `network_id = vkcs_networking_network.example.id`: подсеть будет размещена в новой сети, которая будет создана ресурсом `vkcs_networking_network`.
  - `network_id = data.vkcs_networking_network.example.id`: подсеть будет размещена в существующей сети, ее идентификатор берется из источника данных `vkcs_networking_network`.
  - `network_id = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: подсеть будет размещен в существующей сети. Указывается ее идентификатор, полученный из {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=списка сетей]} в личном кабинете {var(cloud)} или через Openstack CLI.

  {/cut}

- `pool` — пул Floating IP-адресов: `internet` для {linkto(../../../../../networks/vnet/concepts/sdn#vnet-sdn)[text=SDN]} Sprut, `ext-net` для SDN Neutron.
- `port_id` — идентификатор порта, с которым будет связан Floating IP-адрес. Идентификатор можно указать в манифесте, получить из источника данных или ресурса.

  {cut(Примеры)}

  - `port_id = vkcs_networking_port.example.id`: идентификатор порта будет получен после создания ресурса `vkcs_networking_port`.
  - `port_id = data.vkcs_networking_port.example.id`: идентификатор порта будет получен из источника данных `vkcs_networking_port`.
  - `port_id = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: указан идентификатор, полученный из {linkto(../../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=списка сетей]} в личном кабинете {var(cloud)} или через Openstack CLI.

  {/cut}

- `router_id` — идентификатор маршрутизатора, с которым будет связана подсеть. В примере подсеть связана с новым маршрутизатором. Подсеть также можно связать c существующим маршрутизатором, а идентификатор можно указать в манифесте или получить из источника данных.

  {cut(Примеры)}

  - `router_id = vkcs_networking_subnet.example.id`: подсеть будет связана с новым маршрутизатором, который будет создан ресурсом `vkcs_networking_router`.
  - `router_id = data.vkcs_networking_subnet.example.id`: подсеть будет связана с существующим маршрутизатором, его идентификатор берется из источника данных `vkcs_networking_router`.
  - `router_id = "bb76507d-cccc-cccc-cccc-2bca1a4c4cfc"`: подсеть будет связана с существующим маршрутизатором. Указывается его идентификатор, полученный из {linkto(../../../../../networks/vnet/instructions/router#vnet-router-view)[text=списка маршрутизаторов]} в личном кабинете {var(cloud)} или через Openstack CLI.

  {/cut}

- `sdn` — {linkto(../../../../../networks/vnet/concepts/sdn#vnet-sdn)[text=SDN]}, в которой создается ресурс (сеть, подсеть, маршрутизатор и пр.). Доступные значения: `neutron`, `sprut`. Если SDN не указана, используется SDN по умолчанию. Узнать, какие SDN подключены для вашего проекта, можно в {linkto(../../../../account/instructions/project-settings/manage#project-sdn-view)[text=настройках проекта]}.
- `subnet_id` — идентификатор подсети. Идентификатор можно указать в манифесте, получить из источника данных или после создания ресурса.

  {cut(Примеры)}

  - `subnet_id = vkcs_networking_subnet.example.id`: идентификатор подсети будет получен после ее создания ресурсом `vkcs_networking_subnet`.
  - `subnet_id = data.vkcs_networking_subnet.example.id`: идентификатор подсети берется из источника данных `vkcs_networking_subnet`.
  - `subnet_id = "bb76507d-bbbb-bbbb-bbbb-2bca1a4c4cfc"`: указывается идентификатор подсети, полученный из {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=списка сетей]} в личном кабинете {var(cloud)} или через Openstack CLI.

  {/cut}

## {heading({counter(tf-network)}. Создайте необходимые ресурсы с помощью Terraform)[id=terraform-network-create]}

1. Поместите файлы конфигурации Terraform в одну директорию:
  
   - `vkcs_provider.tf`;
   - `network.tf`.

1. Перейдите в эту директорию.
1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

   ```console
   terraform validate && terraform plan
   ```

1. Примените изменения:

   ```console
   terraform apply
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.

## {heading({counter(tf-network)}. Проверьте применение конфигурации)[id=terraform-network-check]}

Убедитесь, что сеть и инфраструктура были успешно созданы:

1. [Перейдите](https://cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Виртуальные сети** → **Сети**. Убедитесь, что сеть создана и содержит все добавленные в примере подсети, маршрутизаторы и порты.

## {heading(Удалите неиспользуемые ресурсы)[id=terraform-network-delete]}

Если созданные с помощью Terraform ресурсы больше не нужны, удалите их:

1. Перейдите в директорию с файлами конфигурации Terraform.
1. Выполните команду:

   ```console
   terraform destroy
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.
