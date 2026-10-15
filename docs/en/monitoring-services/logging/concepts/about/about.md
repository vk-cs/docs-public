## Service Description

Cloud Logging is a service for managing logs from user applications running on VMs and within the {var(cloud)} cloud. It provides a unified cloud interface for collecting, storing, reading, displaying, and processing logs.

The service centralizes logs from the entire product system into a single dashboard, stores records, and enables convenient searching and management. It also aids in monitoring application performance and facilitates debugging when necessary.

Cloud Logging records events triggered via the management console or API. For example, you can identify who disabled a specific server.

The service maintains an event log for:

- Kubernetes clusters with the Fluent Bit addon installed.
- Virtual machines for which logging is enabled at [creation](../../../../computing/iaas/instructions/vm/vm-create) or on which the Fluent Bit agent is later [installed](../../instructions/connect-plugin).
- Databases:
  - PostgreSQL
  - ClickHouse

### Advantages

**Real-time data**. You have access to the logs of all your applications or services in real time.

**Convenient search**. In Cloud Logging, you can search, view and analyze logs using text search with additional filters.

**Flexible settings**. You can customize the service for your tasks using the API for reading and collecting logs. For example, you can set the storage time for logs, set up roles for working with logs.

**Availability and reliability**. We will ensure the operability and fault tolerance of the service and guarantee its availability according to the SLA.

**Safety**. In Cloud Logging, all data is securely protected: we store logs of each application group isolated from each other in the cloud. Tier III level data centers are located in Russia.
