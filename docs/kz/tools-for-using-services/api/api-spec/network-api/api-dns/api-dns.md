# {heading(Жария DNS аймақтарын басқару)[id=api-spec-dns]}

{include(/kz/_includes/_translated_by_ai.md)}

[жария DNS](/kz/networks/dns/instructions/publicdns) REST API-ы келесі ресурстарды басқаруды қолдайды:

- DNS аймақтарының және олардың жазбаларының тізімдерін қарау;
- DNS аймақтарын және олардың жазбаларын құру;
- DNS аймақтарының және олардың жазбаларының параметрлерін қарау;
- DNS аймақтарын және олардың жазбаларын өзгерту;
- DNS аймақтарын және олардың жазбаларын жою.

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Егер бұл әлі жасалмаса, екі факторлы аутентификацияны [қосыңыз](/kz/access/iam/instructions/manage-2fa).
1. Егер бұл әлі жасалмаса, API арқылы қолжетімділікті [қосыңыз](/kz/tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate).
1. Бет тақырыбындағы пайдаланушы атына басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack Service** блогынан **Publicdns** эндпоинтін табыңыз.
1. `X-Auth-Token` қолжетімділік токенін [алыңыз](/kz/tools-for-using-services/api/rest-api/case-keystone-token). Сұрауларды жіберу кезінде токенді тақырыпта пайдаланыңыз.

Сұрау үлгісі:

```curl
curl --location "https://mcs.mail.ru/public-dns/v2/dns/" --header "X-Auth-Token: gAAAAABlLjgzyxXXXX" --header "Content-Type: application/json"
```
{/cut}

{note:info}

JSON форматындағы бастапқы спецификацияны [сілтеме](assets/public-dns-api.json "download") арқылы жүктеп ала аласыз.

{/note}

![{swagger}](assets/public-dns-api.json)
