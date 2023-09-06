A [persistent volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) (PV) provides long-term data storage capabilities for Kubernetes clusters. Data stored on a PV is not lost when an individual container or entire pod fails.

[Workloads](https://kubernetes.io/docs/concepts/workloads/) cannot use PV directly. A [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#introduction) (PVC) should be created, which allows you to request a persistent volume with the desired parameters and then use it in workloads. The most common parameters that can be specified in a PVC are:

- Storage size (`spec.resources.requests.storage`).
- Volume access mode (`spec.accessModes`).

  Kubernetes supports the following volume access modes:

  - `ReadWriteOnce` (RWO): a volume can be mounted in read and write mode by a single node in the cluster. Such a volume can be used by multiple pods at once if they are all hosted on the same node to which the volume is mounted.

  - `ReadOnlyMany` (ROX): a volume can be mounted in read-only mode by multiple nodes in a cluster.
  - `ReadWriteMany` (RWX): a volume can be mounted in read-write mode by multiple nodes in the cluster.

  A PVC can be used to request a PV that is capable of multiple modes, but when mounting such a PV, you will have to select one of the modes. For example, if a PV with both RWO and RWX modes is requested using PVC, one of the following actions will be available:

  - Either mount this PV in RWO mode by a single cluster node.
  - Or mount this PV in RWX mode by multiple cluster nodes.

## PV and PVC lifecycle

The PV and PVC life cycle is independent of the pod life cycle and [consists of](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#lifecycle-of-a-volume-and-claim) four consecutive stages:

1. Provisioning.
1. Binding.
1. Using.
1. Reclaiming.

### 1. Provisioning

A PV must be prepared prior to requesting the PV via PVC. It can be done in one of the following ways:

- Static provisioning: the PV is created manually, e.g. by a Kubernetes administrator.
- Dynamic provisioning: the PV is created automatically after the PVC is created.

For dynamic provisioning, two conditions must be met:

- Storage classes must be configured in the Kubernetes cluster. Kubernetes VK Cloud clusters already contain [pre-configured storage classes](../../concepts/storage#pre_configured_storage_classes).

- For PVCs, no suitable PVs shall be found that already exist.

During dynamic provisioning Kubernetes will try to create a PV matching the parameters of the PVC. One of the storage classes will be used:

- A storage class explicitly defined in the PVC.
- A default storage class if the class is not explicitly specified in the PVC.

In VK Cloud Kubernetes clusters, the default storage class [is not configured](../../concepts/storage#pre_configured_storage_classes). If you do not plan to explicitly set the storage class in the PVC, then [manually set the default storage class](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/) before creating the PVC.

### 2. Binding

PV and PVC are bound on a one-to-one basis for use in workloads. An already bound PV cannot be used with other PVCs.

When a new PVC is created in a Kubernetes cluster:

1. Kubernetes tries to find a suitable PV that is available for binding (in the `Available` status) and matches the parameters specified in the PVC as closely as possible.

   If there is no available PV that exactly matches the parameters specified in the PVC, a PV with excessive characteristics may be selected. Keep an eye on the available PVs and the PVCs being created to avoid a situation where all PVs of large capacity are associated with PVCs that request small amounts of storage. An extra space on such PVs will be wasted and they will not be available for binding when PVCs requiring large amounts of storage appear in the cluster.

   <details>
   <summary>PV selection example</summary>

   For example, let there exist in a cluster:

   - A PVC that requests 10Gi of storage in ROX mode.
   - The first PV of 100Gi in ROX, RWX modes.
   - The second PV of 5Gi in ROX mode.
   - The third PV of 100Gi in RWO, ROX, RWX modes.

   In this case, the PVC will be bound to the first PV even though:

   - The PV size exceeds the requested size and the PV supports more modes than specified in the PVC.
   - There is the third PV with the same size as the first PV but with excessive set of access modes.

   </details>

1. Kubernetes performs one of the actions:

   - If a suitable PV was found, Kubernetes binds it to the PVC.
   - If no suitable PV was found, Kubernetes attempts to dynamically provision a PV, then to bind the created PV to the PVC.

1. If no PV is bound to a PVC, then the PVC remains in the `Unbound` state. Workloads cannot use such PVC as a volume. Kubernetes will periodically try to bind such PVC to new PVs if they appear in the cluster.

### 3. Using

Once Kubernetes has bound a PVC to a PV, that PVC can be used by a workload as a normal volume.

### 4. Reclaiming

When a PVC is no longer needed and is deleted, a specified reclaim policy is applied to the PV associated with that PVC.

The policy is set in one of the following ways:

- When creating a persistent volume manually.
- When setting a default storage class or setting a storage class in the PVC.

Available policies:

- Keep the volume (`Retain`).

  Use it for PVs with sensitive data to protect the data if the PVC is accidentally deleted. If necessary, you can manually clean up and delete PVs with this policy.

- Delete Volume (`Delete`).

  Depending on the selected PV type, the underlying storage associated with the PV may also be deleted.

  <warn>

  Use this policy and the storage classes that implement it with caution: data loss is possible.
  In VK Cloud, due to [integration with Cinder CSI](../../concepts/storage#working_with_container_storage_interface_csi), deleting a PV will also delete the VK Cloud disk associated with it.

  </warn>

In VK Cloud Kubernetes clusters, the storage type selected affects [available reclaim policies](../../concepts/storage#available_reclaim_policies_for_persistent_volumes).

## See also

- [How storage is organized in Kubernetes VK Cloud](../../concepts/storage).
- [List of pre-configured storage classes](../../concepts/storage#pre_configured_storage_classes).
- [Use-case](../../use-cases/storage) that demonstrates using of various PVCs.
- [Official Kubernetes documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes) for more information about PVCs and PVs.
