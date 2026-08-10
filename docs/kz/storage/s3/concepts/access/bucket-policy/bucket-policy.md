# {heading(Қолжетімділік саясаттары (bucket policy))[id=s3-concepts-bucket-policy]}

{include(/kz/_includes/_translated_by_ai.md)}

_Қолжетімділік саясаты (bucket policy)_ — {linkto(../../about#s3-concepts-about-bucket)[text=бакет]} мазмұнына және баптауларына қолжетімділікті басқару тәсілі. {linkto(../s3-acl#s3-concepts-acl)[text=қолжетімділікті басқару тізімінен (ACL)]} айырмашылығы, қолжетімділік саясаты анағұрлым болжамды және икемді қолжетімділік моделін береді.

Қолжетімділік саясатын және ACL-ді бірге пайдалану `OwnershipControls` бакет параметрімен реттеледі, оның екі режимі бар:
- `BucketOwnerEnforced` — тек қолжетімділік саясаты қолданылады, ACL қолданылмайды (өшірілген). Құқықтарды бір жерде икемді басқарудың ұсынылатын тәсілі.
- `BucketOwnerPreferred` — алдымен саясат бойынша қолжетімділік тексеріледі, содан кейін ACL тексеріледі. Мысалы, кері үйлесімділікті сақтау қажет болған жағдайда қолданылуы мүмкін.

`BucketOwnerPreferred` қолдану қолжетімділік саясаты мен ACL арасында қақтығыстар тудыруы мүмкін. Мүмкін болса, бакет баптауларында ACL-ді {linkto(../../../instructions/access-management/bucket-policy#s3-instructions-bucket-acl-enable-and-disable)[text=өшіру]} ұсынылады, содан кейін `OwnershipControls` режимі `BucketOwnerEnforced` мәніне өзгертіледі.

Қолжетімділік саясатын қолдану мысалдары:

- бакет ішіндегі объектілерге қолжетімділікті басқару;
- бакетке сырттан оқу немесе жазу үшін қолжетімділікті бақылау;
- жекелеген пайдаланушыларға немесе жобаларға қолжетімділік құқықтарын тағайындау;
- IP-адрестер, жол префикстері немесе басқа шарттар бойынша қолжетімділікті шектеу.

## {heading(Конфигурация)[id=s3-concepts-bucket-policy-config]}

Қолжетімділік саясатының конфигурациясы бір немесе бірнеше ережені қамтитын JSON форматында беріледі.

JSON файлының құрылымы:

```json
{
  "Version": "2012-10-17",
  "Id": "",
  "Statement": [
    {
      "Sid": "",
      "Action": [""],
      "Effect": "",
      "Principal": {
        "AWS":[""]
      },
      "Resource": [""],
      "Condition": {
        ...
      }
    },
  ...
  ]
}
```

Мұнда:

- `Id` — қолжетімділік саясатының бірегей идентификаторы (атауы).
- `Statement` — қолжетімділік саясаты ережелерінің массиві.
- `Sid` — ереженің бірегей идентификаторы (атауы).
- `Action` — ереже қолданылатын {linkto(#s3-concepts-bucket-policy-actions)[text=әрекеттері]} бар жол немесе жолдар массиві.
- `Effect` — әрекетті орындауға {linkto(#s3-concepts-bucket-policy-effect)[text=рұқсат беру немесе тыйым салу]}.
- `Principal` — ереже қолданылатын {linkto(#s3-concepts-bucket-policy-principal)[text=принципалдары]} (субъектілері) бар жол немесе жолдар массиві.
- `Condition` — ереже қандай {linkto(#s3-concepts-bucket-policy-conditions)[text=шарттарда]} іске қосылатынын анықтайды.
- `Resource` — `arn:aws:s3:::<РЕСУРС>` форматындағы жол немесе жолдар массиві, онда ереже орнатылатын {linkto(#s3-concepts-bucket-policy-resources)[text=ресурс]} көрсетіледі.

`Action`, `Effect`, `Principal`, `Condition` және `Resource` параметрлерінің толық сипаттамалары төменде берілген.

## {heading(Әрекеттер)[id=s3-concepts-bucket-policy-actions]}

`Action` параметрі бакеттермен және объектілермен қандай әрекеттерге {linkto(#s3-concepts-bucket-policy-effect)[text=рұқсат етілетінін немесе тыйым салынатынын]} анықтайды.

[cols="1,2"]
|===

|`S3:AbortMultipartUpload`
|Құрама жүктеуді болдырмау және бұрын жүктелген бөліктерді жою

|`S3:ListMultipartUploadParts`
|Құрама жүктеудің бөліктерін сұрату

|`S3:ListBucketMultipartUploads`
|Бакеттегі аяқталмаған құрама жүктеулер тізімін сұрату

|`S3:GetObject`
|Объектінің мазмұнын сұрату (жүктеп алу)

|`S3:GetObjectVersion`
|Объектінің нақты нұсқасының мазмұнын сұрату (жүктеп алу)

|`S3:GetObjectAttributes`
|Объектінің кеңейтілген атрибуттарын сұрату

|`S3:GetObjectVersionAttributes`
|Объектінің нақты нұсқасының кеңейтілген атрибуттарын сұрату

|`S3:PutObject`
|Объектіні жүктеу немесе қайта жазу (нұсқалау қосулы болса — жаңа нұсқа жасау)

|`S3:DeleteObject`
|Объектіні жою

|`S3:DeleteObjectVersion`
|Объектінің нақты нұсқасын жою

|`S3:GetObjectAcl`
|Объектінің ACL-ін сұрату

|`S3:GetObjectVersionAcl`
|Объектінің нақты нұсқасының ACL-ін сұрату

|`S3:PutObjectAcl`
|Объектінің ACL-ін орнату немесе қайта жазу

|`S3:PutObjectVersionAcl`
|Объектінің нақты нұсқасының ACL-ін орнату немесе қайта жазу

|`S3:GetObjectTagging`
|Объект тегтерін сұрату

|`S3:PutObjectTagging`
|Объект тегтерін орнату немесе қайта жазу

|`S3:DeleteObjectTagging`
|Объект тегтерін жою

|`S3:GetObjectLegalHold`
|Объектінің мерзімсіз бұғаттау күйін тексеру

|`S3:PutObjectLegalHold`
|Объектінің мерзімсіз бұғаттауын орнату немесе алып тастау

|`S3:GetObjectRetention`
|Объектінің уақытша бұғаттау күйін алу

|`S3:PutObjectRetention`
|Объектінің уақытша бұғаттауын орнату немесе өзгерту

|`S3:BypassGovernanceRetention`
|Уақытша бұғаттауды айналып өту

|`S3:ListBucket`
|Бакеттегі объектілер тізімін сұрату

|`S3:ListBucketVersions`
|Объект нұсқалары мен жою маркерлерінің тізімін сұрату

|`S3:GetBucketAcl`
|Бакеттің ACL-ін сұрату

|`S3:PutBucketAcl`
|Бакеттің ACL-ін орнату немесе қайта жазу

|`S3:GetBucketPolicy`
|Бакеттің қолжетімділік саясатын сұрату

|`S3:PutBucketPolicy`
|Бакеттің қолжетімділік саясатын орнату немесе қайта жазу

|`S3:DeleteBucketPolicy`
|Бакеттің қолжетімділік саясатын жою

|`S3:GetBucketPolicyStatus`
|Жария қолжетімділікті көрсететін бакет күйін сұрату

|`S3:GetBucketOwnershipControls`
|Бакеттегі қолжетімділікті басқару конфигурациясын сұрату

|`S3:PutBucketOwnershipControls`
|Бакеттегі қолжетімділікті басқару конфигурациясын орнату немесе қайта жазу

|`S3:GetBucketObjectLockConfiguration`
|Бакет деңгейіндегі объектілерді бұғаттау конфигурациясын сұрату

|`S3:PutBucketObjectLockConfiguration`
|Бакет деңгейіндегі объектілерді бұғаттау конфигурациясын орнату немесе қайта жазу

|`S3:GetBucketCORS`
|Бакеттің CORS-конфигурациясын сұрату

|`S3:PutBucketCORS`
|Бакеттің CORS-конфигурациясын орнату немесе қайта жазу

|`S3:GetBucketWebsite`
|Бакеттің статикалық веб-сайт конфигурациясын сұрату

|`S3:PutBucketWebsite`
|Бакеттің статикалық веб-сайт конфигурациясын орнату немесе қайта жазу

|`S3:DeleteBucketWebsite`
|Бакеттен статикалық веб-сайт конфигурациясын жою

|`S3:GetBucketNotification`
|Хабарландырулар конфигурациясын сұрату

|`S3:PutBucketNotification`
|Хабарландырулар конфигурациясын орнату немесе қайта жазу

|`S3:GetBucketVersioning`
|Бакеттің нұсқалау күйін сұрату

|`S3:PutBucketVersioning`
|Бакеттің нұсқалауын қосу немесе тоқтата тұру

{ifdef(s3,s3-pdf)}
|`S3:GetEncryptionConfiguration`
|Бакеттегі шифрлау конфигурациясын сұрату

|`S3:PutEncryptionConfiguration`
|Бакеттегі шифрлау конфигурациясын орнату немесе қайта жазу
{/ifdef}

|`S3:GetLifecycleConfiguration`
|Бакеттің өмірлік цикл ережелерін сұрату

|`S3:PutLifecycleConfiguration`
|Бакеттің өмірлік цикл ережелерін орнату немесе қайта жазу

|`S3:GetBucketLocation`
|Бакеттің өңірін алу

|`S3:DeleteBucket`
|Бакетті жою

|===

## {heading(Рұқсат беру және тыйым салу)[id=s3-concepts-bucket-policy-effect]}

Қолжетімділік саясатының барлық ережелері үшін `Effect` параметрінде әрекетті орындауға айқын рұқсат (`Allow`) немесе тыйым (`Deny`) көрсетіледі.

[cols="1,1",frame="none",grid="none"]
|===
|```json
...
"Effect": "Allow"
...
```

|```json
...
"Effect": "Deny"
...
```

|===

Егер қандай да бір әрекет үшін сәйкес ереже болмаса, әдепкі бойынша айқын тыйым (`Deny`) қолданылады.

## {heading(Принципалдар)[id=s3-concepts-bucket-policy-principal]}

  {note:info}

  {var(s3)} [Canonical User ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-federated-web-identity) бойынша принципалды сәйкестендіруді, сондай-ақ [федерация](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-federated-web-identity) құрамындағы принципалды қолдамайды.

  {/note}

`Principal` параметрі әрекеттердің кімге рұқсат етілетінін немесе кімге тыйым салынатынын анықтайды. Принципалдардың бірнеше нұсқасы қолдау табады.

- Аутентификациясыз (анонимді) жария қолжетімділік. Мысалы, статикалық сайттарды жариялау үшін.

  {note:warn}
  Қажеттілік болмаса, аутентификациясыз анонимді қолжетімділікті {linkto(#s3-concepts-bucket-policy-effect)[text=рұқсат ету]} ұсынылмайды. Ашық жариялау белгілі бір тәуекелдермен байланысты: деректердің жоғалуы, қоймаға қалаусыз жүктеулер, конфигурацияның жоспарланбаған өзгеруі. 
  {/note}

  ```json
  ...
  "Principal": "*"
  ...
  ```
  
- Жоба бойынша қолжетімділік — саясат {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жобасының пайдаланушылары мен сервистік есептік жазбаларына қолданылады.

  ```json
  ...
  "Principal": {
      "AWS": "<ID_ПРОЕКТА>"
  }
  ...
  ```

  Мұнда `<ID_ПРОЕКТА>` — саясатты қолдану қажет жобаның идентификаторы. Ол өз жобаңызды да, {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} басқа жобаны да көрсете алады.

- Белгілі бір {var(s3)} аккаунтына қолжетімділік беру.

  ```json
  ...
  "Principal": {
      "AWS": "arn:aws:iam::<ID_ПРОЕКТА>:user/<АККАУНТ_S3>"
  }
  ...
  ```

  Мұнда:
  
    - `<ID_ПРОЕКТА>` — саясатты қолдану қажет жобаның идентификаторы. Ол өз жобаңызды да, {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} басқа жобаны да көрсете алады.
    - `<АККАУНТ_S3>` — {var(s3)} аккаунтының атауы.

- Сервистік есептік жазба көмегімен қолданбаларға немесе сервистерге қолжетімділік.

  ```json
  ...
  "Principal": {
      "AWS": "arn:aws:iam::<ID_ПРОЕКТА>:user/serviceusers-<СЕРВИСНЫЙ_ПОЛЬЗОВАТЕЛЬ>"
  }
  ...
  ```

  Мұнда:
  
    - `<ID_ПРОЕКТА>` — саясатты қолдану қажет жобаның идентификаторы. Ол өз жобаңызды да, {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} басқа жобаны да көрсете алады.
    - `<СЕРВИСНЫЙ_ПОЛЬЗОВАТЕЛЬ>` — {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жүйесіндегі {var(s3)} үшін сервистік пайдаланушының атауы.

- {var(s3)} префикстік кілті:

  ```json
  ...
  "Principal": {
      "AWS": "arn:aws:iam::<ID_ПРОЕКТА>:user/<ПРЕФИКСНЫЙ_КЛЮЧ>"
  }
  ...
  ```

  Мұнда:
  
    - `<ID_ПРОЕКТА>` — саясатты қолдану қажет жобаның идентификаторы. Тек жоба ішіндегі бакеттердің біріне байланыстырылған префикстік кілттер ғана қолдау табады.
    - `<ПРЕФИКСНЫЙ_КЛЮЧ>` — {var(s3)} префикстік кілтінің атауы.

## {heading(Шарттар)[id=s3-concepts-bucket-policy-conditions]}

`Condition` параметрі ереже қандай шарттарда іске қосылатынын анықтайды. Ол екі параметр арқылы беріледі: {linkto(#s3-concepts-bucket-policy-conditions-operator)[text=оператор]} және {linkto(#s3-concepts-bucket-policy-conditions-keys)[text=кілт]}.

### {heading(Операторлар)[id=s3-concepts-bucket-policy-conditions-operator]}

`Condition` блогының ішінде көрсетіледі және мәндерді тексеру қалай жүргізілетінін анықтайды.

[cols="1,5"]
|===

|`StringEquals`
|Шарт кілтінің жолдық мәнінің көрсетілген мәнге (немесе тізімдегі мәндердің біріне) қатаң сәйкестігін тексеру

|`StringNotEquals`
|Шарт кілтінің жолдық мәнінің көрсетілген мәнге (немесе тізімдегі мәндердің ешқайсысына) қатаң сәйкестігі жоқ екенін тексеру

|`NumericEquals`
|Шарт кілтінің сандық мәнінің көрсетілген санға (немесе тізімдегі сандардың біріне) қатаң сәйкестігін тексеру

|`NumericLessThan`
|Шарт кілтінің сандық мәні көрсетілген саннан кіші болса — ақиқат

|`DateEquals`
|Күн мен уақыт мәні [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) форматындағы көрсетілген мәнге тең болса — ақиқат

|`IpAddress`
|Сұрау көзі IP-адресі көрсетілген IPv4 немесе IPv6 CIDR-диапазонына түссе — ақиқат

|`NotIpAddress`
|Сұрау көзі IP-адресі көрсетілген IPv4 немесе IPv6 CIDR-диапазонына түспесе — ақиқат

|===

### {heading(Кілттер)[id=s3-concepts-bucket-policy-conditions-keys]}

{linkto(#s3-concepts-bucket-policy-conditions-operator)[text=оператор]} ішінде кілт/мән форматында көрсетіледі.

[cols="4,7"]
|===

|`s3:object-lock-legal-hold`
|Объектінің мерзімсіз бұғаттау күйі. Мерзімсіз бұғаттау қосулы-қосылмағанына байланысты операцияларға рұқсат береді немесе тыйым салады. Мүмкін мәндер: `ON`, `OFF`

|`s3:object-lock-mode`
|Объектінің уақытша бұғаттау режимі. Ұстау режиміне байланысты операцияларды бақылау үшін қолданылады. Мүмкін мәндер: `GOVERNANCE`, `COMPLIANCE`

|`s3:object-lock-remaining-retention-days`
|Объектінің уақытша бұғаттауы аяқталғанға дейін қалған күндер саны. Бұғаттаудың қалған күндері санына байланысты операцияларды бақылау үшін қолданылады. 0 және одан жоғары сандық мәндер қолдау табады

|`s3:object-lock-retain-until-date`
|Объект ұсталып тұратын күн мен уақыт, [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) форматында. Бұғаттаудың аяқталу күніне байланысты операцияларды бақылау үшін қолданылады

|`aws:SourceIp`
|Сұрау келген клиенттің IP-адресі. IPv4 немесе IPv6 CIDR-диапазондары бойынша қолжетімділікті шектеу үшін қолданылады

|===

## {heading(Ресурстар)[id=s3-concepts-bucket-policy-resources]}

`Resource` параметрі мыналарды қамтуы мүмкін:
- бакетті көрсететін жол:

  ```json
  "Resource": "arn:aws:s3:::<ИМЯ_БАКЕТА>"
  ```

- объектіні көрсететін жол:

  ```json
  "Resource": "arn:aws:s3:::<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА>"
  ```

- объект кілтінің белгілі бір префиксі бар объектілерді көрсететін `*` (wildcard) маскасы бар жол:

  ```json
  "Resource": "arn:aws:s3:::<ИМЯ_БАКЕТА>/<ЧАСТЬ_КЛЮЧА_ОБЪЕКТА>/*"
  ```

  немесе

  ```json
  "Resource": "arn:aws:s3:::<ИМЯ_БАКЕТА>/<ЧАСТЬ_КЛЮЧА_ОБЪЕКТА>*"
  ```

- объект кілтінің белгілі бір суффиксі бар объектілерді көрсететін `*` (wildcard) маскасы бар жол:

  ```json
  "Resource": "arn:aws:s3:::<ИМЯ_БАКЕТА>/*<ЧАСТЬ_КЛЮЧА_ОБЪЕКТА>"
  ```

- бірнеше ресурсы бар жолдар массиві:

  ```json
  "Resource": [
    "arn:aws:s3:::<ИМЯ_БАКЕТА>",
    "arn:aws:s3:::<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА>"
  ]
  ```

  Бұл ретте бакеттерге арналған әрекеттер тек бакеттер үшін, ал объектілерге арналған әрекеттер тек объектілер үшін қолданылады.

## {heading(Конфигурация мысалдары)[id=s3-concepts-bucket-policy-examples]}

- Объектілерді тек көрсетілген IP-адрестер диапазонынан жүктеп алуға рұқсат беру:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowGetOnlyFromCIDR",
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": ["arn:aws:s3:::my-bucket/*"],
        "Condition": {
          "IpAddress": {
            "aws:SourceIp": ["203.0.113.0/24", "2001:db8:1234::/48"]
          }
        }
      }
    ]
  }
  ```

- Көрсетілген IP-адрестен объектілерді жүктеп алуға тыйым салу:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DenyGetFromSingleIP",
        "Effect": "Deny",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": ["arn:aws:s3:::my-bucket/*"],
        "Condition": {
          "IpAddress": {
            "aws:SourceIp": "198.51.100.10/32"
          }
        }
      }
    ]
  }
  ```

- Әртүрлі пайдаланушыларға белгілі бір бумаларға толық қолжетімділік беру:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "UserAFullAccessToFolderA",
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-a"
        },
        "Action": [
          "s3:GetObject",
          "s3:GetObjectAttributes",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:GetObjectTagging",
          "s3:PutObjectTagging",
          "s3:DeleteObjectTagging",
          "s3:GetObjectAcl",
          "s3:PutObjectAcl",
          "s3:AbortMultipartUpload",
          "s3:ListMultipartUploadParts"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/folder-a/*"]
      },
      {
        "Sid": "UserBFullAccessToFolderB",
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-b"
        },
        "Action": [
          "s3:GetObject",
          "s3:GetObjectAttributes",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:GetObjectTagging",
          "s3:PutObjectTagging",
          "s3:DeleteObjectTagging",
          "s3:GetObjectAcl",
          "s3:PutObjectAcl",
          "s3:AbortMultipartUpload",
          "s3:ListMultipartUploadParts"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/folder-b/*"]
      }
    ]
  }
  ```

- Әрбір пайдаланушыға немесе сервистік аккаунтқа бумаға толық қолжетімділік беру:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "ProjectFullAccessToSharedFolder",
        "Effect": "Allow",
        "Principal": {
          "AWS": "mcs1234567890"
        },
        "Action": [
          "s3:GetObject",
          "s3:GetObjectAttributes",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:GetObjectTagging",
          "s3:PutObjectTagging",
          "s3:DeleteObjectTagging",
          "s3:GetObjectAcl",
          "s3:PutObjectAcl",
          "s3:AbortMultipartUpload",
          "s3:ListMultipartUploadParts"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/shared/*"]
      }
    ]
  }
  ```

- Жазу шарттарын міндетті түрде қолдану талап етілетін жағдайда ғана объектілерді жазуға рұқсат беру:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowPutOnlyFromCIDR",
        "Effect": "Allow",
        "Principal": {
          "AWS": "mcs1234567890"
        },
        "Action": "s3:PutObject",
        "Resource": ["arn:aws:s3:::my-bucket/*"],
        "Condition": {
          "IpAddress": {
            "aws:SourceIp": ["203.0.113.0/24"]
          }
        }
      }
    ]
  }
  ```