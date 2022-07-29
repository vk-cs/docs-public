The token is issued for:

- recognition of audio files;
- recognition of streaming audio;
- speech synthesis.

There are two ways to get a token:

1. **OAuth** is the preferred scenario as it implements a `refresh token` mechanism.

An example of a request to generate a token:

```bash
curl -L -w '\n' -X POST 'https://mcs.mail.ru/auth/oauth/v1/token' -D - -HContent-Type:application/json -d '{"client_id": "mcs5719255887.voice.6Wg9D18XPZN28DWy4wEba", "client_secret":"1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", "grant_type":"client_credentials"}'
```

Answer example:

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

In response from the server, you will receive 2 tokens:

- **access_token** — access token (becomes invalid in an hour);
- **refresh_token** — token for refreshing the access token.

Example of a token refresh request:

```bash
curl -X POST 'https://mcs.mail.ru/auth/oauth/v1/token'
-H Content-Type:application/json
-d '{
"client_id":"mcs5719255887.voice.6Wg9D18XPZN28DWy4wEba",
"refresh_token":"ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", "grant_type":"refresh_token"
}'
```

Answer example:

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

A project can have up to 25 active `refresh_token` at a time, each of them can have 25 `access_token` associated at any given time.

<warn>

The received refresh_tokens need to be saved so that they can be used in the future.

</warn>

2. **Service Token** is a less preferred scenario. The token is issued once and can work without time limit. The only risk of using such a token is that when the token is selected or compromised, an attacker may be able to use the service in very large volumes, which will entail unexpected expenses. When the funds on the personal account are exhausted, the service will be suspended.

To get a service token, click Machine Learning → Voice API → Add Service Token.

Select the required checkboxes and click "Create".

The received access token must be sent in all HTTP requests in the Bearer Token format.

### See also

[Description of the Cloud Voice service](https://mcs.mail.ru/help/ru_RU/cloud-voice/about-cloud-voice)

[Speech recognition](https://mcs.mail.ru/help/ru_RU/cloud-voice/speech-recognition)

[Speech synthesis](https://mcs.mail.ru/help/ru_RU/cloud-voice/text-to-speech)
