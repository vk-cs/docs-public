All available methods for working with object lifecycle:

*   Get Buket Lifecycle Configuration - View the lifecycle configuration in a bucket
*   Configure Buket Lifecycle - Configure lifecycle configuration rules
*   Delete Buket Lifecycle - Deletes lifecycle configuration

General view of the configuration

```
 <LifecycleConfiguration>
<Rule>
<ID> Rule Description </ID>
<Status> {Enabled | Disabled} </Status>
<Filter>
<Prefix> key_prefix </Prefix>
</Filter>

<Transition>
<StorageClass> Storage class identifier </StorageClass>
<! - <Date> or <Days> ->
</Transition>
...
<Expiration>
<! - <Date> or <Days> ->
</Expiration>
...
</Rule>
<Rule>
...
</Rule>
...
</LifecycleConfiguration>
```

Get Buket Lifecycle Configuration
---------------------------------

In a lifecycle configuration for a bucket, you can specify a lifecycle rule by prefixing the object key name, one or more object tags, or a combination of both. The response contains a filter item that you can use to change filter options and select a subset of objects to which the rule should apply.

The GET operation returns information on the lifecycle configuration set for the bucket.

Inquiry:

```
 GET /? Lifecycle HTTP / 1.1

Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T001757Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-date, Signature = e92d830826dad4ad3
```

Answer:

```
 HTTP / 1.1 200 OK

Date: Mon, 31 Aug 2020 17:44:35 GMT
x-amz-request-id: tx000000000000000023935-005a613936-fcf92-ru-mska
Content-Type: application / xml
Content-Length: 456
Connection: close

<LifecycleConfiguration xmlns = "http://s3.amazonaws.com/doc/2006-03-01/">
<Rule>
<ID> Expire old logs </ID>
<Prefix> logs / </Prefix>
<Status> Enabled </Status>
<Expiration>
<Days> 90 </Days>
</Expiration>
</Rule>

<Rule>
<ID> Remove uncompleted uploads </ID>
<Status> Enabled </Status>
<Prefix />
<AbortIncompleteMultipartUpload>
<DaysAfterInitiation> 1 </DaysAfterInitiation>
</AbortIncompleteMultipartUpload>
</Rule>
</LifecycleConfiguration>
```

Configure Buket Lifecycle
-------------------------

In the lifecycle configuration for a bucket, you can specify a lifecycle rule by prefixing the object key name.

The PUT operation creates a new lifecycle configuration for the bucket or replaces an existing lifecycle configuration.

Inquiry:

```
 PUT /? Lifecycle HTTP / 1.1

Host: my-test-bucket1.hb.bizmrg.com
Content-Length: 456
Content-Type: application / xml
x-amz-content-sha256: 34850007f92ec3331486b48fd7db15f48315fe73c4a9b135e6d9fd629276c1e7
x-amz-date: 20200831T000345Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = content-md5; content-type; host; x-amz-content-sha256; x-amz-faca09db5a56; x-amz-fac6e-395a5a56; x-amz-fc-date739adature5;

<LifecycleConfiguration xmlns = "http://s3.amazonaws.com/doc/2006-03-01/">
<Rule>
<ID> Expire old logs </ID>
<Prefix> logs / </Prefix>
<Status> Enabled </Status>
<Expiration>
<Days> 90 </Days>
</Expiration>
</Rule>

<Rule>
<ID> Remove uncompleted uploads </ID>
<Status> Enabled </Status>
<Prefix />
<AbortIncompleteMultipartUpload>
<DaysAfterInitiation> 1 </DaysAfterInitiation>
</AbortIncompleteMultipartUpload>
</Rule>
</LifecycleConfiguration>
```

Answer:

```
 HTTP / 1.1 200 OK

Date: Mon, 31 Aug 2020 17:31:43 GMT
x-amz-request-id: tx00000000000000010ad2b-005a6135e2-f647d-ru-mska
Content-Length: 0
Content-Type: application / xml
Connection: close
```

Delete buket lifecycle
----------------------

The DELETE operation removes the lifecycle configuration from the specified bucket. Removes all lifecycle configuration rules from the lifecycle subresource associated with the bucket, allowing expiration to be excluded from objects. As a result, the service will no longer automatically delete objects according to the rules contained in the remote lifecycle configuration.

Inquiry:

```
 DELETE /? Lifecycle HTTP / 1.1

Host: my-test-bucket1.hb.bizmrg.com
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T204101Z
Authorization: AWS4-HMAC-SHA256 Credential = II5JDQBAN3JYM4DNEB6C / 20200831 / ru-msk / s3 / aws4_request, SignedHeaders = host; x-amz-content-sha256; x-amz-date, Signature = 376fe4178b33fe3641793
```

Answer:

```
 HTTP / 1.1 204 No Content

Date: Mon, 31 Aug 2020 18:13:21 GMT
Connection: close
```