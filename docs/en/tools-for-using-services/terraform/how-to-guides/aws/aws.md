This article provides examples of creating and configuring the Cloud Storage buckets and objects using Terraform.

The following resources are used to create networks:

- **aws_s3_bucket** — creating a bucket.
- **aws_s3_object** — creating an object.
- **aws_s3_bucket_lifecycle_configuration** — managing the lifecycle of bucket objects.
- **aws_s3_bucket_acl** — managing access to the bucket for other users or projects.
- **aws_s3_bucket_cors_configuration** — managing cross-origin resource sharing (CORS) rules.

A detailed description of the resources is in the [provider documentation](https://docs.comcloud.xyz/modules/terraform-aws-modules/s3-bucket/aws/latest).

## Before you start

1. Learn the available resources and [quotas](/en/tools-for-using-services/account/concepts/quotasandlimits) for the [region](/en/tools-for-using-services/account/concepts/regions) where you plan to create the instance. Different regions may have different quotas configured.

    If you want to increase the quotas, contact [technical support](mailto:support@mcs.mail.ru).

1. [Install Terraform](../../quick-start/) if it is not already done.
1. Set up the provider:

    1. Create a directory you will work with the platform, and navigate to it.
    1. Create the `aws_provider.tf` file and add the following content to it:

        ```hcl
        terraform {
            required_providers {
                aws = {
            source = "hashicorp/aws"
                }
            }
        }
        provider "aws" {
            region                      = "<region>"
            access_key                  = "<public access key>"
            secret_key                  = "<secret key>"
            skip_credentials_validation = true
            skip_metadata_api_check     = true
            skip_requesting_account_id  = true
            skip_region_validation      = true
            endpoints {
                s3 = "<domain>"
            }
        }
        ```

        Here:

        - `<region>` — the region where the Cloud Storage service is hosted. The setting must match the [region](/en/tools-for-using-services/account/concepts/regions/) of the account:

            - `ru-msk` — the Moscow region.
            - `kz-ast` — the Kazakhstan region.
        - `<public access key>`, `<secret key>` — the [key identifier and secret key](/ru/storage/s3/service-management/access-management/access-keys "change-lang") for accessing the object storage.
        - `<domain>` — the URL for accessing the storage, which depends on the account region. Possible values:

            - `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain.
            - `https://hb.kz-ast.bizmrg.com` — the Kazakhstan region domain.

1. Run the command to initialize Terraform:

    ```bash
    terraform init
    ```

This will create additional files required for Terraform to work.

## 1. Add bucket and objects descriptions

The example below creates a bucket `example-bucket`, which will contain the `object-one` and `object-two` objects.

Create the Terraform configuration file `main.tf` with the following content:

```hcl

# Create bucket
resource "aws_s3_bucket" "example-bucket" {
    bucket = "example-bucket"
    force_destroy = true
}

# Create objects
resource "aws_s3_object" "object-one" {
  bucket = aws_s3_bucket.example-bucket.bucket
  key    = "object-one"
  source = "docs/readme.md"
  acl = "private"
  etag = filemd5("docs/readme.md")
}

resource "aws_s3_object" "object-two" {
  bucket = aws_s3_bucket.example-bucket.bucket
  key    = "tmp/object-two"
  source = "docs/video.mp4"
  acl = "private"
  source_hash = filemd5("docs/video.mp4")
}
```

Here:

- `bucket` — bucket name:

  - `bucket = "example-bucket"` — the bucket will be created with the `example-bucket` name. Name requirements:
  
    - contains from 4 to 63 characters
    - begins and ends with a letter or a number
    - consists only of lowercase Latin letters, numbers, and special characters: `.`, `-`
    - unique across the entire VK Cloud platform in all regions

    The bucket name is contained in the URLs of the objects in it, so do not use confidential information in the name.

    If you are creating a bucket for hosting, it is not recommended to use in the name:

    - IP addresses and similar formatting (for example, `192.168.5.4`), as this may cause confusion between the bucket name and the IP address of the site.
    - `xn--` at the beginning: everything that comes after will be perceived by the browser as [Punycode](https://ru.wikipedia.org/wiki/Punycode).

    <warn>
    Once a bucket is created, its name cannot be changed.
    </warn>

  - `bucket = aws_s3_bucket.example-bucket.bucket` — if you create an object, specify here the resource that creates the bucket. In this example, the object will be placed in `example-bucket`, which will be created by the `aws_s3_bucket` resource.

- (Optional) `force_destroy` — this parameter allows deleting the bucket, even if it contains objects. Available values ​​are `true` and `false`. Default is `false`.
- `key` — the key of the object. The name of the object when it will be uploaded to the bucket.
- `source` — the path on your device to the file to be uploaded to the bucket.
- `acl` — [ACL settings](/ru/storage/s3/service-management/access-management/s3-acl#fiksirovannyy_acl "change-lang") for the object. Available values: `private`, `public-read`, `auth-read`.
- `source_hash` — object version identifier. The parameter is similar to `etag`, but without object size restrictions. Set using `filemd5("path/to/source")`.
- `etag` — object version identifier. It is set with `filemd5("path/to/source")`. Use this parameter only for objects smaller than 16 MB. For objects larger than 16 MB, use `source_hash`, because they will be loaded via the multipart upload method.

## 2. Set up automatic bucket cleanup

The example below will add an [automatic deletion rule](/ru/storage/s3/service-management/buckets/manage-bucket#avtomaticheskaya_ochistka_baketa "change-lang") (lifecycle) for objects with the `tmp` prefix from the bucket after one day.

Add the following content to the `main.tf` file:

```hcl
resource "aws_s3_bucket_lifecycle_configuration" "example-bucket-lifecyle" {
  bucket = aws_s3_bucket.example-bucket.id

  rule {
    id = "tmp"
    filter {
      prefix = "tmp/"
    }
    expiration {
      days = 1
    }
    status = "Enabled"
  }
}
```

Here:

- `id` — the rule identifier. Only numbers, Latin letters and special characters `-`, `_`, `.` are allowed. The identifier must be unique within the bucket.
- `prefix` — object key prefix: the rule will be applied only to objects with the specified prefix keys. The filter can contain only one key. Examples of prefix keys: `image/`, `pre/`, `image/photo`.
- `expiration` — the parameter specifies the number of days after which objects will be deleted. Cleaning occurs at 00:00 UTC.
- `status` — rule status:

  - `"Enabled"` — the rule is active;
  - `"Disabled"` — the rule is not active.

## 3. Grant bucket access rights to other users or projects

The example below will grant read permissions to a bucket ACL by user ID and PID.

<info>

It is not possible to specify an ACL for a single Cloud Storage [account](/ru/storage/s3/service-management/access-management/access-keys "change-lang") from another project.

</info>

Add the following content to the `main.tf` file:

```hcl

data "aws_canonical_user_id" "current" {}

resource "aws_s3_bucket_acl" "example-bucket-acl" {
  bucket = aws_s3_bucket.example-bucket.id
  access_control_policy {

    # Required part: defines full access rights for the current user (bucket owner)
    owner {
      id = data.aws_canonical_user_id.current.id
    }
    grant {
       grantee {
         id   = data.aws_canonical_user_id.current.id
         type = "CanonicalUser"
       }
       permission = "FULL_CONTROL"
    }

    # Access rights to the bucket by user ID
    grant {
      grantee {
        id   = "1f417590-xxxx-xxxx-xxxx-edacf23b1f96"
        type = "CanonicalUser"
      }
      permission = "READ_ACP"
    }

    # Access rights to the bucket by PID
    grant {
      grantee {
        email_address = "mcs1234567890"
        type          = "AmazonCustomerByEmail"
      }
      permission = "READ_ACP"
    }
  }
}
```

Here:

- `data "aws_canonical_user_id" "current" {}` — the data source gets the canonical identifier (Canonical User ID) of the current user.
- `id = "1f417590-xxxx-xxxx-xxxx-edacf23b1f96"` — the canonical identifier of the user (Canonical User ID) that is granted access rights to the bucket. [How to find out the canonical identifier of the user](/ru/storage/s3/service-management/access-management/s3-acl#user-id "change-lang").
- `email_address = "mcs1234567890"` — the PID (project identifier) ​​that is granted access rights to the bucket. [How to find out the PID](/ru/tools-for-using-services/account/service-management/project-settings/manage#poluchenie_identifikatora_proekta).
- `permission` — [type of access rights](/ru/storage/s3/service-management/access-management/s3-acl#permissons "change-lang"). Available values: `READ`, `WRITE`, `READ_ACP`, `WRITE_ACP`, `FULL_CONTROL`.

## 4. Set up CORS rules for the bucket

The example below will set up [CORS](https://cloud.vk.com/docs/storage/s3/reference#cors) rules.

Add the following content to the `main.tf` file:

```hcl
resource "aws_s3_bucket_cors_configuration" "example-bucket-cors" {
  bucket = aws_s3_bucket.example-bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["https://example-website.com"]
    expose_headers  = ["etag"]
    max_age_seconds = 3000
  }

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}
```

Here:

- (Optional) `allowed_headers` — the list of headers allowed in the request to the bucket objects. You can use the `*` character to specify a pattern.
- `allowed_methods` — the list of methods allowed in the request to the bucket objects. Available values: `GET`, `PUT`, `HEAD`, `POST`, `DELETE`.
- `allowed_origins` — the list of URLs that are allowed to access the bucket. You can use the `*` character to specify a pattern.
- (Optional) `expose_headers` — the list of headers in the response that users will be able to access from their applications. Specified in lowercase.
- (Optional) `max_age_seconds` — the time in seconds that your browser caches the response for the specified URL.

## 5. Create the required resources with Terraform

1. Put the Terraform configuration files in one directory:

    - `aws_provider.tf`
    - `network.tf`

1. Open this directory.

1. Make sure that the configuration files are correct and contain the required changes:

    ```bash
    terraform validate && terraform plan
    ```

1. Apply the changes:

    ```bash
    terraform apply
    ```

    Enter `yes` to confirm.

1. Wait for the operation to complete.

## 6. Check configuration application

Make sure the bucket and objects have been created successfully, and the configuration has been set up:

1. [Connect](/ru/storage/s3/connect/s3-cli "change-lang") to Cloud Storage via AWS CLI.
1. Verify that the bucket and objects have been created. Run the command:

    ```bash
    aws s3 ls s3://example-bucket/ --endpoint-url https://hb.bizmrg.com
    ```

    Here:

      - `example-bucket` is the name of the bucket that was created via Terraform.
      - `endpoint-url` is the Cloud Storage service domain, must match the [region](/en/tools-for-using-services/account/concepts/regions) of the account:

         - `https://hb.ru-msk.vkcloud-storage.ru` — domain of the Moscow region.
         - `https://hb.kz-ast.bizmrg.com` — domain of the Kazakhstan region.

      The response will return the created bucket and the list of objects added to it.

1. Check that automatic cleaning rules are configured for the bucket. Run the command:

    ```bash
    aws s3api get-bucket-lifecycle-configuration \
      --endpoint-url https://hb.bizmrg.com \
      --bucket example-bucket
    ```

1. Check that access rights to the bucket are configured for other users:

    ```bash
    aws s3api get-bucket-acl \
      --endpoint-url https://hb.bizmrg.com \
      --bucket example-bucket
    ```

1. Check that CORS rules are configured for the bucket:

    ```bash
    aws s3api get-bucket-cors \
      --endpoint-url https://hb.bizmrg.com \
      --bucket example-bucket
    ```

## Delete unused resources

If you no longer need the Terraform resources, delete them:

1. Open the directory that contains the Terraform configuration files.

1. Run the command:

    ```bash
    terraform destroy
    ```

    Enter `yes` to confirm.

1. Wait for the operation to complete.
