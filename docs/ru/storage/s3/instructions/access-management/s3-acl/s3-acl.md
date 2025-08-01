## Общая информация

ACL (Access Control List) позволяет контролировать, какие операции разрешены каким пользователям. ACL может стоять как и на уровне всего бакета, так и на уровне конкретного объекта. Установить и прочесть ACL можно через приведенные методы ниже. По умолчанию, создаваемый бакет или объект максимально ограничен в доступе — только владелец бакета/объекта может работать с ним. У остальных пользователей — запрет доступа. ACL указывается в XML формате. В поле Owner ID нужно указать свой канонический идентификатор в системе VK Cloud. Получить его можно разными способами. Один из них:

```console
aws s3api list-buckets --query Owner.ID --output text --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
```

Пример ACL, который дает те же права, что и по умолчанию (только владелец имеет полный доступ, никто больше):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<AccessControlPolicy xmlns="http://<имя_бакета>.hb.ru-msk.vkcloud-storage.ru/images/01.jpg/">
  <Owner>
    <ID>fcd68908-6c76-42d1-968b-82ae2a5a251d</ID>
    <DisplayName>owner-display-name</DisplayName>
  </Owner>
  <AccessControlList>
    <Grant>
      <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xsi:type="Canonical User">
        <ID>fcd68908-6c76-42d1-968b-82ae2a5a251d</ID>
        <DisplayName>display-name</DisplayName>
      </Grantee>
      <Permission>FULL_CONTROL</Permission>
    </Grant>
  </AccessControlList>
