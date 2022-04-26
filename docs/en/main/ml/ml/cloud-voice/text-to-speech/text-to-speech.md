To synthesize speech, use a POST or GET request to [https://voice.mcs.mail.ru/tts](https://voice.mcs.mail.ru/tts).

To synthesize speech using a GET request, you need to send it in the `text` parameter:

```bash
curl -L --request GET \
    --url 'https://voice.mcs.mail.ru/tts?text=%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82'
    --header 'Authorization: Bearer xxxxxxxxxxxx'
 > ~/Downloads/tts.mp3
```

To synthesize speech using a POST request, you need to send it in the body:

```bash
curl -L --request POST \
  --url 'https://voice.mcs.mail.ru/tts?encoder=mp3'
  --header 'Authorization: Bearer xxxxxxxxxxxx'
  --output tts.mp3
```

## Extra options

The following parameters are allowed in POST and GET requests:

| Parameter  | Description             | Valid values ​​                                                                               |
| ---------- | ----------------------- | --------------------------------------------------------------------------------------------- |
| model_name | Name of the voice model | katherine (or katherine-hifigan) - default maria (or maria-serious); pavel (or pavel-hifigan) |
| encoder    | Encoder type            | pcm - default mp3; opus                                                                       |
| tempo      | Speech rate             | from 0.75 to 1.75                                                                             |

In both cases, the response will be an audio stream, the format of which is specified in Content-Type.

## Error codes

| Code | Status | Description            |
| ---- | ------ | ---------------------- |
| 4048 | 400    | Invalid token          |
| 4049 | 400    | Inactive project VK CS |
| 4051 | 14001  | Incorrect text format  |

### See also

[Description of the Cloud Voice service](https://mcs.mail.ru/help/ru_RU/cloud-voice/about-cloud-voice)

[Getting an access token](https://mcs.mail.ru/help/ru_RU/cloud-voice/get-token)

[Speech recognition](https://mcs.mail.ru/help/ru_RU/cloud-voice/speech-recognition)
