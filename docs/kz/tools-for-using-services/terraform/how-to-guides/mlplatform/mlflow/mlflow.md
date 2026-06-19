{include(/kz/_includes/_translated_by_ai.md)}

Мақалада Terraform көмегімен MLflow инстансын құру мысалдары келтірілген.

Инстансты құру кезінде мыналар пайдаланылады:

- [vkcs_mlplatform_mlflow](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_mlflow.md) ресурсы;
- [vkcs_mlplatform_jupyterhub](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_jupyterhub.md) ресурсы;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) ресурсы;
- [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md) деректер көзі;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) деректер көзі.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## Инстансты құру алдында

1. [Квоталарды](/kz/tools-for-using-services/account/concepts/quotasandlimits) тексеріңіз. Таңдалған [аймақта](/kz/tools-for-using-services/account/concepts/regions) инстансты құру үшін ресурстар жеткілікті екеніне көз жеткізіңіз. Әртүрлі аймақтар үшін әртүрлі квоталар бапталуы мүмкін.

   Қажет болса, квоталарды [ұлғайтыңыз](/kz/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota).

1. Бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).

1. `vkcs_provider.tf` файлында провайдердің 0.6.0 немесе одан жоғары нұсқасы көрсетілгеніне көз жеткізіңіз. Егер провайдер нұсқасы төмен болса, [провайдерді жаңартыңыз](../../../quick-start).

## 1. MLflow инстансының сипаттамасы бар файлды жасаңыз

Төмендегі мысалда инстанс келесі конфигурацияда құрылады:

- әдепкі аймақ, қолжетімділік аймағы `GZ1`;
- диск түрі `SSD`, өлшемі — 50 ГБ;
- деректер дискісінің түрі `SSD`, өлшемі — 60 ГБ.
Мазмұны келесі Terraform конфигурация файлын `main.tf` жасаңыз:

```hcl
resource "vkcs_mlplatform_mlflow" "mlflow" {
  name              = "tf-example"
  flavor_id         = data.vkcs_compute_flavor.basic.id
  jh_instance_id    = vkcs_mlplatform_jupyterhub.jupyterhub.id
  demo_mode         = true
  availability_zone = "GZ1"
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
      network_id = vkcs_networking_network.default.id
    },
  ]
}
```

Мұнда:

- `flavor_id` — ВМ түрінің идентификаторы. Идентификаторды манифестте көрсетуге немесе деректер көзінен алуға болады.

  {cut(Мысалдар)}

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: идентификатор төменде құрылатын `vkcs_compute_flavor` деректер көзінен алынады.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: [OpenStack CLI](/kz/tools-for-using-services/cli/openstack-cli) арқылы алынған идентификатор көрсетіледі.

  {/cut}

- `jh_instance_id` — бірлесіп жұмыс істеуге арналған JupyterHub инстансының идентификаторы. Жаңа инстанс жасауға немесе барын пайдалануға болады.

  {cut(Мысалдар)}

  - `jh_instance_id = vkcs_mlplatform_jupyterhub.jupyterhub.id`: жаңа JupyterHub инстансы жасалады, инстанс идентификаторы `vkcs_mlplatform_jupyterhub` ресурсы құрылғаннан кейін алынады. Ресурс төменде құрылады.
  - `jh_instance_id = "a57e9e91-yyyy-yyyy-yyyy-fedc7ac78c33"`: бар инстанстың идентификаторы көрсетіледі. Идентификатор [{var(cloud)} жеке кабинетіндегі](https://cloud.vk.com/app) JupyterHub инстансы бетінде қолжетімді.

  {/cut}

- `demo_mode` — демо-режим. Егер `true` болса, барлық деректер инстанстың ВМ-інде сақталады. Егер `false` болса, деректерді сақтау үшін DBaaS Postgres дерекқоры бар {var(s3)} бакеті қосылады.

- `network_id` — инстанс орналастырылатын желінің идентификаторы. Инстанс бар желіде немесе жаңа желіде орналастырылуы мүмкін. Идентификаторды манифестте көрсетуге, деректер көзінен немесе ресурстан алуға болады.

  {cut(Мысалдар)}

  - `network_id = vkcs_networking_network.default.id`: инстанс `vkcs_networking_network` ресурсы арқылы жасалатын жаңа желіде орналастырылады. Ресурс төменде құрылады.
  - `network_id = data.vkcs_networking_network.default.id`: инстанс бар желіде орналастырылады, оның идентификаторы `vkcs_networking_network` деректер көзінен алынады. Деректер көзі төменде құрылады.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: инстанс бар желіде орналастырылады. Оның идентификаторы {var(cloud)} жеке кабинетіндегі [желілер тізімінен](/kz/networks/vnet/instructions/net#vnet-net-view) немесе Openstack CLI арқылы алынған.

  {/cut}

## 2. (Опционалды) ВМ түріне арналған деректер көзінің сипаттамасы бар файлды жасаңыз

Қажетті ВМ түрінің сипаттамасы бар Terraform конфигурация файлын `flavor.tf` жасаңыз:

```hcl
data "vkcs_compute_flavor" "basic" {
  name = "STD2-4-4"
}
```

Файлда көрсетілген ВМ түрі Terraform жобаңызда MLflow инстансын жасау үшін пайдаланылады.

## 3. (Опционалды) Байланыстырылған JupyterHub инстансының сипаттамасы бар файлды жасаңыз

Terraform конфигурация файлын `jh_instance.tf` [JupyterHub инстансының сипаттамасымен](../jupyterhub) жасаңыз.

## 4. (Опционалды) Инстанс үшін желілік инфрақұрылым сипаттамасы бар файлды жасаңыз

Инстансқа арналған желілік инфрақұрылым сипаттамасы бар Terraform конфигурация файлын `network.tf` жасаңыз:

{tabs}

{tab(Қолданыстағы желінің сипаттамасы)}

Жобада бар желіге арналған деректер көзі сипаттамасының мысалы:

```hcl
data "vkcs_networking_network" "default" {
  name = "default"
  sdn = "neutron"
}
```
{/tab}

{tab(Жаңа желі құру)}

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
   - `flavor.tf` (егер жасалса);
   - `jh_instance.tf`(егер жасалса);
   - `network.tf`(егер жасалса).

1. Осы директорияға өтіңіз.
1. Конфигурация файлдарының дұрыс екенін және қажетті өзгерістерді қамтитынын тексеріңіз:

   ```console
   terraform validate && terraform plan
   ```

1. Өзгерістерді қолданыңыз:

   ```console
   terraform apply
   ```

   Растауды сұрағанда, `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## 6. Конфигурацияның қолданылуын тексеріңіз

MLflow инстансы сәтті құрылғанына көз жеткізіңіз:

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://cloud.vk.com/app/).
1. **ML Platform** → **Инстансы** бөліміне өтіңіз. MLflow инстансының құрылғанына және белсенді екеніне көз жеткізіңіз.

## Пайдаланылмайтын ресурстарды жойыңыз

Егер Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары бар директорияға өтіңіз.
1. Келесі пәрменді орындаңыз:

   ```console
   terraform destroy
   ```

   Растауды сұрағанда, `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.
