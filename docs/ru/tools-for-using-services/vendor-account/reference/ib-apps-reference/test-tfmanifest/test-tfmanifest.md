Ниже описаны методы API для тестирования манифеста Terraform с системой развертывания.

## {heading(Загрузка манифеста Terraform в систему развертывания)[id=upload_terraform_manifest]}

Запрос загружает манифест Terraform в систему развертывания.

Параметры запроса на загрузку манифеста `plans/<ИМЯ_ПЛАНА>/deployment/deploy.tf`:

[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<ХОСТ_VK_CLOUD>/marketplace/api/infra-api/api/v1-public/hoe/config/<ИМЯ_МАНИФЕСТА>`

Здесь:

* `<ХОСТ_VK_CLOUD>` — доменное имя платформы VK Cloud (`https://cloud.vk.com`).
* `<ИМЯ_МАНИФЕСТА>` — имя манифеста в системе развертывания

|Тело запроса (`--data-binary`)
|Содержимое манифеста `plans/<ИМЯ_ПЛАНА>/deployment/deploy.tf`.

Если для тестирования требуются дополнительные ресурсы провайдеров, их нужно добавить в тело запроса

|`x-auth-token`
|`<ТОКЕН_ДОСТУПА>` — токен доступа к API
|===

Пример запроса:

{tabs}

{tab(Linux (bash))}

```console
curl -v -X POST https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 \
-H 'x-auth-token: <ТОКЕН_ДОСТУПА>' \
--data-binary "@deploy.tf"
```

{/tab}

{tab(Windows (cmd))}

```console
curl -v -X POST https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 ^
-H "x-auth-token: <ТОКЕН_ДОСТУПА>" ^
--data-binary "@deploy.tf"
```

{/tab}

{/tabs}

HTTP-коды ответа:

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

При отправке запроса с именем манифеста, уже существующим в системе развертывания, конфигурация этого манифеста будет обновлена. Все ранее загруженные конфигурации манифеста будут сохранены в системе развертывания, чтобы обеспечить корректную работу Terraform.

## {heading(Проверка текущей конфигурации манифеста Terraform)[id=check_terraform_configuration]}

Запрос возвращает текущую конфигурацию указанного в запросе манифеста Terraform.

Параметры запроса:

[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`GET`

|Путь запроса
|`https://<ХОСТ_VK_CLOUD>/marketplace/api/infra-api/api/v1-public/hoe/config/<ИМЯ_МАНИФЕСТА>`

Здесь:

* `<ХОСТ_VK_CLOUD>` — доменное имя платформы VK Cloud (`https://cloud.vk.com`).
* `<ИМЯ_МАНИФЕСТА>` — имя манифеста в системе развертывания

|`x-auth-token`
|`<ТОКЕН_ДОСТУПА>` — ключ для доступа к API
|===

Пример запроса:

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 \
-H 'x-auth-token: <ТОКЕН_ДОСТУПА>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 ^
-H "x-auth-token: <ТОКЕН_ДОСТУПА>"
```

{/tab}

{/tabs}

HTTP-коды ответа:

[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|Запрос выполнен.

Ответ на запрос содержит текущую конфигурацию указанного манифеста Terraform

|401
|Ошибка авторизации

|404
|Манифест не найден

|500
|Ошибка выполнения запроса
|===

## {heading(Создание инстанса сервиса)[id=create_service_instance]}

Запрос создает ресурсы согласно текущей конфигурации манифеста Terraform.

Параметры запроса на создание инстанса сервиса:

[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<ХОСТ_VK_CLOUD>/marketplace/api/infra-api/api/v1-public/hoe/object`

Здесь `<ХОСТ_VK_CLOUD>` — доменное имя платформы VK Cloud (`https://cloud.vk.com`)

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)

|Должны быть указаны следующие параметры:

* `uuid` — идентификатор инстанса сервиса, сформированный с помощью генератора UUID4.
* `config` — имя манифеста в системе развертывания.
* `vars` — внешние входные переменные манифеста. Задание значений для таких переменных в теле запроса имитирует действия пользователя в мастере конфигурации тарифного плана

|`x-auth-token`
|`<ТОКЕН_ДОСТУПА>` — ключ для доступа к API
|===

Пример запроса:

{tabs}

{tab(Linux (bash))}

```console
curl -v -X POST https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/object \
-H "Content-Type: application/json" \
-H 'x-auth-token: <ТОКЕН_ДОСТУПА>' \
--data '{
  "uuid": "675f6f08-XXXX-f02311f795d7",
  "config": "test_1.0",
  "vars": {
    "sub_network": "a793470c-XXXX-67af6c178c8e",
    "image_uuid": "163ff752-XXXX-b0001e3e65d3",
    "volume_type": "ceph-ssd",
    "flavor_uuid": "6e61564f-XXXX-08df5fd84514"
    }
  }'
```

{/tab}

{tab(Windows (cmd))}

```console
curl -v -X POST https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/object ^
-H "Content-Type: application/json" ^
-H "x-auth-token: <ТОКЕН_ДОСТУПА>" ^
--data "{\"uuid\": \"675f6f08-XXXX-f02311f795d7\", \"config\": \"test_1.0\", \"vars\": {\"sub_network\": \"a793470c-XXXX-67af6c178c8e\", \"image_uuid\": \"163ff752-XXXX-b0001e3e65d3\", \"volume_type\": \"ceph-ssd\", \"flavor_uuid\": \"6e61564f-XXXX-08df5fd84514\"}}"
```

{/tab}

{/tabs}

Здесь:

* `sub_network` — ID подсети.
* `image_uuid` — ID образа сервиса.
* `volume_type` — тип диска.
* `flavor_uuid` — ID шаблона конфигурации ВМ.

HTTP-коды ответа:

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

## {heading(Удаление инстанса сервиса)[id=delete_service_instance]}

Запрос удаляет инстанс сервиса, созданный в результате выполнения манифеста Terraform

Параметры запроса:

[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`DELETE`

|Путь запроса
|`https://<ХОСТ_VK_CLOUD>/marketplace/api/infra-api/api/v1-public/hoe/object/<UUID_ОБЪЕКТА>`

Здесь:

* `<ХОСТ_VK_CLOUD>` — доменное имя платформы VK Cloud (`https://cloud.vk.com`).
* `<UUID_ОБЪЕКТА>` — идентификатор развертывания инстанса сервиса. Значение соответствует параметру `uuid` в запросе на [создание инстанса сервиса](#create_service_instance)

|`x-auth-token`
|`<ТОКЕН_ДОСТУПА>` — ключ для доступа к API
|===

Пример запроса:

{tabs}

{tab(Linux (bash))}

```console
curl -v -X DELETE https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <ТОКЕН_ДОСТУПА>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl -v -X DELETE https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <ТОКЕН_ДОСТУПА>"
```

{/tab}

{/tabs}

HTTP-коды ответа:

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

## {heading(Проверка состояния инстанса сервиса)[id=check_instance_status]}

Запрос возвращает статус инстанса сервиса.

[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`GET`

|Путь запроса
|`https://<ХОСТ_VK_CLOUD>/marketplace/api/infra-api/api/v1-public/hoe/object/<UUID_ОБЪЕКТА>`

Здесь:

* `<ХОСТ_VK_CLOUD>` — доменное имя платформы VK Cloud (`https://cloud.vk.com`).
* `<UUID_ОБЪЕКТА>` — идентификатор развертывания инстанса сервиса. Значение соответствует параметру `uuid` в запросе на [создание инстанса сервиса](#create_service_instance)

|`x-auth-token`
|`<ТОКЕН_ДОСТУПА>` — ключ для доступа к API
|===

Пример запроса:

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <ТОКЕН_ДОСТУПА>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <ТОКЕН_ДОСТУПА>"
```

{/tab}

{/tabs}

HTTP-коды ответа:

[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|Запрос выполнен.

Ответ на запрос содержит статус инстанса сервиса (`status`). Возможные статусы:

* `applying` — манифест выполняется, ресурсы в процессе создания.
* `running` — манифест выполнен, инстанс сервиса создан.
* `failed` — манифест завершен с ошибкой, инстанс сервиса не создан.
* `deleted` — инстанс сервиса удален

|401
|Ошибка авторизации

|404
|Идентификатор инстанса сервиса не найден

|500
|Ошибка выполнения запроса
|===

Пример ответа на запрос, выполненный после удаления инстанса сервиса:

```yaml
{
    "uuid": "675f6f08-XXXX-f02311f795d7",
    "target_status": "deleted",
    "vars": {},
    "out": "{}",
    "status": "deleted",
    "conf_name": "user@vk.team",
    "conf_hash": "75587baeXXXX",
    "pid": "b66dde3dXXXX",
    "create_at": "2023-04-26T13:57:54.849565Z",
    "update_at": "2023-04-26T14:02:42.667399Z",
    "full_deployed": false,
    "attempts": 0,
    "max_attempts": 15
}
```

Здесь:

* `uuid` — идентификатор развертывания инстанса сервиса.
* `target_status` — целевой статус инстанса сервиса (`deleted` или `running`).
* `vars` — входные переменные манифеста.
* `out` — выходные параметры манифеста.
* `status` — текущий статус инстанса сервиса.
* `conf_name` — имя пользователя, развернувшего сервис.
* `conf_hash` — хеш конфигурации инстанса сервиса.
* `pid` — идентификатор проекта пользователя, развернувшего сервис (Project ID).
* `create_at` — дата и время, когда инстанс сервиса был создан.
* `update_at` — дата и время последнего обновления инстанса сервиса системой развертывания.
* `full_deployed` — успешно ли развернут инстанс сервиса (для статуса `deleted` значение равно `false`).
* `attempts` — количество выполненных повторных попыток при развертывании инстанса сервиса.
* `max_attempts` — максимальное количество повторных попыток.

## {heading(Просмотр логов инстанса сервиса)[id=deploysystemtest_log]}

Запрос возвращает логи инстанса сервиса.

Параметры запроса:

[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`GET`

|Путь запроса
|`https://<ХОСТ_VK_CLOUD>/marketplace/api/infra-api/api/v1-public/logs/instance/<UUID_ОБЪЕКТА>`

Здесь:

* `<ХОСТ_VK_CLOUD>` — доменное имя платформы VK Cloud (`https://cloud.vk.com`).
* `<UUID_ОБЪЕКТА>` — идентификатор развертывания инстанса сервиса. Значение соответствует параметру `uuid` в запросе на [создание инстанса сервиса](#create_service_instance)

|`x-auth-token`
|`<ТОКЕН_ДОСТУПА>` — ключ для доступа к API
|===

Пример запроса:

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/logs/instance/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <ТОКЕН_ДОСТУПА>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/logs/instance/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <ТОКЕН_ДОСТУПА>"
```

{/tab}

{/tabs}

HTTP-коды ответа:

[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|Запрос выполнен.

В ответе на запрос в параметре `message` отображаются логи инстанса сервиса

|401
|Ошибка авторизации

|404
|Идентификатор инстанса сервиса не найден

|500
|Ошибка выполнения запроса
|===

Пример ответа:

```yaml
[
  {
    "message": " Apply complete! Resources: 1 added, 0 changed, 0 destroyed. ",
    "src": "terraform",
    "level": "debug",
    "created_at": "2024-05-30T08:32:24Z",
    "uuid": "675f6f08-XXXX-f02311f795d7",
    "broker_id": ""
  }
]
```
