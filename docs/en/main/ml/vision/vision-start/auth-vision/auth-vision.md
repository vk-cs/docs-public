To authorize the client on the VK Cloud platform, a token is used, which is passed in the request parameter:

```bash
curl -k -v "https://smarty.mail.ru/api/v1/objects/detect?oauth\_provider="mcs&oauth\_token=qh9sdcsX4iuKGFa1sNhhcyBQiJtWrX5TewjPkPf867ad53oFd" -F file\_0=@examples/car\_number.jpg - F meta='{"mode":\["object"\],"images":\[ {"name":"file\_0"}\]}'
```
Authorization parameters:

| Parameter | Description |
|---------------|-------------------------------- ----------------- |
| oauth_provider | mcs |
| oauth_token | qh9sdcsX4iuKGFa1sNhhcyBQiJtWrX5TewjPkPf867ad53oFd |

## oauth_provider

authorization server. In Vision, authorization is available through VK Cloud and OAUTH.MAIL.RU.

- **oauth_provider=mcs** — authorization available to all mcs clients that have Machine Learning -> Vision API enabled.
- **oauth_provider=mr** — authorization via oauth.mail.ru, available only for internal projects of the mail.ru company, you can learn more about it at [https://o2.mail.ru/docs/](https: //o2.mail.ru/docs/).

## oauth_token

Token for client authorization on the VK Cloud platform.

### Getting a token in the VK Cloud authorization system

As part of authorization through mcs, 2 types of token are supported:

- service_token;
- access_token.

## service_token

The token that is the easiest to generate, it has no restrictions on the lifetime and the number of tokens of this type.

The token is generated on the user's page in [personal account](https://mcs.mail.ru/app/services/machinelearning/vision/).

## access_token

To obtain this token, the [OAuth 2.0](https://ru.wikipedia.org/wiki/OAuth#OAuth_2.0) protocol is used.

To get the first **access_token**, you need to send a request to the authorization server (see below) with the mcs client ID (client_id) and secret key (client_secret) from [personal account](https://mcs.mail.ru/app/ services/machinelearning/vision/).

In response, 2 tokens will be received from the server:

- access token (access_token);
- a token for updating a “rotten” access token (refresh_token).

The first **access_token** is reusable and short-lived, it is used for authorization in an image recognition request. The second one, **refresh_token**, is used to refresh the access token. **refresh_token** has two properties that are inverse to **access** tokens: they are long-lived, but not reusable.

In total, 25 refresh_tokens are available to the client (/auth/oauth/v1/token with grant_type="client_credentials").

For every refresh_token, the client can get 25 access_tokens ( /auth/oauth/v1/token c" grant_type="refresh_token).

The usage scheme for tokens is as follows:

- The user logs in to the service by passing the identifier and secret key to the server. In response, it receives 2 tokens and a lifetime.
- Application saves tokens and uses **access token** for subsequent image recognition requests.
- When the access token lifetime comes to an end, requests for image recognition will stop passing:

```
  "status":401,"body":"authorization failed, provider: mcs, token: vMA3Pjyno6tvCdo8MeDQ8xYT(...), reason: CONDITION/UNAUTHORIZED, Access Token invalid"
```

- You will need to refresh the **access token** with a **refresh token**.

### Getting the first token

We need to send a request to the authorization server with the client ID and secret key:

```bash
curl -X POST --location 'https://mcs.mail.ru/auth/oauth/v1/token' \
   --header 'Content-Type: application/json' \
   --data '{
   "client_id":"<OAuth client ID>",
   "client_secret": "<OAuth secret key>",
   "grant_type":"client_credentials"
   }'
```

### Query parameters

| Parameter | Description |
|--------------|---------------------------------- ------------- |
| client_id | mcs1017666666.ml.vision.f7kk1rmajnhfy |
| client_secret | 5FYLyJoex37xw45TJShx6dGifnouhdsOIndbsyg78ejnbs |
| grant_type | client_credentials |

## client_id

The client ID on the mcs platform is taken from the [personal account] page (https://mcs.mail.ru/app/services/machinelearning/vision/).

## client_secret

The secret key is taken from the [personal account] page (https://mcs.mail.ru/app/services/machinelearning/vision/).

## grant_type

Type of token to generate:

- **"grant_type":"client_credentials"** — generation of access_token and refresh_token by client_secret (only for the first time).
- **"grant_type":"refresh_token"** — generation of access_token via refresh_token to update access token.

### Response to request

```json
{
  "refresh_token": "Q9fdfT49CZ19rfohBC4y8Du6PE89989898hghgh",
  "access_token": "vMA3Pjyno6tvCdo8MeDQ8xfgbibiubr9r",
  "expired_in": "3600",
  scope: {
    "objects": 1,
    video: 1
    "persons": 1
  }
}
```

| Parameter | Description |
|--------------|---------------------------------- -------------------------------------- |
| access_token | Access token for client authorization in image and video recognition requests |
| refresh_token | Token to generate access_token when the old one expires |
| expired_in | Lifetime of the generated access_token in seconds |

### Refresh token

To generate `access_token` via `refresh_token`, send a request to the authorization server:

```bash
curl -X POST --location 'https://mcs.mail.ru/auth/oauth/v1/token' \
--header 'Content-Type: application/json' \
--data '{
"client_id":"<OAuth client ID>",
"refresh_token":"<refresh token>",
"grant_type":"refresh_token"
}'
```

### Response to request

```json
{
  "refresh_token": "Q9fdfT49CZ19rfohBC4y8Du6PE89989898hghgh",
  "access_token": "vMA3Pjyno6tvCdo8MeDQ8xfgbibiubr9r",
  "expired_in": "3600",
  scope: {
    "objects": 1,
    video: 1
    "persons": 1
  }
}
```

| Parameter | Description |
|--------------|------------------------------------------------ |
| access_token |Access token for client authorization in image and video recognition requests |
| refresh_token |Token to generate an access_token when the old one expires|
| expired_in |The lifetime of the generated access_token in seconds |
