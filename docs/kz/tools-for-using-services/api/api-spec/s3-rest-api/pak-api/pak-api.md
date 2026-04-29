{include(/kz/_includes/_translated_by_ai.md)}

## Жалпы ақпарат

Префикстік кілттер (prefix access keys) белгілі бір жол бойынша қолжетімділігі шектелген пайдаланушыларды жасауға мүмкіндік береді. Бұл пайдаланушылар өздерінің префиксі жұмыс істейтін бакеттерге байланыстырылған. Префикстік кілттермен жұмыс істеген кезде келесі шектеулер бар:

- пайдаланушы тек 1 бакетке ғана байланыстырылуы мүмкін (жасау кезінде);
- пайдаланушы басқа бакеттерге және өз бакетінің осы пайдаланушының префиксінен басталмайтын мазмұнына қол жеткізе алмайды;
- қол жеткізу кілттерін тек жасау кезінде алуға болады;
- пайдаланушыда тек 1 жұп кілт қана болуы мүмкін;
- пайдалануды жеңілдету үшін пайдаланушыларды олар қол жеткізе алатын префикске сәйкес атау ұсынылады. Мысалы, username = user/folder1/file1; prefix = folder1/file1.

## Префикстік кілттерді жасау

**Қолдау көрсетілетін PAK әдістері**

- CreatePrefixKey;
- ListPrefixKeys;
- DeletePrefixKey.

**Сипаттама**

exampleprefix жолы бойынша қол жеткізуге арналған префикстік кілттері бар examplename пайдаланушысын жасау. Осындай бір пайдаланушыда тек бір жұп префикстік кілт қана болуы мүмкін

**Сұрау**

```xml
PUT /?pak&username=examplename&prefix=exampleprefix HTTP/1.1
Host: bucketName.hb.ru-msk.vkcloud-storage.ru
Date: Wed, 14 Feb 2018 11:21:57 GMT
Authorization: authorization string
Connection: close
```

**Сұрау параметрлері**

- username — кілттер тиесілі болатын пайдаланушы;
- prefix — осы кілттер бойынша қолжетімді болатын жол префиксі.

**Жауап**

```xml
HTTP/1.1 200 OK
Server: nginx/1.12.1
Date: Wed, 14 Feb 2018 13:38:54 GMT
Content-Type: application/xml
Content-Length: 351
Connection: close
X-req-id: 2NrqrYuki

<?xml version="1.0" encoding="utf-8"?>
<CreatePrefixKeyResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <BucketName>bucketName</BucketName>
    <Prefix>exampleprefix</Prefix>
    <UserName>examplename</UserName>
    <SecretKey>LVQaicnPLR7eVg5soGgWCJjGe3w3S8toaRxd329xv4w</SecretKey>
    <AccessKey>6hGka6NefpEoNse4xJOEx3</AccessKey>
</CreatePrefixKeyResult>
```

**XML элементтерінің сипаттамасы**

- BucketName — бакет атауы.
- Prefix — осы кілттер бойынша қолжетімді болатын жол префиксі.
- UserName — кілттер тиесілі пайдаланушы.
- SecretKey — құпия кілт, тек жасау кезінде қайтарылады, кейіннен кілтті алу мүмкін емес.
- AccessKey — жария кілт.

## Префикстік пайдаланушылар тізімі

**Сұраулар**

```xml
GET /?pak&marker=prefix&max-keys=2&name-prefix=prefix HTTP/1.1
Authorization: authorization string
Connection: close
Date: Wed, 14 Feb 2018 12:28:10 GMT
Host: bucketName.hb.ru-msk.vkcloud-storage.ru
```

**Сұрау параметрлері**

- max-keys — листингтегі элементтердің ең көп саны optional.
- name-prefix — пайдаланушы атаулары бойынша префикс optional.
- marker — осы жерден листинг басталатын пайдаланушы атауы немесе оның бір бөлігі optional.

**Жауап**

```xml
HTTP/1.1 200 OK

Server: nginx/1.12.1
Date: Wed, 14 Feb 2018 13:39:27 GMT
Content-Type: application/xml
Content-Length: 457
Connection: close
X-req-id: 35RBZWzAX

<?xml version="1.0" encoding="utf-8"?>
<ListPrefixKeysResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <BucketName>bucketName</BucketName>
    <IsTruncated>false</IsTruncated>
    <NamePrefix>prefix</NamePrefix>
    <MaxKeys>2</MaxKeys>
    <Marker>prefix</Marker>
    <Contents>
          <UserName>prefixusers/prefix/for1</UserName>
          <Prefix>prefix/for1</Prefix>
    </Contents>
    <Contents>
          <UserName>prefixusers/prefix/for2</UserName>
          <Prefix>prefix/for2</Prefix>
     </Contents>
</ListPrefixKeysResult>
```

**XML элементтерінің сипаттамасы**

- BucketName — бакет атауы.
- IsTruncated — егер префикстік пайдаланушылардың тек бір бөлігі ғана шығарылса, true.
- Marker — осы жерден листинг басталатын пайдаланушы атауы немесе оның бір бөлігі.
- NamePrefix — пайдаланушы атаулары бойынша префикс.
- MaxKeys — листингтегі элементтердің ең көп саны.
- Contents — пайдаланушыны қамтитын блок.
- UserName — пайдаланушы атауы.
- Prefix — осы пайдаланушы үшін деректер қолжетімді болатын префикс.

## Пайдаланушының префикстік кілтін жою

**Сұрау**

```xml
DELETE /?pak&prefix=prefix/for1&username=prefixusers/prefix/for1 HTTP/1.1
Authorization: authorization string
Connection: close
Date: Wed, 14 Feb 2018 13:05:31 GMT
Host:  bucketName.hb.ru-msk.vkcloud-storage.ru
```

**Сұрау параметрлері**

- username — пайдаланушы атауы.
- prefix — осы пайдаланушы үшін объектілер қолжетімді болатын жол optional.

**Жауап**

```xml
HTTP/1.1 200 OK

Server: nginx/1.12.1
Date: Wed, 14 Feb 2018 13:39:27 GMT
Content-Type: application/xml
Content-Length: 207
Connection: close
X-req-id: 33yVonNmQ

<?xml version="1.0" encoding="utf-8"?>
<DeletePrefixKeyResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
     <UserName>prefixusers/prefix/for1</UserName>
     <Prefix>prefix/for1</Prefix>
</DeletePrefixKeyResult>
```

**XML элементтерінің сипаттамасы**

- Prefix — осы кілттер бойынша қолжетімді болатын жол префиксі.
- UserName — кілттер тиесілі пайдаланушы.