{include(/kz/_includes/_translated_by_ai.md)}

[Cloud Databases](/kz/dbs/dbaas) сервисінің API бұлттық дерекқорлармен жұмыс істеуді қолдайды:

- инстанстардың, кластерлердің және деректер қоймаларының мүмкіндіктері туралы ақпарат алу;
- дерекқорларды, деректер қоймаларын, инстанстар мен кластерлерді басқару;
- конфигурацияларды басқару;
- резервтік көшіруді басқару;
- пайдаланушыларды басқару;
- биллинг журналын қарау.

{cut(Endpoint алу, авторизация және аутентификация)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Егер бұл әлі жасалмаса, [екі факторлы аутентификацияны қосыңыз](/kz/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa#vk-cloud-account-manage-2fa-on).
1. Егер бұл әлі жасалмаса, [API арқылы қолжетімділікті қосыңыз](/kz/tools-for-using-services/api/rest-api/enable-api#api_arkyly_kolzhetimdilikti_belsendiru).
1. Бет тақырыбындағы пайдаланушы атына басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack сервисі** блогынан **Trove** endpoint-ін табыңыз.
1. `X-Auth-Token` [қолжетімділік токенін алыңыз](../../rest-api/case-keystone-token).

{/cut}

{note:info}

JSON форматындағы бастапқы спецификацияны [сілтеме](assets/dbaasapi-swagger.json "download") арқылы жүктеп ала аласыз.

{/note}

![{swagger}](assets/dbaasapi-swagger.json)
