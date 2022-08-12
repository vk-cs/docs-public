На данный момент VK Cloud поддерживает сразу 2 Terraform провайдера:

- OpenStack для управления IaaS-сервисами;
- Собственный VK Cloud Terraform Provider для управления Kubernetes.

Кластеры Kubernetes, которые ранее управлялись с помощью OpenStack Terraform Provider можно перевести под управление VK Cloud Terraform Provider для того, чтобы получить возможность осуществлять с помощью Terraform настройку авто-масштабирования кластера, работу с Node Group, осуществлять обновление версии и тд.

## Инструкция по переходу

Важно, что VK Cloud Terraform Provider работает с базовыми IaaS-ресурсами, управляемыми с помощью OpenStack Terraform Provider. Следовательно, необходимо активировать оба провайдера для корректной работы с кластерами Kubernetes.

Рассмотрим следующий кластер, управляемый OpenStack Provider:

```bash
resource "vkcs_containerinfra_cluster" "cluster_1" {
name                 = "clusterone"
cluster_template_id = "cluster_template_id"
master_count         = 1
keypair              = "keypair_name"
master_flavor        = "master_flavor_id"
labels = {
  fixed_network = "fixed_network_id"
  fixed_subnet = "fixed_subnet_id"
}
}
```

1. Создайте аналогичную конфигурацию для VK Cloud провайдера и заполним только необходимые поля:

```bash
**#описание кластера**
resource "vkcs_kubernetes_cluster" "cluster_2" {
name                 = "clusterone"
cluster_template_id = "cluster_template_id"
keypair              = "keypair_name"
network_id = "fixed_network_id"
subnet_id = "fixed_subnet_id"
}

**#описание node group кластера. У 1 кластера может быть от 0 до 100 node group**
resource "vkcs_kubernetes_node_group" "ng_2" {
  cluster_id = vkcs_kubernetes_cluster.cluster_2.id
  node_count = 1
}
```

2. Если до этого в terraform state не было ресурсов VK Cloud провайдера, то выполните следующую команду:

```bash
terraform init
```

3. Выполните команды, где \`cluster_uuid\` и \`ng_uuid\` — уникальные идентификаторы кластера и node group, которые можно получить в панели VK Cloud:

```bash
terraform import vkcs_kubernetes_cluster.cluster_2 cluster_uuid
```
```bash
terraform import vkcs_kubernetes_node_group.ng_2 ng_uuid
```

4. Для прекращения использования VK Cloud провайдера для управления кластером Kubernetes обязательно выполните команду:

```bash
terraform state rm vkcs_containerinfra_cluster.cluster_1
````

5. Удалите из кода упоминание кластера, управляемого с помощью OpenStack Terraform Provider:

```bash
resource "vkcs_containerinfra_cluster" "cluster_1"
```

Теперь управление кластером осуществляется через VK Cloud Terraform Provider.
