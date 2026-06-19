# {heading(Packer көмегімен образ жасау)[id=iaas-packer]}

{include(/kz/_includes/_translated_by_ai.md)}

Packer {var(cloud)} ішінде алдын ала орнатылған [конфигурация қалыптарының](../../concepts/vm/flavor) кез келгені мен қажетті қонақ ОС-ы бар базалық образ негізінде жаңа ВМ образын құрастыруға мүмкіндік береді. Жаңа образдың параметрлері Packer конфигурациялық файлының көмегімен беріледі. Мысал ретінде мыналар пайдаланылады:

- QCOW2 форматындағы Alt Linux P9 ОС образы;
- `STD3-2-6` конфигурация қалыбы.

## {heading(Дайындық қадамдары)[id=iaas-packer-preparatory-steps]}

1. Packer-дің соңғы нұсқасын [орнатыңыз](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli).

   {note:info}
   Packer-ді {var(cloud)} [айнасынан](https://hashicorp-releases.mcs.mail.ru/packer/) жүктеп ала аласыз.
   {/note}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Alt Linux P9 ОС образын [жергілікті түрде жүктеп алыңыз](http://ftp.altlinux.org/pub/distributions/ALTLinux/p9/images/cloud/x86_64/) (`alt-p9-cloud-x86_64.qcow2` файлы).

## {heading(1. Образды RAW форматына түрлендіріңіз)[id=iaas-packer-convert-image]}

`qemu-img` утилитасын пайдаланыңыз:

1. Егер бұл бұрын жасалмаса, `qemu-img` орнатыңыз:

   {tabs}

   {tab(RHEL/Centos)}

   ```console
   sudo yum install qemu-img
   ```

   {/tab}

   {tab(Ubuntu)}

   ```console
   sudo apt install qemu-utils
   ```

   {/tab}

   {/tabs}

1. Команда арқылы файлды түрлендіруді іске қосыңыз:

   ```console
   qemu-img convert -f qcow2 -O raw alt-p9-cloud-x86_64.qcow2 alt-p9-cloud-x86_64.raw
   ```

   Түрлендіру командасының синтаксисі [QEMU ресми құжаттамасында](https://www.qemu.org/docs/master/tools/qemu-img.html) берілген.

## {heading(2. Базалық образды бұлтқа жүктеңіз)[id=iaas-packer-download-base-image]}

Образды [нұсқаулық бойынша](../../instructions/images/images-manage#iaas-images-manage-import) импорттаңыз.

## {heading(3. Packer конфигурациялық файлын жасаңыз)[id=iaas-packer-create-config-file]}

1. Желілерді іздеу командасын орындап, қажетті сыртқы желінің ID-сін көшіріп алыңыз:

   ```console
   openstack network list
   ```

1. Образдарды іздеу командасын орындап, қажетті образдың ID-сін көшіріп алыңыз:

   ```console
   openstack image list
   ```

1. Алынған мәндерді айнымалыларға жазыңыз:

   ```console
   export NET_ID=<ID_СЕТИ>
   export SOURCE_IMAGE=<ID_ОБРАЗА>
   ```

   Мұнда:

   - `<ID_СЕТИ>` — алдыңғы қадамда алынған сыртқы желінің идентификаторы.
   - `<ID_ОБРАЗА>` — алдыңғы қадамда алынған образ идентификаторы.

1. Жаңа ВМ образы үшін қажетті конфигурация қалыбын таңдаңыз. Мысалда — `STD3-2-6`.

   {note:info}
   Өзекті конфигурация қалыптары {var(cloud)} жеке кабинетінің **Виртуалды машина түрі** тізіміндегі [ВМ жасау бетінде](https://kz.cloud.vk.com/app/services/infra/servers/add) берілген.
   {/note}

1. `altlinux.pkr.hcl` файлын жасаңыз. Таңдалған конфигурация қалыбының атауын `flavor` параметрінде көрсетіңіз.

   {cut(altlinux.pkr.hcl)}

   ```hcl
   variable "network_id" {
     type = string
     default = "${env("NETWORK_ID")}"
     validation {
       condition     = length(var.network_id) > 0
       error_message = <<EOF2
   The NETWORK_ID environment variable must be set.
   EOF2
     }
   }

   variable "source_image" {
     type = string
     default = "${env("SOURCE_IMAGE")}"
     validation {
       condition     = length(var.source_image) > 0
       error_message = <<EOF2
   The SOURCE_IMAGE environment variable must be set.
   EOF2
     }
   }

   source "openstack" "altlinux" {
     flavor       = "STD3-2-6"
     image_name   = "Alt-Linux-P9-Starter-Kit"
     source_image = "${var.source_image}"
     config_drive            = "true"
     networks = ["${var.network_id}"]
     security_groups = ["default-sprut", "ssh"]
     ssh_username = "altlinux"
     use_blockstorage_volume = "true"
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

   {note:info}
   ВМ жасаған кезде диск жасалуы тиіс қолжетімділік аймағын көрсетіңіз. Конфигурациялық файл синтаксисі туралы толық ақпарат [Packer ресми құжаттамасында](https://developer.hashicorp.com/packer/docs/templates/hcl_templates).
   {/note}

   {/cut}

1. Жасалған конфигурацияны команда арқылы тексеріңіз:

   ```console
   packer validate altlinux.pkr.hcl
   ```

## {heading(4. Дайындалған образды бұлтқа жүктеңіз)[id=iaas-packer-download-prepare-image]}

1. Команда арқылы образ жасауды іске қосыңыз:

   ```console
   packer build altlinux.pkr.hcl
   ```

1. Сәтті жүктеу туралы хабар пайда болғанша күтіңіз:

   ```console
   ==> Builds finished. The artifacts of successful builds are:
   --> openstack.altlinux: An image was created: c6320138-035f-40d8-XXXX-e814edb2ce5f
   ```

1. `c6320138-035f-40d8-XXXX-e814edb2ce5f` идентификаторын жазып алыңыз — ол келесі қадамда қажет болады.

## {heading(5. Образды баптауды аяқтаңыз)[id=iaas-packer-settings-end]}

1. Команданың көмегімен жасалған образға [метатегтерді](../../instructions/images/image-metadata) орнатыңыз:

   ```console
   openstack image set \
       --property hw_qemu_guest_agent=True \
       --property os_require_quiesce=yes \
       --property mcs_name='Alt Linux P9 Starter Kit' \
       c6320138-035f-40d8-XXXX-e814edb2ce5f
   ```

1. Образдың дұрыс көрсетілетініне көз жеткізіңіз.

   {tabs}

   {tab(Жеке кабинет)}

   1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне өтіңіз.
   1. **Бұлтты есептеулер → Образдар** бөліміне өтіңіз.
   1. Тізімнен образды тауып, оны басыңыз. Образ беті ашылады.

   Образ ВМ жасаған кезде де қолжетімді болады.

   {/tab}

   {tab(OpenStack CLI)}

   ```console
   openstack image show c6320138-035f-40d8-XXXX-e814edb2ce5f
   ```

   Команданы орындау нәтижесі:

   ```console
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
   | properties       | base_image_ref='1a8aa332-d8ef-4c40-XXXX-cade8b59aea3', boot_roles='mcs_owner', direct_url='s3://user:key@h-int.icebox.q/images-b5b7ffd4ef0547e5b222f44555dfXXXX/c6320138-035f-40d8-XXXX-e814edb2ce5f', hw_qemu_guest_agent='True', image_location='snapshot', image_state='available', image_type='image', instance_uuid='f19e1e54-bce9-4c25-XXXX-e0f40e2cff14', is_ephemeral_root='True', locations='[{'url': 's3://user:key@h-int.icebox.q/images-b5b7ffd4ef0547e5b222f44555dfXXXX/c6320138-035f-40d8-XXXX-e814edb2ce5f', 'metadata': {}}]', mcs_name='Alt Linux P9 Starter Kit', os_require_quiesce='True', owner_project_name='mcsXXXX', owner_specified.openstack.md5='XXXX', owner_specified.openstack.object='images/alt-p9-cloud-x86_64', owner_specified.openstack.sha256='XXXX', owner_user_name='test@vk.team', self='/v2/images/c6320138-035f-40d8-XXXX-e814edb2ce5f', store='s3', user_id='5f48556ef89444dbab8fa82669dXXXX' |
   | protected        | False                                                |
   | schema           | /v2/schemas/image                                    |
   | size             | 1653604352                                           |
   | status           | active                                               |
   | tags             |                                                      |
   | updated_at       | 2023-03-29T14:08:15Z                                 |
   | visibility       | private                                              |
   +------------------+------------------------------------------------------+
   ```

   {/tab}

   {/tabs}

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=iaas-packer-image-delete]}

Егер образ енді қажет болмаса, оны [жойыңыз](../../instructions/images/images-manage#iaas-images-manage-delete).
