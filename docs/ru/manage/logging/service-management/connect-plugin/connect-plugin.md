Чтобы настроить логирование для виртуальной машины:

1. [Установите Fluent Bit](../../quick-start/), если этого не было сделано ранее.
1. Установите плагин `vkcloudlogs-fluent-bit-plugin`.
1. Настройте плагин для отправки логов в сервис Cloud Logging.
1. Включите агент сбора логов `vkcloudlogs-fluent-bit.service`.

Далее приведены шаги по настройке плагина `vkcloudlogs-fluent-bit-plugin`.

## 1. Установите плагин vkcloudlogs-fluent-bit-plugin

<tabs>
<tablist>
<tab>CentOS 7.X, CentOS 8.X, AlmaLinux 9</tab>
<tab>Ubuntu 22.X, Astra Linux SE 1.7.2 «Орел»</tab>
<tab>AltLinux Server p10</tab>
</tablist>
<tabpanel>

```bash
sudo rpm -i https://cloudlogging.hb.ru-msk.vkcs.cloud/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin-0.1.3-1.x86_64.rpm
```

</tabpanel>
<tabpanel>

```bash
curl -sSLo vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb https://cloudlogging.hb.ru-msk.vkcs.cloud/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb
sudo dpkg -i vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb
```

</tabpanel>
<tabpanel>

```bash
sudo apt-get install https://cloudlogging.hb.ru-msk.vkcs.cloud/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin-0.1.3-1.x86_64.rpm
```

</tabpanel>
</tabs>

После установки появится сервис `vkcloudlogs-fluent-bit.service`. По умолчанию он выключен.

<info>

Сервис `vkcloudlogs-fluent-bit.service` работает с файлами:

- `/etc/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit.conf` — основной файл конфигурации сервиса с описаниями источников и путей назначения для логирования, подробнее в [документации плагина](https://github.com/vk-cs/cloudlogs-fluent-bit);
- `/etc/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugins.conf` — конфигурация подключения плагина.

</info>

## 2. Настройте файл конфигурации vkcloudlogs-fluent-bit.conf

1. Узнайте авторизационные параметры для вашего проекта:

   - `auth_url` — [эндпоинт](/ru/tools-for-using-services/rest-api/endpoints) Keystone;
   - `project_id` — [идентификатор](/ru/tools-for-using-services/rest-api/endpoints#poluchenie_project_id) проекта VK Cloud в OpenStack;
   - `server_host_port` — адрес сервиса Cloud Logging (`cloudlogs.mcs.mail.ru:443`);
   - `user_id` — имя пользователя, от имени которого будут записываться логи; [генерируется](../generate-userdata/) отдельно;
   - `password` — пароль указанного пользователя;
   - `service_id` — [идентификатор сервиса](/ru/tools-for-using-services/api/logging) в системе логирования (по умолчанию `default`). При необходимости создайте новые идентификаторы [на вкладке](https://msk.cloud.vk.com/app/services/monitoring/logging/settings/services) **Прочие ресурсы** раздела **Логирование**.

1. Укажите параметры подключения для плагина в файле `vkcloudlogs-fluent-bit.conf`:

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
      project_id        <PID проекта>
      server_host_port  <адрес сервиса>
      user_id           <пользователь>
      password          <пароль пользователя>
   ```

   </details>

## 3. Активируйте сервис vkcloudlogs-fluent-bit.service

1. Выполните команду:

   ```bash
   sudo systemctl enable vkcloudlogs-fluent-bit.service
   sudo systemctl start vkcloudlogs-fluent-bit.service
   ```

1. Подождите несколько минут, чтобы накопились данные.
1. Проверьте наличие логов в [личном кабинете](https://msk.cloud.vk.com/app/) VK Cloud в разделе **Мониторинг** → **Логирование**.
