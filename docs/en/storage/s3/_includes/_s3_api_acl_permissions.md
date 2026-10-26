In the {ifndef(s3-pdf)}table{/ifndef}{ifdef(s3-pdf)}{linkto(#tab_acl_permissions)[text=table %number]}{/ifdef} below are the types of permissions that VK Object Storage supports in ACLs. For each permission, the rights it grants and the operations it allows are shown for when it is granted on a bucket and on an object.

{ifdef(s3-pdf)}
{caption(Table {counter(table)[id=numb_tab_acl_permissions]} — Types of permissions)[align=right;position=above;id=tab_acl_permissions;number={const(numb_tab_acl_permissions)}]}
{/ifdef}
[cols="1,3,3", options="header"]
|===
|ACL permission
|Granted on a bucket
|Granted on an object

|`READ`
|Lists the objects in the bucket

HeadBucket, ListMultiparts, ListObjects, ListParts
|Reads the object's content and metadata

GetObject, HeadObject

|`WRITE`
|Creates, overwrites, and deletes any object in the bucket

AbortMultipartUpload, CompleteMultipartUpload, InitiateMultipartUpload, UploadPart, PutObject, DeleteObject
|Not applicable

|`READ_ACP`
|Reads the bucket's ACL

GetBucketAcl
|Reads the object's ACL

GetObjectAcl

|`WRITE_ACP`
|Sets the ACL for the bucket

PutBucketAcl
|Sets the ACL for the object

PutObjectAcl

|`FULL_CONTROL`
|All rights within the bucket permissions: `READ`, `WRITE`, `READ_ACP`, and `WRITE_ACP`
|All rights within the object permissions: `READ`, `READ_ACP`, and `WRITE_ACP`
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}
