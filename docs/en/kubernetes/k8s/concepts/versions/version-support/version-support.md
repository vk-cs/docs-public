New versions of Kubernetes aaS from VK Cloud are usually added 1 month after the official release.

The following versions of Kubernetes aaS from VK Cloud are currently available:

- 1.32.1
- 1.31.4
- 1.30.5
- 1.29.7
- 1.28.9

When [creating a new cluster](../../../instructions/create-cluster), choose the latest available [version of Kubernetes](#kubernetes_version_support). If possible, [update the cluster](../../../instructions/update) to the latest available version. The update procedure is described in [relevant concept section](../../update).

If the cluster uses an outdated [version of Kubernetes](#kubernetes_version_support), then:

- its correct operation is not guaranteed;
- technical support will not be able to help you resolve issues if they occur.

## Kubernetes version support <a id="k8s-versions-list"></a>

Kubernetes versions are supported for 14 months from the release date in Kubernetes aaS from VK Cloud.

Thirty days before Kubernetes version support is discontinued, users will receive an email and notification about this in their management console notification center.

[cols="1,2,1,1", options="header"]
|===
|Version of Kubernetes
|Official release date
|VK Kubernetes aaS release date
|VK Kubernetes aaS end of support date

|1.32.x
|12 December 2024
|28.05.2025
|28.07.2026

|1.31.x
|10 December 2024
|17.02.2025
|17.04.2026

|1.30.x
|10 September 2024
|10.12.2024
|10.02.2026

| 1.29.x
| 17 July 2024
| 30.08.2024
| 30.10.2025

| 1.28.x
| 16 April 2024
| 30.06.2024
| 30.08.2025

| 1.27.x
| 13 September 2023
| 11.12.2023
| 11.02.2025

| 1.26.x
| 17 May 2023
| 14.08.2023
| 17.10.2024

| 1.25.x
| 17 May 2023
| 14.06.2023
| 14.08.2024

| 1.24.x
| 8 December 2022
| 06.03.2023
| 06.05.2024

| 1.23.x
| 13 April 2022
| 15.08.2022
| 15.10.2023

| 1.22.x
| 19 January 2022
| 18.02.2022
| 18.04.2023

| 1.21.4
| 8 April 2021
| 12.10.2021
| 12.12.2022

| 1.20.4
| 8 December 2020
| 01.03.2021
| 01.05.2022

| 1.19.4
| 26 August 2020
| 23.12.2020
| 23.02.2022

| 1.18.12
| 23 March 2020
| 23.12.2020
| 23.02.2022

| 1.17.8
| 9 December 2019
| 09.08.2020
| 09.12.2021
|===

The version history can be viewed at [Kubernetes version history](#k8s_versions_history).

## Service feature matrix for Kubernetes <a id="k8s-features-list"></a>

New features are added to all versions of Kubernetes, unless a feature and version are incompatible.

[cols="2,1,1,1,1", options="header"]
|===
|Feature
|1.17.x–1.20.x
|1.21.4–1.23.х
|1.24.x–1.26.х
|1.27.x–1.32.х

|Node group scaling settings
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|Key pair invalidation
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")

|Change the size of the Prometheus disk
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|Change the type of Master virtual machine
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|Update cluster version
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|Label & Taints
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|Cluster nodes on AlmaLinux
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|Integration with VK Cloud IAM
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/check.svg "inline")
| ![](/en/assets/check.svg "inline")

|Autoscaling of cluster master
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/check.svg "inline")


|GPU support
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/no.svg "inline")
| ![](/en/assets/check.svg "inline")
|===

## {heading(Kubernetes version history)[id=k8s_versions_history]}

[cols="1,1,2", options="header"]
|===
|Kubernetes version
|Changes in Kubernetes
|Changes in Kubernetes aaS service

|1.32.1
|[Kubernetes v1.32: Penelope](https://kubernetes.io/blog/2024/12/11/kubernetes-v1-32-release/)
|![](/ru/assets/no.svg "inline")

|1.31.4
|[Kubernetes v1.31: Elli](https://kubernetes.io/blog/2024/08/13/kubernetes-v1-31-release/)
|Added the ability to [use and manage](../../../how-to-guides/gpu-operator) GPUs in Kubernetes clusters

|1.30.5
|[Kubernetes v1.30: Uwubernetes](https://kubernetes.io/blog/2024/04/17/kubernetes-v1-30-release/)
|![](/en/assets/no.svg "inline")

|1.29.7
|[Kubernetes v1.29: Mandala](https://kubernetes.io/blog/2023/12/13/kubernetes-v1-29-release/)
| ![](/en/assets/no.svg "inline")

|1.28.9
|[Kubernetes v1.28: Planternetes](https://kubernetes.io/blog/2023/08/15/kubernetes-v1-28-release/)
| ![](/en/assets/no.svg "inline")

|1.27.6
|[Kubernetes v1.27: Chill Vibes](https://kubernetes.io/blog/2023/04/11/kubernetes-v1-27-release/)
|[Autoscaling](/en/kubernetes/k8s/concepts/scale#autoscaling) of cluster master nodes is implemented

|1.26.5
|[Kubernetes v1.26: Electrifying](https://kubernetes.io/blog/2022/12/09/kubernetes-v1-26-release/)
|Packages are updated:

- Calico is updated to version 3.26.1
- Helm is updated to version 3.12.2
- Gatekeeper is updated to version 3.12.0

|1.25.1
|[Kubernetes v1.25: Combiner](https://kubernetes.io/blog/2022/08/23/kubernetes-v1-25-release/)
| ![](/en/assets/no.svg "inline")

|1.24.9
|[Kubernetes 1.24: Stargazer](https://kubernetes.io/blog/2022/05/03/kubernetes-1-24-release-announcement/)
|Calico is updated to version 3.25.0

|1.23.6
|[Kubernetes 1.23: The Next Frontier](https://kubernetes.io/blog/2021/12/07/kubernetes-1-23-release-announcement/)
|Added [integration with VK Cloud IAM](/en/kubernetes/k8s/concepts/access-management)

|1.22.6
|[Kubernetes 1.22: Reaching New Peaks](https://kubernetes.io/blog/2021/08/04/kubernetes-1-22-release-announcement/)
|The cluster nodes use the [AlmaLinux](https://wiki.almalinux.org) operating system version 9.

By default, a limit on the consumed computing resources ([limit ranges](https://kubernetes.io/docs/concepts/policy/limit-range/)) is set for namespaces

|1.21.4
|[Kubernetes 1.21: Power to the Community](https://kubernetes.io/blog/2021/04/08/kubernetes-1-21-release-announcement/)
|The cluster nodes use the [AlmaLinux](https://wiki.almalinux.org) operating system version 8

|1.20.4
|[Kubernetes 1.20: The Raddest Release](https://kubernetes.io/blog/2020/12/08/kubernetes-1-20-release-announcement/)
|[Runtime](https://kubernetes.io/docs/setup/production-environment/container-runtimes/) of the cluster has been replaced by [CRI-O](https://cri-o.io/).

[Log storage format](/en/cases/cases-logs/case-fluent-bit) has been changed
|===
