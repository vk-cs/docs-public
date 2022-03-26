The PersistentVolume mechanism allows you to connect an existing disk to the K8S cluster as a persistent data store.

>**Important**
>If you want to mount an NFS shared file storage as a disk, then follow the instructions at this [link](https://mcs.mail.ru/help/ru_RU/k8s-pvc/k8s-nfs).

Let's look at an example. You have an ext4 disk with a test_file.txt file. Let's create a PV based on this disk, describing a manifest for it:
```
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-test
spec:
  accessModes:
  - ReadWriteOnce
  capacity:
    storage: 8Gi
  cinder:
    volumeID: 239e30a9-5a14-41a1-9245-17ace88076a4
    fsType: ext4
  persistentVolumeReclaimPolicy: Retain
  volumeMode: Filesystem
```
**accessModes: ReadWriteOnce** — means that this disk can be connected to only one pod (multiple connections to different pods are available only for NFS)

**capacity: storage: 8Gi** — PV size field, is required and must be equal to the size of the used disk

**volumeID** — a field where the ID of the disk used is indicated

**fsType: ext4** - the type of filesystem located on the disk

**persistentVolumeReclaimPolicy: Retain** — PV lifecycle parameter, if the value is Retain, the disk will remain in the project after removing PVC and PV (if the value is Delete, the disk will be deleted)

Let's create a PV based on the manifest and validate it:
```
kubectl apply -f pv.yaml
```
Let's check the created PVC:
```
persistentvolume/pv-test created
$ kubectl get pv
NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   REASON   AGE
pv-test   8Gi        RWO            Retain           Available                                   20m
```

Now we need to describe the PVC for this PV:
```
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: test-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 8Gi
  volumeName: pv-test
  storageClassName: ""
```

**storageClassName: ""** — always empty for Persistent Volumes created from an existing disk. 
The size (storage) must match the specified parameters in PV.

**volumeName: pv-test** — here you need to specify the name of the PV created in the previous step.

Create PVC:
```
kubectl apply -f pvc.yaml
```
This will display:
```
persistentvolumeclaim/test-pvc created
```
Then run the command:
```
kubectl get pvc
```
This will display:
```
NAME       STATUS   VOLUME    CAPACITY   ACCESS MODES   STORAGECLASS   AGE
test-pvc   Bound    pv-test   8Gi        RWO            dp1            22m
```
Now let's create a manifest for the pod using PVC:
```
---
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  volumes:
    - name: pvc
      persistentVolumeClaim:
       claimName: test-pvc
  containers:
  - image: nginx
    name: nginx
    volumeMounts:
      - mountPath: /mnt
        name: pvc
```
The **spec: volumes** section describes the disk that will be mounted in our container, here we set its name and through the **persistentVolumeСlaim** parameter we indicate our created PVC (by name).
The **containers: volumeMounts section** specifies the disk described in the previous paragraph, the **mountPath: / mnt** parameter specifies the path where the disk will be mounted.

Create under:
```
kubectl apply -f pod_test.yaml
```
This will display:
```
pod/centos-pod created
```
Then run the command:
```
kubectl get pods
```
This will display:
```
NAME        READY   STATUS    RESTARTS   AGE
test-pod    1/1     Running   0          24m
```
Now let's connect to the running pod and read the file from the mounted disk:
```
kubectl exec -it test-pod -- /bin/bash
```
This will display:
```
root@test-pod:/# cat /mnt/test-file.txt
Hello World!
root@test-pod:/#
```
For more information on Persistent Volumes, we recommend that you familiarize yourself with the [official](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) Kubernetes website.