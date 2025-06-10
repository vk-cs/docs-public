The Cloud Desktop service is based on the VDI (Virtual Desktop Infrastructure) technology and is designed to provide users with desktops created on a remote server and functioning in a virtualized environment.

## What tasks is service suitable for?

The Cloud Desktop service is suitable for creating or upgrading the communication infrastructure of an enterprise or a network of enterprises where different people can use one workplace.

Tasks that the service solves:

- Deployment of desktops and their further administration through pools.
- Managing desktop pools and load balancing in them.
- Organization of remote desktops for users and ensuring continuous access to them.
- Protection of desktops from unauthorized access.

## Service features

- Support for guest operating systems on which cloud desktops will be launched: Windows OS, Linux OS.
- Directory services support: [AD](https://learn.microsoft.com/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview) and [LDAP](https://docs.altlinux.org/archive/2.4/html-single/master/alt-docs-master/ch06s11.html).
- Support for data transmission over the RDP protocol.
- Support for two types of workplaces: personalized and sessional.
- Monitoring the use of peripheral devices.
- Maintenance of more than 1000 simultaneous user connections.
- Creating and configuring VMs on the virtualization platform from a pre-prepared master image.
- Support of fault tolerance mechanisms for servers that provide management, licensing, storage and accounting for configuration changes.

## Role model

The following roles are provided in the service:

- Administrator.

  Manages the service through the VK Cloud [management console](https://msk.cloud.vk.com/app/en). Configures integration with the directory service, creates desktop pools, and assigns desktops to users.

- User.

  End user of cloud desktops. Independently installs a client application to access the desktop.

## Available peripherals

| Peripheral device | Windows OS                         | Linux OS                           |
|-------------------|------------------------------------|------------------------------------|
| Print             | ![](/ru/assets/check.svg "inline") | ![](/ru/assets/check.svg "inline") |
| Files             | ![](/ru/assets/check.svg "inline") | ![](/ru/assets/check.svg "inline") |
| Microphone        | ![](/ru/assets/check.svg "inline") | ![](/ru/assets/check.svg "inline") |
| Clipboard         | ![](/ru/assets/check.svg "inline") | ![](/ru/assets/check.svg "inline") |

The available peripherals are set when [adding](../../instructions/desktops-pool/add) a desktop pool.

## {heading(Network configuration of service)[id=setup_nets]}

The network configuration of the service includes:

- a network for hosting service VMs (virtual machines that constitute the service infrastructure)
- one or more networks for connecting desktop pools

All these networks are connected to the same router with internet access. It is acceptable to host service VMs and any number of desktop pools on the same network.

Automatic and manual modes for setting up the network configuration are supported. The mode is selected at the stage of [configuring a network](../../instructions/config/setup-net) for the service infrastructure and can be changed until you first run desktop pool creation. After that, you will not be able to change the networks setup mode of the service.

### {heading(Automatic networks setup)[id=automatic_net_setup]}

In the automatic mode, the following is specified in the network settings of the Cloud Desktop service:

- a router with internet access that is not connected to any networks
- a range of IP addresses of the required volume

Along with the Cloud Desktop instance, a network is automatically created where all VMs of the instance will be hosted: both service VMs and desktop pools.

### {heading(Manual networks setup)[id=manual_net_setup]}

In the manual mode, you can create various network configurations. You can:

- use the same network to host service VMs and any number of desktop pools, as in the automatic mode
- create a separate network for service VMs and separate networks for each pool
- configure any other combinations

The network for hosting service VMs is specified when [setting up the service infrastructure](../../instructions/config/setup-net), and the network for desktop pools is specified when [creating a pool](../../instructions/desktops-pool/add).

### {heading(Requirements for number of ports)[id=ports_number]}

In the manual mode, you need to control that the requirements for the number of free ports in the networks are met:

- The network for service VMs must have at least 16 free ports.
- The pool network must have no fewer free ports than the sum of the [pool parameters](../../instructions/desktops-pool/add#setup_pool_configuration): **Min number of desktops** and **Hot reserve**. The recommended number of free ports is equal to the maximum number of desktops in the pool, one port per desktop.
- If the network is used for multiple service components, for example, for service VMs and a pool, the required number of ports must be calculated as the sum of the requirements for these components.

The number *P* of free ports is calculated using the formula:

{formula}
P = 2^{32-M}-C-2
{/formula}

Here, *M* is the subnet mask, *C* is the number of ports already created.

<warn>

If the networks are used for other purposes besides the Cloud Desktop instance, the number of free ports on them may change over time. If there are not enough ports, desktops will be created with an error.

</warn>

## What's next?

- [Get acquainted](../glossary) with the basic concepts of the service.
- [Go through](../../quick-start) the Quick start.
