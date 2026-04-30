{include(/kz/_includes/_translated_by_ai.md)}

## DNS-аймақтар

<tabs>
<tablist>
<tab>Жеке кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **DNS** → **DNS-аймақтар**.

</tabpanel>
<tabpanel>

пайдаланыңыз [әдісін](/kz/tools-for-using-services/api/api-spec/network-api/api-dns) `GET /v2/dns/`.

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
</tabpanel>
</tabs>

## {heading(DNS-аймақты құру)[id=add]}

DNS-аймақ — бұл ресурстарыңыздың домендік атауларын біріктіретін, олардың ресурстық жазбаларын қамтитын логикалық бірлестік.

<tabs>
<tablist>
<tab>Жеке кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **DNS** → **DNS-аймақтар**.
1. батырмасын басыңыз **Добавить зону**.
1. DNS-аймақ параметрлерін орнатыңыз:

    - **DNS-аймақ**: құрылатын аймақтың атауы, мысалы, бұрын сатып алынған домен.

      <info>

      DNS-аймақ атауында кемінде бір нүкте болуы керек, ол нүктемен немесе цифрлармен аяқталмауы тиіс.

      </info>

    - **Контактный email**: аймақ әкімшісінің поштасы.
    - **Time to expire**: бастапқы NS-сервер жауап бермесе, осы аймақ бойынша сұрауларға екінші NS-сервер жауап беруді тоқтататын уақыт (секундпен). Мәні **Time to refresh** және **Time to retry**.
    - **Time to refresh**: аймақтағы өзгерістерді қолдау үшін екінші NS-сервер бастапқы серверден SOA-жазбаны сұрауы тиіс уақыт (секундпен.
    - **Time to retry**: егер бастапқы NS-сервер жауап бермесе, екінші NS-сервер бастапқы серверден SOA-жазбаны қайта сұрайтын уақыт (секундпен). Мәні **Time to refresh**.
    - **Time to live (TTL)**: аймақтағы сұрауға теріс жауап берілген кезде кэштің өмір сүру уақыты.

1. батырмасын басыңыз **Добавить зону**.
1. Аймақты басқаруды VK Cloud DNS-серверлеріне делегирлеу үшін [көрсетілген](https://kz.cloud.vk.com/app/services/dns/list) доменнің иесіне жүгініңіз.

</tabpanel>
<tabpanel>

пайдаланыңыз [әдісін](/kz/tools-for-using-services/api/api-spec/network-api/api-dns) `POST /v2/dns/`.

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

</tabpanel>
</tabs>

<info>

Көптеген провайдерлерде аймақты басқаруды өз бетінше делегирлеуге болады. Мұны қалай жасау керегі туралы сұрақтарыңыз болса [көрсетілген](https://kz.cloud.vk.com/app/services/dns/list) доменнің иесінен көмек сұраңыз.

</info>

## DNS-аймақты қарау

<tabs>
<tablist>
<tab>Жеке кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **DNS** → **DNS-аймақтар**.
1. Қажетті аймақ үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып **Өңдеу**.

</tabpanel>
<tabpanel>

пайдаланыңыз [әдісін](/kz/tools-for-using-services/api/api-spec/network-api/api-dns) `GET /v2/dns/<dns-uuid>`.

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

</tabpanel>
</tabs>

## DNS-аймақты өңдеу

<tabs>
<tablist>
<tab>Жеке кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **DNS** → **DNS-аймақтар**.
1. Қажетті аймақ үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып **Өңдеу**.
1. Өзгерістер енгізіп **Өзгерістерді сақтау**.

</tabpanel>
<tabpanel>

пайдаланыңыз [әдісін](/kz/tools-for-using-services/api/api-spec/network-api/api-dns) `PUT /v2/dns/<dns-uuid>`.

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

</tabpanel>
</tabs>

## DNS ішкі аймағын құру

Ішкі аймақ — бұл ағымдағы аймақтан бір деңгей төмен орналасқан DNS-аймақ. Мысалы `example.com` ішкі аймақ болады `subzone.example.com`.

Ішкі аймақ мынадай түрде құрылуы мүмкін:

- Негізгі аймақ орналасқан сол жобада. Бұл тәсіл ішкі аймақтың ресурстық жазбаларын негізгі аймақтың жазбаларынан бөлу үшін қолданылады.
- Үшінші тарап DNS-провайдерінде.

<warn>

Басқа жобадағы аймақ үшін ішкі аймақ құруға болмайды.

</warn>

VK Cloud жобасында ішкі аймақ құру үшін ішкі аймақ атауымен ішкі аймақты VK Cloud DNS-серверлеріне қайта делегирлейтін екі NS ресурстық жазбасын [құрыңыз](#add).

<info>

Егер ішкі аймақты үшінші тарап провайдерінде құрғыңыз келсе, онда құрылған NS-жазбалар үшінші тарап провайдерінің DNS-серверлерін көрсетуі тиіс.

</info>

NS-жазбаларды құрғаннан кейін делегирленген ішкі домен үшін аймақ құра аласыз.

## {heading(DNS-аймақты жою)[id=delete]}

<tabs>
<tablist>
<tab>Жеке кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

Бұл топтық операция: қажет болса, жалаушалар арқылы бірден бірнеше аймақты жоюға болады.

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **DNS** → **DNS-аймақтар**.
1. Қажетті аймақ үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып **Жою**.
1. Әрекетті растаңыз.

</tabpanel>
<tabpanel>

пайдаланыңыз [әдісін](/kz/tools-for-using-services/api/api-spec/network-api/api-dns) `DELETE /v2/dns/<dns-uuid>`.

Сұрау үлгісі:

```curl

curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/6f981b26-XXXX-XXXX-XXXX-464adb32e5bd' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Жауап үлгісі:

```json
HTTP/1.1 204 No Content
```

</tabpanel>
</tabs>
