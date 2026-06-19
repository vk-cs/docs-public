# {heading(Аймақтар)[id=tools-account-concepts-regions]}

{include(/kz/_includes/_translated_by_ai.md)}

Аймақ — [қолжетімділік аймақтарын](/kz/start/concepts/architecture#az) біріктіретін географиялық аумақ.

Аймақ әрбір [жобаға](../projects) автоматты түрде тағайындалады және жоба иесі өз аккаунтын [тіркеген](/kz/intro/onboarding/account) сайттың URL мекенжайына байланысты болады.

Нысандарды (мысалы, виртуалды машиналарды) тек жоба құрылған аймақтың қолжетімділік аймағында ғана жасауға болады.

{note:warn}

Барлық аймақтарда пайдаланушылардың бірыңғай дерекқоры бар. Бірдей поштамен әртүрлі аймақтарда есептік жазбаларды тіркеу мүмкін емес.

{/note}

Келесі аймақтар қолжетімді:

[cols="1,1,1,1", options="header"]
|===
| Аймақ
| Қолжетімділік аймақтары
| Сайт URL мекенжайы
| Жобалар валютасы

| Мәскеу
| `GZ1`

`MS1`

`ME1`

`PA2`
| https://cloud.vk.com
| Рубль

| Қазақстан
| `QAZ`

`KTP`
| https://vkcloud.kz

https://kz.cloud.vk.com
| Теңге

|===

Әртүрлі аймақтарда құрылған жобаларда мынадай айырмашылықтар бар:

- қолжетімді сервистер жиынтығы;
- [квоталар](../quotasandlimits) жиынтығы;
- [эндпоинттер {var(cloud)} API](/kz/tools-for-using-services/api/rest-api) мекенжайлары;
- [openrc](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) және [Terraform](/kz/tools-for-using-services/terraform/quick-start) конфигурация файлдарындағы аймақ атауы.

{note:warn}

Әртүрлі аймақтардағы жобалардың виртуалды желілерін стандартты тәсілдермен біріктіру мүмкін емес. Мұндай жобалар арасындағы желілік байланыстылықты [VPN-туннелі](/kz/networks/vnet/how-to-guides/onpremise-connect/vpn-tunnel) арқылы баптауға болады.

{/note}
