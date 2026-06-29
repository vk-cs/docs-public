# {heading(Role-based access control model)[id=iam-concepts-rolesandpermissions]}

Immediately after creating a [project](../../../../tools-for-using-services/account/concepts/projects), it contains only one user — its owner. This user can [invite](../../../../tools-for-using-services/account/instructions/project-settings/invite) other members to the project by assigning them roles and permissions. Roles and permissions define the rights available to a user when working with the functionality of the management console and with cloud services.

*A role* is a specific set of permissions to perform operations with VK Cloud resources.

*A permission* allows a user to perform only one operation in a specific service or component.

You can find the full list of roles and permissions in the reference guides:

- [Roles reference](../roles-reference).
- [Permissions reference](../permissions-reference).

Each role and each permission has:

- a name in the management console, which is used to assign or remove the role via the graphical interface;
- a technical name, which is used to manage the project and services via [API](../../../../tools-for-using-services/api) and [Terraform](../../../../tools-for-using-services/terraform).

{cut(Examples)}

[cols="1,1", options="header"]
|===
| Name in the management console
| Technical name

| Project owner
| `mcs_owner`

| Billing administrator
| `mcs_admin_billing`

| Domain group management
| `domain_groups_modify`

| View Kafka instance property
| `dp_kafka_instances_view`

|===

{/cut}

The same user can be a member of multiple projects and have different roles and permissions in them. A single member can be assigned multiple roles and permissions within one project; in this case, the rights are cumulative.

In addition to users, [service accounts](../service-accounts) can also be added to a project; they are intended for interaction between programs and services. Any roles and permissions can be assigned to СУЗ, except for the `Project owner` role.

You can [view](../../instructions/access-manage) the list of project members and the roles and permissions assigned to them on the **Access management** page of the management console.

Some services have special sets of rights. Below are such sets of rights and how they relate to VK Cloud roles.

## {heading(Permissions in Cloud Logging)[id=roles_logging]}

[cols="2,1,1,1", options="header"]
|===
|Roles
|Viewing logs and service configuration
|Editing log settings
|Creating service users and names

|Project owner
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|Superadministrator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|Project administrator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|User access administrator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|Billing administrator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|Viewer
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|VM administrator, junior VM administrator, VM operator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/check.svg "inline")

|Network administrator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|Network security administrator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|Internal network administrator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/check.svg "inline")

|Kubernetes administrator, auditor, operator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/check.svg "inline")
|===

## {heading(Permissions in Cloud Monitoring)[id=roles_monitoring]}

[cols="2,1,1,1,1", options="header"]
|===
|Roles
|Viewing dashboards
|Viewing Prometheus metrics
|Recording in monitoring system
|Creating and editing dashboards

|Project owner
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|Superadministrator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|Project administrator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|User access administrator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|Billing administrator
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|Viewer
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|VM administrator, junior VM administrator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|VM operator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")

|Network administrator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|Network security administrator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|Internal network administrator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|Kubernetes administrator, auditor, operator
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
|===

## {heading(Permissions in Cloud Audit)[id=roles_audit]}

[cols="2,2,1,1", options="header"]
|===
|Roles
|Viewing events
|Downloading data
|Setting service

|Project owner
| All events of a project
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|Superadministrator
| All events of a project
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|Project administrator
| All events of a project
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|User access administrator
| All the IAM service events and all his/her actions
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|Billing administrator
| All the Billing service events and all his/her actions
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")

|Viewer
| All events of a project
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")

|VM administrator, junior VM administrator
| All events of a project
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|VM operator
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|Network administrator
| All the Cloud Network service events and all his/her actions
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")

|Network security administrator
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|Internal network administrator
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|Kubernetes administrator, auditor, operator
| All the Cloud Containers service events and all his/her actions
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
|===

## {heading(Permissions in Cloud Containers)[id=roles_permissions_kubernetes]}

The following user roles are intended for working with the [Сontainers service](/en/kubernetes/k8s):

- Kubernetes administrator
- Kubernetes operator
- Kubernetes auditor

The operations available to Kubernetes administrator are also available to Project owner, Superadministrator, and Project administrator.

For other roles these operations are unavailable.

For Kubernetes clusters of version 1.23 and later, the role of a Kubernetes administrator, operator, or auditor also defines the internal [Kubernetes role](/en/kubernetes/k8s/concepts/access-management#kubernetes-roles-relation) (`admin`, `edit`, or `view`) assigned to the user.

{note:info}

Some of the actions below are available only in the certain state of a cluster. For example, installing or deleting an add-on is possible only when a cluster is running.

{/note}

[cols="2,1,1,1,1"]
|===
.2+| Operations
4+| Roles

| Kubernetes administrator 
| Kubernetes operator 
| Kubernetes auditor 
| Viewer

| Create a cluster
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline") 

| Delete a cluster
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| Start a cluster
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| Stop a cluster
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline") 
| ![](/en/assets/no.svg "inline") 

| Show information about a cluster and node groups
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline")

| Get kubeconfig
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline")

| Get the secret to access the Kubernetes Dashboard 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline")

| Update version
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline") 

| Change the virtual machine type
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| Change the size of the Prometheus disk
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline") 

| Add a node group
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| Delete a node group
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| Change scaling settings
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| Change Labels and Taints
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

| Install and delete an add-on
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/check.svg "inline") 
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
|===

## {heading(Permissions in Security Gate)[id=roles_security_gate]}

The [Security Gate](https://cloud.vk.com/security-gate) service in the management console is available for the following roles:

-   Project owner
-   Superadministrator
-   Project administrator
-   Network security administrator
-   Internal network administrator
-   Virtual machine administrator
-   Junior VM administrator
-   Virtual machine operator
-   Viewer

The Security Gate service is not available for any other roles.
