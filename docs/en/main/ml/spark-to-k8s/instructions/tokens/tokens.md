Access tokens (also known as refresh tokens) are used to work with Spark clusters. Registration tokens (also known as register tokens) are used to create access tokens using the ML Platform library. The following describes how to work with tokens of both types.

## Preparatory steps

If you plan to work with tokens using the ML Platform library, follow the steps below.

<details>
<summary>Preparing the Python environment and installing the ML Platform library</summary>

1. Prepare the environment for working with Python in any way convenient for you:

   <tabs>
   <tablist>
   <tab>Using VK Cloud</tab>
   <tab>By yourself</tab>
   </tablist>
   <tabpanel>

   [Create a JupyterHub instance](/en/ml/mlplatform/jupyterhub/start/create) on the VK Cloud platform. It already contains configured Python 3.x and pip, which you can work with from JupyterHub notebook.

   </tabpanel>
   <tabpanel>

   1. Install Python 3.x and pip.
   1. If necessary, set up a virtual environment for Python.

   For example, you can use [conda](https://conda.io/projects/conda/en/latest/index.html) or perform the installation and configuration manually.

   </tabpanel>
   </tabs>

1. Install the ML Platform library for Python:

   1. Download [the library file](https://mlplatform.hb.ru-msk.vkcs.cloud/mlplatform_client.tar.gz).

      The most up-to-date version of the library is always available at the link provided.

   1. Install packages from the downloaded file:

      <tabs>
      <tablist>
      <tab>JupyterHub notebook</tab>
      <tab>pip</tab>
      </tablist>
      <tabpanel>

      ```bash
      %pip install mlplatform_client.tar.gz
      ```

      </tabpanel>
      <tabpanel>

      ```bash
      pip install mlplatform_client.tar.gz
      ```

      </tabpanel>
      </tabs>

</details>

## Getting a list of access tokens

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project where the tokens are located.
1. Go to **ML Platform → Tokens**.

A list of access tokens will be displayed.

</tabpanel>
</tabs>

## Creating an access token

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>ML Platform Library</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project in which you want to create a token.
1. Go to **ML Platform → Tokens**.
1. Click the **Create access token**.
1. In the window that opens, specify the token parameters:

   - **Name**: it can be anything.
   - **Role**: one of the roles of the token.

     - `User`. This role gives the right to perform operations that require authorization when working with the ML Platform library (for example, to send a task to the Spark cluster).
     - `Administrator`. This role gives the same rights as the `User` role, and also gives additional rights to work with tokens.

1. Click the **Create** button.
1. In the window that opens, copy the token value and save it on your device.

   <err>

   After closing the window, it will be impossible to restore the token value. If it is lost, create a new token.

   </err>

1. Click the **Ready** button.

</tabpanel>
<tabpanel>

<warn>

To simplify the presentation, the value of the registration token is contained directly in the Python script example, and the value of the access token is output using `print()`.

The values of these tokens are sensitive information. Take the necessary precautions when working with them to avoid leaks.

</warn>

1. Ask the owner of the access token with the `Administrator` role [create a registration token for you](#creating_a_registration_token).

1. Create a new access token using the registration token by executing a Python script:

   ```python
   from mlplatform_client import MLPlatform
 
   REGISTER_TOKEN = "<the value of the registration token>"

   mlp = MLPlatform()
   refresh_token = mlp.create_refresh_token(REGISTER_TOKEN)
 
   print(refresh_token)
   ```

   The parameters of the access token (for example, its name, role, and lifetime) are determined by the registration token.

   After executing this script, the value of the created access token will be output.

1. Copy the token value and save it on your device.

<info>

The access token created in this way is displayed in the personal account.

</info>

</tabpanel>
</tabs>

## Creating a registration token

<tabs>
<tablist>
<tab>ML Platform library</tab>
</tablist>
<tabpanel>

<warn>

To simplify the presentation, the value of the access token is contained directly in the Python script example, and the value of the registration token is output using `print()`.

The values of these tokens are sensitive information. Take the necessary precautions when working with them to avoid leaks.

</warn>

1. [Create an access token](#creating_an_access_token) with the `Administrator` role, if you don't have one yet.

1. Create a registration token by executing a Python script:

   ```python
   from mlplatform_client import MLPlatform
   from mlplatform_client.serializers.auth import MLPTokenType
    
   ADMIN_REFRESH_TOKEN = "<the value of the access token with the Administrator role>"
    
   mlp = MLPlatform(ADMIN_REFRESH_TOKEN)

   register_token = mlp.create_register_token(
       client_name="<access token name>",
       access_ttl="<lifetime of the registration token>",
       refresh_ttl="<access token lifetime>",
       token_type=<the role of the access token>)

   print(register_token)
   ```

   Here:

   - `client_name`: the name of the access token that will be created using this registration token.
   - `access_ttl`: the lifetime of the registration token (in the format `2h45m30s`). The expired registration token cannot be used to create an access token.
   - `refresh_ttl`: the lifetime of the access token (in the `2h` format). If you do not specify this parameter, the access token will be valid indefinitely.
   - `token_type`: the role of the access token:

     - The value `MLPTokenType.USER` corresponds to the role `User`. This role gives the right to perform operations that require authorization when working with the ML Platform library (for example, to send a task to the Spark cluster).
     - The value of `MLPTokenType.ADMIN` corresponds to the role of `Administrator`. This role gives the same rights as the `User` role, and also gives additional rights to work with tokens.

   After executing this script, the value of the created registration access token will be output.

1. Provide this registration token to another user so that he can use this token to create an access token with the specified parameters.

</tabpanel>
</tabs>

## Deleting an access token

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>ML Platform library</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project where the desired token is located.
1. Go to **ML Platform → Tokens**.
1. Expand the menu of the desired token and select **Delete**.
1. Click the **Confirm** button.

</tabpanel>
<tabpanel>

<warn>

To simplify the presentation, the values of access tokens are contained directly in the Python script example.

The values of these tokens are sensitive information. Take the necessary precautions when working with them to avoid leaks.

</warn>

1. [Create an access token](#creating_an_access_token) with the `Administrator` role, if you don't have one yet.

1. [Get a list of access tokens](#getting_a_list_of_access_tokens) and determine the name of the token to delete.

1. Delete the access token by executing the Python script:

   ```python
   from mlplatform_client import MLPlatform

   ADMIN_REFRESH_TOKEN = "<the value of the access token with the Administrator role>"
   REFRESH_TOKEN_NAME = "<name of the access token to delete>"

   mlp = MLPlatform(ADMIN_REFRESH_TOKEN)
   mlp.delete_token(token_name=REFRESH_TOKEN_NAME)

   print("Token", REFRESH_TOKEN_NAME, "was deleted.")
   ```

   After executing this script, a message about deleting the access token will be displayed.

</tabpanel>
</tabs>