</AccessControlPolicy>
```

- Элемент `<Owner>` производит идентификацию владельца по каноническому идентификатору пользователя учетной записи VK Cloud.
- Элемент `<Grant>` определяет идентификатор получателя для предоставления разрешения.
- Элемент `<Permission>` внутри `<Grant>` определяет тип доступа для получателя.

Базовый ACL, показанный выше в качестве примера, имеет один элемент `<Grant>`. Чтобы описать несколько получателей, для каждого надо добавить свой элемент `<Grant>`.

{note:info}

ACL может содержать не более 100 разрешений.

{/note}

При установке через HTTP заголовки нужно использовать заголовки для выдачи специфичных для заголовка прав:

- x-amz-grant-read — Список получателей прав для READ.
- x-amz-grant-write — Список получателей прав для WRITE.
- x-amz-grant-read-acp — Список получателей прав для READ_ACP.
- x-amz-grant-write-acp — Список получателей прав для WRITE_ACP.
- x-amz-grant-full-control — Список получателей прав для FULL_CONTROL.
- x-amz-acl — Использование шаблонного ACL.

Ниже даны описания каждого из прав и что указывать в значениях заголовков.

## Выдача прав

Идентификатор для выдачи прав может быть нескольких типов:

- Конкретный пользователь в VK Cloud. Для этого нужно знать его канонический идентификатор.
- Проект в VK Cloud. Для этого нужно знать идентификатор проекта (PID).
- Предварительно определенные группы. Список указан ниже.
- Весь мир, включая анонимный доступ. Любой, знающий полный адрес объекта, имеет доступ.

Выданное право для идентификатора выше может быть единственным или составленным из нескольких типов:

- READ — только чтение, какие-либо изменения не разрешены.
- WRITE — только запись, какое-либо чтение не разрешено. Включая удаление.
- READ_ACP — чтение ACL, какие-либо изменения не разрешены.
- WRITE_ACP — запись ACL, какое-либо чтение не разрешено. Включая удаление.
- FULL_CONTROL — все перечисленное выше.

## {heading(Выдача прав по идентификатору пользователя)[id=user-id]}

Канонический идентификатор пользователя (канонический ID, Canonical ID) — это уникальный идентификатор, состоящий из набора символов. Пример — `fcd68908-6c76-42d1-968b-82ae2a5a251d`. Формат не фиксирован, при работе с каноническим идентификатором пользователя какие-либо преобразования и привязки к формату идентификатора не рекомендуются.

- Если используется установка через XML, то внутри `<Grantee>` надо указать тег `<ID>`.

  Пример: `<ID>fcd68908-6c76-42d1-968b-82ae2a5a251d</ID>`

- Если используется установка через HTTP заголовок, то в значении заголовка надо использовать ключ `id`.

  Пример: `id="fcd68908-6c76-42d1-968b-82ae2a5a251d"`.

Канонический ID пользователя учетной записи VK Cloud можно получить, прочитав ACL бакета или объекта, к которому учетная запись VK Cloud имеет права доступа. Когда отдельная учетная запись VK Cloud получает разрешения по запросу на Grant, в ACL добавляется запись гранта с каноническим ID пользователя учетной записи VK Cloud.

{note:info}

Если сделать свой бакет общедоступным (не рекомендуется), любой неаутентифицированный пользователь может загружать объекты в бакет. У этих анонимных пользователей нет учетной записи VK Cloud. Когда анонимный пользователь загружает объект в бакет, Cloud Storage добавляет специальный канонический ID пользователя (65a011a29cdf8ec533ec3d1ccaae921c) в качестве владельца объекта в ACL.

{/note}

## {heading(Выдача прав по идентификатору проекта)[id=project-id]}

Если идентификатор пользователя неизвестен, но известен идентификатор проекта, то можно указать проект. При обработке запроса на установку ACL, система ищет идентификатор пользователя и сохраняет его в ACL. В результате ACL всегда будут содержать канонический ID пользователя для проекта, а не идентификатор проекта.

- Если используется установка через XML, то внутри `<Grantee>` надо указать тег `<EmailAddress>`.

  Пример: `<EmailAddress>mcs2400549523</EmailAddress>`

- Если используется установка через HTTP заголовок, то в значении заголовка надо использовать ключ `id`.

  Пример: `emailAddress="mcs2400549523"`.

Получить свой идентификатор проекта можно в личном кабинете в области информации об учетной записи. Кнопка, расположенная рядом с идентификатором проекта, позволяет скопировать параметр для удобства.

{note:warn}

При предоставлении другим учетным записям VK Cloud доступ к своим ресурсам, следует учитывать, что учетные записи VK Cloud могут делегировать свои разрешения пользователям под своими учетными записями. Это известно как доступ к нескольким аккаунтам.

{/note}

## Выдача предварительно определенным метагруппам

Hotbox имеет набор предопределенных групп. Указывая специальный идентификатор "пользователя", система автоматически подставляет права по правилам, указанным ниже. То, что идентификатор выглядит как ссылка на AWS, не означает, что используются ресурсы AWS S3. Эти идентификаторы обрабатываются только как набор символов и используются для обратной совместимости с программами, которые созданы для AWS S3.

- **Authenticated Users** — **группа авторизованных пользователей.** Эта метагруппа содержит все существующие учетные записи в системе VK Cloud, включая те, которыми вы не можете управлять. Разрешение на доступ к этой группе позволяет любой учетной записи VK Cloud получить доступ к ресурсу. Однако, все запросы должны быть подписаны (аутентифицированы). Нужно указывать `http://acs.amazonaws.com/groups/global/AuthenticatedUsers` в поле URI. Авторизированным пользователям надо подписывать свои запросы для доступа к ресурсу.

{note:warn}

При предоставлении доступа группе пользователей Authenticated Users, любой авторизованный пользователь VK Cloud из Интернет может получить доступ к ресурсу.

{/note}

- **All Users** — **группа «Все пользователи».** Эта метагруппа снимает какие-либо ограничения на указанное право. Например, если сделать открытый доступ на READ, то любой пользователь может считывать содержимое, если он знает только имя бакета и имя объекта. А WRITE для всех позволяет любому пользователю все, что это право дает. Нужно указывать `http://acs.amazonaws.com/groups/global/AllUsers` в поле URI.

{note:warn}

Убедительно просим взвесить все аргументы в пользу использования метагрупп.

{/note}

Открывая доступ неопределенному кругу лиц, вы теряете контроль над тем, кто сможет совершать операции с вашими ресурсами. Оплата за их действия совершается владельцем бакета. Самый неблагоприятный сценарий — анонимный пользователь с WRITE-доступом удаляет нужные для хранения объекты и размещает терабайты файлов, нежелательных владельцу бакета.

