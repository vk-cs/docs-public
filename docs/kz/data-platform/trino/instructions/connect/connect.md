# {heading(Сервис данасына қосылу)[id=trino_connect]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

Cloud Trino сервис данасына TLS арқылы ғана веб-интерфейс пен сторонние клиенттер, мысалы DBeaver, көмегімен қосылуға болады.

{include(../../../_includes/_connect.md)[tags=connect-secure]}

## {heading(Веб-интерфейс арқылы қосылу)[id=trino_connect-ui]}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app/).
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Сервис данасының атауын басыңыз.
1. Дана бетінде **Жалпы ақпарат** қойындысына өтіңіз.
1. **Trino Admin UI / CLI Client** өрісінде көрсетілген сілтемеге өтіңіз.

   {include(../../../_includes/_connect.md)[tags=browser-warning]}

1. Браузерге байланысты:

   {include(../../../_includes/_connect.md)[tags=browsers-action]}

1. Cloud Trino тіркелгісінің логині мен құпиясөзін енгізіңіз.

   {ifndef(public)}
   {note:info}
   Standalone конфигурациясында авторизация CIAM жүйесі арқылы орындалады. Егер сіз CIAM-та бұрыннан авторизацияланған болсаңыз, қосылу автоматты түрде орындалады.
   {/note}
   {/ifndef}

1. **Log In** батырмасын басыңыз.

## {heading(DBeaver арқылы қосылу)[id=trino_connect-client]}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Сервис данасының атауын басыңыз.
1. Дана бетінде **Жалпы ақпарат** қойындысына өтіңіз.
1. **Trino JDBC Connection string** өрісінде көрсетілген URL-мекенжайды көшіріп алыңыз.
1. DBeaver ашыңыз.
1. Trino-ға жаңа қосылу жасаңыз:
   1. Сол жақта **Database Navigator** терезесінде бос кеңістікті тінтуірдің оң жақ батырмасымен басып, **Create** → **Connection** таңдаңыз.
   1. Ашылған терезеде `Trino` сервисін таңдаңыз.
   1. **Connect by** өрісінде `URL` таңдаңыз.
   1. Көшірілген URL-мекенжайды **JDBC URL** өрісіне қойыңыз.
   1. {ifndef(public)}({var(cloud)}) Standalone үшін ғана{/ifndef} **Username** өрісінде Cloud Trino тіркелгісінің логинін көрсетіңіз.
   1. {ifndef(public)}({var(cloud)}) Standalone үшін ғана{/ifndef} **Password** өрісінде Cloud Trino тіркелгісінің құпиясөзін көрсетіңіз.
   {ifndef(public)}
   1. (Тек Standalone үшін) **JDBC URL** өрісіндегі URL-мекенжайға `externalAuthentication=true` параметрін қосыңыз. Мысал:

      ```console
      jdbc:trino://<АДРЕС_TRINO>:<ПОРТ>?SSL=true&SSLVerification=NONE&externalAuthentication=true
      ```

      Қосылған кезде DBeaver сізді аутентификация үшін CIAM жүйесіне бағыттайды.
   {/ifndef}

   1. **Finish** батырмасын басыңыз.

      Жаңа қосылу **Database Navigator** терезесінде көрсетіледі.

1. Жасалған қосылуды тінтуірдің оң жақ батырмасымен басып, **Connect** таңдаңыз. 
1. Егер DBeaver Trino-мен жұмыс істеу үшін драйверді жүктеп алуды ұсынса, оны жүктеп алыңыз.

{ifndef(public)}

## {heading(Standalone-да қосылу)[id=trino_connect-standalone]}

