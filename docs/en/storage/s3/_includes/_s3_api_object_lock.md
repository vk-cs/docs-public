Methods for working with object lock:

- {linkto(#api-spec-s3-get-object-legal-hold)[text=%text]} — Get the legal hold status.
- {linkto(#api-spec-s3-put-object-legal-hold)[text=%text]} — Set or remove a legal hold.
- {linkto(#api-spec-s3-get-object-retention)[text=%text]} — Get the retention status.
- {linkto(#api-spec-s3-put-object-retention)[text=%text]} — Set, configure, or remove retention.
- {linkto(#api-spec-s3-get-object-lock-configuration)[text=%text]} — Get the default retention status.
- {linkto(#api-spec-s3-put-object-lock-configuration)[text=%text]} — Set, configure, or remove the default retention.

## {heading(GetObjectLegalHold)[id=api-spec-s3-get-object-legal-hold]}

Returns the legal hold status set on an object.

Request example:

```curl
GET /{Key+}?legal-hold HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
```

Response example:

```curl
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<LegalHold>
   <Status>string</Status>
</LegalHold>
```

## {heading(PutObjectLegalHold)[id=api-spec-s3-put-object-legal-hold]}

The `PutObjectLegalHold` method sets or removes a legal hold on an object.

Request body:

```xml
<LegalHold xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <Status>string</Status>
</LegalHold>
```

Request parameters:

{ifdef(s3-pdf)}
The request parameters are described in {linkto(#tab_request_param2)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_request_param2]} — Request parameters)[align=right;position=above;id=tab_request_param2;number={const(numb_tab_request_param2)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===

|Parameter
|Type
|Description

|`LegalHold`
|complex element
|Object legal hold settings

|`LegalHold.Status `
|xs\:string (enum)
|Legal hold status:

- `ON` — hold is set
- `OFF` — hold is removed
  |===
  {ifdef(s3-pdf)}
  {/caption}
  {/ifdef}

Request example:

```curl
PUT /{Key+}?legal-hold HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
<?xml version="1.0" encoding="UTF-8"?>
<LegalHold xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <Status>string</Status>
</LegalHold>
```

## {heading(GetObjectRetention)[id=api-spec-s3-get-object-retention]}

Get the retention status set on an object.

Request example:

```curl
GET /{Key+}?retention HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
```

Response example:

```curl
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<Retention>
   <Mode>string</Mode>
   <RetainUntilDate>timestamp</RetainUntilDate>
</Retention>
```

## {heading(PutObjectRetention)[id=api-spec-s3-put-object-retention]}

The `PutObjectRetention` method sets, configures, or removes retention on an object.

To bypass governance-mode retention when calling this method, include a header with the value `x-amz-bypass-governance-retention` in the request.

Request body:

```curl
<Retention xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <Mode>string</Mode>
   <RetainUntilDate>timestamp</RetainUntilDate>
</Retention>
```

Request parameters:

{ifdef(s3-pdf)}
The request parameters are described in {linkto(#tab_request_param3)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_request_param3]} — Request parameters)[align=right;position=above;id=tab_request_param3;number={const(numb_tab_request_param3)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Parameter
|Type
|Description

|`Retention`
|complex element
|Object retention settings

|`Retention.Mode `
|xs\:string (enum)
|Lock type:

- `GOVERNANCE` — governance-mode retention
- `COMPLIANCE` — compliance-mode retention

|`Retention.RetainUntilDate`
|xs\:dateTime
|Date and time when the object's retention period expires, in ISO8601 format
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

Request example:

```curl
PUT /{Key+}?retention HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-bypass-governance-retention: BypassGovernanceRetention
<?xml version="1.0" encoding="UTF-8"?>

```

## {heading(GetObjectLockConfiguration)[id=api-spec-s3-get-object-lock-configuration]}

Get the default retention status.

Request example:

```curl
GET /?object-lock HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
```

Response example:

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

The `PutObjectLockConfiguration` method is used to set, configure, and remove the default retention.

Request body:

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
Request parameters:

{ifdef(s3-pdf)}
The request parameters are described in {linkto(#tab_request_param4)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_request_param4]} — Request parameters)[align=right;position=above;id=tab_request_param4;number={const(numb_tab_request_param4)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===

|Parameter
|Type
|Description

3+|`ObjectLockConfiguration`

|`ObjectLockEnabled `
|`xs\:string (enum)`
|Lock status. `Enabled` — enabled

|`Rule`
|`complex element`
|Default retention rule

|`Rule.DefaultRetention`
|`complex element`
|Default retention parameter

|`Rule.DefaultRetention.Mode`
|`xs\:string (enum)`
|Lock type:

- `GOVERNANCE` — governance-mode retention
- `COMPLIANCE` — compliance-mode retention

|`Rule.DefaultRetention.Days`
|`xs\:integer`
|Retention period in days from the moment the object is uploaded. Cannot be specified together with `Years`

|`Rule.DefaultRetention.Years`
|`xs\:integer`
|Retention period in years from the moment the object is uploaded. Cannot be specified together with `Days`
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

Request example:

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
