# {heading(Migrating workload before resource migration)[id=k8s-pre-migration]}

{include(/en/_includes/_translated_by_ai_en.md)}

This guide will help you prepare in advance for the {linkto(/en/kubernetes/k8s/concepts/az-migration-magnum#k8s-az-migration)[text=migration]} of cluster resources between {linkto(/en/start/concepts/architecture#architecture-az)[text=availability zones]}, which will be performed by {var(cloud)} staff. You will perform the following steps:

1. Determine whether your workload depends on the current availability zone.
1. Create a new worker node group in the availability zone to which the migration will take place, and move your workload there.
1. Move your [stateful workload](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) to new {linkto(/en/kubernetes/k8s/reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=PVCs]}. 
1. Wait for the resource migration work by {var(cloud)} to be completed.
1. If the availability zone binding was set in Helm charts or when configuring add-ons, update these values to the new availability zone. 

{include(/en/_includes/_az-migration-magnum.md)[tags=warn]}

## {heading(Preparatory steps)[id=k8s-pre-migration-prepare]}

1. Determine which Kubernetes cluster needs to be moved to a new availability zone.
{include(/en/_includes/_az-migration-magnum.md)[tags=prep]}

## {heading({counter(az)}. Determine whether the workload depends on the availability zone)[id=k8s-pre-migration-check]}

Determine whether the migration will affect the [workload](https://kubernetes.io/docs/concepts/workloads/) of your clusters. To do this, find out whether the availability zone is specified:

{include(/en/_includes/_az-migration-magnum.md)[tags=check]}

## {heading({counter(az)}. Move the workload to new node groups)[id=k8s-workload-migration-new-node-groups]}

1. {linkto(/en/kubernetes/k8s/instructions/manage-node-group#k8s-manage-node-group-add-group)[text=Add]} a worker node group and specify the availability zone to which the migration is being performed for it.
1. Sequentially move your workload to this node group. For more details, see the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/workloads/).
1. {linkto(/en/kubernetes/k8s/instructions/manage-node-group#k8s-manage-node-group-delete-node-group)[text=Delete]} the node group with the old availability zone or {linkto(/en/kubernetes/k8s/instructions/scale#k8s-instructions-scale-horizontal-worker-nodes)[text=reduce]} the number of nodes in it to zero so that you can use it later.

## {heading({counter(az)}. Move the stateful workload to a new PVC)[id=k8s-pre-migration-stateful]}

Since the cluster resources have not been moved yet, the PVC used by the stateful workload is physically and metadata-wise located in the old availability zone.

To move the stateful workload to a PVC in the new availability zone:

1. [Prepare the PVC](#k8s-pre-migration-pvc-check).
1. [Move the workload using one of the proposed methods](#k8s-pre-migration-pvc).

### {heading(3.1. Prepare the PVC for migration)[id=k8s-pre-migration-pvc-check]}

{include(/en/_includes/_az-migration-magnum.md)[tags=pvc-prep]}

### {heading(3.2. Choose a migration method)[id=k8s-pre-migration-pvc]}

Several methods are available for migrating a PVC: 

- using a disk snapshot (via the {var(cloud)} management console or via the Cinder CSI plugin);
- using the `pv-migrate` utility.

{tabs}

{include(/en/_includes/_az-migration-magnum.md)[tags=snap]}
{include(/en/_includes/_az-migration-magnum.md)[tags=pv-migrate]}

{/tabs}

## {heading({counter(az)}. Complete the resource migration)[id=k8s-pre-migration-finish]}

1. Wait for the {linkto(/en/kubernetes/k8s/concepts/az-migration-magnum#k8s-az-migration)[text=resource migration work]} by {var(cloud)} to be completed.
1. Start the workload and make sure that it works correctly after the migration.

## {heading({counter(az)}. Update Helm charts and add-on settings)[id=k8s-pre-migration-helm-addons]}

{include(/en/_includes/_az-migration-magnum.md)[tags=helm-addons]}

## {heading({counter(az)}. (Optional) Synchronize Terraform State)[id=mk8s-pre-migration-tf]}

{include(/en/_includes/_az-migration-magnum.md)[tags=tf-magnum]}

## {heading(Delete unused resources)[id=k8s-pre-migration-delete]}

{include(/en/_includes/_az-migration-magnum.md)[tags=delete]}