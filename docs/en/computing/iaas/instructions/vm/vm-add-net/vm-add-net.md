A virtual machine can be connected to the network using a port. Port — VM virtual network card for which entities are configured:

- security groups;
- connected network;
- DNS name.

Learn more about networks and ports in the sections [Managing networks and subnets](/en/networks/vnet/instructions/net) and [Managing ports](/en/networks/vnet/instructions/ports).

## Connecting the network to the VM

{tabs}

{tab(Management console)}

1. Go to [management console](https://msk.cloud.vk.com/app/en) VK Cloud.
2. Go to **Cloud Servers → Virtual machines**.
3. Select the required VM and go to the **Networks** tab.
4. Click **Add connection**.
5. In the window that appears:

   1. **Name**: set the network name.
   2. **Network for connect**: select a value from the list:

      - **Create new network**: more about networks and ports in the sections [Managing networks and subnets](/en/networks/vnet/instructions/net).
      - **External network (ext-net)**: the virtual machine will be automatically assigned an IP address.
      - Existing network.

      When selecting an existing network, set the following parameters:

      - **Assign external IP**: enable it if you need access to the VM via the Internet.
      - **DNS-name**: the name by which you can access the VM via [private DNS](/en/networks/dns/private-dns).
      - **Set IP-address**: enable to set a specific IP address from the subnet address pool.

   3. **Firewall settings**: specify the necessary security groups. For more information, see [Security groups](/en/networks/vnet/instructions/secgroups).

7. Click **Save**.

{/tab}

{tab(OpenStack CLI)}

Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

### Connecting to an existing port

1. Get the ID of the virtual machine that you plan to connect to the network:

   ```console
   openstack server list
   ```

1. Get a list of networks and their subnets:

   ```console
   openstack network list
   ```

1. Get a list of available ports on the required network:

   ```console
   openstack port list --network <network name or ID>
   ```

1. Attach the selected port to the VM:

   ```console
   openstack server add port <virtual machine ID> <port ID>
   ```

1. Make sure that the port is successfully connected to the VM:

   ```console
   openstack port list --server <virtual machine ID>
   ```

### Creating a new port

1. Get a list of networks and their subnets:

   ```console
   openstack network list
   ```

1. Get a list of IP addresses for the subnet you plan to connect to:

   ```console
   openstack subnet list --network <network name or ID>
   ```

1. Get a list of security groups:

   ```console
   openstack security group list
   ```

1. Create a port using one of the following methods:

   - In the right network and with the `default` security group:

      ```console
      openstack port create <port name> --network <network name or ID>
      ```

   - With parameters specified:

      ```console
      openstack port create <port name> \
                            --network <network name or ID> \
                            --fixed-ip subnet=<subnet name or ID>,ip-address=<port IP address> \
                            --security-group <security group ID>
      ```

      To view the full list of supported parameters, run the command:

      ```console
      openstack port create --help
      ```

      It is also possible to create a port with [DHCP options](https://github.com/Juniper/contrail-controller/wiki/Extra-DHCP-Options).

      If necessary, [set a floating IP address to the port](/en/networks/vnet/instructions/ip/floating-ip).

   As a result, the ID of the created port and other information about it will be displayed.

1. Get the ID of the virtual machine that you plan to connect to the network:

   ```console
   openstack server list
   ```

1. Attach the created port to the VM:

   ```console
   openstack server add port <virtual machine ID> <port ID>
   ```

1. Make sure that the port is successfully connected to the VM:

   ```console
   openstack port list --server <virtual machine ID>
   ```

{/tab}

{/tabs}

## Deleting a VM network

{tabs}

{tab(Management console)}

1. Go to [management console](https://msk.cloud.vk.com/app/en) VK Cloud.
2. Go to **Cloud Servers → Virtual machines**.
3. Select the required VM and go to the **Networks** tab.
4. Do one of the following for the required network:

   - Select the network using the checkbox, then click the **Delete** button.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the connected network and select **Delete connection**.

5. In the window that appears, click **Confirm**.

The network connection to the VM will be deleted, but the previously created port will remain in the status **Not connected**. For more information about removing ports, see [Managing ports](/en/networks/vnet/instructions/ports).

{/tab}

{tab(OpenStack CLI)}

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.
2. Get the VM ID:

   ```console
   openstack server list
   ```

3. Get a list of ports from the VM:

   ```console
   openstack port list --server <virtual machine ID>
   ```

4. Delete the unnecessary port:

   ```console
   openstack port delete <port name or ID>
   ```

{/tab}

{/tabs}
