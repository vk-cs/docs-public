# {heading(Cloud Databases)[id=api-spec-dbaas]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{linkto(../../../../dbs/dbaas#dbaas-dbaas)[text=Cloud Databases]} сервисінің API бұлтты дерекқорлармен жұмыс істеуді қолдайды:

- инстанстардың, кластерлердің және деректер қоймаларының мүмкіндіктері туралы ақпарат алу;
- дерекқорларды, деректер қоймаларын, инстанстарды және кластерлерді басқару;
- конфигурацияларды басқару;
- резервтік көшірмелеуді басқару;
- пайдаланушыларды басқару;
- биллинг журналын көру.

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. API арқылы қолжетімділікті әлі жасалмаса, {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]}.
1. Беттің жоғарғы жағындағы пайдаланушы атын басып, **Жобаны баптау** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack сервисі** блогынан **Trove** эндпоинтін тауып алыңыз.
1. `X-Auth-Token` қолжетімділік токенін {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}.

{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияны [сілтеме](assets/dbaasapi-swagger.json "download") арқылы жүктеп алуға болады.
{/note}

![{swagger}](assets/dbaasapi-swagger.json)