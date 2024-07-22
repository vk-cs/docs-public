In addition to the cloud network, you can create subnets. By default, one network with several subnets is already created in the project. Once a network and subnets are created, they become available to all virtual machines in the project at once.

<warn>

[Shared networks](../../concepts/net-types#shared_net) can be managed only from the owner project.

</warn>

## Viewing the list of networks and subnets and information about them

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. In management console, go to **Virtual networks** → **Networks**.

   A list of networks will be displayed.

1. Click on the name of the necessary network.

   A page with detailed information about the network will open. This will include a list of subnets on that network.

1. Tap on the name of the required subnet.

   A page detailing the network information will be displayed.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

1. To see a list of networks and their identifiers, run the command:

   ```bash
   openstack network list
   ```

1. To see detailed information about the network, run the command:

   ```bash
   openstack network show <network ID>
   ```

1. To see a list of all subnets and their identifiers, run the command:

   ```bash
   openstack subnet list
   ```

1. To see a list of all subnets belonging to a particular network and their IDs, run the command:

   ```bash
   openstack subnet list --network <network ID>
   ```

1. To see detailed information about a subnet, execute the command:

   ```bash
   openstack subnet show <subnet ID>
   ```

</tabpanel>
</tabs>

## Creating a network

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. In management console, go to **Virtual networks** → **Networks**.
2. Click the **Create** button.
3. Set the network name.
4. (Optional) Give access to the Internet. This is necessary if you plan to use VPN, SNAT services.
5. Select a router from the suggested list.
6. Specify the zone for private DNS.
7. The default subnet is already created, but you can add more. If you need to add subnets later, skip this step.
8. Click the **Add Network** button.

Once a network is created, it will appear in the list of networks.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

1. Run the command:

   ```bash
   openstack network create <network name>
   ```

</tabpanel>
</tabs>

## Editing a network

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. In management console, go to **Virtual networks** → **Networks**.
2. Click on the name of the cloud network.
3. Go to **Network settings**.
4. Make any changes you want.
5. Click the **Save changes** button.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

1. [Get ID](#viewing_the_list_of_networks_and_subnets_and_information_about_them) of the network you want to edit.

1. Familiarize yourself with the command's help.

   ```bash
   openstack network set --help
   ```

   Below are just the basic arguments of the command.

1. To apply the necessary settings to the network, run the command:

   <tabs>
   <tablist>
   <tab>Linux/macOS (bash, zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   openstack network set <network ID> \
     --name <new network name> \
     --dns-domain <new DNS domain>
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   openstack network set <network ID> `
     --name <new network name> `
     --dns-domain <new DNS domain>
   ```

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Deleting a network

<warn>

All the network subnets and ports will be deleted along with the network.

</warn>

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_delete_net.md)}

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

1. [Get ID](#viewing_the_list_of_networks_and_subnets_and_information_about_them) of the network you want to delete.

1. Run the command:

   ```bash
   openstack network delete <network ID>
   ```

</tabpanel>
</tabs>

## Creating a subnet

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. In management console, go to **Virtual networks** → **Networks**.
2. Click on the name of the cloud network.
3. Click the **Add subnet** button.
4. Specify the name of the subnet.
5. Enter the IP address and gateway of the subnet.
6. (Optional) DHCP is enabled by default. The addresses issued by the DHCP server will remain constant. Disabling DHCP will cause the IP addresses issued by the DHCP service to stop being served. This can cause virtual machines to become unavailable. If necessary, disable it.
7. Specify a pool of DHCP IP addresses.
8. (Optional) By default, **Private DNS** is enabled. If it is disabled, specify DNS servers.
9. (Optional) Enable **Show Static route field** to specify static routes.
10. Click the **Create** button.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

1. [Get ID](#viewing_the_list_of_networks_and_subnets_and_information_about_them) of the network in which you want to create a subnet.

1. Familiarize yourself with the command's help.

   ```bash
   openstack subnet create --help
   ```

   Below are just the basic arguments of the command.

1. Run the command:

   <tabs>
   <tablist>
   <tab>Linux/macOS (bash, zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   openstack subnet create <name> \
     --subnet-range <subnet address> \
     --network <network ID> \
     --dns-nameserver <DNS server address> \
     --gateway <gateway address>
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   openstack subnet create <name> `
     --subnet-range <subnet address> `
     --network <network ID> `
     --dns-nameserver <DNS server address> `
     --gateway <gateway address>
   ```

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Editing a subnet

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. In management console, go to **Virtual networks** → **Networks**.
2. Click on the name of the cloud network where the subnet is located.
3. Click ![ ](/en/assets/more-icon.svg "inline") for the subnet you want to change and select **Edit subnet**.
4. Make the necessary changes.
5. Click the **Save** button.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

1. [Get ID](#viewing_the_list_of_networks_and_subnets_and_information_about_them) of the subnet you want to edit.

1. To apply (`set`) the necessary settings to a subnet or to cancel them (`unset`):

   1. Familiarize yourself with the commands' help.

      ```bash
      openstack subnet set --help
      ```

      ```bash
      openstack subnet unset --help
      ```

      Below are just the basic arguments of the commands.

   1. Run the command:

      <tabs>
      <tablist>
      <tab>Linux/macOS (bash, zsh)</tab>
      <tab>Windows (PowerShell)</tab
      </tablist>
      <tabpanel>

      ```bash
      openstack subnet <set or unset> <subnet ID> \
        --allocation-pool start=<initial IP address for DHCP>,end=<end IP address for DHCP> \
        --dns-nameserver <DNS server address> \
        --host-route destination=<route destination network address>,gateway=<route gateway address>
      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      openstack subnet <set or unset> <subnet ID> `
        --allocation-pool start=<initial IP address for DHCP>,end=<end IP address for DHCP> `
        --dns-nameserver < DNS server address> `
        --host-route destination=<destination network address>,gateway=<route gateway address>
      ```

      </tabpanel>
      </tabs>

</tabpanel>
</tabs>

## Deleting a subnet

<warn>

There must be at least one subnet on the cloud network.
Once a subnet is deleted, it cannot be restored.

</warn>

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. In management console, go to **Virtual networks** → **Networks**.
2. Click on the name of the cloud network where the subnet is located.
3. Click ![ ](/en/assets/more-icon.svg "inline") for the subnet you want to delete and select **Delete Subnet**.
5. In the window that opens, click the **Confirm** button.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

1. [Get ID](#viewing_the_list_of_networks_and_subnets_and_information_about_them) of the subnet you want to delete.

1. Run the command:

   ```bash
   openstack subnet delete <subnet ID>
   ```

</tabpanel>
</tabs>
