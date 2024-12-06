Cloud Networks service allows to work with several network types.

## Standard network

_Standard network_ provides access to the subnets with the private IP addresses and exists within a single project.

The standard network, its subnets and ports [can be managed](../../service-management/) via management console, OpenStack CLI or Terraform.

## {heading(Shared network)[id=shared_net]}

_Shared network_ also provides access to the subnets with the private IP addresses, but exists across several projects.

To create a shared network, you have to create a standard network in one project and then share it with other projects. Only a user with the [role](/en/tools-for-using-services/account/concepts/rolesandpermissions) of the project owner (hereinafter referred to as _network owner_) has the ability to share a network.

A network owner can share the net with any project within one [SDN](../architecture#sdns_used):

- by [unique identifier (PID)](/en/tools-for-using-services/account/service-management/project-settings/manage#getting_project_id) with those projects where this user is also the owner.
- by project ID in OpenStack ([Project ID](/en/tools-for-using-services/api/rest-api/endpoints#getting_project_id)) with any other projects.

The project user with whom the network was shared (hereinafter referred to as _network user_) will receive a message and can accept or decline the invitation to the shared network. The user's decision applies to the entire project: if one user declines the offer to join the network, the network will be unavailable for the entire project.

Network users cannot manage subnets on it, but can create resources, connect services, and manage ports in their project. When connecting some resources, such as load balancers or advanced routers, service ports will be created that belong to the network owner's project and are not visible to network users. The owner of the shared network cannot control such ports; they are connected or disabled only when a service is connected or disabled. To remove a port occupied by a load balancer in a linked project, you must remove the balancer in the linked project.

Only the network owner can disconnect a project from the network. Before disconnecting, the network users must delete all VMs and [PaaS services](/en/intro/start/concepts/architecture) of the project located on the shared network. It is also recommended to remove all file storages, balancers and advanced routers of the project connected to the shared network. Otherwise, the network connectivity between them and the network will remain when the network is disconnected.

Only the owner of the network can delete a shared network. Before deleting, you must disable all ports, including service ports, which are visible only to the network owner. To disable service ports, network users need to remove the services connected to them in their projects.

Shared network access matrix:

[cols="1,2,2", options="header"]
|===
|Action
|Network owner
|Network user

|Viewing a network
|Available
|Available

|Editing a network
|Available
|Not available

|Providing access to other projects to a network
|Available
|Not available

|Disconnecting a project from a network
|Available. If the project has added VM ports or [PaaS services](/en/intro/start/concepts/architecture), an error message will appear. Remove all busy ports.

If the project has file storages, balancers or advanced routers, the shutdown will be performed. At the same time, the services will remain connected to the network, that is, network connectivity between projects will be preserved. It is recommended to remove all file storages, balancers and advanced routers from the disconnected network
|Not available

|Deleting a network
|Available. If there are busy ports on the network (both the network owner's and the network user's projects ), an error message will appear. It is necessary to delete all occupied ports, including service ones
|Not available

|Viewing subnets
|Available
|Available

|Creating, editing, deleting subnets
|Available
|Not available

|Viewing ports
|Available. All ports directed to all projects are visible
|Available. All project ports are visible. Service ports that are created for file storages, balancers and advanced routers are not visible, since they belong to the network owner’s project

|Creating ports
|Available
|Available

|Editing ports
|Available
|Not available

|Deleting ports
|You can only delete ports in your project
|You can only delete ports in your project
|===

## External network

_External network_ (`ext-net`, `internet`) provides access to the subnets with the public IP addresses and exists across all projects. It is used to provide services with the Internet access. See details in the [Network addressing and internet access](../ips-and-inet) section.

It is not possible to edit or delete the subnets of that network. The following operations can be performed via management console, OpenStack CLI or Terraform:

- Assigning the network to a virtual machine.
- Assigning the network for a router external network connection.

## {heading(Service network)[id=service_net]}

_Service network_ provides network connection between VMs and VK Cloud internal resources. For example, using the service network, you can [connect](/en/networks/vnet/how-to-guides/s3-service-net) to Cloud Storage buckets from a VM without Internet access.

The service network does not provide VM access to the Internet or to another VM.

To add a service network to your project, contact [technical support](mailto:support@mcs.mail.ru).
