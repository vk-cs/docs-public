Operations with objects:

- {linkto(#api-spec-s3-get-object)[text=%text]} — download an object from the bucket.
- {linkto(#api-spec-s3-head-object)[text=%text]} — get information about an object.
- {linkto(#api-spec-s3-put-object)[text=%text]} — upload an object to the bucket.
- {linkto(#api-spec-s3-copy-object)[text=%text]} — copy an object located in the bucket.
- {linkto(#api-spec-s3-delete-object)[text=%text]} — delete an object.
- {linkto(#api-spec-s3-delete-multiple-objects)[text=%text]} — delete a group of objects by a list.

## {heading(GetObject)[id=api-spec-s3-get-object]}

The `GET` operation retrieves an object from the bucket. To perform the operation, you must have `READ` permissions on the object.

By granting `READ` access to an anonymous user, you can return the object without using an authorization header.

The bucket has no directory hierarchy, unlike a standard file system. However, you can create a logical hierarchy using object key names that imply a structure with directories. For example, you can name an object not `sample.jpg`, but `photos/2020/August/01.jpg`.

To retrieve an object with such a logical hierarchy, specify the full object name in the `GET` operation.

Request example:

```curl
...
GET /example.txt HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T190539Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e912de79c88f07832558244bd867c3d834584c7f8b3d8efe4d0f0ba60b7a1dcb
'''
```

Response example:

```curl
...
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 19:05:39 GMT
x-amz-request-id: tx00000000000000279f46e-005963d003-1268c-ru-mska
Content-Type: text/plain
Content-Length: 14
Accept-Ranges: bytes
Last-Modified: Mon, 31 Aug 2020 19:05:09 GMT
Etag: "b3a92f49e7ae64acbf6b3e76f2040f5e"
Connection: close

Example text.
'''
```

{ifdef(s3-pdf)}
A description of the response headers is given in {linkto(#tab_response_headers)[text=Table %number]}.

{caption(Table {counter(table)[id=numb_tab_response_headers]} — Response headers)[align=right;position=above;id=tab_response_headers;number={const(numb_tab_response_headers)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Header
|Description

{ifdef(s3,s3-pdf)}

2+|**Object encryption headers**

2+|If all headers are specified, customer-key encryption is used. If only **x-amz-server-side-encryption** is specified, encryption is performed using KMS-generated keys

|`x-amz-server-side-encryption`
|The server-side encryption algorithm used when storing. When uploading, the object stored in the bucket must be encrypted on the server side.

Value: `AES256`

|`x-amz-server-side-encryption-customer-algorithm`
|The encryption algorithm for the customer key.

Value: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Customer key

|`x-amz-server-side-encryption-customer-key-MD5`
|Specifies the 128-bit MD5 hash of the key. A message integrity check to verify that the encryption key was transmitted without errors

{/ifdef}

2+|**Object tagging headers**

|`x-amz-tagging-count`
|The number of tags attached to the object, taking into account ACL. If the object has no tags, this header is not returned in the response

{ifdef(s3,s3-pdf)}

2+|**Header indicating the delete marker on objects**

|`x-amz-delete-marker`
|Indicates that the latest version of the object is being requested and it is marked with a delete marker (`true`). If `false`, this response header is not displayed in the response

{/ifdef}

2+|**Object lock response header**

|`x-amz-object-lock-legal-hold`
|The status of the legal hold placed on the object:

- `ON` — the lock is set
- `OFF` — the lock is not set

|`x-amz-object-lock-mode`
|The type of retention placed on the object:

- `GOVERNANCE` — governance retention
- `COMPLIANCE` — compliance retention

|`x-amz-object-lock-retain-until-date`
|The date and time the retention period ends, in ISO8601 format
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(HeadObject)[id=api-spec-s3-head-object]}

The `HEAD` operation retrieves metadata from an object without returning the object itself. This operation is used only when you need just the object's metadata. To use the `HEAD` operation, you must have `READ` permission on the object.

To request the `HEAD` operation, specify the same parameters as for the {linkto(#api-spec-s3-get-object)[text=%text]} operation. The response is identical to the `GET` response, except that the response body is absent.

If the requested object does not exist, the error returned depends on whether the account has the additional `s3:ListBucket` permission.

- If the `s3:ListBucket` permission is granted on the bucket, an HTTP 404 error is returned.
- If not, an HTTP 403 error is returned.

Request example:

```curl
...
HEAD /example.txt HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T185156Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
'''
```

Response example:

```curl
...
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:51:58 GMT
x-amz-request-id: tx0000000000000002ff1c9-00596912ce-6441-ru-mska
Content-Type: text/plain
Content-Length: 14
Accept-Ranges: bytes
Last-Modified: Mon, 31 Aug 2020 18:40:46 GMT
Etag: "b3a92f49e7ae64acbf6b3e76f2040f5e"
Connection: close
'''
```

{ifdef(s3-pdf)}
A description of the response headers is given in {linkto(#tab_response_headers2)[text=Table %number]}.

{caption(Table {counter(table)[id=numb_tab_response_headers2]} — Response headers)[align=right;position=above;id=tab_response_headers2;number={const(numb_tab_response_headers2)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Header
|Description

{ifdef(s3,s3-pdf)}

2+|**Object encryption headers**

2+|If all headers are specified, customer-key encryption is used. If only **x-amz-server-side-encryption** is specified, encryption is performed using KMS-generated keys

|`x-amz-server-side-encryption`
|The server-side encryption algorithm used when storing. When uploading, the object stored in the bucket must be encrypted on the server side.

Value: `AES256`

|`x-amz-server-side-encryption-customer-algorithm`
|The encryption algorithm for the customer key.

Value: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Customer key

|`x-amz-server-side-encryption-customer-key-MD5`
|Specifies the 128-bit MD5 hash of the key. A message integrity check to verify that the encryption key was transmitted without errors

{/ifdef}

2+|**Object tagging headers**

|`x-amz-tagging-count`
|The number of tags attached to the object, taking into account ACL. If the object has no tags, this header is not returned in the response

{ifdef(s3,s3-pdf)}

2+|**Header indicating the delete marker on objects**

|`x-amz-delete-marker`
|Indicates that the latest version of the object is being requested and it is marked with a delete marker (`true`). If `false`, this response header is not displayed in the response

{/ifdef}

2+|**Object lock response header**

|`x-amz-object-lock-legal-hold`
|The status of the legal hold placed on the object:

- `ON` — the lock is set
- `OFF` — the lock is not set

|`x-amz-object-lock-mode`
|The type of retention placed on the object:

- `GOVERNANCE` — governance retention
- `COMPLIANCE` — compliance retention

|`x-amz-object-lock-retain-until-date`
|The date and time the retention period ends, in ISO8601 format
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(PutObject)[id=api-spec-s3-put-object]}

The `PUT` operation adds an object to the bucket. To perform the operation, you must have `WRITE` permissions on the bucket.

{var(s3)} adds objects partially if the object size exceeds 50 MB. If a success response is received, the object has been added to the bucket in full.

When concurrent `PUT` operations are performed and there are identical objects being uploaded, {var(s3)} overwrites all but the last written object.

To prevent data corruption while passing through the network, it is recommended to use the `Content-MD5` header, which causes the object to be checked against the provided MD5 value and returns an error if there is a mismatch. In addition, you can calculate the MD5 when placing the object in the bucket and compare the returned `ETag` with the calculated MD5 value.

Request example:

```curl
...
PUT /example.txt HTTP/1.1
Content-Length: 14
Content-Type: text/plain
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: 003f0e5fe338b17be8be93fec537764ce199ac50f4e50f2685a753c4cc781747
x-amz-date: 20200831T194605Z
x-amz-meta-s3cmd-attrs:uid:1000/gname:asb/uname:asb/gid:1000/mode:33204/mtime:1499727909/atime:1499727909/md5:fb08934ef619f205f272b0adfd6c018c/ctime:1499713540
x-amz-storage-class: STANDARD
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-length;content-type;host;x-amz-content-sha256;x-amz-date;x-amz-meta-s3cmd-attrs;x-amz-storage-class,Signature=a9a9e16da23e0b37ae8362824de77d66bba2edd702ee5f291f6ecbb9ebac6013

Example text.
'''
```

Response example:

```curl
...
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 19:46:06 GMT
x-amz-request-id: tx0000000000000027bd57c-005963d97e-1268c-ru-mska
Content-Length: 0
Accept-Ranges: bytes
Last-Modified: Mon, 31 Aug 2020 19:05:09 GMT
Etag: "fb08934ef619f205f272b0adfd6c018c"
Connection: close
'''
```
{ifdef(s3-pdf)}
A description of the request headers is given in {linkto(#tab_request_headers2)[text=Table %number]}.

{caption(Table {counter(table)[id=numb_tab_request_headers2]} — Request headers)[align=right;position=above;id=tab_request_headers2;number={const(numb_tab_request_headers2)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Header
|Description

2+|**Object lock headers**

|`x-amz-object-lock-legal-hold`
|The status of the legal hold being set on the object:

- `ON` — the lock is set
- `OFF` — the lock is not set

|`x-amz-object-lock-mode`
|The type of retention being set on the object:

- `GOVERNANCE` — governance retention.
- `COMPLIANCE` — compliance retention

|`x-amz-object-lock-retain-until-date`
|The date and time the retention period ends

{ifdef(s3,s3-pdf)}

2+|**Object encryption headers**

2+|If all headers are specified, customer-key encryption is used. If only **x-amz-server-side-encryption** is specified, encryption is performed using KMS-generated keys

|`x-amz-server-side-encryption`
|The server-side encryption algorithm used when storing. When uploading, the object stored in the bucket must be encrypted on the server side.

Value: `AES256`

|`x-amz-server-side-encryption-customer-algorithm`
|The encryption algorithm for the customer key.

Value: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Customer key

|`x-amz-server-side-encryption-customer-key-MD5`
|Specifies the 128-bit MD5 hash of the key. A message integrity check to verify that the encryption key was transmitted without errors

{/ifdef}

2+|**Object tagging headers**

|`x-amz-tagging`
|Adds tags to the object. Specified as URL query parameters: `tag1=value1&tag2=value2`
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CopyObject)[id=api-spec-s3-copy-object]}

The `PUT` operation can create a copy of an object that is already stored in the bucket. The copy operation is identical to performing {linkto(#api-spec-s3-get-object)[text=%text]} followed by {linkto(#api-spec-s3-put-object)[text=%text]}. Adding the `x-amz-copy-source` header to the request causes the `PUT` operation to copy the source object into the target bucket.

When copying an object, you can retain most of the metadata (by default) or specify new metadata. To write new metadata when copying an object, you must include the `x-amz-metadata-directive: REPLACE` header in the request. However, ACL and ObjectLock are not copied - for the user sending the request, the new object will be private.

All copy requests must pass authentication and cannot contain a message body. In addition, you must have `READ` access to the source object and `WRITE` access to the target bucket.

A copy request can return an error in two cases. This can happen when the copy request is received, or when the objects are being copied. If the error occurs before the copy operation begins, a standard error is returned. If the error occurs during the copy operation, the error is embedded in a 200 OK response. This means that a 200 OK response can contain either a success or an error message.

Request example:

```curl
...
PUT /copied-example.txt HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-copy-source: /static-images/example.txt
x-amz-date: 20200831T202253Z
x-amz-metadata-directive: COPY
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-copy-source;x-amz-date;x-amz-metadata-directive;x-amz-storage-class,Signature=0cb03470dd80bdd41a4b8fb06c1800b27a5059b61b0303fe589578835531c877
'''
```

Response example:

```curl
...
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 20:22:54 GMT
x-amz-request-id: tx0000000000000027d8430-005963e21d-1268c-ru-mska
Content-Length: 183
Connection: close

<CopyObjectResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <LastModified>2020-08-31T20:22:54.167Z</LastModified>
  <ETag>7967bfe102f83fb5fc7e5a02bf05e8fc</ETag>
</CopyObjectResult>
'''
```

{ifdef(s3-pdf)}
A description of the request headers is given in {linkto(#tab_request_headers3)[text=Table %number]}.

{caption(Table {counter(table)[id=numb_tab_request_headers3]} — Request headers)[align=right;position=above;id=tab_request_headers3;number={const(numb_tab_request_headers3)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Header
|Description

2+|**Object lock headers**

|`x-amz-object-lock-legal-hold`
|The status of the legal hold being set on the object:

- `ON` — the lock is set
- `OFF` — the lock is not set

|`x-amz-object-lock-mode`
|The type of retention being set on the object:

- `GOVERNANCE` — governance retention.
- `COMPLIANCE` — compliance retention

|`x-amz-object-lock-retain-until-date`
|The date and time the retention period ends

{ifdef(s3,s3-pdf)}

2+|**Object encryption headers**

2+|If all headers are specified, customer-key encryption is used. If only **x-amz-server-side-encryption** is specified, encryption is performed using KMS-generated keys

|`x-amz-server-side-encryption`
|The server-side encryption algorithm used when storing. When uploading, the object stored in the bucket must be encrypted on the server side.

Value: `AES256`

|`x-amz-server-side-encryption-customer-algorithm`
|The encryption algorithm for the customer key.

Value: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Customer key

|`x-amz-server-side-encryption-customer-key-MD5`
|Specifies the 128-bit MD5 hash of the key. A message integrity check to verify that the encryption key was transmitted without errors

{/ifdef}

2+|**Object tagging headers**

|`x-amz-tagging`
|Adds tags to the object. Specified as URL query parameters: `tag1=value1&tag2=value2`. Used together with `x-amz-tagging-directive`:

|`x-amz-tagging-directive`
|Specifies whether the object's tag set is copied from the source object or replaced with the tag set specified in the request. Possible values: `COPY` (default), `REPLACE`

- If `x-amz-tagging-directive: REPLACE`, and `x-amz-tagging` is specified or empty, the source object's tags will be replaced;
- If `x-amz-tagging-directive: COPY` or empty, and `x-amz-tagging` is not specified, the source object's tags will be copied;
- If `x-amz-tagging-directive` is not specified, and `x-amz-tagging` is specified, a `501 Not Implemented` error will be returned
  |===
  {ifdef(s3-pdf)}
  {/caption}
  {/ifdef}

## {heading(DeleteObject)[id=api-spec-s3-delete-object]}

The `DELETE` operation deletes the object specified in the request.

To delete an object with `GOVERNANCE` retention set, specify the `x-amz-bypass-governance-retention` header in the request.

Request example:

```curl
...
DELETE /sammy.png HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T194408Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=c2a46b21e2e8589dfbfa54382030bbef8108b2504a9f1d8aaba70fb0e1c46522
'''
```

Response example:

```curl
...
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 19:44:09 GMT
x-amz-request-id: tx0000000000000027bbc48-005963d908-1268c-ru-mska
Connection: close
'''
```

## {heading(DeleteMultipleObjects)[id=api-spec-s3-delete-multiple-objects]}

Deletes objects by the list of keys passed in the request. The deletion list can contain no more than 1000 keys. The absence of an object is not an error — if the object does not exist, it will be marked as deleted in the response.

The `Content-MD5` and `Content-Length` headers are required, and the list of keys to delete is passed in XML format.

To bypass governance retention when performing this method, specify the `x-amz-bypass-governance-retention` header in the request.

Request example:

```curl
...
DELETE /sammy.png HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 176
Content-MD5: 44c4dcd3d2f3645544a366ae481342fa
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T194408Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=c2a46b21e2e8589dfbfa54382030bbef8108b2504a9f1d8aaba70fb0e1c46522

<?xml version="1.0" encoding="UTF-8"?>
<Delete>
    <Object>
        <Key>picture.png</Key>
    </Object>
    <Object>
         <Key>picture2.jpg</Key>
    </Object>
</Delete>
'''
```

Response example:

```curl
...
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 19:44:09 GMT
x-amz-request-id: tx0000000000000027bbc48-005963d908-1268c-ru-mska
Connection: close

<DeleteResult>
  <Deleted>
    <Key>picture.png</Key>
  </Deleted>
  <Error>
    <Key>some/another/key.txt</Key>
    <Code>TextErrorCode</Code>
    <Message>Describing message</Message>
  </Error>
</DeleteResult>
'''
```
