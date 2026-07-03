Объектілерді тегтермен таңбалаумен жұмыс істеуге арналған әдістер:

- {linkto(#api-spec-s3-put-object-tagging)[text=%text]} — объект тегін қосу немесе өзгерту.
- {linkto(#api-spec-s3-get-object-tagging)[text=%text]} — объект тегін алу.
- {linkto(#api-spec-s3-delete-object-tagging)[text=%text]} — объектінің барлық тегтерін жою.

## {heading(PutObjectTagging)[id=api-spec-s3-put-object-tagging]}

Бар объектіге {ifdef(public)}{linkto(/kz/storage/s3/concepts/features#s3-concepts-features-tagging)[text=тегтерді]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/features#s3-concepts-features-tagging)[text=тегтерді]}{/ifdef} қосады. Егер объектіде тегтер бар болса, олар көрсетілген жаңа тегтермен ауыстырылады. Тег — кілт/мән жұбы.

Сұрау денесі:

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

Сұрау параметрлері:

{ifdef(s3-pdf)}
Сұрау параметрлерінің сипаттамасы {linkto(#tab_request_param5)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_request_param5]} — Сұрау параметрлері)[align=right;position=above;id=tab_request_param5;number={const(numb_tab_request_param5)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===

|Параметр
|Түрі
|Сипаттама

3+|`Tagging.TagSet`

|`Tag `
|repeating complex element
|`Key` кілтінен және `Value` мәнінен тұратын тег. Бірнеше болуы мүмкін

|`Tag.Key`
|xs\:string (string)
|Тег кілті

|`Tag.Value`
|xs\:string (string)
|Тег мәні

|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

**Сәтті жауап коды**

HTTP: 200 OK.

**Қате кодтары**

{ifdef(s3-pdf)}
Қате кодтарының сипаттамасы {linkto(#tab_error_codes)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_error_codes]} — Қате кодтары)[align=right;position=above;id=tab_error_codes;number={const(numb_tab_error_codes)}]}
{/ifdef}
[cols="1,2,1", options="header"]
|===
|Қате коды
|Сипаттама
|HTTP статус коды

|InternalError
|Ішкі қате
|500 Internal Error

|AccessDenied
|Қол жеткізуге тыйым салынған. Есептік жазба ID-і бакет иесіне сәйкес келмейді
|400 Bad Request

|MalformedXML
|Сұраудағы XML схемаға сәйкес келмейді
|400 Bad Request

|MissingRequestBodyError
|Сұрау денесі бос
|400 Bad Request

|BadRequest
|Сұраудағы тегтер саны орнатылған лимиттен көп
|400 Bad Request
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(GetObjectTagging)[id=api-spec-s3-get-object-tagging]}

Объект тегтерінің жиынын қайтарады.

Сұрау мысалы:

```curl
GET /{Key+}?tagging HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
```

Жауап мысалы:

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

Көрсетілген объектіден тегтердің бүкіл жиынын жояды.

Сұрау мысалы:

```curl
DELETE /{Key+}?tagging HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
```

**Сәтті жауап коды**

HTTP: 204.
