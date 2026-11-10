# {heading(Аймақтар)[id=tools-account-concepts-regions]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Аймақ — {linkto(../../../../start/concepts/architecture#architecture-az)[text=қолжетімділік аймақтарын]} біріктіретін географиялық аймақ.

Аймақ әрбір {linkto(../projects#tools-account-concepts-projects)[text=жобаларға]} автоматты түрде тағайындалады және жоба иесі аккаунтын {linkto(../../../../intro/onboarding/account#onboarding-account)[text=тіркеген]} сайттың URL мекенжайына байланысты.

Объекттерді (мысалы, виртуалды машиналарды) жоба жасалған аймақтың қолжетімділік аймағында ғана жасауға болады.

{note:warn}
Барлық аймақтарда бірыңғай пайдаланушылар базасы бар. Әртүрлі аймақтарда бір электрондық поштамен аккаунттарды тіркеу мүмкін емес.
{/note}

Келесі аймақтар қолжетімді:

[cols="1,1,1,1", options="header"]
|===
| Аймақ
| Қолжетімділік аймақтары
| Сайттың URL мекенжайы
| Жобалардың валютасы

| Мәскеу
| `GZ1`

`MS1`

`ME1`

`PA2`
| https://cloud.vk.ru
| Рубль

| Қазақстан
| `QAZ`

`KTP`
| https://vkcloud.kz

https://kz.cloud.vk.kz
| Теңге

|===

Әртүрлі аймақтарда жасалған жобаларда мыналар ерекшеленеді:

- қолжетімді қызметтердің жиынтығы;
- {linkto(../quotasandlimits#tools-account-concepts-quotasandlimits)[text=квоталардың]} жиынтығы;
- {linkto(../../../api/rest-api/endpoints#rest-api-endpoints)[text={var(cloud)} API эндпоинттерінің]} мекенжайлары;
- {linkto(../../../cli/openstack-cli#openstack-authorize)[text=openrc]} және {linkto(../../../terraform/quick-start#terraform-quick-start)[text=Terraform]} конфигурация файлдарындағы аймақ атауы.

{note:warn}
Әртүрлі аймақтардағы жобалардың виртуалды желілерін стандартты тәсілдермен біріктіру мүмкін емес. Мұндай жобалар арасындағы желілік байланысты {linkto(../../../../networks/vnet/how-to-guides/onpremise-connect/vpn-tunnel#vnet-vpn-tunnel)[text=VPN-туннель]} көмегімен конфигурациялауға болады.
{/note}