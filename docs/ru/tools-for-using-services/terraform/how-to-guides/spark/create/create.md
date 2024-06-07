В статье приведен пример создания кластера Cloud Spark при помощи Terraform.

При создании кластера используются:

- ресурс [vkcs_mlplatform_spark_k8s](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_spark_k8s.md);
- ресурс [vkcs_mlplatform_k8s_registry](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_k8s_registry.md);
- ресурс [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md);
- источник данных [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md);
- источник данных [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md).

## Перед созданием инстанса

1. Ознакомьтесь с доступными ресурсами и [квотами](/ru/tools-for-using-services/account/concepts/quotasandlimits) для [региона](/ru/tools-for-using-services/account/concepts/regions), в котором планируется создать инстанс. Для разных регионов могут быть настроены разные квоты.

   Если вы хотите увеличить квоты, обратитесь в [техническую поддержку](/ru/contacts).

1. [Установите Terraform и настройте провайдер](../../../quick-start), если этого еще не сделано.

1. Для работы потребуется провайдер версии 0.7.0 или выше. Убедитесь, что версия провайдера в файле `vkcs_provider.tf` не ниже. Если версия провайдера ниже, [обновите провайдер](../../../quick-start#obnovlenie_terraform).

## 1. Создайте файл с описанием кластера

В примере ниже кластер создается в следующей конфигурации:

- регион по умолчанию, зона доступности `GZ1`;
- минамальное количеств worker-узлов — 2, максимальное количество worker-узлов — 100;
- режим работы кластера — `DEV`;
- переход кластера в спящий режим через 120 минут неактивности;
- удаление кластера через 1440 минут неактивности.

Создайте файл конфигурации Terraform `main.tf` с содержимым:

```hcl
locals {
  spark_configuration = {
    "spark.eventLog.dir"     = "s3a://spark-bucket"
    "spark.eventLog.enabled" = "true"
  }
  spark_environment_variables = {
    "ENV_VAR_1" : "env_var_1_value"
    "ENV_VAR_2" : "env_var_2_value"
  }
}

resource "vkcs_mlplatform_spark_k8s" "spark_k8s" {
  name              = "tf-example"
  availability_zone = "GZ1"
  network_id        = vkcs_networking_network.app.id
  subnet_id         = vkcs_networking_subnet.app.id

  node_groups = [
    {
      node_count          = 2
      flavor_id           = data.vkcs_compute_flavor.basic.id
      autoscaling_enabled = true
      min_nodes           = 2
      max_nodes           = 100
    }
  ]
  cluster_mode = "DEV"
  registry_id  = vkcs_mlplatform_k8s_registry.k8s_registry.id
  ip_pool      = data.vkcs_networking_network.extnet.id

  suspend_after_inactive_min = 120
  delete_after_inactive_min  = 1440

  spark_configuration   = yamlencode(local.spark_configuration)
  environment_variables = yamlencode(local.spark_environment_variables)
}
```

Здесь:

- `network_id` — идентификатор сети, в которой будет размещен кластер. Кластер может быть размещен в существующей сети или в новой. Идентификатор можно указать в манифесте, получить из источника данных или ресурса.

  <details>
    <summary>Примеры</summary>

  - `network_id = vkcs_networking_network.default.id`: кластер будет размещен в новой сети, которая будет создана ресурсом `vkcs_networking_network`. Ресурс будет сформирован далее.
  - `network_id = data.vkcs_networking_network.default.id`: кластер будет размещен в существующей сети, ее идентификатор берется из источника данных `vkcs_networking_network`. Источник будет сформирован далее.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: кластер будет размещен в существующей сети. Указывается ее идентификатор, полученный из [списка сетей](/ru/networks/vnet/service-management/net#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) в личном кабинете VK Cloud или через Openstack CLI.

  </details>

- `flavor_id` — идентификатор типа ВМ. Идентификатор можно прописать в манифесте или получить из источника данных.

  <details>
    <summary>Примеры</summary>

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: идентификатор берется из источника данных `vkcs_compute_flavor`, который будет сформирован далее.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: указывается идентификатор, полученный через [OpenStack CLI](/ru/tools-for-using-services/cli/openstack-cli).

  </details>

- `registry_id` — идентификатор реестра Docker, образы из которого будут использоваться при запуске заданий Spark. Можно создать новый реестр или использовать существующий.

  <details>
    <summary>Примеры</summary>

  - `registry_id = vkcs_mlplatform_k8s_registry.k8s_registry.id`: будет создан новый реестр Docker и размещен на выделенной виртуальной машине K8S Docker Registry, которая не входит в состав кластера и тарифицируется отдельно. Идентификатор будет получен после создания ресурса `vkcs_mlplatform_k8s_registry`. Ресурс будет сформирован далее.
  - `registry_id = "a57e9e91-yyyy-yyyy-yyyy-fedc7ac78c33"`: указывается идентификатор существующего реестра K8S Docker Registry. Чтобы узнать идентификатор инстанса K8S Docker Registry:
  
    1. [Перейдите](https://cloud.vk.com/app) в личный кабинет VK Cloud.
    1. Выберите проект, где нужно создать кластер.
    1. Перейдите в раздел **ML Platform** → **Spark в k8s**.
    1. Перейдите на вкладку **Инстансы**.
    1. Нажмите на название нужного инстанса.
  
  </details>

- `ip_pool` — идентификатор внешней сети для пула IP-адресов кластера.

  <details>
    <summary>Примеры</summary>

  - `ip_pool = data.vkcs_networking_network.extnet.id`: идентификатор берется из источника данных `vkcs_networking_network`, который будет указан в описании сетевой инфраструктуры кластера.
  - `ip_pool = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: указывается идентификатор внешней сети, полученный из [списка сетей](/ru/networks/vnet/service-management/net#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) в личном кабинете VK Cloud или через Openstack CLI.

  </details>

- `spark_configuration` — перечень свойств (properties), отвечающих за [конфигурацию Spark](https://github.com/kubeflow/spark-operator/blob/master/docs/user-guide.md#specifying-spark-configuration).

- `environment_variables` — перечень [переменных среды окружения для Spark](/ru/ml/spark-to-k8s/instructions/create).

## 2. Создайте файл с описанием инстанса K8S Docker Registry

Создайте файл конфигурации Terraform `registry.tf` c описанием инстанса K8S Docker Registry:

```hcl
resource "vkcs_mlplatform_k8s_registry" "k8s_registry" {
  name              = "tf-example"
  admin_name        = "admin"
  admin_password    = "Password12!Password"
  flavor_id         = data.vkcs_compute_flavor.basic.id
  availability_zone = "GZ1"
  boot_volume = {
    volume_type = "ceph-ssd"
  }
  networks = [
    {
      network_id = vkcs_networking_network.app.id
      ip_pool = data.vkcs_networking_network.extnet.id
    },
  ]
}
```

Здесь:

- `flavor_id` — идентификатор типа ВМ. Идентификатор можно прописать в манифесте или получить из источника данных.

  <details>
    <summary>Примеры</summary>

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: идентификатор берется из источника данных `vkcs_compute_flavor`, который будет сформирован далее.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: указывается идентификатор, полученный через [OpenStack CLI](/ru/tools-for-using-services/cli/openstack-cli).

  </details>

- `network_id` — идентификатор сети, в которой будет размещен инстанс. Инстанс может быть размещен в существующей сети или в новой. Идентификатор можно указать в манифесте, получить из источника данных или ресурса.

  <details>
    <summary>Примеры</summary>

  - `network_id = vkcs_networking_network.default.id`: инстанс будет размещен в новой сети, которая будет создана ресурсом `vkcs_networking_network`. Ресурс будет сформирован далее.
  - `network_id = data.vkcs_networking_network.default.id`: инстанс будет размещен в существующей сети, ее идентификатор берется из источника данных `vkcs_networking_network`. Источник будет сформирован далее.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: инстанс будет размещен в существующей сети. Указывается ее идентификатор, полученный из [списка сетей](/ru/networks/vnet/service-management/net#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) в личном кабинете VK Cloud или через Openstack CLI.

  </details>

- `ip_pool` — идентификатор внешней сети для пула IP-адресов кластера.

  <details>
    <summary>Примеры</summary>

  - `ip_pool = data.vkcs_networking_network.extnet.id`: идентификатор берется из источника данных `vkcs_networking_network`, который будет указан в описании сетевой инфраструктуры кластера.
  - `ip_pool = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: указывается идентификатор внешней сети, полученный из [списка сетей](/ru/networks/vnet/service-management/net#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) в личном кабинете VK Cloud или через Openstack CLI.

  </details>

## 3. (Опционально) Создайте файл с описанием источника данных для типа ВМ

Создайте файл конфигурации Terraform `flavor.tf` c описанием нужного типа ВМ:

```hcl
data "vkcs_compute_flavor" "basic" {
  name = "STD2-4-4"
}
```

Указанный в файле тип ВМ будет использоваться для создания инстансов в вашем проекте Terraform.

## 4. (Опционально) Создайте файл с описанием сетевой инфраструктуры для кластера

Создайте файл конфигурации Terraform `network.tf` с описанием сетевой инфраструктуры для кластера:

<tabs>
<tablist>
<tab>Описание существующей сети</tab>
<tab>Создание новой сети</tab>
</tablist>
<tabpanel>

Пример описания источника данных для существующей в проекте сети:

```hcl
data "vkcs_networking_network" "default" {
  name = "default"
  sdn = "neutron"
}
```
</tabpanel>
<tabpanel>

```hcl
# Create networks
resource "vkcs_networking_network" "app" {
  name        = "app-tf-example"
  description = "Application network"
  sdn = "neutron"
}

resource "vkcs_networking_subnet" "app" {
  name       = "app-tf-example"
  network_id = vkcs_networking_network.app.id
  cidr       = "192.168.199.0/24"
}

# Get external network with Inernet access
data "vkcs_networking_network" "extnet" {
  name = "ext-net"
}

# Create a router to connect netwoks
resource "vkcs_networking_router" "router" {
  name = "router-tf-example"
  # Connect router to Internet
  external_network_id = data.vkcs_networking_network.extnet.id
}

# Connect networks to the router
resource "vkcs_networking_router_interface" "app" {
  router_id = vkcs_networking_router.router.id
  subnet_id = vkcs_networking_subnet.app.id
}
```

</tabpanel>
</tabs>

## 5. Создайте необходимые ресурсы с помощью Terraform

1. Поместите файлы конфигурации Terraform в одну директорию:
  
   - `vkcs_provider.tf`;
   - `main.tf`;
   - `registry.tf`;
   - `flavor.tf` (если создавался);
   - `network.tf`(если создавался).

1. Перейдите в эту директорию.
1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

   ```bash
   terraform validate && terraform plan
   ```

1. Примените изменения:

   ```bash
   terraform apply
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.

## 6. Проверьте применение конфигурации

Убедитесь, что кластер Spark был успешно создан:

1. [Перейдите](https://cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **ML Platform** → **Инстансы**. Убедитесь, что кластер Spark создан и активен.

## Удалите неиспользуемые ресурсы

Если созданные с помощью Terraform ресурсы вам больше не нужны, удалите их:

1. Перейдите в директорию с файлами конфигурации Terraform.
1. Выполните команду:

   ```bash
   terraform destroy
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.
