Для авторизации клиента на платформе VK Cloud Vision используется токен, который передается в параметре запроса:

```
curl -k -v "https://smarty.mail.ru/api/v1/objects/detect?oauth\_provider="mcs&oauth\_token=qh9sdcsX4iuKGFa1sNhhcyBQiJtWrX5TewjPkPf867ad53oFd" -F file\_0=@examples/car\_number.jpg -F meta='{"mode":\["object"\],"images":\[ {"name":"file\_0"}\]}'
```

## Параметры авторизации:

<table><tbody><tr><td>oauth_provider</td><td>mcs</td></tr><tr><td>oauth_token</td><td>qh9sdcsX4iuKGFa1sNhhcyBQiJtWrX5TewjPkPf867ad53oFd</td></tr></tbody></table>

## oauth_provider

Сервер авторизации. В Vision доступна авторизация через VK Cloud и OAUTH.MAIL.RU.

- oauth_provider=mcs - авторизация доступная всем клиентам mcs, у которых подключено Машинное обучение -> Vision API
- oauth_provider=mr - авторизация через oauth.mail.ru, доступна только для внутренних проектов компании мейл.ру, подробнее о ней можно узнать на [https://o2.mail.ru/docs/](https://o2.mail.ru/docs/)

## oauth_token:

Токен для авторизации клиента на платформе VK Cloud Vision.

## Получение токена в системе авторизации VK Cloud

В рамках авторизации через mcs, поддерживаются 2 типа токена:

- service_token
- access_token

### service_token

Токен, которые проще всего сгенерировать, он не имеет ограничений на время жизни и количество токенов данного вида.

Токен генерируется на странице пользователя в личном кабинете: [https://mcs.mail.ru/app/services/machinelearning/vision/](https://mcs.mail.ru/app/services/machinelearning/vision/)

![](./assets/static.helpjuice.com)

### access_token

Для получения этого токена используется протокол [OAuth 2.0](https://ru.wikipedia.org/wiki/OAuth#OAuth_2.0).

Для получения первого access_token необходимо отправить запрос на сервер авторизации (см. ниже) с идентификатором клиента mcs (client_id) и секретным ключом (client_secret) из личного кабинета пользователя [https://mcs.mail.ru/app/services/machinelearning/vision/](https://mcs.mail.ru/app/services/machinelearning/vision/).

В ответе от сервера будет получено 2 токена:

- токен доступа (access_token)
- токен для обновления “протухшего” токена доступа (refresh_token)

Первый access_token - многоразовый и короткоживущий, он используется для авторизации в запросе на распознавание картинок. Второй, refresh_token, используется для обновления access токена. У refresh_token есть два свойства, обратные access токену: он долгоживущий, но не многоразовый.

Всего клиенту доступно 25 refresh_token'ов (/auth/oauth/v1/token с grant_type="client_credentials);

На каждый refresh_token клиент может получить 25 access_token'ов ( /auth/oauth/v1/token c" grant_type="refresh_token);

Схема использования у токенов следующая:

- Пользователь авторизуется на сервисе, передавая идентификатор и секретный ключ на сервер. В ответе получает 2 токена и время жизни.
- Приложение сохраняет токены и использует access token для последующих запросов на распознавание картинок.
- Когда время жизни access token подойдет к концу, перестанут проходить запросы на распознавание изображений:

  "status":401,"body":"authorization failed, provider: mcs, token: vMA3Pjyno6tvCdo8MeDQ8xYT(...), reason: CONDITION/UNAUTHORIZED, Access Token invalid"

- Необходимо будет обновить токен доступа access token с помощью refresh token

## Получения первого токена

Надо отправить запрос на сервер авторизации с идентификатором клиента и секретным ключом:

```
curl -X POST 'https://mcs.mail.ru/auth/oauth/v1/token'  -HContent-Type:application/json -d '{"client\_id":"mcs1017666666.ml.vision.f7kk1rmajnhfy", "client\_secret":"5FYLyJoex37xw45TJShx6dGifnouhdsOIndbsyg78ejnbs", "grant\_type":"client\_credentials"}'
```

## Параметры запроса

<table><tbody><tr><td>client_id</td><td>mcs1017666666.ml.vision.f7kk1rmajnhfy</td></tr><tr><td>client_secret</td><td>5FYLyJoex37xw45TJShx6dGifnouhdsOIndbsyg78ejnbs</td></tr><tr><td>grant_type</td><td>client_credentials</td></tr></tbody></table>

### client_id

Идентификатор клиента на платформе mcs, берется со страницы личного кабинета пользователя [https://mcs.mail.ru/app/services/machinelearning/vision/](https://mcs.mail.ru/app/services/machinelearning/vision/)

### client_secret

Секретный ключ берется со страницы личного кабинета пользователя [https://mcs.mail.ru/app/services/machinelearning/vision/](https://mcs.mail.ru/app/services/machinelearning/vision/)

### grant_type

Тип токена, который надо сгенерировать:

- "grant_type":"client_credentials" - генерация access_token и refresh_token по client_secret (только для первого раза)
- "grant_type":"refresh_token" - генерация access_token через refresh_token, для обновления access token-а

## Ответ на запрос

```
{"refresh\_token":"Q9fdfT49CZ19rfohBC4y8Du6PE89989898hghgh","access\_token":"vMA3Pjyno6tvCdo8MeDQ8xfgbibiubr9r","expired\_in":"3600","scope":{"objects":1,"video":1,"persons":1}}
```

<table><tbody><tr><td>access_token</td><td>токен доступа для авторизации клиента в запросах на распознавание изображений и видео</td></tr><tr><td>refresh_token</td><td>токен для генерации access_token, когда закончится время жизни старого</td></tr><tr><td>expired_in</td><td>время жизни сгенерированного access_token в секундах</td></tr></tbody></table>

## Обновление токена

Для генерации access_token через refresh_token надо отправить запрос на сервер авторизации:

```
curl -X POST 'https://mcs.mail.ru/auth/oauth/v1/token' -HContent-Type:application/json -d '{"client\_id":"mcs1017666666.ml.vision.f7kk1rmajnhfy","refresh\_token":"Q9fdfT49CZ19rfohBC4y8Du6PE89989898hghgh", "grant\_type":"refresh\_token"}
```

## Ответ на запрос

```
{"refresh\_token":"Q9fdfT49CZ19rfohBC4y8Du6PE89989898hghgh","access\_token":"vMA3Pjyno6tvCdo8MeDQ8xfgbibiubr9r","expired\_in":"3600","scope":{"objects":1,"video":1,"persons":1}}
```

<table><tbody><tr><td>access_token</td><td>токен доступа для авторизации клиента в запросах на распознавание изображений и видео</td></tr><tr><td>refresh_token</td><td>токен для генерации access_token, когда закончится время жизни старого</td></tr><tr><td>expired_in</td><td>время жизни сгенерированногоaccess_tokenв секундах</td></tr></tbody></table>
