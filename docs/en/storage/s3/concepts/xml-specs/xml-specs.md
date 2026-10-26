# {heading(Data types description)[id=s3-concepts-xml-specs]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(AccessControlPolicy)[id=s3-concepts-xml-specs-access-control-policy]}

{ifdef(s3-pdf)}
The AccessControlPolicy data types are described in {linkto(#tab_access-control-policy)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_access-control-policy]} — AccessControlPolicy)[align=right;position=above;id=tab_access-control-policy;number={const(numb_tab_access-control-policy)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Owner
|Bucket owner
|Owner
| ![](../../assets/no.svg "inline")

|AccessControlList
|Array of Grant
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Bucket)[id=s3-concepts-xml-specs-bucket]}

{ifdef(s3-pdf)}
The Bucket data types are described in {linkto(#tab_bucket)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_bucket]} — Bucket)[align=right;position=above;id=tab_bucket;number={const(numb_tab_bucket)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Name
|Bucket name
|String
| ![](../../assets/no.svg "inline")

|CreationDate
|Creation date. This date may change when changes are made, for example, when the bucket policy is modified
|Timestamp
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CompletedMultipartUpload)[id=s3-concepts-xml-specs-completed-multipart-upload]}

{ifdef(s3-pdf)}
The CompletedMultipartUpload data types are described in {linkto(#tab_completed-multipart-upload)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_completed-multipart-upload]} — CompletedMultipartUpload)[align=right;position=above;id=tab_completed-multipart-upload;number={const(numb_tab_completed-multipart-upload)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Part
|Array of CompletedPart
|Array of CompletedPart
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CompletedPart)[id=s3-concepts-xml-specs-completed-part]}

{ifdef(s3-pdf)}
The CompletedPart data types are described in {linkto(#tab_completed-part)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_completed-part]} — CompletedPart)[align=right;position=above;id=tab_completed-part;number={const(numb_tab_completed-part)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|ETag
|Object tag returned when uploading a part
|String
| ![](../../assets/no.svg "inline")

|PartNumber
|Number of the multipart upload
|Integer
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CompleteMultipartUploadResult)[id=s3-concepts-xml-specs-complete-multipart-upload-result]}

{ifdef(s3-pdf)}
The CompleteMultipartUploadResult data types are described in {linkto(#tab_complete-multipart-upload-result)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_complete-multipart-upload-result]} — CompleteMultipartUploadResult)[align=right;position=above;id=tab_complete-multipart-upload-result;number={const(numb_tab_complete-multipart-upload-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Bucket
|Name of the bucket containing the object being uploaded
|String
| ![](../../assets/no.svg "inline")

|ETag
|Object tag returned when uploading a part
|String
| ![](../../assets/no.svg "inline")

|Key
|Object key
|String
| ![](../../assets/no.svg "inline")

|Location
|URI identifying the object being uploaded
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Contents)[id=s3-concepts-xml-specs-contents]}

{ifdef(s3-pdf)}
The Contents data types are described in {linkto(#tab_contents)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_contents]} — Contents)[align=right;position=above;id=tab_contents;number={const(numb_tab_contents)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Contents
|Data about the object
|Objects
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CopyObjectResult)[id=s3-concepts-xml-specs-copy-object-result]}

{ifdef(s3-pdf)}
The CopyObjectResult data types are described in {linkto(#tab_copy-object-result)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_copy-object-result]} — CopyObjectResult)[align=right;position=above;id=tab_copy-object-result;number={const(numb_tab_copy-object-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|LastModified
|Date the object was last modified
|String
| ![](../../assets/no.svg "inline")

|ETag
|Returns the ETag of the new object. The ETag reflects only changes to the object's content, not its metadata
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CORSConfiguration)[id=s3-concepts-xml-specs-cors-configuration]}

