Cloud Containers clusters version 1.23 and higher are tightly integrated with the VK Cloud platform:

- Single Sign-On (SSO) technology is used.

  The user [authenticates](#how_does_the_authentication_process_work) in the Kubernetes cluster with the same credentials as when logging into the VK Cloud [management console](/en/tools-for-using-services/account).

  SSO functionality cannot be disabled.

- The user's roles in the management console affect:

  - [Available operations with clusters in the management console](/en/tools-for-using-services/account/concepts/rolesandpermissions#roles_for_the_containers_service_and_their_permissions).
  - [Available actions in the cluster](#kubernetes-roles-relation).

    A user with a specific management console role is assigned an appropriate [Kubernetes role](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles). The Kubernetes role defines which cluster objects are available to the user and what actions are allowed to be performed on these objects.

- The Kubernetes superadministrator and administrator manage cluster access by assigning roles to users in a management console.

  There is no need to configure user rights separately for management consoles and for Kubernetes clusters. For example, disabling a user account or revoking a role in a management console results in revoking the access rights to Kubernetes clusters.

<info>

To get the same capabilities for older clusters, [upgrade](../../service-management/update) to version 1.23 or higher.

</info>

## How does the authentication process work

When using [kubectl](../../connect/kubectl), the `keystone-auth` utility is responsible for authentication.

The cluster configuration file is used for the operation of kubectl ([kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)). This file contains all the user's details, except for the password (it is not specified for security reasons). Therefore, when using kubectl, the keystone-auth utility will require you to enter the user's password interactively in order to authenticate:

```text
Please enter password:
```

After successful authentication, a token with a short lifetime is issued, which gives temporary access to the cluster. When the token expires, `keystone-auth` will require you to enter the password again in order to update the token. This will happen both when working with kubectl and with other tools that work with such tokens — for example, `kauthproxy` uses them for authentication in the [web interfaces of cluster components and add-ons](../../connect).

This authentication process is inconvenient when working with automated tools that need access to the cluster. To provide access to the cluster for such tools, [create a kubeconfig file for the service account](../../how-to-guides/sa-kubeconfig). This kubeconfig contains the details of the service account and the corresponding token with an infinite lifetime, which allows you to authenticate without entering a password.

## {heading(Relationship between the roles of management console and Kubernetes)[id=kubernetes-roles-relation]}

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
- Write access to Cloud Containers cluster [endpoints](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#write-access-for-endpoints) version 1.22 and higher.

</tabpanel>
<tabpanel>

**Kubernetes role:** `admin`.

It is recommended to assign the `admin` role within the namespace using role bindings.

Role provides:

- All privileges available to the `edit` role.
- Read and write access to the most objects in the namespace, including the ability to create other roles and role binding.

The role does not provide:

- Write access to the resource quota or to the namespace itself.
- Write access to Cloud Containers cluster [endpoints](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#write-access-for-endpoints) version 1.22 and higher.

</tabpanel>
</tabs>

To view a list of available resources for a role, connect to the cluster and run the command:

``` bash
kubectl describe clusterrole <role in Kubernetes Cloud Containers>
```
