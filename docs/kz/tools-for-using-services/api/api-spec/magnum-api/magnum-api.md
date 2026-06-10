{include(/kz/_includes/_translated_by_ai.md)}

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. [Қосыңыз](/kz/access/iam/instructions/manage-2fa#vk-cloud-account-manage-2fa-on), егер бұл әлі жасалмаса, екі факторлы аутентификацияны.
1. [Қосыңыз](/kz/tools-for-using-services/api/rest-api/enable-api#api_arkyly_kolzhetimdilikti_belsendiru), егер бұл әлі жасалмаса, API арқылы қолжетімділікті.
1. Бет тақырыбындағы пайдаланушы атына басып, **Жоба параметрлері** бөлімін таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack Service** блогынан **Magnum** эндпоинтін табыңыз.
1. `X-Auth-Token` [қолжетімділік токенін алыңыз](/kz/tools-for-using-services/api/rest-api/case-keystone-token).

{/cut}

{note:info}

JSON форматындағы бастапқы спецификацияны [сілтеме](assets/magnumapi-swagger.json "download") бойынша жүктеп ала аласыз.

{/note}

![{swagger}](assets/magnumapi-swagger.json)
