Methods for working with object tagging:

- {linkto(#api-spec-s3-put-object-tagging)[text=%text]} — Add or change an object tag.
- {linkto(#api-spec-s3-get-object-tagging)[text=%text]} — Get an object tag.
- {linkto(#api-spec-s3-delete-object-tagging)[text=%text]} — Delete all object tags.

## {heading(PutObjectTagging)[id=api-spec-s3-put-object-tagging]}

Adds {ifdef(public)}{linkto(../../../../../storage/s3/concepts/features#s3-concepts-features-tagging)[text=tags]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/features#s3-concepts-features-tagging)[text=tags]}{/ifdef} to an existing object. If the object already has tags, they are replaced with the specified new tags. A tag is a key/value pair.

Request body:

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

Request parameters:

{ifdef(s3-pdf)}
A description of the request parameters is given in {linkto(#tab_request_param5)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_request_param5]} — Request parameters)[align=right;position=above;id=tab_request_param5;number={const(numb_tab_request_param5)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===

|Parameter
|Type
|Description

3+|`Tagging.TagSet`

|`Tag `
|repeating complex element
|A tag consisting of a `Key` and a `Value`. There can be several

|`Tag.Key`
|xs\:string (string)
|Tag key

|`Tag.Value`
|xs\:string (string)
|Tag value

|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

**Successful response code**

HTTP: 200 OK.

**Error codes**

{ifdef(s3-pdf)}
A description of the error codes is given in {linkto(#tab_error_codes)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_error_codes]} — Error codes)[align=right;position=above;id=tab_error_codes;number={const(numb_tab_error_codes)}]}
{/ifdef}
[cols="1,2,1", options="header"]
|===
|Error code
|Description
|HTTP status code

|InternalError
|Internal error
|500 Internal Error

|AccessDenied
|Access denied. The account ID does not match the bucket owner
|400 Bad Request

|MalformedXML
|The request XML does not match the schema
|400 Bad Request

|MissingRequestBodyError
|Empty request body
|400 Bad Request

|BadRequest
|The number of tags in the request exceeds the set limit
|400 Bad Request
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

## {heading(GetObjectTagging)[id=api-spec-s3-get-object-tagging]}

Returns the set of object tags.

Request example:

```curl
GET /{Key+}?tagging HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
```

Response example:

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

Deletes the entire set of tags from the specified object.

Request example:

```curl
DELETE /{Key+}?tagging HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
```

**Successful response code**

HTTP: 204.
