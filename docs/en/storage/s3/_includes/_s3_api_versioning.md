Methods for working with bucket object versioning:

- {linkto(#api-spec-s3-get-bucket-versioning)[text=%text]} — view the versioning status.
- {linkto(#api-spec-s3-put-bucket-versioning)[text=%text]} — enable or suspend versioning.
- {linkto(#api-spec-s3-list-object-versions)[text=%text]} — get metadata about all object versions in the bucket.

## {heading(GetBucketVersioning)[id=api-spec-s3-get-bucket-versioning]}

The `GET` operation returns information about the bucket's versioning. Versioning can be set to one of two states: `Enabled` — enabled; `Suspended` — suspended.

Example response:

```curl
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<VersioningConfiguration>
   <Status>Suspended</Status>
</VersioningConfiguration>
```

## {heading(PutBucketVersioning)[id=api-spec-s3-put-bucket-versioning]}

The `PUT` operation enables or suspends bucket versioning. Versioning can be set to one of two states:

- `Enabled` — object versioning is enabled. All new objects added to the bucket will be assigned a unique version identifier, `versionId`. Objects that already existed in the bucket before versioning was enabled have a version identifier equal to `null`. After these objects are modified, they will also be assigned a `versionId`.
- `Suspended` — object versioning is suspended. All new objects added to the bucket will be assigned a version identifier equal to `null`.

Example request to enable bucket versioning:

```curl
PUT /?versioning HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
Content-MD5: ContentMD5

<?xml version="1.0" encoding="UTF-8"?>
<VersioningConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <Status>Enabled</Status>
</VersioningConfiguration>
```

Here, `<Status>` is the bucket versioning status. Possible values: `Enabled` — enabled; `Suspended` — suspended.

Example response:

```curl
HTTP/1.1 200 OK
x-amz-id-2: YgIPIfBiKa2bj0KMg95r/0zo3emzU4dzsD4rcKCHQUAdQkf3ShJTOOpXUueF6QKo
x-amz-request-id: 236A8905248E5A01
Date: Wed, 01 Mar  2006 12:00:00 GMT3
```

## {heading(ListObjectVersions)[id=api-spec-s3-list-object-versions]}

Returns metadata about all object versions in the bucket, including the object delete marker. You can use request parameters as selection criteria to return metadata about a subset of object versions.

To successfully perform the operation, you must have `READ` permission on the bucket.

Example request:

```curl
GET /?versions&delimiter=Delimiter&encoding-type=EncodingType&key-marker=KeyMarker&max-keys=MaxKeys&prefix=Prefix&version-id-marker=VersionIdMarker HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-expected-bucket-owner: ExpectedBucketOwner
x-amz-request-payer: RequestPayer
x-amz-optional-object-attributes: OptionalObjectAttributes
```

**Path parameters**

{ifdef(s3-pdf)}
A description of the parameters is given in {linkto(#tab_path_parameters2)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_path_parameters2]} — Path parameters)[align=right;position=above;id=tab_path_parameters2;number={const(numb_tab_path_parameters2)}]}
{/ifdef}
[cols="1,3", options="header"]
|===
|Parameter
|Description

|`delimiter`
|Parameter for grouping keys.
Groups keys containing `delimiter` by prefix, if `prefix` is specified

|`encoding-type`
|Encoding type for object keys in the response

|`key-marker`
|The key from which to start listing objects

|`max-keys`
|Maximum number of items in the response (up to 1000), default — 1000

|`prefix`
|When specified, only keys beginning with the specified prefix will be shown

|`version-id-marker`
|The object version from which to start listing objects. Must be specified together with `key-marker`
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

**Response code**

HTTP: 200 OK.

A successful response contains additional data in XML format:

```xml
<ListVersionsResult>
   <IsTruncated>boolean</IsTruncated>
   <KeyMarker>string</KeyMarker>
   <VersionIdMarker>string</VersionIdMarker>
   <NextKeyMarker>string</NextKeyMarker>
   <NextVersionIdMarker>string</NextVersionIdMarker>
   <Version>
      <ChecksumAlgorithm>string</ChecksumAlgorithm>
      ...
      <ChecksumType>string</ChecksumType>
      <ETag>string</ETag>
      <IsLatest>boolean</IsLatest>
      <Key>string</Key>
      <LastModified>timestamp</LastModified>
      <Owner>
         <DisplayName>string</DisplayName>
         <ID>string</ID>
      </Owner>
      <RestoreStatus>
         <IsRestoreInProgress>boolean</IsRestoreInProgress>
         <RestoreExpiryDate>timestamp</RestoreExpiryDate>
      </RestoreStatus>
      <Size>long</Size>
      <StorageClass>string</StorageClass>
      <VersionId>string</VersionId>
   </Version>
   ...
   <DeleteMarker>
      <IsLatest>boolean</IsLatest>
      <Key>string</Key>
      <LastModified>timestamp</LastModified>
      <Owner>
         <DisplayName>string</DisplayName>
         <ID>string</ID>
      </Owner>
      <VersionId>string</VersionId>
   </DeleteMarker>
   ...
   <Name>string</Name>
   <Prefix>string</Prefix>
   <Delimiter>string</Delimiter>
   <MaxKeys>integer</MaxKeys>
   <CommonPrefixes>
      <Prefix>string</Prefix>
   </CommonPrefixes>
   ...
   <EncodingType>string</EncodingType>
</ListVersionsResult>
```

Here:

- `CommonPrefixes` — The part of the key name that is determined when processing the `delimiter` and `prefix` parameters.
- `DeleteMarker` — Object delete marker.
- `Delimiter` — Value of the `delimiter` parameter.
- `EncodingType` — The encoding in which {var(s3)} represents the key in the XML response. Appears if the client passed the `encoding-type` parameter in the request.
- `IsLatest` — Flag indicating the current version of the object.
- `IsTruncated` — Flag indicating whether all keys have been returned. If `IsTruncated` is `true`, then {var(s3)} returned an incomplete list of parts.
- `KeyMarker` — The last key returned in a truncated response.
- `LastModified` — Timestamp of the object's last modification.
- `MaxKeys` — Value of the `max-keys` parameter.
- `NextKeyMarker` — The value to substitute into the `key-marker` parameter to get the next part of the list, if the entire list did not fit in the current response.
- `NextVersionIdMarker` — The value to substitute into the `version-id-marker` parameter to get the next part of the list, if the entire list did not fit in the current response.
- `Prefix` — Value of the `prefix` parameter.
- `Version` — Object version.
- `VersionIdMarker` — Marks the last key version returned in a truncated response.

<!-- 
Type: Array of CommonPrefix data types !!
Type: Array of DeleteMarkerEntry data types !!
-->
