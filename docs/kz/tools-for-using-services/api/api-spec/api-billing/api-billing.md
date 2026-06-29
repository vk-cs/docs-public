# {heading(Биллинг)[id=api-spec-billing]}

{include(/kz/_includes/_translated_by_ai.md)}

**Биллинг** сервисінің API көмегімен VK Cloud жобасының {linkto(/kz/intro/billing/concepts/balance#billing-balance)[text=балансын]} біле аласыз.

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app).
1. Егер әлі жасалмаған болса, {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=екі факторлы аутентификацияны қосыңыз]}.
1. Егер әлі жасалмаған болса, {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=API арқылы қолжетімділікті қосыңыз]}.
1. `X-Auth-Token` қол жеткізу токенін {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}. Сұрауларды жіберу кезінде токенді тақырыпта пайдаланыңыз.
1. Сұрау жолында жобаңыздың [идентификаторын](/kz/tools-for-using-services/vk-cloud-account/instructions/project-settings/manage#zhoba_identifikatoryn_alu) (PID) көрсете отырып, `https://kz.cloud.vk.com/billing/public/v1/projects/<PID>/balances/amount` эндпоинтін пайдаланыңыз.

Сұрау мысалы:

```console
curl -X GET "https://kz.cloud.vk.com/billing/public/v1/projects/mcs1234567890/balances/amount" -H "X-Auth-Token: abcdef1234567890"
```

{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияны [сілтеме](assets/api-billing.json "download") арқылы жүктеп ала аласыз.
{/note}

![{swagger}](assets/api-billing.json)
