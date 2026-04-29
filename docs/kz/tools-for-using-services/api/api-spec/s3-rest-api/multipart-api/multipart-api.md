{include(/kz/_includes/_translated_by_ai.md)}

Құрамдас жүктеу объектілерді VK Object Storage жүйесінде бөліктер бойынша сақтауға мүмкіндік береді. Бұл үлкен объектілерді жүктеу немесе көшіру кезінде пайдалы болуы мүмкін. 100 МБ-тан бастап объектілер үшін құрамдас жүктеуді пайдалануды ұсынамыз.

Құрамдас жүктеу келесі қадамдардан тұрады:

- Initiate Multipart Upload — жүктеуді инициализациялау.
- Upload Part — объектіні бөліктер бойынша жүктеу.
- Complete Multipart Upload — бұрын жүктелген бөліктерді біріктіру арқылы жүктеуді аяқтау.
- Abort Multipart Upload — жүктеуді үзу
- List Parts — жүктелген бөліктердің тізімін қайтару.

## Initiate Multipart Upload

Операция құрамдас жүктеуді инициализациялайды және жүктеу идентификаторын қайтарады. Жүктеу идентификаторы бір құрамдас жүктеудің барлық бөліктерін біріктіру үшін қолданылады. Бұл жүктеу идентификаторын бөлікті жүктеуге арналған кейінгі әрбір сұрауда көрсету қажет.

Егер аяқталмаған құрамдас жүктеулерді үзуге арналған өмірлік цикл ережесі бапталған болса, жүктеу бакеттің өмірлік цикл конфигурациясында көрсетілген күндер саны ішінде аяқталуы тиіс. Әйтпесе аяқталмаған құрамдас жүктеу үшін үзу операциясы қолжетімді болып, сервис құрамдас жүктеуді үзеді.

{note:info}

Құрамдас жүктеуді инициализациялағаннан және бір немесе бірнеше бөлікті нақты жүктегеннен кейін, жүктелген бөліктерді сақтау үшін ақы есептеуді тоқтату мақсатында құрамдас жүктеуді аяқтау немесе үзу қажет. Құрамдас жүктеу аяқталғаннан немесе үзілгеннен кейін ғана VK Object Storage қоймада бөліктерге бөлінген орынды босатып, осы бөліктерді сақтау үшін ақы есептеуді тоқтатады.

{/note}

Сұрау:

```xml
POST /multipart-file.tar.gz?uploads HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date:20200831T174652Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e356966fff5a3d49d19c0e44e0fdba294964384a58061d3e60dfd1a4a5b605ad
```

Жауап:

```xml
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

Операция құрамдас жүктеудің бір бөлігін жүктейді. Бұл операцияны орындау үшін сұрауда бөліктің деректерін беру қажет. Қолданыстағы объектіден бөлікті жүктеу үшін бөлікті жүктеу (көшірме) операциясы қолданылады.

Бөлік 1-ден 10 000-ға дейінгі кез келген нөмірге ие бола алады. Бөлік нөмірі бөлікті және оның жасалып жатқан объектідегі орнын бірмәнді анықтайды. Егер бұрыннан бар бөліктердің бірінде қолданылған нөмір берілген жаңа бөлік жүктелсе, қолданыстағы бөлік қайта жазылады. Соңғы бөліктен басқа әрбір бөліктің көлемі кемінде 5 МБ болуы тиіс. Құрамдас жүктеудің соңғы бөлігіне өлшем бойынша шектеу қойылмайды.

Деректер желі арқылы берілген кезде бұрмаланбайтынына көз жеткізу үшін бөлікті жүктеу сұрауында Content-MD5 тақырыбын көрсету керек. VK Cloud бөліктердегі деректерді берілген MD5-хэш мәнімен салыстырады және сәйкес келмеген жағдайда қате қайтарады.

Сұрау:

```xml
PUT /multipart-file.tar.gz?partNumber=1&uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 5242880
x-amz-content-sha256: 6ab0931e613fd0cd39af0fa4733edb6ad942df0ad33e057713d44df7195b6ecf
x-amz-date: 20200831T184459Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=2e4adca0a3164af8717f340ca874b4f3036dd0294b590a70f2147427221ca1e8
```

Жауап:

```xml
HTTP/1.1 200 OK
Content-Length: 0
Content-Type: application/xml
Date: Mon, 31 Aug 2020 18:45:01 GMT
Etag: "d8d3ed3a4de016917a814a2cf5acad3c"
x-amz-request-id: tx00000000000000ab85dab-005991efac-66a8-ru-mska
Connection: close
```

## Complete Multipart Upload

Операция бұрын жүктелген бөліктерді біріктіру арқылы құрамдас жүктеуді аяқтайды. Бұл сұрауды алғаннан кейін VK Cloud барлық жүктелген бөліктерді бөлік нөмірлерінің өсу ретімен біріктіріп, жаңа объект жасайды. Құрамдас жүктеуді аяқтау сұрауында бөліктердің тізімін беру қажет. Тізімдегі әрбір бөлік үшін бөлік нөмірін және сол бөлік жүктелгеннен кейін қайтарылатын ETag тақырыбының мәнін көрсету керек.

Құрамдас жүктеуді аяқтау сұрауын өңдеу бірнеше минут алуы мүмкін. Сұрауды өңдеу басталғаннан кейін VK Cloud «200 OK» жауабын қамтитын HTTP жауап тақырыбын жібереді. Күту уақыты шегінен асып кетпеу үшін сұрауды өңдеу барысында мезгіл-мезгіл бос орын таңбалары жіберіліп тұрады. Қате бастапқы «200 OK» жауабы жіберілгеннен кейін де туындауы мүмкін болғандықтан, сұраудың сәтті орындалғанын анықтау үшін жауап денесін тексеру қажет.

Сұрау:

```xml
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

