# {heading(Масштабирование узлов кластера)[id=k8s-instructions-scale]}

{ifdef(public)}
Вы можете выполнить {linkto(../../concepts/scale#k8s-scale)[text=масштабирование кластера Cloud Containers]} вручную или настроить автоматическое масштабирование, чтобы адаптировать кластер к меняющимся потребностям рабочих нагрузок ([workloads](https://kubernetes.io/docs/concepts/workloads/)).
{/ifdef}

## {heading(Вертикальное масштабирование)[id=k8s-instructions-scale-vertical]}

{ifdef(public)}
Такой тип масштабирования применим для master-узлов и групп worker-узлов. В процессе масштабирования изменяются {linkto(../../concepts/flavors#k8s-flavors)[text=шаблоны виртуальных машин]} для узлов кластера, количество узлов остается прежним. Если необходимо изменить количество worker-узлов в группе, {linkto(#k8s-instructions-scale-horizontal)[text=выполните горизонтальное масштабирование]}.
{/ifdef}

{ifndef(public)}
Вертикальное масштабирование доступно только для master-узла кластера.

Чтобы выполнить вертикальное масштабирование кластера:

1. {linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
1. Нажмите ![](../../../../assets/more-icon.svg "inline") для нужного кластера и выберите пункт **Изменить тип виртуальной машины Master**.
1. Укажите новый шаблон конфигурации ВМ и нажмите кнопку **Сохранить**.
{/ifndef}

{ifdef(public)}
### {heading(Масштабирование master-узлов)[id=k8s-instructions-scale-vertical-master-nodes]}

1. {linkto(../../concepts/scale#k8s-scale)[text=Изучите, как работает механизм вертикального масштабирования]}.

1. {linkto(../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=Убедитесь]}, что хватает квот для масштабирования.

1. Выполните масштабирование.

   {note:warn}
   В процессе масштабирования виртуальные машины, на которых размещены master-узлы, будут последовательно перезапущены.

   Если кластер {linkto(../../concepts/architecture#k8s-architecture-topology)[text=содержит один master-узел]}, то Kubernetes API будет недоступен в ходе масштабирования.
   {/note}

   {tabs}

   {tab(Личный кабинет)}

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
   1. {linkto(../manage-cluster#k8s-manage-cluster-start)[text=Убедитесь]}, что нужный кластер запущен.
   1. Нажмите ![](../../../../assets/more-icon.svg "inline") для нужного кластера и выберите пункт **Изменить тип виртуальной машины Master**.
   1. Выберите категорию виртуальной машины, чтобы отфильтровать список доступных {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=шаблонов конфигураций]}.

      {note:info}
      Шаблоны с высокопроизводительными CPU доступны по запросу в [техническую поддержку](/ru/contacts). Чтобы воспользоваться этими шаблонами, выберите опцию **Высокопроизводительные CPU**.

      Подробнее в разделе {linkto(../../concepts/flavors#k8s-flavors-vm-flavor)[text=Доступные вычислительные ресурсы]}.
      {/note}

   1. Выберите нужный шаблон виртуальной машины из выпадающего списка.
   1. Нажмите кнопку **Сохранить**.

   {/tab}

   {tab(Terraform)}

   {note:info}
   Управление через Terraform доступно только для кластеров {linkto(../../concepts/cluster-generations#k8s-cluster-generations)[text=первого поколения]}.
   {/note}
 
   1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.

   1. [Установите Terraform и настройте окружение](../../../../tools-for-using-services/terraform/quick-start), если это еще не сделано.

   1. {linkto(../manage-cluster#k8s-manage-cluster-start)[text=Убедитесь]}, что нужный кластер запущен.

   1. Определите новый тип виртуальной машины, который будет использоваться для master-узлов кластера:

      1. Выполните команду:

         ```console
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

### {heading(Масштабирование групп worker-узлов)[id=k8s-instructions-scale-vertical-worker-nodes]}

1. {linkto(../../concepts/scale#k8s-scale)[text=Изучите, как работает механизм вертикального масштабирования]}.

1. Подготовьтесь к масштабированию:

   1. {linkto(../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=Убедитесь]}, что хватает квот для масштабирования.
   1. Если вы планируете сократить объем вычислительных ресурсов, то убедитесь, что итогового объема ресурсов в группе worker-узлов будет достаточно для размещения рабочей нагрузки.
   1. Убедитесь, что для рабочей нагрузки настроена репликация и реплики распределены по нескольким worker-узлам из группы узлов.

      Если в группе узлов есть только один worker-узел, {linkto(#k8s-instructions-scale-horizontal)[text=увеличьте количество узлов в группе]} и настройте репликацию, если это возможно.

1. Выполните масштабирование.

   {note:warn}
   В процессе масштабирования виртуальные машины, на которых размещены worker-узлы, будут последовательно перезапущены.

   Рабочие нагрузки, для которых не была настроена репликация, будут недоступны в ходе масштабирования.
   {/note}

   {tabs}

   {tab(Личный кабинет)}

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
   1. {linkto(../manage-cluster#k8s-manage-cluster-start)[text=Убедитесь]}, что нужный кластер запущен.
   1. Найдите нужную группу узлов в этом кластере.
   1. Нажмите ![](../../../../assets/more-icon.svg "inline") для этой группы узлов и выберите пункт **Изменить тип виртуальной машины**.
   1. Выберите категорию виртуальной машины, чтобы отфильтровать список доступных {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=шаблонов конфигураций]}. 

      {note:info}
      Шаблоны с высокопроизводительными CPU доступны по запросу в [техническую поддержку](/ru/contacts). Чтобы воспользоваться этими шаблонами, выберите опцию **Высокопроизводительные CPU**.

      Подробнее в разделе {linkto(../../concepts/flavors#k8s-flavors-vm-flavor)[text=Доступные вычислительные ресурсы]}.
      {/note}

   1. Выберите нужный шаблон виртуальной машины из выпадающего списка.
   1. Нажмите кнопку **Сохранить**.

   {/tab}

   {tab(Terraform)}
   
   {note:info}
   Управление через Terraform доступно только для кластеров {linkto(../../concepts/cluster-generations#k8s-cluster-generations)[text=первого поколения]}.
   {/note}

   1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.

   1. [Установите Terraform и настройте окружение](../../../../tools-for-using-services/terraform/quick-start), если это еще не сделано.

   1. {linkto(../manage-cluster#k8s-manage-cluster-start)[text=Убедитесь]}, что нужный кластер запущен.

   1. Определите новый тип виртуальной машины, который будет использоваться для worker-узлов в группе узлов кластера:

      1. Выполните команду:

         ```console
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

## {heading(Горизонтальное масштабирование)[id=k8s-instructions-scale-horizontal]}

{ifdef(public)}
Такой тип масштабирования применим для групп worker-узлов. В процессе масштабирования изменяется количество worker-узлов в группе, {linkto(../../concepts/flavors#k8s-flavors)[text=шаблоны виртуальных машин]} для worker-узлов остаются прежними. Если необходимо изменить эти шаблоны для master-узлов или worker-узлов, {linkto(#k8s-instructions-scale-vertical)[text=выполните вертикальное масштабирование]}.
{/ifdef}

{ifndef(public)}
Горизонтальное масштабирование применяется при планировании динамической нагрузки на кластер. В случае повышенной нагрузки на сервер кластер автоматически увеличит количество нод, а при отсутствии нагрузки — автоматически уменьшит.

При использовании автоматического горизонтального масштабирования учтите факторы:

* Гарантируется, что у всех модулей в кластере есть место для запуска, независимо от уровня нагрузки на процессор, и что в кластере нет ненужных узлов.
* Необходимость масштабирования регистрируется примерно через 30 секунд.
* После того как узел становится ненужным, масштабирование кластера выполняется через 5 минут.
* Ответственно применяйте опцию `cluster-autoscaler.kubernetes.io/safe-to-evict (true)`. Если установить много подов или если многие из них будут разбросаны по всем узлам, можно потерять возможность уменьшать масштаб кластера.
* Используйте [PodDisruptionBudgets](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/), чтобы предотвратить удаление пода, из-за чего часть приложения может полностью выйти из строя.

Чтобы настроить параметры для горизонтального масштабирования:

1. {linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
1. Нажмите ![](../../../../assets/more-icon.svg "inline") для нужной группы узлов и выберите пункт **Настройки масштабирования**.
1. Активируйте переключатель **Включить автомасштабирование**.
1. Укажите минимальное и максимальное количество узлов в одноименных полях.
1. Нажмите кнопку **Сохранить изменения**.
{/ifndef}

{ifdef(public)}
### {heading(Масштабирование групп worker-узлов)[id=k8s-instructions-scale-horizontal-worker-nodes]}

1. {linkto(../../concepts/scale#k8s-scale)[text=Изучите, как работает механизм горизонтального масштабирования]}.

1. {linkto(../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=Убедитесь]}, что хватает квот для масштабирования.

1. Выполните масштабирование:

   {tabs}

   {tab(Личный кабинет)}

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
   1. {linkto(../manage-cluster#k8s-manage-cluster-start)[text=Убедитесь]}, что нужный кластер запущен.
   1. Найдите нужную группу узлов в этом кластере.
   1. Нажмите ![](../../../../assets/more-icon.svg "inline") для этой группы узлов и выберите пункт **Настройки масштабирования**.
   1. В появившемся окне:

      1. Убедитесь, что опция **Включить автомасштабирование** выключена.
      1. Задайте нужное количество узлов. Его можно изменять как в большую, так и в меньшую сторону.
      1. Нажмите кнопку **Сохранить изменения**.

   {/tab}

   {tab(Terraform)}

   {note:info}
   Управление через Terraform доступно только для кластеров {linkto(../../concepts/cluster-generations#k8s-cluster-generations)[text=первого поколения]}.
   {/note}

   1. [Установите Terraform и настройте окружение](../../../../tools-for-using-services/terraform/quick-start), если это еще не сделано.

   1. {linkto(../manage-cluster#k8s-manage-cluster-start)[text=Убедитесь]}, что нужный кластер запущен.

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

### {heading(Настройка автоматического масштабирования групп worker-узлов)[id=k8s-instructions-scale-horizontal-autoscaling-worker-nodes]}

1. {linkto(../../concepts/scale#k8s-scale)[text=Изучите, как работает механизм горизонтального масштабирования]}.

1. {linkto(../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=Убедитесь]}, что хватает квот для масштабирования.

1. Настройте автоматическое масштабирование:

   {tabs}

   {tab(Личный кабинет)}

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
   1. {linkto(../manage-cluster#k8s-manage-cluster-start)[text=Убедитесь]}, что нужный кластер запущен.
   1. Найдите нужную группу узлов в этом кластере.
   1. Нажмите ![](../../../../assets/more-icon.svg "inline") для этой группы узлов и выберите пункт **Настройки масштабирования**.
   1. В появившемся окне:

      1. Убедитесь, что опция **Включить автомасштабирование** включена.
      1. Задайте минимальное и максимальное количество узлов. В этих пределах будет происходить масштабирование.
      1. Нажмите кнопку **Сохранить изменения**.

   {/tab}

   {tab(Terraform)}

   {note:info}
   Управление через Terraform доступно только для кластеров {linkto(../../concepts/cluster-generations#k8s-cluster-generations)[text=первого поколения]}.
   {/note}

   1. [Установите Terraform и настройте окружение](../../../../tools-for-using-services/terraform/quick-start), если это еще не сделано.

   1. {linkto(../manage-cluster#k8s-manage-cluster-start)[text=Убедитесь]}, что нужный кластер запущен.

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