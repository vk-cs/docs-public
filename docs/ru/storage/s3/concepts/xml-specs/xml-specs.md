# {heading(Описание типов данных)[id=s3-concepts-xml-specs]}

## {heading(AccessControlPolicy)[id=s3-concepts-xml-specs-access-control-policy]}

{ifdef(s3-pdf)}
Описание типов данных AccessControlPolicy приведено в {linkto(#tab_access-control-policy)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_access-control-policy]} — AccessControlPolicy)[align=right;position=above;id=tab_access-control-policy;number={const(numb_tab_access-control-policy)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Owner
|Владелец бакета
|Owner
| ![](../../assets/no.svg "inline")

|AccessControlList
|Array of Grant
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Bucket)[id=s3-concepts-xml-specs-bucket]}

{ifdef(s3-pdf)}
Описание типов данных Bucket приведено в {linkto(#tab_bucket)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_bucket]} — Bucket)[align=right;position=above;id=tab_bucket;number={const(numb_tab_bucket)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Name
|Наименование бакета
|String
| ![](../../assets/no.svg "inline")

|CreationDate
|Дата создания. Эта дата может измениться при внесении изменений, например, при изменении политики бакета
|Timestamp
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CompletedMultipartUpload)[id=s3-concepts-xml-specs-completed-multipart-upload]}

{ifdef(s3-pdf)}
Описание типов данных CompletedMultipartUpload приведено в {linkto(#tab_completed-multipart-upload)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_completed-multipart-upload]} — CompletedMultipartUpload)[align=right;position=above;id=tab_completed-multipart-upload;number={const(numb_tab_completed-multipart-upload)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Part
|Массив CompletedPart
|Array of CompletedPart
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CompletedPart)[id=s3-concepts-xml-specs-completed-part]}

{ifdef(s3-pdf)}
Описание типов данных CompletedPart приведено в {linkto(#tab_completed-part)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_completed-part]} — CompletedPart)[align=right;position=above;id=tab_completed-part;number={const(numb_tab_completed-part)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|ETag
|Тег объекта, возвращенный при загрузке части
|String
| ![](../../assets/no.svg "inline")

|PartNumber
|Номер составной загрузки
|Integer
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CompleteMultipartUploadResult)[id=s3-concepts-xml-specs-complete-multipart-upload-result]}

{ifdef(s3-pdf)}
Описание типов данных CompleteMultipartUploadResult приведено в {linkto(#tab_complete-multipart-upload-result)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_complete-multipart-upload-result]} — CompleteMultipartUploadResult)[align=right;position=above;id=tab_complete-multipart-upload-result;number={const(numb_tab_complete-multipart-upload-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Bucket
|Наименование бакета, содержащего загружаемый объект
|String
| ![](../../assets/no.svg "inline")

|ETag
|Тег объекта, возвращенный при загрузке части
|String
| ![](../../assets/no.svg "inline")

|Key
|Ключ объекта
|String
| ![](../../assets/no.svg "inline")

|Location
|URI, идентифицирующий загружаемый объект
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Contents)[id=s3-concepts-xml-specs-contents]}

{ifdef(s3-pdf)}
Описание типов данных Contents приведено в {linkto(#tab_contents)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_contents]} — Contents)[align=right;position=above;id=tab_contents;number={const(numb_tab_contents)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Contents
|Данные об объекте
|Objects
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CopyObjectResult)[id=s3-concepts-xml-specs-copy-object-result]}

{ifdef(s3-pdf)}
Описание типов данных CopyObjectResult приведено в {linkto(#tab_copy-object-result)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_copy-object-result]} — CopyObjectResult)[align=right;position=above;id=tab_copy-object-result;number={const(numb_tab_copy-object-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|LastModified
|Дата последнего изменения объекта
|String
| ![](../../assets/no.svg "inline")

|ETag
|Возвращает ETag нового объекта. ETag отражает только изменения содержимого объекта, но не его метаданных
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CORSConfiguration)[id=s3-concepts-xml-specs-cors-configuration]}

