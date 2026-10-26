# {heading(Cluster migration between availability zones)[id=k8s-az-migration]}

{include(/en/_includes/_translated_by_ai_en.md)}

All clusters that used the {linkto(/en/start/concepts/architecture#architecture-az)[text=availability zone]} `GZ1` must be moved to another availability zone (for example `PA2`), since `GZ1` is being decommissioned.

Cluster migration between availability zones takes place in three steps:

1. Determine whether the migration will affect the [workload](https://kubernetes.io/docs/concepts/workloads/) of your clusters. To do this, check whether the availability zone is specified:

   {include(/en/_includes/_az-migration-magnum.md)[tags=check]}

1. If the cluster workload depends on the availability zone, migrate it yourself either {linkto(/en/kubernetes/k8s/how-to-guides/workload-migration/pre-migration#k8s-pre-migration)[text=before the start]} of the cluster resource migration by {var(cloud)}, or {linkto(/en/kubernetes/k8s/how-to-guides/workload-migration/post-migration#k8s-post-migration)[text=after]}.

   During independent migration, the workload will have to be stopped.

1. Wait until {var(cloud)} employees migrate the cluster resources:

   - master nodes,
   - worker node groups,
   - VMs,
   - disks,
   - load balancers.

   The cluster will remain available during the work; the migration is performed as a live migration. {var(cloud)} employees will notify you by email about the start and timing of the work.