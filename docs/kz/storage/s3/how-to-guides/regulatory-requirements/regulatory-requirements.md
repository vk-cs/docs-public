# {heading(Сақтау қоймасын нормативтік талаптарға сай баптау)[id=s3-regulatory-requirements]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(s3)} нысандарды {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=олардың жойылуын немесе қайта жазылуын блоктау арқылы]} (Object Lock) қорғауға мүмкіндік береді. Нысандарды блоктауды нормативтік немесе заңнамалық талаптарға сәйкес белгіленген мерзім ішінде өзгеріссіз сақтауды және одан кейін жойылуды қажет ететін маңызды деректер үшін (мысалы, жеке деректер) пайдаланыңыз. Бұл аудитті және заңды маңыздылықты қамтамасыз етуге көмектеседі.

## {heading(Дайындық қадамдар)[id=s3-regulatory-requirements-prepare]}

AWS CLI {linkto(../../connect/s3-cli#s3-connect-cli)[text=орнатылғанын және бапталғанын]} тексеріңіз.

## {heading(1. Бакетті дайындаңыз)[id=s3-regulatory-requirements-bucket-create]}

1. Жаңа бакет жасаңыз:

   ```console
   aws s3api create-bucket \
       --bucket <БАКЕТ_АТЫ> \
       --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<БАКЕТ_АТЫ>` — {linkto(../../concepts/about#s3-concepts-about-bucket-naming)[text=ұсынылған ережелерге]} сәйкес бакет атауы.

     Бакет жасалғаннан кейін оның атауын өзгерту мүмкін болмайды.

   - `<ENDPOINT_URL>` — VK Object Storage сервисінің домені, аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.

1. {linkto(../../concepts/versioning#s3-concepts-versioning)[text=Нұсқаларды сақтауды]} (versioning) қосыңыз:

   ```console
   aws s3api put-bucket-versioning \
     --bucket <БАКЕТ_АТЫ> \
     --versioning-configuration Status=Enabled \
     --endpoint-url <ENDPOINT_URL>  
   ```

   Мұнда:

   - `<БАКЕТ_АТЫ>` — бакет атауы.
   - `<ENDPOINT_URL>` — VK Object Storage сервисінің домені, аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.

1. {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=Нысандарды блоктауды]} қосыңыз:

   ```console
   aws s3api put-object-lock-configuration \
     --bucket <БАКЕТ_АТЫ> \
     --object-lock-configuration '{
       "ObjectLockEnabled": "Enabled"
       }' \
     --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<БАКЕТ_АТЫ>` — бакет атауы.
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

## {heading(2. Бакет үшін әдепкі сақтау саясатын баптаңыз)[id=s3-regulatory-requirements-policy-settings]}

Бакет үшін {linkto(../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң режимдегі]} (`COMPLIANCE`) уақытша блоктау орнатыңыз және деректерді сақтаудың нақты мерзімін көрсетіңіз:

```console
aws s3api put-object-lock-configuration \
  --bucket <БАКЕТ_АТЫ> \
  --object-lock-configuration '{
    "ObjectLockEnabled": "Enabled",
    "Rule": {
      "DefaultRetention": {
        "Mode": "<БЛОКТАУ_РЕЖИМІ>",
        "Days": <БЛОКТАУ_МЕРЗІМІ>
      }
    }
  }' \
  --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<БАКЕТ_АТЫ>` — бакет атауы.
- `<БЛОКТАУ_РЕЖИМІ>` — блоктау режимі:
  - `GOVERNANCE` — оны айналып өту мүмкіндігі бар {linkto(../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=басқарылатын блоктау режимі]};
  - `COMPLIANCE` — белгіленген мерзім бітпей тұрып оны алу мүмкіндігі жоқ {linkto(../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң блоктау режимі]}.
- `<БЛОКТАУ_МЕРЗІМІ>` — нысан жүктелген сәттен бастап блоктау мерзімі күндермен (`Days`) немесе жылдармен (`Years`). `Days` және `Years` мәндерін бір мезгілде көрсетуge болмайды. Мысал: `1825` күн (5 жыл).
- `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

{note:err}
`COMPLIANCE` режимі орнатылғаннан кейін оны жеңілдетуге немесе өшіруге болмайды, бірақ деректерді сақтау мерзімін ұзартуға болады.
{/note}

## {heading(3. (Қалау бойынша) Нысан үшін жеке сақтау мерзімін орнатыңыз)[id=s3-regulatory-requirements-shelf-life]}

Жеке сақтау мерзімін әртүрлі категорияларға жататын және сақтау мерзімі әртүрлі нысандар үшін орнатуға болады.

Нысанды жүктеген кезде блоктауды орнатыңыз:

```console
aws s3api put-object \
  --body <ЖОЛ> \
  --bucket <БАКЕТ_АТЫ> \
  --key <НЫСАН_КІЛТІ> \
  --object-lock-mode COMPLIANCE \
  --object-lock-retain-until-date "<БЛОКТАУ_МЕРЗІМІ>" \
  --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<ЖОЛ>` — нысандардағы сақтау мерзімін өзгерту қажет каталогқа дейінгі жол.
- `<БАКЕТ_АТЫ>` — бакет атауы.
- `<НЫСАН_КІЛТІ>` — оған дейінгі жолды қоса алғанда нысанның толық атауы.
- `<БЛОКТАУ_МЕРЗІМІ>` — блоктау аяқталуының күні мен уақыты [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) форматында. Мысал: `2030-01-01T00:00:00.000Z`.
- `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

## {heading(4. Блоктау күйін тексеріңіз)[id=s3-regulatory-requirements-status-block]}

Нысанның уақытша блоктау күйін білу үшін команданы орындаңыз:

```console
aws s3api get-object-retention \
  --bucket <БАКЕТ_АТЫ> \
  --key <НЫСАН_КІЛТІ> \
  --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<БАКЕТ_АТЫ>` — қажетті нысан орналасқан бакеттің атауы.
- `<НЫСАН_КІЛТІ>` — бар болса, каталогтарды қоса алғанда нысанның атауы және оған дейінгі жол.
- `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

{cut(Команда нәтижесінің мысалы)}

```json
{
  "Retention": {
    "Mode": "COMPLIANCE",
    "RetainUntilDate": "2030-01-01T00:00:00+00:00"
  }
}
```

{/cut}

## {heading(5. (Қалау бойынша) Мерзімсіз блоктауды орнатыңыз)[id=s3-regulatory-requirements-legal-hold-lock]}

Деректерді белгісіз мерзімге сақтау туралы ресми сұрау түскен жағдайда {linkto(../../concepts/objects-lock#s3-concepts-object-lock-legal-hold)[text=мерзімсіз блоктауды]} (legal hold) пайдаланыңыз. Ол кез келген сақтау мерзімдерінен жоғары басымдыққа ие және ол айқын алынғанға дейін нысанды жоюды немесе өзгертуді мерзімсіз тыйым салады.

1. Блоктауды орнатыңыз:

   ```console
   aws s3api put-object-legal-hold \
     --bucket <БАКЕТ_АТЫ> \
     --key <НЫСАН_КІЛТІ> \
     --legal-hold Status=ON \
     --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<БАКЕТ_АТЫ>` — қажетті нысан орналасқан бакеттің атауы.
   - `<НЫСАН_КІЛТІ>` — оған дейінгі жолды қоса алғанда нысанның толық атауы.
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

1. Блоктау күйін тексеріңіз:

   ```console
   aws s3api get-object-legal-hold \
     --bucket <БАКЕТ_АТЫ> \
     --key <НЫСАН_КІЛТІ> \
     --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<БАКЕТ_АТЫ>` — бакет атауы.
   - `<НЫСАН_КІЛТІ>` — оған дейінгі жолды қоса алғанда нысанның толық атауы.
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

   {cut(Команда нәтижесінің мысалы)}

   ```json
   {
     "LegalHold": {
       "Status": "ON"
     }
   }
   ```

   {/cut}

{note:warn}
{linkto(../../instructions/objects/object-lock#s3-instructions-object-lock-legal-hold)[text=Блоктауды алу]} тек сәйкес құқықтар болған жағдайда ғана мүмкін және `Status=OFF` параметрі бар командамен орындалады.
{/note}