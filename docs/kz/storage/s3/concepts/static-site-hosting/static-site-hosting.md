# {heading(Статикалық сайттарды хостингтеу)[id=s3-concepts-static-site-hosting]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

*Статикалық сайттарды хостингтеу* (static site hosting) — {var(s3)} {linkto(../about#s3-concepts-about-bucket)[text=бакетінің]} статикалық контентке қолжетімділік мүмкіндіктерін кеңейтетін қосымша опция. Бұл опция болмаған жағдайда {linkto(../about#s3-concepts-about-object)[text=объектінің]} мазмұнын алу үшін оның {linkto(../about#s3-concepts-about-object-key)[text=кілтіне]} сәйкес URL қолданылады. Статикалық сайттарды хостингтеу статикалық контентті бағыттау ережелерімен үйлестіруге, сондай-ақ индекстік бетті (мысалы, `index.html`) және сұрау қатесі кезінде қайтарылатын қате бетін (мысалы, `404`) көрсетуге мүмкіндік береді.

Қолдану мысалдары:

- визитка-сайт,
- жеке блог,
- лендингтер,
- сұрауларды бағыттау,
- құжаттама.

{var(s3)} негізіндегі статикалық сайт келесіден тұруы мүмкін:

- статикалық контенттен: HTML, CSS, медиа файлдары (суреттер, аудио, видео), құжаттар (PDF, TXT) және браузерде көруге қолжетімді басқа да форматтар.
- серверлік өңдеуді қажет етпейтін JavaScript сценарий (скрипт) файлдарынан: ашылатын мәзірлер, табтар, аккордеондар т.б.

{linkto(../../instructions/manage-static-site#s3-instructions-manage-static-site-setup)[text=Орнатудан]} кейін статикалық сайт мына мекенжай бойынша қолжетімді:

```text
https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/<PREFIX>
```

{ifdef(s3,s3-pdf)}

{note:info}

Сілтеме форматы өзгеше болуы мүмкін. Нақтылау үшін әкімшіге хабарласыңыз.

{/note}

{/ifdef}

Мұнда:

- `<ИМЯ_БАКЕТА>` — статикалық сайт конфигурациясы орнатылған бакеттің атауы;
{ifdef(public)}
- `<ENDPOINT_HOSTNAME>` — {var(s3)} қызметінің хост атауы, аккаунттің [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

  - `hb.vkcloud-storage.ru` немесе `hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
  - `hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_HOSTNAME>` — сіздің {var(s3)} инсталляциясыңызда қолданылатын хост атауы.
  {/ifdef}
- `<PREFIX>` — индекстік бет объектісінің кілт префиксі. Бос болуы мүмкін.

## {heading(Статикалық сайттың JSON-конфигурациясы)[id=s3-concepts-static-site-hosting-config]}

Конфигурация JSON форматында беріледі және AWS CLI арқылы {linkto(../../instructions/manage-static-site#s3-instructions-manage-static-site)[text=конфигурацияны басқару]} кезінде қолданылады.

Конфигурацияның жалпы құрылымы:

```json
{
   "IndexDocument": {           // Индексная страница
      "Suffix": "string"
   },
   "ErrorDocument": {           // Страница ошибки
      "Key": "string"
   },
   "RoutingRules": [            // Правила перенаправления
      {
          "Condition": {
              "HttpErrorCodeReturnedEquals": "string",
         "KeyPrefixEquals": "string"
         },
         "Redirect": {
             "HostName": "string",
         "HttpRedirectCode": "string",
         "Protocol": "http"|"https",
         "ReplaceKeyPrefixWith": "string",
         "ReplaceKeyWith": "string"
         }
      }
   ...
   ],
    "RedirectAllRequestsTo": {   // Безусловное перенаправление всех запросов
    "HostName": "string",
    "Protocol": "http"|"https"
    }
}
```

### {heading(Индексік бет конфигурациясының параметрлері)[id=s3-concepts-static-site-hosting-indexdocument]}

`IndexDocument` — индекстік бетті анықтайтын конфигурация элементі.

{ifdef(public)}
`IndexDocument` конфигурацияның басқа элементтерімен үйлесімділігі:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Таблица {counter(table)[id=static-site-config-parameters]} — Совместимость IndexDocument с другими элементами конфигурации)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}

[cols="2,1,3", options="header"]
|===
|Конфигурация элементі
|Үйлесімділік
|Функционалдық

|`ErrorDocument`
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-errordocument)[text=Қате беті]}

|`RoutingRules`
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-routingrules)[text=Бағыттау ережелері]}

|`RedirectAllRequestsTo`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-redirectallrequeststo)[text=Шартсыз бағыттау]}
|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

{ifdef(public)}
`IndexDocument` параметрлері:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Таблица {counter(table)[id=static-site-config-parameters]} — Параметры IndexDocument)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="1,5", options="header"]
|===
|Атауы
|Сипаттамасы

2+|`IndexDocument` — `object` форматындағы элемент

|`Suffix`
|Индексік бет объектісінің суффиксі (атауы).

Формат: `string`.

Сайт беті ашылғанда көрсетілген мәні бар объектінің мазмұны жүктеледі.

Ішінде `/` таңбасы болмауы тиіс.

Толық жол: `IndexDocument` → `Suffix`

|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

{cut(Индексік бет сұраулары қалай өңделеді)}

Мысалы, сіздің индекстік бетіңіз — `index.html` атаулы объект{ifdef(s3,s3-pdf)}, ал сіздің инсталляцияңыздың URL форматы `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>` түрінде{/ifdef}. Сұралған URL құрылымына қарай {var(s3)} сұрауды әртүрлі өңдейді.

- Басты бетке өту кезінде, мысалы `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>` немесе `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/`, `index.html` кілті бар объектінің мазмұны жүктеледі.
- URL-дегі жол `/` таңбасымен аяқталса, `<СУФФИКС>index.html` кілті бар объектінің мазмұны жүктеледі. Мысалы, `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/images/photos/` мекенжайына өту кезінде `<СУФФИКС>` мәні `images/photos/` болады. Нәтижесінде `images/photos/index.html` кілті бар объектінің мазмұны жүктеледі.
- URL-дегі жол `/` таңбасымен аяқталмаса, алдымен сілтеме нақты бір объектіге жасалған сұрау ретінде түсіндіріледі және {var(s3)} оның мазмұнын қайтаруға тырысады. Мұндай объект болмаса, соңында `/` бар жолға бағыттау орындалады. Мысалы, `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/docs/billing` мекенжайына өту кезінде алдымен `docs/billing` объектісінің мазмұны сұралады. Мұндай объект болмаса, сұрау `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/docs/billing/` мекенжайына бағытталады.
- Индекстік бет табылмаса немесе оған қолжетімдік болмаса, сәйкесінше `404` және `403` HTTP қате кодтары қайтарылады.

{/cut}

### {heading(Қате беті конфигурациясының параметрлері)[id=s3-concepts-static-site-hosting-errordocument]}

`ErrorDocument` — қате бетін анықтайтын конфигурация элементі. {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Индексік бетті]} анықтайтын `IndexDocument` конфигурация элементімен бірге қолданылады.

Мысалы, жоқ бет ашылғанда `404` қатесі пайда болады. Жоқ беттің орнына көрсетілген объектінің мазмұны, мысалы `errordoc/file.html`, жүктеледі.

{ifdef(public)}
`ErrorDocument` конфигурацияның басқа элементтерімен үйлесімділігі:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Таблица {counter(table)[id=static-site-config-parameters]} — Совместимость ErrorDocument с другими элементами конфигурации)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Конфигурация элементі
|Үйлесімділік
|Функционалдық

|`IndexDocument`
(міндетті)
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Индексік бет]}

|`RoutingRules`
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-routingrules)[text=Бағыттау ережелері]}

|`RedirectAllRequestsTo`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-redirectallrequeststo)[text=Шартсыз бағыттау]}
|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

{ifdef(public)}
`ErrorDocument` параметрлері:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Таблица {counter(table)[id=static-site-config-parameters]} — Параметры ErrorDocument)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="1,5", options="header"]
|===
|Атауы
|Сипаттамасы

2+|`ErrorDocument` — `object` форматындағы элемент.

|`Key`
|Қате бар бет объектісінің толық кілті.

Формат: `string`.

`RoutingRules` ішінде {linkto(#s3-concepts-static-site-hosting-routingrules)[text=бағыттау ережесі]} жоқ `4XX` HTTP-жауабы кезінде көрсетілген кілті бар объектіден мазмұн жүктеледі. Бағыттау орындалмайды.

Толық жол: `ErrorDocument` → `Key`

|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

### {heading(Бағыттау ережелері конфигурациясының параметрлері)[id=s3-concepts-static-site-hosting-routingrules]}

`RoutingRules` — бағыттау ережелерін анықтайтын конфигурация элементі. {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Индексік бетті]} анықтайтын `IndexDocument` конфигурация элементімен бірге қолданылады.

{note:warn}
Конфигурацияны құрастырғанда шексіз бағыттау циклін түзуі мүмкін ережелерден аулақ болыңыз. Мысалы, `RoutingRules[1]` ережесі бойынша бағыттаудан кейін жаңа сұрау `RoutingRules[2]` ішіндегі `Condition` шартына сәйкес келеді, ол бастапқы мекенжайға бағыттайды, ал ол `RoutingRules[1]` ішіндегі `Condition` шартына сәйкес келеді.
{/note}

{ifdef(public)}
`RoutingRules` конфигурацияның басқа элементтерімен үйлесімділігі:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Таблица {counter(table)[id=static-site-config-parameters]} — Совместимость RoutingRules с другими элементами конфигурации)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Конфигурация элементі
|Үйлесімділік
|Функционалдық

|`IndexDocument`
(міндетті)
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Индексік бет]}

|`ErrorDocument`
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-errordocument)[text=Қате беті]}

|`RedirectAllRequestsTo`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-redirectallrequeststo)[text=Шартсыз бағыттау]}
|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

{ifdef(public)}
`RoutingRules` параметрлері:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Таблица {counter(table)[id=static-site-config-parameters]} — Параметры RoutingRules)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="3,8", options="header"]
|===
|Атауы
|Сипаттамасы

2+|`RoutingRules` — `array` (массив) форматындағы бағыттау ережелері:
- `RoutingRules[i]` массивінің әрбір элементі — `object` форматындағы жеке ереже, онда `Condition` шарты және `Redirect` бағыттау параметрлері анықталады.
- Ережелер `RoutingRules` массивінде көрсетілген ретпен қолданылады.
- Ереже жұмыс істесе, жаңа сұрау қалыптасады, оған да `RoutingRules` ережелері қолданылады

|`Condition`
|`object` форматындағы ереженің іске қосылу шарттары.

Бірде-бір шарт көрсетілмесе, бағыттау барлық сұраулар үшін іске қеседі.

Толық жол: `RoutingRules[i]` → `Condition`

|`HttpErrorCodeReturnedEquals`
|Ереже іске қысатын `4XX` немесе `5XX` форматындағы қате коды.

`KeyPrefixEquals` пен бірге қолданылса, ереже екі шарт да сақталғанда ғана іске қеседі.

Формат: `string`.

Көрсетілген қате коды бар HTTP-жауабы алынғанда `RoutingRules[i]` → `Redirect` ішінде көрсетілген ереже іске қеседі.

Толық жол: `RoutingRules[i]` → `Condition` → `HttpErrorCodeReturnedEquals`

|`KeyPrefixEquals`
|Сұралған объектінің кілт префиксі. Толық кілт көрсетілсе, ереже осы объектіге ғана қолданылады.

`HttpErrorCodeReturnedEquals` пен бірге қолданылса, ереже екі шарт да сақталғанда ғана іске қеседі.

Формат: `string`.

Көрсетілген кілті немесе префиксі бар бет ашылғанда `RoutingRules[i]` → `Redirect` ішінде көрсетілген ереже іске қеседі.

Толық жол: `RoutingRules[i]` → `Condition` → `KeyPrefixEquals`

|`Redirect`
|`object` форматында бағыттау параметрлерін анықтайды.

Толық жол: `RoutingRules[i]` → `Redirect`

|`HostName`
|Бағыттау орындалатын хосттың атауы.

Формат: `string`.

`Redirect` параметрлерінің басқаларымен бірге қолданылуы мүмкін.

Мәні көрсетілмесе, хост атауы өзгертілмейді.

Толық жол: `RoutingRules[i]` → `Redirect` → `HostName`

|`HttpRedirectCode`
|Бағыттау кезінде қайтарылатын `3XX` форматындағы HTTP-код.

Формат: `string`.

Мәні көрсетілмесе, әдепкі жауап коды — `301` қолданылады.

`Redirect` параметрлерінің басқаларымен бірге қолданылуы мүмкін.

Толық жол: `RoutingRules[i]` → `Redirect` → `HttpRedirectCode`

|`Protocol`
|Протоколды өзгерту қажет болғанда көрсетіледі.

Формат: `string`.

Мүмкін мәндері: `http`, `https`.

`Redirect` параметрлерінің басқаларымен бірге қолданылуы мүмкін.

Толық жол: `RoutingRules[i]` → `Redirect` → `Protocol`

|`ReplaceKeyPrefixWith`
|Сұралған объектінің префиксі ауыстырылатын объектінің кілт префиксі.

Формат: `string`.

Бос жол көрсетілсе, жаңа сұрау префикссіз болады.

Әдетте бір префикстен екіншісіне объектілер тобын бағыттау үшін `RoutingRules[i]` → `Condition` → `KeyPrefixEquals` ішімен бірге қолданылады.

`HostName`, `HttpRedirectCode` және `Protocol` параметрлерімен бірге қолданылуы мүмкін.

`ReplaceKeyWith` параметрімен үйлесімді емес.

Толық жол: `RoutingRules[i]` → `Redirect` → `ReplaceKeyPrefixWith`

|`ReplaceKeyWith`
|Бағыттау қажет объектінің кілті.

Формат: `string`.

`HostName`, `HttpRedirectCode` және `Protocol` параметрлерімен бірге қолданылуы мүмкін.

`ReplaceKeyPrefixWith` параметрімен үйлесімді емес.

Толық жол: `RoutingRules[i]` → `Redirect` → `ReplaceKeyWith`

|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

### {heading(Шартсыз бағыттау конфигурациясының параметрлері)[id=s3-concepts-static-site-hosting-redirectallrequeststo]}

`RedirectAllRequestsTo` — сайттың барлық сұраулары үшін шартсыз бағыттау ережелерін анықтайтын конфигурация элементі.

{note:info}

Шартсыз бағыттау бос бакетпен де жұмыс істей алады.

{/note}

{ifdef(public)}
`RedirectAllRequestsTo` конфигурацияның басқа элементтерімен үйлесімділігі:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Таблица {counter(table)[id=static-site-config-parameters]} — Совместимость RedirectAllRequestsTo с другими элементами конфигурации)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Конфигурация элементі
|Үйлесімділік
|Функционалдық

|`IndexDocument`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Индексік бет]}

|`ErrorDocument`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-errordocument)[text=Қате беті]}

|`RoutingRules`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-routingrules)[text=Бағыттау ережелері]}
|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

{ifdef(public)}
`RedirectAllRequestsTo` параметрлері:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Таблица {counter(table)[id=static-site-config-parameters]} — Параметры RedirectAllRequestsTo)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="1,5", options="header"]
|===
|Атауы
|Сипаттамасы

2+|`RedirectAllRequestsTo` — `object` форматындағы элемент, сайттың барлық сұраулары үшін шартсыз бағыттау ережелерін анықтайды

|`HostName`
|Бағыттау орындалатын хосттың атауы. Міндетті параметр.

Формат: `string`.

`Protocol` ішімен бірге қолданылуы мүмкін.

Толық жол: `RedirectAllRequestsTo` → `HostName`

|`Protocol`
|Протоколды өзгерту қажет болғанда көрсетіледі.

Формат: `string`.

Мүмкін мәндері: `http`, `https`.

`HostName` ішімен бірге қолданылуы мүмкін.

Толық жол: `RedirectAllRequestsTo` → `Protocol`

|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

## {heading(Конфигурациялар мысалдары)[id=s3-concepts-static-site-hosting-examples]}

Кейбір параметрлер бір-бірімен үйлесімді емес, сондықтан олардың тіркесімдер саны шектеулі.

- Тек {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=индекстік бет]} `IndexDocument`:

    ```json
    {
        "IndexDocument": {
        "Suffix": "index.html"
        }
    }
    ```

- {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Индексік бет]} `IndexDocument` және {linkto(#s3-concepts-static-site-hosting-errordocument)[text=қате беті]} `ErrorDocument`:

    ```json
    {
        "IndexDocument": {
        "Suffix": "index.html"
        },
        "ErrorDocument": {
        "Key": "error.html"
        }
    }
    ```

- {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Индексік бет]} `IndexDocument` және {linkto(#s3-concepts-static-site-hosting-routingrules)[text=бағыттау ережелері]} `RoutingRules`:

    ```json
    {
        "IndexDocument": {
        "Suffix": "index.html"
        },
        "RoutingRules": [
        {
            "Condition": {
            "KeyPrefixEquals": "docs/"
            },
            "Redirect": {
            "ReplaceKeyPrefixWith": "documents/",
            "HttpRedirectCode": "301"
            }
        }
        ]
    }
    ```

    Келтірілген мысалда `docs/` префиксі бар барлық сұраулар `documents/` мекенжайына бағытталады және `301` HTTP жауап коды қайтарылады.

- {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Индексік бет]} `IndexDocument`, {linkto(#s3-concepts-static-site-hosting-errordocument)[text=қате беті]} `ErrorDocument` және {linkto(#s3-concepts-static-site-hosting-routingrules)[text=бағыттау ережелері]} `RoutingRules`:

    ```json
    {
        "IndexDocument": {
        "Suffix": "index.html"
        },
        "ErrorDocument": {
        "Key": "error.html"
        },
        "RoutingRules": [
        {
            "Condition": {
            "HttpErrorCodeReturnedEquals": "404"
            },
            "Redirect": {
            "ReplaceKeyWith": "index.html",
            "HttpRedirectCode": "302"
            }
        }
        ]
    }
    ```

    Келтірілген мысалда `404` HTTP қатесі кезінде сұрау `index.html` мекенжайына бағытталады, өзге қателер кезінде `error.html` мазмұны қайтарылады.

- Барлық сұраулар үшін {linkto(#s3-concepts-static-site-hosting-redirectallrequeststo)[text=шартсыз бағыттау]} `RedirectAllRequestsTo`:

    ```json
    {
        "RedirectAllRequestsTo": {
        "HostName": "example.com",
        "Protocol": "https"
        }
    }
    ```

    Келтірілген мысалда барлық сұраулар `https` протоколы бойынша `example.com` мекенжайына бағытталады. Жауабында әрқашан `301` коды қайтарылады.