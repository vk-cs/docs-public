Операции с Объектами:

*   Get - Скачать объект из бакета
*   Upload - Загрузить объект в бакет
*   Copy - Скопировать объект, находящийся в бакете
*   HeadObject - Получить информацию об объекте
*   Delete - Удалить объект
*   DeleteMultipleObjects - Удалить группу объектов по списку

Для всех операций с бакетами характерны типовые сообщения об ошибках, заголовки запросов и заголовки ответов. Если у операции есть специальные сообщения об ошибках, заголовки запросов или ответов, об этом будет указано в описании операции.

Get
---

Операция GET извлекает объект из бакета. Для выполнения операции необходимо обладать правами READ на объект.

Предоставив доступ READ анонимному пользователю, можно возвращать объект без использования заголовка авторизации.

У бакета нет иерархии каталогов, как в стандартной файловой системе. Тем не менее, можно создать логическую иерархию, используя имена ключей объектов, которые подразумевают структуру папок. Например, можно назвать объект не \`sample.jpg\`, а \`photos/2020/August/01.jpg\`.

Чтобы извлечь объект с такой логической иерархией, следует указать в операции GET полное имя объекта.

Запрос:

```
...
GET /example.txt HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T190539Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e912de79c88f07832558244bd867c3d834584c7f8b3d8efe4d0f0ba60b7a1dcb
'''
```

Ответ:

```
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

Upload
------

Операция PUT добавляет объект в бакет. Для выполнения операции необходимо обладать правами WRITE на бакет.

VK CS S3 добавляет объекты частично, если размер объекта превышает 50МБ. Если получен ответ об успешном выполнении, значит объект добавлен в бакет целиком.

При выполнении одновременных операций PUT и при наличии одинаковых загружаемых объектов, S3 перезаписывает всё, кроме последнего записанного объекта.

Чтобы предотвратить повреждение данных при прохождении сети, рекомендуется использовать заголовок \`Content-MD5\`, благодаря которому происходит сверка объекта с предоставленным значением MD5 и, в случае несовпадения, возвращает ошибку. Кроме того, можно вычислить MD5, помещая объект в бакет, и сравнить возвращаемый \`ETag\` с вычисленным значением MD5.

Запрос:

```
...
PUT /example.txt HTTP/1.1
Content-Length: 14
Content-Type: text/plain
Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: 003f0e5fe338b17be8be93fec537764ce199ac50f4e50f2685a753c4cc781747
x-amz-date: 20200831T194605Z
x-amz-meta-s3cmd-attrs:uid:1000/gname:asb/uname:asb/gid:1000/mode:33204/mtime:1499727909/atime:1499727909/md5:fb08934ef619f205f272b0adfd6c018c/ctime:1499713540
x-amz-storage-class: STANDARD
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-length;content-type;host;x-amz-content-sha256;x-amz-date;x-amz-meta-s3cmd-attrs;x-amz-storage-class,Signature=a9a9e16da23e0b37ae8362824de77d66bba2edd702ee5f291f6ecbb9ebac6013

Example text.
'''
```

Ответ:

```
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

Copy
----

Операция PUT может создать копию объекта, которая уже хранится в бакете. Операция копирования идентична последовательному выполнению GET и PUT. Добавление заголовка \`x-amz-copy-source\` в запрос приводит к тому, что операция PUT копирует исходный объект в целевой бакет.

При копировании объекта можно сохранить большую часть метаданных (по умолчанию) или указать новые метаданные. Для записи новых метаданных при копировании объекта необходимо включить в запрос заголовок \`x-amz-metadata-directive: REPLACE\`. Однако ACL не копируется - для пользователя, отправляющего запрос, новый объект будет частный.

Все запросы на копирование должны пройти проверку подлинности и не могут содержать текст сообщения. Кроме того, необходимо обладать доступом READ к исходному объекту и доступ WRITE к целевому бакету.

Запрос на копирование может вернуть ошибку в двух случаях. Это может произойти, когда получен запрос на копирование, либо когда происходит копирование объектов. Если ошибка возникает до начала операции копирования, будет получена стандартная ошибка. Если ошибка возникает во время операции копирования, ошибка будет встроена в ответ 200 OK. Это означает, что ответ 200 OK может содержать сообщение как об успехе, так и об ошибке.

Запрос:

```
...
PUT /copied-example.txt HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-copy-source: /static-images/example.txt
x-amz-date: 20200831T202253Z
x-amz-metadata-directive: COPY
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-copy-source;x-amz-date;x-amz-metadata-directive;x-amz-storage-class,Signature=0cb03470dd80bdd41a4b8fb06c1800b27a5059b61b0303fe589578835531c877
'''
```

Ответ:

```
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

HeadObject
----------

Операция HEAD извлекает метаданные из объекта без возвращения самого объекта. Данная операция используется только в том случае, если нужны только метаданные объекта. Для того, чтобы воспользоваться операцией HEAD, необходимо обладать правом READ на объект.

Для запроса операции HEAD указываются те же параметры, что и для операции GET для объекта. Ответ идентичен ответу GET, за исключением отсутствия тела ответа.

Если запрашиваемый объект не существует, то возвращаемая ошибка зависит от того, есть ли у учетной записи дополнительное разрешение \`s3:ListBucket\`.

\* Если есть разрешение \`s3:ListBucket\` на бакете, то возвращается HTTP ошибка 404.

\* Если нет, то возвращается HTTP ошибка 403.

Запрос:

```
...
HEAD /example.txt HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T185156Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
'''
```

Ответ:

```
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

Delete
------

Операции DELETE удаляет объект, указанный в запросе.

Запрос:

```
...
DELETE /sammy.png HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T194408Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=c2a46b21e2e8589dfbfa54382030bbef8108b2504a9f1d8aaba70fb0e1c46522
'''
```

Ответ:

```
...
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 19:44:09 GMT
x-amz-request-id: tx0000000000000027bbc48-005963d908-1268c-ru-mska
Connection: close
'''
```

DeleteMultipleObjects
---------------------

Удаляет объекты по списку ключей, переданному в запросе. Список на удаление может содержать не более 1000 ключей. Отсутствие объекта не является ошибкой — если объекта не существует, то в ответе он будет отмечен как удаленный.

Заголовки \`Content-MD5\` и \`Content-Length\` обязательны, а список ключей на удаление передаётся в XML формате.

Запрос:

```
...
DELETE /sammy.png HTTP/1.1
Host: [my-test-bucket1.hb.bizmrg.com](//my-test-bucket1.hb.bizmrg.com)
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

Ответ:

```
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