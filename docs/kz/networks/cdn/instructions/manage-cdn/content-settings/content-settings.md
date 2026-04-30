{include(/kz/_includes/_translated_by_ai.md)}

## Кэшті тазалау

CDN-ресурсы дұрыс жұмыс істемегенде немесе бастаудағы деректер жаңартылған жағдайда, кэшті ішінара немесе толық тазалау қажет болуы мүмкін.

CDN-ресурсының кэшін тазалау үшін:

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_open-cdn.md)}

1. қойындысына өтіңіз **Контент**.
1. блогында **Кэшті тазалау** блогында тазалау түрін таңдаңыз:

    - `Полная` — CDN-ресурсының кэшінен барлық файлдарды толығымен жояды. Кэш толық тазаланғанда, CDN-серверлер контентті бастау серверлерінен сұратады, бұл бастауларға түсетін жүктемені арттырып, сервистің жұмысын тұрақсыздандыруы мүмкін. Егер кэштен үлкен көлемдегі контентті жою қажет болса, кэшті таңдамалы тазалауды пайдаланыңыз.
    - `Выборочная` — CDN-ресурсының кэшінен жекелеген файлдарды жоюға мүмкіндік береді. Енгізу өрісінде жойылуы тиіс файлдарға дейінгі жолды немесе жол үлгісін көрсетіңіз. Үлгі үшін келесі таңбаларды пайдаланыңыз:

        - жолдың басында `/` немесе `*`;
        - жолдағы кез келген таңбалар санын алмастыру үшін `*`.

1. батырмасын басыңыз **Кэшті тазалау**.

{/tab}

{tab(API)}

пайдаланыңыз [әдісін](/kz/tools-for-using-services/api/api-spec/api-cdn) `POST /projects/{project_id}/resources/{resources_id}/purge`.

Сұрау денесінде мынаны көрсетіңіз:

- `[]` — CDN-ресурсындағы барлық файлдарды жою үшін;
- таңдалған файлдың кэшін тазалау үшін домен атауынсыз файлға дейінгі жолды;
- белгілі бір файлдарды жою үшін жол үлгісін. Үлгі үшін келесі таңбаларды пайдаланыңыз:

  - жолдың басында `/` немесе `*`;
  - жолдағы кез келген таңбалар санын алмастыру үшін `*`.

CDN-ресурсының кэшін тазалауға арналған сұрау мысалы:

```json
curl --location --request POST 'https://kz.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281/purge'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "paths": [
        "/test.jpg",
        "/static/*",
        "*.png",
        "*/images/*",
        "*/pictures/*.jpg"
    ]
}'
```

{/tab}

{/tabs}

## Кэшті толтыру

Кэшті толтыру (алдын ала жүктеу) пайдаланушы сұрауын алғанға дейін контентті CDN-ресурсының кэшіне орналастыруға мүмкіндік береді. Осылайша CDN-ресурсына алғашқы сұрау кезінде контентті беру уақытын қысқартуға болады. Толтыру көлемі 200 МБ-тан асатын файлдар үшін өзекті.

{note:warn}

CDN-дегі файлдарды жаңарту үшін алдымен CDN-ресурсының кэшін [тазалауды](#keshti_tazalau) содан кейін толтыруды орындаңыз.

{/note}

CDN-ресурсының кэшін толтыру үшін:

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_open-cdn.md)}

1. қойындысына өтіңіз **Контент**.
1. блогында **Кэшті толтыру** блогында бастаудағы файлдарға дейінгі жолды доменді көрсетпей және әрқайсысын бөлек жолға көрсетіңіз.
1. батырмасын басыңыз **Кэшті толтыру**.

{/tab}

{tab(API)}

пайдаланыңыз [әдісін](/kz/tools-for-using-services/api/api-spec/api-cdn) `POST /projects/{project_id}/resources/{resources_id}/prefetch`.

Сұрау денесінде жүктеу қажет файлдарға дейінгі жолдарды доменді көрсетпей жазыңыз.

CDN-ресурсының кэшін толтыруға арналған сұрау мысалы:

```json
curl --location --request POST 'https://kz.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281/prefetch'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "paths": [
        "/video.mp4",
        "video.mp4"
        ]
    }'
```

