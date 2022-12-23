<info>

Создать кластер возможно также [с помощью личного кабинета VK Cloud](../create-webui/).

</info>

## Перед созданием кластера

1. Ознакомьтесь с доступными ресурсами и [квотами](../../../../../base/account/concepts/quotasandlimits/) для [региона](../../../../../base/account/concepts/regions/), в котором планируется создать кластер. Для разных регионов могут быть настроены разные квоты.

   Если вы хотите увеличить квоты, напишите в [техническую поддержку](../../../../../../contacts).

1. Ознакомьтесь с [особенностями использования Terraform](../../helpers/terraform-howto/) в сервисе контейнеров.

1. [Установите Terraform и настройте провайдер](../../../../../additionals/terraform/quick-start/preparation/), если этого еще не сделано.

1. [Установите OpenStack CLI](../../../../../base/account/project/cli/setup/) и [пройдите авторизацию](../../../../../base/account/project/cli/authorization/), если этого еще не сделано.

1. Создайте конфигурационный файл Terraform.

   <info>

   В следующих шагах перечислены только основные параметры ресурсов Terraform, которые нужно указать в этом файле. Полный список параметров приведен в [документации](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs) Terraform-провайдера для [кластера Kubernetes](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vkcs_kubernetes_cluster.md).

   </info>

## 1. Подготовьте необходимые источники данных

1. Определите, какой тип виртуальной машины будет использоваться для master-узлов кластера:

   1. Выполните команду:

      ```bash
      openstack flavor list
      ```

      Будут выведены доступные типы виртуальных машин.

   1. Выберите нужный тип виртуальной машины и запишите ее имя из колонки **Name**.

1. Определите версию Kubernetes, с которой необходимо создать кластер:

   1. Добавьте в конфигурационный файл следующие строки:

      ```hcl
      data "vkcs_kubernetes_clustertemplates" "k8s-template-list" {}

      output "k8s-version-list" {
          value = data.vkcs_kubernetes_clustertemplates.k8s-template-list.cluster_templates.*.version
      }
      ```

   1. Выполните команду:

      ```bash
      terraform refresh
      ```

   1. Выполните команду:

      ```hcl
      terraform output k8s-version-list
      ```

      Будет выведен список доступных версий Kubernetes.

   1. Выберите нужную версию Kubernetes и запишите ее номер.

1. Добавьте в конфигурационный файл источники данных:

   1. [Шаблон виртуальной машины](../../../concepts/flavors#dostupnye-shablony-konfiguracii) для master-узлов. Пример:

      ```hcl
      data "vkcs_compute_flavor" "k8s-master-flavor" {
          name = "Standard-2-2"
      }
      ```

      В качестве имени шаблона укажите имя, полученное ранее.

   1. Шаблон кластера. Пример:

      ```hcl
      data "vkcs_kubernetes_clustertemplate" "k8s-template" {
          version = "1.23"
      }
      ```

      В качестве версии укажите номер версии, полученный ранее.

## 2. Опишите конфигурацию кластера

Добавьте в конфигурационный файл ресурс кластера:

```hcl
resource "vkcs_kubernetes_cluster" "k8s-cluster" {
  name                = "k8s-cluster"
  cluster_template_id = data.vkcs_kubernetes_clustertemplate.k8s-template.id
  master_flavor       = data.vkcs_compute_flavor.k8s-master-flavor.id
  master_count        = <количество master-узлов>
  network_id          = "<идентификатор сети>"
  subnet_id           = "<идентификатор подсети>"
  availability_zone   = "<зона доступности>"
  floating_ip_enabled = <true или false: назначить ли публичный IP-адрес для API-кластера>
  labels = {
    # Требуемые предустановленные сервисы
    docker_registry_enabled = true
    prometheus_monitoring = true
    ingress_controller="nginx"
  }
}
```

Некоторые пояснения:

- Количество master-узлов `master_count` должно быть нечетным числом (1, 3, 5 и так далее). Подробнее в разделе [Архитектура сервиса](../../../concepts/architecture/).

- Идентификаторы сети `network_id` и подсети `subnet_id` можно задать разными способами:

  <tabs>
  <tablist>
  <tab>Задать идентификаторы</tab>
  <tab>Использовать источники данных</tab>
  <tab>Использовать созданные ресурсы</tab>
  </tablist>
  <tabpanel>

  Если нужные сети и подсети уже существуют и вам известны их идентификаторы, укажите идентификаторы явно.

  Пример:
  
  ```hcl
  resource "vkcs_kubernetes_cluster" "k8s-cluster" {
    name                = "k8s-cluster"
    ...
    network_id          = "sample-id-4212-a090-9f30519275e5"
    subnet_id           = "sample-id-4bd6-bda4-f66dc7fbaa4f"
    ...
  }
  ```
  </tabpanel>
  <tabpanel>
  
  Если нужные сети и подсети уже существуют, но вам неизвестны их идентификаторы, укажите соответствующие источники данных и получите идентификаторы.
  
  Пример:
  
  ```hcl
  ...
  data "vkcs_networking_network" "k8s-network" {
      name = "default"
  }
  data "vkcs_networking_subnet" "k8s-subnet" {
      name = "default_subnet"
      network_id = data.vkcs_networking_network.k8s-network.id
  }
  ...
  resource "vkcs_kubernetes_cluster" "k8s-cluster" {
    name                = "k8s-cluster"
    ...
    network_id          = data.vkcs_networking_network.k8s-network.id
    subnet_id           = data.vkcs_networking_subnet.k8s-subnet.id
    ...
  }
  ```
  </tabpanel>
  <tabpanel>
  
  Если нужные сети и подсети еще не существуют, создайте их и получите идентификаторы:

  ```hcl
  ...
  resource "vkcs_networking_network" "k8s-network" {
  name           = "default"
  admin_state_up = "true"
  }
  resource "vkcs_networking_subnet" "k8s-subnet" {
      name       = "default_subnet"
      network_id = vkcs_networking_network.k8s-network.id
      cidr       = "<Адрес подсети вида 192.168.0.0/24>"
      ip_version = 4
  }
  ...
  resource "vkcs_kubernetes_cluster" "k8s-cluster" {
    name                = "k8s-cluster"
    ...
    network_id          = vkcs_networking_network.k8s-network.id
    subnet_id           = vkcs_networking_subnet.k8s-subnet.id
    ...
  }
  ```
  </tabpanel>
  </tabs>

- Для региона `Москва` укажите одну из двух зон доступности `availability_zone`: `MS1` или `GZ1`.

- Рекомендуется при создании кластера назначить ему публичный IP-адрес, чтобы можно было получить доступ к кластеру из интернета (`floating_ip_enabled = true`).

- Если какие-то из предустановленных сервисов не нужны, удалите соответствующие им строки из блока `labels`. Подробнее в разделе [Доступные сервисы](../../../concepts/preconfigured-features/addons/).

## 3. Опишите конфигурацию одной или нескольких групп worker-узлов

<info>

Это необязательный шаг.
С помощью Terraform можно создать кластер только из master-узлов, а группы worker-узлов добавить позднее.

</info>

Эта операция подробно описана в разделе [Управление группой worker-узлов](../../manage-node-group/).

## 4. Запустите процедуру создания кластера

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

   Начнется создание кластера Kubernetes. Этот процесс может занять длительное время, в зависимости от размера кластера.

## Что дальше?

- [Настройте окружение](../../../connect/) на хосте, с которого планируется подключаться к кластеру.
- [Познакомьтесь со сценариями использования](../../../use-cases/) кластера.
- [Познакомьтесь с концепциями](../../../concepts/) сервиса контейнеров.
