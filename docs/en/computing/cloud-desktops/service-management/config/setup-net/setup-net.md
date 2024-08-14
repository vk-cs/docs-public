1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Service settings**.
1. On the **Network settings** tab, set the parameters:

   - **IP address space**: specify a range of IP addresses for the subnets where the service resources will be deployed. Parameter requirements: format — CIDR, minimum network prefix — `/7`, maximum — `/22`.
   - **Router**: select a router from the list.
   - **DNS**: specify the IP address of a DNS server. To add more addresses, click **Add DNS** and specify an additional IP address.
   - **Availability zone**: select the [availability zone](/en/intro/start/concepts/architecture#availability_zones_567cfd7a) of the pool virtual machines from the list.

1. CLick the **Save** button.

## Checking network settings

To check the network settings, it is not necessary to save the changes in the settings.

<warn>

A virtual machine will be deployed for verification, its name begins with `vdi-checker`. The use of this VM [is charged](/en/computing/iaas/tariffication).

</warn>

To check if the service network settings are correct:

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Service settings**.
1. On the **Network settings** tab, enable the **Network settings check** option.
1. Click **Check connection**.
1. Wait for the operation to complete.

   To see the detailed result of the check, click **Details**.
