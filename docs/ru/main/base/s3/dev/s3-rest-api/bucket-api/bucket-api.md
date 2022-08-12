Операции с Бакетами:

- Create — создать бакет.
- ListBuckets — получить список бакетов.
- HeadBucket — проверка наличия бакета и доступа к нему.
- ListObjects — получить список объектов бакета.
- DeleteBucket — удалить бакет.

Для всех операций с бакетами характерны типовые сообщения об ошибках, заголовки запросов и заголовки ответов. Если у операции есть специальные сообщения об ошибках, заголовки запросов или ответов, об этом будет указано в описании операции.

## CreateBucket

Операция PUT создает новый бакет. Для создания бакета необходимо пройти регистрацию на платформе VK Cloud и получить ключ доступа для авторизации запросов. Создание бакетов с помощью анонимных запросов невозможно. Инициатор запроса создания бакета автоматически становится его владельцем.

При использовании операции по созданию бакета можно указать проекты или группы, которым необходимо предоставить определенные права на бакет, а также указать класс хранения: hotbox или icebox. Существует два способа предоставления прав при помощи заголовков запроса:

- Указание готового ACL в запросе с помощью заголовка x-amz-acl в запросе.
- Указание явным образом права доступа с помощью заголовков \`x-amz-grant-read\`, \`x-amz-grant-write\`, \`x-amz-grant-read-acp\`, \`x-amz-grant-write-acp\`, \`x-amz-grant-full-control\` в запросе.

Возможно использование готового ACL или указать права доступа явным образом, но использовать оба способа одновременно невозможно.

Запрос:

```
...
PUT / HTTP/1.1
Host: my-test-bucket1.bizmrg.com
x-amz-acl: public-read
x-amz-content-sha256: c6f1fc479f5f690c443b73a258aacc06ddad09eca0b001e9640ff2cd56fe5710
x-amz-date: 20200831T173143Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-acl;x-amz-content-sha256;x-amz-date,Signature=6cab03bef74a80a0441ab7fd33c829a2cdb46bba07e82da518cdb78ac238fda5

<CreateBucketConfiguration>
  <LocationConstraint>ru-msk</LocationConstraint>
</CreateBucketConfiguration>
...
```

Ответ:

```
...
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 17:31:43 GMT
Content-Length: 0
Content-Type: text/plain;charset=utf-8
Connection: close
...
```

## ListBuckets

Операция GET вернет список существующих бакетов в проекте.

Запрос:

```
...
GET / HTTP/1.1
Host: hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T183940Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=245e867a6a653b7b88cbb71a734dacf2cbb4ba927d9aa5fdce57c85ab4f2b40b
...
```

Ответ:

```
...
HTTP/1.1 200 OK
x-amz-request-id: tx000000000000002ba2427-0059651b6d-1268c-ru-mska
Date: Mon, 31 Aug 2020 17:31:43 GMT
Content-Length: 525
Content-Type: text/plain
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
  <ListAllMyBucketsResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Owner>
      <ID>6174283</ID>
      <DisplayName>6174283</DisplayName>
    </Owner>
    <Buckets>
      <Bucket>
        <Name>static-images</Name>
        <CreationDate>2020-08-31T18:37:48.157Z</CreationDate>
      </Bucket>
    <Buckets>
      <Bucket>
        <Name>log-files</Name>
        <CreationDate>2020-08-31T18:37:48.157Z</CreationDate>
      </Bucket>
    </Buckets>
  </ListAllMyBucketsResult>
...
```

## ListObjects

Операция GET возвращает некоторые или все (до 1000) объекты в бакете. Можно использовать параметры запроса в качестве критериев выборки, чтобы отфильтровать объекты в бакете.

Для успешного выполнения операции, необходимо обладать правами на чтение бакета (READ).

Запрос:

```
...
GET / HTTP/1.1
Host: my-test-bucket1.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T172613Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=de1bf8931e315c0576edb81a7d8be98874e847548fc70682f6c646e1cfd9177a
...
```

Ответ:

```
...
HTTP/1.1 200 OK
x-amz-request-id: tx00000000000000029ac87-0059690330-8d1a-ru-mska
Date: Mon, 31 Aug 2020 17:31:43 GMT
Content-Length: 858
Content-Type: application/xml
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
<ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Name>static-images</Name>
  <Prefix/>
  <MaxKeys>1000</MaxKeys>
  <IsTruncated>false</IsTruncated>
  <Contents>
    <Key>example.txt</Key>
    <LastModified>2020-08-31T18:40:46.777Z</LastModified>
    <ETag>"b3a92f49e7ae64acbf6b3e76f2040f5e"</ETag>
    <Size>14</Size>
    <StorageClass>STANDARD</StorageClass>
    <Owner>
      <ID>6174283</ID>
      <DisplayName>6174283</DisplayName>
    </Owner>
  </Contents>
  <Contents>
    <Key>sammy.png</Key>
    <LastModified>2020-08-31T17:44:03.597Z</LastModified>
    <ETag>"fb08934ef619f205f272b0adfd6c018c"</ETag>
    <Size>35369</Size>
    <StorageClass>STANDARD</StorageClass>
    <Owner>
      <ID>6174283</ID>
      <DisplayName>6174283</DisplayName>
    </Owner>
  </Contents>
</ListBucketResult>
...
```

## HeadBucket

Операция используется для определения существования бакета и наличия разрешения доступа к нему. Операция возвращает HTTP статус 200, если бакет существует с разрешением доступа к нему. Иначе операция может вернёт либо HTTP ошибку 404, либо 403.

Запрос:

```
...
HEAD / HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20170714T185156Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
...
```

Ответ:

```
...
HTTP/1.1 200 OK
x-amz-id-2: JuKZqmXuiwFeDQxhD7M8KtsKobSzWA1QEjLbTMTagkKdBX2z7Il/jGhDeJ3j6s80
x-amz-request-id: 32FE2CEB32F5EE25
x-amz-bucket-region: ru-msk
Date: Mon, 31 Aug 2020 21:34:56 GMT
Connection: close
...
```

## DeleteBucket

Операция DELETE удаляет бакет, указанный в запросе. Успех выполнения операции будет обозначен HTTP статусом 204.

Если получен HTTP статус 409, то удаление невозможно, так как в бакете есть объекты. Необходимо удалить все объекты из бакета, а затем попробовать снова.

Запрос:

```
...
DELETE / HTTP/1.1
Host: my-test-bucket1.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20170710T181321Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=b0558a25e794bced1ca9b620b4318bb8eb62ddbd34e2b9c1921034bc5acd597b
...
```

Ответ:

```
...
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 18:13:21 GMT
Connection: close
...
```
