# {heading(Packer көмегімен бейне жасау)[id=iaas-packer]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Packer қалаған госттік ОС бар базалық бейнеге және {var(cloud)} алдын ала орнатылған {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=конфигурация шаблондарының]} кез келгеніне негізделген жаңа ВМ бейнесін жасауға мүмкіндік береді. Жаңа бейненің параметрлері Packer конфигурациялық файлы арқылы орнатылады.

Мысал ретінде QCOW2 форматындағы Альт Сервер 10 ОС бейнесі қолданылады.

## {heading(Дайындық қадамдар)[id=iaas-packer-preparatory-steps]}

1. Packerдің соңғы нұсқасын [орнатыңыз](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli).

   {note:info}
   Packerді {var(cloud)} [айнасынан](https://hashicorp-releases.mcs.mail.ru/packer/) жүктеп алуға болады.
   {/note}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанын]} тексеріп, жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. Альт Сервер 10 ОС бейнесін [жүктеп алыңыз](http://ftp.altlinux.org/pub/distributions/ALTLinux/p10/images/cloud/x86_64/) локальды түрде (`alt-p10-cloud-x86_64.qcow2` файлы).

## {heading(1. Бейнені RAW форматына түрлендіріңіз)[id=iaas-packer-convert-image]}

`qemu-img` утилитасын қолданыңыз:

1. Бұрын жасалмаса, `qemu-img` орнатыңыз:

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

1. Файлды түрлендіруді мына командамен іске қосыңыз:

   ```console
   qemu-img convert -f qcow2 -O raw alt-p10-cloud-x86_64.qcow2 alt-p10-cloud-x86_64.raw
   ```

   Түрлендіру командасының синтаксисі [QEMU ресми құжаттамасында](https://www.qemu.org/docs/master/tools/qemu-img.html) келтірілген.

## {heading(2. Базалық образды бұлтқа жүктеңіз)[id=iaas-packer-download-base-image]}

Образды [нұсқаулық бойынша](../../instructions/images/images-manage#iaas-images-manage-import) импорттаңыз.

## {heading(3. Packer конфигурациялық файлын жасаңыз)[id=iaas-packer-create-config-file]}

1. Желілерді іздеу командасын орындап, қажетті сыртқы желінің идентификаторын көшіріңіз:

   ```console
   openstack network list
   ```

1. Образдарды іздеу командасын орындап, қажетті образдың идентификаторын көшіріңіз:

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
   - `<ID_ОБРАЗА>` — алдыңғы қадамда алынған образдың идентификаторы.

1. Жаңа ВМ образды үшін қалаған конфигурация шаблонын таңдаңыз.

   {note:info}
   Өзекті конфигурация шаблондары {var(cloud)} жеке кабинетінің {ifdef(public)}[ВМ жасау бетінде](https://msk.cloud.vk.ru/app/services/infra/servers/add) **Виртуалды машина түрі** тізімінде{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=%text]} бөлімінде{/ifdef} ұсынылған.
   {/note}

1. `altlinux.pkr.hcl` файлын жасаңыз. `flavor` параметріне таңдалған конфигурация шаблонының атауын көрсетіңіз.

   {cut(altlinux.pkr.hcl)}

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
     flavor       = "<ШАБЛОН_КОНФИГУРАЦИИ_ВМ>"
     image_name   = "Alt-Linux-P10"
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
   ВМ жасағанда диск жасалуы тиіс қолжетімділік аймағын көрсетіңіз. Конфигурациялық файл синтаксисі туралы толық ақпарат [Packer ресми құжаттамасында](https://developer.hashicorp.com/packer/docs/templates/hcl_templates) бар.
   {/note}

   {/cut}

1. Жасалған конфигурацияны мына командамен тексеріңіз:

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

## {heading(5. Образты баптауды аяқтаңыз)[id=iaas-packer-settings-end]}

1. Жасалған образға келесі команданың көмегімен {ifdef(public)}{linkto(../../../../computing/iaas/instructions/images/image-metadata#iaas-image-metadata)[text=метатегтерді]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}метатегтерді{/ifdef} орнатыңыз:

   ```console
   openstack image set \
       --property hw_qemu_guest_agent=True \
       --property os_require_quiesce=yes \
       --property mcs_name='Alt Linux 10' \
       c6320138-035f-40d8-XXXX-e814edb2ce5f
   ```
   {linkto(#iaas-packer-download-prepare-image)[text=4-қадамда]} көшірілген идентификаторды пайдаланыңыз.

1. Образтың дұрыс көрсетілетініне көз жеткізіңіз.

   {tabs}

   {tab(Жеке кабинет)}

   1. {var(cloud)} жеке кабинетына {ifdef(public)}[өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=өтіңіз]}{/ifdef}.
   1. **Бұлтты есептеулер** → **Образтар** бөліміне өтіңіз.
   1. Образты тізімнен тауып, оны басыңыз. Образ беті ашылады.

   Образ ВМ жасаған кезде де қолжетімді болады.

   {/tab}

   {tab(OpenStack CLI)}

   ```console
   openstack image show c6320138-035f-40d8-XXXX-e814edb2ce5f
   ```

   {ifdef(public)}
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
   | name             | Alt-Linux-P10                             |
   | owner            | b5b7ffd4ef0547e5b222f44555dfXXXX                     |
   | properties       | base_image_ref='1a8aa332-d8ef-4c40-XXXX-cade8b59aea3', boot_roles='mcs_owner', direct_url='s3://user:key@h-int.icebox.q/images-b5b7ffd4ef0547e5b222f44555dfXXXX/c6320138-035f-40d8-XXXX-e814edb2ce5f', hw_qemu_guest_agent='True', image_location='snapshot', image_state='available', image_type='image', instance_uuid='f19e1e54-bce9-4c25-XXXX-e0f40e2cff14', is_ephemeral_root='True', locations='[{'url': 's3://user:key@h-int.icebox.q/images-b5b7ffd4ef0547e5b222f44555dfXXXX/c6320138-035f-40d8-XXXX-e814edb2ce5f', 'metadata': {}}]', mcs_name='Alt Linux 10', os_require_quiesce='True', owner_project_name='mcsXXXX', owner_specified.openstack.md5='XXXX', owner_specified.openstack.object='images/alt-p10-cloud-x86_64', owner_specified.openstack.sha256='XXXX', owner_user_name='test@vk.team', self='/v2/images/c6320138-035f-40d8-XXXX-e814edb2ce5f', store='s3', user_id='5f48556ef89444dbab8fa82669dXXXX' |
   | protected        | False                                                |
   | schema           | /v2/schemas/image                                    |
   | size             | 1653604352                                           |
   | status           | active                                               |
   | tags             |                                                      |
   | updated_at       | 2023-03-29T14:08:15Z                                 |
   | visibility       | private                                              |
   +------------------+------------------------------------------------------+
   ```
   {/ifdef}

   {/tab}

   {/tabs}

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=iaas-packer-image-delete]}

Егер образ енді қажет болмаса, оны [жойыңыз](../../instructions/images/images-manage#iaas-images-manage-delete).