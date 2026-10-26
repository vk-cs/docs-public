# {heading(Connecting to the service instance)[id=trino_connect]}

{include(/en/_includes/_translated_by_ai_en.md)}

The Cloud Trino service instance can only be accessed via TLS using the web interface and third-party clients, such as DBeaver.

{include(../../../_includes/_connect.md)[tags=connect-secure]}

## {heading(Connecting via the web interface)[id=trino_connect-ui]}

{ifdef(public)}
1. [Navigate](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service instances** section.
1. Click on the name of the service instance.
1. On the instance page, go to the **General information** tab.
1. Follow the link specified in the **Trino Admin UI / CLI Client** field.

   {include(../../../_includes/_connect.md)[tags=browser-warning]}

1. Depending on your browser:

   {include(../../../_includes/_connect.md)[tags=browsers-action]}
   
1. Enter the login and password of the Cloud Trino account.

   {ifndef(public)}
   {note:info}
   In the Standalone configuration, authorization is performed via the CIAM system. If you are already authorized in CIAM, the connection will be established automatically.
   {/note}
   {/ifndef}

1. Click **Log In**.

## {heading(Connecting via DBeaver)[id=trino_connect-client]}

1. Go to the **Data Platform** → **Service instances** section.
1. Click on the name of the service instance.
1. On the instance page, go to the **General information** tab.
1. Copy the URL specified in the **Trino JDBC Connection string** field.
1. Open DBeaver.
1. Create a new Trino connection:
   1. On the left in the **Database Navigator** window, right-click on an empty space and select **Create** → **Connection**.
   1. In the window that opens, select the `Trino` service.
   1. In the **Connect by** field, select `URL`.
   1. Paste the copied URL into the **JDBC URL** field.
   1. {ifndef(public)}(For Standalone in {var(cloud)} only){/ifndef} Enter the login of the Cloud Trino account in the **Username** field.
   1. {ifndef(public)}(For Standalone in {var(cloud)} only){/ifndef} Enter the password of the Cloud Trino account in the **Password** field.
   {ifndef(public)}
   1. (For Standalone only) Add the `externalAuthentication=true` parameter to the URL in the **JDBC URL** field. Example:
   
      ```console
      jdbc:trino://<TRINO_ADDRESS>:<PORT>?SSL=true&SSLVerification=NONE&externalAuthentication=true
      ```
      
      When connecting, DBeaver will redirect you to the CIAM system for authentication.
   {/ifndef}

   1. Click the **Finish** button.
      
      The new connection will appear in the **Database Navigator** window.

1. Right-click on the created connection and select **Connect**.
1. If DBeaver offers to download the driver for working with Trino, download it.

{ifndef(public)}

## {heading(Connecting in Standalone)[id=trino_connect-standalone]}

In Standalone, identity and access management is performed via the CIAM system. For more information, see the [official CIAM documentation](https://docs.tech.vk.ru/ciam).

To connect to Cloud Trino from a script or CLI client, create a service user account and obtain a CIAM token.

### {heading(Creating a service user)[id=trino_service_user_create]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=service_user_create]}

{/tab}

{/tabs}

### {heading(Obtaining a CIAM token)[id=trino_m2m_token]}

To connect to Cloud Trino without a login and password, obtain a CIAM token. To do this, send a `POST` request to the CIAM token endpoint:

```bash
ACCESS_TOKEN=$(curl -k -X POST ${<LK_UI_URL>}/iam/hydra/oauth2/token \
     -u "${<CLIENT_ID>}:${<CLIENT_SECRET>}" \
     -d "grant_type=client_credentials" \
     -d "scope=openid" \
     -d "audience=${<TRINO_APP_ID>}" | jq -r .access_token)
```

Here:

- `<LK_UI_URL>` — the URL of the {var(data-p)} web interface from the browser address bar.
- `<CLIENT_ID>` — the ID of the service user.
- `<CLIENT_SECRET>` — the secret of the service user.
- `<TRINO_APP_ID>` — the ID of the service instance. It is displayed on the **General information** tab in the **Instance ID** field.

### {heading(Connecting via trino-cli)[id=trino_connect-cli]}

Run the command, specifying the variable values:

```bash
trino --debug \
    --user=${<CLIENT_ID>} \
    --server=${<TRINO_URL>} \
    --access-token=${<ACCESS_TOKEN>} \
    --insecure \
    --execute="show catalogs;"
```

Here:

- `<CLIENT_ID>` — the ID of the service user.
- `<TRINO_URL>` — the address of the Cloud Trino instance.
- `<ACCESS_TOKEN>` — the CIAM token obtained earlier.

### {heading(Connecting via a Python script)[id=trino_connect-python]}

Create a Python file and copy the script into it, specifying the variable values:

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

Here:

- `<LK_UI_URL>` — the URL of the {var(data-p)} web interface from the browser address bar.
- `<CLIENT_ID>` — the ID of the service user.
- `<CLIENT_SECRET>` — the secret of the service user.
- `<TRINO_APP_ID>` — the ID of the service instance. It is displayed on the **General information** tab in the **Instance ID** field.
- `<TRINO_URL>` — the address of the Cloud Trino instance.
- `<TRINO_PORT>` — the port of the Cloud Trino instance.

### {heading(Deleting a service user)[id=trino_service_user_delete]}

If the service user is no longer needed, delete it to revoke access to the service instance.

{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=service_user_delete]}

{/tab}

{/tabs}
{/ifndef}