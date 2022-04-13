Создание кластера Kubernetes
**Обязательные условия:**
Перед продолжением убедитесь, что вы [установили Terraform](ссылка на статью Установка Terrafrom) и [создали файл main.tf]( ссылка на Настройка провайдера Terraform для VK CS и OpenStack) с необходимыми провайдерами.

В данной статье создается кластер Kubernetes с нод-группой. В кластере будет

Создайте файл kubernetes.tf, где будет описано создание кластера Kubernetes. Добавьте текст примеров ниже и исправьте значения настроек для вашего кластера.

Для создания кластера нам потребуются следующие openstack ресурсы:
*openstack_networking_network_v2* – Сеть, в которой будет создан кластер и его ноды. В примере ниже сеть создается с именем «k8s-net». Ссылка на что это.
*openstack_networking_subnet_v2* – Подсеть из сети, для нод кластера. В примере: k8s-subnet.
*openstack_networking_network_v2* – Внешняя сеть для получения публичного IP (Floating IP).
*openstack_networking_router_v2* – Роутер для внешней сети и взаимодействия с внешним миром.
*openstack_networking_router_interface_v2* – Подключить роутер к внутренней сети.
*openstack_compute_keypair_v2* – Ключевая пара для ВМ нод кластера. Эта ключевая пара позволяет подключаться к ВМ по ssh при необходимости. Можно не указывать, если не требуется доступ на ноды.
*openstack_compute_flavor_v2* – Флейвор (CPU, RAM, Disk) нод кластера. В примере создается два объекта типа openstack_compute_flavor_v2 с именами k8s_master и k8s_worker, для использования при создании кластера и его нод-групп.

``` bash
resource "openstack_networking_network_v2" "k8s"

{ name = "k8s-net" admin_state_up = true }
resource "openstack_networking_subnet_v2" "k8s-subnetwork"

{ name = "k8s-subnet" network_id = openstack_networking_network_v2.k8s.id cidr = "10.110.0.0/16" ip_version = 4 dns_nameservers = ["8.8.8.8", "8.8.4.4"] }
data "openstack_networking_network_v2" "extnet"

{ name = "k8s-extnet" }
resource "openstack_networking_router_v2" "k8s"

{ name = "k8s-router" admin_state_up = true external_network_id = data.openstack_networking_network_v2.extnet.id }
resource "openstack_networking_router_interface_v2" "k8s"

{ router_id = openstack_networking_router_v2.k8s.id subnet_id = openstack_networking_subnet_v2.k8s-subnetwork.id }
resource "openstack_compute_keypair_v2" "keypair"

{ name = "default" }
data "openstack_compute_flavor_v2" "k8s_master"

{ name = "Standard-2-4-40" }
data "openstack_compute_flavor_v2" "k8s_worker"

{ name = "Basic-1-2-20" }
```

Ресурсы провайдера MCS для создания кластера:
*mcs_kubernetes_clustertemplates* – шаблонов/версий кластеров Kubernetes. Нужно указать версию кластера, которая будет создана. Посмотреть список доступных версий можно:

В визарде при создании кластера через личный кабинет
На странице «Политика поддержки версий Kubernetes» https://mcs.mail.ru/docs/ru/base/k8s/k8s-concepts/k8s-architecture/k8s-version-support
Используя данные из mcs_kubernetes_clustertemplates. Подробнее на официальной странице (https://registry.terraform.io/providers/MailRuCloudSolutions/mcs/latest/docs/data-sources/mcs_kubernetes_clustertemplate).
*mcs_kubernetes_cluster* – кластер Kubernetes. В этом ресурсе мы описываем кластер и используем ранее описанные ресурсы.

depends_on – terraform будет ждать завершения создания openstack_networking_router_interface_v2, прежде чем начать создавать кластер.
name – имя кластера.
cluster_template_id – шаблон/версия кластера указанная ранее в mcs_kubernetes_clustertemplate.cluster_template
master_count - количество мастер нод. Поддерживаются нечетные числа 1, 3, 5, 7.
master_flavor – флейвор мастер нод.
availability_zone - зона доступности.
ingress_controller - аддон балансировщика ingress controller, который устанавливается при создании кластера. Аддоны описываются в блоке labels.
keypair - ключевая пара для доступа на ноды кластера. Может быть пропущена, если не требуется доступ на ноды.
network_id - сеть кластера Kubernetes.
subnet_id - подсеть для кластера.
floating_ip_enabled - назначение публичного IP для API сервера Kubernetes. Поддерживает значение true | false.
*mcs_kubernetes_node_group* – нод-группа кластера, в которой будет располагаться рабочая нагрузка.

depends_on - создание нод-группы начнется после создания кластера.
cluster_id - идентификатор кластера, в котором создается нод-группа.
name - имя нод-группы
node_count - начальное количество нод в группе.
autoscaling_enabled - включаем автомасштабирование кластера. Поддерживает значение true | false.
max_nodes - максимальное количество нод, до которого кластер автоматически масштабируется при повышении нагрузки. Максимальное значение 100.
min_nodes - минимальное количество нод в нод-группе.
flavor_id - флейвор нод в нод-группе.
``` bash
data "mcs_kubernetes_clustertemplate" "cluster_template"

{ version = "1.22.6" }
resource "mcs_kubernetes_cluster" "k8s-cluster" {
depends_on = [
openstack_networking_router_interface_v2.k8s,
]

name = "k8s-cluster"
cluster_template_id = data.mcs_kubernetes_clustertemplate.cluster_template.id
master_flavor = data.openstack_compute_flavor_v2.k8s_master.id
master_count = 1
availability_zone = "MS1"
labels =

{ ingress_controller = "nginx" }
keypair = openstack_compute_keypair_v2.keypair.id
network_id = openstack_networking_network_v2.k8s.id
subnet_id = openstack_networking_subnet_v2.k8s-subnetwork.id
floating_ip_enabled = true
}

resource "mcs_kubernetes_node_group" "default_ng"

{ depends_on = [ mcs_kubernetes_cluster.k8s-cluster, ] cluster_id = mcs_kubernetes_cluster.k8s-cluster.id name = "default" node_count = 1 autoscaling_enabled = true max_nodes = 2 min_nodes = 1 flavor_id = data.openstack_compute_flavor_v2.k8s_worker.id }
```

Добавьте обе части примера в файл kubernetes.tf и выполните следующие команды.

``` bash
terraform init
terraform apply
```