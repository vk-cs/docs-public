# {heading(Сындарлы деректерді қорғау)[id=s3-critical-backups-protect]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(s3)} объектілерді {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=олардың жойылуын немесе қайта жазылуын бұғаттау]} (Object Lock) арқылы қорғауға мүмкіндік береді. Объектілерді бұғаттауды сындарлы деректер үшін пайдаланыңыз, мысалы резервтік көшірмелер немесе аудит пен заңдық маңыздылықты қамтамасыз ету үшін белгіленген мерзімдер ішінде өзгермейтін түрде сақталуы тиіс деректер үшін.

## {heading(Дайындық қадамдары)[id=s3-critical-backups-protect-prepare]}

AWS CLI {linkto(../../connect/s3-cli#s3-connect-cli)[text=орнатылған және бапталған]} екеніне көз жеткізіңіз.

## {heading(1. Бакетті дайындаңыз)[id=s3-critical-backups-protect-create]}

1. Жаңа бакет жасаңыз:

   {include(../../_includes/_s3-manage-bucket.md)[tags=create_bucke,create_bucket_guide]}

1. {linkto(../../concepts/versioning#s3-concepts-versioning)[text=Нұсқалауды]} қосыңыз:

   {include(../../_includes/_s3-manage-bucket.md)[tags=version_bucket]}

1. {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=Объектілерді бұғаттауды]} қосыңыз:

   {include(../../_includes/_s3-manage-object.md)[tags=object_config_block]}

## {heading(2. Объектіні жүктеп, оған бұғаттауды орнатыңыз)[id=s3-critical-backups-protect-download]}

1. Объект жасаңыз:

   ```console
   echo "CRITICAL_DATA" > <ИМЯ_ОБЪЕКТА> \
   gzip <ИМЯ_ОБЪЕКТА>
   ```

1. Объектіні уақытша бұғаттауды {linkto(../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң режимде]} (`COMPLIANCE`) орната отырып жүктеңіз:

   {include(../../_includes/_s3-manage-object.md)[tags=put_object]}

## {heading(3. Бұғаттаудың қолданылғанына көз жеткізіңіз)[id=s3-critical-backups-protect-block-on]}

{include(../../_includes/_s3-manage-object.md)[tags=object_state]}

Жауапта бұғаттау режимін және аяқталу күнін растайтын JSON-құрылым болуы тиіс.

## {heading(4. Объектіні жою мүмкін емес екеніне көз жеткізіңіз)[id=s3-critical-backups-protect-not-delete]}

Объектіні жоюға әрекет жасап көріңіз:

{include(../../_includes/_s3-manage-object.md)[tags=object_rm-single]}

Жауап ретінде `Access Denied` қатесі келуі тиіс. Бұл белсенді WORM-қорғауды растайды.

## {heading(5. Объектіге қолжетімділікті тексеріңіз)[id=s3-critical-backups-protect-access]}

Объектіні жүктеп алыңыз:

{include(../../_includes/_s3-manage-object.md)[tags=get_object]}

Объект оқу және жүктеп алу үшін қолжетімді болып қалады, бұл оны қалпына келтіру үшін пайдалануға мүмкіндік береді.
