## General guidelines for building fault-tolerant applications

- Clearly separate your application into stateless and stateful components. Plan your application so that any of the components can scale horizontally. Avoid having components that can only scale vertically.
- To organize the interaction of various application components, use load balancers (Load Balancers) and message queues / message brokers (Message Brokers).
- Manage your virtual infrastructure through IaC (using tools like Terraform).
- Avoid manually editing the configuration of services and OS inside the virtual machine. To configure virtual machines, use configuration management systems (Ansible, AWX, Chef, Puppet). This way you can keep track of all configuration changes and manage them effectively.
- Prepare virtual machine images for fast, secure and reproducible virtual infrastructure deployment (Immutable Infrastructure / Immutable Servers approach - more information can be found at [Immutable Server](https://martinfowler.com/bliki/ImmutableServer.html), [What is mutable vs Immutable Infrastructure](https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure) and [Immutable Infrastructure](https://medium.com/the-cloud-architect /immutable-infrastructure-21f6613e7a23)).
- Improve your application's Observability: Set up end-to-end application monitoring from the infrastructure and operating system level down to the application itself to accurately and quickly identify problems and bottlenecks in the application (more information can be found on the page [What is Observability]( https://www.dynatrace.com/news/blog/what-is-observability-2/)).
- Fault tolerance of virtual infrastructure instances (virtual machines, disks, networks) is already implemented at the platform level. It makes no sense to independently increase the fault tolerance of a virtual infrastructure using the methods used in the physical infrastructure.
- Use domain names to communicate between your application nodes. This way you won't be tied to IP addresses.
- Use S3 storage for long-term storage of large amounts of information or static content ([Cloud Storage](https://mcs.mail.ru/docs/en/base/s3#) or [Cloud Data Platform] services(https:/ /mcs.mail.ru/bigdata/)).
- For your application components deployed in [Kubernetes](https://mcs.mail.ru/help/kubernetes/scaling), configure autoscaling. This will ensure that the necessary computing resources are provided during periods of increased load on the application.
- When developing applications, apply The Twelve-Factor App methodology (for more information, see [12Factor](https://12factor.net/)).
- Examine the documentation for the functionality, capabilities and limitations of the cloud provider.
- Write to us using the [feedback form](https://mcs.mail.ru/help/contact-us) if you have any questions.

## Security Recommendations

- Use different [private networks](/ru/networks/vnet/networks) for different applications within the same project, or deploy each application in its own project.
- Use [security groups](/en/networks/vnet/firewall#). Open only those ports that are necessary for your application's components to communicate, as well as ports used for the maintenance and maintenance tasks of your infrastructure and application.
- Expose only endpoints (entry points) of your applications to the Internet. Close access to the infrastructure of your service from the Internet.
- Use a secure VPN channel to network your local resources with resources in the cloud. More information can be found on the [VPN documentation] page(https://mcs.mail.ru/help/network/vpn).
- Use backup for critical components of your application. Check the integrity of your backups.
- Periodically conduct exercises to restore data from backups.
- Use MFA (Multi-Factor Authentication).
- Connect AntiDDoS and WAF services.## Availability Zones

To create a fault-tolerant geographically distributed application, host the virtual infrastructure in different availability zones. The availability zone in VK Cloud corresponds to a separate Tier III data center. The data centers themselves are connected by optical communication channels with high bandwidth. The use of availability zones is completely transparent for the application: at the level of virtual infrastructure within one project, no additional settings are required to organize the interaction between application components.

To place a virtual machine in a specific availability zone, it is enough to set the appropriate parameter when creating this virtual machine. Host your application's components on multiple virtual machines distributed across different Availability Zones. In this way, you increase the fault tolerance and availability of your application in the event of a disaster.

## Block Devices (Disks)

In the "Disks" section of the VK Cloud portal, you can create a virtual block device with the required values ​​for the "disk type", "availability zone" and "size" parameters. We recommend that you create a disk in the same Availability Zone as the virtual machine to which it will be attached. This will help to avoid additional network delays (latency) when accessing the disk.

The block device size can be up to 5 TB for the network HDD/SSD drive type. For the High-IOPS SSD drive type, the size limit is 2 TB. If you need a larger block device size on this type of disk, then you should create several High-IOPS SSD virtual block devices with the required total size, connect to a virtual machine and create one partition on them using LVM.

The VK Cloud platform also has a Low Latency NVME disk type, which is characterized by minimal latency for I / O operations. This type corresponds to physical NVMe disks installed directly in the hypervisor. Due to the additional data abstraction layer applied, Low Latency NVME disks have all the same advantages as other types of virtual disks.

Disk types differ in the number of IOPS and latency. When choosing a type, start from the IOPS and latency requirements for the specific application that will use this drive. For example, you should not choose the "network HDD" type for busy databases, or choose High-IOPS SSD or Low Latency NVME for unloaded environments. We also do not recommend creating a disk that is significantly larger than the amount of data stored. Otherwise, you will overpay for unused space and performance. If necessary, you can always change the type of an existing disk and increase its size.

You can view the available disk types in VK Cloud and SLA using them [in the article Types of disks and SLA](https://mcs.mail.ru/docs/base/iaas/vm-volumes/volume-sla#tipy_diskov).

## Improving DBMS fault tolerance

To increase the fault tolerance of the DBMS installation, we recommend deploying it in a replica-set or cluster configuration. The single node configuration is only suitable for development and testing environments.

Распределите ноды кластера СУБД по разным зонам доступности. Так вы гарантируете сохранность данных и работоспособность приложения при аварии в одной из зон доступности. Обязательно настраивайте резервное копирование данных. Важно помнить, что репликация — это не резервное копирование. Для хранения резервных копий отличным выбором будет Cloud Storage — отказоустойчивое, геораспределенное объектное хранилище, работающее по протоколу S3.

На платформе VK Cloud для своих задач вы можете использовать популярные СУБД, которые мы предоставляем по модели [PaaS](https://mcs.mail.ru/databases/). Этот сервис имеет встроенные механизмы high-availability и инструменты создания консистентных резервных копий.

## Балансировщики нагрузки

Балансировщик нагрузки (Load balancer) — это инфраструктурный компонент, который принимает входящий трафик/запрос и распределяет его в соответствии с заданным методом балансировки по нескольким серверам. Серверы, между которыми распределяется трафик, образуют группу или пул балансировки. Применение балансировщиков нагрузки позволяет легко масштабировать используемые вычислительные ресурсы, обеспечить высокую доступность вашего приложения, а также применять различные схемы развертывания новых версий приложения без перерывов в обслуживании.

Распределяйте виртуальные машины в группе балансировки примерно в равном количестве между зонами доступности. Помимо этого, мы рекомендуем держать такое количество виртуальных машин в группе балансировки, которое позволит выдержать отказ одной-двух ВМ без деградации в обслуживании запросов к вашему приложению.

На платформе VK Cloud в качестве балансировщика нагрузки используйте наш отказоустойчивый сервис LBaaS. Руководство по настройке сервиса вы найдете [на странице Балансировщики нагрузки](https://mcs.mail.ru/help/network/balancers). После настройки LBaaS рекомендуется провести нагрузочное тестирование, а также пробное отключение виртуальных машин, входящих в группу балансировки.

## Очереди сообщений

Очередь сообщений (Message Queue) — это компонент, позволяющий различным частям приложения взаимодействовать между собой в асинхронном режиме. Их применение поможет увеличить надежность и масштабируемость вашего приложения. Очередь сообщений представляет собой буфер для временного хранения сообщений и конечные точки для отправки и получения сообщений компонентами приложения. Сообщение будет храниться в очереди, пока другой компонент не извлечет его и не выполнит с ним какую-то операцию. Очередь могут использовать многочисленные источники и получатели, но каждое сообщение обрабатывается одним получателем только один раз. Для более детального понимания, зачем нужны очереди сообщений, читайте [статью в нашем блоге](https://mcs.mail.ru/blog/zachem-nuzhny-ocheredi-soobshcheniy-v-mikroservisnoy-arkhitekture).

Платформа VK Cloud предоставляет сервис высокодоступных и отказоустойчивых [очередей сообщений](https://mcs.mail.ru/blog/zachem-nuzhny-ocheredi-soobshcheniy-v-mikroservisnoy-arkhitekture).
