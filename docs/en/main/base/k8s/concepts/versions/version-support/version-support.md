New versions of Kubernetes aaS from VK Cloud are usually added 1 month after the official release.

The following versions of Kubernetes aaS from VK Cloud are currently available:

- 1.26.5
- 1.25.10
- 1.24.9
- 1.23.13

When [creating a new cluster](../../../operations/create-cluster), choose the latest available [version of Kubernetes](#k8s-versions-list). If possible, [update the cluster](../../../operations/update) to the latest available version. The update procedure is described in [relevant concept section](../../update).

If the cluster uses an outdated [version of Kubernetes](#k8s-versions-list), then:

- its correct operation is not guaranteed;
- technical support will not be able to help you resolve issues if they occur.

## Kubernetes version support <a id="k8s-versions-list"></a>

Kubernetes versions are supported for 14 months from the release date in Kubernetes aaS from VK Cloud.

Thirty days before Kubernetes version support is discontinued, users will receive an email and notification about this in their personal account notification center.

|Version of Kubernetes|Official release date|VK Kubernetes aaS release date|VK Kubernetes aaS end of support date|
|------|------|------|-------|
| 1.26.x  | 17 May 2023     | 14.08.2023 | 17.10.2024 |
| 1.25.x  | 17 May 2023     | 14.06.2023 | 14.08.2024 |
| 1.24.x  | 8 December 2022 | 6.03.2023  | 6.05.2024  |
| 1.23.x  | 13 April 2022   | 15.08.2022 | 15.10.2023 |
| 1.22.x  | 19 January 2022 | 18.02.2022 | 18.04.2023 |
| 1.21.4  | 8 April 2021    | 12.10.2021 | 12.12.2022 |
| 1.20.4  | 8 December 2020 | 01.03.2021 | 01.05.2022 |
| 1.19.4  | 26 August 2020  | 23.12.2020 | 23.02.2022 |
| 1.18.12 | 23 March 2020   | 23.12.2020 | 23.02.2022 |
| 1.17.8  | 9 December 2019 | 09.08.2020 | 09.12.2021 |

The version history can be viewed at [Kubernetes version history](../version-changelog).

## Service feature matrix for Kubernetes <a id="k8s-features-list"></a>

New features are added to all versions of Kubernetes, unless a feature and version are incompatible.

| Feature                                  | 1.17.x–1.20.x | 1.21.4–1.22.х | 1.23.x–1.26.х |
| ---------------------------------------- | ------------- | ------------- | ------ |
| Node group scaling settings              | +             | +             | +      |
| Invalidate the key pair                  | +             | +             | -      |
| Change the size of the Prometheus disk   | +             | +             | +      |
| Change the type of Master virtual machine| +             | +             | +      |
| Update cluster version                   | +             | +             | +      |
| Label & Taints                           | +             | +             | +      |
| Cluster nodes on AlmaLinux               | -             | +             | +      |
| Integration with VK Cloud IAM            | -             | -             | +      |