Анонимные не авторизированные пользователи, если им предоставлен доступ, совершают действия под каноническим ID пользователя `65a011a29cdf8ec533ec3d1ccaae921c`, так как у них нет учетной записи в VK Cloud.

- Если используется установка через XML, то внутри `<Grantee>` надо указать тег `<URI>`.

  Пример: `<URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>`

- Если используется установка через HTTP заголовок, то в значении заголовка надо использовать ключ `id`.

  Пример: `uri="http://acs.amazonaws.com/groups/global/AllUsers"`

## {heading(Виды разрешений)[id=permissons]}

В таблице перечислены наборы разрешений, которые Cloud Storage поддерживает в ACL. Набор разрешений ACL одинаков для ACL объекта и ACL бакета. Эти ACL предоставляют разрешения для определенных бакетов или операций с объектами. В таблице перечислены разрешения и описано, что они означают в контексте объектов и бакетов.

|Разрешение|Применение к бакету|Применение к объекту|
|--- |--- |--- |
|READ|HeadBucketGetBucketLifecycleGetBucketNotificationListObjectsListPartsListMultiparts|Позволяет получить содержимое объекта и его метаданные:GetObjectHeadObjectGetObjectRange|
|WRITE|Позволяет создавать, удалять, перезаписывать любые объекты в бакете:DeleteBucketNotificationPutBucketNotificationPutBucketLifecycleDeleteBucketLifecycleDeleteObjectDeletMultipleObjectsAbortMultipartInitMultipartUploadPartCompliteMultipartPutObjectPutObjectCopy|Не применимо|
|READ_ACP|Позволяет читать ACL бакета: GetBucketAclGetBucketCors|Позволяет читать ACL объекта: GetObjectAcl|
|WRITE_ACP|Позволяет изменять ACL бакета:CreatePrefixKeyDeletePrefixKeyListPrefixKeysPutBucketCorsDeleteBucketCorsPutBucketAcl|Позволяет изменять ACL объекта PutObjectAcl|
|FULL_CONTROL|Комбинирует права READ, WRITE, READ_ACP, WRITE_ACP для бакета|Комбинирует права READ, WRITE, READ_ACP, WRITE_ACP для объекта|

## Сопоставление разрешений ACL и разрешений политики доступа

ACL допускает только конечный набор разрешений по сравнению с количеством разрешений, которые можно установить в политике доступа. Каждое из этих разрешений позволяет выполнять одну или несколько операций Cloud Storage.

В следующей таблице показано, как каждое разрешение ACL сопоставляется с соответствующими разрешениями политики доступа. Как видно, политика доступа допускает больше разрешений, чем ACL. ACL используется в основном для предоставления базовых разрешений на чтение и запись, аналогично разрешениям файловой системы.

|Разрешение ACL|Политика доступа для бакета|Политика доступа для объекта|
|--- |--- |--- |
|READ|ListBucket,ListBucketMultipartUploads|GetObject|
|WRITE|PutObject,DeleteObject|Не применимо|
|READ_ACP|GetBucketAcl|GetObjectAcl|
|WRITE_ACP|PutBucketAcl|PutObjectAcl|
|FULL_CONTROL|Эквивалент предоставлению READ, WRITE,READ_ACP, и WRITE_ACP ACL разрешений|Эквивалент предоставлению READ, READ_ACP и WRITE_ACP ACL разрешений|

## Условные ключи

При предоставлении разрешения политики доступа, можно использовать условные ключи (condition keys), чтобы ограничить значение ACL для объекта с помощью политики бакета. Приведенные ниже контекстные ключи соответствуют спискам ACL. Эти контекстные ключи предназначены для указания использования определенного ACL в запросе:

- `s3:x-amz-grant-read` — Доступ на чтение.
- `s3:x-amz-grant-write` — Права записи.
- `s3:x-amz-grant-read-acp` — Доступ на чтение ACL бакета.
- `s3:x-amz-grant-write-acp` — Права на запись ACL бакета.
- `s3:x-amz-grant-full-control` — Полный контроль.
- `s3:x-amz-acl` — Использование шаблонного ACL.

## Пример ACL

