
{include(/kz/_includes/_translated_by_ai_kz.md)}

Image-based қосымшаңыз үшін бұлттық инфрақұрылымды сипаттайтын Terraform манифесін және оның орналастыру ретін жергілікті түрде тексеру үшін:

1. [Желі мен подсетті](/kz/networks/vnet/instructions/net) дайындаңыз: бар желілердің подсеттерін пайдаланыңыз немесе жаңа желі жасап, оның подсетін пайдаланыңыз.

   {note:err}

   Жергілікті тестілеу үшін сыртқы желілерді (мысалы, `ext-net` немесе `internet`) және олардың подсеттерін пайдалануға тыйым салынады.

   {/note}

1. Terraform-ды жергілікті түрде орнатыңыз:

   1. Terraform-ды [VK Cloud ресми зеркаласынан](https://hashicorp-releases.mcs.mail.ru/terraform) жүктеңіз.
   1. Архивті тарқатып, `Path` орта айнымалысында тарқатылған файлға жолды көрсетіңіз.
   1. Terraform сәтті орнатылғанын тексеру үшін `terraform -help` командасын орындаңыз.

1. [API арқылы қолжетімділікті](/kz/tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate) қосыңыз.
1. Terraform үшін CLI конфигурациясы файлын өңдеңіз: Windows үшін — `terraform.rc`, басқа ОС үшін — `.terraformrc`.

   1. Terraform-дың зеркалалармен және жергілікті провайдерлермен бір мезгілде жұмыс істеуі үшін келесі ақпаратты қосыңыз:

      ```hcl
      provider_installation {
          filesystem_mirror {
              # Полный путь до директории plugins
              path    = "/home/user_name/.terraform.d/plugins"
              include = ["vk-cs.local/*/*", "ivk-cs.local/*/*"]
          }

          network_mirror {
              url = "https://terraform-mirror.mcs.mail.ru"
              include = ["registry.terraform.io/*/*"]
          }

          direct {
              exclude = ["registry.terraform.io/*/*", "vk-cs.local/*/*", "ivk-cs.local/*/*"]
          }
      }
      ```

   1. Terraform-дың зеркалалармен және жергілікті провайдерлермен бір мезгілде жұмыс істеуі қажет болмаса, файлдың мазмұнын тазалаңыз.
   1. Егер мұндай файл жергілікті компьютер жоқ болса, бұл қадамды өткізіп жіберіңіз.

   Толығырақ — [Terraform ресми құжаттамасында](https://developer.hashicorp.com/terraform/cli/config/config-file).

1. VK CS провайдер плагинін [GitHub](https://github.com/vk-cs/terraform-provider-vkcs/releases) сайтынан жүктеңіз.
1. iVK CS провайдер плагинін алу үшін [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) мекенжайына хат жіберіңіз. Хатта манифесті жергілікті түрде тестілейтін компьютердің ОС-ын және ОС архитектурасын көрсетіңіз. Мысал: amd64 архитектурасындағы Linux.
1. Егер Terraform үшін CLI конфигурациясы файлы жергілікті компьютерде жоқ болса немесе ол тазартылған болса, Null провайдер плагинін [Terraform ресми сайтынан](https://hashicorp-releases.mcs.mail.ru/terraform-provider-null/) жүктеңіз.

   {note:info}

   Егер Terraform үшін CLI конфигурациясы файлында зеркалалармен және жергілікті провайдерлермен бір мезгілдегі жұмыс теңшелген болса, Terraform Null провайдер плагинін автоматты түрде жүктейді.

   {/note}

1. `terraform.d` директориясында `plugins` директориясын жасаңыз. `terraform.d` директориясы Terraform орнатылғаннан кейін компьютерде автоматты түрде жасалады, оның жолы ОС-қа байланысты. Толығырақ — [Terraform ресми құжаттамасында](https://developer.hashicorp.com/terraform/cli/config/config-file#implied-local-mirror-directories).
1. `plugins` директориясында келесі директориялар құрылымын жасаңыз:

   ```txt
       ├── ivk-cs.local
       │   └── ivk-cs
       │       └── ivkcs
       │           └── <ВЕРСИЯ_ПЛАГИНА>
       │               └── <ОС>
       ├── registry.terraform.io
       │   └── hashicorp
       │       └── null
       │           └── <ВЕРСИЯ_ПЛАГИНА>
       │               └── <ОС>
       └── vk-cs.local
           └── vk-cs
               └── vkcs
                   └── <ВЕРСИЯ_ПЛАГИНА>
                       └── <ОС>
   ```

   Мұнда:

   - `<ВЕРСИЯ_ПЛАГИНА>` — провайдер плагиннің нұсқасы. Мән плагин файлының атынан анықталады. Мысалы, `terraform-provider-vkcs_0.4.2` плагині үшін нұсқа `0.4.2` тең, `terraform-provider-null_v3.2.1_x5` плагині үшін — `3.2.1`.
   - `<ОС>` — компьютер ОС-ы. Мәнді анықтау үшін `terraform --version` командасын орындаңыз. Команда шығысында Terraform-дың ағымдағы нұсқасы және архитектурасы бар ОС атауы көрсетіледі.

      Команда жауабының мысалы:

      ```console
      Terraform v1.5.4
      on linux_amd64
      ```

      Осы мысалда `<ОС>` мәні `linux_amd64` тең.

1. Жүктелген провайдер плагиндерін сәйкес `<ОС>` директорияларына орналастырыңыз.

   amd64 архитектурасындағы Linux ОС үшін `/home/user_name/.terraform.d/plugins` директориясының құрылымының мысалы:

   ```txt
   /home/user_name/.terraform.d
   │
   └── plugins
       ├── ivk-cs.local
       │   └── ivk-cs
       │       └── ivkcs
       │           └── 0.0.4
       │               └── linux_amd64
       │                   └── terraform-provider-ivkcs_0.0.4
       ├── registry.terraform.io
       │   └── hashicorp
       │       └── null
       │           └── 3.2.1
       │               └── linux_amd64
       │                   └── terraform-provider-null_v3.2.1
       └── vk-cs.local
           └── vk-cs
               └── vkcs
                   └── 0.4.2
                       └── linux_amd64
                           └── terraform-provider-vkcs_0.4.2
   ```

1. Манифесті тестілеу үшін жұмыс директориясын жасаңыз.
1. Жұмыс директориясында `auth.tf` файлын жасаңыз.
1. `auth.tf` файлында пайдаланылатын провайдерлерді сипаттаңыз.

   1. VK CS және iVK CS провайдерлерін көрсетіңіз. Егер Terraform үшін CLI конфигурациясы файлы жергілікті компьютерде жоқ болса немесе ол тазартылған болса, қосымша Null провайдерін көрсетіңіз.

      ```hcl
      terraform {
          required_providers {
              vkcs = {
                  # Путь к локальному плагину провайдера. Указывается часть пути после terraform.d/plugins
                  source  = "vk-cs.local/vk-cs/vkcs"
                  # Версия провайдера
                  version = "0.2.2"
              }
              ivkcs = {
                  source  = "ivk-cs.local/ivk-cs/ivkcs"
                  version = "0.1.15"
              }
              null = {
                  source  = "registry.terraform.io/hashicorp/null"
                  version = "3.2.1"
              }
          }
      }
      ```

   1. VK CS және iVK CS провайдерлері үшін манифесті тестілейтін VK Cloud аккаунты мен жобасы туралы ақпаратты көрсетіңіз:

      ```hcl
      provider "vkcs" {
          # User Domain ID
          user_domain_name = "users"
          username = "<ИМЯ_ПОЛЬЗОВАТЕЛЯ>"
          password = "<ПАРОЛЬ>"
          project_id = "<ИДЕНТИФИКАТОР_ПРОЕКТА>"
          # Region Name
          region = "RegionOne"
      }

      provider "ivkcs" {
          # URL компонента Keystone платформы VK Cloud
          auth_url = "https://cloud.vk.ru/infra/identity/v3/"
          user_domain_name = "users"
          username = "<ИМЯ_ПОЛЬЗОВАТЕЛЯ>"
          password = "<ПАРОЛЬ>"
          project_id = "<ИДЕНТИФИКАТОР_ПРОЕКТА>"
          region = "RegionOne"
          # URL сервиса Infra API
          infra_url = "https://cloud.vk.ru/marketplace/api/infra-api/api/v1/"
      }
      ```

      Мұнда:

      - `<ИДЕНТИФИКАТОР_ПРОЕКТА>` — [дайындық кезеңінде](../../manage-ib-apps/ib-add#preparatory_steps) хатта көрсеткен жоба идентификаторы (Project ID).
      - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — осы VK Cloud жобасының пайдаланушы аты.
      - `<ПАРОЛЬ>` — пайдаланушы құпиясөзі.

1. `plans/<ИМЯ_ПЛАНА>/deployment/deploy.tf` файлын жұмыс директориясына көшіріңіз.
1. Егер жергілікті тестілеу үшін `deploy.tf` манифесінде сипатталмаған қосымша нысандар жасау қажет болса (мысалы, сыртқы IP бар ВМ):

   1. Жұмыс директориясында `extended.tf` файлын жасаңыз.
   1. `extended.tf` файлында провайдерлердің ресурстары мен деректер көздерін пайдалана отырып, қосымша нысандарды сипаттаңыз.

1. Провайдерлерді инициализациялау үшін жұмыс директориясында `terraform init` командасын орындаңыз.
1. `deploy.tf` және `extended.tf` файлдарында сипатталған ресурстарды жасауды бастау үшін жұмыс директориясында `terraform apply` командасын орындаңыз.
1. Ресурстарды жасауды растау үшін `yes` енгізіңіз.
1. Манифестердің орындалуы аяқталғаннан кейін VK Cloud жеке кабинетіне кіріп, ресурстар жасалғанына көз жеткізіңіз.