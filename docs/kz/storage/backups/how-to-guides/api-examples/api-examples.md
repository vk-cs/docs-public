{include(/kz/_includes/_translated_by_ai.md)}

Төменде VK Cloud платформасындағы [API Karboii](/kz/tools-for-using-services/api/api-spec/backup-api) пайдалану бойынша кейбір мысалдар келтірілген.

Келтірілген мысалдарды орындау үшін:

1. Екі факторлы аутентификация [қосылғанына](/kz/access/iam/instructions/manage-2fa) және API арқылы қолжетімділік [белсендірілгеніне](/kz/tools-for-using-services/api/rest-api/enable-api) көз жеткізіңіз.
1. `X-Subject-Token` [қатынау токенін алыңыз](/kz/tools-for-using-services/api/rest-api/case-keystone-token) `X-Subject-Token`.
1. Karboii сервисі үшін эндпоинтті [біліңіз](https://kz.cloud.vk.com/app/project/endpoints).

Сұрау мысалдарында мыналар қолданылады:

- эндпоинт:

  ```console
  https://mcs.mail.ru/infra/karboii/v1
  ```

- токен:

  ```console
  gBkZhRqVNHSuSAJBI6duyXXXX
  ```
- виртуалды машина:

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

## Жасалған резервтік көшіру жоспарларының тізімін алу

Сұрау мысалы:

```console
curl -X GET \
-H "Accept: application/json" \
-H "X-Auth-Token: <ЗНАЧЕНИЕ_ТОКЕНА>" \
https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/plans
```

{cut(Жауап мысалы)}

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

## ВМ үшін жаңа резервтік көшіру жоспарын жасау

Резервтік көшіру жоспарын жасау үшін:

1. Резервтік көшіруді қамтамасыз ететін сервистің (`provider_id`) [идентификаторын алыңыз](#get_provider_id).
1. Резервтік көшіру жоспарының негізгі баптаулары берілетін `plan` [объектісін жасаңыз](#create_plan).
1. Резервтік көшіру іске қосылу кестесін беретін [триггерді жасаңыз](#create_trigger).

### {heading({counter(backup-api)}. Провайдер идентификаторын алу)[id=get_provider_id]}

Сұрау мысалы:

```console
curl -X GET \
    -H "Accept: application/json" \
    -H "X-Auth-Token: <ЗНАЧЕНИЕ_ТОКЕНА>" \
    https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/providers
```

{cut(Жауап мысалы)}

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

### {heading({counter(backup-api)}. Резервтік көшіру жоспарын жасау)[id=create_plan]}

`provider_id` = `37997f75-0637-XXXX-bf7e-49ff2ff11fa5` пайдаланылады, себебі жоспар БД инстансы үшін емес, виртуалды машина үшін жасалады.

Сұрау мысалы:

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

{cut(Жауап мысалы)}

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

### {heading({counter(backup-api)}. Триггер жасау)[id=create_trigger]}

Сұрау мысалы:

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

{cut(Жауап мысалы)}

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
