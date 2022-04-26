Данная статья расскажет, как создать в VK CS виртуальную машину через Terraform.

Предполагаем, что вы уже установили и подготовили Terraform по этой [инструкции](https://mcs.mail.ru/help/iaas-api/infrastructure-terraform).

### Важно

**На момент написания статьи актуальная версия Terraform - 0.12.24.**

**C помощью Terraform нельзя создать виртуальную машину с указанием типа диска. Это обусловлено версионированием API OpenStack. Единственная опция — создавать диск заранее и после этого создавать виртуальную машину.**

## Создание конфигурации

Опишем конфигурацию виртуальной инфраструктуры. Для этого в директории с конфигурационными файлами terraform создадим файл main.tf, и добавим в него следующее:

**Описание ключевой пары**

Данный сегмент кода отвечает за ssh ключ:

```
resource "openstack_compute_keypair_v2" "ssh" {
  # Название нашего ssh ключа,
  # Данный ключ будет отображаться в разделе
  # Облачные вычисления -> Ключевые пары
  name = "terraform_ssh_key"

  # Путь до публичного ключа.
  # В нашем случае он лежит рядом с main.tf .
  public_key = file("${path.module}/terraform.pem.pub")
}
```

**Описание группы безопасности**

Теперь мы создадим security group, которую добавим к создаваемой ВМ, и разрешим соединение на порты 22 и 80, также дополнительно разрешим icmp трафик с любого источника.

```
resource "openstack_compute_secgroup_v2" "rules" {
  name = "terraform__security_group"
  description = "security group for terraform instance"
  rule {
    from_port = 22
    to_port = 22
    ip_protocol = "tcp"
    cidr = "0.0.0.0/0"
  }
  rule {
    from_port = 80
    to_port = 80
    ip_protocol = "tcp"
    cidr = "0.0.0.0/0"
  }
  rule {
    from_port = -1
    to_port = -1
    ip_protocol = "icmp"
    cidr = "0.0.0.0/0"
  }
}
```

**Описание блочного устройства**

Данный сегмент отвечает за создание диска.

```
resource "openstack_blockstorage_volume_v2" "volume" {
  # Название диска.
  name = "storage"

  # Тип создаваемого диска.
  volume_type = "dp1"

  # Размер.
  size = "10"

  # uuid индикатор образа, в примере используется Ubuntu-18.04-201910
  image_id = "cd733849-4922-4104-a280-9ea2c3145417"
}
```

Доступные типы дисков можно посмотреть с помощью команды OpenStack CLI:

```
openstack volume type list
```

На момент написания статьи доступны:

<table style="width: 100%;"><tbody><tr><td style="width: 50.0000%;"><strong>volume_type</strong></td><td style="width: 50.0000%;"><strong>Описание</strong></td></tr><tr><td style="width: 50.0000%;"><p>ko1-high-iops, dp1-high-iops</p></td><td style="width: 50.0000%;">диски типа high-IOPS-SSD в зонах MS1 и DP1 соответственно</td></tr><tr><td style="width: 50.0000%;"><p>ko1-ssd, dp1-ssd</p></td><td style="width: 50.0000%;">диски типа SSD в зонах MS1 и DP1 соответственно</td></tr><tr><td style="width: 50.0000%;"><p>ssd</p></td><td style="width: 50.0000%;">геораспределенный SSD</td></tr><tr><td style="width: 50.0000%;"><p>ms1, dp1</p></td><td style="width: 50.0000%;">диски типа hdd в зонах MS1 и DP1 соответственно</td></tr><tr><td style="width: 50.0000%;">ceph</td><td style="width: 50.0000%;">геораспределенный HDD</td></tr></tbody></table>

Доступные образы и их UUID можно посмотреть командой OpenStack CLI:

```
openstack image list
```

**Описание флейвора (размера инстанса)**

```
  # Какой размер используем для инстанса (соотношение vCPU - RAM).
  flavor_name = "Basic-1-1-10"
```

Получить список доступных конфигураций можно через CLI, командой \`openstack flavor list\`.

При выборе ориентируйтесь на первые две цифры, они задают кол-во vCPU и RAM.

**Итоговый вид конфигурации**

Собираем все воедино:

```
resource "openstack_compute_instance_v2" "instance" {
  # Название создаваемой ВМ.
  name = "terraform"

  # Имя и uuid образа с ОС.
  image_name = "Ubuntu-18.04-201910"
  image_id = "cd733849-4922-4104-a280-9ea2c3145417"

  # Размер инстанса.
  flavor_name = "Basic-1-1-10"

  # Публичный ключ, который мы описывали выше.
  key_pair = openstack_compute_keypair_v2.ssh.name

  # Указываем, что при создании использовать config drive.
  # Без этой опции ВМ не будет создана корректно в сетях без DHCP
  config_drive = true

  # Присваиваем security group для нашей vm.
  security_groups = [
   openstack_compute_secgroup_v2.rules.name
  ]

  # В данном примере мы используем сеть ext-net.
  network {
    name = "ext-net"
  }

  # Блочное устройство
  block_device {
    uuid = openstack_blockstorage_volume_v2.volume.id
    boot_index = 0
    source_type = "volume"
    destination_type = "volume"
    delete_on_termination = true
  }
}
```

**Дополнительные опции**

После создания ВМ начнем подготовку ее к использованию. В данном примере показано удаленное подключение и выполнение cli команд.

```
  provisioner "remote-exec" {
    # Сначала описываем соединение
    connection {
      # Данный адрес мы получаем из compute node при создании вм.
      # Сам же адрес получаем из ext-net.
      host = openstack_compute_instance_v2.instance.access_ip_v4

      # Пользователь, из под которого нужно запустить ssh соединение.
      user = "ubuntu"

      # Приватный ключ, который будет использован.
      # В нашем примере он лежит рядом с main.tf
      private_key = file("${path.module}/terraform.pem")
    }

    # cli команды, которые необходимо использовать.
    # Не забывайте, что это array type и необходимо вводить full text
    inline = [
      "sudo apt-get update",
      "sudo apt-get -y install nginx",
    ]


```

Также можно выводить артефакты, например, IP адрес сети ext-net, который получила ВМ. Для этого добавим следующее:

```
output "instances" {
  value = "${openstack_compute_instance_v2.instance.access_ip_v4}"
}
```

## **Развертывание инфраструктуры**

Убедившись, что конфигурация развертывания составлена верно, выполним команду:

```
terraform plan
```

Произойдет тестовое подключение,   проверка на доступность ресурсов,  проверка самого .tf синтаксиса, и будет выведен список изменений (add, change, destroy).

В случае, если тестовое подключение успешно завершено, выполните для развертывания конфигурации:

```
terraform apply
```
