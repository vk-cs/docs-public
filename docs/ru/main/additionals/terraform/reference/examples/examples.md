## Создание ресурсов группы сервисов «Виртуальные машины»

С помощью этого манифеста будут созданы следующие объекты группы сервисов **Виртуальные машины**:

- Виртуальная машина;
- Тип виртуальной машины;
- Образ виртуальной машины;
- Ключевая пара.

Листинг манифеста для создания ресурсов группы сервисов **Виртуальные машины**:

```hcl
terraform {
 required_providers {
 vkcs = {
 source = "vk-cs/vkcs"
 version = "~> 0.1.12"
 }
 }
}
```

### Создание диска (volume)

```hcl
resource "vkcs_blockstorage_volume" "vol" {
 name = "instance1_vol"
 size = 10
 image_id = "4d8bc6c0-5623-43bf-9179-1bebcb943b47"
 volume_type = "ceph"
 availability_zone = "AZ1"
}
resource "vkcs_compute_instance" "instance1" {
 # Имя инстанса внутри Платформы
 name = "terraform-test"
 # ID флейвора для инстанса. Можно узнать с помощью команды: openstack flavor list
 flavor_id = "dc84b839-a97b-4074-83d6-233531ffd8b3"
 # Имя ключевой пары для инстанса. Можно узнать с помощью команды: openstack keypair 
list
 key_pair = "some_keypair"
 # SG для инстанса
 security_groups = ["default"]
 block_device {
 uuid = "${vkcs_blockstorage_volume.vol.id}"
 source_type = "volume"
 boot_index = 0
  destination_type = "volume"
 delete_on_termination = true
 }
 # Сеть для инстанса.
 network {
 name = "net-project001"
 }
}
```

## Создание блочных устройств без ВМ

С помощью этого манифеста будут созданы следующие объекты:

- Блочное хранилище;
- Снимок блочного хранилища.

Листинг манифеста создания блочных устройств без ВМ:

```hcl
terraform {
 required_providers {
  vkcs = {
   source = "vk-cs/vkcs"
   version = "~> 0.1.12"
  }
 }
}
resource "vkcs_blockstorage_volume" "vol" {
 name = "vol"
 size = 10
 volume_type = "ceph"
 availability_zone = "AZ1"
}
resource "vkcs_blockstorage_snapshot" "vol-snapshot" {
 name = "vol_snapshot"
 volume_id = "${vkcs_blockstorage_volume.vol.id}"
}
```

## Создание сетевых устройств без ВМ

С помощью этого манифеста будут созданы следующие объекты сетевой подсистемы:

- Виртуальная сеть;
- Подсеть;
- Виртуальный роутер;
- Группа безопасности.

Листинг манифеста создания сетевых устройств без ВМ:

```hcl
terraform {
 required_providers {
  vkcs = {
   source = "vk-cs/vkcs"
   version = "~> 0.1.12"
  }
 }
}
resource "vkcs_networking_network" "network_test" {
 name = "test_network"
 admin_state_up = "true"
 port_security_enabled = false
}
resource "vkcs_networking_subnet" "subnet_test" {
 name = "test_subnet"
 network_id = "${vkcs_networking_network.network_test.id}"
 cidr = "192.168.199.0/24"
}
resource "vkcs_networking_router" "router_test" {
 name = "router_test"
 admin_state_up = true
 external_network_id = "76dfd377-b303-4b69-8cab-0d2f640130c5"
}
resource "vkcs_networking_router_interface" "router_interface_test" {
 router_id = "${vkcs_networking_router.router_test.id}"
 subnet_id = "${vkcs_networking_subnet.subnet_test.id}"
}
resource "vkcs_networking_secgroup" "secgroup_test" {
 name = "secgroup_test"
 description = "My security group"
}
resource "vkcs_networking_secgroup_rule" "secgroup_rule_test" {
 direction = "ingress"
 ethertype = "IPv4"
 protocol = "tcp"
 port_range_min = 22
 port_range_max = 22
 remote_ip_prefix = "0.0.0.0/0"
 security_group_id = "${vkcs_networking_secgroup.secgroup_test.id}"
}
```

## Создание ресурсов группы сервисов «Балансировщики нагрузки»

С помощью этого манифеста будут созданы следующие объекты группы сервисов «Балансировщики нагрузки»:

- HTTP балансировщики нагрузки.
- TCP балансировщики нагрузки.

Дополнительно будут созданы:

- Тестовая сеть, подсеть, группа безопасности.
- Инстанс ВМ.
- Блочное хранилище.

