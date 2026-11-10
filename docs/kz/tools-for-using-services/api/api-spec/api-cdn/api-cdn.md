# {heading(CDN)[id=api-spec-cdn]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{linkto(../../../../networks/cdn#cdn)[text=CDN]} REST API CDN-ресурстарының жұмысын басқаруды және мониторингті қолдайды:

- ағымдағы аккаунттың канондық домендік жазбасын (CNAME) көру;
- дереккөздер топтарын жасау және басқару;
- CDN-ресурстарды жасау және басқару;
- [Let's Encrypt](https://letsencrypt.org/ru/) сертификатын алу және қайтару;
- SSL-сертификаттарды көру, қосу, өзгерту, жою;
- файлдарды CDN-серверге алдын ала жүктеу;
- CDN-сервердің кешін тазарту;
- CDN-ресурстардың жұмыс қабілеттілігін мониторингтеу.

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. API арқылы қолжетімділік әлі қосылмаған болса, оны {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]}.
1. Бет тақырыбындағы пайдаланушы атын басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API арқылы қолжетімділік** қойындысына өтіңіз.
1. `X-Auth-Token` қолжетімділік токенін {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}. Сұрауларды жіберген кезде токенді тақырыпта пайдаланыңыз.
1. Сұрау жолында `https://msk.cloud.vk.ru/api/cdn/api/v1/` эндпоинтін пайдаланыңыз.

Сұрау мысалы:

```curl
curl --location "https://msk.cloud.vk.ru/api/cdn/api/v1/projects/example4ef0547e5b222f/resources" \
--header "X-Auth-Token: gAAAAABlcqk9GAzdp-XXXX"
```

{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияны [сілтеме](assets/api-cdn.json "download") арқылы жүктеп алуға болады.
{/note}

![{swagger}](assets/api-cdn.json)