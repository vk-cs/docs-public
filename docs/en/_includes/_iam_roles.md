{includetag(mcs_owner)}
Name in the management console: `Project owner`.

The role with the maximum set of permissions in the project. The role is automatically assigned to the user who created the project themselves, or for whom the project was automatically created upon account registration.

A project can have only one owner. This role cannot be assigned manually or invited to.
{/includetag}

{includetag(mcs_co_owner)}
Name in the management console: `Super administrator`.

A role that grants permissions to manage all project resources. This role can only be assigned to a user by the project owner.
{/includetag}

{includetag(mcs_admin)}
Name in the management console: `Project administrator`.

A role that grants permissions to manage all project resources except user groups and the balance.
{/includetag}

{includetag(mcs_admin_security)}
Name in the management console: `User administrator (IAM)`.

A role designed for managing project members on the access management page. The user administrator can invite members to the project and remove them from it, and edit the roles assigned to members. Services and project balance information are not available for this role.

In the Cloud Logging service, the role allows viewing logs.

In the Cloud Monitoring service, the role allows viewing dashboards.

In the Cloud Audit service, the role allows viewing IAM service events and the user's own actions.
{/includetag}

{includetag(mcs_viewer)}
Name in the management console: `Observer`.  

A role that grants permissions to view most of the information about the project and resources, but does not have permissions to create or modify them.

In the Cloud Logging service, the role allows viewing logs.

In the Cloud Monitoring service, the role allows viewing dashboards.

In the Cloud Audit service, the role allows viewing all project events and exporting this data.

In the Managed Containers service, the role allows viewing information about the cluster and node groups and obtaining a secret for access to Headlamp.
{/includetag}

{includetag(mcs_admin_billing)}
Name in the management console: `Billing administrator`.

A role that grants all permissions to manage the balance and billing functions.

In the Cloud Logging service, the role allows viewing logs.

The role does not grant access to the Cloud Monitoring service.

In the Cloud Audit service, the role allows viewing billing events and the user's own actions, as well as exporting this data.
{/includetag}

{includetag(k8s-admin-magnum)}
Name in the management console: `Kubernetes administrator`.

A role with the broadest set of permissions for working with the Managed Containers service. Some actions are only available in a specific cluster state. For example, installing and removing add-ons is only possible if the cluster is running.

A user with this role can: 

- create and delete clusters;
- start and stop clusters;
- display information about the cluster and node groups;
- obtain the `kubeconfig` file;
- obtain a secret for access to the Kubernetes Dashboard;
- update the cluster version;
- change the virtual machine type;
- change the size of the Prometheus disk;
- add or remove a node group;
- change the scaling settings of node groups;
- change labels and taints;
- install or remove add-ons.

In the Cloud Logging service, the role allows viewing logs and generating credentials.

In the Cloud Monitoring service, the role allows viewing, creating, and editing dashboards, as well as writing to the monitoring system.

In the Cloud Audit service, the role allows viewing Managed Containers service events and the user's own actions, as well as exporting this data.

{/includetag}

{includetag(k8s-admin-managed)}
Name in the management console: `Kubernetes administrator`.

A role with the broadest set of permissions for working with the Managed Containers service. Some actions are only available in a specific cluster state. For example, installing and removing add-ons is only possible if the cluster is running.

A user with this role can:

- create and delete clusters;
- start and stop clusters;
- display information about the cluster and node groups;
- obtain the `kubeconfig` file;
- obtain a secret for access to Headlamp;
- update the cluster version;
- change the virtual machine type;
- change the size of the Prometheus disk;
- add or remove a node group;
- change the scaling settings of node groups;
- change labels and taints;
- install or remove add-ons.

In the Cloud Logging service, the role allows viewing logs and generating credentials.

In the Cloud Monitoring service, the role allows viewing, creating, and editing dashboards, as well as writing to the monitoring system.

In the Cloud Audit service, the role allows viewing Managed Containers service events and the user's own actions, as well as exporting this data.

{/includetag}

{includetag(k8s-editor-magnum)}
Name in the management console: `Kubernetes operator`.

A role with permissions for working in the Managed Containers service. Some actions are only available in a specific cluster state. For example, installing and removing add-ons is only possible if the cluster is running.

A user with this role can:

- start and stop clusters;
- display information about the cluster and node groups;
- obtain the `kubeconfig` file;
- obtain a secret for access to the Kubernetes Dashboard;
- update the cluster version;
- change the virtual machine type;
- change the size of the Prometheus disk;
- add or remove a node group;
- change the scaling settings of node groups;
- change labels and taints;
- install or remove add-ons.

In the Cloud Logging service, the role allows viewing logs and generating credentials.

In the Cloud Monitoring service, the role allows viewing, creating, and editing dashboards, as well as writing to the monitoring system.

In the Cloud Audit service, the role allows viewing Managed Containers service events and the user's own actions, as well as exporting this data.

{/includetag}

{includetag(k8s-editor-managed)}
Name in the management console: `Kubernetes operator`.

