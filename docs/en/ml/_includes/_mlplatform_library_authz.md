{includetag(intro_part)}

To use most of the methods provided by the Cloud ML Platform Python library, you need to authorize using an _access token_.

Access tokens (refresh tokens) have one of the following roles that define their scope:

- `User`. A token with this role allows you to use most of the methods available in the library.
- `Administrator`. A token with this role allows you to use all methods available in the library. For example, having an access token with this role, you can manage other tokens.

{/includetag}

{includetag(main_part)}

Depending on the access rights, a token can be obtained in different ways:

- through the VK Cloud management console (usually an access token with the `Administrator` role);
- through the Cloud ML Platform library.

## {heading(Creating an access token in the management console)[id=create_token_management]}

If a user has access to the VK Cloud management console, they can create an access token themselves and choose one of the two roles. Such a token has an unlimited validity period.

1. [Go](https://msk.cloud.vk.ru/app/) to the VK Cloud management console.
1. Select the project in which you want to create the token.
1. Go to the **ML Platform → Tokens** section.
1. Click **Create access token**.
1. In the window that opens, specify the token parameters:

   - **Name**: can be any value.
   - **Role**: the selected role (`User` or `Administrator`).

1. Click **Create**.
1. In the window that opens, copy the token value and save it on your device. After the window is closed, it will be impossible to recover the token value. If it is lost, create a new token.
1. Click **Done**.

{note:err}

Do not share your access token with anyone.

{/note}

## {heading(Creating an access token through the Cloud ML Platform library)[id=create_token_console]}

If a user does not have access to the VK Cloud management console, an access token can be created through the library using a registration token:

1. The owner of an access token with the `Administrator` role uses the library to [create a registration token (register token)](#create_registration_token) for the user. It is single-use and has a limited time to live (TTL). All access token parameters are set in the registration token: name, role, and time to live.

2. Using the registration token, the user [creates an access token (refresh token)](#create_access_token) through the library for authorization when calling the library methods. All access token parameters were set by the administrator in the registration token and cannot be changed.

### {heading(Creating a registration token)[id=create_registration_token]}

A registration token can only be created through the Cloud ML Platform library.

{note:err}

For simplicity, the access token value is specified in the Python script example, and the registration token value is printed using `print()`.

When working in a production environment, do not operate with tokens in plain text. Use environment variables, secret storages, or other tools for working with sensitive data.

{/note}

1. [Install the library](/en/ml/mlplatform/mlplatform-lib/lib-install), if this has not been done yet.
1. [Create an access token](#create_token_management) with the `Administrator` role, if this has not been done yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   from mlplatform_client.serializers.auth import MLPTokenType
    
   ADMIN_REFRESH_TOKEN = "<ADMIN_TOKEN>"
    
   mlp = MLPlatform(ADMIN_REFRESH_TOKEN)

   register_token = mlp.create_register_token(
         client_name="<ACCESS_TOKEN_NAME>",
         access_ttl="<REGISTRATION_TOKEN_TTL>",
         refresh_ttl="<ACCESS_TOKEN_TTL>",
         token_type=<ACCESS_TOKEN_ROLE>)

   print(register_token)
   ```

   Here:
   - `<ADMIN_TOKEN>`: the value of an access token with the `Administrator` role.
   - `client_name`: the name of the access token that will be created using this registration token.
   - `access_ttl`: the time to live of the registration token, for example, `2h45m30s`. An expired registration token cannot be used to create an access token.
   - `refresh_ttl`: the time to live of the access token, for example, `2h`. If this parameter is not specified, the access token will be valid indefinitely.

   - `token_type`: the role of the access token:

     - the value `MLPTokenType.USER` corresponds to the `User` role;
     - the value `MLPTokenType.ADMIN` corresponds to the `Administrator` role.

   After running this script, the value of the created registration token will be printed.

1. Provide this registration token to another user so that they can use it to create an access token with the specified parameters.

### Creating an access token using a registration token

{note:err}

For simplicity, the registration token value is specified in the Python script example, and the access token value is printed using `print()`.

When working in a production environment, do not operate with tokens in plain text. Use environment variables, secret storages, or other tools for working with sensitive data.

{/note}

1. [Install the library](/en/ml/mlplatform/mlplatform-lib/lib-install), if this has not been done yet.
1. Make sure you have a registration token. If you do not have one, ask the owner of an access token with the `Administrator` role to [create a registration token](#create_registration_token).
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
 
   REGISTER_TOKEN = "<REGISTRATION_TOKEN_VALUE>"

   mlp = MLPlatform()
   refresh_token = mlp.create_refresh_token(REGISTER_TOKEN)
 
   print(refresh_token)
   ```

   After running this script, the value of the created access token will be printed.

   The access token parameters (name, role, and time to live) are determined by the registration token.

1. Copy the token value and save it on your device.

{note:err}

Do not share your access token with anyone.

{/note}

## {heading(Authorization using a token)[id=authorisation_by_token]}

{note:err}

For simplicity, the access token value is specified in the Python script example. When working in a production environment, do not operate with tokens in plain text. Use environment variables, secret storages, or other tools for working with sensitive data.

{/note}

1. Create an access token [through the management console](#create_token_management) or [through the Cloud ML Platform library](#create_token_console).

   Depending on which methods you plan to use, you may need an access token with a specific role. The [library method reference](/en/ml/mlplatform/mlplatform-lib/lib-reference) specifies which role a token must have in order to call a particular method.

1. Create an instance of the MLPlatform class and pass the value of the obtained token to the constructor.

   **Example:**

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<ACCESS_TOKEN_VALUE>"
   mlp = MLPlatform(REFRESH_TOKEN)
   ```

Now you can call the methods you need using this object. The token specified when creating the object will be used for authorization when calling the method.

If authorization fails, an error message similar to this will be displayed:

- If the token's role is insufficient to call the method:

  ```text
  mlplatform_client.core.exceptions.ForbiddenException: <Response [403]>. Info: {"status":403,"warnorCode":"ForbiddenException","warnorParams":{"field":"KtoTam token does not contain the following scopes: ['ml-platform:Manage']"}}
  ```

- If the token has expired:

  ```text
  mlplatform_client.core.exceptions.ForbiddenException: <Response [403]>. Info: {"status":403,"warnorCode":"ForbiddenException","warnorParams":{"field":"Forbidden"}}
  ```

## {heading(Getting the list of access tokens)[id=get_token_list]}

You can only get a list of access tokens. A list of created registration tokens is not maintained.

{tabs}

{tab(Management console)}

1. [Go](https://msk.cloud.vk.ru/app/) to the VK Cloud management console.
1. Select the project where the tokens are located.
1. Go to the **ML Platform → Tokens** section.

{/tab}

{tab(Cloud ML Platform library)}

{note:err}

For simplicity, the access token value is specified in the Python script example.

When working in a production environment, do not operate with tokens in plain text. Use environment variables, secret storages, or other tools for working with sensitive data.

{/note}

1. [Install the library](/en/ml/mlplatform/mlplatform-lib/lib-install), if this has not been done yet.
1. [Authorize using an access token](#create_token_management) with the `Administrator` role, if this has not been done yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
 
   ADMIN_REFRESH_TOKEN = "<ADMIN_TOKEN>"
    
   mlp = MLPlatform(ADMIN_REFRESH_TOKEN)
   print(mlp.get_project_tokens_info())
   ```

{/tab}

{/tabs}

## {heading(Getting information about the current access token)[id=get_current_token_details]}

You can get information about the access token currently in use only through the Cloud ML Platform library.

{tabs}

{tab(Cloud ML Platform library)}

{note:err}

For simplicity, the access token value is specified in the Python script example.

When working in a production environment, do not operate with tokens in plain text. Use environment variables, secret storages, or other tools for working with sensitive data.

{/note}

1. [Install the library](/en/ml/mlplatform/mlplatform-lib/lib-install), if this has not been done yet.
1. [Authorize using an access token](#create_token_management) with the `User` or `Administrator` role, if this has not been done yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<ACCESS_TOKEN>"
   mlp = MLPlatform(REFRESH_TOKEN)

   token_info=mlp.who_am_i()
   print(token_info)
   ```

   Information about the currently used access token will be printed. Example output on success:

   ```txt
   Token my-user-token:
	        id: 8cdc3742-XXXX
	        type: USER
	        issuer_name: XXXX@example.ru
	        exp: None
   ```

{/tab}

{/tabs}

## {heading(Deleting an access token)[id=delete_token_management]}

{tabs}

{tab(Management console)}

1. [Go](https://msk.cloud.vk.ru/app/) to the VK Cloud management console.
1. Select the project where the required token is located.
1. Go to the **ML Platform → Tokens** section.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required token and select **Delete**.
1. Click **Confirm**.

{/tab}

{tab(Cloud ML Platform library)}

{note:err}

For simplicity, the access token value is specified in the Python script example.

When working in a production environment, do not operate with tokens in plain text. Use environment variables, secret storages, or other tools for working with sensitive data.

{/note}

1. [Install the library](/en/ml/mlplatform/mlplatform-lib/lib-install), if this has not been done yet.
1. [Authorize using an access token](#create_token_management) with the `Administrator` role, if this has not been done yet.
1. [Get the list of access tokens](#get_token_list) and determine the name of the token you want to delete.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform

   ADMIN_REFRESH_TOKEN = "<ADMIN_TOKEN>"
   REFRESH_TOKEN_NAME = "<TOKEN_TO_DELETE>"

   mlp = MLPlatform(ADMIN_REFRESH_TOKEN)
   mlp.delete_token(token_name=REFRESH_TOKEN_NAME)

   print("Token", REFRESH_TOKEN_NAME, "was deleted.")
   ```

   Here:
   
   - `<ADMIN_TOKEN>` — the value of an access token with the `Administrator` role.
   - `<TOKEN_TO_DELETE>` — the name of the access token you want to delete.

   After running this script, the selected access token will be deleted.

{/tab}

{/tabs}

{/includetag}
