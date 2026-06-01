*Хостинг статических сайтов* (static site hosting) — дополнительная опция для {linkto(../about#bucket)[text=бакета]} VK Object Storage, которая расширяет возможности доступа к статическому контенту. Без этой опции для получения содержания {linkto(../about#object)[text=объекта]} используется URL, соответствующий его {linkto(../about#object_key)[text=ключу]}. Хостинг статических сайтов позволяет комбинировать статический контент с правилами перенаправления, а также задавать индексную страницу (например, `index.html`) и страницу ошибки, возвращаемую при ошибках запроса (например, `404`).

Примеры использования:

- сайт-визитка,
- личный блог,
- лендинги,
- перенаправление запросов,
- документация.

Статический сайт на основе VK Object Storage может состоять из:

- статического контента: HTML, CSS, файлы медиа (изображения, аудио, видео), документы (PDF, TXT) и другие форматы, доступные для просмотра в браузере.
- файлов сценариев (скриптов) на JavaScript, не требующих серверной обработки: раскрывающиеся меню, табы, аккордеоны и др.

После {linkto(../../instructions/manage-static-site#setup)[text=установки]} конфигурации, cтатический сайт доступен по адресу:

```text
https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/<PREFIX>
```

Здесь:

- `<ИМЯ_БАКЕТА>` — имя бакета, для которого была установлена конфигурация статического сайта;
- `<ENDPOINT_HOSTNAME>` — имя хоста сервиса VK Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

   - `hb.vkcloud-storage.ru` или `hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

- `<PREFIX>` — префикс ключа объекта индексной страницы. Может быть пустым.

## {heading(JSON-конфигурация статического сайта)[id=config]}

Конфигурация предоставляется в формате JSON и используется при [управлении конфигурацией](../../instructions/manage-static-site) через AWS CLI.

Общая структура конфигурации:

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

### {heading(Параметры конфигурации индексной страницы)[id=indexdocument]}

`IndexDocument` — элемент конфигурации, который задает индексную страницу.

Совместимость `IndexDocument` с другими элементами конфигурации:

[cols="2,1,3", options="header"]
|===
|Элемент конфигурации
|Совместимость
|Функциональность

|`ErrorDocument`
|![](../../assets/check.svg "inline")
|{linkto(#errordocument)[text=Страница ошибки]}

|`RoutingRules`
|![](../../assets/check.svg "inline")
|{linkto(#routingrules)[text=Правила перенаправления]}

|`RedirectAllRequestsTo`
|![](../../assets/no.svg "inline")
|{linkto(#redirectallrequeststo)[text=Безусловное перенаправление]}
|===

Параметры `IndexDocument`:

[cols="1,5", options="header"]
|===
|Имя
|Описание

2+|`IndexDocument` — элемент формата `object`

|`Suffix`
|Суффикс (имя) для объекта индексной страницы.

Формат: `string`.

При открытии страницы сайта будет загружаться содержание объекта с указанным значением.

Не может содержать символ `/`.

Полный путь: `IndexDocument` → `Suffix`

|===

{cut(Как обрабатываются запросы индексной страницы)}

Например, ваша индексная страница — это объект с именем `index.html`. В зависимости от конструкции запрашиваемого URL, VK Object Storage по-разному обработает запрос.

- При обращении к домашней странице, например `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>` или `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/`, будет загружаться содержание объекта с ключом `index.html`.
- Если путь в URL заканчивается на `/`, будет загружаться содержание объекта с ключом `<СУФФИКС>index.html`. Например, при обращении по `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/images/photos/`, `<СУФФИКС>` имеет значение `images/photos/`. В итоге будет загружено содержимое объекта с ключом `images/photos/index.html`.
- Если путь в URL заканчивается не на `/`, сначала ссылка интерпретируется как запрос к конкретному объекту и VK Object Storage попытается вернуть его содержимое. Если такого объекта нет, будет выполнено перенаправление на путь с `/` в конце. Например, при обращении к `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/docs/billing` сначала будет запрошено содержимое объекта `docs/billing`. Если такого объекта нет, запрос будет перенаправлен на `https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/docs/billing/`.
- Если индексную страницу не удалось обнаружить или к ней нет доступа, будут возвращены HTTP коды ошибки `404` и `403` соответственно.

{/cut}

### {heading(Параметры конфигурации страницы ошибки)[id=errordocument]}

`ErrorDocument` — элемент конфигурации, который задает страницу ошибки. Используется вместе с элементом конфигурации `IndexDocument`, который задает {linkto(#indexdocument)[text=индексную страницу]}.

Например, при открытии несуществующей страницы возникнет ошибка `404`. Вместо несуществующей страницы загрузится содержание указанного объекта, например `errordoc/file.html`.

Совместимость `ErrorDocument` с другими элементами конфигурации:

[cols="2,1,3", options="header"]
|===
|Элемент конфигурации
|Совместимость
|Функциональность

|`IndexDocument`
(обязательный)
|![](../../assets/check.svg "inline")
|{linkto(#indexdocument)[text=Индексная страница]}

|`RoutingRules`
|![](../../assets/check.svg "inline")
|{linkto(#routingrules)[text=Правила перенаправления]}

|`RedirectAllRequestsTo`
|![](../../assets/no.svg "inline")
|{linkto(#redirectallrequeststo)[text=Безусловное перенаправление]}
|===

Параметры `ErrorDocument`:

[cols="1,5", options="header"]
|===
|Имя
|Описание

2+|`ErrorDocument` — элемент формата `object`.

|`Key`
|Полный ключ объекта страницы с ошибкой.

Формат: `string`.

При HTTP-ответе `4XX`, для которого в `RoutingRules` нет {linkto(#routingrules)[text=правила перенаправления]}, будет загружаться содержание из объекта с указанным ключом. Перенаправление не выполняется.

Полный путь: `ErrorDocument` → `Key`

|===

### {heading(Параметры конфигурации правил перенаправления)[id=routingrules]}

`RoutingRules` — элемент конфигурации, который задает правила перенаправления. Используется вместе с элементом конфигурации `IndexDocument`, который задает {linkto(#indexdocument)[text=индексную страницу]}.

{note:warn}
При составлении конфигурации следует избегать правил, способных образовать бесконечный цикл перенаправления. Например, после перенаправления по правилу `RoutingRules[1]` новый запрос удовлетворяет `Condition` из `RoutingRules[2]`, которое перенаправляет на изначальный адрес, который соответствует `Condition` из `RoutingRules[1]`.
{/note}

Совместимость `RoutingRules` с другими элементами конфигурации:

[cols="2,1,3", options="header"]
|===
|Элемент конфигурации
|Совместимость
|Функциональность

|`IndexDocument`
(обязательный)
|![](../../assets/check.svg "inline")
|{linkto(#indexdocument)[text=Индексная страница]}

|`ErrorDocument`
|![](../../assets/check.svg "inline")
|{linkto(#errordocument)[text=Страница ошибки]}

|`RedirectAllRequestsTo`
|![](../../assets/no.svg "inline")
|{linkto(#redirectallrequeststo)[text=Безусловное перенаправление]}
|===

Параметры `RoutingRules`:

[cols="3,8", options="header"]
|===
|Имя
|Описание

2+|`RoutingRules` — правила перенаправления в формате `array` (массив):
- Каждый элемент массива `RoutingRules[i]` — отдельное правило в формате `object`, в котором задаются условие `Condition` и параметры перенаправления `Redirect`.
- Правила применяются в том порядке, в котором они указаны в массиве `RoutingRules`.
- Если правило сработало, формируется новый запрос, к которому также применяются правила `RoutingRules`

|`Condition`
|Условия срабатывания правила в формате `object`.

Если не указано ни одного условия, перенаправление будет срабатывать для всех запросов. 

Полный путь: `RoutingRules[i]` → `Condition`

|`HttpErrorCodeReturnedEquals`
|Код ошибки в формате `4XX` или `5XX`, при котором срабатывает правило.

Если используется вместе с `KeyPrefixEquals`, правило сработает только при соблюдении обоих условий.

Формат: `string`.

При получении HTTP-ответа с указанным кодом ошибки срабатывает правило, указанное в `RoutingRules[i]` → `Redirect`.

Полный путь: `RoutingRules[i]` → `Condition` → `HttpErrorCodeReturnedEquals`

|`KeyPrefixEquals`
|Префикс ключа запрошенного объекта. Если указать полный ключ, правило будет применяться только к этому объекту.

Если используется вместе с `HttpErrorCodeReturnedEquals`, правило сработает только при соблюдении обоих условий.

Формат: `string`.

При открытии страницы с указанным ключом или префиксом срабатывает правило, указанное в `RoutingRules[i]` → `Redirect`.

Полный путь: `RoutingRules[i]` → `Condition` → `KeyPrefixEquals`

|`Redirect`
|Задает настройки перенаправления в формате `object`.

Полный путь: `RoutingRules[i]` → `Redirect`

|`HostName`
|Имя того хоста, на который будет выполнено перенаправление.

Формат: `string`.

Может использоваться совместно с другими параметрами `Redirect`.

Если значение не указано, имя хоста не будет изменено.

Полный путь: `RoutingRules[i]` → `Redirect` → `HostName`

|`HttpRedirectCode`
|HTTP-код в формате `3XX`, который будет возвращаться при перенаправлении.

Формат: `string`.

Если значение не указано, используется код ответа по умолчанию — `301`.

Может использоваться совместно с другими параметрами `Redirect`.

Полный путь: `RoutingRules[i]` → `Redirect` → `HttpRedirectCode`

|`Protocol`
|Указывается при необходимости изменить протокол.

Формат: `string`.

Возможные значения: `http`, `https`.

Может использоваться совместно с другими параметрами `Redirect`.

Полный путь: `RoutingRules[i]` → `Redirect` → `Protocol`

|`ReplaceKeyPrefixWith`
|Префикс ключа объекта, на который необходимо заменить префикс запрошенного объекта.

Формат: `string`.

При указании пустой строки новый запрос будет без префикса.

Обычно используется вместе с `RoutingRules[i]` → `Condition` → `KeyPrefixEquals` для перенаправления группы объектов с одного префикса на другой.

Может использоваться совместно с параметрами `HostName`, `HttpRedirectCode` и `Protocol`.

Несовместимо с параметром `ReplaceKeyWith`.

Полный путь: `RoutingRules[i]` → `Redirect` → `ReplaceKeyPrefixWith`

|`ReplaceKeyWith`
|Ключ объекта, на который нужно перенаправить.

Формат: `string`.

Может использоваться совместно с параметрами `HostName`, `HttpRedirectCode` и `Protocol`.

Несовместимо с параметром `ReplaceKeyPrefixWith`.

Полный путь: `RoutingRules[i]` → `Redirect` → `ReplaceKeyWith`

|===

### {heading(Параметры конфигурации безусловного перенаправления)[id=redirectallrequeststo]}

`RedirectAllRequestsTo` — элемент конфигурации, который задает безусловные правила перенаправления для всех запросов сайта.

{note:info}

Безусловное перенаправление может работать и с пустым бакетом.

{/note}

Совместимость `RedirectAllRequestsTo` с другими элементами конфигурации:

[cols="2,1,3", options="header"]
|===
|Элемент конфигурации
|Совместимость
|Функциональность

|`IndexDocument`
|![](../../assets/no.svg "inline")
|{linkto(#indexdocument)[text=Индексная страница]}

|`ErrorDocument`
|![](../../assets/no.svg "inline")
|{linkto(#errordocument)[text=Страница ошибки]}

|`RoutingRules`
|![](../../assets/no.svg "inline")
|{linkto(#routingrules)[text=Правила перенаправления]}
|===

Параметры `RedirectAllRequestsTo`:

[cols="1,5", options="header"]
|===
|Имя
|Описание

2+|`RedirectAllRequestsTo` — элемент формата `object`, задает безусловные правила перенаправления для всех запросов сайта

|`HostName`
|Имя того хоста, на который будет выполнено перенаправление. Обязательный параметр.

Формат: `string`.

Может использоваться совместно с `Protocol`.

Полный путь: `RedirectAllRequestsTo` → `HostName`

|`Protocol`
|Указывается при необходимости изменить протокол.

Формат: `string`.

Возможные значения: `http`, `https`.

Может использоваться совместно с `HostName`.

Полный путь: `RedirectAllRequestsTo` → `Protocol`

|===

## {heading(Примеры конфигураций)[id=examples]}

Некоторые параметры несовместимы друг с другом, поэтому число их комбинаций ограничено. 

- Только {linkto(#indexdocument)[text=индексная страница]} `IndexDocument`:

    ```json
    {
        "IndexDocument": {
        "Suffix": "index.html"
        }
    }
    ```

- {linkto(#indexdocument)[text=Индексная страница]} `IndexDocument` и {linkto(#errordocument)[text=страница ошибки]} `ErrorDocument`:

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

- {linkto(#indexdocument)[text=Индексная страница]} `IndexDocument` и {linkto(#routingrules)[text=правила перенаправления]} `RoutingRules`:

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

    В приведенном примере все запросы с префиксом `docs/` будут перенаправляться на `documents/` и возвращать HTTP-код ответа `301`.

- {linkto(#indexdocument)[text=Индексная страница]} `IndexDocument`, {linkto(#errordocument)[text=страница ошибки]} `ErrorDocument` и {linkto(#routingrules)[text=правила перенаправления]} `RoutingRules`:

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

    В приведенном примере при HTTP-ошибке `404` запрос перенаправляется на `index.html`, при других ошибках возвращается содержимое `error.html`.

- {linkto(#redirectallrequeststo)[text=Безусловное перенаправление]} `RedirectAllRequestsTo` для всех запросов: 

    ```json
    {
        "RedirectAllRequestsTo": {
        "HostName": "example.com",
        "Protocol": "https"
        }
    }
    ```

    В приведенном примере все запросы перенаправляются на `example.com` по протоколу `https`. В ответе всегда возвращается код `301`.
