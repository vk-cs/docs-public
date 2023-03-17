VPN allows you to organize a tunnel between one or more subnets in VK Cloud and the client's external network. This can be useful in situations where you need to:

- connect the company's network to the cloud network (for example, to have access to the VK Cloud infrastructure);
- arrange a secure channel to manage the VK Cloud infrastructure (for example, to use telnet together with virtual machines).

The VPN service is based on [StrongSwan](https://www.strongswan.org) and allows organizing IPsec tunnels. To link client subnets and cloud subnets:

1. Connect to the router all the cloud networks that you want to be accessible via VPN.

1. Configure this router to access the external network so that you can use its `SNAT` interfaces.

1. Set static routes to the desired client subnets for each connected cloud subnet.

   Write static routes in the settings for each cloud subnet to be accessed through the VPN. This is necessary because the VK Cloud VPN accesses client subnets through the `SNAT` interface:

   ```text
   <client subnet address 1> - <cloud subnet SNAT interface address>

   ...

   <client subnet address N> - <cloud subnet SNAT interface address>
   ```

1. When setting up a VPN connection in VK Cloud, specify the router behind which the cloud subnets you want to access via VPN are placed.

1. Configure the VPN on the client side, taking into account the configuration of the VK Cloud IPsec VPN server, which:

   - works in the `main` mode;
   - supports only authorization by pre-shared key;
   - supports a limited subset of Diffie-Hellman groups.
