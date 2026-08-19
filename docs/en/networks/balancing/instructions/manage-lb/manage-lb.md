You can manage load balancers: view, edit and delete them, add and modify balancing rules, manipulate public IP addresses.

## Viewing a list of load balancers and information about them

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Go to **Virtual networks** → **Load balancers**.

   A list of load balancers will be displayed.

1. Click on the name of the necessary balancer.

   A page will open with detailed information about the balancer. In this page you can also [edit](#editing_a_load_balancer_name) the balancer parameters.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that:

   1. OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) together with the `python-octaviaclient` additional package.
   1. You can [authenticate](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) to the project.

1. To see a list of load balancers and their identifiers, run the command:

   ```console
   openstack loadbalancer list
   ```

1. To see detailed information about a load balancer, run the command:

   ```console
   openstack loadbalancer show <load balancer ID>
   ```

   General information about the load balancer and identifiers will be displayed:

   - `vip_port_id` is the identifier of the port that is used as the Virtual IP on the load balancer. You can assign a floating IP address to this port.

   - `listeners` is a list of listener object IDs. These objects listen for incoming connections to the load balancer and serve as an entry point for traffic.

   - `pools` is a list of pools identifiers. These objects serve to group the end users of traffic. Consumers act as members of the pool. Traffic from the listener object is balanced between several members of the pool configured for the listener object.

1. To see the listener object settings and their relations to pools, run the command:

   ```console
   openstack loadbalancer listener show <listener object ID>
   ```

1. To see the pool settings and the list of members of that pool, run the command:

   ```console
   openstack loadbalancer pool show <pool ID>
   ```

1. To see the settings of an individual participant from the pool, run the command:

   ```console
   openstack loadbalancer member show <pool ID <member ID>
   ```

   Information will be displayed for the member, including the traffic destination port.

{/tab}

{/tabs}

