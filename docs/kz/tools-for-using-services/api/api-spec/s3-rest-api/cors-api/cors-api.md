{include(/kz/_includes/_translated_by_ai.md)}

VK Object Storage сервисі бакеттің CORS конфигурациясын басқаруға мүмкіндік береді. CORS конфигурациясын жүктеу үшін XML құжатын жасау қажет.

Бакеттің CORS конфигурациялары үшін қолжетімді әдістер тізімі:

- Get Bucket CORS — бакет үшін CORS конфигурацияларының тізімін алу.
- Set Bucket CORS — CORS конфигурациясын орнату.
- Delete Bucket CORS — CORS конфигурациясын жою.

## CORS XML конфигурациясының жалпы көрінісі

```xml
<CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>URL</AllowedOrigin>
        <AllowedMethod>HTTP_Method</AllowedMethod>
        <AllowedHeader>Header_Name</AllowedHeader>
        ...
    </CORSRule>
    ...
</CORSConfiguration>
```

## Get Bucket CORS

Операция бакет үшін орнатылған CORS конфигурациясы туралы ақпаратты қайтарады.

Бұл операцияны пайдалану үшін WRITE_ACP жазу құқығы болуы қажет. Бакет иесінде бұл рұқсат әдепкі бойынша бар және ол оны басқа пайдаланушыларға бере алады.

Сұрау:

```xml
GET /?cors HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T185319Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=f7d7879992a9f3a06ddacd59e53ac318e99b2ed6230692b30099739e34469a91
```

Жауап:

```xml
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:53:20 GMT
x-amz-request-id: tx00000000000000279651f-005963cd20-1268c-ru-mska
Content-Type: application/xml
Content-Length: 430
Connection: close

<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <CORSRule>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>DELETE</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedOrigin>http://example.com</AllowedOrigin>
    <AllowedHeader>\*</AllowedHeader>
  </CORSRule>
  <CORSRule>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedOrigin>\*</AllowedOrigin>
  </CORSRule>
</CORSConfiguration>
```

## Set Bucket CORS

PUT операциясы бакет үшін CORS конфигурациясын орнатады. Егер конфигурация бұрыннан бар болса, ол қайта жазылады.

Бұл операцияны пайдалану үшін WRITE_ACP жазу құқығы болуы қажет.

Бұл конфигурацияны бакетке Cross-origin сұрауларын өңдей алатындай етіп орнатуға болады. Мысалы, XMLHttpRequest браузерінің функционалын пайдаланып, http://www.example.com көзінен my.example.bucket.com бакетіне сұрауға қолжетімділік беруге болады.

Әртүрлі көздер арасындағы ресурстарды ортақ пайдалануын (CORS) рұқсат ету үшін бакетке CORS ішкі ресурсын қосу қажет. CORS ішкі ресурсы — сіздің бакетте қолдануға болатын көздер мен HTTP әдістерін анықтайтын ережелер бапталатын XML құжаты. Құжаттың ең үлкен өлшемі — 64 КБ. Мысалы, бакеттегі CORS конфигурациясында төмендегі екі ереже орнатылуы мүмкін:

- Бірінші CORSRule ережесі https://www.example.com көздерінен келетін PUT, POST және DELETE Cross-origin сұрауларын пайдалануға рұқсат береді. Бұл ереже сондай-ақ Access-Control-Request-Headers тақырыбы арқылы OPTIONS алдын ала сұрауында барлық тақырыптарды пайдалануға мүмкіндік береді. Демек, кез келген OPTIONS алдын ала сұрауына жауап ретінде сервис сұралған кез келген тақырыпты қайтарады.
- Второе правило разрешает использовать Cross-origin-запросы GET со всех источников. Подстановочный знак «\*» указывает на возможность использования любого источника.

Сұрау:

```xml
PUT /?cors HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 374
Content-Type: application/xml
x-amz-content-sha256: 745320970930725bd18820ec990f7334960f0a47358be189e77504cc094be77e
x-amz-date: 20200831T185043Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-md5;content-type;host;x-amz-content-sha256;x-amz-date,Signature=f52b2bfb6ec975c86cadd2e51a6ee9842c6151b737e46ce90a3cb3cc0d0dea97

<CORSConfiguration>
 <CORSRule>
   <AllowedOrigin>http://example.com</AllowedOrigin>


   <AllowedMethod>PUT</AllowedMethod>
   <AllowedMethod>POST</AllowedMethod>
   <AllowedMethod>DELETE</AllowedMethod>


   <AllowedHeader>\*</AllowedHeader>
 </CORSRule>
 <CORSRule>
   <AllowedOrigin>\*</AllowedOrigin>
   <AllowedMethod>GET</AllowedMethod>
 </CORSRule>
</CORSConfiguration>
```

Жауап:

```xml
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:50:44 GMT
x-amz-request-id: tx0000000000000027946fc-005963cc84-1268c-ru-mska
Content-Type: application/xml
Content-Length: 0
Connection: close
```

## Delete Bucket CORS

DELETE операциясы бакет үшін орнатылған CORS конфигурациясы туралы ақпаратты жояды.

Бұл операцияны пайдалану үшін WRITE_ACP жазу құқығы болуы қажет.

Сұрау:

```xml
DELETE /?cors HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T182537Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-md5;content-type;host;x-amz-content-sha256;x-amz-date,Signature=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

Жауап:

```xml
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 18:25:38 GMT
x-amz-request-id: tx0000000000000002fae1f-0059690ca2-6441-ru-mska
Connection: close
```
