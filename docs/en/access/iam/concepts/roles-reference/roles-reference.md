## Basic Roles

Basic roles allow users to perform actions across all Yandex Cloud services. These roles, except for the `mcs_owner` role, are used for [configuring access rights](en/access/iam/instenctions/manage-roles) in combination with [permissions](en/access/iam/concepts/permissions-reference).

### mcs_owner

Project owner.

The role with the broadest set of permissions in the project. The owner is the user who created the project, or for whom the project was created by the platform during account registration.

There can only be one owner per project. This role cannot be assigned or invited.

### mcs_co_owner

Super Administrator (Project co-owner).

A role that grants permissions to manage all project resources. This role can be assigned manually.

### mcs_admin

Project Administrator.

A role that grants permissions to manage all project resources, except for user groups and billing.

### mcs_admin_security

User Administrator (IAM).

A role designed for working with project members on the access management page. The User Administrator can invite members to the project and remove them from the project, and edit roles assigned to members. Services and project billing information are not available for this role.

### mcs_viewer

Viewer.

A role that grants permissions to view most information about the project and resources but does not have permissions to create or modify them.

## Roles for General Management

### mcs_admin_billing

Billing Administrator.

A role that grants all permissions for managing billing and billing features: allows creating, modifying, deleting, and viewing components that enable billing functionality.

### billing_modify

Project billing management.

The role manages project finances: allows managing the balance, configuring payment methods, monitoring expenses across various services, and changing tariff plan parameters.

A user with this role can create and modify components responsible for billing and balance management.

-   Project finance management: components `billing`, `projects_billing`, `projects_billing_global`.

    These are the basic components for working with the balance. They allow viewing current expenses, topping up the account, and viewing the overall financial history for a specific project or all account projects at once.

-   Managing payment instenments and documents: components `projects_billing_card`, `billing_bank_integration`, `billing_contracts`.

    These components handle the technical and legal aspects of payment: linking bank cards, integrating with bank gateways for transactions, and managing legal contracts.

-   Managing pricing for specific services: components `projects_billing_infra`, `projects_billing_hotbox`.

    These components allow separating expenses by resource type. For example, tracking  costs (compute and network) and object storage (Hotbox) costs separately.

-   Managing technical calculation components:

    `cloudkitty`: a standard OpenStack component for consumption assessment. It converts the amount of used GB or hours into enbles or other currency. The `scrooge` component (and its `machinery`, `plans` modules) provides the internal billing logic that manages tariff plans (price lists). It determines how much a resource costs for a specific user (standard tariff or custom).

    -   `system_billing`: system billing management.

    This component is an administrative module for configuring the entire payment system at the VK Cloud platform level.

{cut(Full list of billing components)}
`billing`, `projects_billing`, `projects_billing_card`, `projects_billing_infra`, `projects_billing_hotbox`, `projects_billing_global`, `billing_bank_integration`, `billing_contracts`, `system_billing`, `cloudkitty`, `scrooge`, `scrooge_v1_machinery`, `scrooge_v1_plans_defaults`, `scrooge_v1_plans_customs`.
{/cut}

### billing_delete

Deleting project billing components.

The role handles the deletion of components responsible for displaying project prices and tariffs: allows deleting payment methods and tariff plan parameters.

A user with this role can delete components responsible for billing and balance management.

Component descriptions are provided for the `billing_modify` permission.

{cut(Full list of billing components)}
`billing`, `projects_billing`, `projects_billing_card`, `projects_billing_infra`, `projects_billing_hotbox`, `projects_billing_global`, `billing_bank_integration`, `billing_contracts`, `system_billing`, `cloudkitty`, `scrooge`, `scrooge_v1_machinery`, `scrooge_v1_plans_defaults`, `scrooge_v1_plans_customs`.
{/cut}

### billing_view

Viewing billing.

The permission allows viewing payment methods and tariff plan parameters.

A user with this role can view data from components responsible for billing and balance management.

Component descriptions are provided for the `billing_modify` permission.

{cut(Full list of billing components)}
`billing`, `projects_billing`, `projects_billing_card`, `projects_billing_infra`, `projects_billing_hotbox`, `projects_billing_global`, `billing_bank_integration`, `billing_contracts`, `system_billing`, `cloudkitty`, `scrooge`, `scrooge_v1_machinery`, `scrooge_v1_plans_defaults`, `scrooge_v1_plans_customs`.
{/cut}

