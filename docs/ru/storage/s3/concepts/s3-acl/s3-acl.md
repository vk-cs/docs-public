*ACL* (Access Control List) позволяет управлять доступом к бакетам и объектам. ACL определяет, каким пользователям, проектам или метагруппам предоставлены права доступа.

При создании бакета или объекта сервис создает стандартный ACL, который предоставляет владельцу ресурса право полного контроля над этим ресурсом и запрещает доступ остальным пользователям. Стандартный ACL объекта имеет ту же структуру.

{note:info}ACL может содержать не более 100 разрешений.{/note}

Установить ACL можно одним из способов:

- с помощью [файла конфигурации](#config_file) в формате XML или JSON;
- с помощью HTTP-запроса, с указанием конфигурации в заголовке или теле запроса.

## Получатели прав

Права могут быть выданы следующим получателям:

- [Конкретный пользователь](#user-id) VK Cloud. 
- [Проект](#project-id) VK Cloud. 
- Предварительно определенные [метагруппы](#acl_meta).
- Весь мир. Любой, кто знает полный адрес (URL) объекта, имеет к нему доступ.

### {heading(Пользователь)[id=user-id]}

Чтобы предоставить доступ пользователю, в качестве идентификатора получателя укажите канонический идентификатор пользователя.

*Канонический идентификатор пользователя* (Canonical ID) — уникальный идентификатор, состоящий из набора символов. Пример: `fcd68908-6c76-42d1-968b-82ae2a5a251d`.

Канонический идентификатор пользователя VK Cloud можно узнать, [получив ACL](/ru/storage/s3/instructions/access-management/acl) бакета или объекта, к которому пользователь уже имеет права доступа. 

- При установке с помощью XML, внутри блока `Grantee` укажите тег `<ID>`.

   Пример: `<ID>fcd68908-6c76-42d1-968b-82ae2a5a251d</ID>`

- При установке с помощью HTTP-заголовка, в значении заголовка используйте ключ `id`.

   Пример: `id="fcd68908-6c76-42d1-968b-82ae2a5a251d"`.

### {heading(Проект)[id=project-id]}

Чтобы предоставить доступ проекту, в качестве идентификатора получателя укажите [идентификатор проекта](/ru/tools-for-using-services/account/instructions/project-settings/manage#poluchenie_identifikatora_proekta) (PID).

- При установке с помощью XML, внутри блока `Grantee` укажите тег `<EmailAddress>`.

  Пример: `<EmailAddress>mcs2400549523</EmailAddress>`

- При установке с помощью HTTP-заголовка, в значении заголовка используйте ключ `emailAddress`.

  Пример: `emailAddress="mcs2400549523"`.

{note:info}

Владелец учетной записи VK Cloud может делегировать определенные разрешения другим пользователям или группам. Пользователи, которым были делегированы разрешения, получают доступ к ресурсам и могут выполнять действия от имени основной учетной записи.

{/note}

### {heading(Метагруппа)[id=acl_meta]}

У сервиса есть набор предопределенных метагрупп. Чтобы предоставить доступ группе, в качестве идентификатора получателя укажите URI группы пользователей. 

{note:info}

То, что идентификатор выглядит как ссылка на AWS, не означает, что используются ресурсы AWS S3. Идентификаторы обрабатываются как набор символов и используются для обратной совместимости с программами, которые созданы для AWS S3.

{/note}

- **Authenticated Users** — **группа авторизованных пользователей.** Содержит все существующие учетные записи VK Cloud. 

   {note:warn}

   При предоставлении доступа группе пользователей `Authenticated Users`, любой авторизованный пользователь VK Cloud может получить доступ к ресурсу. Все запросы должны быть подписаны (авторизованы).

   {/note}

   - При установке с помощью XML, внутри `Grantee` укажите тег `<URI>`.

      Пример: `<URI>http://acs.amazonaws.com/groups/global/AuthenticatedUsers</URI>`

   - При установке с помощью HTTP-заголовка, в значении заголовка используйте ключ `uri`.

      Пример: `uri="http://acs.amazonaws.com/groups/global/AuthenticatedUsers"`

- **All Users** — **группа «Все пользователи»**. 

   {note:warn}

   При предоставлении доступа группе пользователей `All Users`, доступ к ресурсу может получить любой. Запросы могут быть подписанными (авторизованными) или неподписанными (анонимными). 

   {/note}

   - При установке с помощью XML, внутри `Grantee` укажите тег `<URI>`.

      Пример: `<URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>`

   - При установке с помощью HTTP-заголовка, в значении заголовка используйте ключ `uri`.

      Пример: `uri="http://acs.amazonaws.com/groups/global/AllUsers"`

   Анонимные не авторизированные пользователи, если им предоставлен доступ, совершают действия под каноническим ID пользователя `65a011a29cdf8ec533ec3d1ccaae921c`, так как у них нет учетной записи в VK Cloud.

При [установке прав доступа метагруппе](#example_meta) права доступа для отдельных проектов будут потеряны.

{note:warn}

Используйте метагруппы только в случае необходимости. 

Открывая доступ неопределенному кругу лиц, вы теряете контроль над тем, кто сможет совершать операции с вашими ресурсами. Оплата за все операции с бакетом выполняется владельцем бакета.

{/note}

## {heading(Разрешения)[id=permissons]}

### Виды разрешений

В таблице перечислены наборы разрешений, которые VK Object Storage поддерживает в ACL. Набор разрешений ACL одинаков для ACL объекта и ACL бакета. Эти ACL предоставляют разрешения для определенных бакетов или операций с объектами. В таблице перечислены разрешения и описано, что они означают в контексте объектов и бакетов.

[cols="1,1,3,3", options="header"]
|===
|Разрешение
|Описание
|Применение к бакету
|Применение к объекту

|`READ`
|Только чтение
|HeadBucket, GetBucketLifecycle, GetBucketNotification, ListObjects, ListParts, ListMultiparts
|GetObject, HeadObject, GetObjectRange

|`WRITE`
|Создание, удаление, перезапись
|DeleteBucketNotification, PutBucketNotification, PutBucketLifecycle, DeleteBucketLifecycle, DeleteObject, DeletMultiple, ObjectsAbort, MultipartInit, MultipartUploadPart, CompliteMultipart, PutObject, PutObjectCopy
|Не применимо

|`READ_ACP`
|Чтение ACL
|GetBucketAcl, GetBucketCors
|GetObjectAcl

|`WRITE_ACP`
|Изменение ACL
|CreatePrefixKey, DeletePrefixKey, ListPrefixKeys, PutBucketCors, DeleteBucketCors, PutBucketAcl
|PutObjectAcl

|`FULL_CONTROL`
|Полный доступ
|Комбинирует права `READ`, `WRITE`, `READ_ACP`, `WRITE_ACP` для бакета
|Комбинирует права `READ`, `WRITE`, `READ_ACP`, `WRITE_ACP` для объекта
|===

### Сопоставление разрешений ACL и разрешений политики доступа

ACL предоставляет ограниченный набор разрешений по сравнению с количеством разрешений, которые можно установить в политике доступа. Каждое из этих разрешений позволяет выполнять одну или несколько операций VK Object Storage.

В следующей таблице показано, как каждое разрешение ACL сопоставляется с соответствующими разрешениями политики доступа. Политика доступа допускает больше разрешений, чем ACL. ACL используется в основном для предоставления базовых разрешений на чтение и запись, аналогично разрешениям файловой системы.

[cols="1,3,3", options="header"]
|===
|Разрешение ACL
|Политика доступа для бакета
|Политика доступа для объекта

|`READ`
|ListBucket, ListBucketMultipartUploads
|GetObject

|`WRITE`
|PutObject, DeleteObject
|Не применимо

|`READ_ACP`
|GetBucketAcl
|GetObjectAcl

|`WRITE_ACP`
|PutBucketAcl
|PutObjectAcl

|`FULL_CONTROL`
|Эквивалент предоставлению `READ`, `WRITE`, `READ_ACP` и `WRITE_ACP` ACL разрешений
|Эквивалент предоставлению `READ`, `READ_ACP` и `WRITE_ACP` ACL разрешений
|===

### Условные ключи

Чтобы ограничить значение ACL для объекта с помощью политики бакета, можно использовать условные ключи (condition keys). Условные ключи соответствуют спискам ACL. Они предназначены для указания использования определенного ACL в запросе:

- `s3:x-amz-grant-read` — доступ на чтение (`READ`).
- `s3:x-amz-grant-write` — права записи (`WRITE`).
- `s3:x-amz-grant-read-acp` — доступ на чтение ACL бакета (`READ_ACP`).
- `s3:x-amz-grant-write-acp` — права на запись ACL бакета (`WRITE_ACP`).
- `s3:x-amz-grant-full-control` — полный контроль (`FULL_CONTROL`).
- `s3:x-amz-acl` — использование [фиксированного ACL](/ru/storage/s3/concepts/s3-acl#fiksirovannyy_acl).

### Заголовки HTTP

При установке ACL с помощью HTTP-заголовков используйте следующие заголовки для выдачи прав:

- `x-amz-grant-read` — доступ на чтение (`READ`).
- `x-amz-grant-write` — права записи (`WRITE`).
- `x-amz-grant-read-acp` — доступ на чтение ACL бакета (`READ_ACP`).
- `x-amz-grant-write-acp` — права на запись ACL бакета (`WRITE_ACP`).
- `x-amz-grant-full-control` — полный контроль (`FULL_CONTROL`).
- `x-amz-acl`  — использование [фиксированного ACL](/ru/storage/s3/concepts/s3-acl#fiksirovannyy_acl).

## Фиксированный ACL

VK Object Storage поддерживает набор предопределенных разрешений — стандартные списки ACL. Каждый фиксированный ACL имеет предопределенный набор получателей и разрешений. В следующей таблице перечислены стандартные списки ACL и связанные с ними предопределенные разрешения.

[cols="1,2,4", options="header"]
|===
|Фиксированный ACL
|Область применения
|Добавленные в ACL разрешения

|`private`
|Бакет и объект
|Владелец получает полные права (`FULL_CONTROL`). Остальные пользователи не получают прав доступа (по умолчанию)

|`public-read`
|Бакет и объект
|Владелец получает полные права (`FULL_CONTROL`). Группа всех пользователей `AllUsers` получает доступ на чтение (`READ`)

|`public-read-write`
|Бакет и объект
|Владелец получает полные права (`FULL_CONTROL`). Группа всех пользователей `AllUsers` получает права на чтение (`READ`) и запись (`WRITE`). Не рекомендуется предоставлять данные разрешений на бакет

|`aws-exec-read`
|Бакет и объект
|Владелец получает полные права (`FULL_CONTROL`)

|`authenticated-read`
|Бакет и объект
|Владелец получает полные права (`FULL_CONTROL`). Группа авторизованных пользователей `AuthenticatedUsers` получает права на чтение (`READ`)

|`bucket-owner-read`
|Объект
|Владелец объекта получает полные права (`FULL_CONTROL`). Владелец бакета получает права на чтение (`READ`)
Если указать этот шаблонный ACL при создании бакета, VK Object Storage проигнорирует его

|`bucket-owner-full-control`
|Объект
|Владелец объекта и владелец бакета получают полные права (`FULL_CONTROL`) на объект. Если указать этот фиксированный ACL при создании бакета, VK Object Storage проигнорирует его
|===

{note:info}

В запросе можно указать только один из этих фиксированных списков ACL.

В запросе указывается фиксированный ACL, используя заголовок запроса `x-amz-acl`. Когда VK Object Storage получает запрос со стандартным списком управления доступом в запросе, он добавляет предопределенные разрешения в список управления доступом ресурса.

{/note}

## {heading(Файл конфигурации)[id=config_file]}

### Формат файла конфигурации

Файл конфигурации в формате XML содержит следующие элементы:

* Элемент `<ACL>` — корневой элемент, который содержит всю конфигурацию списка контроля доступа.
* Элемент `<Owner>` содержит информацию о владельце ресурса. Чтобы узнать канонический идентификатор владельца, [получите](/ru/storage/s3/instructions/buckets/manage-bucket#bucket_info) информацию о бакете.
* Элемент `<Grant>` представляет собой отдельный грант (назначение права доступа). Каждый `<Grant>` определяет, какому субъекту предоставляется какое действие. Элемент `<Grant>` содержит:
   * Элемент `<Grantee>`, который указывает, кому предоставляется право доступа. `<Grantee>` содержит атрибуты:
      * `ID` — идентификатор [получателя прав](#poluchateli_prav).
      * `Type` — тип субъекта, например `CanonicalUser`, `Group`.
   * Элемент `<Permission>` определяет [право](#permissons), предоставляемое субъекту.

### Пример файла конфигурации

```xml
<?xml version="1.0" encoding="UTF-8"?>
<AccessControlPolicy xmlns="http://bucket_name.hb.ru-msk.vkcloud-storage.ru/images/01.jpg/">
   <Owner>
      <ID>Owner-canonical-user-ID</ID>
      <DisplayName>display-name</DisplayName>
   </Owner>
   <AccessControlList>
      <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
            <ID>Owner-canonical-user-ID</ID>
            <DisplayName>display-name</DisplayName>
         </Grantee>
         <Permission>FULL_CONTROL</Permission>
      </Grant>
     
      <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
            <ID>user1-canonical-user-ID</ID>
            <DisplayName>display-name</DisplayName>
         </Grantee>
         <Permission>WRITE</Permission>
      </Grant>
     
      <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
            <ID>user2-canonical-user-ID</ID>
            <DisplayName>display-name</DisplayName>
         </Grantee>
         <Permission>READ</Permission>
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

### {heading(Пример установки ACL для метагрупп)[id=example_meta]}

{note:warn}

При установке прав доступа метагруппе права доступа для отдельных проектов будут потеряны. Чтобы этого не происходило, устанавливайте права доступа одновременно. В этом случае утери прав доступа отдельными проектами не происходит.

{/note}

1. Создан проект `client@vkcloud-storage.ru`, в нем создан бакет `bucketname`. Изначально бакет частный — только владелец имеет к нему доступ.

   {cut(Пример конфигурации)}

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
     <Owner>
       <ID>client_canonical_id</ID>
       <DisplayName>client@vkcloud-storage.ru</DisplayName>
     </Owner>
     <AccessControlList>
       <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Canonical User">
           <ID>client_canonical_id</ID>
           <DisplayName>client@vkcloud-storage.ru</DisplayName>
         </Grantee>
         <Permission>FULL_CONTROL</Permission>
       </Grant>
     </AccessControlList>
   </AccessControlPolicy>
   ```

   {/cut}

1. Выдан доступ на запись, удаление или перезапись объектов для бакета `bucketname` проекту `friend_project@vkcloud-storage.ru`.

   {cut(Пример конфигурации)}

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
     <Owner>
       <ID>***Owner-Canonical-User-ID***</ID>
       <DisplayName>owner-display-name</DisplayName>
     </Owner>
     <AccessControlList>
       <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Canonical User">
           <ID>friend_project_canonical_id</ID>
           <DisplayName>friend_project@vkcloud-storage.ru</DisplayName>
         </Grantee>
         <Permission>WRITE</Permission>
       </Grant>
     </AccessControlList>
   </AccessControlPolicy>
   ```

   {/cut}

   Конфигурация ACL не содержит блока с данными владельца `client@vkcloud-storage.ru` и его правами `FULL_CONTROL`. Это особенности синтаксиса ответа ACL. Владелец бакета всегда обладает правом `FULL_CONTROL` и лишить его невозможно. 

1. Есть два варианта сделать бакет публичным для чтения:

   - Добавить ACL для группы, используя:

      {tabs}

      {tab(Заголовки x-amz-acl или x-amz-grant-read)}

      ```http
       **PUT /?acl HTTP/1.1**
       Authorization: authorization string
       Connection: close
       Date: Wed, 02 Aug 2017 09:53:13 GMT
       Host: bucketname.hb.ru-msk.vkcloud-storage.ru
       X-amz-content-sha256: UNSIGNED-PAYLOAD
       X-amz-acl: public-read
      ```
   
      {/tab}

      {tab(Тело запроса)}

      ```http
       **HTTP/1.1 200 OK**
       Server: nginx/1.12.1
       Date: Wed, 02 Aug 2017 09:53:14 GMT
       Content-Type: text/html; charset=utf-8
       Content-Length: 0
       Connection: close
       X-req-id: iySm3Cph
      ```
  
      {/tab}

      {/tabs}

      {cut(Пример конфигурации)}

      ```xml
      <?xml version="1.0" encoding="utf-8"?>
      <AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
         <Owner>
             <ID>client_canonical_id</ID>
             <DisplayName>client@vkcloud-storage.ru</DisplayName>
         </Owner>
         <AccessControlList>
             <Grant>
                 <Permission>FULL_CONTROL</Permission>
                 <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
                     <ID>client_canonical_id</ID>
                     <DisplayName>client@vkcloud-storage.ru</DisplayName>
                 </Grantee>
             </Grant>
             <Grant>
                 <Permission>READ</Permission>
                 <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
                     <URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>
                 </Grantee>
             </Grant>
         </AccessControlList>
      </AccessControlPolicy>
      ```

      {/cut}

      В блоках `AccessControlPolicy.AccessControlList.Grant` есть информация о владельце и публичный ACL. У проекта `friend_project@vkcloud-storage.ru` нет права `WRITE`. Он не может записывать, удалять, перезаписывать объекты в бакете. 

   - Установить права доступа к глобальной группе и проекту в одном запросе, чтобы сохранить права доступа для проекта `friend_project@vkcloud-storage.ru`:

      ```http
       **PUT /?acl HTTP/1.1** Authorization: authorization string
       Connection: close
       Content-Length: 417
       Date: Wed, 02 Aug 2017 09:53:13 GMT
       Host: bucketname.hb.ru-msk.vkcloud-storage.ru
       X-amz-content-sha256: UNSIGNED-PAYLOAD
      ```

      {cut(Ответ)}

      ```xml
      <?xml version="1.0" encoding="utf-8"?>
      <AccessControlPolicy>
         <Owner>
             <ID>client_canonical_id1</ID>
             <DisplayName>client@vkcloud-storage.ru</DisplayName>
         </Owner>
         <AccessControlList>
             <Grant>
                 <Permission>READ</Permission>
                 <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
                     <URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>
                 </Grantee>
             </Grant>
             <Grant>
                 <Permission>WRITE</Permission>
                 <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
                     <ID>friend_project_canonical_id</ID>
                     <DisplayName>friend_project@vkcloud-storage.ru</DisplayName>
                 </Grantee>
             </Grant>
         </AccessControlList>
      </AccessControlPolicy>
      ```
  
      {/cut}

     В блоках `AccessControlPolicy.AccessControlList.Grant` есть информация о публичном ACL и доступе `WRITE` для группы `friend_project@vkcloud-storage.ru`. Владелец бакета обладает правом `FULL_CONTROL`.