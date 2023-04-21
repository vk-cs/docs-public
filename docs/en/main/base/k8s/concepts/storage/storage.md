## Supported VK Cloud storage types

- Block storages:

  - Based on [Ceph](https://ceph.io/en/). To ensure fault tolerance and data integrity, the storage consists of three replicas located in different server racks.

    The storage can use HDD or SSD disks.

  - Based on high-performance [NVMe](https://www.snia.org/education/what-is-nvme) SSD disks (High-IOPS SSD). Such storage is connected via [iSCSI](https://www.snia.org/education/what-is-iscsi). Hardware RAID-10 is used to provide fault tolerance and data integrity at the storage level.

- [File Storage](https://www.snia.org/education/what-is-nas) connected via [NFS](https://www.ibm.com/docs/en/aix/7.1?topic=management-network-file-system) and [CIFS](https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview).

## Working with Container Storage Interface (CSI)

Kubernetes clusters use [OpenStack Cinder](https://docs.openstack.org/cinder/latest/) to integrate with block storage.

The storage types available in a Kubernetes cluster via Cinder CSI correlate with VK Cloud block storage as follows:

- Ceph HDD corresponds to `ceph-hdd` in Cinder.
- Ceph SSD corresponds to `ceph-ssd` in Cinder.
- High-IOPS SSD corresponds to `high-iops` in Cinder.

Using Cinder CSI allows you to:

- Create persistent volumes manually and automatically (with Persistent Volume Claims) based on available storage types. When creating persistent volumes via PVC, it is possible to use one of the available storage classes.

   <info>

  When creating a volume in Kubernetes, its corresponding disk in the VK Cloud platform will be created automatically.

   </info>

- Automatically remount persistent volumes:
  - When the pod using the volume or the worker node hosting the pod fails (assuming the pod is restored to that node or another node).
  - When you migrate a pod using a volume from one worker node to another.

## Pre-configured storage classes

When using Persistent Volume Claim, a storage class must be specified.

Each Kubernetes VK Cloud cluster has pre-configured storage classes that use Cinder CSI for block storage.
The classes provide different types of storage in [multiple regions](../../../account/concepts/regions/) and availability zones:

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
