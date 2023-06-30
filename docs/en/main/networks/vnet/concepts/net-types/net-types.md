The virtual networks service allows to work with several network types.

## Standard network

Standard network provides access to the subnets with the private IP addresses and exists within a single project.

The standard network, its subnets and ports [can be managed](../../operations/) via personal account, OpenStack CLI or Terraform.

## Shared network

Shared network provides access to the subnets with the private IP addresses too, but exists across several projects. Users, who have a cloud infrastructure that is distributed between several projects, can request an access to this network type.

Firstly, a standard network should be created in the owner project. Then this network can be converted to the shared network [via the support request](/en/contacts). The shared network then will be accessible from the one or several dependent projects.

A shared network, its subnets and ports [can be managed](../../operations/) via personal account, OpenStack CLI or Terraform from the owner project. A shared network can be deleted only [via the support request](/en/contacts).

It is possible to view the information about a shared network via personal account from a dependent project, but it is allowed only [to manage ports](../../operations/manage-ports) of the network via OpenStack CLI. Also, it is not possible to connect DB instances or Kubernetes cluster to a shared network from a dependent project.

## External network

External network (`ext-net`) provides access to the subnets with the public IP addresses and exists across all projects. It is used to provide services with the Internet access. See details in the [Network addressing and internet access](../ips-and-inet) section.

It is not possible to edit or delete the subnets of that network. The following operations can be performed via personal account, OpenStack CLI or Terraform:

- Assigning the network to a virtual machine.
- Assigning the network for a router external network connection.
