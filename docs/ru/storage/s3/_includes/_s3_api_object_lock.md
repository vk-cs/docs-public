Методы для работы с блокировкой объектов:

- {linkto(#api-spec-s3-get-object-legal-hold)[text=%text]} — Получить статус бессрочной блокировки.
- {linkto(#api-spec-s3-put-object-legal-hold)[text=%text]} — Установить или снять бессрочную блокировку.
- {linkto(#api-spec-s3-get-object-retention)[text=%text]} — Получить статус временной блокировки.
- {linkto(#api-spec-s3-put-object-retention)[text=%text]} — Установить, настроить или снять временную блокировку.
- {linkto(#api-spec-s3-get-object-lock-configuration)[text=%text]} — Получить статус временной блокировки по умолчанию.
- {linkto(#api-spec-s3-put-object-lock-configuration)[text=%text]} — Установить, настроить или снять временную блокировку по умолчанию.

## {heading(GetObjectLegalHold)[id=api-spec-s3-get-object-legal-hold]}

Возвращает статус бессрочной блокировки, установленной на объект.

Пример запроса:

```curl
GET /{Key+}?legal-hold HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
```

Пример ответа:

```curl
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<LegalHold>
   <Status>string</Status>
</LegalHold>
```

## {heading(PutObjectLegalHold)[id=api-spec-s3-put-object-legal-hold]}

Метод `PutObjectLegalHold` устанавливает или снимает бессрочную блокировку на объект.

Тело запроса:

```xml
<LegalHold xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <Status>string</Status>
</LegalHold>
```

Параметры запроса:

{ifdef(s3-pdf)}
Описание параметров запроса приведено в {linkto(#tab_request_param2)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_request_param2]} — Параметры запроса)[align=right;position=above;id=tab_request_param2;number={const(numb_tab_request_param2)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===

|Параметр
|Тип
|Описание

|`LegalHold`
|complex element
|Настройки бессрочной блокировки объекта

|`LegalHold.Status `
|xs\:string (enum)
|Статус бессрочной блокировки:

- `ON` — блокировка установлена
- `OFF` — блокировка снят
  |===
  {ifdef(s3-pdf)}
  {/caption}
  {/ifdef}

Пример запроса:

```curl
PUT /{Key+}?legal-hold HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
<?xml version="1.0" encoding="UTF-8"?>
<LegalHold xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <Status>string</Status>
</LegalHold>
```

## {heading(GetObjectRetention)[id=api-spec-s3-get-object-retention]}

Получить статус временной блокировки, установленной на объект.

Пример запроса:

```curl
GET /{Key+}?retention HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
```

Пример ответа:

```curl
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<Retention>
   <Mode>string</Mode>
   <RetainUntilDate>timestamp</RetainUntilDate>
</Retention>
```

## {heading(PutObjectRetention)[id=api-spec-s3-put-object-retention]}

Метод `PutObjectRetention` устанавливает, настраивает или снимает временную блокировку на объект.

При выполнении метода для обхода временной управляемой блокировки укажите в запросе заголовок со значением `x-amz-bypass-governance-retention`.

Тело запроса:

```curl
<Retention xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <Mode>string</Mode>
   <RetainUntilDate>timestamp</RetainUntilDate>
</Retention>
```

Параметры запроса:

{ifdef(s3-pdf)}
Описание параметров запроса приведено в {linkto(#tab_request_param3)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_request_param3]} — Параметры запроса)[align=right;position=above;id=tab_request_param3;number={const(numb_tab_request_param3)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Параметр
|Тип
|Описание

|`Retention`
|complex element
|Настройки временной блокировки объекта

|`Retention.Mode `
|xs\:string (enum)
|Тип блокировки:

- `GOVERNANCE` — временная управляемая блокировка
- `COMPLIANCE` — временная строгая блокировка

|`Retention.RetainUntilDate`
|xs\:dateTime
|Дата и время истечения срока действия блокировки объекта в формате ISO8601
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

Пример запроса:

```curl
PUT /{Key+}?retention HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-bypass-governance-retention: BypassGovernanceRetention
<?xml version="1.0" encoding="UTF-8"?>

```

## {heading(GetObjectLockConfiguration)[id=api-spec-s3-get-object-lock-configuration]}

Получить статус временной блокировки по умолчанию.

Пример запроса:

```curl
GET /?object-lock HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
```

Пример ответа:

```curl
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<ObjectLockConfiguration>
   <ObjectLockEnabled>string</ObjectLockEnabled>
   <Rule>
      <DefaultRetention>
         <Days>integer</Days>
         <Mode>string</Mode>
         <Years>integer</Years>
      </DefaultRetention>
   </Rule>
</ObjectLockConfiguration>
```

## {heading(PutObjectLockConfiguration)[id=api-spec-s3-put-object-lock-configuration]}

Метод `PutObjectLockConfiguration` используется для установки, настройки и снятия временной блокировки по умолчанию.

Тело запроса:

```curl
<ObjectLockConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <ObjectLockEnabled>string</ObjectLockEnabled>
   <Rule>
      <DefaultRetention>
         <Days>integer</Days>
         <Mode>string</Mode>
         <Years>integer</Years>
      </DefaultRetention>
   </Rule>
</ObjectLockConfiguration>
```
Параметры запроса:

{ifdef(s3-pdf)}
Описание параметров запроса приведено в {linkto(#tab_request_param4)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_request_param4]} — Параметры запроса)[align=right;position=above;id=tab_request_param4;number={const(numb_tab_request_param4)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===

|Параметр
|Тип
|Описание

3+|`ObjectLockConfiguration`

|`ObjectLockEnabled `
|`xs\:string (enum)`
|Статус блокировки. `Enabled` — включена

|`Rule`
|`complex element`
|Правило блокировки по умолчанию

|`Rule.DefaultRetention`
|`complex element`
|Параметр блокировки по умолчанию

|`Rule.DefaultRetention.Mode`
|`xs\:string (enum)`
|Тип блокировки:

- `GOVERNANCE` — временная управляемая блокировка
- `COMPLIANCE` — временная строгая блокировка

|`Rule.DefaultRetention.Days`
|`xs\:integer`
|Срок блокировки в днях от момента загрузки объекта. Нельзя указывать одновременно с `Years`

|`Rule.DefaultRetention.Years`
|`xs\:integer`
|Срок блокировки в годах от момента загрузки объекта. Нельзя указывать одновременно с `Days`
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

Пример запроса:

```curl
PUT /?object-lock HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
<?xml version="1.0" encoding="UTF-8"?>
<ObjectLockConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <ObjectLockEnabled>string</ObjectLockEnabled>
   <Rule>
      <DefaultRetention>
         <Days>integer</Days>
         <Mode>string</Mode>
         <Years>integer</Years>
      </DefaultRetention>
   </Rule>
</ObjectLockConfiguration>
```
