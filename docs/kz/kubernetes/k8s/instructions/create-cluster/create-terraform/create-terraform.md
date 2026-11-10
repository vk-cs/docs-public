# {heading(Terraform көмегімен кластер құру)[id=k8s-create-terraform]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Kubernetes кластерін тек Terraform арқылы ғана емес, сонымен қатар {linkto(../create-webui#k8s-create-webui)[text={var(cloud)} жеке кабинеті]} арқылы да құруға болады.

Әртүрлі кластерлерді құруға арналған дайын конфигурациялық файлдар мысалдары Terraform бөлімінде [келтірілген](../../../../../tools-for-using-services/terraform/how-to-guides/k8s/create).

{note:warn}
Кластерді құру кезінде оған {linkto(../../../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=сервистік жүктемелік балансировщик]} құрылады. NGINX Ingress Controller {linkto(../../../concepts/addons-and-settings/addons#k8s-addons)[text=аддоны]} таңдалған жағдайда оған {linkto(../../../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=стандартты жүктемелік балансировщик]} құрылады.

Балансировщиктерді пайдалану {linkto(../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифтеленеді]}.
{/note}

## {heading(Кластерді құру алдында)[id=k8s-create-terraform-prepare]}

1. Кластерді құру жоспарланып отырған {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймақ]} үшін қолжетімді ресурстармен және {linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квоталармен]} танысыңыз. Әртүрлі аймақтар үшін әртүрлі квоталар бапталған болуы мүмкін.

   Қажет болса, квоталарды {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota)[text=ұлғайтыңыз]}.

1. Managed Containers сервисіндегі {linkto(../../helpers/terraform-howto#k8s-terraform-howto)[text=Terraform пайдалану ерекшеліктерімен]} танысыңыз.

1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](../../../../../tools-for-using-services/terraform/quick-start).

1. Егер бұл әлі жасалмаса, {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI орнатыңыз]} және {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=авторизациядан өтіңіз]}.

1. Terraform конфигурациялық файлын жасаңыз.

   {note:info}

   Келесі қадамдарда осы файлда көрсету қажет Terraform ресурстарының тек негізгі параметрлері келтірілген. Параметрлердің толық тізімі [құжаттамада](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs) [Kubernetes кластеріне](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_cluster.md) арналған Terraform-провайдер үшін берілген.

   {/note}

## {heading(1. Қажетті дереккөздерді дайындаңыз)[id=k8s-create-terraform-prepare-data-sources]}

1. Кластердің master-түйіндері үшін виртуалды машинаның қай түрі пайдаланылатынын анықтаңыз:

   1. Келесі пәрменді орындаңыз:

      ```console
      openstack flavor list
      ```

      Қолжетімді виртуалды машина түрлері шығарылады.

   1. Қажетті виртуалды машина түрін таңдап, оның атын **Name** бағанынан жазып алыңыз.

1. Кластер қай Kubernetes нұсқасымен құрылуы керек екенін анықтаңыз:

   1. Конфигурациялық файлға келесі жолдарды қосыңыз:

      ```hcl
      data "vkcs_kubernetes_clustertemplates" "k8s-template-list" {}

      output "k8s-version-list" {
          value = data.vkcs_kubernetes_clustertemplates.k8s-template-list.cluster_templates.*.version
      }
      ```

   1. Келесі пәрменді орындаңыз:

      ```console
      terraform refresh
      ```

   1. Келесі пәрменді орындаңыз:

      ```hcl
      terraform output k8s-version-list
      ```

      Kubernetes-тің қолжетімді нұсқаларының тізімі шығарылады.

   1. Қажетті Kubernetes нұсқасын таңдап, оның нөмірін жазып алыңыз.

