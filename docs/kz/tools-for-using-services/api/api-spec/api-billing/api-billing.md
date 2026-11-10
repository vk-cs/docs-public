# {heading(Биллинг)[id=api-spec-billing]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

**Биллинг** қызметінің API көмегімен VK Cloud жобасының {linkto(../../../../intro/billing/concepts/balance#billing-balance)[text=балансын]} біле аласыз немесе ресурстарды тұтыну туралы {linkto(../../../../intro/billing/concepts/balance#billing-details)[text=гранулярлық есепті]} ала аласыз.

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. API арқылы қолжетімділік әлі қосылмаған болса, оны {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]}.
1. `X-Auth-Token` қолжетімділік токенін {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}. Сұрауларды жіберген кезде токенді заголовкта пайдаланыңыз.
1. Сұрау жолында `https://msk.cloud.vk.ru/billing/public/v1/projects/<PID_ПРОЕКТА>/balances/amount` эндпоинтін қолданыңыз, өз жобаның {linkto(/kz/tools-for-using-services/vk-cloud-account/instructions/project-settings/manage#vk-cloud-account-project-pid)[text=идентификаторын]} (PID) көрсете отырып.

Сұрау мысалы: 

```console
curl -X GET "https://msk.cloud.vk.ru/billing/public/v1/projects/mcs1234567890/balances/amount" \
-H "X-Auth-Token: abcdef1234567890"
```

{/cut}

{note:info}
JSON пішіміндегі бастапқы спецификацияны [сілтеме](assets/api-billing.json "download") арқылы жүктеп алуға болады.
{/note}

![{swagger}](assets/api-billing.json)