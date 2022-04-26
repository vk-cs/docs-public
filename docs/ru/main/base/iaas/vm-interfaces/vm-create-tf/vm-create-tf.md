Terraform - open-source программное обеспечение Infrastructure as code (IaC) или «инфраструктура как код», созданное HashiCorp. Оно позволяет пользователям определять и предоставлять инфраструктуру центра обработки данных, используя декларативный язык конфигурации, известный как язык конфигурации HashiCorp, или, опционально, JSON.

Предполагается, что Terraform уже подготовлен и настроен в соответствии с [инструкцией](https://mcs.mail.ru/help/ru_RU/user-account/mgmt-interfaces#section-12).

**Внимание**

На момент написания этой документации актуальная версия Terraform - 0.12.24.

C помощью Terraform невозможно создать виртуальную машину с указанием типа диска, поскольку это обусловлено версионированием API OpenStack. Корректный способ - создавать диск, затем создавать виртуальную машину.

## Создание конфигурации

Для начала следует описать конфигурацию виртуальной инфраструктуры. Для этого в директории с конфигурационными файлами terraform создается файл main.tf, и добавляются следующие данные:

**Описание ключевой пары**

Данный сегмент кода отвечает за ssh ключ:

```
resource "openstack_compute_keypair_v2" "ssh" {
  # Название ssh ключа,
  # Данный ключ будет отображаться в разделе
  # Облачные вычисления -> Ключевые пары
  name = "terraform_ssh_key"

  # Путь до публичного ключа
  # В примере он находится в одной директории с main.tf
  public_key = file("${path.module}/terraform.pem.pub")
}
```

**Описание группы безопасности**

Далее следует создать security group, которая будет назначена создаваемой ВМ, и разрешить прием трафика по портам 22 и 80, а также разрешить icmp трафик с любого источника.

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

**Описание блочного устройства**

Данный сегмент отвечает за создание диска.

```
resource "openstack_blockstorage_volume_v2" "volume" {
  # Название диска
  name = "storage"

  # Тип создаваемого диска
  volume_type = "dp1"

  # Размер диска
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

Описание

<table style="box-sizing: border-box; outline: 0px; border: 1px solid rgb(221, 221, 221); border-collapse: collapse; width: 739.2px;"><tbody><tr><td><strong>volume_type</strong></td><td><strong>Описание</strong></td></tr><tr><td><p>ko1-high-iops, dp1-high-iops</p></td><td>диски типа high-IOPS-SSD в зонах MS1 и DP1 соответственно</td></tr><tr><td><p>ko1-ssd, dp1-ssd</p></td><td>диски типа SSD в зонах MS1 и DP1 соответственно</td></tr><tr><td><p>ssd</p></td><td>геораспределенный SSD</td></tr><tr><td><p>ms1, dp1</p></td><td>диски типа hdd в зонах MS1 и DP1 соответственно</td></tr><tr><td>ceph</td><td>геораспределенный HDD</td></tr></tbody></table>

Доступные образы и их UUID можно посмотреть командой OpenStack CLI:

```
openstack image list
```

**Описание флейвора**

```
  # Какую конфигурацию следует использовать для инстанса (объем vCPU и RAM).
  flavor_name = "Basic-1-2-10"
```

Получить список доступных конфигураций можно через CLI, командой

```
openstack flavor list
```

**Итоговый вид конфигурации**

Собранная конфигурация будет иметь вид:

```
resource "openstack_compute_instance_v2" "instance" {
  # Название создаваемой ВМ
  name = "terraform"

  # Имя и uuid образа с ОС
  image_name = "Ubuntu-18.04-201910"
  image_id = "cd733849-4922-4104-a280-9ea2c3145417"

  # Конфигурация инстанса
  flavor_name = "Basic-1-1-10"

  # Публичный ключ для доступа
  key_pair = openstack_compute_keypair_v2.ssh.name

  # Указываем, что при создании использовать config drive
  # Без этой опции ВМ не будет создана корректно в сетях без DHCP
  config_drive = true

  # Присваивается security group для ВМ
  security_groups = [
   openstack_compute_secgroup_v2.rules.name
  ]

  # В данном примере используется сеть ext-net
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

**Дополнительные опции**

После создания ВМ начинается подготовку ее к использованию. В данном примере показано удаленное подключение и выполнение cli команд.

```
  provisioner "remote-exec" {
    # Сначала описывается соединение
    connection {
      # Данный адрес можно получить из compute node при создании ВМ
      # Сам адрес можно получить из ext-net
      host = openstack_compute_instance_v2.instance.access_ip_v4

      # Пользователь, от имени которого запускается SSH соединение
      user = "ubuntu"

      # Приватный ключ, который будет использован
      # В этом примере он лежит в одной директории с main.tf
      private_key = file("${path.module}/terraform.pem")
    }

    # cli команды, которые необходимо использовать
    # Не стоит забывать, что это array type и необходимо вводить full text
    inline = [
      "sudo apt-get update",
      "sudo apt-get -y install nginx",
    ]
```

Также можно выводить артефакты, например, IP адрес сети ext-net, который получила ВМ. Для этого нужно добавить следующее:

```
output "instances" {
  value = "${openstack_compute_instance_v2.instance.access_ip_v4}"
}
```

## Развертывание инфраструктуры

Чтобы убедиться что конфигурация развертывания составлена верно, следует выполнить команду:

```
terraform plan
```

Произойдет тестовое подключение,  проверка на доступность ресурсов,  проверка синтаксиса .tf, и будет выведен список изменений (add, change, destroy).

В случае, если тестовое подключение успешно завершено, для развертывания конфигурации используется команда:

```
terraform apply
```
