Cloud Containers provides environment for working with Kubernetes clusters on the VK Cloud platform. With its architecture based on [OpenStack](https://www.openstack.org/), Cloud Containers offers extensive capabilities, fault tolerance, scalability, and integration with other platform services.

{cut(How Cloud Containers interacts with other VK Cloud services)}

Cloud Containers ensures the proper functioning of Kubernetes clusters, while:

- [Cloud Servers](/en/computing/iaas) manages VMs on the nodes of the cluster.
- [Cloud Networks](/en/networks/vnet) manages the network of the cluster.

![Service architecture](/en/kubernetes/k8s/assets/k8s_arch.png){params[noBorder=true; width=50%]}

{/cut}

## Cluster topologies

A Kubernetes cluster in Cloud Containers consists of two types of nodes, master nodes and worker nodes:

- _Master nodes_ store cluster-wide state information and manage workload distribution across worker nodes. Users cannot manage cluster nodes, as they are managed by the VK Cloud platform.

  When you [create](/en/kubernetes/k8s/instructions/create-cluster) a Kubernetes cluster in Cloud Containers, it automatically selects the minimum appropriate [configuration template](/en/kubernetes/k8s/concepts/flavors#configuration_templates) for its master nodes. By default, it is a VM with an Intel Cascade Lake processor, 2 CPUs, and 6 GB RAM. The default [disk type](/en/kubernetes/k8s/concepts/storage#storage_types) for master nodes is a 20 GB High-IOPS SSD.

  [Automatic scaling](/en/kubernetes/k8s/concepts/scale#autoscaling) is enabled for all master nodes by default. When the workload of the cluster changes, the amount of the resources used by master nodes changes respectively.

- _Worker nodes_ manage the [workload](https://kubernetes.io/docs/concepts/workloads/). Worker nodes can be organized into groups. It is best to place such groups in different [availability zones](/en/intro/start/concepts/architecture#az) to improve fault tolerance. Worker nodes are also managed by the VK Cloud platform, but have network connectivity with the users' projects.

High availability of a cluster depends on its number of master nodes and their distribution across availability zones. Possible configurations are:

- Cluster with one master node.

  Such clusters are not highly available: even if there are several worker nodes, and they are organized into groups, once the single master node fails, the whole cluster becomes inoperable.

  {cut(Node interaction scheme for a cluster with one master node)}
  ![Cluster with one master node](/en/kubernetes/k8s/assets/cluster_types_1.png){params[noBorder=true; width=80%]}
  {/cut}

- Standard cluster with 3 or 5 master nodes.

  Such clusters are highly available at the availability zone level. If the availability zone remains stable and some of the master nodes are lost, it will remain operational as long as more than half of the master nodes are operating. When there is only one master node left, the cluster stops working.

  {cut(Node interaction scheme for a standard cluster with 3 or 5 master node)}
  ![Cluster with one master node](/en/kubernetes/k8s/assets/cluster_types_2.png){params[noBorder=true; width=80%]}
  {/cut}   

- Regional cluster with 3 or 5 master nodes.

  Master nodes of a regional cluster are distributed across all availability zones of a region. Such clusters are as highly available as possible: if one availability zone fails, the workload will be distributed among the master nodes located in other availability zones. However, as in standard clusters, regional cluster remain operational while more than half of the master nodes are working, and stop working when only one master node remains.

  {cut(Node interaction scheme for a regional cluster with 3 or 5 master node)}
  ![Cluster with one master node](/en/kubernetes/k8s/assets/cluster_types_3.png){params[noBorder=true; width=80%]}
  {/cut}

Regardless of the cluster topology chosen, the master nodes use distributed key-value storage [etcd](https://etcd.io/) to store information about the state of the cluster:

- A cluster with one master node has one instance of `etcd`.
- Clusters with multiple master nodes have multiple instances of `etcd` running in cluster mode for high availability.
- Each `etcd` instance has a dedicated high-performance SSD disk (High-IOPS). This allows for the fastest possible interaction with the cluster API endpoint with minimal latency.

For high availability at the worker node level, it is recommended to create several groups of worker nodes in different availability zones and place application replicas on these nodes so that the replicas are also in different availability zones.

## Cluster environment

Master and worker nodes use the AlmaLinux OS (starting with Kubernetes 1.31).

The cluster runs containers via Kubernetes [Container Runtime Interface](https://kubernetes.io/docs/concepts/architecture/cri/) (CRI) with CRI-O.

See [Available Kubernetes versions and version support policy](../versions) for details.

## Integration with the Kubernetes API

All interaction with the cluster is through the [Kubernetes API](https://kubernetes.io/ru/docs/concepts/overview/kubernetes-api/).

The Cloud Containers cluster API endpoint is placed behind [dedicated load balancer](../network), so the cluster API can be accessed via the same IP address regardless of the number of master nodes.

## Integration with VK Cloud platform

Integration with the VK Cloud platform is achieved through standard Kubernetes interfaces:

- [Container Storage Interface](https://kubernetes-csi.github.io/docs/) (CSI): integration with storage services.

  Allows to use Object Storage in clusters as [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
  Persistent Volume Claim (PVC) is available.

  Integration is achieved using OpenStack Cinder API. See [Storage in cluster](../storage) for details.

- [Container Network Interface](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/) (CNI): integration with network services.

  Every Cloud Containers cluster has a [Calico](https://projectcalico.docs.tigera.io/about/about-calico) plugin that supports this interface. This plugin provides:

  - Network connectivity between containers, [pods](../../reference/pods), and cluster nodes
  - Application and enforcement of Kubernetes [network policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)

  Calico integrates with VK Cloud platform using SDN Sprut. See [Network in cluster](../network) for details.

## Built-in support for the Open Policy Agent

[Pods](https://kubernetes.io/docs/concepts/workloads/pods/) can access various information and components of a Kubernetes cluster. With certain settings, pods themselves and the Kubernetes cluster in which they run can be vulnerable to attacks.

[Open Policy Agent Gatekeeper](../../reference/gatekeeper) is built into the cluster to increase the cluster's resistance to attacks. It allows you to apply constraints, which help to increase the security of deployed workload.

## Cluster scaling options

Cloud Containers has built-in [scaling capabilities for master nodes and worker nodes](../scale) that automatically adjusts the number of nodes depending on the workload requirements:

- For master nodes, automatic scaling is enabled by default, and you cannot disable it. 
- For worker nodes, automatic scaling is performed via [Cluster Autoscaler](/en/kubernetes/k8s/concepts/cluster-autoscaler), and you need to manually enable it for each worker node group when [configuring its settings](/en/kubernetes/k8s/instructions/helpers/node-group-settings).
