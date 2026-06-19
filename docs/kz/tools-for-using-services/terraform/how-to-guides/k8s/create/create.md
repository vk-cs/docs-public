{include(/kz/_includes/_translated_by_ai.md)}

Төменде Terraform көмегімен әртүрлі Kubernetes кластерлерін құру мысалдары келтірілген.
Кластерді құру рәсімі [Terraform көмегімен кластер құру](/kz/kubernetes/k8s/instructions/create-cluster/create-terraform) бөлімінде егжей-тегжейлі сипатталған.

Параметрлердің толық сипаттамасы [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs) берілген.

## Кластерді құру алдында

1. [Квоталарды](/kz/tools-for-using-services/account/concepts/quotasandlimits) тексеріңіз. Таңдалған [өңірде](/kz/tools-for-using-services/account/concepts/regions) кластер құру үшін ресурстар жеткілікті екеніне көз жеткізіңіз. Әртүрлі өңірлер үшін әртүрлі квоталар бапталуы мүмкін.

   Қажет болса, [квоталарды арттырыңыз](/kz/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota).

1. Cloud Containers сервисіндегі [Terraform пайдалану ерекшеліктерімен](/kz/kubernetes/k8s/instructions/helpers/terraform-howto) танысыңыз.

1. Егер бұл әлі жасалмаған болса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).

   Провайдердің баптауларын Terraform конфигурациясының `provider.tf` файлына орналастырыңыз.

## 1. Кластер үшін желілік инфрақұрылым сипаттамасы бар файл жасаңыз

Кластер үшін желілік инфрақұрылым сипаттамасы бар `network.tf` Terraform конфигурация файлын жасаңыз:

```hcl
data "vkcs_networking_network" "extnet" {
  name = "internet"
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

## 2. Kubernetes кластерінің сипаттамасы бар файл жасаңыз

Төмендегі мысалдарда кластерлер келесі конфигурацияда жасалады:

- `Москва` өңірі, `GZ1` қолжетімділік аймағы.
- Kubernetes нұсқасы `1.31`.

- Бір `STD3-4-8` master-түйіні.
- Екі `STD2-2-4` worker-түйіні:

  - Екі меткамен (labels):

    - `env:test`
    - `disktype:ssd`

  - Екі шектеумен (taints):

    - `taintkey1:taintvalue1`: `PreferNoSchedule`
    - `taintkey2:taintvalue2`: `PreferNoSchedule`

  - Әр кластерге сыртқы IP мекенжайы тағайындалады.

Кластерді құру мысалдарының бірін таңдап, қажетті мазмұны бар `main.tf` Terraform конфигурация файлын жасаңыз:

{tabs}

{tab(Қосымша баптауларсыз)}

```hcl
data "vkcs_compute_flavor" "k8s-master-flavor" {
    name = "STD3-4-8"
}

data "vkcs_compute_flavor" "k8s-node-group-flavor" {
 name = "STD2-2-4"
}

data "vkcs_kubernetes_clustertemplate" "k8s-template" {
    version = "1.31"
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

{/tab}

{tab(Под ішкі желісін қайта анықтаумен)}

Под желісін қайта анықтауға `vkcs_kubernetes_cluster` ресурсының `labels = { calico_ipv4pool }` баптауы жауап береді.

```hcl
data "vkcs_compute_flavor" "k8s-master-flavor" {
    name = "STD3-4-8"
}

data "vkcs_compute_flavor" "k8s-node-group-flavor" {
 name = "STD2-2-4"
}

data "vkcs_kubernetes_clustertemplate" "k8s-template" {
    version = "1.31"
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

{/tab}

{tab(Docker Registry орнатумен)}

[Сервисті](/kz/kubernetes/k8s/concepts/addons-and-settings/addons) орнатуға `vkcs_kubernetes_cluster` ресурсының `labels = { docker_registry_enabled }` баптауы жауап береді.

```hcl
data "vkcs_compute_flavor" "k8s-master-flavor" {
    name = "STD3-4-8"
}

data "vkcs_compute_flavor" "k8s-node-group-flavor" {
 name = "STD2-2-4"
}

data "vkcs_kubernetes_clustertemplate" "k8s-template" {
    version = "1.31"
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

{/tab}

{/tabs}

## 3. Terraform көмегімен қажетті ресурстарды жасаңыз

1. `provider.tf`, `network.tf` және `main.tf` Terraform конфигурация файлдарын бір директорияға орналастырыңыз.
1. Осы директорияға өтіңіз.
1. Келесі команданы орындаңыз:

   ```console
   terraform init
   ```

1. Келесі команданы орындаңыз:

   ```console
   terraform apply
   ```

   Растауды сұраған кезде `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## Пайдаланылмайтын ресурстарды жойыңыз

Егер Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары бар директорияға өтіңіз.
1. Келесі команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растауды сұраған кезде `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.
