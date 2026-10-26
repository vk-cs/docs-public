# {heading(Access control (ACL))[id=s3-concepts-acl]}

{include(/en/_includes/_translated_by_ai_en.md)}

ACL (Access Control List) in the {var(s3)} service defines which storage accounts or groups are granted access to a bucket or object. Each bucket or object has its own ACL, which can contain up to 100 entries. Each entry specifies the {linkto(#s3-concepts-acl-permittees)[text=grantee]} and the type of {linkto(#s3-concepts-acl-permissions)[text=permission]} granted to it. When a request to a bucket or object is received, {var(s3)} checks the corresponding ACLs to verify whether the requester has the required permissions.

The {var(s3)} service supports a set of {linkto(#s3-concepts-acl-pre-set)[text=pre-defined ACLs]} — ready-made lists of grantees and the permissions assigned to them. When creating a bucket, {var(s3)} applies the `private` pre-defined ACL by default. This ACL grants the bucket owner full control over the bucket and denies access to all other users.

An object ACL can be assigned:

- When uploading a new object to a bucket via the management console, you select one of the {linkto(#s3-concepts-acl-pre-set)[text=pre-defined ACLs]} for it.
- When uploading via the API, you can specify the object ACL in the request body or headers.

If no ACL is specified, the `private` pre-defined ACL with maximally restricted access will be assigned to the new bucket or object: when creating a bucket, only the bucket owner will get access; when adding an object, only the object owner will get access.

The ACL for a bucket or object can be changed later. The ACL of a bucket and the ACL of an object inside it may differ.

ACL parameters can be {linkto(../../../instructions/access-management/acl#s3-instructions-acl)[text=passed]} via {linkto(../../../api/acl#api-spec-s3-acl-request-body)[text=configuration]} in the following formats:

- XML, when sending a request via the API;
- JSON, if AWS CLI is used.

## {heading(Grantees)[id=s3-concepts-acl-permittees]}

Access to buckets and objects can be granted to the following categories of grantees:

- A project {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef}.
- Pre-defined metagroups:

    - `AuthenticatedUsers` — all {var(s3)} accounts in any {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} project.
    - `AllUsers` — any anonymous user, including those who are not {var(s3)}{ifdef(public)} or {var(cloud)}{/ifdef} users.

{note:warn}
Use metagroups only when necessary.

Once you grant access to a bucket and its objects to an unrestricted group of people, you will not be able to control operations with these resources{ifdef(public)}, including paid ones. Payment for bucket operations is borne by its owner{/ifdef}.
{/note}

## {heading(Permissions)[id=s3-concepts-acl-permissions]}

{include(../../../_includes/_s3_api_acl_permissions.md)}

Information about the operations listed in the table can be found in the {linkto(../../../api#s3-api)[text=section describing the {var(s3)} API]}.

## {heading(Pre-defined ACLs)[id=s3-concepts-acl-pre-set]}

{var(s3)} provides pre-configured access control lists — pre-defined ACLs. These lists can be used in API requests for access to a bucket, object, or their current ACLs.

A pre-defined ACL is specified in a request using the `x-amz-acl` HTTP header. Only one pre-defined ACL can be specified. When {var(s3)} receives a request containing a pre-defined ACL, it adds the pre-configured permissions to the ACL of the corresponding bucket or object{ifdef(s3-pdf)}({linkto(#tab_acl)[text=table %number]}){/ifdef}.

{ifdef(s3-pdf)}
{caption(Table {counter(table)[id=numb_tab_acl]} — ACL permissions)[align=right;position=above;id=tab_acl;number={const(numb_tab_acl)}]}
{/ifdef}
[cols="2,1,4", options="header"]
|===
|Pre-defined ACL
|Scope
|Pre-configured permissions

|`private`

(default)
|Bucket and object
|The owner has full rights (`FULL_CONTROL`). Other users have no access rights

|`public-read`
|Bucket and object
|The owner has full rights (`FULL_CONTROL`). The `AllUsers` metagroup has read access (`READ`)

|`authenticated-read`
|Bucket and object
|The owner has full rights (`FULL_CONTROL`). The `AuthenticatedUsers` metagroup has read rights (`READ`)

If this pre-defined ACL is specified when creating a bucket, {var(s3)} will ignore it
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}