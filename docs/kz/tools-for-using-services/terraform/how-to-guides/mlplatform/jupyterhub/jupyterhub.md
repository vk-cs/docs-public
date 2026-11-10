# {heading(JupyterHub инстансін жасау)[id=terraform-jupyterhub]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Бұл мақалада Terraform көмегімен JupyterHub инстансін жасау мысалдары келтірілген.

Инстансті жасау кезінде пайдаланылады:

- [vkcs_mlplatform_jupyterhub](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/mlplatform_jupyterhub.md) ресурсы;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) ресурсы;
- [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md) деректер көзі;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) деректер көзі.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Инстансті жасамас бұрын)[id=terraform-jupyterhub-prepare]}

1. {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоталарды]} тексеріңіз. Таңдалған {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=өңірде]} CDN-ресурсты жасауға жеткілікті ресурс бар екеніне көз жеткізіңіз. Әртүрлі өңірлер үшін әртүрлі квоталар орнатылуы мүмкін.

   Қажет болса, квоталарды {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=арттырыңыз]}.

1. Мұны бұрын жасамаған болсаңыз, {linkto(../../../quick-start#terraform-quick-start)[text=Terraform орнатыңіз және провайдерді теңшеріңіз]}.

1. `vkcs_provider.tf` файлында провайдердің 0.6.0 немесе одан жоғары нұсқасы көрсетілгеніне көз жеткізіңіз. Провайдердің нұсқасы төмен болса, оны {linkto(../../../quick-start#terraform-quick-start-update)[text=жаңартыңыз]}.

## {heading({counter(tf-jupyterhub)}. JupyterHub инстансінің сипаттамасы бар файлды жасаңыз)[id=terraform-jupyterhub-instance-file]}

Төмендегі мысалда инстанс келесі конфигурацияда жасалады:

- әдепкі өңір, `ME1` қолжетімділік аймағы;
- `SSD` диск түрі;
- пайдаланушы аты — `admin`, құпиясөз — `Password!`;
- деректер дискінің түрі `SSD`, өлшемі — 60 және 70 ГБ.

Terraform конфигурация файлын `main.tf` мына мазмұнмен жасаңыз:

```hcl
resource "vkcs_mlplatform_jupyterhub" "jupyterhub" {
  name              = "tf-example"
  admin_name        = "admin"
  admin_password    = "Password!"
  flavor_id         = data.vkcs_compute_flavor.basic.id
  availability_zone = "ME1"
  boot_volume = {
    volume_type = "ceph-ssd"
  }
  data_volumes = [
    {
      size        = 60
      volume_type = "ceph-ssd"
    },
    {
      size        = 70
      volume_type = "ceph-ssd"
    }
  ]
  networks = [
    {
      network_id = data.vkcs_networking_network.default.id
    },
  ]
}
```

Мұнда:

- `admin_password` — JupyterHub инстансінің әкімшісінің құпиясөзі.

  {cut(Құпиясөзге қойылатын талаптар)}

  - Құпиясөздің ең аз ұзындығы — 8 таңба.
  - Латын алфавитінің бас және кіші әріптерін қамтуы керек.
  - Кемінде бір цифр және `?`, `!`, `~`, `@`, `#`, `$`, `%`, `^`, `&`, `_`, `-`, `+`, `*`, `=`, `;`, `:`, `,`, `.`, `<`, `>`, `|`, `[`, `]`, `{`, `}`, `(`, `)` арнайы таңбасы болуы керек.

  {/cut}

- `flavor_id` — ВМ түрінің идентификаторы. Идентификаторды манифестке жазуға немесе деректер көзінен алуға болады.

  {cut(Мысалдар)}

  - `flavor_id = data.vkcs_compute_flavor.basic.id`: идентификатор `vkcs_compute_flavor` деректер көзінен алынады, ол әрі қарай құрылады.
  - `flavor_id = "aee06bce-xxxx-xxxx-xxxx-ec4210cc6bac"`: {linkto(../../../../cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI]} арқылы алынған идентификатор көрсетіледі.

  {/cut}

- `network_id` — инстанс орналасатын желінің идентификаторы. Инстанс бар желіде немесе жаңа желіде орналасуы мүмкін. Идентификаторды манифестте көрсетуге, деректер көзінен немесе ресурстан алуға болады.

  {cut(Мысалдар)}

  - `network_id = vkcs_networking_network.default.id`: инстанс `vkcs_networking_network` ресурсымен жасалатын жаңа желіде орналасады. Ресурс әрі қарай құрылады.
  - `network_id = data.vkcs_networking_network.default.id`: инстанс бар желіде орналасады, оның идентификаторы `vkcs_networking_network` деректер көзінен алынады. Деректер көзі әрі қарай құрылады.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: инстанс бар желіде орналасады. {var(cloud)} жеке кабинетіндегі {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=желілер тізімінен]} немесе Openstack CLI арқылы алынған оның идентификаторы көрсетіледі.

  {/cut}

## {heading({counter(tf-jupyterhub)}. (Міндетті емес) ВМ түрі үшін деректер көзінің сипаттамасы бар файлды жасаңыз)[id=terraform-jupyterhub-vm-file]}

Қажетті ВМ түрінің сипаттамасы бар Terraform конфигурация файлын `flavor.tf` жасаңыз:

```hcl
data "vkcs_compute_flavor" "basic" {
  name = "STD2-4-4"
}
```

Файлда көрсетілген ВМ түрі Terraform жобаңызда JupyterHub инстансін жасау үшін пайдаланылады.

## {heading({counter(tf-jupyterhub)}. (Міндетті емес) Инстанс үшін желілік инфрақұрылымның сипаттамасы бар файлды жасаңыз)[id=terraform-jupyterhub-net-file]}

Инстанс үшін желілік инфрақұрылымның сипаттамасы бар Terraform конфигурация файлын `network.tf` жасаңыз:

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

# Get external network with Internet access
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

## {heading({counter(tf-jupyterhub)}. Қажетті ресурстарды Terraform көмегімен жасаңыз)[id=terraform-jupyterhub-create]}

1. Terraform конфигурация файлдарын бір директорияға орналастырыңыз:

   - `vkcs_provider.tf`;
   - `main.tf`;
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

## {heading({counter(tf-jupyterhub)}. Конфигурацияның қолданылуын тексеріңіз)[id=terraform-jupyterhub-check]}

JupyterHub инстансі сәтті жасалғанына көз жеткізіңіз:

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://cloud.vk.ru/app/).
1. **ML Platform** → **Инстанстар** бөліміне өтіңіз. JupyterHub инстансі жасалғанына және белсенді екеніне көз жеткізіңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=terraform-jupyterhub-delete]}

Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары орналасқан директорияға өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.