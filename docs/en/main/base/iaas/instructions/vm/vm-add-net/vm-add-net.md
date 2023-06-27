A virtual machine can be connected to the network using a port. Port — VM virtual network card for which entities are configured:

- security groups;
- connected network;
- DNS name.

Learn more about networks and ports in the sections [Managing networks and subnets](/en/networks/vnet/operations/manage-net) and [Managing ports](/en/networks/vnet/operations/manage-ports).

## Connecting the network to the VM

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Go to **Cloud Computing → Virtual machines**.
3. Select the desired VM and go to the **Networks** tab.
4. Click **Add connection**.
5. In the window that appears:

   1. **Name**: set the network name.
   2. **Network for connect**: select a value from the list:

      - **Create new network**: more about networks and ports in the sections [Managing networks and subnets](/en/networks/vnet/operations/manage-net).
      - **External network (ext-net)**: the virtual machine will be automatically assigned an IP address.
      - Existing network.

      When selecting an existing network, set the following parameters:

      - **Assign external IP**: enable it if you need access to the VM via the Internet.
      - **DNS-name**: the name by which you can access the VM via [private DNS](/en/networks/dns/private-dns).
      - **Set IP-address**: enable to set a specific IP address from the subnet address pool.

   3. **Firewall settings**: specify the necessary security groups. For more information, see [Managing firewall rules](/en/networks/vnet/operations/secgroups).

7. Click **Save**.

</tabpanel>
<tabpanel>

Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1--install-the-openstack-client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3--complete-authentication) to the project.

### Connecting to an existing port

1. Get the ID of the virtual machine that you plan to connect to the network:

   ```bash
   openstack server list
   ```

1. Get a list of networks and their subnets:

   ```bash
   openstack network list
   ```

1. Get a list of available ports on the desired network:

   ```bash
   openstack port list --network <network name or ID>
   ```

1. Attach the selected port to the VM:

   ```bash
   openstack server add port <virtual machine ID> <port ID>
   ```

1. Make sure that the port is successfully connected to the VM:

   ```bash
   openstack port list --server <virtual machine ID>
   ```

### Creating a new port

1. Get a list of networks and their subnets:

   ```bash
   openstack network list
   ```

1. Get a list of IP addresses for the subnet you plan to connect to:

   ```bash
   openstack subnet list --network <network name or ID>
   ```

1. Get a list of security groups:

   ```bash
   openstack security group list
   ```

1. Create a port using one of the following methods:

   - In the right network and with the `default` security group:

      ```bash
      openstack port create <port name> --network <network name or ID>
      ```

   - With parameters specified:

      ```bash
      openstack port create <port name> \
                            --network <network name or ID> \
                            --fixed-ip subnet=<subnet name or ID>,ip-address=<port IP address> \
                            --security-group <security group ID>
      ```

      To view the full list of supported parameters, run the command:

      ```bash
      openstack port create --help
      ```

      It is also possible to create a port with [DHCP options](https://github.com/Juniper/contrail-controller/wiki/Extra-DHCP-Options).

      If necessary, [set a floating IP address to the port](/en/networks/vnet/operations/manage-floating-ip).

   As a result, the ID of the created port and other information about it will be displayed.

1. Get the ID of the virtual machine that you plan to connect to the network:

   ```bash
   openstack server list
   ```

1. Attach the created port to the VM:

   ```bash
   openstack server add port <virtual machine ID> <port ID>
   ```

1. Make sure that the port is successfully connected to the VM:

   ```bash
   openstack port list --server <virtual machine ID>
   ```

</tabpanel>
</tabs>

## Deleting a VM network

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Go to **Cloud Computing → Virtual machines**.
3. Select the desired VM and go to the **Networks** tab.
4. Do one of the following for the desired network:

   - Select the network using the checkbox, then click the **Delete** button.
   - Open the connected network menu and select **Delete connection**.

5. In the window that appears, click **Confirm**.

The network connection to the VM will be deleted, but the previously created port will remain in the status **Not connected**. For more information about removing ports, see [Managing ports](/en/networks/vnet/operations/manage-ports).

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1--install-the-openstack-client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3--complete-authentication) to the project.
2. Get the VM ID:

   ```bash
   openstack server list
   ```

3. Get a list of ports from the VM:

   ```bash
   openstack port list --server <virtual machine ID>
   ```

4. Delete the unnecessary port:

   ```bash
   openstack port delete <port name or ID>
   ```

</tabpanel>
</tabs>
