# {heading(Начало работы)[id=api-spec-s3-intro]}

## {heading(Получение эндпоинта)[id=api-spec-s3-intro-endpoint]}

В [личном кабинете](https://msk.cloud.vk.com/app/project/endpoints) уточните нужный эндпоинт в блоке **Объектное хранилище S3**.

## {heading(Авторизация и аутентификация)[id=api-spec-s3-intro-auth]}

Большинство запросов к {var(s3)} требуют аутентификации.

Данные аутентификации прописываются в заголовке `Authorization` запроса:

```console
Authorization: <ТИП_ПОДПИСИ>-<АЛГОРИТМ_ПОДПИСИ> Credential=<КЛЮЧ_ДОСТУПА>/<ДАТА>/<РЕГИОН>/s3/aws4_request,SignedHeaders=<ЗАГОЛОВКИ>,Signature=<ПОДПИСЬ>
```
Здесь:

- `<ТИП_ПОДПИСИ>` — **AWS4**.
- `<АЛГОРИТМ_ПОДПИСИ>` — **HMAC-SHA256**.
- `<КЛЮЧ_ДОСТУПА>` — [идентификатор ключа](../../../../../storage/s3/instructions/access-management) доступа к {var(s3)}.
- `<ДАТА>` — дата в формате ГГГГММДД.
- `<РЕГИОН>` — [регион](../../../../account/concepts/regions) аккаунта. Доступные значения:

  - **ru-msk** — региона Москва;
  - **kz-ast** — регион Казахстан.

- `<ЗАГОЛОВКИ>` — список заголовков, которые используются при вычислении подписи. Заголовки должны быть написаны только строчными буквами и располагаться в алфавитном порядке.
- `<ПОДПИСЬ>` — [вычисляемая подпись](https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-header-based-auth.html) запроса.

Пример запроса с авторизацией:

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
