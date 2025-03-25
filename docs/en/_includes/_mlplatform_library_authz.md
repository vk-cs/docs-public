{includetag(intro_part)}

To use most of the methods that the Cloud ML Platform Python library provides, you must authenticate using an _access token_.

Access tokens (refresh tokens) have one of the following roles that define their scope:

- `User`. A token with this role allows you to use most of the methods available in the library.
- `Administrator`. A token with this role allows the use of all methods available in the library. For example, if you have an access token with this role, you can manage other tokens.

{/includetag}

{includetag(main_part)}

Depending on the access rights, the token can be obtained in different ways:

- via VK Cloud management console (usually an access token with the `Administrator` role)
- through the Cloud ML Platform library

## {heading(Creating an access token in the management console)[id=create_token_management]}

If a user has access to the VK Cloud management console, it is possible to create an access token and choose one of two roles. Such token has unlimited validity time.

1. [Go to](https://msk.cloud.vk.com/app) the VK Cloud management console.
1. Select the project in which you want to create a token.
1. Go to **ML Platform → Tokens**.
1. Click the **Create access token** button.
1. In the window that opens, specify the token parameters:

   - **Name**: can be any name.
   - **Role**: the selected role (`User` or `Administrator`).

1. Click the **Create** button.
1. In the window that opens, copy the token value and save it on your device. Once the window is closed, the token value cannot be restored. If it is lost, create a new token.
1. Click the **Done** button.

<err>

Do not share your access token with anyone.

</err>

## {heading(Creating an access token through the Cloud ML Platform library)[id=create_token_console]}

If a user does not have access to the VK Cloud management console, an access token can be created through the library using a registration token:

1. The owner of the access token with the `Administrator` role [creates a registration token (register-token)](#create_registration_token) for the user through the library. It is disposable and has a limited lifetime (TTL). The registration token specifies all the parameters of the access token: name, role, lifetime.

2. The user [creates an access token (refresh-token)](#create_access_token) through the library to authorize when calling library methods. All access token parameters have been set by the administrator in the registration token and cannot be changed.

### {heading(Creating a registration token)[id=create_registration_token]}

A registration token is created only through the Cloud ML Platform library.

<err>

For simplicity, the value of the access token is specified in the Python script example, and the value of the registration token is printed using `print()`.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data.

</err>

1. [Install the library](/en/ml/mlplatform/mlplatform-lib/lib-install), if you have not done it already.
1. [Create an access token](#create_token_management) with the `Administrator` role, if you have not done it already.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   from mlplatform_client.serializers.auth import MLPTokenType
    
   ADMIN_REFRESH_TOKEN = "<ACCESS_TOKEN_ADMIN>"
    
   mlp = MLPlatform(ADMIN_REFRESH_TOKEN)

   register_token = mlp.create_register_token(
       client_name="<ACCESS_TOKEN>",
       access_ttl="<REGISTRATION_TOKEN_LIFETIME>",
       refresh_ttl="<ACCESS_TOKEN_LIFETIME>",
       token_type=<ACCESS_TOKEN_ROLE>)

   print(register_token)
   ```

   Here:
   - `<ACCESS_TOKEN_ADMIN>`: a value of access token with the `Administrator` role.
   - `client_name`: the name of the access token to be created with this registration token.
   - `access_ttl`: the lifetime of the registration token, for example, `2h45m30s`. A registration token with an expired lifetime can not be used to create an access token.
   - `refresh_ttl`: the lifetime of the access token, for example, `2h`. If you do not specify this parameter, the access token will be valid indefinitely.

   - `token_type`: the role of the access token:

     - `MLPTokenType.USER` value corresponds to the `User` role.
     - `MLPTokenType.ADMIN` value corresponds to the `Administrator` role.

   After executing this script, the value of the created registration access token will be displayed.

1. Provide this registration token to another user to create an access token with the specified parameters.

### {heading(Creating an access token using a registration token)[id=create_access_token]}

<err>

For simplicity, the value of the registration token is specified in the example Python script, and the value of the access token is printed using `print()`.

When working in a production environment, do not operate on tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data.

</err>

1. [Install the library](/en/ml/mlplatform/mlplatform-lib/lib-install), if you have not done it already.
1. Make sure you have a registration token. If you do not have one, ask the owner of the access token with the `Administrator` role to [create a registration token](#create_token_management).
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
 
   REGISTER_TOKEN = "<REGISTRATION_TOKEN>"

   mlp = MLPlatform()
   refresh_token = mlp.create_refresh_token(REGISTER_TOKEN)
 
   print(refresh_token)
   ```

   After executing this script, the value of the created access token will be displayed.

   The access token parameters (name, role, and lifetime) are defined by the registration token.

1. Copy the token value and save it on your device.

<err>

Do not share your access token with anyone.

</err>

## {heading(Authorisation by token)[id=authorisation_by_token]}

<err>

For simplicity, the value of the access token is specified in the Python script example. When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data.

</err>

1. Create an access token [via management console](#create_token_management) or [via Cloud ML Platform library](#create_token_console).

   Depending on which methods are planned to be used, an access token with a specific role may be required. The [library method catalog](/en/ml/mlplatform/mlplatform-lib/lib-reference) specifies which role the token must have in order to invoke a particular method.

1. Create an object of the MLPlatform class and pass the value of the received token to the constructor.

   **Example:**

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<ACCESS_TOKEN>"
   mlp = MLPlatform(REFRESH_TOKEN)
   ```

You can now call the methods you need using this object. The token specified when creating the object will be used for authorization when calling a method.

If the authorization was unsuccessful, a similar error message will be displayed:

- If the token role is not sufficient to call the method:

  ```text
  mlplatform_client.core.exceptions.ForbiddenException: <Response [403]>. Info: {"status":403,"warnorCode":"ForbiddenException","warnorParams":{"field":"KtoTam token does not contain the following scopes: ['ml-platform:Manage']"}}
  ```

- If the lifetime of token has expired:

  ```text
  mlplatform_client.core.exceptions.ForbiddenException: <Response [403]>. Info: {"status":403,"warnorCode":"ForbiddenException","warnorParams":{"field":"Forbidden"}}
  ```

## {heading(Getting a list of access tokens)[id=get_token_list]}

Only a list of access tokens can be retrieved. The list of created registration tokens is not maintained.

<tabs>
<tablist>
<tab>Management console</tab>
<tab>Cloud ML Platform library</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app) the VK Cloud management console.
1. Select the project that holds the tokens.
1. Go to **ML Platform → Tokens**.

</tabpanel>
<tabpanel>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data.

</err>

1. [Install the library](/en/ml/mlplatform/mlplatform-lib/lib-install) if not already done.
1. [Authorise using an access token](#create_token_management) with the `Administrator` role, if you have not done it already.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
 
   ADMIN_REFRESH_TOKEN = "<ACCESS_TOKEN_ADMIN>"
    
   mlp = MLPlatform(ADMIN_REFRESH_TOKEN)
   print(mlp.get_project_tokens_info())
   ```

</tabpanel>
</tabs>

## {heading(Getting information about the current access token)[id=get_current_token_details]}

You can only get information about the access token that is currently in use through the Cloud ML Platform library.

<tabs>
<tablist>
<tab>Cloud ML Platform library</tab>
</tablist>
<tabpanel>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data.

</err>

1. [Install the library](/en/ml/mlplatform/mlplatform-lib/lib-install) if not already done.
1. [Authorise using an access token](#create_token_management) with the `User` or `Administrator` role, if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<ACCESS_TOKEN>"
   mlp = MLPlatform(REFRESH_TOKEN)

   token_info=mlp.who_am_i()
   print(token_info)
   ```

   Information about the currently used access token will be output. Example of output in case of success:

   ```txt
   Token my-user-token:
	        id: 8cdc3742-ХХХХ
	        type: USER
	        issuer_name: ХХХХ@example.ru
	        exp: None
   ```

</tabpanel>
</tabs>

## Deleting an access token

<tabs>
<tablist>
<tab>Management console</tab>
<tab>Cloud ML Platform library</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app) to the VK Cloud management console.
1. Select the project where the required token is located.
1. Go to **ML Platform → Tokens**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the desired token and select **Delete**.
1. Click **Confirm**.

</tabpanel>
<tabpanel>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data.

</err>

1. [Install the library](/en/ml/mlplatform/mlplatform-lib/lib-install) if not already done.
1. [Authorise using an access token](#authorisation_by_token) with the `Administrator` role, if not already done.
1. [Get a list of access tokens](#get_token_list) and determine the name of the token to be deleted.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform

   ADMIN_REFRESH_TOKEN = "<ACCESS_TOKEN_ADMIN>"
   REFRESH_TOKEN_NAME = "<ACCESS_TOKEN_TO_REMOVE>"

   mlp = MLPlatform(ADMIN_REFRESH_TOKEN)
   mlp.delete_token(token_name=REFRESH_TOKEN_NAME)

   print("Token", REFRESH_TOKEN_NAME, "was deleted.")
   ```
   Here:
  
   - `<ACCESS_TOKEN_ADMIN>` — the value of access token with the `Administrator` role.
   - `<ACCESS_TOKEN_TO_REMOVE>` — the name of the access token to be removed.

   After executing this script, the selected access token will be deleted.

</tabpanel>
</tabs>

{/includetag}
