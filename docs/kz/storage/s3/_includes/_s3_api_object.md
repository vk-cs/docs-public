Объектілермен операциялар:

- {linkto(#api-spec-s3-get-object)[text=%text]} — бакеттен объектіні жүктеп алу.
- {linkto(#api-spec-s3-head-object)[text=%text]} — объект туралы ақпаратты алу.
- {linkto(#api-spec-s3-put-object)[text=%text]} — объектіні бакетке жүктеу.
- {linkto(#api-spec-s3-copy-object)[text=%text]} — бакетте орналасқан объектіні көшіру.
- {linkto(#api-spec-s3-delete-object)[text=%text]} — объектіні жою.
- {linkto(#api-spec-s3-delete-multiple-objects)[text=%text]} — тізім бойынша объектілер тобын жою.

## {heading(GetObject)[id=api-spec-s3-get-object]}

`GET` операциясы бакеттен объектіні шығарып алады. Операцияны орындау үшін объектіге `READ` құқықтары болуы қажет.

Анонимді пайдаланушыға `READ` қол жеткізуін бере отырып, авторизация тақырыбын пайдаланбай-ақ объектіні қайтаруға болады.

Бакетте стандартты файлдық жүйедегідей каталогтар иерархиясы жоқ. Дегенмен, каталогтары бар құрылымды меңзейтін объект кілттерінің атауларын пайдалану арқылы логикалық иерархия жасауға болады. Мысалы, объектіні `sample.jpg` емес, `photos/2020/August/01.jpg` деп атауға болады.

Осындай логикалық иерархиясы бар объектіні шығарып алу үшін `GET` операциясында объектінің толық атауын көрсету керек.

Сұрау мысалы:

```curl
...
GET /example.txt HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T190539Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e912de79c88f07832558244bd867c3d834584c7f8b3d8efe4d0f0ba60b7a1dcb
'''
```

Жауап мысалы:

```curl
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

{ifdef(s3-pdf)}
Жауап тақырыптарының сипаттамасы {linkto(#tab_response_headers)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_response_headers]} — Жауап тақырыптары)[align=right;position=above;id=tab_response_headers;number={const(numb_tab_response_headers)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Тақырып
|Сипаттама

{ifdef(s3,s3-pdf)}

2+|**Объектілерді шифрлау тақырыптары**

2+|Егер барлық тақырыптар көрсетілсе, пайдаланушы кілтімен шифрлау қолданылады. Егер тек **x-amz-server-side-encryption** көрсетілсе, KMS генерациялаған кілттер арқылы шифрлау қолданылады

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

|`x-amz-tagging-count`
|ACL-ді ескере отырып, объектіге байланыстырылған тегтер саны. Егер объектіде тегтер болмаса, жауапта бұл тақырып қайтарылмайды

{ifdef(s3,s3-pdf)}

2+|**Объектілерді жою маркерімен белгілеуді көрсету тақырыбы**

|`x-amz-delete-marker`
|Соңғы нұсқадағы объект сұралып тұрғанын және оның объектілерді жою маркерімен белгіленгенін (`true`) көрсетеді. Егер `false` болса, бұл жауап тақырыбы жауапта көрсетілмейді

{/ifdef}

2+|**Объектілерді бұғаттау жауап тақырыптары**

|`x-amz-object-lock-legal-hold`
|Объектіге орнатылған мерзімсіз бұғаттаудың статусы:

- `ON` — бұғаттау орнатылған
- `OFF` — бұғаттау орнатылмаған

|`x-amz-object-lock-mode`
|Объектіге орнатылған уақытша бұғаттаудың түрі:

- `GOVERNANCE` — уақытша басқарылатын бұғаттау
- `COMPLIANCE` — уақытша қатаң бұғаттау

|`x-amz-object-lock-retain-until-date`
|ISO8601 форматындағы уақытша бұғаттаудың аяқталу күні мен уақыты
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(HeadObject)[id=api-spec-s3-head-object]}

`HEAD` операциясы объектінің өзін қайтармай, объектіден метадеректерді шығарып алады. Бұл операция тек объектінің метадеректері ғана қажет болған жағдайда қолданылады. `HEAD` операциясын пайдалану үшін объектіге `READ` құқығы болуы қажет.

`HEAD` операциясын сұрау үшін {linkto(#api-spec-s3-get-object)[text=%text]} операциясындағыдай параметрлер көрсетіледі. Жауап `GET` жауабымен бірдей, тек жауап денесі болмайды.

Егер сұралатын объект жоқ болса, қайтарылатын қате есептік жазбада қосымша `s3:ListBucket` рұқсатының бар-жоғына байланысты болады.

- Егер бакетте `s3:ListBucket` рұқсаты болса, HTTP 404 қатесі қайтарылады.
- Егер болмаса, HTTP 403 қатесі қайтарылады.

Сұрау мысалы:

```curl
...
HEAD /example.txt HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T185156Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
'''
```

Жауап мысалы:

```curl
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

{ifdef(s3-pdf)}
Жауап тақырыптарының сипаттамасы {linkto(#tab_response_headers2)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_response_headers2]} — Жауап тақырыптары)[align=right;position=above;id=tab_response_headers2;number={const(numb_tab_response_headers2)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Тақырып
|Сипаттама

{ifdef(s3,s3-pdf)}

2+|**Объектілерді шифрлау тақырыптары**

2+|Егер барлық тақырыптар көрсетілсе, пайдаланушы кілтімен шифрлау қолданылады. Егер тек **x-amz-server-side-encryption** көрсетілсе, KMS генерациялаған кілттер арқылы шифрлау қолданылады

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

|`x-amz-tagging-count`
|ACL-ді ескере отырып, объектіге байланыстырылған тегтер саны. Егер объектіде тегтер болмаса, жауапта бұл тақырып қайтарылмайды

{ifdef(s3,s3-pdf)}

2+|**Объектілерді жою маркерімен белгілеуді көрсету тақырыбы**

|`x-amz-delete-marker`
|Соңғы нұсқадағы объект сұралып тұрғанын және оның объектілерді жою маркерімен белгіленгенін (`true`) көрсетеді. Егер `false` болса, бұл жауап тақырыбы жауапта көрсетілмейді

{/ifdef}

2+|**Объектілерді бұғаттау жауап тақырыптары**

|`x-amz-object-lock-legal-hold`
|Объектіге орнатылған мерзімсіз бұғаттаудың статусы:

- `ON` — бұғаттау орнатылған
- `OFF` — бұғаттау орнатылмаған

|`x-amz-object-lock-mode`
|Объектіге орнатылған уақытша бұғаттаудың түрі:

- `GOVERNANCE` — уақытша басқарылатын бұғаттау
- `COMPLIANCE` — уақытша қатаң бұғаттау

|`x-amz-object-lock-retain-until-date`
|ISO8601 форматындағы уақытша бұғаттаудың аяқталу күні мен уақыты
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(PutObject)[id=api-spec-s3-put-object]}

`PUT` операциясы бакетке объект қосады. Операцияны орындау үшін бакетке `WRITE` құқықтары болуы қажет.

Егер объект өлшемі 50 МБ-тан асса, {var(s3)} объектілерді ішінара қосады. Егер сәтті орындалғаны туралы жауап алынса, объект бакетке толық қосылғанын білдіреді.

`PUT` операциялары бір уақытта орындалғанда және жүктелетін объектілер бірдей болған жағдайда, {var(s3)} соңғы жазылған объектіден басқасының бәрін қайта жазады.

Желі арқылы өту кезінде деректердің бүлінуін болдырмау үшін `Content-MD5` тақырыбын пайдалануды ұсынамыз: ол объектіні берілген MD5 мәнімен салыстыруды қамтамасыз етеді және сәйкес келмеген жағдайда қате қайтарады. Сонымен қатар, объектіні бакетке орналастырған кезде MD5 есептеп, қайтарылатын `ETag` мәнін есептелген MD5 мәнімен салыстыруға болады.

Сұрау мысалы:

```curl
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

Жауап мысалы:

```curl
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
{ifdef(s3-pdf)}
Сұрау тақырыптарының сипаттамасы {linkto(#tab_request_headers2)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_request_headers2]} — Сұрау тақырыптары)[align=right;position=above;id=tab_request_headers2;number={const(numb_tab_request_headers2)}]}
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

2+|Егер барлық тақырыптар көрсетілсе, пайдаланушы кілтімен шифрлау қолданылады. Егер тек **x-amz-server-side-encryption** көрсетілсе, KMS генерациялаған кілттер арқылы шифрлау қолданылады

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

## {heading(CopyObject)[id=api-spec-s3-copy-object]}

`PUT` операциясы бакетте бұрыннан сақталған объектінің көшірмесін жасай алады. Көшіру операциясы {linkto(#api-spec-s3-get-object)[text=%text]} және {linkto(#api-spec-s3-put-object)[text=%text]} операцияларын тізбектей орындауға баламалы. Сұрауға `x-amz-copy-source` тақырыбын қосу `PUT` операциясының бастапқы объектіні мақсатты бакетке көшіруіне әкеледі.

Объектіні көшіру кезінде метадеректердің көп бөлігін (әдепкі бойынша) сақтауға немесе жаңа метадеректерді көрсетуге болады. Жаңа метадеректерді жазу үшін сұрауға `x-amz-metadata-directive: REPLACE` тақырыбын қосу қажет. Алайда ACL және ObjectLock көшірілмейді — сұрауды жіберген пайдаланушы үшін жаңа объект private болады.

Көшіруге арналған барлық сұраулар аутентификациядан өтуі тиіс және хабарлама мәтінін қамтымауы керек. Сонымен қатар, бастапқы объектіге `READ` қол жеткізуі және мақсатты бакетке `WRITE` қол жеткізуі болуы қажет.

Көшіру сұрауы екі жағдайда қате қайтара алады. Бұл көшіру сұрауы алынған кезде де, объектілерді көшіру жүріп жатқан кезде де болуы мүмкін. Егер қате көшіру операциясы басталғанға дейін пайда болса, стандартты қате алынады. Егер қате көшіру операциясы кезінде пайда болса, қате 200 OK жауабының ішіне енгізіледі. Бұл 200 OK жауабының ішінде әрі сәттілік, әрі қате туралы хабарлама болуы мүмкін екенін білдіреді.

Сұрау мысалы:

```curl
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

Жауап мысалы:

```curl
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

{ifdef(s3-pdf)}
Сұрау тақырыптарының сипаттамасы {linkto(#tab_request_headers3)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_request_headers3]} — Сұрау тақырыптары)[align=right;position=above;id=tab_request_headers3;number={const(numb_tab_request_headers3)}]}
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

2+|Егер барлық тақырыптар көрсетілсе, пайдаланушы кілтімен шифрлау қолданылады. Егер тек **x-amz-server-side-encryption** көрсетілсе, KMS генерациялаған кілттер арқылы шифрлау қолданылады

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
|Объектіге тегтер қосу. URL сұрау параметрлері түрінде көрсетіледі: `tag1=value1&tag2=value2`. `x-amz-tagging-directive` параметрімен бірге қолданылады:

|`x-amz-tagging-directive`
|Бастапқы объектіден объект тегтерінің жиыны көшірілетінін немесе сұрауда көрсетілген тегтер жиынымен ауыстырылатынын көрсетеді. Мүмкін мәндер: `COPY` (әдепкі бойынша), `REPLACE`

- Егер `x-amz-tagging-directive: REPLACE`, ал `x-amz-tagging` көрсетілген немесе бос болса, бастапқы объект тегтері ауыстырылады;
- Егер `x-amz-tagging-directive: COPY` немесе бос болса, ал `x-amz-tagging` көрсетілмесе, бастапқы объект тегтері көшіріледі;
- Егер `x-amz-tagging-directive` көрсетілмесе, ал `x-amz-tagging` көрсетілсе, `501 Not Implemented` қатесі қайтарылады
  |===
  {ifdef(s3-pdf)}
  {/caption}
  {/ifdef}

## {heading(DeleteObject)[id=api-spec-s3-delete-object]}

`DELETE` операциясы сұрауда көрсетілген объектіні жояды.

`GOVERNANCE` бұғаттауы орнатылған объектіні жою үшін сұрауда `x-amz-bypass-governance-retention` тақырыбын көрсетіңіз.

Сұрау мысалы:

```curl
...
DELETE /sammy.png HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T194408Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=c2a46b21e2e8589dfbfa54382030bbef8108b2504a9f1d8aaba70fb0e1c46522
'''
```

Жауап мысалы:

```curl
...
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 19:44:09 GMT
x-amz-request-id: tx0000000000000027bbc48-005963d908-1268c-ru-mska
Connection: close
'''
```

## {heading(DeleteMultipleObjects)[id=api-spec-s3-delete-multiple-objects]}

Сұрауда берілген кілттер тізімі бойынша объектілерді жояды. Жоюға арналған тізімде 1000-нан артық кілт болмауы мүмкін. Объектінің болмауы қате болып саналмайды — егер объект жоқ болса, жауапта ол жойылған ретінде белгіленеді.

`Content-MD5` және `Content-Length` тақырыптары міндетті, ал жоюға арналған кілттер тізімі XML форматында беріледі.

Әдісті орындау кезінде уақытша басқарылатын бұғаттауды айналып өту үшін сұрауда `x-amz-bypass-governance-retention` тақырыбын көрсетіңіз.

Сұрау мысалы:

```curl
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

Жауап мысалы:

```curl
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

