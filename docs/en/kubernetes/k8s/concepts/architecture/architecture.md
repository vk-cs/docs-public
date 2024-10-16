The VK Cloud platform is based on [OpenStack](https://www.openstack.org/). The Cloud Containers service architecture, based on OpenStack, gives users a wide range of capabilities, fault tolerance, scalability and integration with other services of the platform.

## Cluster topologies

A Kubernetes Cloud Containers cluster consists of two types of nodes, master nodes and worker nodes:

- Master nodes store cluster-wide state information and manage workload distribution across worker nodes.

- Worker nodes perform the workload ([workload](https://kubernetes.io/docs/concepts/workloads/)). They can be organized into groups of worker nodes. Place groups in different [availability zones](/en/intro/start/architecture#az) to improve fault tolerance.

Cluster high availablity depends on the number of master nodes and their distribution across [availability zones](/en/intro/start/concepts/architecture#az). Possible configurations:

- Cluster of one master node.

  Such a cluster is not high available: even if there are several worker nodes and they are organized in groups, the cluster will become inoperative if the single master node is lost.

- Standard Cloud Containers cluster of 3 or 5 master nodes.

  Such a cluster is fault tolerant at the availability zone level: if the availability zone is stable and several master nodes are lost, it will remain operational as long as there is at least one working master node. The further level of fault tolerance depends on the number and configuration of worker node groups.

- Regional Cloud Containers cluster of 3 or 5 master nodes.

  Master nodes of a regional cluster are distributed across all availability zones of a region. Such a cluster is maximally fault-tolerant: if one availability zone fails, the load will be distributed between the master nodes located in other availability zones.

Regardless of the cluster topology chosen, the master nodes use distributed key-value storage [etcd](https://etcd.io/) to store information about the state of the cluster:

- A cluster with one master node has one instance of `etcd`.
- Clusters with multiple master nodes have multiple instances of `etcd` running in cluster mode for high availability.
- Each `etcd` instance has a dedicated high-performance SSD disk (High-IOPS). This allows for the fastest possible interaction with the cluster API endpoint with minimal latency.

For high availability at the worker node level, it is recommended to create several groups of worker nodes in different availability zones and place application replicas on these nodes so that the replicas are also in different availability zones.

## Cluster environment

The following operating systems are used on the master and worker nodes:

- CentOS (up to Kubernetes 1.20).
- AlmaLinux (starting with Kubernetes 1.21). AlmaLinux is a fork of CentOS.

The cluster runs containers via Kubernetes [Container Runtime Interface](https://kubernetes.io/docs/concepts/architecture/cri/) (CRI) with CRI-O (starting with Kubernetes version 1.20).

<info>

Before Kubernetes 1.19, Docker\\[Dockershim](https://kubernetes.io/blog/2022/05/03/dockershim-historical-context/) was used to run containers and is now deprecated.

</info>

See [Available Kubernetes versions and version support policy](../versions/) for details.

## Integration with the Kubernetes API

All interaction with the cluster is through the [Kubernetes API](https://kubernetes.io/ru/docs/concepts/overview/kubernetes-api/).

The Cloud Containers cluster API endpoint is placed behind [dedicated load balancer](../network/), so the cluster API can be accessed via the same IP address regardless of the number of master nodes.

## Integration with VK Cloud platform

Integration with the VK Cloud platform is achieved through standard Kubernetes interfaces:

- [Container Storage Interface](https://kubernetes-csi.github.io/docs/) (CSI): integration with storage services.

  Allows to use Cloud storage in clusters as [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
  Persistent Volume Claim (PVC) is available.

  Integration is achieved using OpenStack Cinder API. See [Storage in cluster](../storage/) for details.

- [Container Network Interface](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/) (CNI): integration with network services.

  Every Cloud Containers cluster has a [Calico](https://projectcalico.docs.tigera.io/about/about-calico) plugin that supports this interface. This plugin provides:

  - network connectivity between containers, [pods](../../reference/pods), and cluster nodes;
  - application and enforcement of Kubernetes [network policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/).

  Calico integrates with VK Cloud platform using OpenStack Neutron API. See [Network in cluster](../network/) for details.

## Built-in support for the Open Policy Agent

[Pods](https://kubernetes.io/docs/concepts/workloads/pods/) can access various information and components of a Kubernetes cluster. With certain settings, pods themselves and the Kubernetes cluster in which they run can be vulnerable to attacks.

Since Kubernetes version 1.21, [Open Policy Agent Gatekeeper](../../reference/gatekeeper/) is built into the cluster to increase the cluster's resistance to attacks. It allows you to apply constraints, which help to increase the security of deployed workload.

These constraints are created based on constraint templates. Cloud Containers clusters already contain [preconfigured templates and constraints](../addons-and-settings/settings#pre_configured_gatekeeper_templates_and_constraints). You can create your own templates and constraints.

For clusters below version 1.21 it is recommended to [install Gatekeeper](../../install-tools/gatekeeper) manually or upgrade the cluster to the current version.

## Cluster scaling options

The Cloud Containers cluster has built-in [scaling capabilities for master nodes and worker nodes](../scale).

Automatic scaling is also supported: if it is configured, the number of worker nodes in the cluster is automatically adjusted depending on the needs of the workload.
