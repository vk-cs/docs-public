# {heading(Тұрақты томдармен (PV) жұмыс істеу)[id=mk8s-storage]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{linkto(../../reference/pvs-and-pvcs#mk8s-pvs-and-pvcs)[text=Тұрақты томдарды]} (Persistent Volumes, PV) қарапайым демо-қосымшаларға әртүрлі тәсілдермен қосуға болады. Әрі қарай қосу үшін Persistent Volume Claims (PVC) пайдаланылады. Қосымшалардың және оларға қосылған PV-лардың жұмысқа қабілеттілігін тексеру үшін Ingress ресурсы жасалады.

## {heading(Дайындық қадамдар)[id=mk8s-storage-prepare]}

{include(/kz/_includes/_create-test-cluster.md)[tags=managed]}

   Кластерді жасағанда:

   - **Сыртқы IP тағайындау** опциясын таңдаңыз.
   - `PA2` қолжетімділік аймағында `STD3-2-8` түрлі виртуалдық машинасымен бір түйіндер тобын жасаңыз, жалпы есептеу ресурстарымен: 2 vCPU, 8 ГБ RAM (немесе өнімдірек түрін таңдауға болады). Бұл әрі қарай жасалатын барлық объектілерді орналастыруға мүмкіндік болуы үшін қажет.

     Мысалы, `STD3-2-8` түрлі виртуалдық машинасымен бір түйіндер тобын жасауға болады.

   Кластердің қалған параметрлерін өз қалауыңыз бойынша таңдаңыз.

