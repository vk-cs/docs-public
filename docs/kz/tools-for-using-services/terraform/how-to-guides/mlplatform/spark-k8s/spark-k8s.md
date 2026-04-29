{include(/kz/_includes/_translated_by_ai.md)}

Мақалада VK Cloud платформасында Terraform көмегімен Spark кластерін құру мысалы келтірілген.

Кластерді құру кезінде мыналар пайдаланылады:

- [vkcs_mlplatform_spark_k8s](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_spark_k8s.md) ресурсы;
- [vkcs_mlplatform_k8s_registry](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_k8s_registry.md) ресурсы;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) ресурсы;
- [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md) деректер көзі;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) деректер көзі.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## Кластерді құру алдында

1. [Квоталарды](/kz/tools-for-using-services/account/concepts/quotasandlimits) тексеріңіз. Таңдалған [аймақта](/kz/tools-for-using-services/account/concepts/regions) кластерді құру үшін ресурстар жеткілікті екеніне көз жеткізіңіз. Әртүрлі аймақтар үшін әртүрлі квоталар бапталуы мүмкін.

   Қажет болса, квоталарды [ұлғайтыңыз](/kz/tools-for-using-services/account/instructions/project-settings/manage#increase-quota).

1. Бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).

1. `vkcs_provider.tf` файлында провайдердің 0.7.0 немесе одан жоғары нұсқасы көрсетілгеніне көз жеткізіңіз. Егер провайдер нұсқасы төмен болса, [провайдерді жаңартыңыз](../../../quick-start#terraform_dy_zhanartu).

## 1. Кластер сипаттамасы бар файлды жасаңыз

Төмендегі мысалда кластер келесі конфигурацияда құрылады:

- әдепкі аймақ, қолжетімділік аймағы `GZ1`;
- worker-түйіндерінің ең аз саны — 2, worker-түйіндерінің ең көп саны — 100;
- кластердің жұмыс режимі — `DEV`;
- 120 минут әрекетсіздіктен кейін кластерді ұйқы режиміне көшіру;
- 1440 минут әрекетсіздіктен кейін кластерді жою.

Мазмұны келесі Terraform конфигурация файлын `main.tf` жасаңыз:

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

Мұнда:

- `network_id` — кластер орналастырылатын желінің идентификаторы. Кластер бар желіде немесе жаңа желіде орналастырылуы мүмкін. Идентификаторды манифестте көрсетуге, деректер көзінен немесе ресурстан алуға болады.

  {cut(Мысалдар)}

  - `network_id = vkcs_networking_network.default.id`: кластер `vkcs_networking_network` ресурсы арқылы жасалатын жаңа желіде орналастырылады. Ресурс төменде құрылады.
  - `network_id = data.vkcs_networking_network.default.id`: кластер бар желіде орналастырылады, оның идентификаторы `vkcs_networking_network` деректер көзінен алынады. Деректер көзі төменде құрылады.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: кластер бар желіде орналастырылады. Оның идентификаторы VK Cloud жеке кабинетіндегі [желілер тізімінен](/kz/networks/vnet/instructions/net#zheliler_men_ishki_zheliler_tizimin_sonday_ak_olar_turaly_akparatty_karau) немесе Openstack CLI арқылы алынған.

  {/cut}

- `flavor_id` — ВМ түрінің идентификаторы. Идентификаторды манифестте көрсетуге немесе деректер көзінен алуға болады.

  {cut(Мысалдар)}

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: идентификатор төменде құрылатын `vkcs_compute_flavor` деректер көзінен алынады.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: [OpenStack CLI](/kz/tools-for-using-services/cli/openstack-cli) арқылы алынған идентификатор көрсетіледі.

  {/cut}

- `registry_id` — Spark тапсырмаларын іске қосу кезінде пайдаланылатын образдар алынатын Docker тізілімінің идентификаторы. Жаңа тізілім жасауға немесе барын пайдалануға болады.

  {cut(Мысалдар)}

  - `registry_id = vkcs_mlplatform_k8s_registry.k8s_registry.id`: жаңа Docker тізілімі жасалады және ол кластер құрамына кірмейтін әрі бөлек тарифтелетін бөлінген K8S Docker Registry виртуалды машинасына орналастырылады. Идентификатор `vkcs_mlplatform_k8s_registry` ресурсы құрылғаннан кейін алынады. Ресурс төменде құрылады.
  - `registry_id = "a57e9e91-yyyy-yyyy-yyyy-fedc7ac78c33"`: бар K8S Docker Registry тізілімінің идентификаторы көрсетіледі. K8S Docker Registry инстансының идентификаторын білу үшін:

    1. VK Cloud жеке кабинетіне [өтіңіз](https://cloud.vk.com/app).
    1. Қажетті инстанс атауын басыңыз.
    1. **ML Platform** → **Spark в k8s** бөліміне өтіңіз.
    1. **Инстанстар** қойындысына өтіңіз.
    1. Кластерді құру қажет жобаны таңдаңыз.

  {/cut}

- `ip_pool` — кластердің IP мекенжайлар пулы үшін сыртқы желі идентификаторы.

  {cut(Мысалдар)}

  - `ip_pool = data.vkcs_networking_network.extnet.id`: идентификатор кластердің желілік инфрақұрылымы сипаттамасында көрсетілетін `vkcs_networking_network` деректер көзінен алынады.
  - `ip_pool = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: VK Cloud жеке кабинетіндегі [желілер тізімінен](/kz/networks/vnet/instructions/net#zheliler_men_ishki_zheliler_tizimin_sonday_ak_olar_turaly_akparatty_karau) немесе Openstack CLI арқылы алынған сыртқы желінің идентификаторы көрсетіледі.

  {/cut}

- `spark_configuration` — [Spark конфигурациясына](https://github.com/kubeflow/spark-operator/blob/master/docs/user-guide.md#specifying-spark-configuration) жауап беретін қасиеттер (properties) тізімі.

- `environment_variables` — [Spark үшін орта айнымалыларының](/kz/ml/spark-to-k8s/instructions/create) тізімі.

## 2. K8S Docker Registry инстансының сипаттамасы бар файлды жасаңыз

K8S Docker Registry инстансының сипаттамасы бар Terraform конфигурация файлын `registry.tf` жасаңыз:

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

Мұнда:

- `flavor_id` — ВМ түрінің идентификаторы. Идентификаторды манифестте көрсетуге немесе деректер көзінен алуға болады.

  {cut(Мысалдар)}

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: идентификатор төменде құрылатын `vkcs_compute_flavor` деректер көзінен алынады.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: [OpenStack CLI](/kz/tools-for-using-services/cli/openstack-cli) арқылы алынған идентификатор көрсетіледі.

  {/cut}

- `network_id` — инстанс орналастырылатын желінің идентификаторы. Инстанс бар желіде немесе жаңа желіде орналастырылуы мүмкін. Идентификаторды манифестте көрсетуге, деректер көзінен немесе ресурстан алуға болады.

  {cut(Мысалдар)}

  - `network_id = vkcs_networking_network.default.id`: инстанс `vkcs_networking_network` ресурсы арқылы жасалатын жаңа желіде орналастырылады. Ресурс төменде құрылады.
  - `network_id = data.vkcs_networking_network.default.id`: инстанс бар желіде орналастырылады, оның идентификаторы `vkcs_networking_network` деректер көзінен алынады. Деректер көзі төменде құрылады.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: инстанс бар желіде орналастырылады. Оның идентификаторы VK Cloud жеке кабинетіндегі [желілер тізімінен](/kz/networks/vnet/instructions/net#zheliler_men_ishki_zheliler_tizimin_sonday_ak_olar_turaly_akparatty_karau) немесе Openstack CLI арқылы алынған.

  {/cut}

- `ip_pool` — кластердің IP мекенжайлар пулы үшін сыртқы желі идентификаторы.

  {cut(Мысалдар)}

  - `ip_pool = data.vkcs_networking_network.extnet.id`: идентификатор кластердің желілік инфрақұрылымы сипаттамасында көрсетілетін `vkcs_networking_network` деректер көзінен алынады.
  - `ip_pool = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: VK Cloud жеке кабинетіндегі [желілер тізімінен](/kz/networks/vnet/instructions/net#zheliler_men_ishki_zheliler_tizimin_sonday_ak_olar_turaly_akparatty_karau) немесе Openstack CLI арқылы алынған сыртқы желінің идентификаторы көрсетіледі.

  {/cut}

## 3. (Опционалды) ВМ түріне арналған деректер көзінің сипаттамасы бар файлды жасаңыз

Қажетті ВМ түрінің сипаттамасы бар Terraform конфигурация файлын `flavor.tf` жасаңыз:

```hcl
data "vkcs_compute_flavor" "basic" {
  name = "STD2-4-4"
}
```

Файлда көрсетілген ВМ түрі Terraform жобаңызда инстанстарды жасау үшін пайдаланылады.

## 4. (Опционалды) Кластер үшін желілік инфрақұрылым сипаттамасы бар файлды жасаңыз

Кластерге арналған желілік инфрақұрылым сипаттамасы бар Terraform конфигурация файлын `network.tf` жасаңыз:

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
   - `registry.tf`;
   - `flavor.tf` (егер жасалса);
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

Spark кластері сәтті құрылғанына көз жеткізіңіз:

1. VK Cloud жеке кабинетіне [өтіңіз](https://cloud.vk.com/app/).
1. **ML Platform** → **Инстансы** бөліміне өтіңіз. Spark кластері құрылғанына және белсенді екеніне көз жеткізіңіз.

## Пайдаланылмайтын ресурстарды жойыңыз

Егер Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары бар директорияға өтіңіз.
1. Келесі пәрменді орындаңыз:

   ```console
   terraform destroy
   ```

   Растауды сұрағанда, `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.
