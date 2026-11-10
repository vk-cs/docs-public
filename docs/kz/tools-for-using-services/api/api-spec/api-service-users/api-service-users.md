# {heading(Сервистік тіркелгілер)[id=api-spec-service-users]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

REST API Service Users {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервистік тіркелгілерді]} басқаруды қолдайды:

- сервистік тіркелгілер тізімін көру;
- сервистік тіркелгілерді көру, жасау және жою;
- авторизацияға арналған OpenStack RC-файлын жүктеу.

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. API арқылы қолжетімділік әлі қосылмаған болса, оны {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]}.
1. Беттің жоғарғы жағындағы пайдаланушы атауын басып, **Жобаның баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack қызметі** блогынан **Service Users** эндпоинтын тауып алыңыз. Ол тізімде болмаса, `https://msk.cloud.vk.ru/service-users/` мекенжайын пайдаланыңыз.
1. `X-Auth-Token` рұқсат токенін {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}. Сұрауларды жіберуде токенді тақырыпта (header) пайдаланыңыз.

{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияны [сілтеме](assets/api-service-users.json "download") арқылы жүктеп алуға болады.
{/note}

![{swagger}](assets/api-service-users.json)