# {heading(Getting started)[id=api-spec-s3-intro]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Getting the endpoint)[id=api-spec-s3-intro-endpoint]}

In the [personal dashboard](https://msk.cloud.vk.ru/app/project/endpoints), find the required endpoint in the **S3 Object Storage** block.

## {heading(Authorization and authentication)[id=api-spec-s3-intro-auth]}

Most requests to {var(s3)} require authentication.

Authentication data is specified in the `Authorization` header of the request:

```console
Authorization: <ТИП_ПОДПИСИ>-<АЛГОРИТМ_ПОДПИСИ> Credential=<КЛЮЧ_ДОСТУПА>/<ДАТА>/<РЕГИОН>/s3/aws4_request,SignedHeaders=<ЗАГОЛОВКИ>,Signature=<ПОДПИСЬ>
```
Here:

- `<ТИП_ПОДПИСИ>` — **AWS4**.
- `<АЛГОРИТМ_ПОДПИСИ>` — **HMAC-SHA256**.
- `<КЛЮЧ_ДОСТУПА>` — the [key identifier](../../../../../storage/s3/instructions/access-management) for accessing {var(s3)}.
- `<ДАТА>` — the date in YYYYMMDD format.
- `<РЕГИОН>` — the account [region](../../../../account/concepts/regions). Available values:

  - **ru-msk** — Moscow region;
  - **kz-ast** — Kazakhstan region.

- `<ЗАГОЛОВКИ>` — the list of headers used to compute the signature. Headers must be lowercase and arranged in alphabetical order.
- `<ПОДПИСЬ>` — the [computed signature](https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-header-based-auth.html) of the request.

Example request with authorization:

```console
PUT / HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-acl: public-read
x-amz-content-sha256: c6f1fc479f5f690c443b73a258aacc06ddad09eca0b001e9640ff2cd56fe5710
x-amz-date: 20200831T173143Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-acl;x-amz-content-sha256;x-amz-date,Signature=6cab03bef74a80a0441ab7fd33c829a2cdb46bba07e82da518cdb78ac238fda5

<CreateBucketConfiguration>
  <LocationConstraint>ru-msk</LocationConstraint>
</CreateBucketConfiguration>
```