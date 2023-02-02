Пример запроса для генерации токена:

```bash
curl -L -w '\n' -X POST 'https://mcs.mail.ru/auth/oauth/v1/token' -D - -HContent-Type:application/json -d '{"client_id":"mcs5719255887.voice.6Wg9D18XPZN28DWy4wEba", "client_secret":"1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", "grant_type":"client_credentials"}'
```

Пример ответа:

```json
{
  "refresh_token": "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
  "access_token": "0987654321ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "expired_in": "3600",
  "scope": {
    "tts": 1,
    "asr_short": 1,
    "asr_stream": 1
  }
}
```

В ответе от сервера вы получите 2 токена:

- **access_token** — токен доступа (через час становится невалидным);
- **refresh_token** — токен для обновления токена доступа.

Пример запроса на обновление токена:

```bash
curl -X POST 'https://mcs.mail.ru/auth/oauth/v1/token'
-H Content-Type:application/json
-d '{
"client_id":"mcs5719255887.voice.6Wg9D18XPZN28DWy4wEba",
"refresh_token":"ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", "grant_type":"refresh_token"
}'
```

Пример ответа:

```json
{
  "refresh_token": "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
  "access_token": "23wcTiUeaa334Uv6TH3StRGiZBMCyyo1Hzgqqa3n",
  "expired_in": "3600",
  "scope": {
    "tts": 1,
    "asr_short": 1,
    "asr_stream": 1
  }
}
```

В проекте единовременно может быть до 25 активных `refresh_token`, к каждому из них может быть привязано по 25 `access_token` в каждый момент времени.

<warn>

Полученные refresh_token нужно сохранить, чтобы в будущем их можно было использовать.

</warn>

Также есть возможность получить сервисный токен. Подробнее читайте в статье [Получение токена доступа](../../../../ml/cloud-voice/get-voice-token).
