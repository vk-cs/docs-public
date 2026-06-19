# {heading(Кластер подтары Pending күйінде тым ұзақ болады)[id=k8s-pods-pending]}

{include(/kz/_includes/_translated_by_ai.md)}

Под `Pending` күйінде болады, егер ол әлдеқашан жасалған болса, бірақ әлі іске қосылмаған болса, яғни әлі `Running` күйіне өтпеген болса. Под торапта жұмысын бастау үшін белгілі бір шарттардың орындалуын күтеді, ал бұл шарттар орындалмаса, `Pending` күйінде тұрып қалады.

Мұндай мінез-құлықтың бірнеше себебі болуы мүмкін. Мәселе жойылғанша, бір шешімнен келесісіне кезекпен өтіп, қадамдарды орындаңыз.

{cut(Торапта подты іске қосу үшін ресурстар жеткіліксіз)}

{include(/kz/_includes/_pod_events_diagnostics.md)}

   ```console
   0/3 nodes are available: 1 Insufficient cpu, 2 Insufficient memory
   ```   

   Егер солай болса, кластер торабында подты орналастыру үшін бос ресурстар (CPU және RAM) жеткіліксіз. 

1. Мына пәрмен арқылы торап ресурстары туралы толық ақпаратты қараңыз:

   ```console
   kubectl describe node <ИМЯ_УЗЛА>
   ```

   Пәрмен шығысында:

   - `Capacity` — торапта қолжетімді ресурстардың ең көп мөлшері;
   - `allocatable` — жүйелік қажеттіліктерді ескере отырып, подтарға нақты қолжетімді ресурстар саны;
   - `Allocated resources` — қазірдің өзінде пайдаланылған ресурстар саны;
   - `pods` — торапта бір уақытта іске қосылуы мүмкін подтардың ең көп саны. 

