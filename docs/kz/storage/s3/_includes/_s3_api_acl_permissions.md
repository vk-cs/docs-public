{ifndef(s3-pdf)}Кестеде{/ifndef}{ifdef(s3-pdf)}{linkto(#tab_acl_permissions)[text=%number кестесінде]}{/ifdef} VK Object Storage ACL ішінде қолдайтын рұқсат түрлері келтірілген. Әрбір рұқсат үшін оның қандай құқықтар беретіндігі және бакетте және объектіде берілген кезде қандай операцияларды орындауға рұқсат ететіні көрсетілген.

{ifdef(s3-pdf)}
{caption(Кесте {counter(table)[id=numb_tab_acl_permissions]} — Рұқсат түрлері)[align=right;position=above;id=tab_acl_permissions;number={const(numb_tab_acl_permissions)}]}
{/ifdef}
[cols="1,3,3", options="header"]
|===
|ACL рұқсаты
|Бакет үшін берілген
|Объект үшін берілген

|`READ`
|Бакеттегі объектілер тізімін алу

HeadBucket, ListMultiparts, ListObjects, ListParts
|Объект мазмұнын және оның метадеректерін оқу

GetObject, HeadObject

|`WRITE`
|Бакеттегі кез келген объектіні жасау, қайта жазу және жою

AbortMultipartUpload, CompleteMultipartUpload, InitiateMultipartUpload, UploadPart, PutObject, DeleteObject
|Қолданылмайды

|`READ_ACP`
|Бакеттің ACL-ін оқу

GetBucketAcl
|Объектінің ACL-ін оқу

GetObjectAcl

|`WRITE_ACP`
|Бакет үшін ACL орнату

PutBucketAcl
|Объект үшін ACL орнату

PutObjectAcl

|`FULL_CONTROL`
|Бакетке арналған рұқсаттар шеңберіндегі барлық құқықтар: `READ`, `WRITE`, `READ_ACP` және `WRITE_ACP`
|Объектіге арналған рұқсаттар шеңберіндегі барлық құқықтар: `READ`, `READ_ACP` және `WRITE_ACP`
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}