Жауап:

```xml
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

## Abort Multipart Upload

Операция құрамдас жүктеуді үзеді. Құрамдас жүктеу үзілгеннен кейін үзілген жүктеудің идентификаторын пайдаланып қосымша бөліктерді жүктеу мүмкін болмайды. Бұрын жүктелген бөліктерді сақтау үшін бөлінген орын босатылады. Бұл ретте қандай да бір бөліктер жүктеліп жатса, мұндай операция аяқталуы да, үзілуі де мүмкін. Нәтижесінде барлық бөліктер алып тұрған орынды толық босату үшін құрамдас жүктеуді бірнеше рет үзу қажет болуы мүмкін.

Сұрау:

```xml
DELETE /multipart-file.tar.gz?uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 5242880
x-amz-content-sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date:20200831T202611Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=9e13d3f9e71ca5fb034fe66e92c60e30b3az3e177573702dd11d2b541358bf92
```

Жауап:

```xml
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:45:01 GMT
x-amz-request-id: tx00000000000000abbaefe-0059920764-66a8-ru-mska
Connection: close
```

## List Parts

Операция белгілі бір құрамдас жүктеу бойынша жүктелген бөліктердің тізімін қайтарады. Операция құрамдас жүктеуді инициализациялау сұрауын жібергеннен кейін алынған жүктеу идентификаторын қамтуы тиіс. Мұндай сұрау 1000-нан көп емес жүктелген бөлікті қайтарады. Қайтарылатын бөліктер санын max-parts сұрау параметрін көрсету арқылы шектеуге болады. Егер құрамдас жүктеу 1000-нан астам бөліктен тұрса, жауапта NextPartNumberMarker элементі мен IsTruncated өрісі true мәнімен қайтарылады. Бөліктер тізімін көруге арналған кейінгі сұрауларда сұрау жолының part-number-marker параметрін қосып, оған алдыңғы жауаптағы NextPartNumberMarker өрісінің мәнін орнатуға болады.

Сұрау:

```xml
GET /?uploads&delimiter=Delimiter&encoding-type=EncodingType&key-marker=KeyMarker&max-uploads=MaxUploads&prefix=Prefix&upload-id-marker=UploadIdMarker HTTP/1.1

PUT /multipart-file.tar.gz?partNumber=1&uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 5242880
x-amz-content-sha256: 6ab0931e613fd0cd39af0fa4733edb6ad942df0ad33e057713d44df7195b6ecf
x-amz-date: 20200831T184459Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=2e4adca0a3164af8717f340ca874b4f3036dd0294b590a70f2147427221ca1e8
```

Жауап:

```xml
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
