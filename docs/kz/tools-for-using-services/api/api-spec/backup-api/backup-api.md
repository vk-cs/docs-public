# {heading(Cloud Backup)[id=api-spec-karboii]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. Егер бұл әлі жасалмаса, {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Қосыңыз]} API арқылы қолжетімділікті.
1. Беттің жоғарғы жағындағы пайдаланушы атын басып, **Жобаның баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack сервисі** блогынан **Karboii** эндпоинтін тауып алыңыз.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Алыңыз]} `X-Auth-Token` қолжетімділік токенін.

{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияны [сілтеме](assets/karboiiapi-swagger.json "download") арқылы жүктеп алуға болады.
{/note}

![{swagger}](assets/karboiiapi-swagger.json)