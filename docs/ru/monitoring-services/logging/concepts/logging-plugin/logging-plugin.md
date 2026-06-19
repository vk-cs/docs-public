# {heading(Плагин логирования)[id=logging-logging-plugin]}

Отправка логов пользовательских приложений в сервис Cloud Logging подключается и настраивается с помощью плагина логирования `vkcloudlogs-fluent-bit-plugin`. Он работает с интерфейсом для [Golang-плагинов](https://docs.fluentbit.io/manual/development/golang-output-plugins), который предоставляется сервисом [Fluent Bit](https://docs.fluentbit.io/manual).

## {heading(Параметры авторизации плагина)[id=logging-auth-parameters]}

{ifdef(private-pdf,private-pg-pdf,private-cert)}
Параметры авторизации плагина логирования приведены в {linkto(#tab_logging-auth-parameters)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_logging-auth-parameters]} — Параметры авторизации плагина)[align=right;position=above;id=tab_logging-auth-parameters;number={const(numb_tab_logging-auth-parameters)}]}
{/ifdef}
[cols="1,1,2,2", options="header"]
|===
| Параметр
| Обязательный
| Описание
| Где найти

| `auth_url`
| ![](../../../../assets/check.svg "inline")
| Эндпоинт сервиса Keystone
| Параметр Auth URL в {ifdef(public)}[личном кабинете {var(cloud)}](https://msk.cloud.vk.com/app/any/project/keys){/ifdef}{ifndef(public)}личном кабинете {var(cloud)}{/ifndef}

| `project_id`
| ![](../../../../assets/check.svg "inline")
| Идентификатор проекта {var(cloud)}, в который будут записываться логи
| Параметр Project ID в {ifdef(public)}[личном кабинете {var(cloud)}](https://msk.cloud.vk.com/app/any/project/keys){/ifdef}{ifndef(public)}личном кабинете {var(cloud)}{/ifndef}.

Пример: `a1b2c3d4e5f6g7h8i9a1b2c3d4e5f6g7`

Не путайте с Project Name вида `mcs1234567890`

| `user_id`
| ![](../../../../assets/no.svg "inline")
| ID пользователя, от имени которого будут записываться логи
| Создается в личном кабинете {var(cloud)} на вкладке {ifdef(public)}[Генерация учетных данных](https://msk.cloud.vk.com/app/services/monitoring/logging/settings){/ifdef}{ifndef(public)}Генерация учетных данных{/ifndef}

| `user_name`
| ![](../../../../assets/no.svg "inline")
| Логин пользователя, от имени которого будут записываться логи
| Параметр Username в {ifdef(public)}[личном кабинете {var(cloud)}](https://msk.cloud.vk.com/app/any/project/keys){/ifdef}{ifndef(public)}личном кабинете {var(cloud)}{/ifndef}

| `password`
| ![](../../../../assets/no.svg "inline")
| Пароль пользователя, от имени которого будут записываться логи
| Для `user_id` пароль создается в личном кабинете {var(cloud)} на вкладке {ifdef(public)}[Генерация учетных данных](https://msk.cloud.vk.com/app/services/monitoring/logging/settings){/ifdef}{ifndef(public)}Генерация учетных данных{/ifndef}.

Для `user_name` используется пароль для входа в личный кабинет {var(cloud)}

| `key_file`
| ![](../../../../assets/no.svg "inline")
| JSON-файл, который содержит значения `user_id` и `password`
| <!--- no ---!>

| `internal`
| ![](../../../../assets/no.svg "inline")
| Параметр, указывающий, будет ли включена запись технических логов сервисов:
 
- `true` — включена;
- `false` — отключена.

По умолчанию: `true`
| <!--- no ---!>

|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}
{/ifdef}
Допустимые варианты указания учетных данных пользователя:

- `user_id` и `password`;
- `key_file`;
- `user_name` и `password` (например, ваш логин и пароль для входа в личный кабинет {var(cloud)}).

{note:warn}
Аккаунты, сгенерированные для сервиса Cloud Logging, обладают только правом записывать логи. Поэтому авторизация с их использованием рекомендуется как более безопасная.
{/note}

## {heading(Параметры конфигурации плагина)[id=logging-conf-parameters]}

{ifdef(private-pdf,private-pg-pdf,private-cert)}
Параметры конфигурации плагина логирования приведены в {linkto(#tab_logging-conf-parameters)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_logging-conf-parameters]} — Параметры конфигурации плагина)[align=right;position=above;id=tab_logging-conf-parameters;number={const(numb_tab_logging-conf-parameters)}]}
{/ifdef}
[cols="1,1,3", options="header"]
|===
| Параметр
| Обязательный
| Описание

| `server_host_port`
| ![](../../../../assets/check.svg "inline")
| Адрес сервиса Cloud Logging (`cloudlogs.mcs.mail.ru:443`)

| `service_id` 
| ![](../../../../assets/no.svg "inline")
| Идентификатор сервиса в системе логирования:

- `databases` — сервис Cloud Databases.
- `containers` — сервис Cloud Containers.
- `vdi` — сервис Cloud Desktop.

Если не указан, будет присвоено значение `default`.

Если необходимо, создайте собственные идентификаторы через {ifdef(public)}[техническую поддержку](/ru/contacts){/ifdef}{ifndef(public)}техническую поддержку{/ifndef} или самостоятельно {ifdef(public)}[на вкладке](https://msk.cloud.vk.com/app/services/monitoring/logging/settings){/ifdef}{ifndef(public)}на вкладке{/ifndef} **Прочие ресурсы** в настройках раздела **Мониторинг → Логирование**

| `group_id`
| ![](../../../../assets/no.svg "inline")
| Идентификатор группы логов. По умолчанию: значение параметра [Tag](https://docs.fluentbit.io/manual/concepts/key-concepts#tag), присвоенное событию в Fluent Bit

| `group_id_key`
| ![](../../../../assets/no.svg "inline")
| Имя параметра, содержащего идентификатор группы логов. Используется, если не указан параметр `group_id`

| `stream_id`
| ![](../../../../assets/no.svg "inline")
| Идентификатор источника логов, например, идентификатор инстанса (`instance_id`) или ВМ (`vm_id`). По умолчанию: пустое значение

| `stream_id_key`
| ![](../../../../assets/no.svg "inline")
| Имя параметра, содержащего идентификатор источника логов. Используется, если не указан параметр `stream_id`

| `message_key` 
| ![](../../../../assets/no.svg "inline")
| Имя параметра, содержащего сообщение, которое будет добавляться в каждую запись лога. По умолчанию: `message`

| `level_key`
| ![](../../../../assets/no.svg "inline")
| Имя параметра, содержащего значение уровня логирования. По умолчанию: `level`

| `default_level`
| ![](../../../../assets/no.svg "inline")
| Значение уровня логирования. Используется, если не указан параметр с именем, заданным в `level_key`. По умолчанию: `debug`

| `default_payload`
| ![](../../../../assets/no.svg "inline")
| Строка в формате JSON, содержащая пары ключ/значение, которые будут добавляться в `payload` каждой записи лога.

Пример: `{"tag": "example", "case": 3}`

По умолчанию: пустая строка

| `tls_on`
| ![](../../../../assets/no.svg "inline")
| Параметр, указывающий, включен ли протокол TLS для адреса `server_host_port`:

- `true` — включен;
- `false` — отключен.

По умолчанию: `true`

| `tls_verify`
| ![](../../../../assets/no.svg "inline")
| Параметр, указывающий, включена ли проверка сертификата TLS для адреса `server_host_port`:

- `true` — включена;
- `false` — отключена.

По умолчанию: `true`
|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}
{/ifdef}

Примеры настройки плагина с помощью параметров авторизации и конфигурации приведены в разделах {linkto(../../instructions/connect-plugin#logging-connect-plugin)[text=%text]} и {linkto(../../instructions/manage-vkcloudlogs-plugin#logging-manage-plugin)[text=%text]}.