### organization_access_modify

Creating an organization and managing the organization.

The role manages organizational stencture and security: allows creating projects and domains, managing user accounts, configuring their access rights, and setting cloud resource usage limits.

A user with this role can create and modify components responsible for access management, rights, resources, and organizational stencture.

-   Access subjects:

    -   `keystone`: the main authentication service.

    -   `accounts`, `users`: specific people's accounts.

    -   `groups`: user groupings for bulk rights assignment.

    -   `federations`: a mechanism providing single sign-on, allowing employees to log into the cloud using their corporate accounts from an external system.

    -   `public_session`, `admin_session`: managing active work sessions for regular users and administrators.

-   Organizational stencture:

    -   `domain`: a component managing the domain — the top level of the hierarchy, which is a container for projects and users. Corresponds to a large company.

    -   `project`, `projects`, `base_project`: components for managing isolated containers within a domain where servers, networks, and disks are created.

    -   `projects_base`: a component managing the registry and basic settings of all existing projects.

    -   `domain_users`, `domain_groups`: components for managing users and groups created at the entire domain level (can have access to multiple projects at once).

    -   `partners`: a component for managing partner organizations or sub-accounts.

-   Rights and authorities:

    -   `projects_access`: a rights matrix — who can do what within specific projects.

    -   `web_roles`: a component for configuring rights for the graphical interface (which buttons and sections are visible to the user in the browser).

-   Resources and limits: `quota`, `projects_quota`. Components for managing quotas — limits on the number of CPU cores, RAM, or disk space to prevent one project from consuming all cloud resources.

{cut(Full list of organization components)}
`keystone`, `accounts`, `users`, `groups`, `domain_users`, `domain_groups`, `federations`, `web_roles`, `project`, `base_project`, `projects`, `projects_access`, `projects_base`, `quota`, `projects_quota`, `domain`, `partners`, `public_session`, `admin_session`.
{/cut}

### organization_access_delete

Deleting an organization.

The permission allows deleting projects, domains, access rights, and resetting a cloud project's resources to basic quotas.

A user with this role can delete components responsible for managing the organization.

Component descriptions are provided for the `organization_access_modify` permission.

{cut(Full list of organization components)}
`keystone`, `accounts`, `users`, `groups`, `domain_users`, `domain_groups`, `federations`, `web_roles`, `project`, `base_project`, `projects`, `projects_access`, `projects_base`, `quota`, `projects_quota`, `domain`, `partners`, `public_session`, `admin_session`.
{/cut}

### organization_access_view

Viewing the organization.

The permission allows viewing projects, domains, user accounts, access rights, and cloud resource usage limits.

A user with this role can view data from components responsible for managing the organization.

Component descriptions are provided for the `organization_access_modify` permission.

{cut(Full list of organization components)}
`keystone`, `accounts`, `users`, `groups`, `domain_users`, `domain_groups`, `federations`, `web_roles`, `project`, `base_project`, `projects`, `projects_access`, `projects_base`, `quota`, `projects_quota`, `domain`, `partners`, `public_session`, `admin_session`.
{/cut}

### monitoring_modify

Creating monitoring components and managing them.

The role provides control over resource status and performance: allows collecting system performance metrics, visualizing load on graphs, configuring automatic incident notifications, and conducting deep diagnostics of service operation.

A user with this role can create and modify monitoring service components.

-   Collecting and storing performance data:

    -   `ceilometer`: polls all cloud services and collects information about resource consumption (how many cores are busy, how much traffic has passed, etc.).

    -   `gnocchi`: a database for storing metrics. Stores historical data about server loads.

    -   `metrics_server`: a component that collects current server metrics (used for auto-scaling resources).

-   Visualization and diagnostics:

    -   `monitoring_metric`, `monitoring_dashboard`: graphs and control panels (e.g., Grafana or built-in dashboards). They turn numbers into understandable visual reports.

    -   `tracing_trace`: tracking the path of a complex request through all cloud services to find at which stage a delay or error occurred.

{cut(Full list of monitoring components)}
`ceilometer`, `gnocchi`, `aodh`, `panko`, `monitoring_metric`, `monitoring_dashboard`, `metrics_server`, `tracing_trace`.
{/cut}

