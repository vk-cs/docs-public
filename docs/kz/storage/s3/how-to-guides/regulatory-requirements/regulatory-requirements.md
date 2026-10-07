# {heading(Нормативтік талаптарға сәйкестік үшін қойманы баптау)[id=s3-regulatory-requirements]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(s3)} объектілерді {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=олардың жойылуын немесе қайта жазылуын бұғаттау]} (Object Lock) арқылы қорғауға мүмкіндік береді. Объектілерді бұғаттауды сындарлы деректер үшін (мысалы, дербес деректер) пайдаланыңыз: нормативтік немесе заңнамалық талаптарға сәйкес оларды белгіленген мерзімдер ішінде өзгермейтін түрде сақтап, кейін жою қажет. Бұл аудит пен заңдық маңыздылықты қамтамасыз етуге көмектеседі.

## {heading(Дайындық қадамдары)[id=s3-regulatory-requirements-prepare]}

AWS CLI {linkto(../../connect/s3-cli#s3-connect-cli)[text=орнатылған және бапталған]} екеніне көз жеткізіңіз.

## {heading(1. Бакетті дайындаңыз)[id=s3-regulatory-requirements-bucket-create]}

1. Жаңа бакет жасаңыз:

   ```console
   aws s3api create-bucket \
       --bucket <ИМЯ_БАКЕТА> \
       --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — {linkto(../../concepts/about#s3-concepts-about-bucket-naming)[text=ұсынылатын ережелерге]} сәйкес бакет атауы.

     Бакет жасалғаннан кейін оның атауын өзгерту мүмкін болмайды.

   - `<ENDPOINT_URL>` — VK Object Storage сервисінің домені, аккаунттың {linkto(/kz/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.

1. {linkto(../../concepts/versioning#s3-concepts-versioning)[text=Нұсқалауды]} қосыңыз:

   ```console
   aws s3api put-bucket-versioning \
     --bucket <ИМЯ_БАКЕТА> \
     --versioning-configuration Status=Enabled \
     --endpoint-url <ENDPOINT_URL>  
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — бакет атауы.

   - `<ENDPOINT_URL>` — VK Object Storage сервисінің домені, аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.

1. {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=Объектілерді бұғаттауды]} қосыңыз:

   ```console
   aws s3api put-object-lock-configuration \
     --bucket <ИМЯ_БАКЕТА> \
     --object-lock-configuration '{
       "ObjectLockEnabled": "Enabled"
       }' \
     --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — бакет атауы.
   - `<ENDPOINT_URL>` — аккаунттың {linkto(/kz/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

## {heading(2. Бакет үшін әдепкі сақтау саясатын баптаңыз)[id=s3-regulatory-requirements-policy-settings]}

Бакет үшін уақытша бұғаттауды {linkto(../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң режимде]} (`COMPLIANCE`) орнатып, деректерді сақтаудың нақты мерзімін көрсетіңіз:

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
- `<РЕЖИМ_БЛОКИРОВКИ>` — бұғаттау режимі:
  - `GOVERNANCE` — {linkto(../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=басқарылатын режим]};
  - `COMPLIANCE` — {linkto(../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң режим]}.
- `<СРОК_БЛОКИРОВКИ>` — объект жүктелген сәттен бастап күндермен (`Days`) немесе жылдармен (`Years`) бұғаттау мерзімі. `Days` және `Years` мәндерін бір уақытта көрсетуге болмайды. Мысал: `1825` күн (5 жыл).
- `<ENDPOINT_URL>` — аккаунттың {linkto(/kz/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

{note:err}
`COMPLIANCE` режимі орнатылғаннан кейін оны әлсіретуге немесе өшіруге болмайды, бірақ деректерді сақтау мерзімін ұлғайтуға болады.
{/note}

## {heading(3. (Қосымша) Объект үшін жеке сақтау мерзімін орнатыңыз)[id=s3-regulatory-requirements-shelf-life]}

Жеке сақтау мерзімі әртүрлі санаттарға жататын және сақтау мерзімі әртүрлі объектілер үшін орнатылуы мүмкін.

Объектіні жүктеу кезінде бұғаттауды орнатыңыз:

```console
aws s3api put-object \
  --body <ПУТЬ> \
  --bucket <ИМЯ_БАКЕТА> \
  --key <КЛЮЧ_ОБЪЕКТА> \
  --object-lock-mode COMPLIANCE \
  --object-lock-retain-until-date "<СРОК_БЛОКИРОВКИ>" \
  --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<ПУТЬ>` — сақтау мерзімін өзгерту қажет объектілер орналасқан директорияға дейінгі жол.
- `<ИМЯ_БАКЕТА>` — бакет атауы.
- `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
- `<СРОК_БЛОКИРОВКИ>` — [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) форматындағы бұғаттаудың аяқталу күні мен уақыты. Мысал: `2030-01-01T00:00:00.000Z`.
- `<ENDPOINT_URL>` — аккаунттың {linkto(/kz/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

## {heading(4. Бұғаттау күйін тексеріңіз)[id=s3-regulatory-requirements-status-block]}

Объектінің уақытша бұғаттау статусын білу үшін келесі команданы орындаңыз:

```console
aws s3api get-object-retention \
  --bucket <ИМЯ_БАКЕТА> \
  --key <КЛЮЧ_ОБЪЕКТА> \
  --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
- `<КЛЮЧ_ОБЪЕКТА>` — объект атауы және оған дейінгі жол, егер каталогтар болса, оларды қоса.
- `<ENDPOINT_URL>` — аккаунттың {linkto(/kz/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

{cut(Команда шығысының мысалы)}

```json
{
  "Retention": {
    "Mode": "COMPLIANCE",
    "RetainUntilDate": "2030-01-01T00:00:00+00:00"
  }
}
```

{/cut}

## {heading(5. (Қосымша) Мерзімсіз бұғаттауды орнатыңыз)[id=s3-regulatory-requirements-legal-hold-lock]}

Деректерді белгісіз мерзімге сақтау туралы ресми сұрау түскен кезде {linkto(../../concepts/objects-lock#s3-concepts-object-lock-legal-hold)[text=мерзімсіз бұғаттауды]} (legal hold) пайдаланыңыз. Ол кез келген сақтау мерзімдерінен басымдыққа ие және айқын түрде алынғанға дейін объектіні жоюға немесе өзгертуге мерзімсіз тыйым салады.

1. Бұғаттауды орнатыңыз:

   ```console
   aws s3api put-object-legal-hold \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --legal-hold Status=ON \
     --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
   - `<ENDPOINT_URL>` — аккаунттың {linkto(/kz/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

1. Бұғаттау күйін тексеріңіз:

   ```console
   aws s3api get-object-legal-hold \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
   - `<ENDPOINT_URL>` — аккаунттың {linkto(/kz/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
   
   {cut(Команда шығысының мысалы)}
   
   ```json
   {
     "LegalHold": {
       "Status": "ON"
     }
   }
   ```
   
   {/cut}

{note:warn}
{linkto(../../instructions/objects/object-lock#s3-instructions-object-lock-legal-hold)[text=Бұғаттауды алып тастау]} тек тиісті құқықтар болған кезде ғана мүмкін және `Status=OFF` параметрі бар командамен орындалады.
{/note}
