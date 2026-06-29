# {heading(Cloud Logging)[id=api-spec-logging]}

{include(/kz/_includes/_translated_by_ai.md)}

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. Жобада Cloud Logging сервисі қосылғанына көз жеткізіңіз, қажет болса оны [техникалық қолдау](/kz/contacts) арқылы қосыңыз.
1. [Өтіңіз](https://kz.cloud.vk.com/app) {var(cloud)} жеке кабинетіне.
1. [Қосыңыз](/kz/access/iam/instructions/manage-2fa), егер бұл әлі жасалмаса, екі факторлы аутентификацияны.
1. [Қосыңыз](/kz/tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate), егер бұл әлі жасалмаса, API арқылы қолжетімділікті.
1. Бет тақырыбындағы пайдаланушы атына басып, **Жоба параметрлері** бөлімін таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. Cloud Logging сервисі үшін эндпоинтті табыңыз. Егер ол тізімде болмаса, `https://mcs.mail.ru/cloudlogs` пайдаланыңыз.
1. `service_id` мәнін біліңіз — ол базалық болуы немесе [техникалық қолдау](/kz/contacts) арқылы жасалуы мүмкін. Базалық мәндер:

   - `default` — әдепкі мән.
   - `databases` — Cloud Databases сервисі ресурстарының логталуы.
   - `containers` — Cloud Containers сервисі ресурстарының логталуы.
   - `vdi` — Cloud Desktop сервисі ресурстарының логталуы.

1. `X-Auth-Token` [қолжетімділік токенін алыңыз](/kz/tools-for-using-services/api/rest-api/case-keystone-token).

{/cut}

{note:info}

JSON форматындағы бастапқы спецификацияны [сілтеме](assets/loggingapi-swagger.json "download") бойынша жүктеп ала аласыз.

{/note}

![{swagger}](assets/loggingapi-swagger.json)
