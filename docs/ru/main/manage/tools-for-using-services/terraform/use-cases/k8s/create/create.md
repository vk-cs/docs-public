Далее приведены примеры создания разных кластеров Kubernetes с помощью Terraform.
Подробно процедура создания кластера описана в разделе [Создание кластера с помощью Terraform](/ru/base/k8s/operations/create-cluster/create-terraform).

## Перед созданием кластера

1. Ознакомьтесь с доступными ресурсами и [квотами](/ru/base/account/concepts/quotasandlimits) для [региона](/ru/base/account/concepts/regions), в котором планируется создать кластер. Для разных регионов могут быть настроены разные квоты.

   Если вы хотите увеличить квоты, обратитесь в [техническую поддержку](/ru/contacts).

1. Ознакомьтесь с [особенностями использования Terraform](/ru/base/k8s/operations/helpers/terraform-howto) в сервисе контейнеров.

1. [Установите Terraform и настройте провайдер](../../../quick-start), если этого еще не сделано.

   Поместите настройки провайдера в файл конфигурации Terraform `provider.tf`.

## 1. Создайте файл с описанием сетевой инфраструктуры для кластера

Создайте файл конфигурации Terraform `network.tf` с описанием сетевой инфраструктуры для кластера:

```hcl
data "vkcs_networking_network" "extnet" {
  name = "ext-net"
}

resource "vkcs_networking_network" "k8s" {
  name           = "k8s-net"
  admin_state_up = true
}

resource "vkcs_networking_subnet" "k8s" {
  name            = "k8s-subnet"
  network_id      = vkcs_networking_network.k8s.id
  cidr            = "192.168.199.0/24"
  dns_nameservers = ["8.8.8.8", "8.8.4.4"]
}

resource "vkcs_networking_router" "k8s" {
  name                = "k8s-router"
  admin_state_up      = true
  external_network_id = data.vkcs_networking_network.extnet.id
}

resource "vkcs_networking_router_interface" "k8s" {
  router_id = vkcs_networking_router.k8s.id
  subnet_id = vkcs_networking_subnet.k8s.id
}
```

## 2. Создайте файл с описанием кластера Kubernetes

В примерах ниже кластеры создаются в следующей конфигурации:

- Регион `Москва`, зона доступности `GZ1`.
- Версия Kubernetes `1.23`.

- Один master-узел `Standard-2-6`.
- Два worker-узла `Basic-1-2-40`:

  - С двумя метками (labels):

    - `env:test`
    - `disktype:ssd`

  - С двумя ограничениями (taints):

    - `taintkey1:taintvalue1`: `PreferNoSchedule`
    - `taintkey2:taintvalue2`: `PreferNoSchedule`

  - Каждому кластеру назначается внешний IP-адрес.

Выберите один из примеров создания кластера и создайте файл конфигурации Terraform `main.tf` с нужным содержимым:

<tabs>
<tablist>
<tab>Без дополнительных настроек</tab>
<tab>С переопределением подсети пода</tab>
<tab>С установкой Docker Registry</tab>
</tablist>
<tabpanel>

```hcl
data "vkcs_compute_flavor" "k8s-master-flavor" {
    name = "Standard-2-6"
}

data "vkcs_compute_flavor" "k8s-node-group-flavor" {
 name = "Basic-1-2-40"
}

data "vkcs_kubernetes_clustertemplate" "k8s-template" {
    version = "1.23"
}

resource "vkcs_kubernetes_cluster" "k8s-cluster" {

  depends_on = [
    vkcs_networking_router_interface.k8s,
  ]

  name                = "k8s-cluster-tf"
  cluster_template_id = data.vkcs_kubernetes_clustertemplate.k8s-template.id
  master_flavor       = data.vkcs_compute_flavor.k8s-master-flavor.id
  master_count        = 1
  network_id          = vkcs_networking_network.k8s.id
  subnet_id           = vkcs_networking_subnet.k8s.id
  availability_zone   = "GZ1"

  floating_ip_enabled = true

}

resource "vkcs_kubernetes_node_group" "k8s-node-group" {
  name = "k8s-node-group"
  cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
  flavor_id = data.vkcs_compute_flavor.k8s-node-group-flavor.id

  node_count = 2


  labels {
        key = "env"
        value = "test"
    }

  labels {
        key = "disktype"
        value = "ssd"
    }

  taints {
        key = "taintkey1"
        value = "taintvalue1"
        effect = "PreferNoSchedule"
    }

  taints {
        key = "taintkey2"
        value = "taintvalue2"
        effect = "PreferNoSchedule"
    }
}
```

