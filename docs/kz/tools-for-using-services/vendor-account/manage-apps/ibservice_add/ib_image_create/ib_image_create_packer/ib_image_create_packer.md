# {heading(Packer көмегімен жасау)[id=ib_image_create_packer]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Packer көмегімен сервис бейнесін жасау үшін:

1. Packer орнатыңыз:

   1. Packer пакетін [ресми {var(cloud)} айнасынан](https://hashicorp-releases.mcs.mail.ru/packer/) жүктеп алыңыз.
   1. Архивті тарап, `Path` орта айнымалысында таратылған файлға жолды көрсетіңіз.
   1. Packer сәтті орнатылғанын тексеру үшін `packer` командасын орындаңыз.

   Толық нұсқаулық [Packer ресми құжаттамасында](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli) берілген.
1. OpenStack CLI [орнатыңыз](/kz/tools-for-using-services/cli/openstack-cli) және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Бұлтты платформалармен жұмыс істеуді қолдайтын ОҚ базалық бейнесін жүктеп алыңыз.

   ОҚ [сервис бейнесіне қойылатын талаптарға](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based#image_based_req_image) сәйкес болуы тиіс.

   [OpenStack ресми сайтында](https://docs.openstack.org/image-guide/obtain-images.html) бұлтты платформалармен жұмыс істеуді қолдайтын кейбір ОҚ бейнелерінің сілтемелері орналастырылған.

   {note:info}

   Базалық бейнені бұлтты платформаға өз бетінше жүктемеу үшін, {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data#target_os)[text=%text]} бөліміндегі кестеден дайынын пайдаланыңыз. Бұл жағдайда бірден packer-файлын конфигурациялау қадамына өтіңіз.

   {/note}
1. Базалық бейнені `RAW` пішіміне түрлендіріңіз:

   1. Жергілікті компьютерге [qemu-img](https://www.qemu.org/docs/master/tools/qemu-img.html) утилитасын орнатыңыз.

      {caption(RHEL (CentOS, AlmaLinux, Rocky Linux) негізіндегі бейнелер үшін qemu-img орнату мысалы)[align=left;position=above]}
      ```console
      sudo yum install qemu-img
      ```
      {/caption}

      {caption(Debian (Ubuntu) негізіндегі бейнелер үшін qemu-img орнату мысалы)[align=left;position=above]}
      ```console
      sudo apt install qemu-utils
      ```
      {/caption}
   1. Команданы орындаңыз:

      ```console
      qemu-img convert -f qcow2 -O raw <INITIAL_IMAGE_NAME> <IMAGE_NAME>
      ```

      Мұнда:

      * `<INITIAL_IMAGE_NAME>` — бастапқы базалық бейненің атауы. Мысалы, `alt-p9-cloud-x86_64.qcow2`.
      * `<IMAGE_NAME>` — `RAW` пішіміндегі базалық бейненің атауы. Мысалы, `alt-p9-cloud-x86_64.raw`.

1. Базалық бейнені `RAW` пішімінде бұлтты платформаға жүктеп салыңыз:

   ```console
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <IMAGE_PATH> <IMAGE_NAME>
   ```

   Мұнда:

   * `<IMAGE_PATH>` — базалық бейнеге жол.
   * `<IMAGE_NAME>` — `RAW` пішіміндегі базалық бейненің атауы.

      Жасалған бейненің ID бұлтты платформаның ЛК-да көрсетіледі.

   Толық нұсқаулық [Бейнені импорттау](/kz/computing/iaas/instructions/images/images-manage#iaas-images-manage-import) бөлімінде берілген.
1. Packer-файлын конфигурациялаңыз:

   1. Орта айнымалыларына желінің ID және базалық бейненің ID жазыңыз:

      ```console
      export NETWORK_ID=<NETWORK_ID>
      export SOURCE_IMAGE=<IMAGE_ID>
      ```

      Мұнда:

      * `<NETWORK_ID>` — желінің ID. Мән бұлтты платформаның ЛК-да желілер тізімі бар бетте көрсетіледі.
      * `<IMAGE_ID>` — базалық бейненің ID. Мән бұлтты платформаның ЛК-да бейнелер тізімі бар бетте көрсетіледі. Дайын базалық бейне пайдаланылса, {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data#target_os)[text=%text]} бөліміндегі ID көрсетіңіз.

   1. `<FILE_NAME>.pkr.hcl` файлын жасаңыз. Мысалы, `altlinux.pkr.hcl`.
   1. Файлда сервис бейнесі жасалатын ВМ конфигурациясын сипаттаңыз (синтаксис — [Packer ресми сайтында](https://developer.hashicorp.com/packer/docs/templates/hcl_templates)).

      {caption(Ansible плейбогынан image-based қосымшаны орнатумен Alt Linux P9 ОҚ бар ВМ конфигурациясының мысалы)[align=left;position=above]}
      ```console
      # Желі ID
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

      # Базалық бейне ID
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

      # Базалық бейнеден ВМ жасау
      source "openstack" "altlinux" {
        flavor       = "STD3-2-6"
        image_name   = "Alt-Linux-P9-Starter-Kit"
        source_image = "${var.source_image}"
        config_drive            = "true"
        networks = ["${var.network_id}"]
        security_groups = ["default", "ssh"]
        ssh_username = "altlinux"
        use_blockstorage_volume = "true"
        volume_availability_zone = "MS1"
      }

      # ВМ баптауы
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
          provisioner "ansible" {
          playbook_file = "provision.yml"
          user          = "altlinux"
          sftp_command  = "/usr/libexec/openssh/sftp-server -e"
          use_proxy     = false
        }
      }
      ```
      {/caption}

      {note:info}

      Метриктерді Cloud Monitoring сервисіне жіберу қажет болса, ВМ конфигурациясында мониторинг агентін орнатуды сипаттаңыз (толығырақ — [ВМ жүйелік метриктері](../../../ib_cloud_monitoring/ib_cloud_monitoring_vm) бөлімінде).

      {/note}

      ОҚ пайдаланушысының атауы ОҚ-ға байланысты. Атаулар тізімі [Linux ВМ-ге қосылу](/kz/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) бөлімінде берілген.

      Әдепкі қауіпсіздік тобының атауы SDN түріне байланысты:

      * `default` — OpenStack Neutron негізіндегі бұлтты платформа жобасында.
      * `default-sprut` — Sprut негізіндегі бұлтты платформа жобасында.

         {note:info}

         Қолжетімді қауіпсіздік топтарын команда көмегімен қараңыз:

         ```console
         # openstack security group list
         ```

         {/note}

   1. Жасалған конфигурацияны тексеріңіз:

      ```console
      packer validate <FILE_NAME>.pkr.hcl
      ```

      Мұнда `<FILE_NAME>.pkr.hcl` — packer-файлының атауы.

1. Бұлтты платформада сервис бейнесін жасаңыз:

   1. Сервис бейнесін жасауды іске қосыңыз:

      ```console
      packer build <PACKER_FILE>
      ```

      Мұнда `<PACKER_FILE>` — packer-файлының атауы.
   1. Сәтті жасалғаны туралы хабарламаның пайда болуын күтіңіз. Хабарламада сервис бейнесінің ID көрсетіледі.

      {caption(Сервис бейнесі сәтті жасалғаны туралы хабарламаның мысалы)[align=left;position=above]}
      ```console
      ==> Builds finished. The artifacts of successful builds are:
      --> openstack.altlinux: An image was created: c6320138-035f-40d8-XXXX-e814edb2ce5f
      ```
      {/caption}

      Мұнда `c6320138-035f-40d8-XXXX-e814edb2ce5f` — сервис бейнесінің ID.
   1. Сервис бейнесі бұлтты платформаның ЛК-да көрсетілгеніне көз жеткізіңіз.