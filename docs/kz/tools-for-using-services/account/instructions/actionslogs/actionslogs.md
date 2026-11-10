# {heading(Оқиғалар журналымен жұмыс)[id=tools-account-actionslogs]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

<!--- #todo Привести к единому источнику с /ru/monitoring-services/event-log/instructions/view-event-log, на этой странице информация уже устарела -->

Оқиғалар журналында {var(cloud)} компоненттері орындаған операциялардың тарихы сақталады. Келесі компоненттердің әрекеттері сақталады (API-сұрауларға арналған форматта көрсетілген):

- `nova` — есептеу ресурстарының контроллері.
- `cinder` — ВМ дисктерімен жұмыс.
- `neutron` — бұлтты виртуалды желілерді басқару.
- `glance` — бейнелерді сақтау және олармен жұмыс.
- `octavia` — жүктемені теңгерушілерді басқару.
- `dbaas`, `trove` — ДБ инстанстарын жасау және басқару.
- `magnum` — K8s-контейнерлерін оркестрациялау.
- `iam` — жобадағы пайдаланушыларды басқару (тек [техникалық қолдау көрсетуге](/kz/contacts) жүгінген кезде қолжетімді).

Журнал деректері инциденттерді іштей талдау кезінде де, техникалық қолдау көрсетуіне жүгінген кезде де пайдалы болуы мүмкін.

## {heading(Оқиғалар журналын жүктеу)[id=account-actionslogs-download]}

{tabs}

{tab(Жеке кабинет)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app/).
1. Беттің жоғарғы жағындағы пайдаланушы атын басыңыз.
1. Ашылмалы тізімнен **Оқиғалар журналы** опциясын таңдаңыз.
1. **Жүктеу** батырмасын басыңыз.

Құрылған есеп `.xlsx` кеңейтуімен жүктеледі.

{/tab}

{/tabs}

## {heading(Журнал жазбаларын көру)[id=account-actionslogs-view]}

{tabs}

{tab(Жеке кабинет)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app/).
1. Беттің жоғарғы жағындағы пайдаланушы атын басыңыз.
1. Ашылмалы тізімнен **Оқиғалар журналы** опциясын таңдаңыз.
1. (Қалауыңыз бойынша) Уақыт диапазонын көрсетіңіз:

   1. **Басқа сұрау құру** опциясын басыңыз.
   1. Ашылған терезеде қажетті диапазонды қолмен немесе күнтізбе көмегімен таңдаңыз.
   1. **Табу** батырмасын басыңыз.

Жеке жазба туралы толық ақпаратты ашу үшін жазбаның оң жағындағы ![Информация](assets/info-icon.svg "inline") белгішесін басыңыз.

{/tab}

{tab(API)}

1. `X-Auth-Token` рұқсат токенін [алыңыз](/kz/tools-for-using-services/api/rest-api/case-keystone-token).
1. `Audit` эндпоинтіннің мекенжайын [біліңіз](https://msk.cloud.vk.ru/app/project/endpoints).
1. Сұрауды орындаңыз:

   ```console
   curl -X GET "<Адрес эндпоинта Audit>/logs" -H "X-Auth-Token: <токен>"
   ```

   Сұрауды құрастыру туралы толығырақ [Журналмен жұмыс істеу кезіндегі API-сұраулар мысалдары](#account-actionslogs-example) бөлімінде берілген.

   Сұрауда (header) қосымша параметрлерді көрсетуге болады:

   [cols="1,1,2", options="header"]
   |===
   | Параметр 
   | Формат 
   | Сипаттамасы

   | `from`
   | [RFC3339](https://www.ietf.org/rfc/rfc3339.txt)
   | Уақыт диапазонының басы

   | `to`
   | [RFC3339](https://www.ietf.org/rfc/rfc3339.txt)
   | Уақыт диапазонының соңы

   | `source`
   | string
   | Операция көзі болып табылатын компонент

   | `marker`
   | string
   | Келесі бетке сұрау жасауға арналған токен, бұрын API қайтарған. Маркерлердің TTL — 1 сағат

   | `limit`
   | integer
   | Қайтарылатын жазбалар саны. Көрсетілмесе, 100 жазба қайтарады
   |===

{/tab}

{/tabs}

Оқиғалар журналының әрбір жазбасында мына ақпарат беріледі:

- `event_id` — операция идентификаторы.
- `user_email` — операцияны жасаған пайдаланушының электрондық поштасы.
- `timestamp` — операцияның жасалған күні мен уақыты.
- `source` — операция көзі болып табылатын компонент.
- `action` — операцияның қысқаша сипаттамасы.
- `success` — операцияның сәтті орындалу белгісі.
- `method` — орындалған операцияның REST-әдісі.
- `uri` — сұрау орындалған жол.
- `request_body` — сұрау денесі (бар болса).
- `response_body` — жауап денесі (бар болса).

## {heading(Журналмен жұмыс істеу кезіндегі API-сұраулар мысалдары)[id=account-actionslogs-example]}

Консольдегі немесе файлдағы жазбалар шығысын жолдарға бөлу үшін сұраулар мысалдарында [jq утилитасы](/kz/tools-for-using-services/api/rest-api/install-jq) қолданылады.

{cut(Соңғы жазбаларды алу)}

Magnum компонентінің журналынан соңғы 2 жазбаны алу үшін сұрауды орындаңыз:

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

{cut(Қажетті кезеңдегі жазбаларды алу)}

Nova компонентінің журналынан берілген кезеңдегі соңғы 2 жазбаны алу үшін сұрауды орындаңыз:

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

`marker` параметрінің көмегімен журнал жазбаларына арналған көлемді сұрауды бірнеше жартылай сұрауларға бөлуге болады. Журналдағы жазбалар уақыт бойынша кері ретпен орналасқан: ең соңғылары — журналдың басында. Сондықтан алғашқы жартылай сұрау ең жаңа жазбалардың топтамасын, келесісі — одан ерте жазбалардың топтамасын қайтарады және т.с.с.

Nova компонентінің журналындағы берілген кезеңдегі барлық жазбаларды әр файлда 10 жазбадан топтастырып файлдарға шығару үшін:

1. Қажетті кезеңдегі журналдың соңғы 10 жазбасын `nova_part1.log` файлына шығаруды сұраңыз:

   ```console
   curl -X GET "https://mcs.mail.ru/auditlogs/v1/b5b7ffd4efXXXX/logs?\
   source=nova&\
   limit=10&\
   from=2023-10-15T10:00:00.000Z&\
   to=2023-11-15T16:43:00.477Z" \
   -H "X-Auth-Token: <ЗНАЧЕНИЕ_ТОКЕНА>" \
   -H "Content-Type: application/json" | jq > nova_part1.log
   ```

1. `nova_part1.log` файлынан `marker` параметрінің мәнін алыңыз:

   ```console
   cat nova_part1.log | grep marker
   ```

   Жауап мысалы:

   ```json
   "marker": "eyJ0bSI6MTY5NzM2NDAwMCwib2ZzIjoxMCwidG8iOjE3MDAwNjY1ODAsXXXX"
   ```

1. `marker` параметрінің мәнін пайдаланып, журналағы уақыты бойынша одан ерте 10 жазбаны `nova_part2.log` файлына шығаруды сұраңыз:

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

1. Өтініште тек файл атын өзгертіп (мысалы: `nova_part3.log`, `nova_part4.log`, …), қажетті кезеңдегі журналдың барлық жазбаларын алынғанша алдыңғы сұрауды қайталаңыз.

{/cut}