{ifdef(s3-pdf)}
Описание типов данных CORSConfiguration приведено в {linkto(#tab_cors-configuration)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_cors-configuration]} — CORSConfiguration)[align=right;position=above;id=tab_cors-configuration;number={const(numb_tab_cors-configuration)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|CORSRule
|Набор источников и методов доступа между которыми необходимо разрешить
|Array of CORSRule
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CORSRule)[id=s3-concepts-xml-specs-cors-rule]}

{ifdef(s3-pdf)}
Описание типов данных CORSRule приведено в {linkto(#tab_cors-rule)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_cors-rule]} — CORSRule)[align=right;position=above;id=tab_cors-rule;number={const(numb_tab_cors-rule)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|AllowedHeaders
|Заголовки, указанные в заголовке `Access-Control-Request-Headers`. Эти заголовки разрешены в предварительном запросе `OPTIONS`. В ответ на любой предварительный запрос `OPTIONS` {var(s3)} возвращает все разрешенные запрошенные заголовки
|Array of strings
| ![](../../assets/no.svg "inline")

|AllowedMethods
|HTTP-метод, который разрешается выполнять источнику. Допустимые значения: `GET`, `PUT`, `HEAD`, `POST` и `DELETE`
|Array of strings
| ![](../../assets/no.svg "inline")

|AllowedOrigins
|Один или несколько источников, из которых вы хотите предоставить клиентам доступ к бакету
|Array of strings
| ![](../../assets/no.svg "inline")

|ExposeHeaders
|Один или несколько заголовков в ответе, к которым вы хотите предоставить клиентам доступ из своих приложений (например, из объекта JavaScript XMLHttpRequest)
|Array of strings
| ![](../../assets/no.svg "inline")

|ID
|Уникальный идентификатор правила
|Array of strings
| ![](../../assets/no.svg "inline")

|MaxAgeSeconds
|Время в секундах, в течение которого ваш браузер должен кэшировать предварительный ответ для указанного ресурса
|Integer
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CreateBucketConfiguration)[id=s3-concepts-xml-specs-create-bucket-configuration]}

