# {heading(Cloud Logging)[id=api-spec-logging]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. Жобада Cloud Logging қызметі қосулы екеніне көз жеткізіңіз, қажет болса оны [техникалық қолдау көрсету](/kz/contacts) арқылы қосыңыз.
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. Егер әлі жасалмаса, API арқылы қолжетімділікті {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]}.
1. Бет тақырыбындағы пайдаланушы атын басып, **Настройки проекта** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. Cloud Logging қызметіне арналған эндпоинтті табыңыз. Егер ол тізімде болмаса, `https://mcs.mail.ru/cloudlogs` мекенжайын қолданыңыз.
1. `service_id` мәнін анықтаңыз — ол базалық болуы мүмкін немесе [техникалық қолдау көрсету](/kz/contacts) арқылы жасалған. Базалық мәндер:

   - `default` — әдепкі мән.
   - `databases` — Cloud Databases қызметі ресурстарын логтау.
   - `containers` — Managed Containers қызметі ресурстарын логтау.
   - `vdi` — Cloud Desktop қызметі ресурстарын логтау.

1. `X-Auth-Token` қолжетімділік токенін {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}.

{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияны [сілтеме](assets/loggingapi-swagger.json "download") арқылы жүктеп алуға болады.
{/note}

![{swagger}](assets/loggingapi-swagger.json)