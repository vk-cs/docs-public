The VK Cloud platform is based on [OpenStack](https://www.openstack.org/). The Kubernetes service architecture, based on OpenStack, gives users a wide range of capabilities, fault tolerance, scalability and integration with other services of the platform.

## Cluster topologies

A Kubernetes cluster consists of two types of nodes, master nodes and worker nodes:

- Master nodes store cluster-wide state information and manage workload distribution across worker nodes.

- Worker nodes perform the workload ([workload](https://kubernetes.io/docs/concepts/workloads/)). They can be organized into groups of worker nodes. Place groups in different [availability zones](../../../../additionals/it-security/platform-security#availability_zones) to improve fault tolerance.

Cluster high availablity depends on the number of master nodes. Possible configurations:

- Cluster with one master node.

  Such a cluster is not high available: even if there are several worker nodes and they are organized in groups, the cluster will become inoperative if the single master node is lost.

- A cluster with an odd number of master nodes (at least three).

  Such a cluster is high available: if several master nodes are lost, it will remain operational as long as there is at least one working master node. The further level of fault tolerance depends on the number and configuration of groups of worker nodes.

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

The Kubernetes VK Cloud cluster API endpoint is placed behind [dedicated load balancer](../network/), so the cluster API can be accessed via the same IP address regardless of the number of master nodes.

## Integration with VK Cloud platform

Integration with the VK Cloud platform is achieved through standard Kubernetes interfaces:

- [Container Storage Interface](https://kubernetes-csi.github.io/docs/) (CSI): integration with storage services.

  Allows to use VK Cloud storage in clusters as [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
  Persistent Volume Claim (PVC) is available.

  Integration is achieved using OpenStack Cinder API. See [Storage in cluster](../storage/) for details.

- [Container Network Interface](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/) (CNI): integration with network services.

  Every Kubernetes VK Cloud cluster has a [Calico](https://projectcalico.docs.tigera.io/about/about-calico) plugin that supports this interface. This plugin provides:

  - network connectivity between containers, [pods](../../k8s-reference/pods), and cluster nodes;
  - application and enforcement of Kubernetes [network policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/).

  Calico integrates with VK Cloud platform using OpenStack Neutron API. See [Network in cluster](../network/) for details.

## Built-in support for the Open Policy Agent

[Pods](https://kubernetes.io/docs/concepts/workloads/pods/) can access various information and components of a Kubernetes cluster. With certain settings, pods themselves and the Kubernetes cluster in which they run can be vulnerable to attacks.

Since Kubernetes version 1.21, [Open Policy Agent Gatekeeper](../../k8s-reference/gatekeeper/) is built into the cluster to increase the cluster's resistance to attacks. It allows you to apply constraints, which help to increase the security of deployed workload.

These constraints are created based on constraint templates. Kubernetes VK Cloud clusters already contain [preconfigured templates and constraints](../addons-and-settings/settings#pre_configured_gatekeeper_templates_and_constraints). You can create your own templates and constraints.

For clusters below version 1.21 it is recommended to [install Gatekeeper](../../install-tools/gatekeeper) manually or upgrade the cluster to the current version.

## Cluster scaling options

Kubernetes VK Cloud cluster has built-in scaling capabilities. You can do any type of scaling up to the limits of [quotas in action](../../../account/concepts/quotasandlimits/).

The following types of scaling are available:

- Manual scaling:

  - Vertical, which changes the amount of computing power of the cluster master nodes.
  
    The number of master nodes does not change.

  - Horizontal, which changes the number of worker nodes in the cluster node group.

    The computational power of the worker nodes does not change.

- Automatic scaling, where the number of worker nodes in the group of nodes changes depending on the load.

  This instantly adds capacity when the workload increases and throttles back when the workload drops. Auto-scaling saves up to 60% in processing power.

  Automatic scaling can be [configured](../../operations/scale) from 1 node up to 100 nodes.
