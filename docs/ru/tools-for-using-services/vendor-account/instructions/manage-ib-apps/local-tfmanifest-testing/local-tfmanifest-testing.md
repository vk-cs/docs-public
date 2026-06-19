Чтобы локально протестировать манифест Terraform, описывающий облачную инфраструктуру для вашего image-based приложения и порядок ее развертывания:

1. Подготовьте [сеть и подсеть](/ru/networks/vnet/instructions/net): используйте подсети существующих сетей или создайте новую сеть и используйте ее подсеть.

   {note:err}

   Запрещено использовать для локального тестирования внешние сети (например, `ext-net` или `internet`) и их подсети.

   {/note}

1. Установите Terraform локально:

   1. Скачайте Terraform с [официального зеркала VK Cloud](https://hashicorp-releases.mcs.mail.ru/terraform).
   1. Распакуйте архив и в переменной среды `Path` укажите путь к распакованному файлу.
   1. Выполните команду `terraform -help`, чтобы убедиться в успешной установке Terraform.

1. [Активируйте](/ru/tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate) доступ по API.
1. Отредактируйте файл с конфигурацией CLI для Terraform: для Windows — `terraform.rc`, для других ОС — `.terraformrc`.

   1. Чтобы Terraform одновременно работал с зеркалами и локальными провайдерами, добавьте следующую информацию:

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

   1. Если не требуется, чтобы Terraform одновременно работал с зеркалами и локальными провайдерами, очистите содержимое файла.
   1. Если на локальном компьютере такого файла нет, пропустите этот шаг.

   Подробнее — [в официальной документации Terraform](https://developer.hashicorp.com/terraform/cli/config/config-file).

1. Скачайте плагин провайдера VK CS c [GitHub](https://github.com/vk-cs/terraform-provider-vkcs/releases).
1. Отправьте письмо на [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com), чтобы получить плагин провайдера iVK CS. В письме укажите ОС компьютера, на котором вы будете локально тестировать манифест, и архитектуру ОС. Пример: Linux на архитектуре amd64.
1. Если файла с конфигурацией CLI для Terraform нет на локальном компьютере или он был очищен, скачайте плагин провайдера Null c [официального сайта Terraform](https://hashicorp-releases.mcs.mail.ru/terraform-provider-null/).

   {note:info}

   Если в файле с конфигурацией CLI для Terraform настроена одновременная работа с зеркалами и локальными провайдерами, Terraform скачает плагин провайдера Null автоматически.

   {/note}

1. В директории `terraform.d` создайте директорию `plugins`. Директория `terraform.d` создается на компьютере автоматически после установки Terraform, ее путь зависит от ОС. Подробнее — [в официальной документации Terraform](https://developer.hashicorp.com/terraform/cli/config/config-file#implied-local-mirror-directories).
1. В директории `plugins` создайте следующую структуру директорий:

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

   Здесь:

   - `<ВЕРСИЯ_ПЛАГИНА>` — версия плагина провайдера. Значение определяется из имени файла плагина. Например, для плагина `terraform-provider-vkcs_0.4.2` версия равна `0.4.2`, для плагина `terraform-provider-null_v3.2.1_x5` — `3.2.1`.
   - `<ОС>` — ОС компьютера. Чтобы определить значение, выполните команду `terraform --version`. В выводе команды отображается текущая версия Terraform и название ОС с архитектурой.

      Пример ответа команды:

      ```console
      Terraform v1.5.4
      on linux_amd64
      ```

      В этом примере значение `<ОС>` равно `linux_amd64`.

1. Поместите скачанные плагины провайдеров в соответствующие директории `<ОС>`.

   Пример структуры директории `/home/user_name/.terraform.d/plugins` для ОС Linux на архитектуре amd64:

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

1. Создайте рабочую директорию для тестирования манифеста.
1. В рабочей директории создайте файл `auth.tf`.
1. В файле `auth.tf` опишите используемые провайдеры.

   1. Укажите провайдеры VK CS и iVK CS. Если файла с конфигурацией CLI для Terraform нет на локальном компьютере или он был очищен, дополнительно укажите провайдер Null.

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

   1. Для провайдеров VK CS и iVK CS укажите информацию об аккаунте и проекте VK Cloud, от имени которых вы будете тестировать манифест:

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
          auth_url = "https://cloud.vk.com/infra/identity/v3/"
          user_domain_name = "users"
          username = "<ИМЯ_ПОЛЬЗОВАТЕЛЯ>"
          password = "<ПАРОЛЬ>"
          project_id = "<ИДЕНТИФИКАТОР_ПРОЕКТА>"
          region = "RegionOne"
          # URL сервиса Infra API
          infra_url = "https://cloud.vk.com/marketplace/api/infra-api/api/v1/"
      }
      ```

      Здесь:

      - `<ИДЕНТИФИКАТОР_ПРОЕКТА>` — идентификатор проекта (Project ID), который вы указали в письме на [этапе подготовки](../../manage-ib-apps/ib-add#preparatory_steps).
      - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя этого проекта VK Cloud.
      - `<ПАРОЛЬ>` — пароль пользователя.

1. Скопируйте файл `plans/<ИМЯ_ПЛАНА>/deployment/deploy.tf` в рабочую директорию.
1. Если для локального тестирования требуется создать дополнительные сущности, которые не описаны в манифесте `deploy.tf` (например, ВМ с внешним IP):

   1. В рабочей директории создайте файл `extended.tf`.
   1. В файле `extended.tf` опишите дополнительные сущности с использованием ресурсов и источников данных провайдеров.

1. Чтобы инициализировать провайдеры, в рабочей директории выполните команду `terraform init`.
1. Чтобы запустить создание ресурсов, описанных в файлах `deploy.tf` и `extended.tf`, в рабочей директории выполните команду `terraform apply`.
1. Чтобы подтвердить создание ресурсов, введите `yes`.
1. После завершения выполнения манифестов зайдите в личный кабинет VK Cloud и убедитесь, что ресурсы созданы.
