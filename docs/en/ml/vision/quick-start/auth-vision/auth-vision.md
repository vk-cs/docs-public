The VK Cloud platform uses an access token for authorization. It is passed in a parameter of each API-request.

There are two ways to get an access token:

* OAuth — generation of a pair of tokens (an access token and a refresh token).
* Service token — generation of a token that is not limited in time of use.

{note:warn}

To increase account security, use OAuth tokens. OAuth authorization uses a pair of tokens instead of one, and the access token is only valid for an hour.

{/note}

## {heading(Obtaining OAuth tokens)[id=obtain-oauth-token]}

1. [Go to](https://msk.cloud.vk.com/app/) your VK Cloud management console.
2. Select the [project](/en/tools-for-using-services/account/concepts/projects).
3. Go to **AI API** → **Vision API**. A page will open with the information needed to obtain the tokens:
   - **OAuth endpoint**: address for OAuth token retrieval requests.
   - **OAuth Client ID**: the account ID to be passed in the `client_id` parameter of the request.
   - **OAuth Secret key**: the key to be passed in the `client_secret` parameter of the request.
4. Generate tokens:

   ```console
   curl -X POST --location 'https://mcs.mail.ru/auth/oauth/v1/token' \
   --header 'Content-Type: application/json' \
   --data '{
   "client_id":"<CLIENT_OAUTH_IDENTIFIER>",
   "client_secret": "<OAUTH_SECRET_KEY>",
   "grant_type":"client_credentials"
   }'
   ```

There will be two tokens in the server response:

- `access_token`: an access token for use in API requests to the service. It is reusable, but is valid for one hour. When the lifetime of the token expires, it will be necessary to generate a new one. No more than 25 access tokens can be active in a project at the same time.
- `refresh_token`: refresh token to generate a new access token. No more than 25 refresh tokens can be active in the project at the same time. Each refresh token can generate any number of access tokens, but no more than 25 simultaneously active tokens.

{note:warn}

Save the `refresh_token` token. If it is lost, it cannot be recovered.

{/note}

### {heading(Updating an access token)[id=obtain-access-token]}

To generate a new access token using the update token, run the command:

```console
curl -X POST --location 'https://mcs.mail.ru/auth/oauth/v1/token' \
--header 'Content-Type: application/json' \
--data '{
"client_id":"<CLIENT_OAUTH_IDENTIFIER>",
"refresh_token":"<YOUR_REFRESH_TOKEN>",
"grant_type":"refresh_token"
}'
```

Here, `client_id` and `refresh_token` are obtained at the [OAuth token generation](../auth-vision#obtain-oauth-token) stage.

## {heading(Obtaining a service token)[id=obtain-service-token]}

1. [Go to](https://msk.cloud.vk.com/app/) your VK Cloud management console.
2. Select the [project](/en/tools-for-using-services/account/concepts/projects).
3. Go to **AI API** → **Vision API**.
4. Click **Add service token**.
5. In the window that opens, select the type of tasks for which the token will be used.
6. Click **Create**. The new token will appear in the list of service tokens.
