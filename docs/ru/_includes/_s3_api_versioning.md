Методы для работы с версионированием объектов бакета:

- {linkto(#api-spec-s3-get-bucket-versioning)[text=%text]} — посмотреть статус версионирования.
- {linkto(#api-spec-s3-put-bucket-versioning)[text=%text]} — включить или приостановить версионирование.
- {linkto(#api-spec-s3-list-object-versions)[text=%text]} — получить метаданные обо всех версиях объектов в бакете.

## {heading(GetBucketVersioning)[id=api-spec-s3-get-bucket-versioning]}

Операция `GET` возвращает информацию по версионирование бакета. Версионирование может быть установлено в одно из двух состояний: `Enabled` — включено; `Suspended` — приостановлено.

Пример ответа:

```curl
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<VersioningConfiguration>
   <Status>Suspended</Status>
</VersioningConfiguration>
```

## {heading(PutBucketVersioning)[id=api-spec-s3-put-bucket-versioning]}

Операция `PUT` включает или приостанавливает версионирование бакета. Версионирование можно установить в одно из двух состояний:

- `Enabled` — управление версиями объектов включено. Всем новым объектам, добавляемым в бакет, будет присвоен уникальный идентификатор версии `versionId`. Объекты, уже существовавшие в бакете до включения версионирования, имеют идентификатор версии, равный `null`. После изменения этих объектов им также будет присвоен `versionId`.
- `Suspended` — управление версиями приостановлено. Всем новым объектам, добавляемым в бакет, будет присвоен идентификатор версии, равный `null`.

Пример запроса на включение версионирования бакета:

```curl
PUT /?versioning HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
Content-MD5: ContentMD5

<?xml version="1.0" encoding="UTF-8"?>
<VersioningConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <Status>Enabled</Status>
</VersioningConfiguration>
```

Здесь `<Status>` — статус версионирования бакета. Возможные значения: `Enabled` — включено; `Suspended` — приостановлено.

Пример ответа:

```curl
HTTP/1.1 200 OK
x-amz-id-2: YgIPIfBiKa2bj0KMg95r/0zo3emzU4dzsD4rcKCHQUAdQkf3ShJTOOpXUueF6QKo
x-amz-request-id: 236A8905248E5A01
Date: Wed, 01 Mar  2006 12:00:00 GMT3
```

## {heading(ListObjectVersions)[id=api-spec-s3-list-object-versions]}

Возвращает метаданные обо всех версиях объектов в бакете, включая маркер удаления объекта. Можно использовать параметры запроса в качестве критерия выбора для возврата метаданных о подмножестве версий объекта.

Чтобы успешно выполнить операцию необходимо обладать правами на чтение бакета `READ`.

Пример запроса:

```curl
GET /?versions&delimiter=Delimiter&encoding-type=EncodingType&key-marker=KeyMarker&max-keys=MaxKeys&prefix=Prefix&version-id-marker=VersionIdMarker HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-expected-bucket-owner: ExpectedBucketOwner
x-amz-request-payer: RequestPayer
x-amz-optional-object-attributes: OptionalObjectAttributes
```

**Path параметры**

{ifdef(s3-pdf)}
Описание параметров приведено в {linkto(#tab_path_parameters2)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_path_parameters2]} — Path-параметры)[align=right;position=above;id=tab_path_parameters2;number={const(numb_tab_path_parameters2)}]}
{/ifdef}
[cols="1,3", options="header"]
|===
|Параметр
|Описание

|`delimiter`
|Параметр для группировки ключей.
Группирует ключи, в которых есть `delimiter` по префиксу, если указан `prefix`

|`encoding-type`
|Тип кодировки ключей объектов в ответе

|`key-marker`
|Ключ, с которого начнется перечисление объектов

|`max-keys`
|Максимальное количество элементов в ответе (до 1000), по умолчанию — 1000

|`prefix`
|При указании параметра будут показаны ключи, начинающиеся с указанного префикса

|`version-id-marker`
|Версия объекта, с которой начинается перечисление объектов. Обязательно указывается с `key-marker`
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

**Код ответа**

HTTP: 200 OK.

Успешный ответ содержит дополнительные данные в формате XML:

```xml
<ListVersionsResult>
   <IsTruncated>boolean</IsTruncated>
   <KeyMarker>string</KeyMarker>
   <VersionIdMarker>string</VersionIdMarker>
   <NextKeyMarker>string</NextKeyMarker>
   <NextVersionIdMarker>string</NextVersionIdMarker>
   <Version>
      <ChecksumAlgorithm>string</ChecksumAlgorithm>
      ...
      <ChecksumType>string</ChecksumType>
      <ETag>string</ETag>
      <IsLatest>boolean</IsLatest>
      <Key>string</Key>
      <LastModified>timestamp</LastModified>
      <Owner>
         <DisplayName>string</DisplayName>
         <ID>string</ID>
      </Owner>
      <RestoreStatus>
         <IsRestoreInProgress>boolean</IsRestoreInProgress>
         <RestoreExpiryDate>timestamp</RestoreExpiryDate>
      </RestoreStatus>
      <Size>long</Size>
      <StorageClass>string</StorageClass>
      <VersionId>string</VersionId>
   </Version>
   ...
   <DeleteMarker>
      <IsLatest>boolean</IsLatest>
      <Key>string</Key>
      <LastModified>timestamp</LastModified>
      <Owner>
         <DisplayName>string</DisplayName>
         <ID>string</ID>
      </Owner>
      <VersionId>string</VersionId>
   </DeleteMarker>
   ...
   <Name>string</Name>
   <Prefix>string</Prefix>
   <Delimiter>string</Delimiter>
   <MaxKeys>integer</MaxKeys>
   <CommonPrefixes>
      <Prefix>string</Prefix>
   </CommonPrefixes>
   ...
   <EncodingType>string</EncodingType>
</ListVersionsResult>
```

Здесь:

- `CommonPrefixes` — Часть имени ключа, которая определяется при обработке параметров `delimiter` и `prefix`.
- `DeleteMarker` — Маркер удаления объектов.
- `Delimiter` — Значение параметра `delimiter`.
- `EncodingType` — Кодировка, в которой {var(s3)} представляет ключ в XML-ответе. Появляется, если клиент при запросе передал параметр `encoding-type`.
- `IsLatest` — Флаг указания актуальной версии объекта.
- `IsTruncated` — Флаг, указывающий, все ли ключи были выданы. Если `IsTruncated` — `true`, то {var(s3)} вернула не полный список частей.
- `KeyMarker` — Последний ключ, возвращенный в неполном ответе.
- `LastModified` — Временная метка последнего изменения объекта.
- `MaxKeys` — Значение параметра `max-keys`.
- `NextKeyMarker` — Значение, которое надо подставить в параметр `key-marker` для получения следующей части списка, если весь список не поместился в текущий ответ.
- `NextVersionIdMarker` — Значение, которое надо подставить в параметр `version-id-marker` для получения следующей части списка, если весь список не поместился в текущий ответ.
- `Prefix` — Значение параметра `prefix`.
- `Version` — Версия объекта.
- `VersionIdMarker` — Отмечает последнюю версию ключа, возвращенную в усеченном ответе.

<!-- 
Type: Array of CommonPrefix data types !!
Type: Array of DeleteMarkerEntry data types !!
-->