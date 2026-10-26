Methods for working with object encryption:

- {linkto(#api-spec-s3-get-bucket-encryption)[text=%text]} — get the encryption configuration set for the bucket.
- {linkto(#api-spec-s3-put-bucket-encryption)[text=%text]} — set object encryption for the bucket.
- {linkto(#api-spec-s3-delete-bucket-encryption)[text=%text]} — delete object encryption.

## {heading(GetBucketEncryption)[id=api-spec-s3-get-bucket-encryption]}

The `GetBucketEncryption` method returns the encryption configuration set for the bucket.

Request example:

```curl
GET /?encryption HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-expected-bucket-owner: ExpectedBucketOwner
```

Example of a successful response:

```curl
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<ServerSideEncryptionConfiguration>
   <Rule>
      <ApplyServerSideEncryptionByDefault>
         <KMSMasterKeyID>string</KMSMasterKeyID>
         <SSEAlgorithm>string</SSEAlgorithm>
      </ApplyServerSideEncryptionByDefault>
      <BucketKeyEnabled>boolean</BucketKeyEnabled>
   </Rule>
   ...
</ServerSideEncryptionConfiguration>
```

**Error code**

HTTP: 400. Error `ServerSideEncryptionConfigurationNotFoundError` — no default configuration.

## {heading(PutBucketEncryption)[id=api-spec-s3-put-bucket-encryption]}

The `PutBucketEncryption` method sets the default encryption for the bucket. If encryption is not set, new objects uploaded to the bucket are not encrypted. Key generation and decryption are performed by KMS. The encryption algorithm used is AES256.

Request example:

```curl
PUT /?encryption HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
Content-MD5: ContentMD5
x-amz-sdk-checksum-algorithm: ChecksumAlgorithm
x-amz-expected-bucket-owner: ExpectedBucketOwner
<?xml version="1.0" encoding="UTF-8"?>
<ServerSideEncryptionConfiguration xmlns="<http://hb.bizmrg.com/doc/2006-03-01/>">
					      <Rule>
                  <ApplyServerSideEncryptionByDefault>
                     <SSEAlgorithm>AES256</SSEAlgorithm>
                  </ApplyServerSideEncryptionByDefault>
               </Rule>
            </ServerSideEncryptionConfiguration>
```

**Path parameters**

{ifdef(s3-pdf)}
A description of the parameters is given in {linkto(#tab_path_parameters)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_path_parameters]} — Path parameters)[align=right;position=above;id=tab_path_parameters;number={const(numb_tab_path_parameters)}]}
{/ifdef}
[cols="1,1,1,1,3", options="header"]
|===
|Parameter
|Required
|Data type
|Value
|Description

|Bucket
|Yes
|bucket-name
| <!--- EMPTY CELL  --->
| <!--- EMPTY CELL  --->

|SSEAlgorithm
|Yes
|enum
|AES256
|Server-side encryption algorithm used for storage. When this header is added, the object stored in the bucket must be encrypted on the server side
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

**Response code**

HTTP: 200 OK.

## {heading(DeleteBucketEncryption)[id=api-spec-s3-delete-bucket-encryption]}

The `DeleteBucketEncryption` method deletes the object encryption configuration set for the bucket, if one is set.

Request example:

```curl
DELETE /?encryption HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-expected-bucket-owner: ExpectedBucketOwner
```

**Response code**

HTTP: 204 No Content — the server successfully processed the request.
