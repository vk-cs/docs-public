# {heading(Объектілерді бұғаттау)[id=s3-instructions-object-lock]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Әдепкі уақытша бұғаттау)[id=s3-instructions-object-lock-default-retention]}

Әдепкі уақытша бұғаттау (`DefaultRetention`) бакет деңгейінде орнатылады. Ол бакетке жүктелетін барлық жаңа объектілерге қолданылады және бұрын жүктелген объектілерге қолданылмайды.
Әдепкі бұғаттауды орнату міндетті емес.

{note:warn}
Әдепкі уақытша бұғаттаудың басымдығы объект үшін бапталған бұғаттаудан төмен.
{/note}

Әдепкі уақытша бұғаттауды басқару үшін:

{tabs}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольді ашып, бұғаттаумен қажетті әрекетті орындаңыз:

   {tabs}

   {tab(Орнату)}
      
   Әдепкі уақытша бұғаттауды орнату үшін команданы орындаңыз:

   {include(../../../_includes/_s3-manage-object.md)[tags=configuration_lock_object]}

   {cut(Команда мысалы)}

    ```console
    aws s3api put-object-lock-configuration \
      --bucket my_bucket \
      --object-lock-configuration '{
          "ObjectLockEnabled": "Enabled",
          "Rule": {
              "DefaultRetention": {
                  "Mode": "COMPLIANCE",
                  "Days": 30
              }
          }
      }' \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Команда жауап шығармайды. `my_bucket` ішіне жүктелетін барлық жаңа объектілер үшін 30 күн мерзімге қатаң бұғаттау режимі орнатылады. `my_bucket` ішіне бұрын жүктелген объектілер үшін бұғаттау режимі өзгермейді.

   {/cut}

   {/tab}

   {tab(Алып тастау)}

   Әдепкі уақытша бұғаттауды алып тастау үшін команданы орындаңыз:

    ```console
    aws s3api put-object-lock-configuration \
      --bucket <ИМЯ_БАКЕТА> \
      --object-lock-configuration '{
          "ObjectLockEnabled": "Enabled"
          }' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — әдепкі бұғаттауы алынып тасталатын бакеттің атауы.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.

    {/ifdef}

   {/tab}
    
   {tab(Күйін білу)}
    
   Бакет үшін әдепкі бұғаттаудың ағымдағы конфигурациясын алу үшін команданы орындаңыз:

    ```console
    aws s3api get-object-lock-configuration \
      --bucket <ИМЯ_БАКЕТА> \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — әдепкі бұғаттау конфигурациясы сұралатын бакеттің атауы.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.

    {/ifdef}

   {cut(Команда мысалы)}

    ```console
    aws s3api get-object-lock-configuration \
      --bucket my-bucket \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
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

## {heading(Мерзімсіз бұғаттау)[id=s3-instructions-object-lock-legal-hold]}

Мерзімсіз бұғаттау (legal hold) объектіні бакетке жүктеу кезінде де, бакетте бұрыннан бар объект үшін де орнатылуы мүмкін. Мұндай бұғаттауды орнату және алып тастау тек {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=WRITE жазу құқықтары]} бар пайдаланушыға ғана қолжетімді.

{note:warn}
Егер объект үшін бір уақытта әрі уақытша, әрі мерзімсіз бұғаттау орнатылса, мерзімсіз бұғаттаудың басымдығы уақытшадан жоғары болады.
{/note}

Мерзімсіз бұғаттауды басқару үшін:

