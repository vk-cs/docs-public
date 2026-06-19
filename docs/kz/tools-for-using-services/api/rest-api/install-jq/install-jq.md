# {heading(jq орнату)[id=rest-api-jq]}

{include(/kz/_includes/_translated_by_ai.md)}

JSON форматындағы деректер шығысын сүзгілеу үшін [jq](https://jqlang.github.io/jq/) утилитасын пайдаланыңыз. Ол платформадан алынатын API және OpenStack деректеріне қолданылады.

jq жүйеңізде алдын ала орнатылған болуы керек.

{cut(Пішімделмеген JSON мысалы)}

  ```json
  {"status":200,"body":{"object_labels":[{"status":0,"name":"file","labels":[{"eng":"Close-up","rus":"Крупный план","eng_categories":[],"rus_categories":[],"prob":0.4843,"coord":[165,0,834,477]},{"eng":"Macro Photography","rus":"Макросъемка","eng_categories":[],"rus_categories":[],"prob":0.5021,"coord":[165,0,834,477]},{"eng":"Plant","rus":"Растение","eng_categories":["Plants"],"rus_categories":["Растения"],"prob":0.827,"coord":[165,0,834,668]},{"eng":"Leaf","rus":"Листок","eng_categories":[],"rus_categories":[],"prob":0.6623,"coord":[165,0,834,573]}]}],"scene_labels":[{"status":0,"name":"file","labels":[{"eng":"Rice Paddy","rus":"Рисовое поле","eng_categories":[],"rus_categories":[],"prob":0.6255}]}]},"htmlencoded":false,"last_modified":0}
  ```

{/cut}

{cut(jq пайдаланылған JSON мысалы)}

  ```json
      {
      "status": 200,
      "body": {
      "object_labels": [
            {
            "status": 0,
            "name": "file",
            "labels": [
            {
                  "eng": "Close-up",
                  "rus": "Крупный план",
                  "eng_categories": [],
                  "rus_categories": [],
                  "prob": 0.4843,
                  "coord": [
                  165,
                  0,
                  834,
                  477
                  ]
            },
            {
                  "eng": "Macro Photography",
                  "rus": "Макросъемка",
                  "eng_categories": [],
                  "rus_categories": [],
                  "prob": 0.5021,
                  "coord": [
                  165,
                  0,
                  834,
                  477
                  ]
            },
            {
                  "eng": "Plant",
                  "rus": "Растение",
                  "eng_categories": [
                  "Plants"
                  ],
                  "rus_categories": [
                  "Растения"
                  ],
                  "prob": 0.827,
                  "coord": [
                  165,
                  0,
                  834,
                  668
                  ]
            },
            {
                  "eng": "Leaf",
                  "rus": "Листок",
                  "eng_categories": [],
                  "rus_categories": [],
                  "prob": 0.6623,
                  "coord": [
                  165,
                  0,
                  834,
                  573
                  ]
            }
            ]
            }
      ],
      "scene_labels": [
            {
            "status": 0,
            "name": "file",
            "labels": [
            {
                  "eng": "Rice Paddy",
                  "rus": "Рисовое поле",
                  "eng_categories": [],
                  "rus_categories": [],
                  "prob": 0.6255
            }
            ]
            }
      ]
      },
      "htmlencoded": false,
      "last_modified": 0
      }
  ```

{/cut}

## {heading(Орнату)[id=rest-api-jq-install]}

{tabs}

{tab(Debian/Ubuntu)}

```console
sudo apt-get install jq
```

{/tab}

{tab(RHEL/CentOS 7/8)}

```console
yum install epel-release -y
yum update -y
yum install jq -y
```

{/tab}

{tab(Windows)}

1. Егер әлі орнатылмаған болса, [Chocolatey](https://chocolatey.org) пакет менеджерін [орнатыңыз](https://community.chocolatey.org/courses/installation/installing).
1. PowerShell ашып, команданы орындаңыз:

   ```console
   choco install jq -y
   ```

{/tab}

{tab(Mac OS)}

Өзіңізге ыңғайлы пакет менеджерін пайдаланыңыз:

- Fink:

  ```console
  fink install jq
  ```

- Homebrew:

  ```console
  brew install jq
  ```

- MacPorts:

  ```console
  port install jq
  ```

{/tab}

{/tabs}

## {heading(Пайдалану мысалы)[id=rest-api-jq-example]}

Karboii API арқылы [жоспарлар тізімін алу](/kz/storage/backups/how-to-guides/api-examples#backup-api-examples-get-plan) және оны пішімделген JSON түрінде шығару.

Команда:

```console
curl -X GET -H "Accept: application/json" -H "X-Auth-Token: <token>" "https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/plans" | jq "."
```

{cut(Команданы орындау нәтижесі)}

  ```json
      {
        "plans": [
          {
            "full_day": null,
            "id": "7d07648b-fa8a-XXXX-XXXX-b20f71171d1f",
            "name": "Backup_plan_24.05.2023",
            "project_id": "b5b7ffd4ef0547e5b222f44555dfXXXX",
            "provider_id": "37997f75-0637-XXXX-XXXX-49ff2ff11fa5",
            "resources": [
              {
                "id": "8f1ba150-905f-4ae4-XXXX-d18844b30d19",
                "name": "CentOS_STD2-2-4",
                "type": "OS::Nova::Server"
              }
            ],
            "retention_type": "max_backups",
            "status": "running"
          },
          {
            "full_day": null,
            "id": "3a92e8f1-05da-XXXX-XXXX-2a442bb33eb2",
            "name": "ElenasBackup_plan_15.06.2023",
            "project_id": "b5b7ffd4ef0547e5b222f44555dfXXXX",
            "provider_id": "37997f75-0637-XXXX-XXXX-49ff2ff11fa5",
            "resources": [
              {
                "id": "29f07bc3-e915-4141-XXXX-c4d2a716db7d",
                "name": "MySQL-5897-1",
                "type": "OS::Trove::Instance"
              }
            ],
            "retention_type": "max_backups",
            "status": "suspended"
          },
          {
            "full_day": null,
            "id": "2fb5ac1d-f69f-XXXX-XXXX-dd45a9b71444",
            "name": "MongoDB-3479",
            "project_id": "b5b7ffd4ef0547e5b222f44555dfXXXX",
            "provider_id": "37997f75-0637-XXXX-XXXX-49ff2ff11fa5",
            "resources": [
              {
                "id": "b24d0df0-3f2f-4245-XXXX-0481c1ef2376",
                "name": "MongoDB-3479",
                "type": "OS::Trove::Instance"
              }
            ],
            "retention_type": "max_backups",
            "status": "suspended"
          }
        ]
      }
  ```

{/cut}

{note:info}

Утилитаның синтаксисі мен қолданылуы туралы толық ақпарат [ресми құжаттамада](https://jqlang.github.io/jq/manual/) берілген.

{/note}
