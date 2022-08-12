It is possible to connect several ports of different networks to virtual machines.

Port — instance virtual network card for which security groups, connected network and DNS name are configured.

## Connecting the network when creating a VM

When creating a virtual machine, it connects to an external network (Ext-net) by default. This means that the virtual machine gets an IP address from a certain range.

You can also create a new network on the fly when creating a virtual machine. In this case, the network parameters can be selected independently.

## Adding a connection after creating a VM

To manage VM network connections [in VK Cloud personal account](https://mcs.mail.ru/app/services/infra/servers/) should:

1. Go to the "Virtual Machines" page of the "Cloud Computing" section.
2. Open the instance card, go to the "Networks" tab. This page displays all network connections.
3. To add a network interface, select "Add Connection" and configure the parameters according to the table:

| Name | Setting the port name |
| --- | --- |
| Network to connect to | Select the subnet to which the port will be connected. |
| DNS name | Is available for private networks. Enter the DNS name by which you can access the instance using private DNS. |
| Set IP address | Selecting an element allows you to enter a specific IP in the "IP address" field. The address must belong to the selected subnet. |
| Firewall settings | Selection of security groups that set traffic rules |

4. After saving the parameters, the network interface will be added to the VM.

## Security Groups

When creating a VM, the security group (Firewall rule, traffic rule) "default" is substituted by default.

The Firewall "default" rule works as follows:

**Incoming traffic**: By default, only incoming traffic from instances belonging to the default security group is allowed. At the same time, traffic from the Internet is not allowed.

**Outgoing traffic**: By default, outgoing traffic is allowed inside the internal network and to the Internet.

## OpenStack CLI

To connect the network to the VM using the OpenStack client, you must:

1. Get a list of networks:

```bash
openstack network list --all
```

2. Get a list of security groups:

```bash
openstack security group list
```

3. Get a list of ports on the network:

```bash
openstack port list --long --network <network ID>
```

4. Create a port:

```bash
openstack port create --network <network ID> <port name>
```

As a result, a port with an IP address and the default security group will be created in the specified network.

It is also possible to create a port with the specified IP address, description, DNS name, security group and [DHCP option](https://github.com/Juniper/contrail-controller/wiki/Extra-DHCP-Options):

```bash
openstack port create --network <network ID> --fixed-ip subnet=<subnet ID>,ip address=<IP address> --description <description> --dns-name <DNS name> --extra-dhcp-option name=time-servers,value=<IP address> --security-group <security group ID> <port name>
```

As a result of executing the command, the description and ID of the port will be received.

Next, you need to attach the port to the instance:

```bash
openstack server add port <instance ID> <port ID>
```

You can view all the ports of the virtual machine with the command:

```bash
openstack port list --server <instance ID>
```
