Отправка логов пользовательских приложений в сервис Cloud Logging подключается и настраивается с помощью плагина логирования `vkcloudlogs-fluent-bit-plugin`. Он работает с интерфейсом для [Golang-плагинов](https://docs.fluentbit.io/manual/development/golang-output-plugins), который предоставляется сервисом [Fluent Bit](https://docs.fluentbit.io/manual).

## {heading(Параметры авторизации плагина)[id=auth_parameters]}

[cols="1,1,2,2", options="header"]
|===
| Параметр
| Обязательный
| Описание
| Где найти

| `auth_url`
| ![](/ru/assets/check.svg "inline")
| Эндпоинт сервиса Keystone
| Параметр Auth URL в [личном кабинете VK Cloud](https://msk.cloud.vk.com/app/any/project/keys)

| `project_id`
| ![](/ru/assets/check.svg "inline")
| Идентификатор проекта VK Cloud, в который будут записываться логи
| Параметр Project ID в [личном кабинете VK Cloud](https://msk.cloud.vk.com/app/any/project/keys).

Пример: `a1b2c3d4e5f6g7h8i9a1b2c3d4e5f6g7`

Не путайте с Project Name вида `mcs1234567890`

| `user_id`
| ![](/ru/assets/no.svg "inline")
| ID пользователя, от имени которого будут записываться логи
| Создается в личном кабинете VK Cloud на вкладке [Генерация учетных данных](https://msk.cloud.vk.com/app/services/monitoring/logging/settings)

| `user_name`
| ![](/ru/assets/no.svg "inline")
| Логин пользователя, от имени которого будут записываться логи
| Параметр Username в [личном кабинете VK Cloud](https://msk.cloud.vk.com/app/any/project/keys)

| `password`
| ![](/ru/assets/no.svg "inline")
| Пароль пользователя, от имени которого будут записываться логи
| Для `user_id` пароль создается в личном кабинете VK Cloud на вкладке [Генерация учетных данных](https://msk.cloud.vk.com/app/services/monitoring/logging/settings).

Для `user_name` используется пароль для входа в личный кабинет VK Cloud

| `key_file`
| ![](/ru/assets/no.svg "inline")
| JSON-файл, который содержит значения `user_id` и `password`
| <!--- no ---!>

| `internal`
| ![](/ru/assets/no.svg "inline")
| Параметр, указывающий, будет ли включена запись технических логов сервисов:
 
* `true` — включена;
* `false` — выключена.

По умолчанию: `true`
| <!--- no ---!>

|===

Допустимые варианты указания учетных данных пользователя:

- `user_id` и `password`;
- `key_file`;
- `user_name` и `password` (например, ваш логин и пароль для входа в личный кабинет VK Cloud).

<warn>

Аккаунты, сгенерированные для сервиса Cloud Logging, обладают только правом записывать логи. Поэтому авторизация с их использованием рекомендуется как более безопасная.

</warn>

## {heading(Параметры конфигурации плагина)[id=conf_parameters]}

[cols="1,1,3", options="header"]
|===
| Параметр
| Обязательный
| Описание

| `server_host_port`
| ![](/ru/assets/check.svg "inline")
| Адрес сервиса Cloud Logging (`cloudlogs.mcs.mail.ru:443`)

| `service_id` 
| ![](/ru/assets/no.svg "inline")
| Идентификатор сервиса в системе логирования:

* `databases` — сервис Cloud Databases.
* `containers` — сервис Cloud Containers.
* `bigdata` — сервис Cloud Big Data.
* `vdi` — сервис Cloud Desktop.

Если не указан, будет присвоено значение `default`.

Если необходимо, создайте собственные идентификаторы через [техническую поддержку](/ru/contacts) или самостоятельно [на вкладке](https://msk.cloud.vk.com/app/services/monitoring/logging/settings) **Прочие ресурсы** в настройках раздела **Мониторинг → Логирование**

| `group_id`
| ![](/ru/assets/no.svg "inline")
| Идентификатор группы логов. По умолчанию: значение параметра [Tag](https://docs.fluentbit.io/manual/concepts/key-concepts#tag), присвоенное событию в Fluent Bit

| `group_id_key`
| ![](/ru/assets/no.svg "inline")
| Имя параметра, содержащего идентификатор группы логов. Используется, если не указан параметр `group_id`

| `stream_id`
| ![](/ru/assets/no.svg "inline")
| Идентификатор источника логов, например, идентификатор инстанса (`instance_id`) или ВМ (`vm_id`). По умолчанию: пустое значение

| `stream_id_key`
| ![](/ru/assets/no.svg "inline")
| Имя параметра, содержащего идентификатор источника логов. Используется, если не указан параметр `stream_id`

| `message_key` 
| ![](/ru/assets/no.svg "inline")
| Имя параметра, содержащего сообщение, которое будет добавляться в каждую запись лога. По умолчанию: `message`

| `level_key`
| ![](/ru/assets/no.svg "inline")
| Имя параметра, содержащего значение уровня логирования. По умолчанию: `level`

| `default_level`
| ![](/ru/assets/no.svg "inline")
| Значение уровня логирования. Используется, если не указан параметр с именем, заданным в `level_key`. По умолчанию: `debug`

| `default_payload`
| ![](/ru/assets/no.svg "inline")
| Строка в формате JSON, содержащая пары ключ/значение, которые будут добавляться в `payload` каждой записи лога.

Пример: `{"tag": "example", "case": 3}`

По умолчанию: пустая строка

| `tls_on`
| ![](/ru/assets/no.svg "inline")
| Параметр, указывающий, включен ли протокол TLS для адреса `server_host_port`:

* `true` — включен;
* `false` — выключен.

По умолчанию: `true`

| `tls_verify`
| ![](/ru/assets/no.svg "inline")
| Параметр, указывающий, включена ли проверка сертификата TLS для адреса `server_host_port`:

* `true` — включена;
* `false` — выключена.

По умолчанию: `true`
|===

Примеры настройки плагина с помощью параметров авторизации и конфигурации приведены в разделах [Установка плагина](../../service-management/connect-plugin) и [Управление агентом логирования](../../service-management/manage-vkcloudlogs-plugin#configure_agent).
