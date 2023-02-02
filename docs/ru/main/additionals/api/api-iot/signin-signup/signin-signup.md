Для работы с API необходимо создать сервисный аккаунт на платформе.

Аутентификация и авторизация при работе с API платформы осуществляется на основе стандарта [OpenID Connect](https://openid.net/connect/).

Access токен можно получить в специализированном HTTP API в обмен на авторизационные данные сервисного аккаунта.

Пример обмена авторизационных данных сервисного аккаунта платформы на access токен:

```bash
export SERVICE_ACCOUNT_ID=
export SERVICE_ACCOUNT_SECRET=

curl -X POST \
    -d "client_id=${SERVICE_ACCOUNT_ID}&client_secret=${SERVICE_ACCOUNT_SECRET}&grant_type=client_credentials" \
    -H "Content-Type: application/x-www-form-urlencoded" \ 
    https://iot.mcs.mail.ru/keycloak/auth/realms/iot/protocol/openid-connect/token
```
