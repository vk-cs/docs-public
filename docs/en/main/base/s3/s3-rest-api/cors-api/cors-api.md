The VK Cloud Object Storage service allows you to manage the CORS bucket configuration. To load the CORS configuration, you need to generate an XML document.

List of available methods for CORS bucket configurations:

- Get Bucket CORS - Get a list of CORS configurations for a bucket
- Set Bucket CORS - Set the CORS configuration
- Delete Bucket CORS - Delete CORS configuration

## General view of XML CORS configuration

```
 <CORSConfiguration>
<CORSRule>
<AllowedOrigin> URL </AllowedOrigin>
<AllowedMethod> HTTP_Method </AllowedMethod>
<AllowedHeader> Header_Name </AllowedHeader>
...
</CORSRule>
...
</CORSConfiguration>
```

## Get Bucket CORS

The operation returns information on the CORS configuration set for the bucket.

In order to use this operation, you must have WRITE_ACP write rights. The bucket owner has this permission by default and can grant it to other users.

Inquiry:

```
 GET /? Cors HTTP / 1.1


Host: my-test-bucket1.hb.vkcs.cloud
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T185319Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-date, Signature = f7d7d387996d9d300
```

Answer:

```
 HTTP / 1.1 200 OK


Date: Mon, 31 Aug 2020 18:53:20 GMT
x-amz-request-id: tx00000000000000279651f-005963cd20-1268c-ru-mska
Content-Type: application / xml
Content-Length: 390
Connection: close


<CORSConfiguration xmlns = "http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
<AllowedMethod> PUT </AllowedMethod>
<AllowedMethod> DELETE </AllowedMethod>
<AllowedMethod> POST </AllowedMethod>
<AllowedOrigin> http://example.com </AllowedOrigin>
<AllowedHeader> \* </AllowedHeader>
</CORSRule>
<CORSRule>
<AllowedMethod> GET </AllowedMethod>
<AllowedOrigin> \* </AllowedOrigin>
</CORSRule>
</CORSConfiguration>
```

## Set Bucket CORS

The PUT operation sets the CORS configuration for the bucket. If the configuration already exists, it is overwritten.

In order to use this operation, you must have WRITE_ACP write rights.

You can set this configuration on a bucket so that it can serve Cross-origin requests. For example, you can grant access to a request from the source http://www.example.com to the my.example.bucket.com bucket using the XMLHttpRequest browser functionality.

To enable cross-origin resource sharing (CORS) on a bucket, you need to add a CORS subresource to the bucket. A CORS subresource is an XML document that configures rules that define HTTP sources and methods that can be used in your bucket. The maximum document size is 64 KB. For example, a CORS configuration on a bucket might have the following two rules set:

- The first CORSRule rule allows cross-origin PUT, POST and DELETE requests from https://www.example.com. This rule also allows all headers in a preflight OPTIONS request using the Access-Control-Request-Headers header. Therefore, in response to any OPTIONS pre-flight request, the service returns any requested header.
- The second rule allows cross-origin GET requests from all sources. The wildcard "\*" indicates that any source can be used.

Inquiry:

```
 PUT /? Cors HTTP / 1.1


Host: my-test-bucket1.hb.vkcs.cloud
Content-Length: 374
Content-Type: application / xml
x-amz-content-sha256: 745320970930725bd18820ec990f7334960f0a47358be189e77504cc094be77e
x-amz-date: 20200831T185043Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = content-md5; content-type; host; x-amz-content-sha256; x-amz-fs6beed9ad2cc-amz-amz-content-sha256; x-amz-86-a-d9ed9ecc07;


<CORSConfiguration>
<CORSRule>
<AllowedOrigin> http://example.com </AllowedOrigin>


<AllowedMethod> PUT </AllowedMethod>
<AllowedMethod> POST </AllowedMethod>
<AllowedMethod> DELETE </AllowedMethod>


<AllowedHeader> \* </AllowedHeader>
</CORSRule>
<CORSRule>
<AllowedOrigin> \* </AllowedOrigin>
<AllowedMethod> GET </AllowedMethod>
</CORSRule>
</CORSConfiguration>
```

Answer:

```
 HTTP / 1.1 200 OK


Date: Mon, 31 Aug 2020 18:50:44 GMT
x-amz-request-id: tx0000000000000027946fc-005963cc84-1268c-ru-mska
Content-Type: application / xml
Content-Length: 0
Connection: close
```

## Delete Bucket CORS

The DELETE operation removes the CORS configuration information set for the bucket.

In order to use this operation, you must have WRITE_ACP write rights.

Inquiry:

```
 DELETE / static-images? Cors HTTP / 1.1


Host: my-test-bucket1.hb.vkcs.cloud
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T182537Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = content-md5; content-type; host; x-amz-content-sha256; x-amz-date, Signature = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

Answer:

```
 HTTP / 1.1 204 No Content


Date: Mon, 31 Aug 2020 18:25:38 GMT
x-amz-request-id: tx0000000000000002fae1f-0059690ca2-6441-ru-mska
Connection: close
```
