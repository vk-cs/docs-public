## General description

There are two main concepts, PV (PersistentVolume) and PVC (PersistentVolumeClaim).

Persistent Volumes are designed to permanently store data in pods. That is, such data will survive the restart of the pod.

A Persitent Volume Claim is a request to allocate a Persistent Volume. As a result, both the existing Persistent Volume should be allocated and a new one should be created.

In the case of the VK Cloud cloud platform, both block and file storages available in the cloud can be used as PV.

As a permanent storage, the VK Cloud platform provides:

1. Distributed block storage based on SDS (software defined storage) CEPH. Such drives can be either HDD-based or SSD-based. All data on this type of storage is automatically replicated across three servers, at least located in different server racks.
2. High-speed block storage based on SSD/NVME disks connected via iSCSI to each compute server (HIGH IOPS SSD). This storage is characterized by more guaranteed IOPS than SSD CEPH and lower latency. The replication of this storage is based on hardware RAID-10.
3. Virtual file storage connected via NFS/CIFS protocols.

The VK Cloud platform provides all types of block storage using the universal Cinder mechanism, which abstracts work with a specific storage backend.

From a Kubernetes point of view, any block persistent disk you use will be a Cinder Volume, i.e. an ordinary disk in the terminology of our Cloud. Can be created manually by the cluster administrator, or dynamically via a PVC. Disk types in Kubernetes map to storage types provided by VK Cloud as follows:

- `ceph-hdd` in Cinder terminology: SDS CEPH HDD.
- `ceph-ssd` in Cinder terminology: SDS CEPH SSD.
- `high-iops` in Cinder terminology: HIGH IOPS SSD.

Kubernetes clusters in VK Cloud support working with cloud block devices using the CSI (Container Storage Interface) mechanism. In particular, this mechanism allows you to flexibly connect and manage disks by specifying the Storage Class in the PVC declaration.

PersistentVolumeClaim (PVC) is a request to create a PV, when it is created, a PV will be automatically created in the cluster (the corresponding disk will appear in the Disks section of the control panel).

For more information about Persistent Volumes, please visit the [official website](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) Kubernetes.

## Predefined storage classes

When using PVC, you must specify a storage class.
See [here](../k8s-pvc/manage-storage-classes) for how to work with storage classes.

Each Kubernetes VK Cloud cluster has pre-configured storage classes that use Cinder CSI for block storage.
The classes provide different types of storage in [multiple regions](../../../additionals/account/concepts/regions) and availability zones:<tabs>
<tablist>
<tab>Region: Moscow</tab>
<tab>Region: Amsterdam</tab>
</tablist>
<tabpanel>

| Name<br>storage class | Storage Type<br>Cinder CSI | Accessibility zone | Reclaim<br>Policy |
| ------------------------------- | --------------------- | -------------------- | ----------------- |
| csi-ceph-hdd-gz1 | `ceph-hdd` | GZ1 | Delete |
| csi-ceph-hdd-gz1-retain | `ceph-hdd` | GZ1 | Retain |
| csi-ceph-hdd-ms1 | `ceph-hdd` | MS1 | Delete |
| csi-ceph-hdd-ms1-retain | `ceph-hdd` | MS1 | Retain |
| csi-ceph-ssd-gz1 | `ceph-ssd` | GZ1 | Delete |
| csi-ceph-ssd-gz1-retain | `ceph-ssd` | GZ1 | Retain |
| csi-ceph-ssd-ms1 | `ceph-ssd` | MS1 | Delete |
| csi-ceph-ssd-ms1-retain | `ceph-ssd` | MS1 | Retain |
| csi-high-iops-gz1 | `high-iops` | GZ1 | Delete |
| csi-high-iops-gz1-retain | `high-iops` | GZ1 | Retain |
| csi-high-iops-ms1 | `high-iops` | MS1 | Delete |
| csi-high-iops-ms1-retain | `high-iops` | MS1 | Retain |

</tabpanel>
<tabpanel>

| Name<br>storage class | Storage Type<br>Cinder CSI | Accessibility zone | Reclaim<br>Policy |
| ------------------------------- | --------------------- | -------------------- | ----------------- |
| csi-ceph-hdd-ams | `ceph-hdd` | AMS | Delete |
| csi-ceph-hdd-ams-retain | `ceph-hdd` | AMS | Retain |
| csi-ceph-ssd-ams | `ceph-ssd` | AMS | Delete |
| csi-ceph-ssd-ams-retain | `ceph-ssd` | AMS | Retain |
| csi-high-iops-ams | `high-iops` | AMS | Delete |
| csi-high-iops-ams-retain | `high-iops` | AMS | Retain |

</tabpanel>
</tabs>

All mentioned storage classes:

- Allow volume expansion (`allowVolumeExpansion: true`).
- Use immediate volume binding and allocation (`volumeBindingMode: Immediate`).

Read more about these parameters and the Reclaim Policy [here](../k8s-pvc/manage-storage-classes#parametry-klassov-hraneniya).
