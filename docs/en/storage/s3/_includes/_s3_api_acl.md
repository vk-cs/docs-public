{includetag(acl_1)}

ACL (Access Control List) lets you control which users are allowed to perform which operations in the {var(s3)} service. Each bucket and object has its own ACL, which lists {linkto(#api-spec-s3-acl-permittees)[text=access permittees]} and the {linkto(#api-spec-s3-acl-permissions)[text=permissions]} granted to them.

The following API methods are available for ACL operations on buckets and objects:

- {linkto(#api-spec-s3-get-bucket-acl)[text=%text]} — Get the bucket ACL.
- {linkto(#api-spec-s3-put-bucket-acl)[text=%text]} — Set the bucket ACL.
- {linkto(#api-spec-s3-get-object-acl)[text=%text]} — Get the object ACL.
- {linkto(#api-spec-s3-put-object-acl)[text=%text]} — Set the object ACL.

You can set the ACL both when creating a bucket or uploading an object, and afterward. You can specify the ACL configuration in the `PutBucketACL` and `PutObjectACL` methods in two ways:

- In the request body — as an {linkto(#api-spec-s3-acl-request-body)[text=XML ACL configuration structure]}. This method is used only for existing buckets or objects.
- In the {linkto(#api-spec-s3-acl-request-headers)[text=request headers]}. This method is used both when creating a bucket or uploading an object, and for existing buckets or objects.

You can use only one of these methods in a single request.

## {heading(XML ACL configuration structure)[id=api-spec-s3-acl-request-body]}

The ACL configuration in XML format contains the following elements:

- `<Owner>` — contains the identifier (`ID`) and name (`DisplayName`) of the {linkto(#api-spec-s3-acl-project)[text=project]} that the bucket or object belongs to. To get the `ID` and `DisplayName`, {ifdef(public)}{linkto(../../../../../storage/s3/instructions/access-management/acl#s3-instructions-bucket-acl-view)[text=request]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../instructions/access-management/acl#s3-instructions-bucket-acl-view)[text=request]}{/ifdef} information about the bucket ACL. 
- `<Grant>` — defines which permissions are granted to which grantee. `<Grant>` contains the `<Grantee>` and `<Permission>` elements.

  - `<Grantee>` — specifies the access permittee using attributes:

    - `ID` — the identifier of the {linkto(#api-spec-s3-acl-permittees)[text=permittee]}.
    - `Type` — the type of the permittee: `CanonicalUser` or `Group`.

  - `<Permission>` — specifies the type of {linkto(#api-spec-s3-acl-permissions)[text=permission]} granted.

Example of an XML ACL configuration structure:

```curl
<AccessControlPolicy>
  <Owner>
    <ID>Owner-canonical-user-ID</ID>
    <DisplayName>owner-display-name</DisplayName>
  </Owner>
  <AccessControlList>
    <Grant>
      <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
        <ID>Owner-canonical-user-ID</ID>
        <DisplayName>owner-display-name</DisplayName>
      </Grantee>
      <Permission>FULL_CONTROL</Permission>
    </Grant>
  </AccessControlList>
</AccessControlPolicy>
```

## {heading(Request headers)[id=api-spec-s3-acl-request-headers]}

The following headers are used to specify the ACL configuration in `PUT` requests:

- `x-amz-acl` — assigns a preconfigured {ifdef(public)}{linkto(../../../../../storage/s3/concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=standard ACL]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=standard ACL]}{/ifdef} to the bucket or object.
- `x-amz-grant-read` — sets the read permission (`READ`).
- `x-amz-grant-write` — sets the write permission (`WRITE`).
- `x-amz-grant-read-acp` — sets the ACL read permission (`READ_ACP`).
- `x-amz-grant-write-acp` — sets the ACL write permission (`WRITE_ACP`).
- `x-amz-grant-full-control` — grants full control (`FULL_CONTROL`).

The `x-amz-acl` header cannot be combined in a single request with the other headers listed above. You can either use a standard ACL or explicitly specify permittees.

## {heading(Access permittees)[id=api-spec-s3-acl-permittees]}

Access rights to buckets and objects can be granted to the following categories of permittees:

- {linkto(#api-spec-s3-acl-project)[text=Project]} {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef}.
- A predefined {linkto(#api-spec-s3-acl-meta)[text=metagroup]}.

### {heading(Project)[id=api-spec-s3-acl-project]}

The project is the only access permittee in {var(s3)} with the `CanonicalUser` type. It is automatically assigned to all buckets and objects with `FULL_CONTROL` permissions and is identical to the owner. This permittee cannot be deleted or changed. Permissions granted to the project apply to all {var(s3)} accounts within the project. 

### {heading(Metagroup)[id=api-spec-s3-acl-meta]}

A predefined metagroup is an access permittee in {var(s3)} with the `Group` type that lets you grant separate permissions to two categories of users outside the project.

- `Authenticated Users` (authenticated users) — all existing {var(s3)} accounts, from {ifdef(public)}all {var(cloud)} projects{/ifdef}{ifdef(s3,s3-pdf)}the entire installation{/ifdef}.

  {note:warn}
  When access is granted to the `Authenticated Users` group, any authenticated {var(s3)} user can gain access to the resource. Unsigned (anonymous) requests are rejected.
  {/note}

  To grant access to the `Authenticated Users` group:

  - When setting it via the XML structure, specify the `<URI>` tag inside the `Grantee` block.

    Example: `<URI>http://acs.amazonaws.com/groups/global/AuthenticatedUsers</URI>`

  - When setting it via a header, use the `uri` key in its value.

    Example: `uri="http://acs.amazonaws.com/groups/global/AuthenticatedUsers"`

- `All Users` (all users).

  {note:warn}
  When access is granted to the `All Users` group, anyone who knows the full URL of the object will have access to it. Requests can be signed (authenticated) or unsigned (anonymous).
  {/note}

  To grant access to the `All Users` group:

  - When setting it via the XML structure, specify the `<URI>` tag inside the `Grantee` block.

    Example: `<URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>`

  - When setting it via a header, use the `uri` key in its value.

    Example: `uri="http://acs.amazonaws.com/groups/global/AllUsers"`

  Anonymous, unauthenticated users, if granted access, perform actions under the canonical user ID `65a011a29cdf8ec533ec3d1ccaae921c`, since they do not have an account in {ifdef(public)}the {var(cloud)} project{/ifdef}{ifdef(s3,s3-pdf)}the {var(s3)} installation{/ifdef}.

{note:warn}
Use metagroups only when necessary.

By opening access to an undefined group of people, you lose control over who performs operations on your resources. At the same time, payment for {var(s3)} services will still be charged to the account of the project that owns the bucket.
{/note}

## {heading(Permissions)[id=api-spec-s3-acl-permissions]}

{/includetag}



{includetag(acl_2)}

## {heading(GetBucketACL)[id=api-spec-s3-get-bucket-acl]}

Getting the bucket ACL. To get it, you need the `READ_ACP` permission on the bucket.

If the `READ_ACP` permission is granted to an anonymous user, you can get the bucket ACL without using an authorization header.

Example request:

```curl
GET /?acl HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T174434Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=71dfa4666fb740d40d05307a29321c65cc620cdb17e8a9cb83d4f0e1b1b9d236
```

Example response:

```curl
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

## {heading(PutBucketACL)[id=api-spec-s3-put-bucket-acl]}

Setting the bucket ACL. To set the ACL, you need the `WRITE_ACP` permission on the bucket.

Request with the ACL configuration passed in the request body:

```curl
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

Example response:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:37:10 GMT
x-amz-request-id: tx00000000000000278ac49-005963c956-1268c-ru-mska
Content-Type: application/xml
Content-Length: 0
Connection: close
```

## {heading(GetObjectACL)[id=api-spec-s3-get-object-acl]}

Getting the object ACL. To get it, you need the `READ_ACP` permission on the object.

Example request:

```curl
GET /sammy.png?acl HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T191224Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=950e133849cd19d626291fd2937d927957cf3e97a36707d30d51a9b61ac08a8e
```

Example response:

```curl
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

## {heading(PutObjectACL)[id=api-spec-s3-put-object-acl]}

Setting the object ACL. To set the ACL, you need the `WRITE_ACP` permission on the object.

Request with the ACL configuration passed in the request body:

```curl
PUT /sammy.png?acl HTTP/1.1
Сontent-Type: application/xml
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

Example response:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 19:21:42 GMT
x-amz-request-id: tx0000000000000027aafc9-005963d3c6-1268c-ru-mska
Content-Type: application/xml
Content-Length: 0
Connection: close
```

## {heading(Recommendations for updating ACL)[id=api-spec-s3-acl-recommendations]}

When a new ACL configuration is set, the previous configuration is deleted. To avoid this, we recommend setting access permissions for all required categories of permittees at the same time.

Example of an XML structure for setting permissions simultaneously in a single request:

```curl
<?xml version="1.0" encoding="UTF-8"?>
<AccessControlPolicy xmlns="http://bucket_name.hb.ru-msk.vkcloud-storage.ru/images/01.jpg/">
   <Owner>
      <ID>Owner-canonical-user-ID</ID>
      <DisplayName>owner-display-name</DisplayName>
   </Owner>
   <AccessControlList>
      <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
            <ID>Owner-canonical-user-ID</ID>
            <DisplayName>owner-display-name</DisplayName>
         </Grantee>
         <Permission>FULL_CONTROL</Permission>
      </Grant>
     
      <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
            <ID>user1-canonical-user-ID</ID>
            <DisplayName>user1-display-name</DisplayName>
         </Grantee>
         <Permission>WRITE</Permission>
      </Grant>
     
      <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
            <URI>http://acs.amazonaws.com/groups/global/AllUsers</URI> 
         </Grantee>
         <Permission>READ</Permission>
      </Grant>

      <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
            <EmailAddress>project-ID</EmailAddress>
         </Grantee>
         <Permission>READ</Permission>
      </Grant>

   </AccessControlList>
</AccessControlPolicy>
```

{/includetag}