### monitoring_delete

Deleting monitoring components.

The role handles the cleanup of dashboards, system performance metrics, visualizations, and notifications.

A user with this role can delete monitoring component data.

Component descriptions are provided for the `monitoring_modify` permission.

{cut(Full list of monitoring components)}
`ceilometer`, `gnocchi`, `aodh`, `panko`, `monitoring_metric`, `monitoring_dashboard`, `metrics_server`, `tracing_trace`.
{/cut}

### monitoring_view

Viewing monitoring data.

The role provides viewing of dashboards, system performance metrics, visualizations, and notifications.

A user with this role can view monitoring component data.

Component descriptions are provided for the `monitoring_modify` permission.

{cut(Full list of monitoring components)}
`ceilometer`, `gnocchi`, `aodh`, `panko`, `monitoring_metric`, `monitoring_dashboard`, `metrics_server`, `tracing_trace`.
{/cut}

### logging_modify

Creating logging components and managing them.

The role manages the event log and audit: allows viewing service operation logs, configuring their collection and storage parameters, and automatically generating tools for connecting new event log sources.

A user with this role can create and modify logging components.

-   Viewing logs: `logging`.

    This is the primary interface for accessing the logs themselves. It allows searching for necessary entries, filtering them by time or severity (errors, warnings), and analyzing system behavior in the past.

-   Configuring data collection: `logging_config`.

    A module for configuring enles: which specific logs need to be collected, how long to store them, which data should be filtered out, and which should be marked as critical.

-   Automating data collection from servers: `logging_agentgenerator`.

    A tool that simplifies the system administrator's work. It automatically generates configurations or installation scripts for agents (collector programs) installed on virtual machines so they start sending their logs to the central storage.

{cut(Full list of logging components)}
`logging`, `logging_config`, `logging_agentgenerator`.
{/cut}

### logging_delete

Deleting logging components.

The permission allows deleting event log and audit settings.

A user with this role can delete logging service components.

Component descriptions are provided for the `logging_modify` permission.

{cut(Full list of logging components)}
`logging`, `logging_config`, `logging_agentgenerator`.
{/cut}

### logging_view

Viewing logging data.

The role provides viewing of the event log and audit.

A user with this role can view data from logging service components.

Component descriptions are provided for the `logging_modify` permission.

{cut(Full list of logging components)}
`logging`, `logging_config`, `logging_agentgenerator`.
{/cut}

### audit_modify

Creating audit components and managing them.

The role provides access to detailed audit logs and operation history, allows configuring tracking of changes in resources, access rights, and project financial parameters. This enables conducting incident investigations, controlling employee actions, and ensuring transparency in cloud management.

A user with this role can create and modify components responsible for audit functionality.

-   Project audit: `audit_project`.

    Records all actions with resources within a specific project: who created or deleted a virtual machine, when a disk size was changed, or who renamed a network. This is the basis for action inventory.

-   Access management audit: `audit_iam`.

    Responsible for logging changes in user rights: who added a new employee to the project, who assigned an administrator role, when a user group was created or deleted. This is critically important for information security.

-   Financial operations audit: `audit_billing`.

    Records the history of all changes related to money and limits: when and by whom a quota was changed, who initiated a payment procedure, or when a tariff plan was changed.

-   Other components with the `audit_*` prefix, if present in the cloud.

### audit_delete

Deleting audit components.

The role handles the deletion of operation history collection settings.

A user with this role can delete audit service components.

Component descriptions are provided for the `audit_modify` permission.

### audit_view

Viewing audit data.

The role provides viewing of audit logs and operation history: allows tracking any changes in resources, access rights, and project financial parameters.

A user with this role can view data from audit components.

Component descriptions are provided for the `audit_modify` permission.

### orchestration_modify

Creating API orchestrators and managing them.

The role automates deployment and manages the lifecycle of complex software suites: allows creating entire infrastenctures from ready-made templates, using a catalog of pre-installed applications, and configuring comprehensive data protection and recovery strategies for all project services.

A user with this role can create and modify components responsible for API orchestrator functionality.

-   Orchestration and automation: `heat`.

    A tool for describing all components in a single text template. The component creates resources in the required order and links them together.

