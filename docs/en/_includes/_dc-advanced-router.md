Cloud Direct Connect lets you organize various {linkto(/ru/networks/vnet/concepts/onpremise-connect#vnet-onpremise-connect)[text=connection options]} for a network located in your local infrastructure to the virtual networks of {var(cloud)}. In this example, the connection will be created using a dedicated Cloud Direct Connect communication channel and an advanced router with dynamic routing over the [BGP](https://datatracker.ietf.org/doc/html/rfc1163) protocol.

{note:info}
Using the BGP protocol for this type of connection is not mandatory. Your connection scheme may differ from the one used in this guide.
{/note}

In this configuration, the advanced router is the only router in the project and acts as the gateway for the virtual machines in the network connected to it. This is the simplest way to organize network connectivity with your local infrastructure and is suitable for testing or hosting an application in the cloud that does not require fault-tolerant network connectivity.

The network connectivity diagram looks as follows:

![Network connectivity diagram](/ru/networks/directconnect/how-to-guides/dc-advanced-router/assets/cdc_p1.png){params[noBorder=true]}

Configuration limitations:

- You cannot use a {linkto(/ru/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=floating IP address]}. DNAT (Destination NAT) translation can be configured as an alternative.
- You cannot connect {linkto(/ru/start/concepts/architecture#architecture)[text=PaaS services]}, since their deployment requires internet access through {linkto(/ru/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-internet-address-pool)[text=public IP addresses]} of {var(cloud)}.
- Available only on projects with SDN Sprut.

{note:info}
{var(cloud)} lets you configure various {linkto(/ru/networks/vnet/concepts/onpremise-connect#vnet-onpremise-connect)[text=connection options]} to remote infrastructure. The choice of option depends on the project's SDN, internet access from the remote infrastructure, and the requirements for connection fault tolerance.
{/note}

## {heading(Preparatory steps)[id=directconnect-dc-advanced-router-prep]}

1. {linkto(/ru/tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=Activate API access]}, if you have not done it already.
1. Make sure the OpenStack client {linkto(/ru/tools-for-using-services/cli/openstack-cli#openstack-install)[text=is installed]}, and {linkto(/ru/tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Make sure the [curl](https://curl.se/docs) and [jq](https://jqlang.org) packages are installed on your computer.
1. Select or create a network in your local infrastructure. The network may not have internet access, but it must be connected to a router that:

   - supports connection over the BGP protocol;
   - (optional) supports the BFD protocol: this will reduce the routing recovery time in case of a failure;
   - can be a device or a virtual machine in the customer network.

   Record the following information:

   - the subnet name and IP address;
   - the name of the network the subnet is in;
   - the IP address of a machine in the subnet that will be used to test connectivity between the networks;
   - the name of the BGP router.

   For this example, a network with a Router OS 7.10 (MikroTik) virtual machine acting as the BGP router will be used.

1. Select or {linkto(/ru/networks/vnet/instructions/net#vnet-net-add)[text=create]} a virtual network in your project in {var(cloud)}. The network must not be connected to a router.

   Record the following information:

   - the subnet name and IP address;
   - the name of the network the subnet is in.

1. {linkto(/ru/computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Create a virtual machine]} in the selected network.

   Record the IP address of the VM.
1. {linkto(/ru/networks/directconnect/connect#directconnect-connect)[text=Connect]} to the Cloud Direct Connect service, if you have not done it already.
1. Find out the UUID of the connected network:

   1. [Go to](https://cloud.vk.ru/app/) the {var(cloud)} management console.
   1. Select the project.
   1. Go to the **Virtual networks** → **Networks** section.
   1. In the list of networks, find the network named `external-vni-10XXX`. Here `XXX` is the individual sequence number of your connection.
   1. Save the UUID of this network. In this example, the network interconnect UUID is `b2b8468e-aaaa-bbbb-cccc-327c8c2670d4`.

1. Make sure you have gathered all the information needed for further work.

[cols="1,1,1,1", options="header"]
|===
|Object
|Customer network
|Virtual network
|Cloud Direct Connect network

|Network
|`customer-net`
|`vkcloud-net`
|`external-vni-10XXX`, `b2b8468e-aaaa-bbbb-cccc-327c8c2670d4`

|Subnet
|`customer-subnet`, `10.0.0.0/24`
|`vkcloud-subnet`, `172.17.0.0/24`
|![](/ru/assets/no.svg "inline")

|Virtual machine
|`10.0.0.5`
|`172.17.0.8`
|![](/ru/assets/no.svg "inline")

|BGP router
|`MikroTik`
|![](/ru/assets/no.svg "inline")
|![](/ru/assets/no.svg "inline")
|===

## {heading(1. Add a Cloud Direct Connect subnet)[id=directconnect-dc-advanced-router-add-subnet]}

{linkto(/ru/networks/vnet/how-to-guides/custom-subnet#vnet-custom-subnet)[text=Add]} a subnet with a `/30` mask to the Cloud Direct Connect network. When adding the environment variables, specify the `N_ID="<NETWORK_INTERCONNECT_UUID>"` parameter.

Record the subnet name and CIDR. In this example: `dc-subnet`, `192.168.0.0/30`.

## {heading(2. Add an advanced router)[id=directconnect-dc-advanced-router-add-advanced-router]}

{linkto(/ru/networks/vnet/instructions/advanced-router/manage-advanced-routers#vnet-manage-advanced-routers-add)[text=Create]} an advanced router with the following parameters:

- **Name**: `Advanced router` in this example;
- **SNAT**: the option is disabled.

## {heading(3. Configure the network interfaces of the advanced router)[id=directconnect-dc-advanced-router-network-configure]}

1. {linkto(/ru/networks/vnet/instructions/advanced-router/manage-interfaces#vnet-manage-interfaces-add)[text=Add]} an advanced router interface directed to the virtual network:

   - **Name**: `vkcloud-net-iface`;
   - **Subnet**: `vkcloud-subnet`;
   - **Interface IP address**: `172.17.0.100`.
1. Add an advanced router interface directed to the Cloud Direct Connect network:

   - **Name**: `dc-iface`;
   - **Subnet**: `dc-subnet`;
   - **Interface IP address**: `192.168.0.1`.

## {heading(4. Configure the network interfaces of the customer network's BGP router)[id=directconnect-dc-advanced-router-client-configure]}

1. Add network interfaces:

   - Directed to the Cloud Direct Connect network — `dc-subnet`. This interface will help establish connectivity between {var(cloud)} and the customer network.
   - Directed to the customer network where the BGP router is located. These interfaces are used to connect to resources inside the network. The number of such interfaces depends on the network structure.

   In this example:

   - `192.168.0.2` — the interface to the `dc-subnet` subnet;
   - `10.0.0.15` — the interface to the customer network, to the `10.0.0.5` virtual machine.

1. Configure the interfaces using DHCP.
1. Configure the System ID.
1. Prepare the list of networks for the BGP announcement.
1. (Optional) If the router supports BFD, configure the BFD protocol.

{cut(Example configuration for MikroTik)}

1. To add network interfaces, connect to MikroTik over SSH and run the command:

   ```console
    /ip address add address=192.168.0.2/30 interface ether1
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

## {heading(5. Configure eBGP neighborship for the advanced router)[id=directconnect-dc-advanced-router-ebgp-router]}

To configure connectivity over the BGP protocol, you need to add dynamic routes and specify BGP neighbors. Dynamic routing configuration requires autonomous system numbers — ASNs. Configuration should use private ASN numbers from the `64512`–`65534` range, and the ASN number on the routers in {var(cloud)} and on the remote infrastructure side must differ. The example uses the following numbers:

- `65512` for the `customer-net` network;
- `64512` for the `vkcloud-net` network.

To configure dynamic routes on the advanced router:

1. In the [management console](https://msk.cloud.vk.ru/app/), go to the **Virtual networks** → **Routers** section.
1. Open the added advanced router and go to the **Dynamic routing** tab.
1. Click the **Create BGP router** button.
1. Specify the BGP router parameters:

   - **Name**: `to-MikroTik`;
   - **Router ID**: `192.168.0.1`;
   - **ASN**: `64512`.

1. Click the **Create** button.
1. Open the added BGP router and go to the **BGP neighbors** tab.
1. Add a BGP neighbor. Specify the parameters:

   - **Name**: `MikroTik`;
   - **Remote neighbor**: `192.168.0.2`;
   - **Remote ASN**: `65512`.

1. Click the **Create** button.

Make sure the router has established connectivity with the neighbor: the marker next to the name is green. If you use BFD, make sure the BFD marker is also green.

The advanced router will start sending BGP announcements to its neighbor immediately after the BGP neighborship is successfully negotiated. Go to the **BGP announcements** tab and make sure the router is sending announcements for all the networks its interfaces are directed to:

- `172.17.0.0/24`;
- `192.168.0.0/30`.

Both announcements should have green markers.

## {heading(6. Configure BGP neighborship for the customer network's router)[id=directconnect-dc-advanced-router-bgp-client]}

1. Connect to the router in your local network.
1. Specify the parameters for the BGP protocol connection:

   - local network ASN: `65512`;
   - router ID: `192.168.0.2`;
   - external network ASN: `64512`;
   - BGP neighbor ID: `192.168.0.1`;
   - use BFD.

1. (Optional) Make sure a BFD protocol connection is established.
1. Make sure a connection with the BGP neighbor is established. If the BGP connection is established, the response should contain nonzero `keepalive-time` and `uptime` values.
1. View all available BGP routes. The route list should contain the `172.17.0.0/24` and `192.168.0.0/30` networks.

{cut(Example configuration for MikroTik)}

1. Connect to MikroTik over SSH and run the command:

    ```console
    /routing bgp connection
    add address-families=ip as=65512 local.address=192.168.0.2 .role=ebgp name=bgp-customer output.network=bgp_networks remote.address=192.168.0.1 .as=64512 router-id=192.168.0.2 use-bfd=yes
    ```
1. Make sure a BFD protocol connection is established. Run the command:

   ```console
   /routing bfd session print
   ```

   Example response:

   ```console
      Flags: U - up, I - inactive 
   0 U multihop=no vrf=main remote-address=192.168.0.1%ether1 local-address=192.168.0.2 state=up state-changes=1 uptime=3h27m12s desired-tx-interval=200ms actual-tx-interval=100ms 
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
        remote.address=192.168.0.1 .as=64512 .id=192.168.0.1 .capabilities=mp,rr,gr,as4,ap,err,llgr .hold-time=4m
       .messages=5 .bytes=131 .gr-time=120 .eor=ip
      local.address=192.168.0.2 .as=65512 .id=192.168.0.2 .capabilities=mp,rr,gr,as4 .messages=4 .bytes=105 .eor=""
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
   DAb 172.17.0.0/24  192.168.0.1        20
   D b 192.168.0.0/30 192.168.0.1        20   
   ```

{/cut}

## {heading(7. Configure static routes between the networks)[id=directconnect-dc-advanced-router-static-routs]}

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

      The route list should contain the `10.0.0.0/24` and `192.168.0.0/30` networks.

1. Check the route list for the `10.0.0.5` machine, which is in the `customer-net` customer network. The route list should contain the `172.17.0.0/24` and `192.168.0.0/30` networks.

## {heading(8. Check operability)[id=directconnect-dc-advanced-router-check]}

To verify, send a `ping` or `traceout` to a machine in the opposite network. If you get a response from the other network, the network connectivity setup is correct.

For example, run a ping from the `172.17.0.8` machine in the virtual network to the `10.0.0.5` machine in the customer network:

1. Open a terminal session with the `vkcloud-vm` VM.
1. Ping the internal IP address of the machine in the customer network:

   ```console
   ping 10.0.0.5
   ```

The IP address should respond to the ping.

## {heading(Delete unused resources)[id=directconnect-dc-advanced-router-delete]}

If you no longer need the created resources, delete them:

1. {linkto(/ru/computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=Delete]} the virtual machine.
1. {linkto(/ru/networks/vnet/instructions/router#vnet-router-delete)[text=Delete]} the routers.
1. Delete the {linkto(/ru/networks/vnet/instructions/net#vnet-net-subnet-delete)[text=subnet]} and {linkto(/ru/networks/vnet/instructions/net#vnet-net-delete)[text=network]} in which the VM was placed.
