Kubernetes clusters version 1.23 and higher are tightly integrated with the VK Cloud platform:

- Single Sign-On (SSO) technology is used.

  The user logs in to the Kubernetes cluster with the same credentials as when logging in to the VK Cloud [personal account](../../../../additionals/account).

  SSO functionality cannot be disabled.

- The user's roles in the personal account affect:

  - [Available operations with clusters in the personal account](../../../../additionals/account/concepts/rolesandpermissions#roles_for_the_containers_service_and_their_permissions).
  - [Available actions in the cluster](#relationship-between-the-roles-of-personal-account-and-kubernetes).

    A user with a specific personal account role is assigned an appropriate [Kubernetes role](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles). The Kubernetes role defines which cluster objects are available to the user and what actions are allowed to be performed on these objects.

- The Kubernetes superadministrator and administrator manage cluster access by assigning roles to users in a personal account.

  There is no need to configure user rights separately for personal accounts and for Kubernetes clusters. For example, disabling a user account or revoking a role in a personal account results in revoking the access rights to Kubernetes clusters.

<info>

To get the same capabilities for older clusters, [upgrade](../../operations/update) to version 1.23 or higher.

</info>

## Relationship between the roles of personal account and Kubernetes

<tabs>
<tablist>
<tab>Kubernetes Auditor</tab>
<tab>Kubernetes Operator </tab>
<tab>Project Owner<br>Project Administrator<br>Super Administrator<br>Kubernetes Administrator</tab>
</tablist>
<tabpanel>

**Kubernetes role:** `view`.

The role provides read access to most objects in the namespace.

The role does not provide:

- Ability to view or change roles and role bindings.
- Access to secrets.

  A user with access to secrets can access the credentials of any service account in the namespace. This will allow access to the API on behalf of any service account in the namespace. For the read-only role, this will be considered as privilege escalation.

</tabpanel>
<tabpanel>

**Kubernetes role:** `edit`.

Role provides:

- All privileges available to the `view` role.
- Read and write access to most objects in the namespace.
- Access to secrets, which allows you to run pods on behalf of any service account in the namespace. The role can be used, for example, to access the API.

The role does not provide:

- Ability to view or change roles and role bindings.
- Write access to Kubernetes cluster [endpoints](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#write-access-for-endpoints) version 1.22 and higher.

</tabpanel>
<tabpanel>

**Kubernetes role:** `admin`.

It is recommended to assign the `admin` role within the namespace using role bindings.

Role provides:

- All privileges available to the `edit` role.
- Read and write access to the most objects in the namespace, including the ability to create other roles and role binding.

The role does not provide:

- Write access to the resource quota or to the namespace itself.
- Write access to Kubernetes cluster [endpoints](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#write-access-for-endpoints) version 1.22 and higher.

</tabpanel>
</tabs>

To view a list of available resources for a role, connect to the cluster and run the command:

``` bash
kubectl describe clusterrole <role in Kubernetes>
```
