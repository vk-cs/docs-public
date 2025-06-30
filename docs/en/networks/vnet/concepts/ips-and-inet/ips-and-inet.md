## Network addressing

When you create a subnet, you specify:

- subnet name;
- address of the subnet;
- DHCP IP address pool (even if DHCP is disabled for the subnet);
- (optional) static routes in the format `<SUBNET_ADDRESS> - <NEXT_HOP>`.

The following rules apply:

1. If DHCP is enabled for a subnet, two DHCP servers are placed in it and take the first two addresses from the DHCP address pool.

   For example, if a DHCP address pool of `192.168.0.0/24` is set to `192.168.0.11-192.168.0.254`, the DHCP servers will use the ports with addresses `192.168.0.11` and `192.168.0.12`.

1. If a router with a public IP address is connected to the subnet, the `SNAT` port of the router will be assigned a random address from the remaining DHCP IP address pool.

## Internet access

In order for objects in the subnet to have access to the Internet, you need to connect a [router](../router) to the subnet with access to [external network](../net-types#external_net).

Network objects that need a router with external network access:

- VPN tunnel.
- Load balancer with internet access.

For [virtual machine](/en/computing/iaas/concepts/about#virtual_machines) the Internet access can be provided in different ways:

- Connect the VM to an external network. In this way, a subnet and external IP address will be automatically assigned to it.
- Connect the VM to a private subnet that is connected to a router with access to an external network, and assign it a floating IP address. In this way, the IP address can be set manually or automatically.

## {heading(Floating IP address)[id=floating-ip]}

A floating IP address (DNAT) is a static IP address that can be dynamically reassigned between resources in a cloud environment. Floating IP is used through [SDN](../architecture#sdns_used), which allows the network administrator to move IP addresses between devices without having to change the physical or virtual network configuration. This allows you to switch traffic between different servers without changing the configuration of the servers themselves.

Floating IP addresses are used for:

- Ensuring fault tolerance — if the primary server fails, the IP address can be quickly redirected to the backup server, minimizing downtime.

- Load balancing — floating IP addresses can be used to distribute traffic across multiple servers, thereby increasing system performance and reliability.

- Flexible network reconfiguration — in environments with frequently changing requirements, floating IP addresses allow you to quickly redistribute resources without the need to change IP addressing and associated settings.

## {heading(Anycast IP address)[id=anycast-ip]}

{note:warn}

Anycast IP addresses work only in Sprut SDN.

{/note}

The anycast IP service enables building a fault-tolerant infrastructure with optimal routing.

_Anycast_ is a routing method where a single IP address is assigned to multiple servers in different [availability zones](/en/intro/start/concepts/architecture#az). Traffic via the anycast IP address is automatically routed to the nearest or least loaded node based on BGP metrics.

An anycast IP address performs the following tasks:

- Distributes load across servers, ensuring application performance.
- In case of server or availability zone failure, redirects traffic to another server or availability zone, ensuring fault tolerance of the application.

Differences from floating IP address:

[cols="1,2,2", options="header"]
|===
|
|Floating IP address
|Anycast IP address

|What it is bound to
|Bound to the private IP address of a virtual machine, load balancer, or other cloud resource
|Bound to other public IP addresses

|Binding type
|One-to-one
|One-to-many

|Primary purpose
|Local fault tolerance: allows shifting the load to a backup resource instance if the primary one fails
|Regional fault tolerance: automatically redistributes traffic if one of the availability zones fails

|Pre-check
|No pre-check of resource availability, so redistribution takes time
|Performs a pre-check of resource availability, traffic is immediately routed optimally
|===

An anycast IP address can be bound to the following IP addresses:

- Public IP addresses of virtual machines in [external networks](/en/networks/vnet/concepts/net-types#external_net).
- Load balancer IP addresses. The load balancer must be placed in a network with internet access and must not be bound to a [Floating IP address](#floating-ip).
- Interface of an [advanced router](../../concepts/router#advanced) with a public IP address in an external network (the **SNAT** option must be enabled).

Up to 8 IP addresses can be bound to a single anycast IP address, and all IP addresses must be of the same type.

The number of anycast IP addresses per project is limited by [quotas](/en/tools-for-using-services/account/concepts/quotasandlimits#nets).

## Public IP address pool of the internet external network

All projects in SDN Sprut are connected to an external network `internet`.

In all subnets of the external network `internet`:

- DHCP is disabled;

- DNS servers `5.61.237.120` and `5.61.237.127` are used.

<!-- prettier-ignore-start -->
| Subnet name | Subnet address   | Available IP address range    | Gateway         |
| ----------- | ---------------- | ----------------------------- | --------------- |
| ext-sub     | 89.208.216.0/24  | 89.208.216.1–89.208.216.253   | 89.208.216.254  |
| ext-sub2    | 212.111.84.0/22  | 212.111.84.1–212.111.87.253   | 212.111.87.254  |
| ext-sub3    | 90.156.212.0/22  | 90.156.212.1–90.156.215.253   | 90.156.215.254  |
| ext-sub4    | 90.156.216.0/22  | 90.156.216.1–90.156.219.253   | 90.156.219.254  |
| ext-sub5    | 91.219.226.0/23  | 91.219.226.1–91.219.227.253   | 91.219.227.254  |
| ext-sub6    | 83.166.232.0/21  | 83.166.232.1–83.166.239.253   | 83.166.239.254  |
| ext-sub7    | 83.166.248.0/21  | 83.166.248.1–83.166.255.253   | 83.166.255.254  |
| ext-sub8    | 217.16.16.0/21   | 217.16.16.1–217.16.23.253     | 217.16.23.254   |
| ext-sub9    | 90.156.150.0/23  | 90.156.150.1–90.156.150.254   | 90.156.151.254  |
| ext-sub9    | 217.16.24.0/22   | 217.16.24.1–217.16.27.253     | 217.16.27.254   |
| ext-sub11   | 85.192.32.0/22   | 85.192.32.1–85.192.35.253     | 85.192.35.254   |
| ext-sub12   | 37.139.40.0/22   | 37.139.40.1–37.139.43.253     | 37.139.43.254   |
| ext-sub13   | 213.219.212.0/22 | 213.219.212.1–213.219.215.253 | 213.219.215.254 |
| ext-sub14   | 146.185.208.0/22 | 146.185.208.1–146.185.211.253 | 146.185.211.254 |
| ext-sub15   | 89.208.220.0/22  | 89.208.220.1–89.208.223.253   | 89.208.223.254  |
| ext-sub16   | 89.208.208.0/22  | 89.208.208.1–89.208.211.253   | 89.208.211.254  |
| ext-sub17   | 109.120.188.0/22 | 109.120.188.1–109.120.191.253 | 109.120.191.254 |
| ext-sub18   | 185.86.144.0/22  | 185.86.144.1–185.86.147.253   | 185.86.147.254  |
| ext-sub19   | 89.208.228.0/22  | 89.208.228.1–89.208.231.253   | 89.208.231.254  |
| ext-sub20   | 109.120.180.0/22 | 109.120.180.1–109.120.183.25  | 109.120.183.254 |
| ext-sub21   | 185.241.192.0/22 | 185.241.192.1–185.241.195.253 | 185.241.195.254 |
| ext-sub22   | 94.139.244.0/22  | 94.139.245.0–94.139.247.253   | 94.139.247.254  |
| ext-sub23   | 89.208.196.0/22  | 89.208.196.1–89.208.199.253   | 89.208.199.254  |
| ext-sub24   | 5.188.140.0/22   | 5.188.140.1–5.188.143.253     | 5.188.143.254   |
| ext-sub25   | 212.233.96.0/22  | 212.233.96.1–212.233.99.253   | 212.233.99.254  |
| ext-sub26   | 95.163.212.0/22  | 95.163.212.1–95.163.215.253   | 95.163.215.254  |
| ext-sub27   | 212.233.120.0/22 | 212.233.120.1–212.233.123.253 | 212.233.123.254 |
| ext-sub28   | 212.233.72.0/21  | 212.233.72.1–212.233.79.253   | 212.233.79.254  |
| ext-sub29   | 89.208.84.0/22   | 89.208.84.1–89.208.87.253     | 89.208.87.254   |
| ext-sub30   | 185.130.112.0/22 | 185.130.112.1–185.130.115.253 | 185.130.115.254 |
| ext-sub31   | 87.239.104.0/21  | 87.239.104.1–87.239.111.253   | 87.239.111.254  |
| ext-sub32   | 146.185.240.0/22 | 146.185.240.1–146.185.243.253 | 146.185.243.254 |
| ext-sub33   | 95.163.180.0/23  | 95.163.180.1–95.163.181.253   | 95.163.181.254  |
| ext-sub34   | 84.23.52.0/22    | 84.23.52.1–84.23.55.253       | 84.23.55.254    |
| ext-sub35   | 95.163.248.0/22  | 95.163.248.10–95.163.251.250  | 95.163.251.254  |
| ext-sub36   | 79.137.174.0/23  | 79.137.174.5–79.137.175.253   | 79.137.175.254  |
| ext-sub37   | 37.139.32.0/22   | 37.139.32.1–37.139.35.253     | 37.139.35.254   |
| ext-sub38   | 212.233.88.0/21  | 212.233.88.1–212.233.95.253   | 212.233.95.254  |
| ext-sub39   | 95.163.208.0/22  | 95.163.208.1–95.163.211.253   | 95.163.211.254  |
| ext-sub40   | 95.163.182.0/23  | 95.163.182.1–95.163.183.253   | 95.163.183.254  |
<!-- prettier-ignore-end -->

## Public IP address pool of the ext-net external network

All projects in SDN Neutron are connected to an external network `ext-net`.

On all subnets of the external network `ext-net`:

- DHCP is disabled;
- DNS servers `5.61.237.120` and `5.61.237.127` are used.

<!-- prettier-ignore-start -->
| Subnet name  | Subnet address   | Available IP address range    | Gateway         |
| ------------ | ---------------- | ----------------------------- | --------------- |
| ext-subnet1  | 95.163.248.0/22  | 95.163.248.10–95.163.251.250  | 95.163.251.254  |
| ext-subnet2  | 79.137.174.0/23  | 79.137.174.5–79.137.175.253   | 79.137.175.254  |
| ext-subnet4  | 95.163.212.0/22  | 95.163.212.1–95.163.215.253   | 95.163.215.254  |
| ext-subnet5  | 95.163.208.0/22  | 95.163.208.1–95.163.211.253   | 95.163.211.254  |
| ext-subnet6  | 95.163.180.0/23  | 95.163.180.1–95.163.181.253   | 95.163.181.254  |
| ext-subnet7  | 89.208.84.0/22   | 89.208.84.1–89.208.87.253     | 89.208.87.254   |
| ext-subnet8  | 89.208.196.0/22  | 89.208.196.1–89.208.199.253   | 89.208.199.254  |
| ext-subnet9  | 95.163.182.0/23  | 95.163.182.1–95.163.183.253   | 95.163.183.254  |
| ext-subnet10 | 85.192.32.0/22   | 85.192.32.1–85.192.35.253     | 85.192.35.254   |
| ext-subnet11 | 89.208.208.0/22  | 89.208.208.1–89.208.211.253   | 89.208.211.254  |
| ext-subnet12 | 89.208.220.0/22  | 89.208.220.1–89.208.223.253   | 89.208.223.254  |
| ext-subnet13 | 213.219.212.0/22 | 213.219.212.1–213.219.215.253 | 213.219.215.254 |
| ext-subnet14 | 89.208.228.0/22  | 89.208.228.1–89.208.231.253   | 89.208.231.254  |
| ext-subnet15 | 185.241.192.0/22 | 185.241.192.1–185.241.195.253 | 185.241.195.254 |
| ext-subnet17 | 87.239.104.0/21  | 87.239.104.1–87.239.111.253   | 87.239.111.254  |
| ext-subnet18 | 185.86.144.0/22  | 185.86.144.1–185.86.147.253   | 185.86.147.254  |
| ext-subnet19 | 37.139.32.0/22   | 37.139.32.1–37.139.35.253     | 37.139.35.254   |
| ext-subnet20 | 37.139.40.0/22   | 37.139.40.1–37.139.43.253     | 37.139.43.254   |
| ext-subnet21 | 146.185.240.0/22 | 146.185.240.1–146.185.243.253 | 146.185.243.254 |
| ext-subnet22 | 5.188.140.0/22   | 5.188.140.1–5.188.143.253     | 5.188.143.254   |
| ext-subnet23 | 146.185.208.0/22 | 146.185.208.1–146.185.211.253 | 146.185.211.254 |
| ext-subnet24 | 84.23.52.0/22    | 84.23.52.1–84.23.55.253       | 84.23.55.254    |
| ext-subnet25 | 109.120.180.0/22 | 109.120.180.1–109.120.183.253 | 109.120.183.254 |
| ext-subnet26 | 109.120.188.0/22 | 109.120.188.1–109.120.191.253 | 109.120.191.254 |
| ext-subnet27 | 185.130.112.0/22 | 185.130.112.1–185.130.115.253 | 185.130.115.254 |
| ext-subnet28 | 94.139.244.0/22  | 94.139.245.0–94.139.247.253   | 94.139.247.254  |
| ext-subnet29 | 212.233.88.0/21  | 212.233.88.1–212.233.95.253   | 212.233.95.254  |
| ext-subnet30 | 212.233.72.0/21  | 212.233.72.1–212.233.79.253   | 212.233.79.254  |
| ext-subnet31 | 212.233.96.0/22  | 212.233.96.1–212.233.99.253   | 212.233.99.254  |
| ext-subnet32 | 212.233.120.0/22 | 212.233.120.1–212.233.123.253 | 212.233.123.254 |
| ext-subnet33 | 89.208.216.0/24  | 89.208.216.1–89.208.216.253   | 89.208.216.254  |
| ext-subnet34 | 212.111.84.0/22  | 212.111.84.1–212.111.87.253   | 212.111.87.254  |
| ext-subnet35 | 90.156.212.0/22  | 90.156.212.1–90.156.215.253   | 90.156.215.254  |
| ext-subnet36 | 90.156.216.0/22  | 90.156.216.1–90.156.219.253   | 90.156.219.254  |
| ext-subnet37 | 91.219.226.0/23  | 91.219.226.1–91.219.227.253   | 91.219.227.254  |
| ext-subnet38 | 83.166.232.0/21  | 83.166.232.1–83.166.239.253   | 83.166.239.254  |
| ext-subnet39 | 83.166.248.0/21  | 83.166.248.1–83.166.255.253   | 83.166.255.254  |
| ext-subnet40 | 217.16.16.0/21   | 217.16.16.1–217.16.23.253     | 217.16.23.254   |
| ext-subnet41 | 217.16.24.0/22   | 217.16.24.1–217.16.27.253     | 217.16.27.254   |
| ext-subnet42 | 90.156.150.0/23  | 90.156.150.1–90.156.150.254   | 90.156.151.254  |
<!-- prettier-ignore-end -->

## {heading(Shadow port)[id=shadow_port]}

The _Shadow port_ technology allows you to launch Kubernetes clusters in private networks. Usually, Kubernetes needs internet access to get all the information from related services to configure the cluster. Shadow port allows you to connect to VK Cloud internal services without connecting to the internet.

To use the technology for creating a Kubernetes cluster:

1. Contact [technical support](mailto:support@mcs.mail.ru) to connect Shadow port to your project.
1. [Enable](../../instructions/net#creating_network) the **Access to VK Cloud services** option for a network without internet access.
1. [Locate](/en/kubernetes/k8s/instructions/create-cluster) the cluster on this network.
