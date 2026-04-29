{include(/kz/_includes/_translated_by_ai.md)}

DNS VK Cloud сервисі өзіңіздің DNS-серверлеріңізді жаймай-ақ, аймақтарыңыз бен жазбаларыңызды DNS-те жариялауға мүмкіндік береді. Қоғамдық DNS интернетте көрінетін DNS-аймақтарды басқарады.

## Рөлдік модельді баптау

Қоғамдық DNS-пен жұмыс істеу үшін VK Cloud [жеке кабинетінің](/kz/tools-for-using-services/account/concepts/rolesandpermissions) пайдаланушыларына арналған [рөлдерді](https://kz.cloud.vk.com/app/) баптаңыз:

- DNS-аймақтар мен ресурстық жазбаларды көруге арналған рөл:

  - Бақылаушы.

- DNS-аймақтар мен ресурстық жазбаларды өңдеуге арналған рөлдер:

  - Жоба иесі.
  - Желі әкімшісі.
  - Суперадминистратор.

## Квоталар мен лимиттер

- Жоба ішіндегі DNS-аймақтардың ең көп саны — 100.
- Бір DNS-аймақ үшін әр түрдегі ресурстық жазбалардың ең көп саны — 500.

## DNS-аймақтар тізімін қарау

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **DNS** → **DNS-аймақтар**.

{/tab}

{tab(API)}

пайдаланыңыз [әдісін](/kz/tools-for-using-services/api/api-spec/network-api/api-dns) `GET /v2/dns/`.

Сұрау мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/?soa_admin_email=admin@dns.mail.ru' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап мысалы:

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

## DNS-аймақ құру

DNS-аймақ — ресурстарыңыздың домендік атауларын және олардың ресурстық жазбаларын қамтитын логикалық біріктіру.

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **DNS** → **DNS-аймақтар**.
1. батырмасын басыңыз **Добавить зону**.
1. DNS-аймақ параметрлерін орнатыңыз:

   - **DNS-аймақ**: құрылатын аймақтың атауы, мысалы, бұрын сатып алынған домен.

     {note:info}

     DNS-аймақ атауында кемінде бір нүкте болуы керек, ол нүктемен немесе сандармен аяқталмауы тиіс.

     {/note}

   - **Байланыс email**: аймақ әкімшісінің поштасы.
   - **Time to expire**: бастапқы NS-сервер жауап бермесе, екіншілік NS-сервер осы аймақ үшін сұрауларға жауап беруді тоқтататын уақыт (секундпен). Мәні **Time to refresh** және **Time to retry**.
   - **Time to refresh**: екіншілік NS-сервер аймақтағы өзгерістерді қолдау үшін бастапқы серверден SOA-жазбаны қайта сұрауы тиіс уақыт (секундпен.
   - **Time to retry**: бастапқы NS-сервер жауап бермесе, екіншілік NS-сервер бастапқы серверден SOA-жазбаны қайта сұрайтын уақыт (секундпен). Мәні **Time to refresh**.
   - **Time to live (TTL)**: аймақтағы сұрауға теріс жауап берілген кезде кэштің өмір сүру уақыты.

1. батырмасын басыңыз **Добавить зону**.
1. Аймақты VK Cloud DNS-серверлеріне делегациялау үшін [көрсетілген](https://kz.cloud.vk.com/app/services/dns/list) домен иесіне хабарласыңыз.

{/tab}

{tab(API)}

пайдаланыңыз [әдісін](/kz/tools-for-using-services/api/api-spec/network-api/api-dns) `POST /v2/dns/`.

Сұрау мысалы:

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

Жауап мысалы

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a
content-type: application/json
content-length: 319

{
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

Көптеген провайдерлерде аймақты басқаруды дербес делегациялауға болады. Мұны қалай жасау керектігі туралы сұрақтарыңыз болса [көрсетілген](https://kz.cloud.vk.com/app/services/dns/list) домен иесінен көмек сұраңыз.

{/note}

## DNS-аймақты қарау

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **DNS** → **DNS-аймақтар**.
1. Қажетті аймақ үшін ![ ](/kz/assets/more-icon.svg "inline") басып **Өңдеу**.

{/tab}

{tab(API)}

пайдаланыңыз [әдісін](/kz/tools-for-using-services/api/api-spec/network-api/api-dns) `GET /v2/dns/<dns-uuid>`.

Сұрау мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап мысалы:

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

## DNS-аймақты өңдеу

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **DNS** → **DNS-аймақтар**.
1. Қажетті аймақ үшін ![ ](/kz/assets/more-icon.svg "inline") басып **Өңдеу**.
1. Өзгерістер енгізіп **Өзгерістерді сақтау**.

{/tab}

{tab(API)}

пайдаланыңыз [әдісін](/kz/tools-for-using-services/api/api-spec/network-api/api-dns) `PUT /v2/dns/<dns-uuid>`.

Сұрау мысалы:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data-raw '{
  "soa_admin_email": "admin-new@dns.mail.ru"
}'
```

Жауап мысалы:

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

## DNS ішкіаймағын құру

Ішкіаймақ — ағымдағы аймақтан бір деңгей төмен орналасқан DNS-аймақ. Мысалы `example.com` ішкіаймақ болады `subzone.example.com`.

Ішкіаймақ мынадай түрде құрылуы мүмкін:

- Негізгі аймақ орналастырылған сол жобада. Бұл тәсіл ішкіаймақтың ресурстық жазбаларын негізгі аймақ жазбаларынан бөлу үшін қолданылады.
- Үшінші тарап DNS-провайдерінде.

{note:warn}

Басқа жобадағы аймақ үшін ішкіаймақ құруға болмайды.

{/note}

VK Cloud жобасында ішкіаймақ құру үшін VK Cloud DNS-серверлеріне ішкіаймақты қайта делегациялайтын ішкіаймақ атауымен екі ресурстық NS-жазбаны, [құрыңыз](#resurstyk_zhazbalardy_kosu) две ресурсные NS-записи с именем подзоны, повторно делегирующие подзону на DNS-сервера VK Cloud.

{note:info}

Егер сіз үшінші тарап провайдерінде ішкіаймақ құрғыңыз келсе, онда жасалған NS-жазбалар үшінші тарап провайдерінің DNS-серверлерін көрсетуі тиіс.

{/note}

NS-жазбаларды жасағаннан кейін делегацияланған ішкідомен үшін аймақ құра аласыз.

## DNS-аймақты жою

{tabs}

{tab(Жеке кабинет)}

Бұл топтық операция: қажет болса, бірден бірнеше аймақты белгілер арқылы таңдап, жоюға болады.

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **DNS** → **DNS-аймақтар**.
1. Қажетті аймақ үшін ![ ](/kz/assets/more-icon.svg "inline") басып **Жою**.
1. Әрекетті растаңыз.

{/tab}

{tab(API)}

пайдаланыңыз [әдісін](/kz/tools-for-using-services/api/api-spec/network-api/api-dns) `DELETE /v2/dns/<dns-uuid>`.

Сұрау мысалы:

```curl

curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/6f981b26-XXXX-XXXX-XXXX-464adb32e5bd' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Жауап мысалы:

```json
HTTP/1.1 204 No Content
```

{/tab}

{/tabs}

## Ресурстық жазбаларды қосу

Ресурстық жазба — домендік атаулар жүйесіндегі доменнің DNS-жазбасы. Олардың көмегімен домендік атауларға келіп түсетін сұрауларды қайда бағыттау керектігін анықтайсыз, сондай-ақ домен туралы қосымша ақпарат бересіз.

VK Cloud ресурстық жазбалардың келесі түрлерін қолдайды:

- `A` — домендік атауды IPv4 мекенжайымен сәйкестендіретін DNS-жазба4.
- `AAAA` — домендік атауды IPv6 мекенжайымен сәйкестендіретін DNS-жазба6.
- `NS` — осы аймаққа немесе ішкіаймаққа қызмет көрсететін атаулар серверінің мекенжайын қамтитын DNS-жазба. Әдепкі бойынша аймақта екі `NS`. жазбасы орнатылады. Бұл жазбалар доменді басқару құқықтарын VK Cloud атаулар серверіне беру үшін домен атаулары иесінің тарапында орнатылады.
- `CNAME` — бүркеншік атауды домендік атауға байланыстыратын DNS-жазба. Әдетте ішкідоменді (мысалы, `www`) осы ішкідоменнің контенті орналастырылған доменге байланыстыру үшін пайдаланылады.
- `MX` — электрондық поштаны өңдейтін сервердің мекенжайын хабарлайтын DNS-жазба.
- `SRV` — кейбір желілік қызметтер үшін сервердің хост атауы мен портын анықтайтын DNS-жазба.
- `TXT` — доменнен тыс көздерге арналған мәтіндік ақпаратты қамтитын DNS-жазба.

## {heading(Ресурстық жазбаларды қосу)[id=add]}

Ресурстық жазбаны қосу үшін:

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **DNS** → **DNS-аймақтар**.
1. Ресурстық жазбаны қосу қажет аймақ атауын басыңыз.
1. батырмасын басыңыз **Добавить запись**.
1. Заполните поля в зависимости от значения **Жазба түрі**:

   {cut(CNAME)}

    - **Атауы** (қосылатын бүркеншік атау):

        - `@`, `example.com` немесе бос мән — аймақтың өзін көрсетеді;
        - `subzone` немесе `subzone.example.com` — ішкіаймағын көрсетеді `subzone`;
        - `\*.dns.zone` — доменге сұраудағы кез келген атауды көрсетеді.

    - **Time to live (TTL)**: кэштің өмір сүру уақыты секундпен.
    - **Мәні**: тағайындалған FQDN-мекенжайы (қосылатын бүркеншік атау нені көрсетеді). Ең көп ұзындығы — 255 таңба. Екі немесе одан көп ішкідоменнен тұруы тиіс. Ішкідоменнің ең көп ұзындығы — 63 таңба. Тек сандар, латын әріптері `.` және `-`.

   Мысал `www.example.com`, доменін көрсететін `example.com`. CNAME-жазбасын құру қажет. Ол үшін **Атауы** өрісінде `www`, ал **Мәні** — `example.com`.

   {/cut}
   {cut(A)}

    - **Атауы**:

        - `@`, `example.com` немесе бос мән — аймақтың өзін көрсетеді;
        - `subzone` немесе `subzone.example.com` — ішкіаймағын көрсетеді `subzone`;
        - `\*.dns.zone` — доменге сұраудағы кез келген атауды көрсетеді.

    - **Time to live (TTL)**: кэштің өмір сүру уақыты секундпен.
    - **IP-мекенжайы**: IP-мекенжайы (IPv4). Қолданыстағы ВМ тізімінен таңдаңыз немесе жаңасын көрсетіңіз.

   {/cut}
   {cut(MX)}

    - **Атауы**:

        - `@`, `example.com` немесе бос мән — аймақтың өзін көрсетеді;
        - `subzone` немесе `subzone.example.com` — ішкіаймағын көрсетеді `subzone`.

    - **Басымдық**: хост басымдығы. Мәні неғұрлым төмен болса, хост соғұрлым басым болады.
    - **Time to live (TTL)**: кэштің өмір сүру уақыты секундпен.
    - **Мәні**: пошта серверінің FQDN-мекенжайы. Ең көп ұзындығы — 255 таңба. Екі немесе одан көп ішкідоменнен тұруы тиіс. Ішкідоменнің ең көп ұзындығы — 63 таңба. Тек сандар, латын әріптері `.` және `-`.

   {/cut}
   {cut(AAAA)}

    - **Атауы**:

        - `@`, `example.com` немесе бос мән — аймақтың өзін көрсетеді;
        - `subzone` немесе `subzone.example.com` — ішкіаймағын көрсетеді `subzone`;
        - `\*.dns.zone` — доменге сұраудағы кез келген атауды көрсетеді.

    - **Time to live (TTL)**: кэштің өмір сүру уақыты секундпен.
    - **IP-мекенжайы**: IP-мекенжайы (IPv6).

   {/cut}
   {cut(SRV)}

    - **Атауы**:

        - `@`, `example.com` немесе бос мән — аймақтың өзін көрсетеді;
        - `subzone` немесе `subzone.example.com` — ішкіаймағын көрсетеді `subzone`;
        - `\*.dns.zone` — доменге сұраудағы кез келген атауды көрсетеді.

    - **Сервис**: сервистің символдық атауы (мысалы, `_sip`).
    - **Протокол**: протоколдың символдық атауы (мысалы, `_tcp` немесе `_udp`).
    - **Басымдық**: хост басымдығы. Мәні неғұрлым төмен болса, хост соғұрлым басым болады.
    - **Салмақ**: бірдей басымдығы бар хосттар үшін салмақ. Бұл мән `0`, ге неғұрлым жақын болса, хосттың таңдалу ықтималдығы соғұрлым төмен болады.
    - **Порт**: SRV қызметі пайдаланатын порт нөмірі.
    - **Time to live (TTL)**: кэштің өмір сүру уақыты секундпен.
    - **Хост**: қызмет орналастырылған хосттың FQDN-і. Ең көп ұзындығы — 255 таңба. Екі немесе одан көп ішкідоменнен тұруы тиіс. Ішкідоменнің ең көп ұзындығы — 63 таңба. Тек сандар, латын әріптері `.` және `-`.

   {/cut}
   {cut(TXT)}

    - **Атауы**:

        - `@`, `example.com` немесе бос мән — аймақтың өзін көрсетеді;
        - `subzone` немесе `subzone.example.com` — ішкіаймағын көрсетеді `subzone`;
        - `\*.dns.zone` — доменге сұраудағы кез келген атауды көрсетеді.

    - **Time to live (TTL)**: кэштің өмір сүру уақыты секундпен.
    - **Мәні**: ресурстық жазбаның мәтіндік мәні.

   {/cut}
   {cut(NS)}

    - **Атауы**:

        - `@`, `example.com` немесе бос мән — аймақтың өзін көрсетеді;
        - `subzone` немесе `subzone.example.com` — ішкіаймағын көрсетеді `subzone`.

    - **Time to live (TTL)**: кэштің өмір сүру уақыты секундпен.
    - **Мәні**: NS-сервердің мекенжайы, мысалы, `ns1.mcs.mail.ru` немесе `ns2.mcs.mail.ru`.

   {/cut}

1. батырмасын басыңыз **Добавить запись**.

{/tab}

{tab(API)}

API спецификациясынан [әдістерімен](/kz/tools-for-using-services/api/api-spec/network-api/api-dns) пайдаланыңыз.

Сұрау мысалдары:

{cut(A)}

Сұрау мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"name": "@", 
"ipv4": "8.8.8.13",
"ttl": 60
}'
```

Жауап мысалы:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/579fd62e-XXXX-XXXX-XXXX-522a76cdeb32
content-type: application/json
content-length: 147

{
    "uuid": "579fd62e-XXXX-XXXX-XXXX-522a76cdeb32",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv4": "8.8.8.13",
    "ttl": 60
}
```

{/cut}
{cut(АААА)}

Сұрау мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "@",
    "ipv6": "1050::5:600:300c:326b",
    "ttl": 60
}'
```

Жауап мысалы:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e
content-type: application/json
content-length: 160

{
    "uuid": "8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv6": "1050::5:600:300c:326b",
    "ttl": 60
}
```

{/cut}
{cut(CNAME)}

Сұрау мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/cname/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"name": "dd-test-cname", "content": "cname-record", "ttl": 60}'
```

Жауап мысалы:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-c02f-4ba3-839b-227afa2eb8dd/cname/57fb4556-XXXX-XXXX-XXXX-8f11c20da471
content-type: application/json
content-length: 155

{
    "uuid": "57fb4556-XXXX-XXXX-XXXX-8f11c20da471",
    "name": "www",
    "dns": "/v2/dns/12f67238-c02f-4ba3-839b-227afa2eb8dd",
    "content": "example.com",
    "ttl": 60
}
```

{/cut}
{cut(MX)}

Сұрау мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"name": "@", "content": "mailhost.example.com", "priority": 11, "ttl": 60}'
```

Жауап мысалы:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/f786555e-XXXX-XXXX-XXXX-daef4c5f86c6
content-type: application/json
content-length: 178

{
    "uuid": "f786555e-XXXX-XXXX-XXXX-daef4c5f86c6",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 11,
    "content": "mailhost.example.com",
    "ttl": 60
}
```

