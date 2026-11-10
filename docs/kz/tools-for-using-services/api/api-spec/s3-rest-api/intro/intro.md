# {heading(Жұмысты бастау)[id=api-spec-s3-intro]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(Эндпоинтті алу)[id=api-spec-s3-intro-endpoint]}

[Жеке кабинетте](https://msk.cloud.vk.ru/app/project/endpoints) қажетті эндпоинтті **S3 объектілік қоймасы** блогында нақтылаңыз.

## {heading(Авторизация және аутентификация)[id=api-spec-s3-intro-auth]}

{var(s3)} қызметіне жасалатын сұраулардың көпшілігі аутентификацияны талап етеді.

Аутентификация деректері сұраудың `Authorization` тақырыбында көрсетіледі:

```console
Authorization: <ҚОЛТАҢБА_ТҮРІ>-<ҚОЛТАҢБА_АЛГОРИТМІ> Credential=<ҚАТЫНАУ_КІЛТІ>/<КҮНІ>/<ӨНІР>/s3/aws4_request,SignedHeaders=<ТАҚЫРЫПТАР>,Signature=<ҚОЛТАҢБА>
```
Мұнда:

- `<ҚОЛТАҢБА_ТҮРІ>` — **AWS4**.
- `<ҚОЛТАҢБА_АЛГОРИТМІ>` — **HMAC-SHA256**.
- `<ҚАТЫНАУ_КІЛТІ>` — {var(s3)} қатынау кілтінің [идентификаторы](../../../../../storage/s3/instructions/access-management).
- `<КҮНІ>` — ЖЖЖЖААКК пішіміндегі күні.
- `<ӨНІР>` — аккаунттың [өнірі](../../../../account/concepts/regions). Қолжетімді мәндер:

  - **ru-msk** — Мәскеу өнірі;
  - **kz-ast** — Қазақстан өнірі.

- `<ТАҚЫРЫПТАР>` — қолтаңба есептеу кезінде қолданылатын тақырыптар тізімі. Тақырыптар тек кіші әріптермен жазылып, алфавиттік ретпен орналасуы тиіс.
- `<ҚОЛТАҢБА>` — сұраудың [есептелетін қолтаңбасы](https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-header-based-auth.html).

Авторизациясы бар сұрау мысалы:

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