# {heading(Kubernetes кластерін құру)[id=terraform-k8s-create]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Төменде Terraform көмегімен әртүрлі Kubernetes кластерлерін құру мысалдары келтірілген.
Кластерді құру процедурасы толық сипатталған [Terraform көмегімен кластер құру](/kz/kubernetes/k8s/instructions/create-cluster/create-terraform) бөлімінде.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Кластерді құрмас бұрын)[id=terraform-k8s-create-prepare]}

1. {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоталарды]} тексеріңіз. Таңдалған {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=өңірде]} CDN-ресурсын құруға жеткілікті ресурс бар-жоғын тексеріңіз. Әртүрлі өңірлер үшін әртүрлі квоталар бапталуы мүмкін.

   Қажет болған жағдайда квоталарды {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=арттырыңыз]}.

1. Managed Containers қызметінде Terraform {linkto(../../../../../kubernetes/k8s/instructions/helpers/terraform-howto#k8s-terraform-howto)[text=пайдалану ерекшеліктерімен]} танысыңыз.
1. Әлі жасалмаса, {linkto(../../../quick-start#terraform-quick-start)[text=Terraform-ды орнатыңыз және провайдерді баптаңыз]}.

   Провайдер баптауларын Terraform конфигурация файлына `provider.tf` орналастырыңыз.

## {heading({counter(tf-k8s)}. Кластер үшін желілік инфрақұрылым сипаттамасы бар файлды жасаңыз)[id=terraform-k8s-create-net-file]}

Кластер үшін желілік инфрақұрылым сипаттамасы бар Terraform конфигурация файлын `network.tf` жасаңыз:

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

## {heading({counter(tf-k8s)}. Kubernetes кластерінің сипаттамасы бар файлды жасаңыз)[id=terraform-k8s-create-cluster-file]}

Төмендегі мысалдарда кластерлер келесі конфигурацияда құрылады:

- Өңір `Москва`, қолжетімділік аймағы `ME1`.
- Kubernetes нұсқасы `1.31`.
- Бір master-түйін `STD3-4-8`.
- Екі worker-түйін `STD2-2-4`:

  - Екі белгісімен (labels):

    - `env:test`
    - `disktype:ssd`

  - Екі шектеуімен (taints):

    - `taintkey1:taintvalue1`: `PreferNoSchedule`
    - `taintkey2:taintvalue2`: `PreferNoSchedule`

  - Әр кластерге сыртқы IP-мекенжай тағайындалады.

Кластерді құру мысалдарының бірін таңдап, қажетті мазмұны бар Terraform конфигурация файлын `main.tf` жасаңыз:

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
  availability_zone   = "ME1"

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

{tab(Под подсетін қайта анықтаумен)}

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
  availability_zone   = "ME1"

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

{linkto(../../../../../kubernetes/k8s/concepts/addons-and-settings/addons#k8s-addons)[text=Қызметті]} орнатуға `vkcs_kubernetes_cluster` ресурсының `labels = { docker_registry_enabled }` баптауы жауап береді.

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
  availability_zone   = "ME1"

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

## {heading({counter(tf-k8s)}. Қажетті ресурстарды Terraform көмегімен жасаңыз)[id=terraform-k8s-create-resource]}

1. Terraform конфигурация файлдарын `provider.tf`, `network.tf` және `main.tf` бір каталогқа орналастырыңыз.
1. Осы каталогқа өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform init
   ```

1. Команданы орындаңыз:

   ```console
   terraform apply
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=terraform-k8s-create-delete]}

Terraform көмегімен құрылған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары бар каталогқа өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.