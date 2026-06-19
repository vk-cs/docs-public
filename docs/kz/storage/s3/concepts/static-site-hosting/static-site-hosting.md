# {heading(Статикалық сайттарды хостингтеу)[id=s3-concepts-static-site-hosting]}

{include(/kz/_includes/_translated_by_ai.md)}

*Статикалық сайттарды хостингтеу* (static site hosting) — {linkto(../about#s3-concepts-about-bucket)[text={var(s3)} бакеті]} үшін статикалық контентке қолжетімділік мүмкіндіктерін кеңейтетін қосымша опция. Бұл опциясыз {linkto(../about#s3-concepts-about-object)[text=объектінің]} мазмұнын алу үшін оның {linkto(../about#s3-concepts-about-object-key)[text=кілтiне]} сәйкес келетін URL қолданылады. Статикалық сайттарды хостингтеу статикалық контентті қайта бағыттау ережелерімен біріктіруге, сондай-ақ индекс бетін (мысалы, `index.html`) және сұрау қателері кезінде қайтарылатын қате бетін (мысалы, `404`) орнатуға мүмкіндік береді.

Қолдану мысалдары:

- визитка-сайт,
- жеке блог,
- лендингтер,
- сұрауларды қайта бағыттау,
- құжаттама.

{var(s3)} негізіндегі статикалық сайт мыналардан тұруы мүмкін:

- статикалық контент: HTML, CSS, медиафайлдар (суреттер, аудио, видео), құжаттар (PDF, TXT) және браузерде қарауға қолжетімді басқа форматтар.
- серверлік өңдеуді қажет етпейтін JavaScript сценарий (скрипт) файлдары: ашылмалы мәзірлер, табтар, аккордеондар және т.б.

Конфигурация {linkto(../../instructions/manage-static-site#s3-instructions-manage-static-site-setup)[text=орнатылғаннан]} кейін статикалық сайт мына мекенжай бойынша қолжетімді болады:

```text
https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/<PREFIX>
```

{ifdef(s3,s3-pdf)}

{note:info}

Сілтеме форматы өзгеше болуы мүмкін. Нақтылау үшін әкімшіге жүгініңіз.

{/note}

{/ifdef}

Мұнда:

- `<ИМЯ_БАКЕТА>` — статикалық сайт конфигурациясы орнатылған бакеттің атауы;
{ifdef(public)}
- `<ENDPOINT_HOSTNAME>` — {var(s3)} сервисінің хост атауы, аккаунттың [өңіріне](/kz/tools-for-using-services/account/concepts/regions) сәйкес келуі тиіс:

  - `hb.vkcloud-storage.ru` немесе `hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
  - `hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_HOSTNAME>` — {var(s3)} инсталляцияңызда қолданылатын хост атауы.
  {/ifdef}
- `<PREFIX>` — индекс беті объектісі кілтінің префиксі. Бос болуы мүмкін.

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

### {heading(Индекс беті конфигурациясының параметрлері)[id=s3-concepts-static-site-hosting-indexdocument]}

`IndexDocument` — индекс бетін орнататын конфигурация элементі.

{ifdef(public)}
`IndexDocument` элементінің басқа конфигурация элементтерімен үйлесімділігі:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Кесте {counter(table)[id=static-site-config-parameters]} — IndexDocument элементінің басқа конфигурация элементтерімен үйлесімділігі)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}

[cols="2,1,3", options="header"]
|===
|Конфигурация элементі
|Үйлесімділік
|Функционалдылық

|`ErrorDocument`
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-errordocument)[text=Қате беті]}

|`RoutingRules`
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-routingrules)[text=Қайта бағыттау ережелері]}

|`RedirectAllRequestsTo`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-redirectallrequeststo)[text=Шартсыз қайта бағыттау]}
|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

{ifdef(public)}
`IndexDocument` параметрлері:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Кесте {counter(table)[id=static-site-config-parameters]} — IndexDocument параметрлері)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="1,5", options="header"]
|===
|Атауы
|Сипаттама

2+|`IndexDocument` — `object` форматындағы элемент

|`Suffix`
|Индекс беті объектісі үшін суффикс (атау).

Форматы: `string`.

Сайт бетін ашқанда көрсетілген мәні бар объектінің мазмұны жүктеледі.

`/` таңбасын қамтымауы тиіс.

Толық жолы: `IndexDocument` → `Suffix`

|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

{cut(Индекс беті сұраулары қалай өңделеді)}

Мысалы, сіздің индекс бетіңіз — `index.html` атауы бар объект{ifdef(s3,s3-pdf)}, ал инсталляцияңыздың URL-і `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>` форматында{/ifdef}. Сұралған URL құрылымына байланысты {var(s3)} сұрауды әртүрлі өңдейді.

- Басты бетке жүгінгенде, мысалы `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>` немесе `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/`, `index.html` кілті бар объектінің мазмұны жүктеледі.
- Егер URL-дегі жол `/` таңбасымен аяқталса, `<СУФФИКС>index.html` кілті бар объектінің мазмұны жүктеледі. Мысалы, `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/images/photos/` мекенжайына жүгінгенде `<СУФФИКС>` мәні `images/photos/` болады. Нәтижесінде `images/photos/index.html` кілті бар объектінің мазмұны жүктеледі.
- Егер URL-дегі жол `/` таңбасымен аяқталмаса, алдымен сілтеме нақты бір объектіге сұрау ретінде интерпретацияланады және {var(s3)} оның мазмұнын қайтаруға тырысады. Егер мұндай объект болмаса, соңында `/` бар жолға қайта бағыттау орындалады. Мысалы, `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/docs/billing` мекенжайына жүгінгенде алдымен `docs/billing` объектісінің мазмұны сұралады. Егер мұндай объект болмаса, сұрау `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/docs/billing/` мекенжайына қайта бағытталады.
- Егер индекс бетін табу мүмкін болмаса немесе оған қолжетімділік болмаса, сәйкесінше `404` және `403` HTTP қате кодтары қайтарылады.

{/cut}

### {heading(Қате беті конфигурациясының параметрлері)[id=s3-concepts-static-site-hosting-errordocument]}

`ErrorDocument` — қате бетін орнататын конфигурация элементі. {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=индекс бетін]} орнататын `IndexDocument` конфигурация элементімен бірге қолданылады.

Мысалы, жоқ бетті ашқанда `404` қатесі пайда болады. Жоқ беттің орнына көрсетілген объектінің мазмұны жүктеледі, мысалы `errordoc/file.html`.

{ifdef(public)}
`ErrorDocument` элементінің басқа конфигурация элементтерімен үйлесімділігі:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Кесте {counter(table)[id=static-site-config-parameters]} — ErrorDocument элементінің басқа конфигурация элементтерімен үйлесімділігі)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Конфигурация элементі
|Үйлесімділік
|Функционалдылық

|`IndexDocument`
(міндетті)
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Индекс беті]}

|`RoutingRules`
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-routingrules)[text=Қайта бағыттау ережелері]}

|`RedirectAllRequestsTo`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-redirectallrequeststo)[text=Шартсыз қайта бағыттау]}
|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

{ifdef(public)}
`ErrorDocument` параметрлері:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Кесте {counter(table)[id=static-site-config-parameters]} — ErrorDocument параметрлері)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="1,5", options="header"]
|===
|Атауы
|Сипаттама

2+|`ErrorDocument` — `object` форматындағы элемент.

|`Key`
|Қате беті объектісінің толық кілті.

Форматы: `string`.

`RoutingRules` ішінде {linkto(#s3-concepts-static-site-hosting-routingrules)[text=қайта бағыттау ережесі]} жоқ `4XX` HTTP-жауабы кезінде көрсетілген кілті бар объектіден мазмұн жүктеледі. Қайта бағыттау орындалмайды.

Толық жолы: `ErrorDocument` → `Key`

|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

### {heading(Қайта бағыттау ережелері конфигурациясының параметрлері)[id=s3-concepts-static-site-hosting-routingrules]}

`RoutingRules` — қайта бағыттау ережелерін орнататын конфигурация элементі. {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=индекс бетін]} орнататын `IndexDocument` конфигурация элементімен бірге қолданылады.

{note:warn}
Конфигурацияны құрастырғанда шексіз қайта бағыттау циклін тудыруы мүмкін ережелерден аулақ болыңыз. Мысалы, `RoutingRules[1]` ережесі бойынша қайта бағыттаудан кейінгі жаңа сұрау `RoutingRules[2]` ішіндегі `Condition` шартын қанағаттандырады, ол бастапқы мекенжайға қайта бағыттайды, ал ол өз кезегінде `RoutingRules[1]` ішіндегі `Condition` шартына сәйкес келеді.
{/note}

{ifdef(public)}
`RoutingRules` элементінің басқа конфигурация элементтерімен үйлесімділігі:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Кесте {counter(table)[id=static-site-config-parameters]} — RoutingRules элементінің басқа конфигурация элементтерімен үйлесімділігі)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Конфигурация элементі
|Үйлесімділік
|Функционалдылық

|`IndexDocument`
(міндетті)
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Индекс беті]}

|`ErrorDocument`
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-errordocument)[text=Қате беті]}

|`RedirectAllRequestsTo`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-redirectallrequeststo)[text=Шартсыз қайта бағыттау]}
|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

{ifdef(public)}
`RoutingRules` параметрлері:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Кесте {counter(table)[id=static-site-config-parameters]} — RoutingRules параметрлері)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="3,8", options="header"]
|===
|Атауы
|Сипаттама

2+|`RoutingRules` — `array` (массив) форматындағы қайта бағыттау ережелері:
- `RoutingRules[i]` массивінің әр элементі — `object` форматындағы жеке ереже, онда `Condition` шарты және `Redirect` қайта бағыттау параметрлері беріледі.
- Ережелер `RoutingRules` массивінде көрсетілген ретпен қолданылады.
- Ереже іске қосылса, жаңа сұрау қалыптасады, оған да `RoutingRules` ережелері қолданылады

|`Condition`
|`object` форматындағы ереженің іске қосылу шарттары.

Егер бірде-бір шарт көрсетілмесе, қайта бағыттау барлық сұраулар үшін іске қосылады. 

Толық жолы: `RoutingRules[i]` → `Condition`

|`HttpErrorCodeReturnedEquals`
|Ереже іске қосылатын `4XX` немесе `5XX` форматындағы қате коды.

`KeyPrefixEquals` параметрімен бірге қолданылса, ереже екі шарт та орындалғанда ғана іске қосылады.

Форматы: `string`.

Көрсетілген қате коды бар HTTP-жауап алынғанда, `RoutingRules[i]` → `Redirect` ішінде көрсетілген ереже іске қосылады.

Толық жолы: `RoutingRules[i]` → `Condition` → `HttpErrorCodeReturnedEquals`

|`KeyPrefixEquals`
|Сұралған объект кілтінің префиксі. Толық кілтті көрсетсеңіз, ереже тек осы объектіге қолданылады.

`HttpErrorCodeReturnedEquals` параметрімен бірге қолданылса, ереже екі шарт та орындалғанда ғана іске қосылады.

Форматы: `string`.

Көрсетілген кілті немесе префиксі бар бетті ашқанда, `RoutingRules[i]` → `Redirect` ішінде көрсетілген ереже іске қосылады.

Толық жолы: `RoutingRules[i]` → `Condition` → `KeyPrefixEquals`

|`Redirect`
|`object` форматында қайта бағыттау баптауларын орнатады.

Толық жолы: `RoutingRules[i]` → `Redirect`

|`HostName`
|Қайта бағыттау орындалатын хост атауы.

Форматы: `string`.

`Redirect` параметрлерінің басқаларымен бірге қолданылуы мүмкін.

Егер мәні көрсетілмесе, хост атауы өзгермейді.

Толық жолы: `RoutingRules[i]` → `Redirect` → `HostName`

|`HttpRedirectCode`
|Қайта бағыттау кезінде қайтарылатын `3XX` форматындағы HTTP-код.

Форматы: `string`.

Егер мәні көрсетілмесе, әдепкі жауап коды — `301` қолданылады.

`Redirect` параметрлерінің басқаларымен бірге қолданылуы мүмкін.

Толық жолы: `RoutingRules[i]` → `Redirect` → `HttpRedirectCode`

|`Protocol`
|Протоколды өзгерту қажет болғанда көрсетіледі.

Форматы: `string`.

Мүмкін мәндер: `http`, `https`.

`Redirect` параметрлерінің басқаларымен бірге қолданылуы мүмкін.

Толық жолы: `RoutingRules[i]` → `Redirect` → `Protocol`

|`ReplaceKeyPrefixWith`
|Сұралған объект префиксін ауыстыру қажет объект кілтінің префиксі.

Форматы: `string`.

Бос жол көрсетілсе, жаңа сұрау префикссіз болады.

Әдетте объектілер тобын бір префикстен екіншісіне қайта бағыттау үшін `RoutingRules[i]` → `Condition` → `KeyPrefixEquals` параметрімен бірге қолданылады.

`HostName`, `HttpRedirectCode` және `Protocol` параметрлерімен бірге қолданылуы мүмкін.

`ReplaceKeyWith` параметрімен үйлеспейді.

Толық жолы: `RoutingRules[i]` → `Redirect` → `ReplaceKeyPrefixWith`

|`ReplaceKeyWith`
|Қайта бағыттау қажет объект кілті.

Форматы: `string`.

`HostName`, `HttpRedirectCode` және `Protocol` параметрлерімен бірге қолданылуы мүмкін.

`ReplaceKeyPrefixWith` параметрімен үйлеспейді.

Толық жолы: `RoutingRules[i]` → `Redirect` → `ReplaceKeyWith`

|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

### {heading(Шартсыз қайта бағыттау конфигурациясының параметрлері)[id=s3-concepts-static-site-hosting-redirectallrequeststo]}

`RedirectAllRequestsTo` — сайттың барлық сұраулары үшін шартсыз қайта бағыттау ережелерін орнататын конфигурация элементі.

{note:info}

Шартсыз қайта бағыттау бос бакетпен де жұмыс істей алады.

{/note}

{ifdef(public)}
`RedirectAllRequestsTo` элементінің басқа конфигурация элементтерімен үйлесімділігі:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Кесте {counter(table)[id=static-site-config-parameters]} — RedirectAllRequestsTo элементінің басқа конфигурация элементтерімен үйлесімділігі)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Конфигурация элементі
|Үйлесімділік
|Функционалдылық

|`IndexDocument`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Индекс беті]}

|`ErrorDocument`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-errordocument)[text=Қате беті]}

|`RoutingRules`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-routingrules)[text=Қайта бағыттау ережелері]}
|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

{ifdef(public)}
`RedirectAllRequestsTo` параметрлері:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Кесте {counter(table)[id=static-site-config-parameters]} — RedirectAllRequestsTo параметрлері)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="1,5", options="header"]
|===
|Атауы
|Сипаттама

2+|`RedirectAllRequestsTo` — `object` форматындағы элемент, сайттың барлық сұраулары үшін шартсыз қайта бағыттау ережелерін орнатады

|`HostName`
|Қайта бағыттау орындалатын хост атауы. Міндетті параметр.

Форматы: `string`.

`Protocol` параметрімен бірге қолданылуы мүмкін.

Толық жолы: `RedirectAllRequestsTo` → `HostName`

|`Protocol`
|Протоколды өзгерту қажет болғанда көрсетіледі.

Форматы: `string`.

Мүмкін мәндер: `http`, `https`.

`HostName` параметрімен бірге қолданылуы мүмкін.

Толық жолы: `RedirectAllRequestsTo` → `Protocol`

|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

## {heading(Конфигурация мысалдары)[id=s3-concepts-static-site-hosting-examples]}

Кейбір параметрлер бір-бірімен үйлеспейді, сондықтан олардың комбинацияларының саны шектеулі. 

- Тек {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=индекс беті]} `IndexDocument`:

    ```json
    {
        "IndexDocument": {
        "Suffix": "index.html"
        }
    }
    ```

- {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Индекс беті]} `IndexDocument` және {linkto(#s3-concepts-static-site-hosting-errordocument)[text=қате беті]} `ErrorDocument`:

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

- {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Индекс беті]} `IndexDocument` және {linkto(#s3-concepts-static-site-hosting-routingrules)[text=қайта бағыттау ережелері]} `RoutingRules`:

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

    Келтірілген мысалда `docs/` префиксі бар барлық сұраулар `documents/` мекенжайына қайта бағытталып, `301` HTTP жауап кодын қайтарады.

- {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Индекс беті]} `IndexDocument`, {linkto(#s3-concepts-static-site-hosting-errordocument)[text=қате беті]} `ErrorDocument` және {linkto(#s3-concepts-static-site-hosting-routingrules)[text=қайта бағыттау ережелері]} `RoutingRules`:

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

    Келтірілген мысалда `404` HTTP-қатесі кезінде сұрау `index.html` мекенжайына қайта бағытталады, ал басқа қателер кезінде `error.html` мазмұны қайтарылады.

- {linkto(#s3-concepts-static-site-hosting-redirectallrequeststo)[text=Шартсыз қайта бағыттау]} `RedirectAllRequestsTo` барлық сұраулар үшін: 

    ```json
    {
        "RedirectAllRequestsTo": {
        "HostName": "example.com",
        "Protocol": "https"
        }
    }
    ```

    Келтірілген мысалда барлық сұраулар `https` протоколы бойынша `example.com` мекенжайына қайта бағытталады. Жауапта әрқашан `301` коды қайтарылады.
