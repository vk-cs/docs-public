# {heading(Manual backup)[id=mk8s-velero-backup-managed]}

{include(/en/_includes/_translated_by_ai_en.md)}

Use the {linkto(../../../concepts/addons-and-settings/addons#mk8s-addons-velero)[text=Velero]} add-on to manually create backups of cluster data and restore them.

## {heading(Preparation steps)[id=mk8s-velero-backup-managed-prepare]}

{include(/en/_includes/_create-test-cluster.md)[tags=managed]}
1. {linkto(../../../connect/kubectl#mk8s-kubectl)[text=Make sure]} that you can connect to the cluster using `kubectl`.
1. {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=Install the OpenStack CLI]}, if not done yet. Make sure that you can authorize in the cloud with it.
1. {linkto(../../../instructions/addons/advanced-installation/install-advanced-velero#mk8s-install-advanced-velero)[text=Install the Velero add-on]}, if not done yet.

## {heading({counter(managed-velero)}. Create an application)[id=mk8s-velero-backup-managed-create-app]}

{include(/en/_includes/_velero-magnum-how-to.md)[tags=create-app]}

## {heading({counter(managed-velero)}. Create an application backup)[id=mk8s-velero-backup-managed-create]}

1. Create a `coffee-backup.yaml` manifest:

   ```yaml
   apiVersion: velero.io/v1
   kind: Backup
   metadata:
     name: coffee-backup
     namespace: velero
   spec:
     includedNamespaces:
       - example-app
   ```

1. Apply the manifest to the cluster:

   ```console
   kubectl apply -f coffee-backup.yaml
   ```

   This manifest creates a manual backup of the entire `example-app` namespace that contains the resources required for the application to run. The lifetime of the created backup is 72 hours by default. After this time expires, the backup will be deleted.

1. (Optional) {linkto(../../../how-to-guides/managed-velero/managed-backup-schedule#mk8s-backup-schedule-managed)[text=Configure]} a schedule for automatic backups.

## {heading({counter(managed-velero)}. Restore the application from a backup)[id=mk8s-velero-backup-managed-restore]}

1. Simulate an application failure. To do this, delete the `example-app` namespace that contains the resources required for the application to run:

   ```console
   kubectl delete ns example-app
   ```

1. Create a `coffee-restore.yaml` manifest:

   ```yaml
   apiVersion: velero.io/v1
   kind: Restore
   metadata:
     name: coffee-restore
     namespace: velero
   spec:
     backupName: coffee-backup
   ```

1. Apply the manifest to the cluster:

   ```console
   kubectl apply -f coffee-restore.yaml
   ```

   This manifest restores resources from the backup created earlier. The data is restored to the same cluster where the backup was performed. If you need to restore the data to a new cluster:

    1. {linkto(../../../instructions/create-cluster/create-webui-gen-2#mk8s-create-webui-gen-2)[text=Create]} a cluster.
    1. {linkto(../../../instructions/addons/advanced-installation/install-advanced-velero#mk8s-install-advanced-velero)[text=Install the Velero add-on]} to the cluster.
    1. Create and apply the `coffee-restore.yaml` manifest.

1. Remove the annotation with the load balancer identifier that remained after the backup was restored:

   ```console
   kubectl -n example-app annotate service coffee-svc loadbalancer.openstack.org/load-balancer-id-
   ```

   After that, a new load balancer will be created.

1. Wait until a {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP address]} is assigned to the load balancer.

   Periodically check the load balancer status:

   ```console
   kubectl get svc -n example-app
   ```

   The `EXTERNAL-IP` column should show the Floating IP address assigned to the load balancer.

1. Make sure that NGINX responds to requests:

   ```console
   curl <LOAD_BALANCER_FLOATING_IP_ADDRESS>
   ```

   Expected output:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

## {heading(Delete unused resources)[id=mk8s-velero-backup-managed-delete]}

{include(/en/_includes/_velero-magnum-how-to.md)[tags=delete-managed]}