# {heading(Accounts and access keys)[id=s3-concepts-account-and-keys]}

{include(/en/_includes/_translated_by_ai_en.md)}

{var(s3)} uses two types of keys independent of each other to access buckets and objects:

- {linkto(#s3-concepts-account-and-keys-access-keys)[text=Access keys tied to the {ifdef(public)}{var(s3)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} account]}. They provide access to all account buckets.
- {linkto(#s3-concepts-account-and-keys-bucket-access-keys)[text=Access keys tied to a bucket]}. They provide access to one bucket or a subset of objects in that bucket.

## {heading({ifdef(public)}{var(s3)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} account and its access keys)[id=s3-concepts-account-and-keys-access-keys]}

In the {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} management console, access keys are not used to work with the {var(s3)} service. However, if you want to work with buckets and objects via {linkto(../../../connect/s3-cli#s3-connect-cli)[text=CLI]}, {linkto(../../../api#s3-api)[text=API]} or {linkto(../../../connect/s3-file-managers#s3-connect-file-managers)[text=file managers]}, you need to {linkto(../../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=create]} a {var(s3)} account and access keys tied to it in the project.

You can create multiple {var(s3)} accounts. Their number in a single project is limited by {linkto(../../../concepts/about#s3-concepts-about-limits)[text=limits]}. An access key is created automatically along with the account. An account access key is a pair consisting of a public key identifier (Access Key ID) and a secret key (Secret Key). The secret key is available only when the pair is created; it cannot be recovered later, but you can {linkto(../../../instructions/access-management/access-keys#s3-instructions-access-keys-existing-account-access-key)[text=create]} a new access key. Up to two keys can be tied to one account.

Managing {var(s3)} accounts and their tied keys is available only in the {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} management console.

## {heading(Bucket access keys)[id=s3-concepts-account-and-keys-bucket-access-keys]}

Bucket access keys are tied to a specific bucket, not to an account. They grant the user the right to work with objects only in that bucket or in one of its directories, but do not provide access to other buckets and objects in the project.

A bucket access key is a pair consisting of a public key identifier (Access Key ID) and a secret key (Secret Key). The secret key is available only when the pair is created; it cannot be recovered later, but you can {linkto(../../../instructions/access-management/bucket-keys#s3-instructions-bucket-keys-add)[text=create]} a new access key.

When adding an access key to a bucket, you can specify {linkto(../../../concepts/about#s3-concepts-about-object-key)[text=a prefix to the object name]} as a parameter, which {var(s3)} interprets as a directory name in the bucket. Such a key is called a prefix access key. A prefix key provides access only to objects in the bucket directory specified by the prefix. A key created without a prefix provides access to all objects in the bucket.

Like keys tied to an account, bucket access keys allow working with objects in the bucket via CLI, API or file managers. You can manage bucket access keys {linkto(../../../instructions/access-management/bucket-keys#s3-instructions-bucket-keys)[text=via the management console]}{ifdef(s3,s3-pdf)} IAM Only{/ifdef} or {ifdef(public)}{linkto(../../../api/pak#s3-api-pak)[text=using the API]}{/ifdef}{ifdef(s3,s3-pdf)}using the API{/ifdef}.