Методы для работы с маркировкой объектов тегами:

- {linkto(#api-spec-s3-put-object-tagging)[text=%text]} — Добавить или изменить тег объекта.
- {linkto(#api-spec-s3-get-object-tagging)[text=%text]} — Получить тег объекта.
- {linkto(#api-spec-s3-delete-object-tagging)[text=%text]} — Удалить все теги объекта.

## {heading(PutObjectTagging)[id=api-spec-s3-put-object-tagging]}

Добавляет {ifdef(public)}{linkto(../../../../../storage/s3/concepts/features#s3-concepts-features-tagging)[text=теги]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/features#s3-concepts-features-tagging)[text=теги]}{/ifdef} к существующему объекту. Если у объекта есть теги, они заменяются указанными новыми тегами. Тег — это пара ключ/значение.

Тело запроса:

```curl
<?xml version="1.0" encoding="UTF-8"?>
<Tagging xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <TagSet>
      <Tag>
         <Key>string</Key>
         <Value>string</Value>
      </Tag>
   </TagSet>
</Tagging>
```

Параметры запроса:

{ifdef(s3-pdf)}
Описание параметров запроса приведено в {linkto(#tab_request_param5)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_request_param5]} — Параметры запроса)[align=right;position=above;id=tab_request_param5;number={const(numb_tab_request_param5)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===

|Параметр
|Тип
|Описание

3+|`Tagging.TagSet`

|`Tag `
|repeating complex element
|Тег, состоящий из ключа `Key` и значения `Value`. Может быть несколько

|`Tag.Key`
|xs\:string (string)
|Ключ тега

|`Tag.Value`
|xs\:string (string)
|Значение тега

|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

**Код успешного ответа**

HTTP: 200 OK.

**Коды ошибок**

{ifdef(s3-pdf)}
Описание кодов ошибок приведено в {linkto(#tab_error_codes)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_error_codes]} — Коды ошибок)[align=right;position=above;id=tab_error_codes;number={const(numb_tab_error_codes)}]}
{/ifdef}
[cols="1,2,1", options="header"]
|===
|Код ошибки
|Описание
|HTTP-код статуса

|InternalError
|Внутренняя ошибка
|500 Internal Error

|AccessDenied
|Доступ запрещен. ID учетной записи не соответствует владельцу бакета
|400 Bad Request

|MalformedXML
|XML запроса не соответствует схеме
|400 Bad Request

|MissingRequestBodyError
|Пустое тело запроса
|400 Bad Request

|BadRequest
|В запросе количество тегов больше установленного лимита
|400 Bad Request
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(GetObjectTagging)[id=api-spec-s3-get-object-tagging]}

Возвращает набор тегов объекта.

Пример запроса:

```curl
GET /{Key+}?tagging HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
```

Пример ответа:

```curl
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<Tagging>
   <TagSet>
      <Tag>
         <Key>key-object1</Key>
         <Value>value-object1</Value>
      </Tag>
         <Key>key-object2</Key>
         <Value>value-object2</Value>
      </Tag>
   </TagSet>
</Tagging>
```

## {heading(DeleteObjectTagging)[id=api-spec-s3-delete-object-tagging]}

Удаляет весь набор тегов из указанного объекта.

Пример запроса:

```curl
DELETE /{Key+}?tagging HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
```

**Код успешного ответа**

HTTP: 204.