1. Конфигурациялық файлға дереккөздерді қосыңыз:

   1. Master-түйіндерге арналған {linkto(../../../concepts/flavors#k8s-flavors-vm-flavor)[text=виртуалды машина шаблоны]}. Мысал:

      ```hcl
      data "vkcs_compute_flavor" "k8s-master-flavor" {
          name = "STD3-2-4"
      }
      ```

      Шаблон атауы ретінде бұрын алынған атты көрсетіңіз.

   1. Кластер шаблоны. Мысал:

      ```hcl
      data "vkcs_kubernetes_clustertemplate" "k8s-template" {
          version = "<ВЕРСИЯ_KUBERNETES>"
      }
      ```

      Нұсқа ретінде бұрын алынған нұсқа нөмірін көрсетіңіз.

## {heading(2. Кластер конфигурациясын сипаттаңыз)[id=k8s-create-terraform-describe-conf]}

Кластер ресурсын конфигурациялық файлға қосыңыз:

```hcl
resource "vkcs_kubernetes_cluster" "k8s-cluster" {
  name                     = "k8s-cluster"
  cluster_type             = "<КЛАСТЕР_ТҮРІ>"
  cluster_template_id      = data.vkcs_kubernetes_clustertemplate.k8s-template.id
  master_flavor            = data.vkcs_compute_flavor.k8s-master-flavor.id
  master_count             = <MASTER_ТОБТАРЫНЫҢ_САНЫ>
  labels = {
    cluster_node_volume_type = "<ДИСК_ТҮРІ>"
  }
  network_id               = "<ЖЕЛІ_ИДЕНТИФИКАТОРЫ>"
  subnet_id                = "<ІШКИ_ЖЕЛІ_ИДЕНТИФИКАТОРЫ>"
  availability_zone        = "<ҚОЛЖЕТІМДІЛІК_ЗОНАСЫ>"
  floating_ip_enabled      = true
}
```

Мұнда:

- `cluster_type` — кластер түрі:

  - `standard` (әдепкі бойынша) — кластердің барлық master-тобтары бір {linkto(../../../../../start/concepts/architecture#architecture-az)[text=қолжетімділік зонасында]} орналасады. Ақауға төзімділік зона деңгейінде қамтамасыз етіледі.
  - `regional` — кластердің master-тобтары үш қолжетімділік зонасының әрқайсысында орналасады, бұл зоналардың бірі істен шыққанда да басқаруды сақтауға мүмкіндік береді. Master-тобтардың жалпы саны — 3 немесе одан көп.

- `master_count` — master-тобтардың саны. Тақ сан болуы тиіс. Стандартты кластер үшін master-тобтардың саны `1`, `3` немесе `5` болуы керек. Өңірлік кластер үшін — `3` немесе `5`. Толығырақ {linkto(../../../concepts/architecture#k8s-architecture)[text=Сервистің архитектурасы]} бөлімінде.
- `labels.cluster_node_volume_type` — {linkto(../../../concepts/storage#k8s-storage-supported-storage-types)[text=деректерді сақтау]} үшін master-тобының дискінің түрі. Таңдалған диск түрі кластердің өнімділігіне әсер етеді. Қолжетімді мәндер: `ceph-ssd` (әдепкі бойынша) және `high-iops`.
- `availability_zone` — кластердің қолжетімділік зонасы. Параметрді кластер түрі стандартты болғанда қолданыңыз. `Мәскеу` өңірі үшін үш қолжетімділік зонасының бірін көрсетіңіз: `GZ1`, `ME1` немесе `PA2`.

   {note:info}
   `PA2` қолжетімділік зонасын {linkto(../../../../../networks/vnet/concepts/sdn#vnet-sdn-sprut)[text=SDN Sprut]} қолданатын жобалар үшін ғана таңдауға болады.
   {/note}

- `availability_zones` — кластердің қолжетімділік зоналары. Параметрді кластер түрі өңірлік болғанда қолданыңыз. `Мәскеу` өңірі үшін үш қолжетімділік зонасын көрсетіңіз: `["GZ1", "ME1", "PA2"]`. Егер кластер өңірлік болса және `availability_zones` параметрі көрсетілмесе, қолжетімділік зоналары автоматты түрде орнатылады.
- `network_id` және `subnet_id` — сәйкесінше желі мен ішкі желінің идентификаторлары. Оларды әртүрлі тәсілдермен көрсетуге болады:

  {tabs}

  {tab(Идентификаторларды көрсету)}

  Егер қажетті желілер мен ішкі желілер бұрыннан бар болса және олардың идентификаторларын білсеңіз, идентификаторларды тікелей көрсетіңіз.

  Мысал:

  ```hcl
  resource "vkcs_kubernetes_cluster" "k8s-cluster" {
    name                = "k8s-cluster"
    ...
    network_id          = "sample-id-4212-a090-9f30519275e5"
    subnet_id           = "sample-id-4bd6-bda4-f66dc7fbaa4f"
    ...
  }
  ```

  {/tab}

  {tab(Деректер көздерін қолдану)}

  Егер қажетті желілер мен ішкі желілер бұрыннан бар болса, бірақ олардың идентификаторларын білмесеңіз, сәйкес деректер көздерін көрсетіп, идентификаторларды алыңыз.

  Мысал:

  ```hcl
  ...
  data "vkcs_networking_network" "k8s-network" {
      name = "default"
  }
  data "vkcs_networking_subnet" "k8s-subnet" {
      name = "default_subnet"
      network_id = data.vkcs_networking_network.k8s-network.id
  }
  ...
  resource "vkcs_kubernetes_cluster" "k8s-cluster" {
    name                = "k8s-cluster"
    ...
    network_id          = data.vkcs_networking_network.k8s-network.id
    subnet_id           = data.vkcs_networking_subnet.k8s-subnet.id
    ...
  }
  ```

  {/tab}

  {tab(Жасалған ресурстарды қолдану)}

  Егер қажетті желілер мен ішкі желілер әлі жоқ болса, оларды жасап, идентификаторларын алыңыз:

  ```hcl
  ...
  resource "vkcs_networking_network" "k8s-network" {
  name           = "default"
  admin_state_up = "true"
  }
  resource "vkcs_networking_subnet" "k8s-subnet" {
      name       = "default_subnet"
      network_id = vkcs_networking_network.k8s-network.id
      cidr       = "<192.168.0.0/24 түріндегі ішкі желі адресі>"
  }
  ...
  resource "vkcs_kubernetes_cluster" "k8s-cluster" {
    name                = "k8s-cluster"
    ...
    network_id          = vkcs_networking_network.k8s-network.id
    subnet_id           = vkcs_networking_subnet.k8s-subnet.id
    ...
  }
  ```

  {/tab}

  {/tabs}

    {note:info}
    Интернетке шығу мүмкіндігі жоқ кластерді жасау үшін {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-shadow-port)[text=Shadow port]} қосылған желіні көрсетіңіз.
    {/note}

- `floating_ip_enabled` — кластер API-сі үшін публичный IP-адрес тағайындау:

  - `true` — кластер жасалғанда оған интернеттен кластерге қолжетімділік үшін {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-адрес]} тағайындалады. Мұндай IP-адресті тағайындау үшін `subnet_id` идентификаторы бар кластердің ішкі желісі сыртқы желіге қолжетімділігі бар маршрутизаторға {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-internet-access)[text=қосылған]} болуы қажет.
  - `false` — кластерге Floating IP-адрес тағайындалмайды.

Terraform көмегімен кластерге аддондарды орнату үшін {linkto(../../addons/manage-addons#k8s-manage-addons-available)[text=қолжетімді аддондар тізімін алыңыз]} және {linkto(../../addons/advanced-installation#k8s-advanced-installation)[text=қажеттілерін орнатыңыз]}.

## {heading(3. Бір немесе бірнеше worker-түйіндер тобының конфигурациясын сипаттаңыз)[id=k8s-create-terraform-describe-workers]}

{note:info}

Бұл міндетті емес қадам.
Terraform көмегімен тек master-түйіндерден тұратын кластер құрып, worker-түйіндер топтарын кейінірек қосуға болады.

{/note}

Бұл операция {linkto(../../manage-node-group#k8s-manage-node-group)[text=Worker-түйіндер тобын басқару]} бөлімінде егжей-тегжейлі сипатталған.

## {heading(4. Кластерді құру процедурасын іске қосыңыз)[id=k8s-create-terraform-apply]}

1. Terraform конфигурациялық файлының дұрыстығын тексеріңіз:

   ```console
   terraform validate
   ```

1. Жоспарланған өзгерістермен танысыңыз:

   ```console
   terraform plan
   ```

1. Жоспарланған өзгерістерді қолданыңыз:

   ```console
   terraform apply
   ```

   Kubernetes кластерін құру басталады. Бұл процесс кластер өлшеміне байланысты ұзақ уақыт алуы мүмкін.

## {heading(Келесі не?)[id=k8s-create-terraform-what-next]}

- Кластерге қосылу жоспарланып отырған хостта {linkto(../../../connect#k8s-connect)[text=ортаны баптаңыз]}.
- Кластерді {linkto(../../../how-to-guides#k8s-how-to-guides)[text=пайдалану сценарийлерімен танысыңыз]}.
- Managed Containers сервисінің {linkto(../../../concepts#k8s-concepts)[text=тұжырымдамаларымен танысыңыз]}.