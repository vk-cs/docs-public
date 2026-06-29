# {heading(Дискілерді басқару)[id=api-spec-cinder]}

{include(/kz/_includes/_translated_by_ai.md)}

{cut(Эндпоинт пен аутентификация токенін алу)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. [Қосыңыз](/kz/access/iam/instructions/manage-2fa), егер бұл әлі жасалмаса, екі факторлы аутентификацияны.
1. [Қосыңыз](/kz/tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate), егер бұл әлі жасалмаса, API арқылы қолжетімділікті.
1. Бет тақырыбындағы пайдаланушы атына басып, **Жоба параметрлері** бөлімін таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack Service** блогынан **Cinder** эндпоинтін табыңыз.
1. `X-Auth-Token` [қолжетімділік токенін алыңыз](../../../rest-api/case-keystone-token).

{/cut}

{note:info}

JSON форматындағы бастапқы спецификация [сілтеме](./assets/cinder-api.json "download") бойынша қолжетімді.

{/note}

![{swagger}](assets/cinder-api.json)
