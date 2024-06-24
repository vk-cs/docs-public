
<warn>

The service is only available in networks created with use of [Neutron SDN](../architecture#sdns_used).

</warn>

VPN allows you to organize a tunnel between one or more VK Cloud subnets and the client network. This can be useful in situations where you need to:

- connect the company's network to the cloud network (for example, to have access to the VK Cloud infrastructure);
- arrange a secure channel to manage the VK Cloud infrastructure (for example, to use telnet together with virtual machines).

The VPN service is based on [StrongSwan](https://www.strongswan.org) and allows organizing IPsec tunnels. To link VK Cloud subnets and client subnets:

1. Connect to [router](../router) all VK Cloud subnets that you want to access via VPN. Networks in [SDN Sprut](../architecture#sdns_used) can only use an advanced router to organize VPN, and networks in [SDN Neutron](../architecture#sdns_used) can only use a standard one.

1. Configure this router to access the [external network](../net-types#external_network) so that you can use its `SNAT` interfaces.

1. Set static routes to the necessary client subnets on the remote site.

   These routes are set in the VK Cloud subnet settings, which must be accessible through the VPN. This is necessary because the VK Cloud VPN accesses client subnets through the `SNAT` interface:

   ```text
   <client subnet address 1> - <VK Cloud subnet's SNAT interface address>

   ...

   <client subnet address N> - <VK Cloud subnet's SNAT interface address>
   ```

1. When setting up a VPN connection in VK Cloud, specify the router behind which the VK Cloud subnets you want to access via VPN are placed.

1. Configure the VPN on the client side, taking into account the configuration of the VK Cloud IPsec VPN server, which:

   - works in the `main` mode;
   - supports only authorization by pre-shared key;
   - supports a limited subset of Diffie-Hellman groups.
