# {heading(Cloud Desktop)[id=api-spec-vdi]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{linkto(../../../../computing/cloud-desktops#cloud-desktops)[text=Cloud Desktop]} сервисінің API жұмыс үстелдерінің пулдарын және олардағы жұмыс үстелдерін басқаруға мүмкіндік береді.

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. API арқылы қолжетімділік әлі қосылмаса, оны {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]}.
1. Беттің жоғарғы жағындағы пайдаланушы атын басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API Endpoints** қойындысына өтіңіз.
1. Cloud Desktop сервисі үшін эндпоинтті табыңыз. Егер ол тізімде болмаса, `https://msk.cloud.vk.ru/vdi/v1/` мекенжайын пайдаланыңыз.
1. `X-Auth-Token` қолжетімділік токенін {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}.

{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияны [сілтеме](assets/vdiapi-swagger.json "download") арқылы жүктеп алуға болады.
{/note}

![{swagger}](assets/vdiapi-swagger.json)