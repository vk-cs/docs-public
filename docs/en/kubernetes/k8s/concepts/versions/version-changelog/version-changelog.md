## Kubernetes 1.28.9 <a id="v1-28-9"></a>

**Important changes in Kubernetes:**

- Kubernetes is now built with Golang 1.21.9.
- Updated `debian-base/set-cap` package to bookworm-v1.0.2.

**Vulnerability fixes:**

- [CVE-2024-3177](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.28.md#cve-2024-3177-bypassing-mountable-secrets-policy-imposed-by-the-serviceaccount-admission-plugin): bypassing secrets policy imposed by the ServiceAccount admission plugin.

Read more about these and other changes in [official Kubernetes documentation](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.28.md#v1289).

## Kubernetes 1.27.6 <a id="v1-27-6"></a>

**Changes in Kubernetes aaS service:**

- Removal of `storage.k8s.io/v1beta1` from `CSIStorageCapacity`.
- [Stopped support](https://kubernetes.io/blog/2023/03/17/upcoming-changes-in-kubernetes-v1-27/#support-for-deprecated-seccomp-annotations) for deprecated seccomp annotations.
- Removal of several feature gates for volume expansion.

Read more about these and other changes in [official Kubernetes documentation](https://kubernetes.io/blog/2023/03/17/upcoming-changes-in-kubernetes-v1-27/#api-removals-and-other-changes-for-kubernetes-v1-27).

**Important changes in Kubernetes:**

- [SeccompDefault](https://kubernetes.io/docs/tutorials/security/seccomp/) moved to the stable status.
- [Mutable scheduling directives for Jobs](https://github.com/kubernetes/enhancements/issues/2926 ) transferred to the status of general availability.
- [DownwardAPIHugePages](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/) moved to the stable status.
- Added the ability to access cluster node logs via the Kubernetes API.

**Vulnerability fixes:**

- [CVE-2023-2728](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.27.md#cve-2023-2728-bypassing-enforce-mountable-secrets-policy-imposed-by-the-serviceaccount-admission-plugin): bypassing enforce mountable secrets policy imposed by the ServiceAccount admission plugin.

Read more about these and other changes in [official Kubernetes documentation](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.27.md#v1276).

## Kubernetes 1.26.5 <a id="v1-26-5"></a>

**Changes in Kubernetes aaS service:**

- Calico updated to version 3.26.1.
- Helm updated to version 3.12.2.
- Gatekeeper updated to version 3.12.0.

**Important changes in Kubernetes:**

- Outdated APIs in beta status [removed and not supported](https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-26).
- The GlusterFS driver is completely removed in release 1.26. If you still have disks with such a driver, perform the migration.
- The CLI flag `pod-eviction-timeout` has been moved to the deprecated status and will be removed in v1.27.
- The CLI flag `--master-service-namespace` in Kube-apiserver has been moved to deprecated status and will be removed in v1.27.

**Vulnerability fixes:**

- [CVE-2023-27561](https://bugzilla.redhat.com/show_bug.cgi?id=CVE-2023-27561), [CVE-2023-25809](https://bugzilla.redhat.com/show_bug.cgi?id=CVE-2023-25809), [CVE-2023-28642](https://bugzilla.redhat.com/show_bug.cgi?id=CVE-2023-28642): changing the runc version from v1.1.4 to v1.1.5, fixed the error of deleting `cgroup` when using runc version higher than 1.1.6.

Read more about these and other changes in [official Kubernetes documentation](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.26.md#v1265).

## Kubernetes 1.25.1 <a id="v1-25-1"></a>

**Important changes in Kubernetes:**

- PodSecurityPolicy has been removed. After the withdrawal from support in Kubernetes version 1.21, users had the opportunity to switch to Pod Security Admission. If you are using PodSecurityPolicy, then follow the [migration instructions](https://kubernetes.io/docs/tasks/configure-pod-container/migrate-from-psp/).
- The GlusterFS and Portworx disk plugins have been removed from support. Flocker, Quobyte, and StorageOS removed from Kubernetes.
- vSphere support below 7.0u2 is discontinued.
- Starting from version 1.25 Kubelet will not create iptables chains in NAT tables: `KUBE-MARK-DROP`, `KUBE-MARK-MASQ`, `KUBE-POSTROUTING`.

Read more about these and other changes in [official Kubernetes documentation](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.25.md#v12510).

## Kubernetes 1.24.9 <a id="v1-24-9"></a>

**Changes in Kubernetes aaS service:** Calico updated to version 3.25.0.

**Important changes in Kubernetes:**

- Dockershim [deleted from kubelet](https://kubernetes.io/docs/setup/production-environment/container-runtimes/).
- Beta APIs are [off by default](https://github.com/kubernetes/enhancements/issues/3136).
- Kubernetes 1.24 offers beta support for [publishing its APIs in the OpenAPI v3 format](https://github.com/kubernetes/enhancements/issues/2896).
- Secrets for service accounts are not created by default.

**Vulnerability fixes:**

- [CVE-2022-3294](https://bugzilla.redhat.com/show_bug.cgi?id=CVE-2022-3294): node address isn't always verified when proxying.
- [CVE-2022-3162](https://bugzilla.redhat.com/show_bug.cgi?id=CVE-2022-3162): unauthorized read of custom resources.

Read more about these and other changes in [official Kubernetes documentation](https://kubernetes.io/blog/2022/05/03/kubernetes-1-24-release-announcement/).

## Kubernetes 1.23.13 <a id="v1-23-13"></a>

**Important changes in Kubernetes:** Kubernetes is now built on Golang 1.17.13.

**Vulnerability fixes:**

- [CVE-2022-3172](https://bugzilla.redhat.com/show_bug.cgi?id=2127804): the aggregated `kube-apiserver` API server can cause client redirects.
- [CVE-2021-25749](https://bugzilla.redhat.com/show_bug.cgi?id=2127808): the `runAsNonRoot` logic is skipped for Windows containers.

Read more about these and other changes in [official Kubernetes documentation](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.23.md#v12313).

## Kubernetes 1.23.6 <a id="v1-23-6"></a>

**Changes in Kubernetes aaS service:** Added [integration with VK Cloud IAM](/en/kubernetes/k8s/concepts/access-management).

**Important changes in Kubernetes:**

- The [FlexVolume](https://github.com/kubernetes/community/blob/master/sig-storage/volume-plugin-faq.md#flexvolume) functionality has been moved to deprecated status.
- Functionality specific [flags for klog](https://kubernetes.io/docs/concepts/cluster-administration/system-logs/#klog) has been moved to deprecated status.
- The [IPv4/IPv6 dual-stack networking](https://github.com/kubernetes/enhancements/tree/master/keps/sig-network/563-dual-stack) functionality has been moved to general availability status.
- HorizontalPodAutoscaler v2 functionality has been moved to general availability status.
- Generic Ephemeral Volume functionality has been moved to general availability status.
- Skip Volume Ownership change functionality has been moved to general availability status.
- The functionality allowing CSI drivers to opt-in to volume ownership and permission changes has been moved to general availability status.
- The [PodSecurity](https://kubernetes.io/docs/concepts/security/pod-security-admission/) functionality has been moved to beta status.
- Kubelet now supports CRI v1 API.
- Logging structuring functionality has been moved to beta status.
- ServerSideFieldValidation function returns warning if Kubernetes object in request contains unknown or duplicated fields.
- Expression language checking for CRD has been moved to alpha status.
- The OpenAPI v3 functionality has been moved to alpha status.

Read more about these and other changes in [official Kubernetes documentation](https://kubernetes.io/blog/2021/12/07/kubernetes-1-23-release-announcement/).

## Kubernetes 1.22.6 <a id="v1-22-6"></a>

**Changes in Kubernetes aaS service:**

- The [AlmaLinux](https://wiki.almalinux.org) operating system version 9 is used on the cluster nodes.
- By default, a limit on computational resources consumed ([limit ranges](https://kubernetes.io/docs/concepts/policy/limit-range/)) is set for namespaces.

**Important changes in Kubernetes:**

- The PodSecurityPolicy component is replaced by [alpha version of PodSecurity](https://github.com/kubernetes/enhancements/issues/2579).
- The [Memory Manager](https://github.com/kubernetes/enhancements/issues/1769) component has been moved to beta status.
- New [API Server Tracing](https://github.com/kubernetes/enhancements/issues/647) functionality added, now in alpha status.
- New [Generic data populators](https://github.com/kubernetes/enhancements/issues/1495) functionality added for Persistent Volumes, currently alpha.
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
- Changed [log storage format](../../../../../cases/cases-logs/case-fluent-bit).

**Important changes in Kubernetes:**

- The [Dockershim](https://kubernetes.io/blog/2022/05/03/dockershim-historical-context/) runtime component has been moved to deprecated status.
- The [Volume Snapshot](https://kubernetes.io/docs/concepts/storage/volume-snapshots/) Operations functionality has been moved to stable status.
- The [API Priority and Fairness](https://kubernetes.io/docs/concepts/cluster-administration/flow-control/) (APF) functionality is now enabled by default.
- The `kubectl alpha debug` command [has been moved to beta status](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/) and becomes `kubectl debug`.
