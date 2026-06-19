# {heading(Сөйлеуді тану)[id=cloud_voice-instructions-speech_recognition]}

{include(/kz/_includes/_translated_by_ai.md)}

Сөйлеуді танудың екі түрі қолжетімді:

- аудиофайлдарды тану;
- ағындық аудионы тану.

## {heading(Аудиофайлдарды тану)[id=cloud_voice-instructions-speech_recognition-audiofiles]}

Аудиофайлдан сөйлеуді тану үшін [https://voice.mcs.mail.ru/asr](https://voice.mcs.mail.ru/asr) мекенжайына POST сұрауының денесінде аудиофайлды жіберіп, тақырыпта дұрыс `Content-Type` көрсетіңіз.

Сұрау мысалы:

```console
curl -L --request POST 'https://voice.mcs.mail.ru/asr' \
--header 'Content-Type: audio/ogg; codecs=opus' \
--header 'Authorization: Bearer xxxxxxxxxx'  \
--data-binary '@/Users/User/tts.ogg'
```

Жауап мысалы:

```json
{
	"qid": "0ac6294a351d42ad859404ecd349e4b9",
	"result": {
		"texts": [
			{
				"text": "привет алиса",
				"confidence": 1.0,
				"punctuated_text": "Привет, Алиса."
			}
		],
		"phrase_id": "20220921-1515-4d75-92b4-24b6c101ba6a"
	}
}
```
{note:warn}

Егер API шуылдары бар нәтиже қайтарса, мәселе жауапты өңдеуде болуы мүмкін. Кодта барлық параметрлерді дұрыс көрсету маңызды. Параметрлер API қайтаратын пішімге дәл сәйкес келетініне көз жеткізіңіз.

{/note}


### {heading(Қолдау көрсетілетін аудио пішімдері)[id=cloud_voice-instructions-speech_recognition-audiofiles-formats]}

| Контейнер | Кодек | Content-type           |
| --------- | ----- | ---------------------- |
| WAV       | ![](/en/assets/no.svg "inline")     | audio/wave             |
| OGG       | Opus  | audio/ogg; codecs=opus |

### {heading(Шектеулер)[id=cloud_voice-instructions-speech_recognition-audiofiles-restrictions]}

| Шектеу                         | Мәні     |
| ------------------------------- | -------- |
| Аудиофайлдың максималды өлшемі | 20 Мб    |
| Аудионың максималды ұзақтығы   | 5 мин    |
| Арналардың максималды саны     | 1        |

### {heading(Қате кодтары)[id=cloud_voice-instructions-speech_recognition-audiofiles-error-codes]}

| Код  | Күйі  | Сипаттамасы                                  |
| ---- | ------ | --------------------------------------------- |
| 4009 | 400    | Аудио өлшемі тым үлкен                       |
| 4033 | 400    | Белгісіз аудио пішімі                        |
| 4034 | 400    | Аудио бүлінген немесе күтпеген пішімде       |
| 4043 | 400    | Аудио тым ұзын                               |
| 4044 | 400    | Қолдау көрсетілмейтін аудио арналар саны     |
| 4045 | 400    | Қолдау көрсетілмейтін аудио дискреттеу жиілігі |
| 4048 | 400    | Жарамсыз токен                               |
| 4049 | 400    | VK Cloud жобасы белсенді емес                |

## {heading(Ағындық аудионы тану)[id=cloud_voice-instructions-speech_recognition-audiostream]}

Чанкты (сөйлеудің шағын бөлігін) тану үшін тапсырма жасауға сұрау жіберу керек. Осыдан кейін чанктарды жіберіп, соңғы нәтижені алу мүмкіндігі пайда болады.

### {heading(Тапсырма жасауға сұрау)[id=cloud_voice-instructions-speech_recognition-audiostream-request_task]}

Тапсырма жасау үшін `access_token` бар авторизация тақырыбымен https://voice.mcs.mail.ru/asr_stream/create_task мекенжайына POST сұрауын жіберу жеткілікті, жауапта `task_id`, `task_token` келеді.

Сұрау мысалы:

```console
curl --request POST \
  --url https://voice.mcs.mail.ru/asr_stream/create_task \
  --header 'Authorization: Bearer access_tokenxxxxxxxx'
```

Жауап мысалы:

```json
{
  "qid": "61b5cf067c494b4a9a0b87a3c43e37ef",
  "result": {
    "task_id": "05ad987e-ceee-4186-acdb-956148b91692",
    "task_token": "<ЗНАЧЕНИЕ_ТОКЕНА>"
  }
}
```

### {heading(Чанк жіберуге сұрау)[id=cloud_voice-instructions-speech_recognition-audiostream-request_send]}

Чанк таңдалған пішімдегі аудиофрагмент болып табылады, сондықтан әр чанкта тақырыптар болуы тиіс.

Чанк жіберу үшін мыналар жеткілікті:

- тақырыпта `Authorization- task_token` параметрін беріп, https://voice.mcs.mail.ru/asr_stream/add_chunk мекенжайына POST сұрауын жіберу;
- `task_id` және `chunk_num` мәндерін GET параметрлерінде беру (нөмірлеу `0`-ден басталады);
- сұрау тақырыбында дұрыс `Content-Type` көрсету.
- сұрау денесінде `wav` немесе `ogg` пішіміндегі байттар массиві болатын чанк беріледі.

Жауапта чанктарды тану нәтижесі келеді.

Сұрау мысалы:

```console
curl --request POST \
  --url 'https://voice.mcs.mail.ru/asr_stream/add_chunk?task_id=xxxxx&chunk_num=2' \
  --header 'Authorization: Bearer task_tokenxxxxxxxx' \
  --header 'Content-Type: audio/wave' \
  --data 'xxxxxxxxxx'
```

Жауап мысалы:

```json
{
  "qid": "4d44cb0eb81f4e7f84a7997ec4f2f3c4",
  "result": {
    "text": "привет маруся"
  }
}
```

{note:warn}

Чанктарды жіберу аралығы 5 секундтан аспауы керек, одан кейін тапсырма `done` күйіне өтеді және чанктарды әрі қарай жіберу мүмкін болмайды. Чанктардың өзін ретімен және синхронды түрде жіберу қажет.

{/note}

{note:err}

Соңғы чанк үшін `last=1` мәні бар GET параметрін беру қажет.

{/note}

#### {heading(Қолдау көрсетілетін аудио пішімдері)[id=cloud_voice-instructions-speech_recognition-audiostream-request_send-formats]}

| Контейнер | Кодек | Content-type          |
| --------- | ----- | --------------------- |
| WAV       | ![](/en/assets/no.svg "inline")     | audio/wave            |
| OGG       | Opus  | audio/ogg codecs=opus |

## {heading(Шектеулер)[id=cloud_voice-instructions-speech_recognition-restrictions]}

| Шектеу                         | Мәні     |
| ------------------------------- | -------- |
| Аудиофайлдың максималды өлшемі | 32100 Б  |
| Аудионың максималды ұзақтығы   | 1 с      |
| Арналардың максималды саны     | 1        |
| Чанктардың минималды саны      | 5        |

{note:info}

Чанктің ұсынылатын ұзындығы — 0.08 секунд.

{/note}

### {heading(Тапсырманың соңғы нәтижесін алуға сұрау)[id=cloud_voice-instructions-speech_recognition-restrictions-request_task]}

Чанктар жіберілгеннен кейін кез келген уақытта нәтижені алуға болады, ол үшін тақырыпта `Authorization- task_token`, ал GET параметрлерінде `task_id` мәнін беріп, https://voice.mcs.mail.ru/asr_stream/get_result мекенжайына GET сұрауын жіберу қажет.

Жауапта тапсырманың ағымдағы күйімен бірге тану нәтижесі келеді.

Сұрау мысалы:

```console
curl --request GET \
  --url 'https://voice.mcs.mail.ru/asr_stream/get_result?task_id=xxxxx' \
  --header 'Authorization: Bearer task_tokenxxxxxxxx' \
```

Жауап мысалы:

```json
{
  "qid": "517e5ba9f4a9465c9d73778bedac0808",
  "result": {
    "text": "привет маруся привет маруся",
    "status": "done"
  }
}
```
