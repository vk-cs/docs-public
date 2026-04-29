{include(/kz/_includes/_translated_by_ai.md)}

Объектілермен операциялар:

- Get - объектіні бакеттен жүктеп алу
- Upload - объектіні бакетке жүктеу
- Copy - бакетте орналасқан объектіні көшіру
- HeadObject - объект туралы ақпарат алу
- Delete - объектіні жою
- DeleteMultipleObjects - тізім бойынша объектілер тобын жою

Бакеттермен барлық операцияларға қателер туралы типтік хабарламалар, сұрау тақырыптары және жауап тақырыптары тән. Егер операцияда арнайы қате хабарламалары, сұрау немесе жауап тақырыптары болса, бұл операция сипаттамасында көрсетіледі.

## Get

GET операциясы объектіні бакеттен алады. Операцияны орындау үшін объектіге READ құқығы болуы қажет.

READ қолжетімділігін анонимді пайдаланушыға беру арқылы объектіні авторизация тақырыбын қолданбай-ақ қайтаруға болады.

Бакетте стандартты файл жүйесіндегідей каталогтар иерархиясы жоқ. Дегенмен, каталогтар құрылымын білдіретін объект кілттерінің атауларын пайдаланып, логикалық иерархия жасауға болады. Мысалы, объектіні \`sample.jpg\` емес, \`photos/2020/August/01.jpg\` деп атауға болады.

Осындай логикалық иерархиясы бар объектіні алу үшін GET операциясында объектінің толық атауын көрсету керек.

Сұрау:

```xml
...
GET /example.txt HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T190539Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e912de79c88f07832558244bd867c3d834584c7f8b3d8efe4d0f0ba60b7a1dcb
'''
```

Жауап:

```xml
...
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 19:05:39 GMT
x-amz-request-id: tx00000000000000279f46e-005963d003-1268c-ru-mska
Content-Type: text/plain
Content-Length: 14
Accept-Ranges: bytes
Last-Modified: Mon, 31 Aug 2020 19:05:09 GMT
Etag: "b3a92f49e7ae64acbf6b3e76f2040f5e"
Connection: close

Example text.
'''
```

## Upload

PUT операциясы объектіні бакетке қосады. Операцияны орындау үшін бакетке WRITE құқығы болуы қажет.

Егер объектінің өлшемі 50 МБ-тан асса, VK Object Storage объектілерді бөліктермен қосады. Егер сәтті орындалғаны туралы жауап алынса, бұл объектінің бакетке толық қосылғанын білдіреді.

Бір мезгілде PUT операциялары орындалғанда және жүктелетін объектілер бірдей болғанда, VK Object Storage соңғы жазылған объектіден басқасының бәрін қайта жазады.

Деректердің желі арқылы өту кезінде бүлінуін болдырмау үшін \`Content-MD5\` тақырыбын пайдалану ұсынылады, соның арқасында объект берілген MD5 мәнімен салыстырылады және сәйкес келмеген жағдайда қате қайтарылады. Бұдан бөлек, объектіні бакетке орналастырғанда MD5-ті есептеп, қайтарылатын \`ETag\` мәнін есептелген MD5 мәнімен салыстыруға болады.

Сұрау:

```xml
...
PUT /example.txt HTTP/1.1
Content-Length: 14
Content-Type: text/plain
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: 003f0e5fe338b17be8be93fec537764ce199ac50f4e50f2685a753c4cc781747
x-amz-date: 20200831T194605Z
x-amz-meta-s3cmd-attrs:uid:1000/gname:asb/uname:asb/gid:1000/mode:33204/mtime:1499727909/atime:1499727909/md5:fb08934ef619f205f272b0adfd6c018c/ctime:1499713540
x-amz-storage-class: STANDARD
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-length;content-type;host;x-amz-content-sha256;x-amz-date;x-amz-meta-s3cmd-attrs;x-amz-storage-class,Signature=a9a9e16da23e0b37ae8362824de77d66bba2edd702ee5f291f6ecbb9ebac6013

