## Подготовка к работе

1. Установите Terraform c официального [зеркала](https://hashicorp-releases.mcs.mail.ru/terraform) от VK Cloud.
1. Создайте конфигурационный файл зеркала провайдера и разместите его в каталоге.

    <tabs>
    <tablist>
    <tab>Windows</tab>
    <tab>Другие ОС</tab>
    </tablist>
    <tabpanel>

    1. Создайте файл `terraform.rc`.
    1. Добавьте в него блок кода.

        ```yaml
        provider_installation {
            network_mirror {
                url = "https://terraform-mirror.mcs.mail.ru"
                include = ["registry.terraform.io/*/*"]
            }
            direct {
                exclude = ["registry.terraform.io/*/*"]
            }
        }
        ```

    1. Вставьте `%APPDATA%` в адресную строку проводника Windows и скопируйте в открывшийся каталог файл `terraform.rc`.

    </tabpanel>
    <tabpanel>

    1. Создайте файл `.terraformrc`.
    1. Добавьте в него блок кода.

        ```yaml
        provider_installation {
            network_mirror {
                url = "https://terraform-mirror.mcs.mail.ru"
                include = ["registry.terraform.io/*/*"]
            }
            direct {
                exclude = ["registry.terraform.io/*/*"]
            }
        }
        ```

    1. Скопируйте файл в корень директории пользователя.

    </tabpanel>
    </tabs>

1. Создайте файл `main.tf` и опишите в нем необходимые terraform-провайдеры. Файл состоит из блоков:

    - `required_providers` — список используемых провайдеров. Укажите провайдер `vkcs`, его источник и версии. Если вы собираетесь использовать дополнительные провайдеры, добавьте их в данном блоке.

    ```bash
    terraform {
        required_providers {
            vkcs = {
                source = "vk-cs/vkcs"
            }
        }
    }
    ```

    - `provider "vkcs"` — настройки для провайдера от VK Cloud. Укажите значения параметров из [Настроек проекта](https://mcs.mail.ru/app/project/keys) личного кабинета. В поле `password` укажите пароль от вашей учетной записи.

    ```bash
    provider "vkcs" {
        username = "USER_NAME"
        password = "YOUR_PASSWORD"
        project_id = " 111111111111111111111111111"
        region = "RegionOne"
    }
    ```

## Настройка рабочей директории

В директории с файлом `main.tf` выполните команду:

```bash
terraform init
```

Будут созданы дополнительные файлы, необходимые для работы с Terraform.

## 2FA и доступ по API

[Настройте двухфакторную аутентификацию и активируйте доступ по API](https://mcs.mail.ru/app/account/security).

## Запуск

1. Выполните команду:

  ```bash
  terraform apply
  ```

  Команда `apply` применит вашу конфигурацию Terraform к ресурсам VK Cloud, указанным в файле `main.tf`.

2. Подтвердите создание ресурса, введя `yes` в окне терминала.
