{include(/kz/_includes/_translated_by_ai.md)}

Объектілердің өмірлік циклімен жұмыс істеуге арналған барлық қолжетімді әдістер:

- Get Bucket Lifecycle Configuration — бакеттегі өмірлік цикл конфигурациясын қарау.
- Configure Bucket Lifecycle — өмірлік цикл конфигурациясының ережелерін баптау.
- Delete Bucket Lifecycle — өмірлік цикл конфигурациясын жою.

Конфигурацияның жалпы көрінісі:

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

Бакет үшін өмірлік цикл конфигурациясында объект кілті атауының префиксі, бір немесе бірнеше объект тегі немесе осы екі параметрдің үйлесімі арқылы өмірлік цикл ережесін көрсетуге болады. Жауапта сүзгі параметрлерін өзгертуге және ереже қолданылуы тиіс объектілердің ішкі жиынын таңдауға болатын сүзгі элементі болады.

GET операциясы бакет үшін орнатылған өмірлік цикл конфигурациясы туралы ақпаратты қайтарады.

Сұрау:

```xml
GET /?lifecycle HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T001757Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e92e48fb16dad3d9d332460adde86493b8930262d9385e002b0408e17a2781f4
```

Жауап:

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

Бакет үшін өмірлік цикл конфигурациясында өмірлік цикл ережесін объект кілті атауының префиксі арқылы көрсетуге болады.

PUT операциясы бакет үшін жаңа өмірлік цикл конфигурациясын жасайды немесе қолданыстағы өмірлік цикл конфигурациясын ауыстырады.

Сұрау:

```xml
PUT /?lifecycle HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
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

Жауап:

```xml
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 17:31:43 GMT
x-amz-request-id: tx00000000000000010ad2b-005a6135e2-f647d-ru-mska
Content-Length: 0
Content-Type: application/xml
Connection: close
```

## Delete Bucket Lifecycle

DELETE операциясы көрсетілген бакеттен өмірлік цикл конфигурациясын жояды. Бакетпен байланыстырылған өмірлік цикл ішкі ресурсынан өмірлік цикл конфигурациясының барлық ережелері жойылады, бұл объектілердің жарамдылық мерзімін алып тастауға мүмкіндік береді. Нәтижесінде сервис енді жойылған өмірлік цикл конфигурациясындағы ережелерге сәйкес объектілерді автоматты түрде жоймайды.

Сұрау:

```xml
DELETE /?lifecycle HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T204101Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=376fe41764fe6493a33160b36055d8f617b92f9337bce0cf91bc9c5b1e7482b2
```

Жауап:

```xml
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 18:13:21 GMT
Connection: close
```
