Объектілерді шифрлаумен жұмыс істеуге арналған әдістер:

- {linkto(#api-spec-s3-get-bucket-encryption)[text=%text]} — бакетте орнатылған шифрлау конфигурациясын алу.
- {linkto(#api-spec-s3-put-bucket-encryption)[text=%text]} — бакетте объектілерді шифрлауды орнату.
- {linkto(#api-spec-s3-delete-bucket-encryption)[text=%text]} — объектілерді шифрлауды жою.

## {heading(GetBucketEncryption)[id=api-spec-s3-get-bucket-encryption]}

`GetBucketEncryption` әдісі бакетте орнатылған шифрлау конфигурациясын қайтарады.

Сұрау мысалы:

```curl
GET /?encryption HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-expected-bucket-owner: ExpectedBucketOwner
```

Сәтті жауап мысалы:

```curl
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<ServerSideEncryptionConfiguration>
   <Rule>
      <ApplyServerSideEncryptionByDefault>
         <KMSMasterKeyID>string</KMSMasterKeyID>
         <SSEAlgorithm>string</SSEAlgorithm>
      </ApplyServerSideEncryptionByDefault>
      <BucketKeyEnabled>boolean</BucketKeyEnabled>
   </Rule>
   ...
</ServerSideEncryptionConfiguration>
```

**Қате коды**

HTTP: 400. `ServerSideEncryptionConfigurationNotFoundError` қатесі — әдепкі конфигурацияның болмауы.

## {heading(PutBucketEncryption)[id=api-spec-s3-put-bucket-encryption]}

`PutBucketEncryption` әдісі бакет үшін әдепкі шифрлауды орнатады. Егер шифрлау орнатылмаса, бакетке жүктеу кезінде жаңа объектілер шифрланбайды. Кілттерді генерациялау және дешифрлау KMS арқылы орындалады. Қолданылатын шифрлау алгоритмі — AES256.

Сұрау мысалы:

```curl
PUT /?encryption HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
Content-MD5: ContentMD5
x-amz-sdk-checksum-algorithm: ChecksumAlgorithm
x-amz-expected-bucket-owner: ExpectedBucketOwner
<?xml version="1.0" encoding="UTF-8"?>
<ServerSideEncryptionConfiguration xmlns="<http://hb.bizmrg.com/doc/2006-03-01/>">
					      <Rule>
                  <ApplyServerSideEncryptionByDefault>
                     <SSEAlgorithm>AES256</SSEAlgorithm>
                  </ApplyServerSideEncryptionByDefault>
               </Rule>
            </ServerSideEncryptionConfiguration>
```

**Path параметрлері**

{ifdef(s3-pdf)}
Параметрлер сипаттамасы {linkto(#tab_path_parameters)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_path_parameters]} — Path-параметрлер)[align=right;position=above;id=tab_path_parameters;number={const(numb_tab_path_parameters)}]}
{/ifdef}
[cols="1,1,1,1,3", options="header"]
|===
|Параметр
|Міндетті
|Деректер түрі
|Мәні
|Сипаттама

|Bucket
|Иә
|bucket-name
| <!--- ПУСТАЯ ЯЧЕЙКА  --->
| <!--- ПУСТАЯ ЯЧЕЙКА  --->

|SSEAlgorithm
|Иә
|enum
|AES256
|Сақтау кезінде қолданылатын сервер жағындағы шифрлау алгоритмі. Тақырып қосылғанда, бакетте сақталған объект сервер жағында шифрланған болуы тиіс
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

**Жауап коды**

HTTP: 200 OK.

## {heading(DeleteBucketEncryption)[id=api-spec-s3-delete-bucket-encryption]}

`DeleteBucketEncryption` әдісі, егер ол берілген болса, бакетте орнатылған объектілерді шифрлау конфигурациясын жояды.

Сұрау мысалы:

```curl
DELETE /?encryption HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-expected-bucket-owner: ExpectedBucketOwner
```

**Жауап коды**

HTTP: 204 No Content — сервер сұрауды сәтті өңдеді.
