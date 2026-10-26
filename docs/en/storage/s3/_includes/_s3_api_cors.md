The {var(s3)} service allows you to manage the CORS configuration of a bucket. To upload a CORS configuration, you need to create an XML document.

List of available methods for bucket CORS configurations:

- {linkto(#api-spec-s3-get-bucket-cors)[text=%text]} — Get the list of CORS configurations for a bucket.
- {linkto(#api-spec-s3-put-bucket-cors)[text=%text]} — Set a CORS configuration.
- {linkto(#api-spec-s3-delete-bucket-cors)[text=%text]} — Delete a CORS configuration.

## {heading(General view of the CORS configuration XML)[id=api-spec-s3-cors-request-body]}

```xml
<CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>URL</AllowedOrigin>
        <AllowedMethod>HTTP_Method</AllowedMethod>
        <AllowedHeader>Header_Name</AllowedHeader>
        ...
    </CORSRule>
    ...
</CORSConfiguration>
```

## {heading(GetBucketCORS)[id=api-spec-s3-get-bucket-cors]}

The `GET` operation returns information about the CORS configuration set for the bucket.

To use this operation, you must have `WRITE_ACP` write permissions. The bucket owner has this permission by default and can grant it to other users.

Request example:

```curl
GET /?cors HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T185319Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=f7d7879992a9f3a06ddacd59e53ac318e99b2ed6230692b30099739e34469a91
```

Response example:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:53:20 GMT
x-amz-request-id: tx00000000000000279651f-005963cd20-1268c-ru-mska
Content-Type: application/xml
Content-Length: 430
Connection: close

<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <CORSRule>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>DELETE</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedOrigin>http://example.com</AllowedOrigin>
    <AllowedHeader>\*</AllowedHeader>
  </CORSRule>
  <CORSRule>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedOrigin>\*</AllowedOrigin>
  </CORSRule>
</CORSConfiguration>
```

## {heading(PutBucketCORS)[id=api-spec-s3-put-bucket-cors]}

The `PUT` operation sets the CORS configuration for the bucket. If a configuration already exists, it is overwritten.

To use this operation, you must have `WRITE_ACP` write permissions.

You can set this configuration on a bucket so that it can serve cross-origin requests. For example, you can grant a request from the `http://www.example.com` origin access to the `my.example.bucket.com` bucket using the browser's XMLHttpRequest functionality.

To enable cross-origin resource sharing (CORS) on a bucket, you need to add a CORS subresource to the bucket. The CORS subresource is an XML document that configures the rules defining the origins and HTTP methods that can be used with your bucket. The maximum document size is 64 KB. For example, the CORS configuration on a bucket might have the following two rules set:

- The first CORSRule rule allows `PUT`, `POST`, and `DELETE` cross-origin requests from the `https://www.example.com` origin. This rule also allows using all headers in a preflight `OPTIONS` request via the `Access-Control-Request-Headers` header. Consequently, in response to any preflight `OPTIONS` request, the service returns any requested header.
- The second rule allows `GET` cross-origin requests from all origins. The `*` wildcard indicates that any origin can be used.

Request example:

```curl
PUT /?cors HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 374
Content-Type: application/xml
x-amz-content-sha256: 745320970930725bd18820ec990f7334960f0a47358be189e77504cc094be77e
x-amz-date: 20200831T185043Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-md5;content-type;host;x-amz-content-sha256;x-amz-date,Signature=f52b2bfb6ec975c86cadd2e51a6ee9842c6151b737e46ce90a3cb3cc0d0dea97

<CORSConfiguration>
 <CORSRule>
   <AllowedOrigin>http://example.com</AllowedOrigin>


   <AllowedMethod>PUT</AllowedMethod>
   <AllowedMethod>POST</AllowedMethod>
   <AllowedMethod>DELETE</AllowedMethod>


   <AllowedHeader>\*</AllowedHeader>
 </CORSRule>
 <CORSRule>
   <AllowedOrigin>\*</AllowedOrigin>
   <AllowedMethod>GET</AllowedMethod>
 </CORSRule>
</CORSConfiguration>
```

Response example:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:50:44 GMT
x-amz-request-id: tx0000000000000027946fc-005963cc84-1268c-ru-mska
Content-Type: application/xml
Content-Length: 0
Connection: close
```

## {heading(DeleteBucketCORS)[id=api-spec-s3-delete-bucket-cors]}

The `DELETE` operation deletes information about the CORS configuration set for the bucket.

To use this operation, you must have `WRITE_ACP` write permissions.

Request example:

```curl
DELETE /?cors HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T182537Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-md5;content-type;host;x-amz-content-sha256;x-amz-date,Signature=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

Response example:

```curl
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 18:25:38 GMT
x-amz-request-id: tx0000000000000002fae1f-0059690ca2-6441-ru-mska
Connection: close
```
