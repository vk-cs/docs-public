# {heading(Нысандарды блоктау)[id=s3-instructions-object-lock]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(Әдепкі уақытша блоктау)[id=s3-instructions-object-lock-default-retention]}

Әдепкі уақытша блоктау (`DefaultRetention`) бакет деңгейінде орнатылады. Ол бакетке жүктелетін барлық жаңа нысандарға қолданылады және бұрын жүктелген нысандарға қолданылмайды.
Әдепкі блоктауды орнату міндетті емес.

{note:warn}
Әдепкі уақытша блоктау нысан үшін теңшелген блоктаудан төмен приоритетке ие.
{/note}

Әдепкі уақытша блоктауды басқару үшін:

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Бұрын жасалмаса, {linkto(../../buckets/manage-bucket#s3-instructions-manage-bucket-versioning)[text=версиялауды қосыңыз]}.
1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Бакеттің баптауларына мына тәсілдердің бірімен өтіңіз:

   - Қажетті бакет үшін ![ ](../../../assets/more-icon.svg "inline") түймесін басып, **Баптаулар** тармағын таңдаңыз.
   - Қажетті бакеттің атын басып, бакет бетінде ![ ](../../../assets/settings-icon.svg "inline") түймесін басыңыз.

1. **Блоктау** қойындысына өтіңіз.
1. Бұрын жасалмаса, нысандарды блоктауды қосыңыз.
1. **Нысандарды әдепкі бойынша блоктау** опциясын қосыңыз.
1. Қорғау режимін таңдаңыз:

    - `Governance` — блоктауды айналып өту мүмкіндігі бар {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=басқарылатын режим]};
    - `Compliance` — белгіленген мерзім бітпей тұрып блоктауды алу мүмкіндігі жоқ {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң режим]}.

1. Сақтау мерзімін күндермен таңдаңыз.
1. **Сақтау** түймесін басыңыз.

{/tab}

{tab(AWS CLI)}

1. Әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, теңшеңіз.
1. Бұрын жасалмаса, {linkto(../../buckets/manage-bucket#s3-instructions-manage-bucket-versioning)[text=версиялауды қосыңыз]}.
1. Консольді ашып, блоктаумен қажетті әрекетті орындаңыз:

   {tabs}

   {tab(Орнату)}

   Әдепкі уақытша блоктауды орнату үшін команданы орындаңыз:

   ```console
   aws s3api put-object-lock-configuration \
     --bucket <ИМЯ_БАКЕТА> \
     --object-lock-configuration '{
       "ObjectLockEnabled": "Enabled",
       "Rule": {
         "DefaultRetention": {
           "Mode": "<РЕЖИМ_БЛОКИРОВКИ>",
           "Days": <СРОК_БЛОКИРОВКИ>
         }
       }
     }' \
     --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — бакет атауы.
   - `<РЕЖИМ_БЛОКИРОВКИ>` — блоктау режимі:

     - `GOVERNANCE` — оны айналып өту мүмкіндігі бар {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=басқарылатын блоктау режимі]};
     - `COMPLIANCE` — белгіленген мерзім бітпей тұрып оны алу мүмкіндігі жоқ {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң блоктау режимі]}.

   - `<СРОК_БЛОКИРОВКИ>` — нысан жүктелген сәттен бастап блоктау мерзімі күндермен (`Days`) немесе жылдармен (`Years`). `Days` және `Years` мәндерін бір мезгілде көрсетуге болмайды. Мысал: `1825` күн (5 жыл).

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сервис орнатылғанда көрсетілген домендік атауы бар сілтеме.
     {/ifdef}

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

   Команда жауап шығармайды. `my_bucket` ішіне жүктелетін барлық жаңа нысандарға 30 күн мерзімге қатаң блоктау режимі орнатылады. `my_bucket` ішінде бұрын жүктелген нысандар үшін блоктау режимі өзгермейді.

   {/cut}

   {/tab}

   {tab(Алу)}

   Әдепкі уақытша блоктауды алу үшін команданы орындаңыз:

    ```console
    aws s3api put-object-lock-configuration \
      --bucket <ИМЯ_БАКЕТА> \
      --object-lock-configuration '{
          "ObjectLockEnabled": "Enabled"
          }' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — әдепкі блоктау алынатын бакеттің атауы.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.

    {/ifdef}

   {/tab}

   {tab(Күйін білу)}

   Бакет үшін әдепкі блоктаудың ағымдық конфигурациясын алу үшін команданы орындаңыз:

    ```console
    aws s3api get-object-lock-configuration \
      --bucket <ИМЯ_БАКЕТА> \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — әдепкі блоктау конфигурациясы сұралатын бакеттің атауы.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.

    {/ifdef}

   {cut(Команда мысалы)}

    ```console
    aws s3api get-object-lock-configuration \
      --bucket my-bucket \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Шығару мысалы:

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

## {heading(Мерзімсіз блоктау)[id=s3-instructions-object-lock-legal-hold]}

Мерзімсіз бұғаттау (legal hold) объектіні бакетке жүктеу кезінде де, бакетте бұрыннан бар объект үшін де орнатылуы мүмкін. Мұндай бұғаттауды орнату және алып тастау тек {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissions)[text=WRITE жазу құқықтары]} бар пайдаланушыға ғана қолжетімді.

