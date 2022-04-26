## general information

Access Control List VK CS (ACL or Access Control List) allow you to control access to buckets and objects. Each bucket and object has its own ACL, with which you can determine which accounts and groups are granted access, as well as the type of access. When receiving a request for a resource, the service checks the corresponding ACL to see if the requestor has access rights.

**Note**

By default, the created bucket or object gets a Private ACL, where the owner has full rights, and the rest of the participants have access denied.

When a container or object is created, the service creates a standard ACL that grants the resource owner full control over that resource and denies access to other projects. This is shown in the following bucket ACL example (the default object ACL has the same structure).

```
 <? xml version = "1.0" encoding = "UTF-8"?>
<AccessControlPolicy xmlns = "http: // <bucket_name> .hb.bizmrg.com / images / 01.jpg /">
<Owner>
<ID> \*\*\* Owner-Canonical-User-ID \*\*\* </ID>
<DisplayName> owner-display-name </DisplayName>
</Owner>
<AccessControlList>
<Grant>
<Grantee xmlns: xsi = "http://www.w3.org/2001/XMLSchema-instance" 
xsi: type = "Canonical User">
<ID> \*\*\* Owner-Canonical-User-ID \*\*\* </ID>
<DisplayName> display-name </DisplayName>
</Grantee>
<Permission> FULL_CONTROL </Permission>
</Grant>
</AccessControlList>
</AccessControlPolicy>
```

- The < **Owner** > element identifies the owner by the canonical user ID of the VK CS account.
- The < **Grant** > element identifies the recipient (VK CS account or predefined group) and grants permission.

The base ACL shown as an example defaults to one Grant element per owner. To grant permission, <Grant> elements are added, each <Grant> element must specify the grantor and permission options.

**Note**

ACLs can contain up to 100 permissions.

## Recipient of rights

The recipient of rights can be an VK CS project or one of the global VK CS groups. Rights can be granted to an VK CS project using the project ID address (mcs_pid) or the canonical user ID. Moreover, if you specify the project identifier in the request for access rights, then the service determines the canonical user ID for the corresponding project and adds it to the ACL. As a result, the ACL will always contain the canonical user ID for the project, not the project ID.

To grant access rights, you must specify each recipient as a type = value pair, where type is one of the following:

- id - the canonical user ID of the VK CS account
- uri is a predefined group to which permission is granted
- emailAddress - VK CS project ID

**Example: project ID**

For example, the x-amz-grant-read header grants VK CS accounts identified by mcs_pid permissions to read object data and its metadata:

```
 x-amz-grant-read: emailAddress = "mcs1447309426", emailAddress = "mcs1380112926"
```

**Attention**

When granting other VK CS accounts access to their resources, please note that VK CS accounts can delegate their permissions to users under their own accounts. This is known as multi-account access.

## Canonical user ID

The canonical user ID is associated with the VK CS account. It's a long string like eab55955-ebdb-4f18-a94d-f3558ff150da.

It can be calculated using the command

```
 aws s3api list-buckets --query Owner.ID --output text --endpoint-url https://hb.bizmrg.com
```

You can also find the canonical user ID of the VK CS account by reading the ACL of the bucket or object that the VK CS account has access to. When an individual VK CS account is granted permissions on a Grant request, a grant entry with the canonical user ID of the VK CS account is added to the ACL.

**Note**

If you make your bucket public (not recommended), any unauthenticated user can upload objects to the bucket. These anonymous users do not have an VK CS account. When an anonymous user uploads an object to a bucket, VK CS S3 adds a special canonical user ID (65a011a29cdf8ec533ec3d1ccaae921c) as the owner of the object to the ACL.

## Project ID

Project ID (mcs_pid) - a unique parameter that characterizes a project on the VK CS platform. You can get it in your personal account in the account information area:

![](./assets/1598387677549-1598387677549.png)

The button located next to the project ID allows you to copy the parameter for convenience.

## Predefined groups

VK CS S3 has a set of predefined groups. When granting access to an account to a group, one of the URIs is specified instead of the canonical user ID. The following predefined groups are available:

**Authenticated Users** - a group of authorized users, represented by http://acs.amazonaws.com/groups/global/AuthenticatedUsers.

All VK CS accounts are represented in this group. Permission to access this group allows any VK CS account to access the resource. However, all requests must be signed (authenticated).

**Attention**

When granting access to the Authenticated Users group of users, any authorized VK CS user from the Internet can access the resource.

**All Users** - The All Users group, represented by http://acs.amazonaws.com/groups/global/AllUsers.

Permission to access this group allows anyone on the Internet to access the resource. Requests can be signed (authenticated) or unsigned (anonymous). Unsigned requests omit the Authentication header in the request.

**Caution**

It is highly recommended that you do not grant permission to the All Users group with WRITE, WRITE_ACP, or FULL_CONTROL authority. For example, WRITE permissions allow anyone to store objects in a bucket, which is paid for by the current owner. It also allows others to delete objects that might need to be kept.

## Types of permits

