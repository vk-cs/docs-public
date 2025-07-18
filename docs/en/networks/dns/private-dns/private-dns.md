Private DNS in VK Cloud is the functionality of a DNS server running in the project networks of the platform. Allows you to access instances by DNS names.

The service supports configuring the private zone and port names of virtual machines. The DNS server responds to the same addresses as the DHCP ports on the network. For private DNS to work on the network, a DHCP server must be enabled.

{note:warn}

At the moment, the private DNS request forwarding servers are `8.8.8.8`, `8.8.4.4`. Changing these addresses is not supported.

{/note}

## Editing a zone name for a network

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Go to **Virtual networks** → **Networks**.
1. Open the network page by clicking on its name in the general list.
1. Go to tab **Network settings**.
1. Enter the zone name in the **Zone** field.
1. Click the button **Save changes**.

{note:warn}

The maximum length of the zone name is 253 characters. Consists of blocks of the form `[a-z0-9-]+\\.`. The maximum block length is 63 characters. A block cannot start and end with `-`.

{/note}

## Configuring the DNS name

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

There are several ways to configure the DNS name:

Via VM:

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Start to [create new virtual machine](/en/computing/iaas/instructions/vm/vm-create). In the “Network Settings” step, enter the name in the **DNS-name** field.

Via port settings:

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Go to **Virtual networks** → **Networks**.
1. Open the network card by clicking on its name in the general list.
1. Open the subnet card by clicking on its name in the general list.
1. Go to the **Ports** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required port and select **Edit port**.
1. Enter the name in the field **DNS-name**.
1. Click the button **Save Changes**.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

1. Get a list of instance ports by running the command:

   ```console
   openstack port list --server <instance ID>
   ```

1. Run the command:

   ```console
   openstack port set --dns-name <DNS name> <port ID>
   ```

</tabpanel>
</tabs>

{note:warn}

The maximum length of the name is 63 characters. Only numbers, small Latin letters and dashes `-` are allowed.

{/note}
