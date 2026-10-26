Multipart upload allows you to save objects in {var(s3)} in parts. This can be useful when uploading or copying large objects. We recommend using multipart upload for objects larger than 100 MB.

Multipart upload consists of the following steps:

- {linkto(#api-spec-s3-create-multipart-upload)[text=%text]} — initializing the upload.
- {linkto(#api-spec-s3-upload-part)[text=%text]} — uploading a part of the object.
- {linkto(#api-spec-s3-complete-multipart-upload)[text=%text]} — completing the upload by combining previously uploaded parts.
- {linkto(#api-spec-s3-abort-multipart-upload)[text=%text]} — abort the upload.
- {linkto(#api-spec-s3-list-parts)[text=%text]} — get the list of uploaded parts.

## {heading(CreateMultipartUpload)[id=api-spec-s3-create-multipart-upload]}

The operation initializes a multipart upload and returns an upload ID. The upload ID is used to combine all parts of a single multipart upload. This upload ID must be specified in each subsequent part upload request.

If a lifecycle rule is configured to abort incomplete multipart uploads, the upload must complete within the number of days specified in the bucket's lifecycle configuration. Otherwise, the abort operation becomes available for the incomplete multipart upload, and the service aborts the multipart upload.

{ifdef(public)}
{note:info}
After initializing a multipart upload and uploading one or more parts, you must complete or abort the multipart upload to stop being charged for storing the uploaded parts. Only after the multipart upload is completed or aborted does {var(s3)} release the space allocated to the parts in storage and stop charging for storing these parts.
{/note}
{/ifdef}

Example request:

```curl
POST /multipart-file.tar.gz?uploads HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date:20200831T174652Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e356966fff5a3d49d19c0e44e0fdba294964384a58061d3e60dfd1a4a5b605ad
```

{ifdef(s3-pdf)}
Request header descriptions are provided in {linkto(#tab_request1)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_request1]} — Request headers)[align=right;position=above;id=tab_request1;number={const(numb_tab_request1)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Header
|Description

2+|**Object lock headers**

|`x-amz-object-lock-legal-hold`
|Status of the indefinite lock placed on the object:

- `ON` — the lock is set
- `OFF` — the lock is not set

|`x-amz-object-lock-mode`
|Type of temporary lock placed on the object:

- `GOVERNANCE` — temporary governance lock.
- `COMPLIANCE` — temporary compliance lock

|`x-amz-object-lock-retain-until-date`
|Date and time the temporary lock expires

{ifdef(s3,s3-pdf)}

2+|**Object encryption headers**

2+|If all headers are specified, encryption with a customer-provided key is used. If only the **x-amz-server-side-encryption** header is specified, encryption using KMS-generated keys is used

|`x-amz-server-side-encryption`
|Server-side encryption algorithm used for storage. When uploading, the object saved in the bucket must be encrypted on the server side.

Value: `AES256`

|`x-amz-server-side-encryption-customer-algorithm`
|Encryption algorithm for the customer-provided key.

Value: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Customer-provided key

|`x-amz-server-side-encryption-customer-key-MD5`
|Specifies the 128-bit MD5 hash of the key. Message integrity check to ensure the encryption key was transmitted without errors

{/ifdef}

2+|**Object tagging headers**

|`x-amz-tagging`
|Adds tags to the object. Specified as URL request parameters: `tag1=value1&tag2=value2`
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

Example response:

```curl
HTTP/1.1 200 OK
Content-Length: 286
Content-Type: application/xml
Date: Mon, 31 Aug 2020 17:46:53 GMT
x-amz-request-id: tx00000000000000ab66a13-005991e20d-66a8-ru-mska
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
  <InitiateMultipartUploadResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Bucket>static-images</Bucket>
    <Key>multipart-file.tar.gz</Key>
    <UploadId>2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh</UploadId>
  </InitiateMultipartUploadResult>
```

## {heading(UploadPart)[id=api-spec-s3-upload-part]}

The operation uploads a part of a multipart upload. To perform this operation, you must provide the part's data in the request. To upload a part from an existing object, use the upload part (copy) operation.

A part can have any number from 1 to 10,000 inclusive. The part number uniquely identifies the part and its position within the object being created. If you upload a new part with a number already assigned to an existing part, the existing part is overwritten. The size of each part, except the last one, must be at least 5 MB. The last part of a multipart upload has no size limit.

To make sure the data is not corrupted during transfer over the network, specify the `Content-MD5` header in the part upload request. {var(s3)} compares the data from the parts with the provided MD5 hash value and returns an error if they do not match.

Example request:

```curl
PUT /multipart-file.tar.gz?partNumber=1&uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 5242880
x-amz-content-sha256: 6ab0931e613fd0cd39af0fa4733edb6ad942df0ad33e057713d44df7195b6ecf
x-amz-date: 20200831T184459Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=2e4adca0a3164af8717f340ca874b4f3036dd0294b590a70f2147427221ca1e8
```

{ifdef(s3-pdf)}
Request header descriptions are provided in {linkto(#tab_request2)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_request2]} — Request headers)[align=right;position=above;id=tab_request2;number={const(numb_tab_request2)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Header
|Description

2+|**Object encryption headers**

|`x-amz-server-side-encryption-customer-algorithm`
|Encryption algorithm for the customer-provided key.

Value: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Customer-provided key

|`x-amz-server-side-encryption-customer-key-MD5`
|Specifies the 128-bit MD5 hash of the key. Message integrity check to ensure the encryption key was transmitted without errors
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

Example response:

```curl
HTTP/1.1 200 OK
Content-Length: 0
Content-Type: application/xml
Date: Mon, 31 Aug 2020 18:45:01 GMT
Etag: "d8d3ed3a4de016917a814a2cf5acad3c"
x-amz-request-id: tx00000000000000ab85dab-005991efac-66a8-ru-mska
Connection: close
```

## {heading(CompleteMultipartUpload)[id=api-spec-s3-complete-multipart-upload]}

The operation completes a multipart upload by combining the previously uploaded parts. After receiving this request, {var(s3)} combines all uploaded parts in ascending order by part number, creating a new object. The request to complete the multipart upload must provide a list of parts. For each part in the list, provide the part number and the ETag header value returned after uploading that part.

Processing a request to complete a multipart upload can take several minutes. After processing of the request begins, {var(s3)} sends an HTTP response header containing a `200 OK` response. While the request is being processed, whitespace characters are periodically sent to prevent the timeout limit from being exceeded. Since an error can occur in the request after the initial `200 OK` response has been sent, you must check the response body to determine whether the request completed successfully.

Example request:

```curl
POST /multipart-file.tar.gz?uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 358
x-amz-content-sha256: 6ab0931e613fd0cd39af0fa4733edb6ad942df0ad33e057713d44df7195b6ecf
x-amz-date: 20200831T184459Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=2e4adca0a3164af8717f340ca874b4f3036dd0294b590a70f2147427221ca1e8

<CompleteMultipartUpload>
  <Part>
    <PartNumber>1</PartNumber>
    <ETag>"d8d3ed3a4de016917a814a2cf5acad3c"</ETag>
  </Part>
  <Part>
    <PartNumber>2</PartNumber>
    <ETag>"adf5feafc0fe4632008d5cb30beb1c49"</ETag>
  </Part>
  <Part>
    <PartNumber>3</PartNumber>
    <ETag>"363f6bb50866541d78e5f6f626592263"</ETag>
  </Part>
</CompleteMultipartUpload>
```

{ifdef(s3-pdf)}
Request header descriptions are provided in {linkto(#tab_request3)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_request3]} — Request headers)[align=right;position=above;id=tab_request3;number={const(numb_tab_request3)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Header
|Description

2+|**Object encryption headers**

|`x-amz-server-side-encryption-customer-algorithm`
|Encryption algorithm for the customer-provided key.

Value: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Customer-provided key

|`x-amz-server-side-encryption-customer-key-MD5`
|Specifies the 128-bit MD5 hash of the key. Message integrity check to ensure the encryption key was transmitted without errors
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

Example response:

```curl
HTTP/1.1 200 OK
Content-Length: 336
Content-Type: application/xml
Date: Mon, 31 Aug 2020 18:45:01 GMT
x-amz-request-id: tx00000000000000ab962c8-005991f6fe-66a8-ru-mska
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
  <CompleteMultipartUploadResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Location>my-test-bucket1.hb.ru-msk.vkcloud-storage.ru</Location>
    <Bucket>my-test-bucket1</Bucket>
    <Key>multipart-file.tar.gz</Key>
    <ETag>f935869350d7cbfcdd219df3f377531b-3</ETag>
  </CompleteMultipartUploadResult>
```

## {heading(AbortMultipartUpload)[id=api-spec-s3-abort-multipart-upload]}

The operation aborts a multipart upload. After a multipart upload is aborted, no additional parts can be uploaded using the ID of the aborted multipart upload. The space allocated for storing the previously uploaded parts is released. However, if any parts are being uploaded at the time, that operation may complete or fail. As a result, it may be necessary to abort the multipart upload multiple times to fully release the space occupied by all parts.

Example request:

```curl
DELETE /multipart-file.tar.gz?uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 5242880
x-amz-content-sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date:20200831T202611Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=9e13d3f9e71ca5fb034fe66e92c60e30b3az3e177573702dd11d2b541358bf92
```

Example response:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:45:01 GMT
x-amz-request-id: tx00000000000000abbaefe-0059920764-66a8-ru-mska
Connection: close
```

## {heading(ListParts)[id=api-spec-s3-list-parts]}

The operation returns a list of parts uploaded for a specific multipart upload. The operation must include the upload ID obtained after sending the request to initialize the multipart upload. Such a request returns no more than 1000 uploaded parts. You can limit the number of returned parts by specifying the `max-parts` request parameter. If the multipart upload consists of more than 1000 parts, the response returns the `NextPartNumberMarker` element and the `IsTruncated` field with a value of `true`. Subsequent requests to list parts can include the `part-number-marker` query string parameter, setting it to the value of the `NextPartNumberMarker` field from the previous response.

Example request:

```curl
GET /?uploads&delimiter=Delimiter&encoding-type=EncodingType&key-marker=KeyMarker&max-uploads=MaxUploads&prefix=Prefix&upload-id-marker=UploadIdMarker HTTP/1.1

PUT /multipart-file.tar.gz?partNumber=1&uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 5242880
x-amz-content-sha256: 6ab0931e613fd0cd39af0fa4733edb6ad942df0ad33e057713d44df7195b6ecf
x-amz-date: 20200831T184459Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=2e4adca0a3164af8717f340ca874b4f3036dd0294b590a70f2147427221ca1e8
```

Example response:

```curl
HTTP/1.1 200 OK
Content-Length: 980
Content-Type: application/xml
Date: Mon, 31 Aug 2020 18:45:01 GMT
Etag: "d8d3ed3a4de016917a814a2cf5acad3c"
x-amz-request-id: tx00000000000000ab85dab-005991efac-66a8-ru-mska
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
  <ListPartsResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Bucket>my-test-bucket1</Bucket>
    <Key>multipart-file.tar.gz</Key>
    <UploadId>2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh</UploadId>
    <StorageClass>STANDARD</StorageClass>
    <PartNumberMarker>0</PartNumberMarker>
    <NextPartNumberMarker>1</NextPartNumberMarker>
    <MaxParts>1000</MaxParts>
    <IsTruncated>false</IsTruncated>
    <Owner>
      <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
      <DisplayName>VK Cloud_UserName</DisplayName>
    </Owner>
    <Part>
      <LastModified>2017-08-14T18:45:01.601Z</LastModified>
      <PartNumber>1</PartNumber>
      <ETag>"d8d3ed3a4de016917a814a2cf5acad3c"</ETag>
      <Size>5242880</Size>
    </Part>
    <Part>
      <LastModified>2017-08-14T18:45:01.601Z</LastModified>
      <PartNumber>2</PartNumber>
      <ETag>"adf5feafc0fe4632008d5cb30beb1c49"</ETag>
      <Size>5242880</Size>
    </Part>
  </ListPartsResult>
```
