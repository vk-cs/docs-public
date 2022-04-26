Operations with Objects:

- Get - Download an object from a bucket
- Upload - Upload an object to a bucket
- Copy - Copy an object in the bucket
- HeadObject - Get information about an object
- Delete - Delete object
- DeleteMultipleObjects - Delete a group of objects from the list

All operations with buckets are characterized by typical error messages, request headers and response headers. If the operation has special error messages, request or response headers, this will be indicated in the description of the operation.

## Get

GET operations retrieves an object from a bucket. To use GET, you must have READ access to the object. By granting READ access to an anonymous user, you can return an object without using an authorization header.

The bucket does not have a directory hierarchy like the standard file system. However, you can create a logical hierarchy using object key names that imply a folder structure. For example, you can name the object not sample.jpg, but photos / 2020 / August / 01.jpg.

To retrieve an object with this logical hierarchy, you must specify the fully qualified name of the object in the GET operation.

Inquiry:

```
 GET /example.txt HTTP / 1.1

Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T190539Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20170710 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-date, Signature = e912de558677884f08b83d3bd3d558677884f07d8bd3bd3d8687884f08d4d4d1d3d1d3d2c8d8c884f04d4d4d4d1c4d4d4d4d4d4d4d4d4d4d4f4d4f4d4f4d4f4d4f8244f07104f07104f07104f07104f07104f07104f0710
```

Answer:

```
 HTTP / 1.1 200 OK

Date: Mon, 31 Aug 2020 19:05:39 GMT
x-amz-request-id: tx00000000000000279f46e-005963d003-1268c-ru-mska
Content-Type: text / plain
Content-Length: 14
Accept-Ranges: bytes
Last-Modified: Mon, 31 Aug 2020 19:05:09 GMT
Etag: "b3a92f49e7ae64acbf6b3e76f2040f5e"
Connection: close

Example text.
```

## Upload

The PUT operation adds an object to the bucket. To perform the operation, you must have WRITE rights to the bucket.

VK CS S3 adds partial objects if the object size exceeds 50MB. If a successful response is received, then the entire object has been added to the bucket.

When performing concurrent PUT operations and when there are identical loadable objects, S3 overwrites everything except the last written object.

To prevent data corruption while traversing the network, it is recommended to use the Content-MD5 header, which checks the object against the provided MD5 value and returns an error if it does not match. Alternatively, you can compute MD5 by placing an object in a bucket and compare the returned ETag with the computed MD5.

Inquiry:

```
 PUT /example.txt HTTP / 1.1

Content-Length: 14
Content-Type: text / plain
Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: 003f0e5fe338b17be8be93fec537764ce199ac50f4e50f2685a753c4cc781747
x-amz-date: 20200831T194605Z
x-amz-meta-s3cmd-attrs: uid: 1000 / gname: asb / uname: asb / gid: 1000 / mode: 33204 / mtime: 1499727909 / atime: 1499727909 / md5: fb08934ef619f205f272b0adfd6c099713 / c405time: 1499727909
x-amz-storage-class: STANDARD
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = content-length; content-type; host; x-amz-content-sha256; x-amz-date; x-amz -meta-s3cmd-attrs; x-amz-storage-class, Signature = a9a9e16da23e0b37ae8362824de77d66bba2edd702ee5f291f6ecbb9ebac6013


Example text.
```

Answer:

```
 HTTP / 1.1 200 OK

Date: Mon, 31 Aug 2020 19:46:06 GMT
x-amz-request-id: tx0000000000000027bd57c-005963d97e-1268c-ru-mska
Content-Length: 0
Accept-Ranges: bytes
Last-Modified: Mon, 31 Aug 2020 19:05:09 GMT
Etag: "fb08934ef619f205f272b0adfd6c018c"
Connection: close
```

## Copy

PUT operations can create a copy of an object that is already stored in the bucket. The copy PUT operation is identical to the sequential execution of GET and PUT. Adding the x-amz-copy-source request header causes the PUT operation to copy the source object to the target bucket.

When copying an object, you can keep most of the metadata (default) or specify new metadata. To write new metadata when copying an object, you must include the x-amz-metadata-directive: REPLACE header in the request. However, the ACL is not saved and is configured as private for the user making the request.

All copy requests must be authenticated and cannot contain message text. In addition, you must have READ access to the source object and WRITE access to the target bucket.

