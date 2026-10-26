# {heading(Workload migration after resource migration)[id=k8s-post-migration]}

{include(/en/_includes/_translated_by_ai_en.md)}

This guide will help you complete the migration of your workload after {var(cloud)} employees have completed the {linkto(/en/kubernetes/k8s/concepts/az-migration-magnum#k8s-az-migration)[text=resource migration work]} of cluster resources between {linkto(/en/start/concepts/architecture#architecture-az)[text=availability zones]}. You will perform the following steps:

1. Determine whether your workload depends on the old availability zone, since in that case your workload metadata will continue to reference it.
1. Adapt the workload on the already migrated worker node groups to the new availability zone.
1. Migrate the [stateful workload](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) to new {linkto(/en/kubernetes/k8s/reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=PVCs]}.
1. If the availability zone binding was set in Helm charts or when configuring add-ons, update these values to the new availability zone.

{include(/en/_includes/_az-migration-magnum.md)[tags=warn]}

## {heading(Preparatory steps)[id=k8s-post-migration-prepare]}

1. Go to the Kubernetes cluster whose resources have been migrated to another availability zone.
{include(/en/_includes/_az-migration-magnum.md)[tags=prep]}

## {heading({counter(az)}. Determine whether the workload depends on the availability zone)[id=k8s-post-migration-check]}

Determine whether the migration will affect the [workload](https://kubernetes.io/docs/concepts/workloads/) of your clusters. To do this, find out whether the availability zone is specified:

{include(/en/_includes/_az-migration-magnum.md)[tags=check]}

## {heading({counter(az)}. Update the configurations of the migrated node groups)[id=k8s-post-migration-update]}

1. Wait for the {var(cloud)} resource migration work to be completed.

   Nodes of the migrated worker node groups (i.e., those created before the migration) will have the following {linkto(/en/kubernetes/k8s/reference/labels-and-taints#k8s-labels-and-taints)[text=labels]} pointing to the old availability zone:

    - `topology.kubernetes.io/zone`,
    - `failure-domain.beta.kubernetes.io/zone`.

   These labels need to be updated, since the node itself will physically be located in the new availability zone.

   The `topology.cinder.csi.openstack.org/zone` label does not need to be updated: the new availability zone will be set in it for nodes created both before and after the migration.

1. Update the availability zones in the labels:

   {tabs}

   {tab(For individual nodes)}

   ```console
      kubectl label node ≠ \
          topology.kubernetes.io/zone=<NEW_AVAILABILITY_ZONE> \
          failure-domain.beta.kubernetes.io/zone=<NEW_AVAILABILITY_ZONE> \
          --overwrite
   ```

   Here `<NEW_AVAILABILITY_ZONE>` is the availability zone after the migration.

   {/tab}

   {tab(For all nodes)}

   ```console
      kubectl label nodes -l topology.kubernetes.io/zone=<OLD_AVAILABILITY_ZONE>,failure-domain.beta.kubernetes.io/zone=<OLD_AVAILABILITY_ZONE> \
          topology.kubernetes.io/zone=<NEW_AVAILABILITY_ZONE> \
          failure-domain.beta.kubernetes.io/zone=<NEW_AVAILABILITY_ZONE> \
          --overwrite
   ```

   Here:

   - `<OLD_AVAILABILITY_ZONE>` is the availability zone before the migration;
   - `<NEW_AVAILABILITY_ZONE>` is the availability zone after the migration.

   The new availability zone must be the same for both labels.

   {/tab}
   {/tabs}

## {heading({counter(az)}. Migrate the stateful workload to a new PVC)[id=k8s-post-migration-stateful]}

Since the {linkto(/en/kubernetes/k8s/concepts/az-migration-magnum#k8s-az-migration)[text=resource migration]} work by {var(cloud)} has already been completed, the disks on which the PVs are located have already physically changed their zone. Now you need to update their metadata in the cluster.

To migrate the stateful workload to a PVC in the new availability zone,

1. [Prepare the PVC](#k8s-post-migration-pvc-check).
1. [Migrate the workload using one of the suggested methods](#k8s-post-migration-pvc).

### {heading(3.1. Prepare the PVC for migration)[id=k8s-post-migration-pvc-check]}

{include(/en/_includes/_az-migration-magnum.md)[tags=pvc-prep]}

### {heading(3.2. Choose a migration method)[id=k8s-post-migration-pvc]}

Several PVC migration methods are available:

- using a disk snapshot (via the {var(cloud)} management console or via the Cinder CSI plugin);
- using the `pv-migrate` utility;
- using the disk ID.

{tabs}

{include(/en/_includes/_az-migration-magnum.md)[tags=snap]}
{include(/en/_includes/_az-migration-magnum.md)[tags=pv-migrate]}
{include(/en/_includes/_az-migration-magnum.md)[tags=volume-id]}

{/tabs}

## {heading({counter(az)}. Update Helm charts and add-on settings)[id=k8s-post-migration-helm-addons]}

{include(/en/_includes/_az-migration-magnum.md)[tags=helm-addons]}

## {heading({counter(az)}. (Optional) Synchronize Terraform State)[id=mk8s-pre-migration-tf]}

{include(/en/_includes/_az-migration-magnum.md)[tags=tf-magnum]}

## {heading(Delete unused resources)[id=k8s-post-migration-delete]}

{include(/en/_includes/_az-migration-magnum.md)[tags=delete]}