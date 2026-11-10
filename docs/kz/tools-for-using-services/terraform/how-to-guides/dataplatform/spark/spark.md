# {heading(Spark кластерін жасау)[id=terraform-spark]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Мақалада {var(data-p)} платформасында Terraform көмегімен Spark кластерін жасау мысалы келтірілген.

Кластерді жасау кезінде пайдаланылады:

- [vkcs_dataplatform_cluster](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/dataplatform_cluster.md) ресурсы;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) ресурсы;
- [vkcs_networking_subnet](http://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) ресурсы;
- [vkcs_db_instance](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_instance.md) ресурсы;
- [vkcs_db_database](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_database.md) ресурсы;
- [vkcs_db_user](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_user.md) ресурсы;
- [vkcs_dataplatform_product](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/dataplatform_product.md) деректер көзі;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) деректер көзі.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Дайындық қадамдары)[id=terraform-spark-prepare]}

1. {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоталарды]} тексеріңіз. Таңдалған {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=өңірде]} CDN-ресурсын жасауға жеткілікті ресурс бар екеніне көз жеткізіңіз. Әр түрлі өңірлер үшін әр түрлі квоталар орнатылуы мүмкін.

   Қажет болған жағдайда квоталарды {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=арттырыңыз]}.

1. {linkto(../../../quick-start#terraform-quick-start)[text=Terraform орнатыңыз және ортаны баптаңыз]}, егер бұл әлі жасалмаған болса.
1. `vkcs_provider.tf` файлында провайдердің 0.7.0 немесе одан жоғары нұсқасы көрсетілгеніне көз жеткізіңіз. Егер провайдердің нұсқасы төмен болса, оны {linkto(../../../quick-start#terraform-quick-start-update)[text=жаңартыңыз]}.

## {heading(1. Кластер сипаттамасы бар файлды жасаңыз)[id=terraform-spark-cluster-file]}

Terraform конфигурация файлын `main.tf` келесі мазмұнмен жасаңыз:

```hcl
locals {
  s3_bucket = "my_bucket"
}

resource "vkcs_dataplatform_cluster" "basic_spark" {
  name            = "tf-basic-spark"
  description     = "Production Spark cluster for data processing"
  network_id      = vkcs_networking_network.db.id
  subnet_id       = vkcs_networking_subnet.db.id
  product_name    = "spark"
  product_version = "3.5.1"

  availability_zone = "MS1"
  configs = {
    settings = [
      {
        alias = "sparkproxy.spark_version"
        value = "spark-py-3.5.1:v3.5.1.2"
      }
    ]
    maintenance = {
      start = "0 0 1 * *"
    }
    warehouses = [
      {
        name = "spark"
        connections = [
          {
            name = "s3_int"
            plug = "s3-int"
            settings = [
              {
                alias = "s3_bucket"
                value = local.s3_bucket
              },
              {
                alias = "s3_folder"
                value = "tfexample-folder"
              }
            ]
          },
          {
            name = "postgres"
            plug = "postgresql"
            settings = [
              {
                alias = "db_name"
                value = vkcs_db_database.postgres_db.name
              },
              {
                alias = "hostname"
                value = "${vkcs_db_instance.db_instance.ip[0]}:5432"
              },
              {
                alias = "username"
                value = vkcs_db_user.postgres_user.name
              },
              {
                alias = "password"
                value = vkcs_db_user.postgres_user.password
              }
            ]
          }
        ]
      }
    ]
  }
  pod_groups = [
    {
      name  = "sparkconnect"
      count = 1
      resource = {
        cpu_request = "10"
        ram_request = "10"
      }
    },
    {
      name  = "sparkhistory"
      count = 1
      resource = {
        cpu_request = "0.5"
        ram_request = "1"
      }
      volumes = {
        "data" = {
          storage_class_name = "ceph-ssd"
          storage            = "5"
          count              = 1
        }
      }
    }
  ]
}
```

Мұнда:

- `network_id` — кластер орналасатын желінің идентификаторы. Кластер бар желіде немесе жаңа желіде орналасуы мүмкін. Идентификаторды манифестте көрсетуге, деректер көзінен немесе ресурсдан алуға болады.

  {cut(Мысалдар)}

  - `network_id = vkcs_networking_network.default.id`: кластер `vkcs_networking_network` ресурсымен жасалатын жаңа желіде орналасады. Ресурс кейінірек құрылады.
  - `network_id = data.vkcs_networking_network.default.id`: кластер бар желіде орналасады, оның идентификаторы `vkcs_networking_network` деректер көзінен алынады. Деректер көзі кейінірек құрылады.
  - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: кластер бар желіде орналасады. {var(cloud)} жеке кабинетіндегі {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=желілер тізімінен]} немесе Openstack CLI арқылы алынған оның идентификаторы көрсетіледі.

  {/cut}

- `product_name` — {var(data-p)} платформасындағы Spark сервисінің атауы.

  {cut(Мысалдар)}

  - `product_name = "spark"`: сервис атауы тікелей кластер конфигурациясында көрсетіледі.
  - `product_name = data.vkcs_dataplatform_product.spark.product_name`: сервис атауы басқа конфигурациялық файлда көрсетіледі, ол `vkcs_dataplatform_product` деректер көзінен алынады. Деректер көзі кейінірек {linkto(#terraform-spark-product)[text=құрылады]}.

  {/cut}

- `product_version` — {var(data-p)} платформасындағы Spark сервисінің нұсқасы.

   {cut(Мысалдар)}

   - `product_version = "3.5.1"`: сервис нұсқасы тікелей кластер конфигурациясында көрсетіледі.
   - `product_version = data.vkcs_dataplatform_product.spark.product_version`: сервис нұсқасы басқа конфигурациялық файлда көрсетіледі, ол `vkcs_dataplatform_product` деректер көзінен алынады. Деректер көзі кейінірек {linkto(#terraform-spark-product)[text=құрылады]}.

   {/cut}

- `availability_zone` — кластер жасалатын [қолжетімділік аймағы](../../../../../start/concepts/architecture#architecture-az).
- `configs` — кластер конфигурациясының параметрлері:

  - `settings` — жалпы параметрлер. `sparkproxy.spark_version` параметрі тапсырмаларды орындауға арналған Spark нұсқасын анықтайды.
  - `maintenance` — Cron форматындағы техникалық қызмет көрсетудің басталу уақыты.
  - `warehouses` — {linkto(../../../../../data-platform/spark/concepts/parameters#parameters_data_sources)[text=деректер көздеріне]} қосылымдар.

- `pod_groups` — кластердің есептеу ресурстарының топтары:

  - `sparkconnect` — деректерді интерактивті өңдеуге арналған ресурстар.
  - `sparkhistory` — Spark тапсырмаларының тарихын сақтауға арналған ресурстар.

## {heading(2. (Қалауыңыз бойынша) {var(data-p)} платформасындағы Spark сервисін деректер көзі арқылы анықтаңыз)[id=terraform-spark-product]}

{var(data-p)} платформасындағы Spark сервисінің сипаттамасы бар `product.tf` Terraform конфигурация файлын жасаңыз:

```hcl
data "vkcs_dataplatform_product" "spark" {
  product_name = "spark"
  product_version = "3.5.1"
}
```

Бұл деректер көзін пайдалану конфигурацияны икемдірек етеді. 
`main.tf` файлында `data.vkcs_dataplatform_product.spark.product_name` және `data.vkcs_dataplatform_product.spark.product_version` мәндеріне сілтеме жасай аласыз.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/dataplatform_product.md).

## {heading(3. (Қалауыңыз бойынша) Кластерге арналған желілік инфрақұрылым сипаттамасы бар файлды жасаңыз)[id=terraform-spark-net-file]}

Кластерге арналған желілік инфрақұрылымның сипаттамасы бар `network.tf` Terraform конфигурация файлын жасаңыз:

{tabs}

{tab(Бар желінің сипаттамасы)}

Жобада бар желі үшін деректер көзінің сипаттамасы мысалы:

```hcl
data "vkcs_networking_network" "default" {
  name = "default"
  sdn = "neutron"
}
```
{/tab}

{tab(Жаңа желі жасау)}

```hcl
resource "vkcs_networking_network" "db" {
  name = "db-network"
  sdn  = "neutron"
}

resource "vkcs_networking_subnet" "db" {
  name       = "db-subnet"
  network_id = vkcs_networking_network.db.id
  cidr       = "192.168.199.0/24"
}
```

{/tab}

{/tabs}

## {heading(4. (Қалауыңыз бойынша) Spark қосылатын деректер қорының сипаттамасы бар файлды жасаңыз)[id=terraform-spark-db-file]}

Spark қосылатын деректер қорының сипаттамасына арналған `db.tf` Terraform конфигурация файлын жасаңыз:

```hcl
resource "vkcs_db_instance" "db_instance" {
  name        = "db-instance"
  flavor_id   = "STD3-2-8"
  size        = 10
  volume_type = "ceph-ssd"

  network {
    uuid = vkcs_networking_network.db.id
  }

  datastore {
    type    = "postgresql"
    version = "13"
  }
}

resource "vkcs_db_database" "postgres_db" {
  name    = "mydatabase"
  dbms_id = vkcs_db_instance.db_instance.id
}

resource "vkcs_db_user" "postgres_user" {
  name     = "myuser"
  password = "securepassword123"
  dbms_id  = vkcs_db_instance.db_instance.id
}
```

## {heading(5. Қажетті ресурстарды Terraform көмегімен жасаңыз)[id=terraform-spark-resource]}

1. Terraform конфигурация файлдарын бір директорияға орналастырыңыз:

   - `vkcs_provider.tf`;
   - `main.tf`;
   - `product.tf` (жасалған болса);
   - `network.tf` (жасалған болса);
   - `db.tf` (жасалған болса).

1. Осы директорияға өтіңіз.
1. Конфигурациялық файлдар дұрыс және қажетті өзгерістер бар екеніне көз жеткізіңіз:

   ```console
   terraform validate && terraform plan
   ```

1. Өзгерістерді қолданыңыз:

   ```console
   terraform apply
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## {heading(Конфигурацияның қолданылуын тексеріңіз)[id=terraform-spark-check]}

Spark кластері сәтті жасалғанына көз жеткізіңіз:

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://cloud.vk.ru/app/).
1. **Data Platform** → **Сервис инстанстары** бөліміне өтіңіз. Spark кластері жасалғанына және белсенді екеніне көз жеткізіңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=terraform-spark-delete]}

Егер Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары орналасқан директорияға өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.