A copy request can return an error in two cases. This can happen when a copy request is received, or when objects are being copied. If an error occurs before the copy operation starts, a standard error will be received. If an error occurs during a copy operation, the error will be embedded in the 200 OK response. This means that a 200 OK response can contain both success and error messages.

Inquiry:

```
 PUT /copied-example.txt HTTP / 1.1

Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-copy-source: /static-images/example.txt
x-amz-date: 20200831T202253Z
x-amz-metadata-directive: COPY
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20170710 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-copy-source; x-amz-date; x-amz -metadata-directive; x-amz-storage-class, Signature = 0cb03470dd80bdd41a4b8fb06c1800b27a5059b61b0303fe589578835531c877
```

Answer:

```
 HTTP / 1.1 200 OK

Date: Mon, 31 Aug 2020 20:22:54 GMT
x-amz-request-id: tx0000000000000027d8430-005963e21d-1268c-ru-mska
Content-Length: 183
Connection: close

<CopyObjectResult xmlns = "http://s3.amazonaws.com/doc/2006-03-01/">
<LastModified> 2020-08-31T20: 22: 54.167Z </LastModified>
<ETag> 7967bfe102f83fb5fc7e5a02bf05e8fc </ETag>
</CopyObjectResult>
```

## HeadObject

The HEAD operation retrieves metadata from an object without returning the object itself. This operation is used only if only the object metadata is needed. In order to use the HEAD operation, you must have read rights to the object (READ).

The parameters for requesting a HEAD operation are the same as for a GET operation for an object. The response is identical to the GET response, except for the absence of a response body.

If the requested object does not exist, then the error returned depends on whether the account has additional s3: ListBucket permission.

- If there is s3: ListBucket permission on the bucket, then an error is returned - HTTP status code 404 ("key missing").
- If s3: ListBucket permission is not present, then an error is returned — HTTP status code 403 (“access error”).

Inquiry:

```
 HEAD /example.txt HTTP / 1.1

Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T185156Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20170710 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-date, Signature = e3b4998b249278fc34
```

Answer:

```
 HTTP / 1.1 200 OK

Date: Mon, 31 Aug 2020 18:51:58 GMT
x-amz-request-id: tx0000000000000002ff1c9-00596912ce-6441-ru-mska
Content-Type: text / plain
Content-Length: 14
Accept-Ranges: bytes
Last-Modified: Mon, 31 Aug 2020 18:40:46 GMT
Etag: "b3a92f49e7ae64acbf6b3e76f2040f5e"
Connection: close
```

## Delete

DELETE operations delete the object specified in the request.

Inquiry:

```
 DELETE /sammy.png HTTP / 1.1

Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T194408Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20170710 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-date, Signature = c2a46b21e2e885cd, Signature = c2a46b21b504e858cfd9fdb10b8b21b2e2e85c
```

Answer:

```
 HTTP / 1.1 204 No Content

Date: Mon, 31 Aug 2020 19:44:09 GMT
x-amz-request-id: tx0000000000000027bbc48-005963d908-1268c-ru-mska
Connection: close
```

## DeleteMultipleObjects

Removes objects according to the list of keys passed in the request. The list for deletion can contain no more than 1000 keys. If the object does not exist, then the response will mark it as deleted.

For this request, the Content-MD5 and Content-Length headers are required, and the list of keys for deletion is sent in XML format.

Inquiry:

```
 DELETE /sammy.png HTTP / 1.1

Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T194408Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20170710 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-date, Signature = c2a46b21e2e885cd, Signature = c2a46b21b504e858cfd9fdb10b8b21b2e2e85c

<? xml version = "1.0" encoding = "UTF-8"?>
<Delete>
<Quiet> true </Quiet>
<Object>
<Key> Key </Key>
</Object>
...
</Delete>
```

Answer:

```
 HTTP / 1.1 204 No Content

Date: Mon, 31 Aug 2020 19:44:09 GMT
x-amz-request-id: tx0000000000000027bbc48-005963d908-1268c-ru-mska
<DeleteResult>
<Deleted>
<Key> some / key.txt </Key>
</Deleted>
<Error>
<Key> some / another / key.txt </Key>
<Code> TextErrorCode </Code>
<Message> Describing message </Message>
</Error>
</DeleteResult>
Connection: close
```
