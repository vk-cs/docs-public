LL NVMe (Low Latency NVMe) disks are high-performance local disks available on the VK Cloud platform. They offer fast response times and are available upon request via technical support. Among all the disk options on the VK Cloud platform, LL NVMe disks have the lowest latency, with a guaranteed response time of no more than 0.5 milliseconds. Unlike other disks available on the VK Cloud platform, LL NVMe disks are local, meaning they are located on the same hosts as the virtual machines they are connected to.
 
## {heading(Preparatory steps)[id=prepare]}

1. Contact [technical support](mailto:support@mcs.mail.ru) to get access to the configuration for connecting an LL NVMe disk to a worker node, which includes:
   
   - Disk type: `ef-nvme`
   - [VM flavor](en/computing/iaas/concepts/about#flavors) for the node group based on this disk type.
   
   Wait for access to the configuration before proceeding to the next step.
   
1. [Create](en/kubernetes/k8s/instructions/create-cluster) a cluster if not done so already.

1. In your VK Cloud management console, [add](/en/kubernetes/k8s/instructions/manage-node-group#add_group) a worker node group with VMs based on the configuration for LL NVMe:

   - **Category of virtual machine**: `High frequency CPU`.
   - **Node type**: a VM template for an LL NVMe disk (such templates have `NVME` in their names).
   - Leave the other settings unchanged. 

1. [Install and configure](../../connect/kubectl) `kubectl` if not done so already.
1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.

## {heading(1. Add a storage class (StorageClass) for LL NVMe disks)[id=nvme_storageclass]}

1. Create a manifest file for `StorageClass`, for example `csi-ef-nvme.yaml`, and add the following content to the file:

   ```yaml
   apiVersion: storage.k8s.io/v1
   kind: StorageClass
   metadata:
     name: csi-ef-nvme
   parameters:
     type: ef-nvme
     localToNode: "true"
   provisioner: cinder.csi.openstack.org
   allowVolumeExpansion: true
   reclaimPolicy: Delete
   volumeBindingMode: WaitForFirstConsumer
   ```
   Where:
   - `type: ef-nvme` specifies the LL NVMe disk type. 
   - `volumeBindingMode: WaitForFirstConsumer` allows Kubernetes to delay the creation and binding of a [persistent volume](/en/kubernetes/k8s/reference/pvs-and-pvcs) until a pod that uses the [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#introduction) is created. This ensures that Kubernetes will create the disk after the pod is scheduled for the node.

      Read more about volume binding settings in the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/storage/storage-classes/#volume-binding-mode). 
   - `localToNode: "true"` ensures that the disks are placed on the same hosts as the VMs they are bound to.

1. Apply the created manifest to your cluster:

   ```console
   kubectl apply -f csi-ef-nvme.yaml
   ```

## {heading(2. Create an application)[id=nvme_app]}

To learn how to connect LL NVMe disks to worker nodes, deploy the `coffee` test app.

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. [Add](/en/kubernetes/k8s/instructions/manage-node-group#labels_taints) the `disktype: ef-nvme` label for the worker node group you created earlier to ensure that the pod is located on the nodes with LL NVMe disks:

   - **Key**: `disktype`.
   - **Value**: `ef-nvme`.
   - Leave the other settings unchanged.

   {note:warn}
   
   Relocating a pod to another node might lead to disk migration and temporary performance degradation. When configuring workloads, it is best to avoid relocating pods with LL NVMe disks between nodes to maintain stable performance.

   {/note}

1. Create the manifest file:

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
     storageClassName: "csi-ef-nvme"
   ---
     apiVersion: apps/v1
   kind: StatefulSet
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
         nodeSelector:
           disktype: ef-nvme
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
                 'echo "The coffee pod says Hello World to everyone! This file is located on NVME volume." > /usr/share/nginx/html/index.html',
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

   All the Kubernetes resources required for the application will be placed in a separate namespace `example-app`.

1. Make sure that the created disk is bound to the persistent volume based on the manifest for `StorageClass`:

   1. Find the persistent volume created for the application:

      ```console
      kubectl get pv -n example-app
      ```

   1. In the table displayed, find the ID of the persistent volume with `example-app/coffee-pvc` specified in the `CLAIM` column, and `csi-ef-nvme` — in the `STORAGECLASS` column:

      ```text
      NAME                                       ...   STATUS   CLAIM                    STORAGECLASS   ...
      ...                                        ...   ...      ...                      ...            ...
      <persistent volume ID>                     ...   Bound    example-app/coffee-pvc   csi-ef-nvme    ...
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

   ```

   </tabpanel>
   <tabpanel>

   ```console
   kubectl delete ns example-app; `
   ```

   </tabpanel>
   </tabs>

1. [Remove](/en/kubernetes/k8s/concepts/storage#available_reclaim_policies_for_persistent_volumes) the persistent volume that was created.

1. A running cluster consumes computing resources. If you no longer need it:

   - [Stop](/en/kubernetes/k8s/instructions/manage-cluster#stop) it to use it later.
   - [Delete](../../instructions/manage-cluster#delete_cluster) it permanently.
