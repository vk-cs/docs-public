This quick start will help you get started with the service and get acquainted with its capabilities.

After completing all the steps of the quick start, you will:

1. Set up a connection to an existing OpenLDAP user directory.
1. Get acquainted with Cloud Desktop and its main features:

    1. Create a pool of desktops.
    1. Verify that two desktops are successfully deployed in the pool.

## 1. Preparatory steps

1. Create and configure the OpenLDAP user directory service ([an example](https://www.openldap.org/devel/admin/guide.html#Building%20and%20Installing%20OpenLDAP%20Software)).
1. Find out the details of the configured directory:

   - IP address or FQDN of the OpenLDAP server
   - Unique account name
   - Account password

1. (Optional) [Set up](/en/networks/vnet/how-to-guides/vpn-tunnel#2_set_up_a_vpn_tunnel_on_the_cloud_side) a VPN on the router that will be used for the service.
1. Check that the Cloud Desktop service is connected to your [personal account](https://msk.cloud.vk.com/app/en): the **Cloud Desktop** section is available in the menu on the left.

## 2. Set up an external infrastructure

1. Go to your VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
1. Select the [project](/en/tools-for-using-services/account/concepts/projects) where the desktops will be placed.
1. Go to **Cloud Desktop** → **Service settings**.
1. On the **Network settings** tab, specify:

    - **IP address space**: a range of IP addresses for the subnets where the service resources will be deployed.
    - **Router**: a router with a VPN network.
    - **DNS**: the IP address of a DNS server.
    - **Availability zone**: `Moscow (MS1)`.

1. Click the **Save** button.
1. On the **Directory settings** tab, specify:

    - **Host**: the IP address or FQDN of the OpenLDAP server.
    - **Port**: `389`.
    - **Base DN**: the root directory to search for objects in AD or LDAP.
    - **User DN**: the full path to the account in the OpenLDAP database which will be used for synchronization with the accounts directory.
    - **Password**: the password of the OpenLDAP account specified in **User DN**.
    - **Selection field**: `UID`.

1. Click the **Save** button.

## 3. Create a pool of desktops

1. Go to **Cloud Desktop** → **Desktop pools**.
1. Click the **Add** button.
1. At the “Configuration” step, specify:

    - **Pool name**: for example, `vk-cloud-desktops-pool-quickstart`.
    - **Pool type**: `Sessional`.
    - **User group**: specify one group from the OpenLDAP directory.
    - **Naming mask**: `vk_desktop-`.
    - **Min number of desktops**: `1`.
    - **Max number of desktops**: `2`.
    - **Hot reserve**: `1`.
    - **User inactivity timeout**: `5`.

1. Click the **Next step** button.
1. At the “Virtual machine settings” step, specify:

    - **Instance type**: `STD1-1`.
    - **Disk size**: `10`.
    - **Disk Type**: `HDD`.
    - **Image**: `Astra Linux SE 1.7.2 Орел GUI`.
    - **Security group vk-cloud-desktops-pool-quickstart**: `default`.

1. Click the **Next step** button.
1. At the “Peripherals setup” step, leave the parameters unchanged.
1. Click the **Create a pool** button.

   The creation of the pool of desktops will begin. This process can take a long time.

## 4. Make sure that desktops are deployed in the pool

1. Go to **Cloud Desktop** → **Desktop pools**.
1. In the list of pools, click on the pool name `vk-cloud-desktops-pool-quickstart`.
1. Go to the **Desktops** tab.

   The value `2` should be displayed in the **Deployed** block.

## 5. Check desktop connectivity

1. Write down the external IP address for connecting to the pool:

    1. Go to **Cloud Desktop** → **Desktop pools**.
    1. In the list of pools, click **Connection IP address**.
    1. In the list that opens, copy the **External IP address** value.

    In the example, the IP address is `99.166.240.100`.

1. [Download and install](../service-management/assets/Termidesk_user_guide_v_1_0.pdf "download") the Cloud Desktop client on your local computer.
1. Connect to the pools:

   1. Open the installed client.
   1. Click the **Add Server** button.
   1. In the window that opens, enter the `99.166.240.100` address and click the **Ok** button.
   1. Specify the AD user login and password and click the **Ok** button. If the connection is successful, a list of pools will be displayed.

1. Connect to the `vk-cloud-desktops-pool-quickstart` pool.
1. In the XRDP connection window that opens, re-enter the AD user login and password.

   Upon successful connection to the desktop, the Astra Linux operating system interface will open.

## Delete unused resources

A running service consumes computing resources. If you don't need it anymore, [delete](../service-management/desktops-pool/manage#deleting_a_desktop_pools) the desktop pool.

## What's next?

- [Learn about the concepts](../concepts/) of the virtual desktop service.
- [Read the instructions](../service-management/manage-desktops/) for working with virtual desktops.
