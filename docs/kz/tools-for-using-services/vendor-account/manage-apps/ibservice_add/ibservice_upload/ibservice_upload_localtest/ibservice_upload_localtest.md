# {heading(Terraform манифесін жергілікті тестілеу)[id=ibservice_upload_localtest]}

{include(/kz/_includes/_translated_by_ai.md)}

Жергілікті тестілеу алдында OpenStack PID жеткізушілер тізіміне енгізілгеніне көз жеткізіңіз (толығырақ — {linkto(../ibservice_upload_prepare#ibservice_upload_prepare)[text=%text]} бөлімінде).

Жергілікті тестілеу кезінде қолданыстағы желілердің ішкі желілерін пайдаланыңыз немесе жаңа желі құрып, оның ішкі желісін пайдаланыңыз (толығырақ — [Желілер және ішкі желілер](/kz/networks/vnet/instructions/net) бөлімінде).

{note:err}

Сыртқы желілерді (мысалы, `ext-net` немесе `internet`) және олардың ішкі желілерін пайдалануға тыйым салынады.

{/note}

Terraform `plans/<PLAN_NAME>/deployment/deploy.tf` манифесін жергілікті тестілеу үшін:

1. Terraform-ды жергілікті түрде орнатыңыз:

   1. Terraform-ды [{var(cloud)} ресми айнасынан](https://hashicorp-releases.mcs.mail.ru/terraform) жүктеп алыңыз.
   1. Архивті шығарып, `Path` орта айнымалысында шығарылған файлға жолды көрсетіңіз.
   1. Terraform сәтті орнатылғанына көз жеткізу үшін `terraform -help` пәрменін орындаңыз.

1. Бұлтты платформаның ЖК-сінде екі факторлы аутентификацияны (2FA) және API арқылы қолжетімділікті қосыңыз (толығырақ — [2FA басқару](/kz/access/iam/instructions/manage-2fa) бөлімінде).
1. Terraform үшін CLI конфигурациясы бар файлды өңдеңіз: Windows үшін — `terraform.rc`, басқа ОЖ үшін — `.terraformrc` (толығырақ — [Terraform ресми құжаттамасында](https://developer.hashicorp.com/terraform/cli/config/config-file)):

   1. Terraform айналармен және жергілікті провайдерлермен бір уақытта жұмыс істеуі үшін келесі ақпаратты қосыңыз:

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

   1. Terraform-ның айналармен және жергілікті провайдерлермен бір уақытта жұмыс істеуі талап етілмесе, файлды тазалаңыз.
   1. Егер жергілікті компьютерде мұндай файл болмаса, бұл қадамды өткізіп жіберіңіз.

1. VK CS провайдерінің плагинін [GitHub](https://github.com/vk-cs/terraform-provider-vkcs/releases) арқылы жүктеп алыңыз.
1. iVK CS провайдерінің плагинін алу үшін [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) мекенжайына хат жіберіңіз. Хатта манифесті жергілікті түрде тестілейтін компьютердің ОЖ-сін және оның архитектурасын көрсетіңіз (мысалы, amd64 архитектурасындағы Linux).
1. Егер Terraform үшін CLI конфигурациясы бар файл жергілікті компьютерде болмаса немесе ол тазартылған болса, null провайдерінің плагинін [Terraform ресми сайтынан](https://hashicorp-releases.mcs.mail.ru/terraform-provider-null/) жүктеп алыңыз.

   {note:info}

   Егер Terraform үшін CLI конфигурациясы бар файлда айналармен және жергілікті провайдерлермен бір уақытта жұмыс істеу бапталған болса, Terraform null провайдерінің плагинін автоматты түрде жүктеп алады.

   {/note}
1. `terraform.d` директориясында `plugins` директориясын жасаңыз. `terraform.d` директориясы компьютерде Terraform орнатылғаннан кейін автоматты түрде жасалады, оның жолы ОЖ-ге байланысты (толығырақ — [Terraform ресми құжаттамасында](https://developer.hashicorp.com/terraform/cli/config/config-file#implied-local-mirror-directories)).
1. `plugins` директориясында келесі директория құрылымын жасаңыз:

   * `ivk-cs.local`.

      * `ivk-cs`.

         * `ivkcs`.

            * `<PROVIDER_VERSION>`.

               * `<OPERATING_SYSTEM>`.

   * `registry.terraform.io`.

      * `hashicorp`.

         * `null`.

            * `<PROVIDER_VERSION>`.

               * `<OPERATING_SYSTEM>`.

   * `vk-cs.local`.

      * `vk-cs`.

         * `vkcs`.

            * `<PROVIDER_VERSION>`.

               * `<OPERATING_SYSTEM>`.

   Мұнда:

   * `<PROVIDER_VERSION>` — провайдер плагинінің нұсқасы. Мәні плагин файлының атауынан анықталады. Мысалы, `terraform-provider-vkcs_0.4.2` плагині үшін нұсқа `0.4.2`, ал `terraform-provider-null_v3.2.1_x5` плагині үшін — `3.2.1`.
   * `<OPERATING_SYSTEM>` — компьютердің ОЖ-сі. Мәнді анықтау үшін `terraform --version` пәрменін орындаңыз. Пәрмен шығысында Terraform-ның ағымдағы нұсқасы және архитектурасы бар ОЖ көрсетіледі.

      {caption(Жауап мысалы)[align=left;position=above]}
      ```console
      Terraform v1.5.4
      on linux_amd64
      ```
      {/caption}

      Жоғарыдағы мысалда `<OPERATING_SYSTEM>` мәні `linux_amd64` болады.

1. Жүктелген провайдерлердің плагиндерін тиісті `<OPERATING_SYSTEM>` директорияларына орналастырыңыз.

   {caption(amd64 архитектурасындағы Linux ОЖ үшін `/home/user_name/.terraform.d/plugins` директориясы құрылымының мысалы)[align=left;position=above]}
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
   {/caption}
1. Манифесті тестілеу үшін жұмыс директориясын жасаңыз.
1. Жұмыс директориясында `auth.tf` файлын жасаңыз.
1. `auth.tf` файлында пайдаланылатын провайдерлерді сипаттаңыз.

   1. VK CS және iVK CS провайдерлерін көрсетіңіз. Егер Terraform үшін CLI конфигурациясы бар файл жергілікті компьютерде болмаса немесе ол тазартылған болса, қосымша түрде null провайдерін де көрсетіңіз.

      ```hcl
      terraform {
          required_providers {
              vkcs = {
                  # Путь локального плагина провайдера. Указывается часть пути после terraform.d/plugins
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

   1. VK CS және iVK CS провайдерлері үшін манифесті тестілейтін бұлтты платформадағы аккаунт пен жоба туралы ақпаратты көрсетіңіз:

      ```hcl
      provider "vkcs" {
          # User Domain ID
          user_domain_name = "users"
          username = "USER_NAME"
          password = "PASSWORD"
          project_id = "PROJECT_ID"
          # Region Name
          region = "RegionOne"
      }

      provider "ivkcs" {
          # URL компонента Keystone облачной платформы
          auth_url = "https://cloud.vk.com/infra/identity/v3/"
          user_domain_name = "users"
          username = "USER_NAME"
          password = "PASSWORD"
          project_id = "OPENSTACK_PROJECT_ID"
          region = "RegionOne"
          # URL сервиса Infra API
          infra_url = "https://cloud.vk.com/marketplace/api/infra-api/api/v1/"
      }
      ```

      Аккаунт пен жоба туралы ақпарат бұлтты платформаның ЖК-сінде көрсетіледі.

1. `plans/<PLAN_NAME>/deployment/deploy.tf` файлын жұмыс директориясына көшіріңіз.
1. Егер жергілікті тестілеу үшін `deploy.tf` манифесінде сипатталмаған қосымша мәндерді құру қажет болса (мысалы, сыртқы IP бар ВМ), онда жұмыс директориясында `extended.tf` файлын жасаңыз.
1. `extended.tf` файлында провайдерлердің ресурстары мен деректер көздерін пайдаланып қосымша мәндерді сипаттаңыз.
1. Жұмыс директориясында провайдерлерді инициализациялау үшін `terraform init` пәрменін орындаңыз.
1. Жұмыс директориясында `deploy.tf` және `extended.tf` файлдарында сипатталған ресурстарды құруды іске қосу үшін `terraform apply` пәрменін орындаңыз.
1. Ресурстарды құруды растау үшін `yes` енгізіңіз.
1. Манифестер орындалғаннан кейін бұлтты платформаның ЖК-сіне өтіп, ресурстардың құрылғанына көз жеткізіңіз.
