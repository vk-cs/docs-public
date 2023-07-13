<info>

More terms can be found in the corresponding section:

- [Cloud computing](/en/base/iaas/concepts/vm-concept).
- [Virtual networks](/en/networks/vnet/concepts).
- [Containers](/en/base/k8s/k8s-reference).

</info>

## Instances

A virtual machine (VM) is a collection of resources that emulate the behavior of a real computer. For its operation, the virtual machine uses the resources of a physical server (host). Multiple VMs can be hosted on the same host.

## Flavors

On the VK Cloud platform, the number of processors and the amount of RAM of the VM are set using flavors. Ready-made flavors are available to users, as well as individual (on request).

By default, [configurations](/en/base/iaas/concepts/vm-concept) Basic, Standard и Advanced are available in the project.

## Volumes

A disk on the VK Cloud platform is a network block storage device that connects to a VM. The amount of stored data and the speed of access to it depends on the size and type of disk.

The VK Cloud disk subsystem uses network drives. Disk fault tolerance, continuous access to data and their safety are ensured by replication.

Network drives can be partitioned and formatted in the same way as regular locally connected drives. The advantage of network drives: they can be “moved” between VMs located in the same data center.

Multiple disks can be attached to a VM, but at least one of them must be bootable and contain the installed operating system.

## Availability zone

An availability zone is one or more data centers in which components of the cloud infrastructure can be placed. In VK Cloud, the availability zone corresponds to a separate Tier III data center.

Each zone is isolated from failures in other availability zones. Placing virtual resources in multiple zones provides fault tolerance and reduces the likelihood of data loss.

## Image

The configuration and data of the virtual machine are stored as one or more files. These files can be used as an image to run a VM in a local environment or to create a new VM.

On the VK Cloud platform, you can create an image based on a VM disk or upload an image file. The resulting image can be used to create a new virtual machine.

## Load balancer

The load balancer allows you to distribute incoming traffic between multiple virtual backend servers and thereby ensure high availability for the services provided by those servers. If one or more servers fail, traffic will be redirected to the remaining servers. Also the separate type of load balancer is used to power other VK Cloud platform services.

The VK Cloud platform load balancer is based on [OpenStack Octavia](https://docs.openstack.org/octavia/latest/), which has [HAProxy](http://www.haproxy.org/) at its core.

## Security group

Security group is a sets of configurable permissive rules that regulate network access rights (login via a specific protocol, through a specific port) for certain IP addresses or other security groups.
