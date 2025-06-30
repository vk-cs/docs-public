The network configuration of the Cloud Desktop service can be set up [automatically](../../../concepts/about#automatic_net_setup) or [manually](../../../concepts/about#manual_net_setup).

## {heading(Preparatory steps)[id=preparatory_steps]}

To automatically set up the network configuration, no preparatory steps are required.

To use the manual setup mode, prepare a network to host the service infrastructure:

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Networks** → **Networks**.
1. Click the name of the required network. If there is no suitable network, [create](/en/networks/vnet/instructions/net#creating_network) it.
1. Click the name of the required subnet. If there is no suitable subnet, [create](/en/networks/vnet/instructions/net#creating_subnet) it taking into account the [requirements for the number of ports](../../../concepts/about#ports_number).
1. On the **Ports** tab, copy port IP addresses depending on the SDN of the network:

   - for `Neutron` — the IP addresses of the DHCP ports
   - for `Sprut` — the IP address of the DNS port

1. Verify that there are at least 16 free ports on the subnet. If there are fewer of them, use a different subnet.
1. Return to the page with the list of subnets of the selected network.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required subnet and select **Edit subnet**.
1. Disable the **Private DNS** option.
1. In the **DNS servers** field, in the first positions in the list, specify the IP addresses of your DNS servers, each address on a new line.
1. Under the IP addresses of your DNS servers, specify the previously copied port IP addresses:

   - for `Neutron` — the IP addresses of the DHCP ports
   - for `Sprut` — the IP address of the DNS port

1. Save changes.

## {heading(1. Configure network)[id=setup_net]}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Service settings**.
1. On the **Network settings** tab, set the parameters:

   - **Desktop access mode**: select an option from the list.

      - `External access` — connecting to desktops via the internet using the external IP address of the Cloud Desktop service.
      - `Internal access` — connecting to desktops via your local network using the internal IP address of the Cloud Desktop service.

      The selected access mode will apply to all desktop pools in your project. If necessary, the access mode can be changed at any time.

   - **Network for VDI**: select a network setup mode.

      <tabs>
      <tablist>
      <tab>Automatic setting</tab>
      <tab>Manual setting</tab>
      </tablist>
      <tabpanel>

      - **Router**: select a router from the list.
      - **IP address space**: specify a range of IP addresses for the subnets where the service resources will be deployed. Parameter requirements: format — CIDR, minimum network prefix — `/7`, maximum — `/22`.
      - **DNS**: specify the IP address of a DNS server. To add more addresses, click **Add DNS** and specify an additional IP address.

      </tabpanel>
      <tabpanel>

      - **Network**: select the previously [prepared network](#preparatory_steps) from the list.

      </tabpanel>
      </tabs>

      {note:warn}

      You can change the network setup mode until you first run desktop pool creation. After that, the Cloud Desktop instance will be deployed and changing the mode will no longer be available.

      {/note}

   - **Availability zone**: select the [availability zone](/en/intro/start/concepts/architecture#az) of the Cloud Desktop service from the list.

     {note:info}

     You can specify a different availability zone for a pool when creating it.

     {/note}

1. CLick the **Save** button.

## 2. Check network settings

To check the network settings, it is not necessary to save the changes in the settings.

{note:warn}

A virtual machine will be deployed for verification, its name begins with `vdi-checker`. The use of this VM [is charged](/en/computing/iaas/tariffication).

{/note}

To check if the service network settings are correct:

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Service settings**.
1. On the **Network settings** tab, enable the **Network settings check** option.
1. Click **Check connection**.
1. Wait for the operation to complete.

   To see the detailed result of the check, click **Details**.
