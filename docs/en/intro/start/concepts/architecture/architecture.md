Virtualization, monitoring, container, and data storage services can be deployed in VK Cloud. The architecture is based on four groups of services:

- IaaS services are built on the basis of [OpenStack](https://www.openstack.org/software/) and components of its own design. Manage dynamic resource allocation, scaling, and fault tolerance. Hosted in the same cloud data center with PaaS services.

  <details>
    <summary>List of IaaS services</summary>

  - [Cloud Servers](/en/computing/iaas) (IaaS Compute) — provides virtual machines with the ability to allocate public IP and unlimited traffic of 1 GBit/s (also [available](/en/computing/gpu) virtual machines with NVIDIA GPU). Responsible for virtualization and resource integration, uses the KVM hypervisor.
  - [Cloud Storage](/en/storage/s3) (IaaS Storage) — provides S3-compatible object storage. The workload on the storage is distributed among all storage nodes. You can deploy a storage with a custom architecture.
  - [Cloud Networks](/en/networks/vnet) (IaaS Network) — provides network interaction within the selected [project](/en/tools-for-using-services/account/concepts/projects) using SDN (Software Defined Network) technology. It operates on the basis of OpenStack Neutron and on the basis of proprietary software — Sprut. Includes components:

    - [DNS](/en/networks/dns) — supports public and private DNS, which provides name resolution for VK Cloud platform services.
    - [CDN](/en/networks/cdn) — organizes the transfer of content from your servers to users with minimal delay.
    - [Load Balancer](/en/networks/balancing/concepts/load-balancer) — distributes the load on the infrastructure, providing fault tolerance and flexible scaling of applications.
    - AntiDDoS — filters traffic coming to VK Cloud resources deployed in the project to block DDoS attacks.
    - WAF (Web Application Firewall) — configures incoming and outgoing traffic filtering rules to detect and block network attacks.

  </details>

- PaaS services include open source solutions (Kubernetes) and solutions from technology partners. Built-in monitoring of VK Cloud services and individual entities is supported.

  <details>
    <summary>List of PaaS services</summary>

  - [Cloud Containers](/en/kubernetes/k8s) — allows you to create and manage Kubernetes clusters in which you can run services and applications.
  - [Cloud Databases](/en/dbs/dbaas) — provides scalable DBMS: MySQL, PostgreSQL, Postgres Pro, ClickHouse, MongoDB, Redis, Tarantool, OpenSearch, Arenadata DB based on Greenplum.
  - [Cloud Big Data](/en/data-processing/bigdata) — used for big data analysis based on Arenadata Hadoop, supports scaling.
  - [Cloud Streams](/en//data-processing/cloud-streams) — provides Arenadata Streaming-based clusters for processing streaming data.
  - [Cloud ML Platform](/en/ml/mlplatform) — supports services for a full ML development cycle.
  - [Cloud Voice](/en/ml/cloud-voice) — provides a REST API for speech recognition and synthesis based on machine learning.
  - [Vision](/ru/ml/vision) — provides a REST API for face and object recognition based on machine learning.
  - [Cloud Alerting](/en/monitoring-services/alerting) —  configures notifications about changes in key metrics of VK Cloud services.
  - [Cloud Logging](/en/monitoring-services/logging) — aggregates and analyzes service logs in VK Cloud.
  - [Cloud Monitoring](/en/monitoring-services/monitoring) — provides monitoring of metrics specific to PaaS services, for example, analytics on K8s container feeds, PostgreSQL DBMS transaction statistics.
  - Additional services:

    - [1C:Ready workplace](/en/applications-and-services/1cgrm) — provides resources and software for the deployment of 1C services: Accounting, Salary and Personnel Management, Management of our company.
    - [Marketplace](/ru/applications-and-services/marketplace) — allows you to quickly deploy web development and administration environments based on virtual machines.

  </details>

- Common&Security-services ensure the safe operation of users and support a role model when using VK Cloud resources.

  <details>
    <summary>List of Common&Security Services</summary>

  - [Billing](/en/intro/billing) — keeps records of resource usage and expense control, generates financial reports, provides interaction with payment systems when paying for services.
  - [Audit](/en/monitoring-services/event-log) — generates an audit log of user actions in VK Cloud.
  - IAM — manages authentication and authorization of users and services in conjunction with Keystone.
  - [Cloud Monitoring](/en/monitoring-services/monitoring) — provides monitoring of cloud services and user applications.
  - Keystone — provides API client authentication, service discovery, and distributed multi-tenant authorization.

  </details>

VK Cloud provides [technical support](/en/intro/start/support/support-info) for its services. Partner solutions (for example, AntiDDoS, WAF) are supported jointly with a partner.

The general scheme of VK Cloud components and services is shown below.

![VK Cloud architecture](assets/vkcloud_architecture.png){params[noBorder=true]}

Cloud services are managed using the API. Users interact with the API through one or more [tools](/en/tools-for-using-services):

- VK Cloud management console;
- OpenStack CLI;
- Terraform with a separate provider.

## Fault tolerance

Physical fault tolerance is implemented by placing VK Cloud in three Tier III reliability level data centers in the Russian Federation. With this placement, it is guaranteed to maintain the SLA of data centers of more than 98% with a total [SLA](/en/intro/start/support/sla) of 99.95%.

Network fault tolerance is provided by communication of data centers with routes with a bandwidth of 200 GB/sec. Communication of each server with backbone providers goes through two independent channels, through two routers.

Logical fault tolerance is implemented using availability zones, which are combined into [regions](/en/tools-for-using-services/account/concepts/regions).

<info>

The status of the availability zones, services and infrastructure of VK Cloud can be checked on the [services page status page](https://status.msk.cloud.vk.com).

</info>

### {heading(Availability zones)[id=az]}

Each availability zone has one or more data processing centers (data centers) where cloud infrastructure objects are physically located. In VK Cloud, the availability zone corresponds to a separate Tier III data center. VK Cloud provides availability zones:

- `GZ1`: includes a data center [Goznak](https://tech.goznak.ru/dc-goznak-moscow);

  The address of the data center: Moscow, Mira avenue, 105, building 6.

- `MS1`: includes a data center DataLine NORD4;

  The address of the data center: Moscow, Korovinskoe highway, 41.

- `ME1`: includes a data center «Medvedkovo» Rostelecom-DPC;

  The address of the data center: Moscow, Chermyanskaya st., 4.

- `QAZ`: includes a data center [QazCloud](https://qazcloud.kz/).

  The address of the data center: Republic of Kazakhstan, Akmola region, Kosshy, Republic str. 1.

Each data center is equipped with independent power supply and cooling systems.

Availability zones within a region are connected using a redundant dedicated high-bandwidth and low-latency fiber network for high data transfer rates between zones.

The infrastructure of availability zones MS1 and GZ1 of the Moscow VK Cloud region is [protected](https://cloud.vk.com/cloud-platform/certificates/) in accordance with the Federal Law of the Russian Federation “On Personal Data” No. 152-FZ.

## Security

VK Cloud security is ensured by constant monitoring of VK Cloud services, conducting external audits. VK Cloud participates in the security audit program [HackerOne](https://www.hackerone.com). Infrastructure [certified](https://cloud.vk.com/cloud-platform/certificates/) FSTEC of Russia for working with personal data.

For more information, see the section [Platform security](/en/intro/it-security).

## Migration to VK Cloud

VK Cloud supports migration using [third-party software](../../../migration) or [platform tools](../../../migration/migrate-hystax-mr). The transfer of virtual resources is cheaper due to the implementation of services based on OSS (Open Source Solutions).