{tabs}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольді ашып, бұғаттаумен қажетті әрекетті орындаңыз.

   {tabs}
    
   {tab(Объектіні жүктеу кезінде орнату)}
      
   Бакетке жүктелетін жаңа объект үшін мерзімсіз бұғаттауды орнату үшін команданы орындаңыз:

    ```console
    aws s3api put-object \
      --body <ПУТЬ_К_ФАЙЛУ> \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --object-lock-legal-hold-status ON \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<ПУТЬ_К_ФАЙЛУ>` — жергілікті файлға дейінгі жол.
    - `<ИМЯ_БАКЕТА>` — жаңа объект жүктелетін бакеттің атауы.
    - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.

    {/ifdef}

   {cut(Команда мысалы)}

    ```console
    aws s3api put-object \
      --body image.png \
      --bucket my-bucket-with-lock \
      --key images/image.png \
      --object-lock-legal-hold-status ON \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
    ```

   Жауап мысалы:

   ```json
   {
     "ETag": "\"746066bba59ef00362b139a89a0b0363\""
   }
   ```

   {/cut}

   {/tab}
    
   {tab(Объект жүктелгеннен кейін орнату)}
    
   Бакетте орналасқан объект үшін мерзімсіз бұғаттауды орнату үшін команданы орындаңыз:

   {include(../../../_includes/_s3-manage-object.md)[tags=object_legal_hold]}

   {cut(Команда мысалы)}

    ```console
    aws s3api put-object-legal-hold \
      --bucket my-bucket-with-lock \
      --key images/image1.png \
      --legal-hold Status=ON \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
    
   {tab(Алып тастау)}
    
   Бакетте орналасқан объект үшін мерзімсіз бұғаттауды алып тастау үшін команданы орындаңыз:

    ```console
    aws s3api put-object-legal-hold \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --legal-hold Status=OFF \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакеттің атауы.
    - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.

    {/ifdef}

   {cut(Команда мысалы)}

    ```console
    aws s3api put-object-legal-hold \
      --bucket my-bucket-with-lock \
      --key images/image1.png \
      --legal-hold Status=OFF \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
    
   {tab(Күйін білу)}
    
   Объектінің мерзімсіз бұғаттау күйін білу үшін команданы орындаңыз:

   {include(../../../_includes/_s3-manage-object.md)[tags=object_state_legal_hold]}

   {cut(Команда мысалы)}

    ```console
    aws s3api get-object-legal-hold \
      --bucket my-bucket-with-lock \
      --key images/image.png \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
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
   Объект бұғаттауының күйін `s3api get-object` және `s3api head-object` командаларының жауаптарынан да көруге болады. Толығырақ — [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/index.html).
   {/note}

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

## {heading(Уақытша бұғаттау)[id=s3-instructions-object-lock-retention-period]}

Уақытша бұғаттау (retention period) объектіні бакетке жүктеу кезінде де, бакетте бұрыннан бар объект үшін де орнатылуы мүмкін.

Уақытша бұғаттауды басқару үшін:

