The speech synthesis function allows you to voice strings of text. To synthesize speech, use a POST or GET request to `https://voice.mcs.mail.ru/tts`.

## The Request

<tabs>
<tablist>
<tab>GET</tab>
<tab>POST</tab>
</tablist>
<tabpanel>

To synthesize speech using a GET request, send the text in the `text` parameter.

Request example:

```bash
curl -L --request GET \
    --url 'https://voice.mcs.mail.ru/tts?text=<text to voice>' \
    --output <file name>
    --header 'Authorization: Bearer <access token>'
```

</tabpanel>
<tabpanel>

To synthesize speech using a POST request, send the text in the body of the request.

Request example:

```bash
curl -L --request POST \
  --url 'https://voice.mcs.mail.ru/tts?encoder=mp3' \
  --header 'Authorization: Bearer <access token>' \
  --header 'Content-Type: text/plain' \
  --data '<text to voice>' \
  --output <file name>
```

</tabpanel>
</tabs>

Request parameters:

| Parameter | Description | Transmission method | Accepted values |
| --- | --- | --- | --- |
| `model_name` | Name of the voice model | URL |katherine (or katherine-hifigan) — by default; maria (or maria-serious); pavel (or pavel-hifigan) |
| `encoder` | Encoder type | URL | pcm — by default; mp3; opus |
| `tempo` | Speech rate | URL | 0.75 to 1.75 |
| `text` | Text for voiceover (GET request)| URL | Up to 2000 symbols in UTF-8 |
| `<text to voice>` | Text for voiceover (POST request) | Option `data`| Up to 2000 symbols in UTF-8|
| `<file name>` | File name with extention | Option `output` | — |
| `<access token>`| Access token for authorization. Read more about authorization in the section [Getting an access token](../get-voice-token/) | Option `header`| — |

### Restrictions

The text passed in the request must be encoded in UTF-8 and contain no more than 20,000 characters.

## Response

The response contains an audio file of the selected format. By default, a PCM file is created.

## Erro codes

| Code  | State | Description                   |
| ---- | ------ | -------------------------- |
| 4048 | 400    | Invalid token       |
| 4049 | 400    | Inactive VK Cloud project   |
| 4051 | 14001  | Invalid text format |

## See also

[About Cloud Voice](../about-cloud-voice/)

[Getting an access token](../get-voice-token/)

[Speech recognition](../speech-recognition/)
