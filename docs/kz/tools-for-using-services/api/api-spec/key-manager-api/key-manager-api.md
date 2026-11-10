# {heading(Кілттер менеджері)[id=api-spec-km]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{linkto(../../../../security/key-manager#security-key-manager)[text=Кілттер менеджерінің]} API шифрлау кілттерін және олардың нұсқаларын басқаруға мүмкіндік береді.

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. Егер бұрын жасалмаса, {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=қосыңыз]} екі факторлы аутентификацияны.
1. Егер бұрын жасалмаса, {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]} API арқылы қолжетімділікті.
1. Беттің жоғарғы жағындағы пайдаланушы атын басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. Кілттер менеджеріне арналған эндпоинтті табыңыз. Егер ол тізімде болмаса, `https://msk.cloud.vk.ru/kms/user/v1/` мекенжайын пайдаланыңыз.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Алыңыз]} `X-Auth-Token` қолжетімділік токенін.

{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияны [сілтеме](assets/key-manager-api.json "download") арқылы жүктеп алуға болады.
{/note}

![{swagger}](assets/key-manager-api.json)