<warn>

- [Масштабирование](../../concepts/architecture/) можно выполнить только когда кластер запущен.
- Перед выполнением масштабирования из Terraform ознакомьтесь с информацией в разделе [Использование Terraform](../helpers/terraform-howto#osobennosti-ispolzovaniya-terraform-dlya-upravleniya-servisom-konteynerov).

</warn>

## Выполнить ручное масштабирование

### Для master-узлов

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>Terraform</tab>
</tablist>
<tabpanel>

1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
1. Выберите проект и регион, где находится нужный кластер.
1. Перейдите в раздел **Контейнеры** → **Кластеры Kubernetes**.
1. Раскройте меню нужного кластера и выберите пункт **Изменить тип виртуальной машины Master**.
1. Выберите нужный [шаблон виртуальной машины](../../concepts/flavors#shablony-konfiguracii) из выпадающего списка.

   <info>

   Шаблоны с высокопроизводительными CPU доступны по запросу в службу поддержки. Чтобы воспользоваться этими шаблонами, выберите опцию «Показывать только высокопроизводительные CPU».

   Подробнее в разделе [Доступные вычислительные ресурсы](../../concepts/flavors#shablony-konfiguracii).

   </info>

1. Нажмите кнопку **Сохранить**.

</tabpanel>
<tabpanel>

1. [Установите OpenStack CLI](../../../../../additionals/account/project/cli/setup/) и [пройдите авторизацию](../../../../../additionals/account/project/cli/authorization/), если этого еще не сделано.

1. Определите новый тип виртуальной машины, который будет использоваться для master-узлов кластера:

   1. Выполните команду:

      ```bash
      openstack flavor list
      ```

      Будут выведены доступные типы виртуальных машин.

   1. Выберите нужный тип виртуальной машины и запишите ее имя из колонки **Name**.

1. Измените нужный источник данных [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/vkcs_compute_flavor.md) в файле конфигурации Terraform :

   ```hcl

   # Уже существующий источник данных с типом виртуальной машины для кластера
   data "vkcs_compute_flavor" "k8s-master-flavor" {
      name = "<имя нового типа виртуальной машины>"
   }

   # Уже описанная конфигурация для кластера
   resource "vkcs_kubernetes_cluster" "k8s-cluster" {
      name                = "k8s-cluster"
      master_flavor       = data.vkcs_compute_flavor.k8s-master-flavor.id
     ...

   }
   ```

1. Проверьте конфигурационный файл Terraform на корректность:

   ```bash
   terraform validate
   ```

1. Ознакомьтесь с планируемыми изменениями:

   ```bash
   terraform plan
   ```

1. Примените планируемые изменения:

   ```bash
   terraform apply
   ```

</tabpanel>
</tabs>

### Для групп worker-узлов

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>Terraform</tab>
</tablist>
<tabpanel>

1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
1. Выберите проект и регион, где находится нужный кластер.
1. Перейдите в раздел **Контейнеры** → **Кластеры Kubernetes**.
1. Найдите нужный кластер и группу узлов в нем.
1. Раскройте меню группы узлов и выберите пункт **Настройки масштабирования**.
1. В появившемся окне:
   1. Убедитесь, что опция **Включить автомасштабирование** выключена.
   1. Задайте нужное количество узлов. Его можно изменять как в большую, так и в меньшую сторону.
   1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

1. Измените нужный ресурс [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vkcs_kubernetes_node_group.md) в файле конфигурации Terraform :

   ```hcl
   ...

   # Уже описанная конфигурация для группы узлов
   resource "vkcs_kubernetes_node_group" "k8s-node-group" {
     name = "k8s-node-group"

     ...

     # Убедитесь, что опция, отвечающая за автомасштабирование, выключена (`false`).
     autoscaling_enabled = false

     node_count = <нужное количество узлов>

     ...

   }
   ...
   ```

1. Проверьте конфигурационный файл Terraform на корректность:

   ```bash
   terraform validate
   ```

1. Ознакомьтесь с планируемыми изменениями:

   ```bash
   terraform plan
   ```

1. Примените планируемые изменения:

   ```bash
   terraform apply
   ```

</tabpanel>
</tabs>

## Настроить автоматическое масштабирование (только для групп worker-узлов)

<warn>

После включения автоматического масштабирования настройки ручного масштабирования перестанут действовать.

</warn>

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>Terraform</tab>
</tablist>
<tabpanel>

1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
1. Выберите проект и регион, где находится нужный кластер.
1. Перейдите в раздел **Контейнеры** → **Кластеры Kubernetes**.
1. Найдите нужный кластер и группу узлов в нем.
1. Раскройте меню группы узлов и выберите пункт **Настройки масштабирования**.
1. В появившемся окне:
   1. Убедитесь, что опция **Включить автомасштабирование** включена.
   1. Задайте минимальное и максимальное количество узлов. В этих пределах будет осуществляться масштабирование.
   1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

1. Измените нужный ресурс [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vkcs_kubernetes_node_group.md) в файле конфигурации Terraform :

   ```hcl
   ...

   # Уже описанная конфигурация для группы узлов
   resource "vkcs_kubernetes_node_group" "k8s-node-group" {
     name = "k8s-node-group"

     ...

     # Убедитесь, что опция, отвечающая за автомасштабирование, включена (`true`).
     autoscaling_enabled = true

     # Задайте количество узлов, в пределах которого будет осуществляться масштабирование.
     min_nodes = <минимальное количество узлов>
     max_nodes = <максимальное количество узлов>

     ...

   }
   ...
   ```

1. Проверьте конфигурационный файл Terraform на корректность:

   ```bash
   terraform validate
   ```

1. Ознакомьтесь с планируемыми изменениями:

   ```bash
   terraform plan
   ```

1. Примените планируемые изменения:

   ```bash
   terraform apply
   ```

</tabpanel>
</tabs>
