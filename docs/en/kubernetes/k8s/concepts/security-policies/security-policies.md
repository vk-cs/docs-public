# {heading(Security policies)[id=k8s-security-policies]}

{include(/en/_includes/_translated_by_ai_en.md)}

A Kubernetes cluster is a complex system in which many resources can be deployed. Typical risks that arise when operating such a system:

- granting overly broad access rights;
- deploying resources that are either vulnerable to attacks, consume too much capacity, or do not comply with corporate policies.

To mitigate these risks, the Managed Containers service, in addition to supporting {linkto(../access-management#k8s-access-management)[text=access control]} to the cluster, implements security policies.

Kubernetes cluster capabilities for working with security policies:

- Clusters have a built-in {linkto(../../reference/gatekeeper#k8s-gatekeeper)[text=Gatekeeper]}, which allows implementing security policies in a cluster using constraint templates and constraints. {linkto(#k8s-security-policies-default)[text=Preconfigured default security policies]} are also supported.
- The ability to {linkto(#k8s-security-policies-management-console)[text=work with security policies from the {var(cloud)} management console]} is provided.

## {heading(Default security policies)[id=k8s-security-policies-default]}

Kubernetes clusters in the Managed Containers service have default security policies that provide basic cluster protection against several common vulnerabilities:

[cols="2a", options="header"]
|===
|Default security policy
|Corresponding Gatekeeper resources

|{linkto(#k8s-security-policies-host-filesystem)[text=host-filesystem constraint]}
|Constraint and constraint template: `k8spsphostfilesystem`

|{linkto(#k8s-security-policies-host-namespaces)[text=host-namespaces constraint]}
|Constraint and constraint template: `k8spsphostnamespace`
|===

These policies are implemented using {linkto(../../concepts/addons-and-settings/settings#k8s-settings-templates-and-limitations)[text=preconfigured Gatekeeper templates and constraints]}. Default security policies are enabled by default in all clusters, but you can {linkto(#k8s-security-policies-management-console)[text=change or disable them via the management console]}.

## {heading(Working with security policies via the management console)[id=k8s-security-policies-management-console]}

You can configure common security policies via the management console. The necessary set of Gatekeeper constraints and constraint templates will be automatically created in the cluster.

At the same time, synchronization of security policies with the cluster is enabled by default and cannot be disabled. This affects the Gatekeeper resources in the cluster as follows:

- If a constraint or template corresponding to a policy enabled in the management console is deleted from the cluster, it will be restored.
- If the cluster contains manually created constraints that do not correspond to any policy enabled in the management console, they will be deleted.

For examples of working with third-party security policies, see the section {linkto(../../how-to-guides/gatekeeper#k8s-gatekeeper)[text=Using Gatekeeper]}.

When {linkto(../../instructions/manage-security#k8s-manage-security)[text=working with policies]} via the management console, it is not recommended to modify individual constraints or templates corresponding to any policies configured in the management console: incorrect operation or absence of policies may reduce cluster security.

{note:warn}
{var(cloud)} is not responsible for cluster problems that arise directly or indirectly from the actions described above.
{/note}

## {heading(Available security policies and their settings)[id=k8s-security-policies-available-policies]}

Some policies have no settings; for them, you can only select a namespace.

### {heading(Block NodePort)[id=k8s-security-policies-block-nodeport]}

{tabs}

{tab(Description)}

Prohibits the use of `NodePort` type services (services).

Using `NodePort` type services makes it possible to intercept traffic of other pods or nodes, bypassing network security tools.

{/tab}

{/tabs}

### {heading(Block Wildcard Ingress)[id=k8s-security-policies-block-wildcard-ingress]}

{tabs}

{tab(Description)}

Checks the Ingress resource for the presence of the `spec.rules.host` parameter in the Ingress routing rule. Prohibits using the following as values for the parameter:

- an empty string;
- the `*` wildcard in the value.

Using Ingress resources with the specified `spec.rules.host` values makes it possible to intercept traffic of other services, even if there is no direct access to those services.

{/tab}

{/tabs}

### {heading(Block Service Account update)[id=k8s-security-policies-block-service-account-upd]}

{tabs}

{tab(Description)}

Prohibits updating the service account for a workload ([workload](https://kubernetes.io/docs/concepts/workloads/)). The restriction does not apply to groups and users for whom exceptions are configured.

An unrestricted ability to change the service account for a workload can lead to privilege escalation in the cluster.

{/tab}

{tab(Settings)}

- **allowedGroups**: the name of the group whose members are allowed to update service accounts.

  You need to specify one group name in the field. To specify multiple groups, click the ![Plus](./assets/plus-icon.svg "inline") **Add** link. An unneeded field can be deleted by clicking the ![Delete](./assets/trash-icon.svg "inline") icon next to it.

- **allowedUsers**: the name of the user who is allowed to update service accounts.

  You need to specify one user name in the field. To specify multiple users, click the ![Plus](./assets/plus-icon.svg "inline") **Add** link. An unneeded field can be deleted by clicking the ![Delete](./assets/trash-icon.svg "inline") icon next to it.

{/tab}

{/tabs}

### {heading(Container resource requests)[id=k8s-security-policies-resources-request]}

{tabs}

{tab(Description)}

Makes a [compute resource request](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits) mandatory for containers: CPU in the `requests.cpu` parameter and memory in the `requests.memory` parameter. Checks that the values of these parameters do not exceed the configured thresholds.

The ability to create a container with excessively high requests can lead to resource exhaustion if limits are not set.

{/tab}

{tab(Settings)}

- **cpu**: the maximum amount of CPU that can be requested via `requests.cpu`. The value can include digits and (optionally) the `m` character.
- **memory**: the maximum amount of memory that can be requested via `requests.memory`. The value can include digits and one of the suffixes: `E`, `P`, `T`, `G`, `M`, `k`, `Ei`, `Pi`,`Ti`, `Gi`, `Mi`, `Ki`.

{/tab}

{/tabs}

### {heading(Container resource limits)[id=k8s-security-policies-resources-limits]}

{tabs}

{tab(Description)}

Makes specifying [compute resource limits](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits) mandatory for containers: CPU in the `limits.cpu` parameter and memory in the `limits.memory` parameter. Checks that the values of these parameters do not exceed the configured thresholds.

Creating a container with inflated limits can exhaust compute resources.

{/tab}

{tab(Settings)}

- **cpu**: the maximum amount of CPU that can be limited via `limits.cpu`. The value can include digits and (optionally) the `m` character.
- **memory**: the maximum amount of memory that can be limited via `limits.memory`. The value can include digits and one of the suffixes: `E`, `P`, `T`, `G`, `M`, `k`, `Ei`, `Pi`,`Ti`, `Gi`, `Mi`, `Ki`.

{/tab}

{/tabs}

### {heading(Running images with SHA hash)[id=k8s-security-policies-sha-hash-images]}

{tabs}

{tab(Description)}

Prohibits the use of container images without specifying a SHA hash (digest).

If a SHA hash is not specified in the value of the `image` parameter, it is not guaranteed that the same image version will be used. When using tags instead of hashes, a situation may occur where some pods use the old image while others use the new image, even though the image tags are identical.

{/tab}

{/tabs}

### {heading(Allowed repositories)[id=k8s-security-policies-allowed-repos]}

{tabs}

{tab(Description)}

Prohibits the use of container images with repository prefixes that are not specified as trusted in the settings.

Using images from untrusted repositories can reduce cluster security. For example, such images may contain embedded malicious code.

{/tab}

{tab(Settings)}

**repos**: the name of a trusted repository.

You need to specify one repository name in the field. To specify multiple repositories, click the ![Plus](./assets/plus-icon.svg "inline") **Add** link. An unneeded field can be deleted by clicking the ![Delete](./assets/trash-icon.svg "inline") icon next to it.

{/tab}

{/tabs}

### {heading(host-filesystem constraint)[id=k8s-security-policies-host-filesystem]}

{tabs}

{tab(Description)}

Prohibits the use of [hostPath](https://kubernetes.io/docs/concepts/storage/volumes/#hostpath) type volumes in containers. Mounting such volumes is equivalent to mounting a directory of a Kubernetes cluster node. The restriction does not apply to directories for which exceptions are configured.

Using `hostPath` without restrictions gives the container full access to the file system of the cluster node on which the pod runs. This can lead to disclosure of sensitive information about the cluster, privilege escalation, and other problems.

{/tab}

{tab(Settings)}

**pathPrefix**: the path prefix for which mounting is allowed.

If the path specified in `hostPath.path` contains this prefix, the directory at that path can be mounted into a container. For example, if the prefix `/foo` is set, the following directories can be mounted using `hostPath`:

- `/foo`
- `/foo/bar`

Additionally, for **pathPrefix** you can enable the **readOnly** option. When the option is enabled, the directory is mounted as read-only. In this case, the container must have the `volumeMounts[].readOnly: true` parameter set.

To specify multiple prefixes, click the ![Plus](./assets/plus-icon.svg "inline") **Add** link. An unneeded field can be deleted by clicking the ![Delete](./assets/trash-icon.svg "inline") icon next to it.

{/tab}

{/tabs}

### {heading(host-namespaces constraint)[id=k8s-security-policies-host-namespaces]}

{tabs}

{tab(Description)}

Prohibits access to inter-process communication (IPC) tools and processes of a Kubernetes cluster node using the `hostIPC: true` and `hostPID: true` parameters.

A pod started with these parameters gains the following capabilities:

- Viewing all processes running on the host.
- Forcibly terminating any process on the host with a `kill` command sent from the pod.
- Reading environment variables from the `/proc/[PID]/environ` file for each pod or process on the host.
- Access to the data of processes that use IPC for communication with each other.

These are very broad capabilities that are equivalent to vulnerabilities. They allow manipulating processes, disclosing sensitive environment variables, and exploiting other vulnerabilities.

{/tab}

{/tabs}

### {heading(Replica count constraint)[id=k8s-security-policies-min-max-replicas]}

{tabs}

{tab(Description)}

Prohibits specifying a number of replicas for Kubernetes deployments that does not fit within the configured range.

If there is no lower limit on the number of replicas, applications can be deployed without configured replication, which reduces fault tolerance. If there is no upper limit on the number of replicas, the cluster can be scaled excessively or its resources can be completely exhausted. For example, a situation may occur where the cluster performs automatic scaling up to the specified limit to accommodate excess replicas, while no available nodes remain to host a new workload.

{/tab}

{tab(Settings)}

- **min_replicas**: the minimum number of replicas;
- **max_replicas**: the maximum number of replicas.

{/tab}

{/tabs}