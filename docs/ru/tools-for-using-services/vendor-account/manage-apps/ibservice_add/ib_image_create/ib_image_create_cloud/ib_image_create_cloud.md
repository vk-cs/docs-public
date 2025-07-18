# {heading(Создание через ЛК облачной платформы)[id=ib_image_create_cloud]}

Чтобы создать образ сервиса через ЛК облачной платформы:

1. Войдите в ЛК облачной платформы.
1. Создайте ВМ:

   1. В меню слева перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
   1. Нажмите кнопку **Добавить**.
   1. В форме создания ВМ задайте параметры ВМ.

      {note:warn}

      ОС должна удовлетворять {linkto(../ib_image_requirements#ib_image_requirements)[text=требованиям к образу сервиса]}.

      {/note}
   1. Подтвердите создание ВМ.

1. Установите ПО на ВМ:

   1. Перейдите на страницу созданной ВМ.
   1. Назначьте внешний IP-адрес с помощью кнопки **Назначить внешний IP**.
   1. Подключитесь к ВМ через SSH:

      ```console
      $ ssh -i <KEY_PATH> <USER_NAME>@<FLOATING_IP>
      ```

      Здесь:

      * `<KEY_PATH>` — путь к файлу с закрытым ключом доступа к ВМ.
      * `<USER_NAME>` — имя пользователя ОС. Укажите имя в зависимости от ОС. Список имен приведен в разделе [Подключение к ВМ Linux](/ru/computing/iaas/instructions/vm/vm-connect/vm-connect-nix).
      * `<FLOATING_IP>` — внешний IP-адрес ВМ.

   1. Если на ВМ не установлены программные пакеты, указанные в {linkto(../ib_image_requirements#ib_image_requirements)[text=требованиях к образу сервиса]}, установите их.

      {caption(Пример команды, чтобы установить `curl` на ОС Ubuntu)[align=left;position=above]}
      ```console
      $ sudo apt install curl
      ```
      {/caption}

   1. Установите ПО image-based приложения на ВМ.
   1. Если требуется отправлять метрики в сервис Cloud Monitoring, установите агент мониторинга (подробнее — в разделе {linkto(../../../ib_cloud_monitoring/ib_cloud_monitoring_vm#ib_cloud_monitoring_telegraf_image)[text=%text]}).

1. Очистите ВМ от чувствительных данных:

   * Для ОС RHEL (CentOS, AlmaLinux, Rocky Linux) выполните команды:

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

   * Для ОС Debian (Ubuntu) выполните команды:

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

   {note:err}

   Перед публикацией сервиса в магазине образ будет опубликован в облачной платформе (подробнее — в разделе {linkto(../../../ibservice_add/ibservice_upload/ibservice_upload_publish_image#ibservice_upload_publish_image)[text=%text]}). На основе публичного образа будут развертываться инстансы сервиса у пользователей облачной платформы. Данные образа будут общедоступными.

   {/note}
1. Остановите ВМ:

   ```console
   $ sudo /sbin/shutdown -hP now
   ```

1. Создайте образ сервиса на основе диска ВМ:

   1. В меню слева перейдите в раздел **Облачные вычисления** → **Образы**.
   1. Нажмите кнопку **Создать образ**.
   1. В открывшемся окне выберите источник **Диск**.
   1. Выберите диск созданной и настроенной ВМ.

      Имя диска ВМ отображается на ее странице на вкладке **Диски**.
   1. Укажите имя образа.
   1. Подтвердите создание образа. ID созданного образа сервиса будет отображаться в строке этого образа.
