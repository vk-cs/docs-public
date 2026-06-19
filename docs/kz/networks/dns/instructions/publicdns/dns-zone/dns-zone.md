# {heading(DNS-аймақтар)[id=dns-dns-zone]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(DNS-аймақтар тізімін қарау)[id=dns-dns-zone-list]}

{tabs}

{tab(Жеке кабинет)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
1. Жобаны таңдаңыз.
1. **DNS** → **DNS-аймақтар** бөліміне өтіңіз.

{/tab}

{tab(API)}

{linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=әдісін]} `GET /v2/dns/` пайдаланыңыз.

Сұрау үлгісі:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/?soa_admin_email=admin@dns.mail.ru' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап үлгісі:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 329

[{
    "uuid": "86b136b3-XXXX-XXXX-XXXX-1818b12958c3",
    "tenant": "b5b7ffd4-XXXX-XXXX-XXXX-f44555df8f67",
    "soa_primary_dns": "ns1.mcs.mail.ru",
    "soa_admin_email": "admin@dns.mail.ru",
    "soa_serial": 5,
    "soa_refresh": 86400,
    "soa_retry": 7200,
    "soa_expire": 3600000,
    "soa_ttl": 86400,
    "zone": "example.com",
    "status": "pending"
}]
```

{/tab}

{/tabs}

## {heading(DNS-аймақты құру)[id=dns-dns-zone-add]}

DNS-аймақ — бұл ресурстарыңыздың домендік атауларын біріктіретін, олардың ресурстық жазбаларын қамтитын логикалық бірлестік.

{tabs}

{tab(Жеке кабинет)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
1. Жобаны таңдаңыз.
1. **DNS** → **DNS-аймақтар** бөліміне өтіңіз.
1. **Аймақ қосу** батырмасын басыңыз.
1. DNS-аймақ параметрлерін орнатыңыз:

   - **DNS-аймақ**: құрылатын аймақтың атауы, мысалы, бұрын сатып алынған домен.

     {note:info}
     DNS-аймақ атауында кемінде бір нүкте болуы керек, ол нүктемен немесе цифрлармен аяқталмауы тиіс.
     {/note}

   - **Контактный email**: аймақ әкімшісінің поштасы.
   - **Time to expire**: бастапқы NS-сервер жауап бермесе, осы аймақ бойынша сұрауларға екінші NS-сервер жауап беруді тоқтататын уақыт (секундпен). Мәні **Time to refresh** және **Time to retry** өрістеріндегі мәндердің қосындысынан үлкен болуы керек.
   - **Time to refresh**: аймақтағы өзгерістерді қолдау үшін екінші NS-сервер бастапқы серверден SOA-жазбаны сұрауы тиіс уақыт (секундпен).
   - **Time to retry**: егер бастапқы NS-сервер жауап бермесе, екінші NS-сервер бастапқы серверден SOA-жазбаны қайта сұрайтын уақыт (секундпен). Мәні **Time to refresh** ішінде көрсетілген мәннен аз болуы керек.
   - **Time to live (TTL)**: аймақтағы сұрауға теріс жауап берілген кезде кэштің өмір сүру уақыты.

1. **Аймақ қосу** батырмасын басыңыз.
1. Аймақты басқаруды {var(cloud)} DNS-серверлеріне делегирлеу үшін [көрсетілген](https://kz.cloud.vk.com/app/services/dns/list) доменнің иесіне жүгініңіз.

{/tab}

{tab(API)}

{linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=әдісін]} `POST /v2/dns/` пайдаланыңыз.

Сұрау үлгісі:

```curl

curl --location 'https://mcs.mail.ru/public-dns/v2/dns/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data-raw '{
    "zone": "example.com",
    "soa_primary_dns": "ns1.mcs.mail.ru",
    "soa_admin_email": "admin@dns.mail.ru",
    "soa_refresh": 86400,
    "soa_retry": 7200,
    "soa_expire": 3600000,
    "soa_ttl": 86400
}'
```

Жауап үлгісі

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a
content-type: application/json
content-length: 319

    "uuid": "bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a",
    "tenant": "b5b7ffd4-XXXX-XXXX-XXXX-f44555df8f67",
    "soa_primary_dns": "ns1.mcs.mail.ru",
    "soa_admin_email": "admin@dns.mail.ru",
    "soa_serial": 1,
    "soa_refresh": 86400,
    "soa_retry": 7200,
    "soa_expire": 3600000,
    "soa_ttl": 86400,
    "zone": "example.com",
    "status": "pending"
}
```

{/tab}

{/tabs}

