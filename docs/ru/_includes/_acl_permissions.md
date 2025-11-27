В таблице приведены виды разрешений, которые VK Object Storage поддерживает в ACL. Для каждого разрешения указано, какие права оно дает и какие операции разрешает выполнять при предоставлении на бакете и на объекте.

[cols="1,3,3", options="header"]
|===
|Разрешение ACL
|Предоставлено для бакета
|Предоставлено для объекта

|`READ`
|Получение списка объектов в бакете

HeadBucket, ListMultiparts, ListObjects, ListParts
|Чтение содержимого объекта и его метаданных

GetObject, HeadObject

|`WRITE`
|Создание, перезапись и удаление любого объекта в бакете

AbortMultipartUpload, CompleteMultipartUpload, InitiateMultipartUpload, UploadPart, PutObject, DeleteObject
|Неприменимо

|`READ_ACP`
|Чтение ACL бакета

GetBucketAcl
|Чтение ACL объекта

GetObjectAcl

|`WRITE_ACP`
|Установка ACL для бакета

PutBucketAcl
|Установка ACL для объекта

PutObjectAcl

|`FULL_CONTROL`
|Все права в рамках разрешений для бакета: `READ`, `WRITE`, `READ_ACP` и `WRITE_ACP`
|Все права в рамках разрешений для объекта: `READ`, `READ_ACP` и `WRITE_ACP`
|===
