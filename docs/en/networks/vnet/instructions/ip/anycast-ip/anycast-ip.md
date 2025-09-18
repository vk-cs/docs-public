Managing [anycast IP addresses](../../../concepts/ips-and-inet#anycast-ip) is available in the VK Cloud management console and via the [API](/ru/tools-for-using-services/api/api-spec/api-anycast "change-lang").

## {heading(Adding an anycast IP address)[id=add]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/) VK Cloud management console.
1. Select the project where you want to add anycast routing.
1. Go to **Cloud Networks** → **IP addresses**.
1. Go to the **Anycast IP** tab.
1. Click **Add IP to Project** or **Add IP Address** if no anycast IP addresses have been added to the project yet.
1. In the window that opens, specify a name and click **Add**.
1. [Bind](#associate) server or load balancer IP addresses to the anycast IP address.
1. (Optional) [Add](#add-healthcheck) a health check rule for servers or load balancers to the anycast IP address.

{/tab}

{/tabs}

## {heading(Binding an anycast IP address)[id=associate]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/) VK Cloud management console.
1. Select the project containing the desired anycast IP address.
1. Go to **Cloud Networks** → **IP Addresses**.
1. Go to **Anycast IP** tab.
1. Open the IP address selection window in one of the following ways:
   - Click the name of the anycast IP address, go to the **Linked IP Addresses** tab, and click **Bind an IP Address**.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the desired IP address and select **Bind an IP Address**.
   - Select the desired IP address with a checkbox, then click **Bind an IP address**.
1. In the window that opens:
   1. Select the resource type:
       - `Load balancers`. Load balancers must be placed in a network with internet access and must not be bound to a [Floating IP address](/en/networks/vnet/concepts/ips-and-inet#floating-ip).
       - `Virtual machines`. Virtual machines must have public IP addresses in [external networks](/en/networks/vnet/concepts/net-types#external_net).
       - `Advanced routers`. Interface of an advanced router must have a public IP address in an external network (the **SNAT** option must be enabled).

       You can only bind IP addresses of the same type to a single anycast IP address.
   1. Select public IP addresses to bind to the Anycast IP address. You can bind up to eight IP addresses to a single Anycast IP address.
   1. Click **Bind**.

{/tab}

{/tabs}

## {heading(Unbinding an anycast IP address)[id=separate]}

{tabs}

{tab(Management console)}

This is a group operation: multiple IP addresses can be unbound at once by selecting them with checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/) VK Cloud management console.
1. Select the project containing the desired anycast IP address.
1. Go to **Cloud Networks** → **IP Addresses**.
1. Go to the **Anycast IP** tab.
1. Click the name of the anycast IP address and go to the **Linked IP Addresses** tab.
1. Remove the linked IP address in one of the following ways:
   - Click ![ ](/en/assets/more-icon.svg "inline") for the desired IP address and select **Delete**.
   - Select the desired IP address with a checkbox, then click **Delete**.
1. Confirm the deletion.

{/tab}

{/tabs}

## {heading(Adding a health check)[id=add-healthcheck]}

When health checks are enabled, the anycast IP address regularly verifies the availability and functionality of servers and load balancers on the specified port.

In the management console, you can only add a TCP port check. Adding checks for ICMP or TCP ports is available via the [Anycast IP API](/en/tools-for-using-services/api/api-spec/api-anycast).

{note:warn}

Without health checks enabled, traffic may be routed to an inactive node, leading to data loss or service unavailability.

{/note}

{tabs}

{tab(Management console)}

To add a health check rule:

1. [Go to](https://msk.cloud.vk.com/app/) VK Cloud management console.
1. Select the project containing the desired anycast IP address.
1. Go to **Cloud Networks** → **IP Addresses**.
1. Go to the **Anycast IP** tab.
1. Click the name of the anycast IP address and go to the **Rule** tab, then click **Add Rule**.

    - Select the monitoring type: TCP or ICMP.

    If Anycast IP addresses are bound with virtual machine IP addresses or load balancers, both options are available. For advanced router and load balancer IP addresses, only ICMP monitoring is available.
    - If you select TCP monitoring, specify the health check port. A single value is set for the entire group of bound IP addresses.
1. Click **Save**.

{/tab}

{/tabs}

{note:info}

Once you bind IP addresses of load balancers to an anycast IP address, a health check rule is automatically created.

{/note}

For the virtual machines specified in the check, [allow](../../secgroups) incoming traffic from the IP address `169.254.169.100/32` on the specified port. This is a technical VK Cloud address for service availability checks. If the firewall restricts access to the VM port from this address, the anycast IP service will mark the VM as unavailable and stop routing traffic to it.

## {heading(Modifying a health check rule)[id=edit-healthcheck]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/) VK Cloud management console.
1. Select the project containing the desired anycast IP address.
1. Go to **Cloud Networks** → **IP Addresses**.
1. Go to the **Anycast IP** tab.
1. Click the name of the anycast IP address and go to the **Rule** tab.
1. Click **Edit Rule**.

    - Select the monitoring type: TCP or ICMP.

    If virtual machine IP addresses are bound to the anycast IP address, both options are available. For advanced router and load balancer IP addresses, only ICMP monitoring is available.
    - If you select TCP monitoring, specify the health check port. A single value is set for the entire group of bound IP addresses.
1. Click **Save**.

{/tab}

{/tabs}

{note:warn}

You cannot modify the rule for anycast IP addresses that are bound to load balancer IP addresses.

{/note}

## {heading(Renaming an anycast IP address)[id=edit]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/) VK Cloud management console.
1. Select the project containing the desired IP address.
1. Go to **Cloud Networks** → **IP Addresses**.
1. Go to the **Anycast IP** tab.
1. Edit the address in one of the following ways:
    - Click the name of the anycast IP address, then click **Edit**.
    - Click ![ ](/en/assets/more-icon.svg "inline") for the desired anycast IP address and select **Edit**.
1. In the window that opens, modify the name.
1. Click **Save**.

{/tab}

{/tabs}

## {heading(Deleting an anycast IP address)[id=delete]}

{tabs}

{tab(Management console)}

This is a group operation: multiple anycast IP addresses can be deleted at once by selecting them with checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/) VK Cloud management console.
1. Select the project containing the desired anycast IP address.
1. Go to **Cloud Networks** → **IP Addresses**.
1. Go to the **Anycast IP** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the desired IP address and select **Delete**.
1. Confirm the deletion.

{/tab}

{/tabs}
