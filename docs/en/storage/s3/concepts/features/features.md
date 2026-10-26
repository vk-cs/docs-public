# {heading(Object and bucket management capabilities)[id=s3-concepts-features]}

{include(/en/_includes/_translated_by_ai_en.md)}

The {var(s3)} service supports the following capabilities for working with buckets and objects:

<!-- fix links: for version management after release 2341, for access management after release 1865 -->
- {linkto(#s3-concepts-features-object-uploading)[text=standard and multipart upload]} of objects to a bucket;
- configuring {linkto(../../concepts/lifecycle#s3-concepts-lifecycle)[text=automatic deletion]} of objects (lifecycle);
- {linkto(#s3-concepts-features-objects-copying)[text=copying objects]};
- {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=object deletion lock]} (object lock);
- {linkto(#s3-concepts-features-webhooks)[text=notifications]} about bucket events;
- a set of tools for {linkto(../../concepts/access#s3-concepts-access)[text=access management]} for buckets and objects;
- an {linkto(#s3-concepts-features-s3-api)[text=API]} for programmatically managing buckets and objects using standard HTTP requests.

## {heading(Standard and multipart object upload)[id=s3-concepts-features-object-uploading]}

Files of any type can be uploaded to a {linkto(../../concepts/about#s3-concepts-about-bucket)[text=bucket]}, for example, images, backups, videos. After upload, the file is stored as a {var(s3)} {linkto(../../concepts/about#s3-concepts-about-object)[text=object]}.

Depending on the file size, different upload methods are recommended:

- Up to 1 GB — {linkto(../../instructions/objects/upload-object#s3-instructions-upload-object-standard)[text=standard upload]} in any convenient way: via the management console{ifdef(s3,s3-pdf)} {linkto(../../instructions/iamo/iamo-auth#s3-instructions-iamo-auth)[text=IAM Only]}{/ifdef}, {linkto(../../connect/s3-file-managers#s3-connect-file-managers)[text=file managers]}, {linkto(../../connect/s3-cli#s3-connect-cli)[text=CLI]}, {linkto(../../connect/s3-sdk#s3-connect-sdk)[text=SDK]}, or {linkto(../../api#s3-api)[text=API]}.
- Over 1 GB — {linkto(../../connect/s3-cli#s3-connect-cli)[text=CLI]}, {linkto(../../connect/s3-sdk#s3-connect-sdk)[text=SDK]}, or {linkto(../../api#s3-api)[text=API]}.
- Over 32 GB — only {linkto(../../instructions/objects/upload-object#s3-instructions-upload-object-multipart)[text=multipart upload]} via {linkto(../../connect/s3-cli#s3-connect-cli)[text=CLI]}, {linkto(../../connect/s3-sdk#s3-connect-sdk)[text=SDK]}, or {linkto(../../api#s3-api)[text=API]}.

With multipart upload, data is divided into several parts that are uploaded independently, one by one, in any order. If the transfer of any part fails, it can be retransmitted without affecting the other parts. Once all parts are uploaded, the storage assembles them together in the specified order and creates the object.

Advantages of multipart upload:

- Parts of a large file can be uploaded in parallel, thereby reducing upload time.
- If some part was not uploaded due to a network error, it is faster to re-upload it than a large file.
- The upload can be paused and resumed later.
- The upload can be started before the final file size is known, i.e. the file can be uploaded as it is being created.

{note:info}
Limits on the size of uploaded files:

- The maximum size of a non-multipart object or a part of a multipart object is 32 GB.
- The maximum size of a multipart object is 320 TB.
- The number of parts in a multipart upload is from 1 to 10000.
{/note}

<!--## {heading(Multipart upload process)[id=s3-concepts-features-multipart-upload-process]}

Multipart upload is a three-step process: you initiate the upload, then upload the parts of the object, and after all parts are uploaded, you complete the multipart upload. Upon receiving the complete multipart upload request, {var(s3)} constructs the object from the uploaded parts, and then you can access the object just like any other object in your bucket.

You can list all the multipart uploads you have in progress or get a list of the parts you have uploaded for a specific multipart upload.

1. Initiating a multipart upload.

   When you send a request to initiate a multipart upload, {var(s3)} returns a response with an upload ID, which is a unique identifier for your multipart upload. This upload ID must be used each time you upload parts of files, list details, complete or abort the upload. If you want to provide any metadata describing the object being uploaded, you must specify it in the request to initiate the multipart upload.

1. Uploading file parts.

   When uploading parts of a file, in addition to the upload ID, you must specify the part number. You can choose any part number from 1 to 10,000. The part number uniquely identifies a part and its position in the object being uploaded. The part number you choose does not have to be sequential (for example, it can be 1, 5, and 14). If you upload a new part of a file using the same part number as a previously uploaded part, the part is overwritten.

   Each time you upload a part, {var(s3)} returns an ETag header in its response. For each file part upload, you must record the part number and the ETag value. You must include these values in the subsequent request to complete the multipart upload.

1. Completing a multipart upload.

   When you complete a multipart upload, {var(s3)} creates the object by concatenating the parts in ascending order based on the file part number. If any object metadata was provided in the multipart upload initiation request, {var(s3)} associates that metadata with the object. After the request is successfully completed, the file parts no longer exist.

   Your complete multipart upload request must include the upload ID and a list of file part numbers with their corresponding ETag values. The {var(s3)} response includes an ETag that uniquely identifies the concatenated object data.

   Optionally, you can abort a multipart upload. After a multipart upload is aborted, you cannot upload any part using that upload ID again. When a multipart upload is aborted, all previously uploaded file parts are deleted. If the upload of any part was in progress, it may still succeed or fail even after you abort the multipart upload. To free up all storage used by all file parts, you must abort the multipart upload only after all parts have been uploaded.-->

## {heading(Copying objects)[id=s3-concepts-features-objects-copying]}

{var(s3)} allows you to create copies of stored objects. Copying is performed {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-copy)[text=using CLI, SDK, file manager]} or {linkto(../../api/object#api-spec-s3-copy-object)[text=API]}.

With copying, you can:

- Create additional copies of objects in the same or a different bucket.
- Rename objects.

  Direct renaming of objects in a bucket is not supported. You can work around this limitation by creating a copy of the object with a new name and then deleting the original object. In {linkto(../../connect/s3-file-managers#s3-connect-file-managers)[text=file managers]}, these actions are performed automatically.

- Change object metadata.

  When an object is uploaded to a bucket, it is assigned metadata in key/value format. The only way to change it after upload is to create a copy of the object with the same name, specifying new metadata in the copy request. This way, you can change user metadata and some system metadata, for example, the {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=storage class]}.

- Copy the tags of the source object or set new tags on the new object.

## {heading(Bucket event notifications)[id=s3-concepts-features-webhooks]}

{var(s3)} allows you to configure sending notifications about bucket events using webhooks. Each webhook specifies the event type and the URL to which a message or HTTP/HTTPS request is sent when an event of the specified type occurs in the bucket. You can create webhooks for the following event types:

- object creation;
- object copying;
- object deletion;
- multipart upload completion.

Using webhooks allows you to:

- inform the user about an event that occurred in the bucket;
- configure file processing and conversion after upload;
- configure interaction with external systems;
- enable logging for object storage.

The webhook configuration for a bucket is created {linkto(../../instructions/buckets/manage-webhook#s3-instructions-manage-webhook)[text=via the management console]}{ifdef(s3,s3-pdf)} IAM Only{/ifdef} or {ifdef(public)}{linkto(../../api/webhook#s3-api-webhooks)[text=using the API]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../api/notification#s3-api-notification)[text=using the API]}{/ifdef}.

## {heading(Tagging objects)[id=s3-concepts-features-tagging]}

Object tagging allows you to logically group objects. Tagging is done with tags (tag).
A tag is a key/value pair.

{note:warn}
Tagging is not supported for buckets.
{/note}

Limits:

- For an object with a tag:

  - An object can have up to 10 tags.
  - Tags associated with objects must have unique keys.

- For a tag key and value:

  - Key length — up to 128 Unicode characters, but no more than 256 bytes.
  - Value length — up to 256 Unicode characters, but no more than 528 bytes.
  - Encoding — UTF-16.
  - The key and value are case-sensitive.
  - Allowed characters — Latin letters, digits, spaces, and the symbols `+`, `-`, `=`, `.`, `_`, `:`, `/`.

<!--- //* Reserved prefix for keys and values is `aws:`, the `user:` prefix is used in billing reports. -->

{note:warn}
It is not recommended to use confidential information in key and tag names.
{/note}

Tags can be added to new objects upon upload or to existing objects.

## {heading(Using the API)[id=s3-concepts-features-s3-api]}

{var(s3)} provides a RESTful XML {linkto(../../api#s3-api)[text=API]} for programmatically managing buckets and objects using standard HTTP requests. The {var(s3)} API is designed to interoperate with the [Amazon Web Service S3 API](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) and has a compatible interface. Access to the {var(s3)} API uses the protocol created for the AWS S3 service.

You can send API requests via {linkto(../../connect/s3-cli#s3-connect-cli)[text=CLI]}, {linkto(../../connect/s3-sdk#s3-connect-sdk)[text=SDK]}, or {linkto(../../connect/s3-file-managers#s3-connect-file-managers)[text=file managers]}.

Some AWS S3 API methods are not implemented in the {var(s3)} service. Requests for such methods return an S3-compatible `NotImplemented` error response in XML format.

{ifdef(s3-pdf)}
The AWS S3 API methods implemented in {var(s3)} are listed in {linkto(#tab_aws_s3_api)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_aws_s3_api]} — AWS S3 API methods)[align=right;position=above;id=tab_aws_s3_api;number={const(numb_tab_aws_s3_api)}]}
{/ifdef}
{ifndef(s3-pdf)}
{cut(AWS S3 API methods implemented in {var(s3)})}
{/ifndef}
[cols="1,2",options="header"]
|===
|Method
|Description

2+|**Bucket**

|`CreateBucket`
|Creates a new bucket

|`DeleteBucket`
|Deletes a bucket

|`HeadBucket`
|Checks whether the bucket exists and whether the user has access permissions to it

|`ListBuckets`
|Returns a list of buckets

|`GetBucketLocation`
|Returns the bucket region

2+|**Object**

|`CopyObject`
|Creates a copy of an existing object (in the same or a different bucket)

|`DeleteObject`
|Deletes an object from a bucket

|`DeleteObjects`
|Deletes multiple objects with a single request

|`GetObject`
|Returns the object content

|`HeadObject`
|Returns the object metadata

|`ListObjects`
|Returns up to 1000 objects. This is a legacy method, supported for compatibility

|`ListObjectsV2`
|Returns up to 1000 objects. The current method

|`PutObject`
|Adds an object to a bucket

|`GetObjectRange`
|Returns only the specified byte range of an object (range request)

|`OptionsObject`
|Processes a CORS preflight request (`OPTIONS` method) to an object. Returns permission headers

2+|**Object lock**

|`GetObjectLegalHold`
|Returns the current state of the indefinite (legal hold) lock for an object

|`GetObjectRetention`
|Returns information about the current temporary lock (retention) of an object

|`PutObjectLegalHold`
|Sets or removes the indefinite (legal hold) lock of an object

|`PutObjectLockConfiguration`
|Creates or modifies the default lock settings in a bucket

|`PutObjectRetention`
|Sets or updates the temporary lock (retention) for an object

2+|**Access management (ACL)**

|`GetObjectACL`
|Returns the object ACL (access control list)

|`PutObjectACL`
|Sets the object ACL

|`GetBucketAcl`
|Returns the bucket ACL

|`PutBucketAcl`
|Sets the bucket ACL

2+|**Object lifecycle**

|`GetBucketLifecycleConfiguration`
|Returns the bucket lifecycle configuration

|`PutBucketLifecycleConfiguration`
|Creates or fully replaces the bucket lifecycle configuration

|`DeleteBucketLifecycle`
|Deletes the bucket lifecycle configuration

2+|**Multipart upload**

|`AbortMultipartUpload`
|Aborts an incomplete multipart upload and releases resources

|`CompleteMultipartUpload`
|Completes a multipart upload by assembling the parts into the final object

|`CreateMultipartUpload`
|Initiates a multipart upload of an object

|`ListMultipartUploads`
|Returns a list of current incomplete multipart uploads in the bucket

|`ListParts`
|Returns a list of uploaded object parts

|`UploadPart`
|Uploads an object part

|`UploadPartCopy`
|Uploads an object part by copying data from an existing object

2+|**Object ownership policies (ownership controls)**

|`PutBucketOwnershipControls`
|Sets or updates the rules that determine the owner of objects uploaded to the bucket

|`DeleteBucketOwnershipControls`
|Deletes the policies for managing object ownership in a bucket

2+|**Object tagging**

|`GetObjectTagging`
|Returns the tags assigned to an object

|`PutObjectTagging`
|Assigns or updates object tags

|`DeleteObjectTagging`
|Deletes object tags

2+|**Cross-domain requests (CORS)**

|`GetBucketCORS`
|Returns the current CORS configuration of the bucket

|`PutBucketCORS`
|Sets or replaces the bucket CORS configuration

|`DeleteBucketCORS`
|Deletes the bucket CORS configuration

2+|**Notifications**

|`GetBucketNotificationConfiguration`
|Returns the current notification configuration for the bucket

|`PutBucketNotificationConfiguration`
|Sets or updates the notification configuration

|`DeleteBucketNotificationConfiguration`
|Deletes the bucket notification configuration
|===
{ifndef(s3-pdf)}
{/cut}
{/ifndef}
{ifdef(s3-pdf)}
{/caption}
{/ifdef}