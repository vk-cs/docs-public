{include(/kz/_includes/_translated_by_ai.md)}

Оқиғалар журналында VK Cloud компоненттері орындаған операциялар тарихы сақталады. Келесі компоненттердің әрекеттері сақталады (API сұраулары үшін форматта көрсетілген):

- `nova` — есептеу ресурстарының контроллері.
- `cinder` — ВМ дискілерімен жұмыс.
- `neutron` — бұлттық виртуалды желілерді басқару.
- `glance` — образдарды сақтау және олармен жұмыс.
- `octavia` — жүктеме теңгергіштерін басқару.
- `dbaas`, `trove` — ДБ инстанстарын жасау және басқару.
- `magnum` — K8s контейнерлерін оркестрациялау.
- `iam` — жобадағы пайдаланушыларды басқару (тек [техникалық қолдауға](/kz/contacts) жүгінгенде қолжетімді).

Журнал деректері инциденттерді ішкі талдау кезінде де, техникалық қолдауға жүгінгенде де пайдалы болуы мүмкін.

## Оқиғалар журналын жүктеп алу

{tabs}

{tab(Жеке кабинет)}

1. VK Cloud [жеке кабинетіне өтіңіз](https://kz.cloud.vk.com/app/).
1. Бет тақырыбындағы пайдаланушы атына басыңыз.
1. Ашылмалы тізімнен **Оқиғалар журналын** таңдаңыз.
1. **Жүктеп алу** түймесін басыңыз.

Қалыптастырылған есеп `.xlsx` кеңейтімімен жүктеледі.

{/tab}

{/tabs}

## Журнал жазбаларын қарау

{tabs}

{tab(Жеке кабинет)}

1. VK Cloud [жеке кабинетіне өтіңіз](https://kz.cloud.vk.com/app/).
1. Бет тақырыбындағы пайдаланушы атына басыңыз.
1. Ашылмалы тізімнен **Оқиғалар журналын** таңдаңыз.
1. (Қосымша) Уақыт аралығын көрсетіңіз:

   1. **Басқа сұрауды қалыптастыру** батырмасын басыңыз.
   1. Ашылған терезеде қажетті аралықты қолмен немесе күнтізбе арқылы таңдаңыз.
   1. **Табу** түймесін басыңыз.

Жеке жазба туралы толық ақпаратты ашу үшін, жазбаның оң жағындағы ![Ақпарат](assets/info-icon.svg "inline") белгішесін басыңыз.

{/tab}

{tab(API)}

1. Аккаунтыңыз үшін [екі факторлы аутентификацияны (2FA) қосыңыз](/kz/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa).
1. `X-Auth-Token` [қолжетімділік токенін алыңыз](/kz/tools-for-using-services/api/rest-api/case-keystone-token).
1. `Audit` эндпоинтының [мекенжайын біліңіз](https://kz.cloud.vk.com/app/project/endpoints).
1. Сұрауды орындаңыз:

   ```console
   curl -X GET "<Адрес эндпоинта Audit>/logs" -H "X-Auth-Token: <токен>"
   ```

   Сұрауды құрастыру туралы толығырақ [Журналмен жұмыс істеу кезіндегі API сұрауларының мысалдары](#zhurnalmen_zhumys_isteu_kezindegi_api_suraularynyn_mysaldary) бөлімінде берілген.

   Сұрауда (header) қосымша параметрлерді көрсетуге болады:

   | Параметр | Формат | Сипаттама |
   | --- | --- | --- |
   | `from`   | [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) | Уақыт аралығының басы |
   | `to`     | [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) | Уақыт аралығының соңы |
   | `source` | string  | Операцияның бастапқы компоненті |
   | `marker` | string  | API бұрын қайтарған келесі бетті сұрауға арналған токен. Маркерлердің TTL — 1 сағат |
   | `limit`  | integer | Қайтарылатын жазбалар саны. Көрсетілмесе, 100 жазба қайтарылады |

{/tab}

{/tabs}

Оқиғалар журналының әрбір жазбасында мынадай ақпарат беріледі:

- `event_id` — операция идентификаторы.
- `user_email` — операцияны орындаған пайдаланушының поштасы.
- `timestamp` — операция орындалған күн мен уақыт.
- `source` — операцияның бастапқы компоненті.
- `action` — операцияның қысқаша сипаттамасы.
- `success` — операцияның сәтті орындалу белгісі.
- `method` — орындалған операцияның REST әдісі.
- `uri` — сұрау орындалған жол.
- `request_body` — сұрау денесі (бар болса).
- `response_body` — жауап денесі (бар болса).

## Журналмен жұмыс істеу кезіндегі API сұрауларының мысалдары

Жазбаларды консольге немесе файлға жолдарға бөліп шығару үшін сұрау мысалдарында [jq утилитасы](/kz/tools-for-using-services/api/rest-api/install-jq) пайдаланылады.

{cut(Соңғы жазбаларды алу)}

Magnum компоненті журналының соңғы 2 жазбасын алу үшін сұрауды орындаңыз:

```console
curl -X GET "https://mcs.mail.ru/auditlogs/v1/b5b7ffd4efXXXX/logs?\
source=magnum&\
limit=2&\
from=&\
to=" \
-H "X-Auth-Token: <ЗНАЧЕНИЕ_ТОКЕНА>" \
-H "Content-Type: application/json" | jq
```

Жауап мысалы:

```json
{
  "logs": [
    {
      "action": "unknown",
      "event_id": "4f6ed6e5-XXXX-dcc2279ba39d",
      "method": "DELETE",
      "request_body": "<BINARY_DATA>",
      "request_id": "req-05134dd5-XXXX-18b29ea5552e",
      "response_body": "<BINARY_DATA>",
      "source": "magnum",
      "success": "yes",
      "timestamp": "2023-11-20T09:15:11Z",
      "uri": "/infra/container/v1/nodegroups/XXXX-4eb4e8ec5de9",
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0",
      "user_email": "XXXX@vk.team",
      "user_id": "d98c90595998426f9c69746f02aXXXX"
    },
    {
      "action": "unknown",
      "event_id": "00a5def3-XXXX-f0884f24798b",
      "method": "PATCH",
      "request_body": "{\"delta\":-1}",
      "request_id": "req-f697a08b-XXXX-e59c66306dd1",
      "response_body": "{\"uuid\": \"31a092d7-XXXX\"}",
      "source": "magnum",
      "success": "yes",
      "timestamp": "2023-11-20T09:08:18Z",
      "uri": "/infra/container/v1/nodegroups/XXXX-4eb4e8ec5de9/actions/scale",
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0",
      "user_email": "XXXX@vk.team",
      "user_id": "d98c90595998426f9c69746f02aXXXX"
    }
  ],
  "marker": "eyJ0bSI6MCwib2ZzIjo1LCJzcmMiOiJtYWdudW0iLCJXXXX"
}
```

{/cut}

{cut(Қажетті кезең үшін жазбаларды алу)}

Берілген кезең үшін Nova компоненті журналының соңғы 2 жазбасын алу үшін сұрауды орындаңыз:

```console
curl -X GET "https://mcs.mail.ru/auditlogs/v1/b5b7ffd4efXXXX/logs?\
source=nova&\
limit=2&\
from=2023-10-15T10:00:00.000Z&\
to=2023-11-15T16:43:00.477Z" \
-H "X-Auth-Token: <ЗНАЧЕНИЕ_ТОКЕНА>" \
-H "Content-Type: application/json" | jq
```

Жауап мысалы:

```json
{
  "logs": [
    {
      "action": "create-vm",
      "event_id": "a2d05902-XXXX-60bce13de1f7",
      "method": "POST",
      "request_body": "{\"server\":{\"name\":\"BY-CentOS_prometheus\",\"key_name\":\"ADH-clusterXXXX\",XXXX}}",
      "request_id": "req-1d76a3f3-XXXX-b695d066e606",
      "response_body": "{\"server\": {\"security_groups\": [{\"name\": \"71d90a92-XXXX\"}, {\"name\": \"XXXX-aecb77b43bec\"}], XXXX}}",
      "source": "nova",
      "success": "yes",
      "timestamp": "2023-11-15T12:16:26Z",
      "uri": "/v2.1/servers",
      "user_agent": "axios/1.4.0",
      "user_email": "XXXX@vk.team",
      "user_id": "5f48556ef89444dbab8fa82669dXXXX"
    },
    {
      "action": "vm-action",
      "event_id": "fc98d3d7-XXXX-c2c5fd8fe619",
      "method": "POST",
      "request_body": "{\"addFloatingIp\":{\"address\":\"XXXX\"}}",
      "request_id": "req-f358678d-XXXX-311861a4ff77",
      "response_body": "",
      "source": "nova",
      "success": "yes",
      "timestamp": "2023-11-15T09:43:41Z",
      "uri": "/v2.1/servers/c6be363f-f56c-XXXX/action",
      "user_agent": "HashiCorp Terraform/1.4.0-dev XXXX gophercloud/2.0.0",
      "user_id": "649a35d97fc64452b019a0809dXXXX"
    }
  ],
  "marker": "eyJ0bSI6MTY5NzM2NDAwMCwib2ZzIjo1LCJXXXX"
}
```

{/cut}

{cut(marker параметрін пайдалану)}

`marker` параметрі арқылы журнал жазбалары бойынша көлемді сұрауды бірнеше бөліктік сұрауға бөлуге болады. Журналдағы жазбалар уақыт бойынша кері тәртіпте орналасады: ең соңғылары — журналдың басында. Сондықтан бірінші бөліктік сұрау ең жаңа жазбалар бумасын, ал келесісі — одан ертерек жазбалар бумасын қайтарады және т.б.

Қажетті кезең үшін Nova компонентінің барлық журнал жазбаларын әр файлда 10 жазбадан бөліп файлдарға шығару үшін:

1. Қажетті кезең үшін журналдың соңғы 10 жазбасын `nova_part1.log` файлына шығаруды сұраңыз:

   ```console
   curl -X GET "https://mcs.mail.ru/auditlogs/v1/b5b7ffd4efXXXX/logs?\
   source=nova&\
   limit=10&\
   from=2023-10-15T10:00:00.000Z&\
   to=2023-11-15T16:43:00.477Z" \
   -H "X-Auth-Token: <ЗНАЧЕНИЕ_ТОКЕНА>" \
   -H "Content-Type: application/json" | jq > nova_part1.log
   ```

2. `nova_part1.log` файлынан `marker` параметрінің мәнін алыңыз:

   ```console
   cat nova_part1.log | grep marker
   ```

   Жауап мысалы:

   ```json
   "marker": "eyJ0bSI6MTY5NzM2NDAwMCwib2ZzIjoxMCwidG8iOjE3MDAwNjY1ODAsXXXX"
   ```

3. `marker` параметрінің мәнін пайдаланып, уақыт бойынша одан ертерек 10 журнал жазбасын `nova_part2.log` файлына шығаруды сұраңыз:

   ```console
   curl -X GET "https://mcs.mail.ru/auditlogs/v1/b5b7ffd4efXXXX/logs?\
   source=nova&\
   marker=eyJ0bSI6MTY5NzM2NDAwMCwib2ZzIjoxMCwidG8iOjE3MDAwNjY1ODAsXXXX&\
   limit=10&\
   from=2023-10-15T10:00:00.000Z&\
   to=2023-11-15T16:43:00.477Z" \
   -H "X-Auth-Token: <ЗНАЧЕНИЕ_ТОКЕНА>" \
   -H "Content-Type: application/json" | jq > nova_part2.log
   ```

4. Қажетті кезең үшін барлық журнал жазбаларын алғанша, алдыңғы сұрауды қайталаңыз, онда тек файл атауын өзгертіңіз (мысалы: `nova_part3.log`, `nova_part4.log`, …).

{/cut}
