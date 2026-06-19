# {heading(Қолжетімділік токенін алу)[id=cloud_voice-instructions-get_voice_token]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Токен түрлері)[id=cloud_voice-instructions-get_voice_token-types]}

Токен мыналар үшін беріледі:

- аудиофайлдарды тану;
- ағындық аудионы тану;
- сөйлеуді синтездеу.

Токен алудың екі тәсілі бар:

1. **OAuth** — бұл артықшылық берілетін сценарий, өйткені онда токенді жаңарту механизмі (`refresh token`) іске асырылған.

2. **Сервистік токен** — артықшылығы төмен сценарий. Токен бір рет беріледі және уақыт бойынша шектеусіз жұмыс істей алады. Егер сервистік токен әшкереленсе, қаскүнем сервисті шектеусіз пайдалана алады, бұл үлкен шығындарға әкеледі. Дербес шоттағы қаражат таусылған кезде сервис тоқтатылады.

## {heading(OAuth токені)[id=cloud_voice-instructions-get_voice_token-oauth]}

Токенді генерациялауға арналған сұрау мысалы:

```console
curl -X POST --location 'https://mcs.mail.ru/auth/oauth/v1/token' \
--header 'Content-Type: application/json' \
--data '{
"client_id":"mcs5719255887.voice.6Wg9D18XPZN28DWy4wEba",
"client_secret": "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
"grant_type":"client_credentials"
}'
```

Жауап мысалы:

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

Серверден жауап ретінде сіз 2 токен аласыз:

- `access_token` — қолжетімділік токені (бір сағаттан кейін жарамсыз болады);
- `refresh_token` — қолжетімділік токенін жаңартуға арналған токен.

Токенді жаңартуға арналған сұрау мысалы:

```console
curl -X POST --location 'https://mcs.mail.ru/auth/oauth/v1/token' \
--header 'Content-Type: application/json' \
--data '{
"client_id":"mcs5719255887.voice.6Wg9D18XPZN28DWy4wEba",
"refresh_token":"ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
"grant_type":"refresh_token"
}'
```

Жауап мысалы:

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

Жобада бір мезетте 25 белсенді `refresh_token` дейін болуы мүмкін, олардың әрқайсысына әр сәтте 25 `access_token` байланыстырылуы мүмкін.

{note:warn}

`refresh_token` токендерін бірнеше рет пайдалану үшін сақтап қойыңыз.

{/note}

## {heading(Сервистік токен)[id=cloud_voice-instructions-get_voice_token-service]}

Сервистік токенді алу үшін:

1. VK Cloud [жеке кабинетінде](https://kz.cloud.vk.com/app/main) **AI API** → **Cloud Voice** бөліміне өтіңіз.
1. **Сервистік токен қосу** түймесін басыңыз.
1. Ашылған терезеде қажетті параметрлерді көрсетіп, **Жасау** түймесін басыңыз.

Алынған қолжетімділік токенін барлық HTTP сұрауларында `Bearer Token` пішімінде жіберу қажет.

### Сондай-ақ қараңыз

{linkto(../speech-recognition#cloud_voice-instructions-speech_recognition)[text=Сөйлеуді тану]}

{linkto(../text-to-speech#cloud_voice-instructions-text_to_speech)[text=Сөйлеуді синтездеу]}
