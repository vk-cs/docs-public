Permissions are used to manage access more granularly than the predefined [access roles](/en/access/iam/concepts/roles-reference) allow.

A permission is a granular role: such a role allows a user to perform a specific action within a certain service or set of components:

-   View service information,
-   Create and modify components and resources,
-   Delete components and resources.

## Platform Components (PaaS)

### Infra_modify

Infrastructure management.

Grants the right to modify parameters of infrastructure resources and objects (component `infra`).

### Infra_delete

Infrastructure deletion.

Grants the right to permanently delete infrastructure resources and objects (component `infra`).

### Infra_view

Infrastructure view.

Provides access to view the current state of infrastructure resources and objects (component `infra`).

### containers_modify

Container management.

Allows creating container clusters and related resources.

### containers_delete

Container deletion.

Provides the ability to delete container clusters and related resources.

### containers_view

Container view.

Provides access to view the list of container clusters and their detailed information.

### databases_modify

Database management.

Allows creating databases and data stores.

### databases_delete

Database deletion.

Grants the right to delete databases and clear their storage.

### databases_view

Database view.

Allows viewing the list of available databases and their characteristics.

### gpu_modify

Graphics Accelerator (GPU) management.

Allows connecting graphics accelerators and modifying their parameters.

### gpu_delete

Graphics Accelerator (GPU) deletion.

Grants the right to release and delete graphics accelerator resources.

### gpu_view

Graphics Accelerator (GPU) view.

Grants the right to view information about the availability and status of graphics accelerator resources.

### hotbox_modify

Hotbox component management.

Allows managing settings and objects in the Hotbox hot data storage.

### hotbox_delete

Hotbox component deletion.

Grants the right to delete data and clear space in the Hotbox hot data storage.

### hotbox_view

Hotbox component view.

Provides access to view the contents and structure of the Hotbox hot data storage.

### vision_modify

Computer Vision (Vision) management.

Allows configuring computer vision service parameters and launching processing tasks.

### vision_delete

Computer Vision (Vision) component deletion.

Grants the right to stop services and delete computer vision data.

### vision_view

Computer Vision (Vision) component view.

Grants the right to view analytics results and the operation history of computer vision services.

### marketplace_modify

Application Marketplace (Marketplace) management.

Allows adding items to the application marketplace and modifying parameters of available services in the marketplace catalog.

### marketplace_delete

Deletion from the Application Marketplace (Marketplace).

Grants the right to remove offers and items from the application marketplace catalog.

### marketplace_view

Application Marketplace (Marketplace) components view.

Grants the right to view the showcase of available services and applications.

### mlplatform_modify

ML Platform management.

Allows configuring training environments in the Cloud ML Platform machine learning service.

### mlplatform_delete

Deletion from the ML Platform.

Grants the right to delete models from the Cloud ML Platform machine learning service.

### mlplatform_view

ML Platform view.

Provides access to view the status of projects in the machine learning service and model training results.

### sqs_modify

SQS queue management.

Allows creating and configuring message queue parameters.

### sqs_delete

SQS queue deletion.

Grants the right to delete message queues and clear messages within them.

### sqs_view

SQS queue view.

Grants the right to view the status and message count in message queues.

### grm_modify

GRM component management.

Allows configuring global permission models and access rights within them.

### grm_delete

GRM component deletion.

Grants the right to delete global permission models and reset role management settings.

### grm_view

GRM component view.

Provides access to view the current structure of rights and roles in the system.

### cdn_modify

CDN management.

Allows configuring content delivery zones and CDN caching parameters.

### cdn_delete

CDN deletion.

Grants the right to delete configurations and stop CDN nodes.

### cdn_view

CDN view.

Provides access to traffic statistics and viewing CDN settings.

### service_modify

Component management.

Allows modifying settings of internal platform service components.

### service_delete

Component deletion.

Grants the right to deactivate and delete service components.

### service_view

Component view.

Provides access to view the list of all services and their health statuses.

### nord_modify

Nord component management.

Allows managing advanced platform functions related to resource deployment.

### nord_delete

Nord component deletion.

Grants the right to delete objects and settings of the Nord component.

### nord_view

Nord component view.

Provides access to monitor the status of Nord component services.

### xaas_modify

XaaS component management.

Allows configuring parameters of partner services provided as a service.

### xaas_delete

XaaS component deletion.

Grants the right to delete partner services provided as a service.

### xaas_view

XaaS component view.

Provides access to the list and description of all active XaaS solutions.

### daas_modify

Desktop (DaaS) management.

Allows creating and administering user virtual desktops.

### daas_delete

Desktop (DaaS) deletion.

Grants the right to delete virtual desktop instances.

### daas_view

Desktop (DaaS) view.

Provides access to the list and status information of virtual desktops.

## Organization and Access Management (IAM)

### domain_users_modify

Domain user management.

Allows creating and modifying user accounts within a domain.

### domain_users_delete

Domain user deletion.

Grants the right to delete user accounts in a domain.

### domain_users_view

Domain user view.

Provides access to view the list of all users in the current domain.

### domain_groups_modify

Domain group management.

Allows creating user groups and managing their membership at the domain level.

### domain_groups_delete

Domain group deletion.

Grants the right to delete user groups in a domain.

### domain_groups_view

Domain group view.

Provides access to view the hierarchy and composition of groups in a domain.

### project_modify

Project management.

Allows modifying [project](/en/tools-for-using-services/account/concepts/projects) settings.

### project_delete

Project deletion.

Grants the right to completely delete a [project](/en/tools-for-using-services/account/concepts/projects) with all nested resources.

### project_view

Project view.

