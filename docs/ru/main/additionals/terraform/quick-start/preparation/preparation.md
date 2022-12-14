## Установка Terraform

Для установки исполняемых файлов Terraform, используйте официальное [зеркало](https://hub.mcs.mail.ru/repository/terraform-binary/mirror/latest/) от VK Cloud.

## Файлы настройки провайдеров

Для начала работы с Terraform создайте файл `main.tf` и опишите в нем необходимые terraform-провайдеры. Это описание указывает Terraform, куда и с какими учетными данными подключаться для создания необходимых ресурсов

Вы можете скачать уже заполненный `main.tf` в [личном кабинете](https://mcs.mail.ru/app/project/terraform/).
Первый блок terraform описывает какие провайдеры нужны (`required_providers`). Внутри указаны два провайдера `openstack` и `mcs`, их источник и версии. Если вы собираетесь использовать дополнительные провайдеры, добавьте их в данном блоке.

``` bash
terraform {
    required_providers {
        openstack = {
            source = "terraform-provider-openstack/openstack"
            version = "1.33.0"
        }
        
        mcs = {
            source = "MailRuCloudSolutions/mcs"
        }
    }
}

```

В блоке `provider "openstack"` указаны настройки для провайдера `openstack`. Инфраструктура VK Cloud Solutions построена на `openstack`. Этот провайдер используется для создания сетей, балансеров и других компонентов. Укажите `user_name` и `password` для личного кабинета, остальные поля оставьте без изменений.

``` bash
provider "openstack" {
    user_name = "USER_NAME"
    password = "YOUR_PASSWORD"
    tenant_id = "111111111111111111111111111"
    user_domain_id = "users"
    auth_url = "https://infra.mail.ru:35357/v3/"
    use_octavia = true
    region = "RegionOne"
}
```

Блок `provider "mcs"` описывает настройки для провайдера от VK Cloud Solutions. Все необходимые поля уже заполнены. Укажите `user_name` и `password` для личного кабинета, остальные поля оставьте без изменений.

``` bash
provider "mcs" {
    username = "USER_NAME"
    password = "YOUR_PASSWORD"
    project_id = " 111111111111111111111111111"
    region = "RegionOne"
}
```
