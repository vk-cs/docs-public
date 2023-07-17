## general information

Prefix access keys allow you to create users for whom access is restricted to a specific path. These users are bound to buckets for which their prefix works. There are the following restrictions when working with prefix keys:

- the user can only be bound to 1 bucket (at creation)
- the user will not have access to other buckets and the contents of his bucket, for which the path will not start with the prefix of this user
- access keys can only be obtained upon creation
- a user can only have 1 pair of keys
- for ease of use, it is recommended to name users associated with the prefix by which they have access. For example username = user / folder1 / file1; prefix = folder1 / file1

## Generating prefix keys

**Supported PAK methods**

- CreatePrefixKey
- ListPrefixKeys
- DeletePrefixKey

**Description**

Create user examplename with prefix keys to access the path exampleprefix. One such user can only have one pair of prefix keys

**Request**

```
PUT /? Pak & username = examplename & prefix = exampleprefix HTTP / 1.1
Host: bucketName.hb.vkcs.cloud
Date: Wed, 14 Feb 2018 11:21:57 GMT
Authorization: authorization string
Connection: close
```

**Request parameters**

- username - the user who will own the keys
- prefix - the prefix of the path that will be available for these keys

**Answer**

```
HTTP / 1.1 200 OK

Server: nginx / 1.12.1
Date: Wed, 14 Feb 2018 13:38:54 GMT
Content-Type: application / xml
Content-Length: 351
Connection: close
X-req-id: 2NrqrYuki

<? xml version = "1.0" encoding = "utf-8"?>
<CreatePrefixKeyResult xmlns = "http://s3.amazonaws.com/doc/2006-03-01/">
    <BucketName> bucketName </BucketName>
    <Prefix> exampleprefix </Prefix>
    <UserName> examplename </UserName>
    <SecretKey> LVQaicnPLR7eVg5soGgWCJjGe3w3S8toaRxd329xv4w </SecretKey>
    <AccessKey> 6hGka6NefpEoNse4xJOEx3 </AccessKey>
</CreatePrefixKeyResult>
```

**Description of XML elements**

- BucketName - the name of the bucket
- Prefix - path prefix that will be available for these keys
- UserName - the user who owns the keys
- SecretKey - a secret key, it is returned only upon creation, it is impossible to get the key later
- AccessKey - public key

## List of prefix users

**Inquiries**

```
GET /? Pak & marker = prefix & max-keys = 2 & name-prefix = prefix HTTP / 1.1
Authorization: authorization string
Connection: close
Date: Wed, 14 Feb 2018 12:28:10 GMT
Host: bucketName.hb.vkcs.cloud
```

**Request parameters**

- max-keys - the maximum number of items in the optional listing
- name-prefix - username prefix optional
- marker - the name or part of the username from which the listing will begin optional

**Answer**

```
HTTP / 1.1 200 OK

Server: nginx / 1.12.1
Date: Wed, 14 Feb 2018 13:39:27 GMT
Content-Type: application / xml
Content-Length: 457
Connection: close
X-req-id: 35RBZWzAX

<? xml version = "1.0" encoding = "utf-8"?>
<ListPrefixKeysResult xmlns = "http://s3.amazonaws.com/doc/2006-03-01/">
    <BucketName> bucketName </BucketName>
    <IsTruncated> false </IsTruncated>
    <NamePrefix> prefix </NamePrefix>
    <MaxKeys> 2 </MaxKeys>
    <Marker> prefix </Marker>
    <Contents>
          <UserName> prefixusers / prefix / for1 </UserName>
          <Prefix> prefix / for1 </Prefix>
    </Contents>
    <Contents>
          <UserName> prefixusers / prefix / for2 </UserName>
          <Prefix> prefix / for2 </Prefix>
     </Contents>
</ListPrefixKeysResult>
```

**Description of XML elements**

- BucketName - the name of the bucket
- IsTruncated - true if only part of prefixed users are displayed
- Marker - the name or part of the username from which the listing will begin
- NamePrefix - username prefix
- MaxKeys - the maximum number of items in the listing
- Contents - block containing the user
- UserName - username
- Prefix - prefix by which data is available for this user

## Removing a prefix key from a user

**Request**

```
DELETE /? Pak & prefix = prefix% 2Ffor1 & username = prefixusers% 2Fprefix% 2Ffor1 HTTP / 1.1
Authorization: authorization string
Connection: close
Date: Wed, 14 Feb 2018 13:05:31 GMT
Host: bucketName.hb.vkcs.cloud
```

**Request parameters**

- username - username
- prefix - the path where objects are available for this user optional

**Answer**

```
HTTP / 1.1 200 OK

Server: nginx / 1.12.1
Date: Wed, 14 Feb 2018 13:39:27 GMT
Content-Type: application / xml
Content-Length: 207
Connection: close
X-req-id: 33yVonNmQ

<? xml version = "1.0" encoding = "utf-8"?>
<DeletePrefixKeyResult xmlns = "http://s3.amazonaws.com/doc/2006-03-01/">
     <UserName> prefixusers / prefix / for1 </UserName>
     <Prefix> prefix / for1 </Prefix>
</DeletePrefixKeyResult>
```

**Description of XML elements**

- Prefix - path prefix that will be available for these keys
- UserName - the user who owns the keys
