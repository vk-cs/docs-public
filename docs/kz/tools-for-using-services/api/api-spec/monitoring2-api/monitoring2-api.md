{include(/kz/_includes/_translated_by_ai.md)}

[Cloud Monitoring 2.0](/kz/monitoring-services/monitoring) сервисінің REST API-ы мониторинг агенті жинаған метрикаларды оқуды қолдайды:

- берілген уақыт сәті үшін метрикаларды алу;
- берілген уақыт аралығы үшін метрикаларды алу;
- метрикаларды олардың белгілері бойынша іздеу.

Метрикаларды оқу сұраулары [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/) тілінде құрастырылады.

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. Жобада Cloud Monitoring 2.0 сервисі қосылғанына көз жеткізіңіз, қажет болса оны [техникалық қолдау](/kz/contacts) арқылы қосыңыз.
1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Егер бұл әлі жасалмаса, екі факторлы аутентификацияны [қосыңыз](/kz/access/iam/instructions/manage-2fa#vk-cloud-account-manage-2fa-on).
1. Егер бұл әлі жасалмаса, API арқылы қолжетімділікті [қосыңыз](/kz/tools-for-using-services/api/rest-api/enable-api#api_arkyly_kolzhetimdilikti_belsendiru).
1. Бет тақырыбындағы пайдаланушы атына басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. Cloud Monitoring 2.0 сервисі үшін эндпоинтті табыңыз. Егер ол тізімде болмаса, мынаны пайдаланыңыз:

   - Мәскеу өңірі үшін — `https://cloud.vk.com/monitoring/query/v2`;
   - Қазақстан өңірі үшін — `https://kz.cloud.vk.com/monitoring/query/v2`.

1. `X-Auth-Token` қолжетімділік токенін [алыңыз](/kz/tools-for-using-services/api/rest-api/case-keystone-token).

{/cut}

{note:info}

JSON форматындағы бастапқы спецификацияны [сілтеме](assets/monitoring2-api.json "download") арқылы жүктеп ала аласыз.

{/note}

![{swagger}](assets/monitoring2-api.json)
