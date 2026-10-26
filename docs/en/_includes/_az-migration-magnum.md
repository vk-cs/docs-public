{includetag(warn)}

{note:warn}
Perform the migration on a stopped workload to avoid data loss. If necessary, stop and start the workload in stages in accordance with the migration steps.
{/note}

{/includetag}

{includetag(prep)}

1. {linkto(../../../connect/kubectl#mk8s-kubectl)[text=Install and configure]} `kubectl`, if you have not already done so.
1. {linkto(../../../connect/kubectl#mk8s-kubectl-check-connection)[text=Connect]} to the cluster using `kubectl`.
1. (Optional) [Install](https://github.com/stackitcloud/rename-pvc) the `rename-pvc` utility for renaming PVCs.

{/includetag}

{includetag(check)}

- in the pod's [scheduling rules](https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/):
   - in the `nodeAffinity`, `topologySpreadConstraints`, or `nodeSelector` parameters;
   - in the {linkto(../../../reference/labels-and-taints#mk8s-labels-and-taints)[text=labels]} `topology.kubernetes.io/zone`, `failure-domain.beta.kubernetes.io/zone`, and `topology.cinder.csi.openstack.org/zone`.

- in the {linkto(../../../concepts/storage#mk8s-storage-storage-classes)[text=storage class]} (`StorageClass`) for [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) pods.

If the availability zone is not specified, migrating to a different availability zone will not affect your workload in any way, and no additional migration actions will be required from you.

{/includetag}

{includetag(pvc-prep)}

To prevent accidental deletion of data from the PVC when migrating the workload:

1. Change the PV's {linkto(../../../concepts/storage#mk8s-storage-reclaim-policies)[text=reclaim policy]} to `Retain`:

   ```console
   pv_name=$(kubectl get pvc <PVC_NAME> -n <PVC_NAMESPACE> -o jsonpath='{.spec.volumeName}') 
   kubectl patch pv "$pv_name" -n <PVC_NAMESPACE> -p '{"spec": {"persistentVolumeReclaimPolicy": "Retain"}}'
   ```

   Here:

    - `<PVC_NAME>` — the name of the PVC you want to migrate.
    - `<PVC_NAMESPACE>` — the namespace the PVC is located in.

1. {linkto(../../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-clone-volume)[text=Clone]} the disk associated with the PVC.

1. (Optional) Keep the old PVC until the migration work is complete by renaming it to `<PVC_NAME>-old`, so that you can revert to it if needed.

   When you create the new PVC, use `<PVC_NAME>` — this way it will receive the name of the original migrated one.

   You can rename the PVC manually or using the `rename-pvc` utility. Example command for `rename-pvc`:

   ```console
   rename-pvc -n <PVC_NAMESPACE> <OLD_PVC_NAME> <NEW_PVC_NAME>
   ```

{/includetag}

{includetag(snap)}

{tab(Disk snapshot (management console))}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. {linkto(../../../../../computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-create)[text=Create a disk snapshot]} associated with the PVC.
1. {linkto(../../../../../computing/iaas/instructions/volumes/volumes-create#iaas-volumes-create)[text=Create a new disk]} based on this snapshot, specifying the following parameters:
    - **Source**: the disk snapshot created in the previous step;
    - **Availability zone**: the availability zone you are migrating to.
    - Specify the remaining parameters as you prefer.
1. Wait for the disk to be created and remember its ID.
1. {linkto(../../../instructions/manage-resources#mk8s-manage-resources-create-resources)[text=Create]} a PV referencing the ID of the disk created from the snapshot, and a PVC based on it:

   {cut(Example PV manifest)}
   ```yaml
   apiVersion: v1
   kind: PersistentVolume
   metadata:
     name: <PV_NAME> 
   spec:
     accessModes:
     - ReadWriteOnce 
     capacity:
       storage: <STORAGE_SIZE>
     claimRef:
       kind: PersistentVolumeClaim
       namespace: <PVC_NAMESPACE>
       name: <PVC_NAME>
     csi:
       driver: cinder.csi.openstack.org
       volumeHandle: <DISK_ID>
     nodeAffinity:
       required:
         nodeSelectorTerms:
         - matchExpressions:
           - key: topology.cinder.csi.openstack.org/zone
             operator: In
             values:
             - <DISK_AVAILABILITY_ZONE>
     persistentVolumeReclaimPolicy: Retain
     storageClassName: <STORAGE_CLASS_NAME>
     volumeMode: Filesystem
   ```

   Here:

    - `<PV_NAME>` — the name of the PV the PVC will be created from.
    - `<STORAGE_SIZE>` — the amount of storage this PV provides. It must match the size of the disk.
    - `<PVC_NAMESPACE>` — the namespace the PVC will be located in.
    - `<PVC_NAME>` — the name of the PVC to be created based on this PV.
    - `<DISK_ID>` — the ID of the disk created from the snapshot.
    - `<DISK_AVAILABILITY_ZONE>` — the availability zone you selected when creating the disk from the snapshot.
    - `persistentVolumeReclaimPolicy` — the PV's reclaim policy, defined in its storage class.
    - `<STORAGE_CLASS_NAME>` — the name of the storage class (StorageClass) for the PV.

   {/cut}

   {cut(Example PVC manifest)}

   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: <PVC_NAME> 
     namespace: <PVC_NAMESPACE>
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: <STORAGE_SIZE> 
     storageClassName: <STORAGE_CLASS_NAME> 
   ```

   The parameter values must be the same for both manifests.

   {/cut}

1. Wait for the created PV to reach the `Bound` status.

{include(/en/_includes/_az-migration-magnum-check.md)}

{/tab}

{tab(Disk snapshot (Cinder CSI plugin))}

1. [Install](https://github.com/kubernetes-csi/external-snapshotter) the `external-snapshotter` utility for creating PV snapshots:

   ```console
   git clone https://github.com/kubernetes-csi/external-snapshotter.git
   cd external-snapshotter
   kubectl kustomize client/config/crd | kubectl create -f -
   kubectl -n kube-system kustomize deploy/kubernetes/snapshot-controller | kubectl create -f -
   ```
1. Make sure all `snapshot-controller` pods in the `kube-system` namespace are in the `Ready` status, using the command:

   ```console
   kubectl get pods -n kube-system | grep snapshot-controller
   ```

1. Check whether `csi-snapshotter-role` has `patch` permissions:

   ```console
   kubectl get clusterrole csi-snapshotter-role -o yaml
   ```

   If it does, they will be listed in the `rules` section:

   ```console
   - apiGroups: ["snapshot.storage.k8s.io"]
   resources: ["volumesnapshotcontents"]
   verbs: ["get", "list", "watch", "patch"]
   ```

   If not, add them:

   {cut(Example manifest)}
   ```yaml
   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRole
   metadata:
     name: csi-snapshotter-role
   spec: {}
   rules:
     ...
     - verbs:
         - create
         - get
         - list
         - watch
         - update
         - delete
         - patch 
       apiGroups:
         - snapshot.storage.k8s.io
       resources:
         - volumesnapshotcontents
      ...
   ```
   {/cut}

1. Create a disk snapshot:

    1. Create a `VolumeSnapshotClass` resource:

       {cut(Example manifest)}

       ```yaml
       apiVersion: snapshot.storage.k8s.io/v1
       kind: VolumeSnapshotClass
       metadata:
          name: <SNAPSHOT_CLASS_NAME>
       driver: cinder.csi.openstack.org
       deletionPolicy: Retain 
       parameters:
          force-create: "false"
       ```
       {/cut}

    1. Create a `VolumeSnapshot` resource:

       {cut(Example manifest)}

       ```yaml
       apiVersion: snapshot.storage.k8s.io/v1
       kind: VolumeSnapshot
       metadata:
         name: <DISK_SNAPSHOT_NAME>
       spec:
         source:
           persistentVolumeClaimName: <PVC_NAME> 
         volumeSnapshotClassName: <SNAPSHOT_CLASS_NAME>
       ```
       {/cut}

    1. Make sure the disk was created correctly by running the command:

       ```console
       kubectl get volumesnapshot
       ``` 

       The command output for the disk must show `readyToUse: true`.

1. Create a new PVC from the disk snapshot:

   {cut(Example manifest)}

   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: <PVC_NAME>
   spec:
     storageClassName: <STORAGE_CLASS_NAME>>
     dataSource:
       name: <DISK_SNAPSHOT_NAME>
       kind: VolumeSnapshot
       apiGroup: snapshot.storage.k8s.io
     accessModes:
       - ReadWriteOnce 
     resources:
       requests:
         storage: 1Gi 
   ```

   Here:

    - `<PVC_NAME>` — the name of the PVC to be created from the snapshot.
    - `<STORAGE_CLASS_NAME>` — the name of the storage class in the availability zone you are migrating to.
    - `<DISK_SNAPSHOT_NAME>` — the name of the created disk snapshot.

   {/cut}

{include(/en/_includes/_az-migration-magnum-check.md)}

{/tab}

{/includetag}

{includetag(pv-migrate)}

{tab(pv-migrate)}

1. Make sure both availability zones have suitable worker node groups, or {../../../instructions/manage-node-group#mk8s-manage-node-group-add-group)[text=add]} them. This is needed in order to run the pods of the `pv-migrate` utility on them, since the PVC from the old zone will be bound to one of them, and the PVC from the new zone to the other.
1. [Install](https://github.com/utkuozdemir/pv-migrate/blob/main/docs/install.md) the `pv-migrate` utility.
1. Create the PVC the workload will be migrated to, in the new availability zone:

   {cut(Example manifest)}
   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: <PVC_NAME>
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: <STORAGE_SIZE>
     storageClassName: <STORAGE_CLASS_NAME>
   ```
   Here:
   - `<PVC_NAME>` — the name of the PVC being migrated to.
   - `<STORAGE_SIZE>`  — the size of the PVC's storage. It must be no smaller than the size of the PVC being migrated.
   - `<STORAGE_CLASS_NAME>` — the name of the storage class in the availability zone you are migrating to.

   {/cut}

1. Run the `pv-migrate` utility:
   ```console
   pv-migrate migrate -n <SOURCE_PVC_NAMESPACE> -N <TARGET_PVC_NAMESPACE> <SOURCE_PVC_NAME> <TARGET_PVC_NAME>
   ```
   
1. Wait for the migration to complete.

   {cut(Example of the utility's output)}

   ```console
   Dec 10 13:59:08.537 INF 🚀 Starting migration
   Dec 10 13:59:08.886 INF 💭 Attempting migration source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 strategies=mnt2,svc,lbsvc
   Dec 10 13:59:08.887 INF 🚁 Attempt using strategy source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=bdcbb strategy=mnt2
   Dec 10 14:01:09.989 INF 🧹 Cleaning up source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=bdcbb strategy=mnt2
   Dec 10 14:01:10.766 INF ✨ Cleanup done source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=bdcbb strategy=mnt2
   Dec 10 14:01:10.767 WRN 🔶 Migration failed with this strategy, will try with the remaining strategies source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=bdcbb strategy=mnt2 error="failed to wait for job completion: failed to wait for pod: timed out waiting for the condition"
   Dec 10 14:01:10.769 INF 🚁 Attempt using strategy source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=dedab strategy=svc
   Dec 10 14:01:10.769 INF 🔑 Generating SSH key pair source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=dedab strategy=svc algorithm=ed25519
   Dec 10 14:01:29.504 INF 🧹 Cleaning up source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=dedab strategy=svc
   Dec 10 14:01:30.767 INF ✨ Cleanup done source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=dedab strategy=svc
   Dec 10 14:01:30.769 INF ✅ Migration succeeded source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=dedab strategy=svc 
   ```
   {/cut}

{include(/en/_includes/_az-migration-magnum-check.md)}

{/tab}

{/includetag}

{includetag(volume-id)}

{tab(Disk ID)}

The disk in use has already been migrated to the new availability zone, but its metadata in Kubernetes still shows the old zone. To fix this, create a new PV and PVC that point to the same disk in the new zone while having metadata in the new zone.

1. Make sure the PV's {linkto(../../../concepts/storage#mk8s-storage-reclaim-policies)[text=reclaim policy]} is set to `Retain`, otherwise the disk will be deleted when the PV is deleted.

1. Find out the ID of the disk the PVC was created on:

   ```console
   kubectl get pv <PV_NAME> -o jsonpath='{.spec.csi.volumeHandle}'
   ```
   
   Here `<PV_NAME>` — the name of the PV associated with the PVC you want to migrate. The disk ID will be listed in the `volumeHandle` parameter.

1. Create a new PV that references this same disk, but with the storage class (StorageClass) of the target availability zone:

   {cut(Example PV manifest)}

   ```yaml
   apiVersion: v1
   kind: PersistentVolume
   metadata:
     name: <PV_NAME>
   spec:
     accessModes:
     - ReadWriteOnce 
     capacity:
       storage: <STORAGE_SIZE> 
     claimRef:
       kind: PersistentVolumeClaim
       namespace: <PVC_NAMESPACE>
       name: <PVC_NAME>
     csi:
       driver: cinder.csi.openstack.org
       volumeHandle: <DISK_ID>
     nodeAffinity:
       required:
         nodeSelectorTerms:
         - matchExpressions:
           - key: topology.cinder.csi.openstack.org/zone
             operator: In
             values:
             - <AVAILABILITY_ZONE>
     persistentVolumeReclaimPolicy: Retain 
     storageClassName: <STORAGE_CLASS_NAME>
     volumeMode: Filesystem
   ```
   
   Here: 

   - `<PV_NAME>` — the name of the new PV.
   - `<STORAGE_SIZE>` — the amount of storage this PV provides. It must match the size of the disk.
   - `<PVC_NAMESPACE>` — the namespace the PVC will be located in.
   - `<PVC_NAME>` — the name of the PVC to be created based on this PV.
   - `<DISK_ID>` — the ID of the disk.
   - `<AVAILABILITY_ZONE>` — the name of the availability zone you are migrating to.
   - `<STORAGE_CLASS_NAME>` — the name of the storage class (StorageClass) in the availability zone you are migrating to.

   {/cut}

1. Create a PVC based on the new PV's manifest:

   {cut(Example PVC manifest)}

   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: <PVC_NAME>
   spec:
     accessModes:
       - ReadWriteOnce 
     resources:
       requests:
         storage: <STORAGE_SIZE> 
   storageClassName: <STORAGE_CLASS_NAME> 
   ```
   {/cut}

1. Detach the migrated PVC from the pod before attaching the newly created one, since Managed Containers does not allow attaching multiple PVCs to a single pod.  

{include(/en/_includes/_az-migration-magnum-check.md)}

{/tab}

{/includetag}

{includetag(helm-addons)}

1. Check whether the binding to availability zones was additionally set through Helm charts or when {linkto(../../../instructions/addons/manage-addons#mk8s-manage-addons-edit-code)[text=editing the addon code]} in the {var(cloud)} management console. 
1. If so, manually specify the availability zone the migration was performed to for them. This is needed so that the migration results are not overwritten the next time the manifests are updated.

   {tabs}
   {tab(Helm charts)}

   1. Specify the availability zone the migration was performed to in `values.yaml`:
  
      ```yaml
      topology:
        zone: <AVAILABILITY_ZONE>
      ```

   1. Apply the update. For more information, see the [official Helm documentation](https://helm.sh/docs/). 

   {/tab}

   {tab(Addons)}

   1. [Go to](https://msk.cloud.vk.ru/app/) the VK Cloud management console.
   1. Select the project the desired cluster is located in.
   1. Go to **Kubernetes clusters → Kubernetes clusters**.
   1. Click the name of the desired cluster.
   1. Go to the **Addons** tab.
   1. Click ![ ](/ru/assets/more-icon.svg "inline") for the addon whose code you need to edit, and select **Edit**.
   1. Make the necessary changes and click **Change settings**.

   {/tab}
   {/tabs}

{/includetag}

{includetag(tf-magnum)}

If you manage cluster resources through Terraform, synchronize the Terraform State with the actual infrastructure after migrating the cluster:

1. Add a `lifecycle` block to the `vkcs_kubernetes_cluster` cluster resource:

   ```console
   lifecycle {
     prevent_destroy = true
   }
   ```

   This will prevent the cluster from being recreated or deleted if unsynchronized fields remain in the configuration file or the Terraform State.

1. Bind the cluster to the `vkcs_kubernetes_cluster` resource, using the data from the Terraform configuration file:

   ```console
   terraform import vkcs_kubernetes_cluster.<RESOURCE_NAME> <CLUSTER_ID>
   ```
   
1. Bind each node group to the `vkcs_kubernetes_node_group` resource:

   ```console
   terraform import vkcs_kubernetes_node_group.<RESOURCE_NAME> <NODE_GROUP_ID>
   ```

1. Check which parameters appeared on the new resources, and add them to the Terraform configuration file:

   ```console
   terraform state show <RESOURCE>.<RESOURCE_NAME>
   ```

1. If autoscaling is enabled for the node group, the value of the `node_count` parameter in the Terraform file may differ from the actually used number of nodes. Add a `lifecycle` block to the node group resource:

   ```console
   lifecycle {
     ignore_changes = [node_count]
   }
   ```   

   This way Terraform will not track changes to the `node_count` parameter, which changes automatically due to autoscaling.

1. Generate a changes file and make sure it does not contain any instructions to recreate resources:

   ```console
   terraform plan
   ```

   If the command output shows `No changes`, the configuration file and the Terraform State are fully synchronized. If the output still shows changes, continue synchronizing until the command output shows `No changes`.

   {note:warn}
   Do not apply changes if the output of the `terraform plan` command indicates resource recreation (`replace`, `-/+`, `destroy and then create` operations), especially for the `availability_zone` and `availability_zones` fields.

   Running `terraform apply` will destroy the existing cluster and launch a new one, instead of updating the configuration after migrating between availability zones.
   {/note}

   If the command output suggests resource recreation operations for the `availability_zone` or `availability_zones` fields:

   1. Find out the current value of the field in the configuration using the command:

      ```console
      terraform state show <RESOURCE>.<RESOURCE_NAME>
      ```
   1. Update the value in the Terraform configuration file.

1. Remove the previously added `lifecycle` block with the `prevent_destroy = true` parameter from the cluster resource.

For more information, see the {linkto(../../../instructions/helpers/terraform-howto#k8s-terraform-howto-features)[text=Using Terraform]} section and the [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_cluster.md#argument-reference).

{/includetag}

{includetag(tf-managed)}

If you manage cluster resources through Terraform, synchronize the Terraform State with the actual infrastructure after migrating the cluster:

1. Add a `lifecycle` block to the `vkcs_kubernetes_cluster_v2` cluster resource:

   ```console
   lifecycle {
     prevent_destroy = true
   }
   ```

   This will prevent the cluster from being recreated or deleted if unsynchronized fields remain in the configuration file or the Terraform State.

1. Bind the cluster to the `vkcs_kubernetes_cluster_v2` resource, using the data from the Terraform configuration file:

   ```console
   terraform import vkcs_kubernetes_cluster_v2.<RESOURCE_NAME> <CLUSTER_ID>
   ```

1. Bind each node group to the `vkcs_kubernetes_node_group_v2` resource:

   ```console
   terraform import vkcs_kubernetes_node_group_v2.<RESOURCE_NAME> <NODE_GROUP_ID>
   ```

1. Check which parameters appeared on the new resources, and add them to the Terraform configuration file:

   ```console
   terraform state show <RESOURCE>.<RESOURCE_NAME>
   ```

1. If autoscaling is enabled for the node group, the value of the `node_count` parameter in the Terraform file may differ from the actually used number of nodes. Add a `lifecycle` block to the node group resource:

   ```console
   lifecycle {
     ignore_changes = [node_count]
   }
   ```   

   This way Terraform will not track changes to the `node_count` parameter, which changes automatically due to autoscaling.

1. Generate a changes file and make sure it does not contain any instructions to recreate resources:

   ```console
   terraform plan
   ```

   If the command output shows `No changes`, the configuration file and the Terraform State are fully synchronized. If the output still shows changes, continue synchronizing until the command output shows `No changes`.

   {note:warn}
   Do not apply changes if the output of the `terraform plan` command indicates resource recreation (`replace`, `-/+`, `destroy and then create` operations), especially for the `availability_zone` and `availability_zones` fields.

   Running `terraform apply` will destroy the existing cluster and launch a new one, instead of updating the configuration after migrating between availability zones.
   {/note}

   If the command output suggests resource recreation operations for the `availability_zone` or `availability_zones` fields:

   1. Find out the current value of the field in the configuration using the command:

      ```console
      terraform state show <RESOURCE>.<RESOURCE_NAME>
      ```
   1. Update the value in the Terraform configuration file.

1. Remove the previously added `lifecycle` block with the `prevent_destroy = true` parameter from the cluster resource.

For more information, see the {linkto(../../../instructions/helpers/terraform-howto#k8s-terraform-howto-features)[text=Using Terraform]} section and the [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_cluster.md#argument-reference).

{/includetag}

{includetag(delete)}

Running resources in the cluster are charged for and consume compute resources. If you do not plan to use the PVCs and disk snapshots left after the migration, or the availability zone itself, delete them and their associated resources:

1. Delete the {linkto(../../../concepts/storage#mk8s-storage-reclaim-policies)[text=old PVC]} and the {linkto(../../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=disk snapshots]}.

1. Delete the storage class (StorageClass) of the old availability zone:

   ```console
   kubectl get sc -o name | grep <OLD_AVAILABILITY_ZONE> | xargs -I {} kubectl delete {}
   ```

   Here `<OLD_AVAILABILITY_ZONE>` — the name of the availability zone the migration was performed from, specified in lowercase.

{/includetag}
