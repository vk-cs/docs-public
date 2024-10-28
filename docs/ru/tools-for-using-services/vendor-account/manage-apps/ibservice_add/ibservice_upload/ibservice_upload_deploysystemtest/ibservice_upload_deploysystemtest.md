# {heading(Тестирование манифестов с системой развертывания)[id=ibservice_upload_deploysystemtest]}

После локального тестирования манифестов Terraform и перед загрузкой сервисного пакета в {var(sys1)} рекомендуется протестировать манифесты `plans/<PLAN_NAME>/deployment/deploy.tf` с системой развертывания. Это позволит убедиться в том, что все описанные ресурсы могут быть созданы системой развертывания.

<warn>

Перед тестированием с системой развертывания убедитесь, что OpenStack PID внесен в список поставщиков (подробнее — в разделе {linkto(../ibservice_upload_prepare/#ibservice_upload_prepare)[text=%text]}).

</warn>

В процессе тестирования потребуются:

* Ключ для доступа к API. Ключ отображается в ЛК облачной платформы на странице настроек проекта (вкладка с информацией о доступе по API).
* Доменное имя облачной платформы — `https://cloud.vk.com`.

Чтобы протестировать манифест Terraform с системой развертывания:

1. В ЛК облачной платформы включите двухфакторную аутентификацию (2FA) и доступ по API (подробнее — в разделе [Управление 2FA](/ru/tools-for-using-services/vk-cloud-account/service-management/account-manage/manage-2fa)).
1. Выполните API-запросы:

   1. Загрузите манифест в систему развертывания.
   1. Проверьте текущую конфигурацию загруженного манифеста.
   1. Создайте инстанс сервиса.
   1. Удалите инстанс сервиса.

   Параметры API-запросов описаны в следующих разделах.

<info>

В процессе создания, после создания и после удаления инстанса сервиса проверьте его состояние. Если статус инстанса сервиса `failed`, посмотрите лог ошибки (подробнее — в разделе {linkto(#deploysystemtest_log)[text=%text]}).

</info>

## {heading(Загрузка манифеста Terraform в систему развертывания)[id=upload_terraform_manifest]}

Чтобы загрузить манифест `plans/<PLAN_NAME>/deployment/deploy.tf` в систему развертывания, выполните запрос с параметрами, приведенными в {linkto(#tab_request_params)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_request_params]} — Параметры запроса на загрузку манифеста)[align=right;position=above;id=tab_request_params;number={const(numb_tab_request_params)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|
Метод запроса
|
`POST`

|
Путь запроса
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/config/<MANIFEST_NAME>`

Здесь:

* `<CLOUD_HOST>` — доменное имя облачной платформы.
* `<MANIFEST_NAME>` — имя манифеста

|
Тело запроса (`--data-binary`)
|
Содержимое манифеста `plans/<PLAN_NAME>/deployment/deploy.tf`.

Если для тестирования требуются дополнительные ресурсы провайдеров, то добавьте их в тело запроса

|
`x-auth-token`
|
`<AUTH_TOKEN>` — ключ для доступа к API
|===
{/caption}

{caption(Пример запроса на загрузку манифеста)[align=left;position=above]}
```bash
$ curl -v -X POST https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 \
-H 'x-auth-token: <AUTH_TOKEN>' \
--data-binary "@deploy.tf"
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_codes)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_codes]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_codes;number={const(numb_tab_http_codes)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|201
|Манифест загружен или обновлен

|400, 500
|Ошибка выполнения запроса

|401
|Ошибка авторизации
|===
{/caption}

При отправке запроса с именем манифеста, уже существующим в системе развертывания, конфигурация этого манифеста будет обновлена.

Манифесты загружаются в рамках одного аккаунта пользователя.

Все ранее загруженные конфигурации манифеста сохраняются в системе развертывания, чтобы обеспечить корректную работу Terraform. Инстанс сервиса развертывается с текущей конфигурацией манифеста, которую можно просмотреть с помощью GET-запроса `/hoe/config/<MANIFEST_NAME>` (подробнее — в разделе {linkto(#check_terraform_configuration)[text=%text]}).

## {heading(Проверка текущей конфигурации манифеста Terraform)[id=check_terraform_configuration]}

Чтобы проверить текущую конфигурацию манифеста Terraform, находящуюся в системе развертывания, выполните запрос с параметрами, приведенными в {linkto(#tab_check_terraform_configuration)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_check_terraform_configuration]} — Параметры запроса на проверку текущей конфигурации манифеста)[align=right;position=above;id=tab_check_terraform_configuration;number={const(numb_tab_check_terraform_configuration)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|
Метод запроса
|
`GET`

|
Путь запроса
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/config/<MANIFEST_NAME>`

Здесь:

* `<CLOUD_HOST>` — доменное имя облачной платформы.
* `<MANIFEST_NAME>` — имя манифеста

|
`x-auth-token`
|
`<AUTH_TOKEN>` — ключ для доступа к API
|===
{/caption}

{caption(Пример запроса на проверку текущей конфигурации манифеста)[align=left;position=above]}
```bash
$ curl https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 \
-H 'x-auth-token: <AUTH_TOKEN>'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_codes_after_check)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_codes_after_check]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_codes_after_check;number={const(numb_tab_http_codes_after_check)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|
Запрос выполнен.

Ответ на запрос содержит текущую конфигурацию указанного манифеста Terraform

|401
|
Ошибка авторизации

|404
|
Манифест не найден

|500
|
Ошибка выполнения запроса
|===
{/caption}

## {heading(Создание инстанса сервиса)[id=create_service_instance]}

Чтобы создать инстанс сервиса, выполните запрос с параметрами, приведенными в {linkto(#tab_create_service_instance)[text=таблице %number]}. Будут созданы ресурсы текущей конфигурации манифеста Terraform.

{caption(Таблица {counter(table)[id=numb_tab_create_service_instance]} — Параметры запроса на создание инстанса сервиса)[align=right;position=above;id=tab_create_service_instance;number={const(numb_tab_create_service_instance)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|
Метод запроса
|
`POST`

|
Путь запроса
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/object`

Здесь `<CLOUD_HOST>` — доменное имя облачной платформы

|
`Content-Type`
|
`application/json`

|
Тело запроса (`--data`)
|
Укажите следующие параметры:

* `uuid` — идентификатор инстанса сервиса, сформированный с помощью генератора UUID4.
* `config` — имя манифеста.
* `vars` — внешние входные переменные манифеста. Задание значений для таких переменных в теле запроса имитирует действия пользователя в мастере конфигурации тарифного плана.

|
`x-auth-token`
|
`<AUTH_TOKEN>` — ключ для доступа к API
|===
{/caption}

{caption(Пример запроса на создание инстанса сервиса)[align=left;position=above]}
```bash
$ curl -v -X POST https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/object \
-H "Content-Type: application/json" \
-H 'x-auth-token: <AUTH_TOKEN>' \
--data '{
  "uuid": "675f6f08-2344-4cf4-a7f4-f02311f795d7",
  "config": "test_1.0",
  "vars": {
    "sub_network": "a793470c-36d8-4d2e-8b27-67af6c178c8e", // ID подсети
    "image_uuid": "163ff752-1390-4b72-a23c-b0001e3e65d3", // ID образа сервиса
    "volume_type": "ceph-ssd", // Имя диска
    "flavor_uuid": "6e61564f-3e68-4bd3-9ffa-08df5fd84514" // ID типа ВМ
  }
  }'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_codes_after_create)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_codes_after_create]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_codes_after_create;number={const(numb_tab_http_codes_after_create)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|201
|Инстанс сервиса создан

|400, 500
|Ошибка выполнения запроса

|401
|Ошибка авторизации
|===
{/caption}

## {heading(Удаление инстанса сервиса)[id=delete_service_instance]}

Чтобы удалить инстанс сервиса, созданный в результате выполнения манифеста Terraform, выполните запрос с параметрами, приведенными в {linkto(#tab_delete_service_instance)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_delete_service_instance]} — Параметры запроса на удаление инстанса сервиса)[align=right;position=above;id=tab_delete_service_instance;number={const(numb_tab_delete_service_instance)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|
Метод запроса
|
`DELETE`

|
Путь запроса
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/object/<OBJECT_UUID>`

Здесь:

* `<CLOUD_HOST>` — доменное имя облачной платформы.
* `<OBJECT_UUID>` — идентификатор развертывания инстанса сервиса. Значение соответствует параметру `uuid` в запросе на развертывание инстанса сервиса

|
`x-auth-token`
|
`<AUTH_TOKEN>` — ключ для доступа к API
|===
{/caption}

{caption(Пример запроса на удаление инстанса сервиса)[align=left;position=above]}
```bash
$ curl -v -X DELETE https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-2344-4cf4-a7f4-f02311f795d7 \
-H 'x-auth-token: <AUTH_TOKEN>'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_codes_after_delete)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_codes_after_delete]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_codes_after_delete;number={const(numb_tab_http_codes_after_delete)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|201
|Инстанс сервиса удален

|400, 500
|Ошибка выполнения запроса

|401
|Ошибка авторизации

|404
|Манифест не найден
|===
{/caption}

## {heading(Проверка состояния инстанса сервиса)[id=check_instance_status]}

Чтобы проверить состояние инстанса сервиса, выполните запрос с параметрами, приведенными в {linkto(#tab_check_instance_status)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_check_instance_status]} — Параметры запроса на проверку состояния инстанса сервиса)[align=right;position=above;id=tab_check_instance_status;number={const(numb_tab_check_instance_status)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|
Метод запроса
|
`GET`

|
Путь запроса
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/object/<OBJECT_UUID>`

Здесь:

* `<CLOUD_HOST>` — доменное имя облачной платформы.
* `<OBJECT_UUID>` — идентификатор развертывания инстанса сервиса. Значение соответствует параметру `uuid` в запросе на развертывание инстанса сервиса

|
`x-auth-token`
|
`<AUTH_TOKEN>` — ключ для доступа к API
|===
{/caption}

{caption(Пример запроса на проверку состояния инстанса сервиса)[align=left;position=above]}
```bash
$ curl https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-2344-4cf4-a7f4-f02311f795d7 \
-H 'x-auth-token: <AUTH_TOKEN>'
```
{/caption}

HTTP-коды ответа  приведены в {linkto(#tab_http_codes_status)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_codes_status]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_codes_status;number={const(numb_tab_http_codes_status)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|
Запрос выполнен.

Ответ на запрос содержит статус инстанса сервиса (`status`). Возможные статусы:

* `applying` — манифест выполняется, ресурсы в процессе создания.
* `running` — манифест выполнен, инстанс сервиса создан.
* `failed` — манифест завершен с ошибкой, инстанс сервиса не создан.
* `deleted` — инстанс сервиса удален

|401
|
Ошибка авторизации

|404
|
Идентификатор инстанса сервиса не найден

|500
|
Ошибка выполнения запроса
|===
{/caption}

{caption(Пример ответа на запрос, выполненный после удаления инстанса сервиса)[align=left;position=above]}
```yaml
{
    "uuid": "675f6f08-2344-4cf4-a7f4-f02311f795d7",
    "target_status": "deleted",
    "vars": {},
    "out": "{}",
    "status": "deleted",
    "conf_name": "user@vk.team",
    "conf_hash": "75587bae82f2492ea8a94b8b067c9898",
    "pid": "b66dde3d4d0e415aaf3412e17e53259c",
    "create_at": "2023-04-26T13:57:54.849565Z",
    "update_at": "2023-04-26T14:02:42.667399Z",
    "full_deployed": false,
    "attempts": 0,
    "max_attempts": 15
}
```
{/caption}

Здесь:

* `uuid` — идентификатор развертывания инстанса сервиса.
* `target_status` — целевой статус инстанса сервиса (`deleted` или `running`).
* `vars` — входные переменные манифеста.
* `out` — выходные параметры манифеста.
* `status` — текущий статус инстанса сервиса.
* `conf_name` — имя пользователя, развернувшего сервис.
* `conf_hash` — хеш конфигурации инстанса сервиса.
* `pid` — идентификатор проекта пользователя, развернувшего сервис (OpenStack PID).
* `create_at` — дата и время, когда инстанс сервиса был создан.
* `update_at` — дата и время последнего обновления инстанса сервиса системой развертывания.
* `full_deployed` — успешно ли развернут инстанс сервиса (для статуса `deleted` значение равно `false`).
* `attempts` — количество выполненных повторных попыток при развертывании инстанса сервиса.
* `max_attempts` — максимальное количество повторных попыток.

## {heading(Просмотр логов инстанса сервиса)[id=deploysystemtest_log]}

Чтобы просмотреть лог инстанса сервиса, выполните запрос с параметрами, приведенными в {linkto(#tab_log_request)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_log_request]} — Параметры запроса на вывод лога инстанса сервиса)[align=right;position=above;id=tab_log_request;number={const(numb_tab_log_request)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|
Метод запроса
|
`GET`

|
Путь запроса
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/logs/instance/<OBJECT_UUID>`

Здесь:

* `<CLOUD_HOST>` — доменное имя облачной платформы.
* `<OBJECT_UUID>` — идентификатор развертывания инстанса сервиса. Значение соответствует параметру `uuid` в запросе на развертывание инстанса сервиса

|
`x-auth-token`
|
`<AUTH_TOKEN>` — ключ для доступа к API
|===
{/caption}

{caption(Пример запроса на вывод лога инстанса сервиса)[align=left;position=above]}
```bash
$ curl https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/logs/instance/675f6f08-2344-4cf4-a7f4-f02311f795d7 \
-H 'x-auth-token: <AUTH_TOKEN>'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_codes_log)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_codes_log]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_codes_log;number={const(numb_tab_http_codes_log)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|
Запрос выполнен.

В ответе на запрос в параметре `message` отображаются логи инстанса сервиса

|401
|
Ошибка авторизации

|404
|
Идентификатор инстанса сервиса не найден

|500
|
Ошибка выполнения запроса
|===
{/caption}

{caption(Пример ответа на запрос)[align=left;position=above]}
```yaml
[
  {
    "message": " Apply complete! Resources: 1 added, 0 changed, 0 destroyed. ",
    "src": "terraform",
    "level": "debug",
    "created_at": "2024-05-30T08:32:24Z",
    "uuid": "675f6f08-2344-4cf4-a7f4-f02311f795d7",
    "broker_id": ""
  }
]
```
{/caption}

## {heading(Просмотр логов и результатов работы агента)[id=agent_log]}

Чтобы посмотреть логи и результаты работы агента:

1. Подключитесь к ВМ, на которой установлен агент, по протоколу удаленного доступа (подробнее — в разделе [Подключение к ВМ](/ru/computing/iaas/service-management/vm/vm-connect)) или с помощью VNC-консоли в ЛК облачной платформы.

   <info>

   Имя ВМ, на которой был установлен агент, задано в ресурсе `ivkcs_agent_init` или `ivkcs_user_data` в манифесте `plans/<PLAN_NAME>/deployment/deploy.tf`.

   </info>
1. Чтобы просмотреть логи, выполните команду `journalctl -u sower`.
1. Чтобы просмотреть результаты, перейдите в директорию `/etc/sower/result`.
