Составная загрузка позволяет сохранять объекты в {var(s3)} по частям. Это может пригодиться при загрузке или копировании больших объектов. Рекомендуем использовать составную загрузку для объектов от 100 МБ.

Составная загрузка состоит из следующих шагов:

- {linkto(#api-spec-s3-create-multipart-upload)[text=%text]} — инициализация загрузки.
- {linkto(#api-spec-s3-upload-part)[text=%text]} — загрузка части объекта.
- {linkto(#api-spec-s3-complete-multipart-upload)[text=%text]} — завершение загрузки путем объединения ранее загруженных частей.
- {linkto(#api-spec-s3-abort-multipart-upload)[text=%text]} — отменить загрузку.
- {linkto(#api-spec-s3-list-parts)[text=%text]} — получить список загруженных частей.

## {heading(CreateMultipartUpload)[id=api-spec-s3-create-multipart-upload]}

Операция инициализирует составную загрузку и возвращает идентификатор загрузки. Идентификатор загрузки используется для объединения всех частей одной составной загрузки. Необходимо указывать этот идентификатор загрузки в каждом из последующих запросов на загрузку части.

Если настроено правило жизненного цикла на прерывание неоконченных составных загрузок, то загрузка должна завершиться в течение количества дней, указанном в конфигурации жизненного цикла бакета. В противном случае для незавершенной составной загрузки становится доступной операция прерывания, и сервис прерывает составную загрузку.

{ifdef(public)}
{note:info}
После инициализации составной загрузки и собственно загрузки одной или нескольких частей необходимо завершить или прервать составную загрузку, чтобы приостановить списание оплаты за хранение загруженных частей. Только после завершения или прерывания составной загрузки {var(s3)} освобождает место, предоставляемое частям в хранилище, и прекращает производить списание оплаты за хранение этих частей.
{/note}
{/ifdef}

Пример запроса:

```curl
POST /multipart-file.tar.gz?uploads HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date:20200831T174652Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e356966fff5a3d49d19c0e44e0fdba294964384a58061d3e60dfd1a4a5b605ad
```

{ifdef(s3-pdf)}
Описание заголовков запроса приведено в {linkto(#tab_request1)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_request1]} — Заголовки запроса)[align=right;position=above;id=tab_request1;number={const(numb_tab_request1)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Заголовок
|Описание

2+|**Заголовки блокировки объектов**

|`x-amz-object-lock-legal-hold`
|Статус бессрочной блокировки, устанавливаемой на объект:

- `ON` — блокировка установлена
- `OFF` — блокировка не установлена

|`x-amz-object-lock-mode`
|Тип временной блокировки, устанавливаемой на объект:

- `GOVERNANCE` — временная управляемая блокировка.
- `COMPLIANCE` — временная строгая блокировка

|`x-amz-object-lock-retain-until-date`
|Дата и время окончания временной блокировки

{ifdef(s3,s3-pdf)}

2+|**Заголовки шифрования объектов**

2+|Если указаны все заголовки, используется шифрование пользовательским ключом. Если указан только заголовок **x-amz-server-side-encryption**, используется шифрование с помощью ключей, сгенерированных KMS

|`x-amz-server-side-encryption`
|Алгоритм шифрования на стороне сервера, используемый при хранении. При загрузке объект, сохраненный в бакете, должен быть зашифрован на стороне сервера.

Значение: `AES256`

|`x-amz-server-side-encryption-customer-algorithm`
|Алгоритм шифрования для пользовательского ключа.

Значение: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Пользовательский ключ

|`x-amz-server-side-encryption-customer-key-MD5`
|Указывает 128-bit MD5 хеш ключа. Проверка целостности сообщения, чтобы убедиться, что ключ шифрования был передан без ошибок

{/ifdef}

2+|**Заголовки маркировки объектов**

|`x-amz-tagging`
|Добавление тегов объекту. Указываются в виде параметров запроса URL: `tag1=value1&tag2=value2`
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

Пример ответа:

```curl
HTTP/1.1 200 OK
Content-Length: 286
Content-Type: application/xml
Date: Mon, 31 Aug 2020 17:46:53 GMT
x-amz-request-id: tx00000000000000ab66a13-005991e20d-66a8-ru-mska
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
  <InitiateMultipartUploadResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Bucket>static-images</Bucket>
    <Key>multipart-file.tar.gz</Key>
    <UploadId>2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh</UploadId>
  </InitiateMultipartUploadResult>
```

## {heading(UploadPart)[id=api-spec-s3-upload-part]}

Операция загружает часть составной загрузки. Для выполнения этой операции необходимо предоставить данные из части в запросе. Для загрузки части из существующего объекта используется операция загрузки части (копии).

Часть может иметь любой номер от 1 до 10 000 включительно. Номер части однозначно определяет часть и ее положение в создаваемом объекте. Если загружается новую часть, с назначенным ей номером, используемым для одной из существующих частей, то существующая часть будет перезаписана. Размер каждой части, кроме последней, должен составлять как минимум 5 МБ. Последняя часть составной загрузки не имеет ограничения по размеру.

Чтобы удостовериться в том, что данные не исказятся при их передаче по сети, следует указать заголовок `Content-MD5` в запросе загрузки части. {var(s3)} сверяет данные из частей с предоставленным значением MD5-хеша и при их несовпадении возвращает ошибку.

Пример запроса:

```curl
PUT /multipart-file.tar.gz?partNumber=1&uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 5242880
x-amz-content-sha256: 6ab0931e613fd0cd39af0fa4733edb6ad942df0ad33e057713d44df7195b6ecf
x-amz-date: 20200831T184459Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=2e4adca0a3164af8717f340ca874b4f3036dd0294b590a70f2147427221ca1e8
```

{ifdef(s3-pdf)}
Описание заголовков запроса приведено в {linkto(#tab_request2)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_request2]} — Заголовки запроса)[align=right;position=above;id=tab_request2;number={const(numb_tab_request2)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Заголовок
|Описание

2+|**Заголовки шифрования объектов**

|`x-amz-server-side-encryption-customer-algorithm`
|Алгоритм шифрования для пользовательского ключа.

Значение: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Пользовательский ключ

|`x-amz-server-side-encryption-customer-key-MD5`
|Указывает 128-bit MD5 хеш ключа. Проверка целостности сообщения, чтобы убедиться, что ключ шифрования был передан без ошибок
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

Пример ответа:

```curl
HTTP/1.1 200 OK
Content-Length: 0
Content-Type: application/xml
Date: Mon, 31 Aug 2020 18:45:01 GMT
Etag: "d8d3ed3a4de016917a814a2cf5acad3c"
x-amz-request-id: tx00000000000000ab85dab-005991efac-66a8-ru-mska
Connection: close
```

## {heading(CompleteMultipartUpload)[id=api-spec-s3-complete-multipart-upload]}

Операция завершает составную загрузку путем объединения ранее загруженных частей. После получения данного запроса {var(s3)} объединяет все загруженные части в возрастающем порядке по номеру частей, создавая новый объект. В запросе на завершение составной загрузки необходимо предоставить список частей. Для каждой части из списка следует предоставить номер части и значение заголовка ETag, возвращаемое после загрузки этой части.

Обработка запроса на завершение составной загрузки может занять несколько минут. После начала обработки запроса, {var(s3)} отправляет заголовок ответа HTTP, содержащий ответ `200 OK`. Во время обработки запроса периодически отправляются пробельные символы для предотвращения превышения лимита времени ожидания. Так как ошибка может возникать в запросе после отправления первоначального ответа `200 OK`, необходимо проверять тело ответа для определения успешности исполнения запроса.

Пример запроса:

```curl
POST /multipart-file.tar.gz?uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 358
x-amz-content-sha256: 6ab0931e613fd0cd39af0fa4733edb6ad942df0ad33e057713d44df7195b6ecf
x-amz-date: 20200831T184459Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=2e4adca0a3164af8717f340ca874b4f3036dd0294b590a70f2147427221ca1e8

<CompleteMultipartUpload>
  <Part>
    <PartNumber>1</PartNumber>
    <ETag>"d8d3ed3a4de016917a814a2cf5acad3c"</ETag>
  </Part>
  <Part>
    <PartNumber>2</PartNumber>
    <ETag>"adf5feafc0fe4632008d5cb30beb1c49"</ETag>
  </Part>
  <Part>
    <PartNumber>3</PartNumber>
    <ETag>"363f6bb50866541d78e5f6f626592263"</ETag>
  </Part>
</CompleteMultipartUpload>
```

{ifdef(s3-pdf)}
Описание заголовков запроса приведено в {linkto(#tab_request3)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_request3]} — Заголовки запроса)[align=right;position=above;id=tab_request3;number={const(numb_tab_request3)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Заголовок
|Описание

2+|**Заголовки шифрования объектов**

|`x-amz-server-side-encryption-customer-algorithm`
|Алгоритм шифрования для пользовательского ключа.

Значение: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Пользовательский ключ

|`x-amz-server-side-encryption-customer-key-MD5`
|Указывает 128-bit MD5 хеш ключа. Проверка целостности сообщения, чтобы убедиться, что ключ шифрования был передан без ошибок
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

Пример ответа:

```curl
HTTP/1.1 200 OK
Content-Length: 336
Content-Type: application/xml
Date: Mon, 31 Aug 2020 18:45:01 GMT
x-amz-request-id: tx00000000000000ab962c8-005991f6fe-66a8-ru-mska
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
  <CompleteMultipartUploadResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Location>my-test-bucket1.hb.ru-msk.vkcloud-storage.ru</Location>
    <Bucket>my-test-bucket1</Bucket>
    <Key>multipart-file.tar.gz</Key>
    <ETag>f935869350d7cbfcdd219df3f377531b-3</ETag>
  </CompleteMultipartUploadResult>
```

## {heading(AbortMultipartUpload)[id=api-spec-s3-abort-multipart-upload]}

Операция прерывает составную загрузку. После прерывания составной загрузки невозможно загрузить дополнительные части, используя идентификатор прерванной составной загрузки. Место, выделенное для хранения ранее загруженных частей, будет освобождено. При этом если происходит загрузка каких-либо частей, то такая операция может завершиться или прерваться. В результате этого может появиться необходимость многократного прерывания составной загрузки для полного высвобождения пространства, занимаемого всеми частями.

Пример запроса:

```curl
DELETE /multipart-file.tar.gz?uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 5242880
x-amz-content-sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date:20200831T202611Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=9e13d3f9e71ca5fb034fe66e92c60e30b3az3e177573702dd11d2b541358bf92
```

Пример ответа:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:45:01 GMT
x-amz-request-id: tx00000000000000abbaefe-0059920764-66a8-ru-mska
Connection: close
```

## {heading(ListParts)[id=api-spec-s3-list-parts]}

Операция возвращает список частей, загруженных по определенной составной загрузке. Операция должна включать в себя идентификатор загрузки, который получен после отправки запроса на инициализацию составной загрузки. Такой запрос возвращает не более 1000 загруженных частей. Можно ограничить количество возвращаемых частей, указав параметр запроса `max-parts`. Если составная загрузка состоит из более, чем 1000 частей, то ответ возвращает элемент `NextPartNumberMarker` и поле `IsTruncated` со значением `true`. В последующих запросах на просмотр списка частей можно включать параметр строки запроса `part-number-marker`, устанавливая для него значение поля `NextPartNumberMarker` из предыдущего ответа.

Пример запроса:

```curl
GET /?uploads&delimiter=Delimiter&encoding-type=EncodingType&key-marker=KeyMarker&max-uploads=MaxUploads&prefix=Prefix&upload-id-marker=UploadIdMarker HTTP/1.1

PUT /multipart-file.tar.gz?partNumber=1&uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 5242880
x-amz-content-sha256: 6ab0931e613fd0cd39af0fa4733edb6ad942df0ad33e057713d44df7195b6ecf
x-amz-date: 20200831T184459Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=2e4adca0a3164af8717f340ca874b4f3036dd0294b590a70f2147427221ca1e8
```

Пример ответа:

```curl
HTTP/1.1 200 OK
Content-Length: 980
Content-Type: application/xml
Date: Mon, 31 Aug 2020 18:45:01 GMT
Etag: "d8d3ed3a4de016917a814a2cf5acad3c"
x-amz-request-id: tx00000000000000ab85dab-005991efac-66a8-ru-mska
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
  <ListPartsResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Bucket>my-test-bucket1</Bucket>
    <Key>multipart-file.tar.gz</Key>
    <UploadId>2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh</UploadId>
    <StorageClass>STANDARD</StorageClass>
    <PartNumberMarker>0</PartNumberMarker>
    <NextPartNumberMarker>1</NextPartNumberMarker>
    <MaxParts>1000</MaxParts>
    <IsTruncated>false</IsTruncated>
    <Owner>
      <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
      <DisplayName>VK Cloud_UserName</DisplayName>
    </Owner>
    <Part>
      <LastModified>2017-08-14T18:45:01.601Z</LastModified>
      <PartNumber>1</PartNumber>
      <ETag>"d8d3ed3a4de016917a814a2cf5acad3c"</ETag>
      <Size>5242880</Size>
    </Part>
    <Part>
      <LastModified>2017-08-14T18:45:01.601Z</LastModified>
      <PartNumber>2</PartNumber>
      <ETag>"adf5feafc0fe4632008d5cb30beb1c49"</ETag>
      <Size>5242880</Size>
    </Part>
  </ListPartsResult>
```
