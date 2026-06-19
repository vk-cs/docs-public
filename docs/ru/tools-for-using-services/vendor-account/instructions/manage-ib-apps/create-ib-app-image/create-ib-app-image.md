Чтобы загрузить ваше image-based приложение на Marketplace облачной платформы, сначала необходимо подготовить образ ВМ, на которой будет установлен инстанс вашего приложения, и загрузить его на платформу VK Cloud. Ниже показано, как это сделать с помощью Packer или используя возможности личного кабинета VK Cloud.

Рекомендуемый способ создания образа — с помощью Packer.

{note:warn}

Перед публикацией сервиса на Marketplace образ вашего image-based приложения будет [опубликован](/ru/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ibservice_upload/ibservice_upload_publish_image) в VK Cloud. На основе публичного образа будут развертываться инстансы вашего приложения у пользователей, подключивших его через Marketplace. Данные образа будут общедоступными.

{/note}

{tabs}
{tab(Создание с помощью Packer)}

1. Установите Packer:

   1. Скачайте Packer с [официального зеркала VK Cloud](https://hashicorp-releases.mcs.mail.ru/packer/).
   1. Распакуйте архив и укажите путь к распакованному файлу в переменной среды `Path`.
   1. Выполните команду `packer`, чтобы убедиться в успешной установке Packer.

   Подробная инструкция приведена в [официальной документации Packer](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli).

1. [Установите](/ru/tools-for-using-services/cli/openstack-cli) OpenStack CLI и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#openstack-authorize) в проекте.
1. Скачайте базовый образ ОС, поддерживающий работу с облачными платформами.

   ОС должна удовлетворять [требованиям к образу ВМ сервиса](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based#image_based_req_image).

   На [официальном сайте OpenStack](https://docs.openstack.org/image-guide/obtain-images.html) размещены ссылки на образы некоторых ОС, поддерживающих работу с облачными платформами.

   {note:info}

   Чтобы не загружать самостоятельно базовый образ в облачную платформу, используйте уже загруженные в VK Cloud. Список доступных образов ОС приведен в таблице раздела [Аргумент target_os](/ru/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data#target_os). В этом случае сразу переходите к созданию packer-файла.

   {/note}

1. Конвертируйте базовый образ в формат `RAW`:

   1. Установите утилиту [qemu-img](https://www.qemu.org/docs/master/tools/qemu-img.html) на локальный компьютер:

      {tabs}
      {tab(Для образов на базе RHEL (CentOS, AlmaLinux, Rocky Linux))}

      ```console
      sudo yum install qemu-img
      ```

      {/tab}

      {tab(Для образов на базе Debian (Ubuntu))}

      ```console
      sudo apt install qemu-utils
      ```

      {/tab}
      {/tabs}

   1. Запустите конвертацию файла с помощью команды:

      ```console
      qemu-img convert -f qcow2 -O raw <ИМЯ_ИСХОДНОГО_ОБРАЗА> <ИМЯ_ОБРАЗА>
      ```

      Здесь:

      * `<ИМЯ_ИСХОДНОГО_ОБРАЗА>` — имя исходного базового образа. Например, `alt-p9-cloud-x86_64.qcow2`.
      * `<ИМЯ_ОБРАЗА>` — имя базового образа в формате `RAW`. Например, `alt-p9-cloud-x86_64.raw`.

1. Загрузите базовый образ в формате `RAW` в VK Cloud:

   ```console
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <ПУТЬ> <ИМЯ_ОБРАЗА>
   ```

   Здесь:

   * `<ПУТЬ>` — путь к базовому образу.
   * `<ИМЯ_ОБРАЗА>` — имя базового образа в формате `RAW`.

   Подробнее в разделе [Импорт образа](/ru/computing/iaas/instructions/images/images-manage#iaas-images-manage-import).

1. Создайте конфигурационный packer-файл:

   1. В переменные окружения запишите ID сети и ID базового образа:

      ```console
      export NETWORK_ID=<ID_СЕТИ>
      export SOURCE_IMAGE=<ID_ОБРАЗА>
      ```

      Здесь:

      * `<ID_СЕТИ>` — ID сети. Значение можно найти в личном кабинете VK Cloud на вкладке **Виртуальные сети** → **Сети**.
      * `<ID_ОБРАЗА>` — ID базового образа. Значение можно найти в личном кабинете VK Cloud на вкладке **Облачные вычисления** → **Образы**. Если используется базовый образ, доступный в VK Cloud, найдите его ID в разделе [Аргумент target_os](/ru/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data#target_os).

   1. Создайте packer-файл с именем `<ИМЯ_ОС>.pkr.hcl`. Например, `altlinux.pkr.hcl`.
   1. В файле опишите конфигурацию ВМ, на базе которой будет создан образ. Описание синтаксиса конфигурационного файла — на [официальном сайте Packer](https://developer.hashicorp.com/packer/docs/templates/hcl_templates).

      {cut(Пример конфигурации ВМ с ОС Alt Linux P9 и развертыванием image-based приложения из плейбука Ansible)}
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
      {/cut}

      {note:info}

      Если требуется отправлять метрики в сервис Cloud Monitoring, в конфигурации ВМ опишите [установку агента мониторинга](/ru/tools-for-using-services/vendor-account/manage-apps/ib_cloud_monitoring).

      {/note}

      Имя пользователя ОС, которое указывается в аргументах `ssh_username` и `user` конфигурации, зависит от операционной системы. Список имен приведен в разделе [Подключение к ВМ Linux](/ru/computing/iaas/instructions/vm/vm-connect/vm-connect-nix).

      Имя группы безопасности по умолчанию, которое указывается в аргументе `security_groups` конфигурации, зависит от типа SDN:

      * `default` — в проекте VK Cloud на базе OpenStack Neutron.
      * `default-sprut` — в проекте VK Cloud на базе Sprut.

      Список доступных групп безопасности можно получить с помощью команды:

      ```console
      openstack security group list
      ```

   1. Проверьте созданную конфигурацию:

      ```console
      packer validate <ИМЯ_ФАЙЛА>
      ```

      Здесь `<ИМЯ_ФАЙЛА>` — имя packer-файла.

1. Создайте образ ВМ сервиса в VK Cloud:

   1. Запустите создание образа ВМ сервиса:

      ```console
      packer build <ИМЯ_ФАЙЛА>
      ```

      Здесь `<ИМЯ_ФАЙЛА>` — имя packer-файла.

      При успешном создании образа ВМ сервиса будет выведено сообщение с ID образа. Пример сообщения:

      ```console
      ==> Builds finished. The artifacts of successful builds are:
      --> openstack.altlinux: An image was created: c6320138-035f-40d8-XXXX-e814edb2ce5f
      ```

      Здесь `c6320138-035f-40d8-XXXX-e814edb2ce5f` — ID образа ВМ сервиса.

   1. В личном кабинете VK Cloud перейдите на вкладку **Облачные вычисления** → **Образы** и убедитесь, что в списке образов появился образ ВМ сервиса.

{/tab}

{tab(Создание через личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Создайте ВМ:

   1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
   1. Нажмите кнопку **Добавить**.
   1. В форме создания ВМ задайте параметры виртуальной машины.

      {note:warn}

      ОС должна удовлетворять [требованиям к образу ВМ сервиса](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based#image_based_req_image).

      {/note}

   1. Подтвердите создание ВМ.

1. Установите ПО на ВМ:

   1. Перейдите на страницу созданной ВМ.
   1. Назначьте внешний IP-адрес с помощью кнопки **Назначить внешний IP**.
   1. Подключитесь к ВМ через SSH:

      ```console
      ssh -i <ПУТЬ_К_КЛЮЧУ> <ИМЯ_ПОЛЬЗОВАТЕЛЯ>@<FLOATING_IP>
      ```

      Здесь:

      * `<ПУТЬ_К_КЛЮЧУ>` — путь к файлу с закрытым ключом доступа к ВМ.
      * `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя ОС. Укажите имя в зависимости от ОС. Список имен приведен в разделе [Подключение к ВМ Linux](/ru/computing/iaas/instructions/vm/vm-connect/vm-connect-nix).
      * `<FLOATING_IP>` — внешний IP-адрес ВМ.

   1. Если на ВМ не установлены программные пакеты, указанные в [требованиях к образу ВМ сервиса](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based#image_based_req_image), установите их.

      Пример команды для установки `curl` на ОС Ubuntu:

      ```console
      sudo apt install curl
      ```

   1. Установите ПО image-based приложения на ВМ.
   1. Если требуется отправлять метрики в сервис Cloud Monitoring, установите на ВМ [агент мониторинга](/ru/tools-for-using-services/vendor-account/manage-apps/ib_cloud_monitoring).

1. Очистите ВМ от чувствительных данных с помощью команд:

   {tabs}
   {tab(Для ОС RHEL (CentOS, AlmaLinux, Rocky Linux))}

      ```console
      # Очистить логи cloud-init
      $ sudo cloud-init clean --log --seed
      # Очистить ssh-ключи
      $ sudo rm -f /etc/ssh/*host*key*
      # Очистить логи
      $ sudo find /var/log -maxdepth 5 -type f -exec rm -fv {} \;
      # Удалить tmp-файлы
      $ sudo rm -rf /tmp/* /var/tmp/*
      # Очистить системные файлы
      $ sudo truncate -s 0 /etc/machine-id /etc/resolv.conf /var/log/audit/audit.log /var/log/wtmp \
      /var/log/lastlog /var/log/btmp /var/log/cron /var/log/maillog /var/log/messages /var/log/secure \
      /var/log/spooler
      # Удалить системные файлы
      $ sudo rm -rf /etc/hostname /etc/machine-info /var/lib/systemd/credential.secret /var/lib/cloud /var/log/tuned \
      /var/log/qemu-ga /var/log/anaconda /var/lib/systemd/random-seed
      # Инициализировать диск, заполнить нулями
      $ sudo dd if=/dev/zero of=/zeroed_file bs=1M oflag=direct || sudo rm -f /zeroed_file
      # Очистить историю команд
      $ history -c
      # Синхронизировать файловую систему
      $ sudo sync
      ```

   {/tab}
   {tab(Для ОС Debian (Ubuntu))}

      ```console
      # Очистить логи cloud-init
      $ sudo cloud-init clean --log --seed
      # Очистить ssh-ключи
      $ sudo rm -f /etc/ssh/*host*key*
      # Очистить логи
      $ sudo find /var/log -maxdepth 5 -type f -exec rm -fv {} \;
      # Удалить tmp-файлы
      $ sudo rm -rf /tmp/* /var/tmp/*
      # Очистить файл machine-id
      $ sudo truncate -s 0 /etc/machine-id /var/lib/dbus/machine-id
      # Инициализировать диск, заполнить нулями
      $ sudo dd if=/dev/zero of=/zeroed_file bs=1M oflag=direct || sudo rm -f /zeroed_file
      # Очистить кеш пакетного менеджера
      $ sudo apt-get -y autoremove --purge
      $ sudo apt-get -y clean
      $ sudo apt-get -y autoclean
      # Очистить историю команд
      $ history -c
      # Синхронизировать файловую систему
      $ sudo sync
      ```

   {/tab}
   {/tabs}

1. Остановите ВМ:

   ```console
   sudo /sbin/shutdown -hP now
   ```

1. Создайте образ ВМ сервиса на основе диска ВМ:

   1. Перейдите в раздел **Облачные вычисления** → **Образы**.
   1. Нажмите кнопку **Создать образ**.
   1. В открывшемся окне выберите источник **Диск**.
   1. Выберите диск созданной и настроенной ВМ.

      Имя диска ВМ отображается на ее странице на вкладке **Диски**.

   1. Укажите имя для образа.
   1. Подтвердите создание образа. ID созданного образа ВМ сервиса будет отображаться в строке этого образа.

{/tab}
{/tabs}
