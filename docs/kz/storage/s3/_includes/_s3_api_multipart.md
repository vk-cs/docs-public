Құрамдас жүктеу {var(s3)} ішінде объектілерді бөліктер бойынша сақтауға мүмкіндік береді. Бұл үлкен объектілерді жүктеу немесе көшіру кезінде пайдалы болуы мүмкін. 100 МБ-тан бастап объектілер үшін құрамдас жүктеуді пайдалануды ұсынамыз.

Құрамдас жүктеу келесі қадамдардан тұрады:

- {linkto(#api-spec-s3-create-multipart-upload)[text=%text]} — жүктеуді инициализациялау.
- {linkto(#api-spec-s3-upload-part)[text=%text]} — объект бөлігін жүктеу.
- {linkto(#api-spec-s3-complete-multipart-upload)[text=%text]} — бұрын жүктелген бөліктерді біріктіру арқылы жүктеуді аяқтау.
- {linkto(#api-spec-s3-abort-multipart-upload)[text=%text]} — жүктеуді болдырмау.
- {linkto(#api-spec-s3-list-parts)[text=%text]} — жүктелген бөліктер тізімін алу.

## {heading(CreateMultipartUpload)[id=api-spec-s3-create-multipart-upload]}

Операция құрамдас жүктеуді инициализациялайды және жүктеу идентификаторын қайтарады. Жүктеу идентификаторы бір құрамдас жүктеудің барлық бөліктерін біріктіру үшін пайдаланылады. Бөлікті жүктеуге арналған кейінгі әрбір сұрауда осы жүктеу идентификаторын көрсету қажет.

Егер аяқталмаған құрамдас жүктеулерді үзуге арналған өмірлік цикл ережесі бапталған болса, онда жүктеу бакеттің өмірлік цикл конфигурациясында көрсетілген күндер саны ішінде аяқталуы тиіс. Әйтпесе аяқталмаған құрамдас жүктеу үшін үзу операциясы қолжетімді болады және сервис құрамдас жүктеуді үзеді.

{ifdef(public)}
{note:info}
Құрамдас жүктеуді инициализациялағаннан және бір немесе бірнеше бөлікті нақты жүктегеннен кейін, жүктелген бөліктерді сақтау үшін төлемнің есептен шығарылуын тоқтату мақсатында құрамдас жүктеуді аяқтау немесе үзу қажет. Тек құрамдас жүктеу аяқталғаннан немесе үзілгеннен кейін ғана {var(s3)} қоймада бөліктерге берілген орынды босатады және осы бөліктерді сақтау үшін төлемді есептен шығаруды тоқтатады.
{/note}
{/ifdef}

Сұрау мысалы:

```curl
POST /multipart-file.tar.gz?uploads HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date:20200831T174652Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e356966fff5a3d49d19c0e44e0fdba294964384a58061d3e60dfd1a4a5b605ad
```

{ifdef(s3-pdf)}
Сұрау тақырыптарының сипаттамасы {linkto(#tab_request1)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_request1]} — Сұрау тақырыптары)[align=right;position=above;id=tab_request1;number={const(numb_tab_request1)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Тақырып
|Сипаттама

2+|**Объектілерді бұғаттау тақырыптары**

|`x-amz-object-lock-legal-hold`
|Объект үшін орнатылатын мерзімсіз бұғаттаудың статусы:

- `ON` — бұғаттау орнатылған
- `OFF` — бұғаттау орнатылмаған

|`x-amz-object-lock-mode`
|Объект үшін орнатылатын уақытша бұғаттаудың түрі:

- `GOVERNANCE` — уақытша басқарылатын бұғаттау.
- `COMPLIANCE` — уақытша қатаң бұғаттау

|`x-amz-object-lock-retain-until-date`
|Уақытша бұғаттаудың аяқталу күні мен уақыты

{ifdef(s3,s3-pdf)}

2+|**Объектілерді шифрлау тақырыптары**

2+|Егер барлық тақырыптар көрсетілсе, пайдаланушы кілтімен шифрлау қолданылады. Егер тек **x-amz-server-side-encryption** тақырыбы көрсетілсе, KMS генерациялаған кілттер арқылы шифрлау қолданылады

|`x-amz-server-side-encryption`
|Сақтау кезінде қолданылатын сервер жағындағы шифрлау алгоритмі. Жүктеу кезінде бакетте сақталған объект сервер жағында шифрланған болуы тиіс.

Мәні: `AES256`

|`x-amz-server-side-encryption-customer-algorithm`
|Пайдаланушы кілті үшін шифрлау алгоритмі.

Мәні: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Пайдаланушы кілті

|`x-amz-server-side-encryption-customer-key-MD5`
|Кілттің 128-bit MD5 хэшін көрсетеді. Шифрлау кілті қателерсіз берілгеніне көз жеткізу үшін хабарламаның тұтастығын тексеру

{/ifdef}

2+|**Объектілерді таңбалау тақырыптары**

|`x-amz-tagging`
|Объектіге тегтер қосу. URL сұрау параметрлері түрінде көрсетіледі: `tag1=value1&tag2=value2`
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

Жауап мысалы:

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

Операция құрамдас жүктеудің бір бөлігін жүктейді. Бұл операцияны орындау үшін сұрауда бөліктің деректерін беру қажет. Бар объектіден бөлікті жүктеу үшін бөлікті (көшірмені) жүктеу операциясы қолданылады.

Бөліктің нөмірі 1-ден 10 000-ға дейін (қоса алғанда) кез келген болуы мүмкін. Бөлік нөмірі бөлікті және оның жасалатын объектідегі орнын бірмәнді анықтайды. Егер жаңа бөлік жүктелсе және оған бұрыннан бар бөліктердің біріне пайдаланылған нөмір берілсе, онда бар бөлік қайта жазылады. Соңғысынан басқа әрбір бөліктің өлшемі кемінде 5 МБ болуы тиіс. Құрамдас жүктеудің соңғы бөлігі үшін өлшем бойынша шектеу жоқ.

Деректердің желі арқылы берілуі кезінде бұрмаланбағанына көз жеткізу үшін, бөлікті жүктеу сұрауында `Content-MD5` тақырыбын көрсету керек. {var(s3)} бөліктерден алынған деректерді берілген MD5-хэш мәнімен салыстырады және сәйкес келмеген жағдайда қате қайтарады.

Сұрау мысалы:

```curl
PUT /multipart-file.tar.gz?partNumber=1&uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 5242880
x-amz-content-sha256: 6ab0931e613fd0cd39af0fa4733edb6ad942df0ad33e057713d44df7195b6ecf
x-amz-date: 20200831T184459Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=2e4adca0a3164af8717f340ca874b4f3036dd0294b590a70f2147427221ca1e8
```

{ifdef(s3-pdf)}
Сұрау тақырыптарының сипаттамасы {linkto(#tab_request2)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_request2]} — Сұрау тақырыптары)[align=right;position=above;id=tab_request2;number={const(numb_tab_request2)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Тақырып
|Сипаттама

2+|**Объектілерді шифрлау тақырыптары**

|`x-amz-server-side-encryption-customer-algorithm`
|Пайдаланушы кілті үшін шифрлау алгоритмі.

Мәні: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Пайдаланушы кілті

|`x-amz-server-side-encryption-customer-key-MD5`
|Кілттің 128-bit MD5 хэшін көрсетеді. Шифрлау кілті қателерсіз берілгеніне көз жеткізу үшін хабарламаның тұтастығын тексеру
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

Жауап мысалы:

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

Операция бұрын жүктелген бөліктерді біріктіру арқылы құрамдас жүктеуді аяқтайды. Осы сұрау алынғаннан кейін {var(s3)} барлық жүктелген бөліктерді бөліктер нөмірінің өсу ретімен біріктіріп, жаңа объект жасайды. Құрамдас жүктеуді аяқтау сұрауында бөліктер тізімін беру қажет. Тізімдегі әрбір бөлік үшін бөлік нөмірін және осы бөлікті жүктегеннен кейін қайтарылатын ETag тақырыбының мәнін беру керек.

Құрамдас жүктеуді аяқтау сұрауын өңдеу бірнеше минут алуы мүмкін. Сұрауды өңдеу басталғаннан кейін {var(s3)} `200 OK` жауабын қамтитын HTTP жауап тақырыбын жібереді. Өңдеу барысында күту уақыты лимитінен асып кетуді болдырмау үшін мезгіл-мезгіл бос таңбалар жіберіледі. Қате бастапқы `200 OK` жауабы жіберілгеннен кейін сұрауда пайда болуы мүмкін болғандықтан, сұраудың сәтті орындалғанын анықтау үшін жауап денесін тексеру қажет.

Сұрау мысалы:

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
Сұрау тақырыптарының сипаттамасы {linkto(#tab_request3)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_request3]} — Сұрау тақырыптары)[align=right;position=above;id=tab_request3;number={const(numb_tab_request3)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Тақырып
|Сипаттама

2+|**Объектілерді шифрлау тақырыптары**

|`x-amz-server-side-encryption-customer-algorithm`
|Пайдаланушы кілті үшін шифрлау алгоритмі.

Мәні: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Пайдаланушы кілті

|`x-amz-server-side-encryption-customer-key-MD5`
|Кілттің 128-bit MD5 хэшін көрсетеді. Шифрлау кілті қателерсіз берілгеніне көз жеткізу үшін хабарламаның тұтастығын тексеру
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

Жауап мысалы:

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

Операция құрамдас жүктеуді үзеді. Құрамдас жүктеу үзілгеннен кейін, үзілген құрамдас жүктеудің идентификаторын пайдаланып қосымша бөліктерді жүктеу мүмкін емес. Бұрын жүктелген бөліктерді сақтау үшін бөлінген орын босатылады. Бұл ретте қандай да бір бөліктер жүктеліп жатса, мұндай операция аяқталуы немесе үзілуі мүмкін. Нәтижесінде барлық бөліктер алып тұрған кеңістікті толық босату үшін құрамдас жүктеуді бірнеше рет үзу қажеттілігі туындауы мүмкін.

Сұрау мысалы:

```curl
DELETE /multipart-file.tar.gz?uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 5242880
x-amz-content-sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date:20200831T202611Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=9e13d3f9e71ca5fb034fe66e92c60e30b3az3e177573702dd11d2b541358bf92
```

Жауап мысалы:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:45:01 GMT
x-amz-request-id: tx00000000000000abbaefe-0059920764-66a8-ru-mska
Connection: close
```

## {heading(ListParts)[id=api-spec-s3-list-parts]}

Операция белгілі бір құрамдас жүктеу бойынша жүктелген бөліктердің тізімін қайтарады. Операция құрамдас жүктеуді инициализациялау сұрауы жіберілгеннен кейін алынған жүктеу идентификаторын қамтуы тиіс. Мұндай сұрау 1000-нан артық жүктелген бөлікті қайтармайды. Қайтарылатын бөліктер санын `max-parts` сұрау параметрін көрсету арқылы шектеуге болады. Егер құрамдас жүктеу 1000-нан көп бөліктен тұрса, онда жауап `NextPartNumberMarker` элементін және `IsTruncated` өрісін `true` мәнімен қайтарады. Бөліктер тізімін қарауға арналған кейінгі сұрауларда сұрау жолының `part-number-marker` параметрін қосып, оған алдыңғы жауаптағы `NextPartNumberMarker` өрісінің мәнін орнатуға болады.

Сұрау мысалы:

```curl
GET /?uploads&delimiter=Delimiter&encoding-type=EncodingType&key-marker=KeyMarker&max-uploads=MaxUploads&prefix=Prefix&upload-id-marker=UploadIdMarker HTTP/1.1

PUT /multipart-file.tar.gz?partNumber=1&uploadId=2~iCw_lDY8VoBhoRrIJbPMrUqnE3Z-3Qh HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 5242880
x-amz-content-sha256: 6ab0931e613fd0cd39af0fa4733edb6ad942df0ad33e057713d44df7195b6ecf
x-amz-date: 20200831T184459Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=2e4adca0a3164af8717f340ca874b4f3036dd0294b590a70f2147427221ca1e8
```

Жауап мысалы:

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