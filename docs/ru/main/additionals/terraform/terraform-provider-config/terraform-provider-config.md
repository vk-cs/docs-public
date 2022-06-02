Перед тем как приступить к настройке провайдера Terraform, необходимо [установить исполняемые файлы Terraform](https://mcs.mail.ru/docs/ru/additionals/terraform/terraform-installation).

Для начала работы с Terraform создайте файл зеркала провайдера и разместите его в каталоге.

<tabs>
<tablist>
<tab>Для Windows</tab>
<tab>Для других ОС</tab>
</tablist>
<tabpanel>

1. Создайте файл _terraform.rc_.
2. Добавьте в него нижеприведенный код.
3. Скопируйте файл в каталог `%APPDATA%`.
3. Откройте каталог, вставив `%APPDATA%` в адресную строку проводника Windows.

</tabpanel>
<tabpanel>

1. Создайте файл _.terraformrc_.
2. Добавьте в него нижеприведенный код.
3. Скопируйте файл в корень директории пользователя.

</tabpanel>
</tabs>

```yaml
provider_installation {
  network_mirror {
    url = "https://hub.mcs.mail.ru/repository/terraform-providers/"
    include = ["vk-cs/*"]
  }
  direct {
    exclude = ["vk-cs/*"]
  }
}
```
Далее для работы с Terraform скачайте уже заполненный файл _main.tf_ в [личном кабинете](https://mcs.mail.ru/app/project/terraform/) и опишите в нем необходимые провайдеры. Описание провайдеров указывает Terraform какие провайдеры нужно скачать, куда и с какими учетными данными подключаться для создания необходимых вам ресурсов.

Блок `terraform` описывает какие провайдеры нужны (required_providers). Внутри указаны два провайдера: `vkcs` и его источник. Если вы собираетесь использовать дополнительные провайдеры, добавьте их в блок.

``` yaml
terraform {
  required_providers {
    vkcs = {
      source = "vk-cs/vkcs"
    }
  }
}
```

Блок `provider "vkcs"` описывает настройки для провайдера от VK Cloud Solutions. Укажите `user_name`, `password` и `project_id` для личного кабинета. Значения проекта для `project_id` и `region` доступны на странице [API ключи в личном кабинете](https://mcs.mail.ru/app/project/keys).

``` yaml
provider "vkcs"  {
    username = "USER_NAME"
    password = "YOUR_PASSWORD"
    project_id = "89382346912619466469164"
    region = "RegionOne"
}
```

После создания файла `main.tf` и его заполнения, можно переходить к описанию создания ресурсов:

- [Создание кластера Kubernetes](https://mcs.mail.ru/docs/ru/base/k8s/k8s-terraform/k8s-terraform-create);
- [Создание инстанса БД с Terraform для DBaaS](https://mcs.mail.ru/docs/dbs/dbaas/api/working-with-terraform);
- [Создание БД и пользователя с Terraform для DBaaS](https://mcs.mail.ru/docs/ru/dbs/dbaas/api/terraform-provider-vk-cs).
