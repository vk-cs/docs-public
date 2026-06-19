# {heading(18+ контентін тану)[id=vision-instructions-nsfw-recognition]}

{include(/kz/_includes/_translated_by_ai.md)}

Бұл әдіс фотосуретте тыйым салынған контенттің (18+) бар-жоғын анықтауға мүмкіндік береді.

HOST: `https://smarty.mail.ru`

ENDPOINT: `/api/v1/adult/detect`

## {heading(Сұрау)[id=vision-instructions-nsfw-recognition-request]}

Авторизация деректері сұрау жолында беріледі:

| Параметр       | Тип    | Обязательный | Значение             |
| -------------- | ------ |--------------| -------------------- |
| oauth_token    | string | ![](/kz/assets/check.svg "inline")           | OAuth2 қол жеткізу токені |
| oauth_provider | string | ![](/kz/assets/check.svg "inline")           | OAuth2 провайдері     |

{note:info}

Қол жеткізу токенін алу, сондай-ақ қолдау көрсетілетін OAuth2 провайдерлері {linkto(../../quick-start/auth-vision#vision-quick-start-auth-vision)[text=Авторизация]} мақаласында келтірілген.

{/note}

Сұрау параметрлері сұрау денесінде JSON форматында беріледі:

| Параметр | Тип    | Обязательный                    | Значение                                         |
|----------| ------ |---------------------------------| ------------------------------------------------ |
| file | string | ![](/kz/assets/check.svg "inline")  | Файлдар массиві. Файл атаулары әртүрлі болуы тиіс    |
| meta | object | ![](/kz/assets/check.svg "inline")  | Сұрау денесі                                     |
| images  | array  | ![](/kz/assets/check.svg "inline")  | Берілетін кескіндердің метадеректері           |
| name    | string | ![](/kz/assets/check.svg "inline")  | Сұраудағы және жауаптағы файлдарды сәйкестендіруге арналған файл атаулары|

{note:warn}

Әдіске {linkto(../../concepts/vision-limits#vision-concepts-vision-limits-images)[text=шектеулер]} қолданылады.

{/note}

## {heading(Сұрау үлгісі)[id=vision-instructions-nsfw-recognition-request-example]}

```http
curl -X POST "https://smarty.mail.ru/api/v1/adult/detect?oauth_token=your_token&oauth_provider=mcs"  -H "Accept: application/json"  -H "Content-Type: multipart/form-data"  -F "file=@lena_color.png"  -F "meta={
  "images": [
    {
      "name": "file"
    }
  ]
}"
```

## {heading(Жауап)[id=vision-instructions-nsfw-recognition-request-answer]}

| Параметр      | Тип      | Значение                                                 |
| ------------- | -------- | -------------------------------------------------------- |
| status        | int      | Орындалған операцияның күй коды                         |
| body          | object   | Жауап денесі                                              |
| objects       | array    | Әрбір файл үшін нәтижелер массиві                     |

### {heading(status)[id=vision-instructions-nsfw-recognition-request-answer-status]}

Мүмкін жауаптар:

* `200` — Vision серверлерімен сәтті өзара әрекеттесу. Қалған статустар үшін қате сипаттамасы `body` ішінде келтіріледі.
* `400` — қате сұрау: енгізілген деректер синтаксисінің дұрыстығын тексеріңіз.
* `403` — қол жеткізуге тыйым салынған: қол жеткізу токенін жаңартыңыз немесе басқа провайдерді таңдаңыз.
* `500` — сервердің ішкі қатесі.

### {heading(objects)[id=vision-instructions-nsfw-recognition-request-answer-objects]}

[cols="1,1,1,2", options="header"]
|===
| Параметр
| Тип
| Обязательный
| Значение

| status
| int
| ![](/kz/assets/check.svg "inline")
| Орындалған операцияның күй коды: 

* `0` — сәтті,
* `1` — тұрақты қате,
* `2` — уақытша қате

| error
| string
| ![](/kz/assets/no.svg "inline")
| Қатенің мәтіндік сипаттамасы

| name
| string
| ![](/kz/assets/check.svg "inline")
| Сұраудағы және жауаптағы файлдарды сәйкестендіруге арналған файл атауы

| safe
| number
| ![](/kz/assets/check.svg "inline")
| Суретте 18+ контентінің жоқ екеніне сенімділік дәрежесі; мәні `[0;1]` аралығында
|===

## {heading(Жауап үлгісі)[id=vision-instructions-nsfw-recognition-request-answer-example]}

```json
{
   "status": 200,
   "body": {
      "objects": [
         {
            "status": 0,
            "name": "file",
            "safe": 0.010846120305359364
         }
      ]
   }
}
```
