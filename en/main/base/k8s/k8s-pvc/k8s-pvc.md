The Persistent Volume Claim (PVC) mechanism in VK CS allows you to dynamically allocate and connect block disks with the necessary characteristics to your pods.

Kubernetes from VK CS implements a CSI driver (Container Storage Interface), which interacts with the VK CS API to manage block disks.

To dynamically create a PV based on PVC, you must specify the correct storage class. For a complete list of storage classes and disk types available for your cluster, run the command:

```
kubectl get storageclasses.storage.k8s.io
```

Example output of this command:

```
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

Next, you need to specify this storage class in the StorageClass field of the PVC declaration:

```
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