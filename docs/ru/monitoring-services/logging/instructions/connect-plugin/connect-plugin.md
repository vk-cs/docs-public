# {heading(Установка плагина)[id=logging-connect-plugin]}

1. Установите на ВМ [Fluent Bit](https://docs.fluentbit.io/manual/installation/linux/ubuntu) версии 2.1.9:

   ```console
   curl https://cloudlogging.hb.ru-msk.vkcloud-storage.ru/fluent-bit-install-scripts/install.sh | FLUENT_BIT_RELEASE_VERSION=2.1.9 sh
   ```
   
1. Установите плагин `vkcloudlogs-fluent-bit-plugin`.

   {tabs}

   {tab(РЕД ОС 7.3, CentOS 7.X, CentOS 8.X, AlmaLinux 9.X)}

   ```console
   sudo rpm -i https://cloudlogging.hb.ru-msk.vkcloud-storage.ru/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin-0.1.3-1.x86_64.rpm
   ```

   {/tab}

   {tab(Ubuntu 22.X, Ubuntu 24.X, Astra Linux SE 1.7.X)}

   ```console
   curl -sSLo vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb https://cloudlogging.hb.ru-msk.vkcloud-storage.ru/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb
   sudo dpkg -i vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb
   ```

   {/tab}

   {tab(AltLinux Server p10)}

   ```console
   sudo apt-get install https://cloudlogging.hb.ru-msk.vkcloud-storage.ru/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin-0.1.3-1.x86_64.rpm
   ```

   {/tab}

   {/tabs}

   После установки появится агент сбора логов `vkcloudlogs-fluent-bit.service`. По умолчанию он отключен.

   {note:info}
   Агент `vkcloudlogs-fluent-bit.service` работает с файлами:

   - `/etc/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit.conf` — основной файл конфигурации агента с описаниями источников и путей назначения для логирования. Подробнее в разделе {linkto(../../concepts/logging-plugin#logging-logging-plugin)[text=%text]} и в [официальной документации Fluent Bit](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode).
   - `/etc/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugins.conf` — конфигурация подключения плагина.
   {/note}

1. Настройте плагин для отправки логов в сервис Cloud Logging.

   1. {linkto(../../concepts/logging-plugin#logging-auth-parameters)[text=Узнайте]} параметры авторизации плагина для вашего проекта.
   1. Укажите параметры подключения плагина в файле `vkcloudlogs-fluent-bit.conf`:

      {cut(vkcloudlogs-fluent-bit.conf)}

      В этом примере настраивается логирование данных с `ssh.service` (секция `[INPUT]`) в сервис Cloud Logging (секция `[OUTPUT]`).

      ```conf
      [INPUT]
         Name            systemd
         Systemd_Filter  _SYSTEMD_UNIT=ssh.service
         Lowercase       On
         Read_From_Tail  On
         Tag             system.*

      [OUTPUT]
         Name              vkcloudlogs
         Match             system.*
         auth_url          <ЭНДПОИНТ_KEYSTONE>
         project_id        <PID_ПРОЕКТА>
         server_host_port  <АДРЕС_СЕРВИСА>
         user_id           <ID_ПОЛЬЗОВАТЕЛЯ>
         password          <ПАРОЛЬ_ПОЛЬЗОВАТЕЛЯ>
      ```

      {/cut}

1. Включите агент сбора логов `vkcloudlogs-fluent-bit.service`, выполнив команду:

   ```console
   sudo systemctl enable vkcloudlogs-fluent-bit.service
   sudo systemctl start vkcloudlogs-fluent-bit.service
   ```

1. Подождите несколько минут, чтобы накопились данные.
1. Проверьте наличие логов в {ifdef(public)}[личном кабинете](https://msk.cloud.vk.com/app/services/monitoring/logging){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=личном кабинете]}{/ifndef} {var(cloud)} в разделе **Мониторинг** → **Логирование**.
