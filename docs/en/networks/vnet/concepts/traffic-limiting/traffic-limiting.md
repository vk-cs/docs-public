## Using IP Source Guard

For OpenStack ports, you can specify a list of IP addresses to use [IP Source Guard](https://www.juniper.net/documentation/us/en/software/junos/security-services/topics/concept/port-security-ip-source-guard.html).
Only traffic whose source IP address is on this list will be sent through the port. This helps protect against IP spoofing attacks.

For example, you can allow:

- Only traffic from the virtual machine that uses the OpenStack port.
- All traffic that passes through the virtual machine (`0.0.0.0.0\0`). This can be useful when the virtual machine is involved in processing traffic and is an intermediate network node (such as a router, firewall or VPN gateway).

## Use of firewall and security groups

A firewall can be used to restrict traffic on virtual networks.

The firewall handles traffic according to defined security groups. These groups contain rules for handling inbound and outbound traffic and operate according to the "anything not allowed is denied" principle. One or more security groups can be assigned:

- In VK Cloud [personal account](https://mcs.mail.ru/app/en/) (only to OpenStack ports to which virtual machines are associated);
- via the OpenStack CLI (to any OpenStack ports).

You can either create your own security groups or use preconfigured groups that cannot be changed.

For security groups to work correctly:

- Either use them in combination with a `default` security group that allows any outbound traffic.

  This applies to both pre-configured and custom security groups.

- Or configure not only inbound but also outbound rules for them.

## Preconfigured security groups

<warn>

Groups **ssh**, **ssh+www** and **all** become available after [creating virtual machine](/en/base/iaas/instructions/vm/vm-create) with these groups.

</warn>

<tabs>
<tablist>
<tab>default</tab>
<tab>ssh</tab>
<tab>ssh+www</tab>
<tab>rdp</tab>
<tab>rdp+www</tab>
<tab>all</tab>
</tablist>
<tabpanel>

Default security group. This group is assigned to all OpenStack ports created within the network, including:

- ports to which virtual machines and other platform services connect;
- service ports that are created, for example, for a router or load balancer.

<info>

When using the OpenStack CLI, it is possible to create an OpenStack port:

- either with security groups that are different from the default group;
- or no security group at all.

</info>

Allows:

- any outgoing traffic;
- any incoming traffic within a security group.

</tabpanel>
<tabpanel>

A security group that allows SSH traffic.

Allows incoming traffic from any IP addresses on TCP port `22`.

</tabpanel>
<tabpanel>

A security group that allows SSH and HTTP(S)-traffic.

Allows incoming traffic from any IP addresses to TCP ports:

- `22`
- `80`
- `443`

</tabpanel>
<tabpanel>

A security group that allows RDP traffic.

Allows incoming traffic from any IP addresses on TCP port `3389`.

</tabpanel>
<tabpanel>

A security group that allows RDP and HTTP(S)-traffic.

Allows inbound traffic from any IP addresses to TCP ports:

- `3389`
- `80`
- `443`

</tabpanel>
<tabpanel>

Any incoming traffic from any IP addresses is allowed.

</tabpanel>
</tabs>
