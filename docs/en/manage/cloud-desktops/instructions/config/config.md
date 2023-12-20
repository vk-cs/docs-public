## Configuring the network for the service infrastructure

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
1. Go to **Cloud desktops** → **Service settings**.
1. In the **Network settings** tab, set the parameters:

   - **IP address space**: specify the range of IP addresses for the subnets where the service resources will be deployed. Parameter requirements: format — CIDR, minimum network prefix — `/7`, maximum — `/22`.
   - **Router**: select a router from the list.
   - **DNS**: specify the DNS subnet name for the service infrastructure. To add multiple DNS names, click **Add DNS** and specify a new DNS name.
   - **Availability zone**: select the VM availability zone from the list of zones.

    <warn>

    It is not possible to change the availability zone after creating a pool.

    </warn>

1. CLick the **Save** button.

## Configuring the connection to the user directory

The connection to the user directory is configured separately for each project. Only one connection can be configured for one project.

<warn>

Cloud Desktop cannot work without the AD/LDAP user directory service. If your network does not have a directory service, create one yourself.

</warn>

To set up a connection to the user directory:

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
1. Go to **Cloud desktops** → **Service settings**.
1. In the **Directory settings** tab, set the parameters:

   - **Host**: specify the IP address or FQDN of the external account directory server.
   - **Port**: specify the port number for protocol access (`389` for LDAP).
   - **Base DN**: set the root directory to search for objects in AD or LDAP.
   - **User DN**: specify the full path to the account in the OpenLDAP database, which will be used for synchronization with the account directory.
   - **Password**: set the password for the AD account specified in **User DN** through which the synchronization will take place.
   - **Selection field**: set a unique user attribute in the LDAP directory, by which the user will be selected from the database (for example, `UID` or `sAMAccountName`).

1. CLick the **Save** button.

<info>

When working with the service, you can change the settings for connecting to the user directory.

All existing pools will switch to the new connection settings automatically.

</info>

## Syncing with VPN

The operation is available after the network is [configured](#configuring_the_network_for_the_service_infrastructure) and the pool is [created](../desktops-pool/add/).

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
1. Go to **Cloud desktops** → **Service settings**.
1. Click the **Sync with VPN**.

   The synchronization status and time will be displayed.

## Checking network settings

To check the network settings, it is not necessary to save the changes in the settings.

<warn>

A virtual machine will be deployed for verification, its name begins with `vdi-checker`. The use of this VM [is charged](/en/base/iaas/tariffication).

</warn>

To check the correctness of the network settings for the service:

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
1. Go to **Cloud desktops** → **Service settings**.
1. On the **Network settings** tab activate the **Network settings check** option.
1. Click the **Check connection**.
1. Wait for the operation to complete.

   To see the detailed result of the check, click **Details**.

## Checking the directory connection settings

To check the connection settings to the user directory, it is not necessary to save the changes in the settings.

<warn>

A virtual machine will be deployed for verification, its name begins with `vdi-checker`. The use of this VM [is charged](/en/base/iaas/tariffication).

</warn>

To check the correctness of the catalog settings for the service:

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
1. Go to **Cloud desktops** → **Service settings**.
1. On the **Directory settings** tab activate the **Directory settings check** option.
1. Click the **Check connection**.
1. Wait for the operation to complete.

   To see the detailed result of the check, click **Details**.
