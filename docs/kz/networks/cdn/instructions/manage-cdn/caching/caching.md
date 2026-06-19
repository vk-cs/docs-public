# {heading(Кэшттеу)[id=cdn-caching]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(CDN-ресурстарда кэшттеуді баптау)[id=cdn-caching-cdn-resource]}

Баптау CDN-ресурсының кэшінде контентті сақтау параметрлерін орнатуға мүмкіндік береді. Уақыт аяқталғанда, CDN-ресурс файлды көзде тексереді:

- Егер CDN-серверіндегі файлдың ETag-ы көздегі файлдың ETag-ымен сәйкес келсе, CDN-ресурс кэштелген файлды сақтауды және оны пайдаланушыларға беруді жалғастырады.
- Егер CDN-серверіндегі файлдың ETag-ы көздегі файлдың ETag-ымен сәйкес келмесе, CDN-ресурс жаңа файлды кэштейді.

CDN-ресурста кэшттеуді баптау үшін:

{tabs}

{tab(Жеке кабинет)}

{include(../../../../../_includes/_open-cdn.md)}

1. **Кэшттеу** қойындысына өтіңіз.
1. **CDN-де кэшттеу** опциясын қосыңыз.
1. Баптау нұсқасын таңдаңыз:

   {tabs}

   {tab(Настройка источника)}

      CDN-ресурс контентті көзде Cache-Control тақырыбында берілген уақыт бойы кэштейді.

      Егер көзде Cache-Control көрсетілмесе, әдепкі уақыт (4 күн) пайдаланылады. Бұл уақытты өзгерту үшін **Әдепкі кэш өмір сүру уақыты** тізімінен мәнді таңдаңыз. Таңдалған мән 200, 201, 204, 206, 301, 302, 303, 304, 307, 308 кодтары бар жауаптар үшін қолданылады. Қалған кодтары бар жауаптар кэштелмейді.

   {/tab}

   {tab(Задать настройки)}

      CDN-ресурс контентті оның баптауларында берілген уақыт бойы кэштейді:

      1. Кэштің өмір сүру уақытын көрсетіңіз. Мән тек 200, 206, 301, 302 кодтары бар жауаптар үшін қолданылады. 4ХХ, 5ХХ кодтары бар жауаптар кэштелмейді.
      1. (Опционалды) Әртүрлі жауаптар үшін кэшттеу уақытын қосымша баптаңыз:

         1. **Ереже қосу** батырмасын басыңыз.
         1. Жауап кодын таңдаңыз. Барлық жауаптар үшін `any` мәнін таңдаңыз.
         1. Осы жауап үшін кэшттеу уақытын таңдаңыз.

   {/tab}

   {/tabs}

1. **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{tab(API)}

{include(../../../../../_includes/_api_cdn_create_change.md)}

Сұрау денесіндегі `options` блогында `edge_cache_settings` параметрлерін көрсетіңіз.

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
- 100 коды бар жауаптар үшін контент 1 сағатқа кэштеледі;
- 404 коды бар жауаптар үшін контент кэштелмейді.

{/tab}

{/tabs}

## {heading(Браузерде кэшттеуді баптау)[id=cdn-caching-browser]}

Баптау соңғы пайдаланушылардың браузерлерінің кэшінде контентті сақтау параметрлерін орнатуға мүмкіндік береді.

Пайдаланушы браузерінде кэшттеуді баптау үшін:

{tabs}

{tab(Жеке кабинет)}

{include(../../../../../_includes/_open-cdn.md)}

1. **Кэшттеу** қойындысына өтіңіз.
1. **Браузерде кэшттеу** опциясын қосыңыз.
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

1. **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{tab(API)}

{include(../../../../../_includes/_api_cdn_create_change.md)}

Сұрау денесіндегі `options` блогында `browser_cache_settings` параметрлерін көрсетіңіз.

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

## {heading(Кэшттеу кезінде Set-Cookie тақырыбын елемеу)[id=cdn-caching-ignore-set-cookie]}

