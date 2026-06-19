# {heading(Желілік инфрақұрылым объектілерін басқару)[id=api-spec-neutron-sprut]}

{include(/kz/_includes/_translated_by_ai.md)}

{cut(Эндпоинт пен аутентификация токенін алу)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Егер бұл әлі жасалмаса, екі факторлы аутентификацияны [қосыңыз](/kz/access/iam/instructions/manage-2fa#vk-cloud-account-manage-2fa-on).
1. Егер бұл әлі жасалмаса, API арқылы қолжетімділікті [қосыңыз](/kz/tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate).
1. Бет тақырыбындағы пайдаланушы атына басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack Service** блогынан **Neutron** эндпоинтін табыңыз.
1. `X-Auth-Token` [қолжетімділік токенін алыңыз](../../../rest-api/case-keystone-token).

{/cut}

{note:info}

JSON форматындағы бастапқы спецификация [сілтеме](./assets/neutron-sprut-api.json "download") арқылы қолжетімді.

{/note}

![{swagger}](assets/neutron-sprut-api.json)
