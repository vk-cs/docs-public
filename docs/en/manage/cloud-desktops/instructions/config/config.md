When deleting the last pool, all connection settings will also be deleted.

## Configuring the network for the service infrastructure

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
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

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
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

Операция доступна после настройки сети и [создания](../desktops-pool/add/) пула.

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Go to **Cloud desktops** → **Service settings**.
1. Click the **Sync with VPN**.

   The synchronization status and time will be displayed.
