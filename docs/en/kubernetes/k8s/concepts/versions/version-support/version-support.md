New versions of Kubernetes aaS from VK Cloud are usually added one month after the official release.

The following versions of Kubernetes aaS from VK Cloud are currently available:

- 1.33.1
- 1.32.1
- 1.31.4
- 1.30.5

When [creating a new cluster](../../../instructions/create-cluster), choose the latest available version of Kubernetes. If possible, [update the existing clusters](../../../instructions/update) to the latest available version. 

If the cluster uses an outdated version of Kubernetes, its correct operation is not guaranteed. Technical support will not be able to help you resolve issues if they occur.

## {heading(Kubernetes version support)[id=k8s-versions-list]}

Kubernetes versions are supported for 14 months from the release date in Kubernetes aaS from VK Cloud.

Thirty days before Kubernetes version support is discontinued, users will receive an email and notification about this in their management console notification center.

[cols="1,2,1,1", options="header"]
|===
|Version of Kubernetes
|Official release date
|VK Kubernetes aaS release date
|VK Kubernetes aaS end of support date

|1.33.x
|May 15, 2025
|20.10.2025
|20.12.2026

|1.32.x
|December 12, 2024
|28.05.2025
|28.07.2026

|1.31.x
|December 10, 2024
|17.02.2025
|17.04.2026

|1.30.x
|September 10, 2024
|10.12.2024
|10.02.2026

| 1.29.x
| July 17, 2024
| 30.08.2024
| 30.10.2025

| 1.28.x
| April 16, 2024
| 30.06.2024
| 30.08.2025
|===

{cut(Previous versions)}

[cols="1,2,1,1", options="header"]
|===
|Version of Kubernetes
|Official release date
|VK Kubernetes aaS release date
|VK Kubernetes aaS end of support date

| 1.27.x
| September 13, 2023
| 11.12.2023
| 11.02.2025

| 1.26.x
| May 17, 2023
| 14.08.2023
| 17.10.2024

| 1.25.x
| May 17, 2023
| 14.06.2023
| 14.08.2024

| 1.24.x
| December 8, 2022
| 06.03.2023
| 06.05.2024

| 1.23.x
| April 13, 2022
| 15.08.2022
| 15.10.2023

| 1.22.x
| January 19, 2022
| 18.02.2022
| 18.04.2023

| 1.21.4
| April 8, 2021
| 12.10.2021
| 12.12.2022

| 1.20.4
| December 8, 2020
| 01.03.2021
| 01.05.2022

| 1.19.4
| August 26, 2020
| 23.12.2020
| 23.02.2022

| 1.18.12
| March 23, 2020
| 23.12.2020
| 23.02.2022

| 1.17.8
| December 9, 2019
| 09.08.2020
| 09.12.2021
|===

{/cut}

You can see the changelog in [Kubernetes version history](#k8s_versions_history).

## {heading(Service feature matrix for Kubernetes)[id=k8s-features-list]}

New features are added to all versions of Kubernetes, unless a feature and version are incompatible.

[cols="2,1,1,1,1", options="header"]
|===
|Feature
|1.17.x–1.20.x
|1.21.4–1.23.х
|1.24.x–1.26.х
|1.27.x–1.33.х

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

|1.33.1
|[Kubernetes v1.33: Octarine](https://kubernetes.io/blog/2025/04/23/kubernetes-v1-33-release/)
|Packages are updated:

- CoreDNS is updated to version 1.12.3.
- Calico is updated to version 3.30.2.
- Helm is updated to version 3.18.4

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
|===

{cut(Previous versions)}

[cols="1,1,2", options="header"]
|===
|Kubernetes version
|Changes in Kubernetes
|Changes in Kubernetes aaS service

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

{/cut}