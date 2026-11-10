# {heading(Ресурс жазбалары)[id=dns-records]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(cloud)} DNS қызметі арқылы меншікті DNS-серверлер орналастырмай-ақ аймақтарыңыз бен жазбаларыңызды DNS-те жариялауға болады. Жария DNS интернетте көрінетін DNS-аймақтарды басқарады.

## {heading(Рөлдік модельді баптау)[id=dns-records-role-model]}

Жария DNS-пен жұмыс істеу үшін [жеке кабинет](https://msk.cloud.vk.ru/app/) пайдаланушыларына арналған {linkto(../../../../../access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=рөлдерді]} {var(cloud)} баптаңыз:

- DNS-аймақтары мен ресурс жазбаларын қарауға арналған рөл:

  - Бақылаушы.

- DNS-аймақтары мен ресурс жазбаларын өңдеуге арналған рөлдер:

  - Жоба иесі.
  - Желі әкімшісі.
  - Суперәкімші.

## {heading(Квоталар мен лимиттер)[id=dns-records-quotas-limits]}

- Жоба ішіндегі DNS-аймақтарының ең көп саны — 100.
- Бір DNS-аймағы үшін әрбір түрдегі ресурс жазбаларының ең көп саны — 500.

## {heading(DNS-аймақтар тізімін қарау)[id=dns-records-zone-list]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетына.
1. Жобаны таңдаңыз.
1. **DNS** → **DNS-аймақтары** бөліміне өтіңіз.

{/tab}

{tab(API)}

{linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=әдісін]} `GET /v2/dns/` пайдаланыңыз.

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

## {heading(DNS-аймақты құру)[id=dns-records-zone-add]}

DNS-аймақ — ресурстарыңыздың домендік атауларын біріктіретін, олардың ресурс жазбаларын қамтитын логикалық бірлестік.

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетына.
1. Жобаны таңдаңыз.
1. **DNS** → **DNS-аймақтары** бөліміне өтіңіз.
1. **Аймақ қосу** түймесін басыңыз.
1. DNS-аймақ параметрлерін орнатыңыз:

   - **DNS-аймақ**: құрылатын аймақтың атауы, мысалы, бұрын сатып алынған домен.

     {note:info}
     DNS-аймақ атауында кемінде бір нүкте болуы керек, ол нүктемен немесе цифрлармен аяқталмауы тиіс.
     {/note}

   - **Контактный email**: аймақ әкімшісінің поштасы.
   - **Time to expire**: бастапқы NS-сервер жауап бермеген жағдайда, екінші NS-сервер осы аймақ бойынша сұрауларға жауап беруді тоқтататын уақыт (секундпен). Мәні **Time to refresh** және **Time to retry** өрістеріндегі мәндердің қосындысынан үлкен болуы тиіс.
   - **Time to refresh**: аймақтағы өзгерістерді қолдау үшін екінші NS-сервер бастапқы серверден SOA-жазбаны сұрауы тиіс уақыт (секундпен).
   - **Time to retry**: бастапқы NS-сервер жауап бермесе, екінші NS-сервер бастапқы серверден SOA-жазбаны қайта сұрайтын уақыт (секундпен). Мәні **Time to refresh** өрісінде көрсетілген мәннен аз болуы тиіс.
   - **Time to live (TTL)**: аймақтағы сұрауға теріс жауап қайтарылған кездегі кэштің өмір сүру уақыты.

1. **Аймақ қосу** түймесін басыңыз.
1. Аймақты басқаруды {var(cloud)} DNS-серверлеріне делегирлеу үшін [көрсетілген](https://msk.cloud.vk.ru/app/services/dns/list) доменнің иесіне хабарласыңыз.

{/tab}

{tab(API)}

{linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=әдісін]} `POST /v2/dns/` пайдаланыңыз.

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
Көптеген провайдерлерде аймақты басқаруды өз бетінше делегирлеуге болады. Мұны қалай жасау керегі туралы сұрақтарыңыз болса, [көрсетілген](https://msk.cloud.vk.ru/app/services/dns/list) доменнің иесінен көмек сұраңыз.
{/note}

## {heading(DNS-аймақты қарау)[id=dns-records-zone-view]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетына.
1. Жобаны таңдаңыз.
1. **DNS** → **DNS-аймақтары** бөліміне өтіңіз.
1. Қажетті аймақ үшін ![ ](../../../../../assets/more-icon.svg "inline") түймесін басып, **Редактировать** тармағын таңдаңыз.

{/tab}

{tab(API)}

{linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=әдісін]} `GET /v2/dns/<dns-uuid>` пайдаланыңыз.

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