The table lists the permission sets that VK CS S3 supports in the ACL. The ACL permission set is the same for object ACL and bucket ACL. These ACLs grant permissions for specific buckets or object operations. The table lists the permissions and describes what they mean in the context of objects and buckets.

<table border="0" cellpadding="0" cellspacing="0" style="margin-right: calc(1%); width: 99%;" width="426"><tbody><tr><td height="19" style="width: 23.1392%; background-color: rgb(239, 239, 239);" width="23.943661971830984%">Resolution</td><td style="width: 36.8101%; background-color: rgb(239, 239, 239);" width="37.08920187793427%">Applying to a bucket</td><td style="width: 39.7722%; background-color: rgb(239, 239, 239);" width="38.967136150234744%">Applying to an object</td></tr><tr><td height="19" style="width: 23.1392%;">READ</td><td style="width: 36.8101%;"><ul><li>HeadBucket</li><li>GetBucketLifecycle</li><li>GetBucketNotification</li><li>ListObjects</li><li>ListParts</li><li>ListMultiparts</li></ul></td><td style="width: 39.7722%;"><p>Allows you to get the content of an object and its metadata:</p><ul><li>GetObject</li><li>HeadObject</li><li>GetObjectRange</li></ul><br></td></tr><tr><td height="19" style="width: 23.1392%;">WRITE</td><td style="width: 36.8101%;"><p>Allows you to create, delete, overwrite any objects in the bucket:</p><ul><li>DeleteBucketNotification</li><li>PutBucketNotification</li><li>PutBucketLifecycle</li><li>DeleteBucketLifecycle</li><li>DeleteObject</li><li>DeletMultipleObjects</li><li>AbortMultipart</li><li>InitMultipart</li><li>UploadPart</li><li>CompliteMultipart</li><li>PutObject</li><li>PutObjectCopy</li></ul></td><td style="width: 39.7722%;">Not applicable</td></tr><tr><td height="19" style="width: 23.1392%;">READ_ACP</td><td style="width: 36.8101%;"><p>Allows reading the bucket ACL:</p><ul><li>GetBucketAcl</li><li>GetBucketCors</li></ul></td><td style="width: 39.7722%;"><p>Allows reading the ACL of an object:</p><p>GetObjectAcl</p><br></td></tr><tr><td height="19" style="width: 23.1392%;">WRITE_ACP</td><td style="width: 36.8101%;"><p>Allows you to change the bucket ACL:</p><ul><li>CreatePrefixKey</li><li>DeletePrefixKey</li><li>ListPrefixKeys</li><li>PutBucketCors</li><li>DeleteBucketCors</li><li>PutBucketAcl</li></ul></td><td style="width: 39.7722%;"><p>Allows changing the ACL of an object</p><p>PutObjectAcl</p><br></td></tr><tr><td height="19" style="width: 23.1392%;">FULL_CONTROL</td><td style="width: 36.8101%;">Combines READ, WRITE, READ_ACP, WRITE_ACP permissions for bucket</td><td style="width: 39.7722%;">Combines READ, WRITE, READ_ACP, WRITE_ACP rights for an object</td></tr></tbody></table>

## Mapping ACL Permissions and Access Policy Permissions

The ACL only allows a finite set of permissions compared to the number of permissions that can be set in the access policy. Each of these permissions allows one or more VK CS S3 operations to be performed.

The following table shows how each ACL permission maps to the corresponding access policy permissions. As you can see, the access policy allows more permissions than the ACL. ACL is used primarily to grant basic read and write permissions, similar to file system permissions.

<table border="0" cellpadding="0" cellspacing="0" style="margin-right: calc(2%); width: 98%;" width="289"><tbody><tr><td height="19" style="width: 24.3411%; background-color: rgb(239, 239, 239);" width="38.062283737024224%">ACL permission</td><td style="width: 37.1576%; background-color: rgb(239, 239, 239);" width="29.41176470588235%">Access policy for bucket</td><td style="width: 38.2946%; background-color: rgb(239, 239, 239);" width="32.52595155709343%">Object access policy</td></tr><tr><td height="19" style="width: 24.3411%;">READ</td><td style="width: 37.1576%;">s3: ListBucket, s3: ListBucketMultipartUploads</td><td style="width: 38.2946%;">s3: GetObject</td></tr><tr><td height="19" style="width: 24.3411%;">WRITE</td><td style="width: 37.1576%;">s3: PutObject, s3: DeleteObject</td><td style="width: 38.2946%;">Not applicable</td></tr><tr><td height="19" style="width: 24.3411%;">READ_ACP</td><td style="width: 37.1576%;">s3: GetBucketAcl</td><td style="width: 38.2946%;">s3: GetObjectAcl</td></tr><tr><td height="19" style="width: 24.3411%;">WRITE_ACP</td><td style="width: 37.1576%;">s3: PutBucketAcl</td><td style="width: 38.2946%;">s3: PutObjectAcl</td></tr><tr><td height="19" style="width: 24.3411%;">FULL_CONTROL</td><td style="width: 37.1576%;">Equivalent to providing READ, WRITE,<br>READ_ACP, and WRITE_ACP ACL permissions</td><td style="width: 38.2946%;">Equivalent to granting READ, READ_ACP, and WRITE_ACP ACL permissions</td></tr></tbody></table>

