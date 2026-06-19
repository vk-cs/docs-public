Сервис {var(s3)} позволяет управлять конфигурацией CORS бакета. Для загрузки конфигурации CORS необходимо сформировать XML-документ.

Перечень доступных методов для конфигураций CORS бакета:

- {linkto(#api-spec-s3-get-bucket-cors)[text=%text]} — Получить список конфигураций CORS для бакета.
- {linkto(#api-spec-s3-put-bucket-cors)[text=%text]} — Установить конфигурацию CORS.
- {linkto(#api-spec-s3-delete-bucket-cors)[text=%text]} — Удалить конфигурацию CORS.

## {heading(Общий вид XML конфигурации CORS)[id=api-spec-s3-cors-request-body]}

```xml
<CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>URL</AllowedOrigin>
        <AllowedMethod>HTTP_Method</AllowedMethod>
        <AllowedHeader>Header_Name</AllowedHeader>
        ...
    </CORSRule>
    ...
</CORSConfiguration>
```

## {heading(GetBucketCORS)[id=api-spec-s3-get-bucket-cors]}

Операция `GET` возвращает информацию по конфигурации CORS, установленной для бакета.

Чтобы воспользоваться данной операцией, необходимо обладать правами на запись `WRITE_ACP`. Владелец бакета имеет это разрешение по умолчанию и может предоставлять его другим пользователям.

Пример запроса:

```curl
GET /?cors HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T185319Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=host;x-amz-content-sha256;x-amz-date,Signature=f7d7879992a9f3a06ddacd59e53ac318e99b2ed6230692b30099739e34469a91
```

Пример ответа:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:53:20 GMT
x-amz-request-id: tx00000000000000279651f-005963cd20-1268c-ru-mska
Content-Type: application/xml
Content-Length: 430
Connection: close

<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <CORSRule>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>DELETE</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedOrigin>http://example.com</AllowedOrigin>
    <AllowedHeader>\*</AllowedHeader>
  </CORSRule>
  <CORSRule>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedOrigin>\*</AllowedOrigin>
  </CORSRule>
</CORSConfiguration>
```

## {heading(PutBucketCORS)[id=api-spec-s3-put-bucket-cors]}

Операция `PUT` устанавливает конфигурацию CORS для бакета. Если конфигурация уже существует, то она переписывается.

Чтобы воспользоваться данной операцией, необходимо обладать правами на запись `WRITE_ACP`.

Можно установить эту конфигурацию на бакете так, что он сможет обслуживать запросы Cross-origin. Например, можно предоставить доступ запросу из источника `http://www.example.com` к бакету `my.example.bucket.com`, используя функциональность браузера XMLHttpRequest.

Для разрешения совместного использования ресурсов между разными источниками (CORS) на бакете необходимо добавить подресурс CORS на бакет. Подресурс CORS является XML-документом, в котором настраиваются правила, определяющие источники и методы HTTP, которые можно использовать в вашем бакете. Максимальный размер документа - 64 КБ. Например, у конфигурации CORS на бакете могут быть установлены два нижеследующих правила:

- Первое правило CORSRule разрешает использовать Cross-origin-запросы `PUT`, `POST` и `DELETE` из источников `https://www.example.com`. Данное правило также разрешает использовать все заголовки в предполетном запросе `OPTIONS` с помощью заголовка `Access-Control-Request-Headers`. Следовательно, в качестве ответа на любой предполетный запрос `OPTIONS`, сервис возвращает любой запрошенный заголовок.
- Второе правило разрешает использовать Cross-origin-запросы `GET` со всех источников. Подстановочный знак `*` указывает на возможность использования любого источника.

Пример запроса:

```curl
PUT /?cors HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
Content-Length: 374
Content-Type: application/xml
x-amz-content-sha256: 745320970930725bd18820ec990f7334960f0a47358be189e77504cc094be77e
x-amz-date: 20200831T185043Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-md5;content-type;host;x-amz-content-sha256;x-amz-date,Signature=f52b2bfb6ec975c86cadd2e51a6ee9842c6151b737e46ce90a3cb3cc0d0dea97

<CORSConfiguration>
 <CORSRule>
   <AllowedOrigin>http://example.com</AllowedOrigin>


   <AllowedMethod>PUT</AllowedMethod>
   <AllowedMethod>POST</AllowedMethod>
   <AllowedMethod>DELETE</AllowedMethod>


   <AllowedHeader>\*</AllowedHeader>
 </CORSRule>
 <CORSRule>
   <AllowedOrigin>\*</AllowedOrigin>
   <AllowedMethod>GET</AllowedMethod>
 </CORSRule>
</CORSConfiguration>
```

Пример ответа:

```curl
HTTP/1.1 200 OK
Date: Mon, 31 Aug 2020 18:50:44 GMT
x-amz-request-id: tx0000000000000027946fc-005963cc84-1268c-ru-mska
Content-Type: application/xml
Content-Length: 0
Connection: close
```

## {heading(DeleteBucketCORS)[id=api-spec-s3-delete-bucket-cors]}

Операция `DELETE` удаляет информацию по конфигурации CORS, установленной для бакета.

Чтобы воспользоваться данной операцией, необходимо обладать правами на запись `WRITE_ACP`.

Пример запроса:

```curl
DELETE /?cors HTTP/1.1
Host: my-test-bucket1.hb.ru-msk.vkcloud-storage.ru
x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
x-amz-date: 20200831T182537Z
Authorization: AWS4-HMAC-SHA256 Credential=II5JDQBAN3JYM4DNEB6C/20200831/ru-msk/s3/aws4_request,SignedHeaders=content-md5;content-type;host;x-amz-content-sha256;x-amz-date,Signature=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

Пример ответа:

```curl
HTTP/1.1 204 No Content
Date: Mon, 31 Aug 2020 18:25:38 GMT
x-amz-request-id: tx0000000000000002fae1f-0059690ca2-6441-ru-mska
Connection: close
```
