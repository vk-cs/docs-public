Бакет объектілерін нұсқалауымен жұмыс істеуге арналған әдістер:

- {linkto(#api-spec-s3-get-bucket-versioning)[text=%text]} — нұсқалау статусын қарау.
- {linkto(#api-spec-s3-put-bucket-versioning)[text=%text]} — нұсқалауды қосу немесе уақытша тоқтату.
- {linkto(#api-spec-s3-list-object-versions)[text=%text]} — бакеттегі объектілердің барлық нұсқалары туралы метадеректерді алу.

## {heading(GetBucketVersioning)[id=api-spec-s3-get-bucket-versioning]}

`GET` операциясы бакеттің нұсқалануы туралы ақпаратты қайтарады. Нұсқалау екі күйдің біріне орнатылуы мүмкін: `Enabled` — қосылған; `Suspended` — уақытша тоқтатылған.

Жауап мысалы:

```curl
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<VersioningConfiguration>
   <Status>Suspended</Status>
</VersioningConfiguration>
```

## {heading(PutBucketVersioning)[id=api-spec-s3-put-bucket-versioning]}

`PUT` операциясы бакеттің нұсқалануын қосады немесе уақытша тоқтатады. Нұсқалауды екі күйдің біріне орнатуға болады:

- `Enabled` — объект нұсқаларын басқару қосылған. Бакетке қосылатын барлық жаңа объектілерге бірегей `versionId` нұсқа идентификаторы тағайындалады. Нұсқалау қосылғанға дейін бакетте болған объектілердің нұсқа идентификаторы `null` болады. Бұл объектілер өзгертілгеннен кейін оларға да `versionId` тағайындалады.
- `Suspended` — нұсқаларды басқару уақытша тоқтатылған. Бакетке қосылатын барлық жаңа объектілерге `null` мәніне тең нұсқа идентификаторы тағайындалады.

Бакет нұсқалануын қосуға арналған сұрау мысалы:

```curl
PUT /?versioning HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
Content-MD5: ContentMD5

<?xml version="1.0" encoding="UTF-8"?>
<VersioningConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <Status>Enabled</Status>
</VersioningConfiguration>
```

Мұнда `<Status>` — бакет нұсқалану статусы. Мүмкін мәндер: `Enabled` — қосылған; `Suspended` — уақытша тоқтатылған.

Жауап мысалы:

```curl
HTTP/1.1 200 OK
x-amz-id-2: YgIPIfBiKa2bj0KMg95r/0zo3emzU4dzsD4rcKCHQUAdQkf3ShJTOOpXUueF6QKo
x-amz-request-id: 236A8905248E5A01
Date: Wed, 01 Mar  2006 12:00:00 GMT3
```

## {heading(ListObjectVersions)[id=api-spec-s3-list-object-versions]}

Бакеттегі объектілердің барлық нұсқалары туралы метадеректерді, соның ішінде объектіні жою маркерін қайтарады. Объект нұсқаларының ішкі жиыны туралы метадеректерді қайтару үшін іріктеу критерийі ретінде сұрау параметрлерін пайдалануға болады.

Операцияны сәтті орындау үшін бакетті оқу `READ` құқықтарына ие болу қажет.

Сұрау мысалы:

```curl
GET /?versions&delimiter=Delimiter&encoding-type=EncodingType&key-marker=KeyMarker&max-keys=MaxKeys&prefix=Prefix&version-id-marker=VersionIdMarker HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-expected-bucket-owner: ExpectedBucketOwner
x-amz-request-payer: RequestPayer
x-amz-optional-object-attributes: OptionalObjectAttributes
```

**Path параметрлері**

{ifdef(s3-pdf)}
Параметрлер сипаттамасы {linkto(#tab_path_parameters2)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_path_parameters2]} — Path-параметрлер)[align=right;position=above;id=tab_path_parameters2;number={const(numb_tab_path_parameters2)}]}
{/ifdef}
[cols="1,3", options="header"]
|===
|Параметр
|Сипаттама

|`delimiter`
|Кілттерді топтастыру параметрі.
Егер `prefix` көрсетілсе, ішінде `delimiter` бар кілттерді префикс бойынша топтастырады

|`encoding-type`
|Жауаптағы объект кілттерін кодтау түрі

|`key-marker`
|Объектілерді тізімдеу басталатын кілт

|`max-keys`
|Жауаптағы элементтердің ең көп саны (1000-ға дейін), әдепкі бойынша — 1000

|`prefix`
|Параметр көрсетілсе, көрсетілген префикстен басталатын кілттер көрсетіледі

|`version-id-marker`
|Объектілерді тізімдеу басталатын объект нұсқасы. `key-marker` параметрімен бірге міндетті түрде көрсетіледі
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

**Жауап коды**

HTTP: 200 OK.

Сәтті жауап XML форматында қосымша деректерді қамтиды:

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

Мұнда:

- `CommonPrefixes` — `delimiter` және `prefix` параметрлерін өңдеу кезінде анықталатын кілт атауының бөлігі.
- `DeleteMarker` — объектілерді жою маркері.
- `Delimiter` — `delimiter` параметрінің мәні.
- `EncodingType` — {var(s3)} XML-жауапта кілтті ұсынатын кодтау. Клиент сұрауда `encoding-type` параметрін берген жағдайда пайда болады.
- `IsLatest` — объектінің өзекті нұсқасын көрсету жалаушасы.
- `IsTruncated` — барлық кілттердің берілген-берілмегенін көрсететін жалауша. Егер `IsTruncated` — `true` болса, {var(s3)} бөліктердің толық тізімін қайтармаған.
- `KeyMarker` — толық емес жауапта қайтарылған соңғы кілт.
- `LastModified` — объектінің соңғы өзгертілу уақыт белгісі.
- `MaxKeys` — `max-keys` параметрінің мәні.
- `NextKeyMarker` — егер бүкіл тізім ағымдағы жауапқа сыймаса, тізімнің келесі бөлігін алу үшін `key-marker` параметріне қою қажет мән.
- `NextVersionIdMarker` — егер бүкіл тізім ағымдағы жауапқа сыймаса, тізімнің келесі бөлігін алу үшін `version-id-marker` параметріне қою қажет мән.
- `Prefix` — `prefix` параметрінің мәні.
- `Version` — объект нұсқасы.
- `VersionIdMarker` — қысқартылған жауапта қайтарылған кілттің соңғы нұсқасын белгілейді.

<!-- 
Type: Array of CommonPrefix data types !!
Type: Array of DeleteMarkerEntry data types !!
-->