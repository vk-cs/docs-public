Persistent volumes can be connected to simple demo applications in various ways. Next, Persistent Volume Claims (PVCs) will be used to connect them. An Ingress resource will be created to test the functionality of the applications and the volumes connected to them.

## 1. Preparatory steps

1. [Create](../../operations/create-cluster) a Kubernetes cluster of the most current version.

   When creating the cluster:

   - Select the **Assign external IP** option.
   - Create one group of worker nodes with virtual machine type `Standard-2-8` in the `MS1` availability area with total computing resources: 2 vCPU, 8 GB RAM (or more). This is necessary to be able to schedule all the required objects.

    For example, you can create one group of nodes with virtual machine type `Standard-2-8`.

   Other cluster parameters are at your discretion.

1. [Make sure](../../operations/addons/manage-addons#viewing-addons) that the NGINX Ingress addon (`ingress-nginx`) [is installed](../../operations/addons/advanced-installation/install-advanced-ingress/) in a cluster with default parameters. It will be required to provide access to demo applications.

    <warn>

    When installing the addon, a [standard load balancer](/en/networks/vnet/concepts/load-balancer#types-of-load-balancers) will be created.

    Usage of this load balancer is [charged](/en/networks/vnet/tariffs).

    </warn>

1. [Make sure](../../connect/kubectl) that you can connect to the cluster using `kubectl`.

1. Install [curl](https://curl.se/docs/) if the utility is not already installed.

## 2. Create demo applications and connect persistent volumes to them

The following will demonstrate how to create several NGINX-based web applications to display web pages written to the persistent volumes connected to those applications.
The NGINX `nginxdemos/nginx-hello` image is used, which displays web pages from the `/usr/share/nginx/html` directory, so all persistent volumes will be mounted in the application pods via this path.

You can create one or more demo applications, depending on which way you want to connect the persistent volumes.

### Connecting block storages

Block stores are connected to the cluster [with Cinder CSI](../../concepts/storage).

When using this type of storage:

- only one pod can access storage (multiple pods cannot use block storage at the same time);
- as a consequence, the `ReadWriteOnce` mode must be used to access the storage.

<tabs>
<tablist>
<tab>Connecting via static PVC</tab>
<tab>Connecting via dynamic PVC</tab>
<tab>Connecting to several pods via dynamic PVC</tab>
</tablist>
<tabpanel>

This example will create:

1. Disk in the cloud compute service of the VK Cloud platform.
1. A persistent volume corresponding to this disk.
1. Static PVC, using a persistent volume that has already been created.
1. Application `tea` as a single pod deployment, and its corresponding service.

   For this application there will also be an initialization container ([initContainer](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)) which will write the web page to the persistent volume.

To connect a persistent volume using static PVC:

1. [Create a network HDD](../../../iaas/vm-volumes/volume-create).

   When creating, specify:

   - **Disk name:** any name, such as `disk-tea`.
   - **Source:** `empty disk`.
   - **Disk type:** `network HDD (ceph-hdd)`.
   - **Availability zone:** `MS1`.
   - **Size:** `1 GB`.

   Leave other options and settings unchanged.

1. Copy the ID of the created disk, for example `f6d8bf3b-aaaa-bbbb-cccc-4ece8e353246`.

1. Examine the connection features:

   1. The storage sizes specified in the parameters `spec.capacity.storage` for the PersistentVolume resource and `spec.resources.requests.storage` for the PersistentVolumeClaim resource must match the size of the corresponding disk. In this example it is 1 GB.
   1. For the PersistentVolumeClaim resource, use an empty value in the `storageClassName` storage class parameter.
   1. The storage access mode is specified in the `spec.accessModes` parameter for the PersistentVolume resource.
   1. The availability zones of the disk and the worker node on which the pod (application) will be located must match. Otherwise an attempt to mount a persistent volume corresponding to the disk on this node will fail. In this example, the pod will be placed on a group of worker nodes in the `MS1` availability zone and use a disk from the same zone.
   1. ReclaimPolicy `Retain` is used for the permanent volume. The `Delete` policy is not used so that you can monitor the state of the disk manually and not accidentally delete it.

1. Create a manifest for the `tea` application.

    For the PersistentVolume resource, specify the ID of the created disk in the `spec.cinder.volumeID` parameter.

   <details>
   <summary markdown="span">tea.yaml</summary>

   ```yaml
   ---
   apiVersion: v1
   kind: PersistentVolume
   metadata:
     name: tea-pv
   spec:
     capacity:
       storage: 1Gi
     cinder:
       volumeID: <ID of the disk in the f6d8bf3b-aaaa-bbbb-cccc-4ece8e353246 format>
     accessModes:
       - ReadWriteOnce
     persistentVolumeReclaimPolicy: Retain

   ---
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: tea-pvc
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 1Gi
     volumeName: tea-pv
     storageClassName: ""

   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: tea
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: tea
     template:
       metadata:
         labels:
           app: tea
       spec:
         volumes:
           - name: tea-volume
             persistentVolumeClaim:
               claimName: tea-pvc
         initContainers:
           - name: write-html-for-nginx
             image: busybox
             volumeMounts:
               - name: tea-volume
                 mountPath: /usr/share/nginx/html
             command: ["/bin/sh", "-c"]
             args:
               [
                 'echo "The tea pod says Hello World to everyone! This file is located on the statically claimed Cinder ReadWriteOnce persistent volume." > /usr/share/nginx/html/index.html',
               ]
         containers:
           - name: tea
             image: nginxdemos/nginx-hello
             volumeMounts:
               - name: tea-volume
                 mountPath: /usr/share/nginx/html
             ports:
               - containerPort: 8080

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: tea-svc
     labels:
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: tea
   ```

   </details>

1. Apply this manifest to the cluster to create all necessary resources:

   ```bash
   kubectl apply -f ./tea.yaml
   ```

</tabpanel>
<tabpanel>

This example will create:

1. A dynamic PVC that will create a permanent volume based on the given parameters.
1. A `coffee` application as a single pod deployment, and its corresponding service.

   For this application there will also be an initialization container ([initContainer](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)) which will write the web page to the persistent volume.

To connect a persistent volume using dynamic PVC:

1. Examine the connection features:

   1. The required storage size is specified in the `spec.resources.requests.storage` parameter of the PersistentVolumeClaim resource. In this example it is 1 GB.
   1. For the PersistentVolumeClaim resource, specify the storage class in the `spec.storageClassName` parameter. The storage class must use the same availability zone as the worker node on which the pod (application) will reside. Otherwise, an attempt to connect a persistent volume corresponding to the PVC to the pod on that node will fail. In this example, the pod will be placed on a group of worker nodes in the `MS1` availability zone and use the `csi-ceph-hdd-ms1` storage class from the same zone.
   1. The storage access mode is set in the `spec.accessModes` parameter for the PersistentVolumeClaim resource.
   1. ReclaimPolicy `Delete` is used for persistent volume (it follows from selected storage class). When the PVC is deleted, the disk corresponding to the persistent volume will automatically be deleted.

1. Create a manifest for the `coffee` application.

   <details>
   <summary markdown="span">coffee.yaml</summary>

   ```yaml
   ---
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: coffee-pvc
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 1Gi
     storageClassName: "csi-ceph-hdd-ms1"

   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: coffee
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
     labels:
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: coffee
   ```

   </details>

1. Apply this manifest to the cluster to create all necessary resources:

   ```bash
   kubectl apply -f ./coffee.yaml
   ```

</tabpanel>
<tabpanel>

This example will create:

1. Application `juice` as a StatefulSet of two pods, as well as the corresponding services.

   For this application there will also be an initialization container ([initContainer](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)) which will write the web page to the persistent volume.

1. A dynamic PVC that will create persistent volumes based on the parameters you specify.

To connect a persistent volume to multiple pods using dynamic PVC:

1. Examine the connection features:

   1. When you use a StatefulSet PVC, it is not configured separately as in the other examples, but as part of the StatefulSet resource.
   1. The PVC will create one persistent volume for each StatefulSet replica, and these replicas will be numbered in order.

      <info>

      When deploying an application of multiple replicas as a Deployment resource, you must also ensure that a persistent volume is created for each replica using the PVC. Such volumes will have random identifiers instead of sequential numbers.

      </info>

   1. The required storage size is specified in the `spec.volumeClaimTemplates.spec.resources.requests.storage` parameter of the StatefulSet resource. In this example it is 1 GB.
   1. The storage class is specified in the `spec.volumeClaimTemplates.spec.storageClassName` parameter of the StatefulSet resource. The storage class must use the same availability zone as the worker node on which the sub-application will reside. Otherwise, an attempt to connect a persistent volume corresponding to the PVC to the pad on that node will fail. In this example, the pod will be placed on a group of worker nodes in the `MS1` availability zone and use the `csi-ceph-hdd-ms1` storage class from the same zone.
   1. The storage access mode is set in the `spec.volumeClaimTemplates.spec.accessModes` parameter of the StatefulSet resource.
   1. ReclaimPolicy `Delete` is used for permanent volume (it follows from selected storage class). When the PVC is deleted, the disk corresponding to the permanent volume will be automatically deleted.

1. Create a manifest for the `juice` application.

   <details>
   <summary markdown="span">juice.yaml</summary>

   ```yaml
   ---
   apiVersion: apps/v1
   kind: StatefulSet
   metadata:
     name: juice
   spec:
     serviceName: juice
     replicas: 2
     selector:
       matchLabels:
         app: juice
     volumeClaimTemplates:
       - metadata:
           name: juice-pvc
         spec:
           accessModes: ["ReadWriteOnce"]
           storageClassName: "csi-ceph-hdd-ms1"
           resources:
             requests:
               storage: 1Gi
     template:
       metadata:
         labels:
           app: juice
       spec:
         initContainers:
           - name: write-html-for-nginx
             image: busybox
             volumeMounts:
               - name: juice-pvc
                 mountPath: /usr/share/nginx/html
             command: ["/bin/sh", "-c"]
             args:
               [
                 'echo "The juice StatefulSet pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume." > /usr/share/nginx/html/index.html',
               ]
         containers:
           - name: juice
             image: nginxdemos/nginx-hello
             volumeMounts:
               - name: juice-pvc
                 mountPath: /usr/share/nginx/html
             ports:
               - containerPort: 8080

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: juice-svc
     labels:
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: juice

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: juice-0-svc
     labels:
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       statefulset.kubernetes.io/pod-name: juice-0

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: juice-1-svc
     labels:
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       statefulset.kubernetes.io/pod-name: juice-1
   ```

   </details>

1. Apply this manifest to the cluster to create all necessary resources:

   ```bash
   kubectl apply -f ./juice.yaml
   ```

</tabpanel>
</tabs>

### Connecting file storages

File storages are connected to the cluster using a persistent volume that is configured to use the existing storage via the desired protocol, such as NFS.

When using this type of storage:

- Multiple pods can access the storage at once;
- as a consequence, the `ReadWriteMany` mode must be used to access the storage.

<tabs>
<tablist>
<tab>Connecting NFS storage via static PVC</tab>
</tablist>
<tabpanel>

This example will create:

1. NFS file storage in the VK Cloud platform's cloud computing service.
1. A persistent volume corresponding to this storage.
1. Static PVC using an already created persistent volume.
1. Application `milkshake` as a StatefulSet of two pods, as well as the corresponding services.

To connect an NFS persistent volume using a static PVC:

1. [Create file storage](../../../iaas/fs/create-fs/).

   When creating it, specify:

   - **Name of file storage:** any name, such as `storage-milkshake`.
   - **Storage size:** `10 GB'.
   - **Protocol:** `NFS`.
   - **Network:** network and subnet where the Kubernetes cluster is located. This information can be found on the cluster page.
   - **File storage network:** existing network. If a suitable network is not on the list, select `Create new network`.

1. [View information](../../../iaas/fs/manage-fs#view-information) about the created file storage.

   Save the value of the **Connection point** parameter.

1. Examine the specifics of the connection:

   1. The storage sizes specified in the `spec.capacity.storage` and `spec.resources.requests.storage` parameters for the PersistentVolumeClaim resource must match the size of the created file storage. In this example it's 10 GB.
   1. For the PersistentVolumeClaim resource, use an empty value in the `storageClassName` storage class parameter.
   1. For the PersistentVolume resource:

      1. The storage access mode is specified in the `spec.accessModes` parameter for the PersistentVolume resource.
      1. The `spec.mountOptions` parameter set must contain an `nfsvers` entry with version `4.0`.

   1. Instead of an initialization container to write a web page to a persistent volume, a single-run Kubernetes task (job) is used. This approach works because in this case all pods will have access to the same persistent volume.

   1. ReclaimPolicy `Retain` is used for the persistent volume because the `Recycle` policy will not allow instant removal of the volume when it becomes unnecessary. Clearing a volume of data takes a long time. The `Delete` policy is not used so that you can monitor the state of the storage manually and not accidentally delete it.

1. Create a manifest for the `milkshake` application.

   For the PersistentVolume resource, specify:

   - IP address from the **Connection point** of the file storage as the value of the `spec.nfs.server` parameter.
   - Data after the IP address (`/shares/...`) as a value of the `spec.nfs.path` parameter.

   <details>
   <summary markdown="span">milkshake.yaml</summary>

   ```yaml
   apiVersion: v1
   kind: PersistentVolume
   metadata:
     name: milkshake-pv
   spec:
     accessModes:
       - ReadWriteMany
     mountOptions:
       - hard
       - nfsvers=4.0
       - timeo=60
       - retrans=10
     capacity:
       storage: 10Gi
     nfs:
       server: <share IP address>
       path: "<share path starting with /share/...>"
     persistentVolumeReclaimPolicy: "Retain"

   ---
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: milkshake-pvc
   spec:
     volumeMode: Filesystem
     accessModes:
       - ReadWriteMany
     resources:
       requests:
         storage: 10Gi
     volumeName: "milkshake-pv"
     storageClassName: ""

   ---
   apiVersion: batch/v1
   kind: Job
   metadata:
     name: write-html-for-nginx-on-nfs-volume
   spec:
     template:
       spec:
         restartPolicy: Never
         volumes:
           - name: milkshake-volume
             persistentVolumeClaim:
               claimName: milkshake-pvc
         containers:
           - name: write-html-for-nginx
             image: busybox
             volumeMounts:
               - name: milkshake-volume
                 mountPath: /usr/share/nginx/html
             command: ["/bin/sh", "-c"]
             args:
               [
                 'echo "The milkshake StatefulSet pod says Hello World to everyone! This file is located on the dynamically claimed NFS ReadWriteMany persistent volume." > /usr/share/nginx/html/index.html',
               ]

   ---
   apiVersion: apps/v1
   kind: StatefulSet
   metadata:
     name: milkshake
   spec:
     serviceName: milkshake
     replicas: 2
     selector:
       matchLabels:
         app: milkshake
     template:
       metadata:
         labels:
           app: milkshake
       spec:
         volumes:
           - name: milkshake-volume
             persistentVolumeClaim:
               claimName: milkshake-pvc
         containers:
           - name: milkshake
             image: nginxdemos/nginx-hello
             volumeMounts:
               - name: milkshake-volume
                 mountPath: /usr/share/nginx/html
             ports:
               - containerPort: 8080

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: milkshake-svc
     labels:
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: milkshake

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: milkshake-0-svc
     labels:
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       statefulset.kubernetes.io/pod-name: milkshake-0

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: milkshake-1-svc
     labels:
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       statefulset.kubernetes.io/pod-name: milkshake-1
   ```

   </details>

1. Apply this manifest to the cluster to create all necessary resources:

   ```bash
   kubectl apply -f ./milkshake.yaml
   ```

</tabpanel>
</tabs>

## 3. Check the functionality of demo applications and persistent volumes

1. Create a manifest for the Ingress resource through which application requests will go.

   <details>
   <summary markdown="span">cafe-ingress.yaml</summary>

   ```yaml
   ---
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: cafe-ingress
   spec:
     ingressClassName: nginx
     rules:
     - host: cafe.example.com
       http:
         paths:
         - path: /tea
           pathType: Prefix
           backend:
             service:
               name: tea-svc
               port:
                 number: 80
         - path: /coffee
           pathType: Prefix
           backend:
             service:
               name: coffee-svc
               port:
                 number: 80
         - path: /juice
           pathType: Prefix
           backend:
             service:
               name: juice-svc
               port:
                 number: 80
         - path: /juice/0
           pathType: Prefix
           backend:
             service:
               name: juice-0-svc
               port:
                 number: 80
         - path: /juice/1
           pathType: Prefix
           backend:
             service:
               name: juice-1-svc
               port:
                 number: 80
         - path: /milkshake
           pathType: Prefix
           backend:
             service:
               name: milkshake-svc
               port:
                 number: 80
         - path: /milkshake/0
           pathType: Prefix
           backend:
             service:
               name: milkshake-0-svc
               port:
                 number: 80
         - path: /milkshake/1
           pathType: Prefix
           backend:
             service:
               name: milkshake-1-svc
               port:
                 number: 80
   ```

   </details>

1. Apply this manifest to the cluster to create all necessary resources:

   ```bash
   kubectl apply -f ./cafe-ingress.yaml
   ```

1. [Define](../../operations/addons/advanced-installation/install-advanced-ingress#-getting-the-ip-address-of-the-load-balancer) the public IP address of the Ingress controller.

1. Check the availability of the applications with `curl` using the IP address of the Ingress controller.

   <info>

   If some of the applications have not been deployed, the message `Service Unavailable` will be displayed for them.

   </info>

   <tabs>
   <tablist>
   <tab>Tea</tab>
   <tab>Coffee</tab>
   <tab>Juice</tab>
   <tab>Milkshake</tab>
   </tablist>
   <tabpanel>

   Run the command:

   ```bash
   curl --resolve cafe.example.com:80:<Ingress IP address> http://cafe.example.com/tea
   ```

   A response should be displayed:

   ```text
   The tea pod says Hello World to everyone! This file is located on the statically claimed persistent volume.
   ```

   </tabpanel>
   <tabpanel>

   Run the command:

   ```bash
   curl --resolve cafe.example.com:80:<Ingress IP address> http://cafe.example.com/coffee
   ```

   A response should be displayed:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the statically claimed persistent volume.
   ```

   </tabpanel>
   <tabpanel>

   Run the commands:

   ```bash
   curl --resolve cafe.example.com:80:<Ingress IP address> http://cafe.example.com/juice
   curl --resolve cafe.example.com:80:<Ingress IP address> http://cafe.example.com/juice/0
   curl --resolve cafe.example.com:80:<Ingress IP address> http://cafe.example.com/juice/1
   ```

   The same response should be output for the application and each of its replicas:

   ```text
   The juice StatefulSet pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

   </tabpanel>
   <tabpanel>

   Run the commands:

   ```bash
   curl --resolve cafe.example.com:80:<Ingress IP address> http://cafe.example.com/milkshake
   curl --resolve cafe.example.com:80:<Ingress IP address> http://cafe.example.com/milkshake/0
   curl --resolve cafe.example.com:80:<Ingress IP address> http://cafe.example.com/milkshake/1
   ```

   The same response should be output for the application and each of its replicas:

   ```text
   The milkshake StatefulSet pod says Hello World to everyone! This file is located on the dynamically claimed NFS ReadWriteMany persistent volume.
   ```

   </tabpanel>
   </tabs>

## Control the usage of resources

1. If the Kubernetes resources you created are no longer needed, delete them.

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl delete -f ./cafe-ingress.yaml
   kubectl delete -f ./milkshake.yaml
   kubectl delete -f ./juice.yaml
   kubectl delete -f ./coffee.yaml
   kubectl delete -f ./tea.yaml

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl delete -f ./cafe-ingress.yaml; `
   kubectl delete -f ./milkshake.yaml; `
   kubectl delete -f ./juice.yaml; `
   kubectl delete -f ./coffee.yaml; `
   kubectl delete -f ./tea.yaml
   ```

   </tabpanel>
   </tabs>

1. Remove unused storage:

   1. If the disk used by the `tea` application is no longer needed — delete it.

   1. If the NFS repository used by the `milkshake` application is no longer needed — delete it.

   All other Cinder stores created with dynamic PVCs will be deleted automatically.

1. A running cluster consumes computing resources. If you no longer need it:

   - [stop](../../operations/manage-cluster#start-or-stop-the-cluster) it to use it later;
   - [delete](../../operations/manage-cluster#delete-cluster) it permanently.
