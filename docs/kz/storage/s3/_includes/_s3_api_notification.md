Хабарландырулар сервисі баспагер–жазылушы (pub/sub) моделіне негізделген. Ол бапталған арналар бойынша хабарландыруларды лезде таратады (push-модель).

Сервис жұмыс істеу үшін SNS-тәрізді вебхуктарды пайдаланады.

Сервис жұмысы кезінде:

- Қайталану мүмкін — бір оқиға туралы хабарландыру бірнеше рет жеткізілуі мүмкін.
- Оқиғалар туралы хабарландырулар еркін тәртіпте жеткізілуі мүмкін.

{note:warn}
EventBridge қолдау көрсетілмейді.
{/note}

## {heading(Оқиға түрлері)[id=working-with-notifications]}

Оқиға түрлерінің сипаттамасы {linkto(#notifications)[text=%number кестесінде]} берілген.

{caption(Кесте {counter(table)[id=numb_tab_notifications]} — Оқиға түрлері)[align=right;position=above;id=notifications;number={const(numb_tab_notifications)}]}
[cols="1,4", options="header"]
|===
|Оқиға түрі
|Сипаттама

|`TestEvent`
|Тест оқиғасы.

Хабарландыру қосылған кезде {var(s3)} тест хабарландыруын жібереді. Егер алушы тест хабарландыруын алмаса, хабарландыру баптауларын тексеріңіз

|`s3:ObjectCreated:*`

`s3:ObjectCreated:Put`

`s3:ObjectCreated:Post`

`s3:ObjectCreated:Copy`

`s3:ObjectCreated:CompleteMultipartUpload`

|Объектіні жасау.

Белгілі бір әдіс (`s3:ObjectCreated:Put`, `s3:ObjectCreated:Post` немесе `s3:ObjectCreated:Copy`) немесе `s3:ObjectCreated:CompleteMultipartUpload` түрі бойынша объект жасалуы туралы хабарландыруды баптауға болады, бұл кезде объект көшіру арқылы жасалады (`UploadPartCopy`)

|`s3:ObjectRemoved:*`

`s3:ObjectRemoved:Delete`

`s3:ObjectRemoved:DeleteMarkerCreated`

|Бакеттен объектіні немесе объектілер тобын жою:

- `s3:ObjectRemoved:*` — объектіні жою туралы хабарландырулардың әмбебап түрі.
- `s3:ObjectRemoved:Delete` — объектіні жою немесе нұсқаланған объектіні түпкілікті жою.
- `s3:ObjectRemoved:DeleteMarkerCreated` — нұсқаланған объект үшін жою маркерін жасау.

Бұл оқиғалар өмірлік цикл конфигурациясына сәйкес автоматты түрде жойылған объектілер жағдайларын немесе сәтсіз операциялар салдарынан жойылған жағдайларды қамтымайды

|`s3:ObjectRestore:*`

`s3:ObjectRestore:Post`

`s3:ObjectRestore:Completed`

`s3:ObjectRestore:Delete`

|Объектіні қалпына келтіру оқиғалары:

- `s3:ObjectRestore:Post` — объектіні қалпына келтіру іске қосылды.
- `s3:ObjectRestore:Completed` — объектіні қалпына келтіру аяқталды.
- `s3:ObjectRestore:Delete` — қалпына келтірілген объектінің уақытша көшірмесінің мерзімі аяқталды

|`s3:Replication:*`

`s3:Replication:OperationFailedReplication`

`s3:Replication:OperationMissedThreshold`

`s3:Replication:OperationReplicatedAfterThreshold`

`s3:Replication:OperationNotTracked`

|`Replication` немесе `Replication Time Control` (`RTC`) метрикалары қосылған репликация конфигурациясының оқиғалары:

- `s3:Replication:OperationFailedReplication` — репликация орындалмады.
- `s3:Replication:OperationMissedThreshold` — `RTC` (`Replication Time Control`) қолданылып репликациялануы тиіс объект 15 минуттық тайм-аут ішінде көшірілмеді.
- `s3:Replication:OperationReplicatedAfterThreshold` — `RTC` қолданылып репликациялануы тиіс объект 15 минуттық тайм-аут аяқталғаннан кейін көшірілді.
- `s3:Replication:OperationNotTracked` — нақты уақыт режимінде (мысалы, бір өңір ішінде — `SRR` немесе өңірлер арасында — `CRR`) репликациялануы тиіс объект репликация метрикалары арқылы енді қадағаланбайды

|`s3:LifecycleExpiration:*`

`s3:LifecycleExpiration:Delete`

`s3:LifecycleExpiration:DeleteMarkerCreated`

|Бакеттен объектіні немесе объектілер тобын жою:

- `s3:LifecycleExpiration:*` — объектіні жою туралы хабарландырулардың әмбебап түрі.
- `s3:LifecycleExpiration:Delete` — объектіні жою немесе нұсқаланған объектіні түпкілікті жою.
- `s3:LifecycleExpiration:DeleteMarkerCreated` — нұсқаланған объект үшін жою маркерін жасау

|`s3:ObjectTagging:*`

`s3:ObjectTagging:Put`

`s3:ObjectTagging:Delete`

|Объект тегін қосу немесе жою:

- `s3:ObjectTagging:Put` — объектіге тег қосу немесе бар тегті өзгерту.
- `s3:ObjectTagging:Delete` — тегті жою

|`s3:ObjectAcl:Put`
|Объектіге жаңа ACL (Access Control List) қолданылды немесе бар ACL өзгертілді.

Егер сұрау объектінің ACL-ін өзгертуге әкелмесе, хабарландыру келмейді

|===
{/caption}

## {heading(Хабарландыруларды баптау)[id=add-notifications]}

Хабарландырулармен жұмыс істеу үшін 2 әдіс қолданылады:

- `GetBucketNotificationConfiguration` — бакеттің ағымдағы хабарландыру баптауларын алу.
- `PutBucketNotificationConfiguration` — хабарландыру баптауларын бакетке қолдану.

### {heading(Бакет хабарландыруларының баптауларын алу)[id=notifications-get]}

Баптауларды алу үшін `GetBucketNotificationConfiguration` әдісі қолданылады.

Егер бакетте хабарландырулар қосылмаған болса, операция бос `NotificationConfiguration` элементін қайтарады.

Әдепкі бойынша тек бакет иесінің хабарландыру баптауларын оқуға құқығы бар. Бакет иесі бұл құқықты басқа пайдаланушыларға бакет саясаты арқылы бере алады.

Сұрау мысалы:

```http
GET /?notification HTTP/1.1
Host: <ИМЯ_БАКЕТА>.s3.<АДРЕС>
x-amz-expected-bucket-owner: <ИДЕНТИФИКАТОР_ВЛАДЕЛЬЦА>
```

Жауап мысалы:

```http
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<NotificationConfiguration>
   <SimpleTopicConfiguration>
     <Id>1</Id>
     <Url>http://<АДРЕС_ПОЛУЧАТЕЛЯ></Url>
     <Event>string</Event>
     <Filter>
       <S3Key>
         <FilterRule>
           <Name>string</Name>
           <Value>string</Value>
         </FilterRule>
         <FilterRule>
           <Name>string</Name>
           <Value>string</Value>
         </FilterRule>
       </S3Key>
     </Filter>
   </SimpleTopicConfiguration>
 </NotificationConfiguration>
```

Мұнда:

- `NotificationConfiguration` — хабарландыру конфигурациясы параметрлеріне арналған түбірлік тег.
- `SimpleTopicConfiguration` — хабарландырулар генерацияланатын оқиғалар.

### {heading(Хабарландыруларды баптау)[id=notifications-put]}

Баптауларды қосу үшін `PutBucketNotificationConfiguration` әдісі қолданылады.

Осы API арқылы ағымдағы хабарландыру конфигурациясын ауыстыруға болады. Конфигурация — оқиға түрлері, сондай-ақ оқиғалар туралы хабарландырулар жіберілетін алушы параметрлері көрсетілетін XML-файл.

Әдепкі бойынша тек бакет иесінің хабарландыру баптауларын оқуға құқығы бар. Бакет иесі бұл құқықты басқа пайдаланушыларға бакет саясаты арқылы бере алады.

Әдепкі бойынша бакетте хабарландырулар бапталмаған: `NotificationConfiguration` бөлімі бос болады.

`NotificationConfiguration` бөлімінің мысалы:

```http
<NotificationConfiguration>

</NotificationConfiguration>
```

Хабарландыруларды белсендіру үшін толтырылған бөліммен сұрау орындаңыз.

Бұл әрекет ағымдағы хабарландыру баптауын сұрау денесінде көрсетілген баптауға ауыстырады.

Сұрау мысалы:

```http
PUT /?notification HTTP/1.1
Host: <ИМЯ_БАКЕТА>.s3.<АДРЕС>
x-amz-expected-bucket-owner: <ИДЕНТИФИКАТОР_ВЛАДЕЛЬЦА>
x-amz-skip-destination-validation: SkipDestinationValidation
<?xml version="1.0" encoding="UTF-8"?>
<NotificationConfiguration xmlns="http://s3.<АДРЕС>">
  <SimpleTopicConfiguration>
    <Id>1</Id>
    <Url>http://<АДРЕС_ПОЛУЧАТЕЛЯ></Url>
    <Event>string</Event>
    <Filter>
      <S3Key>
        <FilterRule>
          <Name>string</Name>
          <Value>string</Value>
        </FilterRule>
        <FilterRule>
          <Name>string</Name>
          <Value>string</Value>
        </FilterRule>
      </S3Key>
    </Filter>
  </SimpleTopicConfiguration>
</NotificationConfiguration>
```

Мұнда `SimpleTopicConfiguration` — хабарландыру конфигурациясы, SNS-тәрізді вебхук-мақсатты (destination) көрсетеді. `Url` өрісінде хабарландырулар жіберілетін алушының тікелей HTTP(S) мекенжайы көрсетіледі.

Сұрау сәтті орындалса, жауапта 200 коды болады.

Жауап мысалы:

```http
HTTP/1.1 200
```

## {heading(Объектілерді сүзгілеу)[id=notification-filter]}

`FilterRule` — хабарландырулар жіберілетін объектілерді сүзгілеу ережесі. `Name` элементінде ереже түрі көрсетіледі:

- `Prefix` — кілті көрсетілген мәннен басталатын объектілер үшін ғана хабарландырулар жіберіледі.
- `Suffix` — кілті көрсетілген мәнмен аяқталатын объектілер үшін ғана хабарландырулар жіберіледі.

`Value` элементінде объект кілтімен салыстыруға арналған жол беріледі.
Егер `Prefix` және `Suffix` бір уақытта көрсетілсе, хабарландыру тек кілті екі шартқа да сәйкес келетін объектілер үшін жіберіледі.

Мысал:

```http
<Filter>
  <S3Key>
    <FilterRule>
      <Name>Prefix</Name>
      <Value>images/</Value>
    </FilterRule>
    <FilterRule>
      <Name>Suffix</Name>
      <Value>.jpg</Value>
    </FilterRule>
  </S3Key>
</Filter>
```