You can manage floating IP addresses: view, add and remove them from a project, as well as bind and unbind these IP addresses.

## Viewing a list of floating IP addresses

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the necessary IP address is located.
1. Go to **Virtual networks** → **Floating IP**.

   A list of floating IP addresses will be displayed (**External IP** column).

</tabpanel>
<tabpanel>

1. Make sure the OpenStack CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and you can [authorize](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) in it.

1. Run the command:

   ```bash
   openstack floating ip list
   ```

</tabpanel>
</tabs>

## Adding floating IP address to the project

<warn>

A floating IP address is randomly assigned from a shared pool.

</warn>

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the necessary IP address is located.
1. Go to **Virtual networks** → **Floating IP**.
1. Click the **Add IP to project** button.
1. (Optional) Add a description.
1. Click the **Add IP** button.

</tabpanel>
<tabpanel>

1. Make sure the OpenStack CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and you can [authorize](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) in it.

1. Run the command:

   ```bash
   openstack floating ip create ext-net
   ```

</tabpanel>
</tabs>

## Editing floating IP address description

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the necessary IP address is located.
1. Go to **Virtual networks** → **Floating IP**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required floating IP address and select **Edit description**.
1. Set the description.
1. Click the **Save** button.

</tabpanel>
<tabpanel>

1. Make sure the OpenStack CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and you can [authorize](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) in it.

1. [Get list of floating IP addresses](#viewing_a_list_of_floating_ip_addresses). Find in the list the ID of the floating IP address for which you want to edit the description.

1. Run the command:

   ```bash
   openstack floating ip set <floating IP ID> --description "<new description>"
   ```

</tabpanel>
</tabs>

## Bindind a floating IP address

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the necessary IP address is located.
1. Go to **Virtual networks** → **Floating IP**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the floating IP address, for which the **Internal IP** column shows `Unbinded', and select **Bind IP**.

   <info>

   Unbound IP addresses also contain a link to the binding in the adjacent column.

   To bind a floating IP to another internal IP, first [unbind](#unbinding_floating_ip_address) it from the current one.

   </info>

1. From the drop-down list, select the OpenStack port with the internal IP address to which you are binding.
1. Click the **Confirm** button.

</tabpanel>
<tabpanel>

1. Make sure the OpenStack CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and you can [authorize](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) in it.

1. [Get list of floating IP addresses](#viewing_a_list_of_floating_ip_addresses). Find in the list the ID of the floating IP address that you want to bind to the port.
1. Get the list of ports. Find in the list the port ID of the port to which you want to bind the floating IP address.
1. Run the command:

   ```bash
   openstack floating ip set <floating IP address ID> --port <port ID>
   ```

</tabpanel>
</tabs>

## Unbinding floating IP address

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the necessary IP address is located.
1. Go to **Virtual networks** → **Floating IP**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the floating IP address that is bound to the internal IP and select **Unbind IP**.
1. Click the **Confirm** button.

</tabpanel>
<tabpanel>

1. Make sure the OpenStack CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and you can [authorize](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) in it.

1. [Get list of floating IP addresses](#viewing_a_list_of_floating_ip_addresses). Find in the list the ID of the floating IP address that you want to unbind from the port.

1. Run the command:

   ```bash
   openstack floating ip unset <floating IP address ID> --port
   ```

</tabpanel>
</tabs>

## Removing floating IP address from the project

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the necessary IP address is located.
1. Go to **Virtual networks** → **Floating IP**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required floating IP address and select **Remove IP from the project**. To remove multiple IPs at once, select them using the checkboxes and click **Remove IP from project**.
1. Click the **Confirm** button.

</tabpanel>
<tabpanel>

1. Make sure the OpenStack CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and you can [authorize](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) in it.

1. [Get list of floating IP addresses](#viewing_a_list_of_floating_ip_addresses). Find in the list the ID of the floating IP address that you want to remove from the project.

1. Execute the command:

   ```bash
   openstack floating ip delete <floating IP address ID>
   ```

</tabpanel>
</tabs>