{/cut}
{cut(NS)}

Сұрау мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
--data '{"name": "@", "content": "ns3.corp.mail.ru", "priority": 11, "ttl": 60}'
```

Жауап мысалы:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/368133ff-XXXX-XXXX-XXXX-cd4ab0411ccd
content-type: application/json
content-length: 161

{
    "uuid": "368133ff-XXXX-XXXX-XXXX-cd4ab0411ccd",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "ns3.corp.mail.ru",
    "ttl": 86400
}
```

{/cut}
{cut(SRV)}

Сұрау мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{
  "name": "_sip._udp",
 "priority": 13,
  "weight": 6,
  "port": 5060,
  "host": "example.com",
  "ttl": 86400

}'
```

Жауап мысалы:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/98ace09e-XXXX-XXXX-XXXX-07338b10a38d
content-type: application/json
content-length: 204

{
    "uuid": "98ace09e-XXXX-XXXX-XXXX-07338b10a38d",
    "name": "_sip._udp",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 13,
    "weight": 6,
    "port": 5060,
    "host": "example.com",
    "ttl": 86400
}
```

{/cut}
{cut(TXT)}

Сұрау мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{
  "name": "@",
  "content": "some text",
  "ttl": 86400
}'
```

Жауап мысалы:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/6b98c535-XXXX-XXXX-XXXX-5a9226f36bee
content-type: application/json
content-length: 167

{
    "uuid": "6b98c535-XXXX-XXXX-XXXX-5a9226f36bee",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "some text",
    "ttl": 86400
}
```

