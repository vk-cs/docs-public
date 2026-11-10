# {heading(ВМ бейнелерін басқару)[id=api-spec-glance]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{cut(Эндпоинт пен аутентификация токенін алу)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. API арқылы қолжетімділік әлі қосылмаған болса, оны {linkto(../../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]}.
1. Бет тақырыбындағы пайдаланушы атын басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack сервисі** блогынан **Glance** эндпоинтын тауып алыңыз.
1. `X-Auth-Token` қолжетімділік токенін {linkto(../../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}.

{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияны [сілтеме](./assets/glance-api.json "download") арқылы қарауға болады.
{/note}

![{swagger}](assets/glance-api.json)