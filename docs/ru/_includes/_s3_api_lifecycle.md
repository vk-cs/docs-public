
Все доступные методы для работы с жизненным циклом объектов:

- {linkto(#api-spec-s3-get-bucket-lifecycle-configuration)[text=%text]} — посмотреть конфигурацию жизненного цикла.
- {linkto(#api-spec-s3-put-bucket-lifecycle)[text=%text]} — установить конфигурацию с правилами жизненного цикла.
- {linkto(#api-spec-s3-delete-bucket-lifecycle)[text=%text]} — удалить конфигурацию жизненного цикла.

Конфигурация с правилами жизненного цикла передается в формате XML. Для фильтрации объектов, попадающих под правило, используются {ifdef(public)}{linkto(../../../../../storage/s3/concepts/features#s3-concepts-features-tagging)[text=теги]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/features#s3-concepts-features-tagging)[text=теги]}{/ifdef} и {ifdef(public)}{linkto(../../../../../storage/s3/concepts/about#s3-concepts-about-object-key)[text=ключ объекта]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/about#s3-concepts-about-object-key)[text=ключ объекта]}{/ifdef}.

## {heading(XML-структура конфигурации жизненного цикла)[id=api-spec-s3-lifecycle-request-body]}

{cut(Общий вид конфигурации с префиксом и тегами)}

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
Описание параметров приведено в {linkto(#tab_param)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_param]} — Параметры)[align=right;position=above;id=tab_param;number={const(numb_tab_param)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Параметр
|Тип
|Описание

|`Rule`
|repeating complex element
|Правило жизненного цикла

|`Rule.Expiration`
|complex element
|Срок жизни объекта

|`Rule.Expiration.Days`
|xs\:integer (integer)
|Количество дней, через которое объект будет удален

|`Rule.ID`
|xs\:string (string)
|Уникальный идентификатор правила

|`Rule.Status`
|xs\:string (enum)
|Статус правила. Возможные значения:

- `Enabled` — правило применяется;
- `Disabled` — правило не применяется

|`Rule.Filter`
|complex element
|Фильтр по объектам, к которым должно применяться правило

|`Rule.Filter.And`
|complex element
|Логический оператор «И». Применяется для сочетания в одном правиле фильтрации по префиксу и нескольким тегам

|`Rule.Filter.And.Prefix`
|xs\:string (string)
|Префикс {ifdef(public)}{linkto(../../../../../storage/s3/concepts/about#s3-concepts-about-object-key)[text=ключа объекта]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/about#s3-concepts-about-object-key)[text=ключа объекта]}{/ifdef}.

|`Rule.Filter.And.Tag`
|repeating complex element
|{ifdef(public)}{linkto(../../../../../storage/s3/concepts/features#s3-concepts-features-tagging)[text=Тег]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/features#s3-concepts-features-tagging)[text=Тег]}{/ifdef} объекта.
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}
{/cut}

{cut(Общий вид конфигурации только c префиксами)}

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
Описание параметров приведено в {linkto(#tab_param2)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_param2]} — Параметры)[align=right;position=above;id=tab_param2;number={const(numb_tab_param2)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Параметр
|Тип
|Описание

|`Rule`
|repeating complex element
|Правило жизненного цикла

|`Rule.Expiration`
|complex element
|Срок жизни объекта

|`Rule.Expiration.Days`
|xs\:integer (integer)
|Количество дней, через которое объект будет удален

|`Rule.ID`
|xs\:string (string)
|Уникальный идентификатор правила

|`Rule.Status`
|xs\:string (enum)
|Статус правила. Возможные значения:

- `Enabled` — правило применяется;
- `Disabled` — правило не применяется

|`Rule.Filter`
|complex element
|Фильтр по объектам, к которым должно применяться правило

|`Rule.Filter.Prefix`
|xs\:string (string)
|Префикс {ifdef(public)}{linkto(../../../../../storage/s3/concepts/about#s3-concepts-about-object-key)[text=ключа объекта]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/about#s3-concepts-about-object-key)[text=ключа объекта]}{/ifdef}.
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}
{/cut}

{cut(Общий вид конфигурации только по одному тегу)}

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
Описание параметров приведено в {linkto(#tab_param3)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_param3]} — Параметры)[align=right;position=above;id=tab_param3;number={const(numb_tab_param3)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Параметр
|Тип
|Описание

|`Rule`
|repeating complex element
|Правило жизненного цикла

|`Rule.Expiration`
|complex element
|Срок жизни объекта

|`Rule.Expiration.Days`
|xs\:integer (integer)
|Количество дней, через которое объект будет удален

|`Rule.ID`
|xs\:string (string)
|Уникальный идентификатор правила

|`Rule.Status`
|xs\:string (enum)
|Статус правила. Возможные значения:

- `Enabled` — правило применяется;
- `Disabled` — правило не применяется

|`Rule.Filter`
|complex element
|Фильтр по объектам, к которым должно применяться правило

|`Rule.Filter.Tag`
|complex element
|{ifdef(public)}{linkto(../../../../../storage/s3/concepts/features#s3-concepts-features-tagging)[text=Тег]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/features#s3-concepts-features-tagging)[text=Тег]}{/ifdef}  объекта.
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

{/cut}

## {heading(GetBucketLifecycleConfiguration)[id=api-spec-s3-get-bucket-lifecycle-configuration]}

Операция `GET` возвращает информацию по конфигурации жизненного цикла, установленной для бакета.

В конфигурации жизненного цикла для бакета можно указывать правило жизненного цикла с помощью префикса имени ключа объекта, одного или нескольких тегов объекта или сочетания обоих этих параметров. Ответ содержит элемент фильтра, которым можно воспользоваться для изменения параметров фильтра и выбора поднабора объектов, к которым должно быть применимо правило.

Пример запроса:

```curl
GET /?lifecycle HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T001757Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e92e48fb16dad3d9d332460adde86493b8930262d9385e002b0408e17a2781f4
```

Пример ответа:

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

В конфигурации жизненного цикла для бакета можно указывать правило жизненного цикла с помощью префикса имени ключа объекта.

Операция `PUT` создает новую конфигурацию жизненного цикла для бакета или заменяет существующую.

Пример запроса:

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

Пример ответа:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 17:31:43 GMT
x-amz-request-id: tx00000000000000010ad2b-005a6135e2-f647d-ru-mska
Content-Length: 0
Content-Type: application/xml
Connection: close
```

## {heading(DeleteBucketLifecycle)[id=api-spec-s3-delete-bucket-lifecycle]}

Операция `DELETE` удаляет конфигурацию жизненного цикла из указанного бакета. Удаляются все правила конфигурации жизненного цикла из подресурса жизненного цикла, связанного с бакетом, что позволяет исключать срок действия из объектов. Как следствие, сервис больше не будет автоматически удалять объекты согласно правилам, содержащимся в удаленной конфигурации жизненного цикла.

Пример запроса:

```curl
DELETE /?lifecycle HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T204101Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=376fe41764fe6493a33160b36055d8f617b92f9337bce0cf91bc9c5b1e7482b2
```

Пример ответа:

```curl
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 18:13:21 GMT
Connection: close
```
