{include(/kz/_includes/_translated_by_ai.md)}

## CDN-ресурстарда кэшттеуді баптау

Баптау CDN-ресурсының кэшінде контентті сақтау параметрлерін орнатуға мүмкіндік береді. Уақыт аяқталғанда, CDN-ресурс файлды көзде тексереді:

- Егер CDN-серверіндегі файлдың ETag-ы көздегі файлдың ETag-ымен сәйкес келсе, CDN-ресурс кэштелген файлды сақтауды және оны пайдаланушыларға беруді жалғастырады.
- Егер CDN-серверіндегі файлдың ETag-ы көздегі файлдың ETag-ымен сәйкес келмесе, CDN-ресурс жаңа файлды кэштейді.

CDN-ресурста кэшттеуді баптау үшін:

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_open-cdn.md)}

1. қойындысына өтіңіз **Кеширование**.
1. опциясын қосыңыз **Кеширование на CDN**.
1. Баптау нұсқасын таңдаңыз:

   {tabs}
   
   {tab(Настройка источника)}
      
      CDN-ресурс контентті көзде Cache-Control тақырыбында берілген уақыт бойы кэштейді.

      Егер көзде Cache-Control көрсетілмесе, әдепкі уақыт (4 күн) пайдаланылады. Бұл уақытты өзгерту үшін **Әдепкі кэш өмір сүру уақыты**. тізімінен мәнді таңдаңыз. Таңдалған мән 200, 201, 204, 206, 301, 302, 303, 304, 307, 308 кодтары бар жауаптар үшін қолданылады. Қалған кодтары бар жауаптар кэштелмейді.

   {/tab}
   
   {tab(Задать настройки)}
   
      CDN-ресурс контентті оның баптауларында берілген уақыт бойы кэштейді:

      1. Кэштің өмір сүру уақытын көрсетіңіз. Мән тек 200, 206, 301, 302 кодтары бар жауаптар үшін қолданылады. 4ХХ, 5ХХ кодтары бар жауаптар кэштелмейді.
      1. (Опционалды) Әртүрлі жауаптар үшін кэшттеу уақытын қосымша баптаңыз:

         1. батырмасын басыңыз **Ереже қосу**.
         1. Жауап кодын таңдаңыз. Барлық жауаптар үшін `any`.
         1. Осы жауап үшін кэшттеу уақытын таңдаңыз.

   {/tab}
   
   {/tabs}

1. батырмасын басыңыз **Өзгерістерді сақтау**.

{/tab}

{tab(API)}

{include(/kz/_includes/_api_cdn_create_change.md)}

Сұрау денесіндегі `options` параметрлерін көрсетіңіз `edge_cache_settings`.

Сұрау үлгісі:

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
        "edge_cache_settings": {
            "custom_values": {
                "100": "3600s",
                "404": "0s"
            },
            "enabled": true,
            "value": "345600s"
        }
    }
}'
```

Мысалда CDN-ресурсының кэшттеу баптаулары берілген:

- әдепкі бойынша контент 4 күнге кэштеледі;
- коды бар жауаптар үшін контент 1 сағатқа кэштеледі;
- коды бар жауаптар үшін контент кэштелмейді.

{/tab}

{/tabs}

## Браузерде кэшттеуді баптау

Баптау соңғы пайдаланушылардың браузерлерінің кэшінде контентті сақтау параметрлерін орнатуға мүмкіндік береді.

Пайдаланушы браузерінде кэшттеуді баптау үшін:

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_open-cdn.md)}

1. қойындысына өтіңіз **Кеширование**.
1. опциясын қосыңыз **Кеширование в браузере**.
1. Баптау нұсқасын таңдаңыз:

   {tabs}
   
   {tab(Настройка источника)}
      
      Пайдаланушының браузері контентті көзде Cache-Control тақырыбында берілген уақыт бойы кэштейді.

      Егер көзде Cache-Control көрсетілмесе, онда контент браузерде кэштелмейді.

   {/tab}
   
   {tab(Задать настройки)}
   
      Пайдаланушы браузерлері үшін кэшттеу баптаулары CDN-ресурсының баптауларында орнатылады.

      Кэштің өмір сүру уақытын көрсетіңіз. Егер көзде кэшттеу тақырыптары бапталмаған болса, мән 200, 201, 204, 206, 301, 302, 303, 304, 307, 308 кодтары бар жауаптар үшін қолданылады. Қалған кодтары бар жауаптар кэштелмейді.

   {/tab}

   {/tabs}

1. батырмасын басыңыз **Өзгерістерді сақтау**.

{/tab}

{tab(API)}

{include(/kz/_includes/_api_cdn_create_change.md)}

Сұрау денесіндегі `options` параметрлерін көрсетіңіз `browser_cache_settings`.

Пайдаланушы браузерінде көз бойынша кэшттеуді баптауға арналған сұрау үлгісі:

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
        "browser_cache_settings": {
            "enabled": true,
            "value": ""
        }
    }
}'
```

