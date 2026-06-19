# {heading(Контентті басқару)[id=cdn-content-settings]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Кэшті тазалау)[id=cdn-content-settings-cache-clearing]}

CDN-ресурсы дұрыс жұмыс істемегенде немесе бастаудағы деректер жаңартылған жағдайда, кэшті ішінара немесе толық тазалау қажет болуы мүмкін.

CDN-ресурсының кэшін тазалау үшін:

{tabs}

{tab(Жеке кабинет)}

{include(../../../../../_includes/_open-cdn.md)}

1. **Контент** қойындысына өтіңіз.
1. **Кэшті тазалау** блогында тазалау түрін таңдаңыз:

    - `Полная` — CDN-ресурсының кэшінен барлық файлдарды толығымен жояды. Кэш толық тазаланғанда, CDN-серверлер контентті бастау серверлерінен сұратады, бұл бастауларға түсетін жүктемені арттырып, сервистің жұмысын тұрақсыздандыруы мүмкін. Егер кэштен үлкен көлемдегі контентті жою қажет болса, кэшті таңдамалы тазалауды пайдаланыңыз.
    - `Выборочная` — CDN-ресурсының кэшінен жекелеген файлдарды жоюға мүмкіндік береді. Енгізу өрісінде жойылуы тиіс файлдарға дейінгі жолды немесе жол үлгісін көрсетіңіз. Үлгі үшін келесі таңбаларды пайдаланыңыз:

        - жолдың басында `/` немесе `*` пайдаланыңыз;
        - жолдағы кез келген таңбалар санын алмастыру үшін `*` пайдаланыңыз.

1. **Кэшті тазалау** батырмасын басыңыз.

{/tab}

{tab(API)}

