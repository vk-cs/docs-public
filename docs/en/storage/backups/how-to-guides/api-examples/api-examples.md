The following are some examples of using the VK Cloud [Karboii API](/ru/tools-for-using-services/api/api-spec/backup-api "change-lang").

{note:info}

To follow the examples given:

1. Make sure that [two-factor authentication](/en/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa) and [API access](/en/tools-for-using-services/api/rest-api/enable-api) are enabled.
1. [Get an access token](/en/tools-for-using-services/api/rest-api/case-keystone-token) `X-Subject-Token`.
1. [Find out](https://msk.cloud.vk.com/app/en/project/endpoints) the endpoint for the Karboii service.

{/note}

The requests will use:

- endpoint:

  ```console
  https://mcs.mail.ru/infra/karboii/v1
  ```

- token:

  ```console
  gBkZhRqVNHSuSAJBI6duyXXXX
  ```
- virtual machine:

  ```console
  +-----------------------------+-----------------------------------------------------------+
  | Field                       | Value                                                     |
  +-----------------------------+-----------------------------------------------------------+
  | id                          | 8f1ba150-XXXX-4ae4-9693-d18844b30d19                      |
  | name                        | Example_CentOS_STD1-1                             |
  | project_id                  | b5b7ffd4ef0547e5b222f44555dfXXXX                          |
  | status                      | ACTIVE                                                    |
  +-----------------------------+-----------------------------------------------------------+
  ```

## Get list of created backup plans

Request example:

```console
curl -X GET \
-H "Accept: application/json" \
-H "X-Auth-Token: <TOKEN_VALUE>" \
https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/plans
```

{cut(Response example)}

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

## Create new backup plan for VM

### 1. Get prodiver_id

Request example:

```console
curl -X GET \
    -H "Accept: application/json" \
    -H "X-Auth-Token: <TOKEN_VALUE>" \
    https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/providers
```

{cut(Response example)}

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

### 2. Create backup plan

Will be used `prodiver_id` = `37997f75-0637-XXXX-bf7e-49ff2ff11fa5`, because a plan is being created for a virtual machine (not a DB instance).

Request example:

```console
curl -X POST \
    -H "Accept: application/json" \
    -H "Content-type: application/json" \
    -H "X-Auth-Token: <TOKEN_VALUE>" \
    -d '{
      "plan": {
        "name": "example-plan",
        "resources": [
          {
            "id": "8f1ba150-XXXX-4ae4-9693-d18844b30d19",
            "type": "OS::Nova::Server",
            "name": "Example_CentOS_STD1-1"
          }
        ],
        "provider_id": "37997f75-0637-XXXX-bf7e-49ff2ff11fa5",
        "full_day": null,
        "retention_type": "max_backups"
      }
    }' \
        https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/plans
```

{cut(Response example)}

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
                "name": "Example_CentOS_STD1-1",
                "type": "OS::Nova::Server"
            }
        ],
        "retention_type": "max_backups",
        "status": "running"
    }
}
```

{/cut}

### 3. Create trigger

Request example:

```console
curl -s -X POST \
    -H "Accept: application/json" \
    -H "Content-type: application/json" \
    -H "X-Auth-Token: <TOKEN_VALUE>" \
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

{cut(Response example)}

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
