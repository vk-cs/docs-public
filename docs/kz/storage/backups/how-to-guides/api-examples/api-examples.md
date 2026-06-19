# {heading(API пайдалану мысалдары)[id=backup-api-examples]}

{include(/kz/_includes/_translated_by_ai.md)}

Төменде {var(cloud)} платформасындағы {linkto(../../../../tools-for-using-services/api/api-spec/backup-api#api-spec-karboii)[text=API Karboii]} пайдалану бойынша кейбір мысалдар келтірілген.

Келтірілген мысалдарды орындау үшін:

1. Екі факторлы аутентификация {linkto(../../../../access/iam/instructions/manage-2fa#vk-cloud-account-manage-2fa)[text=қосылғанына]} және API арқылы қолжетімділік {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable)[text=белсендірілгеніне]} көз жеткізіңіз.
1. {linkto(../../../../tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token)[text=`X-Subject-Token` қатынау токенін алыңыз]}.
1. Karboii сервисі үшін эндпоинтті {linkto(../../../../tools-for-using-services/api/rest-api/endpoints#rest-api-endpoints)[text=біліңіз]}.

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

## {heading(Жасалған резервтік көшіру жоспарларының тізімін алу)[id=backup-api-examples-get-plan]}

Сұрау мысалы:

```console
curl -X GET -H "Accept: application/json" -H "X-Auth-Token: <ЗНАЧЕНИЕ_ТОКЕНА>" https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/plans
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

## {heading(ВМ үшін жаңа резервтік көшіру жоспарын жасау)[id=backup-api-examples-create-plan]}

Резервтік көшіру жоспарын жасау үшін:

1. Резервтік көшіруді қамтамасыз ететін сервистің (`provider_id`) {linkto(#backup-api-examples-get-provider-id)[text=идентификаторын алыңыз]}.
1. Резервтік көшіру жоспарының негізгі баптаулары берілетін `plan` {linkto(#backup-api-examples-post-plan)[text=объектісін жасаңыз]}.
1. Резервтік көшіру іске қосылу кестесін беретін {linkto(#backup-api-examples-post-trigger)[text=триггерді жасаңыз]}.

### {heading({counter(backup-api)}. Провайдер идентификаторын алу)[id=backup-api-examples-get-provider-id]}

Сұрау мысалы:

```console
curl -X GET     -H "Accept: application/json"     -H "X-Auth-Token: <ЗНАЧЕНИЕ_ТОКЕНА>"     https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/providers
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

### {heading({counter(backup-api)}. Резервтік көшіру жоспарын жасау)[id=backup-api-examples-post-plan]}

`provider_id` = `37997f75-0637-XXXX-bf7e-49ff2ff11fa5` пайдаланылады, себебі жоспар БД инстансы үшін емес, виртуалды машина үшін жасалады.

Сұрау мысалы:

```console
curl -X POST     -H "Accept: application/json"     -H "Content-type: application/json"     -H "X-Auth-Token: <ЗНАЧЕНИЕ_ТОКЕНА>"     -d '{
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
    }'         https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/plans
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

### {heading({counter(backup-api)}. Триггер жасау)[id=backup-api-examples-post-trigger]}

Сұрау мысалы:

```console
curl -s -X POST     -H "Accept: application/json"     -H "Content-type: application/json"     -H "X-Auth-Token: <ЗНАЧЕНИЕ_ТОКЕНА>"     -d '{
      "trigger_info": {
        "name": "example-plan",
        "plan_id": "17f09168-62c3-419b-XXXX-8889aac8fb0f",
        "properties": {
          "pattern": "3 3 * * 2",
          "max_backups": 20,
          "next_time": 0
        }
      }
    }'     https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/triggers
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
