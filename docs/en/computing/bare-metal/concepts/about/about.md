# {heading(About the service)[id=bare-metal-about]}

{include(/en/_includes/_translated_by_ai_en.md)}

Bare Metal from {var(cloud)} is a physical server rental service. You can rent a server by choosing one of the ready-made configurations and use this server in the {var(cloud)} cloud infrastructure. <!-- добавить ссылку на статью про конфигурации, когда она будет -->

Unlike the {linkto(../../../../computing/iaas/concepts/about#iaas-about)[text=Cloud Servers]} service, where the resources of a physical server are shared among several virtual machines, in Bare Metal you get the entire server. The resources of the rented server are isolated, and its performance does not suffer from the activity of other virtual machines on the same physical server. This is important for the stable operation of resource-intensive applications. You can deploy your own hypervisor on a Bare Metal server and controllably manage the distribution of the server's resources.

Bare Metal users can install the OS and software they need and configure the system without the restrictions that can be imposed by the cloud virtualization environment.

Bare Metal supports integration with the {var(cloud)} cloud platform, which makes it possible to build a hybrid infrastructure with load distribution between cloud resources and physical servers. A rented physical server is connected to the cloud private network and communicates with other cloud resources in your {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]}.

In cases where a high level of security or compliance with strict regulatory requirements is needed, using dedicated physical servers may be preferable to using virtual machines.

## What tasks the service is suitable for

Examples of Bare Metal server use cases:

- High-performance computing: tasks requiring significant computing power benefit from the absence of virtualization overhead. Several physical servers can be combined into a private high-speed low-latency network to increase computing speed.
- Databases: high-load DBMSs require maximum I/O speed and predictable performance, which is easier to ensure on dedicated servers.
- Business applications: ERP and CRM systems are more efficient and secure to run on dedicated servers. <!-- добавить ссылку на инфо про высокопроизводительные конфигурации, когда она будет -->
- Artificial intelligence: Bare Metal with direct GPU access provides high performance for generative models and machine learning systems.
- Big Data: analytical platforms and frameworks (for example, Hadoop, Spark) can run more efficiently on a dedicated server.
- Game servers, media processing: these tasks are latency-sensitive and require consistently high performance.
- Applications with specific requirements: running legacy applications or specialized software that performs poorly in virtualized environments or has licensing restrictions.

The use of Bare Metal servers is not limited to the examples listed; you can find your own use for the resources of a physical server.