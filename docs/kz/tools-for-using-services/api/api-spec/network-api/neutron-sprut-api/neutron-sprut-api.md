# {heading(Желі инфрақұрылымы объектілерін басқару)[id=api-spec-neutron-sprut]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{cut(Эндпоинт пен аутентификация токенін алу)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. API арқылы қол жетімділікті әлі қосылмаса, {linkto(../../../rest-api/enable-api#rest-api-enable-activate)[text=Қосыңыз]}.
1. Беттің жоғарғы жағындағы пайдаланушы атын басып, **Жобаның баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack сервисі** блогындағы **Neutron** эндпоинтін табыңыз.
1. `X-Auth-Token` қолжетімділік токенін {linkto(../../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}.

{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияға [сілтеме](./assets/neutron-sprut-api.json "download") арқылы қол жеткізуге болады.
{/note}

![{swagger}](assets/neutron-sprut-api.json)