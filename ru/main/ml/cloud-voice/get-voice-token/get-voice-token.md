Токен выдается на:
- распознавание аудиофайлов;
- распознавание потокового аудио;
- синтез речи.

Есть два способа получения токена:

1.  **OAuth** — это предпочтительный сценарий, так как в нем реализован механизм обновления токена (refresh token).
    
    Пример запроса для генерации токена: 
    ```
    curl -L -w '\n' -X POST 'https://mcs.mail.ru/auth/oauth/v1/token' -D - -HContent-Type:application/json -d '{"client_id":"mcs5719255887.voice.6Wg9D18XPZN28DWy4wEba", "client_secret":"1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", "grant_type":"client_credentials"}'
    ```
    
    Пример ответа:
    
    ```
    {
    "refresh_token":"ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    "access_token":"0987654321ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "expired_in":"3600",
    "scope": {
        "tts":1,
        "asr_short":1,
        "asr_stream":1
    }
}
    ```  
    В ответе от сервера вы получите 2 токена:
        - **access_token** — токен доступа (через час становится невалидным);
        - **refresh_token** — токен для обновления токена доступа.ё

    Пример запроса на обновление токена:
    ```
    curl -X POST 'https://mcs.mail.ru/auth/oauth/v1/token'
    -H Content-Type:application/json
    -d '{
    "client_id":"mcs5719255887.voice.6Wg9D18XPZN28DWy4wEba",
    "refresh_token":"ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", "grant_type":"refresh_token"
    }'
    ```

    Пример ответа:
    ```
    {
    "refresh_token":"ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    "access_token":"23wcTiUeaa334Uv6TH3StRGiZBMCyyo1Hzgqqa3n",
    "expired_in":"3600", 
    "scope": {
    "tts":1,
    "asr_short":1,
    "asr_stream":1
    }
    }
    ```

    В проекте единовременно может быть до 25 активных refresh_token, к каждому из них может быть привязано по 25 access_token в каждый момент времени. 

    <warn>

    Полученные refresh_token нужно сохранить, чтобы в будущем их можно было использовать.

    </warn>

2.  **Сервисный токен** — менее предпочтительный сценарий. Токен выдается один раз и может работать без ограничения времени.  Единственный риск использования такого токена является то, что при подборе токена или его компрометации, злоумышленник может получить возможность пользоваться сервисом в очень больших объемах, которые повлекут непредвиденные траты. Когда денежные средства на лицевом счете будут исчерпаны, сервис будет приостановлен.
    
Чтобы получить сервисный токен, нажмите «Машинное обучение» → «Voice API» → «Добавить сервисный токен».

Укажите галочкой необходимые и нажмите «Создать».

Полученный токен доступа необходимо отправлять во всех HTTP запросах в формате Bearer Token.
### Смотрите также
[Описание сервиса Cloud Voice](https://mcs.mail.ru/help/ru_RU/cloud-voice/about-cloud-voice)

[Распознавание речи](https://mcs.mail.ru/help/ru_RU/cloud-voice/speech-recognition)

[Синтез речи](https://mcs.mail.ru/help/ru_RU/cloud-voice/text-to-speech)