Provides access to detailed information about a [project's](/en/tools-for-using-services/account/concepts/projects) parameters and status.

### base_project_modify

Base project management.

Allows modifying the configuration of root (base) project structures.

### base_project_delete

Base project deletion.

Grants the right to delete root (base) project structures.

### base_project_view

Base project view.

Provides access to view information about root (base) project structures.

### quota_modify

Quota management.

Allows modifying quotas and resource consumption limits for a project.

### quota_delete

Quota deletion.

Grants the right to reset or delete resource limits set in a project.

### quota_view

Quota view.

Provides access to view current quotas and limits, as well as the amount of consumed resources.

### domain_modify

Domain management.

Allows modifying global settings and domain isolation parameters.

### domain_delete

Domain deletion.

Grants the right to completely delete the domain structure.

### domain_view

Domain view.

Provides access to view general parameters and identifiers of a domain.

### projects_modify

Projects management.

Allows modifying the list of projects and their global settings.

### projects_delete

Projects deletion.

Grants the right to mass or selective deletion of projects from the list.

### projects_view

Projects view.

Provides access to view the list of all projects in the cloud.

### projects_quota_modify

Project quotas management.

Allows mass modification of resource limits for a group of projects.

### projects_quota_delete

Project quotas deletion.

Grants the right to reset resource limits for selected projects.

### projects_quota_view

Project quotas view.

Provides access to view limits and consumption across all projects.

### users_modify

User management.

Allows creating and editing platform user account data.

### users_delete

User deletion.

Grants the right to delete users from the platform.

### users_view

User view.

Provides access to view the general list of platform users.

### partners_modify

Partner management.

Allows registering partners and modifying their data.

### partners_delete

Partner deletion.

Grants the right to delete partner records from the partner list.

### partners_view

Partner view.

Provides access to view the list and cooperation terms of partners.

## Kubernetes (K8s)

### ics_agent_modify

ICS agent management.

Allows configuring the operation parameters of inventory and data collection agents.

### ics_agent_delete

ICS agent deletion.

Grants the right to deactivate and delete inventory and data collection agents.

### ics_agent_view

ICS agent view.

Provides access to view the status and activity of ICS agents.

### k8s_cluster_modify

Kubernetes cluster management.

Allows creating Kubernetes clusters.

### k8s_cluster_delete

Kubernetes cluster deletion.

Grants the right to completely delete Kubernetes clusters.

### k8s_cluster_view

Kubernetes cluster view.

Provides access to view the status and parameters of all Kubernetes clusters.

### k8s_cluster_management_modify

Kubernetes cluster administration.

Allows modifying deep management settings for Kubernetes environments.

### k8s_cluster_management_delete

Kubernetes administration deletion action.

Grants the right to revoke administrative privileges in Kubernetes.

### k8s_cluster_management_view

K8s administration view.

Provides access to view management settings and rights in Kubernetes clusters.

## Monitoring, Tracing, and Administration

### users_protect_modify

User protection management.

Allows configuring security policies and account protection.

### users_protect_delete

User protection deactivation.

Grants the right to remove security restrictions from users.

### users_protect_view

User protection view.

Provides access to audit the security status of accounts.

### router_without_internet_modify

Router without internet management.

Allows configuring routing within isolated networks.

### router_without_internet_delete

Router without internet deletion.

Grants the right to delete routers in isolated networks.

### router_without_internet_view

Router without internet view.

Provides access to view local routing parameters in isolated networks.

### tracing_trace_modify

Tracing management.

Allows configuring parameters and launching debug request tracing processes.

### tracing_trace_delete

Trace deletion.

Grants the right to delete accumulated trace data.

### tracing_trace_view

Trace view.

Provides access to analyze request paths and monitor traces.

## Core Infrastructure

### barbican_modify

Secrets (Barbican) management.

Allows creating and modifying cryptographic keys.

### barbican_delete

Secrets (Barbican) deletion.

Grants the right to permanently delete secrets and access keys.

### barbican_view

Secrets (Barbican) view.

Provides access to the list and metadata of existing secrets.

### cinder_modify

Disk (Cinder) management.

Allows creating and managing disks.

### cinder_delete

Disk (Cinder) deletion.

Grants the right to delete volumes and clear block devices.

### cinder_view

Disk (Cinder) view.

Provides access to view the list of disks and their characteristics.

### cloudkitty_modify

Billing (Cloudkitty) management.

Allows modifying cost calculation enles and tariff plans.

### cloudkitty_delete

Billing data (Cloudkitty) deletion.

Grants the right to delete cost calculation records.

### cloudkitty_view

Billing (Cloudkitty) view.

Provides access to view cost breakdowns and current tariffs.

### freezer_modify

Backup (Freezer) management.

Allows configuring backup schedules and managing backup creation.

### freezer_delete

Backup deletion.

Grants the right to delete archives and data backups.

### freezer_view

Backup view.

Provides access to the list of available backups and their creation statuses.

### glance_modify

Images (Glance) management.

Allows uploading OS images.

### glance_delete

Image deletion.

Grants the right to delete disk templates and OS images.

### glance_view

Image view.

Provides access to view the catalog of available OS images.

### heat_modify

Orchestration (Heat) management.

Allows deploying infrastructure via templates and modifying resource stack parameters.

### heat_delete

Orchestration template (Heat) deletion.

Grants the right to delete resource stacks.

### heat_view

Orchestration (Heat) view.

Provides access to monitor infrastructure deployment status.

### keystone_modify

Identity (Keystone) management.

Allows managing users in a project.

### keystone_delete

Deletion from Keystone.

Grants the right to delete access subjects and organizational units.

### keystone_view

Identity (Keystone) view.

Provides access to audit roles in a project.

### magnum_modify

Kubernetes cluster (Magnum) management.

Allows managing Kubernetes service infrastructure, creating clusters, and modifying their configuration.

### magnum_delete

Kubernetes cluster (Magnum) deletion.

Grants the right to delete Kubernetes containerization environments at the infrastructure level.

### magnum_view

Kubernetes cluster (Magnum) view.

Provides access to view the status of Kubernetes clusters in the infrastructure.

### manila_modify

File storage (Manila) management.

Allows creating and configuring shared network file storage.

### manila_delete

File storage deletion.

Grants the right to delete shared network file storage.

### manila_view

File storage view.

Provides access to the list and parameters of shared network file storage.

### murano_modify

Application catalog (Murano) management.

Allows adding and configuring application software in the service catalog.

### murano_delete

Deletion from the application catalog (Murano).

Grants the right to delete application software from the service catalog.

### murano_view

Application catalog (Murano) view.

Provides access to select and view ready-made application solutions in the service catalog.

### neutron_modify

Network (Neutron) management.

Allows creating virtual networks, configuring network topology.

### neutron_delete

Network (Neutron) deletion.

Grants the right to delete virtual networks from the network infrastructure.

### neutron_view

Network (Neutron) view.

Provides access to visualize and audit network infrastructure.

### neutron_network_modify

Network (Neutron) management.

Allows modifying parameters of virtual networks and address space.

### neutron_network_delete

Network (Neutron) deletion.

Grants the right to delete individual virtual networks.

### neutron_network_view

Network (Neutron) view.

Provides access to view the list and characteristics of virtual networks.

### neutron_security_modify

Security group management.

Allows creating and editing traffic filtering enles.

### neutron_security_delete

Security group deletion.

Grants the right to delete security groups.

### neutron_security_view

Security group view.

Provides access to view access enles and network restrictions.

### neutron_common_modify

Common network settings management.

Allows modifying common network infrastructure parameters.

### neutron_common_delete

Common network settings deletion.

Grants the right to reset global network configurations.

### neutron_common_view

Common network settings view.

Provides access to view the overall network model of the cloud.

### neutron_mtu_modify

MTU (Neutron) management.

Allows modifying data packet size for network optimization.

### neutron_mtu_delete

MTU (Neutron) deletion.

Grants the right to reset packet performance settings.

### neutron_mtu_view

MTU (Neutron) view.

Provides access to view network performance parameters.

### nova_modify

VM (Nova) management.

Allows managing the lifecycle of virtual machines.

### nova_delete

VM (Nova) deletion.

Grants the right to delete virtual servers.

### nova_view

VM (Nova) view.

Provides access to the list of all instances and viewing their status.

### nova_flavor_extra_specs_modify

Additional configuration template parameter management.

Allows configuring advanced characteristics of VM configuration templates.

### nova_flavor_extra_specs_delete

Additional configuration template parameter deletion.

Grants the right to delete advanced settings of VM configuration templates.

### nova_flavor_extra_specs_view

Additional configuration template parameter view.

Provides access to view advanced settings of VM configuration templates.

### nova_migration_modify

VM migration management.

Allows initiating VM migration between hosts and managing the migration process.

### nova_migration_delete

Migration deletion.

Grants the right to forcibly stop VM migration processes.

### nova_migration_view

VM migration view.

Provides access to view the status and history of VM migration.

### nova_op_modify

VM operations (Nova) management.

Allows managing power and state of VMs.

### nova_op_delete

VM operations (Nova) deletion.

Grants the right to interenpt current VM operations.

### nova_op_view

VM operations (Nova) view.

Provides access to view the history of all actions performed on VMs.

### nova_vm_modify

Virtual machine management.

Allows modifying VM configuration and hardware parameters.

### nova_vm_delete

Virtual machine deletion.

Grants the right to permanently delete VMs.

### nova_vm_view

Virtual machine view.

Provides access to monitor VM operation and status.

### octavia_modify

Load balancer (Octavia) management.

Allows creating load balancers and configuring traffic distribution between instances.

### octavia_delete

Load balancer (Octavia) deletion.

Grants the right to delete load balancers.

### octavia_view

Load balancer (Octavia) view.

Provides access to view load balancer parameters.

### public_dns_modify

Public DNS management.

Allows managing domain zones and [DNS records](/en/networks/dns/publicdns) in external networks.

### public_dns_delete

Public DNS deletion.

Grants the right to delete external [DNS records](/en/networks/dns/publicdns).

### public_dns_view

Public DNS view.

Provides access to view public domain names.

### tuareg_modify

Tuareg component management.

### tuareg_delete

Tuareg component deletion.

### tuareg_view

Tuareg component view.

### vdi_tuareg_modify

Virtual Desktop (Tuareg) management.

Allows configuring and managing remote desktops within the VDI solution.

### vdi_tuareg_delete

Virtual Desktop (Tuareg) deletion.

Grants the right to delete sessions and resources of remote desktops.

### vdi_tuareg_view

Virtual Desktop (Tuareg) view.

Provides access to monitor user activity on remote desktops.

### trove_modify

DBMS (Trove) management.

Allows creating and modifying DBMS instances in DBaaS services.

### trove_delete

DBMS (Trove) deletion.

Grants the right to delete DBMS instances.

### trove_view

DBMS (Trove) view.

Provides access to the list and characteristics of databases.

### trove_datastore_modify

Data type (Trove) management.

Allows managing available versions and types of DBMS.

### trove_datastore_delete

Data type (Trove) deletion.

Grants the right to restrict the list of available DBMS.

### trove_datastore_view

Data type (Trove) view.

Provides access to view supported database technologies.

### network_modify

Network (General) management.

Allows modifying general cloud network connectivity parameters.

### network_delete

Network (General) deletion.

Grants the right to completely clear network objects.

### network_view

Network (General) view.

Provides access to general audit of network infrastructure.

### glance_publish_modify

Image publication management.

Allows modifying other users' access rights to images.

### glance_publish_delete

Image publication cancellation.

Grants the right to revoke access and isolate images.

### glance_publish_view

Image publication view.

Allows viewing access rights to shared system images.

### sdn_crossproject_port_modify

Cross-project port management.

Allows configuring network interaction between different projects.

### sdn_crossproject_port_delete

Cross-project port deletion.

Grants the right to break network connections between projects.

### sdn_crossproject_port_view

Cross-project port view.

Provides access to audit the integration of independent infrastructures (projects).

### mcs_service_id_property_modify

Component ID property management.

Allows editing metadata and identifiers of platform services.

### mcs_service_id_property_delete

Component ID property deletion.

Grants the right to clear the registry of platform service identifiers.

### mcs_service_id_property_view

Component ID property view.

Provides access to view the registry and identifiers of all platform services.

## Data Platform

General management of VK Cloud Data Platform and its components.

### dataplatform_modify

Data Platform management.

Allows comprehensive management of all Data Platform services and infrastructure.

### dataplatform_delete

Data Platform deletion.

Grants the right to completely delete all Data Platform resources and services.

### dataplatform_view

Data Platform view.

Provides access to inventory and view the status of all Data Platform components.

### dp_airflow_modify

Airflow component management.

Allows creating and configuring task orchestration workflows.

### dp_airflow_delete

Airflow component deletion.

Grants the right to delete processes and resources of the Airflow component.

### dp_airflow_view

Airflow component view.

Provides access to view task execution and status of the Airflow component.

### dp_clickhouse_modify

ClickHouse component management.

Allows modifying analytical database clusters ClickHouse.

### dp_clickhouse_delete

ClickHouse component deletion.

Grants the right to delete ClickHouse clusters and data.

### dp_clickhouse_view

ClickHouse component view.

Provides access to view the state and parameters of ClickHouse databases.

### dp_flink_modify

Flink component management.

Allows configuring data stream processing tasks using the [Cloud Flink](/en/data-platform/flink/concepts/about) service.

### dp_flink_delete

Flink component deletion.

Grants the right to stop and delete computational resources of the [Cloud Flink](/en/data-platform/flink/concepts/about) service.

### dp_flink_view

Flink component view.

Provides access to monitor data processing streams in the [Cloud Flink](/en/data-platform/flink/concepts/about) service.

### dp_postgres_modify

PostgreSQL component management.

Allows creating and modifying relational PostgreSQL databases.

### dp_postgres_delete

PostgreSQL component deletion.

Grants the right to delete instances and clear PostgreSQL storage.

### dp_postgres_view

PostgreSQL component view.

Provides access to view characteristics and status of PostgreSQL databases.

### dp_jatoba_modify

Jatoba component management.

Allows creating secured Jatoba-based databases and managing them.

### dp_jatoba_delete

Jatoba component deletion.

Grants the right to delete Jatoba DB instances and resources.

### dp_jatoba_view

Jatoba component view.

Provides access to view the status of the Jatoba DBMS.

### dp_greenplum_modify

Greenplum component management.

Allows configuring and managing massively parallel data warehouses.

### dp_greenplum_delete

Greenplum component deletion.

Grants the right to delete massively parallel data warehouse clusters and clear Greenplum component data.

### dp_greenplum_view

Greenplum component view.

Provides access to view the status and resources of the Greenplum component data warehouse.

### dp_iceberg_metastore_modify

Iceberg Metastore management.

Allows managing catalogs and table metadata in the Cloud Iceberg Metastore service.

### dp_iceberg_metastore_delete

Iceberg Metastore deletion.

Grants the right to clear catalogs and delete metadata in Cloud Iceberg Metastore.

### dp_iceberg_metastore_view

Iceberg Metastore view.

Provides access to view the structure and metadata of tables in Cloud Iceberg Metastore.

### dp_kafka_modify

Kafka component management.

Allows creating topics and configuring message broker parameters in the [Cloud Kafka](/en/data-platform/kafka/concepts/about) service.

### dp_kafka_delete

Kafka component deletion.

Grants the right to delete clusters and topics of the [Cloud Kafka](/en/data-platform/kafka/concepts/about) service.

### dp_kafka_view

Kafka component view.

Provides access to monitor queues and data streams in the [Cloud Kafka](/en/data-platform/kafka/concepts/about) service.

### dp_nifi_modify

NiFi component management.

Allows configuring automated data flows between systems.

### dp_nifi_delete

NiFi component deletion.

Grants the right to stop pipelines and delete NiFi resources.

### dp_nifi_view

NiFi component view.

Provides access to visualize and monitor data flows in NiFi.

### dp_opensearch_modify

OpenSearch component management.

Allows configuring search clusters and data indexing parameters.

### dp_opensearch_delete

OpenSearch component deletion.

Grants the right to delete search clusters and OpenSearch indices.

### dp_opensearch_view

OpenSearch component view.

Provides access to audit and view the status of OpenSearch.

### dp_datahub_modify

DataHub component management.

Allows managing the metadata catalog and data relationships.

### dp_datahub_delete

DataHub component deletion.

Grants the right to delete records and metadata from DataHub.

### dp_datahub_view

DataHub component view.

Provides access to view the registry of metadata records in DataHub.

### dp_redis_modify

Redis component management.

Allows configuring parameters of high-performance in-memory stores.

### dp_redis_delete

Redis component deletion.

Grants the right to delete instances and clear Redis cache.

### dp_redis_view

Redis component view.

Provides access to monitor memory usage and Redis status.

### dp_spark_modify

Spark component management.

Allows configuring resources and launching batch data processing tasks in the Spark on VK Data Platform service.

### dp_spark_delete

Spark component deletion.

Grants the right to stop computational sessions and delete resources of the Spark on VK Data Platform service.

### dp_spark_view

Spark component view.

Provides access to view the history and status of task execution in the Spark on VK Data Platform service.

### dp_mlflow_modify

MLflow component management.

Allows registering models and managing the lifecycle of machine learning experiments.

### dp_mlflow_delete

MLflow component deletion.

Grants the right to delete experiment data and model versions in machine learning.

### dp_mlflow_view

MLflow component view.

Provides access to view experiment metrics and the machine learning model registry.

### dp_jupyterhub_modify

JupyterHub component management.

Allows creating and configuring interactive environments for data analysis.

### dp_jupyterhub_delete

JupyterHub component deletion.

Grants the right to delete servers and workspaces in JupyterHub.

### dp_jupyterhub_view

JupyterHub component view.

Provides access to view active development environments in JupyterHub.

### dp_labelstudio_modify

LabelStudio component management.

Allows creating projects and managing the data labeling process.

### dp_labelstudio_delete

LabelStudio component deletion.

Grants the right to delete projects and labeling results.

### dp_labelstudio_view

LabelStudio component view.

Provides access to monitor the process of preparing and labeling training data.

### dp_trino_modify

Trino component management.

Allows configuring distributed SQL queries to various data sources in the [Cloud Trino](/en/data-platform/trino/concepts/about) service.

### dp_trino_delete

Trino component deletion.

Grants the right to delete computational resources of the [Cloud Trino](/en/data-platform/trino/concepts/about) service.

### dp_trino_view

Trino component view.

Provides access to monitor query execution and status of the [Cloud Trino](/en/data-platform/trino/concepts/about) service.

### dp_tarantool_db_modify

Tarantool DB management.

Allows configuring and managing in-memory databases using the Tarantool component.

### dp_tarantool_db_delete

Tarantool DB deletion.

Grants the right to delete instances and clear Tarantool DB data.

### dp_tarantool_db_view

Tarantool DB view.

Provides access to view the status and performance of Tarantool DB.

### dp_tarantool_cdc_modify

Tarantool CDC management.

Allows configuring data change capture mechanisms for replication using Tarantool CDC.

### dp_tarantool_cdc_delete

Tarantool CDC deletion.

Grants the right to stop capture processes and delete data streams in Tarantool CDC.

### dp_tarantool_cdc_view

Tarantool CDC view.

Provides access to monitor the status of changed data transfer in Tarantool CDC.

### dp_standalone_modify

Standalone component management.

Allows configuring parameters of isolated data platform services.

### dp_standalone_delete

Standalone component deletion.

Grants the right to delete instances of isolated data platform services.

### dp_standalone_view

Standalone component view.

Provides access to inventory isolated data platform services.

## Data Platform Kafka

Permissions in the Data Platform [Cloud Kafka](/en/data-platform/kafka/concepts/about) service.

### dp_kafka_instances_list

View list of Kafka instances.

Allows viewing the list of instances in the [Cloud Kafka](/en/data-platform/kafka/concepts/about) service.

### dp_kafka_instances_view

View Kafka instance properties.

Allows viewing properties of instances in the [Cloud Kafka](/en/data-platform/kafka/concepts/about) service.

### dp_kafka_instances_create

Create Kafka instance.

Allows creating instances in the [Cloud Kafka](/en/data-platform/kafka/concepts/about) service.

### dp_kafka_instances_delete

Delete Kafka instance.

Allows deleting instances from the [Cloud Kafka](/en/data-platform/kafka/concepts/about) service.

### dp_kafka_instances_reboot

Reboot Kafka instance.

Allows rebooting instances in the [Cloud Kafka](/en/data-platform/kafka/concepts/about) service.

### dp_kafka_instances_change

Manage Kafka scaling.

Allows scaling an instance in the [Cloud Kafka](/en/data-platform/kafka/concepts/about) service vertically or horizontally. Any change in CPU/RAM count is permitted.

### dp_kafka_instances_scaledisk

Increase Kafka disk.

Allows increasing the disk volume of an instance in the [Cloud Kafka](/en/data-platform/kafka/concepts/about) service.

### dp_kafka_instances_maintenance

Manage Kafka maintenance settings.

Allows modifying cluster maintenance settings in [Cloud Kafka](/en/data-platform/kafka/concepts/about): backup time, operation schedule, etc.

### dp_kafka_instances_versionupdate

Update Kafka version.

Allows updating the Apache Kafka product version in a [Cloud Kafka](/en/data-platform/kafka/concepts/about) instance.

### dp_kafka_instances_audit

Allows viewing instance events in the [Cloud Kafka](/en/data-platform/kafka/concepts/about) service.

### dp_kafka_instances_cenisecontrol

Manage Kafka CeniseControl settings.

Allows modifying the CeniseControl tool settings for managing high-load clusters in the [Cloud Kafka](/en/data-platform/kafka/concepts/about) service.

### dp_kafka_mirrormaker_list

List Kafka mirror connections.

Allows getting the list of Kafka mirror connections.

### dp_kafka_mirrormaker_create

Create new Kafka mirror connection.

Allows creating a new Kafka mirror connection.

### dp_kafka_mirrormaker_delete

Delete Kafka mirror connection.

Allows deleting a Kafka mirror connection.

### dp_kafka_settings_list

View Kafka settings.

Allows viewing Kafka product settings.

### dp_kafka_settings_change

Manage Kafka settings.

Allows editing and resetting Kafka settings.

### dp_kafka_settings_viewhistory

View Kafka change history.

Allows viewing the history of Kafka setting changes.

### dp_kafka_monitoring_view

View Kafka monitoring metrics.

Allows viewing Kafka monitoring metrics.

### dp_kafka_logs_view

View Kafka instance logs.

Allows viewing event logs of a Kafka instance.

### dp_kafka_users_list

View list of Kafka users.

Allows viewing the list of users in the [Cloud Kafka](/en/data-platform/kafka/concepts/about) service.

### dp_kafka_users_create

Add Kafka user.

Allows adding users to the [Cloud Kafka](/en/data-platform/kafka/concepts/about) service.

### dp_kafka_users_delete

Delete Kafka user.

Allows deleting users from the [Cloud Kafka](/en/data-platform/kafka/concepts/about) service.

### dp_kafka_users_update

Edit Kafka user.

Allows modifying user data in the [Cloud Kafka](/en/data-platform/kafka/concepts/about) service.

## Data Platform ClickHouse

Permissions in the Data Platform Cloud ClickHouse service.

### dp_clickhouse_instances_list

View list of ClickHouse instances.

Allows viewing the list of ClickHouse instances.

### dp_clickhouse_instances_view

View ClickHouse instance properties.

Allows viewing properties of a ClickHouse instance.

### dp_clickhouse_instances_create

Create ClickHouse instance.

Allows creating ClickHouse instances.

### dp_clickhouse_instances_delete

Delete ClickHouse instance.

Allows deleting ClickHouse instances.

### dp_clickhouse_instances_reboot

Reboot ClickHouse instance.

Allows rebooting ClickHouse instances.

### dp_clickhouse_instances_change

Manage ClickHouse scaling.

Allows scaling a ClickHouse instance vertically or horizontally. Allows any change in CPU/RAM count.

### dp_clickhouse_instances_scaledisk

Increase ClickHouse disk.

Allows increasing the disk in a ClickHouse instance.

### dp_clickhouse_instances_maintenance

Manage ClickHouse maintenance settings.

Allows modifying instance maintenance settings in ClickHouse: backup time, operation schedule, etc.

### dp_clickhouse_instances_versionupdate

Update ClickHouse version.

Allows updating the ClickHouse DBMS version in an instance.

### dp_clickhouse_instances_audit

View ClickHouse instance events.

Allows viewing events of a ClickHouse DB instance.

### dp_clickhouse_instances_execsql

Execute SQL queries to ClickHouse DB.

Allows executing SQL queries to the ClickHouse DB. Connection is made using the DB username and password.

### dp_clickhouse_instances_listqueries

Get list of executing queries to ClickHouse DB.

Allows getting the list of executing queries to the ClickHouse DB.

### dp_clickhouse_instances_killquery

Kill query to ClickHouse DB.

Allows killing a query to the ClickHouse DB.

### dp_clickhouse_settings_list

View ClickHouse settings.

Allows viewing ClickHouse DBMS settings.

### dp_clickhouse_settings_change

Manage ClickHouse settings.

Allows modifying ClickHouse DBMS settings.

### dp_clickhouse_settings_viewhistory

View ClickHouse change history.

Allows viewing the history of ClickHouse DBMS setting changes.

### dp_clickhouse_users_list

View list of ClickHouse users.

Allows viewing the list of ClickHouse users.

### dp_clickhouse_users_create

Add ClickHouse user.

Allows adding ClickHouse users.

### dp_clickhouse_users_delete

Delete ClickHouse user.

Allows deleting ClickHouse users.

### dp_clickhouse_users_update

Edit ClickHouse user.

Allows modifying ClickHouse user data.

### dp_clickhouse_databases_view

View list of ClickHouse databases.

Allows viewing the list of ClickHouse databases.

### dp_clickhouse_databases_create

Create new ClickHouse database.

Allows creating a new ClickHouse database.

### dp_clickhouse_databases_delete

Delete ClickHouse database.

Allows deleting a ClickHouse database.

### dp_clickhouse_extensions_list

View list of ClickHouse extensions.

Allows viewing the list of ClickHouse DBMS extensions.

### dp_clickhouse_extensions_install

Install ClickHouse extension.

Allows installing ClickHouse DBMS extensions.

### dp_clickhouse_extensions_uninstall

Uninstall ClickHouse extension.

Allows uninstalling ClickHouse DBMS extensions.

### dp_clickhouse_backups_list

View list of ClickHouse backups.

Allows viewing the list of ClickHouse backups.

### dp_clickhouse_backups_create

Start ClickHouse backup.

Allows manually starting ClickHouse backup.

### dp_clickhouse_backups_download

Download ClickHouse backup.

Allows downloading a ClickHouse backup.

### dp_clickhouse_backups_restore

Restore from ClickHouse backup to a new cluster.

Allows restoring a ClickHouse DB from a backup to a new cluster.

### dp_clickhouse_monitoring_view

View ClickHouse monitoring metrics.

Allows viewing ClickHouse monitoring metrics.

### dp_clickhouse_logs_view

View ClickHouse instance logs.

Allows viewing event logs of a ClickHouse instance.

## Data Platform Redis

Actions in the Data Platform Redis component.

### dp_redis_instances_list

View list of Redis instances.

Allows viewing the list of Redis instances.

### dp_redis_instances_view

View Redis instance properties.

Allows viewing properties of a Redis instance.

### dp_redis_instances_create

Create Redis instance.

Allows creating Redis instances.

### dp_redis_instances_delete

Delete Redis instance.

Allows deleting Redis instances.

### dp_redis_instances_reboot

Reboot Redis instance.

Allows rebooting Redis instances.

### dp_redis_instances_change

Manage Redis scaling.

Allows scaling Redis instances vertically or horizontally. Permits any change in CPU/RAM count.

### dp_redis_instances_scaledisk

Increase Redis disk.

Allows increasing disks of a Redis instance.

### dp_redis_instances_maintenance

Manage Redis maintenance settings.

Allows modifying instance maintenance settings in Redis: backup time, operation schedule, etc.

### dp_redis_instances_versionupdate

Update Redis version.

Allows updating the Redis DBMS version in an instance.

### dp_redis_instances_audit

View Redis instance events.

Allows viewing events of a Redis instance.

### dp_redis_settings_list

View Redis settings.

Allows viewing Redis DBMS settings.

### dp_redis_settings_change

Manage Redis settings.

Allows modifying Redis DBMS settings.

### dp_redis_settings_viewhistory

View Redis change history.

Allows viewing the history of Redis DBMS setting changes.

### dp_redis_users_list

View list of Redis users.

Allows viewing the list of Redis users.

### dp_redis_users_create

Add Redis user.

Allows adding Redis users.

### dp_redis_users_delete

Delete Redis user.

Allows deleting Redis users.

### dp_redis_users_update

Edit Redis user.

Allows modifying Redis user data.

### dp_redis_monitoring_view

View Redis monitoring metrics.

Allows viewing Redis monitoring data.

### dp_redis_logs_view

View Redis instance logs.

Allows viewing event logs of Redis instances.

## Data Platform Airflow

Actions in the Data Platform Cloud Airflow service.

### dp_airflow_instances_list

View list of Airflow instances.

Allows viewing the list of Airflow instances.

### dp_airflow_instances_view

View Airflow instance properties.

Allows viewing properties of Airflow instances.

### dp_airflow_instances_create

Create Airflow instance.

Allows creating Airflow instances.

### dp_airflow_instances_delete

Allows deleting Airflow instances.

### dp_airflow_instances_reboot

Allows rebooting Airflow instances.

### dp_airflow_instances_change

Manage Airflow scaling.

Allows scaling Airflow instances vertically or horizontally. Permits any change in CPU/RAM count.

### dp_airflow_instances_scaledisk

Increase Airflow disk.

Allows increasing disk sizes of an Airflow instance.

### dp_airflow_instances_maintenance

Manage Airflow maintenance settings.

Allows modifying instance maintenance settings in Airflow: backup time, operation schedule, etc.

### dp_airflow_instances_versionupdate

Update Airflow version.

Allows updating the Airflow product version.

### dp_airflow_instances_audit

View Airflow instance events.

Allows viewing events of an Airflow instance.

### dp_airflow_instances_ui

Access Airflow UI.

Allows obtaining access to the Airflow graphical interface.

### dp_airflow_monitoring_view

View Airflow monitoring metrics.

Allows viewing Airflow monitoring metrics.

### dp_airflow_logs_view

View Airflow instance logs.

Allows viewing event logs of Airflow instances.

## Data Platform Jatoba

Actions in the Data Platform Jatoba component.

### dp_jatoba_instances_list

View list of Jatoba instances.

Allows viewing the list of Jatoba instances.

### dp_jatoba_instances_view

View Jatoba instance properties.

Allows viewing properties of Jatoba instances.

### dp_jatoba_instances_create

Create Jatoba instance.

Allows creating Jatoba instances.

### dp_jatoba_instances_delete

Delete Jatoba instance.

Allows deleting Jatoba instances.

### dp_jatoba_instances_reboot

Reboot Jatoba instance.

Allows rebooting Jatoba instances.

### dp_jatoba_instances_change

Manage Jatoba scaling.

Allows managing vertical and horizontal scaling of Jatoba. Permits any change in CPU/RAM count.

### dp_jatoba_instances_scaledisk

Increase Jatoba disk.

Allows increasing disks of a Jatoba instance.

### dp_jatoba_instances_maintenance

Manage Jatoba maintenance settings.

Allows modifying instance maintenance settings in Jatoba: backup time, operation schedule, etc.

### dp_jatoba_instances_versionupdate

Update Jatoba version.

Allows updating the Jatoba DBMS version in an instance.

### dp_jatoba_instances_audit

View Jatoba instance events.

Allows viewing events of a Jatoba instance.

### dp_jatoba_instances_execsql

Execute SQL queries to Jatoba DB.

Allows executing SQL queries to the Jatoba DB. Connection is made using the DB username and password.

### dp_jatoba_instances_listqueries

Get list of executing queries to Jatoba DB.

Allows getting the list of executing queries to the Jatoba DB.

### dp_jatoba_instances_killquery

Kill query to Jatoba DB.

Allows killing a query to the Jatoba DB.

### dp_jatoba_settings_list

View Jatoba settings.

Allows viewing Jatoba DBMS settings.

### dp_jatoba_settings_change

Manage Jatoba settings.

Allows modifying Jatoba DBMS settings.

### dp_jatoba_settings_viewhistory

View Jatoba change history.

Allows viewing the history of Jatoba DBMS setting changes.

### dp_jatoba_users_list

View list of Jatoba users.

Allows viewing the list of Jatoba users.

### dp_jatoba_users_create

Add Jatoba user.

Allows adding Jatoba users.

### dp_jatoba_users_delete

Delete Jatoba user.

Allows deleting Jatoba users.

### dp_jatoba_users_update

Edit Jatoba user.

Allows modifying Jatoba user data.

### dp_jatoba_databases_view

View list of Jatoba databases.

Allows viewing the list of Jatoba databases.

### dp_jatoba_databases_create

Create new Jatoba database.

Allows creating a Jatoba database.

### dp_jatoba_databases_delete

Delete Jatoba database.

Allows deleting a Jatoba database.

### dp_jatoba_extensions_list

View list of Jatoba extensions.

Allows viewing the list of Jatoba DBMS extensions.

### dp_jatoba_extensions_install

Install Jatoba extension.

Allows installing Jatoba DBMS extensions.

### dp_jatoba_extensions_uninstall

Uninstall Jatoba extension.

Allows uninstalling Jatoba DBMS extensions.

### dp_jatoba_backups_list

View list of Jatoba backups.

Allows viewing the list of Jatoba DB backups.

### dp_jatoba_backups_create

Start Jatoba DB backup.

Allows manually starting Jatoba DB backup.

### dp_jatoba_backups_download

Download Jatoba backup.

Allows downloading Jatoba DB backups.

### dp_jatoba_backups_restore

Restore from Jatoba backup to a new cluster.

Allows restoring a Jatoba DB from a backup to a new cluster.

### dp_jatoba_monitoring_view

View Jatoba monitoring metrics.

Allows viewing Jatoba monitoring metrics.

### dp_jatoba_logs_view

View Jatoba instance logs.

Allows viewing event logs of Jatoba.

## Data Platform NiFi

Actions in the Data Platform NiFi product.

### dp_nifi_instances_list

View list of NiFi instances.

Allows viewing the list of NiFi instances.

### dp_nifi_instances_view

View NiFi instance properties.

Allows viewing properties of NiFi instances.

### dp_nifi_instances_create

Create NiFi instance.

Allows creating NiFi instances.

### dp_nifi_instances_delete

Delete NiFi instance.

Allows deleting NiFi instances.

### dp_nifi_instances_reboot

Reboot NiFi instance.

Allows rebooting NiFi instances.

### dp_nifi_instances_change

Manage NiFi scaling.

Allows managing horizontal or vertical scaling of NiFi instances. Any change in CPU/RAM count is permitted.

### dp_nifi_instances_scaledisk

Increase NiFi disk.

Allows increasing the disk size of a NiFi instance.

### dp_nifi_instances_maintenance

Manage NiFi maintenance settings.

Allows modifying instance maintenance settings in NiFi: backup time, operation schedule, etc.

### dp_nifi_instances_versionupdate

Update NiFi version.

Allows updating the NiFi product version in an instance.

### dp_nifi_instances_audit

View NiFi instance events.

Allows viewing events of a NiFi instance.

### dp_nifi_instances_ui

Access NiFi UI.

Allows obtaining access to the NiFi graphical interface.

### dp_nifi_monitoring_view

View NiFi monitoring metrics.

Allows viewing NiFi monitoring metrics.

### dp_nifi_logs_view

View NiFi instance logs.

Allows viewing event logs of NiFi.

## Data Platform OpenSearch

Actions in the Data Platform OpenSearch search service.

### dp_opensearch_instances_list

View list of OpenSearch instances.

Allows viewing the list of OpenSearch instances.

### dp_opensearch_instances_view

View OpenSearch instance properties.

Allows viewing properties of OpenSearch instances.

### dp_opensearch_instances_create

Create OpenSearch instance.

Allows creating OpenSearch instances.

### dp_opensearch_instances_delete

Delete OpenSearch instance.

Allows deleting OpenSearch instances.

### dp_opensearch_instances_reboot

Reboot OpenSearch instance.

Allows rebooting OpenSearch instances.

### dp_opensearch_instances_change

Manage OpenSearch scaling.

Allows managing vertical or horizontal scaling of an OpenSearch instance. Any change in CPU/RAM count is permitted.

### dp_opensearch_instances_scaledisk

Increase OpenSearch disk.

Allows increasing the volume of disks in an OpenSearch instance.

### dp_opensearch_instances_maintenance

Manage OpenSearch maintenance settings.

Allows modifying instance maintenance settings in OpenSearch: backup schedule, operation schedule, etc.

### dp_opensearch_instances_versionupdate

Update OpenSearch version.

Allows updating the OpenSearch product version in an instance.

### dp_opensearch_instances_audit

View OpenSearch instance events.

Allows viewing events of an OpenSearch instance.

### dp_opensearch_settings_list

View OpenSearch settings.

Allows viewing OpenSearch settings.

### dp_opensearch_settings_change

Manage OpenSearch settings.

Allows modifying OpenSearch settings.

### dp_opensearch_settings_viewhistory

View OpenSearch change history.

Allows viewing the history of OpenSearch setting changes.

### dp_opensearch_monitoring_view

View OpenSearch monitoring metrics.

Allows viewing OpenSearch monitoring metrics.

### dp_opensearch_logs_view

View OpenSearch instance logs.

Allows viewing event logs of OpenSearch.

## Data Platform PostgreSQL

Actions in the Data Platform PostgreSQL product.

### dp_postgresql_instances_list

View list of PostgreSQL instances.

Allows viewing the list of PostgreSQL instances.

### dp_postgresql_instances_view

View PostgreSQL instance properties.

Allows viewing properties of PostgreSQL instances.

### dp_postgresql_instances_create

Create PostgreSQL instance.

Allows creating PostgreSQL instances.

### dp_postgresql_instances_delete

Delete PostgreSQL instance.

Allows deleting PostgreSQL instances.

### dp_postgresql_instances_reboot

Reboot PostgreSQL instance.

Allows rebooting PostgreSQL instances.

### dp_postgresql_instances_change

Manage PostgreSQL scaling.

Allows managing horizontal or vertical scaling of a PostgreSQL instance. Any change in CPU/RAM count is permitted.

### dp_postgresql_instances_scaledisk

Increase PostgreSQL disk.

Allows increasing the disk volume in a PostgreSQL instance.

### dp_postgresql_instances_maintenance

Manage PostgreSQL maintenance settings.

Allows modifying instance maintenance settings in PostgreSQL: backup time, operation schedule, etc.

### dp_postgresql_instances_versionupdate

Update PostgreSQL version.

Allows updating the PostgreSQL DBMS version in an instance.

### dp_postgresql_instances_audit

View PostgreSQL instance events.

Allows viewing events of a PostgreSQL instance.

### dp_postgresql_instances_execsql

Execute SQL queries to PostgreSQL DB.

Allows executing SQL queries to the PostgreSQL DB. Connection is made using the DB username and password.

### dp_postgresql_instances_listqueries

Get list of executing queries to PostgreSQL DB.

Allows getting the list of executing queries to the PostgreSQL DB per instance.

### dp_postgresql_instances_killquery

Kill query to PostgreSQL DB.

Allows killing a query to the PostgreSQL DB.

### dp_postgresql_settings_list

View PostgreSQL settings.

Allows viewing PostgreSQL DBMS settings.

### dp_postgresql_settings_change

Manage PostgreSQL settings.

Allows modifying PostgreSQL DBMS settings.

### dp_postgresql_settings_viewhistory

View PostgreSQL change history.

Allows viewing the history of PostgreSQL DBMS setting changes.

### dp_postgresql_users_list

View list of PostgreSQL users.

Allows viewing the list of PostgreSQL users.

### dp_postgresql_users_create

Add PostgreSQL user.

Allows adding PostgreSQL users.

### dp_postgresql_users_delete

Delete PostgreSQL user.

Allows deleting PostgreSQL users.

### dp_postgresql_users_update

Edit PostgreSQL user.

Allows modifying PostgreSQL user data.

### dp_postgresql_databases_view

View list of PostgreSQL databases.

Allows viewing the list of PostgreSQL databases.

### dp_postgresql_databases_create

Create new PostgreSQL database.

Allows creating a PostgreSQL database.

### dp_postgresql_databases_delete

Delete PostgreSQL database.

Allows deleting a PostgreSQL database.

### dp_postgresql_extensions_list

View list of PostgreSQL extensions.

Allows viewing the list of PostgreSQL DBMS extensions.

### dp_postgresql_extensions_install

Install PostgreSQL extension.

Allows installing PostgreSQL DBMS extensions.

### dp_postgresql_extensions_uninstall

Uninstall PostgreSQL extension.

Allows uninstalling PostgreSQL DBMS extensions.

### dp_postgresql_backups_list

View list of PostgreSQL backups.

Allows viewing the list of PostgreSQL DB backups.

### dp_postgresql_backups_create

Start PostgreSQL backup.

Allows manually starting PostgreSQL DB backup.

### dp_postgresql_backups_download

Download PostgreSQL backup.

Allows downloading a PostgreSQL DB backup.

### dp_postgresql_backups_restore

Restore from PostgreSQL backup to a new cluster.

Allows restoring a PostgreSQL DB from a PostgreSQL backup to a new cluster.

### dp_postgresql_monitoring_view

View PostgreSQL monitoring metrics.

Allows viewing PostgreSQL monitoring metrics.

### dp_postgresql_logs_view

View PostgreSQL instance logs.

Allows viewing event logs of PostgreSQL.

## Data Platform Spark

Actions in the Spark service on the VK Data Platform.

### dp_spark_instances_list

View list of Spark instances.

Allows viewing the list of Spark instances.

### dp_spark_instances_view

View Spark instance properties.

Allows viewing properties of Spark instances.

### dp_spark_instances_create

Create Spark instance.

Allows creating Spark instances.

### dp_spark_instances_delete

Delete Spark instance.

Allows deleting Spark instances.

### dp_spark_instances_reboot

Reboot Spark instance.

Allows rebooting Spark instances.

### dp_spark_instances_change

Manage Spark scaling.

Allows managing horizontal and vertical scaling of a Spark instance. Any change in CPU/RAM count is permitted.

### dp_spark_instances_scaledisk

Increase Spark disk.

Allows modifying the volume of disks in a Spark instance.

### dp_spark_instances_maintenance

Manage Spark maintenance settings.

Allows modifying instance maintenance settings in Spark: backup time, operation schedule, etc.

### dp_spark_instances_versionupdate

Update Spark version.

Allows updating the Spark product version in an instance.

### dp_spark_instances_audit

View Spark instance events.

Allows viewing Spark events in an instance.

### dp_spark_instances_ui

Access Spark UI.

Allows obtaining access to the Spark graphical interface.

### dp_spark_monitoring_view

View Spark monitoring metrics.

Allows viewing Spark monitoring metrics.

### dp_spark_logs_view

View Spark instance logs.

Allows viewing event logs of Spark.

## Data Platform Trino

Actions in the Data Platform [Trino](/en/data-platform/trino/concepts/about) service.

### dp_trino_instances_list

View list of Trino instances.

Allows viewing the list of Trino instances.

### dp_trino_instances_view

View Trino instance properties.

Allows viewing properties of Trino instances.

### dp_trino_instances_create

Create Trino instance.

Allows creating Trino instances.

### dp_trino_instances_delete

Delete Trino instance.

Allows deleting Trino instances.

### dp_trino_instances_reboot

Reboot Trino instance.

Allows rebooting Trino instances.

### dp_trino_instances_change

Manage Trino scaling.

Allows managing vertical or horizontal scaling of a Trino instance. Any change in CPU/RAM count is permitted.

### dp_trino_instances_scaledisk

Increase Trino disk.

Allows increasing the disk volume of a Trino instance.

### dp_trino_instances_maintenance

Manage Trino maintenance settings.

Allows modifying instance maintenance settings in Trino: backup time, operation schedule, etc.

### dp_trino_instances_versionupdate

Update Trino version.

Allows updating the Trino product version in an instance.

### dp_trino_instances_audit

View Trino instance events.

Allows viewing events of a Trino instance.

### dp_trino_instances_execsql

Execute SQL queries to Trino DB.

Allows executing SQL queries to the Trino DB. Connection is made using the DB username and password.

### dp_trino_instances_ui

Access Trino service UI.

Allows obtaining access to the Trino DBMS graphical interface.

### dp_trino_settings_list

View Trino settings.

Allows viewing Trino product settings.

### dp_trino_settings_change

Manage Trino settings.

Allows modifying Trino product settings.

### dp_trino_settings_viewhistory

View Trino change history.

Allows viewing the history of Trino product setting changes.

### dp_trino_users_list

View list of Trino users.

Allows viewing the list of Trino users.

### dp_trino_users_create

Add Trino user.

Allows adding Trino users.

### dp_trino_users_delete

Delete Trino user.

Allows deleting Trino users.

### dp_trino_users_update

Edit Trino user.

Allows modifying Trino user data.

### dp_trino_extensions_list

View list of Trino extensions.

Allows viewing the list of Trino product extensions.

### dp_trino_extensions_install

Install Trino extension.

Allows installing Trino product extensions.

### dp_trino_extensions_uninstall

Uninstall Trino extension.

Allows uninstalling Trino product extensions.

### dp_trino_monitoring_view

View Trino monitoring metrics.

Allows viewing Trino monitoring metrics.

### dp_trino_logs_view

View Trino instance logs.

Allows viewing event logs of Trino.