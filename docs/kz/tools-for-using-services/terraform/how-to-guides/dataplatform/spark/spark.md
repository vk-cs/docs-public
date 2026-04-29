{include(/kz/_includes/_translated_by_ai.md)}

Мақалада VK Data Platform платформасында Terraform көмегімен Spark кластерін жасау мысалы келтірілген.

Кластерді жасау кезінде мыналар пайдаланылады:

- [vkcs_dataplatform_cluster](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/dataplatform_cluster.md) ресурсы;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) ресурсы;
- [vkcs_networking_subnet](http://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) ресурсы;
- [vkcs_db_instance](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_instance.md) ресурсы;
- [vkcs_db_database](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_database.md) ресурсы;
- [vkcs_db_user](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_user.md) ресурсы;
- [vkcs_dataplatform_product](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/dataplatform_product.md) деректер көзі;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) деректер көзі.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Дайындық қадамдары)[id=preparation]}

1. [Квоталарды](/kz/tools-for-using-services/account/concepts/quotasandlimits) тексеріңіз. Таңдалған [аймақта](/kz/tools-for-using-services/account/concepts/regions) кластерді жасау үшін ресурстар жеткілікті екеніне көз жеткізіңіз. Әртүрлі аймақтар үшін әртүрлі квоталар бапталуы мүмкін.

   Квоталарды ұлғайту үшін [техникалық қолдау қызметіне](/kz/contacts) хабарласыңыз.

1. Егер әлі орындалмаса, [Terraform-ды орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).

1. `vkcs_provider.tf` файлында провайдердің 0.7.0 немесе одан жоғары нұсқасы көрсетілгеніне көз жеткізіңіз. Егер провайдер нұсқасы төмен болса, [провайдерді жаңартыңыз](../../../quick-start#terraform_dy_zhanartu).

## {heading(1. Кластер сипаттамасы бар файлды жасаңыз)[id=cluster_config]}

Келесі мазмұнмен Terraform конфигурациясының `main.tf` файлын жасаңыз:

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

  availability_zone = "GZ1"
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

- `network_id` — кластер орналастырылатын желінің идентификаторы. Кластер бар желіде де, жаңа желіде де орналастырылуы мүмкін. Идентификаторды манифесте көрсетуге, деректер көзінен немесе ресурстан алуға болады.

  {cut(Мысалдар)}

    - `network_id = vkcs_networking_network.default.id`: кластер `vkcs_networking_network` ресурсы жасайтын жаңа желіде орналастырылады. Ресурс төменде жасалады.
    - `network_id = data.vkcs_networking_network.default.id`: кластер бар желіде орналастырылады, оның идентификаторы `vkcs_networking_network` деректер көзінен алынады. Деректер көзі төменде жасалады.
    - `network_id = "bb76507d-yyyy-yyyy-yyyy-2bca1a4c4cfc"`: кластер бар желіде орналастырылады. Оның идентификаторы VK Cloud жеке кабинетіндегі [желілер тізімінен](/kz/networks/vnet/instructions/net#zheliler_men_ishki_zheliler_tizimin_sonday_ak_olar_turaly_akparatty_karau) немесе Openstack CLI арқылы алынған түрде көрсетіледі.

  {/cut}

- `product_name` — VK Data Platform платформасындағы Spark сервисінің атауы.

  {cut(Мысалдар)}

    - `product_name = "spark"`: сервис атауы тікелей кластер конфигурациясында көрсетіледі.
    - `product_name = data.vkcs_dataplatform_product.spark.product_name`: сервис атауы басқа конфигурациялық файлда көрсетіледі, ол `vkcs_dataplatform_product` деректер көзінен алынады. Деректер көзі төменде [жасалады](#product).

  {/cut}

- `product_version` — VK Data Platform платформасындағы Spark сервисінің нұсқасы.

   {cut(Мысалдар)}

    - `product_version = "3.5.1"`: сервис нұсқасы тікелей кластер конфигурациясында көрсетіледі.
    - `product_version = data.vkcs_dataplatform_product.spark.product_version`: сервис нұсқасы басқа конфигурациялық файлда көрсетіледі, ол `vkcs_dataplatform_product` деректер көзінен алынады. Деректер көзі төменде [жасалады](#product).

   {/cut}

- `availability_zone` — кластер жасалатын [қолжетімділік аймағы](/kz/start/concepts/architecture#az).

- `configs` — кластер конфигурациясының параметрлері:

    - `settings` — жалпы параметрлер. `sparkproxy.spark_version` параметрі тапсырмаларды орындау үшін Spark нұсқасын анықтайды.

    - `maintenance` — Cron пішіміндегі техникалық қызмет көрсету басталатын уақыт.

    - `warehouses` — [деректер көздеріне](https://cloud.vk.com/docs/ru/data-platform/spark/concepts/parameters#parameters_data_sources) қосылымдар.

- `pod_groups` — кластердің есептеу ресурстары топтары:

    - `sparkconnect` — деректерді интерактивті өңдеуге арналған ресурстар.
    - `sparkhistory` — Spark тапсырмаларының тарихын сақтауға арналған ресурстар.

## {heading(2. (Опционалды) VK Data Platform платформасындағы Spark сервисін деректер көзі арқылы анықтаңыз)[id=product]}

VK Data Platform платформасындағы Spark сервисін сипаттау үшін Terraform конфигурациясының `product.tf` файлын жасаңыз:

```hcl
data "vkcs_dataplatform_product" "spark" {
  product_name = "spark"
  product_version = "3.5.1"
}
```

Бұл деректер көзін пайдалану конфигурацияны икемдірек етуге мүмкіндік береді.
Сіз `main.tf` файлында `data.vkcs_dataplatform_product.spark.product_name` және `data.vkcs_dataplatform_product.spark.product_version` мәндеріне сілтеме жасай аласыз.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/dataplatform_product.md).

## {heading(3. (Опционалды) Кластер үшін желілік инфрақұрылым сипаттамасы бар файлды жасаңыз)[id=network]}

Кластерге арналған желілік инфрақұрылым сипаттамасы бар Terraform конфигурациясының `network.tf` файлын жасаңыз:

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

{tab(Жаңа желіні жасау)}

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

## {heading(4. (Опционалды) Spark-ке қосылу үшін дерекқор сипаттамасы бар файлды жасаңыз)[id=db]}

Spark қосылатын дерекқорды сипаттау үшін Terraform конфигурациясының `db.tf` файлын жасаңыз:

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

## {heading(5. Terraform көмегімен қажетті ресурстарды жасаңыз)[id=terraform_apply]}

1. Terraform конфигурациясы файлдарын бір директорияға орналастырыңыз:

    - `vkcs_provider.tf`;
    - `main.tf`;
    - `product.tf` (егер жасалған болса);
    - `network.tf` (егер жасалған болса);
    - `db.tf` (егер жасалған болса).

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

## {heading(6. Конфигурацияның қолданылуын тексеріңіз)[id=check_deployment]}

Spark кластерінің сәтті жасалғанына көз жеткізіңіз:

1. VK Cloud [жеке кабинетіне](https://cloud.vk.com/app/) өтіңіз.
1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз. Spark кластерінің жасалғанына және белсенді екеніне көз жеткізіңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=cleanup]}

Егер Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурациясы файлдары бар директорияға өтіңіз.
1. Келесі команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растауды сұрағанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.
