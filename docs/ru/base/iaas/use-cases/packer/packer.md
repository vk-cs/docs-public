Packer позволяет создавать образы виртуальных машин с нужными параметрами при помощи конфигурационного файла. В качестве примера будет использован образ ОС Alt Linux P9 в формате QCOW.

## Подготовительные шаги

1. [Установите](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli) последнюю версию Packer.

   <info>

   Вы можете скачать Packer с [зеркала](https://hashicorp-releases.mcs.mail.ru/packer/) VK Cloud.

   </info>

1. [Установите](../../../../base/account/project/cli/setup) OpenStack CLI, если он еще не установлен. Убедитесь, что вы можете [авторизоваться](../../../../base/account/project/cli/authorization) в облаке с его помощью.
1. [Загрузите образ](http://ftp.altlinux.org/pub/distributions/ALTLinux/p9/images/cloud/x86_64/) ОС Alt Linux P9 локально (файл `alt-p9-cloud-x86_64.qcow2`).

## 1. Конвертируйте образ в формат RAW

Используйте утилиту `qemu-img`:

1. Установите `qemu-img`, если этого не сделано ранее:

    <tabs>
    <tablist>
    <tab>RHLE/Centos</tab>
    <tab>Ubuntu</tab>
    </tablist>
    <tabpanel>

    ```bash
    sudo yum install qemu-img
    ```

    </tabpanel>
    <tabpanel>

    ```bash
    sudo apt install qemu-utils
    ```

    </tabpanel>
    </tabs>

1. Запустите конвертацию файла с помощью команды:

    ```bash
    qemu-img convert -f qcow2 -O raw alt-p9-cloud-x86_64.qcow2 alt-p9-cloud-x86_64.raw
    ```

    Синтаксис команды конвертации приведен в [официальной документации QEMU](https://www.qemu.org/docs/master/tools/qemu-img.html).

## 2. Загрузите базовый образ в облако

Импортируйте образ по [инструкции](../../instructions/vm-images/vm-images-manage#import_obraza).

## 3. Создайте конфигурационный Packer-файл

1. Определите реквизиты сети и загруженного образа:

    1. [Получите](/ru/networks/vnet/operations/manage-net#prosmotr_spiska_setey_i_podsetey_a_takzhe_informacii_o_nih) идентификатор внешней сети, к которой будет подключена создаваемая виртуальная машина.
    1. Скопируйте название загруженного образа, получив список образов с помощью команды `openstack image list`.
    1. Запишите полученные значения в переменные:

        ```bash
        export SOURCE_IMAGE=8b64c09b-7141-41ad-XXXX-9f5a8dbbd87e
        export NETWORK_ID=f19e1e54-bce9-4c25-XXXX-e0f40e2cff14
        ```

1. Создайте файл `altlinux.pkr.hcl`:

    <details>
        <summary>altlinux.pkr.hcl</summary>

      ```hcl
      variable "network_id" {
        type = string
        default = "${env("NETWORK_ID")}"
        validation {
          condition     = length(var.network_id) > 0
          error_message = <<EOF
      The NETWORK_ID environment variable must be set.
      EOF
        }
      }

      variable "source_image" {
        type = string
        default = "${env("SOURCE_IMAGE")}"
        validation {
          condition     = length(var.source_image) > 0
          error_message = <<EOF
      The SOURCE_IMAGE environment variable must be set.
      EOF
        }
      }

      source "openstack" "altlinux" {
        flavor       = "Standard-2-6"
        image_name   = "Alt-Linux-P9-Starter-Kit"
        source_image = "${var.source_image}"
        config_drive            = "true"
        networks = ["${var.network_id}"]
        security_groups = ["default", "ssh"]
        ssh_username = "altlinux"
        use_blockstorage_volume = "false"
        volume_availability_zone = "MS1"
      }

      build {
        sources = ["source.openstack.altlinux"]
        provisioner "shell" {
          execute_command = "sudo {{ .Path }}"
          inline = [
            "apt-get update",
            "apt-get install -y irqbalance bash-completion bind-utils qemu-guest-agent cloud-utils-growpart",
            "systemctl enable qemu-guest-agent"
            ]
        }
      }
      ```

      <info>

      При создании ВМ указывайте зону доступности, в которой должен быть создан диск. Подробная информация о синтаксисе конфигурационного файла в [официальной документации Packer](https://developer.hashicorp.com/packer/docs/templates/hcl_templates).

      </info>

    </details>

1. Проверьте созданную конфигурацию с помощью команды:

    ```bash
    packer validate altlinux.pkr.hcl
    ```

## 4. Загрузите подготовленный образ в облако

1. Запустите создание образа с помощью команды:

    ```bash
    packer build altlinux.pkr.hcl
    ```

1. Дождитесь появления сообщения об успешной загрузке:

    ```bash
    ==> Builds finished. The artifacts of successful builds are:
    --> openstack.altlinux: An image was created: c6320138-035f-40d8-XXXX-e814edb2ce5f
    ```

1. Запишите идентификатор `c6320138-035f-40d8-XXXX-e814edb2ce5f` — он понадобится на следующем шаге.

## 5. Завершите настройку образа

1. Установите [метатеги](../../instructions/vm-images/vm-image-metadata/) созданному образу с помощью команды:

    ```bash
    openstack image set \
    --property hw_video_model='qxl' \
    --property hw_watchdog_action='reset' \
    --property hw_vif_multiqueue_enabled='true' \
    --property hw_qemu_guest_agent='yes' \
    --property os_require_quiesce='yes' \
    --property mcs_name='Alt Linux P9 Starter Kit' \
    --property mcs_os_distro='debian' \
    --property mcs_os_type='linux' \
    --property mcs_os_version='P9' \
    --property os_admin_user='altlinux' \
    --property os_distro='altlinux-p9' \
    --property os_type='linux' \
    --property os_version='p9' \
    c6320138-035f-40d8-XXXX-e814edb2ce5f
    ```

1. Убедитесь, что образ корректно отображается.

    <tabs>
    <tablist>
    <tab>Личный кабинет</tab>
    <tab>OpenStack CLI</tab>
    </tablist>
    <tabpanel>

    1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
    1. Перейдите в раздел **Облачные вычисления → Образы**.
    1. Найдите образ в списке и нажмите на него. Откроется страница образа.

      Образ также станет доступен при создании ВМ.

    </tabpanel>
    <tabpanel>

    ```bash
    openstack image show c6320138-035f-40d8-XXXX-e814edb2ce5f
    ```

    Результат выполнения команды:

    ```bash
    +------------------+------------------------------------------------------+
    | Field            | Value                                                |
    +------------------+------------------------------------------------------+
    | checksum         | 896ea37e28d82a548cedf1e0aa92XXXX                     |
    | container_format | bare                                                 |
    | created_at       | 2023-03-29T14:06:44Z                                 |
    | disk_format      | raw                                                  |
    | file             | /v2/images/c6320138-035f-40d8-XXXX-e814edb2ce5f/file |
    | id               | c6320138-035f-40d8-XXXX-e814edb2ce5f                 |
    | min_disk         | 0                                                    |
    | min_ram          | 0                                                    |
    | name             | Alt-Linux-P9-Starter-Kit                             |
    | owner            | b5b7ffd4ef0547e5b222f44555dfXXXX                     |
    | properties       | base_image_ref='1a8aa332-d8ef-4c40-XXXX-cade8b59aea3', boot_roles='mcs_owner', direct_url='s3://user:key@h-int.icebox.q/images-b5b7ffd4ef0547e5b222f44555dfXXXX/c6320138-035f-40d8-XXXX-e814edb2ce5f', hw_qemu_guest_agent='True', hw_video_model='qxl', hw_vif_multiqueue_enabled='True', hw_watchdog_action='reset', image_location='snapshot', image_state='available', image_type='image', instance_uuid='f19e1e54-bce9-4c25-XXXX-e0f40e2cff14', is_ephemeral_root='True', locations='[{'url': 's3://user:key@h-int.icebox.q/images-b5b7ffd4ef0547e5b222f44555dfXXXX/c6320138-035f-40d8-XXXX-e814edb2ce5f', 'metadata': {}}]', mcs_name='Alt Linux P9 Starter Kit', mcs_os_distro='debian', mcs_os_type='linux', mcs_os_version='P9', os_admin_user='altlinux', os_distro='altlinux-p9', os_require_quiesce='True', os_type='linux', os_version='p9', owner_project_name='mcsXXXX', owner_specified.openstack.md5='XXXX', owner_specified.openstack.object='images/alt-p9-cloud-x86_64', owner_specified.openstack.sha256='XXXX', owner_user_name='test@vk.team', self='/v2/images/c6320138-035f-40d8-XXXX-e814edb2ce5f', store='s3', user_id='5f48556ef89444dbab8fa82669dXXXX' |
    | protected        | False                                                |
    | schema           | /v2/schemas/image                                    |
    | size             | 1653604352                                           |
    | status           | active                                               |
    | tags             |                                                      |
    | updated_at       | 2023-03-29T14:08:15Z                                 |
    | visibility       | private                                              |
    +------------------+------------------------------------------------------+
    ```

    </tabpanel>
    </tabs>

## Проконтролируйте использование ресурсов

Если образ вам больше не нужен, [удалите его](../../instructions/vm-images/vm-images-manage#udalenie_obraza).
