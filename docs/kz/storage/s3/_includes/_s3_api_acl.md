{includetag(acl_1)}

ACL (Access Control List, қол жеткізуді басқару тізімі) {var(s3)} сервисінде қандай пайдаланушыларға қандай операциялар рұқсат етілгенін бақылауға мүмкіндік береді. Әрбір бакет пен объектінің өз ACL-і бар, онда {linkto(#api-spec-s3-acl-permittees)[text=қол жеткізу құқықтарын алушылар]} және оларға берілген {linkto(#api-spec-s3-acl-permissions)[text=рұқсаттар]} көрсетіледі.

ACL бар бакеттер мен объектілерге операциялар жасау үшін келесі API әдістері қолжетімді:

- {linkto(#api-spec-s3-get-bucket-acl)[text=%text]} — бакеттің ACL-ін алу.
- {linkto(#api-spec-s3-put-bucket-acl)[text=%text]} — бакеттің ACL-ін орнату.
- {linkto(#api-spec-s3-get-object-acl)[text=%text]} — объектінің ACL-ін алу.
- {linkto(#api-spec-s3-put-object-acl)[text=%text]} — объектінің ACL-ін орнату.

ACL-ді бакет жасағанда немесе объект жүктегенде де, кейін де орнатуға болады. `PutBucketACL` және `PutObjectACL` әдістерінде ACL конфигурациясын екі тәсілмен беруге болады:

- Сұрау денесінде — {linkto(#api-spec-s3-acl-request-body)[text=ACL конфигурациясының XML-құрылымы]} түрінде. Бұл тәсіл тек бар бакеттер немесе объектілер үшін қолданылады.
- {linkto(#api-spec-s3-acl-request-headers)[text=сұрау тақырыптарында]}. Бұл тәсіл бакет жасау немесе объект жүктеу кезінде де, сондай-ақ бар бакеттер немесе объектілер үшін де қолданылады.

Бір сұрауда осы тәсілдердің тек біреуін ғана пайдалануға болады.

## {heading(ACL конфигурациясының XML-құрылымы)[id=api-spec-s3-acl-request-body]}

XML форматындағы ACL конфигурациясы келесі элементтерден тұрады:

- `<Owner>` — бакет иесінің канондық идентификаторын көрсетеді. Оны {linkto(#api-spec-s3-get-bucket-acl)[text=%text]} әдісі арқылы немесе AWS CLI арқылы, {ifdef(public)}{linkto(../../../../../storage/s3/instructions/access-management/acl#s3-instructions-bucket-acl-view)[text=сұратып]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../instructions/access-management/acl#s3-instructions-bucket-acl-view)[text=сұратып]}{/ifdef} бакеттің ACL-і туралы ақпаратты алу арқылы біліңіз.
- `<Grant>` — қай алушыға қандай рұқсаттар берілетінін анықтайды. `<Grant>` ішінде `<Grantee>` және `<Permission>` элементтері болады.

  - `<Grantee>` — қол жеткізу құқықтарын алушыны атрибуттар арқылы көрсетеді:

    - `ID` — {linkto(#api-spec-s3-acl-permittees)[text=құқықтарды алушының]} идентификаторы.
    - `Type` — құқықтарды алушының түрі. Мысалдар: `CanonicalUser`, `Group`.

  - `<Permission>` — берілетін {linkto(#api-spec-s3-acl-permissions)[text=рұқсаттың]} түрін көрсетеді.

ACL конфигурациясының XML-құрылымының мысалы:

```curl
<AccessControlPolicy>
  <Owner>
    <ID>Owner-canonical-user-ID</ID>
    <DisplayName>owner-display-name</DisplayName>
  </Owner>
  <AccessControlList>
    <Grant>
      <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
        <ID>Owner-canonical-user-ID</ID>
        <DisplayName>owner-display-name</DisplayName>
      </Grantee>
      <Permission>FULL_CONTROL</Permission>
    </Grant>
  </AccessControlList>
</AccessControlPolicy>
```

## {heading(Сұрау тақырыптары)[id=api-spec-s3-acl-request-headers]}

`PUT` сұрауларында ACL конфигурациясын көрсету үшін келесі тақырыптар қолданылады:

- `x-amz-acl` — бакетке немесе объектіге алдын ала бапталған {ifdef(public)}{linkto(../../../../../storage/s3/concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=стандартты ACL]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=стандартты ACL]}{/ifdef} тағайындайды.
- `x-amz-grant-read` — оқу рұқсатын (`READ`) орнатады.
- `x-amz-grant-write` — жазу рұқсатын (`WRITE`) орнатады.
- `x-amz-grant-read-acp` — ACL-ді оқу рұқсатын (`READ_ACP`) орнатады.
- `x-amz-grant-write-acp` — ACL-ді жазу рұқсатын (`WRITE_ACP`) орнатады.
- `x-amz-grant-full-control` — толық бақылау береді (`FULL_CONTROL`).

`x-amz-acl` тақырыбын бір сұрауда осы тізімдегі басқа тақырыптармен біріктіруге болмайды. Не стандартты ACL-ді пайдалануға, не құқықтарды алушыларды ашық түрде көрсетуге болады.

## {heading(Қол жеткізуді алушылар)[id=api-spec-s3-acl-permittees]}

Бакеттер мен объектілерге қол жеткізу құқықтары келесі алушылар санаттарына берілуі мүмкін:

- {linkto(#api-spec-s3-acl-user)[text=Пайдаланушы]} {var(cloud)}.
- {linkto(#api-spec-s3-acl-project)[text=Жоба]} {var(cloud)}.
- Алдын ала анықталған {linkto(#api-spec-s3-acl-meta)[text=метатоп]}.

### {heading(Пайдаланушы)[id=api-spec-s3-acl-user]}

{var(cloud)} пайдаланушысына қол жеткізу оның канондық идентификаторы (Canonical ID) бойынша беріледі. Бұл — {var(s3)} пайдаланушысының бірегей идентификаторы, әріптік-сандық тізбек түрінде болады. Мысал: `fcd68908-XXXX-82ae2a5a251d`.

{var(cloud)} пайдаланушысының канондық идентификаторын білу үшін, {ifdef(public)}{linkto(../../../../../storage/s3/instructions/access-management/acl#s3-instructions-bucket-acl-view)[text=ACL-ді алыңыз]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../instructions/access-management/acl#s3-instructions-bucket-acl-view)[text=ACL-ді алыңыз]}{/ifdef} — пайдаланушының қол жеткізу құқықтары бар бакет немесе объект үшін.

Пайдаланушыға қол жеткізуді беру үшін, сұрауда оның канондық идентификаторын көрсетіңіз:

- XML-құрылым арқылы орнатқанда `Grantee` блогының ішінде `<ID>` тегін көрсетіңіз.

  Мысал: `<ID>fcd68908-XXXX-82ae2a5a251d</ID>`

- Тақырып арқылы орнатқанда оның мәнінде `id` кілтін пайдаланыңыз.

  Мысал: `id="fcd68908-XXXX-82ae2a5a251d"`.

### {heading(Жоба)[id=api-spec-s3-acl-project]}

Жобаға қол жеткізуді беру үшін, сұрауда {ifdef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=жоба идентификаторын]}{/ifdef}{ifdef(s3,s3-pdf)}жоба идентификаторын{/ifdef} (PID) көрсетіңіз.

- XML-құрылым арқылы орнатқанда `Grantee` блогының ішінде `<EmailAddress>` тегін көрсетіңіз.

  Мысал: `<EmailAddress>mcs2400549523</EmailAddress>`

- Тақырып арқылы орнатқанда оның мәнінде `emailAddress` кілтін пайдаланыңыз.

  Мысал: `emailAddress="mcs2400549523"`.

{note:info}
{var(cloud)} есептік жазбасының иесі белгілі бір рұқсаттарды басқа пайдаланушыларға немесе топтарға делегирлей алады. Рұқсаттар делегирленген пайдаланушылар ресурстарға қол жеткізіп, делегирлеген есептік жазбаның атынан әрекеттер орындай алады.
{/note}

### {heading(Метатоп)[id=api-spec-s3-acl-meta]}

{var(s3)} сервисінде алдын ала анықталған метатоптар жиынтығы бар. Пайдаланушылар тобына қол жеткізуді беру үшін, сұрауда топтың URI мәнін көрсетіңіз.

{note:info}
Идентификатордың AWS сілтемесіне ұқсап көрінуі AWS S3 ресурстары пайдаланылатынын білдірмейді. Идентификаторлар таңбалар жиынтығы ретінде өңделеді және AWS S3 үшін жасалған бағдарламалармен кері үйлесімділік үшін қолданылады.
{/note}

- `Authenticated Users` (авторизацияланған пайдаланушылар). {var(cloud)} жүйесіндегі барлық бар есептік жазбаларды қамтиды.

  {note:warn}
  `Authenticated Users` пайдаланушылар тобына қол жеткізу берілген кезде, {var(cloud)} жүйесіндегі кез келген авторизацияланған пайдаланушы ресурсқа қол жеткізе алады. Барлық сұраулар қолтаңбалануы (авторизациялануы) тиіс.
  {/note}

  `Authenticated Users` тобына қол жеткізуді беру үшін:

  - XML-құрылым арқылы орнатқанда `Grantee` блогының ішінде `<URI>` тегін көрсетіңіз.

    Мысал: `<URI>http://acs.amazonaws.com/groups/global/AuthenticatedUsers</URI>`

  - Тақырып арқылы орнатқанда оның мәнінде `uri` кілтін пайдаланыңыз.

    Мысал: `uri="http://acs.amazonaws.com/groups/global/AuthenticatedUsers"`

- `All Users` (барлық пайдаланушылар).

  {note:warn}
  `All Users` пайдаланушылар тобына қол жеткізу берілген кезде, объектінің толық URL мекенжайын білетін кез келген адам оған қол жеткізе алады. Сұраулар қолтаңбаланған (авторизацияланған) немесе қолтаңбаланбаған (анонимді) болуы мүмкін.
  {/note}

  `All Users` тобына қол жеткізуді беру үшін:

  - XML-құрылым арқылы орнатқанда `Grantee` блогының ішінде `<URI>` тегін көрсетіңіз.

    Мысал: `<URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>`

  - Тақырып арқылы орнатқанда оның мәнінде `uri` кілтін пайдаланыңыз.

    Мысал: `uri="http://acs.amazonaws.com/groups/global/AllUsers"`

  Қол жеткізу берілген анонимді авторизацияланбаған пайдаланушылар {var(cloud)} жүйесінде есептік жазбасы болмағандықтан, `65a011a29cdf8ec533ec3d1ccaae921c` пайдаланушысының канондық ID-і атынан әрекеттер орындайды.

{note:warn}
Метатоптарды тек қажеттілік болған жағдайда ғана пайдаланыңыз.

Белгісіз адамдар тобына қол жеткізуді ашқанда, ресурстарыңызбен операцияларды кім орындайтынын бақылаудан айырыласыз. Бұл ретте, бакет иесі ретінде, бакетпен жасалатын барлық операциялар үшін төлемді сіз төлейсіз.
{/note}

## {heading(Рұқсаттар)[id=api-spec-s3-acl-permissions]}

{/includetag}



{includetag(acl_2)}

## {heading(GetBucketACL)[id=api-spec-s3-get-bucket-acl]}

Бакет үшін ACL-ді алу. Алу үшін бакетте `READ_ACP` құқығы болуы қажет.

Егер `READ_ACP` құқығы анонимді пайдаланушыға берілсе, авторизация тақырыбын пайдаланбай-ақ бакеттің ACL-ін алуға болады.

Сұрау мысалы:

```curl
GET /?acl HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T174434Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=71dfa4666fb740d40d05307a29321c65cc620cdb17e8a9cb83d4f0e1b1b9d236
```

Жауап мысалы:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 17:44:35 GMT
x-amz-request-id: tx000000000000002764fa6-005963bd03-1268c-ru-mska
Content-Type: application/xml
Content-Length: 848
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
  <AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Owner>
      <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
      <DisplayName>VK Cloud_UserName</DisplayName>
    </Owner>
    <AccessControlList>
      <Grant>
        <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
          <URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>
        </Grantee>
        <Permission>READ</Permission>
      </Grant>
      <Grant>
        <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
          <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
          <DisplayName>VK Cloud_Username</DisplayName>
        </Grantee>
        <Permission>FULL_CONTROL</Permission>
      </Grant>
    </AccessControlList>
  </AccessControlPolicy>
```

## {heading(PutBucketACL)[id=api-spec-s3-put-bucket-acl]}

Бакет үшін ACL-ді орнату. ACL-ді орнату үшін бакетте `WRITE_ACP` құқығы болуы қажет.

ACL конфигурациясын сұрау денесінде беру арқылы жасалатын сұрау:

```curl
PUT /?acl HTTP/1.1
Content-Type: application/xml
Content-Length: 675
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: 724483e3830b19d6960345c484fb7904b26e8f2fb34a6c002fa779353b68c8d8
x-amz-date: 20200831T183709Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date,Signature=1cf3f7771a4086375e5b6597026db6d55d84fbc86e3c3a86ec420ea9123e3163


<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Owner>
    <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
  </Owner>
  <AccessControlList>
    <Grant>
      <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
        <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
      </Grantee>
      <Permission>FULL_CONTROL</Permission>
    </Grant>
    <Grant>
      <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
        <URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>
      </Grantee>
      <Permission>READ</Permission>
    </Grant>
  </AccessControlList>
</AccessControlPolicy>
```

Жауап мысалы:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:37:10 GMT
x-amz-request-id: tx00000000000000278ac49-005963c956-1268c-ru-mska
Content-Type: application/xml
Content-Length: 0
Connection: close
```

## {heading(GetObjectACL)[id=api-spec-s3-get-object-acl]}

Объект үшін ACL-ді алу. Алу үшін объектіде `READ_ACP` құқығы болуы қажет.

Сұрау мысалы:

```curl
GET /sammy.png?acl HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T191224Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=950e133849cd19d626291fd2937d927957cf3e97a36707d30d51a9b61ac08a8e
```

Жауап мысалы:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 19:12:24 GMT
x-amz-request-id: tx0000000000000027a42dc-005963d198-1268c-ru-mska
Content-Type: application/xml
Content-Length: 848
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
  <AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Owner>
      <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
      <DisplayName>VK Cloud_UserName</DisplayName>
    </Owner>
    <AccessControlList>
      <Grant>
        <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
          <URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>
        </Grantee>
        <Permission>READ</Permission>
      </Grant>
      <Grant>
        <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
          <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
          <DisplayName>VK Cloud_UserName</DisplayName>
        </Grantee>
        <Permission>FULL_CONTROL</Permission>
      </Grant>
    </AccessControlList>
  </AccessControlPolicy>
```

## {heading(PutObjectACL)[id=api-spec-s3-put-object-acl]}

Объект үшін ACL-ді орнату. ACL-ді орнату үшін объектіде `WRITE_ACP` құқығы болуы қажет.

ACL конфигурациясын сұрау денесінде беру арқылы жасалатын сұрау:

```curl
PUT /sammy.png?acl HTTP/1.1
Сontent-Type: application/xml
Content-Length: 443
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256:c0bd9ba784be78d4f38bbc1e3b0da2de2e7a8f4ee259b3b840369cf00a78dad2
x-amz-date:20200831T192142Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date,Signature=dfeeb2386f76b29097adadb35ac15f7d5f244f18cc95f082b0ac6d14ced48b10


<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Owner>
    <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
  </Owner>
  <AccessControlList>
    <Grant>
      <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
        <ID>eab55955-ebdb-4f18-a94d-f3558ff150da</ID>
      </Grantee>
      <Permission>FULL_CONTROL</Permission>
    </Grant>
  </AccessControlList>
</AccessControlPolicy>
```

Жауап мысалы:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 19:21:42 GMT
x-amz-request-id: tx0000000000000027aafc9-005963d3c6-1268c-ru-mska
Content-Type: application/xml
Content-Length: 0
Connection: close
```

## {heading(ACL жаңарту бойынша ұсынымдар)[id=api-spec-s3-acl-recommendations]}

Қол жеткізу құқықтарын тағайындау саясаты мынадай: бар бакеттің немесе объектінің ACL-ін жаңартқанда кейбір жағдайларда бұрын тағайындалған қол жеткізу құқықтары жоғалуы мүмкін. Мысалы, кез келген метатопқа қол жеткізуді беру туралы сұрау кезінде {var(cloud)}-тың жекелеген жобалары үшін орнатылған барлық қол жеткізу құқықтары жоғалады. Бұған жол бермеу үшін, барлық қажет алушылар санаттарына қол жеткізу құқықтарын бір уақытта орнату ұсынылады.

Бір сұрауда рұқсаттарды бір уақытта орнатуға арналған XML-құрылымның мысалы:

```curl
<?xml version="1.0" encoding="UTF-8"?>
<AccessControlPolicy xmlns="http://bucket_name.hb.ru-msk.vkcloud-storage.ru/images/01.jpg/">
   <Owner>
      <ID>Owner-canonical-user-ID</ID>
      <DisplayName>owner-display-name</DisplayName>
   </Owner>
   <AccessControlList>
      <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
            <ID>Owner-canonical-user-ID</ID>
            <DisplayName>owner-display-name</DisplayName>
         </Grantee>
         <Permission>FULL_CONTROL</Permission>
      </Grant>
     
      <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="CanonicalUser">
            <ID>user1-canonical-user-ID</ID>
            <DisplayName>user1-display-name</DisplayName>
         </Grantee>
         <Permission>WRITE</Permission>
      </Grant>
     
      <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
            <URI>http://acs.amazonaws.com/groups/global/AllUsers</URI> 
         </Grantee>
         <Permission>READ</Permission>
      </Grant>

      <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Group">
            <EmailAddress>project-ID</EmailAddress>
         </Grantee>
         <Permission>READ</Permission>
      </Grant>

   </AccessControlList>
</AccessControlPolicy>
```

{/includetag}