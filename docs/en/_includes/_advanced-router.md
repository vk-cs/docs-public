{linkto(/ru/networks/vnet/concepts/router#vnet-router-advanced)[text=The advanced router]} lets you link a network located in your local infrastructure with virtual networks and subnets of {var(cloud)} without using a dedicated virtual machine as a router. This simplifies data exchange due to the possibility of dynamic routing over the [BGP](https://datatracker.ietf.org/doc/html/rfc1163) protocol.

To demonstrate advanced router configuration, two independent networks will be linked over the BGP protocol:

- Customer network — the customer's internal network, which may not have internet access.
- Virtual network — located in {var(cloud)} and connected to the platform router.

## {heading(Preparatory steps)[id=includes-advanced-router-prep]}

1. Make sure the OpenStack client {linkto(/ru/tools-for-using-services/cli/openstack-cli#openstack-install)[text=is installed]}, and {linkto(/ru/tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.

1. Select a customer network in your local infrastructure:

   - The network must be connected to a router that:

     - supports connection over the BGP protocol;
     - (optional) can support the BFD protocol: this will reduce the convergence time of routing protocols;
     - can be a device or a virtual machine in the customer network.

   - The network may not have internet access.

   If there is no suitable network, create one.

   Record the following information:

   - the subnet name and IP address;
   - the name of the network the subnet is in;
   - the IP address of a machine in the subnet that will be used to test connectivity between the networks;
   - the name of the BGP router.

   {note:info}
   For this example, a network with a Router OS 7.10 (MikroTik) virtual machine acting as the BGP router will be used.
   {/note}

1. Select or {linkto(/ru/networks/vnet/instructions/net#vnet-net-add)[text=create]} a virtual network with internet access in {var(cloud)}. Use an existing router with a connection to the external network, or {linkto(/ru/networks/vnet/instructions/router#vnet-router-add)[text=create]} a new one.

   Record the following information:

   - the subnet name and IP address;
   - the name of the network the subnet is in;
   - the router name.

1. {linkto(/ru/computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Create a virtual machine]} in the selected network. Add SSH access and disable backups.

   Record the IP address of the VM.

1. Contact [technical support](/en/contacts) to connect a network for organizing a dedicated connection channel (Cloud Direct Connect network) to your project.

   Once the network is provided, record its name as well as the subnet name and IP address.

1. Make sure you have gathered all the information needed for further work.

The example below uses the following data:

[cols="1,1,1,1", options="header"]
|===

|Object
|Customer network
|Virtual network
|Network interconnect

|Network
|`customer-net`
|`vkcloud-net`
|`x-net`

|Subnet
|`customer-subnet`, `10.0.0.0/24`
|`vkcloud-subnet`, `172.17.0.0/24`
|`x-subnet`, `172.20.2.0/24`

|Virtual machine
|`10.0.0.5`
|`172.17.0.8`
|![](/ru/assets/no.svg "inline")

|BGP router
|`MikroTik`
|![](/ru/assets/no.svg "inline")
|![](/ru/assets/no.svg "inline")
|===

The network preparation diagram looks as follows:

![Network preparation diagram](/ru/networks/directconnect/how-to-guides/advanced-router/assets/advanced-router-before.png){params[noBorder=true]}

## {heading(1. Add an advanced router)[id=includes-advanced-router-add-router]}

1. In the [management console](https://msk.cloud.vk.ru/app/), go to the **Virtual networks** → **Routers** section.
1. Click the **Add router** button.
1. Select the **Advanced** type. If the advanced router is not available in the project, contact [technical support](/en/contacts).
1. Enter the router name. In this example — `advanced-router`.
1. Click the **Create** button.

## {heading(2. Configure the network interfaces of the advanced router)[id=includes-advanced-router-network-configure]}

To organize data transfer between the independent networks, you need to add interfaces to the advanced router:

- Directed to the network where the router is located — `vkcloud-net`. These interfaces are used to connect to machines inside the network. The number of such interfaces depends on the network structure.
- Directed to the network interconnect — `x-net`. This interface will help establish connectivity between {var(cloud)} and the customer's local network.

To add interfaces:

1. Go to the router's **Interfaces** tab.
1. Add an interface to the virtual network:

   1. Click the **Add interface** button.
   1. Specify the interface parameters:

      - **Name**: `vkcloud-net-iface`;
      - **Subnet**: `vkcloud-subnet`;
      - **Interface IP address**: `172.17.0.100`.

   1. Click the **Create** button.

1. Add an interface to the network interconnect:

   1. Click the **Add interface** button.
   1. Specify the interface parameters:

      - **Name**: `x-net-iface`;
      - **Subnet**: `x-subnet`;
      - **Interface IP address**: `172.20.2.215`.

   1. Click the **Create** button.

## {heading(3. Configure the network interfaces of the customer network's BGP router)[id=includes-advanced-router-network-client]}

1. Add network interfaces:

   - Directed to the network interconnect — `x-net`. This interface will help establish connectivity between {var(cloud)} and the customer's local network.
   - Directed to the customer network where the BGP router is located. These interfaces are used to connect to resources inside the network. The number of such interfaces depends on the network structure.

   In this example:

   - `172.20.2.204/24` — the interface to the `x-net` network interconnect;
   - `10.0.0.15/24` — the interface to the customer network, to the `10.0.0.5` virtual machine.

1. Configure the interfaces using DHCP.
1. Configure the System ID.
1. Prepare the list of networks for the BGP announcement.
1. (Optional) If the router supports BFD, configure the BFD protocol.

{cut(Example configuration for MikroTik)}

   1. To add network interfaces, connect to MikroTik over SSH and run the command:

      ```console
       /ip address add address=172.20.2.204/24 interface ether1
       /ip address add address=10.0.0.15/24 interface ether2
      ```

   1. Configure the interfaces using DHCP:

      ```console
       /ip dhcp-client
       add add-default-route=no interface=ether1
       add add-default-route=no interface=ether2
      ```

   1. Configure the System ID:

      ```console
       /system identity
       set name=bgp-customer
      ```

   1. Prepare the list of networks for the BGP announcement:

      ```console
       /ip firewall address-list
       add address=10.0.0.0/24 list=bgp_networks
      ```

   1. Configure the BFD protocol:

      ```console
       /routing bfd configuration
       add disabled=no interfaces=ether1
      ```

{/cut}

## {heading(4. Configure BGP neighborship for the advanced router)[id=includes-advanced-router-bgp-router]}

To configure connectivity over the BGP protocol, you need to add dynamic routes and specify BGP neighbors. Dynamic routing requires autonomous system numbers — ASNs. If your network has been assigned an ASN, use it. If no ASN has been assigned, use a number from the `64512`–`65534` range — these numbers can be assigned for private autonomous systems. The example uses the following numbers:

- `65512` for the `customer-net` network;
- `64512` for the `vkcloud-net` network.

To configure dynamic routes for `advanced-router`:

1. In the [management console](https://msk.cloud.vk.ru/app/), go to the **Virtual networks** → **Routers** section.
1. Open the added advanced router and go to the **Dynamic routing** tab.
1. Click the **Create BGP router** button.
1. Specify the BGP router parameters:

   - **Name**: `to-MikroTik`;
   - **Router ID**: `172.20.2.215`;
   - **ASN**: `64512`.

1. Click the **Create** button.
1. Open the added BGP router and go to the **BGP neighbors** tab.
1. Add a BGP neighbor. Specify the parameters:

   - **Name**: `MikroTik`;
   - **Remote neighbor**: `172.20.2.204`;
   - **Remote ASN**: `65512`.

1. Click the **Create** button.

Make sure the router has established connectivity with the neighbor: the marker next to the name is green, and BFD is enabled.

The advanced router will start sending BGP announcements to its neighbor. Go to the **BGP announcements** tab and make sure the router is sending announcements for all the networks its interfaces are directed to:

- `172.17.0.0/24`;
- `172.20.2.0/24`.

Both announcements should have green markers.

## {heading(5. Configure BGP neighborship for the customer network's router)[id=includes-advanced-router-bgp-client]}

1. Connect to the router in your local network.  
1. Specify the parameters for the BGP protocol connection:

   - local network ASN: `65512`;
   - router ID: `172.20.2.204`;
   - external network ASN: `64512`;
   - BGP neighbor ID: `172.20.2.215`;
   - use BFD.

1. (Optional) Make sure a BFD protocol connection is established.
1. Make sure a connection with the BGP neighbor is established. If the BGP connection is established, the response should contain nonzero `keepalive-time` and `uptime` values.
1. View all available BGP routes. The route list should contain the `172.17.0.0/24` and `172.20.2.0/24` networks.

{cut(Example configuration for MikroTik)}

1. Connect to MikroTik over SSH and run the command:

    ```console
    /routing bgp connection
    add address-families=ip as=65512 local.address=172.20.2.204 .role=ebgp name=bgp-customer output.network=bgp_networks remote.address=172.20.2.215 .as=64512 router-id=172.20.2.204 use-bfd=yes
    ```

1. Make sure a BFD protocol connection is established. Run the command:

   ```console
   /routing bfd session print
   ```

   Example response:

   ```console
      Flags: U - up, I - inactive 
   0 U multihop=no vrf=main remote-address=172.20.2.215%ether1 local-address=172.20.2.204 state=up state-changes=1 uptime=3h27m12s desired-tx-interval=200ms actual-tx-interval=100ms 
     required-min-rx=200ms remote-min-rx=10ms multiplier=5 hold-time=1s packets-rx=75343 packets-tx=72203
   ```

1. Make sure the connection with the BGP neighbor is established on the MikroTik side. Run the command:

   ```console
   /routing bgp session print
   ```

   Example response:

   ```console
      Flags: E - established
   0 E name="tw-bgp-mikrotik-1"
        remote.address=172.20.2.215 .as=64512 .id=172.20.2.215 .capabilities=mp,rr,gr,as4,ap,err,llgr .hold-time=4m
       .messages=5 .bytes=131 .gr-time=120 .eor=ip
      local.address=172.20.2.204 .as=65512 .id=172.20.2.204 .capabilities=mp,rr,gr,as4 .messages=4 .bytes=105 .eor=""
        output.procid=20 .network=bgp_networks
       input.procid=20 ebgp
      hold-time=3m keepalive-time=1m uptime=2m51s380ms last-started=aug/28/2023 07:27:15
   ```

1. Run the command to view all MikroTik routes:

   ```console
   /ip route print where bgp
   ```

   Example response:

   ```console
   Flags: D - DYNAMIC; A - ACTIVE; b, y - BGP-MPLS-VPN
   Columns: DST-ADDRESS, GATEWAY, DISTANCE
       DST-ADDRESS    GATEWAY       DISTANCE
   DAb 172.17.0.0/24  172.20.2.215        20
   D b 172.20.2.0/24  172.20.2.215        20   
   ```

{/cut}

## {heading(6. Configure static routes between the networks)[id=includes-advanced-router-static-routs]}

1. Configure a static route from the `vkcloud-net` virtual network to the `customer-net` customer network through the advanced router:

   1. In the [management console](https://msk.cloud.vk.ru/app/), go to the **Virtual networks** → **Networks** section.
   1. Select the `vkcloud-net` network and open the subnet properties.
   1. Select **Show static routes field**.
   1. Specify the route: `10.0.0.0/24 - 172.17.0.100`.
   1. Click the **Save** button.

1. Configure a static route from the `customer-net` customer network to the `vkcloud-net` virtual network through the customer network's BGP router. The route should be to `172.17.0.0/24` through `10.0.0.15`.
1. Reboot the `172.17.0.8` and `10.0.0.5` machines so that the routes appear in their routing table.
1. Make sure the static routes are registered on the `172.17.0.8` VM, which is in the `vkcloud-net` virtual network:

   1. Open a terminal session with the `vkcloud-vm` VM.
   1. Run the command:

       ```console
       ip route
       ```

      The route list should contain the `10.0.0.0/24` and `172.20.2.0/24` networks.

1. Check the route list for the `10.0.0.5` machine, which is in the `customer-net` customer network. The route list should contain the `172.17.0.0/24` and `172.20.2.0/24` networks.

## {heading(7. Check operability)[id=includes-advanced-router-check]}

To verify, send a `ping` or `traceout` to a machine in the opposite network. If you get a response from the other network, the network connectivity setup is correct.

For example, run a ping from the `172.17.0.8` machine in the virtual network to the `10.0.0.5` machine in the customer network:

1. Open a terminal session with the `vkcloud-vm` VM.
1. Ping the internal IP address of the machine in the customer network:

   ```console
   ping 10.0.0.5
   ```

The IP address should respond to the ping.

The diagram of the established interaction between the networks and the machines inside them looks as follows:

![Diagram of interaction between networks](/ru/networks/directconnect/how-to-guides/advanced-router/assets/advanced-router-after.png){params[noBorder=true]}

## {heading(Delete unused resources)[id=includes-advanced-router-delete]}

If you no longer need the created resources, delete them:

1. {linkto(/ru/computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=Delete]} the virtual machine.
1. {linkto(/ru/networks/vnet/instructions/router#vnet-router-delete)[text=Delete]} the routers.
1. Delete the {linkto(/ru/networks/vnet/instructions/net#vnet-net-subnet-delete)[text=subnet]} and {linkto(/ru/networks/vnet/instructions/net#vnet-net-delete)[text=network]} in which the VM was placed.
