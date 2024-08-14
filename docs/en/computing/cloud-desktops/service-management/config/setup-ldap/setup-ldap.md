The connection to the user directory is configured separately for each project. Only one connection can be configured for one project.

<warn>

Cloud Desktop cannot work without the AD/LDAP user directory service. If your network does not have a directory service, create one yourself.

</warn>

To set up a connection to the user directory:

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Service settings**.
1. On the **Directory settings** tab, set the parameters:

   - **Host**: specify the IP address or FQDN of the external account directory server.
   - **Port**: specify the port number for protocol access (`389` for LDAP).
   - **Base DN**: set the root directory to search for objects in AD or LDAP.
   - **User DN**: specify the full path to the account in the OpenLDAP database which will be used for synchronization with the account directory.
   - **Password**: set the password for the AD account specified in **User DN** through which the synchronization will take place.
   - **Selection field**: set a unique user attribute in the LDAP directory by which the user will be selected from the database (for example, `UID` or `sAMAccountName`).

1. CLick the **Save** button.

<info>

When working with the service, you can change the settings for connecting to the user directory.

All existing pools will switch to the new connection settings automatically.

</info>

## Checking the directory connection settings

To check the connection settings to the user directory, it is not necessary to save the changes in the settings.

<warn>

A virtual machine will be deployed for verification, its name begins with `vdi-checker`. The use of this VM [is charged](/en/computing/iaas/tariffication).

</warn>

To check if the service catalog settings are correct:

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Service settings**.
1. On the **Directory settings** tab, enable the **Directory settings check** option.
1. Click **Check connection**.
1. Wait for the operation to complete.

   To see the detailed result of the check, click **Details**.
