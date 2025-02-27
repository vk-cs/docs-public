## 1. Configure network

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Service settings**.
1. On the **Network settings** tab, set the parameters:

   - **Desktop access mode**: select an option from the list.

      - `External access` — connecting to desktops via the internet using the external IP address of the Cloud Desktop service.
      - `Internal access` — connecting to desktops via your local network using the internal IP address of the Cloud Desktop service.

      The selected access mode will apply to all desktop pools in your project. If necessary, the access mode can be changed at any time.

   - **Router**: select a router from the list.
   - **IP address space**: specify a range of IP addresses for the subnets where the service resources will be deployed. Parameter requirements: format — CIDR, minimum network prefix — `/7`, maximum — `/22`.
   - **DNS**: specify the IP address of a DNS server. To add more addresses, click **Add DNS** and specify an additional IP address.
   - **Availability zone**: select the [availability zone](/en/intro/start/concepts/architecture#az) of the Cloud Desktop service from the list.

     <info>

     You can specify a different availability zone for a pool when creating it.

     </info>

1. CLick the **Save** button.

## 2. Check network settings

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
