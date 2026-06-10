{include(/kz/_includes/_translated_by_ai.md)}

[Cloud Desktop](/kz/computing/cloud-desktops) сервисінің API-ы жұмыс үстелдері пулдарын және олардың ішіндегі жұмыс үстелдерін басқаруға мүмкіндік береді.

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Егер бұл әлі жасалмаса, екі факторлы аутентификацияны [қосыңыз](/kz/access/iam/instructions/manage-2fa#vk-cloud-account-manage-2fa-on).
1. Егер бұл әлі жасалмаса, API арқылы қолжетімділікті [қосыңыз](/kz/tools-for-using-services/api/rest-api/enable-api#api_arkyly_kolzhetimdilikti_belsendiru).
1. Бет тақырыбындағы пайдаланушы атына басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. Cloud Desktop сервисі үшін эндпоинтті табыңыз. Егер ол тізімде болмаса, `https://kz.cloud.vk.com/vdi/v1/`. пайдаланыңыз.
1. `X-Auth-Token` қолжетімділік токенін [алыңыз](../../rest-api/case-keystone-token).

{/cut}

{note:info}

JSON форматындағы бастапқы спецификацияны [сілтеме](assets/vdiapi-swagger.json "download") арқылы жүктеп ала аласыз.

{/note}

![{swagger}](assets/vdiapi-swagger.json)