{ifdef(s3-pdf)}
The CORSConfiguration data types are described in {linkto(#tab_cors-configuration)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_cors-configuration]} — CORSConfiguration)[align=right;position=above;id=tab_cors-configuration;number={const(numb_tab_cors-configuration)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|CORSRule
|A set of origins and access methods to be allowed between
|Array of CORSRule
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CORSRule)[id=s3-concepts-xml-specs-cors-rule]}

{ifdef(s3-pdf)}
The CORSRule data types are described in {linkto(#tab_cors-rule)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_cors-rule]} — CORSRule)[align=right;position=above;id=tab_cors-rule;number={const(numb_tab_cors-rule)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|AllowedHeaders
|Headers specified in the `Access-Control-Request-Headers` header. These headers are allowed in the `OPTIONS` preflight request. In response to any `OPTIONS` preflight request, {var(s3)} returns all requested allowed headers
|Array of strings
| ![](../../assets/no.svg "inline")

|AllowedMethods
|HTTP method that the origin is allowed to perform. Valid values: `GET`, `PUT`, `HEAD`, `POST`, and `DELETE`
|Array of strings
| ![](../../assets/no.svg "inline")

|AllowedOrigins
|One or more origins from which you want to allow clients to access the bucket
|Array of strings
| ![](../../assets/no.svg "inline")

|ExposeHeaders
|One or more headers in the response that you want to allow clients to access from their applications (for example, from a JavaScript XMLHttpRequest object)
|Array of strings
| ![](../../assets/no.svg "inline")

|ID
|Unique rule identifier
|Array of strings
| ![](../../assets/no.svg "inline")

|MaxAgeSeconds
|Time in seconds during which your browser should cache the preflight response for the specified resource
|Integer
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CreateBucketConfiguration)[id=s3-concepts-xml-specs-create-bucket-configuration]}

{ifdef(s3-pdf)}
The CreateBucketConfiguration data types are described in {linkto(#tab_create-bucket-configuration)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_create-bucket-configuration]} — CreateBucketConfiguration)[align=right;position=above;id=tab_create-bucket-configuration;number={const(numb_tab_create-bucket-configuration)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|LocationConstraint
|Region where the bucket is created. If no region is specified, the bucket is created in the default region
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CreatePrefixKeyResult)[id=s3-concepts-xml-specs-create-prefix-key-result]}

{ifdef(s3-pdf)}
The CreatePrefixKeyResult data types are described in {linkto(#tab_create-prefix-key-result)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_create-prefix-key-result]} — CreatePrefixKeyResult)[align=right;position=above;id=tab_create-prefix-key-result;number={const(numb_tab_create-prefix-key-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|BucketName
|Bucket name
|String
| ![](../../assets/no.svg "inline")

|Prefix
|Path prefix that will be accessible with these keys
|String
| ![](../../assets/no.svg "inline")

|UserName
|User who owns the keys
|String
| ![](../../assets/no.svg "inline")

|SecretKey
|Secret key, returned only upon creation; the key cannot be retrieved later
|String
| ![](../../assets/no.svg "inline")

|AccessKey
|Public key
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Delete)[id=s3-concepts-xml-specs-delete]}

