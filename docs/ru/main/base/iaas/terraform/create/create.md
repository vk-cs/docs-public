<warn>

Прежде всего убедитесь, что вы [установили Terraform](/ru/additionals/terraform/terraform-installation) и [создали файл main.tf](/ru/additionals/terraform/terraform-provider-config) с необходимыми провайдерами.

</warn>

### Создание виртуальной сети для ВМ.

Чтобы создать виртуальную машину, необходимо описать ресурсы виртуальной сети, в которой ВМ будет работать. Создайте файл network.tf, где будет описана конфигурация создаваемой сети. Добавьте текст из примера ниже, и исправьте значения настроек для вашей сети.

Для создания ВМ нам потребуются следующие объекты сети:

1. Ресурсы (resource):

- **vkcs_networking_network** — сеть, в которой будет создана ВМ. В примере ниже сеть создается с именем «compute-net».
- **vkcs_networking_subnet** — подсеть из сети. В примере: subnet_1.
- **vkcs_networking_router** — роутер для внешней сети и взаимодействия с внешним миром. В примере: vm_router.
- **vkcs_networking_router_interface** — подключить роутер к внутренней сети.

2. Источники данных (data source):

- **vkcs_networking_network** – внешняя сеть для получения публичного IP (Floating IP).

```hcl
data "vkcs_networking_network" "extnet" {
  name = "ext-net"
}

resource "vkcs_networking_network" "compute" {
  name = "compute-net"
}

resource "vkcs_networking_subnet" "compute" {
  name       = "subnet_1"
  network_id = vkcs_networking_network.compute.id
  cidr       = "192.168.199.0/24"
  ip_version = 4
}

resource "vkcs_networking_router" "compute" {
  name                = "vm-router"
  admin_state_up      = true
  external_network_id = data.vkcs_networking_network.extnet.id
}

resource "vkcs_networking_router_interface" "compute" {
  router_id = vkcs_networking_router.compute.id
  subnet_id = vkcs_networking_subnet.compute.id
}
```

### Создание виртуальной машины

Для создания виртуальной машины, создайте в каталоге файл instance.tf и добавьте следующий текст примера. Исправьте значения настроек для вашей ВМ.

1. Ресурсы (resource):

- **vkcs_compute_instance** — информация о создаваемом инстансе ВМ. В этом ресурсе мы описываем ВМ и используем ранее описанные ресурсы сети:

  - **name** — имя ВМ.
  - **flavor_id** — флейвор ВМ, используемый при создании.
  - **security_groups** — перечень имен security group, приписанных этой ВМ.
  - **availability_zone** — зона доступности этой ВМ.
  - **block_device** — виртуальный диск для создаваемой ВМ. В данном примере создается два диска: один из загрузчного образа, другой — пустой. Ресурс block_device описывается следующими параметрами:

    - **uuid** — уникальный идентификатор диска.
    - **source_type** — источник загрузки ОС.
    - **destination_type** — конечная цель загрузочного образа.
    - **volume_type** — тип тома цели загрузочного образа.
    - **volume_size** — размер блока тома цели загрузочного образа.
    - **boot_index** — место диска в порядке загрузки boot.
    - **delete_on_termination** — Если указан True, диск будет удален при удалении ВМ.

  - **network** — сеть, подключаемая при создании ВМ.
  - **depends_on** — ВМ не запустится прежде чем не будет выполнено создание указанных ресурсов.

- **vkcs_networking_floatingip** — получает ID доступного плавающего IP от VK Cloud. Включает в себя следующий ресурс:

  - **pool** — имя пула, к которому принадлежит плавающий IP.

- **vkcs_compute_floatingip_associate** — присваивает плавающий IP созданной ВМ. Включается в себя следующие ресурсы:

- floating_ip — ID плавающего IP, который будет присвоен ВМ.
- instance_id — ID ВМ, которой будет присвоен плавающий IP.

2. Источники данных (data source):

- **vkcs_images_image** — установочный образ для создаваемого инстанса.
- **vkcs_compute_flavor** – флейвор (CPU, RAM, Disk) ВМ. Можно посмотреть в визарде создания ВМ через личный кабинет.

- **output "instance_fip"** - выводит в консоль плавающий IP присвоенный ВМ.

```hcl
data "vkcs_compute_flavor" "compute" {
  name = "Basic-1-2-20"
}

data "vkcs_images_image" "compute" {
  name = "Ubuntu-18.04-Standard"
}

resource "vkcs_compute_instance" "compute" {
  name                    = "compute-instance"
  flavor_id               = data.vkcs_compute_flavor.compute.id
  security_groups         = ["default"]
  availability_zone       = "GZ1"

  block_device {
    uuid                  = data.vkcs_images_image.compute.id
    source_type           = "image"
    destination_type      = "volume"
    volume_type           = "ceph-ssd"
    volume_size           = 8
    boot_index            = 0
    delete_on_termination = true
  }

  block_device {
    source_type           = "blank"
    destination_type      = "volume"
    volume_type           = "ceph-ssd"
    volume_size           = 8
    boot_index            = 1
    delete_on_termination = true
  }

  network {
    uuid = vkcs_networking_network.compute.id
  }

  depends_on = [
    vkcs_networking_network.compute,
    vkcs_networking_subnet.compute
  ]
}

resource "vkcs_networking_floatingip" "fip" {
  pool = data.vkcs_networking_network.extnet.name
}

resource "vkcs_compute_floatingip_associate" "fip" {
  floating_ip = vkcs_networking_floatingip.fip.address
  instance_id = vkcs_compute_instance.compute.id
}

output "instance_fip" {
  value = vkcs_networking_floatingip.fip.address
}
```

Добавьте оба файла network.tf и instance.tf в рабочий каталог и выполните следующие команды:

```bash
terraform init
```
```bash
terraform apply
```
