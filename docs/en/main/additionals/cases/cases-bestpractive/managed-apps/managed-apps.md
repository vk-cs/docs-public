## General guidelines for building fault-tolerant applications

- Separate your application into stateless and stateful components. Plan your application so that any of the components can scale horizontally. Avoid having components that can only scale vertically.
- To organize the interaction of various application components, use load balancers (Load Balancers) and message queues / message brokers (Message Brokers).
- Manage your virtual infrastructure through IaC (using tools like Terraform).
- Avoid manually editing the configuration of services and OS inside the virtual machine. To configure virtual machines, use configuration management systems (Ansible, AWX, Chef, Puppet). This way you can keep track of all configuration changes and manage them effectively.
- Prepare virtual machine images for fast, secure and reproducible virtual infrastructure deployment (Immutable Infrastructure / Immutable Servers approach - read [here](https://martinfowler.com/bliki/ImmutableServer.html), [here](https:// www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure) and [here](https://medium.com/the-cloud-architect/immutable-infrastructure-21f6613e7a23)).
- Improve your application's Observability: Set up end-to-end application monitoring from the infrastructure and operating system level down to the application itself to accurately and quickly identify issues and bottlenecks in your application (read [here](https://www.dynatrace .com/news/blog/what-is-observability-2/)).
- Fault tolerance of virtual infrastructure instances (virtual machines, disks, networks) is already implemented at the platform level. It makes no sense to independently increase the fault tolerance of a virtual infrastructure using the methods used in the physical infrastructure.
- Use domain names to communicate between your application nodes. This way you won't be tied to IP addresses.
  Use S3 storage for long-term storage of large amounts of information or static content ([Cloud Storage](https://mcs.mail.ru/docs/ru/base/s3#) or [Cloud Data Platform] services(https:// mcs.mail.ru/bigdata/)).
- For your application components deployed in [Kubernetes](https://mcs.mail.ru/help/kubernetes/scaling), configure autoscaling. This will ensure that the necessary computing resources are provided during periods of increased load on the application.
- When developing applications, use The Twelve-Factor App methodology (read [here](https://12factor.net/)).
- Review documentation for functionality, features, and limitations of the cloud provider.
- Write to us using the [feedback form](https://mcs.mail.ru/help/contact-us) if you have any questions.

## Security Recommendations

- Use different [private networks](https://mcs.mail.ru/docs/ru/networks/vnet/networks) for different applications within the same project, or deploy each application in its project.
- Use [security groups](https://mcs.mail.ru/docs/ru/networks/vnet/firewall#). Open only those ports that are necessary for your application's components to communicate, as well as ports used for the maintenance and maintenance tasks of your infrastructure and application.
- Expose only endpoints (entry points) of your applications to the Internet. Close access to the infrastructure of your service from the Internet.
- Use a secure VPN channel to network your local resources with resources in the cloud. Read more [here](https://mcs.mail.ru/help/network/vpn).
- Use backup for critical components of your application. Check the integrity of your backups.
- Periodically conduct exercises to restore data from backups.
- Use MFA (Multi-Factor Authentication).
- Connect AntiDDoS and WAF services.

## Availability Zones

To create a fault-tolerant geographically distributed application, host the virtual infrastructure in different availability zones. The Availability Zone in VKCS corresponds to a single Tier III data center. The data centers themselves are connected by optical communication channels with high bandwidth. The use of availability zones is completely transparent for the application: at the level of virtual infrastructure within one project, no additional settings are required to organize the interaction between application components.

To place a virtual machine in a specific availability zone, it is enough to set the appropriate parameter when creating this virtual machine. Host the components of your application on multiple virtual machines distributed across different Availability Zones. In this way, you increase the fault tolerance and availability of your application in the event of a disaster.

## Block devices (Drives)

In the Disks section of the VKCS portal, you can create a virtual block device with the desired disk type, availability zone, and size settings. We recommend that you create a disk in the same Availability Zone as the virtual machine to which it will be attached. This will help to avoid additional network delays (latency) when accessing the disk.

The block device size can be up to 5 TB for the network HDD/SSD drive type. For the High-IOPS SSD drive type, the size limit is 2 TB. If you need a larger block device size on this type of disk, then you should create several High-IOPS SSD virtual block devices with the required total size, connect to a virtual machine and create one partition on them using LVM.

The VKCS platform also has a Low Latency NVME disk type, which is characterized by minimal latency for I / O operations. This type corresponds to physical NVMe disks installed directly in the hypervisor. Due to the additionally applied data abstraction layer, Low Latency NVME disks have all the same advantages as other types of virtual disks.

Disk types differ in the number of IOPS and latency. When choosing a type, start from the IOPS and latency requirements for the specific application that will use this drive. For example, you should not choose the "network HDD" type for busy databases, or choose High-IOPS SSD or Low Latency NVME for unloaded environments. We also do not recommend creating a disk that is significantly larger than the amount of data stored. Otherwise, you will overpay for unused space and performance. If necessary, you can always change the type of an existing disk and increase its size.

You can view available disk types in VKCS and SLA [here](https://mcs.mail.ru/docs/base/iaas/vm-volumes/volume-sla#tipy_diskov).

## Improving DBMS fault tolerance

To increase the fault tolerance of the DBMS installation, we recommend deploying it in a replica-set or cluster configuration. The single node configuration is only suitable for development and testing environments.

Distribute the nodes of the DBMS cluster across different availability zones. So you guarantee the safety of data and the performance of the application in the event of an accident in one of the availability zones. Be sure to set up data backup. It is important to remember that replication is not backup. For storing backups, Cloud Storage is an excellent choice, a fault-tolerant, geo-distributed object storage that runs on the S3 protocol.

On the VKCS platform, you can use popular DBMS for your tasks, which we provide according to the [PaaS] model (https://mcs.mail.ru/databases/). This service has built-in high-availability mechanisms and tools for creating consistent backups.

## Load balancers

A load balancer is an infrastructure component that receives incoming traffic/request and distributes it according to a given balancing method across multiple servers. Servers between which traffic is distributed form a balancing group or pool. The use of load balancers allows you to easily scale the computing resources used, ensure the high availability of your application, and also apply various schemes for deploying new versions of the application without service interruptions.

Distribute VMs in a balancing group approximately equally across Availability Zones. In addition, we recommend keeping such several virtual machines in the balancing group that will allow you to withstand the failure of one or two VMs without degradation in servicing requests to your application.

On the VKCS platform, use our failover LBaaS service as a load balancer. You can find the service setup guide [here](https://mcs.mail.ru/help/network/balancers). After configuring LBaaS, it is recommended to perform load testing, as well as a trial shutdown of the virtual machines included in the balancing group.

## Message queues

A Message Queue is a component that allows different parts of an application to communicate with each other asynchronously. Using them will help increase the reliability and scalability of your application. The message queue is a buffer for temporarily storing messages and endpoints for sending and receiving messages by application components. The message will be held in the queue until another component retrieves it and performs some operation on it. A queue can be used by multiple sources and recipients, but each message is processed by one recipient only once. For a more detailed understanding of why message queues are needed, read [an article on our blog] (https://mcs.mail.ru/blog/zachem-nuzhny-ocheredi-soobshcheniy-v-mikroservisnoy-arkhitekture).

VKCS platform provides a highly available and fault-tolerant [message queue service](https://mcs.mail.ru/blog/zachem-nuzhny-ocheredi-soobshcheniy-v-mikroservisnoy-arkhitekture).
