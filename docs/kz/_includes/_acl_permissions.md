VK Object Storage ACL аясында қолдайтын рұқсаттар түрлері кестеде келтірілген. Әр рұқсат үшін оның қандай құқықтар беретіндігі және бакетке және объектіге берілген кезде қандай операцияларды орындауға рұқсат ететіні көрсетілген.

[cols="1,3,3", options="header"]
|===
|ACL рұқсаты
|Бакет үшін берілген
|Объект үшін берілген

|`READ`
|Бакеттегі объектілер тізімін алу

HeadBucket, ListMultiparts, ListObjects, ListParts
|Объектінің мазмұнын және оның метадеректерін оқу

GetObject, HeadObject

|`WRITE`
|Бакеттегі кез келген объектіні жасау, қайта жазу және жою

AbortMultipartUpload, CompleteMultipartUpload, InitiateMultipartUpload, UploadPart, PutObject, DeleteObject
|Қолданылмайды

|`READ_ACP`
|Бакеттің ACL-ын оқу

GetBucketAcl
|Объектінің ACL-ын оқу

GetObjectAcl

|`WRITE_ACP`
|Бакет үшін ACL орнату

PutBucketAcl
|Объект үшін ACL орнату

PutObjectAcl

|`FULL_CONTROL`
|Бакет үшін рұқсаттар шеңберіндегі барлық құқықтар: `READ`, `WRITE`, `READ_ACP` және `WRITE_ACP`
|Объект үшін рұқсаттар шеңберіндегі барлық құқықтар: `READ`, `READ_ACP` және `WRITE_ACP`
|===
