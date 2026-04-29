{include(/kz/_includes/_translated_by_ai.md)}

{cut(Эндпоинт пен аутентификация токенін алу)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Егер бұл әлі жасалмаса, екі факторлы аутентификацияны [қосыңыз](/kz/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa#vk-cloud-account-manage-2fa-on).
1. Егер бұл әлі жасалмаса, API арқылы қолжетімділікті [қосыңыз](/kz/tools-for-using-services/api/rest-api/enable-api#api_arkyly_kolzhetimdilikti_belsendiru).
1. Бет тақырыбындағы пайдаланушы атына басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack Service** блогынан **Octavia** эндпоинтін табыңыз.
1. `X-Auth-Token` [қолжетімділік токенін алыңыз](../../../rest-api/case-keystone-token).

{/cut}

{note:info}

JSON форматындағы бастапқы спецификация [сілтеме](./assets/octavia-api.json "download") арқылы қолжетімді.

{/note}

![{swagger}](assets/octavia-api.json)