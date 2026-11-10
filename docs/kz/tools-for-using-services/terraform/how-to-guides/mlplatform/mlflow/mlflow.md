# {heading(MLflow инстансін жасау)[id=terraform-mlflow]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Бұл мақалада Terraform көмегімен MLflow инстансін жасау мысалдары келтірілген.

Инстансті жасағанда мыналар пайдаланылады:

- [vkcs_mlplatform_mlflow](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_mlflow.md) ресурсы;
- [vkcs_mlplatform_jupyterhub](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_jupyterhub.md) ресурсы;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) ресурсы;
- [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md) деректер көзі;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) деректер көзі.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Инстансті жасамас бұрын)[id=terraform-mlflow-prepare]}

1. {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоталарды]} тексеріңіз. Таңдалған {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=өңірде]} CDN-ресурсын жасауға жеткілікті ресурс бар-жоғын тексеріңіз. Әртүрлі өңірлер үшін әртүрлі квоталар орнатылуы мүмкін.

   Қажет болған жағдайда квоталарды {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=арттырыңыз]}.

1. Егер бұрын жасалмаса, {linkto(../../../quick-start#terraform-quick-start)[text=Terraform орнатыңіз және провайдерді баптаңыз]}.

1. `vkcs_provider.tf` файлында провайдердің нұсқасы 0.6.0 немесе одан жоғары көрсетілгенін тексеріңіз. Егер провайдердің нұсқасы төмен болса, оны {linkto(../../../quick-start#terraform-quick-start-update)[text=жаңартыңыз]}.

## {heading({counter(tf-mlflow)}. MLflow инстансін сипаттайтын файл жасаңыз)[id=terraform-mlflow-instance-file]}

Төмендегі мысалда инстанс келесі конфигурацияда жасалады:

- әдепкі өңір, `ME1` қолжетімділік аймағы;
- `SSD` диск түрі, өлшемі — 50 ГБ;
- деректер дискінің түрі `SSD`, өлшемі — 60 ГБ.
Terraform конфигурация файлын `main.tf` мына мазмұнмен жасаңыз:

```hcl
resource "vkcs_mlplatform_mlflow" "mlflow" {
  name              = "tf-example"
  flavor_id         = data.vkcs_compute_flavor.basic.id
  jh_instance_id    = vkcs_mlplatform_jupyterhub.jupyterhub.id
  demo_mode         = true
  availability_zone = "ME1"
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

- `flavor_id` — ВМ түрінің идентификаторы. Идентификаторды манифестке жазуға немесе деректер көзінен алуға болады.

  {cut(Мысалдар)}

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: идентификатор әрі қарай құрылатын `vkcs_compute_flavor` деректер көзінен алынады.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: {linkto(../../../../cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI]} арқылы алынған идентификатор көрсетіледі.

  {/cut}

- `jh_instance_id` — бірлесіп жұмыс істеуге арналған JupyterHub инстансінің идентификаторы. Жаңа инстанс жасауға немесе бар инстансті пайдалануға болады.

  {cut(Мысалдар)}

  - `jh_instance_id = vkcs_mlplatform_jupyterhub.jupyterhub.id`: жаңа JupyterHub инстансі жасалады, инстанстің идентификаторы `vkcs_mlplatform_jupyterhub` ресурсы жасалғаннан кейін алынады. Ресурс әрі қарай құрылады.
  - `jh_instance_id = "a57e9e91-yyyy-yyyy-yyyy-fedc7ac78c33"`: бар инстанстің идентификаторы көрсетіледі. Идентификатор {var(cloud)} [жеке кабинетіндегі](https://cloud.vk.ru/app) JupyterHub инстансі бетінде қолжетімді.

  {/cut}

- `demo_mode` — демо-режим. Егер `true` болса, барлық деректер инстанстің ВМ-інде сақталады. Егер `false` болса, деректерді сақтау үшін DBaaS Postgres дерекқоры бар {var(s3)} бакеті қосылады.

- `network_id` — инстанс орналастырылатын желінің идентификаторы. Инстансті бар желіге немесе жаңа желіге орналастыруға болады. Идентификаторды манифестте көрсетуге, деректер көзінен немесе ресурстан алуға болады.

  {cut(Мысалдар)}

  - `network_id = vkcs_networking_network.default.id`: инстанс `vkcs_networking_network` ресурсымен жасалатын жаңа желіге орналастырылады. Ресурс әрі қарай құрылады.
  - `network_id = data.vkcs_networking_network.default.id`: инстанс бар желіге орналастырылады, оның идентификаторы `vkcs_networking_network` деректер көзінен алынады. Деректер көзі әрі қарай құрылады.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: инстанс бар желіге орналастырылады. Оның идентификаторы {var(cloud)} жеке кабинетіндегі {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=желілер тізімінен]} немесе Openstack CLI арқылы алынады.

  {/cut}

## {heading({counter(tf-mlflow)}. (Қалауыңызша) ВМ түрі үшін деректер көзін сипаттайтын файл жасаңыз)[id=terraform-mlflow-vm-file]}

Қажетті ВМ түрін сипаттайтын Terraform конфигурация файлын `flavor.tf` жасаңыз:

```hcl
data "vkcs_compute_flavor" "basic" {
  name = "STD2-4-4"
}
```

Файлда көрсетілген ВМ түрі Terraform жобасында MLflow инстансін жасау үшін пайдаланылатын болады.

## {heading({counter(tf-mlflow)}. (Қалауыңызша) Байланысты JupyterHub инстансін сипаттайтын файл жасаңыз)[id=terraform-mlflow-jupyterhub-file]}

{linkto(../jupyterhub#terraform-jupyterhub)[text=JupyterHub инстансінің сипаттамасы]} бар Terraform конфигурация файлын `jh_instance.tf` жасаңыз.

## {heading({counter(tf-mlflow)}. (Қалауыңызша) Инстанс үшін желілік инфрақұрылымды сипаттайтын файл жасаңыз)[id=terraform-mlflow-net-file]}

Инстанс үшін желілік инфрақұрылымды сипаттайтын Terraform конфигурация файлын `network.tf` жасаңыз:

{tabs}

{tab(Бар желінің сипаттамасы)}

Жобадағы бар желі үшін деректер көзінің сипаттамасы мысалы:

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

## {heading({counter(tf-mlflow)}. Қажетті ресурстарды Terraform көмегімен жасаңыз)[id=terraform-mlflow-create]}

1. Terraform конфигурация файлдарын бір директорияға орналастырыңыз:

   - `vkcs_provider.tf`;
   - `main.tf`;
   - `flavor.tf` (жасалған болса);
   - `jh_instance.tf` (жасалған болса);
   - `network.tf` (жасалған болса).

1. Осы директорияға өтіңіз.
1. Конфигурация файлдары дұрыс екенін және қажетті өзгерістерді қамтитынын тексеріңіз:

   ```console
   terraform validate && terraform plan
   ```

1. Өзгерістерді қолданыңыз:

   ```console
   terraform apply
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## {heading({counter(tf-mlflow)}. Конфигурацияның қолданылуын тексеріңіз)[id=terraform-mlflow-check]}

MLflow инстансі сәтті жасалғанын тексеріңіз:

1. {var(cloud)} [жеке кабинетіне өтіңіз](https://cloud.vk.ru/app/).
1. **ML Platform** → **Инстанстар** бөліміне өтіңіз. MLflow инстансі жасалғанын және белсенді екенін тексеріңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=terraform-mlflow-delete]}

Егер Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары орналасқан директорияға өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.