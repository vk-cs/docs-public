Операции с объектами:

- {linkto(#api-spec-s3-get-object)[text=%text]} — скачать объект из бакета.
- {linkto(#api-spec-s3-head-object)[text=%text]} — получить информацию об объекте.
- {linkto(#api-spec-s3-put-object)[text=%text]} — загрузить объект в бакет.
- {linkto(#api-spec-s3-copy-object)[text=%text]} — скопировать объект, находящийся в бакете.
- {linkto(#api-spec-s3-delete-object)[text=%text]} — удалить объект.
- {linkto(#api-spec-s3-delete-multiple-objects)[text=%text]} — удалить группу объектов по списку.

## {heading(GetObject)[id=api-spec-s3-get-object]}

Операция `GET` извлекает объект из бакета. Для выполнения операции необходимо обладать правами `READ` на объект.

Предоставив доступ `READ` анонимному пользователю, можно возвращать объект без использования заголовка авторизации.

У бакета нет иерархии каталогов, как в стандартной файловой системе. Тем не менее, можно создать логическую иерархию, используя имена ключей объектов, которые подразумевают структуру с директориями. Например, можно назвать объект не `sample.jpg`, а `photos/2020/August/01.jpg`.

Чтобы извлечь объект с такой логической иерархией, следует указать в операции `GET` полное имя объекта.

Пример запроса:

```curl
...
GET /example.txt HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T190539Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e912de79c88f07832558244bd867c3d834584c7f8b3d8efe4d0f0ba60b7a1dcb
'''
```

Пример ответа:

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
Описание заголовков ответов приведено в {linkto(#tab_response_headers)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_response_headers]} — Заголовки ответов)[align=right;position=above;id=tab_response_headers;number={const(numb_tab_response_headers)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Заголовок
|Описание

{ifdef(s3,s3-pdf)}

2+|**Заголовки шифрования объектов**

2+|Если указаны все заголовки, используется шифрование пользовательским ключом. Если указан только **x-amz-server-side-encryption**, используется шифрование с помощью ключей, сгенерированных KMS

|`x-amz-server-side-encryption`
|Алгоритм шифрования на стороне сервера, используемый при хранении. При загрузке объект, сохраненный в бакете, должен быть зашифрован на стороне сервера.

Значение: `AES256`

|`x-amz-server-side-encryption-customer-algorithm`
|Алгоритм шифрования для пользовательского ключа.

Значение: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Пользовательский ключ

|`x-amz-server-side-encryption-customer-key-MD5`
|Указывает 128-bit MD5 хеш ключа. Проверка целостности сообщения, чтобы убедиться, что ключ шифрования был передан без ошибок

{/ifdef}

2+|**Заголовки маркировки объектов**

|`x-amz-tagging-count`
|Количество тегов, привязанных к объекту, с учетом ACL. Если у объекта нет тегов, заголовок в ответе не возвращается

{ifdef(s3,s3-pdf)}

2+|**Заголовок указания пометки маркером удаления объектов**

|`x-amz-delete-marker`
|Указывает, что запрашивается объект последней версии и он помечен маркером удаления объектов (`true`). Если `false`, этот заголовок ответа не отображается в ответе

{/ifdef}

2+|**Заголовок ответов блокировки объектов**

|`x-amz-object-lock-legal-hold`
|Статус бессрочной блокировки, установленной на объект:

- `ON` — блокировка установлена
- `OFF` — блокировка не установлена

|`x-amz-object-lock-mode`
|Тип временной блокировки, установленной на объект:

- `GOVERNANCE` — временная управляемая блокировка
- `COMPLIANCE` — временная строгая блокировка

|`x-amz-object-lock-retain-until-date`
|Дата и время окончания временной блокировки в формате ISO8601
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(HeadObject)[id=api-spec-s3-head-object]}

Операция `HEAD` извлекает метаданные из объекта без возвращения самого объекта. Данная операция используется только в том случае, если нужны только метаданные объекта. Чтобы воспользоваться операцией `HEAD`, необходимо обладать правом `READ` на объект.

Для запроса операции `HEAD` указываются те же параметры, что и для операции {linkto(#api-spec-s3-get-object)[text=%text]}. Ответ идентичен ответу `GET`, за исключением отсутствия тела ответа.

Если запрашиваемый объект не существует, то возвращаемая ошибка зависит от того, есть ли у учетной записи дополнительное разрешение `s3:ListBucket`.

- Если есть разрешение `s3:ListBucket` на бакете, то возвращается HTTP ошибка 404.
- Если нет, то возвращается HTTP ошибка 403.

Пример запроса:

```curl
...
HEAD /example.txt HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T185156Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
'''
```

Пример ответа:

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
Описание заголовков ответов приведено в {linkto(#tab_response_headers2)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_response_headers2]} — Заголовки ответов)[align=right;position=above;id=tab_response_headers2;number={const(numb_tab_response_headers2)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Заголовок
|Описание

{ifdef(s3,s3-pdf)}

2+|**Заголовки шифрования объектов**

2+|Если указаны все заголовки, используется шифрование пользовательским ключом. Если указан только **x-amz-server-side-encryption**, используется шифрование с помощью ключей, сгенерированных KMS

|`x-amz-server-side-encryption`
|Алгоритм шифрования на стороне сервера, используемый при хранении. При загрузке объект, сохраненный в бакете, должен быть зашифрован на стороне сервера.

Значение: `AES256`

|`x-amz-server-side-encryption-customer-algorithm`
|Алгоритм шифрования для пользовательского ключа.

Значение: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Пользовательский ключ

|`x-amz-server-side-encryption-customer-key-MD5`
|Указывает 128-bit MD5 хеш ключа. Проверка целостности сообщения, чтобы убедиться, что ключ шифрования был передан без ошибок

{/ifdef}

2+|**Заголовки маркировки объектов**

|`x-amz-tagging-count`
|Количество тегов, привязанных к объекту, с учетом ACL. Если у объекта нет тегов, заголовок в ответе не возвращается

{ifdef(s3,s3-pdf)}

2+|**Заголовок указания пометки маркером удаления объектов**

|`x-amz-delete-marker`
|Указывает, что запрашивается объект последней версии и он помечен маркером удаления объектов (`true`). Если `false`, этот заголовок ответа не отображается в ответе

{/ifdef}

2+|**Заголовок ответов блокировки объектов**

|`x-amz-object-lock-legal-hold`
|Статус бессрочной блокировки, установленной на объект:

- `ON` — блокировка установлена
- `OFF` — блокировка не установлена

|`x-amz-object-lock-mode`
|Тип временной блокировки, установленной на объект:

- `GOVERNANCE` — временная управляемая блокировка
- `COMPLIANCE` — временная строгая блокировка

|`x-amz-object-lock-retain-until-date`
|Дата и время окончания временной блокировки в формате ISO8601
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(PutObject)[id=api-spec-s3-put-object]}

Операция `PUT` добавляет объект в бакет. Для выполнения операции необходимо обладать правами `WRITE` на бакет.

{var(s3)} добавляет объекты частично, если размер объекта превышает 50 МБ. Если получен ответ об успешном выполнении, значит объект добавлен в бакет целиком.

При выполнении одновременных операций `PUT` и при наличии одинаковых загружаемых объектов, {var(s3)} перезаписывает всё, кроме последнего записанного объекта.

Чтобы предотвратить повреждение данных при прохождении сети, рекомендуется использовать заголовок `Content-MD5`, благодаря которому происходит сверка объекта с предоставленным значением MD5 и, в случае несовпадения, возвращает ошибку. Кроме того, можно вычислить MD5, помещая объект в бакет, и сравнить возвращаемый `ETag` с вычисленным значением MD5.

Пример запроса:

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

Пример ответа:

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
Описание заголовков запросов приведено в {linkto(#tab_request_headers2)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_request_headers2]} — Заголовки запроса)[align=right;position=above;id=tab_request_headers2;number={const(numb_tab_request_headers2)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Заголовок
|Описание

2+|**Заголовки блокировки объектов**

|`x-amz-object-lock-legal-hold`
|Статус бессрочной блокировки, устанавливаемой на объект:

- `ON` — блокировка установлена
- `OFF` — блокировка не установлена

|`x-amz-object-lock-mode`
|Тип временной блокировки, устанавливаемой на объект:

- `GOVERNANCE` — временная управляемая блокировка.
- `COMPLIANCE` — временная строгая блокировка

|`x-amz-object-lock-retain-until-date`
|Дата и время окончания временной блокировки

{ifdef(s3,s3-pdf)}

2+|**Заголовки шифрования объектов**

2+|Если указаны все заголовки, используется шифрование пользовательским ключом. Если указан только **x-amz-server-side-encryption**, используется шифрование с помощью ключей, сгенерированных KMS

|`x-amz-server-side-encryption`
|Алгоритм шифрования на стороне сервера, используемый при хранении. При загрузке объект, сохраненный в бакете, должен быть зашифрован на стороне сервера.

Значение: `AES256`

|`x-amz-server-side-encryption-customer-algorithm`
|Алгоритм шифрования для пользовательского ключа.

Значение: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Пользовательский ключ

|`x-amz-server-side-encryption-customer-key-MD5`
|Указывает 128-bit MD5 хеш ключа. Проверка целостности сообщения, чтобы убедиться, что ключ шифрования был передан без ошибок

{/ifdef}

2+|**Заголовки маркировки объектов**

|`x-amz-tagging`
|Добавление тегов объекту. Указываются в виде параметров запроса URL: `tag1=value1&tag2=value2`
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CopyObject)[id=api-spec-s3-copy-object]}

Операция `PUT` может создать копию объекта, которая уже хранится в бакете. Операция копирования идентична последовательному выполнению {linkto(#api-spec-s3-get-object)[text=%text]} и {linkto(#api-spec-s3-put-object)[text=%text]}. Добавление заголовка `x-amz-copy-source` в запрос приводит к тому, что операция `PUT` копирует исходный объект в целевой бакет.

При копировании объекта можно сохранить большую часть метаданных (по умолчанию) или указать новые метаданные. Для записи новых метаданных при копировании объекта необходимо включить в запрос заголовок `x-amz-metadata-directive: REPLACE`. Однако ACL и ObjectLock не копируется - для пользователя, отправляющего запрос, новый объект будет частный.

Все запросы на копирование должны пройти проверку подлинности и не могут содержать текст сообщения. Кроме того, необходимо обладать доступом `READ` к исходному объекту и доступ `WRITE` к целевому бакету.

Запрос на копирование может вернуть ошибку в двух случаях. Это может произойти, когда получен запрос на копирование, либо когда происходит копирование объектов. Если ошибка возникает до начала операции копирования, будет получена стандартная ошибка. Если ошибка возникает во время операции копирования, ошибка будет встроена в ответ 200 OK. Это означает, что ответ 200 OK может содержать сообщение как об успехе, так и об ошибке.

Пример запроса:

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

Пример ответа:

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
Описание заголовков запросов приведено в {linkto(#tab_request_headers3)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_request_headers3]} — Заголовки запроса)[align=right;position=above;id=tab_request_headers3;number={const(numb_tab_request_headers3)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Заголовок
|Описание

2+|**Заголовки блокировки объектов**

|`x-amz-object-lock-legal-hold`
|Статус бессрочной блокировки, устанавливаемой на объект:

- `ON` — блокировка установлена
- `OFF` — блокировка не установлена

|`x-amz-object-lock-mode`
|Тип временной блокировки, устанавливаемой на объект:

- `GOVERNANCE` — временная управляемая блокировка.
- `COMPLIANCE` — временная строгая блокировка

|`x-amz-object-lock-retain-until-date`
|Дата и время окончания временной блокировки

{ifdef(s3,s3-pdf)}

2+|**Заголовки шифрования объектов**

2+|Если указаны все заголовки, используется шифрование пользовательским ключом. Если указан только **x-amz-server-side-encryption**, используется шифрование с помощью ключей, сгенерированных KMS

|`x-amz-server-side-encryption`
|Алгоритм шифрования на стороне сервера, используемый при хранении. При загрузке объект, сохраненный в бакете, должен быть зашифрован на стороне сервера.

Значение: `AES256`

|`x-amz-server-side-encryption-customer-algorithm`
|Алгоритм шифрования для пользовательского ключа.

Значение: `AES256`

|`x-amz-server-side-encryption-customer-key`
|Пользовательский ключ

|`x-amz-server-side-encryption-customer-key-MD5`
|Указывает 128-bit MD5 хеш ключа. Проверка целостности сообщения, чтобы убедиться, что ключ шифрования был передан без ошибок

{/ifdef}

2+|**Заголовки маркировки объектов**

|`x-amz-tagging`
|Добавление тегов объекту. Указываются в виде параметров запроса URL: `tag1=value1&tag2=value2`. Используется совместно с `x-amz-tagging-directive`:

|`x-amz-tagging-directive`
|Указывает, копируется ли набор тегов объекта из исходного объекта или заменяется набором тегов, указанным в запросе. Возможные значения: `COPY` (по умолчанию), `REPLACE`

- Если `x-amz-tagging-directive: REPLACE`, а `x-amz-tagging` указан или пустой, теги исходного объекта будут заменены;
- Если `x-amz-tagging-directive: COPY` или пустой, а `x-amz-tagging` не указывается и теги исходного объекта будут скопированы;
- Если `x-amz-tagging-directive` не указан, а `x-amz-tagging` указан, вернется ошибка `501 Not Implemented`
  |===
  {ifdef(s3-pdf)}
  {/caption}
  {/ifdef}

## {heading(DeleteObject)[id=api-spec-s3-delete-object]}

Операции `DELETE` удаляет объект, указанный в запросе.

Чтобы удалить объект с установленной блокировкой `GOVERNANCE`, укажите в запросе заголовок `x-amz-bypass-governance-retention`.

Пример запроса:

```curl
...
DELETE /sammy.png HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T194408Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20170710/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=c2a46b21e2e8589dfbfa54382030bbef8108b2504a9f1d8aaba70fb0e1c46522
'''
```

Пример ответа:

```curl
...
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 19:44:09 GMT
x-amz-request-id: tx0000000000000027bbc48-005963d908-1268c-ru-mska
Connection: close
'''
```

## {heading(DeleteMultipleObjects)[id=api-spec-s3-delete-multiple-objects]}

Удаляет объекты по списку ключей, переданному в запросе. Список на удаление может содержать не более 1000 ключей. Отсутствие объекта не является ошибкой — если объекта не существует, то в ответе он будет отмечен как удаленный.

Заголовки `Content-MD5` и `Content-Length` обязательны, а список ключей на удаление передаётся в XML формате.

При выполнении метода для обхода временной управляемой блокировки укажите в запросе заголовок `x-amz-bypass-governance-retention`.

Пример запроса:

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

Пример ответа:

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
