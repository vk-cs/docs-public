# {heading(CDN-ресурсын қосу және өшіру)[id=cdn-enable-cdn]}

{include(/kz/_includes/_translated_by_ai.md)}

**Контентке соңғы пайдаланушылардың қол жеткізуі** опциясы CDN-ресурсының қолжетімділігіне әсер етеді:

- Егер опция өшірілсе, CDN-ресурсы `Приостановлен` күйіне өтеді және контент {linkto(../../../../../networks/dns/concepts#cdn-about)[text=тұтынушыларға]} жеткізілмейді.
- Егер опция қосылса, CDN-ресурсы `Активен` күйіне өтеді және контент тұтынушыларға жеткізіледі.

CDN-ресурсын қосу үшін:

{tabs}

{tab(Жеке кабинет)}

{include(../../../../../_includes/_open-cdn.md)}

1. **Негізгі баптаулар** қойындысына өтіңіз.
1. **Контентке соңғы пайдаланушылардың қол жеткізуі** опциясын қосыңыз.
1. **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{tab(API)}

{include(../../../../../_includes/_api_cdn_create_change.md)}

Сұрау денесінде `active` параметрінде мына мәнді көрсетіңіз:

- `true` — ресурс белсенді, контент беріледі;
- `false` — ресурс уақытша тоқтатылған, контент берілмейді.

CDN-ресурсын уақытша тоқтатуға арналған сұрау мысалы:

```json
curl --location --request PUT 'https://kz.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "active": false
}'
```

{/tab}

{/tabs}