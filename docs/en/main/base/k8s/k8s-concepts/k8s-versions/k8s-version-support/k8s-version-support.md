In Kubernetes aaS from VK Cloud, a new version is added 1 month after the official release.

At the moment, Kubernetes aaS from VK Cloud has a similar version of Kubernetes:

- 1.22.6
- 1.21.4
- 1.20.4

[Creating a new cluster](../../../k8s-clusters/create-k8s) maximizes [Kubernetes version](#k8s-versions-list) availability. We recommend [updating the cluster](../../../k8s-clusters/update-k8s) to the latest version available, if possible.

If the cluster is created on [Kubernetes version](#k8s-versions-list), which is more implausible, then we cannot find it to work correctly. All emerging problems with the cluster should be solved by the user independently.

## Kubernetes version support <a id="k8s-versions-list"></a>

Kubernetes releases unexpectedly extended 14 months from the Kubernetes aaS release date from VK Cloud.

A Kubernetes Version Support Consumption Report will be sent out via email and in the Personal Account Observation Center 30 days before the support distribution rate.

|Kubernetes version|Official release date|Kubernetes aaS by VK|Kubernetes aaS by VK ends|
|------|------|------|-------|
|1.22.6|19 January 2022|18.02.2022|18.04.2023|
|1.21.4|April 8, 2021|12/10/2021|12/12/2022|
|1.20.4|December 8, 2020|03/01/2021|05/01/2022|
|1.19.4|26 August 2020|23.12.2020|23.02.2022|
|18.01.12|23 March 2020|23.12.2020|23.02.2022|
|1.17.8|December 9, 2019|08/09/2020|12/09/2021|

The history of version changes can be viewed [here](k8s-version-changelog).

## Feature support service in Kubernetes version <a id="k8s-features-list"></a>

New features are added to all versions where possible, except where features are incompatible with the Kubernetes population.

| Name                             | 1.17.8 | 1.18.12 | 1.19.4 | 1.20.4 | 1.21.4 | 1.22.6 |
| ---------------------------------------- | ------ | ------- | ------ | ------ | ------ | ------ |
| Settings of scaling nod groups     | +      | +       | +      | +      | +      | +      |
| Disability of a key pair                | +      | +       | +      | +      | +      | +      |
| Change the size of the disk Prometheus         | +      | +       | +      | +      | +      | +      |
|Changing the type of virtual machine Master | +      | +       | +      | +      | +      | +      |
| Update the version of the cluster                 | +      | +       | +      | +      | +      | +      |
| Label & Taints                           | +      | +       | +      | +      | +      | +      |
| Cluster nodes on AlmaLinux               | -      | -       | -      | -      | +      | +      |
