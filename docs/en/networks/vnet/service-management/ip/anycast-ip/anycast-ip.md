Managing [anycast IP addresses](../../../concepts/ips-and-inet#anycast-ip) is available in the VK Cloud management console and via the [API](/ru/tools-for-using-services/api/api-spec/api-anycast "change-lang").

## {heading(Adding an anycast IP address)[id=add]}

1. [Go to](https://msk.cloud.vk.com/app/) VK Cloud management console.
1. Select the project where you want to add anycast routing.
1. Go to **Cloud Networks** → **IP addresses**.
1. Go to the **Anycast IP** tab.
1. Click **Add IP to Project** or **Add IP Address** if no anycast IP addresses have been added to the project yet.
1. In the window that opens, specify a name and click **Add**.
1. [Bind](#associate) server or load balancer IP addresses to the anycast IP address.
1. (Optional) [Add](#add-healthcheck) a health check rule for servers or load balancers to the anycast IP address.

## {heading(Binding an Anycast IP address)[id=associate]}

1. [Go to](https://msk.cloud.vk.com/app/) VK Cloud management console.
1. Select the project containing the desired anycast IP address.
1. Go to **Cloud Networks** → **IP Addresses**.
1. Go to **Anycast IP** tab.
1. Open the IP address selection window in one of the following ways:
   - Click the name of the anycast IP address, go to the **Linked IP Addresses** tab, and click **Bind an IP Address**.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the desired IP address and select **Bind an IP Address**.
   - Select the desired IP address with a checkbox, then click **Bind an IP address**.
1. In the window that opens, select the public IP addresses to bind to the anycast IP address and click **Bind**. Only IP addresses of the same type can be bound to a single anycast IP address.

## {heading(Unbinding an anycast IP address)[id=separate]}

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

## {heading(Adding a health check)[id=add-healthcheck]}

When health checks are enabled, the anycast IP address regularly verifies the availability and functionality of servers and load balancers on the specified port.

In the management console, you can only add a TCP port check. Adding checks for ICMP or TCP ports is available via the [Anycast IP API](/en/tools-for-using-services/api/api-spec/api-anycast).

<warn>

Without health checks enabled, traffic may be routed to an inactive node, leading to data loss or service unavailability.

</warn>

To add a health check rule:

1. [Go to](https://msk.cloud.vk.com/app/) VK Cloud management console.
1. Select the project containing the desired anycast IP address.
1. Go to **Cloud Networks** → **IP Addresses**.
1. Go to the **Anycast IP** tab.
1. Click the name of the anycast IP address and go to the **Rule** tab.
1. Click **Add Rule**.
1. Specify the port for the health check. A single value is set for the entire group of bound IP addresses.
1. Click **Save**.

For the virtual machines specified in the check, [allow](../../secgroups) incoming traffic from the IP address `169.254.169.100/32` on the specified port. This is a technical VK Cloud address for service availability checks. If the firewall restricts access to the VM port from this address, the anycast IP service will mark the VM as unavailable and stop routing traffic to it.

## {heading(Modifying a health check rule)[id=edit-healthcheck]}

1. [Go to](https://msk.cloud.vk.com/app/) VK Cloud management console.
1. Select the project containing the desired anycast IP address.
1. Go to **Cloud Networks** → **IP Addresses**.
1. Go to the **Anycast IP** tab.
1. Click the name of the anycast IP address and go to the **Rule** tab.
1. Click **Edit Rule**.
1. Modify the TCP port for the health check.
1. Click **Save**.

## {heading(Renaming an anycast IP address)[id=edit]}

1. [Go to](https://msk.cloud.vk.com/app/) VK Cloud management console.
1. Select the project containing the desired IP address.
1. Go to **Cloud Networks** → **IP Addresses**.
1. Go to the **Anycast IP** tab.
1. Edit the address in one of the following ways:
    - Click the name of the anycast IP address, then click **Edit**.
    - Click ![ ](/en/assets/more-icon.svg "inline") for the desired anycast IP address and select **Edit**.
1. In the window that opens, modify the name.
1. Click **Save**.

## {heading(Deleting an anycast IP address)[id=delete]}

This is a group operation: multiple anycast IP addresses can be deleted at once by selecting them with checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/) VK Cloud management console.
1. Select the project containing the desired anycast IP address.
1. Go to **Cloud Networks** → **IP Addresses**.
1. Go to the **Anycast IP** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the desired IP address and select **Delete**.
1. Confirm the deletion.
