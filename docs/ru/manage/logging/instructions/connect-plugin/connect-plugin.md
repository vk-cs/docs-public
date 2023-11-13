Fluent Bit — инструмент с открытым исходным кодом для сбора и обработки логов. Fluent Bit собирает, парсит и фильтрует сообщения из различных источников ввода и сохраняет их в хранилище. Затем сообщения поступают в маршрутизатор, который определяет, в какой выход их отправить. Для работы с различными источниками ввода и выходами используются плагины.

Подробнее о Fluent Bit читайте в [официальной документации](https://docs.fluentbit.io/manual).

Чтобы установить и настроить Fluent Bit:

1. Клонируйте репозиторий с исходным кодом плагина:

  ```bash
  git clone https://github.com/vk-cs/cloudlogs-fluent-bit
  ```

2. Перейдите в скачанный репозиторий и скомпилируйте библиотеку `cloudlogs-fluent-bit`:

  ```bash
  cd cloudlogs-fluent-bit
  make
  ```

3. Вам необходимо предварительно сгенерировать себе пользователя и пароль для доступа к сервису, сделать это можно по ссылке - https://msk.cloud.vk.com/app/*/services/monitoring/logging/settings/fluentbit. Нажать кнопку "Сгенерировать" и сохранить свои данные в любое защищенное локальное хранилище данных.

4. Установите параметры подключения к API Logging VK Cloud:

  Попробуем запустить процесс флюентбита в консоли

  ```bash
  /opt/fluent-bit/bin/fluent-bit -i dummy -e ./vkcloudlogs-fluent-bit.so -o vkcloudlogs -p "server_host_port=cloudlogs.mcs.mail.ru:443" -p "user_id=<user_id>" -p "password=<password>" -p "project_id=<project_id>" -p "auth_url=https://infra.mail.ru:35357/v3/";
  ```

Здесь:

- `auth_url` — [эндпоинт](/ru/manage/tools-for-using-services/rest-api/endpoints) Keystone; обязательный параметр;
- `project_id` — [идентификатор](/ru/manage/tools-for-using-services/rest-api/endpoints#poluchenie_project_id) проекта VK Cloud в OpenStack; обязательный параметр (можно получить на шаге 3)
- `server_host_port` — адрес сервиса Cloud Logging (`cloudlogs.mcs.mail.ru:443`);
- `user_id` — имя пользователя, которое было сгенерировано на шаге 3
- `password` — пароль указанного пользователя, также сгенерированный на шаге 3
- `service_id` - индификатор сервиса в системе логирования (по умолчанию default). Создать новые индификаторы можно на вкладке - https://msk.cloud.vk.com/app/*/services/monitoring/logging/settings/services

Дополнительные параметры можно посмотреть в [репозитории GitHub](https://github.com/vk-cs/cloudlogs-fluent-bit).

5. Зададим параметры для fluent-bit, на основании которых он будет отправлять наши логи в систему

Создаем папку для хранения конфиг файлов
  ```bash
  mkdir -p /etc/fluentbit-cloudlogs/;
  ```

Создадим файл config.conf, `vim /etc/fluentbit-cloudlogs/config.conf` (в данном примере будем логировать данные с ssh.service), в данном конфиге описываем данные для INPUT и OUTPUT, которые определяют какие логи мы будем записывать и куда их отправлять (включая данные для подключения к удаленному сервису)

  ```bash
  [INPUT]
      Name            systemd
      Systemd_Filter  _SYSTEMD_UNIT=ssh.service
      Lowercase       On
      Read_From_Tail  On
      Tag             system.*

  [OUTPUT]
      Name              vkcloudlogs
      Match             system.*
      auth_url          https://infra.mail.ru:35357/v3/
      project_id        <project_id>
      server_host_port  cloudlogs.mcs.mail.ru:443
      user_id           <user_id>
      password          <password_id>
  ```

Создадим файл parsers.conf, `vim /etc/fluentbit-cloudlogs/parsers.conf`, в данном файле опишем в каком формате будет происходить отправка данных для сервиса ssh
  ```bash
[PARSER]
  Name        ssh
  Format      json
  Time_Key    time
  Time_Format %Y-%m-%dT%H:%M:%S.%L

  ```

Проверим работу нашего fluen-bit из консоли

  ```bash
  /opt/fluent-bit/bin/fluent-bit --config=/etc/fluentbit-cloudlogs/config.conf --parser=/etc/fluentbit-cloudlogs/parsers.conf -e ./vkcloudlogs-fluent-bit.so;

  ```

6. Если ваша операционная система поддерживает systemd, то нужно создать systemd юнит `vim /etc/systemd/system/fluentbit-cloudlogs.service`:

  ```bash
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

Затем произвести реинициализацию systemd с помощью команды

  ```bash
  systemctl daemon-reload
  systemctl start fluentbit-cloudlogs
  systemctl enable fluentbit-cloudlogs
  ```

В конце концов проверим, что сервис успешно запустился:

  ```bash
  systemctl status fluentbit-cloudlogs
  ```

Также проверим наличие ssh логов на странице - https://msk.cloud.vk.com/app/*/services/monitoring/logging (для эмуляции можно попробовать несколько раз неуспешно зайти по ssh на сервер с неправильным пользователем)
