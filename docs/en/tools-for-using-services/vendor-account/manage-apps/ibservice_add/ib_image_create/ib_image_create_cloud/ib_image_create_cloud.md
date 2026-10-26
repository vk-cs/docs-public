# {heading(Создание через веб-интерфейс облачной платформы)[id=ib_image_create_cloud]}

{include(/en/_includes/_translated_by_ai_en.md)}

Чтобы создать образ сервиса через веб-интерфейс облачной платформы:

1. Войдите в веб-интерфейс облачной платформы.
1. Создайте ВМ:

   1. В меню слева выберите раздел **Облачные вычисления** → **Виртуальные машины**.
   1. Нажмите кнопку **Добавить**.
   1. В форме создания ВМ укажите параметры ВМ.

      {note:warn}

      ОС должна соответствовать [требованиям к образу сервиса](/en/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based#image_based_req_image).

      {/note}
   1. Подтвердите создание ВМ.

1. Установите программное обеспечение на ВМ:

   1. Перейдите на страницу созданной ВМ.
   1. Назначьте внешний IP-адрес с помощью кнопки **Назначить внешний IP**.
   1. Подключитесь к ВМ по SSH:

      ```console
      $ ssh -i <KEY_PATH> <USER_NAME>@<FLOATING_IP>
      ```

      Здесь:

      * `<KEY_PATH>` — путь к файлу закрытого ключа для доступа к ВМ.
      * `<USER_NAME>` — имя пользователя ОС. Укажите имя в зависимости от ОС. Список имен приведен в разделе [Подключение к Linux ВМ](/en/computing/iaas/instructions/vm/vm-connect/vm-connect-nix).
      * `<FLOATING_IP>` — внешний IP-адрес ВМ.

   1. Если программные пакеты, указанные в [требованиях к образу сервиса](/en/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based#image_based_req_image), не установлены на ВМ, установите их.

      {caption(Пример команды для установки `curl` на Ubuntu ОС)[align=left;position=above]}
      ```console
      $ sudo apt install curl
      ```
      {/caption}

   1. Установите ПО image-based приложения на ВМ.
   1. Если требуется отправлять метрики в сервис Cloud Monitoring, установите агент мониторинга (подробнее — в разделе [Системные метрики ВМ](../../../ib_cloud_monitoring/ib_cloud_monitoring_vm)).

1. Очистите ВМ от чувствительных данных:

   * Для ОС RHEL (CentOS, AlmaLinux, Rocky Linux) выполните команды:

      ```console

# Очистить логи cloud-init
      $ sudo cloud-init clean --log --seed

# Очистить SSH-ключи
      $ sudo rm -f /etc/ssh/*host*key*

# Очистить логи
      $ sudo find /var/log -maxdepth 5 -type f -exec rm -fv {} \;

# Удалить временные файлы
      $ sudo rm -rf /tmp/* /var/tmp/*

# Очистить системные файлы
      $ sudo truncate -s 0 /etc/machine-id /etc/resolv.conf /var/log/audit/audit.log /var/log/wtmp \
      /var/log/lastlog /var/log/btmp /var/log/cron /var/log/maillog /var/log/messages /var/log/secure \
      /var/log/spooler

# Удалить системные файлы
      $ sudo rm -rf /etc/hostname /etc/machine-info /var/lib/systemd/credential.secret /var/lib/cloud /var/log/tuned \
      /var/log/qemu-ga /var/log/anaconda /var/lib/systemd/random-seed

# Инициализировать диск, заполнить его нулями
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

# Очистить SSH-ключи
      $ sudo rm -f /etc/ssh/*host*key*

# Очистить логи
      $ sudo find /var/log -maxdepth 5 -type f -exec rm -fv {} \;

# Удалить временные файлы
      $ sudo rm -rf /tmp/* /var/tmp/*

# Очистить файл machine-id
      $ sudo truncate -s 0 /etc/machine-id /var/lib/dbus/machine-id

# Инициализировать диск, заполнить его нулями
      $ sudo dd if=/dev/zero of=/zeroed_file bs=1M oflag=direct || sudo rm -f /zeroed_file

# Очистить кеш менеджера пакетов
      $ sudo apt-get -y autoremove --purge
      $ sudo apt-get -y clean
      $ sudo apt-get -y autoclean

# Очистить историю команд
      $ history -c

# Синхронизировать файловую систему
      $ sudo sync
      ```

   {note:err}

   Перед публикацией сервиса в магазине образ будет опубликован в облачной платформе (подробнее — в разделе {linkto(../../../ibservice_add/ibservice_upload/ibservice_upload_publish_image#ibservice_upload_publish_image)[text=%text]}). Экземпляры сервиса будут развернуты для пользователей облачной платформы на основе публичного образа. Данные образа будут общедоступными.

   {/note}
1. Остановите ВМ:

   ```console
   $ sudo /sbin/shutdown -hP now
   ```

1. Создайте образ сервиса на основе диска ВМ:

   1. В меню слева выберите раздел **Облачные вычисления** → **Образы**.
   1. Нажмите кнопку **Создать образ**.
   1. В открывшемся окне выберите источник **Диск**.
   1. Выберите диск созданной и настроенной ВМ.

      Имя диска ВМ отображается на её странице на вкладке **Диски**.
   1. Укажите имя образа.
   1. Подтвердите создание образа. ID созданного образа сервиса будет отображаться в строке этого образа.