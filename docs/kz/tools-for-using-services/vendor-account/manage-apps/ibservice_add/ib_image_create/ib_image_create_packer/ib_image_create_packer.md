# {heading(Packer көмегімен жасау)[id=ib_image_create_packer]}

{include(/kz/_includes/_translated_by_ai.md)}

Packer көмегімен сервис образын жасау үшін:

1. Packer орнатыңыз:

   1. Packer-ді [ресми {var(cloud)} айнасынан](https://hashicorp-releases.mcs.mail.ru/packer/) жүктеп алыңыз.
   1. Архивті ашып, `Path` орта айнымалысында ашылған файлға апаратын жолды көрсетіңіз.
   1. Packer сәтті орнатылғанына көз жеткізу үшін `packer` командасын орындаңыз.

   Егжей-тегжейлі нұсқаулық [Packer ресми құжаттамасында](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli) берілген.
1. OpenStack CLI-ді [орнатыңыз](/kz/tools-for-using-services/cli/openstack-cli) және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Бұлтты платформалармен жұмыс істеуді қолдайтын ОС-тің базалық образын жүктеп алыңыз.

   ОС {linkto(../../../ibservice_add/ib_image_create/ib_image_requirements#ib_image_requirements)[text=сервис образына қойылатын талаптарға]} сәйкес келуі керек.

   [OpenStack ресми сайтында](https://docs.openstack.org/image-guide/obtain-images.html) бұлтты платформалармен жұмыс істеуді қолдайтын кейбір ОС образдарына сілтемелер орналастырылған.

   {note:info}

   Базалық образды бұлтты платформаға өзіңіз жүктемеу үшін, {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data#target_os)[text=%text]} бөліміндегі кестеден дайын нұсқаны пайдаланыңыз. Бұл жағдайда бірден packer-файлды конфигурациялау қадамына өтіңіз.

   {/note}
1. Базалық образды `RAW` форматына түрлендіріңіз:

   1. [qemu-img](https://www.qemu.org/docs/master/tools/qemu-img.html) утилитасын жергілікті компьютерге орнатыңыз.

      {caption(RHEL негізіндегі образдар үшін qemu-img орнату мысалы (CentOS, AlmaLinux, Rocky Linux))[align=left;position=above]}
      ```console
      sudo yum install qemu-img
      ```
      {/caption}

      {caption(Debian негізіндегі образдар үшін qemu-img орнату мысалы (Ubuntu))[align=left;position=above]}
      ```console
      sudo apt install qemu-utils
      ```
      {/caption}
   1. Команданы орындаңыз:

      ```console
      qemu-img convert -f qcow2 -O raw <INITIAL_IMAGE_NAME> <IMAGE_NAME>
      ```

      Мұнда:

      * `<INITIAL_IMAGE_NAME>` — бастапқы базалық образдың атауы. Мысалы, `alt-p9-cloud-x86_64.qcow2`.
      * `<IMAGE_NAME>` — `RAW` форматындағы базалық образдың атауы. Мысалы, `alt-p9-cloud-x86_64.raw`.

1. `RAW` форматындағы базалық образды бұлтты платформаға жүктеңіз:

   ```console
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <IMAGE_PATH> <IMAGE_NAME>
   ```

   Мұнда:

   * `<IMAGE_PATH>` — базалық образға апаратын жол.
   * `<IMAGE_NAME>` — `RAW` форматындағы базалық образдың атауы.

      Жасалған образдың ID-і бұлтты платформаның ЖК-сінде көрсетіледі.

   Егжей-тегжейлі нұсқаулық [Образды импорттау](/kz/computing/iaas/instructions/images/images-manage#iaas-images-manage-import) бөлімінде берілген.
1. packer-файлды конфигурациялаңыз:

   1. Қоршаған орта айнымалыларына желі ID-ін және базалық образ ID-ін жазыңыз:

      ```console
      export NETWORK_ID=<NETWORK_ID>
      export SOURCE_IMAGE=<IMAGE_ID>
      ```

      Мұнда:

      * `<NETWORK_ID>` — желінің ID-і. Мән бұлтты платформаның ЖК-сінде желілер тізімі бар бетте көрсетіледі.
      * `<IMAGE_ID>` — базалық образдың ID-і. Мән бұлтты платформаның ЖК-сінде образдар тізімі бар бетте көрсетіледі. Егер дайын базалық образ пайдаланылса, ID-ді {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data#target_os)[text=%text]} бөлімінен көрсетіңіз.

   1. `<FILE_NAME>.pkr.hcl` файлын жасаңыз. Мысалы, `altlinux.pkr.hcl`.
   1. Файлда сервис образын жасауға негіз болатын ВМ конфигурациясын сипаттаңыз (синтаксисі — [Packer ресми сайтында](https://developer.hashicorp.com/packer/docs/templates/hcl_templates)).

      {caption(Alt Linux P9 ОС-і бар ВМ конфигурациясының және Ansible playbook-тен image-based қолданбасын өрістетудің мысалы)[align=left;position=above]}
      ```console
      # ID сети
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

      # ID базового образа
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

      # Создание ВМ из базового образа
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

      # Настройка ВМ
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

      Егер метрикаларды Cloud Monitoring сервисіне жіберу қажет болса, ВМ конфигурациясында мониторинг агентін орнатуды сипаттаңыз (толығырақ — [ВМ жүйелік метрикалары](../../../ib_cloud_monitoring/ib_cloud_monitoring_vm) бөлімінде).

      {/note}

      ОС пайдаланушысының аты ОС-ке байланысты. Атаулар тізімі [Linux ВМ-ге қосылу](/kz/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) бөлімінде берілген.

      Әдепкі қауіпсіздік тобының атауы SDN түріне байланысты:

      * `default` — OpenStack Neutron негізіндегі бұлтты платформа жобасында.
      * `default-sprut` — Sprut негізіндегі бұлтты платформа жобасында.

         {note:info}

         Қолжетімді қауіпсіздік топтарын мына команда арқылы қараңыз:

         ```console
         # openstack security group list
         ```

         {/note}

   1. Жасалған конфигурацияны тексеріңіз:

      ```console
      packer validate <FILE_NAME>.pkr.hcl
      ```

      Мұнда `<FILE_NAME>.pkr.hcl` — packer-файлдың атауы.

1. Бұлтты платформада сервис образын жасаңыз:

   1. Сервис образын жасауды іске қосыңыз:

      ```console
      packer build <PACKER_FILE>
      ```

      Мұнда `<PACKER_FILE>` — packer-файлдың атауы.
   1. Сәтті жасалғаны туралы хабарламаның пайда болуын күтіңіз. Хабарламада сервис образының ID-і көрсетіледі.

      {caption(Сервис образының сәтті жасалғаны туралы хабарламаның мысалы)[align=left;position=above]}
      ```console
      ==> Builds finished. The artifacts of successful builds are:
      --> openstack.altlinux: An image was created: c6320138-035f-40d8-XXXX-e814edb2ce5f
      ```
      {/caption}

      Мұнда `c6320138-035f-40d8-XXXX-e814edb2ce5f` — сервис образының ID-і.
   1. Сервис образы бұлтты платформаның ЖК-сінде көрсетілетініне көз жеткізіңіз.
