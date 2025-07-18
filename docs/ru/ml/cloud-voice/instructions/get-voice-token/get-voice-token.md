## Типы токенов

Токен выдается на:

- распознавание аудиофайлов;
- распознавание потокового аудио;
- синтез речи.

Есть два способа получения токена:

1. **OAuth** — это предпочтительный сценарий, так как в нем реализован механизм обновления токена (`refresh token`).

2. **Сервисный токен** — менее предпочтительный сценарий. Токен выдается один раз и может работать без ограничения времени. Если сервисный токен скомпрометирован, злоумышленник сможет неограниченно использовать сервис, что повлечет большие траты. Когда средства на лицевом счете закончатся, сервис будет приостановлен.

## OAuth токен

Пример запроса для генерации токена:

```console
curl -X POST --location 'https://mcs.mail.ru/auth/oauth/v1/token' \
--header 'Content-Type: application/json' \
--data '{
"client_id":"mcs5719255887.voice.6Wg9D18XPZN28DWy4wEba",
"client_secret": "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
"grant_type":"client_credentials"
}'
```

Пример ответа:

```json
{
  "refresh_token": "<ЗНАЧЕНИЕ_ОБНОВЛЯЮЩЕГО_ТОКЕНА>",
  "access_token": "<ЗНАЧЕНИЕ_ТОКЕНА_ДОСТУПА>",
  "expired_in": "3600",
  "scope": {
    "tts": 1,
    "asr_short": 1,
    "asr_stream": 1
  }
}
```

В ответе от сервера вы получите 2 токена:

- `access_token` — токен доступа (через час становится невалидным);
- `refresh_token` — токен для обновления токена доступа.

Пример запроса на обновление токена:

```console
curl -X POST --location 'https://mcs.mail.ru/auth/oauth/v1/token' \
--header 'Content-Type: application/json' \
--data '{
"client_id":"mcs5719255887.voice.6Wg9D18XPZN28DWy4wEba",
"refresh_token":"ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
"grant_type":"refresh_token"
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

{note:warn}

Сохраните `refresh_token`, чтобы многократно использовать их.

{/note}

## Сервисный токен

Чтобы получить сервисный токен:

1. В [личном кабинете](https://msk.cloud.vk.com/app/main) VK Cloud перейдите в раздел **AI API** → **Cloud Voice**.
1. Нажмите кнопку **Добавить сервисный токен**.
1. В появившемся окне укажите необходимые параметры и нажмите кнопку **Создать**.

Полученный токен доступа необходимо отправлять во всех HTTP-запросах в формате `Bearer Token`.

### Смотрите также

[Распознавание речи](../speech-recognition)

[Синтез речи](../text-to-speech)