Standalone-да идентификацияны және рұқсаттарды басқару CIAM жүйесі арқылы орындалады. Толығырақ — [CIAM ресми құжаттамасында](https://docs.tech.vk.ru/ciam).

Скрипттен немесе CLI-клиенттен Cloud Trino-ға қосылу үшін сервис пайдаланушысының тіркелгісін жасаңыз және CIAM-токен алыңыз.

### {heading(Сервис пайдаланушысын жасау)[id=trino_service_user_create]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=service_user_create]}

{/tab}

{/tabs}

### {heading(CIAM токенін алу)[id=trino_m2m_token]}

Логин мен құпиясөзсіз Cloud Trino-ға қосылу үшін CIAM-токен алыңыз. Ол үшін CIAM токенін алу эндпоинтіне `POST` сұранысын жіберіңіз:

```bash
ACCESS_TOKEN=$(curl -k -X POST ${<LK_UI_URL>}/iam/hydra/oauth2/token \
     -u "${<CLIENT_ID>}:${<CLIENT_SECRET>}" \
     -d "grant_type=client_credentials" \
     -d "scope=openid" \
     -d "audience=${<TRINO_APP_ID>}" | jq -r .access_token)
```

Мұнда:

- `<LK_UI_URL>` — браузердің адрес жолынан алынған {var(data-p)} веб-интерфейсінің URL-мекенжайы.
- `<CLIENT_ID>` — сервис пайдаланушысының ID-сы.
- `<CLIENT_SECRET>` — сервис пайдаланушысының құпиясы.
- `<TRINO_APP_ID>` — сервис данасының ID-сы. **Жалпы ақпарат** қойындысындағы **Дана ID-сы** өрісінде көрсетіледі.

### {heading(trino-cli арқылы қосылу)[id=trino_connect-cli]}

Айнымалылардың мәндерін көрсетіп, команданы орындаңыз:

```bash
trino --debug \
    --user=${<CLIENT_ID>} \
    --server=${<TRINO_URL>} \
    --access-token=${<ACCESS_TOKEN>} \
    --insecure \
    --execute="show catalogs;"
```

Мұнда:

- `<CLIENT_ID>` — сервис пайдаланушысының ID-сы.
- `<TRINO_URL>` — Cloud Trino данасының мекенжайы.
- `<ACCESS_TOKEN>` — бұрын алынған CIAM-токен.

### {heading(Python-скрипт арқылы қосылу)[id=trino_connect-python]}

Python-файл жасап, оған айнымалылардың мәндерін көрсете отырып, скриптті көшіріңіз:

```Python
import json
from urllib.parse import quote

import requests
from trino.auth import JWTAuthentication
from trino.dbapi import connect

oauth2_token_url = f"{<LK_UI_URL>}/iam/hydra/oauth2/token"

response = requests.post(
    oauth2_token_url,
    auth=(<CLIENT_ID>, quote(<CLIENT_SECRET>)),
    data={
        "grant_type": "client_credentials",
        "scope": "openid",
        "audience": <TRINO_APP_ID>,
    },
    verify=False,
    timeout=10,
)

access_token = json.loads(response.text)["access_token"]

conn = connect(
    host=<TRINO_URL>,
    port=<TRINO_PORT>,
    http_scheme="https",
    auth=JWTAuthentication(access_token),
    verify=False,
)

cur = conn.cursor()
cur.execute("SHOW catalogs")
rows = cur.fetchall()

for row in rows:
    print(row)
```

Мұнда:

- `<LK_UI_URL>` — браузердің адрес жолынан алынған {var(data-p)} веб-интерфейсінің URL-мекенжайы.
- `<CLIENT_ID>` — сервис пайдаланушысының ID-сы.
- `<CLIENT_SECRET>` — сервис пайдаланушысының құпиясы.
- `<TRINO_APP_ID>` — сервис данасының ID-сы. **Жалпы ақпарат** қойындысындағы **Дана ID-сы** өрісінде көрсетіледі.
- `<TRINO_URL>` — Cloud Trino данасының мекенжайы.
- `<TRINO_PORT>` — Cloud Trino данасының порты.

### {heading(Сервис пайдаланушысын жою)[id=trino_service_user_delete]}

Егер сервис пайдаланушысы енді қажет болмаса, сервис данасына рұқсатты қайтару үшін оны жойыңыз.

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=service_user_delete]}

{/tab}

{/tabs}
{/ifndef}