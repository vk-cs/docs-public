# {heading(Кластердегі сақтау қоймасы)[id=k8s-storage]}

{include(/kz/_includes/_translated_by_ai.md)}

Kubernetes кластеріндегі деректер бірнеше тәсілмен сақталуы мүмкін: тікелей контейнерде немесе _томдарда_ (volumes). Деректерді контейнерде сақтау кезінде мынадай мәселелер туындайды:

- Контейнер істен шыққанда немесе тоқтағанда, деректер жоғалады.
- Контейнер деректері басқа контейнерлерге қолжетімсіз, тіпті барлық контейнерлер бір {linkto(../../reference/pods#k8s-pods)[text=подта]} болса да.

Осы мәселелерді шешу үшін Kubernetes томдары қолданылады. Томдардың өмірлік циклі пайдалану сценарийіне байланысты әртүрлі болады:

- _Уақытша томдардың_ (ephemeral volume, EV) өмірлік циклі подтың өмірлік циклімен сәйкес келеді. Мұндай томды пайдаланатын под өмір сүруін тоқтатқанда, том да жойылады. Уақытша томдарды тек бір под қана пайдалана алады, сондықтан томдар тікелей под манифесінде жарияланады.

- _Тұрақты томдардың_ (persistent volume, PV) подтың өмірлік цикліне тәуелді емес өз {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=өмірлік циклі]} бар. Өмірлік циклдердің бөлінуінің арқасында мұндай томдарды кейін басқа подтармен қайта пайдалануға болады. Тұрақты томдармен жұмыс істеу үшін подтар мен басқа да жүктемелер Persistent Volume Claim (PVC) пайдаланады.

Cloud Containers сервисінде ReadWriteMany (RWX) режиміндегі Persistent Volume Claim қолжетімділігі іске асырылмаған. Бұл әртүрлі түйіндердегі бірнеше подтан бір PV-ге бір уақытта деректер жаза алмайтыныңызды білдіреді.

Әртүрлі түйіндердегі бірнеше подтан деректерге ортақ қолжеткізуді ұйымдастыру үшін, {linkto(../../../../computing/iaas/instructions/fs-manage#iaas-fs-manage)[text=бөлек виртуалды машинада NFS серверін өрістетіңіз]}. NFS сервері деректерге желі арқылы ортақ қолжеткізуді қамтамасыз етіп, бірнеше подқа ортақ томдағы деректерді бір уақытта оқуға және жазуға мүмкіндік береді.

PV жұмысын қамтамасыз ету үшін VK Cloud-та Kubernetes кластерлері платформамен тығыз ықпалдастырылған:

- Кластер VK Cloud платформасы ұсынатын сақтау қоймаларын {linkto(#k8s-storage-supported-storage-types)[text=қолдайды]}. Блоктық сақтау қоймаларын қолдау {linkto(#k8s-storage-csi)[text=Cinder CSI]} арқылы іске асырылған.
- Кластерде блоктық сақтау қоймасына арналған, {linkto(#k8s-storage-reclaim-policies)[text=тұрақты томдарды босату саясаттарын]} іске асыратын {linkto(#k8s-storage-storage-classes)[text=алдын ала бапталған сақтау кластары]} (storage class) қолжетімді.

## {heading(Тұрақты томдарды (PV) басқару)[id=k8s-storage-pv-disks]}

Cloud Containers сервисінде Kubernetes {linkto(../cluster-generations#k8s-cluster-generations)[text=екінші буын]} кластерлері үшін жасалған PV-лерді {linkto(../../instructions/manage-pvs#k8s-manage-pvs)[text=басқаруға]} болады. Мұндай PV-лер VK Cloud платформасы басқаратын {linkto(../cluster-generations#k8s-cluster-generations-service-projects)[text=сервистік жобада]} орналасады. Кластерді жою немесе көшіру кезінде мұндай PV-лердегі деректерге қолжетімділікті жоғалтпау үшін, оларды сервистік жобадан өз жобаңызға көшіруге болады.

PV-ні көшіруге немесе жоюға оны түйіндер тобына қоспаған жағдайда ғана болады.

## {heading(VK Cloud қолдайтын сақтау қоймаларының түрлері)[id=k8s-storage-supported-storage-types]}

- Блоктық сақтау қоймалары:

  - [Ceph](https://ceph.io/en/) негізінде. Істен шығуға төзімділікті және деректердің сақталуын қамтамасыз ету үшін сақтау қоймасы әртүрлі сервер сөрелерінде орналасқан үш репликадан тұрады. Сақтау қоймасы SSD дискілерін пайдаланады.

  - Жоғары өнімді [NVMe](https://www.snia.org/education/what-is-nvme) SSD дискілері (High-IOPS SSD) негізінде. Мұндай сақтау қоймасы [iSCSI](https://www.snia.org/education/what-is-iscsi) протоколы арқылы қосылады. Істен шығуға төзімділікті және деректердің сақталуын қамтамасыз ету үшін сақтау қоймасы деңгейінде аппараттық RAID-10 қолданылады.

- [Файлдық сақтау қоймалары](https://www.snia.org/education/what-is-nas), [NFS](https://www.ibm.com/docs/en/aix/7.1?topic=management-network-file-system) және [CIFS](https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview) протоколдары арқылы қосылады.

## {heading(Container Storage Interface (CSI) интерфейсімен жұмыс істеу)[id=k8s-storage-csi]}

VK Cloud-та Kubernetes кластерлері блоктық сақтау қоймаларымен интеграция үшін [OpenStack Cinder](https://docs.openstack.org/cinder/latest/) пайдаланады.

Kubernetes кластерінде Cinder CSI арқылы қолжетімді сақтау қоймаларының түрлері VK Cloud блоктық сақтау қоймаларымен мынадай түрде сәйкестенеді:

- Ceph SSD Cinder-дегі `ceph-ssd` түріне сәйкес келеді.
- High-IOPS SSD Cinder-дегі `high-iops` түріне сәйкес келеді.

Cinder CSI қолдану мыналарға мүмкіндік береді:

- Блоктық сақтау қоймалары негізінде PV-лерді статикалық (static provisioning) және динамикалық (dynamic provisioning) түрде {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs-prepare)[text=дайындауға]}.

  Томды динамикалық дайындау кезінде алдын ала бапталған сақтау кластарын пайдалануға болады.

- PV-лерді автоматты түрде қайта монтаждауға:

  - Томды пайдаланатын под немесе под орналасқан worker-түйін істен шыққанда (под осы немесе басқа түйінде қайта қалпына келтіріледі деген шартпен).
  - Томды пайдаланатын под бір worker-түйіннен екіншісіне көшірілгенде.

- PV пайдаланатын VK Cloud сақтау қоймасын басқаруға:
  - Томды динамикалық дайындау кезінде VK Cloud-та осы томға сәйкес келетін диск автоматты түрде жасалады.
  - Егер том үшін `Delete` босату саясаты орнатылса, онда PVC жойылғаннан кейін онымен байланысты том және осы томға сәйкес VK Cloud-тағы диск жойылады.

## {heading(Тұрақты томдарды босатудың қолжетімді саясаттары)[id=k8s-storage-reclaim-policies]}

PV үшін осы томмен байланысты PVC жойылған кезде іске қосылатын {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs-release)[text=босату саясатын]} (reclaim policy) орнатуға болады:

- Томды сақтау (`Retain`). PV және онымен байланысты VK Cloud сақтау қоймасы жойылмайды.

  Бұл саясат блоктық та, файлдық та сақтау қоймаларына қолданылады. Оны маңызды деректері бар PV үшін пайдаланыңыз, осылайша PVC кездейсоқ жойылған кезде деректерді қорғайсыз. Қажет болса, осы саясат орнатылған PV-лерді және олармен байланысты VK Cloud сақтау қоймаларын қолмен тазалап, жоюға болады.

- Томды жою (`Delete`). PV және онымен байланысты VK Cloud сақтау қоймасы жойылады.

  Бұл саясат тек блоктық сақтау қоймаларына қолданылады.

  {note:warn}

  Осы саясатты және оны іске асыратын сақтау кластарын абайлап пайдаланыңыз: PVC жою PV мен осы томға сәйкес келетін дискінің жойылуына әкеледі.

  {/note}

## {heading(Алдын ала бапталған сақтау кластары)[id=k8s-storage-storage-classes]}

Тұрақты томды {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs-prepare)[text=динамикалық дайындау]} кезінде сақтау класын көрсету қажет. Әдепкі сақтау класы Cloud Containers кластерлерінде бапталмаған. Әдепкі класты өзіңіз таңдай аласыз немесе PVC жасау кезінде қажетті класты нақты көрсете аласыз.

Cloud Containers сервисінде блоктық сақтау қоймалары үшін Cinder CSI пайдаланатын алдын ала бапталған сақтау кластары бар. Олар тұрақты томды динамикалық дайындау кезінде пайдалануға болатын әртүрлі сақтау түрлерін ұсынады:

- Белгілі бір {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңір]} үшін қолжетімділік аймағын көрсете отырып. 
- Кез келген өңір мен қолжетімділік аймағы үшін. Мұндай сақтау кластары мультиаймақтық деп аталады. Мультиаймақтық сақтау кластары тек {linkto(../cluster-generations#k8s-cluster-generations)[text=екінші буын]} кластерлері үшін қолжетімді. Олармен жұмыс істеу туралы толығырақ {linkto(../../how-to-guides/multiaz-storage-class#k8s-multiaz-storage-class)[text=Мультиаймақтық сақтау кластарын пайдалану]} бөлімінде берілген.

Әрбір сақтау класына тұрақты томдарды босатудың өз саясаты сәйкес келеді.

{tabs}

{tab(Өңір: Мәскеу)}

[cols="1,1,1,1", options="header"]
|===

| Сақтау класының атауы
| Cinder CSI сақтау түрі
| Қолжетімділік аймағы
| Reclaim Policy

| csi-ceph-ssd-gz1                
| `ceph-ssd`
| GZ1                 
| Delete

| csi-ceph-ssd-gz1-retain         
| `ceph-ssd`
| GZ1                 
| Retain

| csi-ceph-ssd-ms1                
| `ceph-ssd`
| MS1                 
| Delete

| csi-ceph-ssd-ms1-retain         
| `ceph-ssd`
| MS1                 
| Retain

| csi-ceph-ssd-me1                
|`ceph-ssd`
| ME1                 
| Delete

| csi-ceph-ssd-me1-retain         
| `ceph-ssd`
| ME1                 
| Retain

| csi-ceph-hdd-gz1                
| `ceph-hdd`
| GZ1                 
| Delete

| csi-ceph-hdd-gz1-retain                
| `ceph-hdd`
| GZ1                 
| Retain

| csi-ceph-hdd-me1                
| `ceph-hdd`
| ME1                 
| Delete

| csi-ceph-hdd-me1-retain         
|`ceph-hdd`
| ME1                 
| Retain

| csi-ceph-hdd-ms1                
| `ceph-hdd`
| MS1                 
| Delete

| csi-ceph-hdd-ms1-retain                
| `ceph-hdd`
| MS1                 
| Retain

| csi-high-iops-gz1               
|`high-iops`
| GZ1                 
| Delete

| csi-high-iops-gz1-retain        
| `high-iops`
| GZ1                 
| Retain

| csi-high-iops-ms1               
| `high-iops`
| MS1                 
| Delete

| csi-high-iops-ms1-retain        
| `high-iops`
| MS1                 
| Retain

| csi-high-iops-me1               
| `high-iops`
| ME1                 
| Delete

| csi-high-iops-me1-retain        
| `high-iops`
| ME1                 
| Retain
|===

Жоғарыда аталған барлық сақтау кластары:

- Томды ұлғайтуға рұқсат береді (`allowVolumeExpansion: true`).
- Томды дереу бөлу мен байланыстыруды пайдаланады (`volumeBindingMode: Immediate`).

{/tab}

{tab(Кез келген өңір мен қолжетімділік аймағы үшін)}

[cols="1,1,1",options="header"]
|===

| Сақтау класының атауы
| Cinder CSI сақтау түрі
| Reclaim Policy

| csi-ceph-ssd                    
| `ceph-ssd`
| Delete

| csi-ceph-ssd-retain             
| `ceph-ssd`
| Retain

| csi-ceph-hdd                    
| `ceph-hdd`
| Delete

| csi-ceph-hdd-retain             
| `ceph-hdd`
| Retain

| csi-high-iops                   
| `high-iops`
| Delete

| csi-high-iops-retain            
|`high-iops`
| Retain
|===

Жоғарыда аталған барлық сақтау кластары:

- Томды ұлғайтуға рұқсат береді (`allowVolumeExpansion: true`).
- Тиісті {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=PersistentVolumeClaim]} пайдаланатын бірінші под жасалған сәтке дейін томды жасау мен байланыстыруды кейінге қалдырады (`volumeBindingMode: WaitForFirstConsumer`).

{/tab}

{/tabs}

## {heading(Сондай-ақ қараңыз)[id=k8s-storage-see-also]}

- {linkto(../about#k8s-about)[text=Cloud Containers сервисіне шолу]}.
- {linkto(../architecture#k8s-architecture)[text=Cloud Containers сервисінің архитектурасы]}.
- {linkto(../network#k8s-network)[text=Кластердегі желі]}.
