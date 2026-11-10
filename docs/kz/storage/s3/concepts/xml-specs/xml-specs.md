# {heading(Деректер түрлерінің сипаттамасы)[id=s3-concepts-xml-specs]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(AccessControlPolicy)[id=s3-concepts-xml-specs-access-control-policy]}

{ifdef(s3-pdf)}
AccessControlPolicy деректер түрлерінің сипаттамасы {linkto(#tab_access-control-policy)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_access-control-policy]} — AccessControlPolicy)[align=right;position=above;id=tab_access-control-policy;number={const(numb_tab_access-control-policy)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|Owner
|Бакет иесі
|Owner
| ![](../../assets/no.svg "inline")

|AccessControlList
|Array of Grant
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Bucket)[id=s3-concepts-xml-specs-bucket]}

{ifdef(s3-pdf)}
Bucket деректер түрлерінің сипаттамасы {linkto(#tab_bucket)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_bucket]} — Bucket)[align=right;position=above;id=tab_bucket;number={const(numb_tab_bucket)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|Name
|Бакет атауы
|String
| ![](../../assets/no.svg "inline")

|CreationDate
|Жасалған күні. Бұл күн өзгерістер енгізілгенде, мысалы, бакет саясатын өзгерткенде өзеруі мүмкін
|Timestamp
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CompletedMultipartUpload)[id=s3-concepts-xml-specs-completed-multipart-upload]}

{ifdef(s3-pdf)}
CompletedMultipartUpload деректер түрлерінің сипаттамасы {linkto(#tab_completed-multipart-upload)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_completed-multipart-upload]} — CompletedMultipartUpload)[align=right;position=above;id=tab_completed-multipart-upload;number={const(numb_tab_completed-multipart-upload)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|Part
|CompletedPart массиві
|Array of CompletedPart
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CompletedPart)[id=s3-concepts-xml-specs-completed-part]}

{ifdef(s3-pdf)}
CompletedPart деректер түрлерінің сипаттамасы {linkto(#tab_completed-part)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_completed-part]} — CompletedPart)[align=right;position=above;id=tab_completed-part;number={const(numb_tab_completed-part)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|ETag
|Бөлікті жүктеу кезінде қайтарылған объект тегі
|String
| ![](../../assets/no.svg "inline")

|PartNumber
|Құрамдас жүктеу нөмірі
|Integer
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CompleteMultipartUploadResult)[id=s3-concepts-xml-specs-complete-multipart-upload-result]}

{ifdef(s3-pdf)}
CompleteMultipartUploadResult деректер түрлерінің сипаттамасы {linkto(#tab_complete-multipart-upload-result)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_complete-multipart-upload-result]} — CompleteMultipartUploadResult)[align=right;position=above;id=tab_complete-multipart-upload-result;number={const(numb_tab_complete-multipart-upload-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|Bucket
|Жүктелетін объект бар бакет атауы
|String
| ![](../../assets/no.svg "inline")

|ETag
|Бөлікті жүктеу кезінде қайтарылған объект тегі
|String
| ![](../../assets/no.svg "inline")

|Key
|Объект кілті
|String
| ![](../../assets/no.svg "inline")

|Location
|Жүктелетін объектіні анықтайтын URI
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Contents)[id=s3-concepts-xml-specs-contents]}

{ifdef(s3-pdf)}
Contents деректер түрлерінің сипаттамасы {linkto(#tab_contents)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_contents]} — Contents)[align=right;position=above;id=tab_contents;number={const(numb_tab_contents)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|Contents
|Объект туралы деректер
|Objects
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CopyObjectResult)[id=s3-concepts-xml-specs-copy-object-result]}

{ifdef(s3-pdf)}
CopyObjectResult деректер түрлерінің сипаттамасы {linkto(#tab_copy-object-result)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_copy-object-result]} — CopyObjectResult)[align=right;position=above;id=tab_copy-object-result;number={const(numb_tab_copy-object-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|LastModified
|Объектінің соңғы өзгерту күні
|String
| ![](../../assets/no.svg "inline")

|ETag
|Жаңа объектінің ETag мәнін қайтарады. ETag объектінің тек мазмұнындағы өзгерістерді көрсетеді, бірақ оның метадеректерін емес
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CORSConfiguration)[id=s3-concepts-xml-specs-cors-configuration]}

