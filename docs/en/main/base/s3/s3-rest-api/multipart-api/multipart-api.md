Composite or multipart loading allows you to save objects in VK CS S3 Object Storage in parts. This can be useful when loading or copying large objects. We recommend using multiple uploads for objects from 100 MB.

Composite loading consists of the following steps:

- Initiate Multipart Upload - Initialize Upload
- Upload Part - Upload an object in parts
- Complete Multipart Upload - Completing the upload by combining previously uploaded parts
- Abort Multipart Upload - Abort upload
- List Parts - Returns a list of loaded parts

## Initiate Multipart Upload

The operation initializes a multipart download and returns the download ID. The load ID is used to combine all parts of a single multipart load. You must include this download ID in each of your subsequent download requests for a part.

If a lifecycle rule is configured to abort unfinished multipart downloads, then the download must complete within the number of days specified in the bucket lifecycle configuration. Otherwise, an interrupt operation becomes available for the unfinished multipart download, and the service aborts the multipart download.

**Note**

After the initialization of the multipart download and the actual download of one or more parts, you must complete or interrupt the multipart download in order to suspend the charge for storing the downloaded parts. Only after the completion or interruption of a multipart upload does VK CS S3 free up the space allocated to the parts in the storage and stop charging for the storage of these parts.

Inquiry:

```
 POST /multipart-file.tar.gz?uploads HTTP / 1.1

Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T174652Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-date, Signature = e356964d19e38cd5d44
```

Answer:

```
 HTTP / 1.1 200 OK

Content-Length: 258
Content-Type: application / xml
Date: Mon, 31 Aug 2020 17:46:53 GMT
x-amz-request-id: tx00000000000000ab66a13-005991e20d-66a8-ru-mska
Connection: close

<? xml version = "1.0" encoding = "UTF-8"?>
<InitiateMultipartUploadResult xmlns = "http://s3.amazonaws.com/doc/2006-03-01/">
<Bucket> static-images </Bucket>
<Key> multipart-file.tar.gz </Key>
<UploadId> 2 ~ iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh </UploadId>
</InitiateMultipartUploadResult>
```

## Upload Part

The operation loads a portion of a multipart load. To perform this operation, you must provide data from the part in the request. To load a part from an existing object, use the load part (copy) operation.

A part can have any number from 1 to 10,000 inclusive. The part number uniquely identifies the part and its position in the created object. If a new part is loaded, with the assigned part number used for one of the existing parts, the existing part will be overwritten. Each part, except the last, must be at least 5 MB in size. The last part of the multipart download has no size limit.

To ensure that the data is not tampered with as it travels over the network, you should include the Content-MD5 header in the download request for the part. VK CS checks the data from the parts against the provided MD5 hash value and returns an error if they do not match.

Inquiry:

```
 PUT /multipart-file.tar.gz?partNumber=1&uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP / 1.1

Host: my-test-bucket1.hb.bizmrg.com
Content-Length: 5242880
x-amz-content-sha256: 6ab0931e613fd0cd39af0fa4733edb6ad942df0ad33e057713d44df7195b6ecf
x-amz-date: 20200831T184459Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-date, Signature = 2e4adca4d4d4404274f2e4adca4d17d440430
```

Answer:

```
 HTTP / 1.1 200 OK

Content-Length: 0
Content-Type: application / xml
Date: Mon, 31 Aug 2020 18:45:01 GMT
Etag: "d8d3ed3a4de016917a814a2cf5acad3c"
x-amz-request-id: tx00000000000000ab85dab-005991efac-66a8-ru-mska
Connection: close
```

## Complete Multipart Upload

The operation completes the multi-part download by combining the previously loaded parts. Upon receiving this request, VK CS merges all loaded parts in ascending order by part number, creating a new object. In a request to complete a multipart download, you must provide a list of parts. For each part from the list, you must provide the part number and the ETag header value returned after that part is loaded.

It can take several minutes to process a request to complete a multipart upload. After starting to process the request, VK CS sends an HTTP response header containing a 200 OK response. Whitespace is periodically sent during request processing to prevent timeouts. Since an error can occur in a request after the initial 200 OK response has been sent, the body of the response should be checked to determine if the request was successful.

Inquiry:

```
 POST /multipart-file.tar.gz?uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP / 1.1

Host: my-test-bucket1.hb.bizmrg.com
Content-Length: 5242880
x-amz-content-sha256: 6ab0931e613fd0cd39af0fa4733edb6ad942df0ad33e057713d44df7195b6ecf
x-amz-date: 20200831T184459Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-date, Signature = 2e4adca4d4d4404274f2e4adca4d17d440430

<CompleteMultipartUpload>
<Part>
<PartNumber> 1 </PartNumber>
<ETag> "d8d3ed3a4de016917a814a2cf5acad3c" </ETag>
</Part>
<Part>
<PartNumber> 2 </PartNumber>
<ETag> "adf5feafc0fe4632008d5cb30beb1c49" </ETag>
</Part>
<Part>
<PartNumber> 3 </PartNumber>
<ETag> "363f6bb50866541d78e5f6f626592263" </ETag>
</Part>
</CompleteMultipartUpload>
```

