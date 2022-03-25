StatefulSet is a convenient way to work with Stateful applications that need to handle Pod shutdown and Graceful Shutdown events. Typically, these applications are databases and message queues that run in multiple instances, synchronized with each other through replication or clustering.

There are several ways to organize such schemes: using shared Persistent Volumes (RWX) and using individual Persistent Volumes (RWO).

In case of RWX Persistent Volumes (NFS, GlusterFS), you can use the existing Persistent Volume Claim in the StatefulSet declaration. However, this method is not suitable for RWO Persistent Volumes (Block Storage), since block storage is mounted in exclusive mode to each Pod. As a result, if the StatefulSet has 2 or more replicas, the Persistent Volume will be mounted to only 1 of the Pods, and mounting to all other Pods will fail.

In order to avoid such problems, you should use `volumeClaimTemplates` in the StatefulSet declaration:
```
volumeClaimTemplates:
 - metadata: name: www
 spec: accessModes: [ "ReadWriteOnce" ]
 storageClassName: "csi-dp1-ssd"
 resources: 
requests: 
storage: 1Gi
```
In this case, a PVC named data-0, data-1, data-2, etc. will be created for each StatefulSet replica. depending on the number of replicas. Each of these PVCs will allocate Persistent Volumes of the required volume, which will be mounted to the pods corresponding to the StatefulSet replicas.