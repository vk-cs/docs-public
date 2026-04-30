{include(/kz/_includes/_translated_by_ai.md)}

Жоюдан немесе қайта жазудан қорғауды тек осындай мүмкіндік [нақты көрсетіліп](../../buckets/create-bucket#ways_to_create_bucket) жасалған бакеттердегі объектілер үшін ғана орнатуға болады.

## Әдепкі уақытша бұғаттау

Әдепкі уақытша бұғаттау (`DefaultRetention`) бакет деңгейінде орнатылады. Ол бакетке жүктелетін барлық жаңа объектілерге қолданылады және бұрын жүктелген объектілерге таралмайды.
Әдепкі бұғаттауды орнату міндетті емес.

{note:warn}

Әдепкі уақытша бұғаттау объекті үшін бапталған бұғаттауға қарағанда төмен басымдыққа ие.

{/note}

Әдепкі уақытша бұғаттауды басқару үшін:

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.
1. Консольді ашып, бұғаттауға қатысты қажетті әрекетті орындаңыз:

   {tabs}
   
   {tab(Орнату)}
      
   Әдепкі уақытша бұғаттауды орнату үшін команданы орындаңыз:

   {include(/kz/_includes/_s3-manage-object.md)[tags=configuration_lock_object]}

   {cut(Команда мысалы)}

   ```console
   aws s3api put-object-lock-configuration --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my_bucket --object-lock-configuration '{ "ObjectLockEnabled": "Enabled", "Rule": { "DefaultRetention": { "Mode": "COMPLIANCE", "Days": 30 }}}'
   ```

   Команда жауап шығармайды. `my_bucket` ішіне жүктелетін барлық жаңа объектілер үшін 30 күнге қатаң бұғаттау режимі орнатылады. `my_bucket` ішіне бұрын жүктелген объектілер үшін бұғаттау режимі өзгермейді.

   {/cut}

   {/tab}
   
   {tab(Алып тастау)}
   
   Әдепкі уақытша бұғаттауды алып тастау үшін команданы орындаңыз:

   ```console
   aws s3api put-object-lock-configuration 
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА>
     --object-lock-configuration '{ "ObjectLockEnabled": "Enabled" }'
   ```

   Мұнда:

   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
   - `<ИМЯ_БАКЕТА>` — әдепкі бұғаттау алынып тасталатын бакет атауы.

   {/tab}
   
   {tab(Күйін білу)}
   
   Бакет үшін әдепкі бұғаттаудың ағымдағы конфигурациясын алу үшін команданы орындаңыз:

   ```console
   aws s3api get-object-lock-configuration 
     --endpoint-url <URL_СЕРВИСА> 
     --bucket <ИМЯ_БАКЕТА>
   ```

   Мұнда:

   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
   - `<ИМЯ_БАКЕТА>` — әдепкі бұғаттау конфигурациясы сұралатын бакет атауы.

   {cut(Команда мысалы)}

   ```console
   aws s3api get-object-lock-configuration --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my_bucket
   ```

   Шығыс мысалы:

   ```json
   { "ObjectLockConfiguration": {
      "ObjectLockEnabled": "Enabled",
      "Rule": {
         "DefaultRetention": {
            "Mode": "COMPLIANCE",
            "Days": 30 }}}}
   ```

   {/cut}

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

## {heading(Мерзімсіз бұғаттау)[id=object_legal_hold]}

Мерзімсіз бұғаттау (legal hold) объектіні бакетке жүктеу кезінде де, бакетте бұрыннан бар объект үшін де орнатылуы мүмкін. Мұндай бұғаттауды тек [WRITE жазу құқықтары](../../../concepts/access/s3-acl#permissons) бар пайдаланушы ғана орнатып немесе алып тастай алады.

{note:warn}

Егер объект үшін уақытша және мерзімсіз бұғаттаулар бір мезгілде орнатылса, мерзімсіз бұғаттау уақытшадан басым болады.

{/note}

Мерзімсіз бұғаттауды басқару үшін:

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.
1. Консольді ашып, бұғаттауға қатысты қажетті әрекетті орындаңыз.

   {tabs}
   
   {tab(Жүктеу кезінде орнату)}
      
   Бакетке жүктелетін жаңа объекті үшін мерзімсіз бұғаттауды орнату үшін команданы орындаңыз:

   ```console
   aws s3api put-object 
     --endpoint-url <URL_СЕРВИСА> 
     --bucket <ИМЯ_БАКЕТА> 
     --key <КЛЮЧ_ОБЪЕКТА>
     --body <ПУТЬ_К_ФАЙЛУ> 
     --object-lock-legal-hold-status ON
   ```

   Мұнда:

   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
   - `<ИМЯ_БАКЕТА>` — жаңа объект жүктелетін бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
   - `<ПУТЬ_К_ФАЙЛУ>` — жергілікті файлға жол.

   {cut(Команда мысалы)}

   ```console
   aws s3api put-object --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image.png --body image.png --object-lock-legal-hold-status ON
   ```

   Жауап мысалы:

   ```json
   {
      "ETag": "\"746066bba59ef00362b139a89a0b0363\""
   }
   ```

   {/cut}

   {/tab}
   
   {tab(Жүктегеннен кейін орнату)}
   
   Бакетте орналасқан объекті үшін мерзімсіз бұғаттауды орнату үшін команданы орындаңыз:

   {include(/kz/_includes/_s3-manage-object.md)[tags=object_legal_hold]}

   {cut(Команда мысалы)}

   ```console
   aws s3api put-object-legal-hold --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image1.png --legal-hold Status=ON
   ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
   
   {tab(Алып тастау)}
   
   Бакетте орналасқан объектіден мерзімсіз бұғаттауды алып тастау үшін команданы орындаңыз:

   ```console
   aws s3api put-object-legal-hold 
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА> 
     --key <КЛЮЧ_ОБЪЕКТА>
     --legal-hold Status=OFF
   ```

   Мұнда:

   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.

   {cut(Команда мысалы)}

   ```console
   aws s3api put-object-legal-hold --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image1.png --legal-hold Status=OFF
   ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
   
   {tab(Күйін білу)}
   
   Мерзімсіз бұғаттау күйін білу үшін команданы орындаңыз:

   {include(/kz/_includes/_s3-manage-object.md)[tags=object_state_legal_hold]}

   {cut(Команда мысалы)}

   ```console
   aws s3api get-object-legal-hold --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image.png
   ```

   Жауап мысалы:

   ```json
   {
      "LegalHold": {
         "Status": "ON"
      }
   }
   ```

   {/cut}

   {note:info}

   Объектінің бұғаттау күйін `s3api get-object` және `s3api head-object` командаларының жауаптарынан да көруге болады. Толығырақ — [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/index.html).

   {/note}

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

## Уақытша бұғаттау

Уақытша бұғаттау (retention period) объектіні бакетке жүктеу кезінде де, бакетте бұрыннан бар объекті үшін де орнатылуы мүмкін.

Уақытша бұғаттауды басқару үшін:

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.
1. Консольді ашып, бұғаттауға қатысты қажетті әрекетті орындаңыз.

   {tabs}
   
   {tab(Жүктеу кезінде орнату)}
      
   Бакетке жүктелетін жаңа объекті үшін уақытша бұғаттауды орнату үшін команданы орындаңыз:

   ```console
   aws s3api put-object 
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА> 
     --key <КЛЮЧ_ОБЪЕКТА>
     --body <ПУТЬ_К_ФАЙЛУ>
     --object-lock-mode <РЕЖИМ_БЛОКИРОВКИ>
     --object-lock-retain-until-date '<YYYY-MM-DD HH:MM:SS>'
   ```

   Мұнда:

   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
   - `<ИМЯ_БАКЕТА>` — жаңа объект жүктелетін бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
   - `<ПУТЬ_К_ФАЙЛУ>` — жергілікті файлға жол.
   - `<РЕЖИМ_БЛОКИРОВКИ>` — бұғаттау режимі:

     - `GOVERNANCE` — [басқарылатын режим](/kz/storage/s3/concepts/objects-lock#governance-lock);
     - `COMPLIANCE` — [қатаң режим](/kz/storage/s3/concepts/objects-lock#compliance-lock).

   - `<YYYY-MM-DD HH:MM:SS>` — бұғаттаудың аяқталу күні мен уақыты.

   {cut(Команда мысалы)}

   ```console
   aws s3api put-object --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image2.png --body image.png --object-lock-mode GOVERNANCE --object-lock-retain-until-date '2025-05-15 12:00:00'
   ```

   Жауап мысалы:

   ```json
   {
      "ETag": "\"746066bba59ef00362b139a89a0b0363\""
   }
   ```

   {/cut}

   {/tab}
   
   {tab(Жүктегеннен кейін орнату)}
   
   Бакетте орналасқан объекті үшін уақытша бұғаттауды орнату үшін команданы орындаңыз:

   ```console
   aws s3api put-object-retention 
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА> 
     --key <КЛЮЧ_ОБЪЕКТА>
     --retention '{ "Mode": "<РЕЖИМ_БЛОКИРОВКИ>", "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"}'
   ```

   Мұнда:

   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
   - `<РЕЖИМ_БЛОКИРОВКИ>` — бұғаттау режимі:

     - `GOVERNANCE` — [басқарылатын режим](/kz/storage/s3/concepts/objects-lock#governance-lock);
     - `COMPLIANCE` — [қатаң режим](/kz/storage/s3/concepts/objects-lock#compliance-lock).

   - `<YYYY-MM-DD HH:MM:SS>` — бұғаттаудың аяқталу күні мен уақыты.

   {cut(Команда мысалы)}

   ```console
   aws s3api put-object-retention --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image1.png --retention '{ "Mode": "COMPLIANCE", "RetainUntilDate": "2025-05-15 12:00:00"}'
   ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
   
   {tab(Ұзарту)}
   
   Бакетте орналасқан объекті үшін уақытша бұғаттауды орнату үшін команданы орындаңыз:

   ```console
   aws s3api put-object-retention 
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА> 
     --key <КЛЮЧ_ОБЪЕКТА>
     --retention '{ "Mode": "<РЕЖИМ_БЛОКИРОВКИ>", "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"}'
   ```

   Мұнда:

   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
   - `<РЕЖИМ_БЛОКИРОВКИ>` — бұғаттау режимі:

     - `GOVERNANCE` — [басқарылатын режим](/kz/storage/s3/concepts/objects-lock#governance-lock);
     - `COMPLIANCE` — [қатаң режим](/kz/storage/s3/concepts/objects-lock#compliance-lock).

   - `<YYYY-MM-DD HH:MM:SS>` — бұғаттаудың аяқталуының жаңа кейінгі күні мен уақыты.

   {cut(Команда мысалы)}

   ```console
   aws s3api put-object-retention --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image1.png --retention '{ "Mode": "COMPLIANCE", "RetainUntilDate": "2025-08-15 21:00:00"}'
   ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
   
   {tab(Күйін білу)}

   {include(/kz/_includes/_s3-manage-object.md)[tags=object_state]}

   {cut(Команда мысалы)}

   ```console
   aws s3api get-object-retention --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image1.png
   ```

   Жауап мысалы:

   ```json
   {
      "Retention": {
         "Mode": "COMPLIANCE",
         "RetainUntilDate": "2025-03-15T12:00:00+00:00"
      }
   }
   ```

   {/cut}

   {note:info}

   Объектінің бұғаттау күйін `s3api get-object` және `s3api head-object` командаларының жауаптарынан да көруге болады. Толығырақ — [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/index.html).

   {/note}

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

## Уақытша бұғаттауды айналып өту

{note:warn}

`COMPLIANCE` қатаң режиміндегі уақытша бұғаттауды айналып өту мүмкін емес.

{/note}

[WRITE жазу құқықтары](../../../concepts/access/s3-acl#permissons) бар пайдаланушы командаларда `--bypass-governance-retention` жалаушасын пайдаланып, `GOVERNANCE` режиміндегі уақытша бұғаттауды айналып өте алады. Бұғаттауды айналып өткенде ол мына әрекеттерді орындай алады:

- бұғаттау мерзімі аяқталғанға дейін объектіні жою;
- уақытша бұғаттауды алу;
- бұғаттау мерзімін қысқарту;
- режимді `COMPLIANCE` мәніне өзгерту.

Бұғаттауды айналып өтіп әрекетті орындау үшін:

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.
1. Консольді ашып, қажетті әрекетті орындаңыз.

   {tabs}
   
   {tab(Объектіні жою)}
      
   Басқарылатын уақытша бұғаттау орнатылған объектіні жою үшін команданы орындаңыз:

   ```console
   aws s3api delete-object
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА>
     --key <КЛЮЧ_ОБЪЕКТА>
     --bypass-governance-retention
   ```

   Мұнда:

   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.

   {cut(Команда мысалы)}

   ```console
   aws s3api delete-object --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image2.png --bypass-governance-retention
   ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
   
   {tab(Бұғаттауды алу)}
   
   Басқарылатын уақытша бұғаттауды алу үшін команданы орындаңыз:

   ```console
   aws s3api put-object-retention 
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА> 
     --key <КЛЮЧ_ОБЪЕКТА>
     --bypass-governance-retention
     --retention '{}'
   ```

   Мұнда:

   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.

   {cut(Команда мысалы)}

   ```console
   aws s3api put-object-retention --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image2.png --bypass-governance-retention --retention '{}'
   ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
   
   {tab(Мерзімін қысқарту)}
   
   Басқарылатын уақытша бұғаттау мерзімін қысқарту үшін команданы орындаңыз:

   ```console
   aws s3api put-object-retention 
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА> 
     --key <КЛЮЧ_ОБЪЕКТА>
     --bypass-governance-retention
     --retention '{ "Mode": "GOVERNANCE", "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"}'
   ```

   Мұнда:

   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
   - `<YYYY-MM-DD HH:MM:SS>` — бұғаттаудың аяқталуының жаңа ерте күні мен уақыты.

   {cut(Команда мысалы)}

   ```console
   aws s3api put-object-retention --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image2.png --bypass-governance-retention --retention '{ "Mode": "GOVERNANCE", "RetainUntilDate": "2025-04-10 10:00:00"}' 
   ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
   
   {tab(Режимді өзгерту)}
   
   Объекті үшін уақытша бұғаттау режимін `COMPLIANCE` мәніне өзгерту үшін команданы орындаңыз:

   ```console
   aws s3api put-object-retention 
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА> 
     --key <КЛЮЧ_ОБЪЕКТА>
     --bypass-governance-retention
     --retention '{ "Mode": "COMPLIANCE", "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"}'
   ```

   Мұнда:

   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
   - `<YYYY-MM-DD HH:MM:SS>` — бұғаттаудың аяқталу күні мен уақыты.

   {cut(Команда мысалы)}

   ```console
   aws s3api put-object-retention --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image2.png --bypass-governance-retention --retention '{ "Mode": "COMPLIANCE", "RetainUntilDate": "2025-05-15 12:00:00"}' 
   ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}

   {/tabs}

{/tab}

{/tabs}