1. Мәселені келесі тәсілдердің бірімен шешіңіз:

   - {linkto(../../instructions/scale#k8s-instructions-scale-vertical-worker-nodes)[text=Іске қосыңыз]} торап топтарын автоматты масштабтауды немесе қолмен {linkto(../../instructions/manage-node-group#k8s-manage-node-group)[text=көбейтіңіз]} топтағы тораптар санын, егер бар тораптар подтарды орналастыру үшін жеткіліксіз болса.
   - Егер торапта қолжетімдіден көбірек ресурс сұралса, под манифесіндегі `resources.requests` блогындағы ресурс сұрауларын түзетіңіз. 

      Ресурстар туралы толығырақ {linkto(../../reference/resource-limiting#k8s-resource-limiting)[text=Ресурстарды пайдалануды шектеу]} бөлімінде және [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/).

{/cut}

{cut(Торапта подтардың ең көп санына жеткен)}

{include(/kz/_includes/_pod_events_diagnostics.md)}

   ```console
   0/3 nodes are available: 3 Insufficient pods
   ```   

   Егер солай болса, торапта бір уақытта іске қосуға болатын подтардың ең көп санына арналған лимитке жеткен.

1. Тораптағы подтарға арналған орын лимитін және осы орындардың қаншасы бос емес екенін мына пәрмен арқылы біліңіз:

   ```console
   kubectl describe node <ИМЯ_УЗЛА> pods
   ```

   Шығыс мысалы: 

   ```console
   pods:               110/110
   ```

1. Мәселені келесі тәсілдердің бірімен шешіңіз:

   - Қажет емес подтарды мына пәрмен арқылы жойыңыз:

      ```console
      kubectl delete pod <ИМЯ_ПОДА> -n <ПРОСТРАНСТВО_ИМЕН>
      ``` 
   - Kubelet үшін конфигурациялық файлдағы `maxPods` параметрінде тораптағы подтар лимитін арттырыңыз. Толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/).
   - Подтарды басқа тораптар арасында қайта таратыңыз. Толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/). 

{/cut}   

{cut(ResourceQuota немесе LimitRange объектілері орнатқан ресурс лимитіне атау кеңістігінде жеткен)}

{include(/kz/_includes/_pod_events_diagnostics.md)}

   ```console
   Forbidden: exceeded quota
   Forbidden: container memory limit exceeds limit range
   ```   

   Егер солай болса, атау кеңістігінде подтар үшін `ResourceQuota` және `LimitRange` объектілері орнатқан ресурс лимитіне жеткен.

1. Подтарға арналған квоталар мен ресурстар шектеулері туралы ақпаратты қараңыз:

   {tabs}

   {tab(ResourceQuota объектісі үшін)}

   Пәрменді орындаңыз:

   ```console
   kubectl get resourcequota -n <ПРОСТРАНСТВО_ИМЕН>
   ```

   Пәрмен шығысында мыналар көрсетіледі:

   - `ResourceQuota` объектісінің атауы;
   - әрбір ресурс түрі бойынша жалпы (`hard`) лимит;
   - қазірдің өзінде пайдаланылған және әлі пайдалануға қолжетімді ресурс саны.

   {/tab}

   {tab(LimitRange объектісі үшін)}

   Пәрменді орындаңыз: 

   ```console
   kubectl get limitrange -n <ПРОСТРАНСТВО_ИМЕН>
   ```

   Пәрмен шығысында мыналар көрсетіледі:

   - `LimitRange` объектісінің атауы;
   - әрбір ресурс түрі үшін ең аз, ең көп және әдепкі мәндер, егер олар берілсе;
   - объектінің өмір сүру уақыты.

   {/tab}

   {/tabs}

1. Мәселені келесі тәсілдердің бірімен шешіңіз:

   - Под манифесіндегі `resources.requests` және `resources.limits` блоктарындағы мәндерді орнатылған квоталар мен шектеулерге сәйкес түзетіңіз. 

      Ресурстар мен шектеулер туралы толығырақ {linkto(../../reference/resource-limiting#k8s-resource-limiting)[text=Ресурстарды пайдалануды шектеу]} бөлімінде және [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/). 
   - `ResourceQuota` объектісінің манифесінде `spec.hard` секциясындағы квоталарды арттырыңыз. 

      Толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/policy/resource-quotas/).
   - Қажет емес `LimitRange` объектілерін жойыңыз немесе `LimitRange` объектісінің манифесінде `spec.limits` секциясындағы мәндерді түзетіңіз. 

      Толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/policy/limit-range/).

{/cut}

{cut(Подта талаптар мен ережелер көрсетілген, бірақ оларға бірде-бір торап сәйкес келмейді)}

{include(/kz/_includes/_pod_events_diagnostics.md)}

   ```console
   0/3 nodes are available: 3 node(s) didn't match node selector.
   0/3 nodes are available: 3 node(s) didn't match pod affinity/anti-affinity rules.
   0/3 nodes are available: 3 node(s) had taint {key=value:NoSchedule}; that no tolerations are applied.
   ```

   Егер солай болса, тораптар торап селекторы (`nodeSelector`), тораптарды орналастыру ережелері (`affinity`) немесе ерекшеліктер (`tolerations`) арқылы берілген жоспарлау ережелеріне сәйкес келмейді.

1. Мәселені келесі тәсілдердің бірімен шешіңіз: 

   - {linkto(../../instructions/manage-node-group#k8s-manage-node-group-labels-taints)[text=Келістіріңіз]} под ережелерін көрсетілген ережелер мен талаптармен.
   - {linkto(../../instructions/manage-node-group#k8s-manage-node-group)[text=Қосыңыз]} көрсетілген талаптарға сәйкес келетін жаңа тораптар тобын.

{/cut}

{cut(Подта тұрақты томмен (PV) немесе PVC-пен мәселелер бар)}

{include(/kz/_includes/_pod_events_diagnostics.md)}

   ```console
   0/3 nodes are available: 1 pod has unbound immediate PersistentVolumeClaims
   0/3 nodes are available: no persistent volumes available for this claim
   ```

   Егер солай болса, подта {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=PV немесе PVC-пен]} мәселелер бар. Осындай мәселелердің мысалдары:

   - PV жоқ болғандықтан немесе ол сәйкес келмегендіктен, PVC PV-ге байланыстырылмаған.
   - Сәйкес PV жоқ немесе `Provisioner` компоненті сәйкес PV жасай алмайды.
   - {linkto(../../concepts/storage#k8s-storage-storage-classes)[text=сақтау класы]} (StorageClass) бапталмаған немесе ол PVC талаптарына сәйкес келмейді. 

1. Мәселені келесі тәсілдердің бірімен шешіңіз:

   - PV-ді қолмен жасаңыз немесе оны {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs-prepare)[text=динамикалық дайындау]} үшін параметрлерді түзетіңіз. Тұрақты томдармен жұмыс істеу туралы толығырақ {linkto(../../how-to-guides/storage#k8s-storage)[text=практикалық нұсқаулықта]} және [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/storage/persistent-volumes/). 
   - PVC үшін сақтау класы бар екеніне және оның көрсетілгеніне, сондай-ақ оның параметрлері PVC талаптарына (диск түрі, қолжетімділік аймағы, өлшемі және тағы басқа) сәйкес келетініне көз жеткізіңіз.

{/cut}

{cut(Подтарда hostPort баптауын пайдалану кезінде қайшылықтар туындайды)}

{include(/kz/_includes/_pod_events_diagnostics.md)}

   ```console
   Failed to create pod sandbox: networkPlugin cni failed
   Failed to allocate host port: address already in use
   ```

   Егер солай болса, бұл `hostPort` баптауын пайдалану мәселелерінен туындайды. Осындай мәселелердің мысалдары: 

   - Бір тораптағы екі под бір `hostPort` пайдалануға тырысады, бұл олардың арасында қайшылық тудырады.
   - `hostPort` ішінде көрсетілген порт тораптағы жүйелік процесс арқылы бос емес. 
   - Торапта бос порттар жоқ (мысалы, тым көп под `hostPort` пайдаланады).

1. Мәселені келесі тәсілдердің бірімен шешіңіз:

   - Подтарды баптауда `hostPort` пайдаланбаңыз, өйткені бұл олардың жұмысын едәуір шектейді (автоматты масштабтау мүмкін емес, трафикті қайта бағыттау, жүктемені теңгеру және тағы басқа мүмкін емес). Оның орнына `LoadBalancer` немесе `NodePort` типтеріндегі [сервистерді](https://kubernetes.io/docs/concepts/services-networking/service/) пайдаланыңыз. 
   - Егер `hostPort` пайдаланудан бас тарту мүмкін болмаса:
      - Репликалар санын 1-ге дейін шектеңіз. Бұл бір торапта тек бір под болуын қамтамасыз етеді, сондықтан порттар бойынша қайшылық болмайды. Толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/).  
      - Егер `hostPort` бар бірнеше репликаны іске қосу қажет болса, [орналастыру ережелерінің](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity) (`affinity` немесе `anti-affinity`) көмегімен әрбір репликаны бөлек торапқа орналастырыңыз.

{/cut}

{cut(Под жоспарлана алмайды, себебі подтарды топология бойынша тарату саясаты бұзылады)}

{include(/kz/_includes/_pod_events_diagnostics.md)}

   ```console
   0/3 nodes are available: 3 node(s) didn't satisfy existing topology spread constraints
   ```

   Егер солай болса, Kubernetes жоспарлаушысы подты ешбір торапқа орналастыра алмайды, себебі [Topology Spread Constraints](https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/) — подтарды топология бойынша тарату саясаты (мысалы, тораптар, аймақтар, қолжетімділік зоналары және тағы басқа бойынша) бұзылады.  

1. Под манифесіндегі `spec.topologySpreadConstraints` блогындағы саясат баптауларын қараңыз.

1. Мәселені келесі тәсілдердің бірімен шешіңіз:

   - `maxSkew` параметрінің мәнін түзетіңіз. Ол бір топологияда басқа топологияға қарағанда едәуір көп под болмауы үшін тораптар арасындағы подтар санының рұқсат етілетін ең жоғары айырмасын анықтайды.

      Мысалы, егер төрт подты екі қолжетімділік зонасына бөлу қажет болса, `maxSkew: 1` мәні кезінде әр зонаға екі подтан орналастырылады (алғашқы қолжетімділік зонасына үш под, ал қалған біреуі екіншісіне емес).

   - Егер подтардың топология бойынша мінсіз емес бөліну кезінде де іске қосылуын қаласаңыз, `whenUnsatisfiable: ScheduleAnyway` параметрін қосыңыз. Сонда под топологиялық шектеулер бұзылса да кез келген қолжетімді торапта жоспарланады (мысалы, қазірдің өзінде тым көп под бар топологияда және `maxSkew` параметрі тағы біреуін қосуға мүмкіндік бермесе).
   - {linkto(../../instructions/manage-node-group#k8s-manage-node-group)[text=Көбейтіңіз]} тораптар санын (оларды бар топқа қосыңыз немесе жаңасын жасаңыз).

{/cut}

{cut(Ресурстарға жоғары қысым кезінде подтың басымдығы төмен)}

{include(/kz/_includes/_pod_events_diagnostics.md)}

   ```console
   Preemption is not possible because the priority of the pod is the lowest
   ```

   Егер солай болса, тораптарда бос ресурстар болмаса, басымдығы төмен подтар іске қосыла алмайды. 

   Подтың басымдығы үшін `PriorityClass` параметрі жауап береді, ол Kubernetes жоспарлаушысына қай подтарды алдымен іске қосу керегін және ресурстар жетіспесе, қайсысын ығыстыруға (preempted) болатынын көрсетеді. Толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/). 

1. Кластерде қандай басымдық деңгейлері бапталғанын мына пәрмен арқылы қараңыз:

   ```console
   kubectl get priorityclass
   ```

   Шығыс мысалы:

   ```text
   NAME               VALUE      GLOBAL-DEFAULT
   ...                ...        ...
   high-priority      20000000   false      
   medium-priority    1000000    true      
   low-priority       100000     false     
   ```

   Мұнда:

   - `NAME` — подтарға арналған басымдық атауы.
   - `VALUE` — басымдықтың сандық мәні. Ол неғұрлым жоғары болса, басымдық та соғұрлым жоғары.  
   - `GLOBAL-DEFAULT` — мәні `true` болса, бұл басымдық басымдығы айқын көрсетілмеген барлық подтар үшін қолданылатынын анықтайтын параметр.

1. Подтың басымдығын мына пәрмен арқылы біліңіз:

   ```console
   kubectl describe pod <ИМЯ_ПОДА> | sed -n '/Priority/,+3p'
   ```

   Подтың басымдығы манифестегі `PriorityClassName` өрісінде беріледі. Егер басымдық көрсетілмесе немесе төмен болып көрсетілсе, ал под жұмыс үшін аса маңызды болса:

      1. Осы под үшін жоғарырақ басымдық көрсетіңіз.
      1. (Опционалды) Фондық міндеттерді орындайтын подтар үшін төменірек басымдық көрсетіп, ресурс сұрауларын азайтыңыз.  

{/cut}

{cut(Подта Docker-образтарға қол жеткізу мәселелері бар)}

{include(/kz/_includes/_pod_events_diagnostics.md)}

   ```console
   Failed to pull image "myrepo/myimage:latest": rpc error: code = Unknown desc = Error response from daemon: manifest for myrepo/myimage:latest not found: manifest unknown: manifest unknown
   Failed to pull image "myrepo/myimage:latest": rpc error: code = Unknown desc = Error response from daemon: unauthorized: authentication required
   Error: ErrImagePull
   Back-off pulling image "myrepo/myimage:latest"
   ```

   Егер солай болса, Kubernetes под үшін қажетті Docker-образды жүктей алмайды. Мұның бірнеше себебі болуы мүмкін. Осындай себептердің мысалдары:

      - Мұндай образ жоқ. 
      - Подтың жалпыға қолжетімді Docker-реестріне қолжетімділігі жоқ.
      - Жекеменшік Docker-реестрлерінен образдарды жүктеуге арналған құпиясөз дұрыс бапталмаған, жоқ немесе ескірген.

1. Мәселені келесі тәсілдердің бірімен шешіңіз:

   {tabs}

   {tab(Жалпыға қолжетімді Docker-реестрі)}

   Манифесте тег пен образ атауы дұрыс көрсетілгеніне көз жеткізіңіз. Ол үшін тиісті Docker-реестрде көрсетілген тегтің бар-жоғын тексеріңіз немесе мына пәрменді пайдаланыңыз:

   ```console
   docker pull <ИМЯ_ОБРАЗА>:<ТЕГ>
   ```

   Егер образ сәтті жүктелсе, тег бар.

   Мүмкін болса, тегтің орнына дайджестіні — `<ХЕШ_ФУНКЦИЯ>:<ИДЕНТИФИКАТОР>` форматындағы образдың нақты құрастырылымының бірегей идентификаторын (хешін) пайдаланыңыз. Бұл образ жаңартылса немесе оның тегі өзгерсе де, дәл осы құрастырылымның әрқашан жүктелуін қамтамасыз етеді. 

   Толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/containers/images/). 

   {/tab}

   {tab(Жекеменшік Docker-реестрі)}

   {linkto(../../connect/docker-registry#k8s-docker-registry-using)[text=Түзетіңіз немесе көрсетіңіз]} манифесте реестрге қол жеткізуге арналған құпиясөзді. 

   {/tab}
   {/tabs}

{/cut}

{cut(Желілік сервистермен (CNI) және деректерді сақтау сервистерімен (CSI) интеграция қателері)}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Кластерге қосылыңыз]} `kubectl` көмегімен.

1. Мына пәрмен арқылы `kube-system` атау кеңістігіндегі кластердің жүйелік подтары туралы ақпаратты шығарыңыз:

   ```console
   kubectl get pods -n kube-system 
   ```

   Егер қандай да бір жүйелік подтар `Pending` күйінде тым ұзақ болса, бұл {linkto(../../concepts/architecture#k8s-architecture-platform-integration)[text=желілік сервистермен (CNI) және деректерді сақтау сервистерімен (CSI) интеграция мәселелеріне]} байланысты болуы мүмкін.

1. `Pending` күйіндегі подтар орналасқан тораптар туралы ақпаратты мына пәрмен арқылы шығарыңыз:

   ```console
   kubectl describe node <ИМЯ_УЗЛА>
   ```

1. `Conditions` блогындағы қателерді қарап, оларды түзетіңіз:

   [cols="1,2a,2a", options="header"]
   |===

   | Қате
   | Сипаттама
   | Қалай түзетуге болады

   | `NetworkUnavailable`
   | Торап желісі қолжетімсіз, себебі {linkto(../../concepts/network#k8s-network-cni)[text=CNI]} жұмысында ақау болған
   | 
   1. Calico CNI-плагині дұрыс бапталғанына және іске қосылғанына көз жеткізіңіз. 
   1. Calico жұмысын қамтамасыз ететін подтарды қалпына келтіріңіз немесе қайта іске қосыңыз

   | `DiskPressure`
   | Торапта дискілік кеңістік жеткіліксіз, сондықтан Kubernetes онда жаңа подтарды іске қоса алмайды
   | [Өлшемін көбейтіңіз](/kz/computing/iaas/instructions/volumes/volumes-manage) дискілердің, дискілік кеңістікті тазалаңыз (мысалы, ескі логтарды және пайдаланылмайтын образдарды жойыңыз)

   | `PIDPressure`
   | Торапта тым көп процесс іске қосылған, сондықтан Kubernetes онда жаңа подтарды іске қоса алмайды
   | Процестер лимитін арттырыңыз, бір уақытта орындалатын процестер санын азайтыңыз. Толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/policy/pid-limiting/)
   |===

{/cut}

Егер мәселе сақталса, [техникалық қолдауға](/kz/contacts) хабарласыңыз.
