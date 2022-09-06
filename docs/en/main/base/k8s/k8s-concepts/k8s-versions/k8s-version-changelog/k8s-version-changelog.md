## Kubernetes 1.22.6 <a id="v1-22-6"></a>

**Changes in Kubernetes aaS service:**

- The operating system [AlmaLinux](https://wiki.almalinux.org) version 9 is used on the cluster nodes.
- The default is [limit range for namespaces (namespace)](../../../k8s-node-groups/pods).

**Important changes in Kubernetes:**

- Replaced PodSecurityPolicy component with [alpha version of PodSecurity](https://github.com/kubernetes/enhancements/issues/2579).
- Component [Memory Manager](https://github.com/kubernetes/enhancements/issues/1769) moved to beta status.
- Added new functionality [API Server Tracing](https://github.com/kubernetes/enhancements/issues/647). This functionality is in alpha status.
- Added new functionality [Generic data populators](https://github.com/kubernetes/enhancements/issues/1495) for Persistent Volumes. This functionality is in alpha status.
- Added new version of config format for kubeadm: [v1beta3](https://github.com/kubernetes/enhancements/issues/970).
- Now Kubernetes control plane always uses [CronJobs controller version 2](https://github.com/kubernetes/enhancements/issues/19).
- Now all Kubernetes control plane components on nodes (including kubelet, kube-proxy and container runtime) [can be run as non-root users](https://github.com/kubernetes/enhancements /issues/2033). This functionality is in alpha status.

To learn more about these and other changes, see the [official Kubernetes documentation](https://kubernetes.io/blog/2021/08/04/kubernetes-1-22-release-announcement/) for this release.

## Kubernetes 1.21.4 <a id="v1-21-4"></a>

**Changes in the Kubernetes aaS service:** Cluster nodes use the [AlmaLinux](https://wiki.almalinux.org) version 8 operating system.

**Important changes in Kubernetes:**

- The [CronJob](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/) functionality has been moved to stable status.
- Added support for immutable [Secret](https://kubernetes.io/docs/concepts/configuration/secret/#secret-immutable) and [ConfigMap](https://kubernetes.io/docs/concepts/configuration /configmap/#configmap-immutable).
- Added support for [IPv4/IPv6 Dual-Stack](https://kubernetes.io/docs/concepts/services-networking/dual-stack/).
- Added support for [Graceful Node Shutdown](https://kubernetes.io/docs/concepts/architecture/nodes/#graceful-node-shutdown).
- Added support for [PersistentVolume Health Monitor](https://kubernetes.io/docs/concepts/storage/volume-health-monitoring).
- Simplified support for the Kubernetes build system.
- PodSecurityPolicy functionality moved to deprecated status. Read more [here](https://kubernetes.io/blog/2021/04/06/podsecuritypolicy-deprecation-past-present-and-future).
- TopologyKeys parameter for Service moved to deprecated status.

To learn more about these and other changes, see the [official Kubernetes documentation](https://kubernetes.io/blog/2021/04/08/kubernetes-1-21-release-announcement/) for this release.

## Kubernetes 1.20.4 <a id="v1-20-4"></a>

**Changes in Kubernetes aaS service:**

- [Runtime](https://kubernetes.io/docs/setup/production-environment/container-runtimes/) (runtime) of the cluster is replaced by [CRI-O](https://cri-o.io/) .
- Changed [log storage format](../../../../../../additionals/cases/cases-logs/case-fluent-bit).

**Important changes in Kubernetes:**

- Runtime component [Dockershim](https://kubernetes.io/blog/2022/05/03/dockershim-historical-context/) moved to deprecated status.
- [Volume Snapshot](https://kubernetes.io/docs/concepts/storage/volume-snapshots/) Operations functionality moved to stable status.
- [API Priority and Fairness](https://kubernetes.io/docs/concepts/cluster-administration/flow-control/) (APF) functionality is now enabled by default.
- Moved `kubectl alpha debug` to beta status and becomes `kubectl debug`. More details [here](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/).

To learn more about these and other changes, see the [official Kubernetes documentation](https://kubernetes.io/blog/2020/12/08/kubernetes-1-20-release-announcement/) for this release.
