Для фильтрации вывода данных в формате JSON используйте утилиту [jq](https://jqlang.github.io/jq/). Она применима для получаемых от платформы данных API и OpenStack.

jq должна быть предварительно установлена в вашей системе.

<details>
  <summary>Пример неотформатированного JSON</summary>

  ```json
  {"status":200,"body":{"object_labels":[{"status":0,"name":"file","labels":[{"eng":"Close-up","rus":"Крупный план","eng_categories":[],"rus_categories":[],"prob":0.4843,"coord":[165,0,834,477]},{"eng":"Macro Photography","rus":"Макросъемка","eng_categories":[],"rus_categories":[],"prob":0.5021,"coord":[165,0,834,477]},{"eng":"Plant","rus":"Растение","eng_categories":["Plants"],"rus_categories":["Растения"],"prob":0.827,"coord":[165,0,834,668]},{"eng":"Leaf","rus":"Листок","eng_categories":[],"rus_categories":[],"prob":0.6623,"coord":[165,0,834,573]}]}],"scene_labels":[{"status":0,"name":"file","labels":[{"eng":"Rice Paddy","rus":"Рисовое поле","eng_categories":[],"rus_categories":[],"prob":0.6255}]}]},"htmlencoded":false,"last_modified":0}
  ```

</details>

<details>
  <summary>Пример JSON с использованием jq</summary>

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

</details>

## Установка

<tabs>
<tablist>
<tab>Debian/Ubuntu</tab>
<tab>RHEL/CentOS 7/8</tab>
<tab>Windows</tab>
<tab>Mac OS</tab>
</tablist>
<tabpanel>

```bash
sudo apt-get install jq
```

</tabpanel>
<tabpanel>

```bash
yum install epel-release -y
yum update -y
yum install jq -y
```

</tabpanel>
<tabpanel>

1. [Установите](https://community.chocolatey.org/courses/installation/installing) менеджер пакетов [Chocolatey](https://chocolatey.org), если он еще не установлен.
1. Откройте PowerShell и выполните команду:

   ```powershell
   choco install jq -y
   ```

</tabpanel>
<tabpanel>

Воспользуйтесь удобным для вас менеджером пакетов:

- Fink:

  ```bash
  fink install jq
  ```

- Homebrew:

  ```bash
  brew install jq
  ```

- MacPorts:

  ```bash
  port install jq
  ```

</tabpanel>
</tabs>

## Пример использования

[Получить список](/ru/manage/backups/api-examples#poluchit-spisok-sozdannyh-planov-rezervnogo-kopirovaniya) планов через Karboii API в отформатированном JSON.

Команда:

```bash
curl -X GET -H "Accept: application/json" -H "X-Auth-Token: <token>" "https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/plans" | jq "."
```

<details>
  <summary>Результат выполнения команды</summary>

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
                "name": "CentOS_Basic-1-1_10GB",
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

</details>

<info>

Подробная информация о синтаксисе и использовании утилиты в [официальной документации](https://jqlang.github.io/jq/manual/).

</info>
