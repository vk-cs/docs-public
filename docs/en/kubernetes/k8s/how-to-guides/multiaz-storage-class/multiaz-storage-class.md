Use multi-zone [storage classes](/en/kubernetes/k8s/concepts/storage#pre_configured_storage_classes) so that Kubernetes, when scheduling a pod, could [dynamically provide](/en/kubernetes/k8s/reference/pvs-and-pvcs#dynamic-provisioning) a [persistent volume (PV)](/en/kubernetes/k8s/reference/pvs-and-pvcs) located in the same availability zone as the pod. In Kubernetes, this scheduling is controlled by the [Topology Spread Constraints](https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/) policy. This policy helps to increase fault tolerance and ensure high availability of the cluster by distributing the [workload](https://kubernetes.io/docs/concepts/workloads/) between different availability zones.

{note:info}
Multi-zone storage classes are only pre-configured for [second-generation](/en/kubernetes/k8s/concepts/cluster-generations) clusters.
{/note}

## {heading(Preparatory steps)[id=k8s-multiaz-storage-class-prepare]}

1. [Create](/en/kubernetes/k8s/instructions/create-cluster/create-webui-gen-2) a Kubernetes cluster of the latest version, if not done so already.
1. [Install and configure](../../connect/kubectl) `kubectl`, if not done so already.
1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.

## {heading(1. Add a multi-zone StorageClass for PV)[id=maz-storageclass]}

1. Create a manifest file for `StorageClass`, for example `csi-ceph-hdd.yaml`, and add the following content to the file:

   ```yaml
   apiVersion: storage.k8s.io/v1
   kind: StorageClass
   metadata:
     name: csi-ceph-hdd
   parameters:
     type: ceph-hdd
   provisioner: cinder.csi.openstack.org
   reclaimPolicy: Delete
   volumeBindingMode: WaitForFirstConsumer
   allowVolumeExpansion: true
   ```
   Here: 

   - `type: ceph-hdd` specifies the [disk type](/en/kubernetes/k8s/concepts/storage#pre_configured_storage_classes) for the PV. 
   - `volumeBindingMode: WaitForFirstConsumer` delays creating and binding the PV until the first pod that uses the respective PVC is created. This way, this pod will be scheduled for the node first, and then Kubernetes will create a PV in the same availability zone as the node. This helps to avoid situations when the pod and the PV end up in different availability zones.

     If you try to move this pod to another availability zone after its first run, you will receive an error containing similar text:

      ```console
      3 node(s) had volume node affinity conflict
       ```

      For more details on volume binding modes, refer to the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/storage/storage-classes/#volume-binding-mode).

1. Apply the manifest you created in the cluster:

   ```console
   kubectl apply -f csi-ceph-hdd.yaml
   ```

## {heading(2. Create an application)[id=k8s-multiaz-storage-class-app]}

1. Create a manifest for the workload controller of the `StatefulSet` type for the `test-statefulset` namespace:

   {cut(test-statefulset.yaml)}
   ```yaml
   apiVersion: v1
   kind: Namespace
   metadata:
     name: test-statefulset
   ---
   apiVersion: apps/v1
   kind: StatefulSet
   metadata:
     name: zone-spread
     namespace: test-statefulset
   spec:
     replicas: 3
     serviceName: zone-spread-svc
     selector:
       matchLabels:
         app: zone-spread
     template:
       metadata:
         labels:
           app: zone-spread
       spec:
         topologySpreadConstraints:
           - maxSkew: 1
             topologyKey: topology.kubernetes.io/zone
             whenUnsatisfiable: DoNotSchedule
             labelSelector:
               matchLabels:
                 app: zone-spread
         containers:
           - name: busybox
             image: busybox
             command: ["/bin/sh", "-c"]
             args: ["sleep 3600"]
             volumeMounts:
               - name: data
                 mountPath: /data
     volumeClaimTemplates:
       - metadata:
           name: data
         spec:
           accessModes:
             - ReadWriteOnce
           resources:
             requests:
               storage: 1Gi
           storageClassName: csi-ceph-hdd
   ```
   {/cut}

   Here:

   - `replicas: 3` specifies the number of pod replicas.
   - `maxSkew: 1` provides the maximum allowable difference in the number of pods among nodes. In this example, it must not exceed 1.

1. Create the required Kubernetes resources based on the manifest:

   ```console
   kubectl apply -f test-statefulset.yaml
   ```

1. View the information about the created pods using the command:

   ```console
   kubectl get pods -n test-statefulset -o wide
   ```

   Output example:

   ```console
   NAME            READY   STATUS    RESTARTS   AGE     IP               NODE                            NOMINATED NODE   READINESS GATES
   zone-spread-0   1/1     Running   0          2m42s   10.100.173.129   test-multiaz-node-group-ud1-0   <none>           <none>
   zone-spread-1   1/1     Running   0          2m30s   10.100.100.128   test-multiaz-node-group-ud2-2   <none>           <none>
   zone-spread-2   1/1     Running   0          2m18s   10.100.204.193   test-multiaz-node-group-ud1-1   <none>           <none>
   ```

   This means that three pods are created in two availability zones: 

   - `zone-spread-0` on the `test-multiaz-node-group-ud1-0` node in the `UD1` zone.
   - `zone-spread-1` on the `test-multiaz-node-group-ud2-2` node in the `UD2` zone.
   - `zone-spread-2` on the `test-multiaz-node-group-ud1-1` node in the `UD1` zone.

1. Make sure that PVs are created for each pod in its availability zone, as controlled by the manifest for the storage class:

   1. Get the PVs that were created for the pods:

      ```console
      kubectl get pv -o wide
      ```

   1. In the output table, find the values of the `NODE` column for each of the created PVCs based on the created `csi-ceph-hdd` storage class. Output example:

      ```text
      NAME                                       ...   STATUS    STORAGECLASS   ...   NODE
      ...                                        ...   ...       ...                      
      pvc-58fd0c60-e825-42a9-a187-b9f092bb077d         Bound     csi-ceph-hdd   ...   test-multiaz-node-group-ud1-0
      pvc-eb0ee40d-6580-4902-a832-ea192e32f910   ...   Bound     csi-ceph-hdd   ...   test-multiaz-node-group-ud2-2
      pvc-f32f486e-75e9-4ba5-b553-ffbbad180b91   ...   Bound     csi-ceph-hdd   ...   test-multiaz-node-group-ud1-1
      ```

## {heading(Delete unused resources)[id=k8s-multiaz-storage-class-delete-resources]}

A running cluster consumes computing resources and is charged accordingly. If you no longer need the Kubernetes resources you created to test multi-zone storage classes, delete them:

1. Delete the created `test-statefulset` namespace and the resources associated with it:

   {tabs}
   {tab(Linux/macOS)}
   ```console
   kubectl delete ns test-statefulset
   ```
   {/tab}

   {tab(Windows)}
   ```console
   kubectl delete ns test-statefulset; `
   ```
   {/tab}
   {/tabs}

1. [Delete](/en/kubernetes/k8s/concepts/storage#available_reclaim_policies_for_persistent_volumes) the created PVs.

1. [Delete](/en/kubernetes/k8s/instructions/manage-cluster#delete_cluster) the cluster you created.
