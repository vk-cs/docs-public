## Kubernetes 1.22.6 <a id="v1-22-6"></a>

**Changes in Kubernetes aaS service:**

- The [AlmaLinux](https://wiki.almalinux.org) operating system version 9 is used on the cluster nodes.
- By default, a limit on computational resources consumed ([limit ranges](https://kubernetes.io/docs/concepts/policy/limit-range/)) is set for namespaces.

**Important changes in Kubernetes:**

- The PodSecurityPolicy component is replaced by [alpha version of PodSecurity](https://github.com/kubernetes/enhancements/issues/2579).
- The [Memory Manager](https://github.com/kubernetes/enhancements/issues/1769) component has been moved to beta status.
- New [API Server Tracing] functionality added (https://github.com/kubernetes/enhancements/issues/647), now in alpha status.
- New [Generic data populators] functionality added (https://github.com/kubernetes/enhancements/issues/1495) for Persistent Volumes, currently alpha.
- A new version of the configuration format for kubeadm has been added: [v1beta3](https://github.com/kubernetes/enhancements/issues/970).
- Kubernetes control plane now always uses [CronJobs controller version 2](https://github.com/kubernetes/enhancements/issues/19).
- All Kubernetes control plane components on nodes (including kubelet, kube-proxy and container runtime) [can now be run as non-root users](https://github.com/kubernetes/enhancements/issues/2033). This functionality is in alpha stage.

Read more about these and other changes in [official Kubernetes documentation](https://kubernetes.io/blog/2021/08/04/kubernetes-1-22-release-announcement).

## Kubernetes 1.21.4 <a id="v1-21-4"></a>

**Changes in Kubernetes aaS service:** The [AlmaLinux](https://wiki.almalinux.org) version 8 operating system is used on the cluster nodes.

**Important changes in Kubernetes:**

- Functionality of [CronJob](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/) moved to stable status.
- Added support for immutable [Secret](https://kubernetes.io/docs/concepts/configuration/secret/#secret-immutable) and [ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/#configmap-immutable).
- Added support for [IPv4/IPv6 Dual-Stack](https://kubernetes.io/docs/concepts/services-networking/dual-stack/).
- Added support for [Graceful Node Shutdown](https://kubernetes.io/docs/concepts/architecture/nodes/#graceful-node-shutdown).
- Added support for [PersistentVolume Health Monitor](https://kubernetes.io/docs/concepts/storage/volume-health-monitoring).
- Simplified support for the Kubernetes build system.
- PodSecurityPolicy functionality [moved to deprecated status](https://kubernetes.io/blog/2021/04/06/podsecuritypolicy-deprecation-past-present-and-future).
- The topologyKeys parameter for Service has been moved to deprecated status.

Read more about these and other changes in [official Kubernetes documentation](https://kubernetes.io/blog/2021/04/08/kubernetes-1-21-release-announcement/).

## Kubernetes 1.20.4 <a id="v1-20-4"></a>

**Changes in Kubernetes aaS service:**

- The [runtime environment](https://kubernetes.io/docs/setup/production-environment/container-runtimes/) of the cluster has been replaced by [CRI-O](https://cri-o.io/).
- Changed [log storage format](../../../../../additionals/cases/cases-logs/case-fluent-bit).

**Important changes in Kubernetes:**

- The [Dockershim](https://kubernetes.io/blog/2022/05/03/dockershim-historical-context/) runtime component has been moved to deprecated status.
- The [Volume Snapshot](https://kubernetes.io/docs/concepts/storage/volume-snapshots/) Operations functionality has been moved to stable status.
- The [API Priority and Fairness](https://kubernetes.io/docs/concepts/cluster-administration/flow-control/) (APF) functionality is now enabled by default.
- The `kubectl alpha debug` command [has been moved to beta status](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/) and becomes `kubectl debug`.