{note:info}
Көптеген провайдерлерде аймақты басқаруды өз бетінше делегирлеуге болады. Мұны қалай жасау керегі туралы сұрақтарыңыз болса, [көрсетілген](https://kz.cloud.vk.com/app/services/dns/list) доменнің иесінен көмек сұраңыз.
{/note}

## {heading(DNS-аймақты қарау)[id=dns-dns-zone-view]}

{tabs}

{tab(Жеке кабинет)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
1. Жобаны таңдаңыз.
1. **DNS** → **DNS-аймақтар** бөліміне өтіңіз.
1. Қажетті аймақ үшін ![ ](../../../../../assets/more-icon.svg "inline") батырмасын басып, **Редактировать** тармағын таңдаңыз.

{/tab}

{tab(API)}

{linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=әдісін]} `GET /v2/dns/<dns-uuid>` пайдаланыңыз.

Сұрау үлгісі:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап үлгісі:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 321

{
    "uuid": "bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a",
    "tenant": "b5b7ffd4-XXXX-XXXX-XXXX-f44555df8f67",
    "soa_primary_dns": "ns1.mcs.mail.ru",
    "soa_admin_email": "admin@dns.mail.ru",
    "soa_serial": 3,
    "soa_refresh": 86400,
    "soa_retry": 7200,
    "soa_expire": 3600000,
    "soa_ttl": 86400,
    "zone": "example.com",
    "status": "active"
}
```

{/tab}

{/tabs}

## {heading(DNS-аймақты өңдеу)[id=dns-dns-zone-edit]}

{tabs}

{tab(Жеке кабинет)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
1. Жобаны таңдаңыз.
1. **DNS** → **DNS-аймақтар** бөліміне өтіңіз.
1. Қажетті аймақ үшін ![ ](../../../../../assets/more-icon.svg "inline") батырмасын басып, **Редактировать** тармағын таңдаңыз.
1. Өзгерістер енгізіп, **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{tab(API)}

{linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=әдісін]} `PUT /v2/dns/<dns-uuid>` пайдаланыңыз.

Сұрау үлгісі:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data-raw '{
  "soa_admin_email": "admin-new@dns.mail.ru"
}'
```

Жауап үлгісі:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 330

{
    "uuid": "bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a",
    "tenant": "b5b7ffd4-XXXX-XXXX-XXXX-f44555df8f67",
    "soa_primary_dns": "ns1.mcs.mail.ru",
    "soa_admin_email": "admin-new@dns.corp.mail.ru",
    "soa_serial": 3,
    "soa_refresh": 86400,
    "soa_retry": 7200,
    "soa_expire": 3600000,
    "soa_ttl": 86400,
    "zone": "example.com",
    "status": "active"
}
```

{/tab}

{/tabs}

## {heading(DNS ішкі аймағын құру)[id=dns-dns-zone-subzone-add]}

Ішкі аймақ — бұл ағымдағы аймақтан бір деңгей төмен орналасқан DNS-аймақ. Мысалы, `example.com` домені үшін `subzone.example.com` ішкі аймақ болады.

Ішкі аймақ мынадай түрде құрылуы мүмкін:

- Негізгі аймақ орналасқан сол жобада. Бұл тәсіл ішкі аймақтың ресурстық жазбаларын негізгі аймақтың жазбаларынан бөлу үшін қолданылады.
- Үшінші тарап DNS-провайдерінде.

{note:warn}
Басқа жобадағы аймақ үшін ішкі аймақ құруға болмайды.
{/note}

{var(cloud)} жобасында ішкі аймақ құру үшін ішкі аймақ атауымен ішкі аймақты {var(cloud)} DNS-серверлеріне қайта делегирлейтін екі NS ресурстық жазбасын [құрыңыз](#dns-dns-zone-add).

{note:info}
Егер ішкі аймақты үшінші тарап провайдерінде құрғыңыз келсе, онда құрылған NS-жазбалар үшінші тарап провайдерінің DNS-серверлерін көрсетуі тиіс.
{/note}

NS-жазбаларды құрғаннан кейін делегирленген ішкі домен үшін аймақ құра аласыз.

## {heading(DNS-аймақты жою)[id=dns-dns-zone-delete]}

{tabs}

{tab(Жеке кабинет)}

Бұл топтық операция: қажет болса, жалаушалар арқылы бірден бірнеше аймақты жоюға болады.

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
1. Жобаны таңдаңыз.
1. **DNS** → **DNS-аймақтар** бөліміне өтіңіз.
1. Қажетті аймақ үшін ![ ](../../../../../assets/more-icon.svg "inline") батырмасын басып, **Удалить** тармағын таңдаңыз.
1. Әрекетті растаңыз.

{/tab}

{tab(API)}

{linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=әдісін]} `DELETE /v2/dns/<dns-uuid>` пайдаланыңыз.

Сұрау үлгісі:

```curl

curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/6f981b26-XXXX-XXXX-XXXX-464adb32e5bd' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Жауап үлгісі:

```json
HTTP/1.1 204 No Content
```

{/tab}

{/tabs}
