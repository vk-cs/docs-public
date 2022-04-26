## Description

There are two basic concepts, PV (PersistentVolume) and PVC (PersistentVolumeClaim).

Persistent Volumes are designed for persistent storage of pod data. That is, such data will survive the pod restart.

Persitent Volume Claim is a Persistent Volume allocation request. As a result, both the existing Persistent Volume will be selected and a new one will be created.

In the case of the VK CS cloud platform, both block and file storages available in the cloud can be used as PVs.

As a permanent storage, the VK CS platform provides:

1.  Distributed block storage based on SDS (software defined storage) CEPH. Such disks can be both HDD-based and SSD-based. All data on this type of storage is automatically replicated across three servers, at least located in different server racks.
2.  High-speed block storage based on SSD / NVME disks, connected via iSCSI to each compute server (HIGH IOPS SSD). This storage is characterized by more guaranteed IOPS than SSD CEPH and lower latency. Replication of this storage is based on hardware RAID-10.
3.  Virtual file storage connected via NFS / CIFS protocols.

The VK CS platform provides all kinds of block storage with a generic Cinder engine that abstracts away from a specific storage backend.

From a Kubernetes perspective, any block persistent disk you use will be a Cinder Volume, i.e. an ordinary disk in the terminology of our Cloud. Can be created manually by the cluster administrator, or dynamically via PVC.

VK CS Kubernetes clusters support cloud block devices using the Container Storage Interface (CSI) mechanism. Including this mechanism allows you to flexibly connect and manage disks by specifying the Storage Class in the PVC declaration.

You can get a list of supported Storage Class for your cluster using the command

```
kubectl get storageclasses.storage.k8s.io
```

PersistentVolumeClaim (PVC) is a request to create a PV, when it is created, a PV will be automatically created in the cluster (the corresponding disk will appear in the Disks section of the control panel).

For more information about Persistent Volumes, we recommend that you familiarize yourself with the [official](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) Kubernetes website.
