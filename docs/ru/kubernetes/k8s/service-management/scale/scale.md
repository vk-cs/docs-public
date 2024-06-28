Вы можете выполнить [масштабирование кластера Cloud Containers](../../concepts/scale) вручную или настроить автоматическое масштабирование, чтобы адаптировать кластер к меняющимся потребностям рабочих нагрузок ([workloads](https://kubernetes.io/docs/concepts/workloads/)).

## Вертикальное масштабирование

Такой тип масштабирования применим для master-узлов и групп worker-узлов. В процессе масштабирования изменяются [шаблоны виртуальных машин](../../concepts/flavors) для узлов кластера, количество узлов остается прежним. Если необходимо изменить количество worker-узлов в группе, [выполните горизонтальное масштабирование](#gorizontalnoe_masshtabirovanie).

### {heading(Масштабирование master-узлов)[id=scale_master_nodes]}

1. [Изучите, как работает механизм вертикального масштабирования](../../concepts/scale).

1. [Убедитесь](/ru/tools-for-using-services/account/service-management/project-settings/manage#prosmotr_kvot_proekta), что хватает квот для масштабирования.

1. Выполните масштабирование.

   <warn>

   В процессе масштабирования виртуальные машины, на которых размещены master-узлы, будут последовательно перезапущены.

   Если кластер [содержит один master-узел](../../concepts/architecture#topologii_klastera), то Kubernetes API будет недоступен в ходе масштабирования.

   </warn>

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры** → **Кластеры Kubernetes**.
   1. [Убедитесь](../manage-cluster#zapustit_klaster_bbf98834), что нужный кластер запущен.
   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного кластера и выберите пункт **Изменить тип виртуальной машины Master**.
   1. Выберите нужный шаблон виртуальной машины из выпадающего списка.

      <info>

      Шаблоны с высокопроизводительными CPU доступны по запросу в службу поддержки. Чтобы воспользоваться этими шаблонами, выберите опцию «Показывать только высокопроизводительные CPU».

      Подробнее в разделе [Доступные вычислительные ресурсы](../../concepts/flavors#shablony_konfiguracii).

      </info>

   1. Нажмите кнопку **Сохранить**.

   </tabpanel>
   <tabpanel>

   1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

   1. [Установите Terraform и настройте окружение](/ru/tools-for-using-services/terraform/quick-start), если это еще не сделано.

   1. [Убедитесь](../manage-cluster#zapustit_klaster_bbf98834), что нужный кластер запущен.

   1. Определите новый тип виртуальной машины, который будет использоваться для master-узлов кластера:

      1. Выполните команду:

         ```bash
         openstack flavor list
         ```

         Будут выведены доступные типы виртуальных машин.

      1. Выберите нужный тип виртуальной машины и запишите ее имя из колонки **Name**.

   1. Измените нужный источник данных [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md) в файле конфигурации Terraform:

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

### {heading(Масштабирование групп worker-узлов)[id=scale_worker_nodes]}

1. [Изучите, как работает механизм вертикального масштабирования](../../concepts/scale).

1. Подготовьтесь к масштабированию:

   1. [Убедитесь](/ru/tools-for-using-services/account/service-management/project-settings/manage#prosmotr_kvot_proekta), что хватает квот для масштабирования.
   1. Если вы планируете сократить объем вычислительных ресурсов, то убедитесь, что итогового объема ресурсов в группе worker-узлов будет достаточно для размещения рабочей нагрузки.
   1. Убедитесь, что для рабочей нагрузки настроена репликация и реплики распределены по нескольким worker-узлам из группы узлов.

      Если в группе узлов есть только один worker-узел, [увеличьте количество узлов в группе](#gorizontalnoe_masshtabirovanie) и настройте репликацию, если это возможно.

1. Выполните масштабирование.

   <warn>

   В процессе масштабирования виртуальные машины, на которых размещены worker-узлы, будут последовательно перезапущены.

   Рабочие нагрузки, для которых не была настроена репликация, будут недоступны в ходе масштабирования.

   </warn>

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры** → **Кластеры Kubernetes**.
   1. [Убедитесь](../manage-cluster#zapustit_klaster_bbf98834), что нужный кластер запущен.
   1. Найдите нужную группу узлов в этом кластере.
   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для этой группы узлов и выберите пункт **Изменить тип виртуальной машины**.
   1. Выберите нужный шаблон виртуальной машины из выпадающего списка.

      <info>

      Шаблоны с высокопроизводительными CPU доступны по запросу в службу поддержки. Чтобы воспользоваться этими шаблонами, выберите опцию «Показывать только высокопроизводительные CPU».

      Подробнее в разделе [Доступные вычислительные ресурсы](../../concepts/flavors#shablony_konfiguracii).

      </info>

   1. Нажмите кнопку **Сохранить**.

   </tabpanel>
   <tabpanel>

   1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

   1. [Установите Terraform и настройте окружение](/ru/tools-for-using-services/terraform/quick-start), если это еще не сделано.

   1. [Убедитесь](../manage-cluster#zapustit_klaster_bbf98834), что нужный кластер запущен.

   1. Определите новый тип виртуальной машины, который будет использоваться для worker-узлов в группе узлов кластера:

      1. Выполните команду:

         ```bash
         openstack flavor list
         ```

         Будут выведены доступные типы виртуальных машин.

      1. Выберите нужный тип виртуальной машины и запишите ее имя из колонки **Name**.

   1. Измените нужный источник данных [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md) в файле конфигурации Terraform:

      ```hcl
      # Уже существующий источник данных с типом виртуальной машины для группы worker-узлов
      data "vkcs_compute_flavor" "k8s-node-group-flavor" {
         name = "<имя нового типа виртуальной машины>"
      }

      # Уже описанная конфигурация для группы узлов
      resource "vkcs_kubernetes_node_group" "k8s-node-group" {
        name = "k8s-node-group"
        cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
        flavor_id = data.vkcs_compute_flavor.k8s-node-group-flavor.id
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

## Горизонтальное масштабирование

Такой тип масштабирования применим для групп worker-узлов. В процессе масштабирования изменяется количество worker-узлов в группе, [шаблоны виртуальных машин](../../concepts/flavors) для worker-узлов остаются прежними. Если необходимо изменить эти шаблоны для master-узлов или worker-узлов, [выполните вертикальное масштабирование](#vertikalnoe_masshtabirovanie).

### Масштабирование групп worker-узлов

1. [Изучите, как работает механизм горизонтального масштабирования](../../concepts/scale).

1. [Убедитесь](/ru/tools-for-using-services/account/service-management/project-settings/manage#prosmotr_kvot_proekta), что хватает квот для масштабирования.

1. Выполните масштабирование:

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры** → **Кластеры Kubernetes**.
   1. [Убедитесь](../manage-cluster#zapustit_klaster_bbf98834), что нужный кластер запущен.
   1. Найдите нужную группу узлов в этом кластере.
   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для этой группы узлов и выберите пункт **Настройки масштабирования**.
   1. В появившемся окне:

      1. Убедитесь, что опция **Включить автомасштабирование** выключена.
      1. Задайте нужное количество узлов. Его можно изменять как в большую, так и в меньшую сторону.
      1. Нажмите кнопку **Сохранить изменения**.

   </tabpanel>
   <tabpanel>

   1. [Установите Terraform и настройте окружение](/ru/tools-for-using-services/terraform/quick-start), если это еще не сделано.

   1. [Убедитесь](../manage-cluster#zapustit_klaster_bbf98834), что нужный кластер запущен.

   1. Измените нужный ресурс [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_node_group.md) в файле конфигурации Terraform:

      ```hcl
      ...

      # Уже описанная конфигурация для группы узлов
      resource "vkcs_kubernetes_node_group" "k8s-node-group" {
        name = "k8s-node-group"

        ...

        # Убедитесь, что опция, отвечающая за автомасштабирование, выключена (false).
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

### {heading(Настройка автоматического масштабирования групп worker-узлов)[id=autoscale_worker_nodes]}

1. [Изучите, как работает механизм горизонтального масштабирования](../../concepts/scale).

1. [Убедитесь](/ru/tools-for-using-services/account/service-management/project-settings/manage#prosmotr_kvot_proekta), что хватает квот для масштабирования.

1. Настройте автоматическое масштабирование:

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры** → **Кластеры Kubernetes**.
   1. [Убедитесь](../manage-cluster#zapustit_klaster_bbf98834), что нужный кластер запущен.
   1. Найдите нужную группу узлов в этом кластере.
   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для этой группы узлов и выберите пункт **Настройки масштабирования**.
   1. В появившемся окне:

      1. Убедитесь, что опция **Включить автомасштабирование** включена.
      1. Задайте минимальное и максимальное количество узлов. В этих пределах будет происходить масштабирование.
      1. Нажмите кнопку **Сохранить изменения**.

   </tabpanel>
   <tabpanel>

   1. [Установите Terraform и настройте окружение](/ru/tools-for-using-services/terraform/quick-start), если это еще не сделано.

   1. [Убедитесь](../manage-cluster#zapustit_klaster_bbf98834), что нужный кластер запущен.

   1. Измените нужный ресурс [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_node_group.md) в файле конфигурации Terraform:

      ```hcl
      ...

      # Уже описанная конфигурация для группы узлов
      resource "vkcs_kubernetes_node_group" "k8s-node-group" {
        name = "k8s-node-group"

        ...

        # Убедитесь, что опция, отвечающая за автомасштабирование, включена (true)
        autoscaling_enabled = true

        # Задайте количество узлов, в пределах которого будет выполняться масштабирование
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
