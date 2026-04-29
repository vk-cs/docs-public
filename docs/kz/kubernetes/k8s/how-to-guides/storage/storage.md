{include(/kz/_includes/_translated_by_ai.md)}

[Тұрақты томдарды](/kz/kubernetes/k8s/reference/pvs-and-pvcs) (Persistent Volumes, PV) қарапайым демо-қосымшаларға әртүрлі тәсілдермен қосуға болады. Әрі қарай қосу үшін Persistent Volume Claims (PVC) пайдаланылады. Қосымшалардың және оларға қосылған PV-лардың жұмысқа қабілеттілігін тексеру үшін Ingress ресурсы жасалады.

## Дайындық қадамдары

1. [Жасаңыз](../../instructions/create-cluster) Kubernetes кластерінің ең өзекті нұсқасын.

   Кластерді жасау кезінде:

   - **Сыртқы IP тағайындау** опциясын таңдаңыз.
   - Қолжетімділік аймағы `MS1` болатын `STD3-2-8` виртуалды машина түрімен жалпы есептеу ресурстары: 2 vCPU, 8 ГБ RAM болатын бір түйін тобын жасаңыз (немесе өнімдірек түрін таңдауға болады). Бұл әрі қарай жасалатын барлық объектілерді орналастыруға мүмкіндік беру үшін қажет.

     Мысалы, `STD3-2-8` виртуалды машина түрімен бір түйін тобын жасауға болады.

   Кластердің басқа параметрлерін өз қалауыңыз бойынша таңдаңыз.

