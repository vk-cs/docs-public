# {heading(Attaching multiple Floating IP addresses to a single VM)[id=vnet-multiple-floating-ip]}

{include(/en/_includes/_translated_by_ai_en.md)}

By default, when a VM is created, it is assigned one internal IP address. One Floating IP address can be attached to it. To attach multiple Floating IP addresses to a single VM, you need to create additional ports in the subnet, attach them to the VM, and bind a Floating IP address to each port.

## {heading(Preparation steps)[id=vnet-multiple-floating-ip-prep]}

1. Make sure the OpenStack client is {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]}, and {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Select or {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=create]} a virtual machine in your {var(cloud)} project.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-add-net#iaas-vm-add-net-connect)[text=Connect]} the virtual machine to a network. Write down the network and subnet IDs.
1. {linkto(../../instructions/ip/floating-ip#vnet-floating-ip-add)[text=Add]} the required number of Floating IP addresses to the project.

## {heading(1. Create additional ports)[id=vnet-multiple-floating-ip-add-port]}

1. For each additional Floating IP address, {linkto(../../instructions/ports#vnet-ports-add)[text=add a port]} to the virtual machine subnet.

1. Make sure the ports are created:

   ```console
   openstack port list --network <NETWORK_NAME_OR_ID>
   ```

## {heading(2. Attach the ports to the VM)[id=vnet-multiple-floating-ip-connect-port]}

1. Attach the created ports to the VM:

   ```console
   openstack server add port <VM_ID> <PORT_ID>
   ```

1. Make sure the ports are successfully attached to the VM:

   ```console
   openstack port list --server <VM_ID>
   ```

## {heading(3. Bind the Floating IP addresses to the VM ports)[id=vnet-multiple-floating-ip-connect-fip]}

1. {linkto(../../instructions/ip/floating-ip#vnet-floating-ip-associate)[text=Bind]} each free Floating IP address to the corresponding VM port.

1. Make sure the Floating IP addresses are successfully bound to the ports:

   ```console
   openstack floating ip list
   ```

## {heading(4. Configure the network interfaces on the VM)[id=vnet-multiple-floating-ip-interface]}

After the ports are added, additional network interfaces will appear on the VM.

For each new port, {linkto(../../../../computing/iaas/how-to-guides/interface-settings-check#iaas-interface-settings-check)[text=check and configure the network interface]} inside the VM operating system.

## {heading(5. Configure routing)[id=vnet-multiple-floating-ip-routing]}

By default, all outgoing packets are sent through the primary VM interface. Because of this, responses to requests received through the additional interfaces go out through the primary interface, and the Floating IP addresses bound to them do not work.

To make each interface use its own route, configure routing rules (policy routing). For each interface, create a routing table and a rule that routes packets from the IP address of that interface through its gateway.

Below are examples for the `eth1` interface with the internal IP address `10.0.1.97/24` and gateway `10.0.1.1`.

{tabs}

{tab(Ubuntu/Debian)}

1. Add the `routes` and `routing-policy` parameters to the `/etc/netplan/50-cloud-init.yaml` file for each additional interface.

   Example:

   ```yaml
   network:
     version: 2
     ethernets:
       eth0:
         dhcp4: true
       eth1:
         dhcp4: true
         routes:
           - to: 0.0.0.0/0
             via: 10.0.1.1
             table: 101
         routing-policy:
           - from: 10.0.1.97/32
             table: 101
   ```

   For each subsequent interface, use the next table number (102, 103, etc.) and specify the corresponding IP address and gateway.

1. Apply the settings:

   ```console
   sudo netplan apply
   ```

{/tab}

{tab(RHEL)}

1. Create a `/etc/sysconfig/network-scripts/route-<INTERFACE_NAME>` file for each additional interface.

   Example:

   ```ini
   0.0.0.0/0 via 10.0.1.1 dev eth1 table 101
   ```

1. Create a `/etc/sysconfig/network-scripts/rule-<INTERFACE_NAME>` file for each additional interface:

   Example:

   ```ini
   from 10.0.1.97/32 table 101
   ```

1. Restart the network:

   ```console
   sudo systemctl restart network
   ```

{/tab}

{tab(Windows)}

1. Get the interface numbers:

   ```powershell
   Get-NetAdapter | Format-Table Name, InterfaceIndex
   ```

1. For each additional adapter, add a route specifying the gateway and the interface number:

   Example:

   ```powershell
   route add 0.0.0.0 mask 0.0.0.0 10.0.1.1 metric 101 if <INTERFACE_NUMBER>
   ```

{/tab}

{/tabs}

## {heading(6. Verify the availability of the Floating IP addresses)[id=vnet-multiple-floating-ip-verify]}

1. Make sure each Floating IP address is accessible from the outside. Run the check from your computer:

   ```console
   ping <FLOATING_IP_1>
   ping <FLOATING_IP_2>
   ```

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Connect to the VM]}.

1. Make sure each interface has an internal IP address from the subnet:

   {tabs}
   {tab(Linux)}

   ```console
   ip addr show
   ```
   {/tab}

   {tab(Windows)}

   ```powershell
   Get-NetIPAddress -AddressFamily IPv4 | Format-Table InterfaceAlias, IPAddress
   ```
   {/tab}
   {/tabs}

1. Check the connectivity between the Floating IP address and the internal IP address:

   {tabs}
   {tab(Linux)}

   ```console
   curl --interface <INTERFACE_NAME> ifconfig.me
   ```
   {/tab}

   {tab(Windows)}

   ```powershell
   curl.exe --interface <INTERFACE_NAME> ifconfig.me
   ```
   {/tab}
   {/tabs}

   The command will return the Floating IP address bound to that interface.

1. Make sure the routing rules are applied:

   {tabs}
   {tab(Linux)}

   ```console
   ip rule list
   ip route show table <TABLE_NUMBER>
   ```
   {/tab}

   {tab(Windows)}

   ```powershell
   route print
   ```
   {/tab}
   {/tabs}