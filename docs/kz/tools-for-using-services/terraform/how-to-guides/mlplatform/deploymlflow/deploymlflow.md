{include(/kz/_includes/_translated_by_ai.md)}

Мақалада Terraform көмегімен MLflow инстансының deploy-нұсқасын жасау мысалдары келтірілген.

Инстансты жасау кезінде мыналар пайдаланылады:

- [vkcs_mlplatform_mlflow_deploy](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_mlflow_deploy.md) ресурсы;
- [vkcs_mlplatform_mlflow](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_mlflow.md) ресурсы;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) ресурсы;
- [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md) деректер көзі;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) деректер көзі.

Параметрлердің толық сипаттамасы [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs) берілген.

## Инстансты жасамас бұрын

1. [Квоталарды](/kz/tools-for-using-services/account/concepts/quotasandlimits) тексеріңіз. Таңдалған [аймақта](/kz/tools-for-using-services/account/concepts/regions) инстансты жасау үшін ресурстар жеткілікті екеніне көз жеткізіңіз. Әртүрлі аймақтар үшін әртүрлі квоталар бапталуы мүмкін.

   Қажет болса, [квоталарды арттырыңыз](/kz/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota).

1. Егер бұл әлі жасалмаған болса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).

1. `vkcs_provider.tf` файлында провайдердің 0.6.0 немесе одан жоғары нұсқасы көрсетілгеніне көз жеткізіңіз. Егер провайдер нұсқасы төмен болса, [провайдерді жаңартыңыз](../../../quick-start).

## 1. MLflow Deploy инстансының сипаттамасы бар файлды жасаңыз

Төмендегі мысалда инстанс келесі конфигурацияда жасалады:

- әдепкі аймақ, `GZ1` қолжетімділік аймағы;
- `SSD` диск түрі, көлемі — 50 ГБ;
- деректер дискісінің түрі `SSD`, көлемі — 60 ГБ.
Келесі мазмұндағы `main.tf` Terraform конфигурация файлын жасаңыз:

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

Мұнда:

- `flavor_id` — ВМ түрінің идентификаторы. Идентификаторды манифесте көрсетуге немесе оны деректер көзінен алуға болады.

  {cut(Мысалдар)}

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: идентификатор кейінірек жасалатын `vkcs_compute_flavor` деректер көзінен алынады.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: [OpenStack CLI](/kz/tools-for-using-services/cli/openstack-cli) арқылы алынған идентификатор көрсетіледі.

  {/cut}

- `mlflow_instance_id` — бірлесіп жұмыс істеуге арналған MLflow инстансының идентификаторы. Жаңа инстанс жасауға немесе бар инстансты пайдалануға болады.

  {cut(Мысалдар)}

  - `mlflow_instance_id = vkcs_mlplatform_mlflow.mlflow.id`: жаңа MLflow инстансы жасалады, инстанс идентификаторы `vkcs_mlplatform_mlflow` ресурсы жасалғаннан кейін алынады. Ресурс кейінірек жасалады.
  - `mlflow_instance_id = "a57e9e91-yyyy-yyyy-yyyy-fedc7ac78c33"`: бар инстанстың идентификаторы көрсетіледі. Идентификатор [{var(cloud)} жеке кабинетінде](https://cloud.vk.com/app) MLflow инстансы бетінде қолжетімді.

  {/cut}

- `network_id` — инстанс орналастырылатын желінің идентификаторы. Инстансты бар желіде де, жаңа желіде де орналастыруға болады. Идентификаторды манифесте көрсетуге, деректер көзінен немесе ресурстан алуға болады.

  {cut(Мысалдар)}

  - `network_id = vkcs_networking_network.default.id`: инстанс `vkcs_networking_network` ресурсы жасайтын жаңа желіде орналастырылады. Ресурс кейінірек жасалады.
  - `network_id = data.vkcs_networking_network.default.id`: инстанс бар желіде орналастырылады, оның идентификаторы `vkcs_networking_network` деректер көзінен алынады. Деректер көзі кейінірек жасалады.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: инстанс бар желіде орналастырылады. {var(cloud)} жеке кабинетіндегі [желілер тізімінен](/kz/networks/vnet/instructions/net#vnet-net-view) немесе Openstack CLI арқылы алынған оның идентификаторы көрсетіледі.

  {/cut}

## 2. (Опционалды) ВМ түріне арналған деректер көзінің сипаттамасы бар файлды жасаңыз

Қажетті ВМ түрінің сипаттамасы бар `flavor.tf` Terraform конфигурация файлын жасаңыз:

```hcl
data "vkcs_compute_flavor" "basic" {
  name = "STD2-4-4"
}
```

Файлда көрсетілген ВМ түрі сіздің Terraform жобаңызда MLflow Deploy инстансын жасау үшін пайдаланылады.

## 3. (Опционалды) Байланыстырылған MLflow инстансының сипаттамасы бар файлды жасаңыз

[MLflow инстансының сипаттамасы](../mlflow) бар `mlflow_instance.tf` Terraform конфигурация файлын жасаңыз.

## 4. (Опционалды) Инстансқа арналған желілік инфрақұрылымның сипаттамасы бар файлды жасаңыз

Инстансқа арналған желілік инфрақұрылым сипаттамасы бар `network.tf` Terraform конфигурация файлын жасаңыз:

{tabs}

{tab(Бар желінің сипаттамасы)}

Жобада бар желіге арналған деректер көзі сипаттамасының мысалы:

```hcl
data "vkcs_networking_network" "default" {
  name = "default"
  sdn = "neutron"
}
```
{/tab}

{tab(Жаңа желіні жасау)}

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

## 5. Terraform көмегімен қажетті ресурстарды жасаңыз

1. Terraform конфигурация файлдарын бір директорияға орналастырыңыз:
  
   - `vkcs_provider.tf`;
   - `main.tf`;
   - `flavor.tf` (егер жасалған болса);
   - `mlflow_instance.tf`(егер жасалған болса);
   - `jh_instance.tf`(егер жасалған болса);
   - `network.tf`(егер жасалған болса).

1. Осы директорияға өтіңіз.
1. Конфигурация файлдарының дұрыс екенін және қажетті өзгерістерді қамтитынын тексеріңіз:

   ```console
   terraform validate && terraform plan
   ```

1. Өзгерістерді қолданыңыз:

   ```console
   terraform apply
   ```

   Растауды сұрағанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## 6. Конфигурацияның қолданылуын тексеріңіз

MLflow Deploy инстансының сәтті жасалғанына көз жеткізіңіз:

1. {var(cloud)} [жеке кабинетіне](https://cloud.vk.com/app/) өтіңіз.
1. **ML Platform** → **Инстансы** бөліміне өтіңіз. MLflow Deploy инстансының жасалғанына және белсенді екеніне көз жеткізіңіз.

## Пайдаланылмайтын ресурстарды жойыңыз

Егер Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Конфигурация файлдары бар директорияға өтіңіз.
1. Келесі команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растауды сұрағанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.