```xml
<?xml version="1.0" encoding="UTF-8"?>
<AccessControlPolicy xmlns="http://<имя_бакета>.hb.ru-msk.vkcloud-storage.ru/images/01.jpg/">
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

## Фиксированный ACL

Cloud Storage поддерживает набор предопределенных разрешений, известных как стандартные списки ACL. Каждый фиксированный ACL имеет предопределенный набор получателей и разрешений. В следующей таблице перечислены стандартные списки ACL и связанные с ними предопределенные разрешения.

|Фиксированный ACL|Относится к|Разрешения добавлены в ACL|
|--- |--- |--- |
|private|Бакет и объект|Владелец получает FULL_CONTROL. Больше ни у кого нет прав доступа (по умолчанию).|
|public-read|Бакет и объект|Владелец получает FULL_CONTROL. Группа AllUsers получает READ доступ.|
|public-read-write|Бакет и объект|Владелец получает FULL_CONTROL. Группа AllUsers получает READ и WRITE доступ.|
|aws-exec-read|Бакет и объект|Владелец получает FULL_CONTROL.|
|authenticated-read|Бакет и объект|Владелец получает FULL_CONTROL. Группа AuthenticatedUsers получает READ доступ.|
|bucket-owner-read|Объект|Владелец объекта получает FULL_CONTROL. Владелец бакета получает READ доступ. Если указать этот шаблонный ACL при создании бакета, Cloud Storage проигнорирует его.|
|bucket-owner-full-control|Объект|И владелец объекта, и владелец бакета получают FULL_CONTROL над объектом. Если указать этот фиксированный ACL при создании бакета, Cloud Storage проигнорирует его.|

{note:info}

В запросе можно указать только один из этих фиксированных списков ACL.

В запросе указывается фиксированный ACL, используя заголовок запроса x-amz-acl. Когда Cloud Storage получает запрос со стандартным списком управления доступом в запросе, он добавляет предопределенные разрешения в список управления доступом ресурса.

{/note}

## Списки управления доступом (ACL)

Hotbox предоставляет возможность управлять доступом к бакетам и объектам с помощью списка управления доступа — ACL. У каждого бакета и объекта есть свой список доступа. Этот список определяет, каким проектам или глобальным группам предоставляются права доступа и соответствующие права доступа. При получении запроса на ресурс сервис проверяет соответствующий ACL на наличие прав доступа у запрашивающего.

При создании бакета или объекта сервис создает стандартный ACL, который предоставляет владельцу ресурса право полного контроля над этим ресурсом и запрещает доступ остальным проектам и глобальным группам. Это показано в следующем примере ACL бакета (стандартный ACL объекта имеет ту же структуру).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<AccessControlPolicy xmlns="http://BucketName.hb.ru-msk.vkcloud-storage.ru/doc/2006-03-01/">
  <Owner>
    <ID>***Owner-Canonical-User-ID***</ID>
    <DisplayName>owner-display-name</DisplayName>
  </Owner>
  <AccessControlList>
    <Grant>
      <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:type="Canonical User">
        <ID>***Owner-Canonical-User-ID***</ID>
        <DisplayName>owner-display-name</DisplayName>
      </Grantee>
      <Permission>FULL_CONTROL</Permission>
    </Grant>
  </AccessControlList>
</AccessControlPolicy>
```

- Блок Owner определяет владельца по каноническому идентификатору пользователя проекта и по домену.
- Блок Grant определяет получателя прав (проект сервиса или глобальную группу) и предоставляемое право доступа.

Базовый ACL содержит один элемент Grant для владельца. Вы можете предоставлять права с помощью добавления элементов Grant, где каждый из них определяет получателя прав и соответствующее право доступа.

### Получатель прав

Получателем прав может являться проект сервиса или одна из глобальных групп сервиса. Вы можете предоставлять права проекту сервиса при помощи адреса электронной почты (домена) или PID проекта. При этом если вы указываете адрес электронной почты (домен) в вашем запросе на права доступа, то сервис определяет канонический идентификатор пользователя для соответствующего проекта и добавляет его в ACL. В результате ACL всегда будут содержать канонический идентификатор пользователя для проекта сервиса, а не адрес электронной почты проекта (домен).

#### Глобальные группы сервиса

