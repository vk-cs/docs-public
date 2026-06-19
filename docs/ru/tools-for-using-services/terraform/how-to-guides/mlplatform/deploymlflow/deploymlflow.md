# {heading(Создание инстанса MLflow Deploy)[id=terraform-deploymlflow]}

В статье приведены примеры создания deploy-версии инстанса MLflow при помощи Terraform.

При создании инстанса используются:

- ресурс [vkcs_mlplatform_mlflow_deploy](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_mlflow_deploy.md);
- ресурс [vkcs_mlplatform_mlflow](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_mlflow.md);
- ресурс [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md);
- источник данных [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md);
- источник данных [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md).

Полное описание параметров — в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Перед созданием инстанса)[id=terraform-deploymlflow-prepare]}

1. Проверьте {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квоты]}. Убедитесь, что в выбранном {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=регионе]} достаточно ресурсов для создания CDN-ресурса. Для разных регионов могут быть настроены разные квоты.

   При необходимости {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=увеличьте]} квоты.

1. {linkto(../../../quick-start#terraform-quick-start)[text=Установите Terraform и настройте провайдер]}, если этого еще не сделано.

1. Убедитесь, что в файле `vkcs_provider.tf` указана версия провайдера 0.6.0 или выше. Если версия провайдера ниже, {linkto(../../../quick-start#terraform-quick-start-update)[text=обновите провайдер]}.

## {heading({counter(tf-deploymlflow)}. Создайте файл с описанием инстанса MLflow Deploy)[id=terraform-deploymlflow-instance-file]}

В примере ниже инстанс создается в следующей конфигурации:

- регион по умолчанию, зона доступности `GZ1`;
- тип диска `SSD`, размер — 50 ГБ;
- тип диска данных `SSD`, размер — 60 ГБ.
Создайте файл конфигурации Terraform `main.tf` с содержимым:

```hcl
resource "vkcs_mlplatform_mlflow_deploy" "deploy" {
  name               = "tf-example"
  flavor_id          = data.vkcs_compute_flavor.basic.id
  mlflow_instance_id = vkcs_mlplatform_mlflow.mlflow.id
  availability_zone  = "GZ1"
  boot_volume = {
    size        = 50
    volume_type = "ceph-ssd"
  }

  data_volumes = [
    {
      size        = 60
      volume_type = "ceph-ssd"
    },
  ]
  networks = [
    {
      network_id = vkcs_networking_network.app.id
    },
  ]
}
```

Здесь:

- `flavor_id` — идентификатор типа ВМ. Идентификатор можно прописать в манифесте или получить из источника данных.

  {cut(Примеры)}

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: идентификатор берется из источника данных `vkcs_compute_flavor`, который будет сформирован далее.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: указывается идентификатор, полученный через {linkto(../../../../cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI]}.

  {/cut}

- `mlflow_instance_id` — идентификатор инстанса MLflow для совместной работы. Можно создать новый инстанс или использовать существующий.

  {cut(Примеры)}

  - `mlflow_instance_id = vkcs_mlplatform_mlflow.mlflow.id`: будет создан новый инстанс MLflow, идентификатор инстанса будет получен после создания ресурса `vkcs_mlplatform_mlflow`. Ресурс будет сформирован далее.
  - `mlflow_instance_id = "a57e9e91-yyyy-yyyy-yyyy-fedc7ac78c33"`: указывается идентификатор существующего инстанса. Идентификатор доступен на странице инстанса MLflow в [личном кабинете](https://cloud.vk.com/app) {var(cloud)}.

  {/cut}

- `network_id` — идентификатор сети, в которой будет размещен инстанс. Инстанс может быть размещен в существующей сети или в новой. Идентификатор можно указать в манифесте, получить из источника данных или ресурса.

  {cut(Примеры)}

  - `network_id = vkcs_networking_network.default.id`: инстанс будет размещен в новой сети, которая будет создана ресурсом `vkcs_networking_network`. Ресурс будет сформирован далее.
  - `network_id = data.vkcs_networking_network.default.id`: инстанс будет размещен в существующей сети, ее идентификатор берется из источника данных `vkcs_networking_network`. Источник будет сформирован далее.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: инстанс будет размещен в существующей сети. Указывается ее идентификатор, полученный из {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=списка сетей]} в личном кабинете {var(cloud)} или через Openstack CLI.

  {/cut}

## {heading({counter(tf-deploymlflow)}. (Опционально) Создайте файл с описанием источника данных для типа ВМ)[id=terraform-deploymlflow-vm-file]}

Создайте файл конфигурации Terraform `flavor.tf` c описанием нужного типа ВМ:

```hcl
data "vkcs_compute_flavor" "basic" {
  name = "STD2-4-4"
}
```

Указанный в файле тип ВМ будет использоваться для создания инстанса MLflow Deploy в вашем проекте Terraform.

## {heading({counter(tf-deploymlflow)}. (Опционально) Создайте файл с описанием связанного инстанса MLflow)[id=terraform-deploymlflow-mlflow-file]}

Создайте файл конфигурации Terraform `mlflow_instance.tf` c {linkto(../mlflow#terraform-mlflow)[text=описанием инстанса MLflow]}.

## {heading({counter(tf-deploymlflow)}. (Опционально) Создайте файл с описанием сетевой инфраструктуры для инстанса)[id=terraform-deploymlflow-net-file]}

Создайте файл конфигурации Terraform `network.tf` с описанием сетевой инфраструктуры для инстанса:

{tabs}

{tab(Описание существующей сети)}

Пример описания источника данных для существующей в проекте сети:

```hcl
data "vkcs_networking_network" "default" {
  name = "default"
  sdn = "neutron"
}
```
{/tab}

{tab(Создание новой сети)}

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

{/tab}

{/tabs}

## {heading({counter(tf-deploymlflow)}. Создайте необходимые ресурсы с помощью Terraform)[id=terraform-deploymlflow-create]}

1. Поместите файлы конфигурации Terraform в одну директорию:
  
   - `vkcs_provider.tf`;
   - `main.tf`;
   - `flavor.tf` (если создавался);
   - `mlflow_instance.tf`(если создавался);
   - `jh_instance.tf`(если создавался);
   - `network.tf`(если создавался).

1. Перейдите в эту директорию.
1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

   ```console
   terraform validate && terraform plan
   ```

1. Примените изменения:

   ```console
   terraform apply
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.

## {heading({counter(tf-deploymlflow)}. Проверьте применение конфигурации)[id=terraform-deploymlflow-check]}

Убедитесь, что инстанс MLflow Deploy был успешно создан:

1. [Перейдите](https://cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Перейдите в раздел **ML Platform** → **Инстансы**. Убедитесь, что инстанс MLflow Deploy создан и активен.

## {heading(Удалите неиспользуемые ресурсы)[id=terraform-deploymlflow-delete]}

Если созданные с помощью Terraform ресурсы больше не нужны, удалите их:

1. Перейдите в директорию с файлами конфигурации Terraform.
1. Выполните команду:

   ```console
   terraform destroy
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.
