<details>
  <summary markdown="span">Авторизация и аутентификация</summary>
  
Для работы понадобится информация:

- `{login}` — ваш логин от личного кабинета партнера;
- `{password}` — ваш пароль от личного кабинета партнера.

<warn>

Выполнение запросов возможно только для проектов с `is_partner=true`. Чтобы узнать список таких проектов, используйте метод `/api/v1/partners/{pid}/clients/`, где `{pid}` — [идентификатор проекта](/ru/base/account/instructions/project-settings/manage#poluchenie_identifikatora_proekta).

</warn>

1. Авторизуйтесь под своими учетными данными:

   ```bash
   curl -v 'https://mcs.mail.ru/api/v1/auth/signin' \
     -H 'accept: application/json, text/plain, */*' \
     -H 'accept-language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' \
     -H 'cache-control: no-cache' \
     -H 'content-type: application/json;charset=UTF-8' \
     -H 'x-mcs-request-id: c83ebaaff3d44a78affa041ef6f2c41a' \
     --data-raw $'{"email":"{login}","password":"{password}"}' \
     --compressed
   ```

1. Скопируйте значение параметра `set-cookie: sid` в ответе.

   Пример значения параметра:

      ```bash
      set-cookie: sid=tzWAzgSJ8sE4cfNfXXXXXX; expires=Thu, 01 Jun 2020 00:00:00 GMT; domain=.mcs.mail.ru; path=/; Secure; HttpOnly; SameSite=None
      ```

1. Получите CSRF-токен:

   ```bash
   curl 'https://mcs.mail.ru/api/v1/tokens/csrf' \
   -H 'accept: application/json, text/plain, */*' \
   -H 'accept-language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' \
   -H 'cache-control: no-cache' \
   -H 'content-type: application/json;charset=UTF-8' \
   -H 'cookie: <set-cookie из предыдущего запроса>' \
   -H 'x-csrf-token: ' \
   -H 'x-email: {login}' \
   -H 'x-mcs-request-id: f3b824f32eae404497c2b14dc027cd75' \
   --data-raw $'{"email":"{login}"}' \
   --compressed
   ```

1. Скопируйте значение параметра `token` в ответе.

Используйте полученные параметры `set-cookie: sid` и `token` в заголовке при отправке запросов. Пример запроса:

```bash
curl -X GET 'https://mcs.mail.ru/api/v1/partners/mcs1111111111111/invites' \
  -H 'cookie: sid=tzWAzgSJ8sE4cfNfXXXXXX; expires=Thu, 01 Jun 2020 00:00:00 GMT; domain=.mcs.mail.ru; path=/; Secure; HttpOnly; SameSite=None' \
  -H 'x-csrf-token: XXXXXXciOiJIUzI1NiJ9.eyJzaWQiOiJ0eldBemdTSjhzRTRjZk5mTEh4elJWIn0.iRZ_dMTXx55Q41zwRmK3SxA_XXXX'
```

</details>

<warn>

В статье могут быть описаны не все поля спецификации. Для разработки используйте исходную спецификацию в формате YAML:

[Спецификация в формате YAML](./assets/partnersapi.yaml "download")

</warn>

![{swagger}](./assets/partnersapi-swagger.json)