{/tab}

{/tabs}

## HTTP жауап кодының баптауы

Опция **HTTP жауап кодының қайтарылуын қосу** опциясы CDN-ресурсында орналастырылған контент үшін HTTP жауап кодын орнатуға мүмкіндік береді. Мысалы, басқа URL-ге қайта бағыттауды баптауға немесе белгілі бір файлдар сұралғанда соңғы пайдаланушыларға 403 кодын жіберуге болады.

HTTP жауап кодын баптау үшін:

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_open-cdn.md)}

1. қойындысына өтіңіз **Контент**.
1. опциясын қосыңыз **HTTP жауап кодының қайтарылуын қосу**.
1. Задайте код в поле **Жауап коды**. өрісінде кодты орнатыңыз. Мысалы, `403`.
1. Қайта бағыттауға арналған URL-ді немесе жауап кодының мәтінін енгізіңіз.
1. батырмасын басыңыз **Өзгерістерді сақтау**.

{/tab}

{tab(API)}

{include(/kz/_includes/_api_cdn_create_change.md)}

блогында `options` параметрлерін жазыңыз `force_return`:

- Опцияны қосу үшін `"enabled": true`, көрсетіңіз  — `"enabled": false`.
- параметрінде HTTP жауап кодын көрсетіңіз. Мысалы `code`.  Мысалы, `"code": 403`.
- параметрінде жауап кодының URL-ін немесе мәтінін көрсетіңіз `body`.

HTTP 403 жауабына арналған баптаулары бар сұрау мысалы 403:

```json
curl --location --request PUT 'https://kz.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "force_return": {
            "enabled": true,
            "code": 403,
            "body": "Доступ запрещен"
        }
    }
}'
```

{/tab}

{/tabs}

## GZip сығуы

CDN-ресурсына түсетін файлдарды GZip әдісімен сығуға болады. Бұл әдістің орташа сығу деңгейі 70%-ды құрайды, кейде 90%-ға дейін жетеді. Сығуға арналған файлдың ең аз өлшемі — 128 байт.

GZip сығу әдісі қолданылғанда, бастау көзінен сығылмаған файлдар сұратылады, сондықтан бұл опция [бастаудағы сығумен](#bastaudagy_sygu) және [үлкен файлдарды жеткізуді оңтайландырумен](#ulken_fayldardy_zhetkizudi_ontaylandyru).

GZip сығуын қосу үшін:

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_open-cdn.md)}

1. қойындысына өтіңіз **Контент**.
1. опциясын қосыңыз **GZip сығуын қосу**.
1. батырмасын басыңыз **Өзгерістерді сақтау**.

{/tab}

{tab(API)}

{include(/kz/_includes/_api_cdn_create_change.md)}

Сұрау денесінде `options` параметрлерін жазыңыз `gzipOn`.

GZip сығу баптаулары бар сұрау мысалы:

```json
curl --location --request PUT 'https://kz.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "gzipOn": {
            "enabled": true,
            "value": true
        }
    }
}'
```

{/tab}

{/tabs}

## Brotli сығуы

CDN-ресурсына түсетін файлдарды Brotli әдісімен сығуға болады. Бұл әдіс файлдарды GZip-ке қарағанда күштірек сығуға мүмкіндік береді. Мысалы, мәтіндік файлдар үшін Brotli сығу деңгейі орта есеппен GZip-тен 20%-ға жоғары. Сығуға арналған файлдың ең аз өлшемі — 128 байт.

Brotli сығу әдісі қолданылғанда, бастау көзінен сығылмаған файлдар сұратылады, ал сығу арнайы прекэш-серверде жүзеге асады. Прекэш-сервер бастау сервері мен CDN-серверлерінің арасында орналасады және бастау серверін жоғары жүктемеден қорғайды. Прекэш-сервер (shielding) арқылы бастау серверін қорғау — ақылы опция, оны қосу үшін [техникалық қолдауға](/kz/contacts).

Опция [бастаудағы сығумен](#bastaudagy_sygu) және [үлкен файлдарды жеткізуді оңтайландырумен](#ulken_fayldardy_zhetkizudi_ontaylandyru).

Brotli сығуын қосу үшін:

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_open-cdn.md)}