## Status keys

When granting access policy permission, you can use conditional keys to restrict the ACL value for an object using a bucket policy. The following context keys correspond to ACLs. These context keys are intended to indicate the use of a specific ACL in a request:

- s3: x-amz-grant-read - Read access
- s3: x-amz-grant-write - Write rights
- s3: x-amz-grant-read-acp - Access to read ACL bucket
- s3: x-amz-grant-write-acp - Bucket ACL write permissions
- s3: x-amz-grant-full-control - Full control
- s3: x-amz-acl - Use a templated ACL

## ACL example

```
 <? xml version = "1.0" encoding = "UTF-8"?>
<AccessControlPolicy xmlns = "http: // <bucket_name> .hb.bizmrg.com / images / 01.jpg /">
<Owner>
<ID> Owner-canonical-user-ID </ID>
<DisplayName> display-name </DisplayName>
</Owner>
<AccessControlList>
<Grant>
<Grantee xmlns: xsi = "http://www.w3.org/2001/XMLSchema-instance" xsi: type = "CanonicalUser">
<ID> Owner-canonical-user-ID </ID>
<DisplayName> display-name </DisplayName>
</Grantee>
<Permission> FULL_CONTROL </Permission>
</Grant>
 
<Grant>
<Grantee xmlns: xsi = "http://www.w3.org/2001/XMLSchema-instance" xsi: type = "CanonicalUser">
<ID> user1-canonical-user-ID </ID>
<DisplayName> display-name </DisplayName>
</Grantee>
<Permission> WRITE </Permission>
</Grant>

<Grant>
<Grantee xmlns: xsi = "http://www.w3.org/2001/XMLSchema-instance" xsi: type = "CanonicalUser">
<ID> user2-canonical-user-ID </ID>
<DisplayName> display-name </DisplayName>
</Grantee>
<Permission> READ </Permission>
</Grant>

<Grant>
<Grantee xmlns: xsi = "http://www.w3.org/2001/XMLSchema-instance" xsi: type = "Group">
<URI> http://acs.amazonaws.com/groups/global/AllUsers </URI> 
</Grantee>
<Permission> READ </Permission>
</Grant>

</AccessControlList>
</AccessControlPolicy>
```

## Fixed ACL

VK CS S3 supports a set of predefined permissions known as standard ACLs. Each fixed ACL has a predefined set of recipients and permissions. The following table lists the standard ACLs and their associated predefined permissions.

<table border="0" cellpadding="0" cellspacing="0" style="margin-right: calc(0%); width: 100%;" width="289"><tbody><tr><td height="19" style="width: 25.6203%; background-color: rgb(239, 239, 239);" width="38.062283737024224%">Fixed ACL</td><td style="width: 23.8734%; background-color: rgb(239, 239, 239);" width="29.41176470588235%">Refers to</td><td style="width: 50.3038%; background-color: rgb(239, 239, 239);" width="32.52595155709343%">Permissions added to ACL</td></tr><tr><td height="19" style="width: 25.6203%;">private</td><td style="width: 23.8734%;">Bucket and object</td><td style="width: 50.3038%;">The owner gets FULL_CONTROL. Nobody else has access rights (default).</td></tr><tr><td height="19" style="width: 25.6203%;">public-read</td><td style="width: 23.8734%;">Bucket and object</td><td style="width: 50.3038%;">The owner gets FULL_CONTROL. The AllUsers group gets READ access.</td></tr><tr><td height="19" style="width: 25.6203%;">public-read-write</td><td style="width: 23.8734%;">Bucket and object</td><td style="width: 50.3038%;">The owner gets FULL_CONTROL. The AllUsers group gets READ and WRITE access.</td></tr><tr><td height="19" style="width: 25.6203%;">aws-exec-read</td><td style="width: 23.8734%;">Bucket and object</td><td style="width: 50.3038%;">The owner gets FULL_CONTROL.</td></tr><tr><td height="19" style="width: 25.6203%;">authenticated-read</td><td style="width: 23.8734%;">Bucket and object</td><td style="width: 50.3038%;">The owner gets FULL_CONTROL. AuthenticatedUsers group gets READ access.</td></tr><tr><td height="19" style="width: 25.6203%;">bucket-owner-read</td><td style="width: 23.8734%;">An object</td><td style="width: 50.3038%;">The owner of the object gets FULL_CONTROL. The bucket owner gets READ access. If you specify this template ACL when creating a bucket, VK CS S3 will ignore it.</td></tr><tr><td height="19" style="width: 25.6203%;">bucket-owner-full-control</td><td style="width: 23.8734%;">An object</td><td style="width: 50.3038%;">Both the object owner and the bucket owner get FULL_CONTROL over the object. If you specify this fixed ACL when creating a bucket, VK CS S3 will ignore it.</td></tr></tbody></table>

**Note**

Only one of these fixed ACLs can be specified in a request.

The request specifies a fixed ACL using the x-amz-acl request header. When VK CS S3 receives a request with a standard ACL in the request, it adds the predefined permissions to the ACL of the resource.
