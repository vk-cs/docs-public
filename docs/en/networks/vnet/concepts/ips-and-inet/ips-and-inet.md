## Network addressing

When you create a subnet, you specify:

- subnet name;
- address of the subnet;
- DHCP IP address pool (even if DHCP is disabled for the subnet);
- (optional) static routes in the format `<subnet address> - <next hop>`.

The following rules apply:

1. If DHCP is enabled for a subnet, two DHCP servers are placed in it and take the first two addresses from the DHCP address pool.

   For example, if a DHCP address pool of `192.168.0.0/24` is set to `192.168.0.11-192.168.0.254`, the DHCP servers will use the ports with addresses `192.168.0.11` and `192.168.0.12`.

1. If a router with a public IP address is connected to the subnet, the `SNAT` port of the router will be assigned a random address from the remaining DHCP IP address pool.

## Organizing internet access

In order for objects in the subnet to have access to the Internet, you need to connect a [router](../router) to the subnet with access to [external network](../net-types#external_network).

Network objects that need a router with external network access:

- VPN tunnel.
- Load balancer with internet access.

For [virtual machine](/en/computing/iaas/concepts/about#virtual_machines) the Internet access can be provided in different ways:

- Connect the VM to an external network. In this way, a subnet and external IP address will be automatically assigned to it.
- Connect the VM to a private subnet that is connected to a router with access to an external network, and assign it a floating IP address. In this way, the IP address can be set manually or automatically.

## Floating IP adress

A floating IP address (DNAT) is a static IP address that can be dynamically reassigned between resources in a cloud environment. Floating IP is used through [SDN](../architecture#sdns_used), which allows the network administrator to move IP addresses between devices without having to change the physical or virtual network configuration. This allows you to switch traffic between different servers without changing the configuration of the servers themselves.

Floating IP addresses are used for:

- Ensuring fault tolerance — if the primary server fails, the IP address can be quickly redirected to the backup server, minimizing downtime.

- Load balancing — floating IP addresses can be used to distribute traffic across multiple servers, thereby increasing system performance and reliability.

- Flexible network reconfiguration — in environments with frequently changing requirements, floating IP addresses allow you to quickly redistribute resources without the need to change IP addressing and associated settings.

## Public IP address pool of the internet external network

All projects in SDN Sprut are connected to the external network `internet`.

On all subnets of the external network `internet`:

- DHCP is disabled;
- DNS servers `5.61.237.120` and `5.61.237.127` are used.

<!-- prettier-ignore-start -->
| Subnet name  | Subnet address   | Available IP address range                         | Gateway         |
| ------------ | ---------------- | -------------------------------------------------- | --------------- |
| ext-sub  | 89.208.216.0/24  | 89.208.216.1 - 89.208.216.253                       | 89.208.216.254 |
| ext-sub2  | 212.111.84.0/22  | 212.111.84.1 - 212.111.87.253                        | 212.111.87.254 |
<!-- prettier-ignore-end -->

## Public IP address pool of the ext-net external network

All projects in SDN Neutron are connected to an external network `ext-net`.

On all subnets of the external network `ext-net`:

- DHCP is disabled;
- DNS servers `5.61.237.120` and `5.61.237.127` are used.

<!-- prettier-ignore-start -->
| Subnet name  | Subnet address   | Available IP address range                         | Gateway         |
| ------------ | ---------------- | -------------------------------------------------- | --------------- |
| ext-subnet1  | 95.163.248.0/22  | 95.163.248.10—95.163.251.250                       | 95.163.251.254  |
| ext-subnet2  | 79.137.174.0/23  | 79.137.174.5—79.137.175.253                        | 79.137.175.254  |
| ext-subnet4  | 95.163.212.0/22  | 95.163.212.1—95.163.215.253                        | 95.163.215.254  |
| ext-subnet5  | 95.163.208.0/22  | 95.163.208.1—95.163.211.253                        | 95.163.211.254  |
| ext-subnet6  | 95.163.180.0/23  | 95.163.180.1—95.163.181.253                        | 95.163.181.254  |
| ext-subnet7  | 89.208.84.0/22   | 89.208.84.1—89.208.87.253                          | 89.208.87.254   |
| ext-subnet8  | 89.208.196.0/22  | 89.208.196.1—89.208.199.253                        | 89.208.199.254  |
| ext-subnet9  | 95.163.182.0/23  | 95.163.182.1—95.163.183.253                        | 95.163.183.254  |
| ext-subnet10 | 85.192.32.0/22   | 85.192.32.1—85.192.35.253                          | 85.192.35.254   |
| ext-subnet11 | 89.208.208.0/22  | 89.208.208.1—89.208.211.253                        | 89.208.211.254  |
| ext-subnet12 | 89.208.220.0/22  | 89.208.220.1—89.208.223.253                        | 89.208.223.254  |
| ext-subnet13 | 213.219.212.0/22 | 213.219.212.1—213.219.215.253                      | 213.219.215.254 |
| ext-subnet14 | 89.208.228.0/22  | 89.208.228.1—89.208.231.253                        | 89.208.231.254  |
| ext-subnet15 | 185.241.192.0/22 | 185.241.192.1—185.241.195.253                      | 185.241.195.254 |
| ext-subnet17 | 87.239.104.0/21  | 87.239.104.1—87.239.111.253                        | 87.239.111.254  |
| ext-subnet18 | 185.86.144.0/22  | 185.86.144.1—185.86.147.253                        | 185.86.147.254  |
| ext-subnet19 | 37.139.32.0/22   | 37.139.32.1—37.139.35.253                          | 37.139.35.254   |
| ext-subnet20 | 37.139.40.0/22   | 37.139.40.1—37.139.43.253                          | 37.139.43.254   |
| ext-subnet21 | 146.185.240.0/22 | 146.185.240.1—146.185.243.253                      | 146.185.243.254 |
| ext-subnet22 | 5.188.140.0/22   | 5.188.140.1—5.188.143.253                          | 5.188.143.254   |
| ext-subnet23 | 146.185.208.0/22 | 146.185.208.1—146.185.211.253                      | 146.185.211.254 |
| ext-subnet24 | 84.23.52.0/22    | 84.23.52.1—84.23.55.253                            | 84.23.55.254    |
| ext-subnet25 | 109.120.180.0/22 | 109.120.180.1—109.120.183.253                      | 109.120.183.254 |
| ext-subnet26 | 109.120.188.0/22 | 109.120.188.1—109.120.191.253                      | 109.120.191.254 |
| ext-subnet27 | 185.130.112.0/22 | 185.130.112.1—185.130.115.253                      | 185.130.115.254 |
| ext-subnet28 | 94.139.244.0/22  | 94.139.245.0—94.139.247.253                        | 94.139.247.254  |
| ext-subnet29 | 212.233.88.0/21  | 212.233.88.1—212.233.95.253                        | 212.233.95.254  |
<!-- prettier-ignore-end -->