{/tab}

{/tabs}

## Кэшттеу кезінде Set-Cookie тақырыбын елемеу

Бірдей файлды алу үшін CDN-серверге жіберілетін сұрауларда файлға дейін бірдей жол болуы мүмкін, бірақ HTTP-тақырыбындағы `Set-Cookie`. мәндері әртүрлі болуы мүмкін. Әдепкі бойынша CDN-ресурс мұндай сұрауларды әртүрлі деп санайды және оларды көз серверіне қайта бағыттайды. Бұл деректерді беру жылдамдығын төмендетеді `Set-Cookie` тақырыбын елемеу CDN-ресурсқа көзге сұрау жібермей, өзінің кэшін пайдалануға мүмкіндік береді.

CDN-ресурс HTTP-сұрауларда `Set-Cookie` тақырыптарын елемеуі үшін:

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_open-cdn.md)}

1. қойындысына өтіңіз **Кеширование**.
1. опциясын қосыңыз **Set-Cookie елемеу**.
1. батырмасын басыңыз **Өзгерістерді сақтау**.

{/tab}

{tab(API)}

{include(/kz/_includes/_api_cdn_create_change.md)}

Сұрау денесіндегі `options` параметрлерін көрсетіңіз `ignore_cookie`.

Set-Cookie тақырыптарын елемеу баптаулары бар сұрау үлгісі:

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
        "ignore_cookie": {
            "enabled": true,
            "value": true
        }
    }
}'
```

{/tab}

{/tabs}

## Кэшттеу кезінде сұрау параметрлерін елемеу

Бірдей файлды алу үшін CDN-серверге жіберілетін сұрауларда файлға дейін бірдей жол болуы мүмкін, бірақ query-параметрлері әртүрлі болуы мүмкін. Әдепкі бойынша CDN-ресурс мұндай сұрауларды әртүрлі деп санайды және оларды көз серверіне қайта бағыттайды. Бұл деректерді беру жылдамдығын төмендетеді. Барлық немесе кейбір параметрлерді елемеу CDN-ресурсқа көзге сұрау жібермей, өзінің кэшін пайдалануға мүмкіндік береді.

CDN-ресурс HTTP-сұраулардағы параметрлерді елемеуі үшін:

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_open-cdn.md)}

1. қойындысына өтіңіз **Кеширование**.
1. опциясын қосыңыз **Игнорировать параметры запроса**.
1. Елемеу түрін таңдаңыз:

   - `Игнорировать все` — кез келген сұрау параметрлері бар файлдар бір объект ретінде кэштеледі.
   - `Игнорировать все, кроме` — көрсетілген параметрлері бар файлдар әртүрлі объектілер ретінде кэштеледі, басқа параметрлері бар файлдар — бір объект ретінде.
   - `Игнорировать только` — көрсетілген параметрлері бар файлдар бірдей объектілер ретінде кэштеледі, басқа параметрлері бар файлдар — әртүрлі.

1. және `Игнорировать все, кроме` және `Игнорировать только` түрлері үшін параметрлерді көрсетіңіз. Әр параметрді жаңа жолдан жазыңыз.
1. батырмасын басыңыз **Өзгерістерді сақтау**.

{/tab}

{tab(API)}

{include(/kz/_includes/_api_cdn_create_change.md)}

Сұрау денесіндегі `options` блогында келесі параметрлерді көрсетіңіз:

- барлық параметрлерді елемеу үшін — `ignoreQueryString` (`value`=`true`);
- көрсетілген параметрлерді елемеу үшін — `ignoreQueryString` (`value`=`false`), `query_params_blacklist`;
- көрсетілгендерден басқа барлық параметрлерді елемеу үшін — `ignoreQueryString` (`value`=`false`), `query_params_whitelist`.

{cut(Пример запроса для настройки CDN-ресурса на игнорирование всех query-параметров в HTTP-запросах)}

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
        "ignoreQueryString": {
            "enabled": true,
            "value": true
        }
    }
}'
```

{/cut}
{cut(Пример запроса для настройки CDN-ресурса на игнорирование указанных query-параметров в HTTP-запросах)}

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
        "ignoreQueryString": {
            "enabled": true,
            "value": false
        },
        "query_params_blacklist": {
                "enabled": true,
                "value": [
                    "color",
                    "type"
                ]
         }
    }
}'
```

{/cut}
{cut(Пример запроса для настройки CDN-ресурса на игнорирование всех query-параметров в HTTP-запросах, кроме указанных)}

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
        "ignoreQueryString": {
            "enabled": true,
            "value": false
        },
        "query_params_whitelist": {
                "enabled": true,
                "value": [
                    "color",
                    "type"
                ]
         }
    }
}'
```

{/cut}

{/tab}

{/tabs}
