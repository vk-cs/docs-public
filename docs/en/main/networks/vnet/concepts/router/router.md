<info>

The ability to exchange traffic across subnets and networks can be affected not only by network topology, but also by firewall security groups.

To simplify the concepts of using the router, it is further assumed that the firewall has no effect on ports. In other words, all traffic between ports is allowed.

</info>

Two ports from different subnets can exchange traffic with each other as long as those subnets belong to the same network. For two ports from different networks to be able to exchange traffic, a router is required.

The router, when created or modified, can be assigned one or more private subnets that it will bind to. Then the ports for the `INTERFACE DISTRIBUTED` device will appear in the list of ports related to these subnets: this is the router's interface in the subnets. Such ports will be assigned IP addresses specified in the subnet settings as gateway addresses.

You can also enable the **External network connection** option when creating or modifying your router. Then the router will be connected to an external `ext-net` network. In doing so, ports for the `SNAT` device will appear in the list of ports relating to subnets connected to the router: this is the router's interface in subnets to perform Source NAT (SNAT) network address translation using the public IP address assigned to the router. This interface is required:

- If you need to give a port from a private subnet that is connected to the router access to the internet.

  This mechanism is useful if you need to give the port access from inside the VK Cloud platform to the internet. For example, a virtual machine connected to such a router will be able to access the internet through the `SNAT` interface (say, to download operating system updates). In this case, this virtual machine will now be accessible from the internet.

- If you want to assign a floating IP-address to a port on a private subnet.

  This can only be done if the external network `ext-net` is accessible from the private subnet. To do this, the router must be connected to the external network.

  This mechanism is useful if you want to be able to access the IP address of the port from the internet. For example, you can assign a public IP address to a port assigned to a virtual machine to connect to it from the internet via SSH.
