Data in a Kubernetes cluster can be stored in several ways: directly in a container or on _volumes_. There are problems with storing data in a container:

- If the container crashes or stops, data is lost.
- Container data is inaccessible to other containers, even if all containers are in the same [pod](../../k8s-reference/pods).

To solve these problems, Kubernetes volumes are used. Volumes have different lifecycles depending on the usage scenario:

- _Ephemeral volumes_ (EVs) have the same lifecycle as a pod. When a pod using such a volume ceases to exist, the volume is also deleted. Ephemeral volumes can only be used by a single pod, so volumes are declared directly in the pod's manifest.

- _Persistent volumes_ (PVs) have their own [lifecycle](../../k8s-reference/pvs-and-pvcs), independent of the pod's lifecycle. Due to the separation of lifecycles, such volumes can be reused later with other pods. Pods and other workloads use Persistent Volume Claim (PVC) to handle persistent volumes.

Kubernetes clusters are tightly integrated with the VK Cloud platform to handle PVs:

- The cluster [supports](#supported_vk_cloud_storage_types) storage provided by the VK Cloud platform. Block storage support is implemented using [Cinder CSI](#working_with_container_storage_interface_csi).
- [Pre-configured storage classes](#pre_configured_storage_classes) that implement different [persistent volume reclaim policies](../../k8s-reference/pvs-and-pvcs#4_reclaiming_830589dc) are available for block storage in the cluster.

## Supported VK Cloud storage types

- Block storages:

  - Based on [Ceph](https://ceph.io/en/). To ensure fault tolerance and data integrity, the storage consists of three replicas located in different server racks. The storage can use HDD or SSD disks.

  - Based on high-performance [NVMe](https://www.snia.org/education/what-is-nvme) SSD disks (High-IOPS SSD). Such storage is connected via [iSCSI](https://www.snia.org/education/what-is-iscsi). Hardware RAID-10 is used to provide fault tolerance and data integrity at the storage level.

- [File Storage](https://www.snia.org/education/what-is-nas) connected via [NFS](https://www.ibm.com/docs/en/aix/7.1?topic=management-network-file-system) and [CIFS](https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview).

## Working with Container Storage Interface (CSI)

Kubernetes clusters use [OpenStack Cinder](https://docs.openstack.org/cinder/latest/) to integrate with block storage in VK Cloud.

The storage types available in a Kubernetes cluster via Cinder CSI correlate with VK Cloud block storage as follows:

- Ceph HDD corresponds to `ceph-hdd` in Cinder.
- Ceph SSD corresponds to `ceph-ssd` in Cinder.
- High-IOPS SSD corresponds to `high-iops` in Cinder.

Using Cinder CSI allows you to:

- Statically and dynamically [provision](../../k8s-reference/pvs-and-pvcs#1_provisioning_6b9e088d) PV that is based on block storage.

- Automatically remount persistent volumes:
  - When the pod using the volume or the worker node hosting the pod fails (assuming the pod is restored to that node or another node).
  - When you migrate a pod using a volume from one worker node to another.

- Manage the VK Cloud storage that is used by PV:
  - When a volume is dynamically provisioned, the disk corresponding to that volume in VK Cloud will be automatically created.
  - If the `Delete` reclaim policy is set for a volume, the associated volume and the corresponding disk in VK Cloud will be deleted after the PVC is deleted.

## Available reclaim policies for persistent volumes

A [reclaim policy](../../k8s-reference/pvs-and-pvcs#4_reclaiming_830589dc) can be set for a PV. The policy will be triggered when the PVC associated with that volume is deleted:

- Keep the volume (`Retain`). The PV and its associated VK Cloud storage will not be deleted.

  This policy applies to both block and file storage. Use it for PVs with sensitive data to protect the data if the PVC is accidentally deleted. If necessary, you can manually clean up and delete PVs with this policy and their associated VK Cloud storage.

- Delete the volume (`Delete`). The PV and its associated VK Cloud storage will be deleted.

  This policy is only applicable to block storage.

  <warn>

  Use this policy and the storage classes that implement it with caution: deleting a PVC will cause the PV and the disk corresponding to that volume to be deleted.

  </warn>

## Pre-configured storage classes

When using [dynamic provisioning](../../k8s-reference/pvs-and-pvcs#1_provisioning_6b9e088d) of a persistent volume, a storage class should be specified. The default storage class is not configured in VK Cloud Kubernetes clusters. It is possible either to set the default class manually, or explicitly specify the required class when creating a PVC.

There are preconfigured storage classes that use Cinder CSI for block storage.

The classes provide different types of storage in [multiple regions](../../../account/concepts/regions/) and availability zones.
Each storage class has a distinct reclaim policy confugured for it.

<tabs>
<tablist>
<tab>Moscow region</tab>
</tablist>
<tabpanel>

| Storage class<br>name           | Cinder CSI<br>storage type  | Availability<br>zone | Reclaim<br>Policy |
| ------------------------------- | --------------------------- | ------------------- | ----------------- |
| csi-ceph-hdd-gz1                | `ceph-hdd`                  | GZ1                 | Delete            |
| csi-ceph-hdd-gz1-retain         | `ceph-hdd`                  | GZ1                 | Retain            |
| csi-ceph-hdd-ms1                | `ceph-hdd`                  | MS1                 | Delete            |
| csi-ceph-hdd-ms1-retain         | `ceph-hdd`                  | MS1                 | Retain            |
| csi-ceph-ssd-gz1                | `ceph-ssd`                  | GZ1                 | Delete            |
| csi-ceph-ssd-gz1-retain         | `ceph-ssd`                  | GZ1                 | Retain            |
| csi-ceph-ssd-ms1                | `ceph-ssd`                  | MS1                 | Delete            |
| csi-ceph-ssd-ms1-retain         | `ceph-ssd`                  | MS1                 | Retain            |
| csi-high-iops-gz1               | `high-iops`                 | GZ1                 | Delete            |
| csi-high-iops-gz1-retain        | `high-iops`                 | GZ1                 | Retain            |
| csi-high-iops-ms1               | `high-iops`                 | MS1                 | Delete            |
| csi-high-iops-ms1-retain        | `high-iops`                 | MS1                 | Retain            |

</tabpanel>
</tabs>

All storage classes listed:

- Allow volume expansion (`allowVolumeExpansion: true`).
- Use immediate volume provisioning and binding (`volumeBindingMode: Immediate`).

## See also

- [Container service overview](../overview/).
- [Container service architecture](../architecture/).
- [Network in a cluster](../network/).
