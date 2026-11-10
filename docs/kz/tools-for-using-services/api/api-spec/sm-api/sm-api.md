# {heading(Құпиялар менеджері)[id=api-spec-sm]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{linkto(../../../../security/secret-manager#security-secret-manager)[text=Құпиялар менеджерінің]} API құпияларды және олардың нұсқаларын басқаруға мүмкіндік береді.

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. API арқылы қолжетімділік әлі қосылмаған болса, оны {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]}.
1. Беттің жоғарғы жағындағы пайдаланушы атын басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. Құпиялар менеджері үшін эндпоинтті табыңыз. Егер ол тізімде болмаса, `https://msk.cloud.vk.ru/kms/user/v1/` мекенжайын пайдаланыңыз.
1. `X-Auth-Token` қолжетімділік токенін {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}.

{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияны [сілтеме](assets/sm-api.json "download") арқылы жүктеп алуға болады.
{/note}

![{swagger}](assets/sm-api.json)