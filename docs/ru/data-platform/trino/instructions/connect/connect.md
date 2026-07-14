# {heading(Подключение к экземпляру сервиса)[id=trino_connect]}

Подключиться к экземпляру сервиса Cloud Trino можно только по TLS с помощью веб-интерфейса и сторонних клиентов, например DBeaver.

{include(../../../_includes/_connect.md)[tags=connect-secure]}

## {heading(Подключение через веб-интерфейс)[id=trino_connect-ui]}

{ifdef(public)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
{/ifdef}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на название экземпляра сервиса.
1. На странице экземпляра перейдите на вкладку **Общая информация**.
1. Перейдите по ссылке, указанной в поле **Trino Admin UI / CLI Client**.

   {include(../../../_includes/_connect.md)[tags=browser-warning]}

1. В зависимости от браузера: 

   {include(../../../_includes/_connect.md)[tags=browsers-action]}
   
1. Введите логин и пароль учетной записи Cloud Trino.

   {ifndef(public)}
   {note:info}
   В конфигурации Standalone авторизация выполняется через систему CIAM. Если вы уже авторизованы в CIAM, подключение произойдет автоматически.
   {/note}
   {/ifndef}

1. Нажмите **Log In**.

## {heading(Подключение через DBeaver)[id=trino_connect-client]}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на название экземпляра сервиса.
1. На странице экземпляра перейдите на вкладку **Общая информация**.
1. Скопируйте URL-адрес, указанный в поле **Trino JDBC Connection string**.
1. Откройте DBeaver.
1. Cоздайте новое подключение к Trino:
   1. Слева в окне **Database Navigator** нажмите в пустое пространство правой кнопкой мыши и выберите **Create** → **Connection**.
   1. В открывшемся окне выберите сервис `Trino`.
   1. В поле **Connect by** выберите `URL`.
   1. Вставьте скопированный URL-адрес в поле **JDBC URL**.
   1. {ifndef(public)}(Только для Standalone в {var(cloud)}){/ifndef} Укажите логин учетной записи Cloud Trino в поле **Username**.
   1. {ifndef(public)}(Только для Standalone в {var(cloud)}){/ifndef} Укажите пароль учетной записи Cloud Trino в поле **Password**.
   {ifndef(public)}
   1. (Только для Standalone) Добавьте в URL-адрес в поле **JDBC URL** параметр `externalAuthentication=true`. Пример: 
   
      ```console
      jdbc:trino://<АДРЕС_TRINO>:<ПОРТ>?SSL=true&SSLVerification=NONE&externalAuthentication=true
      ```
      
      При подключении DBeaver перенаправит вас в систему CIAM для аутентификации.
   {/ifndef}

   1. Нажмите кнопку **Finish**.
      
      Новое подключение отобразится в окне **Database Navigator**.

1. Нажмите правой кнопкой мыши на созданное подключение и выберите **Connect**. 
1. Если DBeaver предложит загрузить драйвер для работы с Trino, загрузите его.

{ifndef(public)}
## {heading(Подключение в Standalone)[id=trino_connect-standalone]}

В Standalone управление идентификацией и доступом выполняется через систему CIAM. Подробнее — в [официальной документации CIAM](https://docs.tech.vk.com/ciam).

Для подключения к Cloud Trino из скрипта или CLI-клиента создайте учетную запись сервисного пользователя и получите CIAM-токен.

### {heading(Создание сервисного пользователя)[id=trino_service_user_create]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_standalone.md)[tags=service_user_create]}

{/tab}

{/tabs}

### {heading(Получение токена CIAM)[id=trino_m2m_token]}

Для подключения к Cloud Trino без логина и пароля получите CIAM-токен. Для этого отправьте запрос `POST` к эндпоинту получения токена CIAM:

```bash
ACCESS_TOKEN=$(curl -k -X POST ${<LK_UI_URL>}/iam/hydra/oauth2/token \
     -u "${<CLIENT_ID>}:${<CLIENT_SECRET>}" \
     -d "grant_type=client_credentials" \
     -d "scope=openid" \
     -d "audience=${<TRINO_APP_ID>}" | jq -r .access_token)
```

Здесь:

- `<LK_UI_URL>` — URL веб-интерфейса {var(data-p)} из адресной строки браузера.
- `<CLIENT_ID>` — ID сервисного пользователя.
- `<CLIENT_SECRET>` — секрет сервисного пользователя.
- `<TRINO_APP_ID>` — ID экземпляра сервиса. Отображается на вкладке **Общая информация** в поле **ID экземпляра**.

### {heading(Подключение через trino-cli)[id=trino_connect-cli]}

Выполните команду, указав значения переменных:

```bash
trino --debug \
    --user=${<CLIENT_ID>} \
    --server=${<TRINO_URL>} \
    --access-token=${<ACCESS_TOKEN>} \
    --insecure \
    --execute="show catalogs;"
```

Здесь:

- `<CLIENT_ID>` — ID сервисного пользователя.
- `<TRINO_URL>` — адрес экземпляра Cloud Trino.
- `<ACCESS_TOKEN>` — CIAM-токен, полученный ранее.

### {heading(Подключение через Python-скрипт)[id=trino_connect-python]}

Создайте Python-файл и скопируйте в него скрипт, указав значения переменных:

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

Здесь:

- `<LK_UI_URL>` — URL веб-интерфейса {var(data-p)} из адресной строки браузера.
- `<CLIENT_ID>` — ID сервисного пользователя.
- `<CLIENT_SECRET>` — секрет сервисного пользователя.
- `<TRINO_APP_ID>` — ID экземпляра сервиса. Отображается на вкладке **Общая информация** в поле **ID экземпляра**.
- `<TRINO_URL>` — адрес экземпляра Cloud Trino.
- `<TRINO_PORT>` — порт экземпляра Cloud Trino.

### {heading(Удаление сервисного пользователя)[id=trino_service_user_delete]}

Если сервисный пользователь больше не нужен, удалите его, чтобы отозвать доступ к экземпляру сервиса.

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_standalone.md)[tags=service_user_delete]}

{/tab}

{/tabs}
{/ifndef}
