{include(/kz/_includes/_translated_by_ai.md)}

VK Object Storage объектілерді [оларды жоюды немесе қайта жазуды бұғаттау](/kz/storage/s3/concepts/objects-lock) (Object Lock) арқылы қорғауға мүмкіндік береді. Объектілерді бұғаттауды сыни деректер, мысалы, резервтік көшірмелер немесе аудит пен заңдық маңыздылықты қамтамасыз ету үшін белгіленген мерзім ішінде өзгермейтін түрде сақталуы тиіс деректер үшін пайдаланыңыз.

## Дайындық қадамдары

AWS CLI [орнатылған және бапталғанына](/kz/storage/s3/connect/s3-cli) көз жеткізіңіз.

## 1. Бакетті дайындаңыз

{tabs}

{tab(Жаңа бакет үшін)}

Объектілерді жоюдан бұғаттау мүмкіндігі бар жаңа бакет жасаңыз:

   {include(/kz/_includes/_s3-manage-bucket.md)[tags=create_bucket_block]}

{/tab}

{tab(Бар бакет үшін)}

Бакет объектілерін бұғаттауды конфигурациялаңыз:

   {include(/kz/_includes/_s3-manage-object.md)[tags=object_config_block]}

{/tab}

{/tabs}

## 2. Объектіні жүктеп, оған бұғаттауды орнатыңыз

1. Объект жасаңыз:

   ```console
   echo "CRITICAL_DATA" > <ИМЯ_ОБЪЕКТА> \
   gzip <ИМЯ_ОБЪЕКТА>
   ```

1. [Қатаң режимде](/kz/storage/s3/concepts/objects-lock#compliance-lock) (`COMPLIANCE`) уақытша бұғаттауды орнатып, объектіні жүктеңіз:

   {include(/kz/_includes/_s3-manage-object.md)[tags=put_object]}

## 3. Бұғаттаудың қолданылғанына көз жеткізіңіз

{include(/kz/_includes/_s3-manage-object.md)[tags=object_state]}

Жауапта бұғаттау режимі мен аяқталу күнін растайтын JSON құрылымы болуы керек.

## 4. Объектіні жою мүмкін еместігін тексеріңіз

Объектіні жойып көріңіз:

{include(/kz/_includes/_s3-manage-object.md)[tags=object_rm]}

Жауап ретінде `Access Denied` қатесі келуі керек. Бұл белсенді WORM қорғанысын растайды.

## 5. Объектіге қолжетімділікті тексеріңіз

Объектіні жүктеп алыңыз:

{include(/kz/_includes/_s3-manage-object.md)[tags=get_object]}

Объект оқу және жүктеп алу үшін қолжетімді болып қалады, бұл оны қалпына келтіру үшін пайдалануға мүмкіндік береді.
