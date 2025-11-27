ACL (Access Control List, список контроля доступа) позволяет контролировать, каким пользователям какие разрешены операции в сервисе VK Object Storage. Каждый бакет и объект имеет свой ACL, в котором перечислены [получатели прав доступа](#permittees) и предоставленные им [разрешения](#permissons).  

Доступны следующие методы API для операций с ACL бакетов и объектов:

- [Get Bucket ACL](#get_bucket_acl) — получить ACL бакета.
- [Put Bucket ACL](#put_bucket_acl) — установить ACL для бакета.
- [Get Object ACL](#get_object_acl) — получить ACL объекта.
- [Put Object ACL](#put_object_acl) — установить ACL для объекта.

Устанавливать ACL можно как при создании бакета или загрузке объекта, так и после. Задать конфигурацию ACL в методах `Put Bucket ACL` и `Put Object ACL` можно двумя способами:

- В теле запроса — в виде [XML-структуры конфигурации ACL](#acl_config_file). Способ используется только для существующих бакетов или объектов.
- В [заголовках запроса](#request_headers). Способ используется как при создании бакета или загрузке объекта, так и для существующих бакетов или объектов.

В одном запросе можно использовать только один из этих способов.

## {heading(XML-структура конфигурации ACL)[id=acl_config_file]}

Конфигурация ACL в формате XML содержит следующие элементы:

- `<Owner>` — указывает канонический идентификатор владельца бакета. Узнайте его с помощью метода [Get Bucket ACL](#get_bucket_acl) или через AWS CLI, [запросив](/ru/storage/s3/instructions/buckets/manage-bucket#bucket_info) информацию о бакете.
- `<Grant>` — определяет, какому получателю какие предоставляются разрешения. `<Grant>` содержит элементы `<Grantee>` и `<Permission>`.

  - `<Grantee>` — указывает получателя прав доступа с помощью атрибутов:

    - `ID` — идентификатор [получателя прав](#permittees).
    - `Type` — тип получателя прав. Примеры: `CanonicalUser`, `Group`.

  - `<Permission>` — указывает вид предоставляемого [разрешения](#permissons).

Пример XML-структуры конфигурации ACL:

```xml
<AccessControlPolicy>
  <Owner>
    <ID>Owner-canonical-user-ID</ID>
    <DisplayName>owner-display-name</DisplayName>
  </Owner>
  <AccessControlList>
    <Grant>
      <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
        <ID>Owner-canonical-user-ID</ID>
        <DisplayName>owner-display-name</DisplayName>
      </Grantee>
      <Permission>FULL_CONTROL</Permission>
    </Grant>
  </AccessControlList>
</AccessControlPolicy>
```

## {heading(Заголовки запроса)[id=request_headers]}

Для указания конфигурации ACL в запросах `PUT` используются следующие заголовки:

- `x-amz-acl` — назначает бакету или объекту преднастроенный [стандартный ACL](/ru/storage/s3/concepts/access/s3-acl#standard_acl).
- `x-amz-grant-read` — устанавливает разрешение на чтение (`READ`).
- `x-amz-grant-write` — устанавливает разрешение на запись (`WRITE`).
- `x-amz-grant-read-acp` — устанавливает разрешение на чтение ACL (`READ_ACP`).
- `x-amz-grant-write-acp` — устанавливает разрешение на запись ACL (`WRITE_ACP`).
- `x-amz-grant-full-control` — дает полный контроль (`FULL_CONTROL`).

Заголовок `x-amz-acl` нельзя комбинировать в одном запросе с другими перечисленными заголовками. Можно либо использовать стандартный ACL, либо указывать получателей прав в явном виде.

## {heading(Получатели доступа)[id=permittees]}

Права доступа к бакетам и объектам могут быть даны следующим категориям получателей:

- [Пользователь](#user_id) VK Cloud.
- [Проект](#project_id) VK Cloud.
- Предварительно определенная [метагруппа](#acl_meta).

### {heading(Пользователь)[id=user_id]}

Доступ пользователю VK Cloud предоставляется по его каноническому идентификатору (Canonical ID). Это уникальный идентификатор пользователя VK Object Storage, представляющий собой буквенно-цифровую последовательность. Пример: `fcd68908-XXXX-82ae2a5a251d`.

Чтобы узнать канонический идентификатор пользователя VK Cloud, [получите ACL](/ru/storage/s3/instructions/access-management/acl) бакета или объекта, к которому пользователь уже имеет права доступа.

Чтобы предоставить доступ пользователю, укажите его канонический идентификатор в запросе:

- При установке с помощью XML-структуры внутри блока `Grantee` укажите тег `<ID>`.

   Пример: `<ID>fcd68908-XXXX-82ae2a5a251d</ID>`

- При установке с помощью заголовка используйте в его значении ключ `id`.

   Пример: `id="fcd68908-XXXX-82ae2a5a251d"`.

### {heading(Проект)[id=project_id]}

Чтобы предоставить доступ проекту, укажите в запросе [идентификатор проекта](/ru/tools-for-using-services/account/instructions/project-settings/manage#poluchenie_identifikatora_proekta) (PID).

- При установке с помощью XML-структуры внутри блока `Grantee` укажите тег `<EmailAddress>`.

  Пример: `<EmailAddress>mcs2400549523</EmailAddress>`

- При установке с помощью заголовка используйте в его значении ключ `emailAddress`.

  Пример: `emailAddress="mcs2400549523"`.

{note:info}

Владелец учетной записи VK Cloud может делегировать определенные разрешения другим пользователям или группам. Пользователи, которым были делегированы разрешения, получают доступ к ресурсам и могут выполнять действия от имени делегировавшей учетной записи.

{/note}

### {heading(Метагруппа)[id=acl_meta]}

В сервисе VK Object Storage есть набор предопределенных метагрупп. Чтобы предоставить доступ группе пользователей, укажите в запросе URI группы.

{note:info}

То, что идентификатор выглядит как ссылка на AWS, не означает, что используются ресурсы AWS S3. Идентификаторы обрабатываются как набор символов и используются для обратной совместимости с программами, которые созданы для AWS S3.

{/note}

- `Authenticated Users` (авторизованные пользователи). Содержит все существующие учетные записи VK Cloud.

   {note:warn}

   При предоставлении доступа группе пользователей `Authenticated Users` любой авторизованный пользователь VK Cloud может получить доступ к ресурсу. Все запросы должны быть подписаны (авторизованы).

   {/note}

   Чтобы предоставить доступ группе `Authenticated Users`:

   - При установке с помощью XML-структуры внутри блока `Grantee` укажите тег `<URI>`.

      Пример: `<URI>http://acs.amazonaws.com/groups/global/AuthenticatedUsers</URI>`

   - При установке с помощью заголовка используйте в его значении ключ `uri`.

      Пример: `uri="http://acs.amazonaws.com/groups/global/AuthenticatedUsers"`

- `All Users` (все пользователи).

   {note:warn}

   При предоставлении доступа группе пользователей `All Users` любой, кто знает полный URL-адрес объекта, будет иметь к нему доступ. Запросы могут быть подписанными (авторизованными) или неподписанными (анонимными).

   {/note}

   Чтобы предоставить доступ группе `All Users`:

   - При установке с помощью XML-структуры внутри блока `Grantee` укажите тег `<URI>`.

      Пример: `<URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>`

   - При установке с помощью заголовка используйте в его значении ключ `uri`.

      Пример: `uri="http://acs.amazonaws.com/groups/global/AllUsers"`

   Анонимные неавторизированные пользователи, если им предоставлен доступ, совершают действия под каноническим ID пользователя `65a011a29cdf8ec533ec3d1ccaae921c`, так как у них нет учетной записи в VK Cloud.

{note:warn}

Используйте метагруппы только в случае необходимости.

Открывая доступ неопределенному кругу лиц, вы теряете контроль над тем, кто совершает операции с вашими ресурсами. При этом, как владелец бакета, оплачивать все операции с бакетом будете вы.

{/note}

## {heading(Разрешения)[id=permissons]}

{include(/ru/_includes/_acl_permissions.md)}

## Операции с ACL бакетов и объектов

### {heading(Get Bucket ACL)[id=get_bucket_acl]}

Получение ACL для бакета. Для получения необходимо иметь у бакета право `READ_ACP`.

Если право `READ_ACP` предоставлено анонимному пользователю, можно получать ACL бакета без использования заголовка авторизации.

Запрос:

```xml
GET /?acl HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T174434Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=71dfa4666fb740d40d05307a29321c65cc620cdb17e8a9cb83d4f0e1b1b9d236
```

Ответ:

```xml
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 17:44:35 GMT
x-amz-request-id: tx000000000000002764fa6-005963bd03-1268c-ru-mska
Content-Type: application/xml
Content-Length: 848
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
  <AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Owner>
      <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
      <DisplayName>VK Cloud_UserName</DisplayName>
    </Owner>
    <AccessControlList>
      <Grant>
        <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
          <URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>
        </Grantee>
        <Permission>READ</Permission>
      </Grant>
      <Grant>
        <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
          <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
          <DisplayName>VK Cloud_Username</DisplayName>
        </Grantee>
        <Permission>FULL_CONTROL</Permission>
      </Grant>
    </AccessControlList>
  </AccessControlPolicy>
```

### {heading(Put Bucket ACL)[id=put_bucket_acl]}

Установка ACL для бакета. Для установки ACL необходимо иметь у бакета право `WRITE_ACP`.

Запрос с передачей конфигурации ACL в теле запроса:

```xml
PUT /?acl HTTP/1.1
Content-Type: application/xml
Content-Length: 675
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: 724483e3830b19d6960345c484fb7904b26e8f2fb34a6c002fa779353b68c8d8
x-amz-date: 20200831T183709Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date,Signature=1cf3f7771a4086375e5b6597026db6d55d84fbc86e3c3a86ec420ea9123e3163


<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Owner>
    <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
  </Owner>
  <AccessControlList>
    <Grant>
      <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
        <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
      </Grantee>
      <Permission>FULL_CONTROL</Permission>
    </Grant>
    <Grant>
      <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
        <URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>
      </Grantee>
      <Permission>READ</Permission>
    </Grant>
  </AccessControlList>
</AccessControlPolicy>
```

Ответ:

```xml
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:37:10 GMT
x-amz-request-id: tx00000000000000278ac49-005963c956-1268c-ru-mska
Content-Type: application/xml
Content-Length: 0
Connection: close
```

### {heading(Get Object ACL)[id=get_object_acl]}

Получение ACL для объекта. Для получения необходимо иметь у объекта право `READ_ACP`.

Запрос:

```xml
GET /sammy.png?acl HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T191224Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=950e133849cd19d626291fd2937d927957cf3e97a36707d30d51a9b61ac08a8e
```

Ответ:

```xml
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 19:12:24 GMT
x-amz-request-id: tx0000000000000027a42dc-005963d198-1268c-ru-mska
Content-Type: application/xml
Content-Length: 848
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
  <AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Owner>
      <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
      <DisplayName>VK Cloud_UserName</DisplayName>
    </Owner>
    <AccessControlList>
      <Grant>
        <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
          <URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>
        </Grantee>
        <Permission>READ</Permission>
      </Grant>
      <Grant>
        <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
          <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
          <DisplayName>VK Cloud_UserName</DisplayName>
        </Grantee>
        <Permission>FULL_CONTROL</Permission>
      </Grant>
    </AccessControlList>
  </AccessControlPolicy>
```

### {heading(Put Object ACL)[id=put_object_acl]}

Установка ACL для объекта. Для установки ACL необходимо иметь у объекта право `WRITE_ACP`.

Запрос с передачей конфигурации ACL в теле запроса:

```xml
PUT /sammy.png?acl HTTP/1.1
Сontent-Type: application/xml
Content-Length: 443
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256:c0bd9ba784be78d4f38bbc1e3b0da2de2e7a8f4ee259b3b840369cf00a78dad2
x-amz-date:20200831T192142Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date,Signature=dfeeb2386f76b29097adadb35ac15f7d5f244f18cc95f082b0ac6d14ced48b10


<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Owner>
    <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
  </Owner>
  <AccessControlList>
    <Grant>
      <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
        <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
      </Grantee>
      <Permission>FULL_CONTROL</Permission>
    </Grant>
  </AccessControlList>
</AccessControlPolicy>
```

Ответ:

```xml
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 19:21:42 GMT
x-amz-request-id: tx0000000000000027aafc9-005963d3c6-1268c-ru-mska
Content-Type: application/xml
Content-Length: 0
Connection: close
```

## Рекомендации по обновлению ACL

Политика назначения прав доступа такова, что при обновлении ACL существующего бакета или объекта в некоторых случаях могут быть потеряны ранее назначенные права доступа. Например, при запросе на предоставление доступа любой метагруппе будут потеряны все права доступа, установленные для отдельных проектов VK Cloud. Чтобы этого избежать, рекомендуется устанавливать права доступа всем нужным категориям получателей одновременно.

Пример XML-структуры для одновременной установки разрешений в одном запросе:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<AccessControlPolicy xmlns="http://bucket_name.hb.ru-msk.vkcloud-storage.ru/images/01.jpg/">
   <Owner>
      <ID>Owner-canonical-user-ID</ID>
      <DisplayName>owner-display-name</DisplayName>
   </Owner>
   <AccessControlList>
      <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
            <ID>Owner-canonical-user-ID</ID>
            <DisplayName>owner-display-name</DisplayName>
         </Grantee>
         <Permission>FULL_CONTROL</Permission>
      </Grant>
     
      <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
            <ID>user1-canonical-user-ID</ID>
            <DisplayName>user1-display-name</DisplayName>
         </Grantee>
         <Permission>WRITE</Permission>
      </Grant>
     
      <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
            <URI>http://acs.amazonaws.com/groups/global/AllUsers</URI> 
         </Grantee>
         <Permission>READ</Permission>
      </Grant>

      <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
            <EmailAddress>project-ID</EmailAddress>
         </Grantee>
         <Permission>READ</Permission>
      </Grant>

   </AccessControlList>
</AccessControlPolicy>
```
