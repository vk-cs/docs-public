{include(/kz/_includes/_translated_by_ai.md)}

## Эндпоинтті алу

[Жеке кабинетте](https://kz.cloud.vk.com/app/project/endpoints) **S3 объектілік сақтау қоймасы** блогындағы қажетті эндпоинтті нақтылаңыз.

## Авторландыру және аутентификация

VK Object Storage сервисіне жіберілетін сұраулардың көпшілігі аутентификацияны талап етеді.

Аутентификация деректері сұраудың `Authorization` тақырыбында көрсетіледі:

```console
Authorization: <тип подписи>-<алгоритм подписи> Credential=<ключ-доступа>/<дата>/<регион>/s3/aws4_request,SignedHeaders=<заголовки>,Signature=<подпись>
```
Мұнда:

- `<тип подписи>` — **AWS4**.
- `<алгоритм подписи>` — **HMAC-SHA256**.
- `<ключ-доступа>` — VK Object Storage сервисіне қол жеткізу [кілтінің идентификаторы](../../../../../storage/s3/instructions/access-management).
- `<дата>` — ЖЖЖЖААКК форматындағы күн.
- `<регион>` — аккаунттың [аймағы](../../../../account/concepts/regions). Қолжетімді мәндер:

  - **ru-msk** — Мәскеу аймағы;
  - **kz-ast** — Қазақстан аймағы.

- `<заголовки>` — қолтаңбаны есептеу кезінде қолданылатын тақырыптар тізімі. Тақырыптар тек кіші әріптермен жазылуы және алфавиттік ретпен орналасуы керек.
- `<подпись>` — сұраудың [есептелетін қолтаңбасы](https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-header-based-auth.html).

Авторландыруы бар сұрау мысалы:

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
