## {heading(Creating service account)[id=create]}

Up to 300 service accounts can be created in a project.

{tabs}
{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Make sure your [project role](/en/tools-for-using-services/account/concepts/rolesandpermissions#general_project_management_roles) has the [permissions to manage service accounts](/en/tools-for-using-services/account/concepts/service-accounts). Creating service accounts is available for the following roles:

    - Project owner
    - Superadministrator
    - User access administrator

1. Go to **Manage access**, then go to the **Service users** tab.
1. Click the **Add** button.
1. In the **Name** box, specify a name for the service account. Requirements for the name:

    - The length must be from 3 to 32 characters.
    - Only uppercase and lowercase Latin letters, numbers, and symbols `-` and `_` are allowed.

1. Click the **Role in the project** button, select one or more roles from the list to assign the service account and click the **Add** button.
1. (Optional) Add a description (up to 256 characters).
1. Make sure that the parameters of the service account are specified correctly and click the **Create** button.

   {note:warn}
   Once created, the parameters of a service account cannot be changed.
   {/note}

1. In the window that opens, copy the login and password of the service account.

   {note:warn}
   The login and password of a service account cannot be restored if they are lost.
   {/note}

   You can see the new service account in the list on the **Service users** tab.

{/tab}
{/tabs}

## {heading(Viewing list of project service accounts)[id=view_list]}

{tabs}
{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Make sure your [project role](/en/tools-for-using-services/account/concepts/rolesandpermissions#general_project_management_roles) has the [permissions to manage service accounts](/en/tools-for-using-services/account/concepts/service-accounts).
1. Go to **Manage access**, then go to the **Service users** tab.

   The list of all service accounts in the project is displayed, sorted by name.

1. (Optional) Use the search bar to find the required service account.

{/tab}
{/tabs}

## {heading(Viewing service account card)[id=view_card]}

{note:warn}
Information in a service account's card is not editable.
{/note}

{tabs}
{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Make sure your [project role](/en/tools-for-using-services/account/concepts/rolesandpermissions#general_project_management_roles) has the [permissions to manage service accounts](/en/tools-for-using-services/account/concepts/service-accounts).
1. Go to **Manage access**, then go to the **Service users** tab.

   The list of all service accounts in the project is displayed.

1. Open a service account details in one of the ways:

   - Click the name of the required service account.
   - Click ![ ](/ru/assets/more-icon.svg "inline") for the required service account and select **View**.

   The service account details include:

   - service account name
   - list of roles in the project
   - service account creation date
   - information about the creator of the service account: user email or service account name
   - description

{/tab}
{/tabs}

## {heading(Downloading OpenStack RC file for working with API)[id=download_rc_file]}

{tabs}
{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Make sure your [project role](/en/tools-for-using-services/account/concepts/rolesandpermissions#general_project_management_roles) has the [permissions to manage service accounts](/en/tools-for-using-services/account/concepts/service-accounts).
1. Go to **Manage access**, then go to the **Service users** tab.

   The list of all service accounts in the project is displayed.

1. Click ![ ](/ru/assets/more-icon.svg "inline") for the required service account and select **Download OpenStack RC file**.

   An OpenStack RC file with the name in the format of `<SERVICE_ACCOUNT_NAME>-openrc.sh` will be downloaded to your device. This is a script that sets the values ​​for the environment variables required to work with the API.

{/tab}
{/tabs}

## {heading(Authorizing in OpenStack CLI with service account)[id=authorize]}

{tabs}
{tab(OpenStack CLI)}

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client).
1. Go to the `<PATH_TO_FILE>` directory with the previously [downloaded OpenStack RC file](#download_rc_file):

   ```console
   cd <PATH_TO_FILE>
   ```

1. Set the values ​​for the environment variables required to work with the API. To do this, run the command:

   ```console
   source <FILE_NAME>
   ```

   Here, `<FILE_NAME>` is the name of the OpenStack RC file.

1. Enter the password obtained when [creating the service account](#create).

   {note:warn}
   No notification about the password verification result is displayed.
   {/note}

1. Check if the authorization was successful. To do this, perform any action you need in the OpenStack CLI, for example, run a command to create a network or disk.

   If the authorization was successful, you can see the result of the command, for example, a message about creating the network or disk.

   If you entered an incorrect password, the `401` authorization error is returned. If the requested action is not allowed for the role assigned to the service account at its creation, the `403` action validation error is returned.

{/tab}
{/tabs}

## {heading(Deleting service account)[id=delete]}

This is a group operation: if necessary, you can delete several service accounts at once by selecting them using the checkboxes.

{tabs}
{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Make sure your [project role](/en/tools-for-using-services/account/concepts/rolesandpermissions#general_project_management_roles) has the [permissions to manage service accounts](/en/tools-for-using-services/account/concepts/service-accounts). Deleteng service users is available for the following roles:

- Project owner
- Superadministrator
- User access administrator

1. Go to **Manage access**, then go to the **Service users** tab.

   The list of all service accounts in the project is displayed.

1. Delete a service account in one of the ways:

   - Click ![](/ru/assets/more-icon.svg "inline") for the required service account and select **Delete**.
   - Select the required service account using its checkbox and click the **Delete** button.
   - Click the name of the required service account, click ![](/ru/assets/more-icon.svg "inline") in the service account details and select **Delete**.

1. Confirm the deletion.

   {note:warn}
   The service account retains the access rights assigned at its creation for one hour after deletion.
   {/note}

{/tab}
{/tabs}
