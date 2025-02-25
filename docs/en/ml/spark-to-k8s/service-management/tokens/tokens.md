To interact with Cloud Spark clusters, the Cloud ML Platform Python library is used. When working with the library, most actions require authorization using a token.

The library supports two types of tokens:

- Access tokens (refresh tokens). They are used to interact with Spark clusters.
- Registration tokens (register tokens). They are used to create access tokens using the library (without using your management console).

## Getting a list of access tokens

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the tokens are located.
1. Go to **ML Platform → Tokens**.

A list of access tokens will be displayed.

</tabpanel>
</tabs>

<info>

There are no registration tokens in this list.

</info>

## Creating an access token

<tabs>
<tablist>
<tab>Management console</tab>
<tab>Cloud ML Platform library</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project in which you want to create a token.
1. Go to **ML Platform → Tokens**.
1. Click the **Create access token** button.
1. In the window that opens, specify the token parameters:

   - **Name**: can be anything.
   - **Role**: one of the roles of the token.

     - `User`. This role gives the right to perform operations that require authorization when working with the Cloud ML Platform library (for example, send a task to the Spark cluster).
     - `Administrator`. This role gives the same rights as the `User` role and also provides additional rights to work with tokens.

1. Click the **Create** button.
1. In the window that opens, copy the token value and save it on your device.

   <err>

   After closing the window, it will be impossible to restore the token value. If it is lost, create a new token.

   </err>

1. Click the **Ready** button.

</tabpanel>
<tabpanel>

<err>

For simplicity, the value of the registration token is contained directly in the Python script example, and the value of the access token is output using `print()`.

When working in a production environment, do not operate tokens in clear text. Use environment variables, secret stores, or other tools to handle sensitive data.

</err>

