Методы для работы с шифрованием объектов:

- {linkto(#api-spec-s3-get-bucket-encryption)[text=%text]} — получить конфигурацию шифрования, установленную на бакет.
- {linkto(#api-spec-s3-put-bucket-encryption)[text=%text]} — установить шифрование объектов на бакет.
- {linkto(#api-spec-s3-delete-bucket-encryption)[text=%text]} — удалить шифрование объектов.

## {heading(GetBucketEncryption)[id=api-spec-s3-get-bucket-encryption]}

Метод `GetBucketEncryption` возвращает конфигурацию шифрования, установленную на бакет.

Пример запроса:

```curl
GET /?encryption HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-expected-bucket-owner: ExpectedBucketOwner
```

Пример успешного ответа:

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

**Код ошибки**

HTTP: 400. Ошибка `ServerSideEncryptionConfigurationNotFoundError` — отсутствие конфигурации по умолчанию.

## {heading(PutBucketEncryption)[id=api-spec-s3-put-bucket-encryption]}

Метод `PutBucketEncryption` устанавливает шифрование для бакета по умолчанию. Если шифрование не устанавливало, новые объекты при загрузке в бакет не шифруются. Генерация и расшифровка ключей производится KMS. Используемый алгоритм шифрования AES256.

Пример запроса:

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

**Path параметры**

{ifdef(s3-pdf)}
Описание параметров приведено в {linkto(#tab_path_parameters)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_path_parameters]} — Path-параметры)[align=right;position=above;id=tab_path_parameters;number={const(numb_tab_path_parameters)}]}
{/ifdef}
[cols="1,1,1,1,3", options="header"]
|===
|Параметр
|Обязательный
|Тип данных
|Значение
|Описание

|Bucket
|Да
|bucket-name
| <!--- ПУСТАЯ ЯЧЕЙКА  --->
| <!--- ПУСТАЯ ЯЧЕЙКА  --->

|SSEAlgorithm
|Да
|enum
|AES256
|Алгоритм шифрования на стороне сервера, используемый при хранении. При добавлении заголовка объект, сохраненный в бакете, должен быть зашифрован на стороне сервера
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

**Код ответа**

HTTP: 200 OK.

## {heading(DeleteBucketEncryption)[id=api-spec-s3-delete-bucket-encryption]}

Метод `DeleteBucketEncryption` удаляет установленную на бакет конфигурацию шифрования объектов, если она задана.

Пример запроса:

```curl
DELETE /?encryption HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-expected-bucket-owner: ExpectedBucketOwner
```

**Код ответа**

HTTP: 204 No Content — сервер успешно обработал запрос.