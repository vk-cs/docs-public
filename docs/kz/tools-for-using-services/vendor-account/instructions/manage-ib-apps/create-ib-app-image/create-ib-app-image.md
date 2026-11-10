
{include(/kz/_includes/_translated_by_ai_kz.md)}

Image-based қолданбаңызды бұлт платформасының Marketplace-ке жүктеу үшін алдымен қолданбаңыздың инстансы орнатылатын ВМ бейнесін дайындап, оны VK Cloud платформасына жүктеу қажет. Төменде мұны Packer көмегімен немесе VK Cloud жеке кабинетінің мүмкіндіктерін қолдану арқылы жасау жолы көрсетілген.

Бейне жасаудың ұсынылатын тәсілі — Packer көмегімен жасау.

{note:warn}

Сервисті Marketplace-те жарияламас бұрын image-based қолданбаңыздың бейнесі VK Cloud-та [жарияланады](/kz/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ibservice_upload/ibservice_upload_publish_image). Пайдаланушылар Marketplace арқылы қосқан қолданбаңыздың инстанстары жариялы бейне негізінде орналастырылады. Бейне деректері жалпыға қолжетімді болады.

{/note}

{tabs}
{tab(Packer көмегімен жасау)}

1. Packer орнатыңыз:

   1. Packer-ді [VK Cloud ресми айнасынан](https://hashicorp-releases.mcs.mail.ru/packer/) жүктеп алыңыз.
   1. Архивті таратып, таратылған файлға жолды `Path` орта айнымалысында көрсетіңіз.
   1. Packer сәтті орнатылғанын тексеру үшін `packer` командасын орындаңыз.

   Толық нұсқаулық [Packer ресми құжаттамасында](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli) берілген.

1. OpenStack CLI [орнатыңыз](/kz/tools-for-using-services/cli/openstack-cli) және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Бұлт платформаларымен жұмыс істеуді қолдайтын ОС-тің базалық бейнесін жүктеп алыңыз.

   ОС [сервистің ВМ бейнесіне қойылатын талаптарға](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based#image_based_req_image) сәйкес болуы тиіс.

   Бұлт платформаларымен жұмыс істеуді қолдайтын кейбір ОС-тердің бейнерлеріне сілтемелер [OpenStack ресми сайтында](https://docs.openstack.org/image-guide/obtain-images.html) орналастырылған.

   {note:info}

   Базалық бейнені бұлт платформасына өзіңіз жүктемеу үшін VK Cloud-қа бұрыннан жүктелген бейнерді қолданыңыз. Қолжетімді ОС бейнерлерінің тізімі [target_os аргументі](/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data#target_os) бөліміндегі кестеде берілген. Бұл жағдайда бірден packer-файлын жасауға өтіңіз.

   {/note}

1. Базалық бейнені `RAW` пішіміне түрлендіріңіз:

   1. Локалды компьютерге [qemu-img](https://www.qemu.org/docs/master/tools/qemu-img.html) утилитасын орнатыңыз:

      {tabs}
      {tab(RHEL негізіндегі бейнерлер үшін (CentOS, AlmaLinux, Rocky Linux))}

      ```console
      sudo yum install qemu-img
      ```

      {/tab}

      {tab(Debian негізіндегі бейнерлер үшін (Ubuntu))}

      ```console
      sudo apt install qemu-utils
      ```

      {/tab}
      {/tabs}

   1. Файлды түрлендіруді команданың көмегімен іске қосыңыз:

      ```console
      qemu-img convert -f qcow2 -O raw <БАСТАПҚЫ_БЕЙНЕ_АТЫ> <БЕЙНЕ_АТЫ>
      ```

      Мұнда:

      * `<БАСТАПҚЫ_БЕЙНЕ_АТЫ>` — бастапқы базалық бейненің аты. Мысалы, `alt-p9-cloud-x86_64.qcow2`.
      * `<БЕЙНЕ_АТЫ>` — `RAW` пішіміндегі базалық бейненің аты. Мысалы, `alt-p9-cloud-x86_64.raw`.

1. `RAW` пішіміндегі базалық бейнені VK Cloud-қа жүктеңіз:

   ```console
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <ЖОЛ> <БЕЙНЕ_АТЫ>
   ```

   Мұнда:

   * `<ЖОЛ>` — базалық бейнеге жол.
   * `<БЕЙНЕ_АТЫ>` — `RAW` пішіміндегі базалық бейненің аты.

   Толығырақ [Бейне импорттау](/kz/computing/iaas/instructions/images/images-manage#iaas-images-manage-import) бөлімінде.

1. Packer конфигурациялық файлын жасаңыз:

   1. Орта айнымалыларына желінің ID-сін және базалық бейненің ID-сін жазыңыз:

      ```console
      export NETWORK_ID=<ЖЕЛІ_ID>
      export SOURCE_IMAGE=<БЕЙНЕ_ID>
      ```

      Мұнда:

      * `<ЖЕЛІ_ID>` — желінің ID-сі. Мәнді VK Cloud жеке кабинетінің **Виртуалды желілер** → **Желілер** қойыншасынан табуға болады.
      * `<БЕЙНЕ_ID>` — базалық бейненің ID-сі. Мәнді VK Cloud жеке кабинетінің **Бұлттық есептеулер** → **Бейнер** қойыншасынан табуға болады. VK Cloud-та қолжетімді базалық бейне қолданылса, оның ID-сін [target_os аргументі](/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data#target_os) бөлімінен табыңыз.

   1. `<ОС_АТЫ>.pkr.hcl` атауымен packer-файлын жасаңыз. Мысалы, `altlinux.pkr.hcl`.
   1. Файлда бейне жасалатын ВМ-ның конфигурациясын сипаттаңыз. Конфигурациялық файлдың синтаксисінің сипаттамасы — [Packer ресми сайтында](https://developer.hashicorp.com/packer/docs/templates/hcl_templates).

      {cut(Alt Linux P9 ОС-ті бар және Ansible плейбукынан image-based қолданба орналастырылатын ВМ конфигурациясының мысалы)}
      ```console
      # Желінің ID-сі
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

      # Базалық бейненің ID-сі
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

      # Базалық бейненен ВМ жасау
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
      {/cut}

      {note:info}

      Метрикаларды Cloud Monitoring сервисіне жіберу қажет болса, ВМ конфигурациясында [мониторинг агентін орнатуды](/kz/tools-for-using-services/vendor-account/manage-apps/ib_cloud_monitoring) сипаттаңыз.

      {/note}

      Конфигурациядағы `ssh_username` және `user` аргументтерінде көрсетілетін ОС пайдаланушысының аты операциялық жүйеге байланысты. Аттардың тізімі [Linux ВМ-ға қосу](/kz/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) бөлімінде берілген.

      Конфигурациядағы `security_groups` аргументінде көрсетілетін әдепкі қауіпсіздік тобының аты SDN түріне байланысты:

      * `default` — OpenStack Neutron негізіндегі VK Cloud жобасында.
      * `default-sprut` — Sprut негізіндегі VK Cloud жобасында.

      Қолжетімді қауіпсіздік топтарының тізімін команданың көмегімен алуға болады:

      ```console
      openstack security group list
      ```

   1. Жасалған конфигурацияны тексеріңіз:

      ```console
      packer validate <ФАЙЛ_АТЫ>
      ```

      Мұнда `<ФАЙЛ_АТЫ>` — packer-файлының аты.

1. VK Cloud-та сервистің ВМ бейнесін жасаңыз:

   1. Сервистің ВМ бейнесін жасауды іске қосыңыз:

      ```console
      packer build <ФАЙЛ_АТЫ>
      ```

      Мұнда `<ФАЙЛ_АТЫ>` — packer-файлының аты.

      Сервистің ВМ бейнесі сәтті жасалғанда бейненің ID-сі бар хабарлама шығады. Хабарламаның мысалы:

      ```console
      ==> Builds finished. The artifacts of successful builds are:
      --> openstack.altlinux: An image was created: c6320138-035f-40d8-XXXX-e814edb2ce5f
      ```

      Мұнда `c6320138-035f-40d8-XXXX-e814edb2ce5f` — сервистің ВМ бейнесінің ID-сі.

   1. VK Cloud жеке кабинетінде **Бұлттық есептеулер** → **Бейнер** қойыншасына өтіп, бейнер тізімінде сервистің ВМ бейнесі пайда болғанын тексеріңіз.

{/tab}

{tab(Жеке кабинет арқылы жасау)}

1. VK Cloud жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. ВМ жасаңыз:

   1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
   1. **Қосу** батырмасын басыңыз.
   1. ВМ жасау формасында виртуалды машинаның параметрлерін орнатыңыз.

      {note:warn}

      ОС [сервистің ВМ бейнесіне қойылатын талаптарға](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based#image_based_req_image) сәйкес болуы тиіс.

      {/note}

   1. ВМ жасауды растаңыз.

1. ВМ-ға ПО орнатыңыз:

   1. Жасалған ВМ-ның бетіне өтіңіз.
   1. **Сыртқы IP тағайындау** батырмасының көмегімен сыртқы IP-адресті тағайындаңыз.
   1. ВМ-ға SSH арқылы қосылыңыз:

      ```console
      ssh -i <КІЛТ_ЖОЛЫ> <ПАЙДАЛАНУШЫ_АТЫ>@<FLOATING_IP>
      ```

      Мұнда:

      * `<КІЛТ_ЖОЛЫ>` — ВМ-ға кіру жабық кілті бар файлға жол.
      * `<ПАЙДАЛАНУШЫ_АТЫ>` — ОС пайдаланушысының аты. Атты ОС-ке байланысты көрсетіңіз. Аттардың тізімі [Linux ВМ-ға қосу](/kz/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) бөлімінде берілген.
      * `<FLOATING_IP>` — ВМ-ның сыртқы IP-адресі.

   1. ВМ-да [сервистің ВМ бейнесіне қойылатын талаптарда](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based#image_based_req_image) көрсетілген бағдарламалық пакеттер орнатылмаған болса, оларды орнатыңыз.

      Ubuntu ОС-іне `curl` орнату командасының мысалы:

      ```console
      sudo apt install curl
      ```

   1. Image-based қолданбаның ПО-сын ВМ-ға орнатыңыз.
   1. Метрикаларды Cloud Monitoring сервисіне жіберу қажет болса, ВМ-ға [мониторинг агентін](/kz/tools-for-using-services/vendor-account/manage-apps/ib_cloud_monitoring) орнатыңыз.

1. ВМ-ны сезімтал деректерден келесі командалардың көмегімен тазалаңыз:

   {tabs}
   {tab(RHEL ОС үшін (CentOS, AlmaLinux, Rocky Linux))}

      ```console
      # cloud-init логтарды тазалау
      $ sudo cloud-init clean --log --seed

      # ssh-кілттерді тазалау
      $ sudo rm -f /etc/ssh/*host*key*

      # Логтарды тазалау
      $ sudo find /var/log -maxdepth 5 -type f -exec rm -fv {} \;

      # tmp-файлдарды жою
      $ sudo rm -rf /tmp/* /var/tmp/*

      # Жүйелік файлдарды тазалау
      $ sudo truncate -s 0 /etc/machine-id /etc/resolv.conf /var/log/audit/audit.log /var/log/wtmp \
      /var/log/lastlog /var/log/btmp /var/log/cron /var/log/maillog /var/log/messages /var/log/secure \
      /var/log/spooler

      # Жүйелік файлдарды жою
      $ $ sudo rm -rf /etc/hostname /etc/machine-info /var/lib/systemd/credential.secret /var/lib/cloud /var/log/tuned \
      /var/log/qemu-ga /var/log/anaconda /var/lib/systemd/random-seed

      # Дискті инициализациялау, нөлмен толтыру
      $ sudo dd if=/dev/zero of=/zeroed_file bs=1M oflag=direct || sudo rm -f /zeroed_file

      # Командалар тарихын тазалау
      $ history -c

      # Файлдық жүйені синхрондау
      $ sudo sync
      ```

   {/tab}
   {tab(Debian ОС үшін (Ubuntu))}

      ```console
      # cloud-init логтарды тазалау
      $ sudo cloud-init clean --log --seed

      # ssh-кілттерді тазалау
      $ sudo rm -f /etc/ssh/*host*key*

      # Логтарды тазалау
      $ sudo find /var/log -maxdepth 5 -type f -exec rm -fv {} \;

      # tmp-файлдарды жою
      $ sudo rm -rf /tmp/* /var/tmp/*

      # machine-id файлын тазалау
      $ sudo truncate -s 0 /etc/machine-id /var/lib/dbus/machine-id

      # Дискті инициализациялау, нөлмен толтыру
      $ sudo dd if=/dev/zero of=/zeroed_file bs=1M oflag=direct || sudo rm -f /zeroed_file

      # Пакеттік менеджер кешін тазалау
      $ sudo apt-get -y autoremove --purge
      $ sudo apt-get -y clean
      $ sudo apt-get -y autoclean

      # Командалар тарихын тазалау
      $ history -c

      # Файлдық жүйені синхрондау
      $ sudo sync
      ```

   {/tab}
   {/tabs}

1. ВМ-ны тоқтатыңыз:

   ```console
   sudo /sbin/shutdown -hP now
   ```

1. ВМ дискінің негізінде сервистің ВМ бейнесін жасаңыз:

   1. **Бұлттық есептеулер** → **Бейнер** бөліміне өтіңіз.
   1. **Бейне жасау** батырмасын басыңыз.
   1. Ашылған терезеде **Диск** дереккөзін таңдаңыз.
   1. Жасалған және бапталған ВМ-ның дисін таңдаңыз.

      ВМ дисінің аты оның бетінде **Дісктер** қойыншасында көрсетіледі.

   1. Бейне үшін атау көрсетіңіз.
   1. Бейне жасауды растаңыз. Жасалған сервистің ВМ бейнесінің ID-сі осы бейненің жолында көрсетіледі.

{/tab}
{/tabs}