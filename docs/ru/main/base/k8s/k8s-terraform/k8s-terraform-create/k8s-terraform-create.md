<warn>

Прежде всего убедитесь, что вы [установили Terraform](https://mcs.mail.ru/docs/ru/additionals/terraform/terraform-installation) и [создали файл main.tf](https://mcs.mail.ru/docs/ru/additionals/terraform/terraform-provider-config) с необходимыми провайдерами.

</warn>

Чтобы создать кластер Kubernetes, где будет создана нод-группа с включенным автомасштабированием, создайте файл kubernetes.tf, где будет описано создание кластера Kubernetes. Добавьте текст из примеров ниже, и исправьте значения настроек для вашего кластера.

Для создания кластера нам потребуются следующие объекты:

1. Ресурсы (resource):

- vkcs_networking_network — сеть, в которой будет создан кластер и его ноды. В примере ниже сеть создается с именем «k8s-net».
- vkcs_networking_subnet — подсеть из сети, для нод кластера. В примере: k8s-subnet.
- vkcs_networking_router — роутер для внешней сети и взаимодействия с внешним миром.
- vkcs_networking_router_interface — подключить роутер к внутренней сети.
- vkcs_compute_keypair — ключевая пара для ВМ нод кластера. Эта ключевая пара позволяет подключаться к ВМ по ssh при необходимости. Можно не указывать, если не требуется доступ на ноды.

2. Источники данных (data source):

- vkcs_networking_network – внешняя сеть для получения публичного IP (Floating IP).
- vkcs_compute_flavor – флейвор (CPU, RAM, Disk) нод кластера. В примере создается два объекта типа vkcs_compute_flavor с именами k8s_master и k8s_worker, для использования при создании кластера и его нод-групп.

```yaml
resource "vkcs_networking_network" "k8s" {
    name           = "k8s-net"
    admin_state_up = true
}

resource "vkcs_networking_subnet" "k8s-subnetwork" {
    name            = "k8s-subnet"
    network_id      = vkcs_networking_network.k8s.id
    cidr            = "10.110.0.0/16"
    ip_version      = 4
    dns_nameservers = ["8.8.8.8", "8.8.4.4"]
}

data "vkcs_networking_network" "extnet" {
    name = "ext-net"
}

resource "vkcs_networking_router" "k8s" {
    name                = "k8s-router"
    admin_state_up      = true
    external_network_id = data.vkcs_networking_network.extnet.id
}

resource "vkcs_networking_router_interface" "k8s" {
    router_id = vkcs_networking_router.k8s.id
    subnet_id = vkcs_networking_subnet.k8s-subnetwork.id
}

resource "vkcs_compute_keypair" "keypair" {
    name = "default"
}

data "vkcs_compute_flavor" "k8s_master" {
    name = "Standard-2-4-40"
}

data "vkcs_compute_flavor" "k8s_worker" {
    name = "Basic-1-2-20"
}
```

### Ресурсы провайдера VK Cloud для создания кластера

1. _vkcs_kubernetes_clustertemplates_ — шаблоны/версии кластеров Kubernetes. Нужно указать версию кластера, которая будет создана.

Посмотреть список доступных версий можно:

- В визарде при создании кластера через личный кабинет.
- На странице «[Политика поддержки версий Kubernetes](../../k8s-concepts/k8s-versions/k8s-version-support/k8s-version-support.md)».
- Используя данные из vkcs_kubernetes_clustertemplates. Подробнее на [официальной странице](https://registry.terraform.io/providers/MailRuCloudSolutions/mcs/latest/docs/data-sources/mcs_kubernetes_clustertemplate).

2. _vkcs_kubernetes_cluster_ — кластер Kubernetes. В этом ресурсе мы описываем кластер и используем ранее описанные ресурсы.

- depends_on – terraform будет ждать завершения создания vkcs_networking_router_interface, прежде чем начать создавать кластер.
- name – имя кластера.
- cluster_template_id – шаблон/версия кластера указанная ранее в vkcs_kubernetes_clustertemplate.cluster_template
- master_count — количество мастер нод. Поддерживаются нечетные числа 1, 3, 5, 7.
- master_flavor — флейвор мастер нод.
- availability_zone — зона доступности.
- ingress_controller — аддон балансировщика ingress controller, который устанавливается при создании кластера. Аддоны описываются в блоке labels.
- keypair — ключевая пара для доступа на ноды кластера. Может быть пропущена, если не требуется доступ на ноды.
- network_id — сеть кластера Kubernetes.
- subnet_id — подсеть для кластера.
- floating_ip_enabled — назначение публичного IP для API сервера Kubernetes. Поддерживает значение true | false.

3. _vkcs_kubernetes_node_group_ — нод-группа кластера, в которой будет располагаться рабочая нагрузка.

- depends_on — создание нод-группы начнется после создания кластера.
- cluster_id — идентификатор кластера, в котором создается нод-группа.
- name — имя нод-группы.
- node_count — начальное количество нод в группе.
- autoscaling_enabled — включаем автомасштабирование кластера. Поддерживает значение true | false.
- max_nodes — максимальное количество нод, до которого кластер автоматически масштабируется при повышении нагрузки. Максимальное значение 100.
- min_nodes — минимальное количество нод в нод-группе.
- flavor_id — флейвор нод в нод-группе.

```yaml
data "vkcs_kubernetes_clustertemplate" "cluster_template"{
    version = "1.22.6" 
}

resource "vkcs_kubernetes_cluster" "k8s-cluster" {
    depends_on = [
        vkcs_networking_router_interface.k8s,
]

    name = "k8s-cluster"
    cluster_template_id = data.vkcs_kubernetes_clustertemplate.cluster_template.id
    master_flavor = data.vkcs_compute_flavor.k8s_master.id
    master_count = 1
    availability_zone = "MS1"
    labels ={ 
        ingress_controller = "nginx" 
    }
    keypair = vkcs_compute_keypair.keypair.id
    network_id = vkcs_networking_network.k8s.id
    subnet_id = vkcs_networking_subnet.k8s-subnetwork.id
    floating_ip_enabled = true
}

resource "vkcs_kubernetes_node_group" "default_ng"{
    depends_on = [
        vkcs_kubernetes_cluster.k8s-cluster, 
    ] 
    cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id 
    name = "default" 
    node_count = 1 
    autoscaling_enabled = true 
    max_nodes = 2 
    min_nodes = 1 
    flavor_id = data.vkcs_compute_flavor.k8s_worker.id 
}
```

Добавьте обе части примера в файл kubernetes.tf и выполните следующие команды:

```bash
terraform init
```
```bash
terraform apply
```
