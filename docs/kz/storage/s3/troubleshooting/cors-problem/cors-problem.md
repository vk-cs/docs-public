# {heading(Бакетке веб-қосымша арқылы файл жүктегенде пайда болатын CORS қатесі)[id=s3-cors-problem]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Веб-қосымша {var(s3)} бакетіне файл жүктемекіші болады, бірақ сұрау браузермен блокталады. Әзірлеуші консолінде {linkto(../../concepts/access/s3-cors#s3-concepts-cors)[text=CORS]} ережелерімен байланысты қате көрсетіледі, мысалы, `Access to XMLHttpRequest at '...' from origin '...' has been blocked by CORS policy`.

Мәселе Same-Origin Policy (SOP) веб-браузерінің қауіпсіздік механизміне байланысты пайда болады. Бұл механизм бір дереккөрдегі (origins) скриптке айқын рұқсат етілмесе, басқа дереккөрге сұраулар жасауға тыйым салады. Мұндай өзара әрекеттесуге рұқсат беру үшін {var(s3)} арнайы HTTP-тақырыпшаларын қайтаруы керек.

### {heading(Шешім)[id=s3-cors-problem-resolve]}

{linkto(../../concepts/access/s3-cors#s3-concepts-cors)[text=CORS]} ережелерін тексеріңіз және түзетіңіз:

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../instructions/iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет үшін ![Мәзір](../../assets/more-icon.svg "inline") түймесін басып, **Параметрлер** тармағын таңдаңыз.
1. **CORS** қойындысына өтіңіз.
1. CORS ережесін {linkto(../../instructions/access-management/cors#s3-instructions-cors)[text=қосыңыз немесе өңдеңіз]}:

   - `AllowedOrigins`: веб-қосымшаңыздың доменін көрсетіңіз. `*` таңбасын пайдалану кез келген доменнен кіруге рұқсат береді.
   - `AllowedMethods`: веб-қосымшаңыз жүктеу үшін пайдаланатын HTTP-әдісін көрсетіңіз, мысалы, `PUT` немесе `POST`.
   - `AllowedHeaders`: веб-қосымшадан келетін сұраулардың рұқсат етілген тақырыпшаларын көрсетіңіз, мысалы, `Content-Type`, `Authorization`, `x-amz-acl`. `*` таңбасын пайдалану кез келген тақырыпшалары бар сұрауларға рұқсат береді.