</tabpanel>
<tabpanel>

За переопределение сети пода отвечает настройка `labels = { calico_ipv4pool }` ресурса `vkcs_kubernetes_cluster`.

```hcl
data "vkcs_compute_flavor" "k8s-master-flavor" {
    name = "Standard-2-6"
}

data "vkcs_compute_flavor" "k8s-node-group-flavor" {
 name = "Basic-1-2-40"
}

data "vkcs_kubernetes_clustertemplate" "k8s-template" {
    version = "1.23"
}

resource "vkcs_kubernetes_cluster" "k8s-cluster" {

  depends_on = [
    vkcs_networking_router_interface.k8s,
  ]

  name                = "k8s-cluster-tf"
  cluster_template_id = data.vkcs_kubernetes_clustertemplate.k8s-template.id
  master_flavor       = data.vkcs_compute_flavor.k8s-master-flavor.id
  master_count        = 1
  network_id          = vkcs_networking_network.k8s.id
  subnet_id           = vkcs_networking_subnet.k8s.id
  availability_zone   = "GZ1"

  floating_ip_enabled = true

  labels = {
    calico_ipv4pool   = "10.222.0.0/16"
  }

}

resource "vkcs_kubernetes_node_group" "k8s-node-group" {
  name = "k8s-node-group"
  cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
  flavor_id = data.vkcs_compute_flavor.k8s-node-group-flavor.id

  node_count = 2
  autoscaling_enabled = false
  min_nodes = 1
  max_nodes = 3

  labels {
        key = "env"
        value = "test"
    }

  labels {
        key = "disktype"
        value = "ssd"
    }

  taints {
        key = "taintkey1"
        value = "taintvalue1"
        effect = "PreferNoSchedule"
    }

  taints {
        key = "taintkey2"
        value = "taintvalue2"
        effect = "PreferNoSchedule"
    }
}
```

</tabpanel>
<tabpanel>

За установку [сервиса](/ru/base/k8s/concepts/preconfigured-features/addons) отвечает настройка `labels = { docker_registry_enabled }` ресурса `vkcs_kubernetes_cluster`.

```hcl
data "vkcs_compute_flavor" "k8s-master-flavor" {
    name = "Standard-2-6"
}

data "vkcs_compute_flavor" "k8s-node-group-flavor" {
 name = "Basic-1-2-40"
}

data "vkcs_kubernetes_clustertemplate" "k8s-template" {
    version = "1.23"
}

resource "vkcs_kubernetes_cluster" "k8s-cluster" {

  depends_on = [
    vkcs_networking_router_interface.k8s,
  ]

  name                = "k8s-cluster-tf"
  cluster_template_id = data.vkcs_kubernetes_clustertemplate.k8s-template.id
  master_flavor       = data.vkcs_compute_flavor.k8s-master-flavor.id
  master_count        = 1
  network_id          = vkcs_networking_network.k8s.id
  subnet_id           = vkcs_networking_subnet.k8s.id
  availability_zone   = "GZ1"

  floating_ip_enabled = true

  labels = {
    docker_registry_enabled = true
  }

}

resource "vkcs_kubernetes_node_group" "k8s-node-group" {
  name = "k8s-node-group"
  cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
  flavor_id = data.vkcs_compute_flavor.k8s-node-group-flavor.id

  node_count = 2
  autoscaling_enabled = false
  min_nodes = 1
  max_nodes = 3

  labels {
        key = "env"
        value = "test"
    }

  labels {
        key = "disktype"
        value = "ssd"
    }

  taints {
        key = "taintkey1"
        value = "taintvalue1"
        effect = "PreferNoSchedule"
    }

  taints {
        key = "taintkey2"
        value = "taintvalue2"
        effect = "PreferNoSchedule"
    }
}
```

</tabpanel>
</tabs>

## 3. Создайте необходимые ресурсы с помощью Terraform

1. Поместите файлы конфигурации Terraform `provider.tf`, `network.tf` и `main.tf` в одну директорию.
1. Перейдите в эту директорию.
1. Выполните команду:

   ```bash
   terraform init
   ```

1. Выполните команду:

   ```bash
   terraform apply
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.

## Проконтролируйте использование ресурсов

Если созданные с помощью Terraform ресурсы вам больше не нужны, удалите их:

1. Перейдите в директорию с файлами конфигурации Terraform.
1. Выполните команду:

   ```bash
   terraform destroy
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.
