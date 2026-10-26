# {heading(Frequently asked questions)[id=s3-faq]}

{include(/en/_includes/_translated_by_ai_en.md)}

{cut(What is the request limit in {var(s3)}?)}
The limit on the number of requests to a bucket:

- Regular requests — no more than 1000 requests per second.
- Listing requests — no more than 250 requests per second.

The request limit is set separately for each bucket. If the number of requests exceeds the limit, the service will return the HTTP response code `503`.

For more information about {linkto(../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-s3)[text={var(s3)} service limits]}.
{/cut}

{cut(How do I view the total size of an {var(s3)} bucket?)}
You can view the total bucket size using AWS CLI:

1. Install and configure {linkto(../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} if it is not installed yet.
1. Run the following command in the console:

   ```console
   aws s3 ls s3://<BUCKET_NAME> --summarize --human-readable --recursive --endpoint-url <ENDPOINT_URL>
   ```
   Where:

   - `<BUCKET_NAME>` — the name of the bucket whose total size you need to view.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name that was specified when installing the service.
     {/ifdef}

   The total bucket size will be shown in the command response in the `Total Size` field.
{/cut}

{cut(Can deleted objects and buckets be restored?)}
Objects and buckets are deleted permanently. They cannot be restored, even via technical support.

To protect objects from deletion, use {linkto(../concepts/versioning#s3-concepts-versioning)[text=versioning]} and {linkto(../concepts/objects-lock#s3-concepts-object-lock)[text=object locking]}. 
{/cut}

{cut(Is object versioning supported?)}
Yes, it is supported. {linkto(../concepts/versioning#s3-concepts-versioning)[text=Learn more about object versioning in {var(s3)} buckets]}.
{/cut}

{cut(Can access to a bucket be restricted?)}
Yes, it can. To grant access only to the contents of a specific directory in a bucket, use {linkto(../../../tools-for-using-services/api/api-spec/s3-rest-api/pak-api#api-spec-s3-pak)[text=prefix keys]}. 

To manage the operations available to a user, use {linkto(../concepts/access/s3-acl#s3-concepts-acl)[text=ACL (Access Control List)]}.

Access to a bucket cannot be restricted by IP address.
{/cut}

{cut(Can I back up bucket objects?)}
Yes, you can. To back up bucket objects, create another bucket and copy all objects from the source bucket into it, for example, using {linkto(../instructions/objects/manage-object#s3-instructions-manage-object-copy)[text=AWS CLI]} or a {linkto(../connect/s3-file-managers#s3-connect-file-managers)[text=file manager]}.

Data backup is performed using {var(s3)} features and is not provided as a separate service.
{/cut}

{cut(How do I install an SSL certificate on a bucket?)}
To install an SSL certificate, contact [technical support](/en/contacts):

- To install a [Let’s Encrypt](https://letsencrypt.org/ru) certificate, specify the bucket name or ID and the domain it is bound to in your request. 
- To install your own SSL certificate, specify the bucket name or ID, the domain it is bound to, and attach an archive with the certificate and private key to your request. The domain name to which the bucket is bound must be in RFC 1123 format.

  {linkto(../instructions/buckets/manage-bucket#s3-instructions-manage-bucket)[text=How to view bucket information]}.

{/cut}

{cut(Can SSL certificates be issued for multiple domain names bound to a bucket?)}

Yes, a separate certificate is issued for each domain.
{/cut}

{cut(What data can be stored in object storage?)}
Object storage can hold data in any format, for example, media files, backups, BigData datasets, logs.
{/cut}

{cut(What file managers can be used to manage object storage?)}
Supported file managers:

- {linkto(../connect/s3-file-managers#s3-connect-file-managers-cyberduck)[text=CyberDuck]},
- {linkto(../connect/s3-file-managers#s3-connect-file-managers-winscp)[text=WinSCP]},
- {linkto(../connect/s3-file-managers#s3-connect-file-managers-disk-o)[text=Disk-O:]},
- {linkto(../connect/s3-file-managers#s3-connect-file-managers-s3fs)[text=s3fs]}.
{/cut}

{cut(What does the cost of object storage depend on?)}
The cost of object storage is affected by:

- the amount of outgoing traffic;
- the amount of data in storage.

Incoming traffic and empty buckets are not billed. Payment is calculated per second and charged for each current billing period.

To optimize costs, choose the most suitable {linkto(../concepts/about#s3-concepts-about-storage-class)[text=storage class]}. If bucket objects need frequent access, use the `Hotbox` storage class. If you need to store a large amount of data with rare access to it, use the `Icebox` storage class. Current prices are listed in the [price list](https://cloud.vk.ru/pricelist).
{/cut}

{cut(How many buckets can be created in one project?)}
No more than 100 buckets can be created in one project.

For more information about {linkto(../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-s3)[text={var(s3)} service limits]}.
{/cut}

{cut(How many objects can a bucket contain?)}
There is no limit on the number of objects in a bucket.

For more information about {linkto(../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-s3)[text={var(s3)} service limits]}.

{/cut}

{cut(How many objects from a bucket can be requested in a single request to {var(s3)}?)}

1000 objects.

For more information about {linkto(../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-s3)[text={var(s3)} service limits]}.

{/cut}

{cut(Are there any restrictions on the number of threads during multipart object upload?)}

With {linkto(../concepts/features#s3-concepts-features-object-uploading)[text=multipart object upload]}, there are no such restrictions, but it is not recommended to split an object into parts of the maximum size (32 GB). Split objects into parts of 20–200 MB.

{/cut}

{cut(How many accounts can be created in {var(s3)}?)}
No more than 25 accounts can be created in one project.

For more information about {linkto(../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-s3)[text={var(s3)} service limits]}.
{/cut}

{cut(What storage types are available?)}
Three storage classes are supported: `Hotbox`, `Icebox` and `BackupBucket`.

For more information about {linkto(../concepts/about#s3-concepts-about-storage-class)[text=bucket storage classes]}.
{/cut}

{cut(Can objects larger than 2 TB be uploaded?)}
Yes, but only using {linkto(../instructions/objects/upload-object#s3-instructions-upload-object-multipart)[text=multipart upload]}. For objects larger than 32 GB, other upload methods to a bucket are not available.
{/cut}

{cut(Is there a correlation between the number of objects in a bucket and the speed of uploading new objects to it?)}
There is no such correlation. The upload speed depends only on the provider's bandwidth.
{/cut}

{cut(What is the object upload speed to a bucket in {var(s3)}?)}

The object upload speed to a bucket depends on the provider's bandwidth. In general, you can use the following values per thread as a guideline:

- about 100 Mbit/s for a 1 GB object;
- 80–100 Mbit/s for a set of 3 MB objects.

{/cut}

{cut(Can I get an activity log?)}
Yes, you can. To get an activity log for troubleshooting or verifying charges, contact [technical support](/en/contacts).
{/cut}

{cut(Does an object inherit access rights from the bucket?)}

No, the {var(s3)} service does not inherit access rights from a bucket to an object.

For more information about {linkto(../concepts/access/s3-acl#s3-concepts-acl)[text=assigning access rights to an object]}.

{/cut}

{cut(How do I change the access level for all objects in a bucket?)}
To {linkto(../instructions/objects/manage-object#s3-instructions-manage-object-access)[text=change]} the access level for all objects in a bucket or its directory:

- In the {var(cloud)} management console: select all objects or directories using checkboxes.
- Using AWS CLI: use the `--recursive` parameter.

{/cut}

{cut(How do I protect data in a bucket from modification during backup?)}

Use the {linkto(../instructions/objects/object-lock#s3-instructions-object-lock)[text=object deletion lock]} mechanism. Grant the service account used for backup {linkto(../instructions/access-management/acl#s3-instructions-acl)[text=rights]} to write data only.
{/cut}

{cut(What does the upload speed to {var(s3)} object storage depend on?)}

The speed depends on your channel bandwidth and the upload method. To speed up uploading large files or many small files, use {linkto(../instructions/objects/upload-object#s3-instructions-upload-object-multipart)[text=multipart upload]}.

{/cut}

{cut(How can I download {var(s3)} objects without logging into the management console?)}

- Use S3 clients. Examples: AWS CLI, Cyberduck, S3 Browser and others.
- {linkto(../instructions/access-management/signed-url#s3-instructions-signed-url)[text=Generate]} a Pre-signed URL for an object. This is a temporary link that allows access to an object in {var(s3)} without authentication.
- {linkto(../instructions/manage-static-site#s3-instructions-manage-static-site)[text=Set up]} static hosting. This makes objects in the bucket accessible via HTTP(S), as if they were part of a website.

{/cut}

{cut(What is the maximum size of object metadata?)}
The maximum size of {linkto(../concepts/about#s3-concepts-about-object-key-rules)[text=object metadata]} is 2048 bytes. For more information about metadata and working with it, see the [official Amazon S3 documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingMetadata.html).
{/cut}

{cut(I have set object lifecycle rules in a bucket. How often will cleanup occur?)}

{linkto(../concepts/lifecycle#s3-concepts-lifecycle)[text=Lifecycle]} rules are applied daily. A lifecycle rule is set for an object:

- when it is added to a bucket that already has a lifecycle rule specified;
- when lifecycle rules are added for the bucket where the object is located.

Objects are deleted in the background: they become unavailable once the specified time is reached and are deleted on a first-come, first-served basis. 

If an object has a number of days after upload specified instead of a deletion time, for example, 7 days, the object will become unavailable after 7 full days (168 hours) from the moment the rule is applied and will be deleted within the next 24 hours. If the queue for lifecycle operations is large, deletion may take longer.

{/cut}

{cut(What is the lifetime of {var(s3)} account access keys?)}

The lifetime of an access key is unlimited. The key remains valid until you {linkto(../instructions/access-management/access-keys#s3-instructions-access-keys-deactivate-access-key)[text=deactivate]} or {linkto(../instructions/access-management/access-keys#s3-instructions-access-keys-delete-access-key)[text=delete]} it manually. For security purposes, it is recommended to rotate keys periodically.

{/cut}

{cut(Can I view a cost breakdown for individual buckets?)}

No, a cost breakdown for individual buckets is not available. The **Balance and payments** section displays the total cost of using the {var(s3)} service.

{/cut}