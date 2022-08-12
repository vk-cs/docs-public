Для того чтобы синтезировать речь, воспользуйтесь POST или GET-запросом в [https://voice.mcs.mail.ru/tts](https://voice.mcs.mail.ru/tts).

Для синтеза речи с помощью GET-запроса, нужно отправить его в параметре `text`:

```bash
curl -L --request GET \
    --url 'https://voice.mcs.mail.ru/tts?text=%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82' \
    --header 'Authorization: Bearer xxxxxxxxxxxx'
 > ~/Downloads/tts.mp3
```

Для синтеза речи с помощью POST-запроса нужно отправить его в теле:

```bash
curl -L --request POST \
  --url 'https://voice.mcs.mail.ru/tts?encoder=mp3' \
  --header 'Authorization: Bearer xxxxxxxxxxxx' \
  --output tts.mp3
```

## Дополнительные параметры

В POST и GET-запросах допускаются следующие параметры:

| Параметр | Описание | Допустимые значения |
| --- | --- | --- |
| model_name | Название модели голоса | katherine (или katherine-hifigan) — по умолчанию; maria (или maria-serious); pavel (или pavel-hifigan) |
| encoder | Тип энкодера | pcm — по умолчанию; mp3; opus |
| tempo | Скорость речи | от 0.75 до 1.75 |

В обоих случаях в ответе будет аудиопоток, формат которого указан в Content-Type.

## Коды ошибок

| Код  | Статус | Описание                   |
| ---- | ------ | -------------------------- |
| 4048 | 400    | Некорректный токен         |
| 4049 | 400    | Неактивный проект VK Cloud    |
| 4051 | 14001  | Некорректный формат текста |

### Смотрите также

[Описание сервиса Cloud Voice](https://mcs.mail.ru/help/ru_RU/cloud-voice/about-cloud-voice)

[Получение токена доступа](https://mcs.mail.ru/help/ru_RU/cloud-voice/get-token)

[Распознавание речи](https://mcs.mail.ru/help/ru_RU/cloud-voice/speech-recognition)
