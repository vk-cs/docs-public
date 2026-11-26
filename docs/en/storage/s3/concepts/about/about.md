# {heading(Introduction)[id=s3-concepts-about]}

{include(/en/_includes/_translated_by_ai_en.md)}

{var(s3)} is a {linkto(../../../../computing/iaas/concepts/data-storage/storage-types#iaas-concepts-storage-types)[text=data storage type]} in VK Cloud built on top of the S3 protocol. It is suitable for storing large amounts of data that is rarely accessed. You can work with {var(s3)} in the VK Cloud [management console](https://msk.cloud.vk.com/app/en), using the AWS CLI, as well as a number of {linkto(#s3-concepts-about-tools)[text=other tools]}.

{var(s3)} is distinguished by:

- low data storage cost compared to other {linkto(../../../../computing/iaas/concepts/data-storage/storage-types#iaas-concepts-storage-types)[text=storage types]} in VK Cloud;
- high scalability and availability;
- easy integration with applications.

Data in {var(s3)} is stored in {linkto(#s3-concepts-about-bucket)[text=buckets]} as independent {linkto(#s3-concepts-about-object)[text=objects]} and their {linkto(#s3-concepts-about-metadata)[text=metadata]}.

## {heading(Bucket)[id=s3-concepts-about-bucket]}

A *bucket* is a container for storing {linkto(#s3-concepts-about-object)[text=objects]}. Any number of objects can be uploaded to a bucket. The total volume of objects in a bucket is also unlimited. The user who created the bucket gets full access rights to the bucket and the objects in it and can share these rights with others.

Each bucket has a name that is used to access the objects inside it. The name must meet certain {linkto(#s3-concepts-about-bucket-naming)[text=requirements]}. After a bucket is created, its name cannot be changed.

You can create {linkto(../../../../tools-for-using-services/account/concepts/quotasandlimits)[text=multiple buckets]} in a project, but you cannot nest one bucket inside another. Inside each bucket, you can build a directory hierarchy. To do this, add {linkto(#s3-concepts-about-object-key)[text=prefixes]} to object names, which {var(s3)} interprets as directory names.

A bucket can be used for static website hosting by {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-domain)[text=attaching a custom domain]} to it, as well as in the {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-cdn)[text=CDN service as an origin]}.

{var(s3)} supports:

- {linkto(../../concepts/lifecycle#s3-concepts-lifecycle)[text=automatic deletion]} of objects from a bucket according to specified rules;
- configuring {linkto(../../concepts/features#s3-concepts-features-webhooks)[text=notifications]} about bucket events;
- {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-sync)[text=synchronization]} of the bucket contents and a local directory;
- cross-domain resource requests in the bucket using the {linkto(../../instructions/access-management/cors)[text=CORS]} technology.

### {heading(Bucket naming rules)[id=s3-concepts-about-bucket-naming]}

The bucket name must:

- be unique across the entire {var(s3)} service.
- contain from 3 to 63 characters.
- start and end with a letter or a digit.
- consist only of lowercase Latin letters, digits, and the following characters: `.`, `-`.

  For better compatibility, it is recommended to avoid using dots (`.`) in bucket names. If you include dots in a bucket name, you will not be able to use virtual-hosted-style addressing over HTTPS unless you perform your own certificate verification. This is because the security certificates used for virtual hosting of buckets do not work for buckets with dots in their names.

  This limitation does not affect buckets used for static website hosting, since static website hosting is available only over HTTP.

The bucket name must not:

- match the names of other buckets of the {var(s3)} service.
- start with the `xn--` prefix.
- start or end with the `-` and `.` characters.
- contain two consecutive dots `..`, a hyphen and a dot `-.`, or a dot and a hyphen `.-`.

  Examples: `my..bucket`, `my-.bucket`, `my.-bucket`.

- have the format of an IP address or one similar to it, for example `192.168.5.4`.

The bucket name is contained in the URLs of the objects located in it, so do not use sensitive information in the name. It will be displayed in the link to the object if you grant public access to it.

{cut(Examples of bucket names that comply with the recommended rules)}

- `docexamplebucket1`
- `log-delivery-march-2020`
- `my-hosted-content`

{/cut}

{cut(Examples of invalid bucket names)}

- `doc_example_bucket` (contains underscores)
- `DocExampleBucket` (contains uppercase letters)
- `doc-example-bucket-` (ends with a hyphen)

{/cut}

## {heading(Object)[id=s3-concepts-about-object]}

An *object* is a file uploaded to the storage together with its {linkto(#s3-concepts-about-metadata)[text=metadata]}. The file can be of any format, for example: a media file, a backup, a BigData data array.

Objects in {var(s3)} are stored in {linkto(#s3-concepts-about-bucket)[text=buckets]}. Depending on the file size, {linkto(../../concepts/features#s3-concepts-features-object-uploading)[text=standard or multipart upload]} of the object to the bucket is used.

When an object is uploaded, the following are assigned to it:

- an {linkto(#s3-concepts-about-object-key)[text=object key]} — a special identifier used to access the object;
- {linkto(#s3-concepts-about-metadata)[text=metadata]} describing the object properties;
- an {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-access)[text=access level]};
- a {linkto(#s3-concepts-about-storage-class)[text=storage class]}.

Along with the operations of uploading, downloading, copying, and deleting objects, {var(s3)} supports:

- {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-access)[text=changing the access level]} for an object;
- granting access to an object via a {linkto(../../instructions/access-management/signed-url)[text=signed URL]};
- temporary and permanent {linkto(../../concepts/objects-lock)[text=locking]} of an object against deletion or overwriting.

## {heading(Object key)[id=s3-concepts-about-object-key]}

An *object key* is a combination of the object name and prefixes to the name. Prefixes are separated from each other and from the object name by the `/` delimiter. Prefixes are optional, but they allow you to organize the object storage structure for more convenient identification.

The {var(s3)} data model is a flat structure: you create a bucket in which objects are stored. There is no hierarchy of nested buckets. However, if the key contains prefixes to the object name, {var(s3)} will use them as directory names in the bucket. For example, for an object with the key `photos/myphoto1.jpg`, the prefix is `photos/`. If a new object with the key `photos/myphoto2.jpg` is uploaded, they will be combined by the common prefix `photos/`. For user convenience, in {linkto(../../connect/s3-file-managers)[text=file managers]} and the VK Cloud management console, the objects `photos/myphoto1.jpg` and `photos/myphoto2.jpg` will be displayed as the files `myphoto1.jpg` and `myphoto2.jpg` in the `photos/` directory.

When choosing the object name and prefixes, it is recommended to follow the rules below.

### {heading(Object key creation recommendations)[id=s3-concepts-about-object-key-rules]}

An object key consists of Unicode characters. The key length in UTF-8 encoding is no more than 1024 bytes.

You can use any Unicode character in an object key. However, some characters can cause problems with a number of applications and web protocols. To avoid problems, follow the recommendations:

- It is recommended to use only Latin letters, digits, and the special characters `/`, `!`, `-`, `_`, `.`, `*`, `'`, `(`, `)` in the object key. The `/` character separates prefixes and the object name from each other.
- The object key must not:

  - end with a slash `/`;
  - contain two consecutive dots: `..`;
  - consist of a single dot: `.`;
  - consist of only a space or contain leading or trailing spaces.

- It is not recommended to use the characters listed below in the object key. Some of them require encoding when used in URLs, and some are non-printable and may not be processed by your browser. To ensure correct addressing of an object with such characters in its key, additional processing of the object key in code is required.

  Undesirable characters:

  - special characters `$`, `&`, `@`, `=`, `;`, `:`, `+`, `\`, `%`, `,`, `?`, `#`;
  - characters with ASCII codes `00h`–`1Fh` (decimal codes `0`–`31`);
  - the `DEL` character with ASCII code `7Fh` (decimal code `127`);
  - a space, since in some cases significant sequences of spaces may be lost, especially when there are multiple spaces;
  - all invisible Unicode characters.

{cut(Examples of object keys that comply with the recommendations)}

- `Development/Projects.xls`
- `Finance/statement1.pdf`
- `Finance/taxdocument.pdf`
- `s3-dg.pdf`

Based on the `Development/` and `Finance/` prefixes, {var(s3)} will create directories in the bucket. Opening the `Development` directory, you will see the `Projects.xls` object in it; in the `Finance` directory you will find the `statement1.pdf` and `taxdocument.pdf` objects. The `s3-dg.pdf` name has no prefix, so this object will be placed at the root level of the bucket.

{/cut}

## {heading(Object metadata)[id=s3-concepts-about-metadata]}

Each {var(s3)} object has *metadata*. These are key/value pairs describing the object properties. There are metadata assigned by the service (for example, the storage class or creation date) and custom metadata. Some service metadata is available to the user for management, in particular the object storage class.

You can set the object metadata during its upload. After the upload, the object metadata cannot be changed directly. The only way to do this is to {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-copy)[text=copy]} the object. When copying, you need to specify the object key as both the source and the target and set new metadata for the copy. This way you can change:

- custom metadata,
- user-managed system metadata, such as the storage class.

Service-managed metadata will be reset. For example, the object creation date will be reset.

## {heading(Limits)[id=s3-concepts-about-limits]}

{include(../../_includes/_s3_limits.md)}

## {heading(Storage tools)[id=s3-concepts-about-tools]}

The following tools are available for working with the {var(s3)} object storage:

- [Management console](https://msk.cloud.vk.com/app/en) of VK Cloud.
- {linkto(../../connect/s3-cli)[text=Command line interfaces]}: AWS CLI, s3cmd CLI.
- {linkto(../../connect/s3-file-managers)[text=File managers]}: CyberDuck, WinSCP, Disk-O:, s3fs.
- {linkto(../../connect/s3-sdk)[text=Developer toolkits]}: SDKs for Java, .NET, JavaScript, Ruby, Python (Boto), PHP, Go, AWS tools for PowerShell, Mobile SDK for iOS and Android.
- {linkto(../../api#s3-api)[text={var(s3)} API]}.

## {heading(Storage classes)[id=s3-concepts-about-storage-class]}

Storage classes differ in the purpose and [storage cost](https://cloud.vk.ru/pricelist) of data and are available for buckets, objects, and multipart uploads. {var(s3)} supports several storage classes:

- `Hotbox` — for storing and quickly serving a large number of files for high-load websites, applications, media services, online media, sites with user-generated content, and mobile applications. In the API it is designated as `STANDARD`.
- `Icebox` — for rarely used data: backups, logs, media content, scientific and statistical data, as well as working archives. In the API it is designated as `STANDARD_IA`.
- `BackupBucket` (for buckets only) — for {linkto(../../../../storage/backups#cloud-backup)[text=instance backups]} created both automatically and manually. Buckets of this class cannot be created or deleted by the user. After the backups are deleted, the BackupBucket bucket may remain empty. The object storage needs it for further work with backup plans in the project. In the API it is designated as `BACKUP`.

## {heading(Storage connection encryption)[id=s3-concepts-about-connect]}

Connection to {var(s3)} is possible both with encryption (TLS 1.2 and TLS 1.3 protocols) and without it.

TLS 1.2 ciphers (`ssl_ciphers`):

- `ECDHE-ECDSA-AES128-GCM-SHA256`,
- `ECDHE-ECDSA-AES256-GCM-SHA384`,
- `ECDHE-RSA-AES128-GCM-SHA256`,
- `ECDHE-RSA-AES256-GCM-SHA384`,
- `ECDHE-ECDSA-CHACHA20-POLY1305`,
- `ECDHE-RSA-CHACHA20-POLY1305`.

TLS 1.3 ciphers (`ssl_conf_command Ciphersuites`):

- `TLS_AES_128_GCM_SHA256`,
- `TLS_AES_256_GCM_SHA384`,
- `TLS_CHACHA20_POLY1305_SHA256`.