{/cut}

{/tab}

{/tabs}

## Ресурстық жазбалар тізімін қарау

{tabs}

{tab(Жеке кабинет)}

1. [VK Cloud жеке кабинетіне өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **DNS** → **DNS-аймақтар**.
1. Ресурстық жазбаларын қарау қажет аймақтың атауын басыңыз.

{/tab}

{tab(API)}

API спецификациясынан [әдістерімен](/kz/tools-for-using-services/api/api-spec/network-api/api-dns) пайдаланыңыз.

Сұрау мысалдары:

{cut(A)}

Сұрау мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 298

[
    {
        "uuid": "1a8b660e-XXXX-XXXX-XXXX-6efa053a095b",
        "name": "@",
        "dns": "/v2/dns/12f67238-c02f-4ba3-839b-227afa2eb8dd",
        "ipv4": "213.219.213.153",
        "ttl": 86400
    },
    {
        "uuid": "ddc7db9a-XXXX-XXXX-XXXX-16797f0dbd6a",
        "name": "@",
        "dns": "/v2/dns/12f67238-c02f-4ba3-839b-227afa2eb8dd",
        "ipv4": "95.163.212.224",
        "ttl": 86400
    }
]
```

{/cut}
{cut(AAAA)}

Сұрау мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 324

[
    {
        "uuid": "0df38ba9-XXXX-XXXX-XXXX-cac6b532256a",
        "name": "@",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "ipv6": "1050::5:600:300c:326b",
        "ttl": 86400
    },
    {
        "uuid": "e92723eb-XXXX-XXXX-XXXX-b84f5ce671e6",
        "name": "example.com",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "ipv6": "1050::5:600:200c:326b",
        "ttl": 86400
    }
]
```

{/cut}
{cut(CNAME)}

Сұрау мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/cname/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 162

[
    {
        "uuid": "9e626a07-86dd-4f57-bcc8-e62700407a35",
        "name": "www",
        "dns": "/v2/dns/12f67238-c02f-4ba3-839b-227afa2eb8dd",
        "content": "example.com",
        "ttl": 86400
    }
]
```

{/cut}
{cut(MX)}

Сұрау мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 180

[
    {
        "uuid": "49c4d404-XXXX-XXXX-XXXX-c6bfbee00185",
        "name": "@",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "priority": 10,
        "content": "mailhost1.example.com",
        "ttl": 86400
    }
]
```

{/cut}
{cut(NS)}

Сұрау мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 487

[
    {
        "uuid": "a821cc32-XXXX-XXXX-XXXX-70103917daea",
        "name": "@",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "content": "ns1.mcs.mail.ru",
        "ttl": 86400
    },
    {
        "uuid": "a3c96050-XXXX-XXXX-XXXX-0003c341b494",
        "name": "@",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "content": "ns2.mcs.mail.ru",
        "ttl": 86400
    },
    {
    "uuid": "cf13ec79-XXXX-XXXX-XXXX-7a7dd38e60c3",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "ns3.corp.mail.ru",
    "ttl": 86400
    }
]
```

{/cut}
{cut(SRV)}

Сұрау мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 206

[
    {
        "uuid": "5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e",
        "name": "_sip._udp",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "priority": 10,
        "weight": 5,
        "port": 5060,
        "host": "example.com",
        "ttl": 86400
    }
]
```

{/cut}
{cut(TXT)}

Сұрау мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 169

[
    {
        "uuid": "9357e06f-XXXX-XXXX-XXXX-51eb1768e54e",
        "name": "@",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "content": "test value",
        "ttl": 86400
    }
]
```

{/cut}

{/tab}

{/tabs}

## Ресурстық жазбалардың параметрлерін қарау

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **DNS** → **DNS-зоны**.
1. Ресурстық жазбаны қарау қажет аймақ атауын басыңыз.
1. Қажетті жазба үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып **Редактировать**.

{/tab}

{tab(API)}

API спецификациясындағы [әдістерді](/kz/tools-for-using-services/api/api-spec/network-api/api-dns) пайдаланыңыз.

Сұрау салу мысалдары:

{cut(А)}

Сұрау салу мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/1a8b660e-XXXX-XXXX-XXXX-6efa053a095b' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 147

{
    "uuid": "1a8b660e-XXXX-XXXX-XXXX-6efa053a095b",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv4": "213.219.213.153",
    "ttl": 86400
}
```

{/cut}
{cut(AAAA)}

Сұрау салу мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 160

{
    "uuid": "8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv6": "1050::5:600:300c:326b",
    "ttl": 60
}
```

{/cut}
{cut(CNAME)}

Сұрау салу мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/cname/57fb4556-3de2-4381-8a12-8f11c20da471' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 155

{
    "uuid": "57fb4556-XXXX-XXXX-XXXX-8f11c20da471",
    "name": "www",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "example.com",
    "ttl": 60
}
```

{/cut}
{cut(MX)}

Сұрау салу мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/f786555e-XXXX-XXXX-XXXX-daef4c5f86c6' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 178

{
    "uuid": "f786555e-XXXX-XXXX-XXXX-daef4c5f86c6",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 11,
    "content": "mailhost.example.com",
    "ttl": 60
}
```

{/cut}
{cut(NS)}

Сұрау салу мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/f786555e-XXXX-XXXX-XXXX-daef4c5f86c6' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 161

{
    "uuid": "f786555e-XXXX-XXXX-XXXX-daef4c5f86c6",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 11,
    "content": "ns1.mcs.mail.ru",
    "ttl": 86400
}
```

{/cut}
{cut(SRV)}

Сұрау салу мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 204

{
    "uuid": "5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e",
    "name": "_sip._udp",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 10,
    "weight": 5,
    "port": 5060,
    "host": "example.com",
    "ttl": 86400
}
```

{/cut}
{cut(TXT)}

Сұрау салу мысалы:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/6b98c535-XXXX-XXXX-XXXX-5a9226f36bee' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 167

{
    "uuid": "6b98c535-XXXX-XXXX-XXXX-5a9226f36bee",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "some text",
    "ttl": 86400
}
```

{/cut}

{/tab}

{/tabs}

## Ресурстық жазбаларды өңдеу

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **DNS** → **DNS-зоны**.
1. Ресурстық жазбаны өзгерту қажет аймақ атауын басыңыз.
1. Қажетті жазба үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып **Редактировать**.
1. Өзгерістерді енгізіп **Сохранить изменения**.

{/tab}

{tab(API)}

API спецификациясындағы [әдістерді](/kz/tools-for-using-services/api/api-spec/network-api/api-dns) пайдаланыңыз.

Сұрау салу мысалдары:

{cut(А)}

Сұрау салу мысалы:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/1a8b660e-8bf0-48c9-8b41-6efa053a095b' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"ipv4": "8.8.8.8"}'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 147

{
    "uuid": "1a8b660e-8bf0-48c9-8b41-6efa053a095b",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv4": "8.8.8.8",
    "ttl": 86400
}
```

{/cut}
{cut(AAAA)}

Сұрау салу мысалы:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"ipv6": "1050::5:600:300c:555b"
}'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 160

{
    "uuid": "8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv6": "1050::5:600:200c:555b",
    "ttl": 60
}
```

{/cut}
{cut(CNAME)}

Сұрау салу мысалы:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/cname/57fb4556-3de2-4381-8a12-8f11c20da471' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"content": "example.org"}'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 155

{
    "uuid": "57fb4556-XXXX-XXXX-XXXX-8f11c20da471",
    "name": "www",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "example.org",
    "ttl": 60
}
```

{/cut}
{cut(MX)}

Сұрау салу мысалы:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/f786555e-XXXX-XXXX-XXXX-daef4c5f86c6' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"content": "mailhost1.example.com"}'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 179

{
    "uuid": "f786555e-XXXX-XXXX-XXXX-daef4c5f86c6",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 11,
    "content": "mailhost1.example.com",
    "ttl": 60
}
```

{/cut}
{cut(NS)}

Сұрау салу мысалы:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/368133ff-XXXX-XXXX-XXXX-cd4ab0411ccd' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"content": "ns-new.mail.ru""}'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 164

{
    "uuid": "368133ff-XXXX-XXXX-XXXX-cd4ab0411ccd",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "ns-new.mail.ru",
    "ttl": 60
}
```

{/cut}
{cut(SRV)}

Сұрау салу мысалы:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"name": "_sip._tcp"}'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 204

{
    "uuid": "5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e",
    "name": "_sip._tcp",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 10,
    "weight": 5,
    "port": 5060,
    "host": "example.com",
    "ttl": 86400
}
```

{/cut}
{cut(TXT)}

Сұрау салу мысалы:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/6b98c535-XXXX-XXXX-XXXX-5a9226f36bee' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"content": "some new text"}'
```

Жауап мысалы:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 171

{
    "uuid": "6b98c535-XXXX-XXXX-XXXX-5a9226f36bee",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "some new text",
    "ttl": 86400
}
```

{/cut}

{/tab}

{/tabs}

## Ресурстық жазбаларды жою

{tabs}

{tab(Жеке кабинет)}

Бұл топтық операция: қажет болған жағдайда бірден бірнеше жазбаны жалаушалар арқылы таңдап, жоюға болады.

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **DNS** → **DNS-зоны**.
1. Ресурстық жазбаны жою қажет аймақ атауын басыңыз.
1. Қажетті жазба үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып **Удалить**.
1. Әрекетті растаңыз.

{/tab}

{tab(API)}

API спецификациясындағы [әдістерді](/kz/tools-for-using-services/api/api-spec/network-api/api-dns) пайдаланыңыз.

{cut(A)}

Сұрау салу мысалы:

```curl

curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/1a8b660e-XXXX-XXXX-XXXX-6efa053a095b' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Жауап мысалы:

```json
HTTP/1.1 204 No Content
```

{/cut}
{cut(AAAA)}

Сұрау салу мысалы:

```curl

curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Жауап мысалы:

```json
HTTP/1.1 204 No Content
```

{/cut}
{cut(CNAME)}

Сұрау салу мысалы:

```curl
curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/cname/57fb4556-XXXX-XXXX-XXXX-8f11c20da471' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Жауап мысалы:

```json
HTTP/1.1 204 No Content
```

{/cut}
{cut(MX)}

Сұрау салу мысалы:

```curl
curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/f786555e-XXXX-XXXX-XXXX-daef4c5f86c6' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Жауап мысалы:

```json
HTTP/1.1 204 No Content
```

{/cut}
{cut(NS)}

Сұрау салу мысалы:

```curl
curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/368133ff-XXXX-XXXX-XXXX-cd4ab0411ccd' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Жауап мысалы:

```json
HTTP/1.1 204 No Content
```

{/cut}
{cut(SRV)}

Сұрау салу мысалы:

```curl
curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Жауап мысалы:

```json
HTTP/1.1 204 No Content
```

{/cut}
{cut(TXT)}

Сұрау салу мысалы:

```curl
curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/6b98c535-XXXX-XXXX-XXXX-5a9226f36bee' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Жауап мысалы:

```json
HTTP/1.1 204 No Content
```

{/cut}

{/tab}

{/tabs}
