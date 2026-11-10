# {heading(Дисктерді басқару)[id=api-spec-cinder]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{cut(Эндпоинт және аутентификация токенін алу)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. API арқылы қолжетімділік әлі қосылмаған болса, оны {linkto(../../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]}.
1. Парақтың жоғарғы жағындағы пайдаланушы атауын басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack сервисі** блогындағы **Cinder** эндпоинтін табыңыз.
1. `X-Auth-Token` қолжетімділік токенін {linkto(../../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}.

{/cut}

{note:info}
JSON форматындағы бастапқы спецификация [сілтеме](./assets/cinder-api.json "download") арқылы қолжетімді.
{/note}

![{swagger}](assets/cinder-api.json)