## {heading(DNS-аймақты өңдеу)[id=dns-records-zone-edit]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетына.
1. Жобаны таңдаңыз.
1. **DNS** → **DNS-аймақтары** бөліміне өтіңіз.
1. Қажетті аймақ үшін ![ ](../../../../../assets/more-icon.svg "inline") түймесін басып, **Редактировать** тармағын таңдаңыз.
1. Өзгерістер енгізіп, **Өзгерістерді сақтау** түймесін басыңыз.

{/tab}

{tab(API)}

{linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=әдісін]} `PUT /v2/dns/<dns-uuid>` пайдаланыңыз.

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

## {heading(DNS ішкі аймағын құру)[id=dns-records-subzone-add]}

Ішкі аймақ — ағымдағы аймақтан бір деңгей төмен орналасқан DNS-аймақ. Мысалы, `example.com` домені үшін ішкі аймақ `subzone.example.com` болады.

Ішкі аймақты мына жерде құруға болады:

- Негізгі аймақ орналасқан сол жобада. Бұл тәсіл ішкі аймақтың ресурс жазбаларын негізгі аймақтың жазбаларынан бөлу үшін қолданылады.
- Үшінші тарап DNS-провайдерінде.

{note:warn}
Басқа жобадағы аймақ үшін ішкі аймақ құруға болмайды.
{/note}