{note:warn}
Егер нысан үшін бір мезгілде уақытша да, мерзімсіз де блоктау орнатылса, мерзімсіз блоктау уақытшадан жоғары приоритетке ие.
{/note}

Мерзімсіз блоктауды басқару үшін:

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Бұрын жасалмаса, {linkto(../../buckets/manage-bucket#s3-instructions-manage-bucket-versioning)[text=версиялауды қосыңыз]}.
1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Бакеттің атын басыңыз.
1. Нысанның атын басыңыз.
1. **Версиялау** қойындысына өтіңіз. Оның {linkto(../../buckets/manage-bucket#s3-instructions-manage-bucket-versioning)[text=қосылғанына]} көз жеткізіңіз.
1. **Блоктау** қойындысына өтіңіз.
1. Бұрын жасалмаса, нысандарды блоктауды қосыңыз.
1. ![ ](../../../assets/settings-sliders.svg "inline") белгішесін басыңыз.
1. **Мерзімсіз блоктау** опциясын қосыңыз немесе өшіріңіз.
1. **Қолдану** түймесін басыңыз.

{/tab}

{tab(AWS CLI)}

1. Әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, теңшеңіз.
1. Бұрын жасалмаса, {linkto(../../buckets/manage-bucket#s3-instructions-manage-bucket-versioning)[text=версиялауды қосыңыз]}.
1. Консольді ашып, блоктаумен қажетті әрекетті орындаңыз.

   {tabs}

   {tab(Нысанды жүктеру кезінде орнату)}

   Бакетке жүктелетін жаңа нысан үшін мерзімсіз блоктауды орнату үшін команданы орындаңыз:

    ```console
    aws s3api put-object \
      --body <ПУТЬ_К_ФАЙЛУ> \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --object-lock-legal-hold-status ON \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<ПУТЬ_К_ФАЙЛУ>` — локалды файлға жол.
    - `<ИМЯ_БАКЕТА>` — жаңа нысан жүктелетін бакеттің атауы.
    - `<КЛЮЧ_ОБЪЕКТА>` — оған дейінгі жолы бар нысанның толық атауы.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.

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

   {tab(Нысан жүктелгеннен кейін орнату)}

   Бакетте болып тұрған нысан үшін мерзімсіз блоктауды орнату үшін команданы орындаңыз:

   ```console
   aws s3api put-object-legal-hold \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --legal-hold Status=ON \
     --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті нысан орналасқан бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — оған дейінгі жолы бар нысанның толық атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сервис орнатылғанда көрсетілген домендік атауы бар сілтеме.
     {/ifdef}

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

   {tab(Алу)}

   Бакетте болып тұрған нысан үшін мерзімсіз блоктауды алу үшін команданы орындаңыз:

    ```console
    aws s3api put-object-legal-hold \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --legal-hold Status=OFF \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — қажетті нысан орналасқан бакеттің атауы.
    - `<КЛЮЧ_ОБЪЕКТА>` — оған дейінгі жолы бар нысанның толық атауы.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.

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

   Нысанның мерзімсіз блоктау күйін білу үшін команданы орындаңыз:

   ```console
   aws s3api get-object-legal-hold \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — оған дейінгі жолы бар нысанның толық атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сервис орнатылғанда көрсетілген домендік атауы бар сілтеме.
     {/ifdef}

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
   Нысан блоктауының күйін `s3api get-object` және `s3api head-object` командаларының жауаптарынан да көруге болады. Толығырақ — [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/index.html).
   {/note}

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Уақытша құлыптау)[id=s3-instructions-object-lock-retention-period]}

Уақытша құлыптауды (retention period) объектіні бакетке жүктеу кезінде де, бакетте бар объект үшін де орнатуға болады.

Уақытша құлыптауды басқару үшін:

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетына {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Кіріңіз]}.

{/ifdef}

1. Бұрын жасалмаған болса, {linkto(../../buckets/manage-bucket#s3-instructions-manage-bucket-versioning)[text=Версиялауды қосыңыз]}.
1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Бакет атауын басыңыз.
1. Объект атауын басыңыз.
1. **Версиялау** қойындысына өтіңіз. Оның {linkto(../../buckets/manage-bucket#s3-instructions-manage-bucket-versioning)[text=қосылғанын]} тексеріңіз.
1. **Құлыптау** қойындысына өтіңіз.
1. Бұрын жасалмаған болса, объектілерді құлыптауды қосыңыз.
1. ![ ](../../../assets/settings-sliders.svg "inline") белгішесін басыңыз.
1. **Уақытша құлыптау** опциясын қосыңыз немесе өшіріңіз.
1. **Уақытша құлыптау** опциясын қоссаңыз, қорғау режимін таңдаңыз:

    - `Governance` — құлыптауды айналып өту мүмкіндігі бар {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=басқарылатын режим]};
    - `Compliance` — белгіленген мерзім бітпейінше құлыптауды алу мүмкіндігі жоқ {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң режим]}.

1. **Уақытша құлыптау** опциясын қоссаңыз, құлыптау аяқталатын күнді мен уақытты көрсетіңіз. Ең аз мән — құлыптау орнатылған сәттен бастап 24 сағат.
1. **Қолдану** түймесін басыңыз.

{/tab}

{tab(AWS CLI)}

1. Орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатыңыз және баптаңыз.
1. Бұрын жасалмаған болса, {linkto(../../buckets/manage-bucket#s3-instructions-manage-bucket-versioning)[text=Версиялауды қосыңыз]}.
1. Консольді ашып, қажетті құлыптау әрекетін орындаңыз.

   {tabs}

   {tab(Объект жүктелген кезде орнату)}

   Бакетке жүктелетін жаңа объект үшін уақытша құлыптау орнату үшін команданы орындаңыз:

    ```console
    aws s3api put-object \
      --body <ФАЙЛ_ЖОЛЫ> \
      --bucket <БАКЕТ_АТАУЫ> \
      --key <ОБЪЕКТ_КІЛТІ> \
      --object-lock-mode <ҚҰЛЫПТАУ_РЕЖИМІ> \
      --object-lock-retain-until-date '<YYYY-MM-DD HH:MM:SS>' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<ФАЙЛ_ЖОЛЫ>` — жергілікті файлға жол.
    - `<БАКЕТ_АТАУЫ>` — жаңа объект жүктелетін бакеттің атауы.
    - `<ОБЪЕКТ_КІЛТІ>` — оған дейінгі жолымен қоса объектінің толық атауы.
    - `<ҚҰЛЫПТАУ_РЕЖИМІ>` — құлыптау режимі:

      - `GOVERNANCE` — құлыптауды айналып өту мүмкіндігі бар {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=басқарылатын режим]};
      - `COMPLIANCE` — белгіленген мерзім бітпейінше құлыптауды алу мүмкіндігі жоқ {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң режим]}.

    - `<YYYY-MM-DD HH:MM:SS>` — құлыптау аяқталатын күн мен уақыт.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясында қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.

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

   Бакетте орналасқан объект үшін уақытша құлыптау орнату үшін команданы орындаңыз:

    ```console
    aws s3api put-object-retention \
      --bucket <БАКЕТ_АТАУЫ> \
      --key <ОБЪЕКТ_КІЛТІ> \
      --retention '{
        "Mode": "<ҚҰЛЫПТАУ_РЕЖИМІ>",
        "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
        }' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<БАКЕТ_АТАУЫ>` — қажетті объект орналасқан бакеттің атауы.
    - `<ОБЪЕКТ_КІЛТІ>` — оған дейінгі жолымен қоса объектінің толық атауы.
    - `<ҚҰЛЫПТАУ_РЕЖИМІ>` — құлыптау режимі:

      - `GOVERNANCE` — құлыптауды айналып өту мүмкіндігі бар {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=басқарылатын режим]};
      - `COMPLIANCE` — белгіленген мерзім бітпейінше құлыптауды алу мүмкіндігі жоқ {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң режим]}.

    - `<YYYY-MM-DD HH:MM:SS>` — құлыптау аяқталатын күн мен уақыт.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясында қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.

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

    Бакетте орналасқан объект үшін уақытша құлыптауды ұзарту үшін команданы орындаңыз:

    ```console
    aws s3api put-object-retention \
      --bucket <БАКЕТ_АТАУЫ> \
      --key <ОБЪЕКТ_КІЛТІ> \
      --retention '{
        "Mode": "<ҚҰЛЫПТАУ_РЕЖИМІ>",
        "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
        }' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<БАКЕТ_АТАУЫ>` — қажетті объект орналасқан бакеттің атауы.
    - `<ОБЪЕКТ_КІЛТІ>` — оған дейінгі жолымен қоса объектінің толық атауы.
    - `<ҚҰЛЫПТАУ_РЕЖИМІ>` — құлыптау режимі:

      - `GOVERNANCE` — құлыптауды айналып өту мүмкіндігі бар {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=басқарылатын режим]};
      - `COMPLIANCE` — белгіленген мерзім бітпейінше құлыптауды алу мүмкіндігі жоқ {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң режим]}.

    - `<YYYY-MM-DD HH:MM:SS>` — құлыптау аяқталатын жаңа, одан кейінгі күн мен уақыт.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясында қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.

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

   Объектінің уақытша құлыптау күйін білу үшін команданы орындаңыз:

   ```console
   aws s3api get-object-retention \
     --bucket <БАКЕТ_АТАУЫ> \
     --key <ОБЪЕКТ_КІЛТІ> \
     --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<БАКЕТ_АТАУЫ>` — қажетті объект орналасқан бакеттің атауы.
   - `<ОБЪЕКТ_КІЛТІ>` — объектінің атауы және бар болса, оған дейінгі каталогтарымен жолы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — қызмет орнатылған кезде көрсетілген домендік атауы бар сілтеме.
     {/ifdef}

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
   Объектінің құлыптау күйін `s3api get-object` және `s3api head-object` командаларының жауаптарынан да көруге болады. Толығырақ — [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/index.html).
   {/note}

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Уақытша құлыптауды айналып өту)[id=s3-instructions-object-lock-bypass-governance-retention]}

