# {heading(Создание кластера первого поколения с помощью Terraform)[id=k8s-create-terraform]}

Далее описывается создание кластера {linkto(../../../concepts/cluster-generations#k8s-cluster-generations)[text=первого поколения]} с помощью Terraform. Также вы можете создать кластер первого поколения {linkto(../create-webui#k8s-create-webui)[text=в личном кабинете {var(cloud)}]}.

Готовые примеры конфигурационных файлов для создания разных кластеров [приведены](../../../../../tools-for-using-services/terraform/how-to-guides/k8s/create) в разделе Terraform.

{note:warn}
При создании кластера для него будет создан {linkto(../../../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=сервисный балансировщик нагрузки]}. При выборе {linkto(../../../concepts/addons-and-settings/addons#k8s-addons)[text=аддона]} NGINX Ingress Controller для него будет создан {linkto(../../../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=стандартный балансировщик нагрузки]}.

Использование балансировщиков {linkto(../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифицируется]}.
{/note}

## {heading(Перед созданием кластера)[id=k8s-create-terraform-prepare]}

1. Ознакомьтесь с доступными ресурсами и {linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квотами]} для {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региона]}, в котором планируется создать кластер. Для разных регионов могут быть настроены разные квоты.

   При необходимости {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota)[text=увеличьте]} квоты.

1. Ознакомьтесь с {linkto(../../helpers/terraform-howto#k8s-terraform-howto)[text=особенностями использования Terraform]} в сервисе Cloud Containers.

1. [Установите Terraform и настройте окружение](../../../../../tools-for-using-services/terraform/quick-start), если это еще не сделано.

1. {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=Установите OpenStack CLI]} и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=пройдите авторизацию]}, если этого еще не сделано.

1. Создайте конфигурационный файл Terraform.

   {note:info}
   В следующих шагах перечислены только основные параметры ресурсов Terraform, которые нужно указать в этом файле. Полный список параметров приведен в [документации](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs) Terraform-провайдера для [кластера Kubernetes](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_cluster.md).
   {/note}

## {heading(1. Подготовьте необходимые источники данных)[id=k8s-create-terraform-prepare-data-sources]}

1. Определите, какой тип виртуальной машины будет использоваться для master-узлов кластера:

   1. Выполните команду:

      ```console
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

      ```console
      terraform refresh
      ```

   1. Выполните команду:

      ```hcl
      terraform output k8s-version-list
      ```

      Будет выведен список доступных версий Kubernetes.

   1. Выберите нужную версию Kubernetes и запишите ее номер.

1. Добавьте в конфигурационный файл источники данных:

   1. {linkto(../../../concepts/flavors#k8s-flavors-vm-flavor)[text=Шаблон виртуальной машины]} для master-узлов. Пример:

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

## {heading(2. Опишите конфигурацию кластера)[id=k8s-create-terraform-describe-conf]}

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

  - `standart` (по умолчанию) — все master-узлы кластера будут располагаться в одной {linkto(../../../../../start/concepts/architecture#architecture-az)[text=зоне доступности]}. Отказоустойчивость обеспечиваетcя на уровне зоны.
  - `regional` — master-узлы кластера будут располагаться в каждой из трех зон доступности, что позволяет сохранить управление даже при отказе одной из зон. Общее количество master-узлов — 3 или более.

- `master_count` — количество master-узлов. Должно быть нечетным числом. Для стандартного кластера количество master-узлов должно быть `1`, `3` или `5`. Для регионального — `3` или `5`. Подробнее в разделе {linkto(../../../concepts/architecture#k8s-architecture)[text=Архитектура сервиса]}.
- `cluster_node_volume_type` — тип диска для {linkto(../../../concepts/storage#k8s-storage-supported-storage-types)[text=хранения данных]}, который будет использоваться узлами. Выбранный тип диска влияет на производительность кластера. Доступные значения: `ceph-ssd` (по умолчанию) и `high-iops`.
- `availability_zone` — зона доступности кластера. Используйте параметр, если тип кластера — стандартный. Для региона `Москва` укажите одну из трех зон доступности: `ME1`, `MS1` или `PA2`.
  
   {note:info}
   Зону доступности `PA2` можно выбрать только для проектов, использующих {linkto(../../../../../networks/vnet/concepts/sdn#vnet-sdn-sprut)[text=SDN Sprut]}.
   {/note}

- `availability_zones` — зоны доступности кластера. Используйте параметр, если тип кластера — региональный. Для региона `Москва` укажите три зоны доступности: `["ME1", "MS1", "PA2"]`. Если кластер региональный и параметр `availability_zones` не указан, зоны доступности будут подставлены автоматически.
- `network_id` и `subnet_id` — идентификаторы сети и подсети соответственно. Их можно задать разными способами:

  {tabs}

  {tab(Задать идентификаторы)}

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

  {/tab}

  {tab(Использовать источники данных)}

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

  {/tab}

  {tab(Использовать созданные ресурсы)}

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

  {/tab}

  {/tabs}

    {note:info}
    Чтобы создать кластер без доступа в интернет, укажите сеть с подключенным {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-shadow-port)[text=Shadow port]}.
    {/note}

- `floating_ip_enabled` — назначить публичный IP-адрес для API-кластера:

  - `true` — при создании кластера ему будет назначен {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-адрес]} для доступа к кластеру из интернета. Для назначения такого IP-адреса необходимо, чтобы подсеть кластера с идентификатором `subnet_id` была {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-internet-access)[text=подключена]} к маршрутизатору c доступом к внешней сети.
  - `false` — кластеру не будет назначен Floating IP-адрес.

Чтобы установить аддоны в кластер с помощью Terraform, {linkto(../../addons/manage-addons#k8s-manage-addons-available)[text=получите список доступных аддонов]} и {linkto(../../addons/advanced-installation#k8s-advanced-installation)[text=установите нужные]}.

## {heading(3. Опишите конфигурацию одной или нескольких групп worker-узлов)[id=k8s-create-terraform-describe-workers]}

{note:info}
Это необязательный шаг.
С помощью Terraform можно создать кластер только из master-узлов, а группы worker-узлов добавить позднее.
{/note}

Эта операция подробно описана в разделе {linkto(../../manage-node-group#k8s-manage-node-group)[text=Управление группой worker-узлов]}.

## {heading(4. Запустите процедуру создания кластера)[id=k8s-create-terraform-apply]}

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

   Начнется создание кластера Kubernetes. Этот процесс может занять длительное время, в зависимости от размера кластера.

## {heading(Что дальше?)[id=k8s-create-terraform-what-next]}

- {linkto(../../../connect#k8s-connect)[text=Настройте окружение]} на хосте, с которого планируется подключаться к кластеру.
- {linkto(../../../how-to-guides#k8s-how-to-guides)[text=Познакомьтесь со сценариями использования]} кластера.
- {linkto(../../../concepts#k8s-concepts)[text=Познакомьтесь с концепциями]} сервиса Cloud Containers.