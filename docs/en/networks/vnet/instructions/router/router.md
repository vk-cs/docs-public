You can manage routers: view, edit and delete them.

## Viewing a list of routers and information about them

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Go to **Virtual networks** → **Routers**.

   A list of routers will be displayed.

1. Click on the name of the necessary router.

   A page with detailed information about the router will open. You can also [edit](#editing_a_router) router parameters on this page.

</tabpanel>
<tabpanel>

1. Make sure that:

   1. OpenStack CLI [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client).
   1. You can [authorize](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) in the OpenStack CLI.

1. To see a list of routers and their IDs, run the command:

   ```console
   openstack router list
   ```

1. To see detailed information about a router, run the command:

   ```console
   openstack router show <router ID>
   ```

   In the output of the command:

   - `id`: the router's ID.
   - `external_gateway_info`: information on connection to external network. A blank field means that connection to the external network is not configured.
   - `interfaces_info`: information about [interfaces of the router](#managing_an_interface). A blank field means that no interfaces have been added.
   - `routes`: information about [static router routes](#managing_static_routes). An empty field means no static routes were added.

</tabpanel>
</tabs>

## Adding a router

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Go to **Virtual networks** → **Routers**.
1. Click the **Add router** button.
1. Set the router parameters:

   - **Name**.
   - **External network connection**: if this option is selected, the router will have Internet access and a public IP address.

     Select this option if you plan to assign floating IP addresses to ports on subnets connected to the router and provide Internet access from these subnets.

   - **Subnet List**: one or more subnets to be connected to the router.

1. Click the **Create** button.

</tabpanel>
<tabpanel>

1. Make sure that:

    1. OpenStack CLI [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client).
    1. You can [authorize](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) in the OpenStack CLI.

1. Create a router of the necessary type:

   <tabs>
   <tablist>
   <tab>With connection to external network</tab>
   <tab>Without connection to the external network</tab>
   </tablist>
   <tabpanel>

   ```console
   openstack router create <router name> --external-gateway ext-net
   ```

   </tabpanel>
   <tabpanel>

   ```console
   openstack router create <router name>
   ```

   </tabpanel>
   </tabs>

   A router with an external network connection will have Internet access and a public IP address. Create this type of router if you plan to assign floating IP addresses to ports on subnets connected to the router and provide Internet access from those subnets.

1. Learn how to connect one or more interfaces to the router by either [editing the router](#editing_a_router) or [managing its interfaces](#managing_an_interface) directly.

</tabpanel>
</tabs>

## Editing a router

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Go to **Virtual networks** → **Routers**.
1. Perform one of the actions for the router you want to edit:

   - Click the name of the router and then in the **General information** tab, click **Edit router**.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the router and select **Edit router**.

1. Perform one of the available actions:

   - Change the router name.
   - Manage the connection to the external network: you can enable or disable the corresponding option. If this option is selected, the router will have Internet access and a public IP address.

     Select this option if you plan to assign floating IP addresses to ports on subnets connected to the router and provide Internet access from those subnets.

   - Manage the subnets connected to the router. You can add new subnets to the router by selecting them from the list, or remove already added subnets.

     {note:info}

     You can also add or remove subnets by changing the router interface.

     {/note}

1. After editing the router, click the **Save** button.

</tabpanel>
<tabpanel>

1. Make sure that:

    1. OpenStack CLI [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client).
    1. You can [authorize](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) in the OpenStack CLI.
1. [Get the ID](#viewing_a_list_of_routers_and_information_about_them) of the necessary router.
1. Perform one of the available actions:

   - Change the name of the router:

     ```console
     openstack router set <router ID> --name <new name>
     ```

   - Manage the connection to the external network:

     <tabs>
     <tablist>
     <tab>Enable external network connection</tab>
     <tab>Disable external network connection</tab>
     </tablist>
     <tabpanel>

     ```console
     openstack router set <router ID> --external-gateway ext-net
     ```

     </tabpanel>
     <tabpanel>

     ```console
     openstack router unset <router ID> --external-gateway
     ```

     </tabpanel>
     </tabs>

     Connect the router to an external network if you plan to assign floating IP addresses to ports on subnets connected to the router and provide Internet access from those subnets.

   - Manage the subnets connected to the router. You can add new subnets to the router, or remove already added subnets.

     <tabs>
     <tablist>
     <tab>Add a subnet</tab>
     <tab>Remove a subnet</tab>
     </tablist>
     <tabpanel>

     1. Get the ID of the necessary subnet.
     1. Run the command:

        ```console
        openstack router add subnet <router ID> <subnet ID>
        ```

     As a result:

     - The selected subnet will be connected to the router.
     - Interfaces `INTERFACE_DISTRIBUTED` and (if the router is connected to an external network) `SNAT` related to this subnet will appear in the list of interfaces.

     </tabpanel>
     <tabpanel>

     ```console
     openstack router remove subnet <router ID> <subnet ID>
     ```

     As a result:

     - The following will be deleted:
       - The port corresponding to the interface of the subnet being removed.
       - The `SNAT` interface (if there is one) and its corresponding port.

     - The subnet, where those interfaces were located, will be removed from the router.

     </tabpanel>
     </tabs>

     {note:info}

     You can also add or remove a subnet by [changing the interface](#managing_an_interface) of the router.

     {/note}

</tabpanel>
</tabs>

## Managing an interface

Router interface management is an alternative to [managing subnets](#editing_a_router) connected to it.

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](#viewing_a_list_of_routers_and_information_about_them) the router page and select tab **Interfaces**.

1. To add an interface:

    1. Click the **Add Interface** button.
    1. Select the required subnet from the list.
    1. Click the **Add Interface** button.

    As a result:

    - The selected subnet will be connected to the router.
    - The `INTERFACE_DISTRIBUTED` and (if **Connect to external network** is selected) `SNAT` interfaces related to this subnet will appear in the list of interfaces.

1. To remove an interface:

    1. Click ![ ](/en/assets/more-icon.svg "inline") for the interface and select **Remove Interface**.
    1. Confirm the deletion.

    As a result:

    - The corresponding `SNAT` interface (if present) will also be removed.
    - The subnet that this interface was on will be disconnected from the router.

</tabpanel>
<tabpanel>

1. Make sure that:

    1. OpenStack CLI [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client).
    1. You can [authorize](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) in the OpenStack CLI.

1. [Get the ID](#viewing_a_list_of_routers_and_information_about_them) of the necessary router.

1. To add an interface:

    1. [Get the ID of the OpenStack port](../ports#viewing_a_list_of_ports_and_port_information) located on the subnet you want to connect to the router. This port should not be used by any objects (load balancers, virtual machines, etc.) If there is no such port, [create it](../ports#adding_a_port).
    1. Run the command:

       ```console
       openstack router add port <router id> <port id>
       ```

    As a result:

    - The selected subnet will be connected to the router.
    - The `INTERFACE_DISTRIBUTED` and (if the router is connected to an external network) `SNAT` interfaces related to this subnet will appear in the list of interfaces.

   {note:info}

   To get a list of interfaces, [see router details](#viewing_a_list_of_routers_and_information_about_them) using the OpenStack CLI.

   {/note}

1. To remove an interface:

    1. [Look at the interfaces (ports)](#viewing_a_list_of_routers_and_information_about_them) configured on the router.
    1. Run the command:

       ```console
       openstack router remove port <router id> <port id>
       ```

    As a result:

    - Will also be removed:
      - port corresponding to the interface to be removed.
      - `SNAT` interface (if any) and its corresponding port.

    - The subnet that these interfaces were on will be disconnected from the router.

</tabpanel>
</tabs>

## Managing Static Routes

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](#viewing_a_list_of_routers_and_information_about_them) the router page, then select the **Static Routes** tab.

1. To add a static route:

    1. Click the **Add Static Route** or **Add** button.
    1. Set the destination network and specify the network prefix.
    1. Specify an intermediate node (next hop).
    1. Click the **Add Interface** button.

1. To delete a static route, click ![ ](/en/assets/more-icon.svg "inline") for the required route and select **Delete Interface**.

</tabpanel>
<tabpanel>

1. Make sure that:

    1. OpenStack CLI [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client).
    1. You can [authorize](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) in the OpenStack CLI.

1. [Get the ID](#viewing_a_list_of_routers_and_information_about_them) of the necessary router.

1. To add a static route, run the command:

    ```console
    openstack router set <router id> --route destination=<prefixed destination network>,gateway=<next hop address>
    ```

1. To remove a static route:

    1. [Look up the static routes](#viewing_a_list_of_routers_and_information_about_them) configured on the router.
    1. Run the command:

       ```console
       openstack router unset <router id> --route destination=<prefixed destination network>,gateway=<next hop address>
       ```

1. To remove all static routes, run the command:

    ```console
    openstack router set <router id> --no-route
    ```

</tabpanel>
</tabs>

## Removing the Router

{note:warn}

Before deleting the router, delete the [static routes](#managing-static-routes) and the configured [interfaces](#managing_an_interface) (if any) one by one before deleting the router.

{/note}

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

This is a group operation: if necessary, you can delete several routers at once by selecting them using the checkboxes.

To remove a router:

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the required balancer is located.
1. Go to **Virtual networks** → **Routers**.
1. Do one of the following for the required router:

    - Select the router using the checkbox, then click the **Remove Router** button.
    - Click ![ ](/en/assets/more-icon.svg "inline") for the router and select **Remove Router**.
    - Click on the name of the router, then on the **General Information** tab, click on the **Delete Router** button.

1. Confirm the removal of the router.

</tabpanel>
<tabpanel>

1. Make sure that:

    1. OpenStack CLI [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client).
    1. You can [authorize](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) in the OpenStack CLI.

1. [Get the ID](#viewing_a_list_of_routers_and_information_about_them) of the necessary router.

1. Run the command:

   ```console
   openstack router delete <router ID>
   ```

</tabpanel>
</tabs>
