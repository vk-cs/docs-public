{includetag(overview)}
Use the [Velero](https://velero.io/docs/main/) tool to manually create backups of cluster data and restore them.
{/includetag}

{includetag(prep)}

{ifdef(public)}
{include(/en/_includes/_create-test-cluster.md)}
   Place one or more worker node groups in the `ME1` availability zone. Choose the other cluster parameters at your own discretion.
1. {linkto(../../../connect/kubectl#k8s-kubectl)[text=Make sure]} that you can connect to the cluster using `kubectl`.
1. {linkto(../../../install-tools/velero#k8s-velero)[text=Install and configure]} Velero, if you have not done it already.
1. {linkto(/ru/tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=Install]} the OpenStack CLI, if you have not done it already. Make sure you can authorize in the cloud with it.
   {/ifdef}

{ifndef(public)}
1. Make sure you can {linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=sign in to the management console]} {var(cloud)}.
1. Make sure you can {linkto(../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=connect to the OpenStack CLI]}.
1. Make sure the {linkto(../../concepts/flavors#k8s-flavors-vm-flavor)[text=cluster type]} of Kubernetes is at least Standard-6-6.
1. Make sure you can {linkto(../../connect/kubectl#k8s-kubectl)[text=connect to the cluster using kubectl]}.
1. Make sure {linkto(../../install-tools/velero#k8s-velero)[text=Velero is installed and configured]}.
   {/ifndef}

{/includetag}

{includetag(create-app)}

To get familiar with creating a backup and restoring from it, create the `coffee` demo application. A persistent volume will be attached to this application.

1. Create a manifest file{ifdef(public)} specifying the {linkto(../../../concepts/storage#k8s-storage-storage-classes)[text=storage class]} in the availability zone where your worker node group is located{/ifdef}:

   {cut(coffee.yaml)}
   ```yaml
   apiVersion: v1
   kind: Namespace
   metadata:
     name: example-app
   ---
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: coffee-pvc
     namespace: example-app
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 1Gi
     storageClassName: "<STORAGE_CLASS>"
   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: coffee
     namespace: example-app
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: coffee
     template:
       metadata:
         labels:
           app: coffee
       spec:
         volumes:
           - name: coffee-volume
             persistentVolumeClaim:
               claimName: coffee-pvc
         initContainers:
           - name: write-html-for-nginx
             image: busybox
             volumeMounts:
               - name: coffee-volume
                 mountPath: /usr/share/nginx/html
             command: ["/bin/sh", "-c"]
             args:
               [
                 'echo "The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume." > /usr/share/nginx/html/index.html',
               ]
         containers:
           - name: coffee
             image: nginxdemos/nginx-hello
             volumeMounts:
               - name: coffee-volume
                 mountPath: /usr/share/nginx/html
             ports:
               - containerPort: 8080
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc
     namespace: example-app
   spec:
     type: LoadBalancer
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: coffee
   ```
   {/cut}

1. Apply the manifest in the cluster:

   ```console
   kubectl apply -f coffee.yaml
   ```

   The manifest will create all the Kubernetes resources needed for the application to work in the `example-app` namespace.

1. Make sure a disk has been created for the persistent volume:

    1. Find the persistent volume created for the application:

       ```console
       kubectl get pv -n example-app
       ```

       In the output, find the ID of the persistent volume whose `CLAIM` column shows `example-app/coffee-pvc`.
       Example command output:

       ```text
       NAME                    ...   STATUS   CLAIM                    ...
       ...                     ...   ...      ...                      ...
       <PERSISTENT_VOLUME_ID>  ...   Bound    example-app/coffee-pvc   ...
       ```

    1. Get the ID of the disk for the created persistent volume:

       ```console
       kubectl describe pv <PERSISTENT_VOLUME_ID> -n example-app
       ```

       The command output will contain the disk ID in the `VolumeHandle` parameter.
       Example output:

       ```text
       ...
       Source:
           Type:          CSI (a Container Storage Interface (CSI) volume source)
           Driver:        cinder.csi.openstack.org
           FSType:        ...
           VolumeHandle:  <DISK_ID>
           ...
       ```

    1. Get detailed information about the disk with this ID using the OpenStack CLI:

       ```console
       openstack volume show <DISK_ID> --fit-width
       ```

1. Wait until the load balancer is assigned a {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=floating IP address]}.

   Periodically check the load balancer status:

   ```console
   kubectl get svc -n example-app
   ```

   The floating IP address assigned to the load balancer should appear in the `EXTERNAL-IP` column.

1. Make sure NGINX responds to requests:

   ```console
   curl <FLOATING_IP_ADDRESS_OF_LOAD_BALANCER>
   ```

   Expected output:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

{/includetag}

{includetag(create-copy)}

1. Create a manual backup of the entire `example-app` namespace, which contains the resources needed for the application to work:

   ```console
   velero backup create coffee-backup --include-namespaces example-app
   ```

1. Get detailed information about the backup:

   ```console
   velero backup describe coffee-backup
   ```

   {note:warn}
   The default lifetime of a backup is 720 hours. After this time expires, the backup will be deleted.
   {/note}

1. (Optional) View the logs of the backup operation:

   ```console
   velero backup logs coffee-backup
   ```

{ifdef(public)}
1. (Optional) {linkto(../../../how-to-guides/velero/backup-schedule#k8s-backup-schedule)[text=Configure]} a schedule for automatic backup creation.
   {/ifdef}
   {ifndef(public)}
1. (Optional) Configure automatic backup creation on a schedule. For more information, see the Velero help:

   ```console
   velero help
   ```
{/ifndef}

{/includetag}

{includetag(backup)}

1. Simulate an application failure. To do this, delete the `example-app` namespace, which contains the resources needed for the application to work:

   ```console
   kubectl delete ns example-app
   ```

1. Restore the resources from the backup that was created earlier:

   ```console
   velero restore create --from-backup coffee-backup
   ```

   The data will be restored in the same cluster where the backup was performed. If you need to restore the data to a new cluster:

   {ifdef(public)}
    1. {linkto(../../../instructions/create-cluster/create-webui#k8s-create-webui)[text=Create]} a cluster.
    1. {linkto(../../../install-tools/velero#k8s-velero)[text=Install Velero]} in the cluster.
    1. Run the command above.
       {/ifdef}
       {ifndef(public)}
    1. Create a cluster.
    1. Install Velero in the cluster.
    1. Run the command above.
       {/ifndef}

1. Wait until the load balancer is assigned a {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=floating IP address]}.

   Periodically check the load balancer status:

   ```console
   kubectl get svc -n example-app
   ```

   The floating IP address assigned to the load balancer should appear in the `EXTERNAL-IP` column.

1. Make sure NGINX responds to requests:

   ```console
   curl <FLOATING_IP_ADDRESS_OF_LOAD_BALANCER>
   ```

   Expected output:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

{/includetag}

{includetag(delete)}

{ifdef(public)}
A running cluster is billed and consumes computing resources.
{/ifdef}
{ifndef(public)}
A running cluster consumes computing resources.
{/ifndef}
If you no longer need the Velero tool and the Kubernetes resources created to test backups, delete them:

1. Delete the created `example-app` namespace and its associated resources, as well as the created backup:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   kubectl delete ns example-app
   velero backup delete coffee-backup

   ```

   {/tab}

   {tab(Windows)}

   ```console
   kubectl delete ns example-app; `
   velero backup delete coffee-backup
   ```

   {/tab}

   {/tabs}

1. Delete Velero:

   ```console
   velero uninstall
   ```

{ifdef(public)}
1. {linkto(/ru/storage/s3/instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Delete]} the backups from the bucket that was used by Velero.

   If necessary, also {linkto(/ru/storage/s3/instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=delete the bucket itself]}.
   {/ifdef}
   {ifndef(public)}
1. Delete the unused backups from the bucket that was used by Velero.

   If necessary, also delete the bucket itself.

1. Delete the unused cluster to reduce computing resource consumption:

    * {linkto(../../instructions/manage-cluster#k8s-manage-cluster-stop)[text=Stop the cluster]}.
    * {linkto(../../instructions/manage-cluster#k8s-manage-cluster-delete)[text=Delete the cluster]}.
      {/ifndef}

{ifdef(public)}
{include(/en/_includes/_delete-test-cluster-short.md)}
{/ifdef}

{/includetag}

{includetag(delete-managed)}

A running cluster is billed and consumes computing resources. If you no longer need the Kubernetes resources created to test backups with the Velero addon, delete them:

1. Delete the created `example-app` namespace and its associated resources, as well as the created backup:

   {tabs}
   {tab(Linux/macOS)}
   ```console
   kubectl delete ns example-app
   ```
   {/tab}
   {tab(Windows)}
   ```console
   kubectl delete ns example-app; `
   ```
   {/tab}
   {/tabs}

1. (Optional) Delete the `velero` namespace. To do this:

   1. {linkto(../../../instructions/addons/manage-addons#k8s-manage-addons-delete)[text=Delete]} the created resource instances related to the addon's Custom Resource Definitions (CRD).
   1. Run the command:

      {tabs}
      {tab(Linux/macOS)}
      ```console
      kubectl delete ns velero
      ```
      {/tab}
      {tab(Windows)}
      ```console
      kubectl delete ns velero; `
      ```
      {/tab}
      {/tabs}

1. {linkto(/ru/storage/s3/instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Delete]} the backups from the bucket that was used by the Velero addon.

   If necessary, also {linkto(/ru/storage/s3/instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=delete the bucket itself]}.

{include(/en/_includes/_delete-test-cluster-short.md)}

{/includetag}
