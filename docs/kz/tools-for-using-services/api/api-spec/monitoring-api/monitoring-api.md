# {heading(Cloud Monitoring)[id=api-spec-monitoring2]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{linkto(../../../../monitoring-services/monitoring#monitoring)[text=Cloud Monitoring]} сервисінің REST API мониторинг агентімен жиналған метрикактерді оқуға қолдау көрсетеді:

- берілген уақыт мезеті үшін метрикактерді алу;
- берілген уақыт диапазоны үшін метрикактерді алу;
- метрикактерді олардың белгілері бойынша іздеу.

Метрикактерді оқу сұраулары [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/) тілінде қалыптастырылады.

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. Жобада Cloud Monitoring сервисі қосылғанына көз жеткізіңіз, қажет болса оны [техникалық қолдау көрсету](/kz/contacts) арқылы қосыңыз.
1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app).
1. Егер әлі жасалмаса, API бойынша қолжетімділікті {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]}.
1. Беттің жоғарғы жағындағы пайдаланушы атын басып, **Настройки проекта** (Жоба баптаулары) тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. Cloud Monitoring сервисі үшін эндпоинтті табыңыз. Егер ол тізімде болмаса, мыналарды пайдаланыңыз:

   - Москва өңірі үшін — `https://cloud.vk.ru/monitoring/query/v2`;
   - Казахстан өңірі үшін — `https://kz.cloud.vk.kz/monitoring/query/v2`.

1. `X-Auth-Token` қолжетімділік токенін {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}.

{/cut}

{note:info}
JSON пішіміндегі бастапқы спецификацияны [сілтеме](assets/monitoring-api.json "download") арқылы жүктеп алуға болады.
{/note}

![{swagger}](assets/monitoring-api.json)