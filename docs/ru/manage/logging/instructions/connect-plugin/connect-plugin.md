Чтобы установить и настроить плагин `cloudlogs-fluent-bit`:

1. Клонируйте репозиторий с исходным кодом плагина:

   ```bash
   git clone https://github.com/vk-cs/cloudlogs-fluent-bit
   ```

1. Перейдите в скачанный репозиторий и скомпилируйте библиотеку `cloudlogs-fluent-bit`:

   ```bash
   cd cloudlogs-fluent-bit
   make
   ```

1. Установите параметры подключения к API Logging VK Cloud:

   ```bash
   /opt/fluent-bit/bin/fluent-bit -i dummy -e ./vkcloudlogs-fluent-bit.so -o vkcloudlogs -p "server_host_port=<адрес сервиса>" -p "user_id=<пользователь>" -p "password=<пароль пользователя>" -p "project_id=<PID проекта>" -p "auth_url=<эндпоинт адреса авторизации>" -p "service_id=<идентификатор сервиса>"
   ```

   Здесь:

   - `auth_url` — [эндпоинт](/ru/manage/tools-for-using-services/rest-api/endpoints) Keystone; обязательный параметр;
   - `project_id` — [идентификатор](/ru/manage/tools-for-using-services/rest-api/endpoints#poluchenie_project_id) проекта VK Cloud в OpenStack; обязательный параметр;
   - `server_host_port` — адрес сервиса Cloud Logging (`cloudlogs.mcs.mail.ru:443`);
   - `user_id` — имя пользователя, от имени которого будут записываться логи; генерируется на этапе [подключения](../../quick-start/) сервиса;
   - `password` — пароль указанного пользователя;
   - `service_id` — [идентификатор сервиса](/ru/additionals/api/logging) в системе логирования (по умолчанию `default`). При необходимости создайте новые идентификаторы [на вкладке](https://msk.cloud.vk.com/app/services/monitoring/logging/settings/services) **Прочие ресурсы** раздела **Логирование**.

   <details>
      <summary>Пример установки параметров</summary>

   ```bash
   /opt/fluent-bit/bin/fluent-bit -i dummy -e ./vkcloudlogs-fluent-bit.so -o vkcloudlogs -p "server_host_port=cloudlogs.mcs.mail.ru:443" -p "user_id=XXXX0782a1e240fdac38a9d22c89XXXX" -p "password=1XXf$0MZ9mdXXX" -p "project_id=XXXXffd4ef0547e5b222f44555dfXXXX" -p "auth_url=https://infra.mail.ru:35357/v3/" -p "service_id=databases"
   ```

   </details>

   <info>

   Дополнительные параметры можно посмотреть в [репозитории GitHub](https://github.com/vk-cs/cloudlogs-fluent-bit).

   </info>

1. Установите параметры `cloudlogs-fluent-bit` для отправки логов в VK Cloud:

   1. Создайте репозиторий для хранения конфигурационных файлов:

      ```bash
      mkdir -p /etc/fluentbit-cloudlogs/
      ```

   1. Создайте в репозитории файл `config.conf` с содержимым:

      <details>
        <summary>config.conf</summary>

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
          auth_url          <эндпоинт адреса авторизации>
          project_id        <PID проекта>
          server_host_port  <адрес сервиса>
          user_id           <пользователь>
          password          <пароль пользователя>
      ```

      </details>

   1. Создайте в репозитории файл `parsers.conf` с содержимым:

      <details>
        <summary>parsers.conf</summary>

      В этом примере настраивается формат отправляемых данных для сервиса `ssh`.

      ```conf
      [PARSER]
        Name        ssh
        Format      json
        Time_Key    time
        Time_Format %Y-%m-%dT%H:%M:%S.%L
      ```

      </details>

   1. Проверьте работу плагина с помощью команды:

      ```bash
      /opt/fluent-bit/bin/fluent-bit --config=/etc/fluentbit-cloudlogs/config.conf --parser=/etc/fluentbit-cloudlogs/parsers.conf -e ./vkcloudlogs-fluent-bit.so
      ```

1. Если операционная система поддерживает [systemd](https://systemd.io):

   1. Создайте файл сервиса `/etc/systemd/system/fluentbit-cloudlogs.service`:

      <details>
        <summary>fluentbit-cloudlogs.service</summary>

      ```conf
      [Unit]
      Description=Fluentbit Cloudlog VKCS
      After=network-online.target
   
      [Service]
      ExecStart=/opt/fluent-bit/bin/fluent-bit --config=/etc/fluentbit-cloudlogs/config.conf --parser=/etc/fluentbit-cloudlogs/parsers.conf -e /home/ubuntu/cloudlogs-fluent-bit/vkcloudlogs-fluent-bit.so
      Restart=on-failure
      RestartSec=5s
   
      [Install]
      WantedBy=multi-user.target
      ```

      </details>

   1. Перезапустите сервис `fluentbit-cloudlogs` с помощью команд:

      ```bash
      systemctl daemon-reload
      systemctl start fluentbit-cloudlogs
      systemctl enable fluentbit-cloudlogs
      ```

   1. Проверьте статус сервиса `fluentbit-cloudlogs` с помощью команды:

      ```bash
      systemctl status fluentbit-cloudlogs
      ```

1. Проверьте наличие ssh-логов в личном кабинете VK Cloud в разделе **Мониторинг** → **Логирование**.