У сервиса существует набор предопределенных групп. При предоставлении группе прав доступа к проекту вы указываете один из наших URI вместо канонического идентификатора пользователя. Сервисом предоставляются нижеуказанные глобальные группы.

- Группа Authenticated Users — группа авторизованных пользователей.

Данная группа представляет собой все проекты сервиса. Наличие права доступа к этой группе позволяет любому проекту сервиса получать доступ к ресурсу, но в то же время все запросы должны быть подписаны (авторизованы).

- Группа All Users — группа всех пользователей.

Наличие права доступа к этой группе позволяет всем получать доступ к ресурсу. Запросы могут быть подписанными (авторизованными) или неподписанными (анонимными). В неподписанных запросах отсутствует заголовок аутентификации Authentication в запросе.

{note:warn}

При использовании ACL получателем прав может являться проект сервиса или одна из предопределенных групп сервиса.

{/note}

### Предоставляемые разрешения

Следующая таблица содержит набор разрешений, поддерживаемых сервисом в ACL. Необходимо отметить, что набор разрешений ACL один и тот же для объекта и бакета (за исключением запрета права WRITE на объекте). Нижеследующие таблицы содержат разрешения и описывают их в контексте разрешений объекта и бакета.

|Разрешение|При предоставлении на бакете|При предоставлении на объекте|
|--- |--- |--- |
|READ|Позволяет получателю прав получить список объектов в бакете.|Позволяет получателю прав прочитать данные объекта и его метаданные.|
|WRITE|Позволяет получателю прав создавать, переписывать и удалять любой объект в бакете.|Неприменимо.|
|READ_ACP|Позволяет получателю прав прочитать ACL бакета.|Позволяет получателю прав прочитать ACL объекта.|
|WRITE_ACP|Позволяет получателю прав записывать ACL для соответствующего бакета.|Позволяет получателю прав записывать ACL для соответствующего объекта.|
|FULL_CONTROL|Дает получателю прав следующие разрешения на бакет: READ, WRITE, READ_ACP и WRITE_ACP.|Дает получателю прав следующие разрешения на объект: READ, READ_ACP и WRITE_ACP.|

#### Соответствие разрешений ACL и разрешений политики доступа

Каждое из прав доступа позволяет провести в сервисе одну или несколько операций. Следующая таблица показывает соответствие прав доступа и операций.

|Разрешение ACL|Соответствующее разрешение политики доступа при предоставлении разрешения ACL на бакете|Соответствующее разрешение политики доступа при предоставлении разрешения ACL на объекте|
|--- |--- |--- |
|READ|HeadBucketListMultipartsListObjectsListParts|GetObjectHeadObject|
|WRITE|AbortMultipartUploadCompliteMultipartUploadInitiateMultipartUploadUploadPartPutObjectDeleteObject|Неприменимо|
|READ_ACP|GetBucketAcl|GetObjectAcl|
|WRITE_ACP|PutBucketAcl|PutObjectAcl|
|FULL_CONTROL|Эквивалентно предоставлению следующих разрешений ACL: READ, WRITE, READ_ACP и WRITE_ACP.|Эквивалентно предоставлению следующих разрешений ACL: READ, READ_ACP и WRITE_ACP.|

### Связанный ACL

Сервис поддерживает набор предопределенных предоставлений разрешений — так называемых «готовых ACL». Каждый готовый ACL содержит предопределенный набор получателей прав и разрешений. Следующая таблица содержит набор готовых ACL и связанных с ними предопределенных предоставлений разрешений.

|Связанный ACL|Область применения|Добавленные в ACL разрешения|
|--- |--- |--- |
|private|Бакет и объект|Владелец получает полные права (FULL_CONTROL). Остальные пользователи не получают прав доступа (по умолчанию).|
|public-read|Бакет и объект|Владелец получает полные права (FULL_CONTROL). Группа всех пользователей Allusers получает право доступа на чтение (READ).|
|public-read-write|Бакет и объект|Владелец получает полные права (FULL_CONTROL). Группа всех пользователей AllUsers получает права доступа на чтение (READ) и запись (WRITE). Как правило, не рекомендуется предоставлять данные разрешений на бакет.|
|authenticated-read|Бакет и объект|Владелец получает полные права (FULL_CONTROL). Группа авторизованных пользователей (AuthenticatedUsers) получает права доступа на чтение (READ).|
|bucket-owner-read|Объект|Владелец объекта получает полные права (FULL_CONTROL). Владелец бакета получает права на чтение (READ).|
|bucket-owner-full-control|Объект|Владелец объекта и владелец бакета получают полные права (FULL_CONTROL) на объект.|

