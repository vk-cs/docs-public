Packer позволяет создавать образы виртуальных машин с нужными параметрами при помощи конфигурационного файла.

Packer создаст и запустит виртуальную машину с ОС Ubuntu-22.04 из списка базовых образов, установит на нее Nginx и сделает снимок загрузочного диска. После завершения всех операций, виртуальная машина и её загрузочный диск будут удалены.

## Подготовка к работе с Packer

* [Установите](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli) Packer.
* [Установите](../../../../additionals/account/project/cli/setup/) OpenStack client.
* [Авторизуйте](../../../../additionals/account/project/cli/authorization/) клиент CLI.

## Подготовка конфигурации образа

Создайте файл (например, `nginx.pkr.hcl`) и скопируйте туда следующую конфигурацию:

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

  flavor                  = "<flavor_name>"
  ssh_username            = "ubuntu"
  security_groups         = ["default", "ssh+www"]
  volume_size             = 10
  config_drive            = "true"
  use_blockstorage_volume = "true"
  networks                = ["<network_ID>"]

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

В параметре `network_ID` укажите ID подсети, к которой будет подключена созданная виртуальная машина. ID подсети можно посмотреть в личном кабинете в разделе **Виртуальные сети → Сети** или через OpenStack CLI:

```bash
openstack network list
```

В параметре `flavor_name` укажите название шаблона ВМ, с которым будет создана виртуальная машина. Имя шаблона ВМ можно посмотреть в мастере создания виртуальной машины или через Openstack CLI:

```bash
openstack flavor list
```

## Создание образа

Для создания образа выполните команду:

```bash
packer build nginx.pkr.hcl
```

## Проверка созданного образа

Созданный образ можно посмотреть в личном кабинете в разделе **Облачные вычисления → Образы** или через OpenStack CLI:

```bash
openstack image list
```

## Удаление образа

Созданный образ можно [удалить](../delete-image/) через личный кабинет.
