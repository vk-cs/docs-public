A pre-signed URL grants access to the object specified in the URL, provided that the creator of the pre-signed URL has permission to access that object.

Pre-signed URLs are useful when you want a user / client to be able to upload a specific object to a bucket, but don't need them to have VK Cloud credentials or security permissions.

Using pre-signed URLs, any user can perform operations in Object Storage, for example:

- Download object
- Upload object
- Create bucket

When creating a pre-signed URL, you need to provide:

- Your security credentials (access keys)
- Specify bucket name
- Object key
- HTTP method
- Date
- Expiration time

Pre-signed URLs are only valid for the specified period. It is possible to use the pre-signed URL multiple times, up to the expiration date and time.

**Note**

You can programmatically generate a pre-signed URL using the REST API, AWS CLI, and AWS SDK for Java, .NET, Ruby, PHP, Node.js, and Python.

The AWS SDK uses version 4 signature by default to authenticate requests. When using AWS signed version 3 SDKs, you might need to request signature version 4 from the service.

## General view of the signed URL

```
 https://hb.bizmrg.com/ <bucket_name> / <key_name>?
X-Amz-Algorithm = AWS4-HMAC-SHA256
& X-Amz-Expires = <time interval in seconds>
& X-Amz-SignedHeaders = <list of headers separated by ";">
& X-Amz-Signature = <signature>
& X-Amz-Date = <time in ISO 8601 format>
& X-Amz-Credential = <access-key-id>% 2F <YYYYMMDD>% 2Fru-msk% 2Fs3% 2Faws4_request
```

Where

- **X-Amz-Algorithm** - An indication of the version of the signature and the algorithm for its calculation. The value is AWS4-HMAC-SHA256.
- **X-Amz-Expires** - Link expiration time in seconds. The maximum value is 604800 seconds (7 days).
- **X-Amz-SignedHeaders** - Request headers to be signed. It is mandatory to sign the host header and any x-amz- \* headers used in the request.
- **X-Amz-Signature** - Request signature.
- **X-Amz-Date** - Time in ISO8601 format, for example 20180719T000000Z. The date must be the same as the date in the X-Amz-Credential parameter.
- **X-Amz-Credential** - Identifier for signing the format `<access-key-id>` / `<YYYYMMDD>` / `ru-msk` / `s3` / `aws4_request`, where `<YYYYMMDD>` must match the date set in the X-Amz-Date header.

## Composing a signed URL

To get a pre-signed URL:

1.  Calculate signature: compose a string and calculate a signature using the string signature algorithm.
2.  Compose a signed URL for your request.

**Note**

In order to compose a signed URL, you must own static access keys.

## Examples of getting a signed link

Using the S3 CLI, you can generate a pre-signed link with the following command:

```
 aws s3 presign s3: // <batch_name> / <key_name> --endpoint-url http://hb.bizmrg.com --expires-in <time_in_seconds>
```
