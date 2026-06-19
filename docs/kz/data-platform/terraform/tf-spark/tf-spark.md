# {heading(Spark кластерін жасау)[id=tf_spark]}

{include(/kz/_includes/_translated_by_ai.md)}

Сіз Terraform көмегімен {var(data-p)} ішінде Cloud Spark кластерін және онымен байланысты инфрақұрылымды автоматты түрде өрістете аласыз.
Ол үшін кластерді және басқа ресурстарды конфигурация файлдарында сипаттап, конфигурацияны қолданыңыз.

Кластерді жасау кезінде мыналар пайдаланылады:

- [vkcs_dataplatform_cluster](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/dataplatform_cluster.md) ресурсы;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) ресурсы;
- [vkcs_networking_subnet](http://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) ресурсы;
- [vkcs_db_instance](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_instance.md) ресурсы;
- [vkcs_db_database](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_database.md) ресурсы;
- [vkcs_db_user](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/db_user.md) ресурсы;
- [vkcs_dataplatform_product](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/dataplatform_product.md) деректер көзі;
- [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) деректер көзі.

## {heading(Дайындық қадамдары)[id=preparation]}

1. Егер бұл әлі жасалмаса, [Terraform-ды орнатып, ортаны баптаңыз](../quick_start).

1. `vkcs_provider.tf` файлында провайдердің 0.7.0 немесе одан жоғары нұсқасы көрсетілгеніне көз жеткізіңіз. Егер провайдер нұсқасы төмен болса, [провайдерді жаңартыңыз](../quick_start#obnovlenie_terraform).

## {heading(1. Кластер сипаттамасы бар файл жасаңыз)[id=cluster_config]}

Кластерді сипаттайтын Terraform `main.tf` конфигурация файлын жасаңыз.
`main.tf` файлының мысалы:

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

- `network_id` — кластерді орналастыруға арналған желі идентификаторы. Қолданыстағы желіні пайдалануға немесе жаңасын жасауға болады.

  {cut(network_id көрсету мысалдары)}

    - `network_id = vkcs_networking_network.default.id` — кластер бар желіде орналастырылады, оның идентификаторы `vkcs_networking_network` ресурсынан алынады, оны сіз бөлек [жасай аласыз](#network).
    - `network_id = data.vkcs_networking_network.default.id` — кластер бар желіде орналастырылады, оның идентификаторы [деректер көзінен](#network) `vkcs_networking_network` алынады, оны сіз бөлек [жасай аласыз](#network).
    - `network_id = <UUID_СЕТИ>` – кластер көрсетілген UUID бойынша бар желіде орналастырылады.

  {/cut}

- `product_name` — Cloud Spark сервисінің атауы.

  {cut(product_name көрсету мысалдары)}

    - `product_name = "spark"` — тікелей кластер конфигурациясында көрсетіледі.
    - `product_name = data.vkcs_dataplatform_product.spark.product_name` — `vkcs_dataplatform_product` деректер көзінен алынады, оны сіз бөлек [жасай аласыз](#product).

  {/cut}

- `product_version` — Cloud Spark сервисінің нұсқасы.

  {cut(product_version көрсету мысалдары)}

    - `product_version = "3.5.1"` — тікелей кластер конфигурациясында көрсетіледі.
    - `product_version = data.vkcs_dataplatform_product.spark.product_version` — `vkcs_dataplatform_product` деректер көзінен алынады, оны сіз бөлек [жасай аласыз](#product).

  {/cut}

- `availability_zone` — кластер жасалатын қолжетімділік аймағы.

- `configs` — кластер конфигурациясының параметрлері:

    - `settings` — жалпы параметрлер. `sparkproxy.spark_version` параметрі тапсырмаларды орындауға арналған Spark нұсқасын анықтайды.

    - `maintenance` — Cron форматындағы техникалық қызмет көрсету басталатын уақыт.

    - `warehouses` — деректер көздеріне қосылымдар.

- `pod_groups` — кластердің есептеу ресурстарының топтары:

    - `sparkconnect` — деректерді интерактивті өңдеуге арналған ресурстар.
    - `sparkhistory` — Spark тапсырмаларының тарихын сақтауға арналған ресурстар.

Параметрлердің толық сипаттамасы — [Terraform провайдері құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/resources).

## {heading(2. (Опционалды) Cloud Spark сервисін деректер көзі арқылы анықтаңыз)[id=product]}

Cloud Spark сервисінің сипаттамасы бар Terraform `product.tf` конфигурация файлын жасаңыз:

```hcl
data "vkcs_dataplatform_product" "spark" {
  product_name = "spark"
  product_version = "3.5.1"
}
```

Бұл деректер көзін пайдалану конфигурацияны неғұрлым икемді етуге мүмкіндік береді.
Сіз `main.tf` ішінде `data.vkcs_dataplatform_product.spark.product_name` және `data.vkcs_dataplatform_product.spark.product_version` мәндеріне сілтеме жасай аласыз.

Параметрлердің толық сипаттамасы — [Terraform провайдері құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/dataplatform_product.md).

## {heading(3. (Опционалды) Кластерге арналған желілік инфрақұрылым сипаттамасы бар файл жасаңыз)[id=network]}

Кластерге арналған желілік инфрақұрылым сипаттамасы бар Terraform `network.tf` конфигурация файлын жасаңыз:

{tabs}

{tab(Қолданыстағы желінің сипаттамасы)}

Жобада бар желіге арналған деректер көзінің сипаттамасының мысалы:

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

Параметрлердің толық сипаттамасы — [Terraform провайдері құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/resources).

## {heading(4. (Опционалды) Cloud Spark-ке қосылуға арналған дерекқор сипаттамасы бар файл жасаңыз)[id=db]}

Cloud Spark қосылатын дерекқорды сипаттау үшін Terraform `db.tf` конфигурация файлын жасаңыз:

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

Параметрлердің толық сипаттамасы — [Terraform провайдері құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/resources).

## {heading(5. Terraform көмегімен ресурстарды жасаңыз)[id=terraform_apply]}

1. Terraform конфигурация файлдарын бір директорияға орналастырыңыз:

    - `vkcs_provider.tf`;
    - `main.tf`;
    - `product.tf` (егер жасалса);
    - `network.tf` (егер жасалса);
    - `db.tf` (егер жасалса).

1. Конфигурация файлдары бар директорияға өтіңіз.
1. Конфигурацияның дұрыстығын тексеріңіз:

   ```console
   terraform validate && terraform plan
   ```

1. Өзгерістерді қолданыңыз:

   ```console
   terraform apply
   ```

   Растауды сұрағанда, `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## {heading(6. Конфигурацияның қолданылуын тексеріңіз)[id=check_deployment]}

Spark кластері жасалғанына көз жеткізіңіз:

1. {var(data-p)} жеке кабинетіне өтіңіз.
1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз. Spark кластерінің жасалғанына және белсенді екеніне көз жеткізіңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=cleanup]}

Егер Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары бар директорияға өтіңіз.
1. Келесі команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растауды сұрағанда, `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.
