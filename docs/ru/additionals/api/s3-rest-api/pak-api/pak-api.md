## Общая информация

Префиксные ключи (prefix access keys) позволяют создать пользователей, для которых доступ ограничен по определенному пути. Данные пользователи привязываются к бакетам относительно которых работает их префикс. При работе с префиксными ключами существуют следующие ограничения:

- пользователь может быть привязан только к 1 бакету (при создании);
- пользователь не будет иметь доступ к другим бакетам и содержанию своего бакета, для которого путь не будет начинаться с префикса данного пользователя;
- ключи доступа можно получить только при создании;
- у пользователя может быть только 1 пара ключей;
- для упрощения использования рекомендуется называть пользователей связанно с префиксом, по которому они имеют доступ. Например username = user/folder1/file1; prefix = folder1/file1.

## Создание префиксных ключей

**Поддерживаемые методы PAK**

- CreatePrefixKey;
- ListPrefixKeys;
- DeletePrefixKey.

**Описание**

Создание пользователя examplename с префиксными ключами для доступа по пути exampleprefix. У одного такого пользователя может быть только одна пара префиксных ключей

**Запрос**

```
PUT /?pak&username=examplename&prefix=exampleprefix HTTP/1.1
Host: bucketName.hb.vkcs.cloud
Date: Wed, 14 Feb 2018 11:21:57 GMT
Authorization: authorization string
Connection: close
```

**Параметры запроса**

- username — пользователь, которому будут принадлежать ключи;
- prefix — префикс пути, который будет доступен по данным ключам.

**Ответ**

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

**Описание XML-элементов**

- BucketName — имя бакета.
- Prefix — префикс пути, который будет доступен по данным ключам.
- UserName — пользователь, которому принадлежат ключи.
- SecretKey — секретный ключ, возвращается только при создании, получить ключ впоследствии невозможно.
- AccessKey — публичный ключ.

## Список префиксных пользователей

**Запросы**

```
GET /?pak&marker=prefix&max-keys=2&name-prefix=prefix HTTP/1.1
Authorization: authorization string
Connection: close
Date: Wed, 14 Feb 2018 12:28:10 GMT
Host: bucketName.hb.vkcs.cloud
```

**Параметры запроса**

- max-keys — максимальное количество элементов в листинге optional.
- name-prefix — префикс по именам пользователей optional.
- marker — имя или часть имени пользователя с которого начнется листинг optional.

**Ответ**

```
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

**Описание XML-элементов**

- BucketName — имя бакета.
- IsTruncated — true, если выведена только часть префиксных пользователей.
- Marker — имя или часть имени пользователя с которого начнется листинг.
- NamePrefix — префикс по именам пользователей.
- MaxKeys — максимальное количество элементов в листинге.
- Contents — блок, содержащий пользователя.
- UserName — имя пользователя.
- Prefix — префикс, по которому доступны данные для этого пользователя.

## Удаление префиксного ключа у пользователя

**Запрос**

```
DELETE /?pak&prefix=prefix/for1&username=prefixusers/prefix/for1 HTTP/1.1
Authorization: authorization string
Connection: close
Date: Wed, 14 Feb 2018 13:05:31 GMT
Host:  bucketName.hb.vkcs.cloud
```

**Параметры запроса**

- username — имя пользователя.
- prefix — путь, по которому доступны объекты для данного пользователя optional.

**Ответ**

```
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

**Описание XML-элементов**

- Prefix — префикс пути, который будет доступен по данным ключам.
- UserName — пользователь, которому принадлежат ключи.