{ifdef(s3-pdf)}
The Delete data types are described in {linkto(#tab_delete)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_delete]} — Delete)[align=right;position=above;id=tab_delete;number={const(numb_tab_delete)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Objects
|Objects to delete
|Array of ObjectIdentifier
| ![](../../assets/check.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(DeletedObject)[id=s3-concepts-xml-specs-deleted-object]}

{ifdef(s3-pdf)}
The DeletedObject data types are described in {linkto(#tab_deleted-object)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_deleted-object]} — DeletedObject)[align=right;position=above;id=tab_deleted-object;number={const(numb_tab_deleted-object)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Key
|Key of the deleted object
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(DeletePrefixKeyResult)[id=s3-concepts-xml-specs-delete-prefix-key-result]}

{ifdef(s3-pdf)}
The DeletePrefixKeyResult data types are described in {linkto(#tab_delete-prefix-key-result)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_delete-prefix-key-result]} — DeletePrefixKeyResult)[align=right;position=above;id=tab_delete-prefix-key-result;number={const(numb_tab_delete-prefix-key-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Prefix
|Path prefix that will be accessible with these keys
|String
| ![](../../assets/no.svg "inline")

|UserName
|User who owns the keys
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(DeleteResult)[id=s3-concepts-xml-specs-delete-result]}

{ifdef(s3-pdf)}
The DeleteResult data types are described in {linkto(#tab_delete-result)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_delete-result]} — DeleteResult)[align=right;position=above;id=tab_delete-result;number={const(numb_tab_delete-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Deleted
|Container for successfully deleted objects
|Array of DeletedObject
| ![](../../assets/check.svg "inline")

|Error
|Container describing the object that failed to be deleted
|Array of Error
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Error)[id=s3-concepts-xml-specs-error]}

{ifdef(s3-pdf)}
The Error data types are described in {linkto(#tab_error)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_error]} — Error)[align=right;position=above;id=tab_error;number={const(numb_tab_error)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Code
|Error code
|String
| ![](../../assets/no.svg "inline")

|Key
|Object key
|String
| ![](../../assets/no.svg "inline")

|Message
|Error message
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Grant)[id=s3-concepts-xml-specs-grant]}

{ifdef(s3-pdf)}
The Grant data types are described in {linkto(#tab_grant)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_grant]} — Grant)[align=right;position=above;id=tab_grant;number={const(numb_tab_grant)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Grantee
|Person granted the permissions
|Grantee
| ![](../../assets/no.svg "inline")

|Permission
|Type of permission granted to the person
|One of the values: 

- `FULL_CONTROL`
- `WRITE`
- `WRITE_ACP`
- `READ`
- `READ_ACP`
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Grantee)[id=s3-concepts-xml-specs-grantee]}

{ifdef(s3-pdf)}
The Grantee data types are described in {linkto(#tab_grantee)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_grantee]} — Grantee)[align=right;position=above;id=tab_grantee;number={const(numb_tab_grantee)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|ID
|ID of the person granted the permissions
|String
| ![](../../assets/no.svg "inline")

|DisplayName
|Display name of the person granted the permissions
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(InitiateMultipartUploadResult)[id=s3-concepts-xml-specs-initiate-multipart-upload-result]}

{ifdef(s3-pdf)}
The InitiateMultipartUploadResult data types are described in {linkto(#tab_initiate-multipart-upload-result)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_initiate-multipart-upload-result]} — InitiateMultipartUploadResult)[align=right;position=above;id=tab_initiate-multipart-upload-result;number={const(numb_tab_initiate-multipart-upload-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Bucket
|Name of the bucket in which the multipart upload was initiated
|String
| ![](../../assets/check.svg "inline")

|Key
|Key of the object for which the multipart upload was initiated
|String
| ![](../../assets/check.svg "inline")

|UploadId
|ID of the initiated multipart upload
|String
| ![](../../assets/check.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(LifecycleConfiguration)[id=s3-concepts-xml-specs-lifecycle-configuration]}

{ifdef(s3-pdf)}
The LifecycleConfiguration data types are described in {linkto(#tab_lifecycle-configuration)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_lifecycle-configuration]} — LifecycleConfiguration)[align=right;position=above;id=tab_lifecycle-configuration;number={const(numb_tab_lifecycle-configuration)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Rule
|Description of the filter rules
|Array of {linkto(#s3-concepts-xml-specs-lifecyclerule-api)[text=%text]}
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(LifecycleExpiration)[id=s3-concepts-xml-specs-lifecycle-api]}

{ifdef(s3-pdf)}
The LifecycleExpiration data types are described in {linkto(#tab_lifecycle_api)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_lifecycle_api]} — LifecycleExpiration)[align=right;position=above;id=tab_lifecycle_api;number={const(numb_tab_lifecycle_api)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Date
|Date on which the object must be deleted
|Timestamp
| ![](../../assets/no.svg "inline")

|Days
|Object lifetime in days
|Integer
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(AbortIncompleteMultipartUpload)[id=s3-concepts-xml-specs-abort-incomplete-multipart-upload-api]}

{ifdef(s3-pdf)}
The AbortIncompleteMultipartUpload data types are described in {linkto(#tab_abort_incomplete_multipart_upload_api)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_abort_incomplete_multipart_upload_api]} — AbortIncompleteMultipartUpload)[align=right;position=above;id=tab_abort_incomplete_multipart_upload_api;number={const(numb_tab_abort_incomplete_multipart_upload_api)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|DaysAfterInitiation
|Number of days after the multipart upload is initiated, after which the incomplete multipart upload is aborted and all uploaded parts are deleted
|Integer
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(LifecycleRule)[id=s3-concepts-xml-specs-lifecyclerule-api]}

{ifdef(s3-pdf)}
The LifecycleRule data types are described in {linkto(#tab_lifecyclerule_api)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_lifecyclerule_api]} — LifecycleRule)[align=right;position=above;id=tab_lifecyclerule_api;number={const(numb_tab_lifecyclerule_api)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|ID
|Unique rule identifier
|String
| ![](../../assets/no.svg "inline")

|Status
|Rule status:

- `Enabled` — currently applied;
- `Disabled` — currently not applied
|String
| ![](../../assets/no.svg "inline")

|Filter
|Container for the lifecycle rule filter
|{linkto(#s3-concepts-xml-specs-lifecyclerulefilter-api)[text=%text]}
| ![](../../assets/no.svg "inline")

|Expiration
|Specifies the object lifetime
|{linkto(#s3-concepts-xml-specs-lifecycle-api)[text=%text]}
| ![](../../assets/no.svg "inline")

|AbortIncompleteMultipartUpload
|Specifies the number of days from the start of an incomplete multipart upload, after which {var(s3)} permanently deletes all upload parts
|{linkto(#s3-concepts-xml-specs-abort-incomplete-multipart-upload-api)[text=%text]}
| ![](../../assets/no.svg "inline")

|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

<!--- //|Transition -->
<!--- //|Specifies when the object transitions to the specified storage class -->
<!--- //|Array of xml_Transition -->
<!--- // ![](../../assets/no.svg "inline") -->

## {heading(LifecycleRuleFilter)[id=s3-concepts-xml-specs-lifecyclerulefilter-api]}

{ifdef(s3-pdf)}
The LifecycleRuleFilter data types are described in {linkto(#tab_lifecyclerulefilter_api)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_lifecyclerulefilter_api]} — LifecycleRuleFilter)[align=right;position=above;id=tab_lifecyclerulefilter_api;number={const(numb_tab_lifecyclerulefilter_api)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Prefix
|Prefix identifying one or more objects to which the lifecycle rule applies
|String
| ![](../../assets/no.svg "inline")

|Tag
|Object tag. A key-value pair for logically marking objects
|Array of {linkto(#s3-concepts-xml-specs-xml-tag)[text=%text]}
| ![](../../assets/no.svg "inline")

|And
|Logical AND operator. Used to combine filtering by prefix and by tags in a single rule
|Prefix

Array of {linkto(#s3-concepts-xml-specs-xml-tag)[text=%text]}

| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(ListAllMyBucketsResult)[id=s3-concepts-xml-specs-list-all-my-buckets-result]}

{ifdef(s3-pdf)}
The ListAllMyBucketsResult data types are described in {linkto(#tab_list-all-my-buckets-result)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_list-all-my-buckets-result]} — ListAllMyBucketsResult)[align=right;position=above;id=tab_list-all-my-buckets-result;number={const(numb_tab_list-all-my-buckets-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Owner
|Owner information
|Owner
| ![](../../assets/no.svg "inline")

|Buckets
|List of buckets
|Array of Bucket
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(ListBucketResult)[id=s3-concepts-xml-specs-list-bucket-result]}

{ifdef(s3-pdf)}
The ListBucketResult data types are described in {linkto(#tab_list-bucket-result)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_list-bucket-result]} — ListBucketResult)[align=right;position=above;id=tab_list-bucket-result;number={const(numb_tab_list-bucket-result)}]}
{/ifdef}
[cols="2,6,4,2",options="header"]
|===
|Name
|Description
|Type
|Required

|IsTruncated
|Indicates whether (true) or not (false) all results were returned. Not all results may be returned if the number of results exceeds the specified `MaxKeys`
|Boolean
| ![](../../assets/no.svg "inline")

|MaxKeys
|Maximum number of objects returned in the object body
|String
| ![](../../assets/no.svg "inline")

|Name
|Bucket name
|String
| ![](../../assets/no.svg "inline")

|Prefix
|Keys beginning with the specified prefix
|String
| ![](../../assets/no.svg "inline")

|Contents
|Metadata for each returned object
|Array of Contents
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

<!--- //|CommonPrefixes -->
<!--- //|-->
<!--- //|String -->
<!--- //|-->
<!--- // -->
<!--- //|Delimiter -->
<!--- //|-->
<!--- //|String -->
<!--- //|-->
<!--- //|Marker -->
<!--- //|Specifies the bucket segment from which to start listing. -->
<!--- //|String -->
<!--- //| ![](../../assets/no.svg "inline") -->

## {heading(ListPartsResult)[id=s3-concepts-xml-specs-list-parts-result]}

{ifdef(s3-pdf)}
The ListPartsResult data types are described in {linkto(#tab_list-parts-result)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_list-parts-result]} — ListPartsResult)[align=right;position=above;id=tab_list-parts-result;number={const(numb_tab_list-parts-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Bucket
|Name of the bucket in which the multipart upload was initiated
|String
| ![](../../assets/no.svg "inline")

|IsTruncated
|Truncation indicator of the list of returned parts
|Boolean
| ![](../../assets/no.svg "inline")

|Key
|Object key
|String
| ![](../../assets/no.svg "inline")

|MaxParts
|Maximum number of parts allowed in the response
|Integer
| ![](../../assets/no.svg "inline")

|NextPartNumberMarker
|Marker of the last multipart upload part in the response for the truncated list of returned parts
|Integer
| ![](../../assets/no.svg "inline")

|Owner
|Object owner
|Owner
| ![](../../assets/no.svg "inline")

|Part
|Array of multipart upload parts
|Array of Part
| ![](../../assets/no.svg "inline")

|PartNumberMarker
|Marker of the last multipart upload part in the response for the truncated list of returned parts
|Integer
| ![](../../assets/no.svg "inline")

|StorageClass
|Storage class, filled with the STANDARD value
|String
| ![](../../assets/no.svg "inline")

|UploadId
|Upload ID identifying the multipart upload whose parts are listed
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

<!--- //|Initiator -->
<!--- //|Party who initiated the multipart upload -->
<!--- //|Initiator -->
<!--- //|-->

## {heading(ListPrefixKeysResult)[id=s3-concepts-xml-specs-list-prefix-keys-result]}

{ifdef(s3-pdf)}
The ListPrefixKeysResult data types are described in {linkto(#tab_list-prefix-keys-result)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_list-prefix-keys-result]} — ListPrefixKeysResult)[align=right;position=above;id=tab_list-prefix-keys-result;number={const(numb_tab_list-prefix-keys-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|BucketName
|Bucket name
|String
| ![](../../assets/no.svg "inline")

|IsTruncated
|Indicates whether (true) or not (false) all results were returned
|Boolean
| ![](../../assets/no.svg "inline")

|Marker
|User name or part of the user name from which the listing will start
|String
| ![](../../assets/no.svg "inline")

|NamePrefix
|Prefix by user names
|String
| ![](../../assets/no.svg "inline")

|MaxKeys
|Maximum number of items in the listing
|String
| ![](../../assets/no.svg "inline")

|Contents
|Block containing the user
|Array of Contents
| ![](../../assets/no.svg "inline")

|UserName
|User who owns the keys
|String
| ![](../../assets/no.svg "inline")

|Prefix
|Prefix under which data is available for this user
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Object)[id=s3-concepts-xml-specs-object]}

{ifdef(s3-pdf)}
The Object data types are described in {linkto(#tab_object)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_object]} — Object)[align=right;position=above;id=tab_object;number={const(numb_tab_object)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|ETag
|Object hash. ETag reflects only changes to the object content, but not its metadata
|String
| ![](../../assets/no.svg "inline")

|Key
|Object name. Used as the key for retrieving the object
|String
| ![](../../assets/no.svg "inline")

|LastModified
|Object creation date
|Timestamp
| ![](../../assets/no.svg "inline")

|Owner
|Object owner
|Owner
| ![](../../assets/no.svg "inline")

|Size
|Object size in bytes
|Integer
| ![](../../assets/no.svg "inline")

|StorageClass
|Storage class used to store the object. In the current implementation, it takes the value `STANDARD`
|String
| ![](../../assets/no.svg "inline")

|VersionId
|Object version ID
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(ObjectIdentifier)[id=s3-concepts-xml-specs-object-identifier]}

{ifdef(s3-pdf)}
The ObjectIdentifier data types are described in {linkto(#tab_object-identifier)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_object-identifier]} — ObjectIdentifier)[align=right;position=above;id=tab_object-identifier;number={const(numb_tab_object-identifier)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Key
|Object key
|String
| ![](../../assets/check.svg "inline")
|===
{/caption}

<!--- //|VersionId -->
<!--- //|Object ID -->
<!--- //|String -->
<!--- //| ![](../../assets/no.svg "inline") -->

## {heading(Owner)[id=s3-concepts-xml-specs-owner]}

{ifdef(s3-pdf)}
The Owner data types are described in {linkto(#tab_owner)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_owner]} — Owner)[align=right;position=above;id=tab_owner;number={const(numb_tab_owner)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|DisplayName
|Owner display name
|String
| ![](../../assets/no.svg "inline")

|ID
|Owner ID
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Part)[id=s3-concepts-xml-specs-part]}

{ifdef(s3-pdf)}
The Part data types are described in {linkto(#tab_part)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_part]} — Part)[align=right;position=above;id=tab_part;number={const(numb_tab_part)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|ETag
|Object tag returned when uploading an object part
|String
| ![](../../assets/no.svg "inline")

|LastModified
|Date and time of the object part upload
|Timestamp
| ![](../../assets/no.svg "inline")

|PartNumber
|Multipart upload number
|Integer
| ![](../../assets/no.svg "inline")

|Size
|Size of the uploaded multipart upload part
|Integer
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Tag)[id=s3-concepts-xml-specs-xml-tag]}

{ifdef(s3-pdf)}
The Tag data types are described in {linkto(#tab_xml_tag)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_xml_tag]} — Tag)[align=right;position=above;id=tab_xml_tag;number={const(numb_tab_xml_tag)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Name
|Description
|Type
|Required

|Key
|Tag key. Length — up to 128 characters
|String
| ![](../../assets/no.svg "inline")

|Value
|Tag value. Length — up to 256 characters
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

<!--- // [[xml_Transition]] -->
<!--- // == Transition -->
<!--- // [cols="2,4,1,1"] -->
<!--- // |=== -->
<!--- // |Name |Description |Type |Required -->
<!--- // |Date -->
<!--- // |Specifies when objects are transitioned to the specified storage class -->
<!--- // |Timestamp -->
<!--- // | ![](../../assets/no.svg "inline") -->
<!--- // |Days -->
<!--- // |Specifies the number of days after creation when objects are transitioned to the specified storage class -->
<!--- // |Integer -->
<!--- // | ![](../../assets/no.svg "inline") -->
<!--- // |StorageClass -->
<!--- // |Storage class identifier -->
<!--- // |String -->
<!--- // | ![](../../assets/no.svg "inline") -->
<!--- // |=== -->