Бірдей файлды алу үшін CDN-серверге жіберілетін сұрауларда файлға дейін бірдей жол болуы мүмкін, бірақ HTTP-тақырыбындағы `Set-Cookie` мәндері әртүрлі болуы мүмкін. Әдепкі бойынша CDN-ресурс мұндай сұрауларды әртүрлі деп санайды және оларды көз серверіне қайта бағыттайды. Бұл деректерді беру жылдамдығын төмендетеді. `Set-Cookie` тақырыбын елемеу CDN-ресурсқа көзге сұрау жібермей, өзінің кэшін пайдалануға мүмкіндік береді.

CDN-ресурс HTTP-сұрауларда `Set-Cookie` тақырыптарын елемеуі үшін:

{tabs}

{tab(Жеке кабинет)}

{include(../../../../../_includes/_open-cdn.md)}

1. **Кэшттеу** қойындысына өтіңіз.
1. **Set-Cookie елемеу** опциясын қосыңыз.
1. **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{tab(API)}

{include(../../../../../_includes/_api_cdn_create_change.md)}

Сұрау денесіндегі `options` блогында `ignore_cookie` параметрлерін көрсетіңіз.

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

## {heading(Кэшттеу кезінде сұрау параметрлерін елемеу)[id=cdn-caching-ignore-parameters]}

Бірдей файлды алу үшін CDN-серверге жіберілетін сұрауларда файлға дейін бірдей жол болуы мүмкін, бірақ query-параметрлері әртүрлі болуы мүмкін. Әдепкі бойынша CDN-ресурс мұндай сұрауларды әртүрлі деп санайды және оларды көз серверіне қайта бағыттайды. Бұл деректерді беру жылдамдығын төмендетеді. Барлық немесе кейбір параметрлерді елемеу CDN-ресурсқа көзге сұрау жібермей, өзінің кэшін пайдалануға мүмкіндік береді.

CDN-ресурс HTTP-сұраулардағы параметрлерді елемеуі үшін:

{tabs}

{tab(Жеке кабинет)}

{include(../../../../../_includes/_open-cdn.md)}

1. **Кэшттеу** қойындысына өтіңіз.
1. **Сұрау параметрлерін елемеу** опциясын қосыңыз.
1. Елемеу түрін таңдаңыз:

   - **Барлығын елемеу** — кез келген сұрау параметрлері бар файлдар бір объект ретінде кэштеледі.
   - **Мыналардан басқасының бәрін елемеу** — көрсетілген параметрлері бар файлдар әртүрлі объектілер ретінде кэштеледі, басқа параметрлері бар файлдар — бір объект ретінде.
   - **Тек мыналарды елемеу** — көрсетілген параметрлері бар файлдар бірдей объектілер ретінде кэштеледі, басқа параметрлері бар файлдар — әртүрлі.

1. **Мыналардан басқасының бәрін елемеу** және **Тек мыналарды елемеу** түрлері үшін параметрлерді көрсетіңіз. Әр параметрді жаңа жолдан жазыңыз.
1. **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{tab(API)}

{include(../../../../../_includes/_api_cdn_create_change.md)}

Сұрау денесіндегі `options` блогында келесі параметрлерді көрсетіңіз:

- барлық параметрлерді елемеу үшін — `ignoreQueryString` (`value`=`true`);
- көрсетілген параметрлерді елемеу үшін — `ignoreQueryString` (`value`=`false`), `query_params_blacklist`;
- көрсетілгендерден басқа барлық параметрлерді елемеу үшін — `ignoreQueryString` (`value`=`false`), `query_params_whitelist`.

{cut(HTTP-сұрауларда барлық query-параметрлерді елемеуге CDN-ресурсты баптауға арналған сұрау үлгісі)}

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
{cut(HTTP-сұрауларда көрсетілген query-параметрлерді елемеуге CDN-ресурсты баптауға арналған сұрау үлгісі)}

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
{cut(Көрсетілгендерден басқа барлық query-параметрлерді HTTP-сұрауларда елемеуге CDN-ресурсты баптауға арналған сұрау үлгісі)}

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