```hcl
terraform {
 required_providers {
  vkcs = {
   source = "vk-cs/vkcs"
   version = "~> 0.1.12"
  }
 }
}
resource "vkcs_networking_network" "network_test" {
 name = "network_test"
 admin_state_up = "true"
 port_security_enabled = "true"
}
resource "vkcs_networking_subnet" "subnet_test" {
 name = "test_subnet"
 network_id = "${vkcs_networking_network.network_test.id}"
 cidr = "192.168.199.0/24"
}
resource "vkcs_networking_router" "router_test" {
 name = "router_test"
 admin_state_up = true
 external_network_id = "76dfd377-b303-4b69-8cab-0d2f640130c5"
}
resource "vkcs_networking_router_interface" "router_interface_test" {
 router_id = "${vkcs_networking_router.router_test.id}"
 subnet_id = "${vkcs_networking_subnet.subnet_test.id}"
}
resource "vkcs_networking_secgroup" "secgroup_test" {
 name = "secgroup_test"
 description = "My security group"
}
resource "vkcs_networking_secgroup_rule" "secgroup_rule_test_ssh" {
 direction = "ingress"
 ethertype = "IPv4"
 protocol = "tcp"
 port_range_min = 22
 port_range_max = 22
 remote_ip_prefix = "0.0.0.0/0"
 security_group_id = "${vkcs_networking_secgroup.secgroup_test.id}"
}
resource "vkcs_networking_secgroup_rule" "secgroup_rule_test_http" {
 direction = "ingress"
 ethertype = "IPv4"
 protocol = "tcp"
 port_range_min = 8080
 port_range_max = 8080
 remote_ip_prefix = "0.0.0.0/0"
 security_group_id = "${vkcs_networking_secgroup.secgroup_test.id}"
}
resource "vkcs_networking_secgroup_rule" "secgroup_rule_test_tcp" {
 direction = "ingress"
 ethertype = "IPv4"
 protocol = "tcp"
 port_range_min = 9090
 port_range_max = 9090
 remote_ip_prefix = "0.0.0.0/0"
 security_group_id = "${vkcs_networking_secgroup.secgroup_test.id}"
}
resource "vkcs_lb_loadbalancer" "loadbalancer_test_http" {
 name = "loadbalancer_test_http"
 vip_subnet_id = "${vkcs_networking_subnet.subnet_test.id}"
 security_group_ids = [ "${vkcs_networking_secgroup.secgroup_test.id}" ]
}
resource "vkcs_lb_loadbalancer" "loadbalancer_test_tcp" {
 name = "loadbalancer_test_tcp"
 vip_subnet_id = "${vkcs_networking_subnet.subnet_test.id}"
 security_group_ids = [ "${vkcs_networking_secgroup.secgroup_test.id}" ]
}
resource "vkcs_lb_listener" "listener_test_http" {
 name = "listener_test_http"
 protocol = "HTTP"
 protocol_port = 8080
 loadbalancer_id = "${vkcs_lb_loadbalancer.loadbalancer_test_http.id}"
}
resource "vkcs_lb_listener" "listener_test_tcp" {
 name = "listener_test_tcp"
 protocol = "TCP"
 protocol_port = 9090
 loadbalancer_id = "${vkcs_lb_loadbalancer.loadbalancer_test_tcp.id}"
}
resource "vkcs_lb_pool" "pool_test_http" {
 name = "pool_test_http"
 protocol = "HTTP"
 lb_method = "ROUND_ROBIN"
 loadbalancer_id = "${vkcs_lb_loadbalancer.loadbalancer_test_http.id}"
}
resource "vkcs_lb_pool" "pool_test_tcp" {
 name = "pool_test_tcp"
 protocol = "TCP"
 lb_method = "ROUND_ROBIN"
 loadbalancer_id = "${vkcs_lb_loadbalancer.loadbalancer_test_tcp.id}"
}
resource "vkcs_lb_l7policy" "l7policy_test_http" {
 name = "test"
 action = "REDIRECT_TO_URL"
 description = "test description"
 position = 1
 listener_id = "${vkcs_lb_listener.listener_test_http.id}"
 redirect_url = "http://www.example.com"
}
resource "vkcs_lb_l7rule" "l7rule_test" {
 l7policy_id = "${vkcs_lb_l7policy.l7policy_test_http.id}"
 compare_type = "EQUAL_TO"
 type = "PATH"
 value = "/api"
}
resource "vkcs_blockstorage_volume" "vol1_test" {
 name = "instance1_vol"
 size = 10
 image_id = "4d8bc6c0-5623-43bf-9179-1bebcb943b47"
 volume_type = "ceph"
 availability_zone = "AZ1"
}
resource "vkcs_blockstorage_volume" "vol2_test" {
 name = "instance1_vol"
 size = 10
 image_id = "4d8bc6c0-5623-43bf-9179-1bebcb943b47"
 volume_type = "ceph"
 availability_zone = "AZ1"
}
resource "vkcs_compute_instance" "instance1_test" {
 name = "terraform-instance1-test"
 flavor_id = "fc83b839-a97b-4074-83d6-211531ffd8b3"
 key_pair = "CentOS-Basic-1-1-10GB-5CDfA91u"
 security_groups = ["secgroup_test"]
 block_device {
 uuid = "${vkcs_blockstorage_volume.vol1_test.id}"
 source_type = "volume"
 boot_index = 0
 destination_type = "volume"
 delete_on_termination = true
 }
 network {
 name = "network_test"
 }
 depends_on = [
 vkcs_networking_network.network_test,
 vkcs_networking_subnet.subnet_test,
 vkcs_networking_secgroup.secgroup_test
 ]
}
resource "vkcs_compute_instance" "instance2_test" {
 name = "terraform-instance2-test"
 flavor_id = "fc83b839-a97b-4074-83d6-211531ffd8b3"
 key_pair = "CentOS-Basic-1-1-10GB-5CDfA91u"
 security_groups = ["secgroup_test"]
 block_device {
 uuid = "${vkcs_blockstorage_volume.vol2_test.id}"
 source_type = "volume"
 boot_index = 0
 destination_type = "volume"
 delete_on_termination = true
 }
 network {
 name = "network_test"
 }
 depends_on = [
 vkcs_networking_network.network_test,
 vkcs_networking_subnet.subnet_test,
 vkcs_networking_secgroup.secgroup_test
 ]
}
resource "vkcs_lb_members" "members_http_test" {
 pool_id = "${vkcs_lb_pool.pool_test_http.id}"
 member {
 address = "${vkcs_compute_instance.instance1_test.access_ip_v4}"
 protocol_port = 8080
 weight = 2
 }
  member {
 address = "${vkcs_compute_instance.instance2_test.access_ip_v4}"
 protocol_port = 8080
 weight = 10
 }
}
resource "vkcs_lb_members" "members_tcp_test" {
 pool_id = "${vkcs_lb_pool.pool_test_tcp.id}"
 member {
 address = "${vkcs_compute_instance.instance1_test.access_ip_v4}"
 protocol_port = 9090
 weight = 10
 }
 member {
 address = "${vkcs_compute_instance.instance2_test.access_ip_v4}"
 protocol_port = 9090
 weight = 2
 }
}
```