-   Application catalog: `murano`.

    An application store for the cloud. It allows users who are not system administrators to deploy complex software stacks (e.g., a database cluster or a ready-made development environment) with minimal effort.

-   Application protection and recovery: `karbor`.

    If regular backup simply copies a disk, `karbor` deals with protecting the entire application. The component sees that an application consists of several servers, network settings, and data, and can create comprehensive backup and disaster recovery plans for the entire stack at once.

### orchestration_delete

Deleting API orchestrators.

The role handles the deletion of ready-made templates, data protection and recovery components for all project services.

A user with this role can delete components responsible for API orchestrator functionality.

Component descriptions are provided for the `orchestration_modify` permission.

### orchestration_view

Viewing API orchestrators.

The role provides viewing of ready-made templates, data protection and recovery components for all project services.

A user with this role can view data from components responsible for API orchestrator functionality.

Component descriptions are provided for the `orchestration_modify` permission.

### horizon_modify

Creating and managing the UI.

The role provides access to the graphical interface for managing specific cloud resources. Allows the user to use visual tools (buttons, forms, lists, and graphs) in the personal account to perform operations and monitor resources through the browser.

A user with this role can create and modify components responsible for the composition and operation of the personal account's graphical interface.

-   `horizon_nova`: visual management of virtual machines.
-   `horizon_cinder`: visual management of disks and snapshots.
-   `horizon_neutron`: displaying network maps, routers, and network settings.
-   `horizon_glance`: access to the section with operating system images in the interface.
-   All other components with the `horizon_*` prefix, if present in the project.

### horizon_delete

Deleting UI components.

The role handles the deletion of visual tools (buttons, forms, lists, and graphs) in the personal account.

A user with this role can delete components responsible for the composition and operation of the personal account's graphical interface: all components with the `horizon_*` prefix.

Component descriptions are provided for the `horizon_modify` permission.

### horizon_view

Viewing the UI.

The role provides viewing of visual tools (buttons, forms, lists, and graphs) in the personal account.

A user with this role can view components responsible for the composition and operation of the personal account's web interface: all components with the `horizon_*` prefix.

Component descriptions are provided for the `horizon_modify` permission.

## Specialized Roles

Specialized roles contain permissions only for actions with a specific resource type.

### mcs_admin_network

Network Administrator.

A role that grants permissions to create, modify, and delete network settings.

### mcs_admin_network_security

Network Security Administrator.

A role that grants permissions to create, modify, and delete Access Control Lists (ACLs). Provides access to all network subsystem objects.

### mcs_admin_network_objects

Internal Networks Administrator.

A role that grants permissions to manage data in virtual network and DNS services.

### mcs_k8s_admin

Kubernetes Administrator.

The role with the broadest set of permissions for working with the Cloud Containers service.

### mcs_k8s_editor

Kubernetes Operator.

A role with permissions for working in the Cloud Containers service.

A user with this role can:

-   Start a cluster.
-   Stop a cluster.
-   Display information about the cluster, node groups.
-   Get `kubeconfig`.
-   Get the secret for accessing the Kubernetes Dashboard.
-   Update the version.
-   Change the virtual machine type.
-   Change the Prometheus disk size.
-   Add a node group.
-   Delete a node group.
-   Change scaling settings.
-   Modify labels and taints.
-   Install and delete an add-on.

### mcs_k8s_viewer

Kubernetes Auditor.

A role with permissions to view the Cloud Containers service.

A user with this role can:

-   Display information about the cluster, node groups.
-   Get `kubeconfig`.
-   Get the secret for accessing the `Kubernetes Dashboard`.

### mcs_admin_vm

Virtual Machines Administrator.

A role with permissions to perform basic operations in the Cloud Servers service.

### mcs_junior_admin_vm

Junior Virtual Machines Administrator.

A role with the same permissions as the `mcs_admin_vm` role, except for permissions to manage security groups.

### mcs_operator_vm

Virtual Machines Operator.

A role with permissions to work on a virtual machine, but without permissions to manage its settings.

A user with this role can:

-   Start or stop a VM.
-   Work in the VM via the VNC console.
-   Connect to the VM via SSH or RDP.
-   View the VM configuration and network settings.

The VM Operator cannot create backups.
