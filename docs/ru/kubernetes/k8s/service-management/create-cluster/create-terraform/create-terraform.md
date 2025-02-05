Далее описывается создание кластера с помощью Terraform. Также возможно создать кластер [с помощью личного кабинета VK Cloud](../create-webui/).

Готовые примеры конфигурационных файлов для создания разных кластеров [приведены](/ru/tools-for-using-services/terraform/how-to-guides/k8s/create) в разделе Terraform.

<warn>

При создании кластера для него будет создан [сервисный балансировщик нагрузки](/ru/networks/balancing/concepts/load-balancer#tipy_balansirovshchikov_nagruzki). При выборе [аддона](../../../concepts/addons-and-settings/addons/) NGINX Ingress Controller для него будет создан [стандартный балансировщик нагрузки](/ru/networks/balancing/concepts/load-balancer#tipy_balansirovshchikov_nagruzki).

Использование балансировщиков [тарифицируется](/ru/networks/vnet/tariffication).

</warn>

## Перед созданием кластера

1. Ознакомьтесь с доступными ресурсами и [квотами](/ru/tools-for-using-services/account/concepts/quotasandlimits/) для [региона](/ru/tools-for-using-services/account/concepts/regions/), в котором планируется создать кластер. Для разных регионов могут быть настроены разные квоты.

   Если вы хотите увеличить квоты, напишите в [техническую поддержку](/ru/contacts).

1. Ознакомьтесь с [особенностями использования Terraform](../../helpers/terraform-howto/) в сервисе Cloud Containers.

1. [Установите Terraform и настройте окружение](/ru/tools-for-using-services/terraform/quick-start), если это еще не сделано.

1. [Установите OpenStack CLI](/ru/tools-for-using-services/cli/openstack-cli/) и [пройдите авторизацию](/ru/tools-for-using-services/cli/openstack-cli/), если этого еще не сделано.

1. Создайте конфигурационный файл Terraform.

   <info>

   В следующих шагах перечислены только основные параметры ресурсов Terraform, которые нужно указать в этом файле. Полный список параметров приведен в [документации](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs) Terraform-провайдера для [кластера Kubernetes](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_cluster.md).

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

   1. [Шаблон виртуальной машины](../../../concepts/flavors#shablony_konfiguracii) для master-узлов. Пример:

      ```hcl
      data "vkcs_compute_flavor" "k8s-master-flavor" {
          name = "STD3-2-4"
      }
      ```

      В качестве имени шаблона укажите имя, полученное ранее.

   1. Шаблон кластера. Пример:

      ```hcl
      data "vkcs_kubernetes_clustertemplate" "k8s-template" {
          version = "<ВЕРСИЯ_KUBERNETES>"
      }
      ```

      В качестве версии укажите номер версии, полученный ранее.

## 2. Опишите конфигурацию кластера

Добавьте в конфигурационный файл ресурс кластера:

```hcl
resource "vkcs_kubernetes_cluster" "k8s-cluster" {
  name                     = "k8s-cluster"
  cluster_type             = "<ТИП_КЛАСТЕРА>"
  cluster_template_id      = data.vkcs_kubernetes_clustertemplate.k8s-template.id
  master_flavor            = data.vkcs_compute_flavor.k8s-master-flavor.id
  master_count             = <КОЛИЧЕСТВО_MASTER_УЗЛОВ>
  cluster_node_volume_type = "<ТИП_ДИСКА>"
  network_id               = "<ИДЕНТИФИКАТОР_СЕТИ>"
  subnet_id                = "<ИДЕНТИФИКАТОР_ПОДСЕТИ>"
  availability_zone        = "<ЗОНА_ДОСТУПНОСТИ>"
  floating_ip_enabled      = true
}
```

Здесь:

- `cluster_type` — тип кластера:

  - `standart` (по умолчанию) — все master-узлы кластера будут располагаться в одной [зоне доступности](/ru/intro/start/concepts/architecture#az). Отказоустойчивость обеспечиваетя на уровне зоны.
  - `regional` — master-узлы кластера будут располагаться в каждой из трех зон доступности, что позволяет сохранить управление даже при отказе одной из зон. Общее количество master-узлов — 3 или более.

- `master_count` — количество master-узлов. Должно быть нечетным числом. Для стандартного кластера количество master-узлов должно быть `1`, `3` или `5`. Для регионального — `3` или `5`. Подробнее в разделе [Архитектура сервиса](../../../concepts/architecture/).
- `cluster_node_volume_type` — тип диска для [хранения данных](../../../concepts/storage#podderzhivaemye_tipy_hranilishch_vk_cloud), который будет использоваться узлами. Выбранный тип диска влияет на производительность кластера. Доступные значения: `ceph-ssd` (по умолчанию) и `high-iops`.
- `availability_zone` — зона доступности кластера. Используйте параметр, если тип кластера — стандартный. Для региона `Москва` укажите одну из трех зон доступности: `ME1`, `MS1` или `GZ1`.
- `availability_zones` — зоны доступности кластера. Используйте параметр, если тип кластера — региональный. Для региона `Москва` укажите три зоны доступности: `["ME1", "MS1", "GZ1"]`. Если кластер региональный и параметр `availability_zones` не указан, зоны доступности будут подставлены автоматически.
- `network_id` и `subnet_id` — идентификаторы сети и подсети соответственно. Их можно задать разными способами:

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

    <info>
       
    Чтобы создать кластер без доступа в интернет, укажите сеть с подключенным [Shadow port](/ru/networks/vnet/concepts/ips-and-inet#shadow_port).
       
    </info>

- `floating_ip_enabled` — назначить публичный IP-адрес для API-кластера:

  - `true` — при создании кластера ему будет назначен [плавающий IP-адрес](/ru/networks/vnet/concepts/ips-and-inet#plavayushchiy_ip_adres) для доступа к кластеру из интернета. Для назначения такого IP-адреса необходимо, чтобы подсеть кластера с идентификатором `subnet_id` была [подключена](/ru/networks/vnet/concepts/ips-and-inet#organizaciya_dostupa_v_internet) к маршрутизатору c доступом к внешней сети.
  - `false` — кластеру не будет назначен плавающий IP-адрес.

Чтобы установить аддоны в кластер с помощью Terraform, [получите список доступных аддонов](../../addons/manage-addons#348-tabpanel-1) и [установите нужные](../../addons/advanced-installation).

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
- [Познакомьтесь со сценариями использования](../../../how-to-guides/) кластера.
- [Познакомьтесь с концепциями](../../../concepts/) сервиса Cloud Containers.
