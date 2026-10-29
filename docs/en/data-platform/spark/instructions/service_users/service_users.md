# {heading(Connecting to a Spark cluster from scripts in Standalone)[id=spark_m2m]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

In the {var(data-p)} Standalone configuration, user identity and access management for Cloud Spark is performed via the CIAM system. For more information about CIAM, see the [CIAM User Guide](https://docs.tech.vk.ru/ciam/ru/26_2/user-guide/common).

To connect to a Cloud Spark cluster from a script, create a service user account and use its credentials for authorization.

## {heading(Creating a service user)[id=spark_service_user_create]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=service_user_create]}

{/tab}   

{/tabs}

## {heading(Obtaining a CIAM token)[id=spark_m2m_token]}

If you connect to Cloud Spark without a Spark client (for example, via Spark Connect), obtain a CIAM token manually. To do this, send a `POST` request to the CIAM token endpoint:

```bash 
ACCESS_TOKEN=$(curl -k -X POST ${<LK_UI_URL>}/iam/hydra/oauth2/token \
     -u "${<CLIENT_ID>}:${<CLIENT_SECRET>}" \
     -d "grant_type=client_credentials" \
     -d "scope=openid" \
     -d "audience=${<SPARK_APP_ID>}" | jq -r .access_token)
```

Here:

- `<LK_UI_URL>` — URL of the {var(data-p)} web interface from the browser address bar.
- `<CLIENT_ID>` — service user ID.
- `<CLIENT_SECRET>` — service user secret.
- `<SPARK_APP_ID>` — service instance ID. It is displayed on the **General information** tab in the **Instance ID** field.

Example of obtaining a CIAM token in `Python`:

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

Example of connecting to Spark Connect:

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

Here `<SPARK_CONNECT>` is the Spark Connect endpoint. It is displayed on the **General information** tab in the **Spark Connect** field. For more information, see the page {linkto(../../concepts/endpoints#spark-endpoints)[text=%text]}

## {heading(Connecting to a Spark cluster from a script)[id=spark_m2m_connect]}

For authorization in the script, use the service user credentials — the `Client ID` identifier and the `Client Secret` secret. The Spark client will obtain a CIAM token automatically. If you already have a CIAM token, use it instead of the credentials.

1. Make sure that you have installed the `mlplatform_client` Spark client. If not, install it:

   - If installation via pip is available:

   ```bash
   pip install mlplatform_client_on_prem --index-url=https://nexus.infra.devmail.ru/repository/mlplatform-pypi/simple/ --extra-index-url=https://nexus.infra.devmail.ru/repository/pypi-proxy/simple
   ```

   - If pip is not available, download and install the client manually. The list of distributions is provided in the instructions {linkto(../etl_pipeline#etl_pipeline_preparation)[text=Creating an ETL pipeline]}.

1. Create a Python file and copy the Spark cluster connection script into it, substituting your own variable values:

```Python
from mlplatform_client.v2 import CIAMAuth, SparkCluster
from mlplatform_client.v2.clients.spark import SparkClient
from mlplatform_client.v2.utils import wait_job_running, wait_job_succeeded

cluster = SparkCluster(
    SparkClient(
        host=<SPARK_HOST>,
        auth=CIAMAuth(

# Authorization via service user credentials
            client_id=<CLIENT_ID>,
            client_secret=<CLIENT_SECRET>,

# Authorization via a CIAM token (if the token has already been obtained)

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

Here:

- `<SPARK_HOST>` — address of the Cloud Spark instance.
- `<SPARK_APP_ID>` — service instance ID. It is displayed on the **General information** tab in the **Instance ID** field.
- `<CLIENT_ID>` — service user ID. It is displayed on the **Service users** tab.
- `<CLIENT_SECRET>` — service user secret. It is displayed on the **Service users** tab only during creation.
- `<LK_UI_URL>` — URL of the {var(data-p)} web interface from the browser address bar.
- `<CIAM_ACCESS_TOKEN>` — user CIAM token.

## {heading(Deleting a service user)[id=spark_service_user_delete]}

If a service user is no longer needed, delete it to revoke access to the cluster.

{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=service_user_delete]}

{/tab}

{/tabs}