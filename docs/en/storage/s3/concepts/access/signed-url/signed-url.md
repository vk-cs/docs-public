# {heading(Access via signed URL)[id=s3-concepts-signed-url]}

{include(/en/_includes/_translated_by_ai_en.md)}

By default, all objects and buckets in a project are private. However, you can allow other users to download objects from a bucket or upload them to it by creating a pre-signed URL. It specifies:

- A public access key. For example, the public {linkto(../../access/account-and-keys#s3-concepts-account-and-keys-access-keys)[text=access key associated with the {var(s3)} account]}, or a public {linkto(../../access/account-and-keys#s3-concepts-account-and-keys-bucket-access-keys)[text=bucket access key]}.
- The bucket name.
- The object key.
- The URL expiration time.
- A signature encrypted with the secret access key.

{note:info}
By default, a pre-signed URL allows downloading the object specified in it. You can also create URLs for uploading objects to a bucket. For more information, see the [official Amazon AWS documentation](https://docs.amazonaws.cn/en_us/AmazonS3/latest/userguide/PresignedUrlUploadObject.html).
{/note}

Anyone who has the signed URL gains access to the object specified in it. No authorization is required. A signed URL can be used multiple times, but only within its specified validity period.

The capabilities of a signed URL are limited by the permissions of the one who signed it. For example, the URL will stop working if the {var(s3)} account whose key was used to sign the URL is deleted.

{cut(General format of a signed URL)}

```console
https://hb.ru-msk.vkcloud-storage.ru/<BUCKET_NAME>/<OBJECT_KEY>?
     X-Amz-Algorithm=<ALGORITHM>
    &X-Amz-Expires=<VALIDITY_TIME>
    &X-Amz-SignedHeaders=<HEADERS_LIST>
    &X-Amz-Date=<DATE_AND_TIME>
    &X-Amz-Credential=<ACCESS_KEY>/<YYYYMMDD>/ru-msk/s3/aws4_request
    &X-Amz-Signature=<SIGNATURE>
```

Where:

- `<OBJECT_KEY>` — the key of the object to which access is granted.
- `<BUCKET_NAME>` — the name of the bucket where the object is located.
- `<ALGORITHM>` — the signature version and the algorithm used to compute it, for example `AWS4-HMAC-SHA256`.
- `<VALIDITY_TIME>` — the validity period of the URL in seconds. It is counted from the moment specified in the `X-Amz-Date` header. The maximum value is 604800 seconds (7 days).
- `<HEADERS_LIST>` — the list of request headers to be signed. Headers are separated by the `;` character. The `Host` header and all `X-Amz-*` headers used in the request must be signed.
- `<DATE_AND_TIME>` — the date and time of the URL expiration in ISO8601 format, for example `20180719T000000Z`. The date must match the date in the `X-Amz-Credential` header.
- `<ACCESS_KEY>` — the Access Key ID, the access key identifier.
- `<YYYYMMDD>` — the date in `YYYYMMDD` format to be substituted into the `X-Amz-Credential` header. It must match the date set in the `X-Amz-Date` header.  
- `<SIGNATURE>` — the request signature. The request is signed using the secret access key.

{/cut}

A signed URL can be {linkto(../../../instructions/access-management/signed-url#s3-instructions-signed-url)[text=generated]} using the AWS CLI or SDK.