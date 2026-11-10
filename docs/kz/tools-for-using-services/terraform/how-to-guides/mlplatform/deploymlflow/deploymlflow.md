# {heading(MLflow Deploy инстансын жасау)[id=terraform-deploymlflow]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Мақалада Terraform көмегімен MLflow инстансының deploy-нұсқасын жасау мысалдары келтірілген.

Инстансты жасағанда пайдаланылады:

- [vkcs_mlplatform_mlflow_deploy](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_mlflow_deploy.md) ресурсы;
- [vkcs_mlplatform_mlflow](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_mlflow.md) ресурсы;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) ресурсы;
- [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md) деректер көзі;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) деректер көзі.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Инстансты жасамас бұрын)[id=terraform-deploymlflow-prepare]}

1. {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоталарды]} тексеріңіз. Таңдалған {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=аймақта]} CDN-ресурсын жасауға жеткілікті ресурс бар-жоғын тексеріңіз. Әртүрлі аймақтар үшін әртүрлі квоталар орнатылуы мүмкін.

   Қажет болса, квоталарды {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=арттырыңыз]}.

1. Әлі жасалмаса, {linkto(../../../quick-start#terraform-quick-start)[text=Terraform орнатыңыз және провайдерді конфигурациялаңыз]}.

1. `vkcs_provider.tf` файлында провайдердің нұсқасы 0.6.0 немесе одан жоғары көрсетілгенін тексеріңіз. Провайдердің нұсқасы төмен болса, оны {linkto(../../../quick-start#terraform-quick-start-update)[text=жаңартыңыз]}.

## {heading({counter(tf-deploymlflow)}. MLflow Deploy инстансының сипаттамасы бар файлды жасаңыз)[id=terraform-deploymlflow-instance-file]}

Төмендегі мысалда инстанс келесі конфигурацияда жасалады:

- әдепкі аймақ, `ME1` қолжетімділік зонасы;
- диск түрі `SSD`, өлшемі — 50 ГБ;
- деректер дискінің түрі `SSD`, өлшемі — 60 ГБ.
Келесі мазмұнмен Terraform конфигурация файлын `main.tf` жасаңыз:

```hcl
resource "vkcs_mlplatform_mlflow_deploy" "deploy" {
  name               = "tf-example"
  flavor_id          = data.vkcs_compute_flavor.basic.id
  mlflow_instance_id = vkcs_mlplatform_mlflow.mlflow.id
  availability_zone  = "ME1"
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

- `flavor_id` — ВМ түрінің идентификаторы. Идентификаторды манифестке жазуға немесе деректер көзінен алуға болады.

  {cut(Мысалдар)}

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: идентификатор кейінірек құрылатын `vkcs_compute_flavor` деректер көзінен алынады.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: {linkto(../../../../cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI]} арқылы алынған идентификатор көрсетіледі.

  {/cut}

- `mlflow_instance_id` — бірлесіп жұмыс істеуге арналған MLflow инстансының идентификаторы. Жаңа инстанс жасауға немесе бар инстансты пайдалануға болады.

  {cut(Мысалдар)}

  - `mlflow_instance_id = vkcs_mlplatform_mlflow.mlflow.id`: жаңа MLflow инстансы жасалады, инстанстың идентификаторы `vkcs_mlplatform_mlflow` ресурсы жасалғаннан кейін алынады. Ресурс кейінірек құрылады.
  - `mlflow_instance_id = "a57e9e91-yyyy-yyyy-yyyy-fedc7ac78c33"`: бар инстанстың идентификаторы көрсетіледі. Идентификатор {var(cloud)} [жеке кабинетіндегі](https://cloud.vk.ru/app) MLflow инстансының бетінде қолжетімді.

  {/cut}

- `network_id` — инстанс орналастырылатын желінің идентификаторы. Инстанс бар желіде немесе жаңа желіде орналасуы мүмкін. Идентификаторды манифестте көрсетуге, деректер көзінен немесе ресурстан алуға болады.

  {cut(Мысалдар)}

  - `network_id = vkcs_networking_network.default.id`: инстанс `vkcs_networking_network` ресурсымен жасалатын жаңа желіде орналасады. Ресурс кейінірек құрылады.
  - `network_id = data.vkcs_networking_network.default.id`: инстанс бар желіде орналасады, оның идентификаторы `vkcs_networking_network` деректер көзінен алынады. Деректер көзі кейінірек құрылады.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: инстанс бар желіде орналасады. {var(cloud)} жеке кабинетіндегі {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=желілер тізімінен]} немесе Openstack CLI арқылы алынған оның идентификаторы көрсетіледі.

  {/cut}

## {heading({counter(tf-deploymlflow)}. (Міндетті емес) ВМ түріне арналған деректер көзінің сипаттамасы бар файлды жасаңыз)[id=terraform-deploymlflow-vm-file]}

Қажетті ВМ түрінің сипаттамасы бар Terraform конфигурация файлын `flavor.tf` жасаңыз:

```hcl
data "vkcs_compute_flavor" "basic" {
  name = "STD2-4-4"
}
```

Файлда көрсетілген ВМ түрі Terraform жобасында MLflow Deploy инстансын жасау үшін пайдаланылады.

## {heading({counter(tf-deploymlflow)}. (Міндетті емес) Байланысты MLflow инстансының сипаттамасы бар файлды жасаңыз)[id=terraform-deploymlflow-mlflow-file]}

{linkto(../mlflow#terraform-mlflow)[text=MLflow инстансының сипаттамасы]} бар Terraform конфигурация файлын `mlflow_instance.tf` жасаңыз.

## {heading({counter(tf-deploymlflow)}. (Міндетті емес) Инстансқа арналған желілік инфрақұрылымның сипаттамасы бар файлды жасаңыз)[id=terraform-deploymlflow-net-file]}

Инстансқа арналған желілік инфрақұрылымның сипаттамасы бар Terraform конфигурация файлын `network.tf` жасаңыз:

{tabs}

{tab(Бар желінің сипаттамасы)}

Жобада бар желіге арналған деректер көзінің сипаттамасының мысалы:

```hcl
data "vkcs_networking_network" "default" {
  name = "default"
  sdn = "neutron"
}
```
{/tab}

{tab(Жаңа желі жасау)}

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

## {heading({counter(tf-deploymlflow)}. Қажетті ресурстарды Terraform көмегімен жасаңыз)[id=terraform-deploymlflow-create]}

1. Terraform конфигурация файлдарын бір директорияға орналастырыңыз:

   - `vkcs_provider.tf`;
   - `main.tf`;
   - `flavor.tf` (жасалған болса);
   - `mlflow_instance.tf` (жасалған болса);
   - `jh_instance.tf` (жасалған болса);
   - `network.tf` (жасалған болса).

1. Осы директорияға өтіңіз.
1. Конфигурация файлдары дұрыс және қажетті өзгерістерді қамтитынын тексеріңіз:

   ```console
   terraform validate && terraform plan
   ```

1. Өзгерістерді қолданыңыз:

   ```console
   terraform apply
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## {heading({counter(tf-deploymlflow)}. Конфигурацияның қолданылуын тексеріңіз)[id=terraform-deploymlflow-check]}

MLflow Deploy инстансы сәтті жасалғанын тексеріңіз:

1. {var(cloud)} [жеке кабинетына өтіңіз](https://cloud.vk.ru/app/).
1. **ML Platform** → **Инстанстар** бөліміне өтіңіз. MLflow Deploy инстансы жасалғанын және белсенді екенін тексеріңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=terraform-deploymlflow-delete]}

Terraform көмегімен жасалған ресурстар қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары бар директорияға өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.