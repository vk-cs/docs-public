Private DNS in {var(cloud)} is DNS server functionality that operates in {var(cloud)} project networks. It allows you to access instances by DNS names.

The service supports configuring a private zone and the names of virtual machine ports. The DNS server responds at the same addresses as the DHCP ports in the network. For private DNS to work, the DHCP server must be enabled in the network.

{ifndef(public)}
{note:warn}
The IP addresses of the private DNS forwarding servers are `8.8.8.8` and `8.8.4.4`. Changing these addresses is not supported.
{/note}
{/ifndef}

{ifdef(public)}
{note:warn}
In {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn-sprut)[text=SDN Sprut]}, subnets with private DNS enabled have a limit on the number of DNS requests — no more than 200 queries per second (QPS). All requests exceeding this limit will be rejected.
{/note}
{/ifdef}

## {heading(Editing the zone name for a network)[id=dns-private-dns-zone]}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} your {var(cloud)} management console.
1. Select a project.
1. Go to the **Virtual Networks** → **Networks** section.
1. Open the network card by clicking its name in the list.
1. Go to the **Network settings** tab.
1. Enter the zone name in the **Zone** field.
1. Click the **Save changes** button.

{note:warn}
The maximum zone name length is 253 characters. It consists of blocks in the form `[a-z0-9-]+\\.`. The maximum block length is 63 characters. A block cannot start or end with `-`.
{/note}

## {heading(Configuring a DNS name)[id=dns-private-dns-name]}

{tabs}

{tab(Management console)}

There are several ways to configure a DNS name:

Via a VM:

1. {ifdef(public)}[Go to](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} your {var(cloud)} management console.
1. Select a project.
1. Start {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=creating a new virtual machine]}. At the **Network settings** step, specify the name in the **DNS name** field.

Via port settings:

1. {ifdef(public)}[Go to](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} your {var(cloud)} management console.
1. Select a project.
1. Go to the **Virtual Networks** → **Networks** section.
1. Open the network card by clicking its name in the list.
1. Open the subnet card by clicking its name in the list.
1. Go to the **Ports** tab.
1. Click ![ ](../../../../assets/more-icon.svg "inline") for the required port and select **Edit port**.
1. Specify the name in the **DNS name** field.
1. Click the **Save changes** button.

{/tab}

{tab(OpenStack CLI)}

1. Make sure the OpenStack client is {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]}, and {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.

1. Get the list of instance ports by running the command:

   ```console
   openstack port list --server <SERVER_ID>
   ```

1. Run the command:

   ```console
   openstack port set --dns-name <DNS_NAME> <PORT_ID>
   ```

{/tab}

{/tabs}

{note:warn}
The maximum name length is 63 characters. Only digits, lowercase Latin letters, and the hyphen `-` are allowed.
{/note}
