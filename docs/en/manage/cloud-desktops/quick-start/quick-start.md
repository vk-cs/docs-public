A quick start will help you get started with the service and get acquainted with its capabilities.

After completing all the steps of a quick start, you will:

1. Set up a connection to an existing OpenLDAP user directory.
1. Get acquainted with Cloud Desktop and its main features:

    1. Create a pool of desktops.
    1. Make sure that two desktops are successfully deployed in the pool.

## 1. Preparatory steps

1. [Create and configure](https://www.openldap.org/devel/admin/guide.html#Building%20and%20Installing%20OpenLDAP%20Software) the OpenLDAP user directory service.
1. Find out the details of the configured directory:

   - IP address or FQDN of the server.
   - Unique account name.
   - Account password.

1. Make sure that in [personal account](https://mcs.mail.ru/app/en) the Cloud Desktop service is connected: the **Cloud desktops** section is available in the menu on the left.

## 2. Set up an external infrastructure

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select [project](/en/base/account/concepts/projects) where the desktop will be placed.
1. Go to **Cloud desktops** → **Service settings**.
1. In the **Network settings** tab, specify:

    1. **IP address space**: the range of IP addresses for the subnets where the service resources will be deployed. Parameter requirements: format — CIDR, minimum network prefix — `/7`, maximum — `/22`.
    1. **Router**: router with VPN network.
    1. **DNS**: DNS subnet name for the service infrastructure.
    1. **Availability zone**: `Moscow (MS1)`.

1. Click the **Save** button.
1. In the **Directory settings** tab, specify:

    1. **Host**: the IP address or FQDN of the OpenLDAP server.
    1. **Port**: `389`.
    1. **Base DN**: root directory to search for objects in AD or LDAP.
    1. **User DN**: full path to the account in the OpenLDAP database, which will be used for synchronization with the account directory.
    1. **Password**: the password of the OpenLDAP account specified in **User DN**.
    1. **Selection field**: `UID`.

1. Click the **Save** button.

## 3. Create a pool of desktops

1. Go to **Cloud desktops** → **Desktop pools**.
1. Click the **Add** button.
1. In the “Configuration” step, specify:

    1. **Pool name**: for example, `vk-cloud-desktops-pool-quickstart`.
    1. **Pool type**: `Sessional`.
    1. **User group**: specify one group from the OpenLDAP directory.
    1. **Naming mask**: `vk_desktop-`.
    1. **Min number of desktops**: `1`.
    1. **Max number of desktops**: `2`.
    1. **Hot reserve**: `1`.
    1. **User inactivity timeout**: `5`.

1. Click the **Next step** button.
1. in the “Virtual machine settings” step, specify:

    1. **Instance type**: `STD1-1`.
    1. **Disk size**: `10`.
    1. **Disk Type**: `HDD`.
    1. **Image**: `Astra Linux SE 1.7.2 Орел GUI`.
    1. **Security group vk-cloud-desktops-pool-quickstart**: `default`.

1. Click the **Next step** button.
1. At the “Peripherals setup” step, leave the parameters unchanged.
1. Click the **Create a pool** button.

   The creation of a pool of desktops will begin. This process can take a long time.

## 4. Make sure that desktops are deployed in the pool

1. Go to **Cloud desktops** → **Desktop pools**.
1. In the list of pools, click on the pool name `vk-cloud-desktops-pool-quickstart`.
1. Go to the **Desktops** tab.

   The value `2` should be displayed in the **Deployed** block.

## Delete unused resources

A running service consumes computing resources. If you don't need it anymore, [delete](../instructions/desktops-pool/manage#deleting_a_desktop_pools) desktop pool.

## What's next?

- [Get to know the concepts of the](../concepts/) virtual desktop service.
- [Read the instructions](../instructions/manage-desktops/) for working with virtual desktops.
