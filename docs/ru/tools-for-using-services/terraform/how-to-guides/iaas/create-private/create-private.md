# {heading(Создание ВМ)[id=terraform-iaas-create-private]}

С помощью Terraform можно создавать виртуальные машины.

Полное описание параметров — в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Подготовительные шаги)[id=iaas_vm_create_terraform_before_work]}

1. {linkto(../../../../../tools-for-using-services/terraform/install#terraform-install)[text=Установите и настройте Terraform]}, если этого еще не сделано.

1. Убедитесь, что {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=квот]} достаточно для создания ВМ.

## {heading({counter(tf-vm-private)}. Создание конфигурации)[id=iaas_vm_create_terraform_create_configuration]}

1. Опишите конфигурацию создаваемой виртуальной инфраструктуры, создав файл `main.tf` в директории с конфигурационными файлами Terraform. Пример файла `main.tf` приведен ниже.

   {note:warn}
   Для корректной работы требуется провайдер VK CS версии 0.13.0 или выше. OpenStack провайдер не подходит. Подробная информация об использовании провайдера VK CS приведена в [официальной документации](https://mcs.mail.ru/docs/additionals/terraform/terraform-provider-config).
   {/note}

1. В коде, представленном ниже, замените перед выполнением следующие переменные:

   - `<ОБРАЗ>` — образ ОС. Получить список доступных образов можно выполнив команду `openstack image list`.
   - `<ШАБЛОН_КОНФИГУРАЦИИ>` — шаблон конфигурации ВМ. Получить список доступных шаблонов можно выполнив команду `openstack flavor list`.

     {note:info}
     Если для работы требуются шаблоны конфигурации ВМ с GPU или vGPU, обратитесь к администратору {var(cloud)} с просьбой добавить их в проект.
     {/note}

   - `<КЛЮЧ>` — публичный ключ.

   {cut(Пример файла main.tf)}

   ```sh
   terraform {
   required_version = ">= 0.13.0"
     required_providers {
       vkcs = {
         source  = "vk-cs/vkcs"
         version = "~> 0.13.0"
       }
     }
   }
   
   # Блок создания ключевой пары
   resource "vkcs_compute_keypair" "ssh" {
     # Название SSH-ключа. Ключ будет отображаться в настройках аккаунта на вкладке *Ключевые пары*
     name = "terraform_ssh_key"
     # Путь до публичного ключа
     public_key = file("<КЛЮЧ>")
   }
   
   # Блок создания группы безопасности
   resource "vkcs_networking_secgroup" "secgroup_test" {
     name        = "secgroup_test"
     description = "My security group"
   }
   
   # Блок создания правила для группы безопасности
   resource "vkcs_networking_secgroup_rule" "secgroup_rule_test" {
     direction         = "ingress"
     protocol          = "tcp"
     port_range_min    = 22
     port_range_max    = 22
     remote_ip_prefix  = "0.0.0.0/0"
     security_group_id = "${vkcs_networking_secgroup.secgroup_test.id}"
   }
   
   # Блок создания диска
   resource "vkcs_blockstorage_volume" "volume" {
     # Название диска
     name = "storage"
     size = 10
     # UUID образа диска
     image_id = "<ОБРАЗ>"
     # Тип создаваемого диска
     volume_type = "ceph"
     # Зона доступности для диска
     availability_zone = "AZ1"
   }
   
   # Блок создания сети
   resource "vkcs_networking_network" "network_test" {
     # Название подсети
     name = "test_network"
     # Признак доступа для администратора
     admin_state_up = "true"
     # Настройка безопасности для портов сети
     port_security_enabled = "true"
   }
   
   # Блок создания подсети
   resource "vkcs_networking_subnet" "subnet_test" {
     # Название подсети
     name = "test_subnet"
     # Сеть, в которой создается данная подсеть
     network_id = "${vkcs_networking_network.network_test.id}"
     # Диапазон IP-адресов подсети в нотации CIDR
     cidr = "192.168.199.0/24"
     no_gateway = false
     enable_dhcp = "true"
   }
   
   # Блок создания ВМ
   resource "vkcs_compute_instance" "instance1" {
     # Название создаваемой ВМ
     name = "terraform-test"
   
     # Шаблон ВМ
     flavor_id = "<ФЛЕЙВОР>"
   
     # Используемая ключевая пара
     key_pair = "${vkcs_compute_keypair.ssh.name}"
   
     # Группы безопасности для ВМ
     security_groups = [
       "${vkcs_networking_secgroup.secgroup_test.name}"
     ]
   
     # Сеть для ВМ
     network {
       name = "${vkcs_networking_network.network_test.name}"
     }
   
     # Диск для ВМ
     block_device {
       uuid                  = "${vkcs_blockstorage_volume.volume.id}"
       source_type           = "volume"
       volume_size           = 20
       boot_index            = 0
       destination_type      = "volume"
       delete_on_termination = true
       volume_type           = "ceph"
     }
   }
   ```
   {/cut}

   После создания ВМ начинается подготовка ее к использованию. В данном примере показано удаленное подключение и выполнение CLI-команд:

   ```sh
   provisioner "remote-exec" {
     # Реквизиты соединения
     connection {
       # Указанный адрес можно получить на вычислительном узле при создании ВМ
       host = vkcs_compute_instance.instance1.access_ip_v4
   
       # Пользователь, от имени которого запускается SSH-соединение
       user = "ubuntu"
   
       # Приватный ключ, который будет использован
       # В этом примере он лежит в одной директории с main.tf
       private_key = file("<PRIVATE_KEY>")
     }
   
     # CLI-команды, которые необходимо использовать
     inline = [
       "sudo apt-get update",
       "sudo apt-get -y install nginx",
     ]
   }
   ```
   Здесь `<ПРИВАТНЫЙ_КЛЮЧ>` — путь к файлу с приватным SSH-ключом.

1. Чтобы вывести дополнительные артефакты, например IP-адрес внешней сети `external` или `ext-net`, который получила ВМ, добавьте фрагмент вида:

   ```sh
   output "instances" {
     value = "${vkcs_compute_instance.instance1.access_ip_v4}"
   }
   ```

## {heading({counter(tf-vm-private)}. Развертывание инфраструктуры)[id=iaas_vm_create_terraform_infrastructure_deployment]}

1. Скачайте конфигурационный файл.

   {note:info}
   Конфигурационный файл содержит необходимые параметры для подключения к проекту и выполнения запросов.
   {/note}

   1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
   1. Нажмите на имя пользователя в шапке страницы и выберите пункт **Настройки проекта**.
   1. Перейдите на вкладку **Доступ по API** и нажмите кнопку **Скачать openrc версии 3**.
   1. Сохраните файл на локальном диске.

1. Выполните загрузку параметров подключения из конфигурационного файла.

   ```console
   $ source ~/users_projects-openrc.sh
   ```

   Здесь `~/users_projects-openrc.sh` — путь к конфигурационному файлу для подключения.

1. При необходимости введите токен API.

   Пример запроса токена API:

   ```console
   Please enter your API token for project 5e5653f0e0024f9a9da58aa7573997be
   ```

1. Перейдите в каталог с собранным файлом с расширением `.tf`.
1. Выполните инициализацию окружения Terraform с помощью команды `terraform init`.
1. Убедитесь в корректности составления конфигурации виртуальной инфраструктуры, выполнив команду `terraform plan`.

   Будут выполнены действия:

   1. Тестовое подключение к окружению.
   1. Проверка на доступность ресурсов.
   1. Проверка синтаксиса файла с расширением `.tf`.
   1. Отображение списка изменений для описанных ресурсов (`add`, `change`, `destroy`).

1. Если после выполнения команды не обнаружено ошибок, запустите развертывание указанной виртуальной инфраструктуры c помощью команды `terraform apply`.