Example text.
'''
```

Жауап:

```xml
...
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 19:46:06 GMT
x-amz-request-id: tx0000000000000027bd57c-005963d97e-1268c-ru-mska
Content-Length: 0
Accept-Ranges: bytes
Last-Modified: Mon, 31 Aug 2020 19:05:09 GMT
Etag: "fb08934ef619f205f272b0adfd6c018c"
Connection: close
'''
```

## Copy

PUT операциясы бакетте сақталып тұрған объектінің көшірмесін жасай алады. Көшіру операциясы GET және PUT операцияларын тізбекті түрде орындауға ұқсас. Сұрауға \`x-amz-copy-source\` тақырыбын қосу PUT операциясының бастапқы объектіні мақсатты бакетке көшіруіне әкеледі.

Объектіні көшіру кезінде метадеректердің басым бөлігін (әдепкі бойынша) сақтауға немесе жаңа метадеректерді көрсетуге болады. Объектіні көшіру кезінде жаңа метадеректерді жазу үшін сұрауға \`x-amz-metadata-directive: REPLACE\` тақырыбын қосу қажет. Алайда ACL көшірілмейді — сұрауды жіберетін пайдаланушы үшін жаңа объект жеке болады.

Көшіруге арналған барлық сұраулар аутентификация тексеруінен өтуі тиіс және хабарлама мәтінін қамтымауы керек. Бұдан бөлек, бастапқы объектіге READ және мақсатты бакетке WRITE қолжетімділігі болуы қажет.

Көшіру сұрауы екі жағдайда қате қайтара алады. Бұл көшіру сұрауы алынған кезде де, объектілерді көшіру жүріп жатқан кезде де болуы мүмкін. Егер қате көшіру операциясы басталғанға дейін туындаса, стандартты қате алынады. Егер қате көшіру операциясы кезінде туындаса, қате 200 OK жауабының ішіне енгізіледі. Бұл 200 OK жауабында сәттілік туралы да, қате туралы да хабарлама болуы мүмкін дегенді білдіреді.

Сұрау:

```xml
...
PUT /copied-example.txt HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-copy-source: /static-images/example.txt
x-amz-date: 20200831T202253Z
x-amz-metadata-directive: COPY
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-copy-source;x-amz-date;x-amz-metadata-directive;x-amz-storage-class,Signature=0cb03470dd80bdd41a4b8fb06c1800b27a5059b61b0303fe589578835531c877
'''
```

Жауап:

```xml
...
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 20:22:54 GMT
x-amz-request-id: tx0000000000000027d8430-005963e21d-1268c-ru-mska
Content-Length: 183
Connection: close

<CopyObjectResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <LastModified>2020-08-31T20:22:54.167Z</LastModified>
  <ETag>7967bfe102f83fb5fc7e5a02bf05e8fc</ETag>
</CopyObjectResult>
'''
```

## HeadObject

HEAD операциясы объектінің өзін қайтармай-ақ одан метадеректерді алады. Бұл операция тек объектінің метадеректері ғана қажет болған жағдайда қолданылады. HEAD операциясын пайдалану үшін объектіге READ құқығы болуы қажет.

HEAD операциясына арналған сұрауда объектіге арналған GET операциясындағыдай параметрлер көрсетіледі. Жауап GET жауабымен бірдей, тек жауап денесі болмайды.

Егер сұратылған объекті жоқ болса, қайтарылатын қате есептік жазбада \`s3:ListBucket\` қосымша рұқсатының бар-жоғына байланысты болады.

* Егер бакетте \`s3:ListBucket\` рұқсаты болса, HTTP 404 қатесі қайтарылады.

* Егер болмаса, HTTP 403 қатесі қайтарылады.

Сұрау:

```xml
...
HEAD /example.txt HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T185156Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
'''
```

Жауап:

```xml
...
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:51:58 GMT
x-amz-request-id: tx0000000000000002ff1c9-00596912ce-6441-ru-mska
Content-Type: text/plain
Content-Length: 14
Accept-Ranges: bytes
Last-Modified: Mon, 31 Aug 2020 18:40:46 GMT
Etag: "b3a92f49e7ae64acbf6b3e76f2040f5e"
Connection: close
'''
```

## Delete

DELETE операциясы сұрауда көрсетілген объектіні жояды.

Сұрау:

```xml
...
DELETE /sammy.png HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T194408Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=c2a46b21e2e8589dfbfa54382030bbef8108b2504a9f1d8aaba70fb0e1c46522
'''
```

Жауап:

```xml
...
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 19:44:09 GMT
x-amz-request-id: tx0000000000000027bbc48-005963d908-1268c-ru-mska
Connection: close
'''
```

## DeleteMultipleObjects

Сұрауда берілген кілттер тізімі бойынша объектілерді жояды. Жою тізімінде 1000-нан көп емес кілт болуы мүмкін. Объектінің болмауы қате болып саналмайды — егер объект жоқ болса, жауапта ол жойылған ретінде белгіленеді.

\`Content-MD5\` және \`Content-Length\` тақырыптары міндетті, ал жойылатын кілттер тізімі XML пішімінде беріледі.

Сұрау:

```xml
...
DELETE /sammy.png HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 176
Content-MD5: 44c4dcd3d2f3645544a366ae481342fa
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T194408Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=c2a46b21e2e8589dfbfa54382030bbef8108b2504a9f1d8aaba70fb0e1c46522

<?xml version="1.0" encoding="UTF-8"?>
<Delete>
    <Object>
        <Key>picture.png</Key>
    </Object>
    <Object>
         <Key>picture2.jpg</Key>
    </Object>
</Delete>
'''
```

Жауап:

```xml
...
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 19:44:09 GMT
x-amz-request-id: tx0000000000000027bbc48-005963d908-1268c-ru-mska
Connection: close

<DeleteResult>
  <Deleted>
    <Key>picture.png</Key>
  </Deleted>
  <Error>
    <Key>some/another/key.txt</Key>
    <Code>TextErrorCode</Code>
    <Message>Describing message</Message>
  </Error>
</DeleteResult>
'''
```
