# {heading(LL NVMe дискілерін worker-түйіндерге қосу)[id=k8s-llnvme-disks]}

{include(/kz/_includes/_translated_by_ai.md)}

{linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=LL NVMe]} (Low Latency NVMe) — [техникалық қолдау](/kz/contacts) арқылы сұрау бойынша жоғары өнімді конфигурацияларда VK Cloud платформасында қолжетімді {linkto(../../../../computing/iaas/concepts/data-storage/volume-sla#iaas-volume-sla-llnvme)[text=жылдам жауап беретін жергілікті дискілер]}. VK Cloud платформасындағы барлық дискілердің ішінде олардың кідірісі ең аз: кепілдендірілген жауап беру уақыты 0,5 мс-тан аспайды. VK Cloud платформасындағы басқа дискілерден айырмашылығы, LL NVMe дискісі жергілікті болып табылады, яғни ол өзі қосылған ВМ орналасқан гипервизордың өзінде орналасады.

## {heading(Дайындық қадамдары)[id=k8s-llnvme-disks-prepare]}

1. Worker-түйіндерге LL NVMe дискісін қосуға арналған конфигурацияға қол жеткізу үшін [техникалық қолдауға](/kz/contacts) хабарласыңыз. Бұл конфигурация мыналарды қамтиды:

   - диск түрі: `ef-nvme`;
   - осы диск түріне негізделген түйіндер тобына арналған {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-concepts-vm-flavor)[text=ВМ конфигурация қалыптауы]}.

    Келесі қадамдарға өтпес бұрын осы конфигурацияға қолжеткізуді күтіңіз.

{include(/kz/_includes/_create-test-cluster.md)}

1. VK Cloud жеке кабинетінде LL NVMe үшін конфигурацияға негізделген ВМ-мен түйіндер тобын {linkto(../../instructions/manage-node-group#k8s-manage-node-group-add-group)[text=қосыңыз]}:

   - **Виртуалды машиналар санаты**: `ВМ с локальными дисками`.
   - **Node-түйіндерінің түрі**: Low Latency NVMe дискісіне арналған ВМ конфигурация қалыбы (`NVME` осындай қалып атауында болады).
   - Қалған баптауларды өзгертпей қалдырыңыз.

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=`kubectl` орнатып, баптаңыз]}, егер бұл әлі жасалмаса.
1. {linkto(../../connect/kubectl#k8s-kubectl-connect)[text=Кластерге]} `kubectl` көмегімен қосылыңыз.

## {heading(1. LL NVMe дискілері үшін сақтау класын (StorageClass) қосыңыз)[id=k8s-llnvme-disks-nvme-storageclass]}

1. `StorageClass` үшін, мысалы, `csi-ef-nvme.yaml` манифест файлын жасаңыз және оған келесі мазмұнды қосыңыз:

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
   Мұнда:
   - `type: ef-nvme` LL NVMe диск түрін сипаттайды. 
   - `volumeBindingMode: WaitForFirstConsumer` [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#introduction) пайдаланатын под жасалғанға дейін {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=тұрақты томды]} (persistent volume) құру мен байланыстыруды кейінге қалдыруға мүмкіндік береді. Бұл Kubernetes дискіні под түйінге жоспарланғаннан кейін жасауы үшін қажет.

      Томдарды байланыстыру баптаулары туралы толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/storage/storage-classes/#volume-binding-mode). 
   - `localToNode: "true"` дискілердің өздері байланыстырылатын ВМ-мен бір гипервизорларда орналасуын қамтамасыз етеді.

1. Кластерде жасалған манифесті қолданыңыз:

   ```console
   kubectl apply -f csi-ef-nvme.yaml
   ```

## {heading(2. Қолданба жасаңыз)[id=k8s-llnvme-disks-nvme-app]}

LL NVMe дискілерін worker-түйіндерге қосу процесін зерттеу үшін `coffee` тестілік қолданбасын іске қосыңыз.

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Подтың LL NVMe дискілері бар түйіндерге орналасуын қамтамасыз ету үшін бұрын жасалған түйіндер тобына `disktype: ef-nvme` меткасын {linkto(../../instructions/manage-node-group#k8s-manage-node-group-labels-taints)[text=қосыңыз]}:

   - **Key**: `disktype`.
   - **Value**: `ef-nvme`.
   - Қалған баптауларды өзгертпей қалдырыңыз.

   {note:warn}
   Подты кейін басқа түйінге көшіру дискінің миграциясына және өнімділіктің уақытша төмендеуіне әкелуі мүмкін. Жұмыс жүктемелерін баптаған кезде тұрақты өнімділікті сақтау үшін LL NVMe дискілері бар подтарды түйіндер арасында көшіруден аулақ болуға тырысыңыз.
   {/note}

1. Манифест файлын жасаңыз:

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
                 'echo "The coffee pod says Hello World to everyone! This file is located on NVMe volume." > /usr/share/nginx/html/index.html',
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

1. Манифест негізінде қажетті Kubernetes ресурстарын жасаңыз:

   ```console
   kubectl apply -f coffee.yaml
   ```

   Қолданбаның жұмысына қажетті барлық Kubernetes ресурстары `example-app` жеке namespace кеңістігіне орналастырылады.

1. Жасалған диск `StorageClass` манифесті негізінде тұрақты томмен байланыстырылғанына көз жеткізіңіз:

   1. Қолданба үшін жасалған тұрақты томды табыңыз:

      ```console
      kubectl get pv -n example-app
      ```

   1. Шығарылған кестеде `CLAIM` бағанында `example-app/coffee-pvc`, ал `STORAGECLASS` бағанында `csi-ef-nvme` көрсетілген тұрақты том идентификаторын табыңыз:

      ```text
      NAME                                       ...   STATUS   CLAIM                    STORAGECLASS   ...
      ...                                        ...   ...      ...                      ...            ...
      <тұрақты том идентификаторы>               ...   Bound    example-app/coffee-pvc   csi-ef-nvme    ...
      ```

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=k8s-llnvme-disks-delete]}

Жұмыс істеп тұрған кластер тарификацияланады және есептеу ресурстарын тұтынады. Егер LL NVMe дискілерінің жұмысын тексеру үшін жасалған Kubernetes ресурстары сізге енді қажет болмаса, оларды жойыңыз:

1. Жасалған `example-app` namespace кеңістігін және онымен байланысты ресурстарды жойыңыз:

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

1. {linkto(../../concepts/storage#k8s-storage-reclaim-policies)[text=Жасаған]} тұрақты томды жойыңыз.

{ifdef(public)}
{include(/kz/_includes/_delete-test-cluster-short.md)}
{/ifdef}