{note:warn}

Можно указывать только один из этих связанных ACL в своем запросе  — только при установлении ACL через заголовки.

{/note}

## Установка ACL

API-сервис позволяет вам установить ACL при создании бакета или объекта. Сервис также предоставляет API для возможности установки ACL на существующем бакете или объекте. Эти API дают возможность устанавливать ACL с помощью нижеуказанных способов.

- Установка ACL с помощью заголовков запроса — при отправке запроса по созданию ресурса (бакета или объекта) вы устанавливаете ACL при помощи заголовков запроса. Данные заголовки позволяют вам указать или готовый ACL, или установить предоставления разрешений явным образом (однозначно определить получателя прав и разрешения).
- Установка ACL с помощью тела запроса — при отправке запроса по установке ACL на существующем ресурсе вы можете установить ACL или в заголовке запроса, или в теле.

### Обзор особых случаев при установке ACL

Будьте внимательны когда устанавливаете новое право доступа. Политика назначения прав доступа такова, что при установлении прав доступа в некоторых случаях может видоизменяться ваш ACL. Например, при установлении прав любой глобальной группе будут потеряны все права доступа для отдельных проектов. Чтобы этого не происходило, вам нужно устанавливать все права доступа одновременно — только в этом случае утери прав доступа отдельными проектами не происходит.

Рассмотрим пример. Вы завели проект `client@vkcloud-storage.ru` и создали бакет `bucketname`. Изначально бакет частный — только вы имеете к нему доступ.

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

Допустим, вы захотели дать доступ на запись, удаление или перезапись объектов для вашего бакета `bucketname` другому проекту `friend_project@vkcloud-storage.ru`.

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

Как вы видите, блок, содержащий ваши данные и предоставляемое право FULL_CONTROL (AccessControlPolicy.AccessControlList.Grant.Grantee), пропал. Однако это не значит, что вы как владелец больше не обладаете правом FULL_CONTROL. Вы всегда владеете этим правом и вас невозможно его лишить.

Данное поведение объясняется лишь синтаксисом ответа ACL, который требует наличие секций (AccessControlPolicy.AccessControlList.Grant.Grantee). Как вы можете заметить, при частном доступе на объекте никаким проектам или глобальным группам права не предоставляются.

Теперь, допустим, вы захотели сделать ваш бакет публичным для чтения. Для этого есть два пути:

1. Добавить public ACL через заголовки x-amz-acl или x-amz-grant-read или через тело запроса:

```http
 **PUT /?acl HTTP/1.1**
 Authorization: authorization string
 Connection: close
 Date: Wed, 02 Aug 2017 09:53:13 GMT
 Host: bucketname.hb.ru-msk.vkcloud-storage.ru
 X-amz-content-sha256: UNSIGNED-PAYLOAD
 X-amz-acl: public-read
```

```http
 **HTTP/1.1 200 OK**
 Server: nginx/1.12.1
 Date: Wed, 02 Aug 2017 09:53:14 GMT
 Content-Type: text/html; charset=utf-8
 Content-Length: 0
 Connection: close
 X-req-id: iySm3Cph

```

{cut(И тогда, запросив ACL на вашем бакете снова, вы увидите)}

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

Право WRITE для проекта `friend_project@vkcloud-storage.ru` исчезло и теперь данный проект не может записывать, удалять, перезаписывать объекты в вашем бакете. В блоках AccessControlPolicy.AccessControlList.Grant вы увидите информацию о пользователе, который установил публичный ACL, и сам публичный ACL.

2. Для сохранения прав доступа у проекта `friend_project@vkcloud-storage.ru` вам необходимо за один запрос установить права доступа и глобальной группе и вашему пользователю:

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
