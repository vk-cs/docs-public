# {heading(Connecting persistent storage)[id=k8s-connect-pv]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Persistent Volume and Persistent Volume Claim objects)[id=k8s-connect-pv-pvc]}

To ensure persistent data storage, Kubernetes provides the following resource types:

* PersistentVolume (PV) — a partition on a hard disk accessible from the cluster. The cluster interacts with a PV in the same way as with nodes.
* PersistentVolumeClaim (PVC) — a user request to use this disk. A PV interacts with a PVC in the same way as a worker node interacts with pods, i.e., the PVC requests from the PV the required disk size and access type — `ReadWriteOnce`, `ReadOnlyMany`, or `ReadWriteMany`.

PV and PVC are connected automatically by the cluster based on the `Storage class` parameter integrated with Cinder.

Example of a PV configuration file:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-storage-1
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /tmp/data1
```

Example of a PVC configuration file:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-app-1
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```

Commands to create and view PV and PVC based on a configuration file:

```console
kubectl create -f new-pv.yaml
kubectl create -f new-pvc.yaml
kubectl get pv | grep pv-storage
kubectl get pvc | grep pvc-app
```

## {heading(Connecting NFS storage using Persistent Volume and Persistent Volume Claim)[id=k8s-connect-pv-connect-nfs]}

Connecting NFS storage using Persistent Volume and Persistent Volume Claim is described in [this guide](https://cloud.vk.ru/docs/kubernetes/k8s/use-cases/storage#podklyuchenie_faylovyh_hranilishch_c785fc).

## {heading(Dynamic disk provisioning with PVC)[id=k8s-connect-pv-dynamic]}

The Persistent Volume Claim (PVC) mechanism dynamically provisions and attaches block disks with the required characteristics to pods.

The Kubernetes service implements a CSI driver (Container Storage Interface) that interacts with the {var(cloud)} API to manage block disks.

To dynamically create a PV based on a PVC, specify the correct storage class. To get the full list of storage classes and disk types available for the cluster, run the command:

```console
kubectl get storageclasses.storage.k8s.io
```

Example of the expected result:

```console
csi-ceph                   cinder.csi.openstack.org   10d
csi-ceph-retain            cinder.csi.openstack.org   10d
csi-dp1                    cinder.csi.openstack.org   10d
csi-dp1-high-iops          cinder.csi.openstack.org   10d
csi-dp1-high-iops-retain   cinder.csi.openstack.org   10d
csi-dp1-retain             cinder.csi.openstack.org   10d
csi-dp1-ssd                cinder.csi.openstack.org   10d
csi-dp1-ssd-retain         cinder.csi.openstack.org   10d
csi-hdd (default)          cinder.csi.openstack.org   10d
csi-hdd-retain             cinder.csi.openstack.org   10d
csi-ko1-high-iops          cinder.csi.openstack.org   10d
csi-ko1-high-iops-retain   cinder.csi.openstack.org   10d
csi-ko1-ssd                cinder.csi.openstack.org   10d
csi-ko1-ssd-retain         cinder.csi.openstack.org   10d
csi-local-ssd              cinder.csi.openstack.org   10d
csi-local-ssd-retain       cinder.csi.openstack.org   10d
csi-ms1                    cinder.csi.openstack.org   10d
csi-ms1-retain             cinder.csi.openstack.org   10d
csi-ssd                    cinder.csi.openstack.org   10d
csi-ssd-retain             cinder.csi.openstack.org   10d
```

Then specify the storage class in the `storageClass` field of the PVC declaration:

```console
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: nginx-pvc-ssd
spec:
  storageClassName: "csi-ko1-ssd"
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 30Gi
 
---
apiVersion: v1
kind: Pod
metadata:
  name: nginx-test-pvc
  labels:
    name: nginx-test-pvc
spec:
  containers:
    - image: nginx
      name: nginx
      ports:
        - containerPort: 80
          name: http
      volumeMounts:

# name must match the volume name below
        - name: nginx-persistent-storage

# mount path within the container
          mountPath: /val/lib/nginx/test
  volumes:
    - name: nginx-persistent-storage
      persistentVolumeClaim:
        claimName: nginx-pvc-ssd
```