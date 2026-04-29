{include(/kz/_includes/_translated_by_ai.md)}

ACL (Access Control List, қол жеткізуді басқару тізімі) VK Object Storage сервисінде қандай пайдаланушыларға қандай операцияларға рұқсат берілетінін басқаруға мүмкіндік береді. Әрбір бакет пен объектінің өз ACL-і бар, онда [қолжетімділік құқықтарын алушылар](#permittees) және оларға берілген [рұқсаттар](#permissons) көрсетілген.  

Бакеттер мен объектілердің ACL-імен операциялар жасау үшін келесі API әдістері қолжетімді:

- [Get Bucket ACL](#get_bucket_acl) — бакеттің ACL-ін алу.
- [Put Bucket ACL](#put_bucket_acl) — бакет үшін ACL орнату.
- [Get Object ACL](#get_object_acl) — объектінің ACL-ін алу.
- [Put Object ACL](#put_object_acl) — объект үшін ACL орнату.

ACL-ді бакетті құру немесе объектіні жүктеу кезінде де, одан кейін де орнатуға болады. `Put Bucket ACL` және `Put Object ACL` әдістерінде ACL конфигурациясын екі тәсілмен беруге болады:

- Сұрау денесінде — [ACL конфигурациясының XML құрылымы](#acl_config_file) түрінде. Бұл тәсіл тек бұрыннан бар бакеттер немесе объектілер үшін қолданылады.
- [Сұрау тақырыптарында](#request_headers). Бұл тәсіл бакетті құру немесе объектіні жүктеу кезінде де, бұрыннан бар бакеттер не объектілер үшін де қолданылады.

Бір сұрауда осы тәсілдердің тек біреуін ғана пайдалануға болады.

## {heading(ACL конфигурациясының XML құрылымы)[id=acl_config_file]}

XML пішіміндегі ACL конфигурациясы келесі элементтерді қамтиды:

- `<Owner>` — бакет иесінің канондық идентификаторын көрсетеді. Оны [Get Bucket ACL](#get_bucket_acl) әдісі арқылы немесе AWS CLI көмегімен бакет туралы ақпаратты [сұрау](/kz/storage/s3/instructions/buckets/manage-bucket#bucket_info) арқылы біліңіз.
- `<Grant>` — қай алушыға қандай рұқсаттар берілетінін анықтайды. `<Grant>` элементі `<Grantee>` және `<Permission>` элементтерін қамтиды.

  - `<Grantee>` — атрибуттар арқылы қолжетімділік құқықтарының алушысын көрсетеді:

    - `ID` — [құқық алушының](#permittees) идентификаторы.
    - `Type` — құқық алушының түрі. Мысалдар: `CanonicalUser`, `Group`.

  - `<Permission>` — берілетін [рұқсаттың](#permissons) түрін көрсетеді.

ACL конфигурациясының XML құрылымының мысалы:

```xml
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

## {heading(Сұрау тақырыптары)[id=request_headers]}

ACL конфигурациясын `PUT` сұрауларында көрсету үшін келесі тақырыптар қолданылады:

- `x-amz-acl` — бакетке немесе объектіге алдын ала бапталған [стандартты ACL](/kz/storage/s3/concepts/access/s3-acl#standard_acl) тағайындайды.
- `x-amz-grant-read` — оқу рұқсатын (`READ`) орнатады.
- `x-amz-grant-write` — жазу рұқсатын (`WRITE`) орнатады.
- `x-amz-grant-read-acp` — ACL-ді оқу рұқсатын (`READ_ACP`) орнатады.
- `x-amz-grant-write-acp` — ACL-ге жазу рұқсатын (`WRITE_ACP`) орнатады.
- `x-amz-grant-full-control` — толық бақылау береді (`FULL_CONTROL`).

`x-amz-acl` тақырыбын бір сұрауда жоғарыда аталған басқа тақырыптармен біріктіруге болмайды. Не стандартты ACL пайдалануға болады, не құқық алушыларды ашық түрде көрсетуге болады.

## {heading(Қолжетімділік алушылары)[id=permittees]}

Бакеттер мен объектілерге қолжетімділік құқықтары алушылардың келесі санаттарына берілуі мүмкін:

- VK Cloud [пайдаланушысы](#user_id).
- VK Cloud [жобасы](#project_id).
- Алдын ала анықталған [метатоп](#acl_meta).

### {heading(Пайдаланушы)[id=user_id]}

VK Cloud пайдаланушысына қолжетімділік оның канондық идентификаторы (Canonical ID) арқылы беріледі. Бұл VK Object Storage пайдаланушысының әріптік-сандық тізбек түріндегі бірегей идентификаторы. Мысал: `fcd68908-XXXX-82ae2a5a251d`.

VK Cloud пайдаланушысының канондық идентификаторын білу үшін, пайдаланушының қолжетімділік құқықтары бар бакеттің немесе объектінің [ACL-ін алыңыз](/kz/storage/s3/instructions/access-management/acl).

Пайдаланушыға қолжетімділік беру үшін, сұрауда оның канондық идентификаторын көрсетіңіз:

- XML құрылымы арқылы орнатқанда `Grantee` блогының ішінде `<ID>` тегін көрсетіңіз.

   Мысал: `<ID>fcd68908-XXXX-82ae2a5a251d</ID>`

- Тақырып арқылы орнатқанда оның мәнінде `id` кілтін пайдаланыңыз.

   Мысал: `id="fcd68908-XXXX-82ae2a5a251d"`.

### {heading(Жоба)[id=project_id]}

Жобаға қолжетімділік беру үшін сұрауда [жоба идентификаторын](/kz/tools-for-using-services/account/instructions/project-settings/manage#zhoba_identifikatoryn_alu) (PID) көрсетіңіз.

- XML құрылымы арқылы орнатқанда `Grantee` блогының ішінде `<EmailAddress>` тегін көрсетіңіз.

  Мысал: `<EmailAddress>mcs2400549523</EmailAddress>`

- Тақырып арқылы орнатқанда оның мәнінде `emailAddress` кілтін пайдаланыңыз.

  Мысал: `emailAddress="mcs2400549523"`.

{note:info}

VK Cloud есептік жазбасының иесі белгілі бір рұқсаттарды басқа пайдаланушыларға немесе топтарға делегирлей алады. Рұқсаттар делегирленген пайдаланушылар ресурстарға қол жеткізіп, делегирлеген есептік жазбаның атынан әрекеттер орындай алады.

{/note}

### {heading(Метатоп)[id=acl_meta]}

VK Object Storage сервисінде алдын ала анықталған метатоптар жиыны бар. Пайдаланушылар тобына қолжетімділік беру үшін сұрауда топтың URI-сін көрсетіңіз.

{note:info}

Идентификатордың AWS сілтемесіне ұқсап көрінуі AWS S3 ресурстары пайдаланылып жатыр дегенді білдірмейді. Идентификаторлар таңбалар жиыны ретінде өңделеді және AWS S3 үшін жасалған бағдарламалармен кері үйлесімділік үшін қолданылады.

{/note}

- `Authenticated Users` (авторланған пайдаланушылар). Барлық қолданыстағы VK Cloud есептік жазбаларын қамтиды.

   {note:warn}

   `Authenticated Users` пайдаланушылар тобына қолжетімділік берілгенде, кез келген авторланған VK Cloud пайдаланушысы ресурсқа қол жеткізе алады. Барлық сұрауларға қол қойылуы тиіс (авторлануы керек).

   {/note}

   `Authenticated Users` тобына қолжетімділік беру үшін:

   - XML құрылымы арқылы орнатқанда `Grantee` блогының ішінде `<URI>` тегін көрсетіңіз.

      Мысал: `<URI>http://acs.amazonaws.com/groups/global/AuthenticatedUsers</URI>`

   - Тақырып арқылы орнатқанда оның мәнінде `uri` кілтін пайдаланыңыз.

      Мысал: `uri="http://acs.amazonaws.com/groups/global/AuthenticatedUsers"`

- `All Users` (барлық пайдаланушылар).

   {note:warn}

   `All Users` пайдаланушылар тобына қолжетімділік берілгенде, объектінің толық URL-мекенжайын білетін кез келген адам оған қол жеткізе алады. Сұраулар қол қойылған (авторланған) да, қол қойылмаған (анонимді) да болуы мүмкін.

   {/note}

   `All Users` тобына қолжетімділік беру үшін:

   - XML құрылымы арқылы орнатқанда `Grantee` блогының ішінде `<URI>` тегін көрсетіңіз.

      Мысал: `<URI>http://acs.amazonaws.com/groups/global/AllUsers</URI>`

   - Тақырып арқылы орнатқанда оның мәнінде `uri` кілтін пайдаланыңыз.

      Мысал: `uri="http://acs.amazonaws.com/groups/global/AllUsers"`

   Егер анонимді авторланбаған пайдаланушыларға қолжетімділік берілсе, олар VK Cloud-та есептік жазбасы болмағандықтан, `65a011a29cdf8ec533ec3d1ccaae921c` пайдаланушысының канондық ID-і атынан әрекеттер орындайды.

{note:warn}

Метатоптарды тек қажет болған жағдайда ғана пайдаланыңыз.

Белгісіз адамдар тобына қолжетімділік ашқанда, ресурстарыңызбен кім операция жасайтынын бақылаудан айырыласыз. Бұл ретте бакет иесі ретінде бакетпен жасалатын барлық операциялардың ақысын өзіңіз төлейсіз.

{/note}

## {heading(Рұқсаттар)[id=permissons]}

{include(/kz/_includes/_acl_permissions.md)}

## Бакеттер мен объектілердің ACL-імен операциялар

### {heading(Get Bucket ACL)[id=get_bucket_acl]}

Бакеттің ACL-ін алу. Алу үшін бакетте `READ_ACP` құқығы болуы қажет.

Егер `READ_ACP` құқығы анонимді пайдаланушыға берілсе, бакеттің ACL-ін авторизация тақырыбын қолданбай-ақ алуға болады.

Сұрау:

```xml
GET /?acl HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T174434Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=71dfa4666fb740d40d05307a29321c65cc620cdb17e8a9cb83d4f0e1b1b9d236
```

Жауап:

```xml
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

### {heading(Put Bucket ACL)[id=put_bucket_acl]}

Бакет үшін ACL орнату. ACL орнату үшін бакетте `WRITE_ACP` құқығы болуы қажет.

ACL конфигурациясы сұрау денесінде берілетін сұрау:

```xml
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

Жауап:

```xml
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:37:10 GMT
x-amz-request-id: tx00000000000000278ac49-005963c956-1268c-ru-mska
Content-Type: application/xml
Content-Length: 0
Connection: close
```

### {heading(Get Object ACL)[id=get_object_acl]}

Объектінің ACL-ін алу. Алу үшін объектіде `READ_ACP` құқығы болуы қажет.

Сұрау:

```xml
GET /sammy.png?acl HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T191224Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=950e133849cd19d626291fd2937d927957cf3e97a36707d30d51a9b61ac08a8e
```

Жауап:

```xml
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

### {heading(Put Object ACL)[id=put_object_acl]}

Объект үшін ACL орнату. ACL орнату үшін объектіде `WRITE_ACP` құқығы болуы қажет.

ACL конфигурациясы сұрау денесінде берілетін сұрау:

```xml
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

Жауап:

```xml
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 19:21:42 GMT
x-amz-request-id: tx0000000000000027aafc9-005963d3c6-1268c-ru-mska
Content-Type: application/xml
Content-Length: 0
Connection: close
```

## ACL жаңарту бойынша ұсынымдар

Қолжетімділік құқықтарын тағайындау саясаты сондай, бар бакеттің немесе объектінің ACL-і жаңартылған кезде кей жағдайларда бұрын берілген қолжетімділік құқықтары жоғалуы мүмкін. Мысалы, кез келген метатопқа қолжетімділік беру сұралса, VK Cloud-тың жекелеген жобалары үшін орнатылған барлық қолжетімділік құқықтары жойылады. Бұған жол бермеу үшін барлық қажетті алушылар санаттарына қолжетімділік құқықтарын бір уақытта орнату ұсынылады.

Бір сұрауда рұқсаттарды бір мезгілде орнатуға арналған XML құрылымының мысалы:

```xml
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
