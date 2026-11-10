# {heading(Configuring the network)[id=bare-metal-network-config]}

{include(/en/_includes/_translated_by_ai_en.md)}

You can assign VLANs to the network interfaces of a Bare Metal server and combine interfaces into an aggregated interface (LAG interface).

   {note:warn}
   Network configuration in the management console is applied only on the Bare Metal service side. After saving the settings, update the network configuration in the OS.
   {/note}

## {heading(Configuring a network interface or LAG interface)[id=bare-metal-network-config-nic-or-bond]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. {linkto(../manage-server#bare-metal-server-get-info)[text=Find out]} the number of network interfaces of your server.
1. Define the desired network configuration. If necessary, {linkto(#bare-metal-network-config-aggregate)[text=combine]} network interfaces into a LAG interface.
1. Calculate the number of network interface and VLAN combinations required for the desired network configuration. For example, the server has two network interfaces, `nic0` and `nic1`.

   {cut(Examples of configurations with the number of combinations)}

   - `nic0` and `nic1` work as two independent network interfaces and both use only the Native VLAN: `nic0 + Native VLAN` and `nic1 + Native VLAN`. Number of combinations: `2`.
   - `nic0` and `nic1` are {linkto(#bare-metal-network-config-aggregate)[text=combined]} into the LAG interface `bond0`, which uses only the Native VLAN: `bond0 + Native VLAN`. Number of combinations: `1`.
   - `nic0` and `nic1` work as two independent network interfaces, both use the Native VLAN, and `nic0` uses an additional VLAN: `nic0 + Native VLAN`, `nic0 + Additional VLAN`, `nic1 + Native VLAN`. Number of combinations: `3`.

   {/cut}

1. Determine which VLANs will be used for each combination of a network interface and a VLAN. Each interface must have its own VLAN. If necessary, {linkto(../manage-vlan#bare-metal-vlan-add)[text=create]} the missing ones.
1. Go to the **Bare Metal** → **Servers** section.
1. Open the network configuration window in one of the following ways:

   - From the server list:

     1. In the list of Bare Metal servers, click ![ ](../../../../assets/more-icon.svg "inline") for the desired server.
     1. Select **Configure network settings**.

   - On the server page:

     1. In the list of Bare Metal servers, click the name of the desired server.
     1. On the server page, click ![ ](../../../../assets/more-icon.svg "inline").
     1. Select **Configure network settings**.

1. Each interface (`nic`) in the list corresponds to a separate physical network card of the server. If necessary, {linkto(#bare-metal-network-config-aggregate)[text=configure]} the combining of interfaces into a LAG interface.

   Network interfaces included in a LAG interface cannot be configured separately.

1. Prepare the desired configuration for the network interfaces, as well as for LAG interfaces if they are used.

   1. Select the **Native VLAN** from the drop-down list.

      Native VLAN traffic is transmitted without a tag (untagged) according to the 802.1Q standard.

   1. (Optional) Add additional VLANs. To do this, click **Add VLAN** and select the desired VLAN in the drop-down list.

      Unlike the Native VLAN, traffic in additional VLANs is transmitted with a VLAN ID tag according to the 802.1Q standard.

      To remove an additional VLAN from the configuration, click ![trash-icon](../../../../assets/trash-icon.svg "inline") next to it.

1. Click **Save** and update the network interface settings. You can do this automatically or manually.

   {tabs}

   {tab(Automatic)}

   Automatic configuration update is supported in OSs installed from {var(cloud)} images or [cloud images of popular distributions](https://docs.openstack.org/image-guide/obtain-images.html), as well as when you install [cloud-init](https://cloud-init.io/) in the OS yourself.

   Automatic configuration is not available for network interfaces that use a VLAN of the `L2Only` type.

   To initialize `cloud-init`:

   1. Restart the server, wait for the OS to boot, and check that the server is available over the network.
   1. If connectivity is not restored, {linkto(../../connect/console#bare-metal-connect-console)[text=connect]} to the server via the VNC console and start initialization manually with the following command:

      ```console
      cloudinit init
      ```

   1. Check the server availability again.

      If the server is still unavailable, configure the network interfaces manually.

   {/tab}

   {tab(Manual)}

   If a network interface is used with a VLAN of the `L2Only` type, define the desired L2 addressing yourself and perform the configuration using the network configurator of your OS (`netplan`, `ifupdown`, `network-scripts`, `wicked`, and others). In such a network, you can use any addressing from the private address pool ([RFC 1918](https://www.rfc-editor.org/info/rfc1918/)). To assign IP addresses automatically in such a network, you need your own DHCP server.

   When using a VLAN of the `Sprut` type, to change network settings and to connect the server to the internet, use the how-to guide {linkto(../../how-to-guides/configure-public-access#bare-metal-configure-public-access)[text=%text]}.

   If network interfaces are combined into a LAG interface, you must create a combined interface (`bond`) with LACP (Link Aggregation Control Protocol) support in the OS.

   If connection to the server is lost while configuring the network in the OS, {linkto(../../connect/console#bare-metal-connect-console)[text=connect]} to the server via the VNC console.

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Combining network interfaces into a LAG interface)[id=bare-metal-network-config-aggregate]}

Several network interfaces of a server (`nic`) can be combined into an aggregated interface (LAG interface). Each network interface participating in a LAG interface is connected to two different switches, which provides network redundancy at the L2 link level.

After combining, you cannot configure the network configuration on individual interfaces. Instead, the configuration of the LAG interface is configured.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Bare Metal** → **Servers** section.
1. In the list of Bare Metal servers, click ![ ](../../../../assets/more-icon.svg "inline") for the desired server.
1. Select **Configure network settings**.
1. Create a LAG interface in one of the following ways.

   - In the **Network interfaces** block, click **Add to aggregate** for the desired interface.

     If the server configuration does not yet have any LAG interfaces, the LAG interface `bond0` is created immediately, and this interface is added to it.
     If at least one LAG interface already exists, a selection window opens, in which you can add the interface to an existing LAG interface or create a new one.

   - In the **Aggregation** block, click **Add aggregate** and add the desired network interfaces to it by clicking **Add to aggregate** for the desired interfaces in the **Network interfaces** block, as described above.

   To create a LAG interface, you must add at least two network interfaces to it.

1. Click **Save**.

{/tab}

{/tabs}
