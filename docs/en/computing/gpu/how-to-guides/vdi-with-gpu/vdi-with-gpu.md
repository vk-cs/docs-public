The VK Cloud platform allows you to deploy pools of [virtual desktops](/en/computing/cloud-desktops/concepts/about) based on NVIDIA® Tesla® GPUs.

The capabilities of such desktops:

- machine learning of neural networks with high performance and solving other problems related to the use of AI
- high-speed server-side graphics visualization
- solving any problems that require high computing power

By using graphics processors, the time to solve such problems can be reduced from days to hours. For more details, see [Cloud GPU service review](../../concepts/about).

Deployment of virtual desktops with NVIDIA® Tesla® processors is described below using an example.

## Preparatory steps

1. [Connect](/en/computing/gpu/connect) the Cloud GPU service.
1. Request quotas for a GPU-based VM flavor from [technical support](/en/contacts). The example uses the `GPU2-24-96-T4-1` flavor.
1. Create and configure the OpenLDAP user directory service as described in the [official OpenLDAP documentation](https://www.openldap.org/devel/admin/guide.htm#A%20Quick-Start%20Guide).
1. Find out the details of the configured directory:

   - IP address or FQDN of the OpenLDAP server
   - Unique account name
   - Account password

1. (Optional) [Set up](/en/networks/vnet/how-to-guides/vpn-tunnel) a VPN on the router that will be used for the service.
1. Check that the Cloud Desktop service is connected to your [management console](https://msk.cloud.vk.com/app/en): the **Cloud Desktop** section is available in the left side menu.

## 1. Set up external infrastructure

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the [project](/en/tools-for-using-services/account/concepts/projects) where the desktops will be placed.
1. Go to **Cloud Desktop** → **Service settings**.
1. On the **Network settings** tab, specify the [network parameters](/en/computing/cloud-desktops/service-management/config/setup-net):

    - **Router**: a router from the list.
    - **IP address space**: a range of IP addresses for the subnets where the service resources will be deployed.
    - **DNS server address for your domain**: the IP address of the DNS server for the domain that will be used for authentication on remote desktops.
    - **Desktop access mode**: for example, `External access`.
    - **Availability zone**: for example, `Moscow (MS1)`.

1. Click the **Save** button.
1. On the **Directory settings** tab, specify specify [the parameters for connecting to the user directory](/en/computing/cloud-desktops/service-management/config/setup-ldap):

    - **Host**: the IP address or FQDN of the OpenLDAP server.
    - **Port**: the port number for LDAP access — `389`.
    - **Base DN**: the root directory to search for objects in AD or LDAP.
    - **User DN for connecting to LDAP directory**: the full path to the account in the OpenLDAP database which will be used for synchronization with the accounts directory.
    - **Password**: the password of the OpenLDAP account specified in **User DN for connecting to LDAP directory**.
    - **Selection field**: `UID`.

1. Click the **Save** button.
1. On the **Subsystem** tab, [select](/en/computing/cloud-desktops/service-management/config/setup-provider) one of the options at your discretion.
1. (Optional) On the **SAML** tab, [set up](/en/computing/cloud-desktops/service-management/config/setup-saml) two-factor authentication.

## 2. Create pool of desktops

1. Go to **Cloud Desktop** → **Desktop pools**.
1. Click the **Add** button.
1. At the **Configuration** step, specify the [pool parameters](/en/computing/cloud-desktops/service-management/desktops-pool/add#setup_pool_configuration):

    - **Pool name**: for example, `vk-cloud-desktops-pool-gpu`.
    - **Pool type**: for example, `Sessional`.
    - **User group**: specify one group from the OpenLDAP directory.
    - **Min number of desktops**: `1`.

    Select the remaining parameters at your discretion.

1. Click the **Next step** button.
1. At the **Virtual machine settings** step, [configure the pool VMs](/en/computing/cloud-desktops/service-management/desktops-pool/add#configure_pool_vms):

    - **Instance type**: the name of the VM flavor received from the technical support — `GPU2-24-96-T4-1`.
    - **Image**: for example, `Windows Server 2019 Standard (en)`.

1. Click the **Next step** button.
1. At the **Peripherals setup** step, leave the parameters unchanged.
1. Click the **Create a pool** button.

   The creation of the pool of desktops will begin. This process can take a long time.

## 3. Make sure that desktops are deployed in pool

1. Go to **Cloud Desktop** → **Desktop pools**.
1. In the list of pools, click the `vk-cloud-desktops-pool-gpu` pool name.
1. Go to the **Desktops** tab.

   The **Deployed** block should display the value specified for the **Min. number of desktops** parameter. In the example: `1`.

## 4. Check desktop connectivity

1. Write down the external IP address for connecting to the pool:

    1. Go to **Cloud Desktop** → **Desktop pools**.
    1. In the list of pools, click **Connection IP address**.
    1. In the list that opens, copy the **External IP address** value.

    In the example, the IP address is `99.166.240.100`.

1. Download and install the client for accessing remote desktops. The choice of client depends on the subsystem:

   - [Termidesk](/en/computing/cloud-desktops/service-management/assets/Termidesk_user_guide_v_1_0.pdf "download") — if you selected the Termidesk subsystem.
   - [Cloud Desktop Client](/en/computing/cloud-desktops/service-management/assets/Cloud_Desktop_user_guide_v_1_0.pdf "download") — if you selected the VK subsystem.

1. Connect to the pools:

   1. Open the installed client.
   1. Click the **Add Server** button.
   1. In the window that opens, enter the `99.166.240.100` address and click the **Ok** button.
   1. Specify the AD user login and password and click the **Ok** button. If the connection is successful, a list of pools will be displayed.

1. Connect to the `vk-cloud-desktops-pool-gpu` pool.
1. In the RDP connection window that opens, re-enter the AD user login and password.

   Upon successful connection to the desktop, the Windows operating system interface will open.

## Delete unused resources

A running service consumes computing resources. If you don't need it anymore, [delete](/en/computing/cloud-desktops/service-management/desktops-pool/manage#delete_pool) the desktop pool.
