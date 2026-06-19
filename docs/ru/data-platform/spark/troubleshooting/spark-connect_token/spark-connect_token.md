# {heading(Не удается подключиться к Spark Connect без токена авторизации)[id=spark_connect_token]}

## {heading(Проблема)[id=spark_connect_token_problem]}

Для подключения к Spark Connect в {var(data-p)} требуется токен авторизации. Токен представляет собой заголовок Basic Auth, который необходимо добавить к запросу при обращении к Spark Connect. Без корректного токена соединение не устанавливается.

## {heading(Решение)[id=spark_connect_token_solving]}

Сгенерируйте токен в формате BasicAuth с помощью кода:
```python
import base64
    
USERNAME = <ИМЯ_ПОЛЬЗОВАТЕЛЯ>
PASSWORD = <ПАРОЛЬ>
    
creds = base64.b64encode(f"{USERNAME}:{PASSWORD}".encode()).decode()
TOKEN = f"Basic {creds}==".replace(" ", "%20").replace("=", "%3D")
spark_connect_url = f"sc://spark-connect-host/;x-vk-token={TOKEN}"
```

Здесь:

- `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — почта пользователя {var(data-p)}.
- `<ПАРОЛЬ>` — пароль пользователя {var(data-p)}.

Используйте полученный токен в строке подключения к Spark Connect.