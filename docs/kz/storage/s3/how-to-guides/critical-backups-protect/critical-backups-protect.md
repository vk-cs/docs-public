# {heading(Сыни маңызды деректерді қорғау)[id=s3-critical-backups-protect]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(s3)} нысандарды {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=жоюды немесе қайта жазуды блоктау арқылы]} (Object Lock) қорғауға мүмкіндік береді. Нысандарды блоктауды сыни маңызды деректер үшін, мысалы, резервтік көшірмелер немесе аудитті қамтамасыз ету және заңды маңыздылық үшін белгіленген мерзім ішінде өзгермейтін түрде сақтау қажет деректер үшін пайдаланыңыз.

## {heading(Дайындық қадамдар)[id=s3-critical-backups-protect-prepare]}

AWS CLI {linkto(../../connect/s3-cli#s3-connect-cli)[text=орнатылған және бапталғанына]} көз жеткізіңіз.

## {heading(1. Бакетті дайындаңыз)[id=s3-critical-backups-protect-create]}

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

1. {linkto(../../concepts/versioning#s3-concepts-versioning)[text=Версиялауды]} қосыңыз:

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

## {heading(2. Нысанды жүктеңіз және оған блоктау орнатыңыз)[id=s3-critical-backups-protect-download]}

1. Нысан жасаңыз:

   ```console
   echo "CRITICAL_DATA" > <НЫСАН_АТЫ> \
   gzip <НЫСАН_АТЫ>
   ```

1. Нысанды {linkto(../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң режимде]} (`COMPLIANCE`) уақытша блоктау орнатумен жүктеңіз:

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

   - `<ЖОЛ>` — нысандардағы сақтау мерзімін өзгерту қажет директорияға дейінгі жол.
   - `<БАКЕТ_АТЫ>` — бакет атауы.
   - `<НЫСАН_КІЛТІ>` — нысанның толық атауы, оған дейінгі жолды қоса.
   - `<БЛОКТАУ_МЕРЗІМІ>` — блоктау аяқталу күні мен уақыты [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) форматында. Мысал: `2030-01-01T00:00:00.000Z`.
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

## {heading(3. Блоктау қолданылғанына көз жеткізіңіз)[id=s3-critical-backups-protect-block-on]}

Нысанның уақытша блоктау күйін білу үшін команданы орындаңыз:

```console
aws s3api get-object-retention \
  --bucket <БАКЕТ_АТЫ> \
  --key <НЫСАН_КІЛТІ> \
  --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<БАКЕТ_АТЫ>` — қажетті нысан орналасқан бакеттің атауы.
- `<НЫСАН_КІЛТІ>` — нысанның атауы және оған дейінгі жол, бар болса директорияларды қоса.
- `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

Жауапта блоктау режимі мен аяқталу күнін растайтын JSON-құрылым болуы тиіс.

## {heading(4. Нысанды жою мүмкін еместігіне көз жеткізіңіз)[id=s3-critical-backups-protect-not-delete]}

Нысанды жоюға тырысыңыз:

```console
aws s3api delete-object \
   --bucket <БАКЕТ_АТЫ> \
   --key <НЫСАН_КІЛТІ> \
   --version-id <ВЕРСИЯ_ID> \
   --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<БАКЕТ_АТЫ>` — нысан орналасқан бакеттің атауы.
- `<НЫСАН_КІЛТІ>` — нысанның толық атауы, оған дейінгі жолды қоса.
- `<ВЕРСИЯ_ID>` — {linkto(../../concepts/versioning#s3-concepts-versioning)[text=версиялауы бар]} бакеттегі нысанның {linkto(../../concepts/versioning#s3-concepts-versioning-version-id)[text=версия идентификаторы]}.
- `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

Жауап ретінде `Access Denied` қатесі келуі тиіс. Бұл белсенді WORM-қорғанысты растайды.

## {heading(5. Нысанға қолжетімділікті тексеріңіз)[id=s3-critical-backups-protect-access]}

Нысанды жүктеп алыңыз:

```console
aws s3api get-object \
  --bucket <БАКЕТ_АТЫ> \
  --key <НЫСАН_КІЛТІ> \
  --version-id <ВЕРСИЯ_ID> \
  <ФАЙЛ_АТЫ> \
  --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<БАКЕТ_АТЫ>` — қажетті нысан орналасқан бакеттің атауы.
- `<НЫСАН_КІЛТІ>` — нысанның атауы және оған дейінгі жол, бар болса директорияларды қоса.
- `<ВЕРСИЯ_ID>` — версиялауы бар бакеттегі нысанның {linkto(../../concepts/versioning#s3-concepts-versioning-version-id)[text=версия идентификаторы]}. Егер `--version-id` параметрі көрсетілмесе, ағымдағы версия қолданылады.
- `<ФАЙЛ_АТЫ>` — жүктеп алынған файлға берілетін атау.
- `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

Нысан оқуға және жүктеп алуға қолжетімді күйінде қалады, бұл оны қалпына келтіру үшін пайдалануға мүмкіндік береді.