1. [Көз жеткізіңіз](../../instructions/addons/manage-addons#addondardy_karau), NGINX Ingress (`ingress-nginx`) аддоны кластерде әдепкі параметрлермен [орнатылғанына](../../instructions/addons/advanced-installation/install-advanced-ingress). Ол демо-қосымшаларға қолжетімділікті қамтамасыз ету үшін қажет болады.

    {note:warn}

    Аддонды орнату кезінде ол үшін [стандартты жүктеме теңгергіші](/kz/networks/balancing/concepts/load-balancer#zhukteme_tengergishterinin_turleri) жасалады.

    Теңгергішті пайдалану [тарифтеледі](/kz/networks/vnet/tariffication).

    {/note}

1. [Көз жеткізіңіз](../../connect/kubectl), `kubectl` көмегімен кластерге қосыла алатыныңызға.

1. Егер утилита әлі орнатылмаған болса, [curl](https://curl.se/docs/) орнатыңыз.

## 1. Демо-қосымшаларды жасаңыз және оларға PV қосыңыз

Әрі қарай қосылған PV-ларға жазылған веб-беттерді көрсету үшін NGINX негізіндегі бірнеше веб-қосымшаны қалай жасау керектігі көрсетіледі.
Веб-беттерді `/usr/share/nginx/html` директориясынан көрсететін `nginxdemos/nginx-hello` NGINX бейнесі пайдаланылады, сондықтан барлық PV дәл осы жол бойынша қосымшалардың подтарына монтталады.

PV қосудың қандай тәсілдерімен танысу қажет екеніне байланысты бір немесе бірнеше демо-қосымша жасауға болады.

### Блоктық сақтау қоймаларын қосу

Блоктық сақтау қоймалары кластерге [Cinder CSI көмегімен](../../concepts/storage) қосылады.

Осындай түрдегі сақтау қоймаларын пайдаланғанда:

- сақтау қоймасына тек бір под қана қол жеткізе алады (бірнеше под блоктық сақтау қоймасын бір уақытта пайдалана алмайды);
- соның салдарынан сақтау қоймасына қол жеткізу үшін `ReadWriteOnce` режимі пайдаланылуы тиіс.

{tabs}

{tab(Статикалық PVC көмегімен қосу)}

{note:info}
Бұл сценарий тек [бірінші буын](/kz/kubernetes/k8s/concepts/cluster-generations) кластерлері үшін қолжетімді.
{/note}

Бұл мысалда мыналар жасалады:

1. VK Cloud платформасының **Бұлтты есептеулер** бөліміндегі диск.
1. Осы дискіге сәйкес келетін PV.
1. Бұрыннан жасалған PV-ды пайдаланатын статикалық PVC.
1. Бір подтан тұратын deployment және оған сәйкес service түріндегі `tea` қосымшасы.

   Бұл қосымша үшін сондай-ақ PV-ға веб-бетті жазатын инициализация контейнері ([initContainer](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)) жасалады.

PV-ды статикалық PVC көмегімен қосу үшін:

1. [Желілік HDD дискін жасаңыз](/kz/computing/iaas/instructions/volumes).

   Жасау кезінде мыналарды көрсетіңіз:

   - **Диск атауы:** кез келген, мысалы, `disk-tea`.
   - **Дереккөз:** `бос диск`.
   - **Диск түрі:** `желілік HDD-диск (ceph-hdd)`.
   - **Қолжетімділік аймағы:** `MS1`.
   - **Өлшемі:** `1 ГБ`.

   Басқа опциялар мен параметрлерді өзгертпей қалдырыңыз.

1. Жасалған дискінің идентификаторын көшіріп алыңыз, мысалы, `f6d8bf3b-aaaa-bbbb-cccc-4ece8e353246`.

1. Қосу ерекшеліктерін зерттеңіз:

   1. PersistentVolume ресурсы үшін `spec.capacity.storage` параметрлерінде және PersistentVolumeClaim ресурсы үшін `spec.resources.requests.storage` параметрлерінде көрсетілетін сақтау қоймасының өлшемдері тиісті дискінің өлшемімен сәйкес келуі тиіс. Бұл мысалда — 1 ГБ.
   1. PersistentVolumeClaim ресурсы үшін сақтау класының `storageClassName` параметрінде бос мәнді пайдаланыңыз.
   1. Сақтау қоймасына қол жеткізу режимі PersistentVolume ресурсы үшін `spec.accessModes` параметрінде беріледі.
   1. Дискінің және қосымша поды орналасатын worker-түйіннің қолжетімділік аймақтары сәйкес келуі тиіс. Әйтпесе, осы түйіндегі подқа дискіге сәйкес келетін PV-ды қосу әрекеті сәтсіз аяқталады. Бұл мысалда под `MS1` қолжетімділік аймағындағы worker-түйіндер тобына орналастырылады және осы аймақтан дискіні пайдаланады.
   1. PV үшін `Retain` ReclaimPolicy пайдаланылады. `Delete` саясаты дискінің күйін қолмен басқаруға және оны кездейсоқ жоймауға мүмкіндік беру үшін қолданылмайды.

1. `tea` қосымшасы үшін манифест жасаңыз.

   PersistentVolume ресурсы үшін жасалған дискінің идентификаторын `spec.cinder.volumeID` параметрінде көрсетіңіз.

   {cut(tea.yaml)}

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
       volumeID: <идентификатор диска в формате f6d8bf3b-aaaa-bbbb-cccc-4ece8e353246>
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

   {/cut}

1. Барлық қажетті ресурстарды жасау үшін осы манифесті кластерде қолданыңыз:

   ```console
   kubectl apply -f ./tea.yaml
   ```

{/tab}

{tab(Динамикалық PVC көмегімен қосу)}

Бұл мысалда мыналар жасалады:

1. Берілген параметрлер негізінде PV жасайтын динамикалық PVC.
1. Бір подтан тұратын deployment және оған сәйкес service түріндегі `coffee` қосымшасы.

   Бұл қосымша үшін сондай-ақ PV-ға веб-бетті жазатын инициализация контейнері ([initContainer](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)) жасалады.

PV-ды динамикалық PVC көмегімен қосу үшін:

1. Қосу ерекшеліктерін зерттеңіз:

   1. Қажетті сақтау қоймасының өлшемі PersistentVolumeClaim ресурсының `spec.resources.requests.storage` параметрінде көрсетіледі. Бұл мысалда — 1 ГБ.
   1. PersistentVolumeClaim ресурсы үшін сақтау класын `spec.storageClassName` параметрінде көрсетіңіз. Сақтау класы қосымша поды орналасатын worker-түйінмен бірдей қолжетімділік аймағын пайдалануы тиіс. Әйтпесе, осы түйіндегі подқа PVC-ге сәйкес келетін PV-ды қосу әрекеті сәтсіз аяқталады. Бұл мысалда под `MS1` қолжетімділік аймағындағы worker-түйіндер тобына орналастырылады және осы аймақтан `csi-ceph-hdd-ms1` сақтау класын пайдаланады.
   1. Сақтау қоймасына қол жеткізу режимі PersistentVolumeClaim ресурсы үшін `spec.accessModes` параметрінде беріледі.
   1. PV үшін `Delete` ReclaimPolicy пайдаланылады (бұл таңдалған сақтау класынан туындайды). PVC жойылған кезде осы PV-ға сәйкес диск автоматты түрде жойылады.

1. `coffee` қосымшасы үшін манифест жасаңыз.

   {cut(coffee.yaml)}

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

   {/cut}

1. Барлық қажетті ресурстарды жасау үшін осы манифесті кластерде қолданыңыз:

   ```console
   kubectl apply -f ./coffee.yaml
   ```

{/tab}

{tab(Динамикалық PVC көмегімен бірнеше подқа қосу)}

Бұл мысалда мыналар жасалады:

1. Екі подтан тұратын StatefulSet түріндегі `juice` қосымшасы, сондай-ақ оған сәйкес service-тер.

   Бұл қосымша үшін сондай-ақ PV-ға веб-бетті жазатын инициализация контейнері ([initContainer](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)) жасалады.

1. Берілген параметрлер негізінде PV жасайтын динамикалық PVC.

PV-ды динамикалық PVC көмегімен бірнеше подқа қосу үшін:

1. Қосу ерекшеліктерін зерттеңіз:

   1. StatefulSet пайдаланылғанда PVC басқа мысалдардағыдай бөлек емес, StatefulSet ресурсының шеңберінде бапталады.
   1. PVC StatefulSet-тің әрбір репликасы үшін бір-бірден PV жасайды, бұл ретте репликалар ретімен нөмірленеді.

      {note:info}

      Қосымшаны бірнеше репликадан Deployment ресурсы түрінде жайған кезде де PVC көмегімен әр реплика үшін PV жасалуын қамтамасыз ету қажет. Мұндай PV-ларда реттік нөмірлердің орнына кездейсоқ идентификаторлар болады.

      {/note}

   1. Қажетті сақтау қоймасының өлшемі StatefulSet ресурсының `spec.volumeClaimTemplates.spec.resources.requests.storage` параметрінде көрсетіледі. Бұл мысалда — 1 ГБ.
   1. Сақтау класы StatefulSet ресурсының `spec.volumeClaimTemplates.spec.storageClassName` параметрінде көрсетіледі. Сақтау класы қосымша поды орналасатын worker-түйінмен бірдей қолжетімділік аймағын пайдалануы тиіс. Әйтпесе, осы түйіндегі подқа PVC-ге сәйкес келетін PV-ды қосу әрекеті сәтсіз аяқталады. Бұл мысалда под `MS1` қолжетімділік аймағындағы worker-түйіндер тобына орналастырылады және осы аймақтан `csi-ceph-hdd-ms1` сақтау класын пайдаланады.
   1. Сақтау қоймасына қол жеткізу режимі StatefulSet ресурсының `spec.volumeClaimTemplates.spec.accessModes` параметрінде беріледі.
   1. PV үшін `Delete` ReclaimPolicy пайдаланылады (бұл таңдалған сақтау класынан туындайды). PVC жойылған кезде осы PV-ға сәйкес диск автоматты түрде жойылады.

1. `juice` қосымшасы үшін манифест жасаңыз.

   {cut(juice.yaml)}

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

   {/cut}

1. Барлық қажетті ресурстарды жасау үшін осы манифесті кластерде қолданыңыз:

   ```console
   kubectl apply -f ./juice.yaml
   ```

{/tab}

{/tabs}

### Файлдық сақтау қоймаларын қосу

Файлдық сақтау қоймалары кластерге, мысалы NFS сияқты, қажетті протокол бойынша бар сақтау қоймасын пайдалануға бапталған PV көмегімен қосылады.

Осындай түрдегі сақтау қоймаларын пайдаланғанда:

- бірден бірнеше под сақтау қоймасына қол жеткізе алады;
- соның салдарынан сақтау қоймасына қол жеткізу үшін `ReadWriteMany` режимі пайдаланылуы тиіс.

{tabs}

{tab(Статикалық PVC көмегімен NFS сақтау қоймасын қосу)}

Бұл мысалда мыналар жасалады:

1. VK Cloud платформасының **Бұлтты есептеулер** бөліміндегі файлдық NFS сақтау қоймасы.
1. Осы сақтау қоймасына сәйкес келетін PV.
1. Бұрыннан жасалған PV-ды пайдаланатын статикалық PVC.
1. Екі подтан тұратын StatefulSet түріндегі `milkshake` қосымшасы, сондай-ақ оған сәйкес service-тер.

PV NFS-ті статикалық PVC көмегімен қосу үшін:

1. [Файлдық сақтау қоймасын жасаңыз](/kz/computing/iaas/instructions/fs-manage/fs-create).

   Жасау кезінде мыналарды көрсетіңіз:

   - **Файлдық сақтау қоймасының атауы:** кез келген, мысалы, `storage-milkshake`.
   - **Сақтау қоймасының өлшемі:** `10 ГБ`.
   - **Протокол:** `NFS`.
   - **Желі:** Kubernetes кластері орналасқан желі мен ішкі желі. Бұл ақпаратты кластер бетінде білуге болады.
   - **Файлдық сақтау қоймасының желісі:** бар желі. Егер тізімде лайықты желі болмаса, `Жаңа желі жасау` тармағын таңдаңыз.

1. Жасалған файлдық сақтау қоймасы туралы [ақпаратты қараңыз](/kz/computing/iaas/instructions/fs-manage/fs-operations#fayldyk_saktau_orny_turaly_akparatty_karau).

   **Қосылу нүктесі** параметрінің мәнін сақтап қойыңыз.

1. Қосу ерекшеліктерін зерттеңіз:

   1. PersistentVolumeClaim ресурсы үшін `spec.capacity.storage` және `spec.resources.requests.storage` параметрлерінде көрсетілетін сақтау қоймасының өлшемдері жасалған файлдық сақтау қоймасының өлшемімен сәйкес келуі тиіс. Бұл мысалда — 10 ГБ.
   1. PersistentVolumeClaim ресурсы үшін сақтау класының `storageClassName` параметрінде бос мәнді пайдаланыңыз.
   1. PersistentVolume ресурсы үшін:

      1. Сақтау қоймасына қол жеткізу режимі PersistentVolume ресурсы үшін `spec.accessModes` параметрінде беріледі.
      1. `spec.mountOptions` параметрлер жиынында `4.0` нұсқасы бар `nfsvers` жазбасы болуы тиіс.

   1. PV-ға веб-бетті жазу үшін инициализация контейнерінің орнына бір рет іске қосылатын Kubernetes тапсырмасы (job) пайдаланылады. Мұндай тәсіл бұл жағдайда барлық подтар бірдей PV-ға қол жеткізе алатындықтан жұмыс істейді.

   1. PV үшін `Retain` ReclaimPolicy пайдаланылады, өйткені `Recycle` саясаты ол қажет болмай қалған кезде оны бірден жоюға мүмкіндік бермейді. PV-ды деректерден тазарту ұзақ уақыт алады. `Delete` саясаты сақтау қоймасының күйін қолмен басқаруға және оны кездейсоқ жоймауға мүмкіндік беру үшін қолданылмайды.

1. `milkshake` қосымшасы үшін манифест жасаңыз.

   PersistentVolume ресурсы үшін мыналарды көрсетіңіз:

   - файлдық сақтау қоймасының **Қосылу нүктесі** параметрінен алынған IP-мекенжайды `spec.nfs.server` параметрінің мәні ретінде;
   - IP-мекенжайдан кейінгі деректерді (`/shares/...`) `spec.nfs.path` параметрінің мәні ретінде.

   {cut(milkshake.yaml)}

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

   {/cut}

1. Барлық қажетті ресурстарды жасау үшін осы манифесті кластерде қолданыңыз:

   ```console
   kubectl apply -f ./milkshake.yaml
   ```

{/tab}

{/tabs}

## 2. Демо-қосымшалардың және PV-лардың жұмысқа қабілеттілігін тексеріңіз

1. Қосымшаларға сұраулар өтетін Ingress ресурсы үшін манифест жасаңыз.

   {cut(cafe-ingress.yaml)}

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

   {/cut}

1. Барлық қажетті ресурстарды жасау үшін осы манифесті кластерде қолданыңыз:

   ```console
   kubectl apply -f ./cafe-ingress.yaml
   ```

1. Ingress контроллерінің жария IP-мекенжайын [анықтаңыз](../../instructions/addons/advanced-installation/install-advanced-ingress#tengergishtin_ip_mekenzhayyn_alu).

1. Ingress контроллерінің IP-мекенжайын пайдаланып, `curl` көмегімен қосымшалардың қолжетімділігін тексеріңіз.

   {note:info}

   Егер қандай да бір қосымша жайылмаса, ол үшін `Service Unavailable` хабарламасы шығарылады.

   {/note}

   {tabs}

   {tab(Tea)}

   Команданы орындаңыз:

   ```console
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/tea
   ```

   Жауап ретінде мынаны көруіңіз керек:

   ```text
   The tea pod says Hello World to everyone! This file is located on the statically claimed persistent volume.
   ```

   {/tab}

   {tab(Coffee)}

   Команданы орындаңыз:

   ```console
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/coffee
   ```

   Жауап ретінде мынаны көруіңіз керек:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the statically claimed persistent volume.
   ```

   {/tab}

   {tab(Juice)}

   Командаларды орындаңыз:

   ```console
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/juice
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/juice/0
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/juice/1
   ```

   Қосымша мен оның әрбір репликасы үшін бірдей жауап шығуы тиіс:

   ```text
   The juice StatefulSet pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

   {/tab}

   {tab(Milkshake)}

   Командаларды орындаңыз:

   ```console
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/milkshake
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/milkshake/0
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/milkshake/1
   ```

   Қосымша мен оның әрбір репликасы үшін бірдей жауап шығуы тиіс:

   ```text
   The milkshake StatefulSet pod says Hello World to everyone! This file is located on the dynamically claimed NFS ReadWriteMany persistent volume.
   ```

   {/tab}

   {/tabs}

## Пайдаланылмайтын ресурстарды жойыңыз

1. Егер жасалған Kubernetes ресурстары енді қажет болмаса, оларды жойыңыз.

   {tabs}

   {tab(Linux/macOS)}

   ```console
   kubectl delete -f ./cafe-ingress.yaml
   kubectl delete -f ./milkshake.yaml
   kubectl delete -f ./juice.yaml
   kubectl delete -f ./coffee.yaml
   kubectl delete -f ./tea.yaml

   ```

   {/tab}

   {tab(Windows)}

   ```console
   kubectl delete -f ./cafe-ingress.yaml; `
   kubectl delete -f ./milkshake.yaml; `
   kubectl delete -f ./juice.yaml; `
   kubectl delete -f ./coffee.yaml; `
   kubectl delete -f ./tea.yaml
   ```

   {/tab}

   {/tabs}

1. Пайдаланылмайтын сақтау қоймаларын жойыңыз:

   1. Егер `tea` қосымшасы пайдаланған диск енді қажет болмаса, оны жойыңыз.

   1. Егер `milkshake` қосымшасы пайдаланған NFS сақтау қоймасы енді қажет болмаса, оны жойыңыз.

   Динамикалық PVC көмегімен жасалған барлық басқа Cinder сақтау қоймалары автоматты түрде жойылады.

1. Жұмыс істеп тұрған кластер есептеу ресурстарын тұтынады. Егер ол енді қажет болмаса:

   - [тоқтатыңыз](../../instructions/manage-cluster#klasterdi_iske_kosu_nemese_toktatu) оны, кейінірек пайдалану үшін;
   - [жойыңыз](../../instructions/manage-cluster#delete_cluster) оны біржола.
