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

3. Установите параметры подключения к API Logging VK Cloud:

   ```bash
   /opt/fluent-bit/bin/fluent-bit -i dummy -e ./vkcloudlogs-fluent-bit.so -o vkcloudlogs -p "server_host_port=<адрес сервиса>" -p "user_id=<пользователь>" -p "password=<пароль>" -p "project_id=<PID проекта>" -p "auth_url=<эндпоинт адреса авторизации>"
   ```

   Здесь:

   - `auth_url` — [эндпоинт](/ru/manage/tools-for-using-services/rest-api/endpoints) Keystone; обязательный параметр;
   - `project_id` — [идентификатор](/ru/manage/tools-for-using-services/rest-api/endpoints#poluchenie_project_id) проекта VK Cloud в OpenStack; обязательный параметр;
   - `server_host_port` — адрес сервиса Cloud Logging (`cloudlogs.mcs.mail.ru:443`);
   - `user_id` — имя пользователя, от имени которого будут записываться логи;
   - `password` — пароль указанного пользователя.

   Дополнительные параметры можно посмотреть в [репозитории GitHub](https://github.com/vk-cs/cloudlogs-fluent-bit).
