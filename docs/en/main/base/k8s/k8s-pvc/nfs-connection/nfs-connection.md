Together with a Ceph-based cloud storage system, you can use shared file storage available via the NFS protocol to create Persistent volumes in your Kubernetes cluster.

To do this, you first need to create an NFS disk in a private subnet associated with your Kubernetes cluster:

1. Select the menu item "Cloud Computing" → "File Storage".
2. Create a new file storage network by specifying:
   - the name of the file storage;
   - storage size;
   - protocol;
   - network;
   - file storage network.
3. Click "Next Step".
4. Click "+ Add new rule".
5. Enter the subnet value in the "Source IP or subnet address" field allocated for your Kubernetes cluster. For example, "10.1.1.0/24".
6. Select the access mode:
   - read and write;
   - read only.
7. Click "Add File Server".
   Go to the created resource and copy the value of the "Connection Point" field. For example, 110.0.0.16:/shares/share-51831cd4-2fe9-4f08-ac45-6be754556519.

Next, you need to create a Persistent Volume using the following manifest (in the "Server" field, you need to enter the IP address from the "Path" value of the previously created resource).

You can also create a PersistentVolumeClaim that uses the previously created NFS Persistent Volume as a source.

> **Important**
> The mountOptions field specified `nfsvers=4.0` Persistent Volume, as well as `storageClassName: ""` in the Persistent Volume Claim declaration.

Below is an example of a manifest creating a Persistent Volume based on NFS and a Persistent Volume Claim using a previously created Persistent Volume as a source.

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: portal-info-data-pv
spec:
  accessModes:
    - ReadWriteMany
  mountOptions:
    - hard
    - nfsvers=4.0
    - timeo=60
    - retrans=10
  capacity:
    storage: 100Gi
  nfs:
    server: 10.0.0.28
    path: "/shares/share-76637908-0da9-4007-be78-e334ca4573a1"
  persistentVolumeReclaimPolicy: "Recycle"
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: portal-info-data-pvc
spec:
  volumeMode: Filesystem
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 100Gi
  volumeName: "portal-info-data-pv"
  storageClassName: ""

---
apiVersion: v1
kind: ReplicationController
metadata:
  name: nginx
spec:
  replicas: 4
  selector:
    app: nginx
  template:
    metadata:
      name: nginx
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80
        volumeMounts:
        - name: portal-info-data
          mountPath: /var/www/html
      restartPolicy: Always
      volumes:
      - name: portal-info-data
        persistentVolumeClaim:
          claimName: portal-info-data-pvc
```

To check the Persistent Volume status, run the command:

```
kubectl get PersistentVolume
```

The Persistent Volume Claim status is output by the command:

```
kubectl get PersistentVolumeClaim
```
