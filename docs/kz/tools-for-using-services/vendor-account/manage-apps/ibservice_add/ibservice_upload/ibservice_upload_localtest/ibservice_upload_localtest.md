# {heading(Terraform манифесін жергілікті тестілеу)[id=ibservice_upload_localtest]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Жергілікті тестілеуден бұрын OpenStack PID жеткізушілер тізіміне енгізілгеніне көз жеткізіңіз (көбірақ білу үшін — {linkto(../ibservice_upload_prepare#ibservice_upload_prepare)[text=%text]} бөлімін қараңыз).

Жергілікті тестілеу кезінде бар желілердің ішкі желілерін (подсетей) пайдаланыңыз немесе жаңа желі жасап, оның ішкі желісін пайдаланыңыз (көбірақ білу үшін — [Желілер және ішкі желілер](/kz/networks/vnet/instructions/net) бөлімін қараңыз).

{note:err}

Сыртқы желілерді (мысалы, `ext-net` немесе `internet`) және олардың ішкі желілерін пайдалануға тыйым салынады.

{/note}

Terraform манифесін `plans/<PLAN_NAME>/deployment/deploy.tf` жергілікті тестілеу үшін:

1. Terraform-ды жергілікті орнатыңыз:

   1. Terraform-ды [{var(cloud)} ресми айнасынан](https://hashicorp-releases.mcs.mail.ru/terraform) жүктеп алыңыз.
   1. Мұрағатты тағып, `Path` орта айнымалысында тағылған файлға жолды көрсетіңіз.
   1. Terraform сәтті орнатылғанын тексеру үшін `terraform -help` командасын орындаңыз.

1. Бұлттық платформаның ЖК-сында (жеке кабинет) екі факторлы аутентификацияны (2FA) және API арқылы қолжетімділікті қосыңыз (көбірақ білу үшін — [2FA басқару](/kz/access/iam/instructions/manage-2fa) бөлімін қараңыз).
1. Terraform үшін CLI конфигурация файлын өңдеңіз: Windows үшін — `terraform.rc`, басқа ОС үшін — `.terraformrc` (көбірақ — [Terraform ресми құжаттамасында](https://developer.hashicorp.com/terraform/cli/config/config-file)):

   1. Terraform-ды айналармен (зеркалалармен) және жергілікті жеткізушілермен бір мезгілде жұмыс істеуі үшін келесі ақпаратты қосыңыз:

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

   1. Terraform-ды айналармен және жергілікті жеткізушілермен бір мезгілде жұмыс істеуі қажет болмаса, файлды тазалаңыз.
   1. Жергілікті компьютерде мұндай файл болмаса, бұл қадамды өткізіп жіберіңіз.

1. VK CS жеткізушісінің плагинін [GitHub](https://github.com/vk-cs/terraform-provider-vkcs/releases) сайтынан жүктеп алыңыз.
1. iVK CS жеткізушісінің плагинін алу үшін [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) мекенжайына хат жіберіңіз. Хатта манифесті жергілікті тестілейтін компьютердің ОС-ын және оның архитектурасын көрсетіңіз (мысалы, amd64 архитектурасындағы Linux).
1. Terraform үшін CLI конфигурациясының файлы жергілікті компьютерде болмаса немесе ол тазаланған болса, null жеткізушісінің плагинін [Terraform ресми сайтынан](https://hashicorp-releases.mcs.mail.ru/terraform-provider-null/) жүктеп алыңыз.

   {note:info}

   Terraform үшін CLI конфигурация файлында айналармен және жергілікті жеткізушілермен бір мезгілде жұмыс істеу теңшелген болса, Terraform null жеткізушісінің плагинін автоматты түрде жүктеп алады.

   {/note}
1. `terraform.d` каталогында `plugins` каталогын жасаңыз. `terraform.d` каталогы Terraform орнатылғаннан кейін компьютерде автоматты түрде жасалады, оның жолы ОС-ға байланысты (көбірақ — [Terraform ресми құжаттамасында](https://developer.hashicorp.com/terraform/cli/config/config-file#implied-local-mirror-directories)).
1. `plugins` каталогында келесі каталогтар құрылымын жасаңыз:

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

   * `<PROVIDER_VERSION>` — жеткізуші плагиннің нұсқасы. Мән плагин файлының атынан анықталады. Мысалы, `terraform-provider-vkcs_0.4.2` плагині үшін нұсқа `0.4.2` тең, `terraform-provider-null_v3.2.1_x5` плагині үшін — `3.2.1`.
   * `<OPERATING_SYSTEM>` — компьютердің ОС-ы. Мәнді анықтау үшін `terraform --version` командасын орындаңыз. Команда шығысында Terraform-дың ағымдағы нұсқасы және архитектурасы бар ОС көрсетіледі.

      {caption(Жауап мысалы)[align=left;position=above]}
      ```console
      Terraform v1.5.4
      on linux_amd64
      ```
      {/caption}

      Жоғарыда келтірілген мысалда `<OPERATING_SYSTEM>` мәні `linux_amd64` тең.

1. Жүктелген жеткізушілердің плагиндерін сәйкес `<OPERATING_SYSTEM>` каталогтарына орналастырыңыз.

   {caption(`/home/user_name/.terraform.d/plugins` каталогының құрылымының мысалы, amd64 архитектурасындағы Linux ОС үшін)[align=left;position=above]}
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
1. Манифестті тестілеу үшін жұмыс каталогын жасаңыз.
1. Жұмыс каталогында `auth.tf` файлын жасаңыз.
1. `auth.tf` файлында пайдаланылатын жеткізушілерді сипаттаңыз.

   1. VK CS және iVK CS жеткізушілерін көрсетіңіз. Terraform үшін CLI конфигурациясының файлы жергілікті компьютерде болмаса немесе ол тазаланған болса, қосымша null жеткізушісін көрсетіңіз.

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

   1. VK CS және iVK CS жеткізушілері үшін манифесті тестілейтін бұлттық платформаның аккаунты мен жобасы туралы ақпаратты көрсетіңіз:

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
          auth_url = "https://cloud.vk.ru/infra/identity/v3/"
          user_domain_name = "users"
          username = "USER_NAME"
          password = "PASSWORD"
          project_id = "OPENSTACK_PROJECT_ID"
          region = "RegionOne"
          # URL сервиса Infra API
          infra_url = "https://cloud.vk.ru/marketplace/api/infra-api/api/v1/"
      }
      ```

      Аккаунт пен жоба туралы ақпарат бұлттық платформаның ЖК-сында көрсетіледі.

1. `plans/<PLAN_NAME>/deployment/deploy.tf` файлын жұмыс каталогына көшіріңіз.
1. Жергілікті тестілеу үшін `deploy.tf` манифесінде сипатталмаған қосымша нысандарды жасау қажет болса (мысалы, сыртқы IP бар ВМ), жұмыс каталогында `extended.tf` файлын жасаңыз.
1. `extended.tf` файлында жеткізушілердің ресурстары мен деректер көздерін пайдалана отырып, қосымша нысандарды сипаттаңыз.
1. Жұмыс каталогында жеткізушілерді инициализациялау үшін `terraform init` командасын орындаңыз.
1. Жұмыс каталогында `deploy.tf` және `extended.tf` файлдарында сипатталған ресурстарды жасауды бастау үшін `terraform apply` командасын орындаңыз.
1. Ресурстарды жасауды растау үшін `yes` енгізіңіз.
1. Манифесттер орындалу аяқталғаннан кейін бұлттық платформаның ЖК-сына кіріп, ресурстар жасалғанына көз жеткізіңіз.