# {heading(Qauipsiz token қосуды орнату)[id=cdn-secure-token]}

{include(/kz/_includes/_translated_by_ai.md)}

{linkto(../../../../../networks/cdn/concepts/secure-token#cdn-secure-token)[text=Secure token]} опциясы CDN-ресурсының файлдарын қалаусыз жүктеп алудан қорғауға мүмкіндік береді.

## {heading(Qauipsiz token қосуды орнату)[id=cdn-secure-token-connect]}

{tabs}
{tab(Жеке кабинет)}

{include(../../../../../_includes/_open-cdn.md)}

1. **Безопасность** қойындысына өтіңіз.
1. **Активировать Secure Token** опциясын қосыңыз.
1. Құпия кілтті енгізіңіз — ұзындығы 6-дан 32 таңбаға дейінгі кездейсоқ таңбалар жиынтығы. Енгізілген құпия кілтті қауіпсіз жерде сақтаңыз.
1. (Опционалды) Белгілі бір IP-мекенжайдан ғана қол жеткізуге рұқсат беру үшін **Добавить IP-адрес к токену** опциясын қосыңыз. IP-мекенжай CDN-ресурсынан тыс, контент көзі орналасқан сайтта {linkto(../../../../../networks/cdn/concepts/secure-token#cdn-secure-token-ipscripts)[text=скриптті]} орналастыру арқылы беріледі.
1. **Сохранить изменения** батырмасын басыңыз.

{/tab}
{tab(API)}
{include(../../../../../_includes/_api_cdn_create_change.md)}
Сұрау денесіндегі `options` блогында `secure_key` параметрлерін орнатыңыз:

- Опцияны қосу үшін `"enabled": true`, өшіру үшін — `"enabled": false` мәнін көрсетіңіз.
- Құпия кілтті орнату үшін `key` параметріне ұзындығы 6-дан 32 таңбаға дейінгі таңбалар жиынтығын енгізіңіз. Мысал: `"key": "examplesecurekey"`.
- Токенге IP-мекенжай қосуды қосу үшін `type` параметріне `2` мәнін енгізіңіз. IP-мекенжай қосуды өшіру үшін `0` мәнін енгізіңіз. Мысалдар: `"type": 2`, `"type": 0`.

Сұрау мысалы:

```json
curl --location --request PUT 'https://kz.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281' \
--header 'X-Auth-Token: example6UjMOd' \
--header 'Content-Type: application/json' \
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options": {
        "secure_key": {
            "enabled": true, 
            "key": "examplesecurekey",
            "type": 2
        }
    }
}'
```
{/tab}
{/tabs}

{note:info}
Secure token қосуды орнатқаннан кейін CDN-ресурсының контентіне қол қойылмаған сілтемелер арқылы қол жеткізу мүмкін болмайды.
Контенттің бір бөлігіне кәдімгі сілтемелер арқылы қол жеткізуді ұйымдастыру үшін, ол үшін бөлек {linkto(../../../../../networks/cdn/concepts/origin-groups#cdn-origin-groups)[text=источнигі]} бар тағы бір ресурс {linkto(../../../../../networks/cdn/instructions/create-resource#cdn-create-resource)[text=жасаңыз]}.
{/note}

## {heading(Қол қойылған сілтемелер арқылы қол жеткізуді баптау)[id=cdn-secure-token-signed-links-access]}

Баптау пайдаланушылар контентке қол жеткізетін ресурста орындалады:

1. Қол қойылған сілтемені генерациялау үшін ресурсыңызға қажетті {linkto(../../../../../networks/cdn/concepts/secure-token#cdn-secure-token-scripts)[text=скриптті]} қосыңыз. Скриптті таңдау **Добавить IP-адрес к токену** опциясын қосқаныңызға байланысты.
1. Пайдаланушылар қажетті файлдарға тек қол қойылған сілтемелер арқылы қол жеткізетіндей етіп ресурсыңызды ұйымдастырыңыз. Бұл ретте CDN {var(cloud)} сервисі бастапқы серверге жүгінген кезде, құпия кілттің бар-жоғына қарамастан, контентке қол жеткізуі тиіс.
