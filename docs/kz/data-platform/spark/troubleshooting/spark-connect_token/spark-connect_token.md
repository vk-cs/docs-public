# {heading(Авторизация токенінсіз Spark Connect-ке қосылу мүмкін емес)[id=spark_connect_token]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Мәселе)[id=spark_connect_token_problem]}

{var(data-p)} жүйесіндегі Spark Connect-ке қосылу үшін авторизация токені қажет. Токен — Spark Connect-ке жүгінген кезде сұрауға қосылуы тиіс Basic Auth тақырыбы. Дұрыс токен болмаса, қосылым орнатылмайды.

## {heading(Шешім)[id=spark_connect_token_solving]}

Токенді BasicAuth форматында мына код арқылы жасаңыз:
```python
import base64

USERNAME = <ПАЙДАЛАНУШЫ_АТЫ>
PASSWORD = <ҚҰПИЯСӨЗ>

creds = base64.b64encode(f"{USERNAME}:{PASSWORD}".encode()).decode()
TOKEN = f"Basic {creds}==".replace(" ", "%20").replace("=", "%3D")
spark_connect_url = f"sc://spark-connect-host/;x-vk-token={TOKEN}"
```

Мұнда:

- `<ПАЙДАЛАНУШЫ_АТЫ>` — {var(data-p)} пайдаланушысының поштасы.
- `<ҚҰПИЯСӨЗ>` — {var(data-p)} пайдаланушысының құпиясөзі.

Алынған токенді Spark Connect-ке қосылу жолында пайдаланыңыз.