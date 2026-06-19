
Объектілердің өмірлік циклімен жұмыс істеуге арналған барлық қолжетімді әдістер:

- {linkto(#api-spec-s3-get-bucket-lifecycle-configuration)[text=%text]} — өмірлік цикл конфигурациясын қарау.
- {linkto(#api-spec-s3-put-bucket-lifecycle)[text=%text]} — өмірлік цикл ережелері бар конфигурацияны орнату.
- {linkto(#api-spec-s3-delete-bucket-lifecycle)[text=%text]} — өмірлік цикл конфигурациясын жою.

Өмірлік цикл ережелері бар конфигурация XML форматында беріледі. Ережеге түсетін объектілерді сүзгілеу үшін {ifdef(public)}{linkto(../../../../../storage/s3/concepts/features#s3-concepts-features-tagging)[text=тегтер]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/features#s3-concepts-features-tagging)[text=тегтер]}{/ifdef} және {ifdef(public)}{linkto(../../../../../storage/s3/concepts/about#s3-concepts-about-object-key)[text=объект кілті]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/about#s3-concepts-about-object-key)[text=объект кілті]}{/ifdef} қолданылады.

## {heading(Өмірлік цикл конфигурациясының XML-құрылымы)[id=api-spec-s3-lifecycle-request-body]}

{cut(Префикс пен тегтері бар конфигурацияның жалпы көрінісі)}

```XML
<LifecycleConfiguration>
  <Rule>
    <Expiration>
      <Days>30</Days>
    </Expiration>
    <ID>string</ID>
    <Status>Enabled</Status>
    <Filter>
      <And>
        <Prefix>string</Prefix>
        <Tag>
          <Key>tagKey1</Key>
          <Value>tagValue1</Value>
        </Tag>
        <Tag>
          <Key>tagKey2</Key>
          <Value>tagValue2</Value>
        </Tag>
        <Tag>
          <Key>tagKey3</Key>
          <Value>tagValue3</Value>
        </Tag>
      </And>
    </Filter>
  </Rule>
</LifecycleConfiguration>
```

{ifdef(s3-pdf)}
Параметрлер сипаттамасы {linkto(#tab_param)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_param]} — Параметрлер)[align=right;position=above;id=tab_param;number={const(numb_tab_param)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Параметр
|Түрі
|Сипаттама

|`Rule`
|repeating complex element
|Өмірлік цикл ережесі

|`Rule.Expiration`
|complex element
|Объектінің өмір сүру мерзімі

|`Rule.Expiration.Days`
|xs\:integer (integer)
|Объект жойылатын күндер саны

|`Rule.ID`
|xs\:string (string)
|Ереженің бірегей идентификаторы

|`Rule.Status`
|xs\:string (enum)
|Ереже статусы. Мүмкін мәндер:

- `Enabled` — ереже қолданылады;
- `Disabled` — ереже қолданылмайды

|`Rule.Filter`
|complex element
|Ереже қолданылуы тиіс объектілер бойынша сүзгі

|`Rule.Filter.And`
|complex element
|«ЖӘНЕ» логикалық операторы. Бір ережеде префикс және бірнеше тег бойынша сүзгілеуді біріктіру үшін қолданылады

|`Rule.Filter.And.Prefix`
|xs\:string (string)
|{ifdef(public)}{linkto(../../../../../storage/s3/concepts/about#s3-concepts-about-object-key)[text=объект кілтінің]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/about#s3-concepts-about-object-key)[text=объект кілтінің]}{/ifdef} префиксі.

|`Rule.Filter.And.Tag`
|repeating complex element
|Объектінің {ifdef(public)}{linkto(../../../../../storage/s3/concepts/features#s3-concepts-features-tagging)[text=тегі]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/features#s3-concepts-features-tagging)[text=тегі]}{/ifdef}.
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}
{/cut}

{cut(Тек префикстері бар конфигурацияның жалпы көрінісі)}

```XML
<LifecycleConfiguration>
  <Rule>
    <Expiration>
      <Days>30</Days>
    </Expiration>
    <ID>string</ID>
    <Status>Enabled</Status>
    <Filter>
      <Prefix>string</Prefix>
    </Filter>
  </Rule>
</LifecycleConfiguration>
```

{ifdef(s3-pdf)}
Параметрлер сипаттамасы {linkto(#tab_param2)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_param2]} — Параметрлер)[align=right;position=above;id=tab_param2;number={const(numb_tab_param2)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Параметр
|Түрі
|Сипаттама

|`Rule`
|repeating complex element
|Өмірлік цикл ережесі

|`Rule.Expiration`
|complex element
|Объектінің өмір сүру мерзімі

|`Rule.Expiration.Days`
|xs\:integer (integer)
|Объект жойылатын күндер саны

|`Rule.ID`
|xs\:string (string)
|Ереженің бірегей идентификаторы

|`Rule.Status`
|xs\:string (enum)
|Ереже статусы. Мүмкін мәндер:

- `Enabled` — ереже қолданылады;
- `Disabled` — ереже қолданылмайды

|`Rule.Filter`
|complex element
|Ереже қолданылуы тиіс объектілер бойынша сүзгі

|`Rule.Filter.Prefix`
|xs\:string (string)
|{ifdef(public)}{linkto(../../../../../storage/s3/concepts/about#s3-concepts-about-object-key)[text=объект кілтінің]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/about#s3-concepts-about-object-key)[text=объект кілтінің]}{/ifdef} префиксі.
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}
{/cut}

{cut(Тек бір тег бойынша конфигурацияның жалпы көрінісі)}

```XML
<LifecycleConfiguration>
  <Rule>
    <Expiration>
      <Days>30</Days>
    </Expiration>
    <ID>string</ID>
    <Status>Enabled</Status>
    <Filter>
      <Tag>
        <Key>tagKey</Key>
        <Value>tagValue</Value>
      </Tag>
    </Filter>
  </Rule>
</LifecycleConfiguration>
```
{ifdef(s3-pdf)}
Параметрлер сипаттамасы {linkto(#tab_param3)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_param3]} — Параметрлер)[align=right;position=above;id=tab_param3;number={const(numb_tab_param3)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Параметр
|Түрі
|Сипаттама

|`Rule`
|repeating complex element
|Өмірлік цикл ережесі

|`Rule.Expiration`
|complex element
|Объектінің өмір сүру мерзімі

|`Rule.Expiration.Days`
|xs\:integer (integer)
|Объект жойылатын күндер саны

|`Rule.ID`
|xs\:string (string)
|Ереженің бірегей идентификаторы

|`Rule.Status`
|xs\:string (enum)
|Ереже статусы. Мүмкін мәндер:

- `Enabled` — ереже қолданылады;
- `Disabled` — ереже қолданылмайды

|`Rule.Filter`
|complex element
|Ереже қолданылуы тиіс объектілер бойынша сүзгі

|`Rule.Filter.Tag`
|complex element
|Объектінің {ifdef(public)}{linkto(../../../../../storage/s3/concepts/features#s3-concepts-features-tagging)[text=тегі]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/features#s3-concepts-features-tagging)[text=тегі]}{/ifdef}  .
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

{/cut}

## {heading(GetBucketLifecycleConfiguration)[id=api-spec-s3-get-bucket-lifecycle-configuration]}

`GET` операциясы бакет үшін орнатылған өмірлік цикл конфигурациясы туралы ақпаратты қайтарады.

Бакет үшін өмірлік цикл конфигурациясында өмірлік цикл ережесін объект кілті атауының префиксі, объектінің бір немесе бірнеше тегі немесе осы екі параметрдің комбинациясы арқылы көрсетуге болады. Жауапта сүзгі элементі болады, оны сүзгі параметрлерін өзгерту және ереже қолданылуы тиіс объектілердің ішкі жиынын таңдау үшін пайдалануға болады.

Сұрау мысалы:

```curl
GET /?lifecycle HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T001757Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e92e48fb16dad3d9d332460adde86493b8930262d9385e002b0408e17a2781f4
```

Жауап мысалы:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 17:44:35 GMT
x-amz-request-id: tx000000000000000023935-005a613936-fcf92-ru-mska
Content-Type: application/xml
Content-Length: 488
Connection: close

<LifecycleConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Rule>
        <ID>Expire old logs</ID>
        <Prefix>logs/</Prefix>
        <Status>Enabled</Status>
        <Expiration>
            <Days>90</Days>
        </Expiration>
    </Rule>
</LifecycleConfiguration>
```

## {heading(PutBucketLifecycle)[id=api-spec-s3-put-bucket-lifecycle]}

Бакет үшін өмірлік цикл конфигурациясында өмірлік цикл ережесін объект кілті атауының префиксі арқылы көрсетуге болады.

`PUT` операциясы бакет үшін жаңа өмірлік цикл конфигурациясын жасайды немесе барын ауыстырады.

Сұрау мысалы:

```curl
PUT /?lifecycle HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
Content-Length: 488
Content-Type: application/xml
x-amz-content-sha256: 34850007f92ec3331486b48fd7db15f48315fe73c4a9b135e6d9fd629276c1e7
x-amz-date: 20200831T000345Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-md5;content-type;host;x-amz-content-sha256;x-amz-date,Signature=fc07a541c2acdbf7527eba358afa0a6d460c9bfec539dd29dfa6b5b854aae109

<LifecycleConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Rule>
        <ID>Expire old logs</ID>
        <Prefix>logs/</Prefix>
        <Status>Enabled</Status>
        <Expiration>
            <Days>90</Days>
        </Expiration>
    </Rule>
</LifecycleConfiguration>
```

Жауап мысалы:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 17:31:43 GMT
x-amz-request-id: tx00000000000000010ad2b-005a6135e2-f647d-ru-mska
Content-Length: 0
Content-Type: application/xml
Connection: close
```

## {heading(DeleteBucketLifecycle)[id=api-spec-s3-delete-bucket-lifecycle]}

`DELETE` операциясы көрсетілген бакеттен өмірлік цикл конфигурациясын жояды. Бакетпен байланысты өмірлік цикл ішкіресурсынан өмірлік цикл конфигурациясының барлық ережелері жойылады, бұл объектілерден жарамдылық мерзімін алып тастауға мүмкіндік береді. Нәтижесінде сервис жойылған өмірлік цикл конфигурациясындағы ережелерге сәйкес объектілерді енді автоматты түрде жоймайды.

Сұрау мысалы:

```curl
DELETE /?lifecycle HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T204101Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=376fe41764fe6493a33160b36055d8f617b92f9337bce0cf91bc9c5b1e7482b2
```

Жауап мысалы:

```curl
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 18:13:21 GMT
Connection: close
```