{ifdef(s3-pdf)}
CORSConfiguration деректер түрлерінің сипаттамасы {linkto(#tab_cors-configuration)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_cors-configuration]} — CORSConfiguration)[align=right;position=above;id=tab_cors-configuration;number={const(numb_tab_cors-configuration)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|CORSRule
|Арасында рұқсат ету қажет дереккөздер мен қолжетімділік әдістерінің жиынтығы
|Array of CORSRule
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CORSRule)[id=s3-concepts-xml-specs-cors-rule]}

{ifdef(s3-pdf)}
CORSRule деректер түрлерінің сипаттамасы {linkto(#tab_cors-rule)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_cors-rule]} — CORSRule)[align=right;position=above;id=tab_cors-rule;number={const(numb_tab_cors-rule)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|AllowedHeaders
|`Access-Control-Request-Headers` тақырыбында көрсетілген тақырыптар. Бұл тақырыптар `OPTIONS` алдын ала сұрауында рұқсат етілген. Кез келген `OPTIONS` алдын ала сұрауына жауап ретінде {var(s3)} рұқсат етілген барлық сұралған тақырыптарды қайтарады
|Array of strings
| ![](../../assets/no.svg "inline")

|AllowedMethods
|Дереккөзге орындауға рұқсат етілетін HTTP-әдіс. Рұқсат етілген мәндер: `GET`, `PUT`, `HEAD`, `POST` және `DELETE`
|Array of strings
| ![](../../assets/no.svg "inline")

|AllowedOrigins
|Клиенттерге бакетке қолжетімділік бергіңіз келетін бір немесе бірнеше дереккөз
|Array of strings
| ![](../../assets/no.svg "inline")

|ExposeHeaders
|Клиенттерге өз қосымшаларыңыздан (мысалы, JavaScript XMLHttpRequest объектісінен) қолжетімді еткіңіз келетін жауаптағы бір немесе бірнеше тақырып
|Array of strings
| ![](../../assets/no.svg "inline")

|ID
|Ереженің бірегей идентификаторы
|Array of strings
| ![](../../assets/no.svg "inline")

|MaxAgeSeconds
|Браузеріңіздің көрсетілген ресурс үшін алдын ала жауапты кэштеуі тиіс уақыты, секундпен
|Integer
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CreateBucketConfiguration)[id=s3-concepts-xml-specs-create-bucket-configuration]}

{ifdef(s3-pdf)}
CreateBucketConfiguration деректер түрлерінің сипаттамасы {linkto(#tab_create-bucket-configuration)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_create-bucket-configuration]} — CreateBucketConfiguration)[align=right;position=above;id=tab_create-bucket-configuration;number={const(numb_tab_create-bucket-configuration)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|LocationConstraint
|Бакет жасалатын өңір. Егер өңір көрсетілмесе, ол әдепкі өңірде жасалады
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CreatePrefixKeyResult)[id=s3-concepts-xml-specs-create-prefix-key-result]}

{ifdef(s3-pdf)}
CreatePrefixKeyResult деректер түрлерінің сипаттамасы {linkto(#tab_create-prefix-key-result)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_create-prefix-key-result]} — CreatePrefixKeyResult)[align=right;position=above;id=tab_create-prefix-key-result;number={const(numb_tab_create-prefix-key-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|BucketName
|Бакет атауы
|String
| ![](../../assets/no.svg "inline")

|Prefix
|Осы кілттер бойынша қолжетімді болатын жол префиксі
|String
| ![](../../assets/no.svg "inline")

|UserName
|Кілттер тиесілі пайдаланушы
|String
| ![](../../assets/no.svg "inline")

|SecretKey
|Құпия кілт, тек жасау кезінде қайтарылады, кілтті кейіннен алу мүмкін емес
|String
| ![](../../assets/no.svg "inline")

|AccessKey
|Ашық кілт
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Delete)[id=s3-concepts-xml-specs-delete]}

