Operations with Buckets:

- Create - Create bucket
- ListBuckets - Get a list of buckets
- HeadBucket - Check if a bucket exists and has access to it
- ListObjects - Get a list of bucket objects
- DeleteBucket - Delete bucket

All operations with buckets are characterized by typical error messages, request headers and response headers. If the operation has special error messages, request or response headers, this will be indicated in the description of the operation.

## CreateBucket

The PUT operation creates a new bucket. To create a bucket, you need to register on the VK CS platform and obtain an access key to authorize requests. Bucket creation using anonymous requests is not possible. The initiator of the bucket creation request automatically becomes its owner.

When using the operation to create a bucket, you can specify projects or groups that need to be granted certain rights to the bucket, and also specify the storage class: hotbox or icebox. There are two ways to grant rights using request headers:

- Specifying the prepared ACL in the request using the x-amz-acl request header.
- Explicitly specifying access rights using the x-amz-grant-read, x-amz-grant-write, x-amz-grant-read-acp, x-amz-grant-write-acp, x-amz-grant- headers full-control.

You can use a ready-made ACL or specify the access rights explicitly, but you cannot use both methods at the same time.

Inquiry:

```
 PUT / HTTP / 1.1

Host: my-test-bucket1.bizmrg.com
x-amz-acl: public-read
x-amz-content-sha256: c6f1fc479f5f690c443b73a258aacc06ddad09eca0b001e9640ff2cd56fe5710
x-amz-date: 20200831T173143Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-acl; x-amz-content-sha256; x-amz-date, Signature = 6cab03bef74a80a0441ab7fd33c829a2cdb46bba07e82da518cdb78ac238fda5

<CreateBucketConfiguration>
<LocationConstraint> ru-msk </LocationConstraint>
</CreateBucketConfiguration>
```

Answer:

```
 HTTP / 1.1 200 OK

Date: Mon, 31 Aug 2020 17:31:43 GMT
Content-Length: 0
Content-Type: text / plain; charset = utf-8
Connection: close
```

## ListBuckets

The GET operation will return a list of buckets existing in the project.

Inquiry:

```
 GET / HTTP / 1.1

Host: hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T183940Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-date, Signature = 245eb867ab4dba65c71
```

Answer:

```
 HTTP / 1.1 200 OK

x-amz-request-id: tx000000000000002ba2427-0059651b6d-1268c-ru-mska
Date: Mon, 31 Aug 2020 17:31:43 GMT
Content-Length: 523
Content-Type: text / plain
Connection: close

<? xml version = "1.0" encoding = "UTF-8"?>
<ListAllMyBucketsResult xmlns = "http://s3.amazonaws.com/doc/2006-03-01/">
<Owner>
<ID> 6174283 </ID>
<DisplayName> 6174283 </DisplayName>
</Owner>
<Buckets>
<Bucket>
<Name> static-images </Name>
<CreationDate> 2020-08-31T18: 37: 48.157Z </CreationDate>
</Bucket>
<Buckets>
<Bucket>
<Name> log-files </Name>
<CreationDate> 2020-08-31T18: 37: 48.157Z </CreationDate>
</Bucket>
</Buckets>
</ListAllMyBucketsResult>
```

## ListObjects

The GET operation returns some or all (up to 1000) objects in the bucket. You can use query parameters as selection criteria to return a subset of objects in a bucket.

To successfully complete the operation, you must have the rights to read the bucket (READ).

Inquiry:

```
 GET / HTTP / 1.1

Host: my-test-bucket1.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T172613Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-date, Signature = de1bf77684d915c74
```

Answer:

```
 HTTP / 1.1 200 OK

x-amz-request-id: tx00000000000000029ac87-0059690330-8d1a-ru-mska
Date: Mon, 31 Aug 2020 17:31:43 GMT
Content-Length: 775
Content-Type: application / xml
Connection: close

<? xml version = "1.0" encoding = "UTF-8"?>
<ListBucketResult xmlns = "http://s3.amazonaws.com/doc/2006-03-01/">
<Name> static-images </Name>
<Prefix />
<MaxKeys> 1000 </MaxKeys>
<IsTruncated> false </IsTruncated>
<Contents>
<Key> example.txt </Key>
<LastModified> 2020-08-31T18: 40: 46.777Z </LastModified>
<ETag> "b3a92f49e7ae64acbf6b3e76f2040f5e" </ETag>
<Size> 14 </Size>
<StorageClass> STANDARD </StorageClass>
<Owner>
<ID> 6174283 </ID>
<DisplayName> 6174283 </DisplayName>
</Owner>
</Contents>
<Contents>
<Key> sammy.png </Key>
<LastModified> 2020-08-31T17: 44: 03.597Z </LastModified>
<ETag> "fb08934ef619f205f272b0adfd6c018c" </ETag>
<Size> 35369 </Size>
<StorageClass> STANDARD </StorageClass>
<Owner>
<ID> 6174283 </ID>
<DisplayName> 6174283 </DisplayName>
</Owner>
</Contents>
</ListBucketResult>
```

## HeadBucket

The operation is used to determine whether a bucket exists and whether it has permission to access it. The operation returns a 200 OK message if the bucket exists and you have permission to access it. Otherwise, this operation may return messages such as "404 Not Found" or "403 Forbidden".

Inquiry:

```
 HEAD / HTTP / 1.1

Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20170714T185156Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-date, Signature = e3b4551b249278fc34ae
```

Answer:

```
 HTTP / 1.1 200 OK

x-amz-id-2: JuKZqmXuiwFeDQxhD7M8KtsKobSzWA1QEjLbTMTagkKdBX2z7Il / jGhDeJ3j6s80
x-amz-request-id: 32FE2CEB32F5EE25
x-amz-bucket-region: ru-msk
Date: Mon, 31 Aug 2020 21:34:56 GMT
Connection: close
```

## DeleteBucket

DELETE operations delete the bucket specified in the URI. Success of the operation will be indicated by receiving 204 (No content) as the response code.

If 409 (BucketNotEmpty) is received as a response code, it means there are objects in the bucket. You must remove all objects from the bucket (move or delete) before you can remove the bucket itself.

Inquiry:

```
 DELETE / HTTP / 1.1

Host: my-test-bucket1.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20170710T181321Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-date, Signature = b0558a259d9dbbcdate, Signature = b0558a259d9794
```

Answer:

```
 HTTP / 1.1 204 No Content

Date: Mon, 31 Aug 2020 18:13:21 GMT
Connection: close
```