{tabs}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольді ашып, бұғаттаумен қажетті әрекетті орындаңыз.

   {tabs}
    
   {tab(Объектіні жүктеу кезінде орнату)}
      
   Бакетке жүктелетін жаңа объект үшін уақытша бұғаттауды орнату үшін команданы орындаңыз:

    ```console
    aws s3api put-object \
      --body <ПУТЬ_К_ФАЙЛУ> \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --object-lock-mode <РЕЖИМ_БЛОКИРОВКИ> \
      --object-lock-retain-until-date '<YYYY-MM-DD HH:MM:SS>' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<ПУТЬ_К_ФАЙЛУ>` — жергілікті файлға дейінгі жол.
    - `<ИМЯ_БАКЕТА>` — жаңа объект жүктелетін бакеттің атауы.
    - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
    - `<РЕЖИМ_БЛОКИРОВКИ>` — бұғаттау режимі:

      - `GOVERNANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=басқарылатын режим]};
      - `COMPLIANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң режим]}.
  
    - `<YYYY-MM-DD HH:MM:SS>` — бұғаттаудың аяқталу күні мен уақыты.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.

    {/ifdef}

   {cut(Команда мысалы)}

    ```console
    aws s3api put-object \
      --body image.png \
      --bucket my-bucket-with-lock \ 
      --key images/image2.png \
      --object-lock-mode GOVERNANCE \
      --object-lock-retain-until-date '2025-05-15 12:00:00' \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
    ```

   Жауап мысалы:

   ```json
   {
     "ETag": "\"746066bba59ef00362b139a89a0b0363\""
   }
   ```

   {/cut}

   {/tab}
    
   {tab(Объект жүктелгеннен кейін орнату)}
    
   Бакетте орналасқан объект үшін уақытша бұғаттауды орнату үшін команданы орындаңыз:

    ```console
    aws s3api put-object-retention \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --retention '{
        "Mode": "<РЕЖИМ_БЛОКИРОВКИ>",
        "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
        }' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакеттің атауы.
    - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
    - `<РЕЖИМ_БЛОКИРОВКИ>` — бұғаттау режимі:

      - `GOVERNANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=басқарылатын режим]};
      - `COMPLIANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң режим]}.

    - `<YYYY-MM-DD HH:MM:SS>` — бұғаттаудың аяқталу күні мен уақыты.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.

    {/ifdef}

   {cut(Команда мысалы)}

    ```console
    aws s3api put-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image1.png \
      --retention '{
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "2025-05-15 12:00:00"
        }' \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
    
   {tab(Ұзарту)}
    
    Бакетте орналасқан объект үшін уақытша бұғаттауды ұзарту үшін команданы орындаңыз:

    ```console
    aws s3api put-object-retention \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --retention '{
        "Mode": "<РЕЖИМ_БЛОКИРОВКИ>",
        "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
        }' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакеттің атауы.
    - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
    - `<РЕЖИМ_БЛОКИРОВКИ>` — бұғаттау режимі:

      - `GOVERNANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=басқарылатын режим]};
      - `COMPLIANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң режим]}.

    - `<YYYY-MM-DD HH:MM:SS>` — бұғаттаудың аяқталу күні мен уақытының жаңа, кейінірек болатын күні мен уақыты.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.

    {/ifdef}

   {cut(Команда мысалы)}

    ```console
    aws s3api put-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image1.png \
      --retention '{
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "2025-08-15 21:00:00"
        }' \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
    
   {tab(Күйін білу)}

   {include(../../../_includes/_s3-manage-object.md)[tags=object_state]}

   {cut(Команда мысалы)}

    ```console
    aws s3api get-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image1.png \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
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
   Объект бұғаттауының күйін `s3api get-object` және `s3api head-object` командаларының жауаптарынан да көруге болады. Толығырақ — [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/index.html).
   {/note}

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

## {heading(Уақытша бұғаттауды айналып өту)[id=s3-instructions-object-lock-bypass-governance-retention]}

{note:warn}
Қатаң режимі (`COMPLIANCE`) бар уақытша бұғаттауды айналып өту мүмкін емес.
{/note}

{linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=WRITE жазу құқықтары]} бар пайдаланушы `GOVERNANCE` режиміндегі уақытша бұғаттауды командаларда `--bypass-governance-retention` жалаушасын пайдалану арқылы айналып өте алады. Бұғаттауды айналып өтіп, ол мыналарды орындай алады:

- бұғаттау мерзімі аяқталғанға дейін объектіні жою;
- уақытша бұғаттауды алып тастау;
- бұғаттау мерзімін қысқарту;
- режимді `COMPLIANCE` режиміне өзгерту.

Бұғаттауды айналып өтіп әрекет орындау үшін:

{tabs}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольді ашып, қажетті әрекетті орындаңыз.

   {tabs}
    
   {tab(Объектіні жою)}
      
   Басқарылатын уақытша бұғаттауы орнатылған объектіні жою үшін команданы орындаңыз:

    ```console
    aws s3api delete-object \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --bypass-governance-retention \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакеттің атауы.
    - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.

    {/ifdef}

   {cut(Команда мысалы)}

    ```console
    aws s3api delete-object \
      --bucket my-bucket-with-lock \
      --key images/image2.png \
      --bypass-governance-retention \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
    
   {tab(Бұғаттауды алып тастау)}
    
   Объектіден басқарылатын уақытша бұғаттауды алып тастау үшін команданы орындаңыз:

    ```console
    aws s3api put-object-retention \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --retention '{}' \
      --bypass-governance-retention \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакеттің атауы.
    - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.

    {/ifdef}

   {cut(Команда мысалы)}

    ```console
    aws s3api put-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image2.png \
      --retention '{}' \
      --bypass-governance-retention \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
    ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
    
   {tab(Мерзімді қысқарту)}
    
   Объект үшін басқарылатын уақытша бұғаттау мерзімін қысқарту үшін команданы орындаңыз:

    ```console
    aws s3api put-object-retention \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --retention '{
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
        }' \
      --bypass-governance-retention \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакеттің атауы.
    - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
    - `<YYYY-MM-DD HH:MM:SS>` — бұғаттаудың аяқталу күні мен уақытының жаңа, ертерек болатын күні мен уақыты.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.

    {/ifdef}

   {cut(Команда мысалы)}

    ```console
    aws s3api put-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image2.png \
      --retention '{
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "2025-04-10 10:00:00"
        }' \
      --bypass-governance-retention \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
    ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
    
   {tab(Режимді өзгерту)}
    
   Объект үшін уақытша бұғаттау режимін `COMPLIANCE` режиміне өзгерту үшін команданы орындаңыз:

    ```console
    aws s3api put-object-retention \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --retention '{
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
        }' \
      --bypass-governance-retention \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакеттің атауы.
    - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
    - `<YYYY-MM-DD HH:MM:SS>` — бұғаттаудың аяқталу күні мен уақыты.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.

    {/ifdef}

   {cut(Команда мысалы)}

    ```console
    aws s3api put-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image2.png \
      --retention '{
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "2025-05-15 12:00:00"
        }' \
      --bypass-governance-retention \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
    ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}

   {/tabs}

{/tab}

{/tabs}