{ifdef(s3-pdf)}
Описание типов данных CreateBucketConfiguration приведено в {linkto(#tab_create-bucket-configuration)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_create-bucket-configuration]} — CreateBucketConfiguration)[align=right;position=above;id=tab_create-bucket-configuration;number={const(numb_tab_create-bucket-configuration)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|LocationConstraint
|Регион, в котором создается бакет. Если регион не указан, он создается в регионе по умолчанию
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(CreatePrefixKeyResult)[id=s3-concepts-xml-specs-create-prefix-key-result]}

{ifdef(s3-pdf)}
Описание типов данных CreatePrefixKeyResult приведено в {linkto(#tab_create-prefix-key-result)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_create-prefix-key-result]} — CreatePrefixKeyResult)[align=right;position=above;id=tab_create-prefix-key-result;number={const(numb_tab_create-prefix-key-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|BucketName
|Наименование бакета
|String
| ![](../../assets/no.svg "inline")

|Prefix
|Префикс пути, который будет доступен по данным ключам
|String
| ![](../../assets/no.svg "inline")

|UserName
|Пользователь, которому принадлежат ключи
|String
| ![](../../assets/no.svg "inline")

|SecretKey
|Секретный ключ, возвращается только при создании, получить ключ впоследствии невозможно
|String
| ![](../../assets/no.svg "inline")

|AccessKey
|Публичный ключ
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Delete)[id=s3-concepts-xml-specs-delete]}

{ifdef(s3-pdf)}
Описание типов данных Delete приведено в {linkto(#tab_delete)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_delete]} — Delete)[align=right;position=above;id=tab_delete;number={const(numb_tab_delete)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Objects
|Объекты для удаления
|Array of ObjectIdentifier
| ![](../../assets/check.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(DeletedObject)[id=s3-concepts-xml-specs-deleted-object]}

{ifdef(s3-pdf)}
Описание типов данных DeletedObject приведено в {linkto(#tab_deleted-object)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_deleted-object]} — DeletedObject)[align=right;position=above;id=tab_deleted-object;number={const(numb_tab_deleted-object)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Key
|Ключ удаленного объекта
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(DeletePrefixKeyResult)[id=s3-concepts-xml-specs-delete-prefix-key-result]}

{ifdef(s3-pdf)}
Описание типов данных DeletePrefixKeyResult приведено в {linkto(#tab_delete-prefix-key-result)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_delete-prefix-key-result]} — DeletePrefixKeyResult)[align=right;position=above;id=tab_delete-prefix-key-result;number={const(numb_tab_delete-prefix-key-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Prefix
|Префикс пути, который будет доступен по данным ключам
|String
| ![](../../assets/no.svg "inline")

|UserName
|Пользователь, которому принадлежат ключи
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(DeleteResult)[id=s3-concepts-xml-specs-delete-result]}

{ifdef(s3-pdf)}
Описание типов данных DeleteResult приведено в {linkto(#tab_delete-result)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_delete-result]} — DeleteResult)[align=right;position=above;id=tab_delete-result;number={const(numb_tab_delete-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Deleted
|Контейнер для успешно удаленных объектов
|Array of DeletedObject
| ![](../../assets/check.svg "inline")

|Error
|Контейнер для описания объекта, который не удалось удалить
|Array of Error
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Error)[id=s3-concepts-xml-specs-error]}

{ifdef(s3-pdf)}
Описание типов данных Error приведено в {linkto(#tab_error)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_error]} — Error)[align=right;position=above;id=tab_error;number={const(numb_tab_error)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Code
|Код ошибки
|String
| ![](../../assets/no.svg "inline")

|Key
|Ключ объекта
|String
| ![](../../assets/no.svg "inline")

|Message
|Сообщение об ошибке
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Grant)[id=s3-concepts-xml-specs-grant]}

{ifdef(s3-pdf)}
Описание типов данных Grant приведено в {linkto(#tab_grant)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_grant]} — Grant)[align=right;position=above;id=tab_grant;number={const(numb_tab_grant)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Grantee
|Лицо, которому предоставлены разрешения
|Grantee
| ![](../../assets/no.svg "inline")

|Permission
|Тип разрешения, предоставленное лицу
|Одно из значений: 

- `FULL_CONTROL`
- `WRITE`
- `WRITE_ACP`
- `READ`
- `READ_ACP`
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Grantee)[id=s3-concepts-xml-specs-grantee]}

{ifdef(s3-pdf)}
Описание типов данных Grantee приведено в {linkto(#tab_grantee)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_grantee]} — Grantee)[align=right;position=above;id=tab_grantee;number={const(numb_tab_grantee)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|ID
|ID лица, которому предоставлены разрешения
|String
| ![](../../assets/no.svg "inline")

|DisplayName
|Отображаемое имя лица, которому предоставлены разрешения
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(InitiateMultipartUploadResult)[id=s3-concepts-xml-specs-initiate-multipart-upload-result]}

{ifdef(s3-pdf)}
Описание типов данных InitiateMultipartUploadResult приведено в {linkto(#tab_initiate-multipart-upload-result)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_initiate-multipart-upload-result]} — InitiateMultipartUploadResult)[align=right;position=above;id=tab_initiate-multipart-upload-result;number={const(numb_tab_initiate-multipart-upload-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Bucket
|Наименование бакета, в который инициирована составная загрузка
|String
| ![](../../assets/check.svg "inline")

|Key
|Ключ объекта, для которого инициирована составная загрузка
|String
| ![](../../assets/check.svg "inline")

|UploadId
|ID инициированной составной загрузки
|String
| ![](../../assets/check.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(LifecycleConfiguration)[id=s3-concepts-xml-specs-lifecycle-configuration]}

{ifdef(s3-pdf)}
Описание типов данных LifecycleConfiguration приведено в {linkto(#tab_lifecycle-configuration)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_lifecycle-configuration]} — LifecycleConfiguration)[align=right;position=above;id=tab_lifecycle-configuration;number={const(numb_tab_lifecycle-configuration)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Rule
|Описание правил фильтра
|Array of {linkto(#s3-concepts-xml-specs-lifecyclerule-api)[text=%text]}
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(LifecycleExpiration)[id=s3-concepts-xml-specs-lifecycle-api]}

{ifdef(s3-pdf)}
Описание типов данных LifecycleExpiration приведено в {linkto(#tab_lifecycle_api)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_lifecycle_api]} — LifecycleExpiration)[align=right;position=above;id=tab_lifecycle_api;number={const(numb_tab_lifecycle_api)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Date
|Дата, в которую объект должен быть удален
|Timestamp
| ![](../../assets/no.svg "inline")

|Days
|Время жизни объекта в днях
|Integer
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(LifecycleRule)[id=s3-concepts-xml-specs-lifecyclerule-api]}

{ifdef(s3-pdf)}
Описание типов данных LifecycleRule приведено в {linkto(#tab_lifecyclerule_api)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_lifecyclerule_api]} — LifecycleRule)[align=right;position=above;id=tab_lifecyclerule_api;number={const(numb_tab_lifecyclerule_api)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|ID
|Уникальный идентификатор правила
|String
| ![](../../assets/no.svg "inline")

|Status
|Статус правила:

- `Enabled` — применяется в данный момент;
- `Disabled` — в настоящее время не применяется
|String
| ![](../../assets/no.svg "inline")

|Filter
|Контейнер для фильтра правила жизненного цикла
|{linkto(#s3-concepts-xml-specs-lifecyclerulefilter-api)[text=%text]}
| ![](../../assets/no.svg "inline")

|Expiration
|Указывает срок жизни объекта
|{linkto(#s3-concepts-xml-specs-lifecycle-api)[text=%text]}
| ![](../../assets/no.svg "inline")

|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

<!--- //|Transition -->
<!--- //|Указывает, когда объект переходит к указанному классу хранилища -->
<!--- //|Array of xml_Transition -->
<!--- // ![](../../assets/no.svg "inline") -->
<!--- //|AbortIncompleteMultipartUpload -->
<!--- //|Указывает количество дней с начала незавершенной многокомпонентной загрузки, по истечении которых {var(s3)} безвозвратно удаляет все части загрузки -->
<!--- //|AbortIncompleteMultipartUpload -->
<!--- // ![](../../assets/no.svg "inline") -->

## {heading(LifecycleRuleFilter)[id=s3-concepts-xml-specs-lifecyclerulefilter-api]}

{ifdef(s3-pdf)}
Описание типов данных LifecycleRuleFilter приведено в {linkto(#tab_lifecyclerulefilter_api)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_lifecyclerulefilter_api]} — LifecycleRuleFilter)[align=right;position=above;id=tab_lifecyclerulefilter_api;number={const(numb_tab_lifecyclerulefilter_api)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Prefix
|Префикс, идентифицирующий один или несколько объектов, к которым применяется правило lifecycle
|String
| ![](../../assets/no.svg "inline")

|Tag
|Метка объекта. Пара ключ-значение для логической маркировки объектов
|Array of {linkto(#s3-concepts-xml-specs-xml-tag)[text=%text]}
| ![](../../assets/no.svg "inline")

|And
|Логический оператор «И». Применяется для сочетания в одном правиле фильтрацию по префиксу и по меткам
|Prefix

Array of {linkto(#s3-concepts-xml-specs-xml-tag)[text=%text]}

| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(ListAllMyBucketsResult)[id=s3-concepts-xml-specs-list-all-my-buckets-result]}

{ifdef(s3-pdf)}
Описание типов данных ListAllMyBucketsResult приведено в {linkto(#tab_list-all-my-buckets-result)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_list-all-my-buckets-result]} — ListAllMyBucketsResult)[align=right;position=above;id=tab_list-all-my-buckets-result;number={const(numb_tab_list-all-my-buckets-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Owner
|Информация о владельце
|Owner
| ![](../../assets/no.svg "inline")

|Buckets
|Список бакетов
|Array of Bucket
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(ListBucketResult)[id=s3-concepts-xml-specs-list-bucket-result]}

{ifdef(s3-pdf)}
Описание типов данных ListBucketResult приведено в {linkto(#tab_list-bucket-result)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_list-bucket-result]} — ListBucketResult)[align=right;position=above;id=tab_list-bucket-result;number={const(numb_tab_list-bucket-result)}]}
{/ifdef}
[cols="2,6,4,2",options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|IsTruncated
|Указывает, были ли возвращены (true) или нет (false) все результаты. Все результаты могут не быть возвращены, если количество результатов превышает указанное `MaxKeys`
|Boolean
| ![](../../assets/no.svg "inline")

|MaxKeys
|Максимальное количество объектов, возвращаемых в теле объекта
|String
| ![](../../assets/no.svg "inline")

|Name
|Наименование бакета
|String
| ![](../../assets/no.svg "inline")

|Prefix
|Ключи, начинающиеся с указанного префикса
|String
| ![](../../assets/no.svg "inline")

|Contents
|Метаданные о каждом возвращенном объекте
|Array of Contents
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

<!--- //|CommonPrefixes -->
<!--- //|-->
<!--- //|String -->
<!--- //|-->
<!--- // -->
<!--- //|Delimiter -->
<!--- //|-->
<!--- //|String -->
<!--- //|-->
<!--- //|Marker -->
<!--- //|Указывает, с какого сегмента бакета начать листинг. -->
<!--- //|String -->
<!--- //| ![](../../assets/no.svg "inline") -->

## {heading(ListPartsResult)[id=s3-concepts-xml-specs-list-parts-result]}

{ifdef(s3-pdf)}
Описание типов данных ListPartsResult приведено в {linkto(#tab_list-parts-result)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_list-parts-result]} — ListPartsResult)[align=right;position=above;id=tab_list-parts-result;number={const(numb_tab_list-parts-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Bucket
|Наименование бакета, в который инициирована составная загрузка
|String
| ![](../../assets/no.svg "inline")

|IsTruncated
|Указатель усечения списка возвращаемых частей
|Boolean
| ![](../../assets/no.svg "inline")

|Key
|Ключ объекта
|String
| ![](../../assets/no.svg "inline")

|MaxParts
|Максимальное количество частей, которые были разрешены в ответе
|Integer
| ![](../../assets/no.svg "inline")

|NextPartNumberMarker
|Указатель последней части составной загрузки в ответе для усеченного списка возвращаемых частей
|Integer
| ![](../../assets/no.svg "inline")

|Owner
|Владелец объекта
|Owner
| ![](../../assets/no.svg "inline")

|Part
|Массив частей составной загрузки
|Array of Part
| ![](../../assets/no.svg "inline")

|PartNumberMarker
|Указатель последней части составной загрузки в ответе для усеченного списка возвращаемых частей
|Integer
| ![](../../assets/no.svg "inline")

|StorageClass
|Класс хранения, заполняется значением STANDARD
|String
| ![](../../assets/no.svg "inline")

|UploadId
|Идентификатор загрузки, идентифицирующий составную загрузку, части которой указаны в списке
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

<!--- //|Initiator -->
<!--- //|Лицо, инициировавшее составную загрузку -->
<!--- //|Initiator -->
<!--- //|-->

## {heading(ListPrefixKeysResult)[id=s3-concepts-xml-specs-list-prefix-keys-result]}

{ifdef(s3-pdf)}
Описание типов данных ListPrefixKeysResult приведено в {linkto(#tab_list-prefix-keys-result)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_list-prefix-keys-result]} — ListPrefixKeysResult)[align=right;position=above;id=tab_list-prefix-keys-result;number={const(numb_tab_list-prefix-keys-result)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|BucketName
|Наименование бакета
|String
| ![](../../assets/no.svg "inline")

|IsTruncated
|Указывает, были ли возвращены (true) или нет (false) все результаты
|Boolean
| ![](../../assets/no.svg "inline")

|Marker
|Имя или часть имени пользователя, с которого начнется листинг
|String
| ![](../../assets/no.svg "inline")

|NamePrefix
|Префикс по именам пользователей
|String
| ![](../../assets/no.svg "inline")

|MaxKeys
|Максимальное количество элементов в листинге
|String
| ![](../../assets/no.svg "inline")

|Contents
|Блок, содержащий пользователя
|Array of Contents
| ![](../../assets/no.svg "inline")

|UserName
|Пользователь, которому принадлежат ключи
|String
| ![](../../assets/no.svg "inline")

|Prefix
|Префикс, по которому доступны данные для этого пользователя
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Object)[id=s3-concepts-xml-specs-object]}

{ifdef(s3-pdf)}
Описание типов данных Object приведено в {linkto(#tab_object)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_object]} — Object)[align=right;position=above;id=tab_object;number={const(numb_tab_object)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|ETag
|Хеш объекта. ETag отражает только изменения содержимого объекта, но не его метаданных
|String
| ![](../../assets/no.svg "inline")

|Key
|Имя объекта. Используется как ключ для извлечения объекта
|String
| ![](../../assets/no.svg "inline")

|LastModified
|Дата создания объекта
|Timestamp
| ![](../../assets/no.svg "inline")

|Owner
|Владелец объекта
|Owner
| ![](../../assets/no.svg "inline")

|Size
|Размер объекта в байтах
|Integer
| ![](../../assets/no.svg "inline")

|StorageClass
|Класс хранилища, используемый для хранения объекта. В текущей реализации принимает значение `STANDARD`
|String
| ![](../../assets/no.svg "inline")

|VersionId
|ID версии объекта
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(ObjectIdentifier)[id=s3-concepts-xml-specs-object-identifier]}

{ifdef(s3-pdf)}
Описание типов данных ObjectIdentifier приведено в {linkto(#tab_object-identifier)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_object-identifier]} — ObjectIdentifier)[align=right;position=above;id=tab_object-identifier;number={const(numb_tab_object-identifier)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Key
|Ключ объекта
|String
| ![](../../assets/check.svg "inline")
|===
{/caption}

<!--- //|VersionId -->
<!--- //|ID объекта -->
<!--- //|String -->
<!--- //| ![](../../assets/no.svg "inline") -->

## {heading(Owner)[id=s3-concepts-xml-specs-owner]}

{ifdef(s3-pdf)}
Описание типов данных Owner приведено в {linkto(#tab_owner)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_owner]} — Owner)[align=right;position=above;id=tab_owner;number={const(numb_tab_owner)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|DisplayName
|Отображаемое имя владельца
|String
| ![](../../assets/no.svg "inline")

|ID
|ID владельца
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Part)[id=s3-concepts-xml-specs-part]}

{ifdef(s3-pdf)}
Описание типов данных Part приведено в {linkto(#tab_part)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_part]} — Part)[align=right;position=above;id=tab_part;number={const(numb_tab_part)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|ETag
|Тег объекта, возвращаемый при загрузке части объекта
|String
| ![](../../assets/no.svg "inline")

|LastModified
|Дата и время загрузки части объекта
|Timestamp
| ![](../../assets/no.svg "inline")

|PartNumber
|Номер составной загрузки
|Integer
| ![](../../assets/no.svg "inline")

|Size
|Размер загруженной части составной загрузки
|Integer
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(Tag)[id=s3-concepts-xml-specs-xml-tag]}

{ifdef(s3-pdf)}
Описание типов данных Tag приведено в {linkto(#tab_xml_tag)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_xml_tag]} — Tag)[align=right;position=above;id=tab_xml_tag;number={const(numb_tab_xml_tag)}]}
{/ifdef}
[cols="2,6,4,2", options="header"]
|===
|Имя
|Описание
|Тип
|Обязательное

|Key
|Ключ метки. Длина — до 128 символов
|String
| ![](../../assets/no.svg "inline")

|Value
|Значение метки. Длина — до 256 символов
|String
| ![](../../assets/no.svg "inline")
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

<!--- // [[xml_Transition]] -->
<!--- // == Transition -->
<!--- // [cols="2,4,1,1"] -->
<!--- // |=== -->
<!--- // |Имя |Описание |Тип |Обязательное -->
<!--- // |Date -->
<!--- // |Указывает, когда объекты переводятся в указанный класс хранения -->
<!--- // |Timestamp -->
<!--- // | ![](../../assets/no.svg "inline") -->
<!--- // |Days -->
<!--- // |Указывает количество дней после создания, когда объекты переводятся в указанный класс хранения -->
<!--- // |Integer -->
<!--- // | ![](../../assets/no.svg "inline") -->
<!--- // |StorageClass -->
<!--- // |Идентификатор класса хранилища -->
<!--- // |String -->
<!--- // | ![](../../assets/no.svg "inline") -->
<!--- // |=== -->