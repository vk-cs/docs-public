# {heading(Синтез речи)[id=cloud_voice-instructions-text_to_speech]}

Функция синтеза речи позволяет озвучивать строки текста. Чтобы синтезировать речь, воспользуйтесь POST- или GET-запросом в `https://voice.mcs.mail.ru/tts`.

## {heading(Запрос)[id=cloud_voice-instructions-text_to_speech-request]}

{tabs}

{tab(GET)}

Для синтеза речи с помощью GET-запроса отправьте текст в параметре `text`.

Пример запроса:

```console
curl -L --request GET \
    --url 'https://voice.mcs.mail.ru/tts?text=<текст для озвучивания>' \
    --output <имя файла>
    --header 'Authorization: Bearer <токен доступа>'
```

{/tab}

{tab(POST)}

Для синтеза речи с помощью POST-запроса отправьте текст в теле запроса.

Пример запроса:

```console
curl -L --request POST \
  --url 'https://voice.mcs.mail.ru/tts?encoder=mp3' \
  --header 'Authorization: Bearer <токен доступа>' \
  --header 'Content-Type: text/plain' \
  --data '<текст для озвучивания>' \
  --output <имя файла>
```

{/tab}

{/tabs}

Параметры запроса:

| Параметр | Описание                                                                                                          | Способ передачи | Допустимые значения |
| --- |-------------------------------------------------------------------------------------------------------------------| --- | --- |
| `model_name` | Название модели голоса                                                                                            | URL | katherine (или katherine-hifigan) — по умолчанию; maria (или maria-serious); pavel (или pavel-hifigan) |
| `encoder` | Тип энкодера                                                                                                      | URL | pcm — по умолчанию; mp3; opus |
| `tempo` | Скорость речи                                                                                                     | URL | от 0.75 до 1.75 |
| `text` | Текст для озвучивания (GET-запрос)                                                                                | URL | До 2000 символов в формате UTF-8 |
| `<текст для озвучивания>` | Текст для озвучивания (POST-запрос)                                                                               | Опция `data`| До 2000 символов в формате UTF-8 |
| `<имя файла>` | Имя аудиофайла с расширением                                                                                      | Опция `output` | ![](/en/assets/no.svg "inline") |
| `<токен доступа>`| Токен доступа для авторизации. Подробнее об авторизации в разделе {linkto(../get-voice-token#cloud_voice-instructions-get_voice_token)[text=Получение токена доступа]} | Опция `header`| ![](/en/assets/no.svg "inline") |

### {heading(Ограничения)[id=cloud_voice-instructions-text_to_speech-request-restriction]}

Передаваемый в запросе текст должен быть в кодировке UTF-8 и содержать не больше 20000 символов.

## {heading(Ответ)[id=cloud_voice-instructions-text_to_speech-answer]}

В ответе содержится аудиофайл выбранного формата. По умолчанию создается PCM-файл.

Параметры возвращаемого формата PCM:

| Параметр   | Значение   |
|------------|------------|
| `audio`      | l16        |
| `rate`       | 24000      |
| `channels`   | 1          |
| `endianness` | big-endian |

Пример конвертации PCM в WAV:

```console
ffmpeg -f s16be -ar 24k -ac 1 -i test_sound7.pcm test_sound7.wav
```

## {heading(Коды ошибок)[id=cloud_voice-instructions-text_to_speech-error_codes]}

| Код  | Статус | Описание                   |
| ---- | ------ | -------------------------- |
| 4048 | 400    | Некорректный токен         |
| 4049 | 400    | Неактивный проект VK Cloud    |
| 4051 | 14001  | Некорректный формат текста |

## Смотрите также

{linkto(../../concepts/about#cloud_voice-concepts-about)[text=Описание сервиса Cloud Voice]}

{linkto(../get-voice-token#cloud_voice-instructions-get_voice_token)[text=Получение токена доступа]}

{linkto(../speech-recognition#cloud_voice-instructions-speech_recognition)[text=Распознавание речи]}
