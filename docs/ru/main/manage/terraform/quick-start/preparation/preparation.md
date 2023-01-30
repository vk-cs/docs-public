## Установка Terraform

Для установки исполняемых файлов Terraform, используйте официальное [зеркало](https://hub.mcs.mail.ru/repository/terraform-binary/mirror/latest/) от VK Cloud.

## Файлы настройки провайдеров

Для начала работы с Terraform создайте файл `main.tf` и опишите в нем необходимые terraform-провайдеры. Это описание указывает Terraform, куда и с какими учетными данными подключаться для создания необходимых ресурсов.

Вы можете скачать уже заполненный `main.tf` в [личном кабинете](https://mcs.mail.ru/app/project/terraform/).
Первый блок terraform описывает какие провайдеры нужны (`required_providers`). Внутри указан провайдер `vkcs`, его источник и версии. Если вы собираетесь использовать дополнительные провайдеры, добавьте их в данном блоке.

```bash
terraform {
    required_providers {
        vkcs = {
            source = "vk-cs/vkcs"
        }
    }
}
```

Блок `provider "vkcs"` описывает настройки для провайдера от VK Cloud. Все необходимые поля уже заполнены. Укажите `user_name` и `password` для личного кабинета, остальные поля оставьте без изменений.

```bash
provider "vkcs" {
    username = "USER_NAME"
    password = "YOUR_PASSWORD"
    project_id = " 111111111111111111111111111"
    region = "RegionOne"
}
```
