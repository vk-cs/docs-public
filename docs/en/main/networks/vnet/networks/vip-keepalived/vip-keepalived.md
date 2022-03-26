Initial configuration:

* Subnet 10.0.0.0/24
* VM (virtual machine) backend01 - ip address 10.0.0.11/24
* VM backend02 - ip address 10.0.0.21/24

Under VIP, we plan to use the address 10.0.0.252/24.

<warn>
The IP addresses in the configuration above are used as an example. You will have different IP addresses.
</warn>

All IP addresses must be on the same subnet. You should also note that the VIP does not belong to the range of IP addresses distributed via DHCP in the subnet where we will configure the VIP. A reliable way to avoid this situation is to create a port with an IP address corresponding to its VIP. This can be done in two ways: via openstack-cli and via UI.

## Command to create a port on a subnet via the OpenStack CLI:
```
#> openstack port create --network [network name] --fixed-ip subnet=[subnet name],ip-address=10.0.0.252 vrrp-port-252
```
## Port creation via UI
We go into the settings of the corresponding subnet and click the "Add port" button. In the "Create Port" window that appears, fill in the fields and click the "Create Port" button:

![](./assets/1626275041217-1626275041217.png)

In the list of subnet ports, our port will appear in the "Not connected" state:

![](./assets/1626275083881-1626275083881.png)

Then you need to allow traffic with source IP addresses different from the IP address assigned to this port for the ports (network interfaces) of the virtual machines. To do this, we find the id of the port of the virtual machine with the command:
```
#> openstack port list --server backend01
```
A list of all ports connected to the virtual machine will be displayed. We need the port ID on which we plan to configure the VIP. The next step is to allow outgoing traffic with a source IP address that is different from the VM port IP address:
```
#> openstack port set --allowed-address ip-address=0.0.0.0/0 xxxxyyyy-zzzz-aaaa-bbbb-ccccddddeeee
```
We do the same actions for the backend02 VM.

<warn>
There is one caveat for the IP-address parameter. Suppose a security group is assigned to a port containing a rule linked to this security group itself. In that case, a rule will be **implicitly** added to this group that allows, in addition to traffic from hosts in the security group, also traffic from the IP-address range.
</warn>

After completing the previous steps, proceed to install the keepalived package. Connect to the backend01 and backend02 virtual machines via ssh or the console. We install the keepalived package using the package manager.

## Set configuration
For the backend01 VM, in the /etc/keepalived/keepalived.conf configuration file, write the following configuration:
```
global_defs { router_id BACKEND01
}
 
vrrp_instance VI_252 {
state MASTER interface eth0 virtual_router_id 252
priority 120
advert_int 1 authentication { auth_type PASS auth_pass qweqweqwe
}
 
virtual_ipaddress { 10.0.0.252/24
}
}
```
For the backend02 VM, in the /etc/keepalived/keepalived.conf configuration file, write the following configuration:
```
global_defs { router_id BACKEND02
}
 
vrrp_instance VI_252 {
state BACKUP interface eth0 virtual_router_id 252
priority 90
advert_int 1 authentication { auth_type PASS auth_pass qweqweqwe
}
 
virtual_ipaddress { 10.0.0.252/24
}
}
```
## Start the service
We start the keepalived service on both VMs with the command:
```
#> systemctl start keepalived
```
## Status check
Checking the status of running services
```
#> systemctl status keep alive
```
The service on both VMs must be in the active (running) state. If this is not the case, you need to identify the cause and eliminate it.

We check the presence of VIP on the interface with the command:
```
#> ip a
```
On the network interface eth0 of the backend01 VM, an additional IP address corresponding to the VIP should appear.

## Check configuration
Let's check the operation of our configuration: from any third VM, we will launch a ping to the VIP address, which is assigned to the backend01 VM. Then we stop the keepalived service on backend01, and the VIP must be reassigned to the eth0 interface of the backend02 VM.

We can check this by executing the `ip a` command in the backend02 server console. It should appear in the list of IP addresses assigned to the network interface. In this case, ping from third-party machines will successfully go to the VIP.

Let's start the keepalived service on backend01 again, and the VIP will again be reassigned to the backend01 VM interface.

VIP configured successfully.