A role with permissions for working in the Managed Containers service. Some actions are only available in a specific cluster state. For example, installing and removing add-ons is only possible if the cluster is running.

A user with this role can:

- start and stop clusters;
- display information about the cluster and node groups;
- obtain the `kubeconfig` file;
- obtain a secret for access to Headlamp;
- update the cluster version;
- change the virtual machine type;
- change the size of the Prometheus disk;
- add or remove a node group;
- change the scaling settings of node groups;
- change labels and taints;
- install or remove add-ons.

In the Cloud Logging service, the role allows viewing logs and generating credentials.

In the Cloud Monitoring service, the role allows viewing, creating, and editing dashboards, as well as writing to the monitoring system.

In the Cloud Audit service, the role allows viewing Managed Containers service events and the user's own actions, as well as exporting this data.

{/includetag}

{includetag(k8s-viewer-magnum)}
Name in the management console: `Kubernetes auditor`.

A role with permissions to view the Managed Containers service.

A user with this role can:

- view information about the cluster and node groups;
- obtain the `kubeconfig` file;
- obtain a secret for access to the Kubernetes Dashboard.

In the Cloud Logging service, the role allows viewing logs and generating credentials.

In the Cloud Monitoring service, the role allows viewing, creating, and editing dashboards, as well as writing to the monitoring system.

In the Cloud Audit service, the role allows viewing Managed Containers service events and the user's own actions, as well as exporting this data.

{/includetag}

{includetag(k8s-viewer-managed)}
Name in the management console: `Kubernetes auditor`.

A role with permissions to view the Managed Containers service.

A user with this role can:

- view information about the cluster and node groups;
- obtain a secret for access to Headlamp;
- obtain the `kubeconfig` file.

In the Cloud Logging service, the role allows viewing logs and generating credentials.

In the Cloud Monitoring service, the role allows viewing, creating, and editing dashboards, as well as writing to the monitoring system.

In the Cloud Audit service, the role allows viewing Managed Containers service events and the user's own actions, as well as exporting this data.

{/includetag}

{includetag(mcs_admin_network)}
Name in the management console: `Network administrator`.

The role allows creating, changing, and deleting network settings, including managing load balancers and DNS zones.

In the Cloud Logging service, the role allows viewing logs and generating credentials.

In the Cloud Monitoring service, the role allows viewing, creating, and editing dashboards, as well as writing to the monitoring system.

In the Cloud Audit service, the role allows viewing Cloud Network service events and the user's own actions, as well as exporting this data.
{/includetag}

{includetag(mcs_admin_network_objects)}
Name in the management console: `Internal network administrator`.

The role allows:

- viewing all data in the virtual network and DNS services;
- creating and editing virtual networks and subnets, routers;
- adding a Floating IP to the project.

In the Cloud Logging service, the role allows viewing logs and generating credentials.

In the Cloud Monitoring service, the role allows viewing, creating, and editing dashboards, as well as writing to the monitoring system.

The role does not grant access to the Cloud Audit service.
{/includetag}

{includetag(mcs_admin_network_security)}
Name in the management console: `Network security administrator`.

The role allows creating, changing, and deleting access control lists (ACLs). Provides access to all objects of the network subsystem.

In the Cloud Logging service, the role allows viewing logs and generating credentials.

In the Cloud Monitoring service, the role allows viewing dashboards.

The role does not grant access to the Cloud Audit service.
{/includetag}

{includetag(mcs_admin_vm)}
Name in the management console: `Virtual machine administrator`.

The role grants full access to manage virtual machines in Cloud Servers, including creation, modification, and deletion. Full access to manage networks in Cloud Network is also granted.

Cannot configure virtual machine backups using Cloud Backup.

In the Cloud Logging service, the role allows viewing logs and generating credentials.

In the Cloud Monitoring service, the role allows viewing, creating, and editing dashboards, as well as writing to the monitoring system.

In the Cloud Audit service, the role allows viewing all project events.

{/includetag}

{includetag(mcs_admin_vm_junior)}
Name in the management console: `Junior VM administrator`.

A role with the same privileges as the `mcs_admin_vm` role, but without the ability to manage security groups in Cloud Network.

In the Cloud Logging service, the role allows viewing logs and generating credentials.

In the Cloud Monitoring service, the role allows viewing, creating, and editing dashboards, as well as writing to the monitoring system.

In the Cloud Audit service, the role allows viewing all project events.

{/includetag}

{includetag(mcs_operator_vm)}
Name in the management console: `VM operator`.

The role is used only for working with already created Cloud Servers virtual machines and Cloud Networks networks:

- starting or stopping VMs;
- working with VMs via the VNC console;
- connecting to VMs via SSH or RDP;
- viewing VM parameters and network settings.

In the Cloud Logging service, the role allows viewing logs.

In the Cloud Monitoring service, the role allows viewing dashboards and writing to the monitoring system.

The role does not grant access to the Cloud Audit service.
{/includetag}
