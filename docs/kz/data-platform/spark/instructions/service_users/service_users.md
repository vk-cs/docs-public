# {heading(Standalone скрипттерінен Spark кластеріне қосу)[id=spark_m2m]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

{var(data-p)} Standalone конфигурациясында Cloud Spark пайдаланушылардың идентификациясы мен рұқсаттарын басқару CIAM жүйесі арқылы жүзеге асырылады. CIAM туралы толығырақ — [CIAM пайдаланушы нұсқаулығында](https://docs.tech.vk.ru/ciam/ru/26_2/user-guide/common).

Скрипттен Cloud Spark кластеріне қосу үшін сервистік пайдаланушының тіркелгісін жасаңыз және авторизация үшін оның деректемелерін пайдаланыңыз.

## {heading(Сервистік пайдаланушыны жасау)[id=spark_service_user_create]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=service_user_create]}

{/tab}   

{/tabs}

## {heading(CIAM-токенін алу)[id=spark_m2m_token]}

Егер сіз Cloud Spark-қа Spark-клиентісіз қосылсаңыз (мысалы, Spark Connect арқылы), CIAM-токенін қолмен алыңыз. Ол үшін CIAM токенін алу эндпоинтіне `POST` сұранысын жіберіңіз:

```bash 
ACCESS_TOKEN=$(curl -k -X POST ${<LK_UI_URL>}/iam/hydra/oauth2/token \
     -u "${<CLIENT_ID>}:${<CLIENT_SECRET>}" \
     -d "grant_type=client_credentials" \
     -d "scope=openid" \
     -d "audience=${<SPARK_APP_ID>}" | jq -r .access_token)
```

Мұнда:

- `<LK_UI_URL>` — браузердің адрес жолынан алынған {var(data-p)} веб-интерфейсінің URL-ы.
- `<CLIENT_ID>` — сервистік пайдаланушының ID-сы.
- `<CLIENT_SECRET>` — сервистік пайдаланушының құпиясызы (секреті).
- `<SPARK_APP_ID>` — сервис данасының ID-сы. **Жалпы ақпарат** қойындысындағы **Дана ID-сы** өрісінде көрсетіледі.

`Python`-да CIAM-токенін алу мысалы:

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

Spark Connect-ке қосу мысалы:

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

Мұнда `<SPARK_CONNECT>` — Spark Connect эндпоинті. **Жалпы ақпарат** қойындысындағы **Spark Connect** өрісінде көрсетіледі. Толығырақ — {linkto(../../concepts/endpoints#spark-endpoints)[text=%text]} бетінде

## {heading(Скрипттен Spark кластеріне қосу)[id=spark_m2m_connect]}

Скриптте авторизация үшін сервистік пайдаланушының деректемелерін — `Client ID` идентификаторын және `Client Secret` құпиясызын пайдаланыңыз. Spark-клиент CIAM-токенін автоматты түрде алады. Егер сізде CIAM-токені бұрыннан болса, деректемелердің орнына оны пайдаланыңыз.

1. `mlplatform_client` Spark-клиентін орнатқаныңызға көз жеткізіңіз. Егер орнатылмаса, оны орнатыңыз:

   - Егер pip арқылы орнату мүмкін болса:

   ```bash
   pip install mlplatform_client_on_prem --index-url=https://nexus.infra.devmail.ru/repository/mlplatform-pypi/simple/ --extra-index-url=https://nexus.infra.devmail.ru/repository/pypi-proxy/simple
   ```

   - Егер pip қолжетімсіз болса, клиентті қолмен жүктеп алып, орнатыңыз. Дистрибутивтер тізімі — {linkto(../etl_pipeline#etl_pipeline_preparation)[text=ETL-конвейерін жасау]} нұсқаулығында.

1. Python-файл жасап, оған Spark кластеріне қосу скриптін көшіріңіз, айнымалылардың өз мәндеріңізді қойып:

```Python
from mlplatform_client.v2 import CIAMAuth, SparkCluster
from mlplatform_client.v2.clients.spark import SparkClient
from mlplatform_client.v2.utils import wait_job_running, wait_job_succeeded

cluster = SparkCluster(
    SparkClient(
        host=<SPARK_HOST>,
        auth=CIAMAuth(

# Сервистік пайдаланушының деректемелері арқылы авторизация
            client_id=<CLIENT_ID>,
            client_secret=<CLIENT_SECRET>,

# CIAM-токені арқылы авторизация (егер токен бұрыннан алынған болса)

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

Мұнда:

- `<SPARK_HOST>` — Cloud Spark данасының адресі.
- `<SPARK_APP_ID>` — сервис данасының ID-сы. **Жалпы ақпарат** қойындысындағы **Дана ID-сы** өрісінде көрсетіледі.
- `<CLIENT_ID>` — сервистік пайдаланушының ID-сы. **Сервистік пайдаланушылар** қойындысында көрсетіледі.
- `<CLIENT_SECRET>` — сервистік пайдаланушының құпиясызы. **Сервистік пайдаланушылар** қойындысында тек жасау кезінде көрсетіледі.
- `<LK_UI_URL>` — браузердің адрес жолынан алынған {var(data-p)} веб-интерфейсінің URL-ы.
- `<CIAM_ACCESS_TOKEN>` — пайдаланушының CIAM-токені.

## {heading(Сервистік пайдаланушыны жою)[id=spark_service_user_delete]}

Егер сервистік пайдаланушы енді қажет болмаса, кластерге рұқсатты алу үшін оны жойыңыз.

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=service_user_delete]}

{/tab}

{/tabs}