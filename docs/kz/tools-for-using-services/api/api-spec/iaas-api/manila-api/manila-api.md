# {heading(Файлдық сақтауыштарды басқару)[id=api-spec-manila]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{cut(Эндпоинт пен аутентификация токенін алу)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. API арқылы қолжетімділікті әлі қосылмаса, {linkto(../../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]}.
1. Бет тақырыбындағы пайдаланушы атын басып, **Жоба баптаулары** опциясын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack сервисі** блогында **Manila** эндпоинтын табыңыз.
1. `X-Auth-Token` қолжетімділік токенін {linkto(../../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}.

{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияны [сілтеме](./assets/manila-api.json "download") арқылы қол жетімді.
{/note}

![{swagger}](assets/manila-api.json)