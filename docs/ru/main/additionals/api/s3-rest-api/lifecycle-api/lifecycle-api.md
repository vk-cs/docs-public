Все доступные методы для работы с жизненным циклом объектов:

- Get Bucket Lifecycle Configuration — просмотр конфигурации жизненного цикла в бакете.
- Configure Bucket Lifecycle — настройка правил конфигурации жизненного цикла.
- Delete Bucket Lifecycle — удаление конфигурации жизненного цикла.

Общий вид конфигурации:

```xml
<LifecycleConfiguration>
    <Rule>
        <ID>Описание правила</ID>
        <Status>{Enabled|Disabled}</Status>
        <Filter>
           <Prefix>префикс_ключа</Prefix>
        </Filter>

        <Transition>
            <StorageClass>Идентификатор класса хранилища</StorageClass>
            <!-- <Date> или <Days> -->
        </Transition>
        ...
        <Expiration>
            <!-- <Date> или <Days> -->
        </Expiration>
        ...
    </Rule>
    <Rule>
      ...
    </Rule>
    ...
</LifecycleConfiguration>
```

## Get Bucket Lifecycle Configuration

В конфигурации жизненного цикла для бакета можно указывать правило жизненного цикла с помощью префикса имени ключа объекта, одного или нескольких тегов объекта или сочетания обоих этих параметров. Ответ содержит элемент фильтра, которым можно воспользоваться для изменения параметров фильтра и выбора поднабора объектов, к которым должно быть применимо правило.

Операция GET возвращает информацию по конфигурации жизненного цикла, установленной для бакета.

Запрос:

```
GET /?lifecycle HTTP/1.1
Host: my-test-bucket1.hb.vkcs.cloud
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T001757Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e92e48fb16dad3d9d332460adde86493b8930262d9385e002b0408e17a2781f4
```

Ответ:

```xml
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 17:44:35 GMT
x-amz-request-id: tx000000000000000023935-005a613936-fcf92-ru-mska
Content-Type: application/xml
Content-Length: 488
Connection: close

<LifecycleConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Rule>
    <ID>Expire old logs</ID>
    <Prefix>logs/</Prefix>
    <Status>Enabled</Status>
    <Expiration>
      <Days>90</Days>
    </Expiration>
  </Rule>

  <Rule>
    <ID>Remove uncompleted uploads</ID>
    <Status>Enabled</Status>
    <Prefix/>
    <AbortIncompleteMultipartUpload>
      <DaysAfterInitiation>1</DaysAfterInitiation>
    </AbortIncompleteMultipartUpload>
  </Rule>
</LifecycleConfiguration>
```

## Configure Bucket Lifecycle

В конфигурации жизненного цикла для бакета можно указывать правило жизненного цикла с помощью префикса имени ключа объекта.

Операция PUT создает новую конфигурацию жизненного цикла для бакета или замещает существующую конфигурацию жизненного цикла.

Запрос:

```xml
PUT /?lifecycle HTTP/1.1
Host: my-test-bucket1.hb.vkcs.cloud
Content-Length: 488
Content-Type: application/xml
x-amz-content-sha256: 34850007f92ec3331486b48fd7db15f48315fe73c4a9b135e6d9fd629276c1e7
x-amz-date: 20200831T000345Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-md5;content-type;host;x-amz-content-sha256;x-amz-date,Signature=fc07a541c2acdbf7527eba358afa0a6d460c9bfec539dd29dfa6b5b854aae109

<LifecycleConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Rule>
    <ID>Expire old logs</ID>
    <Prefix>logs/</Prefix>
    <Status>Enabled</Status>
    <Expiration>
      <Days>90</Days>
    </Expiration>
  </Rule>

  <Rule>
    <ID>Remove uncompleted uploads</ID>
    <Status>Enabled</Status>
    <Prefix/>
    <AbortIncompleteMultipartUpload>
      <DaysAfterInitiation>1</DaysAfterInitiation>
    </AbortIncompleteMultipartUpload>
  </Rule>
</LifecycleConfiguration>
```

Ответ:

```xml
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 17:31:43 GMT
x-amz-request-id: tx00000000000000010ad2b-005a6135e2-f647d-ru-mska
Content-Length: 0
Content-Type: application/xml
Connection: close
```

## Delete Bucket Lifecycle

Операция DELETE удаляет конфигурацию жизненного цикла из указанного бакета. Удаляются все правила конфигурации жизненного цикла из подресурса жизненного цикла, связанного с бакетом, что позволяет исключать срок действия из объектов. Как следствие, сервис больше не будет автоматически удалять объекты согласно правилам, содержащимся в удаленной конфигурации жизненного цикла.

Запрос:

```
DELETE /?lifecycle HTTP/1.1
Host: my-test-bucket1.hb.vkcs.cloud
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T204101Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=376fe41764fe6493a33160b36055d8f617b92f9337bce0cf91bc9c5b1e7482b2
```

Ответ:

```xml
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 18:13:21 GMT
Connection: close
```