1. қойындысына өтіңіз **Контент**.
1. опциясын қосыңыз **Brotli сығуын қосу**.
1. Тізімнен сығылатын контент түрлерін таңдаңыз `text/html` түрі әдепкі бойынша таңдалған, оны тізімнен жоюға болмайды.
1. батырмасын басыңыз **Өзгерістерді сақтау**.

{/tab}

{tab(API)}

{include(/kz/_includes/_api_cdn_create_change.md)}

Сұрау денесінде `options` параметрлерін жазыңыз `brotli_compression`.

Brotli сығу баптаулары бар сұрау мысалы:

```json
curl --location --request PUT 'https://kz.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "brotli_compression": {
            "enabled": true,
            "value": [
                "text/html",
                "application/xml+rss",
                "application/xml"
            ]
        }
    }
}'
```

{/tab}

{/tabs}

## Бастаудағы сығу

Контентті бастауда сығу контентті жеткізуді жылдамдатады: контент CDN-серверге сығылған түрде беріледі, бұл деректерді беру уақытын қысқартады. Опция дұрыс жұмыс істеуі үшін бастау көзі сығуды қолдауы тиіс.

Опция [GZip сығуымен](#szhatie_gzip), [Brotli](#szhatie_brotli) және [үлкен файлдарды жеткізуді оңтайландырумен](#ulken_fayldardy_zhetkizudi_ontaylandyru).

CDN-ресурсы бастаудан сығылған контентті сұратуы үшін:

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_open-cdn.md)}

1. қойындысына өтіңіз **Контент**.
1. опциясын қосыңыз **Запрашивать сжатие на источнике**.
1. батырмасын басыңыз **Өзгерістерді сақтау**.

{/tab}

{tab(API)}

{include(/kz/_includes/_api_cdn_create_change.md)}

Сұрау денесінде `options` параметрлерін жазыңыз `fetch_compressed`.

Бастаудағы сығу баптаулары бар сұрау мысалы:

```json
curl --location --request PUT 'https://kz.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "fetch": {
            "enabled": true,
            "value": true
        }
    }
}'
```

{/tab}

{/tabs}

## Үлкен файлдарды жеткізуді оңтайландыру

Жеткізуді оңтайландыру үшін үлкен файлдар бастау көзінен CDN-ресурсына беріліп, кэште тұтас күйде емес, 10 МБ-тан бөліктермен сақталады. CDN-ресурсы файлды пайдаланушыға ертерек бере бастайды, сондай-ақ файлды бір уақытта бірнеше пайдаланушыға бөліктермен бере алады.

Опция дұрыс жұмыс істеуі үшін бастау көзі HTTP Range request қолдауы тиіс. Егер ресурс үшін бастау топтары пайдаланылса, қолданылатын әрбір бастаудағы файлдарда бірдей Content-Length және ETag тақырыптары болуы тиіс.

Опция қосылғаннан немесе өшірілгеннен кейін кэштеу кілттері өзгереді, контент бастау көзінен қайтадан сұратылады.

{note:warn}

Бастауға түсетін жүктемені азайту үшін опцияны жүктеме ең аз болатын сағаттарда басқарыңыз және прекэш-сервер арқылы бастауды қорғау үшін [техникалық қолдауға](/kz/contacts) хабарласыңыз.

{/note}

Опция [GZip сығуымен](#szhatie_gzip), [Brotli](#szhatie_brotli) және [бастаудағы сығумен](#bastaudagy_sygu).

Үлкен файлдарды жеткізуді оңтайландыруды қосу үшін:

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_open-cdn.md)}

1. қойындысына өтіңіз **Контент**.
1. опциясын қосыңыз **Үлкен файлдарды жеткізуді оңтайландыруды қосу**.
1. батырмасын басыңыз **Өзгерістерді сақтау**.

{/tab}

{tab(API)}

{include(/kz/_includes/_api_cdn_create_change.md)}

Сұрау денесінде `options` параметрлерін жазыңыз `slice`.

Үлкен файлдарды жеткізуді оңтайландыру баптаулары бар сұрау мысалы:

```json
curl --location --request PUT 'https://kz.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "slice": {
            "enabled": true,
            "value": true
        }
    }
}'
```

{/tab}

{/tabs}