1. {linkto(../../instructions/addons/manage-addons#mk8s-manage-addons-view)[text=Көріңіз]}, NGINX Ingress (`ingress-nginx`) аддоны кластерде әдепкі параметрлермен {linkto(../../instructions/addons/advanced-installation/install-advanced-ingress#mk8s-install-advanced-ingress)[text=орнатылған]}-ын. Ол демоқолданбаларға қолжетімділікті қамтамасыз ету үшін қажет болады.

    {note:warn}
    Аддонды орнатқанда ол үшін {linkto(../../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=стандартты жүктеме теңгеріші]} жасалады.

    Теңгерішті пайдалану {linkto(../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифтеленеді]}.
    {/note}

1. {linkto(../../connect/kubectl#mk8s-kubectl)[text=Көріңіз]}, `kubectl` көмегімен кластерге қосыла алатыныңызға көз жеткізіңіз.

1. [curl](https://curl.se/docs/) утилитасы әлі орнатылмаған болса, орнатыңыз.

## {heading(1. Демо-қосымшаларды жасаңыз және оларға PV қосыңыз)[id=mk8s-storage-create-demo]}

Әрі қарай қосылған PV-ларға жазылған веб-беттерді көрсету үшін NGINX негізіндегі бірнеше веб-қосымшаны қалай жасау керектігі көрсетіледі.
Веб-беттерді `/usr/share/nginx/html` директориясынан көрсететін `nginxdemos/nginx-hello` NGINX бейнесі пайдаланылады, сондықтан барлық PV дәл осы жол бойынша қосымшалардың подтарына монтталады.

PV қосудың қандай тәсілдерімен танысу қажет екеніне байланысты бір немесе бірнеше демо-қосымша жасауға болады.

### {heading(Блоктық жадтарды қосу)[id=mk8s-storage-connect-block-storage]}

Блоктық жадтар кластерге {linkto(../../concepts/storage#mk8s-storage)[text=Cinder CSI көмегімен] қосылады}.

Осындай типтегі жадтарды пайдаланған кезде:

- жадқа тек бір ғана под қол жеткізе алады (бірнеше под блоктық жадты бір уақытта пайдалана алмайды);
- осыған байланысты жадқа қол жеткізу үшін `ReadWriteOnce` режимі қолданылуы тиіс.

{tabs}

{tab(Динамикалық PVC көмегімен қосу)}

Осы мысалда мыналар жасалады:

1. Берілген параметрлер негізінде PV жасайтын динамикалық PVC.
1. Бір подтан тұратын deployment түріндегі `coffee` қосымшасы және оған сәйкес service.

   Осы қосымша үшін сонымен қатар PV-ге веб-бетті жазатын инициализация контейнері ([initContainer](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)) жасалады.

PV-ді динамикалық PVC көмегімен қосу үшін:

1. Қосу ерекшеліктерін зерделеңіз:

   1. Қажетті жад көлемі PersistentVolumeClaim ресурсының `spec.resources.requests.storage` параметрінде көрсетіледі. Осы мысалда — 1 ГБ.
   1. PersistentVolumeClaim ресурсы үшін `spec.storageClassName` параметрінде сақтау класын көрсетіңіз. Сақтау класы қосымшаның поды орналасатын worker-түйінмен бірдей қолжетімділік аймағын пайдалануы тиіс. Әйтпесе, осы түйіндеғы подқа PVC-ге сәйкес PV-ді қосу әрекеті сәтсіз аяқталады. Осы мысалда под `PA2` қолжетімділік аймағындағы worker-түйіндер тобында орналасады және осы аймақтан `csi-ceph-ssd-pa2` сақтау класын пайдаланады.
   1. Жадқа қол жеткізу режимі PersistentVolumeClaim ресурсы үшін `spec.accessModes` параметрінде орнатылады.
   1. PV үшін ReclaimPolicy `Delete` қолданылады (бұл таңдалған сақтау класынан туындайды). PVC жойылғанда осы PV-ге сәйкес диск автоматты түрде жойылады.

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
     storageClassName: "csi-ceph-ssd-pa2"

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

1. Барлық қажетті ресурстарды жасау үшін осы манифестті кластерде қолданыңыз:

   ```console
   kubectl apply -f ./coffee.yaml
   ```

{/tab}

{tab(Динамикалық PVC көмегімен бірнеше подқа қосу)}

Осы мысалда мыналар жасалады:

1. Екі подтан тұратын StatefulSet түріндегі `juice` қосымшасы және оған сәйкес service-тер.

   Осы қосымша үшін сонымен қатар PV-ге веб-бетті жазатын инициализация контейнері ([initContainer](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)) жасалады.

1. Берілген параметрлер негізінде PV жасайтын динамикалық PVC.

PV-ді динамикалық PVC көмегімен бірнеше подқа қосу үшін:

1. Қосу ерекшеліктерін зерделеңіз:

   1. StatefulSet пайдаланған кезде PVC басқа мысалдардағыдай бөлек емес, StatefulSet ресурсының құрамында бапталады.
   1. PVC әрбір StatefulSet репликасы үшін бір PV жасайды, ал бұл репликалар ретімен нөмірленеді.

      {note:info}
      Бірнеше репликадан тұратын қосымшаны Deployment ресурсы түрінде орналастырған кезде де әрбір реплика үшін PV жасалуын PVC көмегімен қамтамасыз ету қажет. Мұндай PV-лерде реттік нөмірлердің орнына кездейсоқ идентификаторлар болады.
      {/note}

   1. Қажетті жад көлемі StatefulSet ресурсының `spec.volumeClaimTemplates.spec.resources.requests.storage` параметрінде көрсетіледі. Осы мысалда — 1 ГБ.
   1. Сақтау класы StatefulSet ресурсының `spec.volumeClaimTemplates.spec.storageClassName` параметрінде көрсетіледі. Сақтау класы қосымшаның поды орналасатын worker-түйінмен бірдей қолжетімділік аймағын пайдалануы тиіс. Әйтпесе, осы түйіндеғы подқа PVC-ге сәйкес PV-ді қосу әрекеті сәтсіз аяқталады. Осы мысалда под `PA2` қолжетімділік аймағындағы worker-түйіндер тобында орналасады және осы аймақтан `csi-ceph-ssd-pa2` сақтау класын пайдаланады.
   1. Жадқа қол жеткізу режимі StatefulSet ресурсының `spec.volumeClaimTemplates.spec.accessModes` параметрінде орнатылады.
   1. PV үшін ReclaimPolicy `Delete` қолданылады (бұл таңдалған сақтау класынан туындайды). PVC жойылғанда осы PV-ге сәйкес диск автоматты түрде жойылады.

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
           storageClassName: "csi-ceph-ssd-pa2"
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

1. Барлық қажетті ресурстарды жасау үшін осы манифестті кластерде қолданыңыз:

   ```console
   kubectl apply -f ./juice.yaml
   ```

{/tab}

{/tabs}

### {heading(Файлдық сақтау қоймаларын қосу)[id=mk8s-storage-connect-file-storage]}

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

1. {linkto(../../../../computing/iaas/instructions/fs-manage/fs-create#iaas-fs-create)[text=Файлдық сақтау қоймасын жасаңыз]}.

   Жасау кезінде мыналарды көрсетіңіз:

   - **Файлдық сақтау қоймасының атауы:** кез келген, мысалы, `storage-milkshake`.
   - **Сақтау қоймасының өлшемі:** `10 ГБ`.
   - **Протокол:** `NFS`.
   - **Желі:** Kubernetes кластері орналасқан желі мен ішкі желі. Бұл ақпаратты кластер бетінде білуге болады.
   - **Файлдық сақтау қоймасының желісі:** бар желі. Егер тізімде лайықты желі болмаса, `Жаңа желі жасау` тармағын таңдаңыз.

1. Жасалған файлдық сақтау қоймасы туралы {linkto(../../../../computing/iaas/instructions/fs-manage/fs-operations#iaas-fs-operations)[text=ақпаратты қараңыз]}.

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

## {heading(2. Демо-қосымшалардың және PV-лардың жұмысқа қабілеттілігін тексеріңіз)[id=mk8s-storage-check]}

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

1. Ingress контроллерінің жария IP-мекенжайын {linkto(../../instructions/addons/advanced-installation/install-advanced-ingress#mk8s-install-advanced-ingress-get-ip)[text=анықтаңыз]}.

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

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=mk8s-storage-delete]}

Жұмыс істеп тұрған кластер тарифтеледі және есептеу ресурстарын тұтынады. Егер тұрақты томдардың жұмысын тексеру үшін жасалған Kubernetes ресурстары сізге енді қажет болмаса, оларды жойыңыз:

1. Манифест файлдарында сипатталған ресурстарды жойыңыз: 

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

   - `tea` қосымшасы пайдаланған диск; 
   - `milkshake` қосымшасы пайдаланған NFS сақтау қоймасы.

   Динамикалық PVC көмегімен жасалған барлық басқа Cinder сақтау қоймалары автоматты түрде жойылады.

{include(/kz/_includes/_delete-test-cluster-short.md)}