{linkto(../../../../../tools-for-using-services/api/api-spec/api-cdn#api-spec-cdn)[text=әдісті]} `POST /projects/{project_id}/resources/{resources_id}/purge` пайдаланыңыз.

Сұрау денесінде мынаны көрсетіңіз:

- `[]` — CDN-ресурсындағы барлық файлдарды жою үшін;
- таңдалған файлдың кэшін тазалау үшін домен атауынсыз файлға дейінгі жолды;
- белгілі бір файлдарды жою үшін жол үлгісін. Үлгі үшін келесі таңбаларды пайдаланыңыз:

  - жолдың басында `/` немесе `*` пайдаланыңыз;
  - жолдағы кез келген таңбалар санын алмастыру үшін `*` пайдаланыңыз.

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

## {heading(Кэшті толтыру)[id=cdn-content-settings-cache-filling]}

Кэшті толтыру (алдын ала жүктеу) пайдаланушы сұрауын алғанға дейін контентті CDN-ресурсының кэшіне орналастыруға мүмкіндік береді. Осылайша CDN-ресурсына алғашқы сұрау кезінде контентті беру уақытын қысқартуға болады. Толтыру көлемі 200 МБ-тан асатын файлдар үшін өзекті.

{note:warn}

CDN-дегі файлдарды жаңарту үшін алдымен CDN-ресурсының кэшін {linkto(#cdn-content-settings-cache-clearing)[text=тазалауды]}, содан кейін толтыруды орындаңыз.

{/note}

CDN-ресурсының кэшін толтыру үшін:

{tabs}

{tab(Жеке кабинет)}

{include(../../../../../_includes/_open-cdn.md)}

1. **Контент** қойындысына өтіңіз.
1. **Кэшті толтыру** блогында бастаудағы файлдарға дейінгі жолды доменді көрсетпей және әрқайсысын бөлек жолға көрсетіңіз.
1. **Кэшті толтыру** батырмасын басыңыз.

{/tab}

{tab(API)}

{linkto(../../../../../tools-for-using-services/api/api-spec/api-cdn#api-spec-cdn)[text=әдісті]} `POST /projects/{project_id}/resources/{resources_id}/prefetch` пайдаланыңыз.

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

## {heading(HTTP жауап кодының баптауы)[id=cdn-content-settings-http-response]}

**HTTP жауап кодының қайтарылуын қосу** опциясы CDN-ресурсында орналастырылған контент үшін HTTP жауап кодын орнатуға мүмкіндік береді. Мысалы, басқа URL-ге қайта бағыттауды баптауға немесе белгілі бір файлдар сұралғанда соңғы пайдаланушыларға 403 кодын жіберуге болады.

HTTP жауап кодын баптау үшін:

{tabs}

{tab(Жеке кабинет)}

{include(../../../../../_includes/_open-cdn.md)}

1. **Контент** қойындысына өтіңіз.
1. **HTTP жауап кодының қайтарылуын қосу** опциясын қосыңыз.
1. **Жауап коды** өрісінде кодты орнатыңыз. Мысалы, `403`.
1. Қайта бағыттауға арналған URL-ді немесе жауап кодының мәтінін енгізіңіз.
1. **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{tab(API)}

{include(../../../../../_includes/_api_cdn_create_change.md)}

`options` блогында `force_return` параметрлерін жазыңыз:

- Опцияны қосу үшін `"enabled": true`, өшіру үшін — `"enabled": false` көрсетіңіз.
- `code` параметрінде HTTP жауап кодын көрсетіңіз. Мысалы, `"code": 403`.
- `body` параметрінде жауап кодының URL-ін немесе мәтінін көрсетіңіз.

HTTP 403 жауабына арналған баптаулары бар сұрау мысалы:

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

## {heading(GZip сығуы)[id=cdn-content-settings-gzip-compression]}

CDN-ресурсына түсетін файлдарды GZip әдісімен сығуға болады. Бұл әдістің орташа сығу деңгейі 70%-ды құрайды, кейде 90%-ға дейін жетеді. Сығуға арналған файлдың ең аз өлшемі — 128 байт.

GZip сығу әдісі қолданылғанда, бастау көзінен сығылмаған файлдар сұратылады, сондықтан бұл опция {linkto(#cdn-content-settings-source-compression)[text=бастаудағы сығумен]} және {linkto(#cdn-content-settings-large-files-optimizing)[text=үлкен файлдарды жеткізуді оңтайландырумен]} бірге жұмыс істемейді.

GZip сығуын қосу үшін:

{tabs}

{tab(Жеке кабинет)}

{include(../../../../../_includes/_open-cdn.md)}

1. **Контент** қойындысына өтіңіз.
1. **GZip сығуын қосу** опциясын қосыңыз.
1. **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{tab(API)}

{include(../../../../../_includes/_api_cdn_create_change.md)}

Сұрау денесінде `options` блогында `gzipOn` параметрлерін жазыңыз.

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

## {heading(Brotli сығуы)[id=cdn-content-settings-brotli-compression]}

CDN-ресурсына түсетін файлдарды Brotli әдісімен сығуға болады. Бұл әдіс файлдарды GZip-ке қарағанда күштірек сығуға мүмкіндік береді. Мысалы, мәтіндік файлдар үшін Brotli сығу деңгейі орта есеппен GZip-тен 20%-ға жоғары. Сығуға арналған файлдың ең аз өлшемі — 128 байт.

Brotli сығу әдісі қолданылғанда, бастау көзінен сығылмаған файлдар сұратылады, ал сығу арнайы прекэш-серверде жүзеге асады. Прекэш-сервер бастау сервері мен CDN-серверлерінің арасында орналасады және бастау серверін жоғары жүктемеден қорғайды. Прекэш-сервер (shielding) арқылы бастау серверін қорғау — ақылы опция, оны қосу үшін [техникалық қолдауға](/kz/contacts) хабарласыңыз.

Опция {linkto(#cdn-content-settings-source-compression)[text=бастаудағы сығумен]} және {linkto(#cdn-content-settings-large-files-optimizing)[text=үлкен файлдарды жеткізуді оңтайландырумен]} бірге жұмыс істемейді.

Brotli сығуын қосу үшін:

{tabs}

{tab(Жеке кабинет)}

{include(../../../../../_includes/_open-cdn.md)}

1. **Контент** қойындысына өтіңіз.
1. **Brotli сығуын қосу** опциясын қосыңыз.
1. Тізімнен сығылатын контент түрлерін таңдаңыз. `text/html` түрі әдепкі бойынша таңдалған, оны тізімнен жоюға болмайды.
1. **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{tab(API)}

{include(../../../../../_includes/_api_cdn_create_change.md)}

Сұрау денесінде `options` блогында `brotli_compression` параметрлерін жазыңыз.

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

## {heading(Бастаудағы сығу)[id=cdn-content-settings-source-compression]}

Контентті бастауда сығу контентті жеткізуді жылдамдатады: контент CDN-серверге сығылған түрде беріледі, бұл деректерді беру уақытын қысқартады. Опция дұрыс жұмыс істеуі үшін бастау көзі сығуды қолдауы тиіс.

Опция {linkto(#cdn-content-settings-gzip-compression)[text=GZip сығуымен]}, {linkto(#cdn-content-settings-brotli-compression)[text=Brotli]} және {linkto(#cdn-content-settings-large-files-optimizing)[text=үлкен файлдарды жеткізуді оңтайландырумен]} бірге жұмыс істемейді.

CDN-ресурсы бастаудан сығылған контентті сұратуы үшін:

{tabs}

{tab(Жеке кабинет)}

{include(../../../../../_includes/_open-cdn.md)}

1. **Контент** қойындысына өтіңіз.
1. **Бастаудағы сығуды сұрату** опциясын қосыңыз.
1. **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{tab(API)}

{include(../../../../../_includes/_api_cdn_create_change.md)}

Сұрау денесінде `options` блогында `fetch_compressed` параметрлерін жазыңыз.

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

## {heading(Үлкен файлдарды жеткізуді оңтайландыру)[id=cdn-content-settings-large-files-optimizing]}

Жеткізуді оңтайландыру үшін үлкен файлдар бастау көзінен CDN-ресурсына беріліп, кэште тұтас күйде емес, 10 МБ-тан бөліктермен сақталады. CDN-ресурсы файлды пайдаланушыға ертерек бере бастайды, сондай-ақ файлды бір уақытта бірнеше пайдаланушыға бөліктермен бере алады.

Опция дұрыс жұмыс істеуі үшін бастау көзі HTTP Range request қолдауы тиіс. Егер ресурс үшін бастау топтары пайдаланылса, қолданылатын әрбір бастаудағы файлдарда бірдей Content-Length және ETag тақырыптары болуы тиіс.

Опция қосылғаннан немесе өшірілгеннен кейін кэштеу кілттері өзгереді, контент бастау көзінен қайтадан сұратылады.

{note:warn}

Бастауға түсетін жүктемені азайту үшін опцияны жүктеме ең аз болатын сағаттарда басқарыңыз және прекэш-сервер арқылы бастауды қорғау үшін [техникалық қолдауға](/kz/contacts) хабарласыңыз.

{/note}

Опция {linkto(#cdn-content-settings-gzip-compression)[text=GZip сығуымен]}, {linkto(#cdn-content-settings-brotli-compression)[text=Brotli]} және {linkto(#cdn-content-settings-source-compression)[text=бастаудағы сығумен]} бірге жұмыс істемейді.

Үлкен файлдарды жеткізуді оңтайландыруды қосу үшін:

{tabs}

{tab(Жеке кабинет)}

{include(../../../../../_includes/_open-cdn.md)}

1. **Контент** қойындысына өтіңіз.
1. **Үлкен файлдарды жеткізуді оңтайландыруды қосу** опциясын қосыңыз.
1. **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{tab(API)}

{include(../../../../../_includes/_api_cdn_create_change.md)}

Сұрау денесінде `options` блогында `slice` параметрлерін жазыңыз.

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
