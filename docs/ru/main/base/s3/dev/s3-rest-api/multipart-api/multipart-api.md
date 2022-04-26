Составная или многокомпонентная загрузка позволяет сохранять объекты в Объектном хранилище VK CS S3 по частям. Это может пригодиться при загрузке или копировании больших объектов. Рекомендуем использовать составную загрузку для объектов от 100 МБ.

Составная загрузка состоит из следующих шагов:

- Initiate Multipart Upload - Инициализация загрузки
- Upload Part - Загрузка объекта по частям
- Complete Multipart Upload - Завершение загрузки путем объединения ранее загруженных частей
- Abort Multipart Upload - Прерывание загрузки
- List Parts - Возврат списка загруженных частей

## Initiate Multipart Upload

Операция инициализирует многокомпонентную загрузку и возвращает идентификатор загрузки. Идентификатор загрузки используется для объединения всех частей одной многокомпонентной загрузки. Необходимо указывать этот идентификатор загрузки в каждом из последующих запросов на загрузку части.

Если настроено правило жизненного цикла на прерывание неоконченных многокомпонентных загрузок, то загрузка должна завершиться в течение количества дней, указанном в конфигурации жизненного цикла бакета. В противном случае для незавершенной многокомпонентной загрузки становится доступной операция прерывания, и сервис прерывает многокомпонентную загрузку.

**Примечание**

После инициализации многокомпонентной загрузки и собственно загрузки одной или нескольких частей необходимо завершить или прервать многокомпонентную загрузку, чтобы приостановить списание оплаты за хранение загруженных частей. Только после завершения или прерывания многокомпонентной загрузки VK CS S3 освобождает место, предоставляемое частям в хранилище, и прекращает производить списание оплаты за хранение этих частей.

Запрос:

```
POST /multipart-file.tar.gz?uploads HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date:20200831T174652Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e356966fff5a3d49d19c0e44e0fdba294964384a58061d3e60dfd1a4a5b605ad
```

Ответ:

```
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

## Upload Part

Операция загружает часть многокомпонентной загрузки. Для выполнения этой операции необходимо предоставить данные из части в запросе. Для загрузки части из существующего объекта используется операция загрузки части (копии).

Часть может иметь любой номер от 1 до 10 000 включительно. Номер части однозначно определяет часть и ее положение в создаваемом объекте. Если загружается новую часть, с назначенным ей номером, используемым для одной из существующих частей, то существующая часть будет перезаписана. Размер каждой части, кроме последней, должен составлять как минимум 5 МБ. Последняя часть многокомпонентной загрузки не имеет ограничения по размеру.

Чтобы удостовериться в том, что данные не исказятся при их передаче по сети, следует указать заголовок Content-MD5 в запросе загрузки части. VK CS сверяет данные из частей с предоставленным значением MD5-хеша и при их несовпадении возвращает ошибку.

Запрос:

```
PUT /multipart-file.tar.gz?partNumber=1&uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
Content-Length: 5242880
x-amz-content-sha256: 6ab0931e613fd0cd39af0fa4733edb6ad942df0ad33e057713d44df7195b6ecf
x-amz-date: 20200831T184459Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=2e4adca0a3164af8717f340ca874b4f3036dd0294b590a70f2147427221ca1e8
```

Ответ:

```
HTTP/1.1 200 OK
Content-Length: 0
Content-Type: application/xml
Date: Mon, 31 Aug 2020 18:45:01 GMT
Etag: "d8d3ed3a4de016917a814a2cf5acad3c"
x-amz-request-id: tx00000000000000ab85dab-005991efac-66a8-ru-mska
Connection: close
```

## Complete Multipart Upload

Операция завершает многокомпонентную загрузку путем объединения ранее загруженных частей. После получения данного запроса VK CS объединяет все загруженные части в возрастающем порядке по номеру частей, создавая новый объект. В запросе на завершение многокомпонентной загрузки необходимо предоставить список частей. Для каждой части из списка следует предоставить номер части и значение заголовка ETag, возвращаемое после загрузки этой части.

Обработка запроса на завершение многокомпонентной загрузки может занять несколько минут. После начала обработки запроса, VK CS отправляет заголовок ответа HTTP, содержащий ответ «200 OK». Во время обработки запроса периодически отправляются пробельные символы для предотвращения превышения лимита времени ожидания. Так как ошибка может возникать в запросе после отправления первоначального ответа «200 OK», необходимо проверять тело ответа для определения успешности исполнения запроса.

Запрос:

```
POST /multipart-file.tar.gz?uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
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

Ответ:

```
HTTP/1.1 200 OK
Content-Length: 336
Content-Type: application/xml
Date: Mon, 31 Aug 2020 18:45:01 GMT
x-amz-request-id: tx00000000000000ab962c8-005991f6fe-66a8-ru-mska
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
  <CompleteMultipartUploadResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Location>my-test-bucket1.hb.bizmrg.com</Location>
    <Bucket>my-test-bucket1</Bucket>
    <Key>multipart-file.tar.gz</Key>
    <ETag>f935869350d7cbfcdd219df3f377531b-3</ETag>
  </CompleteMultipartUploadResult>
```

## Abort Multipart Upload

Операция прерывает многокомпонентную загрузку. После прерывания многокомпонентной загрузки невозможно загрузить дополнительные части, используя идентификатор загрузки прерванной многокомпонентной загрузки. Место, выделенное для хранения ранее загруженных частей, будет освобождено. При этом если происходит загрузка каких-либо частей, то такая операция может завершиться или прерваться. В результате этого может появиться необходимость многократного прерывания многокомпонентной загрузки для полного высвобождения пространства, занимаемого всеми частями.

Запрос:

```
DELETE /multipart-file.tar.gz?uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
Content-Length: 5242880
x-amz-content-sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date:20200831T202611Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=9e13d3f9e71ca5fb034fe66e92c60e30b3az3e177573702dd11d2b541358bf92
```

Ответ:

```
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:45:01 GMT
x-amz-request-id: tx00000000000000abbaefe-0059920764-66a8-ru-mska
Connection: close
```

## List Parts

Операция возвращает список частей, загруженных по определенной многокомпонентной загрузке. Операция должна включать в себя идентификатор загрузки, который получен после отправки запроса на инициализацию многокомпонентной загрузки. Такой запрос возвращает не более 1000 загруженных частей. Можно ограничить количество возвращаемых частей, указав параметр запроса max-parts. Если многокомпонентная загрузка состоит из более, чем 1000 частей, то ответ возвращает элемент NextPartNumberMarker и поле IsTruncated со значением true. В последующих запросах на просмотр списка частей можно включать параметр строки запроса part-number-marker, устанавливая для него значение поля NextPartNumberMarker из предыдущего ответа.

Запрос:

```
GET /?uploads&delimiter=Delimiter&encoding-type=EncodingType&key-marker=KeyMarker&max-uploads=MaxUploads&prefix=Prefix&upload-id-marker=UploadIdMarker HTTP/1.1

PUT /multipart-file.tar.gz?partNumber=1&uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
Content-Length: 5242880
x-amz-content-sha256: 6ab0931e613fd0cd39af0fa4733edb6ad942df0ad33e057713d44df7195b6ecf
x-amz-date: 20200831T184459Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=2e4adca0a3164af8717f340ca874b4f3036dd0294b590a70f2147427221ca1e8
```

Ответ:

```
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
      <DisplayName>VK CS_UserName</DisplayName>
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
