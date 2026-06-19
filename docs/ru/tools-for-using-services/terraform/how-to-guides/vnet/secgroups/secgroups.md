# {heading(Создание и настройка групп безопасности)[id=terraform-secgroups]}

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

Полное описание параметров — в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Подготовительные шаги)[id=terraform-secgroups-prepare]}

1. Проверьте {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квоты]}. Убедитесь, что в выбранном {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=регионе]} достаточно ресурсов для создания CDN-ресурса. Для разных регионов могут быть настроены разные квоты.

   При необходимости {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=увеличьте]} квоты.

1. {linkto(../../../quick-start#terraform-quick-start)[text=Установите Terraform и настройте провайдер]}, если этого еще не сделано.

## {heading({counter(tf-secgroups)}. Создайте файл с описанием сети)[id=terraform-secgroups-net-file]}

{linkto(../network#terraform-network)[text=Создайте]} файл конфигурации Terraform `network.tf` с описанием сетевой инфраструктуры:

- создайте сеть с доступом в интернет, если ограничение нужно настроить для всех портов;
- создайте сеть с доступом в интернет и портом, если нужно настроить ограничение трафика для конкретного порта.

## {heading({counter(tf-secgroups)}. Создайте файл с описанием групп безопасности)[id=terraform-secgroups-file]}

Создайте файл конфигурации Terraform `secgroup.tf`. Содержание зависит от нужных правил ограничения трафика:

{tabs}

{tab(Для отдельных портов)}

В файле описана следующая конфигурация правил безопасности:

1. Создается группа безопасности `security_group`.
1. В группе создается правило, которое разрешает входящий трафик по протоколу TCP для порта 22.
1. Правило связывается с портом, добавленным в `network.tf`.

{include(../../../../../_includes/_secgroups_tf.md)[tags=secgroup,ruleoneport,ruleassoc]}

{/tab}

{tab(Для всех портов)}

В файле описана следующая конфигурация правил безопасности:

1. Создается группа безопасности `security_group`.
1. В группе создается правило, которое разрешает входящий трафик по протоколу UDP для всех портов.

{include(../../../../../_includes/_secgroups_tf.md)[tags=secgroup,alludp]}

{/tab}

{tab(Только входящий трафик)}

В файле описана следующая конфигурация правил безопасности:

1. Создается группа безопасности `security_group`.
1. В группе создается правило, которое разрешает весь входящий трафик.

{include(../../../../../_includes/_secgroups_tf.md)[tags=secgroup,ingress]}

{/tab}

{tab(Преднастроенные группы)}

В файле описана конфигурация для добавления в проект {linkto(../../../../../networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-secgroups)[text=преднастроенных групп безопасности]}.

{note:warn}
Не изменяйте правила и не создавайте преднастроенные группы безопасности через Terraform, если они уже есть в проекте.
{/note}

{include(../../../../../_includes/_secgroups_tf.md)[tags=ssh,sshwww,rdp,rdpwww,all]}

{/tab}

{/tabs}

Здесь:

- `enforce` — признак замены групп безопасности:

  - `true` — группы безопасности, которые уже есть у порта, будут заменены на указанные в манифесте.
  - (по умолчанию) `false` — группы безопасности, которые уже есть у порта, не будут удаляться. Новые группы будут добавлены.

- `direction` — направление траффика: входящий `ingress` или исходящий `egress`.
- `port_id` — идентификатор порта, с которым будет связан Floating IP-адрес. Идентификатор можно указать в манифесте, получить из источника данных или ресурса.

  {cut(Примеры)}

  - `port_id = vkcs_networking_port.example.id`: идентификатор порта будет получен после создания ресурса `vkcs_networking_port`.
  - `port_id = data.vkcs_networking_port.example.id`: идентификатор порта будет получен из источника данных `vkcs_networking_port`.
  - `port_id = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: указан идентификатор, полученный из {linkto(../../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=списка портов]} в личном кабинете {var(cloud)} или через Openstack CLI.

  {/cut}

- `port_range_max` — верхняя граница разрешенного диапазона портов, целое число от 1 до 65535. Чтобы выбрать все порты, не указывайте аргументы `port_range_min` и `port_range_max`.
- `port_range_min`— нижняя граница разрешенного диапазона портов, целое число от 1 до 65535. Чтобы выбрать все порты, не указывайте аргументы `port_range_min` и `port_range_max`.
- `protocol` — протокол передачи данных. Возможные значения: `tcp`, `udp`, `icmp`, `ah`, `dccp`, `egp`, `esp`, `gre`, `igmp`, `ospf`, `pgm`, `rsvp`, `sctp`, `udplite`, `vrrp`.
- `remote_ip_prefix` — удаленный CIDR, значение должно быть действительным.
- `security_group_id` — идентификатор группы безопасности, для которой создается правило. Идентификатор можно указать в манифесте, получить из источника данных или ресурса.

  {cut(Примеры)}

  - `port_id = vkcs_networking_port.example.id`: идентификатор группы безопасности будет получен после создания ресурса `vkcs_networking_secgroup`.
  - `port_id = data.vkcs_networking_port.example.id`: идентификатор группы безопасности будет получен из источника данных `vkcs_networking_secgroup`.
  - `port_id = "bb76507d-bbbb-bbbb-bbbb-2bca1a4c4cfc"`: указан идентификатор, полученный из {linkto(../../../../../networks/vnet/instructions/secgroups#vnet-secgroups-view)[text=списка групп безопасности]} в личном кабинете {var(cloud)} или через Openstack CLI.

  {/cut}

- `security_group_ids` — массив идентификаторов групп безопасности.

## {heading({counter(tf-secgroups)}. Создайте необходимые ресурсы с помощью Terraform)[id=terraform-secgroups-create-resource]}

1. Поместите файлы конфигурации Terraform в одну директорию:
  
   - `vkcs_provider.tf`;
   - `network.tf`;
   - `secgroup.tf`.

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

## {heading({counter(tf-secgroups)}. Проверьте применение конфигурации)[id=terraform-secgroups-check]}

Убедитесь, что сеть и инфраструктура были успешно созданы:

1. [Перейдите](https://cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**. Убедитесь, что группа безопасности создана и содержит все добавленные в примере правила.

## {heading(Удалите неиспользуемые ресурсы)[id=terraform-secgroups-delete]}

Если созданные с помощью Terraform ресурсы больше не нужны, удалите их:

1. Перейдите в директорию с файлами конфигурации Terraform.
1. Выполните команду:

   ```console
   terraform destroy
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.
