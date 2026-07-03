Бакеттермен операциялар:

- {linkto(#api-spec-s3-create-bucket)[text=%text]} — бакет жасау.
- {linkto(#api-spec-s3-list-buckets)[text=%text]} — бакеттер тізімін алу.
- {linkto(#api-spec-s3-head-bucket)[text=%text]} — бакеттің бар-жоғын және оған қол жеткізудің бар-жоғын тексеру.
- {linkto(#api-spec-s3-bucket-list-objects)[text=%text]} — бакет объектілерінің тізімін алу.
- {linkto(#api-spec-s3-delete-bucket)[text=%text]} — бакетті жою.

Бакеттермен барлық операцияларға қателер туралы типтік хабарламалар, сұрау тақырыптары және жауап тақырыптары тән. Егер операцияда арнайы қате хабарламалары, сұрау немесе жауап тақырыптары болса, бұл операция сипаттамасында көрсетіледі.

## {heading(CreateBucket)[id=api-spec-s3-create-bucket]}

`PUT` операциясы жаңа бакет жасайды. API арқылы бакет жасау үшін алдымен пайдаланушыны {ifdef(public)}{linkto(/kz/storage/s3/instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=жасау]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=жасау]}{/ifdef} және қол жеткізу кілтін алу қажет. Анонимді сұраулар арқылы бакет жасау мүмкін емес. Бакет жасауға арналған сұраудың бастамашысы автоматты түрде оның иесі болады.

Бакет жасау операциясын қолданғанда бакетке белгілі бір құқықтар беру қажет жобаларды немесе топтарды көрсетуге, сондай-ақ сақтау класын көрсетуге болады: hotbox немесе icebox. Сұрау тақырыптары арқылы құқық берудің екі тәсілі бар:

- Сұрауда `x-amz-acl` тақырыбы арқылы дайын ACL көрсету.
- Сұрауда `x-amz-grant-read`, `x-amz-grant-write`, `x-amz-grant-read-acp`, `x-amz-grant-write-acp`, `x-amz-grant-full-control` тақырыптары арқылы қол жеткізу құқықтарын ашық түрде көрсету.

Дайын ACL-ді пайдалануға немесе қол жеткізу құқықтарын ашық түрде көрсетуге болады, бірақ екі тәсілді бір уақытта қолдану мүмкін емес.

Объектіні бұғаттаумен жаңа бакет жасау үшін `x-amz-bucket-object-lock-enabled` сұрау тақырыбын көрсетіңіз.

Сұрау мысалы:

```curl
...
PUT / HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-acl: public-read
x-amz-content-sha256: c6f1fc479f5f690c443b73a258aacc06ddad09eca0b001e9640ff2cd56fe5710
x-amz-date: 20200831T173143Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-acl;x-amz-content-sha256;x-amz-date,Signature=6cab03bef74a80a0441ab7fd33c829a2cdb46bba07e82da518cdb78ac238fda5

<CreateBucketConfiguration>
  <LocationConstraint>ru-msk</LocationConstraint>
</CreateBucketConfiguration>
...
```

Жауап мысалы:

```curl
...
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 17:31:43 GMT
Content-Length: 0
Content-Type: text/plain;charset=utf-8
Connection: close
...
```

## {heading(ListBuckets)[id=api-spec-s3-list-buckets]}

`GET` операциясы жобада бар бакеттердің тізімін қайтарады.

Сұрау мысалы:

```curl
...
GET / HTTP/1.1
Host: hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T183940Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=245e867a6a653b7b88cbb71a734dacf2cbb4ba927d9aa5fdce57c85ab4f2b40b
...
```

Жауап мысалы:

```curl
...
HTTP/1.1 200 OK
x-amz-request-id: tx000000000000002ba2427-0059651b6d-1268c-ru-mska
Date: Mon, 31 Aug 2020 17:31:43 GMT
Content-Length: 525
Content-Type: text/plain
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
  <ListAllMyBucketsResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Owner>
      <ID>6174283</ID>
      <DisplayName>6174283</DisplayName>
    </Owner>
    <Buckets>
      <Bucket>
        <Name>static-images</Name>
        <CreationDate>2020-08-31T18:37:48.157Z</CreationDate>
      </Bucket>
    <Buckets>
      <Bucket>
        <Name>log-files</Name>
        <CreationDate>2020-08-31T18:37:48.157Z</CreationDate>
      </Bucket>
    </Buckets>
  </ListAllMyBucketsResult>
...
```

## {heading(HeadBucket)[id=api-spec-s3-head-bucket]}

`HEAD` операциясы бакеттің бар-жоғын және оған қол жеткізу рұқсатының бар-жоғын анықтау үшін қолданылады. Егер бакет бар болып, оған қол жеткізу рұқсаты болса, операция HTTP 200 статусын қайтарады. Әйтпесе операция HTTP 404 немесе 403 қатесін қайтара алады.

Сұрау мысалы:

```curl
...
HEAD / HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20170714T185156Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
...
```

Жауап мысалы:

```curl
...
HTTP/1.1 200 OK
x-amz-id-2: JuKZqmXuiwFeDQxhD7M8KtsKobSzWA1QEjLbTMTagkKdBX2z7Il/jGhDeJ3j6s80
x-amz-request-id: 32FE2CEB32F5EE25
x-amz-bucket-region: ru-msk
Date: Mon, 31 Aug 2020 21:34:56 GMT
Connection: close
...
```

## {heading(ListObjects)[id=api-spec-s3-bucket-list-objects]}

`GET` операциясы бакеттегі кейбір немесе барлық (1000-ға дейін) объектілерді қайтарады. Бакеттегі объектілерді сүзгілеу үшін іріктеу критерийлері ретінде сұрау параметрлерін пайдалануға болады.

Операцияны сәтті орындау үшін бакетті оқу `READ` құқықтарына ие болу қажет.

Сұрау мысалы:

```curl
...
GET / HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T172613Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=de1bf8931e315c0576edb81a7d8be98874e847548fc70682f6c646e1cfd9177a
...
```

Жауап мысалы:

```curl
...
HTTP/1.1 200 OK
x-amz-request-id: tx00000000000000029ac87-0059690330-8d1a-ru-mska
Date: Mon, 31 Aug 2020 17:31:43 GMT
Content-Length: 858
Content-Type: application/xml
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
<ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Name>static-images</Name>
  <Prefix/>
  <MaxKeys>1000</MaxKeys>
  <IsTruncated>false</IsTruncated>
  <Contents>
    <Key>example.txt</Key>
    <LastModified>2020-08-31T18:40:46.777Z</LastModified>
    <ETag>"b3a92f49e7ae64acbf6b3e76f2040f5e"</ETag>
    <Size>14</Size>
    <StorageClass>STANDARD</StorageClass>
    <Owner>
      <ID>6174283</ID>
      <DisplayName>6174283</DisplayName>
    </Owner>
  </Contents>
  <Contents>
    <Key>sammy.png</Key>
    <LastModified>2020-08-31T17:44:03.597Z</LastModified>
    <ETag>"fb08934ef619f205f272b0adfd6c018c"</ETag>
    <Size>35369</Size>
    <StorageClass>STANDARD</StorageClass>
    <Owner>
      <ID>6174283</ID>
      <DisplayName>6174283</DisplayName>
    </Owner>
  </Contents>
</ListBucketResult>
...
```

## {heading(DeleteBucket)[id=api-spec-s3-delete-bucket]}

`DELETE` операциясы сұрауда көрсетілген бакетті жояды. Операцияның сәтті орындалуы HTTP 204 статусымен белгіленеді.

Егер HTTP 409 статусы алынса, жою мүмкін емес, өйткені бакетте объектілер бар. Бакеттен барлық объектілерді жойып, содан кейін қайтадан көріңіз.

Сұрау мысалы:

```curl
...
DELETE / HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20170710T181321Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=b0558a25e794bced1ca9b620b4318bb8eb62ddbd34e2b9c1921034bc5acd597b
...
```

Жауап мысалы:

```curl
...
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 18:13:21 GMT
Connection: close
...
```
