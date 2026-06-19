# {heading(Көпаймақты сақтау кластарын пайдалану)[id=k8s-multiaz-storage-class]}

{include(/kz/_includes/_translated_by_ai.md)}

Kubernetes подты жоспарлау кезінде оған сол подтың өзімен бірдей қолжетімділік аймағында орналасқан {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=тұрақты томды (PV)]} {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs-prepare)[text=динамикалық түрде дайындауы]} үшін алдын ала бапталған көпаймақты {linkto(../../concepts/storage#k8s-storage-storage-classes)[text=сақтау кластарын]} пайдаланыңыз. Kubernetes-та подты мұндай жоспарлау үшін [Topology Spread Constraints](https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/) механизмі жауап береді. Ол жұмыс жүктемесін ([workload](https://kubernetes.io/docs/concepts/workloads/)) әртүрлі {linkto(../../../../start/concepts/architecture#architecture-az)[text=қолжетімділік аймақтары]} арасында бөлу есебінен кластердің істен шығуға төзімділігін арттыруға және жоғары қолжетімділігін (high availability) қамтамасыз етуге көмектеседі.

{note:info}
Көпаймақты сақтау кластары тек {linkto(../../concepts/cluster-generations#k8s-cluster-generations)[text=екінші буын]} кластерлері үшін алдын ала бапталған.
{/note}

## {heading(Дайындық қадамдары)[id=k8s-multiaz-storage-class-prepare]}

1. Егер әлі жасалмаған болса, {linkto(../../instructions/create-cluster/create-webui-gen-2#k8s-create-webui-gen-2)[text=актуалды нұсқадағы]} кластерді {linkto(../../instructions/create-cluster/create-webui-gen-2#k8s-create-webui-gen-2)[text=жасаңыз]}.
1. Егер әлі жасалмаған болса, `kubectl` құралын {linkto(../../connect/kubectl#k8s-kubectl)[text=орнатып, баптаңыз]}.
1. `kubectl` көмегімен кластерге {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=қосылыңыз]}.

## {heading(1. PV үшін көпаймақты сақтау класын (StorageClass) қосыңыз)[id=maz-storageclass]}

1. `StorageClass` үшін манифест файлын, мысалы `csi-ceph-hdd.yaml`, жасаңыз да, оған келесі мазмұнды қосыңыз:

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
   Мұнда:
   - `type: ceph-hdd` PV үшін {linkto(../../concepts/storage#k8s-storage-storage-classes)[text=диск түрін]} сипаттайды.
   - `volumeBindingMode: WaitForFirstConsumer` тиісті PVC пайдаланатын алғашқы под жасалғанға дейін PV жасауды және оған байланыстыруды кейінге қалдырады. Осылайша, бұл под алдымен түйінге жоспарланады, содан кейін ғана Kubernetes ол үшін түйінмен бірдей қолжетімділік аймағындағы PV жасайды. Бұл под пен PV әртүрлі қолжетімділік аймақтарында болып қалатын жағдайды болдырмауға мүмкіндік береді.

      Егер бірінші іске қосудан кейін осы подты басқа қолжетімділік аймағына көшіруге әрекеттенсеңіз, ұқсас мәтіні бар қатені аласыз:

      ```console
      3 node(s) had volume node affinity conflict
       ```

      Томдарды байланыстыру баптаулары туралы толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/storage/storage-classes/#volume-binding-mode).

1. Кластерде жасалған манифесті қолданыңыз:

   ```console
   kubectl apply -f csi-ceph-hdd.yaml
   ```

## {heading(2. Қолданбаны жасаңыз)[id=k8s-multiaz-storage-class-app]}

1. `test-statefulset` аттар кеңістігі үшін `StatefulSet` түріндегі жұмыс жүктемесі контроллері манифестінің файлын жасаңыз:

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

   Мұнда:

   - `replicas: 3` — под репликаларының саны.
   - `maxSkew: 1` — түйіндер арасындағы подтар санының ең көп рұқсат етілген айырмашылығы. Бұл мысалда ол 1-ден аспауы керек.

1. Манифест негізінде Kubernetes ресурсын жасаңыз:

   ```console
   kubectl apply -f test-statefulset.yaml
   ```

1. Жасалған подтар туралы ақпаратты келесі команда арқылы қараңыз:

   ```console
   kubectl get pods -n test-statefulset -o wide
   ```

   Шығыс мысалы:

   ```console
   NAME            READY   STATUS    RESTARTS   AGE     IP               NODE                            NOMINATED NODE   READINESS GATES
   zone-spread-0   1/1     Running   0          2m42s   10.100.173.129   test-multiaz-node-group-ud1-0   <none>           <none>
   zone-spread-1   1/1     Running   0          2m30s   10.100.100.128   test-multiaz-node-group-ud2-2   <none>           <none>
   zone-spread-2   1/1     Running   0          2m18s   10.100.204.193   test-multiaz-node-group-ud1-1   <none>           <none>
   ```

   Бұл 2 қолжетімділік аймағында 3 под жасалғанын білдіреді:

   - `zone-spread-0` — `UD1` аймағындағы `test-multiaz-node-group-ud1-0` түйінінде;
   - `zone-spread-1` — `UD2` аймағындағы `test-multiaz-node-group-ud2-2` түйінінде;
   - `zone-spread-2` — `UD1` аймағындағы `test-multiaz-node-group-ud1-1` түйінінде.

1. `StorageClass` үшін манифест негізінде әр под үшін оның қолжетімділік аймағында PV жасалғанына көз жеткізіңіз:

   1. Подтар үшін жасалған PV-лерді табыңыз:

      ```console
      kubectl get pv -o wide
      ```

   1. Шығарылған кестеде жасалған `csi-ceph-hdd` сақтау класы негізіндегі әрбір PVC үшін `NODE` бағанының мәндерін табыңыз. Шығыс мысалы:

      ```text
      NAME                                       ...   STATUS    STORAGECLASS   ...   NODE
      ...                                        ...   ...       ...                      
      pvc-58fd0c60-e825-42a9-a187-b9f092bb077d         Bound     csi-ceph-hdd   ...   test-multiaz-node-group-ud1-0
      pvc-eb0ee40d-6580-4902-a832-ea192e32f910   ...   Bound     csi-ceph-hdd   ...   test-multiaz-node-group-ud2-2
      pvc-f32f486e-75e9-4ba5-b553-ffbbad180b91   ...   Bound     csi-ceph-hdd   ...   test-multiaz-node-group-ud1-1
      ```

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=k8s-multiaz-storage-class-delete-resources]}

Жұмыс істеп тұрған кластер тарификацияланады және есептеу ресурстарын тұтынады. Егер көпаймақты сақтау кластарының жұмысын тексеру үшін жасалған Kubernetes ресурстары енді қажет болмаса, оларды жойыңыз:

1. Жасалған `test-statefulset` аттар кеңістігін және онымен байланысты ресурстарды жойыңыз:

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

1. Жасалған PV-лерді {linkto(../../concepts/storage#k8s-storage-reclaim-policies)[text=жойыңыз]}.

ifdef(public)}
{include(/kz/_includes/_delete-test-cluster-short.md)}
{/ifdef}
