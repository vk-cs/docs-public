Используйте преднастроенные мультизональные [классы хранения](/ru/kubernetes/k8s/concepts/storage#storage_classes), чтобы Kubernetes при планировании пода динамически подготавливал для него [постоянный том (PV)](/ru/kubernetes/k8s/reference/pvs-and-pvcs), расположенный в той же зоне доступности, что и сам под. В Kubernetes за такое планирование пода отвечает механизм [Topology Spread Constraints](https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/). Он помогает повысить отказоустойчивость и обеспечить высокую доступность (high availability) кластера за счет распределения рабочей нагрузки ([workload](https://kubernetes.io/docs/concepts/workloads/)) между разными [зонами доступности](/ru/start/concepts/architecture#az).

{note:info}
Мультизональные классы хранения преднастроены только для кластеров [второго поколения](/ru/kubernetes/k8s/concepts/cluster-generations).
{/note}

## Подготовительные шаги

1. [Создайте](/ru/kubernetes/k8s/instructions/create-cluster/create-webui-gen-2) кластер Kubernetes актуальной версии, если это еще не сделано.
1. [Установите и настройте](../../connect/kubectl) `kubectl`, если это еще не сделано.
1. [Подключитесь](../../connect/kubectl#check_connection) к кластеру при помощи `kubectl`.

## 1. Добавьте мультизональный класс хранения (StorageClass) для PV

1. Создайте файл манифеста для `StorageClass`, например `csi-ceph-hdd.yaml`, и добавьте в него следующее содержимое:

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
   Здесь: 
   - `type: ceph-hdd` описывает [тип диска](/ru/kubernetes/k8s/concepts/storage#storage_classes) для PV. 
   - `volumeBindingMode: WaitForFirstConsumer` откладывает создание и привязку PV до момента, когда будет создан первый под, использующий соответствующий PVC. Так этот под будет сначала запланирован на узел, и только после этого Kubernetes создаст для него PV той же зоне доступности, что и узел. Это позволит избежать ситуации, при которой под и PV окажутся в разных зонах доступности.

      Если после первого запуска вы попытаетесь перенести этот под в другую зону доступности, вы получите ошибку, содержащую похожий текст:

      ```console
      3 node(s) had volume node affinity conflict
       ```

      Подробнее о настройках привязки томов в [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/storage/storage-classes/#volume-binding-mode).

1. Примените созданный манифест в кластере:

   ```console
   kubectl apply -f csi-ceph-hdd.yaml
   ```

## 2. Создайте приложение

1. Создайте файл манифеста для контроллера рабочей нагрузки типа `StatefulSet` для пространства имен `test-statefulset`:

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

   Здесь:

   - `replicas: 3` — количество реплик подов.
   - `maxSkew: 1` — максимально допустимое различие в количестве подов между узлами. В этом примере оно не должно превышать 1.

1. Создайте ресурс Kubernetes на основе манифеста:

   ```console
   kubectl apply -f test-statefulset.yaml
   ```

1. Просмотрите информацию о созданных подах с помощью команды:

   ```console
   kubectl get pods -n test-statefulset -o wide
   ```

   Пример вывода:

   ```console
   NAME            READY   STATUS    RESTARTS   AGE     IP               NODE                            NOMINATED NODE   READINESS GATES
   zone-spread-0   1/1     Running   0          2m42s   10.100.173.129   test-multiaz-node-group-ud1-0   <none>           <none>
   zone-spread-1   1/1     Running   0          2m30s   10.100.100.128   test-multiaz-node-group-ud2-2   <none>           <none>
   zone-spread-2   1/1     Running   0          2m18s   10.100.204.193   test-multiaz-node-group-ud1-1   <none>           <none>
   ```

   Это означает, что созданы 3 пода в 2 зонах доступности: 

   - `zone-spread-0` на узле `test-multiaz-node-group-ud1-0` в зоне `UD1`;
   - `zone-spread-1` на узле `test-multiaz-node-group-ud2-2` в зоне `UD2`;
   - `zone-spread-2` на узле `test-multiaz-node-group-ud1-1` в зоне `UD1`.

1. Убедитесь, что на основе манифеста для `StorageClass` созданы PV для каждого пода в его зоне доступности: 

   1. Найдите PV, созданные для подов:

      ```console
      kubectl get pv -o wide
      ```

   1. В выведенной таблице найдите значения столбца `NODE` для каждого из созданных PVC на основе созданного класса хранения `csi-ceph-hdd`. Пример вывода: 

      ```text
      NAME                                       ...   STATUS    STORAGECLASS   ...   NODE
      ...                                        ...   ...       ...                      
      pvc-58fd0c60-e825-42a9-a187-b9f092bb077d         Bound     csi-ceph-hdd   ...   test-multiaz-node-group-ud1-0
      pvc-eb0ee40d-6580-4902-a832-ea192e32f910   ...   Bound     csi-ceph-hdd   ...   test-multiaz-node-group-ud2-2
      pvc-f32f486e-75e9-4ba5-b553-ffbbad180b91   ...   Bound     csi-ceph-hdd   ...   test-multiaz-node-group-ud1-1
      ```

## Удалите неиспользуемые ресурсы

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если ресурсы Kubernetes, созданные для проверки работы мультизональных классов хранения, вам больше не нужны, удалите их:

1. Удалите созданное пространство имен `test-statefulset` и связанные с ним ресурсы:

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

1. [Удалите](/ru/kubernetes/k8s/concepts/storage#reclaim_policies) созданные PV.

1. [Удалите](ru/kubernetes/k8s/instructions/manage-cluster#delete_cluster) созданный кластер.