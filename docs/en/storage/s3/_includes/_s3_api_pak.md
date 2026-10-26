## {heading(General information)[id=api-spec-s3-pak-general]}

Prefix access keys (prefix access keys) allow you to create users whose access is restricted to a specific path. These users are linked to the buckets their prefix applies to. When working with prefix access keys, the following restrictions apply:

- a user can be linked to only 1 bucket (at creation time);
- the user will not have access to other buckets or to the contents of their own bucket for which the path does not start with that user's prefix;
- access keys can only be obtained at creation time;
- a user can have only 1 pair of keys;
- for ease of use, it is recommended to name users in a way that relates to the prefix they have access to. For example, username = user/folder1/file1; prefix = folder1/file1.

## {heading(Creating prefix access keys)[id=api-spec-s3-pak-create]}

**Supported PAK methods**

- `CreatePrefixKey`;
- `ListPrefixKeys`;
- `DeletePrefixKey`.

**Description**

Creates the user `examplename` with prefix access keys for accessing the path `exampleprefix`. Such a user can have only one pair of prefix access keys.

**Request**

```curl
PUT /?pak&username=examplename&prefix=exampleprefix HTTP/1.1
Host: bucketName.hb.ru-msk.vkcloud-storage.ru
Date: Wed, 14 Feb 2018 11:21:57 GMT
Authorization: authorization string
Connection: close
```

**Request parameters**

- `username` — the user to whom the keys will belong;
- `prefix` — the path prefix that will be accessible with these keys.

**Response**

```curl
HTTP/1.1 200 OK
Server: nginx/1.12.1
Date: Wed, 14 Feb 2018 13:38:54 GMT
Content-Type: application/xml
Content-Length: 351
Connection: close
X-req-id: 2NrqrYuki

<?xml version="1.0" encoding="utf-8"?>
<CreatePrefixKeyResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <BucketName>bucketName</BucketName>
    <Prefix>exampleprefix</Prefix>
    <UserName>examplename</UserName>
    <SecretKey>LVQaicnPLR7eVg5soGgWCJjGe3w3S8toaRxd329xv4w</SecretKey>
    <AccessKey>6hGka6NefpEoNse4xJOEx3</AccessKey>
</CreatePrefixKeyResult>
```

**Description of XML elements**

- `BucketName` — the bucket name.
- `Prefix` — the path prefix that will be accessible with these keys.
- `UserName` — the user to whom the keys belong.
- `SecretKey` — the secret key, returned only at creation time; the key cannot be retrieved afterward.
- `AccessKey` — the public key.

## {heading(List of prefix users)[id=api-spec-s3-pak-list]}

**Requests**

```curl
GET /?pak&marker=prefix&max-keys=2&name-prefix=prefix HTTP/1.1
Authorization: authorization string
Connection: close
Date: Wed, 14 Feb 2018 12:28:10 GMT
Host: bucketName.hb.ru-msk.vkcloud-storage.ru
```

**Request parameters**

- `max-keys` — the maximum number of items in the listing, optional.
- `name-prefix` — the prefix by user names, optional.
- `marker` — the user name or part of a user name from which the listing will start, optional.

**Response**

```curl
HTTP/1.1 200 OK

Server: nginx/1.12.1
Date: Wed, 14 Feb 2018 13:39:27 GMT
Content-Type: application/xml
Content-Length: 457
Connection: close
X-req-id: 35RBZWzAX

<?xml version="1.0" encoding="utf-8"?>
<ListPrefixKeysResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <BucketName>bucketName</BucketName>
    <IsTruncated>false</IsTruncated>
    <NamePrefix>prefix</NamePrefix>
    <MaxKeys>2</MaxKeys>
    <Marker>prefix</Marker>
    <Contents>
          <UserName>prefixusers/prefix/for1</UserName>
          <Prefix>prefix/for1</Prefix>
    </Contents>
    <Contents>
          <UserName>prefixusers/prefix/for2</UserName>
          <Prefix>prefix/for2</Prefix>
     </Contents>
</ListPrefixKeysResult>
```

**Description of XML elements**

- `BucketName` — the bucket name.
- `IsTruncated` — `true` if only part of the prefix users is shown.
- `Marker` — the user name or part of a user name from which the listing will start.
- `NamePrefix` — the prefix by user names.
- `MaxKeys` — the maximum number of items in the listing.
- `Contents` — a block containing a user.
- `UserName` — the user name.
- `Prefix` — the prefix for which data is accessible to this user.

## {heading(Deleting a user's prefix key)[id=api-spec-s3-pak-delete]}

**Request**

```curl
DELETE /?pak&prefix=prefix/for1&username=prefixusers/prefix/for1 HTTP/1.1
Authorization: authorization string
Connection: close
Date: Wed, 14 Feb 2018 13:05:31 GMT
Host:  bucketName.hb.ru-msk.vkcloud-storage.ru
```

**Request parameters**

- `username` — the user name.
- `prefix` — the path for which objects are accessible to this user, optional.

**Response**

```curl
HTTP/1.1 200 OK

Server: nginx/1.12.1
Date: Wed, 14 Feb 2018 13:39:27 GMT
Content-Type: application/xml
Content-Length: 207
Connection: close
X-req-id: 33yVonNmQ

<?xml version="1.0" encoding="utf-8"?>
<DeletePrefixKeyResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
     <UserName>prefixusers/prefix/for1</UserName>
     <Prefix>prefix/for1</Prefix>
</DeletePrefixKeyResult>
```

**Description of XML elements**

- `Prefix` — the path prefix that will be accessible with these keys.
- `UserName` — the user to whom the keys belong.
