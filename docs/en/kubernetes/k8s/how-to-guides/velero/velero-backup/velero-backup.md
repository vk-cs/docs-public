Use [Velero](https://velero.io/docs/main/) to manually create backups of cluster data and restore them.

{note:info}
Using Velero for backups is supported only in [first-generation](/en/kubernetes/k8s/concepts/cluster-generations) clusters.
{/note}

## Preparatory steps

1. [Create](/en/kubernetes/k8s/instructions/create-cluster) a Kubernetes cluster of the latest version, if not done so already.

   Place one or more groups of worker nodes in the `ME1` availability zone. Specify the rest of the cluster parameters at your discretion.

1. [Make sure](/en/kubernetes/k8s/connect/kubectl) that you can connect to the cluster via `kubectl`.
1. [Install and configure](/en/kubernetes/k8s/install-tools/velero) Velero, if not done so already.
1. [Install](/en/tools-for-using-services/cli/openstack-cli) OpenStack CLI, if not done so already. Make sure you can authorize in the cloud using it.

## 1. Deploy an application

To get familiar with creating a backup and using it to restore cluster data, deploy a demo application `coffee`. A persistent volume will be attached to this application.

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

1. Create the required Kubernetes resources based on the manifest:

   ```console
   kubectl apply -f coffee.yaml
   ```

   All the Kubernetes resources required for the application will be placed in a separate `example-app` namespace.

1. Make sure that a disk is created for the persistent volume:

   1. Locate the persistent volume created for the application:

      ```console
      kubectl get pv -n example-app
      ```

      In the table displayed, find the ID of the persistent volume for which `example-app/coffee-pvc` is listed in the `CLAIM` column:

      ```text
      NAME                                       ...   STATUS   CLAIM                    ...
      ...                                        ...   ...      ...                      ...
      <PV_ID>                     ...   Bound    example-app/coffee-pvc   ...
      ```

   1. Get the disk ID for the permanent volume created:

      ```console
      kubectl describe pv <PV_ID> -n example-app
      ```

      The output of the command will contain the disk ID in the `VolumeHandle` parameter:

      ```text
      ...
      Source:
          Type:              CSI (a Container Storage Interface (CSI) volume source)
          Driver:            cinder.csi.openstack.org
          FSType:            ...
          VolumeHandle:      <DISK_ID>
          ...
      ```

   1. Get detailed information about the disk with this ID using the OpenStack CLI:

      ```console
      openstack volume show <DISK_ID> --fit-width
      ```

1. Wait until the load balancer is assigned a public IP address.

   Check the status of the load balancer periodically:

   ```console
   kubectl get svc -n example-app
   ```

   The `EXTERNAL-IP` column should display the public IP address assigned to the load balancer.

1. Make sure that NGINX is responding to requests:

   ```console
   curl <PUBLIC_IP_ADDRESS_OF_LOAD_BALANCER>
   ```

   The following text should display:

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

1. (Optionally) Check the logs of the backup operation:

   ```console
   velero backup logs coffee-backup
   ```

1. (Optionally) [Configure](/en/kubernetes/k8s/how-to-guides/velero/backup-schedule) automatic scheduled backups.

## 3. Restore the application from the backup

1. Simulate application failure. To do this, delete the `example-app` namespace which contains the resources needed for the application to work:

   ```console
   kubectl delete ns example-app
   ```

1. Perform a restore from the backup that was created earlier:

   ```console
   velero restore create --from-backup coffee-backup
   ```

   The command will restore the data to the same cluster that was backed up. If you need to restore data to a new cluster:

   1. [Create](/en/kubernetes/k8s/instructions/create-cluster) a cluster.
   1. [Install Velero](/en/kubernetes/k8s/install-tools/velero) in the cluster.
   1. Run the command above.

1. Wait until the load balancer is assigned a public IP address.

   Check the status of the load balancer periodically:

   ```console
   kubectl get svc -n example-app
   ```

   The `EXTERNAL-IP` column should show the public IP address assigned to the load balancer.

1. Make sure that NGINX is responding to requests:

   ```console
   curl <PUBLIC_IP_ADDRESS_OF_LOAD_BALANCER>
   ```

   The following text should display:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

## Delete unused resources

A running cluster consumes computing resources and is charged accordingly. If you no longer need the Velero tool and the Kubernetes resources you created to test the backup process, delete them:

1. Delete the created `example-app` namespace and the resources associated with it, as well as the created backup:
   
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

1. [Delete](/ru/storage/s3/instructions/objects/manage-object#udalenie_obektov "change-lang") the backups from the bucket that Velero used.

   If necessary, also [delete](/en/storage/s3/instructions/buckets/bucket#removing_a_bucket) the bucket itself.

1. [Stop](/en/kubernetes/k8s/instructions/manage-cluster#start_or_stop_cluster) the cluster you created to use it later or [delete](/en/kubernetes/k8s/instructions/manage-cluster#delete_cluster) it permanently.
