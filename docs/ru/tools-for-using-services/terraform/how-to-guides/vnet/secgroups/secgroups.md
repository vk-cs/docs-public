В статье приведены примеры создания и настройки групп безопасности в сервисе Cloud Network при помощи Terraform:

- разрешение трафика по определенному протоколу для отдельных портов;
- разрешение трафика по определенному протоколу для всех портов;
- разрешение всего входящего трафика.

При создании и настройке групп безопасности используются:

- Ресурсы (resource):

  - [vkcs_networking_secgroup](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_secgroup.md);
  - [vkcs_networking_secgroup_rule](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_secgroup_rule.md);
  - [vkcs_networking_port](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_port.md);
  - [vkcs_networking_port_secgroup_associate](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_port_secgroup_associate.md).

- Источники данных (data source):

  - [vkcs_networking_secgroup](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_secgroup.md);
  - [vkcs_networking_port](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_port.md).

## Подготовительные шаги

1. Ознакомьтесь с доступными ресурсами и [квотами](/ru/tools-for-using-services/account/concepts/quotasandlimits) для [региона](/ru/tools-for-using-services/account/concepts/regions), в котором планируется создать инстанс. Для разных регионов могут быть настроены разные квоты.

   Если вы хотите увеличить квоты, обратитесь в [техническую поддержку](/ru/contacts).

1. [Установите Terraform и настройте провайдер](../../../quick-start), если этого еще не сделано.

## 1. Создайте файл с описанием сети

[Создайте](../network) файл конфигурации Terraform `network.tf` с описанием сетевой инфраструктуры:

- создайте сеть с доступом в интернет, если ограничение нужно настроить для всех портов;
- создайте сеть с доступом в интернет и портом, если нужно настроить ограничение трафика для конкретного порта.

## 2. Создайте файл с описанием групп безопасности

Создайте файл конфигурации Terraform `secgroup.tf`. Содержание зависит от нужных правил ограничения трафика:

<tabs>
<tablist>
<tab>Для отдельных портов</tab>
<tab>Для всех портов</tab>
<tab>Только входящий трафик</tab>
<tab>Преднастроенные группы</tab>
</tablist>
<tabpanel>

В файле описана следующая конфигурация правил безопасности:

  1. Создается группа безопасности `security_group`.
  1. В группе создается правило, которое разрешает входящий трафик по протоколу TCP для порта 22.
  1. Правило связывается с портом, добавленным в `network.tf`.

  {include(/ru/_includes/_secgroups_tf.md)[tags=secgroup,ruleoneport,ruleassoc]}

</tabpanel>
<tabpanel>

В файле описана следующая конфигурация правил безопасности:

  1. Создается группа безопасности `security_group`.
  1. В группе создается правило, которое разрешает входящий трафик по протоколу UDP для всех портов.

  {include(/ru/_includes/_secgroups_tf.md)[tags=secgroup,alludp]}

</tabpanel>
<tabpanel>

В файле описана следующая конфигурация правил безопасности:

  1. Создается группа безопасности `security_group`.
  1. В группе создается правило, которое разрешает весь входящий трафик.

  {include(/ru/_includes/_secgroups_tf.md)[tags=secgroup,ingress]}

</tabpanel>
<tabpanel>

В файле описана конфигурация для добавления в проект [преднастроенных групп безопасности](/ru/networks/vnet/concepts/traffic-limiting#secgroups).

<warn>
Не изменяйте правила и не создавайте преднастроенные группы безопасности через Terraform, если они уже есть в проекте.
</warn>

  {include(/ru/_includes/_secgroups_tf.md)[tags=ssh,sshwww,rdp,rdpwww,all]}

</tabpanel>
</tabs>

Здесь:

- `enforce` — признак замены групп безопасности:

  - `true` — группы безопасности, которые уже есть у порта, будут заменены на указанные в манифесте.
  - (по умолчанию) `false` — группы безопасности, которые уже есть у порта, не будут удаляться. Новые группы будут добавлены.

- `direction` — направление траффика: входящий `ingress` или исходящий `egress`.

- `port_id` — идентификатор порта, с которым будет связан плавающий IP-адрес. Идентификатор можно указать в манифесте, получить из источника данных или ресурса.

  <details>
    <summary>Примеры</summary>

  - `port_id = vkcs_networking_port.example.id`: идентификатор порта будет получен после создания ресурса `vkcs_networking_port`.
  - `port_id = data.vkcs_networking_port.example.id`: идентификатор порта будет получен из источника данных `vkcs_networking_port`.
  - `port_id = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: указан идентификатор, полученный из [списка портов](/ru/networks/vnet/service-management/ports#prosmotr_spiska_portov_i_informacii_o_nih) в личном кабинете VK Cloud или через Openstack CLI.

  </details>

- `port_range_max` — верхняя граница разрешенного диапазона портов, целое число от 1 до 65535. Чтобы выбрать все порты, не указывайте аргументы `port_range_min` и `port_range_max`.

- `port_range_min`— нижняя граница разрешенного диапазона портов, целое число от 1 до 65535. Чтобы выбрать все порты, не указывайте аргументы `port_range_min` и `port_range_max`.

- `protocol` — протокол передачи данных. Возможные значения: `tcp`, `udp`, `icmp`, `ah`, `dccp`, `egp`, `esp`, `gre`, `igmp`, `ospf`, `pgm`, `rsvp`, `sctp`, `udplite`, `vrrp`.

- `remote_ip_prefix` — удаленный CIDR, значение должно быть действительным.

- `security_group_id` — идентификатор группы безопасности, для которой создается правило. Идентификатор можно указать в манифесте, получить из источника данных или ресурса.

  <details>
    <summary>Примеры</summary>

  - `port_id = vkcs_networking_port.example.id`: идентификатор группы безопасности будет получен после создания ресурса `vkcs_networking_secgroup`.
  - `port_id = data.vkcs_networking_port.example.id`: идентификатор группы безопасности будет получен из источника данных `vkcs_networking_secgroup`.
  - `port_id = "bb76507d-bbbb-bbbb-bbbb-2bca1a4c4cfc"`: указан идентификатор, полученный из [списка групп безопасности](/ru/networks/vnet/service-management/secgroups#prosmotr_spiska_grupp_bezopasnosti_i_informacii_o_nih) в личном кабинете VK Cloud или через Openstack CLI.

  </details>

- `security_group_ids` — массив идентификаторов групп безопасности.

## 3. Создайте необходимые ресурсы с помощью Terraform

1. Поместите файлы конфигурации Terraform в одну директорию:
  
   - `vkcs_provider.tf`;
   - `network.tf`;
   - `secgroup.tf`.

1. Перейдите в эту директорию.
1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

   ```bash
   terraform validate && terraform plan
   ```

1. Примените изменения:

   ```bash
   terraform apply
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.

## 4. Проверьте применение конфигурации

Убедитесь, что сеть и инфраструктура были успешно созданы:

1. [Перейдите](https://cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**. Убедитесь, что группа безопасности создана и содержит все добавленные в примере правила.

## Удалите неиспользуемые ресурсы

Если созданные с помощью Terraform ресурсы вам больше не нужны, удалите их:

1. Перейдите в директорию с файлами конфигурации Terraform.
1. Выполните команду:

   ```bash
   terraform destroy
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.
