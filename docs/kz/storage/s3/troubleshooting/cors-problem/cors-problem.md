# {heading(Веб-қосымша арқылы бакетке файлдарды жүктеу кезінде CORS қатесі)[id=s3-cors-problem]}

{include(/kz/_includes/_translated_by_ai.md)}

Веб-қосымша {var(s3)} бакетіне файл жүктеуге тырысады, бірақ сұрау браузер тарапынан бұғатталады. Әзірлеуші консолінде {linkto(../../concepts/access/s3-cors#s3-concepts-cors)[text=CORS]} ережелеріне қатысты қате көрсетіледі, мысалы, `Access to XMLHttpRequest at '...' from origin '...' has been blocked by CORS policy`.

Мәселе веб-браузердің Same-Origin Policy (SOP) қауіпсіздік механизміне байланысты туындайды. Бұл механизм бір дереккөздегі (origins) скриптке басқа дереккөзге сұрау жіберуге тыйым салады, егер бұл айқын түрде рұқсат етілмесе. Мұндай өзара әрекеттесуге рұқсат беру үшін {var(s3)} арнайы HTTP тақырыптарын қайтаруы керек.

### {heading(Шешімі)[id=s3-cors-problem-resolve]}

{linkto(../../concepts/access/s3-cors#s3-concepts-cors)[text=CORS]} ережелерін тексеріп, түзетіңіз:

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Объектілік қойма** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет үшін ![Меню](../../assets/more-icon.svg "inline") түймесін басып, **Баптаулар** тармағын таңдаңыз.
1. **CORS** қойындысына өтіңіз.
1. CORS ережесін {linkto(../../instructions/access-management/cors#s3-instructions-cors)[text=қосыңыз немесе өңдеңіз]}:

   - `AllowedOrigins`: веб-қосымшаңыздың доменін көрсетіңіз. `*` таңбасын қолдану кез келген доменнен қол жеткізуге рұқсат береді.
   - `AllowedMethods`: веб-қосымшаңыз жүктеу үшін қолданатын HTTP әдісін көрсетіңіз, мысалы, `PUT` немесе `POST`.
   - `AllowedHeaders`: веб-қосымшадан келетін сұраулар үшін рұқсат етілген тақырыптарды көрсетіңіз, мысалы, `Content-Type`, `Authorization`, `x-amz-acl`. `*` таңбасын қолдану кез келген тақырыптары бар сұрауларға рұқсат береді.
