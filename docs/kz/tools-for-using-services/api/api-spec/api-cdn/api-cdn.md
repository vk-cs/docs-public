# {heading(CDN)[id=api-spec-cdn]}

{include(/kz/_includes/_translated_by_ai.md)}

REST API [CDN](/kz/networks/cdn) CDN ресурстарының жұмысын басқару мен мониторингтеуді қолдайды:

- ағымдағы аккаунттың канондық домендік жазбасын (CNAME) қарау;
- бастау көздері топтарын жасау және басқару;
- CDN ресурстарын жасау және басқару;
- [Let's Encrypt](https://letsencrypt.org/kz/) сертификатын алу және кері қайтарып алу;
- SSL сертификаттарын қарау, қосу, өзгерту, жою;
- файлдарды CDN серверіне алдын ала жүктеу;
- CDN серверінің кэшін тазалау;
- CDN ресурстарының жұмысқа қабілеттілігін мониторингтеу.

{cut(Endpoint алу, авторизация және аутентификация)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) {var(cloud)} жеке кабинетіне.
1. Егер бұл әлі жасалмаса, [екі факторлы аутентификацияны қосыңыз](/kz/access/iam/instructions/manage-2fa#vk-cloud-account-manage-2fa-on).
1. Егер бұл әлі жасалмаса, [API арқылы қолжетімділікті қосыңыз](/kz/tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate).
1. Бет тақырыбындағы пайдаланушы атына басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API арқылы қолжетімділік** қойындысына өтіңіз.
1. `X-Auth-Token` [қолжетімділік токенін алыңыз](/kz/tools-for-using-services/api/rest-api/case-keystone-token). Сұрауларды жіберу кезінде токенді тақырыпта пайдаланыңыз.
1. Сұрау жолында `https://kz.cloud.vk.com/api/cdn/api/v1/` endpoint-ін пайдаланыңыз.

Сұрау мысалы:

```curl
curl --location "https://kz.cloud.vk.com/api/cdn/api/v1/projects/example4ef0547e5b222f/resources" \
--header "X-Auth-Token: gAAAAABlcqk9GAzdp-XXXX"
```

{/cut}

{note:info}

JSON форматындағы бастапқы спецификацияны [сілтеме](assets/api-cdn.json "download"). арқылы жүктеп ала аласыз.

{/note}

![{swagger}](assets/api-cdn.json)