{ifdef(s3-pdf)}
Delete деректер түрлерінің сипаттамасы {linkto(#tab_delete)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_delete]} — Delete)[align=right;position=above;id=tab_delete;number={const(numb_tab_delete)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|Objects
|Жойылатын объектілер
|Array of ObjectIdentifier
| ![](../../assets/check.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(DeletedObject)[id=s3-concepts-xml-specs-deleted-object]}

{ifdef(s3-pdf)}
DeletedObject деректер түрлерінің сипаттамасы {linkto(#tab_deleted-object)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_deleted-object]} — DeletedObject)[align=right;position=above;id=tab_deleted-object;number={const(numb_tab_deleted-object)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|Key
|Жойылған объектінің кілті
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(DeletePrefixKeyResult)[id=s3-concepts-xml-specs-delete-prefix-key-result]}

{ifdef(s3-pdf)}
DeletePrefixKeyResult деректер түрлерінің сипаттамасы {linkto(#tab_delete-prefix-key-result)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_delete-prefix-key-result]} — DeletePrefixKeyResult)[align=right;position=above;id=tab_delete-prefix-key-result;number={const(numb_tab_delete-prefix-key-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|Prefix
|Осы кілттер бойынша қолжетімді болатын жол префиксі
|String
| ![](../../assets/no.svg "inline")

|UserName
|Кілттер тиесілі пайдаланушы
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(DeleteResult)[id=s3-concepts-xml-specs-delete-result]}

{ifdef(s3-pdf)}
DeleteResult деректер түрлерінің сипаттамасы {linkto(#tab_delete-result)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_delete-result]} — DeleteResult)[align=right;position=above;id=tab_delete-result;number={const(numb_tab_delete-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|Deleted
|Сәтті жойылған объектілерге арналған контейнер
|Array of DeletedObject
| ![](../../assets/check.svg "inline")

|Error
|Жою мүмкін болмаған объектіні сипаттауға арналған контейнер
|Array of Error
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Error)[id=s3-concepts-xml-specs-error]}

{ifdef(s3-pdf)}
Error деректер түрлерінің сипаттамасы {linkto(#tab_error)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_error]} — Error)[align=right;position=above;id=tab_error;number={const(numb_tab_error)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|Code
|Қате коды
|String
| ![](../../assets/no.svg "inline")

|Key
|Объект кілті
|String
| ![](../../assets/no.svg "inline")

|Message
|Қате туралы хабарлама
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Grant)[id=s3-concepts-xml-specs-grant]}

{ifdef(s3-pdf)}
Grant деректер түрлерінің сипаттамасы {linkto(#tab_grant)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_grant]} — Grant)[align=right;position=above;id=tab_grant;number={const(numb_tab_grant)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|Grantee
|Рұқсаттар берілген тұлға
|Grantee
| ![](../../assets/no.svg "inline")

|Permission
|Тұлғаға берілген рұқсат түрі
|Мына мәндердің бірі: 

- `FULL_CONTROL`
- `WRITE`
- `WRITE_ACP`
- `READ`
- `READ_ACP`
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Grantee)[id=s3-concepts-xml-specs-grantee]}

{ifdef(s3-pdf)}
Grantee деректер түрлерінің сипаттамасы {linkto(#tab_grantee)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_grantee]} — Grantee)[align=right;position=above;id=tab_grantee;number={const(numb_tab_grantee)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|ID
|Рұқсаттар берілген тұлғаның ID-сы
|String
| ![](../../assets/no.svg "inline")

|DisplayName
|Рұқсаттар берілген тұлғаның көрсетілетін атауы
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(InitiateMultipartUploadResult)[id=s3-concepts-xml-specs-initiate-multipart-upload-result]}

{ifdef(s3-pdf)}
InitiateMultipartUploadResult деректер түрлерінің сипаттамасы {linkto(#tab_initiate-multipart-upload-result)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_initiate-multipart-upload-result]} — InitiateMultipartUploadResult)[align=right;position=above;id=tab_initiate-multipart-upload-result;number={const(numb_tab_initiate-multipart-upload-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|Bucket
|Құрамдас жүктеу басталған бакет атауы
|String
| ![](../../assets/check.svg "inline")

|Key
|Құрамдас жүктеу басталған объектінің кілті
|String
| ![](../../assets/check.svg "inline")

|UploadId
|Басталған құрамдас жүктеудің ID-сы
|String
| ![](../../assets/check.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(LifecycleConfiguration)[id=s3-concepts-xml-specs-lifecycle-configuration]}

{ifdef(s3-pdf)}
LifecycleConfiguration деректер түрлерінің сипаттамасы {linkto(#tab_lifecycle-configuration)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_lifecycle-configuration]} — LifecycleConfiguration)[align=right;position=above;id=tab_lifecycle-configuration;number={const(numb_tab_lifecycle-configuration)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|Rule
|Фильтр ережелерінің сипаттамасы
|Array of {linkto(#s3-concepts-xml-specs-lifecyclerule-api)[text=%text]}
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(LifecycleExpiration)[id=s3-concepts-xml-specs-lifecycle-api]}

{ifdef(s3-pdf)}
LifecycleExpiration деректер түрлерінің сипаттамасы {linkto(#tab_lifecycle_api)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_lifecycle_api]} — LifecycleExpiration)[align=right;position=above;id=tab_lifecycle_api;number={const(numb_tab_lifecycle_api)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|Date
|Объект жойылуы тиіс күн
|Timestamp
| ![](../../assets/no.svg "inline")

|Days
|Объектінің өмір сүру уақыты, тәулікпен
|Integer
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(AbortIncompleteMultipartUpload)[id=s3-concepts-xml-specs-abort-incomplete-multipart-upload-api]}

{ifdef(s3-pdf)}
AbortIncompleteMultipartUpload деректер түрлерінің сипаттамасы {linkto(#tab_abort_incomplete_multipart_upload_api)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_abort_incomplete_multipart_upload_api]} — AbortIncompleteMultipartUpload)[align=right;position=above;id=tab_abort_incomplete_multipart_upload_api;number={const(numb_tab_abort_incomplete_multipart_upload_api)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|DaysAfterInitiation
|Құрамдас жүктеу басталғаннан кейінгі тәулік саны, ол өткеннен кейін аяқталмаған құрамдас жүктеу үзіледі және жүктелген барлық бөліктер жойылады
|Integer
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(LifecycleRule)[id=s3-concepts-xml-specs-lifecyclerule-api]}

{ifdef(s3-pdf)}
LifecycleRule деректер түрлерінің сипаттамасы {linkto(#tab_lifecyclerule_api)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_lifecyclerule_api]} — LifecycleRule)[align=right;position=above;id=tab_lifecyclerule_api;number={const(numb_tab_lifecyclerule_api)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|ID
|Ереженің бірегей идентификаторы
|String
| ![](../../assets/no.svg "inline")

|Status
|Ереже күйі:

- `Enabled` — қазіргі уақытта қолданылады;
- `Disabled` — қазіргі уақытта қолданылмайды
|String
| ![](../../assets/no.svg "inline")

|Filter
|Өмірлік цикл ережесінің фильтріне арналған контейнер
|{linkto(#s3-concepts-xml-specs-lifecyclerulefilter-api)[text=%text]}
| ![](../../assets/no.svg "inline")

|Expiration
|Объектінің өмір сүру мерзімін көрсетеді
|{linkto(#s3-concepts-xml-specs-lifecycle-api)[text=%text]}
| ![](../../assets/no.svg "inline")

|AbortIncompleteMultipartUpload
|Аяқталмаған құрамдас жүктеу басталғаннан кейінгі тәулік санын көрсетеді, ол өткеннен кейін {var(s3)} жүктеудің барлық бөліктерін қайтарылмайтын түрде жояды
|{linkto(#s3-concepts-xml-specs-abort-incomplete-multipart-upload-api)[text=%text]}
| ![](../../assets/no.svg "inline")

|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

<!--- //|Transition -->
<!--- //|Объекттің көрсетілген сақтау класына өтетін уақытын көрсетеді -->
<!--- //|Array of xml_Transition -->
<!--- // ![](../../assets/no.svg "inline") -->

## {heading(LifecycleRuleFilter)[id=s3-concepts-xml-specs-lifecyclerulefilter-api]}

{ifdef(s3-pdf)}
LifecycleRuleFilter деректер түрлерінің сипаттамасы {linkto(#tab_lifecyclerulefilter_api)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_lifecyclerulefilter_api]} — LifecycleRuleFilter)[align=right;position=above;id=tab_lifecyclerulefilter_api;number={const(numb_tab_lifecyclerulefilter_api)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Аты
|Сипаттама
|Түрі
|Міндетті

|Prefix
|Lifecycle ережесі қолданылатын бір немесе бірнеше объектіні анықтайтын префикс
|String
| ![](../../assets/no.svg "inline")

|Tag
|Объект белгісі. Объектілерді логикалық белгілеуге арналған кілт-мән жұбы
|Array of {linkto(#s3-concepts-xml-specs-xml-tag)[text=%text]}
| ![](../../assets/no.svg "inline")

|And
|«ЖӘНЕ» логикалық операторы. Бір ережеде префикс бойынша да, белгілер бойынша да сүзгілеуді үйлестіру үшін қолданылады
|Prefix

Array of {linkto(#s3-concepts-xml-specs-xml-tag)[text=%text]}

| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(ListAllMyBucketsResult)[id=s3-concepts-xml-specs-list-all-my-buckets-result]}

{ifdef(s3-pdf)}
ListAllMyBucketsResult деректер түрлерінің сипаттамасы {linkto(#tab_list-all-my-buckets-result)[text=кестеде %number]} берілген.

{caption({counter(table)[id=numb_tab_list-all-my-buckets-result]} кесте — ListAllMyBucketsResult)[align=right;position=above;id=tab_list-all-my-buckets-result;number={const(numb_tab_list-all-my-buckets-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Түрі
|Міндетті

|Owner
|Иеленуші туралы ақпарат
|Owner
| ![](../../assets/no.svg "inline")

|Buckets
|Бакеттер тізімі
|Array of Bucket
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(ListBucketResult)[id=s3-concepts-xml-specs-list-bucket-result]}

{ifdef(s3-pdf)}
ListBucketResult деректер түрлерінің сипаттамасы {linkto(#tab_list-bucket-result)[text=кестеде %number]} берілген.

{caption({counter(table)[id=numb_tab_list-bucket-result]} кесте — ListBucketResult)[align=right;position=above;id=tab_list-bucket-result;number={const(numb_tab_list-bucket-result)}]}
{/ifdef}
[cols="2,6,4,2",options="header"]
|===
|Атауы
|Сипаттамасы
|Түрі
|Міндетті

|IsTruncated
|Барлық нәтижелер қайтарылғанын (true) немесе қайтарылмағанын (false) көрсетеді. Нәтижелер саны көрсетілген `MaxKeys` мәнінен асса, барлық нәтижелер қайтарылмауы мүмкін
|Boolean
| ![](../../assets/no.svg "inline")

|MaxKeys
|Объект денесінде қайтарылатын объектілердің ең көп саны
|String
| ![](../../assets/no.svg "inline")

|Name
|Бакет атауы
|String
| ![](../../assets/no.svg "inline")

|Prefix
|Көрсетілген префикстен басталатын кілттер
|String
| ![](../../assets/no.svg "inline")

|Contents
|Қайтарылған әр объект туралы метадеректер
|Array of Contents
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

<!--- //|CommonPrefixes -->
<!--- //|-->
<!--- //|String -->
<!--- //|-->
<!--- // -->
<!--- //|Delimiter -->
<!--- //|-->
<!--- //|String -->
<!--- //|-->
<!--- //|Marker -->
<!--- //|Бакеттің қай сегментінен листингті бастау керектігін көрсетеді. -->
<!--- //|String -->
<!--- //| ![](../../assets/no.svg "inline") -->

## {heading(ListPartsResult)[id=s3-concepts-xml-specs-list-parts-result]}

{ifdef(s3-pdf)}
ListPartsResult деректер түрлерінің сипаттамасы {linkto(#tab_list-parts-result)[text=кестеде %number]} берілген.

{caption({counter(table)[id=numb_tab_list-parts-result]} кесте — ListPartsResult)[align=right;position=above;id=tab_list-parts-result;number={const(numb_tab_list-parts-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Түрі
|Міндетті

|Bucket
|Құрама жүктеу басталған бакеттің атауы
|String
| ![](../../assets/no.svg "inline")

|IsTruncated
|Қайтарылатын бөліктер тізімінің қысқару көрсеткіші
|Boolean
| ![](../../assets/no.svg "inline")

|Key
|Объект кілті
|String
| ![](../../assets/no.svg "inline")

|MaxParts
|Жауапта рұқсат етілген бөліктердің ең көп саны
|Integer
| ![](../../assets/no.svg "inline")

|NextPartNumberMarker
|Қысқартылған қайтарылатын бөліктер тізімі үшін жауаптағы құрама жүктеудің соңғы бөлігінің көрсеткіші
|Integer
| ![](../../assets/no.svg "inline")

|Owner
|Объект иеленушісі
|Owner
| ![](../../assets/no.svg "inline")

|Part
|Құрама жүктеу бөліктерінің массиві
|Array of Part
| ![](../../assets/no.svg "inline")

|PartNumberMarker
|Қысқартылған қайтарылатын бөліктер тізімі үшін жауаптағы құрама жүктеудің соңғы бөлігінің көрсеткіші
|Integer
| ![](../../assets/no.svg "inline")

|StorageClass
|Сақтау класы, STANDARD мәнімен толтырылады
|String
| ![](../../assets/no.svg "inline")

|UploadId
|Тізімде көрсетілген құрама жүктеуді анықтайтын жүктеу идентификаторы
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

<!--- //|Initiator -->
<!--- //|Құрама жүктеуді бастаған тұлға -->
<!--- //|Initiator -->
<!--- //|-->

## {heading(ListPrefixKeysResult)[id=s3-concepts-xml-specs-list-prefix-keys-result]}

{ifdef(s3-pdf)}
ListPrefixKeysResult деректер түрлерінің сипаттамасы {linkto(#tab_list-prefix-keys-result)[text=кестеде %number]} берілген.

{caption({counter(table)[id=numb_tab_list-prefix-keys-result]} кесте — ListPrefixKeysResult)[align=right;position=above;id=tab_list-prefix-keys-result;number={const(numb_tab_list-prefix-keys-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Түрі
|Міндетті

|BucketName
|Бакет атауы
|String
| ![](../../assets/no.svg "inline")

|IsTruncated
|Барлық нәтижелер қайтарылғанын (true) немесе қайтарылмағанын (false) көрсетеді
|Boolean
| ![](../../assets/no.svg "inline")

|Marker
|Листинг басталатын пайдаланушы аты немесе атаудың бір бөлігі
|String
| ![](../../assets/no.svg "inline")

|NamePrefix
|Пайдаланушы аты бойынша префикс
|String
| ![](../../assets/no.svg "inline")

|MaxKeys
|Листингтегі элементтердің ең көп саны
|String
| ![](../../assets/no.svg "inline")

|Contents
|Пайдаланушыны қамтитын блок
|Array of Contents
| ![](../../assets/no.svg "inline")

|UserName
|Кілттер тиесілі пайдаланушы
|String
| ![](../../assets/no.svg "inline")

|Prefix
|Осы пайдаланушы үшін деректер қолжетімді префикс
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Object)[id=s3-concepts-xml-specs-object]}

{ifdef(s3-pdf)}
Object деректер түрлерінің сипаттамасы {linkto(#tab_object)[text=кестеде %number]} берілген.

{caption({counter(table)[id=numb_tab_object]} кесте — Object)[align=right;position=above;id=tab_object;number={const(numb_tab_object)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Түрі
|Міндетті

|ETag
|Объект хеші. ETag объектінің мазмұнындағы өзгерістерді ғана көрсетеді, оның метадеректерін емес
|String
| ![](../../assets/no.svg "inline")

|Key
|Объект атауы. Объектіні шығарып алу үшін кілт ретінде пайдаланылады
|String
| ![](../../assets/no.svg "inline")

|LastModified
|Объект жасалған күні
|Timestamp
| ![](../../assets/no.svg "inline")

|Owner
|Объект иеленушісі
|Owner
| ![](../../assets/no.svg "inline")

|Size
|Объект өлшемі байтпен
|Integer
| ![](../../assets/no.svg "inline")

|StorageClass
|Объектіні сақтау үшін пайдаланылатын сақтау класы. Ағымдағы іске асыруда `STANDARD` мәнін қабылдайды
|String
| ![](../../assets/no.svg "inline")

|VersionId
|Объект нұсқасының ID-сы
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(ObjectIdentifier)[id=s3-concepts-xml-specs-object-identifier]}

{ifdef(s3-pdf)}
ObjectIdentifier деректер түрлерінің сипаттамасы {linkto(#tab_object-identifier)[text=кестеде %number]} берілген.

{caption({counter(table)[id=numb_tab_object-identifier]} кесте — ObjectIdentifier)[align=right;position=above;id=tab_object-identifier;number={const(numb_tab_object-identifier)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Түрі
|Міндетті

|Key
|Объект кілті
|String
| ![](../../assets/check.svg "inline")
|===
{/caption}

<!--- //|VersionId -->
<!--- //|Объект ID-сы -->
<!--- //|String -->
<!--- //| ![](../../assets/no.svg "inline") -->

## {heading(Owner)[id=s3-concepts-xml-specs-owner]}

{ifdef(s3-pdf)}
Owner деректер түрлерінің сипаттамасы {linkto(#tab_owner)[text=кестеде %number]} берілген.

{caption({counter(table)[id=numb_tab_owner]} кесте — Owner)[align=right;position=above;id=tab_owner;number={const(numb_tab_owner)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Түрі
|Міндетті

|DisplayName
|Иеленушінің көрсетілетін аты
|String
| ![](../../assets/no.svg "inline")

|ID
|Иеленушінің ID-сы
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Part)[id=s3-concepts-xml-specs-part]}

{ifdef(s3-pdf)}
Part деректер түрлерінің сипаттамасы {linkto(#tab_part)[text=кестеде %number]} берілген.

{caption({counter(table)[id=numb_tab_part]} кесте — Part)[align=right;position=above;id=tab_part;number={const(numb_tab_part)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Түрі
|Міндетті

|ETag
|Объект бөлігін жүктегенде қайтарылатын объект тегі
|String
| ![](../../assets/no.svg "inline")

|LastModified
|Объект бөлігі жүктелген күні мен уақыты
|Timestamp
| ![](../../assets/no.svg "inline")

|PartNumber
|Құрама жүктеу нөмірі
|Integer
| ![](../../assets/no.svg "inline")

|Size
|Құрама жүктеудің жүктелген бөлігінің өлшемі
|Integer
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Tag)[id=s3-concepts-xml-specs-xml-tag]}

{ifdef(s3-pdf)}
Tag деректер түрлерінің сипаттамасы {linkto(#tab_xml_tag)[text=кестеде %number]} берілген.

{caption({counter(table)[id=numb_tab_xml_tag]} кесте — Tag)[align=right;position=above;id=tab_xml_tag;number={const(numb_tab_xml_tag)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Түрі
|Міндетті

|Key
|Белгі кілті. Ұзындығы — 128 таңбаға дейін
|String
| ![](../../assets/no.svg "inline")

|Value
|Белгі мәні. Ұзындығы — 256 таңбаға дейін
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

<!--- // [[xml_Transition]] -->
<!--- // == Transition -->
<!--- // [cols="2,4,1,1"] -->
<!--- // |=== -->
<!--- // |Атауы |Сипаттамасы |Түрі |Міндетті -->
<!--- // |Date -->
<!--- // |Объекттердің көрсетілген сақтау класына қашан ауыстырылатынын көрсетеді -->
<!--- // |Timestamp -->
<!--- // | ![](../../assets/no.svg "inline") -->
<!--- // |Days -->
<!--- // |Объекттер жасалғаннан кейін қанша күн өткенде көрсетілген сақтау класына ауыстырылатынын көрсетеді -->
<!--- // |Integer -->
<!--- // | ![](../../assets/no.svg "inline") -->
<!--- // |StorageClass -->
<!--- // |Сақтау класының идентификаторы -->
<!--- // |String -->
<!--- // | ![](../../assets/no.svg "inline") -->
<!--- // |=== -->