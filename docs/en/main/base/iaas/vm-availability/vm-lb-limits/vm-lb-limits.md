The load balancers used by VK Cloud Solutions are virtual machines with HAProxy (High-Availability Proxy), that is, with a traffic proxy service that provides high availability.
The list of functions performed by such a balancer includes:

- Custom balancers explicitly created for the application's infrastructure. Incoming traffic in such balancers is redirected to the user application components.
- HA (high availability) balancers -- are created by default during DBMS cluster installations to provide fault tolerance by balancing incoming TCP connections using the round-robin algorithm between cluster members.
- Kubernetes Load Balancer or Ingress Controller. The manifest of such a balancer specifies the rules for connecting to user applications, opening ports, and routing traffic to the corresponding applications. The main functionality is network offloading for applications in Kubernetes pods and providing fault tolerance.

Each load balancer comes in a master/standby configuration and has no limits for the network traffic. All load balancers use SSD disks.

# Bandwidth

For the best load balancer throughput, the following conditions must be met:

- Client service connection version must comply with HTTP/1.1 standard with keep-alive connection type.
- The size of packets transmitted through the balancer is at least 1500mtu.

When all conditions are met, the throughput of load balancers is 1-1.5 Gb / s, with an RPS value of ~ 10000 requests per second.
