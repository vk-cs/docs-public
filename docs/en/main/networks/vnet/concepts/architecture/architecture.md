## What the service does

Virtual network service consists of two layers:

1. [Software-Defined Network](https://en.wikipedia.org/wiki/Software-defined_networking) (SDN).
1. [Network Function Virtualization](https://en.wikipedia.org/wiki/Network_function_virtualization) (NFV).

On the SDN layer, the service allows you to work with the underlying entities:

- Networks.
- Subnets.
- Ports. An OpenStack port is equivalent to a combination of:

  - A port on a virtual switch connected to a virtual NIC.
  - An IP address from some subnet assigned to this NIC.

On the NFV layer, the following entities are implemented with SDN:

- Routers to connect multiple private networks to each other and to provide internet access.
- Load balancers to distribute incoming traffic across multiple instances of VK Cloud platform services.
- Firewall with rule groups to restrict traffic to specific platform services. Rule groups are assigned at the individual port level.
- VPN for connecting remote network infrastructure with the network created within the platform.

## SDNs used

The Openstack Neutron API is used to work with SDN and NFV objects. Hosted agents receive requests via the API and create or modify objects needed for SDN or NFV.

As an SDN, the VK Cloud platform uses:

- Openstack Neutron.

  It is effective for a small network, but in large networks (thousands and tens of thousands ports) there can be problems:
  
  - With synchronization of multiple agents that do not store their state.
  - With a large number of events due to overcomplicated data transmission layer (dataplane).
  - With the loss of these events in the RabbitMQ queue because of their large number. This queue acts as a transport for service events.

- Sprut, VK Cloud's own SDN, fully compatible with the Openstack Neutron API.

  <info>

  Sprut is in beta-testing stage. To get access to the new SDN service contact [technical support](../../../../../contacts).

  </info>

  It lacks the listed disadvantages of Openstack Neutron. Sprut provides stable operation of networks and network functions on top of these networks on a large scale. Its advantages:

  - It uses the HTTP REST API instead of a message queue.
  - All agents store their current state. Agents receive from the SDN controller the target state they should be in, and bring their state to the required state.
  - A layered architecture was chosen to simplify the data transfer layer and allow for more flexibility.

  To know more about Sprut, watch the [How to choose SDN for high loads](https://www.youtube.com/watch?v=iqSXRZ8b_bk) video.
