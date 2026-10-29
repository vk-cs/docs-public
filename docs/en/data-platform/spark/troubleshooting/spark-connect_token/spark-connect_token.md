# {heading(Cannot connect to Spark Connect without an authorization token)[id=spark_connect_token]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Problem)[id=spark_connect_token_problem]}

Connecting to Spark Connect in {var(data-p)} requires an authorization token. The token is a Basic Auth header that must be added to the request when accessing Spark Connect. Without a valid token, the connection is not established.

## {heading(Solution)[id=spark_connect_token_solving]}

Generate a token in BasicAuth format using the following code:
```python
import base64
    
USERNAME = <USERNAME>
PASSWORD = <PASSWORD>
    
creds = base64.b64encode(f"{USERNAME}:{PASSWORD}".encode()).decode()
TOKEN = f"Basic {creds}==".replace(" ", "%20").replace("=", "%3D")
spark_connect_url = f"sc://spark-connect-host/;x-vk-token={TOKEN}"
```

Where:

- `<USERNAME>` — the {var(data-p)} user's email.
- `<PASSWORD>` — the {var(data-p)} user's password.

Use the resulting token in the Spark Connect connection string.