1. Prepare the environment for working with Python in any convenient way, if you have not done it already:

   <tabs>
   <tablist>
   <tab>Using VK Cloud</tab>
   <tab>By yourself</tab>
   </tablist>
   <tabpanel>

   [Create a JupyterHub instance](/en/ml/mlplatform/jupyterhub/service-management/create) on the VK Cloud platform. It already contains configured Python 3.x and pip, which you can work with from JupyterHub notebook.

   </tabpanel>
   <tabpanel>

   1. Install Python 3.x and pip.
   1. If necessary, set up a virtual environment for Python.

   For example, you can use [conda](https://conda.io/projects/conda/en/latest/index.html) or perform the installation and configuration manually.

   </tabpanel>
   </tabs>

1. Install the Cloud ML Platform library for Python if you have not done it already.

   <tabs>
   <tablist>
   <tab>JupyterHub</tab>
   <tab>pip</tab>
   </tablist>
   <tabpanel>

   1. [Connect to your JupyterHub instance](/en/ml/mlplatform/jupyterhub/service-management/connect).
   1. In the JupyterHub notebook, create and execute a cell with the following content:

      ```bash
      %pip install https://mlplatform.hb.bizmrg.com/mlplatform_client.tar.gz
      ```

   </tabpanel>
   <tabpanel>

   Run the command:

   ```bash
   pip install https://mlplatform.hb.bizmrg.com/mlplatform_client.tar.gz
   ```

   </tabpanel>
   </tabs>

   The current version of the library is available at the link provided.

1. Ask the owner of the access token with the role `Administrator` [to create a registration token for you](#creating_a_registration_token).
1. Create a new access token using the registration token by executing the Python script:

   ```python
   from mlplatform_client import MLPlatform

   REGISTER_TOKEN = "<REGISTRATION_TOKEN_VALUE>"

   mlp = MLPlatform()
   refresh_token = mlp.create_refresh_token(REGISTER_TOKEN)

   print(refresh_token)
   ```

   After executing this script, the value of the created access token will be output.

   The parameters of the access token (for example, its name, role, and lifetime) are determined by the registration token.

1. Copy the token value and save it on your device.

</tabpanel>
</tabs>

## Creating a registration token

<tabs>
<tablist>
<tab>Cloud ML Platform library</tab>
</tablist>
<tabpanel>

<err>

For simplicity, the value of the access token is contained directly in the Python script example, and the value of the registration token is output using `print()`.

When working in a production environment, do not operate tokens in clear text. Use environment variables, secret stores, or other tools to handle sensitive data.

</err>

1. Prepare the environment for working with Python in any convenient way, if you have not done it already:

   <tabs>
   <tablist>
   <tab>Using VK Cloud</tab>
   <tab>By yourself</tab>
   </tablist>
   <tabpanel>

   [Create a JupyterHub instance](/en/ml/mlplatform/jupyterhub/service-management/create) on the VK Cloud platform. It already contains configured Python 3.x and pip, which you can work with from JupyterHub notebook.

   </tabpanel>
   <tabpanel>

   1. Install Python 3.x and pip.
   1. If necessary, set up a virtual environment for Python.

   For example, you can use [conda](https://conda.io/projects/conda/en/latest/index.html) or perform the installation and configuration manually.

   </tabpanel>
   </tabs>

1. Install the Cloud ML Platform library for Python if you have not done it already.

   <tabs>
   <tablist>
   <tab>JupyterHub</tab>
   <tab>pip</tab>
   </tablist>
   <tabpanel>

   1. [Connect to your JupyterHub instance](/en/ml/mlplatform/jupyterhub/service-management/connect).
   1. In the JupyterHub notebook, create and execute a cell with the following content:

      ```bash
      %pip install https://mlplatform.hb.bizmrg.com/mlplatform_client.tar.gz
      ```

   </tabpanel>
   <tabpanel>

   Run the command:

   ```bash
   pip install https://mlplatform.hb.bizmrg.com/mlplatform_client.tar.gz
   ```

   </tabpanel>
   </tabs>

   The current version of the library is available at the link provided.

1. [Create an access token](#creating_an_access_token) with the `Administrator` role if you don't have one yet.
1. Create a registration token by executing a Python script:

   ```python
   from mlplatform_client import MLPlatform
   from mlplatform_client.serializers.auth import MLPTokenType

   ADMIN_REFRESH_TOKEN = "<ADMINISTRATOR_TOKEN_VALUE>"

   mlp = MLPlatform(ADMIN_REFRESH_TOKEN)

   register_token = mlp.create_register_token(
       client_name="<ACCESS_TOKEN_NAME>",
       access_ttl="<REGISTRATION_TOKEN_LIFETIME>",
       refresh_ttl="<ACCSESS_TOKEN_LIFETIME>",
       token_type=<the role of the access token>)

   print(register_token)
   ```

   Here:

   - `client_name`: the name of the access token that will be created using this registration token.
   - `access_ttl`: the lifetime of the registration token (in the format `2h45m30s`). The expired registration token cannot be used to create an access token.
   - `refresh_ttl`: the lifetime of the access token (in the `2h` format). If you do not specify this parameter, the access token will be valid indefinitely.
   - `token_type`: the role of the access token:

     - The value `MLPTokenType.USER` corresponds to the role `User`. This role gives the right to perform operations that require authorization when working with the Cloud ML Platform library (for example, to send a task to the Spark cluster).
     - The value of `MLPTokenType.ADMIN` corresponds to the role of `Administrator`. This role gives the same rights as the `User` role and also provides additional rights to work with tokens.

   After executing this script, the value of the created registration token will be output.

1. Provide this registration token to another user so that he or she can use this token to create an access token with the specified parameters.

</tabpanel>
</tabs>

<info>

A list of created registration tokens is not maintained. You can only [get a list of access tokens](#getting_a_list_of_access_tokens).

</info>

## Deleting an access token

<tabs>
<tablist>
<tab>Management console</tab>
<tab>Cloud ML Platform library</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the required token is located.
1. Go to **ML Platform → Tokens**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required token and select **Delete**.
1. Click the **Confirm** button.

</tabpanel>
<tabpanel>

<err>

For simplicity, the value of the access token is contained directly in the Python script example.

When working in a production environment, do not operate tokens in clear text. Use environment variables, secret stores, or other tools to handle sensitive data.

</err>

1. Prepare the environment for working with Python in any convenient way, if you have not done it already:

   <tabs>
   <tablist>
   <tab>Using VK Cloud</tab>
   <tab>By yourself</tab>
   </tablist>
   <tabpanel>

   [Create a JupyterHub instance](/en/ml/mlplatform/jupyterhub/service-management/create) on the VK Cloud platform. It already contains configured Python 3.x and pip, which you can work with from JupyterHub notebook.

   </tabpanel>
   <tabpanel>

   1. Install Python 3.x and pip.
   1. If necessary, set up a virtual environment for Python.

   For example, you can use [conda](https://conda.io/projects/conda/en/latest/index.html) or perform the installation and configuration manually.

   </tabpanel>
   </tabs>

1. Install the Cloud ML Platform library for Python if you have not done it already.

   <tabs>
   <tablist>
   <tab>JupyterHub</tab>
   <tab>pip</tab>
   </tablist>
   <tabpanel>

   1. [Connect to your JupyterHub instance](/en/ml/mlplatform/jupyterhub/service-management/connect).
   1. In the JupyterHub notebook, create and execute a cell with the following content:

      ```bash
      %pip install https://mlplatform.hb.bizmrg.com/mlplatform_client.tar.gz
      ```

   </tabpanel>
   <tabpanel>

   Run the command:

   ```bash
   pip install https://mlplatform.hb.bizmrg.com/mlplatform_client.tar.gz
   ```

   </tabpanel>
   </tabs>

   The current version of the library is available at the link provided.

1. [Create an access token](#creating_an_access_token) with the `Administrator` role if you don't have one yet.

1. [Get a list of access tokens](#getting_a_list_of_access_tokens) and determine the name of the token to delete.

1. Delete the access token by executing the Python script:

   ```python
   from mlplatform_client import MLPlatform

   ADMIN_REFRESH_TOKEN = "<ADMINISTRATOR_TOKEN_VALUE>"
   REFRESH_TOKEN_NAME = "<NAME_OF_THE_ACCESS_TOKEN_TO_DELETE>"

   mlp = MLPlatform(ADMIN_REFRESH_TOKEN)
   mlp.delete_token(token_name=REFRESH_TOKEN_NAME)

   print("Token", REFRESH_TOKEN_NAME, "was deleted.")
   ```

   After executing this script, a message about deleting the access token will be displayed.

</tabpanel>
</tabs>