{note:warn}
Уақытша құлыптауды тек AWS CLI немесе {linkto(../../../api#s3-api)[text=API]} арқылы және тек {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=басқарылатын режимде]} (`GOVERNANCE`) құлыпталған объектілер үшін ғана айналып өтуге болады.

{linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=Қатаң режиммен]} (`COMPLIANCE`) құлыптауды айналып өтуге болмайды.
{/note}

{linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissions)[text=WRITE жазу құқықтары]} бар пайдаланушы `GOVERNANCE` режиміндегі уақытша бұғаттауды командаларда `--bypass-governance-retention` жалаушасын пайдалану арқылы айналып өте алады. Бұғаттауды айналып өтіп, ол мыналарды орындай алады:

- құлыптау мерзімі бітпейінше объектіні жою;
- уақытша құлыптауды алу;
- құлыптау мерзімін қысқарту;
- режимді `COMPLIANCE` режиміне өзгерту.

Құлыптауды айналып өтіп, әрекетті орындау үшін:

{tabs}

{tab(AWS CLI)}

1. Орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатыңыз және баптаңыз.
1. Консольді ашып, қажетті әрекетті орындаңыз.

   {tabs}

   {tab(Объектіні жою)}

   Басқарылатын уақытша құлыптау орнатылған объектіні жою үшін команданы орындаңыз:

    ```console
    aws s3api delete-object \
      --bucket <БАКЕТ_АТАУЫ> \
      --key <ОБЪЕКТ_КІЛТІ> \
      --version-id <ВЕРСИЯ_ID> \
      --bypass-governance-retention \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<БАКЕТ_АТАУЫ>` — қажетті объект орналасқан бакеттің атауы.
    - `<ОБЪЕКТ_КІЛТІ>` — оған дейінгі жолымен қоса объектінің толық атауы.
    - (Қалау бойынша) `<ВЕРСИЯ_ID>` — жойылуы тиіс объектінің құлыпталған нұсқасының {linkto(../../../concepts/versioning#s3-concepts-versioning-version-id)[text=идентификаторы]}. `--version-id` параметрі көрсетілмесе, жоюдың орнына ағымдағы нұсқаға айналатын {linkto(../../../concepts/versioning#s3-concepts-versioning-delete-marker)[text=жою маркері]} жасалады. Алдыңғы нұсқа бакетте қалады. Толығырақ — {linkto(../../../concepts/versioning#s3-concepts-versioning-objects-delete)[text=Объектіні немесе оның нұсқасын жою]} бөлімінде.

      {note:warn}
      Көрсетілген нұсқа жалғыз болса, объект қалпына келтіру мүмкіндігіsiz, қайтарымсыз жойылады. Толығырақ — {linkto(../../../concepts/versioning#s3-concepts-versioning-objects-delete)[text=%text]} бөлімінде.
      {/note}

      {linkto(../../../concepts/versioning#s3-concepts-versioning-delete-marker)[text=Жою маркері]} болып табылатын объект нұсқасын көрсетсеңіз, алдыңғы нұсқа ағымдағы нұсқаға айналады.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясында қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.

    {/ifdef}

   {cut(Команда мысалы)}

    ```console
    aws s3api delete-object \
      --bucket my-bucket-with-lock \
      --key images/image2.png \
      --version-id e6JxeTPO0MDl2VZOaWDHmveXbxxIkGic \
      --bypass-governance-retention \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}

   {tab(Құлыптауды алу)}

   Объектіден басқарылатын уақытша құлыптауды алу үшін команданы орындаңыз:

    ```console
    aws s3api put-object-retention \
      --bucket <БАКЕТ_АТАУЫ> \
      --key <ОБЪЕКТ_КІЛТІ> \
      --retention '{}' \
      --bypass-governance-retention \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<БАКЕТ_АТАУЫ>` — қажетті объект орналасқан бакеттің атауы.
    - `<ОБЪЕКТ_КІЛТІ>` — оған дейінгі жолымен қоса объектінің толық атауы.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясында қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.

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

   Объект үшін басқарылатын уақытша құлыптау мерзімін қысқарту үшін команданы орындаңыз:

    ```console
    aws s3api put-object-retention \
      --bucket <БАКЕТ_АТАУЫ> \
      --key <ОБЪЕКТ_КІЛТІ> \
      --retention '{
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
        }' \
      --bypass-governance-retention \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<БАКЕТ_АТАУЫ>` — қажетті объект орналасқан бакеттің атауы.
    - `<ОБЪЕКТ_КІЛТІ>` — оған дейінгі жолымен қоса объектінің толық атауы.
    - `<YYYY-MM-DD HH:MM:SS>` — құлыптау аяқталатын жаңа, одан ерте күн мен уақыт.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясында қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.

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

   Объект үшін уақытша құлыптау режимін `COMPLIANCE` режиміне өзгерту үшін команданы орындаңыз:

    ```console
    aws s3api put-object-retention \
      --bucket <БАКЕТ_АТАУЫ> \
      --key <ОБЪЕКТ_КІЛТІ> \
      --retention '{
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
        }' \
      --bypass-governance-retention \
      --endpoint-url <ENDPOINT_URL>
    ```

    Мұнда:

    - `<БАКЕТ_АТАУЫ>` — қажетті объект орналасқан бакеттің атауы.
    - `<ОБЪЕКТ_КІЛТІ>` — оған дейінгі жолымен қоса объектінің толық атауы.
    - `<YYYY-MM-DD HH:MM:SS>` — құлыптау аяқталатын күн мен уақыт.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясында қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.

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