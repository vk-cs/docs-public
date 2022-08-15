In Kubernetes aaS from VK Cloud, new versions are mainly added one month after the official release.

The following versions of Kubernetes are currently available in Kubernetes aaS from VK Cloud:

- 1.23.6
- 1.22.6
- 1.21.4
- 1.20.4
- 1.19.4
- 1.18.12
- 1.17.8

Kubernetes versions are supported for 14 months from the release date in Kubernetes aaS from VK Cloud.

A message about the termination of support for the Kubernetes version will be sent by email and in the notification center of your personal account 30 days before the date of termination of support.

When creating a new cluster, choose the latest available version of Kubernetes. We strongly recommend updating the cluster to the latest available version, if possible.

If the cluster is created on a version of Kubernetes that is no longer supported, then we cannot guarantee its correct operation. All problems that arise with the cluster should be solved by the user independently.

|Kubernetes version|Official release date|Kubernetes aaS from VK release|Kubernetes aaS from VK end of support|
|------|------|------|-------|
|1.17.8|December 9th 2019/09.08.2020/09.12.2021|
|1.18.12|March 23 2020/23.12.2020/23.02.2022|
|1.19.4|26 August 2020/23.12.2020/23.02.2022|
|1.20.4|8 december 2020/01.03.2021/01.05.2022|
|1.21.4|8 April 2021/12.10.2021/12.12.2022|
|1.22.6|January 19 2022/18.02.2022/18.04.2023|
|1.23.6|20 April 2022|xx.07.2022|xx.09.2023|

## Support for service functions in Kubernetes versions

If possible, new functions are added to all versions, except in cases of incompatibility of the function with the Kubernetes version.

| Name | 1.16 and below | 1.17.8 | 1.18.12 | 1.19.4 | 1.20.4 | 1.21.4 | 1.22.6 | 1.23.6 |
| ---------------------------------------- | ----------- | ------ | ------- | ------ | ------ | ------ | ------ | ------ |
| Node Group Scaling Settings | + | + | + | + | + | + | + | |
| Key Pair disability | - | + | + | + | + | + | + | |
| Change the Prometheus disk size | - | + | + | + | + | + | + | |
| Changing the type of the Master VM | - | + | + | + | + | + | + | |
| Update the cluster version | - | + | + | + | + | + | + | |
| Label & Taints                           | -           | +      | +       | +      | +      | +      | +      | |
| Cluster nodes on AlmaLinux | - | - | - | - | - | + | + | |
| Integration with VK CS Cloud IAM | | | | | | | | + |
