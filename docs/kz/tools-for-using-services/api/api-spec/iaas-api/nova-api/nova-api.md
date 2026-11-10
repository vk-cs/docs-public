# {heading(Виртуалдық машиналарды басқару)[id=api-spec-nova]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{cut(Эндпоинт пен аутентификация токенін алу)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. Егер бұрын жасалмаса, API арқылы қолжетімділікті {linkto(../../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]}.
1. Беттің жоғарғы жағындағы пайдаланушы атын басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack сервисі** блогындағы **Nova** эндпоинтін табыңыз.
1. `X-Auth-Token` қолжетімділік токенін {linkto(../../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}.

{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияға [сілтеме](./assets/nova-api.json "download") арқылы қол жеткізуге болады.
{/note}

![{swagger}](assets/nova-api.json)