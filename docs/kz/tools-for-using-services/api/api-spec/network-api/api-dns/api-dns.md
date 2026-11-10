# {heading(Жариялы DNS аймақтарын басқару)[id=api-spec-dns]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{linkto(../../../../../networks/dns/instructions/publicdns#dns-publicdns)[text=Жариялы DNS]} REST API ресурстарды басқаруды қолдайды:

- DNS-аймақтары мен олардың жазбаларының тізімдерін көру;
- DNS-аймақтары мен олардың жазбаларын жасау;
- DNS-аймақтары мен олардың жазбаларының параметрлерін көру;
- DNS-аймақтары мен олардың жазбаларын өзгерту;
- DNS-аймақтары мен олардың жазбаларын жою.

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. API арқылы қолжетімділік әлі қосылмаған болса, оны {linkto(../../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]}.
1. Беттің жоғарғы жағындағы пайдаланушы атын басып, **Настройки проекта** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **Сервис OpenStack** блогінен **Publicdns** эндпоинтын табыңыз.
1. `X-Auth-Token` қолжетімділік токенін {linkto(../../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}. Сұраныстар жіберген кезде токенді тақырыпта пайдаланыңыз.

Сұраныс мысалы:

```curl
curl --location "https://mcs.mail.ru/public-dns/v2/dns/" \
--header "X-Auth-Token: gAAAAABlLjgzyxXXXX" \
--header "Content-Type: application/json"
```
{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияны [сілтеме](assets/public-dns-api.json "download") арқылы жүктеп алуға болады.
{/note}

![{swagger}](assets/public-dns-api.json)