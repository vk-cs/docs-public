
All available methods for working with object lifecycle:

- {linkto(#api-spec-s3-get-bucket-lifecycle-configuration)[text=%text]} — view the lifecycle configuration.
- {linkto(#api-spec-s3-put-bucket-lifecycle)[text=%text]} — set a configuration with lifecycle rules.
- {linkto(#api-spec-s3-delete-bucket-lifecycle)[text=%text]} — delete the lifecycle configuration.

The configuration with lifecycle rules is transmitted in XML format. To filter objects that fall under a rule, {ifdef(public)}{linkto(../../../../../storage/s3/concepts/features#s3-concepts-features-tagging)[text=tags]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/features#s3-concepts-features-tagging)[text=tags]}{/ifdef} and {ifdef(public)}{linkto(../../../../../storage/s3/concepts/about#s3-concepts-about-object-key)[text=the object key]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/about#s3-concepts-about-object-key)[text=the object key]}{/ifdef} are used.

## {heading(XML structure of the lifecycle configuration)[id=api-spec-s3-lifecycle-request-body]}

{cut(General view of a configuration with prefix and tags)}

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
The description of the parameters is given in {linkto(#tab_param)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_param]} — Parameters)[align=right;position=above;id=tab_param;number={const(numb_tab_param)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Parameter
|Type
|Description

|`Rule`
|repeating complex element
|Lifecycle rule

|`Rule.Expiration`
|complex element
|Object lifetime

|`Rule.Expiration.Days`
|xs\:integer (integer)
|Number of days after which the object will be deleted

|`Rule.ID`
|xs\:string (string)
|Unique identifier of the rule

|`Rule.Status`
|xs\:string (enum)
|Rule status. Possible values:

- `Enabled` — the rule is applied;
- `Disabled` — the rule is not applied

|`Rule.Filter`
|complex element
|Filter for the objects to which the rule should apply

|`Rule.Filter.And`
|complex element
|Logical "AND" operator. Used to combine prefix filtering and multiple tags in a single rule

|`Rule.Filter.And.Prefix`
|xs\:string (string)
|Prefix of the {ifdef(public)}{linkto(../../../../../storage/s3/concepts/about#s3-concepts-about-object-key)[text=object key]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/about#s3-concepts-about-object-key)[text=object key]}{/ifdef}.

|`Rule.Filter.And.Tag`
|repeating complex element
|{ifdef(public)}{linkto(../../../../../storage/s3/concepts/features#s3-concepts-features-tagging)[text=Tag]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/features#s3-concepts-features-tagging)[text=Tag]}{/ifdef} of the object.
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}
{/cut}

{cut(General view of a configuration with prefixes only)}

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
The description of the parameters is given in {linkto(#tab_param2)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_param2]} — Parameters)[align=right;position=above;id=tab_param2;number={const(numb_tab_param2)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Parameter
|Type
|Description

|`Rule`
|repeating complex element
|Lifecycle rule

|`Rule.Expiration`
|complex element
|Object lifetime

|`Rule.Expiration.Days`
|xs\:integer (integer)
|Number of days after which the object will be deleted

|`Rule.ID`
|xs\:string (string)
|Unique identifier of the rule

|`Rule.Status`
|xs\:string (enum)
|Rule status. Possible values:

- `Enabled` — the rule is applied;
- `Disabled` — the rule is not applied

|`Rule.Filter`
|complex element
|Filter for the objects to which the rule should apply

|`Rule.Filter.Prefix`
|xs\:string (string)
|Prefix of the {ifdef(public)}{linkto(../../../../../storage/s3/concepts/about#s3-concepts-about-object-key)[text=object key]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/about#s3-concepts-about-object-key)[text=object key]}{/ifdef}.
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}
{/cut}

{cut(General view of a configuration with a single tag only)}

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
The description of the parameters is given in {linkto(#tab_param3)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_param3]} — Parameters)[align=right;position=above;id=tab_param3;number={const(numb_tab_param3)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Parameter
|Type
|Description

|`Rule`
|repeating complex element
|Lifecycle rule

|`Rule.Expiration`
|complex element
|Object lifetime

|`Rule.Expiration.Days`
|xs\:integer (integer)
|Number of days after which the object will be deleted

|`Rule.ID`
|xs\:string (string)
|Unique identifier of the rule

|`Rule.Status`
|xs\:string (enum)
|Rule status. Possible values:

- `Enabled` — the rule is applied;
- `Disabled` — the rule is not applied

|`Rule.Filter`
|complex element
|Filter for the objects to which the rule should apply

|`Rule.Filter.Tag`
|complex element
|{ifdef(public)}{linkto(../../../../../storage/s3/concepts/features#s3-concepts-features-tagging)[text=Tag]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/features#s3-concepts-features-tagging)[text=Tag]}{/ifdef}  of the object.
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

{/cut}

## {heading(GetBucketLifecycleConfiguration)[id=api-spec-s3-get-bucket-lifecycle-configuration]}

The `GET` operation returns information about the lifecycle configuration set for the bucket.

In the bucket's lifecycle configuration, you can specify a lifecycle rule using the object key name prefix, one or more object tags, or a combination of both parameters. The response contains a filter element that can be used to change the filter parameters and select the subset of objects to which the rule should apply.

Example request:

```curl
GET /?lifecycle HTTP/1.1
Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T001757Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e92e48fb16dad3d9d332460adde86493b8930262d9385e002b0408e17a2781f4
```

Example response:

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

In the bucket's lifecycle configuration, you can specify a lifecycle rule using the object key name prefix.

The `PUT` operation creates a new lifecycle configuration for the bucket or replaces an existing one.

Example request:

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

Example response:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 17:31:43 GMT
x-amz-request-id: tx00000000000000010ad2b-005a6135e2-f647d-ru-mska
Content-Length: 0
Content-Type: application/xml
Connection: close
```

## {heading(DeleteBucketLifecycle)[id=api-spec-s3-delete-bucket-lifecycle]}

The `DELETE` operation deletes the lifecycle configuration from the specified bucket. All lifecycle configuration rules are deleted from the lifecycle subresource associated with the bucket, which makes it possible to exclude the expiration from objects. As a result, the service will no longer automatically delete objects according to the rules contained in the deleted lifecycle configuration.

Example request:

```curl
DELETE /?lifecycle HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T204101Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=376fe41764fe6493a33160b36055d8f617b92f9337bce0cf91bc9c5b1e7482b2
```

Example response:

```curl
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 18:13:21 GMT
Connection: close
```
