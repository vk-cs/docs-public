VK CS поддерживает 2 Terraform-провайдера:

1. OpenStack для управления IaaS-сервисами.
2. Собственный VK CS Terraform Provider для управления DBaaS-сервисами.

Для того чтобы управлять СУБД в облаке VK CS потребуется подключить одновременно OpenStack Terraform Provider и VK CS Terraform Provider.

Для начала использования VK CS Terraform Provider выполните шаги, описанные ниже.

## Установка Terraform

[Скачайте](https://www.terraform.io/downloads.html) Terraform и следуйте [инструкции](https://learn.hashicorp.com/tutorials/terraform/install-cli) по его установке.

## Настройка провайдера

Для начала использования провайдера выполните следующие действия:

1. Скачайте архив ([для Mac](https://hub.mcs.mail.ru/repository/terraform/darwin/v0.3.0/mcs-provider.zip), [для Linux](https://hub.mcs.mail.ru/repository/terraform/linux/v0.3.0/mcs-provider.zip), [для Windows](https://hub.mcs.mail.ru/repository/terraform/windows/v0.2.2/mcs-provider.zip)) с бинарным файлом VK CS Terraform Provider и распакуйте его.
2. Поместите бинарный файл VK CS провайдера по следующему пути: **.terraform.d/plugins/hub.mcs.mail.ru/repository/mcs/0.3.1/%distroname%`**.  
Где:
    - для MacOS — *.%distroname% darwin_amd64*;
    - для Linux — *linux_amd64*.

Бинарный файл должен называться *terraform-provider-mcs_v0.3*.

3. Создайте директорию, в которой будут храниться конфигурационные файлы, например, *mcs_terraform*.
4. Перейти в директорию *mcs_terraform* и создать в ней файл *main.tf*, а для использования переменных при создании ресурсов также создать файл *vars.tf*.
5. [Скачайте](https://mcs.mail.ru/app/project/terraform/) конфигурационные файл OpenStack Terraform Provider и VK CS Terraform Provider, доступной в личном кабинете после авторизации, сохранить оба файла в папку *mcs_terraform*
6. Указать пароль от учетной записи в поле *мpasswordм* в файлах *mcs_provider.tf* и *openstack_provider.tf*.

<warn>

Для корректной работы обоих провайдеров необходимо убедиться, что в переменных окружения не установлена переменная *OS_USER_DOMAIN_ID*.

</warn>

Ее можно убрать, выполнив команду `unset OS_USER_DOMAIN_ID`.

<warn>

Начиная с версии terraform 0.13 появился обязательный блок *required_providers* (подробнее можно прочитать в [официальной документации](https://www.terraform.io/docs/language/providers/requirements.html)).

</warn>

Если вы используете эту версию, то в начале файла конфигурации *main.tf* нужно добавить следующий блок:
```bash
terraform {
required_providers {
mcs = {
source  = "hub.mcs.mail.ru/repository/mcs"
version = "0.3.1"
}
openstack = {
source = "terraform-provider-openstack/openstack"
}
}
}
```

## Создание ресурсов

Для создания и управления ресурсами выполните следующие шаги:

1. Опишите в файле *main.tf* ресурсы для создания. Например, для создания инстанса СУБД вставьте:

```bash
resource "mcs_db_instance" "db-instance" {
  name = "db-instance"

  datastore {
    type    = example_datastore_type
    version = example_datastore_version
  }

  floating_ip_enabled = true

  flavor_id         = example_flavor_id
  availability_zone = example_availability_zone

  size        = 8
  volume_type = example_volume_type
  disk_autoexpand {
    autoexpand    = true
    max_disk_size = 1000
  }

  network {
    uuid = example_network_id
  }

  capabilities {
    name = capability_name
  }

  capabilities {
    name = another_capability_name
  }
}
```

## Применение конфигурации

Для применения конфигурации выполните команду `terraform init` и введите «yes».

## Удаление ресурсов

Для удаления ресурсов выполните команду `terraform destroy` и введите «yes».

Чтобы увидеть, какие ресурсы будут созданы, выполните команду `terraform plan`.

Для применения выбранной конфигурации выполните команду `terraform apply`.
