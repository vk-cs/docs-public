# {heading(Service network configuration)[id=desktops-nets-config]}

{include(/en/_includes/_translated_by_ai_en.md)}

The network configuration of the Cloud Desktop service includes:

- a network for hosting the service's infrastructure service VMs;
- one or more networks for connecting desktop pools.

All these networks are connected to the same router with internet access. It is allowed to place service VMs and any number of desktop pools in the same network.

Both automatic and manual network configuration modes are supported. The mode is selected at the {linkto(../../../../computing/cloud-desktops/instructions/config/setup-net#desktops-setup-net)[text=network setup]} stage for the service infrastructure and can be changed until you first launch the creation of a desktop pool. After that, it will no longer be possible to change the service network configuration mode.

### {heading(Automatic network configuration)[id=desktops-nets-config-automatic]}

When configuring the network in automatic mode, the following is specified in the Cloud Desktop service network settings:

- a router with internet access, not attached to any networks;
- an IP address range of the required size.

Along with the Cloud Desktop instance, a network is automatically created where all instance VMs will be hosted: both service VMs and desktop pools.

### {heading(Manual network configuration)[id=desktops-nets-config-manual]}

With manual configuration, you can create various network configurations:

- use the same network for connecting service VMs and any number of desktop pools, as in automatic mode;
- create a separate network for service VMs and separate networks for each pool;
- configure any other options.

The network for hosting service VMs is specified during {linkto(../../../../computing/cloud-desktops/instructions/config/setup-net#desktops-setup-net)[text=service infrastructure setup]}, and the networks for desktop pools — when {linkto(../../../../computing/cloud-desktops/instructions/desktops-pool/add#desktops-pool-add)[text=creating a pool]}.

### {heading(Port count requirements)[id=desktops-nets-config-ports]}

With manual configuration, you must independently ensure that the requirements for the number of free ports in networks are met:

- The network for service VMs must have at least 16 free ports.
- The pool network must have at least as many free ports as:

  - the minimum number of desktops, if the pool is personalized;
  - the sum of the minimum number of desktops and the number of desktops in hot standby, if the pool is a session pool.

  The recommended number of free ports equals the maximum number of desktops in the pool, one port per each desktop.

- If a network is used for several service components, for example for service VMs and for a pool, the required number of ports must be calculated as the sum of the requirements for these components.

The number *P* of free ports is calculated by the formula:

{formula}
P = 2^{32-M}-C-2
{/formula}

Here *M* is the subnet mask, *C* is the number of already created ports.

{note:warn}
If the networks are used not only for the Cloud Desktop instance but also for other purposes, the number of free ports in them may change over time. If there are not enough ports, desktops will be created with an error.
{/note}