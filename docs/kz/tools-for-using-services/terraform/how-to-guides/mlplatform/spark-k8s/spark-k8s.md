# {heading(Spark кластерін құру)[id=terraform-spark-k8s]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Мақалада {var(cloud)} платформасында Terraform көмегімен Spark кластерін құру мысалы келтірілген.

Кластерді құру кезінде мыналар пайдаланылады:

- [vkcs_mlplatform_spark_k8s](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_spark_k8s.md) ресурсы;
- [vkcs_mlplatform_k8s_registry](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_k8s_registry.md) ресурсы;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) ресурсы;
- [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md) деректер көзі;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) деректер көзі.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Кластерді құрмас бұрын)[id=terraform-spark-k8s-prepare]}

1. {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоталарды]} тексеріңіз. Таңдалған {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=өңірде]} CDN-ресурсын құруға жеткілікті ресурс бар екеніне көз жеткізіңіз. Әр түрлі өңірлер үшін әр түрлі квоталар орнатылуы мүмкін.

   Қажет болған жағдайда квоталарды {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=арттырыңыз]}.

1. Егер бұрын жасалмаса, {linkto(../../../quick-start#terraform-quick-start)[text=Terraform орнатыңыз және провайдерді теңшеңіз]}.
1. `vkcs_provider.tf` файлында провайдердің нұсқасы 0.7.0 немесе одан жоғары көрсетілгеніне көз жеткізіңіз. Провайдердің нұсқасы төмен болса, оны {linkto(../../../quick-start#terraform-quick-start-update)[text=жаңартыңыз]}.

## {heading({counter(tf-spark)}. Кластердің сипаттамасы бар файлды жасаңыз)[id=terraform-spark-k8s-cluster-file]}

Төмендегі мысалда кластер келесі конфигурацияда құрылады:

- әдепкі өңір, `ME1` қолжетімділік аймағы;
- worker-түйіндердің минималды саны — 2, worker-түйіндердің максималды саны — 100;
- кластердің жұмыс режимі — `DEV`;
- кластердің белсенділік жоқ кезеңнен 120 минут өткен соң ұйықтау режиміне өтуі;
- кластердің белсенділік жоқ кезеңнен 1440 минут өткен соң жойылуы.

Terraform конфигурация файлын `main.tf` мына мазмұнмен жасаңыз:

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
  availability_zone = "ME1"
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

Мұнда:

- `network_id` — кластер орналастырылатын желінің идентификаторы. Кластер бар желіде немесе жаңа желіде орналастырылуы мүмкін. Идентификаторды манифестте көрсетуге, деректер көзінен немесе ресурстан алуға болады.

  {cut(Мысалдар)}

  - `network_id = vkcs_networking_network.default.id`: кластер `vkcs_networking_network` ресурсы арқылы жасалатын жаңа желіде орналастырылады. Ресур кейінірек құрылады.
  - `network_id = data.vkcs_networking_network.default.id`: кластер бар желіде орналастырылады, оның идентификаторы `vkcs_networking_network` деректер көзінен алынады. Деректер көзі кейінірек құрылады.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: кластер бар желіде орналастырылады. {var(cloud)} жеке кабинетіндегі {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=желілер тізімінен]} немесе Openstack CLI арқылы алынған оның идентификаторы көрсетіледі.

  {/cut}

- `flavor_id` — ВМ түрінің идентификаторы. Идентификаторды манифестте жазуға немесе деректер көзінен алуға болады.

  {cut(Мысалдар)}

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: идентификатор кейінірек құрылатын `vkcs_compute_flavor` деректер көзінен алынады.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: {linkto(../../../../cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI]} арқылы алынған идентификатор көрсетіледі.

  {/cut}

- `registry_id` — Spark тапсырмаларын іске қосу кезінде пайдаланылатын бейнелері бар Docker реестрінің идентификаторы. Жаңа реестр жасауға немесе бар реестрді пайдалануға болады.

  {cut(Мысалдар)}

  - `registry_id = vkcs_mlplatform_k8s_registry.k8s_registry.id`: жаңа Docker реестрі жасалып, кластердің құрамына кірмейтін және бөлек тарификаланатын бөлінген K8S Docker Registry виртуалды машинасына орналастырылады. Идентификатор `vkcs_mlplatform_k8s_registry` ресурсын құрғаннан кейін алынады. Ресурс кейінірек құрылады.
  - `registry_id = "a57e9e91-yyyy-yyyy-yyyy-fedc7ac78c33"`: бар K8S Docker Registry реестрінің идентификаторы көрсетіледі. K8S Docker Registry инстансының идентификаторын білу үшін:

    1. {var(cloud)} жеке кабинетіне [өтіңіз](https://cloud.vk.ru/app).
    1. Кластерді құру қажет жобаны таңдаңыз.
    1. **ML Platform** → **Spark в k8s** бөліміне өтіңіз.
    1. **Инстанстар** қойындысына өтіңіз.
    1. Қажетті инстанстың атауын басыңыз.

  {/cut}

- `ip_pool` — кластердің IP-адрестер пулы үшін сыртқы желінің идентификаторы.

  {cut(Мысалдар)}

  - `ip_pool = data.vkcs_networking_network.extnet.id`: идентификатор кластердің желілік инфрақұрылымының сипаттамасында көрсетілетін `vkcs_networking_network` деректер көзінен алынады.
  - `ip_pool = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: {var(cloud)} жеке кабинетіндегі {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=желілер тізімінен]} немесе Openstack CLI арқылы алынған сыртқы желінің идентификаторы көрсетіледі.

  {/cut}

- `spark_configuration` — [Spark конфигурациясына](https://github.com/kubeflow/spark-operator/blob/master/docs/user-guide.md#specifying-spark-configuration) жауап беретін қасиеттердің (properties) тізімі.
- `environment_variables` — {linkto(../../../../../ml/spark-to-k8s/instructions/create#mlspark-instructions-create)[text=Spark үшін орта айнымалыларының]} тізімі.

## {heading({counter(tf-spark)}. K8S Docker Registry инстансының сипаттамасы бар файлды жасаңыз)[id=terraform-spark-k8s-instance-file]}

K8S Docker Registry инстансының сипаттамасы бар Terraform конфигурация файлын `registry.tf` жасаңыз:

```hcl
resource "vkcs_mlplatform_k8s_registry" "k8s_registry" {
  name              = "tf-example"
  admin_name        = "admin"
  admin_password    = "Password12!Password"
  flavor_id         = data.vkcs_compute_flavor.basic.id
  availability_zone = "ME1"
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

Мұнда:

- `flavor_id` — ВМ түрінің идентификаторы. Идентификаторды манифестте жазуға немесе деректер көзінен алуға болады.

  {cut(Мысалдар)}

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: идентификатор кейінірек құрылатын `vkcs_compute_flavor` деректер көзінен алынады.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: {linkto(../../../../cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI]} арқылы алынған идентификатор көрсетіледі.

  {/cut}

- `network_id` — инстанс орналастырылатын желінің идентификаторы. Инстанс бар желіде немесе жаңа желіде орналастырылуы мүмкін. Идентификаторды манифестте көрсетуге, деректер көзінен немесе ресурстан алуға болады.

  {cut(Мысалдар)}

  - `network_id = vkcs_networking_network.default.id`: инстанс `vkcs_networking_network` ресурсы арқылы жасалатын жаңа желіде орналастырылады. Ресурс кейінірек құрылады.
  - `network_id = data.vkcs_networking_network.default.id`: инстанс бар желіде орналастырылады, оның идентификаторы `vkcs_networking_network` деректер көзінен алынады. Деректер көзі кейінірек құрылады.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: инстанс бар желіде орналастырылады. {var(cloud)} жеке кабинетіндегі {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=желілер тізімінен]} немесе Openstack CLI арқылы алынған оның идентификаторы көрсетіледі.

  {/cut}

- `ip_pool` — кластердің IP-адрестер пулы үшін сыртқы желінің идентификаторы.

  {cut(Мысалдар)}

  - `ip_pool = data.vkcs_networking_network.extnet.id`: идентификатор кластердің желілік инфрақұрылымының сипаттамасында көрсетілетін `vkcs_networking_network` деректер көзінен алынады.
  - `ip_pool = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: {var(cloud)} жеке кабинетіндегі {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=желілер тізімінен]} немесе Openstack CLI арқылы алынған сыртқы желінің идентификаторы көрсетіледі.

  {/cut}

## {heading({counter(tf-spark)}. (Міндетті емес) ВМ түрі үшін деректер көзінің сипаттамасы бар файлды жасаңыз)[id=terraform-spark-k8s-vm-file]}

Қажетті ВМ түрінің сипаттамасы бар Terraform конфигурация файлын `flavor.tf` жасаңыз:

```hcl
data "vkcs_compute_flavor" "basic" {
  name = "STD2-4-4"
}
```

Файлда көрсетілген ВМ түрі Terraform жобасыңызда инстанстарды құру үшін пайдаланылады.

## {heading({counter(tf-spark)}. (Міндетті емес) Кластер үшін желілік инфрақұрылымның сипаттамасы бар файлды жасаңыз)[id=terraform-spark-k8s-infrastructure-file]}

Кластер үшін желілік инфрақұрылымның сипаттамасы бар Terraform конфигурация файлын `network.tf` жасаңыз:

{tabs}

{tab(Бар желінің сипаттамасы)}

Жобада бар желі үшін деректер көзінің сипаттамасының мысалы:

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

## {heading({counter(tf-spark)}. Қажетті ресурстарды Terraform көмегімен жасаңыз)[id=terraform-spark-k8s-create]}

1. Terraform конфигурация файлдарын бір директорияға орналастырыңыз:

   - `vkcs_provider.tf`;
   - `main.tf`;
   - `registry.tf`;
   - `flavor.tf` (жасалған болса);
   - `network.tf` (жасалған болса).

1. Осы директорияға өтіңіз.
1. Конфигурация файлдары дұрыс және қажетті өзгерістерді қамтитынына көз жеткізіңіз:

   ```console
   terraform validate && terraform plan
   ```

1. Өзгерістерді қолданыңыз:

   ```console
   terraform apply
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## {heading({counter(tf-spark)}. Конфигурацияның қолданылуын тексеріңіз)[id=terraform-spark-k8s-check]}

Spark кластері сәтті құрылғанына көз жеткізіңіз:

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://cloud.vk.ru/app/).
1. **ML Platform** → **Инстанстар** бөліміне өтіңіз. Spark кластерінің құрылғаны және белсенді екеніне көз жеткізіңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=terraform-spark-k8s-delete]}

Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары бар директорияға өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.