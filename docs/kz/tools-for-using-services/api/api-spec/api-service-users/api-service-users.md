{include(/kz/_includes/_translated_by_ai.md)}

REST API Service Users [қызметтік тіркелгі жазбаларын](/kz/tools-for-using-services/account/concepts/service-accounts) басқаруды қолдайды:

- қызметтік тіркелгі жазбаларының тізімін қарау;
- қызметтік тіркелгі жазбаларын қарау, жасау және жою;
- авторизация үшін OpenStack RC-файлын жүктеп алу.

{cut(Endpoint алу, авторизация және аутентификация)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Егер бұл әлі жасалмаса, [екі факторлы аутентификацияны қосыңыз](/kz/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa#vk-cloud-account-manage-2fa-on).
1. Егер бұл әлі жасалмаса, [API арқылы қолжетімділікті қосыңыз](/kz/tools-for-using-services/api/rest-api/enable-api#api_arkyly_kolzhetimdilikti_belsendiru).
1. Бет тақырыбындағы пайдаланушы атына басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. **OpenStack сервисі** блогынан **Service Users** endpoint-ін табыңыз. Егер ол тізімде болмаса, `https://kz.cloud.vk.com/service-users/`. пайдаланыңыз.
1. `X-Auth-Token` [қолжетімділік токенін алыңыз](/kz/tools-for-using-services/api/rest-api/case-keystone-token). Сұрауларды жіберу кезінде токенді тақырыпта пайдаланыңыз.

{/cut}

{note:info}

JSON форматындағы бастапқы спецификацияны [сілтеме](assets/api-service-users.json "download") арқылы жүктеп ала аласыз.

{/note}

![{swagger}](assets/api-service-users.json)
