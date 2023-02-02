![{swagger}](./assets/registry.swagger.json)

Пример получения списка бизнес правил из HTTP API платформы:
```bash
# id вашего проекта
export CLIENT_ID=
# access token, который был получен в обмен на авторизационные данные сервисного аккаунта
export ACCESS_TOKEN=

curl -X GET \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  https://iot.mcs.mail.ru/registry/v1/clients/${CLIENT_ID}/rules
```
