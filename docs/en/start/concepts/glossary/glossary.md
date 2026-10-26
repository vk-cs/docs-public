# {heading(Terms)[id=start-glossary]}

{include(/en/_includes/_translated_by_ai_en.md)}

{note:info}

More terms can be found in the relevant section:

- {linkto(../../../computing/iaas/concepts#iaas-concepts)[text=Cloud Servers]}.
- {linkto(../../../networks/vnet/concepts#vnet-concepts)[text=Virtual Networks]}.
- {linkto(../../../kubernetes/k8s/reference#k8s-reference)[text=Containers]}.

{/note}

## {heading(Virtual machines (instances))[id=glossary-instances]}

A virtual machine (VM) is a set of resources that emulate the behavior of a real computer. To operate, a virtual machine uses the resources of a physical server (host). One host can host multiple VMs.

## {heading(Configuration templates (flavors))[id=glossary-flavors]}

In {var(cloud)}, the number of processors and the amount of RAM of a VM are set using configuration templates. Users have access to ready-made {linkto(../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=configuration templates]}, as well as individual configurations (on request).

## {heading(Disks (volumes))[id=glossary-volumes]}

A disk on the {var(cloud)} platform is a network block storage device that is connected to a VM. The amount of stored data and the speed of access to it depend on the size and type of the disk.

The {var(cloud)} storage subsystem uses network disks. Fault tolerance of disks, continuous data access, and data safety are ensured by replication.

Network disks can be partitioned and formatted just like regular locally attached drives. The advantage of network disks is that they can be "moved" between VMs located in the same data center.

A virtual machine can have multiple disks connected, but at least one of them must be bootable and contain an installed operating system.

## {heading(Availability zone)[id=glossary-az]}

An availability zone is one or more data centers (DCs) in which cloud infrastructure components can be hosted. In {var(cloud)}, an availability zone corresponds to a separate Tier III data center.

Each zone is isolated from failures in other availability zones. Placing virtual resources across multiple zones ensures fault tolerance and reduces the probability of data loss.

All availability zones of the Moscow region are combined into a fully redundant fiber-optic network that provides high speed and low latency when transferring data between availability zones.

## {heading(Image)[id=glossary-image]}

The configuration and data of a virtual machine are stored as one or more files. These files can be used as an image to run the VM in a local environment or to create a new VM.

On the {var(cloud)} platform, you can create an image based on a VM disk or upload an image file. The resulting image can be used to create a new virtual machine.

## {heading(Load balancer)[id=glossary-lb]}

A load balancer allows distributing incoming traffic across multiple virtual backend servers, thereby ensuring high availability for the services provided by these servers. If one or more servers fail, the traffic will be redirected to the remaining servers. Additionally, a {linkto(../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=separate type]} of load balancer is used to ensure the operation of other platform services.

The {var(cloud)} platform load balancer is built on top of [OpenStack Octavia](https://docs.openstack.org/octavia/latest/), which is based on [HAProxy](http://www.haproxy.org/).

## {heading(Security group)[id=glossary-security-group]}

A security group is a set of configurable rules that regulate network access rights (login via a specific protocol, through a specific port) for specific IP addresses or other security groups.