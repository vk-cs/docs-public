## {heading(IP Source Guard)[id=source_guard]}

For OpenStack ports, you can specify a list of IP addresses to use [IP Source Guard](https://www.juniper.net/documentation/us/en/software/junos/security-services/topics/concept/port-security-ip-source-guard.html).
Only traffic whose source IP address is on this list will pass through the port. This helps protect against IP spoofing attacks.

For example, you can allow:

- Only traffic from the virtual machine that uses the OpenStack port.
- All traffic that passes through the virtual machine (`0.0.0.0.0\0`). This can be useful when the virtual machine is involved in processing traffic and is an intermediate network node (such as a router, firewall or VPN gateway).

## {heading(Firewall and security groups)[id=secgroups]}

The firewall limits traffic in virtual networks according to specified security groups. These groups contain rules for processing incoming and outgoing traffic and work on the principle "everything that is not allowed is prohibited".

When creating entities in your mamagement console, a security group is assigned to each port. This ensures traffic security within the platform.

A security group is automatically assigned to the following ports:

- Virtual machine ports — default security group.
- Service ports (for example, for a router or load balancer) — default security group.
- PaaS service instances — special security groups that are created automatically.

You can assign multiple security groups to virtual machine ports, including PaaS service instances. You can use other preset groups or create your own groups.

OpenStack CLI and Terraform provide more extensive port management options: you can assign your own security groups to any ports or create and use a port without a security group at all.

## {heading(Default security group)[id=default_sg]}

Only the **default** security group is available in the project from the beginning. This group allows the following traffic:

- All incoming traffic from other ports that have the same security group configured. This rule ensures data exchange between entities within VK Cloud.
- All outgoing traffic.

For example, you can connect to a VM with this security group from VK Cloud, including via the VNC console or from another VM inside the cloud that also has the **default** group connected. But you will not be able to connect to it via SSH, even if it is connected to an external network and has a public IP address.

The **default** group is available in your management console, via the OpenStack CLI and Terraform.

## {heading(Preset security groups)[id=preset_sg]}

In your management console, you can use preset security groups with the following rules:

[cols="1,2,3", options="header"]
|===
|Group name
|Description
|Firewall rules

|**ssh**
|Allows SSH traffic
|Incoming traffic from any IP addresses to the TCP port `22` is allowed

|**ssh+www**
|Allows SSH and HTTP(S) traffic
|Incoming traffic from any IP addresses to the TCP ports is allowed:

- `22`
- `80`
- `443`

|**rdp**
|Allows RDP traffic
|Incoming traffic from any IP addresses to the TCP port `3389` is allowed

|**rdp+www**
|Allows RDP and HTTP(S) traffic
|Incoming traffic from any IP addresses to the TCP ports is allowed:

- `3389`
- `80`
- `443`

|**all**
|Allows all traffic
|Any incoming traffic from any IP addresses is allowed
|===

To use a preset security group, [create a VM](/en/computing/iaas/service-management/vm/vm-create) with this group. After that, the group will appear in the project and will be available even after the VM is deleted.

Preset security groups that can be assigned to VMs depend on the OS image:

- For Linux VMs, the following groups are available: **ssh**, **ssh+www**, **all** (**All allowed**).
- For Windows VMs, the following groups are available: **rdp**, **rdp+www**, **all** (**All allowed**).

<info>

There are no preset groups when working via OpenStack CLI and Terraform. You can create groups with the same rules and use them.

</info>

## {heading(Custom security groups)[id=custom_sg]}

You can create any other traffic restrictions. To do this, [create](../../service-management/secgroups#create_a_security_group) security groups with specific firewall rules and [assign](../../service-management/secgroups#assign_a_rule_group_to_an_instance) them to ports.

For custom security groups to work correctly:

- Either configure not only incoming but also outgoing rules for them.
- Or use them in combination with the default security group, which allows any outgoing traffic.

Management of custom security groups is available in your management console, via OpenStack CLI or Terraform.

You cannot create groups with the same names as [preset groups](#preset_sg) in your management console. You can add these groups to your project only by creating a VM. There are no such restrictions via OpenStack CLI and Terraform: you can create security groups with such names and use them in your project.
