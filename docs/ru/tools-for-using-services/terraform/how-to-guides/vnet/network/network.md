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

## Подготовительные шаги

1. Проверьте [квоты](/ru/tools-for-using-services/account/concepts/quotasandlimits). Убедитесь, что в выбранном [регионе](/ru/tools-for-using-services/account/concepts/regions) достаточно ресурсов для создания сетей. Для разных регионов могут быть настроены разные квоты.

   При необходимости [увеличьте](/ru/tools-for-using-services/account/instructions/project-settings/manage#increase-quota) квоты.

1. [Установите Terraform и настройте провайдер](../../../quick-start), если этого еще не сделано.

## 1. Создайте файл с описанием сети

Создайте файл конфигурации Terraform `network.tf`. Содержание зависит от нужного типа сети:

{tabs}

{tab(Создание приватной сети)}

В файле описана сетевая инфраструктура в следующей конфигурации:

  1. Создается сеть `example-tf-net` в SDN `Sprut`.
  1. Создается подсеть `example-tf-subnet` в сети `example-tf-net`.
  1. Создается маршрутизатор `example-tf-router` в SDN `Sprut`, без подключения к [внешней сети](/ru/networks/vnet/concepts/net-types#external_net).
  1. Связываются подсеть `example-tf-subnet` и маршрутизатор `example-tf-router`.

{include(/ru/_includes/_create_network_tf.md)[tags=net,router,shift=2]}

{/tab}

{tab(Создание сети с доступом в интернет)}

В файле описана сетевая инфраструктура в следующей конфигурации:

  1. Создается сеть `example-tf-net` в SDN `Sprut`.
  1. Создается подсеть `example-tf-subnet` в сети `example-tf-net`.
  1. Создается маршрутизатор `example-tf-router` в SDN `Sprut`, с подключением к [внешней сети](/ru/networks/vnet/concepts/net-types#external_net) в SDN `Sprut`.
  1. Связываются подсеть `example-tf-subnet` и маршрутизатор `example-tf-router`.

{include(/ru/_includes/_create_network_tf.md)[tags=extnet,net,extrouter,shift=2]}

{/tab}

{tab(Создание сети с портом, привязанным к Floating IP-адресу)}

В файле описана сетевая инфраструктура в следующей конфигурации:

  1. Создается сеть `example-tf-net` в SDN `Sprut`.
  1. Создается подсеть `example-tf-subnet` в сети `example-tf-net`.
  1. Создается маршрутизатор `example-tf-router` в SDN `Sprut`, с подключением к [внешней сети](/ru/networks/vnet/concepts/net-types#external_net) в SDN `Sprut`.
  1. Связываются подсеть `example-tf-subnet` и маршрутизатор `example-tf-router`.
  1. Создается порт, которому присваивается IP-адрес `192.168.199.23`.
  1. Порт связывается с Floating IP-адресом.

  {include(/ru/_includes/_create_network_tf.md)[tags=extnet,net,extrouter,port]}

{/tab}

{/tabs}

Здесь:

- `admin_state_up` — создание ресурса в статусе включен `true` или выключен `false`.

- `external` — признак [внешней сети](/ru/networks/vnet/concepts/net-types#external_net): `true` или `false`.

- `external_network_id` — идентификатор внешней сети для доступа к интернету. Идентификатор можно указать в манифесте или получить из источника данных.

  {cut(Примеры)}

  - `external_network_id = data.vkcs_networking_network.extnet.id`: идентификатор берется из источника данных `vkcs_networking_network`.
  - `external_network_id = "bb76507d-dddd-dddd-dddd-2bca1a4c4cfc"`: указывается идентификатор, полученный из [списка сетей](/ru/networks/vnet/instructions/net#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) в личном кабинете VK Cloud или через Openstack CLI.

  {/cut}

- `fixed_ip` — фиксированный IP-адрес для порта. Укажите в блоке следующие аргументы:

  - `subnet_id` — порт будет связан с одним из IP-адресов этой подсети. Если будет указан только этот аргумент, IP-адрес для порта будет автоматически выбран из пула IP-адресов подсети.
  - (Опционально) `ip_address` — порт будет связан с указанным IP-адресом.

- `network_id` — идентификатор сети. В примерах подсеть размещена в новой сети. Подсеть также можно разместить в существующей сети, а идентификатор можно указать в манифесте или получить из источника данных.

  {cut(Примеры)}

  - `network_id = vkcs_networking_network.example.id`: подсеть будет размещена в новой сети, которая будет создана ресурсом `vkcs_networking_network`.
  - `network_id = data.vkcs_networking_network.example.id`: подсеть будет размещена в существующей сети, ее идентификатор берется из источника данных `vkcs_networking_network`.
  - `network_id = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: подсеть будет размещен в существующей сети. Указывается ее идентификатор, полученный из [списка сетей](/ru/networks/vnet/instructions/net#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) в личном кабинете VK Cloud или через Openstack CLI.

  {/cut}

- `pool` — пул Floating IP-адресов: `internet` для [SDN](/ru/networks/vnet/concepts/sdn) Sprut, `ext-net` для SDN Neutron.

- `port_id` — идентификатор порта, с которым будет связан Floating IP-адрес. Идентификатор можно указать в манифесте, получить из источника данных или ресурса.

  {cut(Примеры)}

  - `port_id = vkcs_networking_port.example.id`: идентификатор порта будет получен после создания ресурса `vkcs_networking_port`.
  - `port_id = data.vkcs_networking_port.example.id`: идентификатор порта будет получен из источника данных `vkcs_networking_port`.
  - `port_id = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: указан идентификатор, полученный из [списка портов](/ru/networks/vnet/instructions/ports#prosmotr_spiska_portov_i_informacii_o_nih) в личном кабинете VK Cloud или через Openstack CLI.

  {/cut}

- `router_id` — идентификатор маршрутизатора, с которым будет связана подсеть. В примере подсеть связана с новым маршрутизатором. Подсеть также можно связать c существующим маршрутизатором, а идентификатор можно указать в манифесте или получить из источника данных.

  {cut(Примеры)}

  - `router_id = vkcs_networking_subnet.example.id`: подсеть будет связана с новым маршрутизатором, который будет создан ресурсом `vkcs_networking_router`.
  - `router_id = data.vkcs_networking_subnet.example.id`: подсеть будет связана с существующим маршрутизатором, его идентификатор берется из источника данных `vkcs_networking_router`.
  - `router_id = "bb76507d-cccc-cccc-cccc-2bca1a4c4cfc"`: подсеть будет связана с существующим маршрутизатором. Указывается его идентификатор, полученный из [списка маршрутизаторов](/ru/networks/vnet/instructions/router#prosmotr_spiska_marshrutizatorov_i_informacii_o_nih) в личном кабинете VK Cloud или через Openstack CLI.

  {/cut}

- `sdn` — [SDN](/ru/networks/vnet/concepts/sdn), в которой создается ресурс (сеть, подсеть, маршрутизатор и пр.). Доступные значения: `neutron`, `sprut`. Если SDN не указана, используется SDN по умолчанию. Узнать, какие SDN подключены для вашего проекта, можно в [настройках проекта](/ru/tools-for-using-services/account/instructions/project-settings/manage#sdn_view).

- `subnet_id` — идентификатор подсети. Идентификатор можно указать в манифесте, получить из источника данных или после создания ресурса.

  {cut(Примеры)}

  - `subnet_id = vkcs_networking_subnet.example.id`: идентификатор подсети будет получен после ее создания ресурсом `vkcs_networking_subnet`.
  - `subnet_id = data.vkcs_networking_subnet.example.id`: идентификатор подсети берется из источника данных `vkcs_networking_subnet`.
  - `subnet_id = "bb76507d-bbbb-bbbb-bbbb-2bca1a4c4cfc"`: указывается идентификатор подсети, полученный из [списка сетей](/ru/networks/vnet/instructions/net#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) в личном кабинете VK Cloud или через Openstack CLI.

  {/cut}

## 2. Создайте необходимые ресурсы с помощью Terraform

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

## 3. Проверьте применение конфигурации

Убедитесь, что сеть и инфраструктура были успешно созданы:

1. [Перейдите](https://cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Виртуальные сети** → **Сети**. Убедитесь, что сеть создана и содержит все добавленные в примере подсети, маршрутизаторы и порты.

## Удалите неиспользуемые ресурсы

Если созданные с помощью Terraform ресурсы больше не нужны, удалите их:

1. Перейдите в директорию с файлами конфигурации Terraform.
1. Выполните команду:

   ```console
   terraform destroy
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.
