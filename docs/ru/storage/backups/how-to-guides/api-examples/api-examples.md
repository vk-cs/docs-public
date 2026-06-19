# {heading(Примеры использования API)[id=backup-api-examples]}

Далее приведены некоторые примеры использования {linkto(../../../../tools-for-using-services/api/api-spec/backup-api#api-spec-karboii)[text=API Karboii]} от {var(cloud)}.

Чтобы выполнить приведенные примеры:

1. Убедитесь, что {linkto(../../../../access/iam/instructions/manage-2fa#vk-cloud-account-manage-2fa)[text=включена]} двухфакторная аутентификация и {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable)[text=активирован]} доступ по API.
1. {linkto(../../../../tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token)[text=Получите токен доступа]} `X-Subject-Token`.
1. {linkto(../../../../tools-for-using-services/api/rest-api/endpoints#rest-api-endpoints)[text=Узнайте]} эндпоинт для сервиса Karboii.

В примерах запросов будут использоваться:

- эндпоинт:

  ```console
  https://mcs.mail.ru/infra/karboii/v1
  ```

- токен:

  ```console
  gBkZhRqVNHSuSAJBI6duyXXXX
  ```
- виртуальная машина:

  ```console
  +-----------------------------+-----------------------------------------------------------+
  | Field                       | Value                                                     |
  +-----------------------------+-----------------------------------------------------------+
  | id                          | 8f1ba150-XXXX-4ae4-9693-d18844b30d19                      |
  | name                        | Example_CentOS_STD2-2-4                             |
  | project_id                  | b5b7ffd4ef0547e5b222f44555dfXXXX                          |
  | status                      | ACTIVE                                                    |
  +-----------------------------+-----------------------------------------------------------+
  ```

## {heading(Получить список созданных планов резервного копирования)[id=backup-api-examples-get-plan]}

Пример запроса:

```console
curl -X GET \
-H "Accept: application/json" \
-H "X-Auth-Token: <ЗНАЧЕНИЕ_ТОКЕНА>" \
https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/plans
```

{cut(Пример ответа)}

```json
{
    "plans": [{
            "full_day": null,
            "id": "811bf3ff-24fa-405a-XXXX-be9172d3b13f",
            "name": "Backup_plan_19.05.2023",
            "project_id": "b5b7ffd4ef0547e5b222f44555dfXXXX",
            "provider_id": "37997f75-0637-XXXX-bf7e-49ff2ff11fa5",
            "resources": [{
                    "id": "6ed263c6-3066-XXXX-a8e1-140278a4XXXX",
                    "name": "example-instance",
                    "type": "OS::Nova::Server"
                }
            ],
            "retention_type": "max_backups",
            "status": "running"
        }
    ]
}
```

{/cut}

## {heading(Создать новый план резервного копирования для ВМ)[id=backup-api-examples-create-plan]}

Чтобы создать план резервного копирования:

1. {linkto(#backup-api-examples-get-provider-id)[text=Получите идентификатор]} сервиса (`provider_id`), который обеспечивает резервное копирование.
1. {linkto(#backup-api-examples-post-plan)[text=Создайте объект]} `plan`, в котором задаются основные настройки плана резервного копирования.
1. {linkto(#backup-api-examples-post-trigger)[text=Создайте триггер]}, задающий расписание запусков резервного копирования.

### {heading({counter(backup-api)}. Получить идентификатор провайдера)[id=backup-api-examples-get-provider-id]}

Пример запроса:

```console
curl -X GET \
    -H "Accept: application/json" \
    -H "X-Auth-Token: <ЗНАЧЕНИЕ_ТОКЕНА>" \
    https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/providers
```

{cut(Пример ответа)}

```json
{
    "providers": [{
            "id": "37997f75-0637-XXXX-bf7e-49ff2ff11fa5",
            "name": "OS::Nova"
        }, {
            "id": "7ab9410c-edda-XXXX-a51a-1bb806666cb3",
            "name": "OS::Trove"
        }
    ]
}
```

{/cut}

### {heading({counter(backup-api)}. Создать план резервного копирования)[id=backup-api-examples-post-plan]}

Будет использоваться `provider_id` = `37997f75-0637-XXXX-bf7e-49ff2ff11fa5`, поскольку создается план для виртуальной машины, а не инстанса БД.

Пример запроса:

```console
curl -X POST \
    -H "Accept: application/json" \
    -H "Content-type: application/json" \
    -H "X-Auth-Token: <ЗНАЧЕНИЕ_ТОКЕНА>" \
    -d '{
      "plan": {
        "name": "example-plan",
        "resources": [
          {
            "id": "8f1ba150-XXXX-4ae4-9693-d18844b30d19",
            "type": "OS::Nova::Server",
            "name": "Example_CentOS_STD2-2-4"
          }
        ],
        "provider_id": "37997f75-0637-XXXX-bf7e-49ff2ff11fa5",
        "full_day": null,
        "retention_type": "max_backups"
      }
    }' \
        https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/plans
```

{cut(Пример ответа)}

```json
{
    "plan": {
        "full_day": null,
        "id": "17f09168-62c3-419b-XXXX-8889aac8fb0f",
        "name": "example-plan",
        "project_id": "b5b7ffd4ef0547e5b222f44555dfXXXX",
        "provider_id": "37997f75-0637-XXXX-bf7e-49ff2ff11fa5",
        "resources": [{
                "id": "8f1ba150-XXXX-4ae4-9693-d18844b30d19",
                "name": "Example_CentOS_STD2-2-4",
                "type": "OS::Nova::Server"
            }
        ],
        "retention_type": "max_backups",
        "status": "running"
    }
}
```

{/cut}

### {heading({counter(backup-api)}. Создать триггер)[id=backup-api-examples-post-trigger]}

Пример запроса:

```console
curl -s -X POST \
    -H "Accept: application/json" \
    -H "Content-type: application/json" \
    -H "X-Auth-Token: <ЗНАЧЕНИЕ_ТОКЕНА>" \
    -d '{
      "trigger_info": {
        "name": "example-plan",
        "plan_id": "17f09168-62c3-419b-XXXX-8889aac8fb0f",
        "properties": {
          "pattern": "3 3 * * 2",
          "max_backups": 20,
          "next_time": 0
        }
      }
    }' \
    https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/triggers
```

{cut(Пример ответа)}

```json
{
    "trigger_info": {
        "id": "6d398d13-XXXX-41d5-bf9b-5ce6f0b1fb50",
        "name": "example-plan",
        "plan_id": "17f09168-62c3-419b-XXXX-8889aac8fb0f",
        "project_id": "b5b7ffd4ef0547e5b222f44555dfXXXX",
        "properties": {
            "max_backups": 10,
            "next_time": 1684810980,
            "pattern": "3 3 * * 2"
        }
    }
}
```

{/cut}
