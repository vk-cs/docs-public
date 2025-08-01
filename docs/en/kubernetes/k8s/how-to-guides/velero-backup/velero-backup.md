With [Velero](https://velero.io/docs/main/) you can back up and restore cluster data.

## Preparatory steps

1. [Create a cluster](../../instructions/create-cluster) Kubernetes of the most current version.

   Place one or more groups of worker nodes in the `GZ1` availability area.

   The rest of the cluster parameters are at your discretion.

1. Make sure that you can [connect to the cluster](../../connect/kubectl) with `kubectl`.
1. Make sure that [Velero is installed and configured](../../install-tools/velero).
1. [Install](/en/tools-for-using-services/cli/openstack-cli) OpenStack CLI if it is not already installed. Make sure you can [authorize](/en/tools-for-using-services/cli/openstack-cli) in the cloud using it.

## 1. Deploy application

To get familiar with creating a backup and restoring from it, deploy a demo application `coffee`. A persistent volume will be attached to this application.

1. Create a manifest file:

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
     storageClassName: "csi-ceph-hdd-gz1"

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

1. Create the necessary Kubernetes resources based on the manifest:

   ```console
   kubectl apply -f coffee.yaml
   ```

   All the Kubernetes resources needed for the application will be placed in a separate namespace `example-app`.

1. Make sure that a disk is created for the persistent volume:

   1. Locate the persistent volume created for the application:

      ```console
      kubectl get pv -n example-app
      ```

       In the table displayed, find the ID of the persistent volume for which `example-app/coffee-pvc` is listed in the `CLAIM` column:

      ```text
      NAME                                       ...   STATUS   CLAIM                    ...
      ...                                        ...   ...      ...                      ...
      <persistent volume ID>                     ...   Bound    example-app/coffee-pvc   ...
      ```

   1. Get the disk ID for the permanent volume created:

      ```console
      kubectl describe pv <persistent volume ID> -n example-app
      ```

      The output of the command will contain the disk ID in the ``VolumeHandle`` parameter:

      ```text
      ...
      Source:
          Type:              CSI (a Container Storage Interface (CSI) volume source)
          Driver:            cinder.csi.openstack.org
          FSType:            ...
          VolumeHandle:      <disk ID>
          ...
      ```

   1. Get detailed information about the disk with this ID using the OpenStack CLI:

      ```console
      openstack volume show <disk ID> --fit-width
      ```

1. Wait until the load balancer is assigned a public IP address.

    Check the status of the load balancer periodically:

   ```console
   kubectl get svc -n example-app
   ```

   The `EXTERNAL-IP` column should show the public IP address assigned to the load balancer.

1. Make sure that NGINX is responding to requests:

   ```console
   curl <public IP address assigned to the load balancer>
   ```

   The following should be output:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

## 2. Create a backup of the application

1. Create a manual backup of the entire `example-app` namespace, which contains the resources you need for the application:

   ```console
   velero backup create coffee-backup --include-namespaces example-app
   ```

1. Load the backup details:

   ```console
   velero backup describe coffee-backup
   ```

   {note:warn}

   The default backup lifetime is 720 hours. After that time, the backup will be deleted.

   {/note}

1. Check the logs of the backup operation (if necessary):

   ```console
   velero backup logs coffee-backup
   ```

It's also possible to do automatic scheduled backups. For more information about scheduled backups, see Velero's help:

```console
velero help
```

## 3. Restore the application from the backup

1. Simulate application failure. To do this, delete the `example-app` namespace, which contains the resources needed for the application to work:

   ```console
   kubectl delete ns example-app
   ```

1. Perform a restore from the backup that was created earlier:

   ```console
   velero restore create --from-backup coffee-backup
   ```

   The command will restore the data to the same cluster that was backed up. If you need to restore data to a new cluster:

   1. [Create cluster](../../instructions/create-cluster).
   1. [Install Velero](../../install-tools/velero) in the cluster.
   1. Run the above command.

1. Wait until the load balancer is assigned a public IP address.

   Check the status of the load balancer periodically:

   ```console
   kubectl get svc -n example-app
   ```

   The `EXTERNAL-IP` column should show the public IP address assigned to the load balancer.

1. Make sure that NGINX is responding to requests:

   ```console
   curl <public IP address assigned to the load balancer>
   ```

   The following should be output:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

## Delete unused resources

1. If the Kubernetes resources you created are no longer needed, delete them.

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```console
   kubectl delete ns example-app
   velero backup delete coffee-backup

   ```

   </tabpanel>
   <tabpanel>

   ```console
   kubectl delete ns example-app; `
   velero backup delete coffee-backup
   ```

   </tabpanel>
   </tabs>

1. If you no longer need Velero, delete it:

   ```console
   velero uninstall
   ```

1. If you don't need the backups anymore, delete them from the bucket that Velero used.

   If necessary, also [delete the bucket itself](/en/storage/s3/instructions/buckets/bucket#removing_a_bucket).

1. A running cluster consumes computing resources. If you no longer need it:

   - [stop](../../instructions/manage-cluster#start_or_stop_cluster) it to use it later;
   - [delete](../../instructions/manage-cluster#delete_cluster) it permanently.