{var(cloud)} жобасында ішкі аймақ құру үшін ішкі аймақтың атауымен ішкі аймақты {var(cloud)} DNS-серверлеріне қайта делегирлейтін NS түріндегі екі ресурс жазбасын {linkto(#dns-records-zone-add)[text=жасаңыз]}.

{note:info}
Ішкі аймақты үшінші тарап провайдерінде құрғыңыз келсе, құрылған NS-жазбалар үшінші тарап провайдерінің DNS-серверлерін көрсетуі тиіс.
{/note}

NS-жазбаларды құрғаннан кейін делегирленген ішкі домен үшін аймақ құра аласыз.

## {heading(DNS-аймақты жою)[id=dns-records-zone-delete]}

{tabs}

{tab(Жеке кабинет)}

Бұл топтық операция: қажет болса, жалаушалар арқылы бірнеше аймақты бірден жоюға болады.

1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетына.
1. Жобаны таңдаңыз.
1. **DNS** → **DNS-аймақтары** бөліміне өтіңіз.
1. Қажетті аймақ үшін ![ ](../../../../../assets/more-icon.svg "inline") түймесін басып, **Удалить** тармағын таңдаңыз.
1. Әрекетті растаңыз.

{/tab}

{tab(API)}

{linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=әдісін]} `DELETE /v2/dns/<dns-uuid>` пайдаланыңыз.

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

## {heading(Ресурс жазбаларын қосу)[id=dns-records-add]}

Ресурс жазба — домендік атаулар жүйесіндегі доменнің DNS-жазбасы. Олардың көмегімен домендік атауларға келіп түсетін сұрауларды қайда бағыттау керектігін анықтайсыз және домен туралы қосымша ақпарат бересіз.

{var(cloud)} ресурс жазбаларының мынадай түрлерін қолдайды:

- `A` — домендік атауды IPv4 мекенжайымен салыстыратын DNS-жазба.
- `AAAA` — домендік атауды IPv6 мекенжайымен салыстыратын DNS-жазба.
- `NS` — осы аймақты немесе ішкі аймақты қызмет көрсететін атаулар серверінің мекенжайын қамтитын DNS-жазба. Әдепкі бойынша аймақта екі `NS` жазба орнатылады. Бұл жазбалар доменді басқару құқықтарын {var(cloud)} атаулар серверіне беру үшін домендік атаулардың иесі тарапынан орнатылады.
- `CNAME` — лақап атты домендік атауға байланыстыратын DNS-жазба. Әдетте ішкі доменді (мысалы, `www`) осы ішкі доменнің контенті орналасқан доменге байланыстыру үшін қолданылады.
- `MX` — электрондық поштаны өңдейтін сервердің мекенжайын хабарлайтын DNS-жазба.
- `SRV` — кейбір желілік қызметтер үшін хост атауын және сервер портын анықтайтын DNS-жазба.
- `TXT` — доменнен тыс көздер үшін мәтіндік ақпаратты қамтитын DNS-жазба.

Ресурс жазбасын қосу үшін:

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетына.
1. Жобаны таңдаңыз.
1. **DNS** → **DNS-аймақтары** бөліміне өтіңіз.
1. Ресурс жазбасын қосу қажет аймақтың атауын басыңыз.
1. **Жазба қосу** түймесін басыңыз.
1. **Жазба түрі** мәніне қарай өрістерді толтырыңыз:

   {cut(CNAME)}

    - **Атауы** (қосылатын лақап ат):

        - `@`, `example.com` немесе бос мән — өзіндік аймаққа нұсқайды;
        - `subzone` немесе `subzone.example.com` — `subzone` ішкі аймағына нұсқайды;
        - `\*.dns.zone` — доменге жасалған сұраудағы кез келген атауға нұсқайды.

    - **Time to live (TTL)**: кеш өмір сүру уақыты, секундпен.
    - **Мәні**: тағайындалу нүктесінің FQDN-мекенжайы (қосылатын лақап ат нұсқайтын жер). Максималды ұзындығы — 255 таңба. Екі немесе одан да көп ішкі доменнен тұруы керек. Ішкі доменнің максималды ұзындығы — 63 таңба. Тек сандар, латын әріптері, `.` және `-` арнайы таңбалары рұқсат етіледі.

   Мысал: `example.com` доменіне нұсқайтын `www.example.com` CNAME-жазбасын құру қажет. Бұл үшін **Атауы** өрісіне `www`, ал **Мәні** өрісіне — `example.com` көрсетіңіз.

   {/cut}
   {cut(A)}

    - **Атауы**:

        - `@`, `example.com` немесе бос мән — өзіндік аймаққа нұсқайды;
        - `subzone` немесе `subzone.example.com` — `subzone` ішкі аймағына нұсқайды;
        - `\*.dns.zone` — доменге жасалған сұраудағы кез келген атауға нұсқайды.

    - **Time to live (TTL)**: кеш өмір сүру уақыты, секундпен.
    - **IP-мекенжай**: IP-мекенжай (IPv4). Бар ВМ тізімінен таңдаңыз немесе жаңасын көрсетіңіз.

   {/cut}
   {cut(MX)}

    - **Атауы**:

        - `@`, `example.com` немесе бос мән — өзіндік аймаққа нұсқайды;
        - `subzone` немесе `subzone.example.com` — `subzone` ішкі аймағына нұсқайды.

    - **Басымдық**: хосттың басымдығы. Мәні неғұрлым төмен болса, хост соғұрлым қалаулы болады.
    - **Time to live (TTL)**: кеш өмір сүру уақыты, секундпен.
    - **Мәні**: пошта серверінің FQDN-мекенжайы. Максималды ұзындығы — 255 таңба. Екі немесе одан да көп ішкі доменнен тұруы керек. Ішкі доменнің максималды ұзындығы — 63 таңба. Тек сандар, латын әріптері, `.` және `-` арнайы таңбалары рұқсат етіледі.

   {/cut}
   {cut(AAAA)}

    - **Атауы**:

        - `@`, `example.com` немесе бос мән — өзіндік аймаққа нұсқайды;
        - `subzone` немесе `subzone.example.com` — `subzone` ішкі аймағына нұсқайды;
        - `\*.dns.zone` — доменге жасалған сұраудағы кез келген атауға нұсқайды.

    - **Time to live (TTL)**: кеш өмір сүру уақыты, секундпен.
    - **IP-мекенжай**: IP-мекенжай (IPv6).

   {/cut}
   {cut(SRV)}

    - **Атауы**:

        - `@`, `example.com` немесе бос мән — өзіндік аймаққа нұсқайды;
        - `subzone` немесе `subzone.example.com` — `subzone` ішкі аймағына нұсқайды;
        - `\*.dns.zone` — доменге жасалған сұраудағы кез келген атауға нұсқайды.

    - **Қызмет**: қызметтің символдық атауы (мысалы, `_sip`).
    - **Протокол**: протоколдың символдық атауы (мысалы, `_tcp` немесе `_udp`).
    - **Басымдық**: хосттың басымдығы. Мәні неғұрлым төмен болса, хост соғұрлым қалаулы болады.
    - **Салмақ**: бірдей басымдығы бар хосттар үшін салмақ. Бұл мән `0`-ге неғұрлым жақын болса, хосттың таңдалу мүмкіндігі соғұрлым аз болады.
    - **Порт**: SRV қызметі пайдаланатын порт нөмірі.
    - **Time to live (TTL)**: кеш өмір сүру уақыты, секундпен.
    - **Хост**: қызмет орналасқан FQDN-хост. Максималды ұзындығы — 255 таңба. Екі немесе одан да көп ішкі доменнен тұруы керек. Ішкі доменнің максималды ұзындығы — 63 таңба. Тек сандар, латын әріптері, `.` және `-` арнайы таңбалары рұқсат етіледі.

   {/cut}
   {cut(TXT)}

    - **Атауы**:

        - `@`, `example.com` немесе бос мән — өзіндік аймаққа нұсқайды;
        - `subzone` немесе `subzone.example.com` — `subzone` ішкі аймағына нұсқайды;
        - `\*.dns.zone` — доменге жасалған сұраудағы кез келген атауға нұсқайды.

    - **Time to live (TTL)**: кеш өмір сүру уақыты, секундпен.
    - **Мәні**: ресурс жазбасының мәтіндік мәні.

   {/cut}
   {cut(NS)}

    - **Атауы**:

        - `@`, `example.com` немесе бос мән — өзіндік аймаққа нұсқайды;
        - `subzone` немесе `subzone.example.com` — `subzone` ішкі аймағына нұсқайды.

    - **Time to live (TTL)**: кеш өмір сүру уақыты, секундпен.
    - **Мәні**: NS-сервердің мекенжайы, мысалы, `ns1.mcs.mail.ru` немесе `ns2.mcs.mail.ru`.

   {/cut}

1. **Жазба қосу** түймесін басыңыз.

{/tab}

{tab(API)}

API сипаттамасындағы {linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=әдістерді]} пайдаланыңыз.

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

