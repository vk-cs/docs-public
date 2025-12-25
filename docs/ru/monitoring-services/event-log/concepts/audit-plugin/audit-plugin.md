Отправка логов слоя данных (data plane) в сервисе Cloud Audit подключается и настраивается с помощью плагина логирования `vkcloudaudit-fluent-bit-plugin`. Он работает с интерфейсом для [Golang-плагинов](https://docs.fluentbit.io/manual/development/golang-output-plugins), который предоставляется сервисом [Fluent Bit](https://docs.fluentbit.io/manual).

Примеры источников событий для слоя данных:

- Kubernetes (Kubernetes auditing);
- PostgreSQL (дополнение pgAudit);
- Операционная система (служба auditd).

Сбор событий из некоторые источников, например Kubernetes, уже интегрирован в сервис аудита.
Вы можете добавить любые другие источники, дополнительно настроив плагин.

## {heading(Параметры авторизации плагина)[id=auth_parameters]}

[cols="1,1,2,2", options="header"]
|===
| Параметр
| Обязательный
| Описание
| Где найти

| `auth_type`
| ![](/ru/assets/check.svg "inline")
| Тип аутентификации:

- `keystone`;
- `disabled`.

По умолчанию: `keystone`
|<!--- no ---!>

| `auth_url`
| ![](/ru/assets/check.svg "inline")
| Эндпоинт сервиса Keystone
| Параметр Auth URL в [личном кабинете VK Cloud](https://msk.cloud.vk.com/app/any/project/keys)

| `auth_timeout`
| ![](/ru/assets/no.svg "inline")
| Максимальное время, которое приложение ждет ответа от сервиса аутентификации при проверке учетных данных пользователя.

По умолчанию: `5s`
|<!--- no ---!>

| `project_id`
| ![](/ru/assets/check.svg "inline")
| Идентификатор проекта VK Cloud, в который будут записываться логи
| Параметр Project ID в [личном кабинете VK Cloud](https://msk.cloud.vk.com/app/any/project/keys).

Пример: `a1b2c3d4e5f6g7h8i9a1b2c3d4e5f6g7`

Не путайте с Project Name вида `mcs1234567890`

| `user_id`
| ![](/ru/assets/no.svg "inline")
| ID пользователя, от имени которого будут записываться логи
| <!--- no --->

| `user_name`
| ![](/ru/assets/no.svg "inline")
| Логин пользователя, от имени которого будут записываться логи
| Параметр Username в [личном кабинете VK Cloud](https://msk.cloud.vk.com/app/any/project/keys)

| `password`
| ![](/ru/assets/no.svg "inline")
| Пароль пользователя, от имени которой будут записываться логи
| Для `user_name` используется пароль для входа в личный кабинет VK Cloud

| `key_file`
| ![](/ru/assets/no.svg "inline")
| JSON-файл, который содержит значения `user_id` и `password`
| <!--- no --->

|===

Допустимые варианты указания учетных данных пользователя:

- `user_id` и `password`;
- `key_file`;
- `user_name` и `password` (например, ваш логин и пароль для входа в личный кабинет VK Cloud).

## {heading(Параметры конфигурации плагина)[id=conf_parameters]}

[cols="1,1,3", options="header"]
|===
| Параметр
| Обязательный
| Описание

| `server_host`
| ![](/ru/assets/check.svg "inline")
| Эндпоинт API для получения данных аудита:

- `https://msk.cloud.vk.com/audit/c2s` — для региона Москва;
- `https://kz.cloud.vk.com/audit/c2s` — для региона Казахстан

| `source_id`
| ![](/ru/assets/check.svg "inline")
| Идентификатор источника событий аудита (например, `databases` для сервиса Cloud Databases). Задается пользователем

| `timeout`
| ![](/ru/assets/no.svg "inline")
| Максимальное время ожидания запроса. По умолчанию: `5s`

| `idle_timeout`
| ![](/ru/assets/no.svg "inline")
| Время, через которое неактивное keepalive-соединение будет закрыто. По умолчанию: `1s`

| `max_conns`
| ![](/ru/assets/no.svg "inline")
| Максимальное количество соединений. По умолчанию: `512`

|===
