VPN (Virtual Private Network) is a technology that allows one or more secure network connections to be provided over other networks.

Depending on the protocols used, VPN can:

- Connect different types of endpoints (node-to-node, node-to-network, network-to-network).
- Have different levels of data security.
- Be used for different purposes (user access to corporate networks, unification of remote networks into one infrastructure, etc.).

In VK Cloud, the VPN service (VPNaaS) allows you to create a secure communication tunnel between one or more VK Cloud subnets and the client's remote infrastructure subnets (on-premises) to solve the following tasks:

- Connect the company network to the VK Cloud network to have access to the cloud infrastructure.
- Organize a secure channel for managing the VK Cloud infrastructure (for example, to use telnet together with virtual machines).

The VPN service in VK Cloud is implemented on the basis of [StrongSwan](https://www.strongswan.org) using the IPsec and IKEv1, IKEv2 stack . The following parameters are supported:

- Operating modes: IKEv1, IKEv2 (recommended).
- Authentication: Pre-Shared Key (PSK).
- Diffie-Hellman groups: modp1024 (Group 2), modp1536 (Group 5), modp2048 (Group 14).
- Encryption algorithms: AES-128, AES-192, AES-256, 3DES.
- Hashing: SHA1, SHA256.
- SA lifetime: 3600 seconds (default).

The VPN service is available in both [SDN](../architecture) (Software Defined Network) used in VK Cloud:

- SDN Neutron: VPN can only be connected to a [standard router](../router#standard).
- SDN Sprut: VPN can only be connected to an [advanced router](../router#advanced).

In the Sprut SDN, a VPN can be built between the cloud and the remote infrastructure over an Internet connection or over [Direct Connect](/ru/networks/directconnect). VPN over Direct Connect does not require Internet access from the remote infrastructure and provides the most stable connection.

Read more about setting up a VPN:

- [Managing VPN tunnels in SDN Sprut and SDN Neutron](../../instructions/vpn).
- [Example of creating a VPN tunnel in SDN Neutron](../../how-to-guides/vpn-tunnel).
