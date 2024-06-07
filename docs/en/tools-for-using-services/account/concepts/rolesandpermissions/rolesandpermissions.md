When a user is invited to a [project](../projects), he or she is assigned with a role. The role defines the scope of [permissions](#roles_and_their_permissions_the_full_matrix) available to the user when working with the personal account and with the cloud services.

The same user can be a member of several projects and have different roles in each of them. The same user can be assigned with several roles in one project; in this case, the permissions of all assigned roles are summarized.

You can [view](../../service-management/project-settings/access-manage) the list of project members and their roles on the **Manage access** page of the personal account.

## General project management roles

### Project owner

A user with the widest set of permissions.

A Project owner is a user who created the project or for whom it was created automatically by the platform during the account registration.

There can be only one Project owner in a project. This role cannot be assigned to an existing user or to a member that is being invited.

### Superadministrator

A user with the same permissions as the Project owner, including linking a card and making payments.

Superadministrator is the only role, besides the Project owner, who can [activate services](../../service-management/activation) in the project.

### Project administrator

A user who can create and edit objects in all services.

A Project administrator cannot:

- activate services;
- make payments (can only view the project balance);
- invite members to the project.

### User access administrator

A role intended for [working with project members](../../service-management/project-settings/access-manage) on the access management page.

A User access administrator can invite, delete project members, and change the roles assigned to them.

This role has no access to services and to project balance information.

### Billing administrator

A role intended for project balance management.

A billing administrator can:

- [link](/en/intro/billing/service-management/add-card) a card to the project, if not linked yet;
- make a [payment](/en/intro/billing/service-management/payment) or configure balance auto-completion.

This role has no access to services and to the list of project members.

### Viewer

A user who has read access to all project information, including the members list, services, project balance, and expenses details.

A viewer cannot create any objects or edit any settings, except the settings of their account.

## Specialized roles

Each of the roles below is intended for working with one of the platform services only. There roles have permissions:

- in their target service;
- in adjacent services, to an extent that is necessary for working with their target service.

All these roles have no access to the project members list and to project balance information.

For detailed information about the permissions of these roles, see section [Roles and their permissions: the full matrix](#roles_and_their_permissions_the_full_matrix).

All operations available to specialized roles are also available to Project owner, Superadministrator, and Project administrator.

### Virtual machine administrator

A user with this role can perform basic operations in the Cloud Servers service.

However, this role has only read permissions for:

- backup plans;
- file storages.

This user can also create and edit rule groups (firewalls) in the Virtual networks service.

### Network administrator

A user with this role can perform a full set of operations in the Virtual networks and DNS services.

### Network security administrator

A user with this role has read access to the Virtual networks and DNS services.

He can create and edit only rule groups (firewalls).

### Internal network administrator

A user with this role:

- has read access to the Virtual networks and DNS services;
- can create and edit virtual networks and subnets, routers;
- can add floating IP addresses to the project.

### Kubernetes administrator, operator, and auditor

For detailed information about the permissions of these roles, see section [Roles for the Cloud Containers service and their permissions](#roles_for_the_containers_service_and_their_permissions).

## Roles and their permissions: the full matrix

Permissions are the privileges for viewing (**R** in the table below) or editing (**RW**) of certain objects. An editing permission includes the privilege of creating and deleting an object, and also includes the permission for viewing. A dash (**—**) indicates no access to a service or functionality.

![](assets/roles_and_permissions_en.png)

## Roles for the Containers service and their permissions

The following user roles are intended for working with the [Сontainers service](/en/kubernetes/k8s):

- Kubernetes administrator,
- Kubernetes operator,
- Kubernetes auditor.

The operations available to Kubernetes administrator are also available to Project owner, Superadministrator, and Project administrator.

For other roles these operations are unavailable.

For Kubernetes clusters of version 1.23 and later, the role of a Kubernetes administrator, operator, or auditor also defines the internal [Kubernetes role](/en/kubernetes/k8s/concepts/access-management#relationship_between_the_roles_of_personal_account_and_kubernetes) (`admin`, `edit`, or `view`) assigned to the user.

<info>

Some of the actions below are available only in the certain state of a cluster. For example, installing or deleting an add-on is possible only when a cluster is running.

</info>

<!-- prettier-ignore -->
| Operation/Role                                       |  Kubernetes<br>administrator | Kubernetes<br>operator | Kubernetes<br>auditor | Viewer |
|------------------------------------------------------| ---------------------------  | ---------------------- | --------------------- | ------ |
| Create a cluster                                     | &#10003; | —        | —        | — |
| Delete a cluster                                     | &#10003; | —        | —        | — |
| Start a cluster                                      | &#10003; | &#10003; | —        | — |
| Stop a cluster                                       | &#10003; | &#10003; | —        | — |
| Show information about<br>a cluster and node groups  | &#10003; | &#10003; | &#10003; | &#10003; |
| Get kubeconfig                                       | &#10003; | &#10003; | &#10003; | — |
| Get the secret to access<br>the Kubernetes Dashboard | &#10003; | &#10003; | &#10003; | &#10003; |
| Update version                                       | &#10003; | &#10003; | —        | — |
| Change the virtual machine type                      | &#10003; | &#10003; | —        | — |
| Change the size of the Prometheus disk               | &#10003; | &#10003; | —        | — |
| Add a node group                                     | &#10003; | &#10003; | —        | — |
| Delete a node group                                  | &#10003; | &#10003; | —        | — |
| Change scaling settings                              | &#10003; | &#10003; | —        | — |
| Change Labels and Taints                             | &#10003; | &#10003; | —        | — |
| Install/delete an add-on                           | &#10003; | &#10003; | —        | — |
<!-- prettier-ignore -->
