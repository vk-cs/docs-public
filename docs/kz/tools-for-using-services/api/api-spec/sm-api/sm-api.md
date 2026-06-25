# {heading(Құпиялар менеджері)[id=api-spec-sm]}

{include(/kz/_includes/_translated_by_ai.md)}

API {linkto(../../../../security/secret-manager#security-secret-manager)[text=құпиялар менеджері]} құпияларды және олардың нұсқаларын басқаруға мүмкіндік береді.

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).
1. Егер әлі жасалмаған болса, екі факторлы аутентификацияны {linkto(../../../vk-cloud-account/instructions/account-manage/manage-2fa#vk-cloud-account-manage-2fa-on)[text=қосыңыз]}.
1. Егер әлі жасалмаған болса, API арқылы қолжетімділікті {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]}.
1. Беттің жоғарғы бөлігіндегі пайдаланушы атына басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. Құпиялар менеджері үшін эндпоинтті табыңыз. Егер ол тізімде болмаса, `https://msk.cloud.vk.com/kms/user/v1/` пайдаланыңыз.
1. Қолжетімділік токенін `X-Auth-Token` {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}.

{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияны [сілтеме](assets/sm-api.json "download") арқылы жүктей аласыз.
{/note}

![{swagger}](assets/sm-api.json)
