## Получение эндпоинта

В [личном кабинете](https://msk.cloud.vk.com/app/project/endpoints) уточните нужный эндпоинт в блоке **Объектное хранилище S3**.

## Авторизация и аутентификация

Большинство запросов к Cloud Storage требуют аутентификации.

Данные аутентификации прописываются в заголовке `Authorization` запроса:

```bash
Authorization: <тип подписи>-<алгоритм подписи> Credential=<ключ-доступа>/<дата>/<регион>/s3/aws4_request,SignedHeaders=<заголовки>,Signature=<подпись>
```
Здесь:

- `<тип подписи>` — **AWS4**.
- `<алгоритм подписи>` — **HMAC-SHA256**.
- `<ключ-доступа>` — [идентификатор ключа](../../../../../storage/s3/instructions/access-management) доступа к Cloud Storage.
- `<дата>` — дата в формате ГГГГММДД.
- `<регион>` — [регион](../../../../account/concepts/regions) аккаунта. Доступные значения:

  - **ru-msk** — региона Москва;
  - **kz-ast** — регион Казахстан.

- `<заголовки>` — список заголовков, которые используются при вычислении подписи. Заголовки должны быть написаны только строчными буквами и располагаться в алфавитном порядке.
- `<подпись>` — [вычисляемая подпись](https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-header-based-auth.html) запроса.

Пример запроса с авторизацией:

```bash
PUT / HTTP/1.1
Host: my-test-bucket1.hb.vkcs.cloud
x-amz-acl: public-read
x-amz-content-sha256: c6f1fc479f5f690c443b73a258aacc06ddad09eca0b001e9640ff2cd56fe5710
x-amz-date: 20200831T173143Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-acl;x-amz-content-sha256;x-amz-date,Signature=6cab03bef74a80a0441ab7fd33c829a2cdb46bba07e82da518cdb78ac238fda5

<CreateBucketConfiguration>
  <LocationConstraint>ru-msk</LocationConstraint>
</CreateBucketConfiguration>
```
