Bucket operations:

- {linkto(#api-spec-s3-create-bucket)[text=%text]} — create a bucket.
- {linkto(#api-spec-s3-list-buckets)[text=%text]} — get a list of buckets.
- {linkto(#api-spec-s3-head-bucket)[text=%text]} — check whether a bucket exists and is accessible.
- {linkto(#api-spec-s3-bucket-list-objects)[text=%text]} — get a list of objects in a bucket.
- {linkto(#api-spec-s3-delete-bucket)[text=%text]} — delete a bucket.

All bucket operations share common error messages, request headers, and response headers. If an operation has special error messages, request headers, or response headers, this will be noted in the operation's description.

## {heading(CreateBucket)[id=api-spec-s3-create-bucket]}

The `PUT` operation creates a new bucket. To create a bucket using the API, you must first {ifdef(public)}{linkto(../../../../../storage/s3/instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=create]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=create]}{/ifdef} a user and obtain an access key. Buckets cannot be created using anonymous requests. The initiator of the bucket creation request automatically becomes its owner.

When using the bucket creation operation, you can specify the projects or groups that should be granted certain permissions on the bucket, as well as specify the storage class: hotbox or icebox. There are two ways to grant permissions using request headers:

- Specify a predefined ACL in the request using the `x-amz-acl` header.
- Explicitly specify access permissions using the `x-amz-grant-read`, `x-amz-grant-write`, `x-amz-grant-read-acp`, `x-amz-grant-write-acp`, `x-amz-grant-full-control` headers in the request.

You can use a predefined ACL or explicitly specify access permissions, but you cannot use both methods at the same time.

To create a new bucket with object lock enabled, specify the `x-amz-bucket-object-lock-enabled` request header.

Request example:

```curl
...
PUT / HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-acl: public-read
x-amz-content-sha256: c6f1fc479f5f690c443b73a258aacc06ddad09eca0b001e9640ff2cd56fe5710
x-amz-date: 20200831T173143Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-acl;x-amz-content-sha256;x-amz-date,Signature=6cab03bef74a80a0441ab7fd33c829a2cdb46bba07e82da518cdb78ac238fda5

<CreateBucketConfiguration>
  <LocationConstraint>ru-msk</LocationConstraint>
</CreateBucketConfiguration>
...
```

Response example:

```curl
...
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 17:31:43 GMT
Content-Length: 0
Content-Type: text/plain;charset=utf-8
Connection: close
...
```

## {heading(ListBuckets)[id=api-spec-s3-list-buckets]}

The `GET` operation returns a list of existing buckets in the project.

Request example:

```curl
...
GET / HTTP/1.1
Host: hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T183940Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=245e867a6a653b7b88cbb71a734dacf2cbb4ba927d9aa5fdce57c85ab4f2b40b
...
```

Response example:

```curl
...
HTTP/1.1 200 OK
x-amz-request-id: tx000000000000002ba2427-0059651b6d-1268c-ru-mska
Date: Mon, 31 Aug 2020 17:31:43 GMT
Content-Length: 525
Content-Type: text/plain
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
  <ListAllMyBucketsResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Owner>
      <ID>6174283</ID>
      <DisplayName>6174283</DisplayName>
    </Owner>
    <Buckets>
      <Bucket>
        <Name>static-images</Name>
        <CreationDate>2020-08-31T18:37:48.157Z</CreationDate>
      </Bucket>
    <Buckets>
      <Bucket>
        <Name>log-files</Name>
        <CreationDate>2020-08-31T18:37:48.157Z</CreationDate>
      </Bucket>
    </Buckets>
  </ListAllMyBucketsResult>
...
```

## {heading(HeadBucket)[id=api-spec-s3-head-bucket]}

The `HEAD` operation is used to determine whether a bucket exists and whether you have permission to access it. The operation returns HTTP status 200 if the bucket exists and access to it is permitted. Otherwise, the operation may return either HTTP error 404 or 403.

Request example:

```curl
...
HEAD / HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20170714T185156Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
...
```

Response example:

```curl
...
HTTP/1.1 200 OK
x-amz-id-2: JuKZqmXuiwFeDQxhD7M8KtsKobSzWA1QEjLbTMTagkKdBX2z7Il/jGhDeJ3j6s80
x-amz-request-id: 32FE2CEB32F5EE25
x-amz-bucket-region: ru-msk
Date: Mon, 31 Aug 2020 21:34:56 GMT
Connection: close
...
```

## {heading(ListObjects)[id=api-spec-s3-bucket-list-objects]}

The `GET` operation returns some or all (up to 1000) objects in a bucket. You can use request parameters as selection criteria to filter the objects in a bucket.

To perform this operation successfully, you must have `READ` permission on the bucket.

Request example:

```curl
...
GET / HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T172613Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=de1bf8931e315c0576edb81a7d8be98874e847548fc70682f6c646e1cfd9177a
...
```

Response example:

```curl
...
HTTP/1.1 200 OK
x-amz-request-id: tx00000000000000029ac87-0059690330-8d1a-ru-mska
Date: Mon, 31 Aug 2020 17:31:43 GMT
Content-Length: 858
Content-Type: application/xml
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
<ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Name>static-images</Name>
  <Prefix/>
  <MaxKeys>1000</MaxKeys>
  <IsTruncated>false</IsTruncated>
  <Contents>
    <Key>example.txt</Key>
    <LastModified>2020-08-31T18:40:46.777Z</LastModified>
    <ETag>"b3a92f49e7ae64acbf6b3e76f2040f5e"</ETag>
    <Size>14</Size>
    <StorageClass>STANDARD</StorageClass>
    <Owner>
      <ID>6174283</ID>
      <DisplayName>6174283</DisplayName>
    </Owner>
  </Contents>
  <Contents>
    <Key>sammy.png</Key>
    <LastModified>2020-08-31T17:44:03.597Z</LastModified>
    <ETag>"fb08934ef619f205f272b0adfd6c018c"</ETag>
    <Size>35369</Size>
    <StorageClass>STANDARD</StorageClass>
    <Owner>
      <ID>6174283</ID>
      <DisplayName>6174283</DisplayName>
    </Owner>
  </Contents>
</ListBucketResult>
...
```

## {heading(DeleteBucket)[id=api-spec-s3-delete-bucket]}

The `DELETE` operation deletes the bucket specified in the request. A successful operation is indicated by HTTP status 204.

If HTTP status 409 is received, deletion is not possible because the bucket contains objects. You must delete all objects from the bucket and then try again.

Request example:

```curl
...
DELETE / HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20170710T181321Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=b0558a25e794bced1ca9b620b4318bb8eb62ddbd34e2b9c1921034bc5acd597b
...
```

Response example:

```curl
...
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 18:13:21 GMT
Connection: close
...
```
