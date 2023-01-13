Persistent Volume Claim allows you to provision persistent volumes for workload, and to manage the lifecycle of these persistent volumes. Such management involves provisioning persistent volumes, binding them to the workload, and retaining persistent volumes when they are no longer needed.

Static PVCs use existing persistent volumes (for example, those that have been manually created by the cluster administrator). These PVCs are recommended if the cluster administrator needs full and granular control over all objects associated with the storage: disks, persistent volumes, and PVCs.

It is also possible to use dynamic PVCs. Such PVCs will first try to find an existing persistent volume that matches the parameters set in the PVC and bind it to the workload. If no such volume exists, it will be created. It is recommended to use such PVCs if the cluster administrator is comfortable with automatic persistent volume lifecycle management: for example, if you are creating a lot of small storage for pods that have a very short lifecycle.

## See also

- [Use case](../../use-cases/storage) demonstrating the use of different PVCs to organize storage.
- [Official Kubernetes documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) for more information about PVCs and persistent volumes.
