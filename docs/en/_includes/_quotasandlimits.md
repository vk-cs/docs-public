{includetag(common)}
Quotas are the restrictions applied to the project:

- on the use of virtual computing resources of the platform;
- on the creation of objects in specific services.

Technical limits are restrictions due to the architectural specifics of {var(cloud)} that cannot be exceeded.

For more information on what quotas and limits in a project are and how to increase them, see the {linkto(/en/tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Quotas and limits]} section of the project.

{/includetag}

<!-- Kubernetes containers -->

{includetag(k8s)}

## {heading(Container resources for a single project)[id=quotasandlimits-k8s-one-project]}

[cols="2,2,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Basic quota
| Increased quota
| Limit

| Number of Kubernetes clusters
| **Kubernetes clusters**
| 0 pcs.
| 1 pcs.
| not limited

| Number of {linkto(../../../../kubernetes/k8s/concepts/architecture#k8s-architecture-topology)[text=nodes]}
| **Kubernetes nodes**
| 0 pcs.
| 5 pcs.
| not limited

| Number of worker node groups
| **Kubernetes node groups**
| 0 pcs.
| 5 pcs.
| not limited

| Number of vCPUs of all nodes
| **Kubernetes vCPU**
| 0 pcs.
| 40 pcs.
| not limited

| Total amount of RAM of all nodes
| **Kubernetes RAM**
| 0 GB
| 100 GB
| not limited

| Number of disks of all nodes
| **Kubernetes disks**
| 0 pcs.
| 5 pcs.
| not limited

| Total disk size of all nodes
| **Kubernetes disk size**
| 0 GB
| 500 GB
| not limited
|===

## {heading(Limits without quotas)[id=include-quotasandlimits-k8s-no-quotas-limits]}

In addition to the quotas listed above, the use of the Managed Containers service is also limited by certain technical limits.

[cols="3,1,1", options="header"]
|===
|Parameter
|Limit
|Hard

|Length of Kubernetes cluster name and node group name
|24 characters
|![](../../../../assets/check.svg "inline")

|Number of nodes in a group
|500 pcs.
|![](../../../../assets/check.svg "inline")

|Number of master nodes in a cluster
|1, 3, or 5 pcs.
|![](../../../../assets/check.svg "inline")

|Number of nodes in a single {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zone]}
|200 pcs.
|![](../../../../assets/no.svg "inline")

|Number of node groups in a cluster
|50 pcs.
|![](../../../../assets/no.svg "inline")

|Number of {linkto(../../../../kubernetes/k8s/reference/pods#k8s-pods)[text=pods]} per cluster
|50000 pcs.
|![](../../../../assets/no.svg "inline")

|Number of pods per node
|110 pcs.
|![](../../../../assets/no.svg "inline")

|Number of services per cluster
|5000 pcs.
|![](../../../../assets/no.svg "inline")

|Number of namespaces per cluster
|5000 pcs.
|![](../../../../assets/no.svg "inline")

|Number of objects per cluster
|100000 pcs.
|![](../../../../assets/no.svg "inline")

|Size of the [etcd](https://etcd.io/) database
|6 GB
|![](../../../../assets/no.svg "inline")

|Volume of resources of a single type
|800 MB
|![](../../../../assets/no.svg "inline")
|===

Non-hard limits can be exceeded without approval from a manager. For recommendations on these and other parameters, see the [official Kubernetes documentation](https://kubernetes.io/docs/setup/best-practices/cluster-large/). The limit on the number of nodes in a node group is not due to Kubernetes requirements; this restriction is introduced at the {var(cloud)} level.

{/includetag}

<!--Networks-->

{includetag(nets1)}

The limits in this section are due to operational requirements; they are applied to ensure stable network operation. We do not recommend requesting quotas that exceed the corresponding limits through a manager.

## {heading(Networks, subnets, and IP addresses)[id=quotasandlimits-nets-subnets-ips]}

{tabs}

{tab(Sprut)}

[cols="3,2,2,1,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Quota in CLI
| Basic quota
| Increased quota
| Limit
| Hard

| Number of networks in the project
| **Sprut networks**
| `network`
| 2 pcs.
| 5 pcs.
| 50 pcs.
| ![](../../../../assets/no.svg "inline")

| Number of subnets in the project
| **Sprut subnets**
| `subnet`
| 2 pcs.
| 5 pcs.
| 50 pcs.
| ![](../../../../assets/no.svg "inline")

| Number of Floating IP addresses
| **Sprut IP addresses**
| `floatingip`
| 0 pcs.
| 1 pcs.
| 50 pcs.
| ![](../../../../assets/no.svg "inline")

| Number of Anycast IP addresses
| ![](../../../../assets/no.svg "inline")
| `anycastip`
| 0 pcs.
| 0 pcs.
| 50 pcs.
| ![](../../../../assets/no.svg "inline")
|===

{/tab}

{tab(Neutron)}

[cols="3,2,2,1,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Quota in CLI
| Basic quota
| Increased quota
| Limit
| Hard

| Number of networks in the project
| **Neutron networks**
| `network`
| 2 pcs.
| 5 pcs.
| 20 pcs.
| ![](../../../../assets/no.svg "inline")

| Number of subnets in the project
| **Neutron subnets**
| `subnet`
| 2 pcs.
| 5 pcs.
| 20 pcs.
| ![](../../../../assets/no.svg "inline")

| Number of Floating IP addresses
| **Neutron IP addresses**
| `floatingip`
| 0 pcs.
| 1 pcs.
| 50 pcs.
| ![](../../../../assets/no.svg "inline")
|===

{/tab}

{/tabs}

Even if the quota for the total number of subnets in the project has been increased, we do not recommend creating more than 20 subnets in a single network.

{/includetag}

{includetag(nets2)}

## {heading(Load balancers)[id=quotasandlimits-nets-balancers]}

{tabs}

{tab(Octavia)}

[cols="2,1,1,1,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Quota in CLI
| Basic quota
| Increased quota
| Limit
| Hard

| Number of load balancers
| **Octavia load balancers**
| `load_balancers`
| 0 pcs.
| 2 pcs.
| 20 pcs.
| ![](../../../../assets/no.svg "inline")

| Number of balancing rules per load balancer
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| 10 pcs. via management console, 30 pcs. via CLI
| ![](../../../../assets/no.svg "inline")
|===

{/tab}

{/tabs}

You can exceed the limit on the number of balancing rules per load balancer (10 pcs.) without approval from a manager. To do this, create the rules using the OpenStack CLI. For stable operation, we do not recommend using more than 30 rules per load balancer.

The **Neutron load balancers** quota, which is displayed in the management console, is not used.

{/includetag}

{includetag(nets3)}

## {heading(Other parameters)[id=quotasandlimits-nets-other]}

{tabs}

{tab(Sprut)}

[cols="3,2,2,1,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Quota in CLI
| Basic quota
| Increased quota
| Limit
| Hard

| Number of routers
| **Sprut routers**
| `router`
| 1 pcs.
| 1 pcs.
| 20 pcs.
| ![](../../../../assets/no.svg "inline")

| Number of advanced routers
| **Sprut routers**
| `dc_router`
| 0 pcs.
| 0 pcs.
| 3 pcs.
| ![](../../../../assets/no.svg "inline")

| Number of security groups in the project
| **Sprut security groups**
| `security_group`
| 10 pcs.
| 20 pcs.
| not limited
| ![](../../../../assets/no.svg "inline")

| Number of security rules in the project
| **Sprut security rules**
| `security_group_rule`
| 50 pcs.
| 120 pcs.
| not limited
| ![](../../../../assets/no.svg "inline")

| Number of ports in the project
| **Sprut ports**
| `port`
| 30 pcs.
| 75 pcs.
| 500 pcs.
| ![](../../../../assets/no.svg "inline")

| Number of ports with addresses on the external network in the project
| **Sprut ports on external network**
| `external_port`
| 0 pcs.
| 1 pcs.
| 12 pcs.
| ![](../../../../assets/no.svg "inline")
|===

{/tab}

{tab(Neutron)}

[cols="3,2,2,1,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Quota in CLI
| Basic quota
| Increased quota
| Limit
| Hard

| Number of routers
| **Neutron routers**
| `router`
| 1 pcs.
| 1 pcs.
| 20 pcs.
| ![](../../../../assets/no.svg "inline")

| Number of advanced routers
| **Neutron routers**
| `dc_router`
| 0 pcs.
| 0 pcs.
| 3 pcs.
| ![](../../../../assets/no.svg "inline")

| Number of security groups in the project
| **Neutron security groups**
| `security_group`
| 10 pcs.
| 20 pcs.
| not limited
| ![](../../../../assets/no.svg "inline")

| Number of security rules in the project
| **Neutron security rules**
| `security_group_rule`
| 50 pcs.
| 120 pcs.
| not limited
| ![](../../../../assets/no.svg "inline")

| Number of ports in the project
| **Neutron ports**
| `port`
| 30 pcs.
| 75 pcs.
| 500 pcs.
| ![](../../../../assets/no.svg "inline")

| Number of Neutron ports with addresses on the external network in the project
| **Neutron ports on external network**
| `external_port`
| 0 pcs.
| 1 pcs.
| 6 pcs.
| ![](../../../../assets/no.svg "inline")
|===

{/tab}

{/tabs}

{/includetag}

<!--Cloud Backup-->

{includetag(backup)}

[cols="2,1,1,1,1,1", options="header"]
|===
| Parameter
| Quota from CLI
| Basic quota
| Increased quota
| Limit
| Hard

| Number of backups
| `backup`
| 10 pcs.
| 50 pcs.
| not limited
| ![](../../../../assets/no.svg "inline")

| Number of snapshots
| `snapshot`
| 0 pcs.
| 5 pcs.
| not limited
| ![](../../../../assets/no.svg "inline")

| Size of a single backup
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| 320 TB
| ![](../../../../assets/no.svg "inline")

| Total volume of images
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| 2 TB
| ![](../../../../assets/no.svg "inline")
|===

The limit on backup size (320 TB) is due to the file size limit in the {var(s3)} service, which is used to store backups. This limit can be increased by contacting a manager by email at [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru).

{/includetag}

<!--S3-->

{includetag(s3)}

{ifdef(public)}
There are no quotas for the {var(s3)} service. The use of these services is limited only by technical limits.
{/ifdef}

{ifndef(private, private-pdf, private-pg, private-pg-pdf, private-cert)}
{include(/en/storage/s3/_includes/_s3_limits.md)}
{/ifndef}

{ifdef(public)}
Rate limits can be increased by contacting a manager by email at [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru).
{/ifdef}

{/includetag}