Answer:

```
 HTTP / 1.1 200 OK

Content-Length: 311
Content-Type: application / xml
Date: Mon, 31 Aug 2020 18:45:01 GMT
x-amz-request-id: tx00000000000000ab962c8-005991f6fe-66a8-ru-mska
Connection: close

<? xml version = "1.0" encoding = "UTF-8"?>
<CompleteMultipartUploadResult xmlns = "http://s3.amazonaws.com/doc/2006-03-01/">
<Location> my-test-bucket1.hb.bizmrg.com </Location>
<Bucket> my-test-bucket1 </Bucket>
<Key> multipart-file.tar.gz </Key>
<ETag> f935869350d7cbfcdd219df3f377531b-3 </ETag>
</CompleteMultipartUploadResult>
```

## Abort Multipart Upload

The operation aborts the multipart download. After aborting a multipart download, it is not possible to download additional parts using the download ID of the interrupted multipart download. The space allocated for storing the previously loaded parts will be freed. Moreover, if any parts are loaded, then such an operation may be completed or interrupted. As a result, it may be necessary to repeatedly interrupt the multi-part download in order to completely free up the space occupied by all parts.

Inquiry:

```
 DELETE /multipart-file.tar.gz?uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP / 1.1

Host: my-test-bucket1.hb.bizmrg.com
Content-Length: 5242880
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T202611Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-date, Signature = 9e13513baz0e3473
```

Answer:

```
 HTTP / 1.1 200 OK

Date: Mon, 31 Aug 2020 18:45:01 GMT
x-amz-request-id: tx00000000000000abbaefe-0059920764-66a8-ru-mska
Connection: close
```

## List Parts

The operation returns a list of parts loaded for a specific multipart load. The operation must include the download ID, which was received after the request was sent to initialize the multipart download. Such a query will return no more than 1000 loaded parts. You can limit the number of parts returned by specifying the max-parts query parameter. If the multipart load contains more than 1000 parts, then the response returns a NextPartNumberMarker element and an IsTruncated field with the value true. Subsequent requests to view the list of parts can include the part-number-marker query string parameter by setting it to the NextPartNumberMarker field value from the previous response.

Inquiry:

```
 PUT /multipart-file.tar.gz?partNumber=1&uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP / 1.1

Host: my-test-bucket1.hb.bizmrg.com
Content-Length: 5242880
x-amz-content-sha256: 6ab0931e613fd0cd39af0fa4733edb6ad942df0ad33e057713d44df7195b6ecf
x-amz-date: 20200831T184459Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-date, Signature = 2e4adca4d4d4404274f2e4adca4d17d440430
```

Answer:

```
 HTTP / 1.1 200 OK

Content-Length: 0
Content-Type: application / xml
Date: Mon, 31 Aug 2020 18:45:01 GMT
Etag: "d8d3ed3a4de016917a814a2cf5acad3c"
x-amz-request-id: tx00000000000000ab85dab-005991efac-66a8-ru-mska
Connection: close

<? xml version = "1.0" encoding = "UTF-8"?>
<ListPartsResult xmlns = "http://s3.amazonaws.com/doc/2006-03-01/">
<Bucket> my-test-bucket1 </Bucket>
<Key> multipart-file.tar.gz </Key>
<UploadId> 2 ~ iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh </UploadId>
<StorageClass> STANDARD </StorageClass>
<PartNumberMarker> 0 </PartNumberMarker>
<NextPartNumberMarker> 1 </NextPartNumberMarker>
<MaxParts> 1000 </MaxParts>
<IsTruncated> false </IsTruncated>
<Owner>
<ID> eab55955-ebdb-4f18-a94d-f3558ff150da </ID>
<DisplayName> VK CS_UserName </DisplayName>
</Owner>
<Part>
<LastModified> 2017-08-14T18: 45: 01.601Z </LastModified>
<PartNumber> 1 </PartNumber>
<ETag> "d8d3ed3a4de016917a814a2cf5acad3c" </ETag>
<Size> 5242880 </Size>
</Part>
<Part>
<LastModified> 2017-08-14T18: 45: 01.601Z </LastModified>
<PartNumber> 2 </PartNumber>
<ETag> "adf5feafc0fe4632008d5cb30beb1c49" </ETag>
<Size> 5242880 </Size>
</Part>
</ListPartsResult>
```
