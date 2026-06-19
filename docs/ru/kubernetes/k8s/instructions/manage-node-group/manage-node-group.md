# {heading(Управление группой worker-узлов)[id=k8s-manage-node-group]}

{ifdef(public)}
{note:warn}
Перед выполнением любой операции с кластером из Terraform ознакомьтесь с информацией в разделе {linkto(../helpers/terraform-howto#k8s-terraform-howto-features)[text=Использование Terraform]}.
{/note}
{/ifdef}

## {heading(Добавить группу worker-узлов)[id=k8s-manage-node-group-add-group]}

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
1. Нажмите ![](../../../../assets/more-icon.svg "inline") для нужного кластера и выберите пункт **Добавить группу узлов**.
{ifdef(public)}
1. Задайте {linkto(../helpers/node-group-settings#k8s-node-group-settings)[text=настройки]} для группы узлов.
{/ifdef}
{ifndef(public)}
1. {linkto(../create-cluster#k8s-create-cluster-nodes-group)[text=Задайте]} параметры группы узлов.
{/ifndef}
1. Нажмите кнопку **Добавить группу узлов**.

{ifdef(public)}
{/tab}

{tab(Terraform)}

1. Определите, какие типы виртуальных машин будет использоваться для группы worker-узлов кластера:

   1. Выполните команду:

      ```console
      openstack flavor list
      ```

      Будут выведены доступные типы виртуальных машин.

   1. Выберите нужные типы виртуальных машин и запишите их имена из колонки **Name**.

1. Добавьте ресурс [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_node_group.md) и нужные источники данных в файл конфигурации Terraform:

   ```hcl
   ...

   # Уже описанная конфигурация для кластера
   resource "vkcs_kubernetes_cluster" "k8s-cluster" { ... }

   ...

   # Новый источник данных — тип виртуальной машины для узлов
   data "vkcs_compute_flavor" "k8s-node-group-flavor" {
    name = "<выбранный тип виртуальной машины>"
   }

   # Новый ресурс — группа worker-узлов
   resource "vkcs_kubernetes_node_group" "k8s-node-group" {
     name = "k8s-node-group"
     node_count = <количество узлов в группе>
     cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
     flavor_id = data.vkcs_compute_flavor.k8s-node-group-flavor.id
   }
   ```

   При необходимости задайте дополнительные настройки, приведенные в документации ресурса.

1. Проверьте конфигурационный файл Terraform на корректность:

   ```console
   terraform validate
   ```

1. Ознакомьтесь с планируемыми изменениями:

   ```console
   terraform plan
   ```

1. Примените планируемые изменения:

   ```console
   terraform apply
   ```

{/tab}

{/tabs}
{/ifdef}

{ifdef(public)}
## {heading(Настроить параметры масштабирования)[id=k8s-manage-node-group-scaling-options]}

Вы можете вручную изменить размер группы worker-узлов или настроить автомасштабирование. Вы также можете изменить шаблон ВМ для уже существующей группы worker-узлов. 

Эти операции подробно описаны в разделе {linkto(../scale#k8s-instructions-scale)[text=Масштабирование узлов кластера]}.

## {heading(Настроить метки и ограничения)[id=k8s-manage-node-group-labels-taints]}

{note:warn}
Настраивайте ограничения (taints) с осторожностью, если на узле уже размещена рабочая нагрузка.

Перенастройка ограничений может привести к расселению (eviction) подов на другие узлы. Если на них не хватит ресурсов для размещения этих подов, это приведет к частичной или полной недоступности приложений, которые используют эти поды.
{/note}

Метки и ограничения можно задать как с помощью интерфейсов, поддерживаемых платформой {var(cloud)} (личный кабинет и Terraform), так и с помощью `kubectl`. При назначении меток и ограничений учитывайте, что метки и ограничения, заданные с помощью интерфейсов платформы, периодически синхронизируются с кластером Kubernetes (только в одном направлении). При синхронизации метки, заданные с помощью платформы, перезапишут метки и ограничения, которые были заданы с помощью `kubectl`, если их ключи совпадают. Другие метки и ограничения, которые были заданы с помощью `kubectl` и не были перезаписаны значениями от платформы, действуют в кластере, но не отображаются, например, в личном кабинете или состоянии (state) Terraform.

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
1. Найдите нужный кластер и группу узлов в нем.
1. Нажмите ![](../../../../assets/more-icon.svg "inline") для нужной группы узлов и выберите пункт **Labels и Taints**.
1. В появившемся окне выполните необходимые действия.

   - Действия по управлению метками (labels):
     - Добавить новую метку в виде пары ключ/значение.
     - Изменить ключ или значение существующей метки.
     - Удалить существующую метку.
   - Действия по управлению ограничениями (taints):
     - Добавить новое ограничение, указав для него эффект и метку пода в виде пары ключ/значение.
     - Изменить существующее ограничение.
     - Удалить существующее ограничение.

{/tab}

{tab(Terraform)}

1. Измените нужный ресурс [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_node_group.md) в файле конфигурации Terraform :

   ```hcl
   ...

   # Уже описанная конфигурация для группы узлов
   resource "vkcs_kubernetes_node_group" "k8s-node-group" {
     name = "k8s-node-group"

     ...

     # Метки

     # Существующая метка
     labels {
        key = "my_awesome_value"
        value = "my_another_awesome_value"
     }

     # Новая метка
     labels {
        key = "<ключ>"
        value = "<значение>"
     }

     # Ограничения
     
     # Существующее ограничение
     taints {
        key = "taint_key_1"
        value = "taint_value_1"
        effect = "PreferNoSchedule"
     }

     # Новое ограничение
     taints {
        key = "<ключ>"
        value = "<значение>"
        effect = "<эффект>"
     }

     ...
   }

   ...
   ```

   При необходимости измените или удалите существующие метки (labels) и ограничения (taints).

   Если блоков `labels` и `taints` еще нет, создайте соответствующие блоки.

1. Проверьте конфигурационный файл Terraform на корректность:

   ```console
   terraform validate
   ```

1. Ознакомьтесь с планируемыми изменениями:

   ```console
   terraform plan
   ```

1. Примените планируемые изменения:

   ```console
   terraform apply
   ```

{/tab}

{/tabs}

Подробнее в разделе {linkto(../../reference/labels-and-taints#k8s-labels-and-taints)[text=Метки и ограничения]}.

## {heading(Настроить параметры обновления)[id=k8s-manage-node-group-configure-node-update]}

Для повышения скорости сервис Cloud Containers обновляет сразу несколько worker-узлов в группе. Чтобы максимально сохранить доступность ваших приложений и сервисов во время обновления, укажите максимальный процент недоступных узлов для группы узлов перед {linkto(../update#k8s-update)[text=обновлением кластера]}.

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
1. Найдите нужный кластер и группу узлов в нем.
1. Нажмите ![](../../../../assets/more-icon.svg "inline") для нужной группы узлов и выберите пункт **Настройки обновления нод**.
1. В появившемся окне задайте нужный процент.
1. Нажмите кнопку **Сохранить настройки**.

{/tab}

{tab(Terraform)}

1. Добавьте или измените в файле конфигурации Terraform для нужного ресурса [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_node_group.md) параметр `max_node_unavailable`:

   ```hcl
   ...

   # Уже описанная конфигурация для группы узлов
   resource "vkcs_kubernetes_node_group" "k8s-node-group" {
     name = "k8s-node-group"

     ...

     # Процент недоступных узлов
     max_node_unavailable = <нужный процент, целое число от 1 до 100>
   }

   ...
   ```

1. Проверьте конфигурационный файл Terraform на корректность:

   ```console
   terraform validate
   ```

1. Ознакомьтесь с планируемыми изменениями:

   ```console
   terraform plan
   ```

1. Примените планируемые изменения:

   ```console
   terraform apply
   ```

{/tab}

{/tabs}

Подробнее об устройстве процедуры обновления в разделе {linkto(../../concepts/update#k8s-update)[text=Обновление версии кластера]}.
{/ifdef}

## {heading(Удалить группу узлов)[id=k8s-manage-node-group-delete-node-group]}

Эту операцию можно выполнить только когда кластер запущен.

Единственную группу узлов кластера невозможно удалить с помощью личного кабинета. 
{ifdef(public)}
Однако это можно сделать с помощью Terraform.
{/ifdef}

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
1. Найдите нужный кластер и группу узлов в нем.
{ifdef(public)}
1. Нажмите ![](../../../../assets/more-icon.svg "inline") для нужной группы узлов и выберите пункт **Удалить**.
{/ifdef}
{ifndef(public)}
1. Нажмите ![](../../../../assets/more-icon.svg "inline") для нужной группы узлов и выберите пункт **Удалить Node Group**.
{/ifndef}
1. Нажмите кнопку **Подтвердить**.

{ifdef(public)}
{/tab}

{tab(Terraform)}

1. Удалите нужный ресурс [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_node_group.md) из файла конфигурации Terraform.

1. Проверьте конфигурационный файл Terraform на корректность:

   ```console
   terraform validate
   ```

1. Ознакомьтесь с планируемыми изменениями:

   ```console
   terraform plan
   ```

1. Примените планируемые изменения:

   ```console
   terraform apply
   ```

{/tab}

{/tabs}
{/ifdef}