## {heading(Viewing load balancer statuses)[id=balancing-manage-lb-statuses]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/) VK Cloud management console.
1. Select a project.
1. Go to **Virtual networks** → **Load balancers**.

   A list of load balancers with their {linkto(../../concepts/lb-statuses#balancing-lb-statuses-provisioning)[text=provisioning statuses]} and {linkto(../../concepts/lb-statuses#balancing-lb-statuses-operating-common)[text=common operating statuses]} will be displayed.

{/tab}
{tab(OpenStack CLI)}
1. Make sure that:

   1. OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) together with the `python-octaviaclient` additional package.
   1. You can [authenticate](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) to the project.
1. Get the list of load balancing pools with their IDs:

   ```console
   openstack loadbalancer pool list
   ```

1. Copy the ID of the required pool.
1. Get information about the required load balancing pool:

   ```console
   openstack loadbalancer member list <POOL_ID>
   ```
   The {linkto(../../concepts/lb-statuses#balancing-lb-statuses-provisioning)[text=provisioning status]} and the {linkto(../../concepts/lb-statuses#balancing-lb-statuses-operating)[text=operating status]} are displayed in the corresponding columns.

{/tab}
{/tabs}

## {heading(Adding a load balancer)[id=balancing-manage-lb-add]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Go to **Virtual networks** → **Load balancers**.
1. Click **Add balancer** or **Add**.
1. Set the balancer parameters:

   - **Loadbalancer name**.
   - **Network**: the network and subnet where the balancer will be located.

     The balancer will distribute incoming traffic to the selected services located in this subnet.

     {note:warn}

     It is not possible to change this parameter later.

     {/note}

   - **Availability zone**: select the [availability zone](/en/intro/start/concepts/architecture#architecture-az) from the list. To optimize and speed up the
     balancer connection to VMs, place them in the same zone.
   - **DNS-name**: (Optional) DNS name for the balancer.
   - **Assign external IP**: if this option is selected, the balancer will be assigned a public IP address through which it will be accessible from the Internet. Otherwise the balancer will act as an internal load balancer. Such IP address can be [assigned later](#managing_public_ip_addresses).

     Select this option if you plan to place services behind the load balancer that must be accessible from the Internet.
     The option can only be selected if the network selected earlier is behind a router that has access to the Internet.

1. Set the balancer rules.
1. Click the **Add balancer** button.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that:

   1. OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) together with the `python-octaviaclient` additional package.
   1. You can [authenticate](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) to the project.

1. Select the network and subnet where the balancer will be hosted. [Get ID](/en/networks/vnet/instructions/net#viewing_list_of_networks_and_subnets_and_information_about_them) of the subnet.

1. Select the [availability zone](/en/intro/start/concepts/architecture#architecture-az) to place the balancer. To get the list of availability zones, run the command:

   ```console
   openstack availability zone list
   ```

   To optimize and speed up the balancer connection to VMs, place them in the same zone.

1. Create a balancer:

   ```console
   openstack loadbalancer create --name <load-balancer-name> --vip-subnet-id <subnet-ID> --availability-zone <availability-zone>
   ```

1. (Optional) [Assign the balancer an external IP address](#managing_public_ip_addresses). Through this address, it
   will be accessible from the Internet. Otherwise the load balancer will act as an internal load balancer.

   The address must be assigned if you plan to place services behind the load balancer which must be accessible from the Internet. You can assign an address only if the network for the selected subnet earlier is behind a router that has access to the Internet.

{/tab}

{/tabs}

## Editing a load balancer name

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Go to **Virtual networks** → **Load balancers**.
1. Perform one of the actions for the load balancer you want to edit:

   - Click on the balancer name.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the balancer and select **Edit balancers**.

   This will open a page detailing the balancer.

1. To change the name:

   1. Click on the pencil icon next to the current balancer name.
   1. Set the new name.
   1. Click the **Rename** button.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that:

   1. OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) together with the `python-octaviaclient` additional package.
   1. You can [authenticate](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) to the project.

1. [Get ID](#viewing_a_list_of_load_balancers_and_information_about_them) of the necessary load balancer.

1. Change the name of the load balancer:

   {tabs}

   {tab(Linux/macOS (bash, zsh))}
      
   ```console
   openstack loadbalancer <load balancer ID> \
     --name <new name>
   ```

   {/tab}
   
   {tab(Windows (PowerShell))}
   
   ```console
   openstack loadbalancer <load balancer ID> `
     --name <new name>
   ```

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

## Managing public IP addresses

### Assign a public IP address

If the balancer network is connected to a router with Internet access, you can assign a public (external) IP address to the balancer.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Go to **Virtual networks** → **Load balancers**.
1. Do one of the following:

   - Click the name of the necessary load balancer.

     On the balancer details page, click the **Assign external IP** link in the **IP address** → **External IP** block.

   - Click ![ ](/en/assets/more-icon.svg "inline") for the required balancer and select **Assign external IP**.

1. Select the necessary public IP address from the list, or create a new one.
1. Click the **Confirm** button.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that:

   1. OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) together with the `python-octaviaclient` additional package.
   1. You can [authenticate](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) to the project.

1. [Get port ID](/en/networks/vnet/instructions/ports#viewing_a_list_of_ports_and_port_information) with Virtual IP for the necessary load balancer.
1. [Assign a floating IP address](/en/networks/vnet/instructions/ip/floating-ip#bindind_a_floating_ip_address) to a port with this ID.

{/tab}

{/tabs}

### Unassign the public IP address

If the balancer network is connected to a router with Internet access, and a public (external) IP address is assigned to the balancer, this address can be unassigned.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Go to **Virtual Networks** → **Load balancers**.
1. Do one of the following:

   - Click the name of the necessary load balancer.

     On the balancer details page, click the **x** symbol next to the IP address in the **IP address** → **External IP** section.

   - Click ![ ](/en/assets/more-icon.svg "inline") for the required balancer and select **Unlink external IP**.

1. Click **Confirm**.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that:

   1. OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) together with the `python-octaviaclient` additional package.
   1. You can [authenticate](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) to the project.

1. [Get port ID](/en/networks/vnet/instructions/ports#viewing_a_list_of_ports_and_port_information) with Virtual IP for the necessary load balancer.
1. [Unlink floating IP address](/en/networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-disassociate) from the port with this ID.

{/tab}

{/tabs}



## {heading(Removing the load balancer)[id=balancing-manage-lb-delete]}

{tabs}

{tab(Management console)}

This is a group operation: if necessary, you can remove multiple load balancers at once by selecting them using the checkboxes.

To remove a load balancer:

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the necessary load balancer is located.
1. Go to **Virtual networks** → **Load balancers**.
1. Perform one of the actions for the necessary load balancer:

   - Select the balancer using the checkbox, then click **Delete**.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the balancer and select **Delete balancer**.

1. Confirm the removal of the balancer.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that:

   1. OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) together with the `python-octaviaclient` additional package.
   1. You can [authenticate](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) to the project.

1. [Get ID](#viewing_a_list_of_load_balancers_and_information_about_them) of the load balancer.

1. Remove the load balancer:

   ```console
   openstack loadbalancer delete <load balancer ID>
   ```

{/tab}

{/tabs}
