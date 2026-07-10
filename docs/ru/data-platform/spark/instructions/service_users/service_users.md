# {heading(Подключение к кластеру Spark из скриптов в Standalone)[id=spark_m2m]}

В конфигурации {var(data-p)} Standalone управление идентификацией и доступом пользователей к Cloud Spark выполняется через систему CIAM. Подробнее о CIAM — в [Руководстве пользователя CIAM](https://docs.tech.vk.com/ciam/ru/26_2/user-guide/common).

Для подключения к кластеру Cloud Spark из скрипта создайте учетную запись сервисного пользователя и используйте ее учетные данные для авторизации.

## {heading(Создание сервисного пользователя)[id=spark_service_user_create]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_standalone.md)[tags=service_user_create]}

{/tab}   

{/tabs}

## {heading(Получение CIAM-токена)[id=spark_m2m_token]}

Если вы подключаетесь к Cloud Spark без Spark-клиента (например, через Spark Connect), получите CIAM-токен вручную. Для этого отправьте запрос `POST` к эндпоинту получения токена CIAM:

```bash 
ACCESS_TOKEN=$(curl -k -X POST ${<LK_UI_URL>}/iam/hydra/oauth2/token \
     -u "${<CLIENT_ID>}:${<CLIENT_SECRET>}" \
     -d "grant_type=client_credentials" \
     -d "scope=openid" \
     -d "audience=${<SPARK_APP_ID>}" | jq -r .access_token)
```

Здесь:

- `<LK_UI_URL>` — URL веб-интерфейса {var(data-p)} из адресной строки браузера.
- `<CLIENT_ID>` — ID сервисного пользователя.
- `<CLIENT_SECRET>` — секрет сервисного пользователя.
- `<SPARK_APP_ID>` — ID экземпляра сервиса. Отображается на вкладке **Общая информация** в поле **ID экземпляра**.

Пример получения CIAM-токена на `Python`:

```Python
import json
from urllib.parse import quote

import requests

oauth2_token_url = f"{<LK_UI_URL>}/iam/hydra/oauth2/token"

response = requests.post(
    oauth2_token_url,
    auth=(<CLIENT_ID>, quote(<CLIENT_SECRET>)),
    data={
        "grant_type": "client_credentials",
        "scope": "openid",
        "audience": <SPARK_APP_ID>,
    },
    verify=False,
    timeout=10,
)

access_token = json.loads(response.text)["access_token"]
```

Пример подключения к Spark Connect:

```Python
SPARK_CONNECT_HOST = <SPARK_CONNECT>
TOKEN = f"Bearer {access_token}"
spark_connect_url = f"{SPARK_CONNECT_HOST}/;x-vk-token={TOKEN}"
 
spark = (
    SparkSession.builder
    .remote(spark_connect_url)
    .appName("SparkConnect-LakeKeeper-MachineClient")
    .getOrCreate()
)
```

Здесь `<SPARK_CONNECT>` — эндпоинт Spark Connect. Отображается на вкладке **Общая информация** в поле **Spark Connect**. Подробнее — на странице {linkto(../../concepts/endpoints#spark-endpoints)[text=%text]}

## {heading(Подключение к кластеру Spark из скрипта)[id=spark_m2m_connect]}

Для авторизации в скрипте используйте учетные данные сервисного пользователя — идентификатор `Client ID` и секрет `Client Secret`. Spark-клиент получит CIAM-токен автоматически. Если у вас уже есть CIAM-токен, используйте его вместо учетных данных.

1. Убедитесь, что установили Spark-клиент `mlplatform_client`. Если нет, установите его:

   - Если доступна установка через pip:

   ```bash
   pip install mlplatform_client_on_prem --index-url=https://nexus.infra.devmail.ru/repository/mlplatform-pypi/simple/ --extra-index-url=https://nexus.infra.devmail.ru/repository/pypi-proxy/simple
   ```

   - Если pip недоступен, скачайте и установите клиент вручную. Список дистрибутивов — в инструкции {linkto(../etl_pipeline#etl_pipeline_preparation)[text=Создание ETL-конвейера]}.

1. Создайте Python-файл и скопируйте в него скрипт подключения к кластеру Spark, подставив свои значения переменных:

```Python
from mlplatform_client.v2 import CIAMAuth, SparkCluster
from mlplatform_client.v2.clients.spark import SparkClient
from mlplatform_client.v2.utils import wait_job_running, wait_job_succeeded

cluster = SparkCluster(
    SparkClient(
        host=<SPARK_HOST>,
        auth=CIAMAuth(
            # Авторизация через учетные данные сервисного пользователя
            client_id=<CLIENT_ID>,
            client_secret=<CLIENT_SECRET>,
            # Авторизация через CIAM-токен (если токен уже получен)
            # ciam_access_token=<CIAM_ACCESS_TOKEN>,
            lk_ui_url=<LK_UI_URL>,
            spark_app_id=<SPARK_APP_ID>,
            verify_tls_certificate=False,
        ),
        skip_tls_verify=True,
    ),
)

manifest = cluster.jobs.get_default_manifest(JOB_NAME)
manifest.set_executor_settings({"instances": 2, "cores": 1})
job = cluster.jobs.submit_pyjob(manifest, pyfile=PYFILE)

wait_job_running(job)
wait_job_succeeded(job)
```

Здесь:

- `<SPARK_HOST>` — адрес экземпляра Cloud Spark.
- `<SPARK_APP_ID>` — ID экземпляра сервиса. Отображается на вкладке **Общая информация** в поле **ID экземпляра**.
- `<CLIENT_ID>` — ID сервисного пользователя. Отображается на вкладке **Сервисные пользователи**.
- `<CLIENT_SECRET>` — секрет сервисного пользователя. Отображается на вкладке **Сервисные пользователи** только при создании.
- `<LK_UI_URL>` — URL веб-интерфейса {var(data-p)} из адресной строки браузера.
- `<CIAM_ACCESS_TOKEN>` — CIAM-токен пользователя.

## {heading(Удаление сервисного пользователя)[id=spark_service_user_delete]}

Если сервисный пользователь больше не нужен, удалите его, чтобы отозвать доступ к кластеру.

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_standalone.md)[tags=service_user_delete]}

{/tab}

{/tabs}
