{includetag(warn)}

{note:warn}
Деректердің жоғалуын болдырмау үшін тасымалдауды тоқтатылған жұмыс жүктемесінде жүргізіңіз. Қажет болса, жүктемені тасымалдау қадамдарына сәйкес кезең-кезеңімен тоқтатып, іске қосып отырыңыз.
{/note}

{/includetag}

{includetag(prep)}

1. {linkto(../../../connect/kubectl)[text=kubectl орнатып, баптаңыз]}, егер бұл әлі жасалмаса.
1. `kubectl` көмегімен кластерге {linkto(../../../connect/kubectl)[text=қосылыңыз]}.
1. (Опционалды түрде) PVC атауын өзгерту үшін [rename-pvc](https://github.com/stackitcloud/rename-pvc) утилитасын орнатыңыз.

{/includetag}

{includetag(check)}

- под [жоспарлау ережелерінде](https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/):
   - `nodeAffinity`, `topologySpreadConstraints` немесе `nodeSelector` параметрлерінде;
     {/includetag}
     {includetag(check-k8s)}
   - {linkto({@root}/kubernetes/k8s/reference/labels-and-taints#k8s-labels-and-taints)[text=белгілерде]} `topology.kubernetes.io/zone`, `failure-domain.beta.kubernetes.io/zone` және `topology.cinder.csi.openstack.org/zone`.
  
- [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) подтары үшін {linkto({@root}/kubernetes/k8s/concepts/storage#k8s-storage-storage-classes)[text=сақтау класында]} (`StorageClass`).
     {/includetag}
     {includetag(check-mk8s)}
   - {linkto({@root}/kubernetes/mk8s/reference/labels-and-taints#mk8s-labels-and-taints)[text=белгілерде]} `topology.kubernetes.io/zone`, `failure-domain.beta.kubernetes.io/zone` және `topology.cinder.csi.openstack.org/zone`.

- [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) подтары үшін {linkto({@root}/kubernetes/mk8s/concepts/storage#mk8s-storage-storage-classes)[text=сақтау класында]} (`StorageClass`).
  {/includetag}
  {includetag(check)}
Егер қолжетімділік аймағы көрсетілмесе, басқа қолжетімділік аймағына тасымалдау сіздің жұмыс жүктемеңізге ешқандай әсер етпейді және сізден тасымалдау бойынша қосымша әрекеттер талап етілмейді.

{/includetag}

{includetag(pvc-prep)}

Жүктемені тасымалдау кезінде PVC-дегі деректердің кездейсоқ жойылуын болдырмау үшін:

1. PV-дің {linkto(../../../concepts/storage)[text=босату саясатын]} (reclaim policy) `Retain` мәніне өзгертіңіз:

   ```console
   pv_name=$(kubectl get pvc <PVC_АТЫ> -n <PVC_АТАУЛАР_КЕҢІСТІГІ> -o jsonpath='{.spec.volumeName}') 
   kubectl patch pv "$pv_name" -n <PVC_АТАУЛАР_КЕҢІСТІГІ> -p '{"spec": {"persistentVolumeReclaimPolicy": "Retain"}}'
   ```

   Мұнда:

    - `<PVC_АТЫ>` — тасымалдағыңыз келетін PVC атауы.
    - `<PVC_АТАУЛАР_КЕҢІСТІГІ>` — PVC орналасқан атаулар кеңістігі.

1. PVC-мен байланысты дискіні {linkto(../../../../../computing/iaas/instructions/volumes/volumes-manage)[text=клондаңыз]}.

1. (Опционалды түрде) Қажет болған жағдайда қайта оралу мүмкіндігі болуы үшін, ескі PVC-ді `<PVC_АТЫ>-old` деп қайта атап, тасымалдау жұмыстары аяқталғанша сақтап қалыңыз.

   Жаңа PVC жасағанда `<PVC_АТЫ>` атауын пайдаланыңыз — осылайша ол тасымалданған түпнұсқаның атауын алады.

   PVC атауын қолмен немесе `rename-pvc` утилитасының көмегімен өзгерте аласыз. `rename-pvc` үшін команда мысалы:

   ```console
   rename-pvc -n <PVC_АТАУЛАР_КЕҢІСТІГІ> <PVC_ЕСКІ_АТЫ> <PVC_ЖАҢА_АТЫ>
   ```

{/includetag}

{includetag(snap)}

{tab(Диск снимогі (жеке кабинет))}

1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетіне.
1. PVC-мен байланысты дискінің {linkto(../../../../../computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-create)[text=снимогін жасаңыз]}.
1. Осы снимок негізінде мына параметрлерді көрсетіп, {linkto(../../../../../computing/iaas/instructions/volumes/volumes-create#iaas-volumes-create)[text=жаңа диск жасаңыз]}:
    - **Көз**: алдыңғы қадамда жасалған диск снимогі;
    - **Қолжетімділік аймағы**: тасымалдау орындалатын қолжетімділік аймағы.
    - Қалған параметрлерді өз қалауыңыз бойынша көрсетіңіз.
1. Диск жасалғанша күтіп, оның ID-сын есте сақтаңыз.
1. Снимоктан жасалған дискінің ID-сына сілтейтін PV және осы негіздегі PVC {linkto(../../../instructions/manage-resources)[text=жасаңыз]}:

   {cut(PV манифесінің мысалы)}
   ```yaml
   apiVersion: v1
   kind: PersistentVolume
   metadata:
     name: <PV_АТЫ> 
   spec:
     accessModes:
     - ReadWriteOnce 
     capacity:
       storage: <ЖИНАҚТАУШЫ_КӨЛЕМІ>
     claimRef:
       kind: PersistentVolumeClaim
       namespace: <PVC_АТАУЛАР_КЕҢІСТІГІ>
       name: <PVC_АТЫ>
     csi:
       driver: cinder.csi.openstack.org
       volumeHandle: <ДИСК_ID>
     nodeAffinity:
       required:
         nodeSelectorTerms:
         - matchExpressions:
           - key: topology.cinder.csi.openstack.org/zone
             operator: In
             values:
             - <ДИСКТІҢ_ҚОЛЖЕТІМДІЛІК_АЙМАҒЫ>
     persistentVolumeReclaimPolicy: Retain
     storageClassName: <САҚТАУ_КЛАСЫНЫҢ_АТЫ>
     volumeMode: Filesystem
   ```

   Мұнда:

    - `<PV_АТЫ>` — осы негізде PVC жасалатын PV атауы.
    - `<ЖИНАҚТАУШЫ_КӨЛЕМІ>` — осы PV ұсынатын жинақтауыш көлемі. Ол диск көлемімен сәйкес келуі тиіс.
    - `<PVC_АТАУЛАР_КЕҢІСТІГІ>` — PVC орналасатын атаулар кеңістігі.
    - `<PVC_АТЫ>` — осы PV негізінде жасалатын PVC атауы.
    - `<ДИСК_ID>` — снимоктан жасалған дискінің ID-сы.
    - `<ДИСКТІҢ_ҚОЛЖЕТІМДІЛІК_АЙМАҒЫ>` — дискіні снимоктан жасаған кезде таңдаған қолжетімділік аймағы.
    - `persistentVolumeReclaimPolicy` — оның сақтау класында анықталған PV босату саясаты.
    - `<САҚТАУ_КЛАСЫНЫҢ_АТЫ>` — PV үшін сақтау класының (StorageClass) атауы.

   {/cut}

   {cut(PVC манифесінің мысалы)}

   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: <PVC_АТЫ> 
     namespace: <PVC_АТАУЛАР_КЕҢІСТІГІ>
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: <ЖИНАҚТАУШЫ_КӨЛЕМІ> 
     storageClassName: <САҚТАУ_КЛАСЫНЫҢ_АТЫ> 
   ```

   Параметр мәндері екі манифест үшін де бірдей болуы тиіс.

   {/cut}

1. Жасалған PV `Bound` күйіне өткенше күтіңіз.

{include(/kz/_includes/_az-migration-magnum-check.md)}

{/tab}

{tab(Диск снимогі (Cinder CSI плагині))}

1. PV снимоктарын жасау үшін `external-snapshotter` утилитасын [орнатыңыз](https://github.com/kubernetes-csi/external-snapshotter):

   ```console
   git clone https://github.com/kubernetes-csi/external-snapshotter.git
   cd external-snapshotter
   kubectl kustomize client/config/crd | kubectl create -f -
   kubectl -n kube-system kustomize deploy/kubernetes/snapshot-controller | kubectl create -f -
   ```
1. `kube-system` атаулар кеңістігіндегі барлық `snapshot-controller` подтарының `Ready` күйінде екеніне мына команда көмегімен көз жеткізіңіз:

   ```console
   kubectl get pods -n kube-system | grep snapshot-controller
   ```

1. `csi-snapshotter-role` үшін `patch` құқығы бар-жоғын тексеріңіз:

   ```console
   kubectl get clusterrole csi-snapshotter-role -o yaml
   ```

   Егер бар болса, олар `rules` бөлімінде көрсетіледі:

   ```console
   - apiGroups: ["snapshot.storage.k8s.io"]
   resources: ["volumesnapshotcontents"]
   verbs: ["get", "list", "watch", "patch"]
   ```

   Егер жоқ болса, оларды қосыңыз:

   {cut(Манифест мысалы)}
   ```yaml
   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRole
   metadata:
     name: csi-snapshotter-role
   spec: {}
   rules:
     ...
     - verbs:
         - create
         - get
         - list
         - watch
         - update
         - delete
         - patch 
       apiGroups:
         - snapshot.storage.k8s.io
       resources:
         - volumesnapshotcontents
      ...
   ```
   {/cut}

1. Диск снимогін жасаңыз:

    1. `VolumeSnapshotClass` ресурсын жасаңыз:

       {cut(Манифест мысалы)}

       ```yaml
       apiVersion: snapshot.storage.k8s.io/v1
       kind: VolumeSnapshotClass
       metadata:
          name: <СНИМОК_КЛАСЫНЫҢ_АТЫ>
       driver: cinder.csi.openstack.org
       deletionPolicy: Retain 
       parameters:
          force-create: "false"
       ```
       {/cut}

    1. `VolumeSnapshot` ресурсын жасаңыз:

       {cut(Манифест мысалы)}

       ```yaml
       apiVersion: snapshot.storage.k8s.io/v1
       kind: VolumeSnapshot
       metadata:
         name: <ДИСК_СНИМОГЫНЫҢ_АТЫ>
       spec:
         source:
           persistentVolumeClaimName: <PVC_АТЫ> 
         volumeSnapshotClassName: <СНИМОК_КЛАСЫНЫҢ_АТЫ>
       ```
       {/cut}

    1. Мына команданы орындап, дискінің дұрыс жасалғанына көз жеткізіңіз:

       ```console
       kubectl get volumesnapshot
       ``` 

       Команда шығысында диск үшін `readyToUse: true` параметрі көрсетілуі тиіс.

1. Диск снимогінен жаңа PVC жасаңыз:

   {cut(Манифест мысалы)}

   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: <PVC_АТЫ>
   spec:
     storageClassName: <САҚТАУ_КЛАСЫНЫҢ_АТЫ>>
     dataSource:
       name: <ДИСК_СНИМОГЫНЫҢ_АТЫ>
       kind: VolumeSnapshot
       apiGroup: snapshot.storage.k8s.io
     accessModes:
       - ReadWriteOnce 
     resources:
       requests:
         storage: 1Gi 
   ```

   Мұнда:

    - `<PVC_АТЫ>` — снимок негізінде жасалатын PVC атауы.
    - `<САҚТАУ_КЛАСЫНЫҢ_АТЫ>` — тасымалдау орындалатын қолжетімділік аймағындағы сақтау класының атауы.
    - `<ДИСК_СНИМОГЫНЫҢ_АТЫ>` — жасалған диск снимогінің атауы.

   {/cut}

{include(/kz/_includes/_az-migration-magnum-check.md)}

{/tab}

{/includetag}

{includetag(pv-migrate)}

{tab(pv-migrate)}

1. Екі қолжетімділік аймағында да сәйкес worker-түйіндер топтары бар-жоғын тексеріңіз немесе оларды {linkto(../../../instructions/manage-node-group)[text=қосыңыз]}. Бұл `pv-migrate` утилитасының подтарын іске қосу үшін қажет, себебі олардың біріне ескі аймақтан PVC, ал екіншісіне — жаңа аймақтан PVC байланыстырылады.
1. `pv-migrate` утилитасын [орнатыңыз](https://github.com/utkuozdemir/pv-migrate/blob/main/docs/install.md).
1. Жаңа қолжетімділік аймағында жүктеме тасымалданатын PVC жасаңыз:

   {cut(Манифест мысалы)}
   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: <PVC_АТЫ>
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: <ЖИНАҚТАУШЫ_КӨЛЕМІ>
     storageClassName: <САҚТАУ_КЛАСЫНЫҢ_АТЫ>
   ```
   Мұнда:
   - `<PVC_АТЫ>` — тасымалдау орындалатын PVC атауы.
   - `<ЖИНАҚТАУШЫ_КӨЛЕМІ>` — PVC жинақтауышының көлемі. Ол тасымалданатын PVC өлшемінен кем болмауы тиіс.
   - `<САҚТАУ_КЛАСЫНЫҢ_АТЫ>` — тасымалдау орындалатын қолжетімділік аймағындағы сақтау класының атауы.

   {/cut}

1. `pv-migrate` утилитасын іске қосыңыз:
   ```console
   pv-migrate migrate -n <ТАСЫМАЛДАНАТЫН_PVC_АТАУЛАР_КЕҢІСТІГІ> -N <МАҚСАТТЫ_PVC_АТАУЛАР_КЕҢІСТІГІ> <ТАСЫМАЛДАНАТЫН_PVC_АТЫ> <МАҚСАТТЫ_PVC_АТЫ>
   ```
   
1. Тасымалдаудың аяқталуын күтіңіз.

   {cut(Утилита жұмысының нәтиже мысалы)}

   ```console
   Dec 10 13:59:08.537 INF 🚀 Starting migration
   Dec 10 13:59:08.886 INF 💭 Attempting migration source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 strategies=mnt2,svc,lbsvc
   Dec 10 13:59:08.887 INF 🚁 Attempt using strategy source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=bdcbb strategy=mnt2
   Dec 10 14:01:09.989 INF 🧹 Cleaning up source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=bdcbb strategy=mnt2
   Dec 10 14:01:10.766 INF ✨ Cleanup done source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=bdcbb strategy=mnt2
   Dec 10 14:01:10.767 WRN 🔶 Migration failed with this strategy, will try with the remaining strategies source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=bdcbb strategy=mnt2 error="failed to wait for job completion: failed to wait for pod: timed out waiting for the condition"
   Dec 10 14:01:10.769 INF 🚁 Attempt using strategy source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=dedab strategy=svc
   Dec 10 14:01:10.769 INF 🔑 Generating SSH key pair source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=dedab strategy=svc algorithm=ed25519
   Dec 10 14:01:29.504 INF 🧹 Cleaning up source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=dedab strategy=svc
   Dec 10 14:01:30.767 INF ✨ Cleanup done source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=dedab strategy=svc
   Dec 10 14:01:30.769 INF ✅ Migration succeeded source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=dedab strategy=svc 
   ```
   {/cut}

{include(/kz/_includes/_az-migration-magnum-check.md)}

{/tab}

{/includetag}

{includetag(volume-id)}

{tab(Диск ID-сы)}

Пайдаланылатын диск жаңа қолжетімділік аймағына физикалық түрде ауыстырылған, бірақ оның Kubernetes-тегі метадеректерінде ескі аймақ көрсетілген. Мұны түзету үшін сол диск жаңа аймақта болатынын және метадеректері жаңа аймаққа сәйкес келетінін қамтамасыз ететін жаңа PV және PVC жасаңыз.

1. PV-де {linkto(../../../concepts/storage#mk8s-storage-reclaim-policies)[text=босату саясатының]} (reclaim policy) `Retain` екеніне көз жеткізіңіз, әйтпесе PV жойылғанда диск те жойылады.

1. PVC жасалған дискінің ID-сын біліңіз:

   ```console
   kubectl get pv <PV_АТЫ> -o jsonpath='{.spec.csi.volumeHandle}'
   ```
   
   Мұнда `<PV_АТЫ>` — тасымалдағыңыз келетін PVC-мен байланысты PV атауы. Диск ID-сы `volumeHandle` параметрінде көрсетіледі.

1. Дәл осы дискіге сілтейтін, бірақ мақсатты қолжетімділік аймағының сақтау класы (StorageClass) көрсетілген жаңа PV жасаңыз:

   {cut(PV манифесінің мысалы)}

   ```yaml
   apiVersion: v1
   kind: PersistentVolume
   metadata:
     name: <PV_АТЫ>
   spec:
     accessModes:
     - ReadWriteOnce 
     capacity:
       storage: <ЖИНАҚТАУШЫ_КӨЛЕМІ> 
     claimRef:
       kind: PersistentVolumeClaim
       namespace: <PVC_АТАУЛАР_КЕҢІСТІГІ>
       name: <PVC_АТЫ>
     csi:
       driver: cinder.csi.openstack.org
       volumeHandle: <ДИСК_ID>
     nodeAffinity:
       required:
         nodeSelectorTerms:
         - matchExpressions:
           - key: topology.cinder.csi.openstack.org/zone
             operator: In
             values:
             - <ҚОЛЖЕТІМДІЛІК_АЙМАҒЫ>
     persistentVolumeReclaimPolicy: Retain 
     storageClassName: <САҚТАУ_КЛАСЫНЫҢ_АТЫ>
     volumeMode: Filesystem
   ```
   
   Мұнда: 

   - `<PV_АТЫ>` — жаңа PV атауы.
   - `<ЖИНАҚТАУШЫ_КӨЛЕМІ>` — осы PV ұсынатын жинақтауыш көлемі. Ол диск көлемімен сәйкес келуі тиіс.
   - `<PVC_АТАУЛАР_КЕҢІСТІГІ>` — PVC орналасатын атаулар кеңістігі.
   - `<PVC_АТЫ>` — осы PV негізінде жасалатын PVC атауы.
   - `<ДИСК_ID>` — диск ID-сы.
   - `<ҚОЛЖЕТІМДІЛІК_АЙМАҒЫ>` — тасымалдау орындалатын қолжетімділік аймағының атауы.
   - `<САҚТАУ_КЛАСЫНЫҢ_АТЫ>` — тасымалдау орындалатын қолжетімділік аймағындағы сақтау класының (StorageClass) атауы.

   {/cut}

1. Жаңа PV манифесі негізінде PVC жасаңыз:

   {cut(PVC манифесінің мысалы)}

   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: <PVC_АТЫ>
   spec:
     accessModes:
       - ReadWriteOnce 
     resources:
       requests:
         storage: <ЖИНАҚТАУШЫ_КӨЛЕМІ> 
   storageClassName: <САҚТАУ_КЛАСЫНЫҢ_АТЫ> 
   ```
   {/cut}

1. Жасалғанды қосымдас бұрын тасымалданатын PVC-ді подтан ажыратыңыз, себебі Managed Containers-те бір подқа бірнеше PVC қосуға тыйым салынған.  

{include(/kz/_includes/_az-migration-magnum-check.md)}

{/tab}

{/includetag}

{includetag(helm-addons)}

1. {var(cloud)} жеке кабинетінде қолжетімділік аймағына байланыстыру Helm-чарттар арқылы немесе {linkto(../../../instructions/addons/manage-addons)[text=аддон кодын өңдеу]} кезінде қосымша орнатылған-орнатылмағанын тексеріңіз. 
1. Егер орнатылған болса, олар үшін тасымалдау орындалған қолжетімділік аймағын қолмен көрсетіңіз. Бұл манифестерді келесі жаңартқанда тасымалдау нәтижелерінің үстінен жазылып кетпеуі үшін қажет.

   {tabs}
   {tab(Helm-чарттар)}

   1. Тасымалдау орындалған қолжетімділік аймағын `values.yaml` файлында көрсетіңіз:
  
      ```yaml
      topology:
        zone: <ҚОЛЖЕТІМДІЛІК_АЙМАҒЫ>
      ```

   1. Жаңартуды қолданыңыз. Толығырақ [Helm ресми құжаттамасында](https://helm.sh/docs/). 

   {/tab}

   {tab(Аддондар)}

   1. [Өтіңіз](https://msk.cloud.vk.ru/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Kubernetes кластерлері → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Қажетті кластердің атауын басыңыз.
   1. **Аддондар** қойындысына өтіңіз.
   1. Коды өзгертілетін аддон үшін ![ ](/kz/assets/more-icon.svg "inline") басып, **Өңдеу** тармағын таңдаңыз.
   1. Қажетті өзгерістерді енгізіп, **Баптауларды өзгерту** түймесін басыңыз.

   {/tab}
   {/tabs}

{/includetag}

{includetag(tf-magnum)}

Егер сіз кластер ресурстарын Terraform арқылы басқарсаңыз, кластерді тасымалдағаннан кейін Terraform State-ті нақты инфрақұрылыммен синхрондаңыз:

1. Кластер ресурсына (`vkcs_kubernetes_cluster`) `lifecycle` блогын қосыңыз:

   ```console
   lifecycle {
     prevent_destroy = true
   }
   ```

   Бұл конфигурация файлында немесе Terraform State-те синхрондалмаған өрістер қалса, кластердің қайта жасалуын немесе жойылуын болдырмайды.

1. Terraform конфигурация файлындағы деректерді пайдаланып, кластерді `vkcs_kubernetes_cluster` ресурсына байланыстырыңыз:

   ```console
   terraform import vkcs_kubernetes_cluster.<РЕСУРС_АТЫ> <КЛАСТЕР_ID>
   ```
   
1. Әр түйіндер тобын `vkcs_kubernetes_node_group` ресурсына байланыстырыңыз:

   ```console
   terraform import vkcs_kubernetes_node_group.<РЕСУРС_АТЫ> <ТҮЙІН_ТОБЫНЫҢ_ID>
   ```

1. Жаңа ресурстарда қандай параметрлер пайда болғанын қараңыз және оларды Terraform конфигурация файлына қосыңыз:

   ```console
   terraform state show <РЕСУРС>.<РЕСУРС_АТЫ>
   ```

1. Түйіндер тобында автомасштабтау қосылған болса, Terraform файлындағы `node_count` параметрінің мәні нақты пайдаланылатын түйіндер санынан өзгеше болуы мүмкін. Түйіндер тобы ресурсына `lifecycle` блогын қосыңыз:

   ```console
   lifecycle {
     ignore_changes = [node_count]
   }
   ```   

   Осылайша Terraform автомасштабтау кезінде автоматты түрде өзгеретін `node_count` параметрінің өзгерістерін қадағаламайды.

1. Өзгерістер файлын жасап, оның ресурстарды қайта жасауға нұсқау бермейтініне көз жеткізіңіз:

   ```console
   terraform plan
   ```

   Егер команда шығысында `No changes` көрсетілсе, конфигурация файлы мен Terraform State толығымен синхрондалған. Егер шығыста әлі де өзгерістер көрсетілсе, команда шығысы `No changes` көрсеткенше синхрондауды жалғастырыңыз.

   {note:warn}
   Егер `terraform plan` командасының шығысы ресурсты қайта жасауды көрсетсе (`replace`, `-/+`, `destroy and then create` операциялары), әсіресе `availability_zone` және `availability_zones` өрістері бойынша, өзгерістерді қолданбаңыз.

   `terraform apply` іске қосылуы қолжетімділік аймақтары арасында тасымалдаудан кейін конфигурацияны жаңартудың орнына қолданыстағы кластерді жойып, жаңасын іске қосады.
   {/note}

   Егер команда шығысы `availability_zone` немесе `availability_zones` өрістері бойынша ресурсты қайта жасау операцияларын ұсынса:

   1. Конфигурациядағы өрістің өзекті мәнін мына команда көмегімен біліңіз:

      ```console
      terraform state show <РЕСУРС>.<РЕСУРС_АТЫ>
      ```
   1. Terraform конфигурация файлындағы мәнді жаңартыңыз.

1. Кластер ресурсынан бұрын қосылған `prevent_destroy = true` параметрі бар `lifecycle` блогын жойыңыз.

Толығырақ {linkto(../../../instructions/helpers/terraform-howto#k8s-terraform-howto-features)[text=Terraform пайдалану]} бөлімінде және [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_cluster.md#argument-reference).

{/includetag}

{includetag(tf-managed)}

Егер сіз кластер ресурстарын Terraform арқылы басқарсаңыз, кластерді тасымалдағаннан кейін Terraform State-ті нақты инфрақұрылыммен синхрондаңыз:

1. Кластер ресурсына (`vkcs_kubernetes_cluster_v2`) `lifecycle` блогын қосыңыз:

   ```console
   lifecycle {
     prevent_destroy = true
   }
   ```

   Бұл конфигурация файлында немесе Terraform State-те синхрондалмаған өрістер қалса, кластердің қайта жасалуын немесе жойылуын болдырмайды.

1. Terraform конфигурация файлындағы деректерді пайдаланып, кластерді `vkcs_kubernetes_cluster_v2` ресурсына байланыстырыңыз:

   ```console
   terraform import vkcs_kubernetes_cluster_v2.<РЕСУРС_АТЫ> <КЛАСТЕР_ID>
   ```

1. Әр түйіндер тобын `vkcs_kubernetes_node_group_v2` ресурсына байланыстырыңыз:

   ```console
   terraform import vkcs_kubernetes_node_group_v2.<РЕСУРС_АТЫ> <ТҮЙІН_ТОБЫНЫҢ_ID>
   ```

1. Жаңа ресурстарда қандай параметрлер пайда болғанын қараңыз және оларды Terraform конфигурация файлына қосыңыз:

   ```console
   terraform state show <РЕСУРС>.<РЕСУРС_АТЫ>
   ```

1. Түйіндер тобында автомасштабтау қосылған болса, Terraform файлындағы `node_count` параметрінің мәні нақты пайдаланылатын түйіндер санынан өзгеше болуы мүмкін. Түйіндер тобы ресурсына `lifecycle` блогын қосыңыз:

   ```console
   lifecycle {
     ignore_changes = [node_count]
   }
   ```   

   Осылайша Terraform автомасштабтау кезінде автоматты түрде өзгеретін `node_count` параметрінің өзгерістерін қадағаламайды.

1. Өзгерістер файлын жасап, оның ресурстарды қайта жасауға нұсқау бермейтініне көз жеткізіңіз:

   ```console
   terraform plan
   ```

   Егер команда шығысында `No changes` көрсетілсе, конфигурация файлы мен Terraform State толығымен синхрондалған. Егер шығыста әлі де өзгерістер көрсетілсе, команда шығысы `No changes` көрсеткенше синхрондауды жалғастырыңыз.

   {note:warn}
   Егер `terraform plan` командасының шығысы ресурсты қайта жасауды көрсетсе (`replace`, `-/+`, `destroy and then create` операциялары), әсіресе `availability_zone` және `availability_zones` өрістері бойынша, өзгерістерді қолданбаңыз.

   `terraform apply` іске қосылуы қолжетімділік аймақтары арасында тасымалдаудан кейін конфигурацияны жаңартудың орнына қолданыстағы кластерді жойып, жаңасын іске қосады.
   {/note}

   Егер команда шығысы `availability_zone` немесе `availability_zones` өрістері бойынша ресурсты қайта жасау операцияларын ұсынса:

   1. Конфигурациядағы өрістің өзекті мәнін мына команда көмегімен біліңіз:

      ```console
      terraform state show <РЕСУРС>.<РЕСУРС_АТЫ>
      ```
   1. Terraform конфигурация файлындағы мәнді жаңартыңыз.

1. Кластер ресурсынан бұрын қосылған `prevent_destroy = true` параметрі бар `lifecycle` блогын жойыңыз.

Толығырақ {linkto(../../../instructions/helpers/terraform-howto#mk8s-terraform-howto-features)[text=Terraform пайдалану]} бөлімінде және [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_cluster.md#argument-reference).

{/includetag}

{includetag(delete)}

Кластердегі жұмыс істеп тұрған ресурстар тарифтеледі және есептеу ресурстарын тұтынады. Тасымалдаудан кейін қалған PVC мен диск снимоктарын, сондай-ақ қолжетімділік аймағының өзін пайдалануды жоспарламасаңыз, оларды және олармен байланысты ресурстарды жойыңыз:

1. {linkto(../../../concepts/storage)[text=Ескі PVC-ді]} және {linkto(../../../../../computing/iaas/instructions/volumes/volumes-manage)[text=диск снимоктарын]} жойыңыз.

1. Ескі қолжетімділік аймағының сақтау класын (StorageClass) жойыңыз:

   ```console
   kubectl get sc -o name | grep <ЕСКІ_ҚОЛЖЕТІМДІЛІК_АЙМАҒЫ> | xargs -I {} kubectl delete {}
   ```

   Мұнда `<ЕСКІ_ҚОЛЖЕТІМДІЛІК_АЙМАҒЫ>` — тасымалдау орындалған қолжетімділік аймағының кіші регистрмен көрсетілген атауы.

{/includetag}