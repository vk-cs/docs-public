<warn>

Прежде всего убедитесь, что вы [установили packer](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli)

</warn>

Packer позволяет создавать образы виртуальных машин с нужными параметрами при помощи конфигурационного файла.

Packer создаст и запустит виртуальную машину с ОС Ubuntu-22.04 из списка базовых образов, на которую будет установлен nginx. После установки будет сделан снимок загрузочного диска виртуальной машины. Виртуальная машина и её загрузочный диск будут удалены.

## Подготовка к работе с packer

Для работы с packer нужно [установить openstack cli](../../../../../additionals/account/project/cli/setup/) и провести [авторизацию](../../../../../additionals/account/project/cli/authorization/) в проекте VK Cloud.

## Подготовка конфигурации образа

Создайте файл с любым названием (например nginx.pkr.hcl) и скопируйте туда следующую конфигурацию:

```hcl
variable "image_tag" {
  type = string
  default = "1.0.0"
}

source "openstack" "nginx" {
  source_image_filter {
    filters {
      name = "Ubuntu-22.04-202208"
    }
    most_recent = true
  }

  flavor                  = "<имя флейвора виртуальной машины для создания образа>"
  ssh_username            = "ubuntu"
  security_groups         = ["default", "ssh+www"]
  volume_size             = 10
  config_drive            = "true"
  use_blockstorage_volume = "true"
  networks                = ["<идентификатор подсети>"]

  image_name = "nginx-${var.image_tag}"
}

build {
  sources = ["source.openstack.nginx"]

  provisioner "shell" {
    inline = [
      "sudo apt-get update -y",
      "sudo apt-get install nginx -y"
    ]
  }
}
```

В параметре networks укажите id подсетей, к которым будет подключена созданная вирутальная машина для создания снимка вм.

id подсетей можно посмотреть через openstack cli, выполнив команду:
```bash
openstack network list
```
или в веб интерфейсе в разделе "облачные вычисления/сети"

## Создание образа
Для создания образа выполните команду
```bash
packer build nginx.pkr.hcl
```
## Проверка созданного образа
Созданный образ можно посмотреть через openstack cli, выполнив команду:
```bash
openstack image list
```
или в веб интерфейсе в разделе "облачные вычисления/образы"

## Удаление образа
Если созданный образ вам больше не нужен, его можно [удалить](../../delete-image/).