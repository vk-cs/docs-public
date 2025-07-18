When a user is invited to a [project](../projects), one is assigned with a role. The role defines the scope of [permissions](#roles_permissions) available to a user when working with the management console and the cloud services.

The same user can be a member of several projects and have different roles in each of them. The same user can be assigned several roles in one project; in this case, the permissions of all assigned roles are summarized.

In addition to users, [service accounts](../service-accounts) can be added to a project. They are intended for enabling interactions between programs and services. Service accounts can be assigned any roles listed below, except for the Project owner role.

You can [view](../../instructions/project-settings/access-manage) the list of project members and their roles on the **Manage access** page of the management console.

## General project management roles

[cols="1,3", options="header"]
|===

| Role
| Description

| Project owner
| A user with the widest set of permissions.

A Project owner is a user who created the project or for whom it was created automatically by the platform during the account registration.

There can be only one Project owner in a project. This role cannot be assigned to an existing user or to a member that is being invited.

| Superadministrator
| A user with the same permissions as the Project owner, including linking a card and making payments.

| Project administrator
| A user who can create and edit objects in all services.

A Project administrator cannot:

- activate services
- make payments (can only view the project balance)
- invite members to the project.

| User access administrator
| A role intended for [working with project members](../../instructions/project-settings/access-manage) on the access management page.

A User access administrator can invite, delete project members, and change the roles assigned to them.

This role has no access to services and to project balance information.

| Billing administrator
| A role intended for project balance management.

A billing administrator can:

- [link](/en/intro/billing/instructions/add-card) a card to the project, if not linked yet;
- make a [payment](/en/intro/billing/instructions/payment) or configure balance auto-completion.

This role has no access to services and to the list of project members.

| Viewer
| A user who has read access to all project information, including the members list, services, project balance, and expenses details.

A viewer cannot create any objects or edit any settings, except the settings of their account.

|===

## Specialized roles

Each of the roles below is intended for working with one of the platform services only. There roles have permissions:

- in their target service
- in adjacent services, to an extent that is necessary for working with their target service.

All these roles have no access to the project members list and to project balance information.

For detailed information about the permissions of these roles, see [Permissions for all roles](#roles_permissions).

All operations available to specialized roles are also available to Project owner, Superadministrator, and Project administrator.

[cols="1,3", options="header"]
|===

| Role
| Description

| Virtual machine administrator
| A user with this role can perform basic operations in the Cloud Servers service.

However, this role has only read permissions for:

- backup plans
- file storages.

This user can also create and edit rule groups (firewalls) in the Virtual networks service.

| Junior VM administrator
| A user with this role can perform the same operations as the virtual machine administrator, except for creating, editing, and deleting rule groups in the firewall settings.

| Virtual machine operator
| A user with this role can work on a virtual machine, but cannot manage its settings.

The VM operator can:

- Start or stop a VM.
- Operate a VM via the [VNC console](/en/computing/iaas/instructions/vm/vm-console).
- Connect to a VM via [SSH](/en/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) or [RDP](/en/computing/iaas/instructions/vm/vm-connect/vm-connect-win).
- View a VM configuration and network settings.

The VM operator cannot create backups.

| Network administrator
| A user with this role can perform a full set of operations in the Virtual networks and DNS services.

| Network security administrator
| A user with this role has read access to the Virtual networks and DNS services.

He can create and edit only rule groups (firewalls).

| Internal network administrator
| A user with this role:

- has read access to the Virtual networks and DNS services
- can create and edit virtual networks and subnets, routers
- can add floating IP addresses to the project.

| Kubernetes administrator, operator, and auditor
| For detailed information about the permissions of these roles, see [Roles for the Cloud Containers service and their permissions](#roles_permissions_kubernetes).

|===

## {heading(Permissions for all roles)[id=roles_permissions]}

Each role has certain permissions set to perform operations.

![Roles and permissions](assets/roles_and_permissions_full_en.png){params[noBorder=true]}

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
- Kubernetes auditor.

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
