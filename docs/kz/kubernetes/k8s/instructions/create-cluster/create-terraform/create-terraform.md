{include(/kz/_includes/_translated_by_ai.md)}

Төменде Terraform көмегімен [бірінші буындағы](/kz/kubernetes/k8s/concepts/cluster-generations) кластерді құру сипатталады. Сондай-ақ бірінші буындағы кластерді [VK Cloud жеке кабинетінде](../create-webui) де құра аласыз.

Әртүрлі кластерлерді құруға арналған дайын конфигурациялық файлдар мысалдары Terraform бөлімінде [келтірілген](/kz/tools-for-using-services/terraform/how-to-guides/k8s/create).

{note:warn}

Кластерді құру кезінде ол үшін [сервистік жүктеме теңгергіші](/kz/networks/balancing/concepts/load-balancer#zhukteme_tengergishterinin_turleri) құрылады. NGINX Ingress Controller [аддонын](../../../concepts/addons-and-settings/addons) таңдаған кезде ол үшін [стандартты жүктеме теңгергіші](/kz/networks/balancing/concepts/load-balancer#zhukteme_tengergishterinin_turleri) құрылады.

Теңгергіштерді пайдалану [тарифтеледі](/kz/networks/vnet/tariffication).

{/note}

## Кластерді құру алдында

1. Кластерді құру жоспарланып отырған [аймақ](/kz/tools-for-using-services/account/concepts/regions) үшін қолжетімді ресурстармен және [квоталармен](/kz/tools-for-using-services/account/concepts/quotasandlimits) танысыңыз. Әртүрлі аймақтар үшін әртүрлі квоталар бапталған болуы мүмкін.

   Қажет болса, квоталарды [ұлғайтыңыз](/kz/tools-for-using-services/account/instructions/project-settings/manage#increase-quota).

1. Cloud Containers сервисіндегі [Terraform пайдалану ерекшеліктерімен](../../helpers/terraform-howto) танысыңыз.

1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).

1. Егер бұл әлі жасалмаса, [OpenStack CLI орнатыңыз](/kz/tools-for-using-services/cli/openstack-cli) және [авторизациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli).

1. Terraform конфигурациялық файлын жасаңыз.

   {note:info}

   Келесі қадамдарда осы файлда көрсету қажет Terraform ресурстарының тек негізгі параметрлері келтірілген. Параметрлердің толық тізімі [құжаттамада](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs) Terraform-провайдеріне арналған [Kubernetes кластері](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_cluster.md) үшін берілген.

   {/note}

## 1. Қажетті дереккөздерді дайындаңыз

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

   1. Master-түйіндерге арналған [виртуалды машина шаблоны](../../../concepts/flavors#konfiguraciya_kalyptary). Мысал:

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

## 2. Кластер конфигурациясын сипаттаңыз

Конфигурациялық файлға кластер ресурсін қосыңыз:

```hcl
resource "vkcs_kubernetes_cluster" "k8s-cluster" {
  name                     = "k8s-cluster"
  cluster_type             = "<ТИП_КЛАСТЕРА>"
  cluster_template_id      = data.vkcs_kubernetes_clustertemplate.k8s-template.id
  master_flavor            = data.vkcs_compute_flavor.k8s-master-flavor.id
  master_count             = <КОЛИЧЕСТВО_MASTER_УЗЛОВ>
  cluster_node_volume_type = "<ТИП_ДИСКА>"
  network_id               = "<ИДЕНТИФИКАТОР_СЕТИ>"
  subnet_id                = "<ИДЕНТИФИКАТОР_ПОДСЕТИ>"
  availability_zone        = "<ЗОНА_ДОСТУПНОСТИ>"
  floating_ip_enabled      = true
}
```

Мұнда:

- `cluster_type` — кластер түрі:

  - `standart` (әдепкі бойынша) — кластердің барлық master-түйіндері бір [қолжетімділік аймағында](/kz/start/concepts/architecture#az) орналасады. Істен шығуға төзімділік аймақ деңгейінде қамтамасыз етіледі.
  - `regional` — кластердің master-түйіндері үш қолжетімділік аймағының әрқайсысында орналасады, бұл аймақтардың бірі істен шыққан жағдайда да басқаруды сақтауға мүмкіндік береді. Master-түйіндердің жалпы саны — 3 немесе одан көп.

- `master_count` — master-түйіндер саны. Тақ сан болуы керек. Стандартты кластер үшін master-түйіндер саны `1`, `3` немесе `5` болуы керек. Аймақтық кластер үшін — `3` немесе `5`. Толығырақ [Сервис архитектурасы](../../../concepts/architecture) бөлімінде.
- `cluster_node_volume_type` — түйіндер пайдаланатын [деректерді сақтау](../../../concepts/storage#supported_storage_types) үшін диск түрі. Таңдалған диск түрі кластердің өнімділігіне әсер етеді. Қолжетімді мәндер: `ceph-ssd` (әдепкі бойынша) және `high-iops`.
- `availability_zone` — кластердің қолжетімділік аймағы. Егер кластер түрі стандартты болса, параметрді пайдаланыңыз. `Москва` аймағы үшін үш қолжетімділік аймағының бірін көрсетіңіз: `ME1`, `MS1` немесе `PA2`.
  
   {note:info}

   `PA2` қолжетімділік аймағын тек [SDN Sprut](/kz/networks/vnet/concepts/sdn#sprut) пайдаланатын жобалар үшін таңдауға болады.

   {/note}

- `availability_zones` — кластердің қолжетімділік аймақтары. Егер кластер түрі аймақтық болса, параметрді пайдаланыңыз. `Москва` аймағы үшін үш қолжетімділік аймағын көрсетіңіз: `["ME1", "MS1", "PA2"]`. Егер кластер аймақтық болса және `availability_zones` параметрі көрсетілмесе, қолжетімділік аймақтары автоматты түрде қойылады.
- `network_id` және `subnet_id` — тиісінше желі мен ішкі желінің идентификаторлары. Оларды әртүрлі тәсілдермен көрсетуге болады:

  {tabs}

  {tab(Идентификаторларды көрсету)}

  Егер қажетті желілер мен ішкі желілер бұрыннан бар болса және олардың идентификаторлары сізге белгілі болса, идентификаторларды нақты көрсетіңіз.

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

  {tab(Дереккөздерді пайдалану)}

  Егер қажетті желілер мен ішкі желілер бұрыннан бар болса, бірақ олардың идентификаторлары сізге белгісіз болса, тиісті дереккөздерді көрсетіп, идентификаторларды алыңыз.

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

  {tab(Құрылған ресурстарды пайдалану)}

  Егер қажетті желілер мен ішкі желілер әлі жоқ болса, оларды құрып, идентификаторларын алыңыз:

  ```hcl
  ...
  resource "vkcs_networking_network" "k8s-network" {
  name           = "default"
  admin_state_up = "true"
  }
  resource "vkcs_networking_subnet" "k8s-subnet" {
      name       = "default_subnet"
      network_id = vkcs_networking_network.k8s-network.id
      cidr       = "<Адрес подсети вида 192.168.0.0/24>"
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
       
    Интернетке қолжетімсіз кластер құру үшін қосылған [Shadow port](/kz/networks/vnet/concepts/ips-and-inet#shadow_port) бар желіні көрсетіңіз.
       
    {/note}

- `floating_ip_enabled` — API-кластерге жария IP мекенжайын тағайындау:

  - `true` — кластерді құру кезінде оған интернеттен кластерге қол жеткізу үшін [Floating IP мекенжайы](/kz/networks/vnet/concepts/ips-and-inet#floating-ip) тағайындалады. Мұндай IP мекенжайын тағайындау үшін `subnet_id` идентификаторы бар кластердің ішкі желісі сыртқы желіге қолжетімді маршрутизаторға [қосылған](/kz/networks/vnet/concepts/ips-and-inet#internetke_kol_zhetkizudi_uyymdastyru) болуы керек.
  - `false` — кластерге Floating IP мекенжайы тағайындалмайды.

Terraform көмегімен кластерге аддондарды орнату үшін [қолжетімді аддондар тізімін алыңыз](../../addons/manage-addons#ornatylgan_addondar_75310efd) және қажеттілерін [орнатыңыз](../../addons/advanced-installation).

## 3. Бір немесе бірнеше worker-түйіндер тобының конфигурациясын сипаттаңыз

{note:info}

Бұл міндетті емес қадам.
Terraform көмегімен тек master-түйіндерден тұратын кластер құрып, worker-түйіндер топтарын кейінірек қосуға болады.

{/note}

Бұл операция [Worker-түйіндер тобын басқару](../../manage-node-group) бөлімінде егжей-тегжейлі сипатталған.

## 4. Кластерді құру процедурасын іске қосыңыз

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

## Келесі не?

- Кластерге қосылу жоспарланып отырған хостта [ортаны баптаңыз](../../../connect).
- Кластерді [пайдалану сценарийлерімен танысыңыз](../../../how-to-guides).
- Cloud Containers сервисінің [тұжырымдамаларымен танысыңыз](../../../concepts).
