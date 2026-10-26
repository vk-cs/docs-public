# {heading(Access management)[id=k8s-concepts-iam]}

{include(/en/_includes/_translated_by_ai_en.md)}

To differentiate permissions for {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=invited]} members of a {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} or {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=service accounts]}, Managed Containers uses a unified identity and access management service — {linkto(../../../../access/iam#iam)[text=IAM]}. Access can be managed centrally from the {var(cloud)} personal dashboard.

The list of actions available to a project member in the Managed Containers service is determined by:

- {linkto(#k8s-concepts-iam-basic-roles)[text=Basic role]} — defines user permissions at the level of all {var(cloud)} services.
- {linkto(#k8s-concepts-iam-special-roles)[text=Specialized role]} — defines user permissions at the level of individual {var(cloud)} services.

Configuring individual {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=permissions]} for Managed Containers is not supported.

Roles can be {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=assigned]} only by project members with the `Project Owner`, `Superadministrator`, and `User Administrator (IAM)` roles. When choosing roles, follow the principle of least privilege: a user should have only the permissions without which their tasks cannot be performed.

## {heading(Basic roles)[id=k8s-concepts-iam-basic-roles]}

The basic roles `Project Owner`, `Superadministrator`, and `Project Administrator` grant full access to all Managed Containers operations; there is no need to configure individual roles.

### {heading(mcs_owner)[id=k8s-concepts-iam-basic-roles-mcs_owner]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_owner]}

### {heading(mcs_co_owner)[id=k8s-concepts-iam-basic-roles-mcs_co_owner]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_co_owner]}

### {heading(mcs_admin)[id=k8s-concepts-iam-basic-roles-mcs_admin]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin]}

### {heading(mcs_admin_security)[id=k8s-concepts-iam-basic-roles-mcs_admin_security]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_security]}

### {heading(mcs_viewer)[id=k8s-concepts-iam-basic-roles-mcs_viewer]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_viewer]}

## {heading(Specialized roles)[id=k8s-concepts-iam-special-roles]}

For the Managed Containers service, several {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=specialized roles]} are available that can be used together with a {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=basic role]} or on their own.

### {heading(mcs_k8s_viewer)[id=k8s-concepts-iam_viewer]}

{include(/en/_includes/_iam_roles.md)[tags=k8s-viewer-magnum]}

### {heading(mcs_k8s_editor)[id=k8s-concepts-iam_editor]}

{include(/en/_includes/_iam_roles.md)[tags=k8s-editor-magnum]}

### {heading(mcs_k8s_admin)[id=k8s-concepts-iam_admin]}

{include(/en/_includes/_iam_roles.md)[tags=k8s-admin-magnum]}

## {heading(Relationship between personal dashboard roles and Kubernetes)[id=k8s-concepts-iam-k8s-roles]}

A user {linkto(../access-management#k8s-access-management)[text=authenticates]} in a Kubernetes cluster with the same credentials as when logging in to the {var(cloud)} personal dashboard, using Single Sign-On (SSO) technology. Each specialized role — Kubernetes administrator, operator, or auditor — also determines the internal [Kubernetes role](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles) available to the user. The Kubernetes role determines which cluster objects are available to the user and which actions are allowed to be performed on those objects.

To view the list of resources available for a role, connect to the cluster and run the command:

```console
kubectl describe clusterrole <KUBERNETES_ROLE>
```

{tabs}

{tab(Kubernetes auditor)}

Kubernetes role: `view`.

The role provides read access to most objects in a namespace.

The role does not provide:

- Access to view or modify roles and role bindings.
- Access to secrets.

  A user with access to secrets can obtain the credentials of any service account in a namespace. This would allow access to the API on behalf of any service account in the namespace. For a role with read-only permissions, this would be considered a privilege escalation.

{/tab}

{tab(Kubernetes operator)}

Kubernetes role: `edit`.

The role provides:

- Read and write access to most objects in a namespace.
- Access to secrets, which allows running pods on behalf of any service account in the namespace. The role can be used, for example, to gain access to the API.

The role does not provide:

- Access to view or modify roles and role bindings.
- [Write access to endpoints](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#write-access-for-endpoints) of Kubernetes clusters version 1.22 and higher.

{/tab}

{tab(Kubernetes administrator)}

Kubernetes role: `admin`.

It is recommended to assign the `admin` role within a namespace using a role binding.

The role provides:

- Read and write access to most objects in a namespace, including the ability to create other roles and role bindings (role binding).
- Access to secrets, which allows running pods on behalf of any service account in the namespace. The role can be used, for example, to gain access to the API.

The role does not provide:

- Write access to the resource quota or to the namespace itself.
- [Write access to endpoints](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#write-access-for-endpoints) of Kubernetes clusters version 1.22 and higher.

If a Kubernetes administrator disables a user account or revokes their role in the personal dashboard, that user's permissions to access Kubernetes clusters will also be revoked.

{/tab}

{/tabs}