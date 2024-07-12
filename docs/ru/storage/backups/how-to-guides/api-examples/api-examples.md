Далее приведены некоторые примеры использования [API Karboii](/ru/tools-for-using-services/api/api-spec/backup-api) от VK Cloud.

Чтобы выполнить приведенные примеры:

1. Убедитесь, что [включена](/ru/tools-for-using-services/vk-cloud-account/service-management/account-manage/manage-2fa) двухфакторная аутентификация и [активирован](/ru/tools-for-using-services/rest-api/enable-api) доступ по API.
1. [Получите токен доступа](/ru/tools-for-using-services/api/rest-api/case-keystone-token) `X-Subject-Token`.
1. [Узнайте](https://msk.cloud.vk.com/app/project/endpoints) эндпоинт для сервиса Karboii.

В примерах запросов будут использоваться:

- эндпоинт:

  ```bash
  https://mcs.mail.ru/infra/karboii/v1
  ```

- токен:

  ```bash
  gBkZhRqVNHSuSAJBI6duyXXXX
  ```
- виртуальная машина:

  ```bash
  +-----------------------------+-----------------------------------------------------------+
  | Field                       | Value                                                     |
  +-----------------------------+-----------------------------------------------------------+
  | id                          | 8f1ba150-XXXX-4ae4-9693-d18844b30d19                      |
  | name                        | Example_CentOS_STD2-2-4                             |
  | project_id                  | b5b7ffd4ef0547e5b222f44555dfXXXX                          |
  | status                      | ACTIVE                                                    |
  +-----------------------------+-----------------------------------------------------------+
  ```

## Получить список созданных планов резервного копирования

Пример запроса:

```bash
curl -X GET \
-H "Accept: application/json" \
-H "X-Auth-Token: gBkZhRqVNHSuSAJBI6duyXXXX" \
https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/plans
```

<details>
   <summary>Пример ответа</summary>

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

</details>

## Создать новый план резервного копирования для ВМ

Чтобы создать план резервного копирования:

1. [Получите идентификатор](#get_provider_id) сервиса (`provider_id`), который обеспечивает резервное копирование.
1. [Создайте объект](#create_plan) `plan`, в котором задаются основные настройки плана резервного копирования.
1. [Создайте триггер](#create_trigger), задающий расписание запусков резервного копирования.

### {heading(1. Получить идентификатор провайдера)[id=get_provider_id]}

Пример запроса:

```bash
curl -X GET \
    -H "Accept: application/json" \
    -H "X-Auth-Token: gBkZhRqVNHSuSAJBI6duyXXXX" \
    https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/providers
```

<details>
   <summary>Пример ответа</summary>

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

</details>

### {heading(2. Создать план резервного копирования)[id=create_plan]}

Будет использоваться `provider_id` = `37997f75-0637-XXXX-bf7e-49ff2ff11fa5`, поскольку создается план для виртуальной машины, а не инстанса БД.

Пример запроса:

```bash
curl -X POST \
    -H "Accept: application/json" \
    -H "Content-type: application/json" \
    -H "X-Auth-Token: gBkZhRqVNHSuSAJBI6duyXXXX" \
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

<details>
   <summary>Пример ответа</summary>

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

</details>

### {heading(3. Создать триггер)[id=create_trigger]}

Пример запроса:

```bash
curl -s -X POST \
    -H "Accept: application/json" \
    -H "Content-type: application/json" \
    -H "X-Auth-Token: gBkZhRqVNHSuSAJBI6duyXXXX" \
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

<details>
   <summary>Пример ответа</summary>

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

</details>
