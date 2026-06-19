Объектілерді бұғаттаумен жұмыс істеуге арналған әдістер:

- {linkto(#api-spec-s3-get-object-legal-hold)[text=%text]} — мерзімсіз бұғаттаудың статусын алу.
- {linkto(#api-spec-s3-put-object-legal-hold)[text=%text]} — мерзімсіз бұғаттауды орнату немесе алып тастау.
- {linkto(#api-spec-s3-get-object-retention)[text=%text]} — объектіге орнатылған уақытша бұғаттаудың статусын алу.
- {linkto(#api-spec-s3-put-object-retention)[text=%text]} — объектіге уақытша бұғаттауды орнату, баптау немесе алып тастау.
- {linkto(#api-spec-s3-get-object-lock-configuration)[text=%text]} — әдепкі уақытша бұғаттаудың статусын алу.
- {linkto(#api-spec-s3-put-object-lock-configuration)[text=%text]} — әдепкі уақытша бұғаттауды орнату, баптау немесе алып тастау.

## {heading(GetObjectLegalHold)[id=api-spec-s3-get-object-legal-hold]}

Объектіге орнатылған мерзімсіз бұғаттаудың статусын қайтарады.

Сұрау мысалы:

```curl
GET /{Key+}?legal-hold HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
```

Жауап мысалы:

```curl
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<LegalHold>
   <Status>string</Status>
</LegalHold>
```

## {heading(PutObjectLegalHold)[id=api-spec-s3-put-object-legal-hold]}

`PutObjectLegalHold` әдісі объектіге мерзімсіз бұғаттауды орнатады немесе алып тастайды.

Сұрау денесі:

```xml
<LegalHold xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <Status>string</Status>
</LegalHold>
```

Сұрау параметрлері:

{ifdef(s3-pdf)}
Сұрау параметрлерінің сипаттамасы {linkto(#tab_request_param2)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_request_param2]} — Сұрау параметрлері)[align=right;position=above;id=tab_request_param2;number={const(numb_tab_request_param2)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===

|Параметр
|Түрі
|Сипаттама

|`LegalHold`
|complex element
|Объектінің мерзімсіз бұғаттау баптаулары

|`LegalHold.Status `
|xs\:string (enum)
|Мерзімсіз бұғаттау статусы:

- `ON` — бұғаттау орнатылған
- `OFF` — бұғаттау алынды
  |===
  {ifdef(s3-pdf)}
  {/caption}
  {/ifdef}

Сұрау мысалы:

```curl
PUT /{Key+}?legal-hold HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
<?xml version="1.0" encoding="UTF-8"?>
<LegalHold xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <Status>string</Status>
</LegalHold>
```

## {heading(GetObjectRetention)[id=api-spec-s3-get-object-retention]}

Объектіге орнатылған уақытша бұғаттаудың статусын алу.

Сұрау мысалы:

```curl
GET /{Key+}?retention HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
```

Жауап мысалы:

```curl
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<Retention>
   <Mode>string</Mode>
   <RetainUntilDate>timestamp</RetainUntilDate>
</Retention>
```

## {heading(PutObjectRetention)[id=api-spec-s3-put-object-retention]}

`PutObjectRetention` әдісі объектіге уақытша бұғаттауды орнатады, баптайды немесе алып тастайды.

Әдісті орындау кезінде уақытша басқарылатын бұғаттауды айналып өту үшін сұрауда `x-amz-bypass-governance-retention` мәні бар тақырыпты көрсетіңіз.

Сұрау денесі:

```curl
<Retention xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <Mode>string</Mode>
   <RetainUntilDate>timestamp</RetainUntilDate>
</Retention>
```

Сұрау параметрлері:

{ifdef(s3-pdf)}
Сұрау параметрлерінің сипаттамасы {linkto(#tab_request_param3)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_request_param3]} — Сұрау параметрлері)[align=right;position=above;id=tab_request_param3;number={const(numb_tab_request_param3)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Параметр
|Түрі
|Сипаттама

|`Retention`
|complex element
|Объектінің уақытша бұғаттау баптаулары

|`Retention.Mode `
|xs\:string (enum)
|Бұғаттау түрі:

- `GOVERNANCE` — уақытша басқарылатын бұғаттау
- `COMPLIANCE` — уақытша қатаң бұғаттау

|`Retention.RetainUntilDate`
|xs\:dateTime
|ISO8601 форматындағы объект бұғаттауының қолданылу мерзімі аяқталатын күн мен уақыт
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

Сұрау мысалы:

```curl
PUT /{Key+}?retention HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-bypass-governance-retention: BypassGovernanceRetention
<?xml version="1.0" encoding="UTF-8"?>

```

## {heading(GetObjectLockConfiguration)[id=api-spec-s3-get-object-lock-configuration]}

Әдепкі уақытша бұғаттаудың статусын алу.

Сұрау мысалы:

```curl
GET /?object-lock HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
```

Жауап мысалы:

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

`PutObjectLockConfiguration` әдісі әдепкі уақытша бұғаттауды орнату, баптау және алып тастау үшін қолданылады.

Сұрау денесі:

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

Сұрау параметрлері:

{ifdef(s3-pdf)}
Сұрау параметрлерінің сипаттамасы {linkto(#tab_request_param4)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_request_param4]} — Сұрау параметрлері)[align=right;position=above;id=tab_request_param4;number={const(numb_tab_request_param4)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===

|Параметр
|Түрі
|Сипаттама

3+|`ObjectLockConfiguration`

|`ObjectLockEnabled `
|`xs\:string (enum)`
|Бұғаттау статусы. `Enabled` — қосылған

|`Rule`
|`complex element`
|Әдепкі бұғаттау ережесі

|`Rule.DefaultRetention`
|`complex element`
|Әдепкі бұғаттау параметрі

|`Rule.DefaultRetention.Mode`
|`xs\:string (enum)`
|Бұғаттау түрі:

- `GOVERNANCE` — уақытша басқарылатын бұғаттау
- `COMPLIANCE` — уақытша қатаң бұғаттау

|`Rule.DefaultRetention.Days`
|`xs\:integer`
|Объект жүктелген сәттен бастап күндермен бұғаттау мерзімі. `Years` параметрімен бір уақытта көрсетуге болмайды

|`Rule.DefaultRetention.Years`
|`xs\:integer`
|Объект жүктелген сәттен бастап жылдармен бұғаттау мерзімі. `Days` параметрімен бір уақытта көрсетуге болмайды
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

Сұрау мысалы:

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

