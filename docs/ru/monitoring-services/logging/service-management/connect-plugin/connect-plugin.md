1. [Установите Fluent Bit](../../quick-start), если это не было сделано ранее.
1. Установите плагин `vkcloudlogs-fluent-bit-plugin`.

   <tabs>
   <tablist>
   <tab>CentOS 7.X, CentOS 8.X, AlmaLinux 9</tab>
   <tab>Ubuntu 22.X, Astra Linux SE 1.7.2 «Орел»</tab>
   <tab>AltLinux Server p10</tab>
   </tablist>
   <tabpanel>

   ```bash
   sudo rpm -i https://cloudlogging.hb.ru-msk.vkcloud-storage.ru/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin-0.1.3-1.x86_64.rpm
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   curl -sSLo vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb https://cloudlogging.hb.ru-msk.vkcloud-storage.ru/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb
   sudo dpkg -i vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   sudo apt-get install https://cloudlogging.hb.ru-msk.vkcloud-storage.ru/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin-0.1.3-1.x86_64.rpm
   ```

   </tabpanel>
   </tabs>

   После установки появится агент сбора логов `vkcloudlogs-fluent-bit.service`. По умолчанию он выключен.

   <info>

   Агент `vkcloudlogs-fluent-bit.service` работает с файлами:

   - `/etc/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit.conf` — основной файл конфигурации агента с описаниями источников и путей назначения для логирования. Подробнее в разделе [Плагин логирования](../../concepts/logging-plugin) и в [официальной документации Fluent Bit](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode).
   - `/etc/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugins.conf` — конфигурация подключения плагина.

   </info>

1. Настройте плагин для отправки логов в сервис Cloud Logging.

   1. [Узнайте](../../concepts/logging-plugin#auth_parameters) параметры авторизации плагина для вашего проекта.
   1. Укажите параметры подключения плагина в файле `vkcloudlogs-fluent-bit.conf`:

      <details>
      <summary>vkcloudlogs-fluent-bit.conf</summary>

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
         auth_url          <эндпоинт Keystone>
         project_id        <ID проекта VK Cloud>
         server_host_port  <адрес сервиса Cloud Logging>
         user_id           <ID пользователя>
         password          <пароль пользователя>
      ```

      </details>

1. Включите агент сбора логов `vkcloudlogs-fluent-bit.service`, выполнив команду:

   ```bash
   sudo systemctl enable vkcloudlogs-fluent-bit.service
   sudo systemctl start vkcloudlogs-fluent-bit.service
   ```

1. Подождите несколько минут, чтобы накопились данные.
1. Проверьте наличие логов в [личном кабинете](https://msk.cloud.vk.com/app/services/monitoring/logging) VK Cloud в разделе **Мониторинг** → **Логирование**.
