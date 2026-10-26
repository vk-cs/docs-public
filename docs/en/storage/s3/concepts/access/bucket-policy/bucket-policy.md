# {heading(Access policies (bucket policy))[id=s3-concepts-bucket-policy]}

{include(/en/_includes/_translated_by_ai_en.md)}

_An access policy (bucket policy)_ is a way to manage access to the contents and settings of a {linkto(../../about#s3-concepts-about-bucket)[text=bucket]}. Unlike an {linkto(../s3-acl#s3-concepts-acl)[text=access control list (ACL)]}, an access policy provides a more predictable and flexible access model.

The joint use of an access policy and an ACL is governed by the bucket parameter `OwnershipControls`, which has two modes:
- `BucketOwnerEnforced` — only the access policy is used, the ACL is not used (disabled). The recommended way for flexible rights management in one place.
- `BucketOwnerPreferred` — access is first checked by the policy, then the ACL is checked. It can be used, for example, to maintain backward compatibility. Enabled by default.

Using `BucketOwnerPreferred` can cause conflicts between the access policy and the ACL. Where possible, it is recommended to {linkto(../../../instructions/access-management/bucket-policy#s3-instructions-bucket-acl-enable-and-disable)[text=disable]} the ACL in the bucket settings, after which the `OwnershipControls` mode will be changed to `BucketOwnerEnforced`.

Examples of using an access policy:

- managing access to objects within a bucket;
- controlling bucket access for external read or write;
- granting access permissions to individual users or projects;
- restricting access by IP addresses, path prefixes, or other conditions.

## {heading(Configuration)[id=s3-concepts-bucket-policy-config]}

The access policy configuration is specified in JSON format, which contains one or more rules.

Structure of the JSON file:

```json
{
  "Version": "2012-10-17",
  "Id": "",
  "Statement": [
    {
      "Sid": "",
      "Action": [""],
      "Effect": "",
      "Principal": {
        "AWS":[""]
      },
      "Resource": [""],
      "Condition": {
        ...
      }
    },
  ...
  ]
}
```

Here:

- `Id` — a unique identifier (name) of the access policy.
- `Statement` — an array of access policy rules.
- `Sid` — a unique identifier (name) of the rule.
- `Action` — a string or an array of strings with the {linkto(#s3-concepts-bucket-policy-actions)[text=actions]} to which the rule applies.
- `Effect` — {linkto(#s3-concepts-bucket-policy-effect)[text=allow or deny]} for performing the action.
- `Principal` — a string or an array of strings with the {linkto(#s3-concepts-bucket-policy-principal)[text=principals]} (subjects) to which the rule applies.
- `Condition` — defines under which {linkto(#s3-concepts-bucket-policy-conditions)[text=conditions]} the rule is triggered.
- `Resource` — a string or an array of strings in the `arn:aws:s3:::<RESOURCE>` format specifying the {linkto(#s3-concepts-bucket-policy-resources)[text=resource]} for which the rule is set.

Detailed descriptions of the `Action`, `Effect`, `Principal`, `Condition`, and `Resource` parameters are provided below.

## {heading(Actions)[id=s3-concepts-bucket-policy-actions]}

The `Action` parameter defines which actions with buckets and objects will be {linkto(#s3-concepts-bucket-policy-effect)[text=allowed or denied]}.

[cols="1,2"]
|===

|`S3:AbortMultipartUpload`
|Abort a multipart upload and delete already uploaded parts

|`S3:ListMultipartUploadParts`
|Request the parts of a multipart upload

|`S3:ListBucketMultipartUploads`
|Request the list of incomplete multipart uploads in a bucket

|`S3:GetObject`
|Request (download) the contents of an object

|`S3:GetObjectVersion`
|Request (download) the contents of a specific version of an object

|`S3:GetObjectAttributes`
|Request the extended attributes of an object

|`S3:GetObjectVersionAttributes`
|Request the extended attributes of a specific version of an object

|`S3:PutObject`
|Upload or overwrite an object (with versioning enabled, create a new version)

|`S3:DeleteObject`
|Delete an object

|`S3:DeleteObjectVersion`
|Delete a specific version of an object

|`S3:GetObjectAcl`
|Request the ACL of an object

|`S3:GetObjectVersionAcl`
|Request the ACL of a specific version of an object

|`S3:PutObjectAcl`
|Set or overwrite the ACL of an object

|`S3:PutObjectVersionAcl`
|Set or overwrite the ACL of a specific version of an object

|`S3:GetObjectTagging`
|Request the tags of an object

|`S3:PutObjectTagging`
|Set or overwrite the tags of an object

|`S3:DeleteObjectTagging`
|Delete the tags of an object

|`S3:GetObjectLegalHold`
|Check the status of an object's indefinite (legal) hold

|`S3:PutObjectLegalHold`
|Set or remove an object's indefinite (legal) hold

|`S3:GetObjectRetention`
|Get the status of an object's temporary retention

|`S3:PutObjectRetention`
|Set or change an object's temporary retention

|`S3:BypassGovernanceRetention`
|Bypass a temporary retention

|`S3:ListBucket`
|Request the list of objects in a bucket

|`S3:ListBucketVersions`
|Request the list of object versions and delete markers

|`S3:GetBucketAcl`
|Request the ACL of a bucket

|`S3:PutBucketAcl`
|Set or overwrite the ACL of a bucket

|`S3:GetBucketPolicy`
|Request the access policy of a bucket

|`S3:PutBucketPolicy`
|Set or overwrite the access policy of a bucket

|`S3:DeleteBucketPolicy`
|Delete the access policy of a bucket

|`S3:GetBucketPolicyStatus`
|Request the bucket status indicating public access

|`S3:GetBucketOwnershipControls`
|Request the access management configuration of a bucket

|`S3:PutBucketOwnershipControls`
|Set or overwrite the access management configuration of a bucket

|`S3:GetBucketObjectLockConfiguration`
|Request the object lock configuration at the bucket level

|`S3:PutBucketObjectLockConfiguration`
|Set or overwrite the object lock configuration at the bucket level

|`S3:GetBucketCORS`
|Request the CORS configuration of a bucket

|`S3:PutBucketCORS`
|Set or overwrite the CORS configuration of a bucket

|`S3:GetBucketWebsite`
|Request the static website configuration of a bucket

|`S3:PutBucketWebsite`
|Set or overwrite the static website configuration of a bucket

|`S3:DeleteBucketWebsite`
|Delete the static website configuration from a bucket

|`S3:GetBucketNotification`
|Request the notification configuration

|`S3:PutBucketNotification`
|Set or overwrite the notification configuration

|`S3:GetBucketVersioning`
|Request the versioning status of a bucket

|`S3:PutBucketVersioning`
|Enable or suspend versioning of a bucket

{ifdef(s3,s3-pdf)}
|`S3:GetEncryptionConfiguration`
|Request the encryption configuration of a bucket

|`S3:PutEncryptionConfiguration`
|Set or overwrite the encryption configuration of a bucket
{/ifdef}

|`S3:GetLifecycleConfiguration`
|Request the lifecycle rules of a bucket

|`S3:PutLifecycleConfiguration`
|Set or overwrite the lifecycle rules of a bucket

|`S3:GetBucketLocation`
|Get the region of a bucket

|`S3:DeleteBucket`
|Delete a bucket

|===

## {heading(Allow and deny)[id=s3-concepts-bucket-policy-effect]}

All {linkto(#s3-concepts-bucket-policy-actions)[text=actions]} can be allowed (`Allow`) or denied (`Deny`) both implicitly and explicitly.
- Implicit allow: set automatically by {var(s3)} and applied by default to all internal {linkto(#s3-concepts-bucket-policy-principal)[text=principals]}.
- Implicit deny: set automatically by {var(s3)} and applied by default to all external {linkto(#s3-concepts-bucket-policy-principal)[text=principals]}.
- Explicit allow: {linkto(../../../instructions/access-management/bucket-policy#s3-concepts-bucket-policy-principal)[text=set]} by the user using access policies via the `Effect` parameter:

    ```json
    ...
    "Effect": "Allow"
    ...
    ```

- Explicit deny: {linkto(../../../instructions/access-management/bucket-policy#s3-concepts-bucket-policy-principal)[text=set]} by the user using access policies via the `Effect` parameter:

    ```json
    ...
    "Effect": "Deny"
    ...
    ```

Accordingly:

- internal principals are allowed all actions by default (implicit allow), and access is restricted by explicit denies (explicit deny);
- external principals: all actions are denied by default (implicit deny), and access is expanded through explicit allows (explicit allow).

## {heading(Principals)[id=s3-concepts-bucket-policy-principal]}

  {note:info}

  {var(s3)} does not support identifying a principal by [Canonical User ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-federated-web-identity), nor a principal as part of a [federation](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-federated-web-identity).

  {/note}

The `Principal` parameter defines who exactly is allowed or denied the actions. Several principal options are supported.

- Public access without authentication (anonymous). For example, for publishing static websites.

  {note:warn}
  It is not recommended to {linkto(#s3-concepts-bucket-policy-effect)[text=allow]} anonymous access without authentication unless necessary. Public publishing involves certain risks: data loss, unwanted uploads to storage, and unplanned configuration changes.
  {/note}

  ```json
  ...
  "Principal": "*"
  ...
  ```
  
- Project-based access — the policy applies to the users and service accounts of the {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} project.

  ```json
  ...
  "Principal": {
      "AWS": "<PROJECT_ID>"
  }
  ...
  ```

  Here `<PROJECT_ID>` is the identifier of the project to which the policy should be applied. It can point to your own project or to another {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} project.

- Granting access to a specific {var(s3)} account.

  ```json
  ...
  "Principal": {
      "AWS": "arn:aws:iam::<PROJECT_ID>:user/<S3_ACCOUNT>"
  }
  ...
  ```

  Here:
  
    - `<PROJECT_ID>` — the identifier of the project to which the policy should be applied. It can point to your own project or to another {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} project.
    - `<S3_ACCOUNT>` — the name of the {var(s3)} account.

- Access for applications or services using a service account.

  ```json
  ...
  "Principal": {
      "AWS": "arn:aws:iam::<PROJECT_ID>:user/serviceusers-<SERVICE_USER>"
  }
  ...
  ```

  Here:
  
    - `<PROJECT_ID>` — the identifier of the project to which the policy should be applied. It can point to your own project or to another {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} project.
    - `<SERVICE_USER>` — the name of the {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} service user for {var(s3)}.

- {var(s3)} prefix key:

  ```json
  ...
  "Principal": {
      "AWS": "arn:aws:iam::<PROJECT_ID>:user/<PREFIX_KEY>"
  }
  ...
  ```

  Here:
  
    - `<PROJECT_ID>` — the identifier of the project to which the policy should be applied. Only prefix keys bound to one of the buckets in the project are supported.
    - `<PREFIX_KEY>` — the name of the {var(s3)} prefix key.

## {heading(Conditions)[id=s3-concepts-bucket-policy-conditions]}

The `Condition` parameter defines under which conditions the rule will be triggered. It is specified using two parameters: an {linkto(#s3-concepts-bucket-policy-conditions-operator)[text=operator]} and a {linkto(#s3-concepts-bucket-policy-conditions-keys)[text=key]}.

### {heading(Operators)[id=s3-concepts-bucket-policy-conditions-operator]}

It is specified inside the `Condition` block and defines how the values will be checked.

[cols="1,5"]
|===

|`StringEquals`
|Check for an exact match of the string value of the condition key against the specified value (or one of the values in the list)

|`StringNotEquals`
|Check for the absence of an exact match of the string value of the condition key against the specified value (or none of the values in the list)

|`NumericEquals`
|Check for an exact match of the numeric value of the condition key against the specified number (or one of the numbers in the list)

|`NumericLessThan`
|True if the numeric value of the condition key is less than the specified number

|`DateEquals`
|True if the date and time value equals the specified value in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format

|`IpAddress`
|True if the IP address of the request source falls within the specified IPv4 or IPv6 CIDR range

|`NotIpAddress`
|True if the IP address of the request source does not fall within the specified IPv4 or IPv6 CIDR range

|===

### {heading(Keys)[id=s3-concepts-bucket-policy-conditions-keys]}

It is specified inside the {linkto(#s3-concepts-bucket-policy-conditions-operator)[text=operator]} in key/value format.

[cols="4,7"]
|===

|`s3:object-lock-legal-hold`
|The status of an object's indefinite (legal) hold. Allows or denies operations depending on whether the legal hold is enabled. Possible values: `ON`, `OFF`

|`s3:object-lock-mode`
|The temporary retention mode of an object. Used to control operations depending on the retention mode. Possible values: `GOVERNANCE`, `COMPLIANCE`

|`s3:object-lock-remaining-retention-days`
|The number of days remaining until the object's temporary retention expires. Used to control operations depending on the number of remaining retention days. Numeric values of 0 or greater are supported

|`s3:object-lock-retain-until-date`
|The date and time until which the object is retained, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Used to control operations depending on the retention end date

|`aws:SourceIp`
|The IP address of the client from which the request came. Used to restrict access by IPv4 or IPv6 CIDR ranges

|===

## {heading(Resources)[id=s3-concepts-bucket-policy-resources]}

The `Resource` parameter can contain:
- a string pointing to a bucket:

  ```json
  "Resource": "arn:aws:s3:::<BUCKET_NAME>"
  ```

- a string pointing to an object:

  ```json
  "Resource": "arn:aws:s3:::<BUCKET_NAME>/<OBJECT_KEY>"
  ```

- a string with a `*` (wildcard) mask pointing to objects with a specific object key prefix:

  ```json
  "Resource": "arn:aws:s3:::<BUCKET_NAME>/<PART_OF_OBJECT_KEY>/*"
  ```

  or

  ```json
  "Resource": "arn:aws:s3:::<BUCKET_NAME>/<PART_OF_OBJECT_KEY>*"
  ```

- a string with a `*` (wildcard) mask pointing to objects with a specific object key suffix:

  ```json
  "Resource": "arn:aws:s3:::<BUCKET_NAME>/*<PART_OF_OBJECT_KEY>"
  ```

- an array of strings with several resources:

  ```json
  "Resource": [
    "arn:aws:s3:::<BUCKET_NAME>",
    "arn:aws:s3:::<BUCKET_NAME>/<OBJECT_KEY>"
  ]
  ```

  In this case, actions for buckets will be applied only to buckets, and actions for objects — only to objects.

## {heading(Configuration examples)[id=s3-concepts-bucket-policy-examples]}

- Allow anonymous users (external {linkto(#s3-concepts-bucket-policy-effect)[text=principals]}) to download objects only from the specified IP address range:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowGetOnlyFromCIDR",
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": ["arn:aws:s3:::my-bucket/*"],
        "Condition": {
          "IpAddress": {
            "aws:SourceIp": ["203.0.113.0/24", "198.51.100.0/24"]
          }
        }
      }
    ]
  }
  ```

- Deny a specific user (an internal {linkto(#s3-concepts-bucket-policy-effect)[text=principal]}) to download objects from the specified IP address:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DenyGetFromSingleIP",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-b"
        },
        "Action": "s3:GetObject",
        "Resource": ["arn:aws:s3:::my-bucket/*"],
        "Condition": {
          "IpAddress": {
            "aws:SourceIp": "198.51.100.10/32"
          }
        }
      }
    ]
  }
  ```

- Grant some users (external {linkto(#s3-concepts-bucket-policy-effect)[text=principals]} from another project `mcs9876543210`) full access to objects with a specific prefix:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "UserAFullAccessToFolderA",
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::mcs9876543210:user/user-external-a"
        },
        "Action": [
          "s3:GetObject",
          "s3:GetObjectAttributes",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:GetObjectTagging",
          "s3:PutObjectTagging",
          "s3:DeleteObjectTagging",
          "s3:GetObjectAcl",
          "s3:PutObjectAcl",
          "s3:AbortMultipartUpload",
          "s3:ListMultipartUploadParts"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/folder-a/*"]
      },
      {
        "Sid": "UserBFullAccessToFolderB",
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::mcs9876543210:user/user-external-b"
        },
        "Action": [
          "s3:GetObject",
          "s3:GetObjectAttributes",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:GetObjectTagging",
          "s3:PutObjectTagging",
          "s3:DeleteObjectTagging",
          "s3:GetObjectAcl",
          "s3:PutObjectAcl",
          "s3:AbortMultipartUpload",
          "s3:ListMultipartUploadParts"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/folder-b/*"]
      }
    ]
  }
  ```

- Grant users or service accounts (external {linkto(#s3-concepts-bucket-policy-effect)[text=principals]} from another project `mcs9876543210`) full access to objects with a specific prefix:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "ProjectFullAccessToSharedFolder",
        "Effect": "Allow",
        "Principal": {
          "AWS": "mcs9876543210"
        },
        "Action": [
          "s3:GetObject",
          "s3:GetObjectAttributes",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:GetObjectTagging",
          "s3:PutObjectTagging",
          "s3:DeleteObjectTagging",
          "s3:GetObjectAcl",
          "s3:PutObjectAcl",
          "s3:AbortMultipartUpload",
          "s3:ListMultipartUploadParts"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/shared/*"]
      }
    ]
  }
  ```

- Allow users or service accounts (external {linkto(#s3-concepts-bucket-policy-effect)[text=principals]} from another project `mcs9876543210`) to write objects only from specific IP addresses:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowPutOnlyFromCIDR",
        "Effect": "Allow",
        "Principal": {
          "AWS": "mcs9876543210"
        },
        "Action": "s3:PutObject",
        "Resource": ["arn:aws:s3:::my-bucket/*"],
        "Condition": {
          "IpAddress": {
            "aws:SourceIp": ["203.0.113.0/24"]
          }
        }
      }
    ]
  }
  ```

- Deny a specific user (an internal {linkto(#s3-concepts-bucket-policy-effect)[text=principal]}) to download any objects and prevent bypassing this denial:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DenyDownloadObjectAndVersions",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-b"
        },
        "Action": [
          "s3:GetObject",
          "s3:GetObjectVersion"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/*"]
      },
  
      {
        "Sid": "DenyBypassPrevention",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-b"
        },
        "Action": [
          "s3:PutBucketPolicy",
          "s3:DeleteBucketPolicy"
        ],
        "Resource": ["arn:aws:s3:::my-bucket"]
      }
    ]
  }
  ```

- Deny a specific user (an internal {linkto(#s3-concepts-bucket-policy-effect)[text=principal]}) to delete any objects and prevent bypassing this denial:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DenyDeleteObjectAndVersions",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": [
          "s3:DeleteObject",
          "s3:DeleteObjectVersion"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/*"]
      },
      
      {
        "Sid": "DenyBypassPreventionObject",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": [
          "s3:PutObject"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/*"]
      },

      {
        "Sid": "DenyBypassPreventionBucket",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": [
          "s3:PutLifecycleConfiguration",
          "s3:PutBucketPolicy",
          "s3:DeleteBucketPolicy",
          "s3:PutBucketVersioning" 
        ],
        "Resource": ["arn:aws:s3:::my-bucket"]
      }
    ]
  }
  ```

- Allow a specific user (an external {linkto(#s3-concepts-bucket-policy-effect)[text=principal]} from another project `mcs9876543210`) to set or change the object lock retention period, provided the requested period does not exceed 10 days:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowShortRetention",
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::mcs9876543210:user/user-external-a"
        },
        "Action": [
          "s3:PutObjectRetention"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/*"],
        "Condition": {
          "NumericLessThan": {
            "s3:object-lock-remaining-retention-days": 11
          }
        }
      }
    ]
  }
  ```

- Completely deny a user (an internal {linkto(#s3-concepts-bucket-policy-effect)[text=principal]}) access to the bucket:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "ExplicitDenyInternalUser",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": "s3:*",
        "Resource": [
          "arn:aws:s3:::my-bucket",
          "arn:aws:s3:::my-bucket/*"
        ]
      }
    ]
  }
  ```

- Allow a user (an external {linkto(#s3-concepts-bucket-policy-effect)[text=principal]} from another project `mcs9876543210`) to only view the list of versions (history) of the bucket itself:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowExternalUserListBucket",
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::mcs9876543210:user/user-external-a"
        },
        "Action": [
          "s3:ListBucket",
          "s3:ListBucketVersions",
        ],
        "Resource": ["arn:aws:s3:::my-bucket"]
      }
    ]
  }
  ```

- Set a set of rules for a specific bucket, object, or prefix for external and internal {linkto(#s3-concepts-bucket-policy-effect)[text=principals]}:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "Allow list-object to anonymous users",
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:ListBucket",
        "Resource": ["arn:aws:s3:::my-bucket"]
      },
      {
        "Sid": "Deny viewing, editing, and deleting the object my-object-1 to the internal user user-internal-a",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": [
          "s3:GetObject",
          "s3:GetObjectVersion",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:DeleteObjectVersion"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/my-object-1"]
      },
      {
        "Sid": "Deny changing the bucket and its objects lifecycle rules to the internal user user-internal-a",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": [
          "s3:PutLifecycleConfiguration"
        ],
        "Resource": ["arn:aws:s3:::my-bucket"]
      },
      {
        "Sid": "Deny changing and deleting the my-bucket bucket policy to the internal user user-internal-a",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": [
          "s3:PutBucketPolicy",
          "s3:DeleteBucketPolicy"
        ],
        "Resource": ["arn:aws:s3:::my-bucket"]
      },
      {
        "Sid": "Allow list-bucket for get-object of objects only with the 'directory' prefix to external users from another project mcs9876543210",
        "Effect": "Allow",
        "Principal": {
            "AWS": "mcs9876543210"
        },
        "Action": [
          "s3:ListBucket"
        ],
        "Resource": ["arn:aws:s3:::my-bucket"]
      },
      {
        "Sid": "Allow get-object of objects only with the 'directory' prefix to external users from another project mcs9876543210",
        "Effect": "Allow",
        "Principal": {
            "AWS": "mcs9876543210"
        },
        "Action": [
          "s3:GetObject"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/directory/*"]
      }     
    ]
  }
  ```

- Deny a specific user (an internal {linkto(#s3-concepts-bucket-policy-effect)[text=principal]}) to change the indefinite object lock, if it is enabled:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DenyPutLegalHold",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": [
          "s3:PutObjectLegalHold"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/*"],
        "Condition": {
          "StringEquals": {
            "s3:object-lock-legal-hold": "ON"
          }
        }
      }
    ]
  }
  ```

- Deny a specific user (an internal {linkto(#s3-concepts-bucket-policy-effect)[text=principal]}) to change the temporary object lock, where the `GOVERNANCE` mode is set:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DenyPutObjectRetention",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": [
          "s3:PutObjectRetention",
          "s3:BypassGovernanceRetention"
        ],
        "Resource": ["arn:aws:s3:::test-bucket-1/*"],
        "Condition": {
          "StringEquals": {
            "s3:object-lock-mode": "COMPLIANCE"
          }
        }
      }
    ]
  }
  ```

- Allow users (external {linkto(#s3-concepts-bucket-policy-effect)[text=principals]} from another project `mcs9876543210`) to set the object retention period, provided the requested date is `2026-09-17`:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "ExplicitAllowForExternalPrincipals",
        "Effect": "Allow",
        "Principal": {
          "AWS": "mcs9876543210" 
        },
        "Action": [
          "s3:PutObjectRetention",
          "s3:BypassGovernanceRetention"
        ],
        "Resource": ["arn:aws:s3:::test-bucket-1/*"],
        "Condition": {
          "DateEquals": {
            "s3:object-lock-retain-until-date": "2026-09-17T00:00:00Z"
          }
        }
      }
    ]
  }
  ```