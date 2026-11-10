# {heading(Жүктеме балансирлеушілерін басқару)[id=api-spec-octavia]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{cut(Эндпоинт пен аутентификация токенін алу)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. Егер бұрын жасалмаса, {linkto(../../../rest-api/enable-api#rest-api-enable-activate)[text=API арқылы қолжетімділікті қосыңыз]}.
1. Беттің жоғарғы жағындағы пайдаланушы атын басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack сервисі** блогында **Octavia** эндпоинтын тауып алыңыз.
1. `X-Auth-Token` қолжетімділік токенін {linkto(../../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}.

{/cut}

{note:info}
Түпнұсқа JSON форматындағы спецификация [сілтеме](./assets/octavia-api.json "download") бойынша қолжетімді.
{/note}

![{swagger}](assets/octavia-api.json)