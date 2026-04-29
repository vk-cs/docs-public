{include(/kz/_includes/_translated_by_ai.md)}

{cut(Эндпоинт пен аутентификация токенін алу)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. [Қосыңыз](/kz/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa#vk-cloud-account-manage-2fa-on), егер бұл әлі жасалмаса, екі факторлы аутентификацияны.
1. [Қосыңыз](/kz/tools-for-using-services/api/rest-api/enable-api#api_arkyly_kolzhetimdilikti_belsendiru), егер бұл әлі жасалмаса, API арқылы қолжетімділікті.
1. Бет тақырыбындағы пайдаланушы атына басып, **Жоба параметрлері** бөлімін таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack Service** блогынан **Glance** эндпоинтін табыңыз.
1. `X-Auth-Token` [қолжетімділік токенін алыңыз](../../../rest-api/case-keystone-token).

{/cut}

{note:info}

JSON форматындағы бастапқы спецификация [сілтеме](./assets/glance-api.json "download") бойынша қолжетімді.

{/note}

![{swagger}](assets/glance-api.json)