## Создание ресурсов группы сервисов «Кластеры Kubernetes»

С помощью этого манифеста будут созданы следующие объекты группы сервисов **Кластеры Kubernetes**:

- Кластер Kubernetes.
- Группа кластеров Kubernetes.

Листинг манифеста создания ресурсов группы сервисов **Кластеры Kubernetes**:

```hcl
terraform {
 required_providers {
 vkcs = {
 source = "vk-cs/vkcs"
 version = "0.1.4"
 }
 }
}
data "vkcs_kubernetes_clustertemplate" "cluster_template" {
 name = "Kubernetes-almalinux-v1.22.6-mcs.external"
}
data "vkcs_networking_subnet" "subnet_project" {
 name = "subnet-project001"
}
data "vkcs_networking_network" "network_project" {
 name = "net-project001"
}
data "vkcs_compute_flavor" "k8s_flavor" {
 name = "Standard-2-4"
}
```

### Создание кластера k8s

```hcl
resource "vkcs_kubernetes_cluster" "cluster_test" {
 name = "cluster-test"
 cluster_template_id = data.vkcs_kubernetes_clustertemplate.cluster_template.id
 subnet_id = data.vkcs_networking_subnet.subnet_project.id
 network_id = data.vkcs_networking_network.network_project.id
 master_flavor = data.vkcs_compute_flavor.k8s_flavor.id
 master_count = 1
 # Имя ключевой пары для инстанса кластера. Можно узнать с помощью команды: openstack 
keypair list
 keypair = "my_keys"
 availability_zone = "AZ1"
 floating_ip_enabled = true
}
```

### Создание группы кластеров k8s

```hcl
resource "vkcs_kubernetes_node_group" "nodegroup_k8s" {
 name = "nodegroup-k8s"
 cluster_id = vkcs_kubernetes_cluster.cluster_test.id
 node_count = 1
 availability_zones = ["AZ1"]
 volume_type = "ceph"
 volume_size = 30
 max_node_unavailable = 1
}
```

## Создание ресурсов группы сервисов «Управляемые БД»

С помощью этого манифеста будут созданы следующие объекты группы сервисов **Управляемые БД**:

- Экземпляр БД.
- Кластер БД.

<warn>

Для корректной работы нужен провайдер VK CS версии 0.1.4 или выше.

</warn>

Листинг манифеста создания ресурсов группы сервисов **Управляемые БД**:

```hcl
terraform {
 required_providers {
 vkcs = {
 source = "vk-cs/vkcs"
 version = "~> 0.1.12"
 }
 }
}
data "vkcs_networking_subnet" "subnet_project" {
 name = "subnet-project001"
}
data "vkcs_networking_network" "network_project" {
 name = "net-project001"
}
data "vkcs_compute_flavor" "db_flavor" {
 name = "Basic-1-2"
}
resource "vkcs_db_cluster" "db_cluster" {
 name = "db-cluster"
# Версии можно взять из UI портала Самообслуживания
 datastore {
 type = "postgresql"
 version = "12"
 }
 cluster_size = 3
 flavor_id = data.vkcs_compute_flavor.db_flavor.id
 volume_size = 10
 volume_type = "ceph"
 network {
 uuid = data.vkcs_networking_network.network_project.id
 }
}
resource "vkcs_db_instance" "db_instance" {
 name = "db-instance"
# Версии можно взять из UI портала самообслуживания
 datastore {
 type = "mysql"
 version = "5.7"
 }
 flavor_id = data.vkcs_compute_flavor.db_flavor.id
 size = 10
 volume_type = "ceph"
 network {
 uuid = data.vkcs_networking_network.network_project.id
 }
}
```
