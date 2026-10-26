ACL (Access Control List) allows you to control which operations are allowed for which users. ACL can be set both at the level of the entire bucket and at the level of a specific object. You can set and read ACL using the methods described below.

ACL operations:

- Get Bucket ACL - Get the ACL for a bucket
- Put Bucket ACL - Set the ACL for a bucket
- Get Object ACL - Get the ACL for an object
- Put Object ACL - Set the ACL for an object

General XML structure of the ACL configuration:

```xml
<AccessControlPolicy>
  <Owner>
    <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
    <DisplayName>example@example.com</DisplayName>
  </Owner>
  <AccessControlList>
    <Grant>
      <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:type="CanonicalUser">
        <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
        <DisplayName>VK Cloud_UserName</DisplayName>
      </Grantee>
      <Permission>WRITE</Permission>
    </Grant>
  </AccessControlList>
</AccessControlPolicy>
```

## Get Bucket ACL

Getting the ACL for a bucket. To get it, you need the \`READ_ACP\` permission on the bucket.

If the \`READ_ACP\` permission is granted to an anonymous user, you can get the bucket ACL without using the authorization header.

Request:

```http
GET /?acl HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T174434Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=71dfa4666fb740d40d05307a29321c65cc620cdb17e8a9cb83d4f0e1b1b9d236
```

Response:

```xml
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 17:44:35 GMT
x-amz-request-id: tx000000000000002764fa6-005963bd03-1268c-ru-mska
Content-Type: application/xml
Content-Length: 848
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
  <AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Owner>
      <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
      <DisplayName>VK Cloud_UserName</DisplayName>
    </Owner>
    <AccessControlList>
      <Grant>
        <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
          <URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>
        </Grantee>
        <Permission>READ</Permission>
      </Grant>
      <Grant>
        <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
          <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
          <DisplayName>VK Cloud_Username</DisplayName>
        </Grantee>
        <Permission>FULL_CONTROL</Permission>
      </Grant>
    </AccessControlList>
  </AccessControlPolicy>
```

## Put Bucket ACL

Setting the ACL for a bucket. To set the ACL, you need the \`WRITE_ACP\` permission on the bucket.

There are two ways to set the ACL:

- In the request body.
- In the request headers.

You cannot use both ways at the same time in one request.

Request:

```xml
PUT /?acl HTTP/1.1
Content-Type: application/xml
Content-Length: 675
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: 724483e3830b19d6960345c484fb7904b26e8f2fb34a6c002fa779353b68c8d8
x-amz-date: 20200831T183709Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date,Signature=1cf3f7771a4086375e5b6597026db6d55d84fbc86e3c3a86ec420ea9123e3163


<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Owner>
    <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
  </Owner>
  <AccessControlList>
    <Grant>
      <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
        <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
      </Grantee>
      <Permission>FULL_CONTROL</Permission>
    </Grant>
    <Grant>
      <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
        <URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>
      </Grantee>
      <Permission>READ</Permission>
    </Grant>
  </AccessControlList>
</AccessControlPolicy>
```

Response:

```http
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:37:10 GMT
x-amz-request-id: tx00000000000000278ac49-005963c956-1268c-ru-mska
Content-Type: application/xml
Content-Length: 0
Connection: close
```

## Get Object ACL

Getting the ACL for an object. To get it, you need the \`READ_ACP\` permission on the object.

Request:

```http
GET /sammy.png?acl HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T191224Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=950e133849cd19d626291fd2937d927957cf3e97a36707d30d51a9b61ac08a8e
```

Response:

```xml
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 19:12:24 GMT
x-amz-request-id: tx0000000000000027a42dc-005963d198-1268c-ru-mska
Content-Type: application/xml
Content-Length: 848
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
  <AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Owner>
      <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
      <DisplayName>VK Cloud_UserName</DisplayName>
    </Owner>
    <AccessControlList>
      <Grant>
        <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
          <URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>
        </Grantee>
        <Permission>READ</Permission>
      </Grant>
      <Grant>
        <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
          <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
          <DisplayName>VK Cloud_UserName</DisplayName>
        </Grantee>
        <Permission>FULL_CONTROL</Permission>
      </Grant>
    </AccessControlList>
  </AccessControlPolicy>
```

## Put Object ACL

Setting the ACL for an object. To set the ACL, you need the WRITE_ACP permission on the object.

There are two ways to set the ACL:

- In the request body.
- In the request headers.

You cannot use both ways at the same time in one request.

Request:

```xml
PUT /sammy.png?acl HTTP/1.1
Content-Type: application/xml
Content-Length: 443
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256:c0bd9ba784be78d4f38bbc1e3b0da2de2e7a8f4ee259b3b840369cf00a78dad2
x-amz-date:20200831T192142Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date,Signature=dfeeb2386f76b29097adadb35ac15f7d5f244f18cc95f082b0ac6d14ced48b10


<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Owner>
    <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
  </Owner>
  <AccessControlList>
    <Grant>
      <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
        <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
      </Grantee>
      <Permission>FULL_CONTROL</Permission>
    </Grant>
  </AccessControlList>
</AccessControlPolicy>
```

Response:

```http
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 19:21:42 GMT
x-amz-request-id: tx0000000000000027aafc9-005963d3c6-1268c-ru-mska
Content-Type: application/xml
Content-Length: 0
Connection: close
```
