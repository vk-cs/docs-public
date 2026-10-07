# {heading(Сындарлы деректерді қорғау)[id=s3-critical-backups-protect]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(s3)} объектілерді {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=олардың жойылуын немесе қайта жазылуын бұғаттау]} (Object Lock) арқылы қорғауға мүмкіндік береді. Объектілерді бұғаттауды сындарлы деректер үшін пайдаланыңыз, мысалы резервтік көшірмелер немесе аудит пен заңдық маңыздылықты қамтамасыз ету үшін белгіленген мерзімдер ішінде өзгермейтін түрде сақталуы тиіс деректер үшін.

## {heading(Дайындық қадамдары)[id=s3-critical-backups-protect-prepare]}

AWS CLI {linkto(../../connect/s3-cli#s3-connect-cli)[text=орнатылған және бапталған]} екеніне көз жеткізіңіз.

## {heading(1. Бакетті дайындаңыз)[id=s3-critical-backups-protect-create]}

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

## {heading(2. Объектіні жүктеп, оған бұғаттауды орнатыңыз)[id=s3-critical-backups-protect-download]}

1. Объект жасаңыз:

   ```console
   echo "CRITICAL_DATA" > <ИМЯ_ОБЪЕКТА> \
   gzip <ИМЯ_ОБЪЕКТА>
   ```

1. Объектіні уақытша бұғаттауды {linkto(../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң режимде]} (`COMPLIANCE`) орната отырып жүктеңіз:

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

## {heading(3. Бұғаттаудың қолданылғанына көз жеткізіңіз)[id=s3-critical-backups-protect-block-on]}

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

Жауапта бұғаттау режимін және аяқталу күнін растайтын JSON-құрылым болуы тиіс.

## {heading(4. Объектіні жою мүмкін емес екеніне көз жеткізіңіз)[id=s3-critical-backups-protect-not-delete]}

Объектіні жоюға әрекет жасап көріңіз:

```console
aws s3api delete-object \
   --bucket <ИМЯ_БАКЕТА> \
   --key <КЛЮЧ_ОБЪЕКТА> \
   --version-id <ID_ВЕРСИИ> \
   --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<ИМЯ_БАКЕТА>` — объект орналасқан бакет атауы.
- `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
- `<ID_ВЕРСИИ>` — {linkto(../../concepts/versioning#s3-concepts-versioning-version-id)[text=нұсқаның идентификаторы]}. Объект {linkto(../../concepts/versioning#s3-concepts-versioning)[text=нұсқалауы]} қосылған бакетте орналасқан.
- `<ENDPOINT_URL>` — VK Object Storage сервисінің домені, аккаунттың {linkto(/kz/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.

Жауап ретінде `Access Denied` қатесі келуі тиіс. Бұл белсенді WORM-қорғауды растайды.

## {heading(5. Объектіге қолжетімділікті тексеріңіз)[id=s3-critical-backups-protect-access]}

Объектіні жүктеп алыңыз:

```console
aws s3api get-object \
  --bucket <ИМЯ_БАКЕТА> \
  --key <КЛЮЧ_ОБЪЕКТА> \
  --version-id <ID_ВЕРСИИ> \
  <ИМЯ_ФАЙЛА> \
  --endpoint-url <ENDPOINT_URL>
```

Мұнда:

- `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
- `<КЛЮЧ_ОБЪЕКТА>` — объект атауы және оған дейінгі жол, егер каталогтар болса, оларды қоса.
- `<ID_ВЕРСИИ>` — {linkto(../../concepts/versioning#s3-concepts-versioning-version-id)[text=нұсқаның идентификаторы]}. Нұсқалау қосылған бакеттегі объект. Егер `--version-id` параметрі көрсетілмесе, ағымдағы нұсқа пайдаланылады.
- `<ИМЯ_ФАЙЛА>` — жүктеп алынған файлға берілетін атау.
- `<ENDPOINT_URL>` — аккаунттың {linkto(/kz/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

Объект оқу және жүктеп алу үшін қолжетімді болып қалады, бұл оны қалпына келтіру үшін пайдалануға мүмкіндік береді.
