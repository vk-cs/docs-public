# {heading(Кіру саясаттары (bucket policy))[id=s3-concepts-bucket-policy]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

_Кіру саясаты (bucket policy)_ — {linkto(../../about#s3-concepts-about-bucket)[text=бакеттің]} мазмұны мен баптауларына кіруді басқару тәсілі. {linkto(../s3-acl#s3-concepts-acl)[text=Кіруді басқару тізімімен (ACL)]} салыстырғанда, кіру саясаты болжамды және икемді кіру моделін ұсынады.

Кіру саясаты мен ACL-ді бірлесіп қолдану `OwnershipControls` бакет параметрімен реттеледі, оның екі режимі бар:
- `BucketOwnerEnforced` — тек кіру саясаты қолданылады, ACL қолданылмайды (өшірілген). Құқықтарды бір жерде икемді басқарудың ұсынылатын тәсілі.
- `BucketOwnerPreferred` — алдымен саясат бойынша кіру тексеріледі, содан кейін ACL тексеріледі. Мысалы, кері үйлесімділікті сақтау жағдайында қолданылуы мүмкін. Әдепкі бойынша қосулы.

`BucketOwnerPreferred` режимін қолдану кіру саясаты мен ACL арасында қақтығыстар тудыруы мүмкін. Мүмкіндігінше бакет баптауларында ACL-ді {linkto(../../../instructions/access-management/bucket-policy#s3-instructions-bucket-acl-enable-and-disable)[text=өшіру]} ұсынылады, содан кейін `OwnershipControls` режимі `BucketOwnerEnforced` режиміне өзгертіледі.

Кіру саясатын қолдану мысалдары:

- бакет ішіндегі нысандарға кіруді басқару;
- бакетке сырттан оқу немесе жазу кіруін бақылау;
- жеке пайдаланушыларға немесе жобаларға кіру құқықтарын тағайындау;
- IP-адрестер, жол префикстері немесе басқа шарттар бойынша кіруді шектеу.

## {heading(Конфигурация)[id=s3-concepts-bucket-policy-config]}

Кіру саясатының конфигурациясы бір немесе бірнеше ереже қамтитын JSON форматында беріледі.

JSON-файлының құрылымы:

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

- `Id` — кіру саясатының бірегей идентификаторы (атауы).
- `Statement` — кіру саясатының ережелер массиві.
- `Sid` — ереженің бірегей идентификаторы (атауы).
- `Action` — ереже қолданылатын {linkto(#s3-concepts-bucket-policy-actions)[text=әрекеттердің]} жолы немесе жолдар массиві.
- `Effect` — әрекетті орындауға {linkto(#s3-concepts-bucket-policy-effect)[text=рұқсат немесе тыйым]}.
- `Principal` — ереже қолданылатын {linkto(#s3-concepts-bucket-policy-principal)[text=принципалдардың]} (субъектілердің) жолы немесе жолдар массиві.
- `Condition` — ереженің қандай {linkto(#s3-concepts-bucket-policy-conditions)[text=шарттарда]} іске қосылатынын анықтайды.
- `Resource` — ереже орнатылатын {linkto(#s3-concepts-bucket-policy-resources)[text=ресурс]} көрсетілген `arn:aws:s3:::<РЕСУРС>` форматындағы жол немесе жолдар массиві.

`Action`, `Effect`, `Principal`, `Condition` және `Resource` параметрлерінің толық сипаттамалары төменде берілген.

## {heading(Әрекеттер)[id=s3-concepts-bucket-policy-actions]}

`Action` параметрі бакеттер мен нысандармен қандай әрекеттердің {linkto(#s3-concepts-bucket-policy-effect)[text=рұқсат етілетінін немесе тыйым салынатынын]} анықтайды.

[cols="1,2"]
|===

|`S3:AbortMultipartUpload`
|Құрамдас жүктеуді тоқтатып, жүктелген бөліктерді өшіру

|`S3:ListMultipartUploadParts`
|Құрамдас жүктеудің бөліктерін сұрау

|`S3:ListBucketMultipartUploadParts`
|Бакеттегі аяқталмаған құрамдас жүктеулер тізімін сұрау

|`S3:GetObject`
|Нысанның мазмұнын сұрау (жүктеп алу)

|`S3:GetObjectVersion`
|Нысанның нақты нұсқасының мазмұнын сұрау (жүктеп алу)

|`S3:GetObjectAttributes`
|Нысанның кеңейтілген атрибуттарын сұрау

|`S3:GetObjectVersionAttributes`
|Нысанның нақты нұсқасының кеңейтілген атрибуттарын сұрау

|`S3:PutObject`
|Нысанды жүктеу немесе қайта жазу (версиялау қосылғанда — жаңа нұсқа жасау)

|`S3:DeleteObject`
|Нысанды өшіру

|`S3:DeleteObjectVersion`
|Нысанның нақты нұсқасын өшіру

|`S3:GetObjectAcl`
|Нысанның ACL-ін сұрау

|`S3:GetObjectVersionAcl`
|Нысанның нақты нұсқасының ACL-ін сұрау

|`S3:PutObjectAcl`
|Нысанның ACL-ін орнату немесе қайта жазу

|`S3:PutObjectVersionAcl`
|Нысанның нақты нұсқасының ACL-ін орнату немесе қайта жазу

|`S3:GetObjectTagging`
|Нысан тегтерін сұрау

|`S3:PutObjectTagging`
|Нысан тегтерін орнату немесе қайта жазу

|`S3:DeleteObjectTagging`
|Нысан тегтерін өшіру

|`S3:GetObjectLegalHold`
|Нысанның мерзімсіз құлыптау күйін тексеру

|`S3:PutObjectLegalHold`
|Нысанның мерзімсіз құлыптауын орнату немесе алу

|`S3:GetObjectRetention`
|Нысанның уақытша құлыптау күйін алу

|`S3:PutObjectRetention`
|Нысанның уақытша құлыптауын орнату немесе өзгерту

|`S3:BypassGovernanceRetention`
|Уақытша құлыптауды айналып өту

|`S3:ListBucket`
|Бакеттегі нысандар тізімін сұрау

|`S3:ListBucketVersions`
|Нысандар нұсқаларының және өшіру маркерлерінің тізімін сұрау

|`S3:GetBucketAcl`
|Бакеттің ACL-ін сұрау

|`S3:PutBucketAcl`
|Бакеттің ACL-ін орнату немесе қайта жазу

|`S3:GetBucketPolicy`
|Бакеттің кіру саясатын сұрау

|`S3:PutBucketPolicy`
|Бакеттің кіру саясатын орнату немесе қайта жазу

|`S3:DeleteBucketPolicy`
|Бакеттің кіру саясатын өшіру

|`S3:GetBucketPolicyStatus`
|Публичтік кіруді көрсететін бакет күйін сұрау

|`S3:GetBucketOwnershipControls`
|Бакеттегі кіруді басқару конфигурациясын сұрау

|`S3:PutBucketOwnershipControls`
|Бакеттегі кіруді басқару конфигурациясын орнату немесе қайта жазу

|`S3:GetBucketObjectLockConfiguration`
|Бакет деңгейіндегі нысандарды құлыптау конфигурациясын сұрау

|`S3:PutBucketObjectLockConfiguration`
|Бакет деңгейіндегі нысандарды құлыптау конфигурациясын орнату немесе қайта жазу

|`S3:GetBucketCORS`
|Бакеттің CORS-конфигурациясын сұрау

|`S3:PutBucketCORS`
|Бакеттің CORS-конфигурациясын орнату немесе қайта жазу

|`S3:GetBucketWebsite`
|Бакеттің статикалық веб-сайт конфигурациясын сұрау

|`S3:PutBucketWebsite`
|Бакеттің статикалық веб-сайт конфигурациясын орнату немесе қайта жазу

|`S3:DeleteBucketWebsite`
|Бакеттен статикалық веб-сайт конфигурациясын өшіру

|`S3:GetBucketNotification`
|Хабарландырулар конфигурациясын сұрау

|`S3:PutBucketNotification`
|Хабарландырулар конфигурациясын орнату немесе қайта жазу

|`S3:GetBucketVersioning`
|Бакеттің версиялау күйін сұрау

|`S3:PutBucketVersioning`
|Бакеттің версиялауын қосу немесе уақытша тоқтату

{ifdef(s3,s3-pdf)}
|`S3:GetEncryptionConfiguration`
|Бакеттегі шифрлау конфигурациясын сұрау

|`S3:PutEncryptionConfiguration`
|Бакеттегі шифрлау конфигурациясын орнату немесе қайта жазу
{/ifdef}

|`S3:GetLifecycleConfiguration`
|Бакеттің өмірлік цикл ережелерін сұрау

|`S3:PutLifecycleConfiguration`
|Бакеттің өмірлік цикл ережелерін орнату немесе қайта жазу

|`S3:GetBucketLocation`
|Бакеттің өңірін алу

|`S3:DeleteBucket`
|Бакетті өшіру

|===

## {heading(Рұқсат және тыйым)[id=s3-concepts-bucket-policy-effect]}

{linkto(#s3-concepts-bucket-policy-actions)[text=Әрекеттерге]} рұқсат (`Allow`) немесе тыйым (`Deny`) жасырын (implicit) және ашық (explicit) түрде қолданылуы мүмкін.
- Жасырын рұқсат (implicit allow): {var(s3)} автоматты түрде орнатылады және барлық ішкі {linkto(#s3-concepts-bucket-policy-principal)[text=принципалдарға]} әдепкі түрде қолданылады.
- Жасырын тыйым (implicit deny): {var(s3)} автоматты түрде орнатылады және барлық сыртқы {linkto(#s3-concepts-bucket-policy-principal)[text=принципалдарға]} әдепкі түрде қолданылады.
- Ашық рұқсат (explicit allow): {linkto(../../../instructions/access-management/bucket-policy#s3-instructions-bucket-policy)[text=қолданушы]} қол жетімділік саясаттары арқылы `Effect` параметрі арқылы орнатылады:

    ```json
    ...
    "Effect": "Allow"
    ...
    ```

- Ашық тыйым (explicit deny): {linkto(../../../instructions/access-management/bucket-policy#s3-instructions-bucket-policy)[text=қолданушы]} қол жетімділік саясаттары арқылы `Effect` параметрі арқылы орнатылады:

    ```json
    ...
    "Effect": "Deny"
    ...
    ```

Сәйкесінше:

- ішкі принципалдарға әдепкі бойынша барлық әрекеттер рұқсат етіледі (implicit allow), ал кіру айқын тыйымдармен (explicit deny) шектеледі.
- сыртқы принципалдарға: әдепкі бойынша барлық әрекеттерге тыйым салынады (implicit deny), ал кіру айқын рұқсаттардың (explicit allow) есебінен кеңейтіледі.

## {heading(Принципалдар)[id=s3-concepts-bucket-policy-principal]}

  {note:info}

  {var(s3)} [Canonical User ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-federated-web-identity) бойынша принципалды идентификациялауды, сондай-ақ [федерация](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-federated-web-identity) құрамындағы принципалды қолдамайды.

  {/note}

`Principal` параметрі әрекеттердің дәл кімге рұқсат етілетінін немесе тыйым салынатынын анықтайды. Принципалдардың бірнеше нұсқасы қолдау көрсетіледі.

- Аутентификациясыз публичтік кіру (анонимді). Мысалы, статикалық сайттарды жариялау үшін.

  {note:warn}
  Қажеттілік болмаса, аутентификациясыз анонимді кіруді {linkto(#s3-concepts-bucket-policy-effect)[text=рұқсат ету]} ұсынылмайды. Ашық жариялау белгілі бір қауіптермен байланысты: деректерді жоғалту, сақтауышқа жағымсыз жүктеулер, конфигурацияны жоспарланбаған өзгерту.
  {/note}

  ```json
  ...
  "Principal": "*"
  ...
  ```

- Жоба бойынша кіру — саясат {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жобасының пайдаланушыларына және сервистік есеп жазбаларына қолданылады.

  ```json
  ...
  "Principal": {
      "AWS": "<ID_ПРОЕКТА>"
  }
  ...
  ```

  Мұнда `<ID_ПРОЕКТА>` — саясат қолданылатын жобаның идентификаторы. Ол өзіндік жобаны да, {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} басқа жобаны да көрсете алады.

- {var(s3)} белгілі бір аккаунтына кіруді беру.

  ```json
  ...
  "Principal": {
      "AWS": "arn:aws:iam::<ID_ПРОЕКТА>:user/<АККАУНТ_S3>"
  }
  ...
  ```

  Мұнда:

    - `<ID_ПРОЕКТА>` — саясат қолданылатын жобаның идентификаторы. Ол өзіндік жобаны да, {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} басқа жобаны да көрсете алады.
    - `<АККАУНТ_S3>` — {var(s3)} аккаунтының атауы.

- Сервистік есеп жазбасы арқылы қосымшаларға немесе сервистерге кіру.

  ```json
  ...
  "Principal": {
      "AWS": "arn:aws:iam::<ID_ПРОЕКТА>:user/serviceusers-<СЕРВИСНЫЙ_ПОЛЬЗОВАТЕЛЬ>"
  }
  ...
  ```

  Мұнда:

    - `<ID_ПРОЕКТА>` — саясат қолданылатын жобаның идентификаторы. Ол өзіндік жобаны да, {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} басқа жобаны да көрсете алады.
    - `<СЕРВИСНЫЙ_ПОЛЬЗОВАТЕЛЬ>` — {var(s3)} үшін арналған {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} сервистік пайдаланушының атауы.

- {var(s3)} префикстік кілті:

  ```json
  ...
  "Principal": {
      "AWS": "arn:aws:iam::<ID_ПРОЕКТА>:user/<ПРЕФИКСНЫЙ_КЛЮЧ>"
  }
  ...
  ```

  Мұнда:

    - `<ID_ПРОЕКТА>` — саясат қолданылатын жобаның идентификаторы. Жобадағы бакеттердің біріне байланған тек префикстік кілттер қолдау көрсетіледі.
    - `<ПРЕФИКСНЫЙ_КЛЮЧ>` — {var(s3)} префикстік кілтінің атауы.

## {heading(Шарттар)[id=s3-concepts-bucket-policy-conditions]}

`Condition` параметрі ереженің қандай шарттарда іске қосылатынын анықтайды. Екі параметр көмегімен беріледі: {linkto(#s3-concepts-bucket-policy-conditions-operator)[text=оператор]} және {linkto(#s3-concepts-bucket-policy-conditions-keys)[text=кілт]}.

### {heading(Операторлар)[id=s3-concepts-bucket-policy-conditions-operator]}

`Condition` блогының ішінде көрсетіледі және мәндердің тексерудің қалай өтетінін анықтайды.

[cols="1,5"]
|===

|`StringEquals`
|Шарт кілтінің жолдық мәнінің көрсетілген мәнге (немесе тізімдегі мәндердің біріне) қатаң сәйкестігін тексеру

|`StringNotEquals`
|Шарт кілтінің жолдық мәнінің көрсетілген мәнге сәйкес келмеуін (немесе тізімдегі ешбір мәнге сәйкес келмеуін) тексеру

|`NumericEquals`
|Шарт кілтінің сандық мәнінің көрсетілген санға (немесе тізімдегі сандардың біріне) қатаң сәйкестігін тексеру

|`NumericLessThan`
|Шарт кілтінің сандық мәні көрсетілген саннан кіші болса — ақиқат

|`DateEquals`
|Күні мен уақытының мәні [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) форматындағы көрсетілген мәнге тең болса — ақиқат

|`IpAddress`
|Сұраныс көзінің IP-адресі көрсетілген IPv4 немесе IPv6 CIDR-диапазонына кірсе — ақиқат

|`NotIpAddress`
|Сұраныс көзінің IP-адресі көрсетілген IPv4 немесе IPv6 CIDR-диапазонына кірмесе — ақиқат

|===

### {heading(Кілттер)[id=s3-concepts-bucket-policy-conditions-keys]}

{linkto(#s3-concepts-bucket-policy-conditions-operator)[text=Оператордың]} ішінде кілт/мән форматында көрсетіледі.

[cols="4,7"]
|===

|`s3:object-lock-legal-hold`
|Нысанның мерзімсіз құлыптау күйі. Мерзімсіз құлыптау қосулы болуына байланысты операцияларды рұқсат етеді немесе тыйым салады. Мүмкін мәндер: `ON`, `OFF`

|`s3:object-lock-mode`
|Нысанның уақытша құлыптау режимі. Ұстау режиміне байланысты операцияларды бақылау үшін қолданылады. Мүмкін мәндер: `GOVERNANCE`, `COMPLIANCE`

|`s3:object-lock-remaining-retention-days`
|Нысанның уақытша құлыптауы аяқталғанға дейінгі қалған күндер саны. Құлыптаудың қалған күндер санына байланысты операцияларды бақылау үшін қолданылады. 0 және одан үлкен сандық мәндер қолдау көрсетіледі

|`s3:object-lock-retain-until-date`
|Нысан ұсталатын күн мен уақыт, [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) форматында. Құлыптау аяқталу күніне байланысты операцияларды бақылау үшін қолданылады

|`aws:SourceIp`
|Сұраныс келген клиенттің IP-адресі. IPv4 немесе IPv6 CIDR-диапазондары бойынша кіруді шектеу үшін қолданылады

|===

## {heading(Ресурстар)[id=s3-concepts-bucket-policy-resources]}

`Resource` параметрі мыналарды қамтуы мүмкін:
- бакетке көрсететін жол:

  ```json
  "Resource": "arn:aws:s3:::<ИМЯ_БАКЕТА>"
  ```

- нысанға көрсететін жол:

  ```json
  "Resource": "arn:aws:s3:::<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА>"
  ```

- `*` (wildcard) маскасы бар, нысан кілтінің белгілі бір префиксі бар нысандарға көрсететін жол:

  ```json
  "Resource": "arn:aws:s3:::<ИМЯ_БАКЕТА>/<ЧАСТЬ_КЛЮЧА_ОБЪЕКТА>/*"
  ```

  немесе

  ```json
  "Resource": "arn:aws:s3:::<ИМЯ_БАКЕТА>/<ЧАСТЬ_КЛЮЧА_ОБЪЕКТА>*"
  ```

- `*` (wildcard) маскасы бар, нысан кілтінің белгілі бір суффиксі бар нысандарға көрсететін жол:

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

  Бұл жағдайда бакеттерге арналған әрекеттер тек бакеттерге қолданылады, ал нысандарға арналған әрекеттер — тек нысандарға қолданылады.

## {heading(Конфигурация мысалдары)[id=s3-concepts-bucket-policy-examples]}

- Объекттерді тек көрсетілген IP-адрестер диапазонынан анонимді пайдаланушыларға (сыртқы {linkto(#s3-concepts-bucket-policy-effect)[text=принципалдарға]}) жүктеп алуға рұқсат беру:

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
            "aws:SourceIp": ["203.0.113.0/24", "198.51.100.0/24"]
          }
        }
      }
    ]
  }
  ```

- Объекттерді көрсетілген IP-адрестен жүктеп алуды белгілі бір пайдаланушыға (ішкі {linkto(#s3-concepts-bucket-policy-effect)[text=принципалға]}) тыйым салу:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DenyGetFromSingleIP",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-b"
        },
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

- Кейбір пайдаланушыларға (басқа `mcs9876543210` жобасының сыртқы {linkto(#s3-concepts-bucket-policy-effect)[text=принципалдарына]}) белгілі бір префиксті объекттерге толық қолжетімділік беру:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "UserAFullAccessToFolderA",
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::mcs9876543210:user/user-external-a"
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
          "AWS": "arn:aws:iam::mcs9876543210:user/user-external-b"
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

- Пайдаланушыларға немесе сервистік аккаунттарға (басқа `mcs9876543210` жобасының сыртқы {linkto(#s3-concepts-bucket-policy-effect)[text=принципалдарына]}) белгілі бір префиксті объекттерге толық қолжетімділік беру:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "ProjectFullAccessToSharedFolder",
        "Effect": "Allow",
        "Principal": {
          "AWS": "mcs9876543210"
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

- Пайдаланушыларға немесе сервистік аккаунттарға (басқа `mcs9876543210` жобасының сыртқы {linkto(#s3-concepts-bucket-policy-effect)[text=принципалдарына]}) объекттерді тек белгілі бір IP-адрестерден жазуға рұқсат беру:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowPutOnlyFromCIDR",
        "Effect": "Allow",
        "Principal": {
          "AWS": "mcs9876543210"
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

- Кез келген объектті жүктеп алуды және осы тыйымды айналып өтуді белгілі бір пайдаланушыға (ішкі {linkto(#s3-concepts-bucket-policy-effect)[text=принципалға]}) тыйым салу:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DenyDownloadObjectAndVersions",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-b"
        },
        "Action": [
          "s3:GetObject",
          "s3:GetObjectVersion"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/*"]
      },

      {
        "Sid": "DenyBypassPrevention",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-b"
        },
        "Action": [
          "s3:PutBucketPolicy",
          "s3:DeleteBucketPolicy"
        ],
        "Resource": ["arn:aws:s3:::my-bucket"]
      }
    ]
  }
  ```

- Кез келген объектті жоюды және осы тыйымды айналып өтуді белгілі бір пайдаланушыға (ішкі {linkto(#s3-concepts-bucket-policy-effect)[text=принципалға]}) тыйым салу:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DenyDeleteObjectAndVersions",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": [
          "s3:DeleteObject",
          "s3:DeleteObjectVersion"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/*"]
      },

      {
        "Sid": "DenyBypassPreventionObject",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": [
          "s3:PutObject"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/*"]
      },

      {
        "Sid": "DenyBypassPreventionBucket",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": [
          "s3:PutLifecycleConfiguration",
          "s3:PutBucketPolicy",
          "s3:DeleteBucketPolicy",
          "s3:PutBucketVersioning" 
        ],
        "Resource": ["arn:aws:s3:::my-bucket"]
      }
    ]
  }
  ```

- Объекттерді блоктау мерзімін орнатуға немесе өзгертуге белгілі бір пайдаланушыға (басқа `mcs9876543210` жобасының сыртқы {linkto(#s3-concepts-bucket-policy-effect)[text=принципалына]}) рұқсат беру, егер сұралған мерзім 10 күннен аспаса:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowShortRetention",
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::mcs9876543210:user/user-external-a"
        },
        "Action": [
          "s3:PutObjectRetention"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/*"],
        "Condition": {
          "NumericLessThan": {
            "s3:object-lock-remaining-retention-days": 11
          }
        }
      }
    ]
  }
  ```

- Бакетке қолжетімділікті пайдаланушыға (ішкі {linkto(#s3-concepts-bucket-policy-effect)[text=принципалға]}) толықтай тыйым салу:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "ExplicitDenyInternalUser",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": "s3:*",
        "Resource": [
          "arn:aws:s3:::my-bucket",
          "arn:aws:s3:::my-bucket/*"
        ]
      }
    ]
  }
  ```

- Пайдаланушыға (басқа `mcs9876543210` жобасының сыртқы {linkto(#s3-concepts-bucket-policy-effect)[text=принципалына]}) тек өзінің бакетінің нұсқалар тізімін (тарихын) көруге рұқсат беру:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowExternalUserListBucket",
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::mcs9876543210:user/user-external-a"
        },
        "Action": [
          "s3:ListBucket",
          "s3:ListBucketVersions",
        ],
        "Resource": ["arn:aws:s3:::my-bucket"]
      }
    ]
  }
  ```

- Белгілі бір бакет, объект, префикс үшін ережелер жинағын сыртқы және ішкі {linkto(#s3-concepts-bucket-policy-effect)[text=принципалдарға]} орнату:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "Разрешить list-object анонимным пользователям",
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:ListBucket",
        "Resource": ["arn:aws:s3:::my-bucket"]
      },
      {
        "Sid": "Запретить просмотр, редактирование, удаление объекта my-object-1 внутреннему пользователю user-internal-a",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": [
          "s3:GetObject",
          "s3:GetObjectVersion",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:DeleteObjectVersion"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/my-object-1"]
      },
      {
        "Sid": "Запретить изменение правил жизненного цикла бакета и его объектов внутреннему пользователю user-internal-a",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": [
          "s3:PutLifecycleConfiguration"
        ],
        "Resource": ["arn:aws:s3:::my-bucket"]
      },
      {
        "Sid": "Запретить изменение и удаление политики бакета my-bucket внутреннему пользователю user-internal-a",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": [
          "s3:PutBucketPolicy",
          "s3:DeleteBucketPolicy"
        ],
        "Resource": ["arn:aws:s3:::my-bucket"]
      },
      {
        "Sid": "Разрешить list-bucket для get-object объектов только с префиксом 'directory' внешним пользователям из другого проекта mcs9876543210",
        "Effect": "Allow",
        "Principal": {
            "AWS": "mcs9876543210"
        },
        "Action": [
          "s3:ListBucket"
        ],
        "Resource": ["arn:aws:s3:::my-bucket"]
      },
      {
        "Sid": "Разрешить get-object объектов только с префиксом 'directory' внешним пользователям из другого проекта mcs9876543210",
        "Effect": "Allow",
        "Principal": {
            "AWS": "mcs9876543210"
        },
        "Action": [
          "s3:GetObject"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/directory/*"]
      }     
    ]
  }
  ```

- Мерзімсіз объекттерді блоктауды өзгертуді белгілі бір пайдаланушыға (ішкі {linkto(#s3-concepts-bucket-policy-effect)[text=принципалға]}) тыйым салу, егер ол қосылған болса:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DenyPutLegalHold",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": [
          "s3:PutObjectLegalHold"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/*"],
        "Condition": {
          "StringEquals": {
            "s3:object-lock-legal-hold": "ON"
          }
        }
      }
    ]
  }
  ```

- Уақытша объекттерді блоктауды өзгертуді, онда `GOVERNANCE` режимі орнатылған, белгілі бір пайдаланушыға (ішкі {linkto(#s3-concepts-bucket-policy-effect)[text=принципалға]}) тыйым салу:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DenyPutObjectRetention",
        "Effect": "Deny",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-internal-a"
        },
        "Action": [
          "s3:PutObjectRetention",
          "s3:BypassGovernanceRetention"
        ],
        "Resource": ["arn:aws:s3:::test-bucket-1/*"],
        "Condition": {
          "StringEquals": {
            "s3:object-lock-mode": "COMPLIANCE"
          }
        }
      }
    ]
  }
  ```

- Объекттерді сақтау мерзімін орнатуға пайдаланушыларға (басқа `mcs9876543210` жобасының сыртқы {linkto(#s3-concepts-bucket-policy-effect)[text=принципалдарына]}) рұқсат беру, егер сұралған күн `2026-09-17` болса:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "ExplicitAllowForExternalPrincipals",
        "Effect": "Allow",
        "Principal": {
          "AWS": "mcs9876543210" 
        },
        "Action": [
          "s3:PutObjectRetention",
          "s3:BypassGovernanceRetention"
        ],
        "Resource": ["arn:aws:s3:::test-bucket-1/*"],
        "Condition": {
          "DateEquals": {
            "s3:object-lock-retain-until-date": "2026-09-17T00:00:00Z"
          }
        }
      }
    ]
  }
  ```