## {heading(Ресурс жазбаларының тізімін қарау)[id=dns-records-list]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетына.
1. Жобаны таңдаңыз.
1. **DNS** → **DNS-аймақтары** бөліміне өтіңіз.
1. Ресурс жазбаларын қарау қажет аймақтың атауын басыңыз.

{/tab}

{tab(API)}

{linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=әдістерін]} API спецификациясынан пайдаланыңыз.

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

## {heading(Ресурс жазбаларының параметрлерін қарау)[id=dns-records-view]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетына.
1. Жобаны таңдаңыз.
1. **DNS** → **DNS-аймақтары** бөліміне өтіңіз.
1. Ресурс жазбасын қарау қажет аймақтың атауын басыңыз.
1. Қажетті жазба үшін ![ ](../../../../../assets/more-icon.svg "inline") түймесін басып, **Редактировать** тармағын таңдаңыз.

{/tab}

{tab(API)}

{linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=әдістерін]} API спецификациясынан пайдаланыңыз.

Сұрау мысалдары:

{cut(A)}

Сұрау мысалы:

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

Сұрау мысалы:

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

Сұрау мысалы:

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

Сұрау мысалы:

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

Сұрау мысалы:

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

Сұрау мысалы:

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

Сұрау мысалы:

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

## {heading(Ресурс жазбаларын өңдеу)[id=dns-records-edit]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетына.
1. Жобаны таңдаңыз.
1. **DNS** → **DNS-аймақтары** бөліміне өтіңіз.
1. Ресурс жазбасын өзгерту қажет аймақтың атауын басыңыз.
1. Қажетті жазба үшін ![ ](../../../../../assets/more-icon.svg "inline") түймесін басып, **Редактировать** тармағын таңдаңыз.
1. Өзгерістер енгізіп, **Өзгерістерді сақтау** түймесін басыңыз.

{/tab}

{tab(API)}

{linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=әдістерін]} API спецификациясынан пайдаланыңыз.

Сұрау мысалдары:

{cut(A)}

Сұрау мысалы:

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

Сұрау мысалы:

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

Сұрау мысалы:

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

Сұрау мысалы:

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

Сұрау мысалы:

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

Сұрау мысалы:

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

Сұрау мысалы:

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

## {heading(Ресурс жазбаларын жою)[id=dns-records-delete]}

{tabs}

{tab(Жеке кабинет)}

Бұл топтық операция: қажет болса, жалаушалар арқылы бірнеше жазбаны бірден жоюға болады.

1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетына.
1. Жобаны таңдаңыз.
1. **DNS** → **DNS-аймақтары** бөліміне өтіңіз.
1. Ресурс жазбасын жою қажет аймақтың атауын басыңыз.
1. Қажетті жазба үшін ![ ](../../../../../assets/more-icon.svg "inline") түймесін басып, **Удалить** тармағын таңдаңыз.
1. Әрекетті растаңыз.

{/tab}

{tab(API)}

{linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=әдістерін]} API спецификациясынан пайдаланыңыз.

{cut(A)}

Сұрау мысалы:

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

Сұрау мысалы:

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

Сұрау мысалы:

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

Сұрау мысалы:

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

Сұрау мысалы:

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

Сұрау мысалы:

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

Сұрау мысалы:

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
