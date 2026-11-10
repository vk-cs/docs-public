# {heading(Кластердегі сақтау қоймасы)[id=mk8s-storage]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Kubernetes кластеріндегі деректер бірнеше тәсілмен сақталуы мүмкін: тікелей контейнерде немесе _томдарда_ (volumes). Деректерді контейнерде сақтау кезінде мынадай мәселелер туындайды:

- Контейнер істен шыққанда немесе тоқтағанда, деректер жоғалады.
- Контейнер деректері басқа контейнерлерге қолжетімсіз, тіпті барлық контейнерлер бір {linkto(../../reference/pods#mk8s-pods)[text=подта]} болса да.

Осы мәселелерді шешу үшін Kubernetes томдары қолданылады. Томдардың өмірлік циклі пайдалану сценарийіне байланысты әртүрлі болады:

- _Уақытша томдардың_ (ephemeral volume, EV) өмірлік циклі подтың өмірлік циклімен сәйкес келеді. Мұндай томды пайдаланатын под өмір сүруін тоқтатқанда, том да жойылады. Уақытша томдарды тек бір под қана пайдалана алады, сондықтан томдар тікелей под манифесінде жарияланады.

- _Тұрақты томдардың_ (persistent volume, PV) подтың өмірлік цикліне тәуелді емес өз {linkto(../../reference/pvs-and-pvcs#mk8s-pvs-and-pvcs)[text=өмірлік циклі]} бар. Өмірлік циклдердің бөлінуінің арқасында мұндай томдарды кейін басқа подтармен қайта пайдалануға болады. Тұрақты томдармен жұмыс істеу үшін подтар мен басқа да жүктемелер Persistent Volume Claim (PVC) пайдаланады.

Managed Containers сервисінде ReadWriteMany (RWX) режиміндегі Persistent Volume Claim қолжетімділігі іске асырылмаған. Бұл әртүрлі түйіндердегі бірнеше подтан бір PV-ге бір уақытта деректер жаза алмайтыныңызды білдіреді.

Әртүрлі түйіндердегі бірнеше подтан деректерге ортақ қолжеткізуді ұйымдастыру үшін, {linkto(../../../../computing/iaas/instructions/fs-manage#iaas-fs-manage)[text=бөлек виртуалды машинада NFS серверін өрістетіңіз]}. NFS сервері деректерге желі арқылы ортақ қолжеткізуді қамтамасыз етіп, бірнеше подқа ортақ томдағы деректерді бір уақытта оқуға және жазуға мүмкіндік береді.

PV жұмысын қамтамасыз ету үшін VK Cloud-та Kubernetes кластерлері платформамен тығыз ықпалдастырылған:

- Кластер VK Cloud платформасы ұсынатын сақтау қоймаларын {linkto(#mk8s-storage-supported-storage-types)[text=қолдайды]}. Блоктық сақтау қоймаларын қолдау {linkto(#mk8s-storage-csi)[text=Cinder CSI]} арқылы іске асырылған.
- Кластерде блоктық сақтау қоймасына арналған, {linkto(#mk8s-storage-reclaim-policies)[text=тұрақты томдарды босату саясаттарын]} іске асыратын {linkto(#mk8s-storage-storage-classes)[text=алдын ала бапталған сақтау кластары]} (storage class) қолжетімді.

## {heading(Тұрақты томдарды (PV) басқару)[id=mk8s-storage-pv-disks]}

Managed Containers сервисінде Kubernetes кластерлері үшін жасалған PV-лерді {linkto(../../instructions/manage-pvs#mk8s-manage-pvs)[text=басқаруға]} болады. Мұндай PV-лер VK Cloud платформасы басқаратын {linkto(../cluster-generations#mk8s-cluster-generations-service-projects)[text=сервистік жобада]} орналасады. Кластерді жою немесе көшіру кезінде мұндай PV-лердегі деректерге қолжетімділікті жоғалтпау үшін, оларды сервистік жобадан өз жобаңызға көшіруге болады.

PV-ні көшіруге немесе жоюға оны түйіндер тобына қоспаған жағдайда ғана болады.

## {heading(VK Cloud қолдайтын сақтау қоймаларының түрлері)[id=mk8s-storage-supported-storage-types]}

- Блоктық сақтау қоймалары:

  - [Ceph](https://ceph.io/en/) негізінде. Істен шығуға төзімділікті және деректердің сақталуын қамтамасыз ету үшін сақтау қоймасы әртүрлі сервер сөрелерінде орналасқан үш репликадан тұрады. Сақтау қоймасы SSD дискілерін пайдаланады.

  - Жоғары өнімді [NVMe](https://www.snia.org/education/what-is-nvme) SSD дискілері (High-IOPS SSD) негізінде. Мұндай сақтау қоймасы [iSCSI](https://www.snia.org/education/what-is-iscsi) протоколы арқылы қосылады. Істен шығуға төзімділікті және деректердің сақталуын қамтамасыз ету үшін сақтау қоймасы деңгейінде аппараттық RAID-10 қолданылады.

- [Файлдық сақтау қоймалары](https://www.snia.org/education/what-is-nas), [NFS](https://www.ibm.com/docs/en/aix/7.1?topic=management-network-file-system) және [CIFS](https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview) протоколдары арқылы қосылады.

## {heading(Container Storage Interface (CSI) деп жұмыс істеу)[id=mk8s-storage-csi]}

{var(cloud)} қызметіндегі Kubernetes кластерлері блоктық жадтармен интеграция үшін [OpenStack Cinder](https://docs.openstack.org/cinder/latest/) қолданады.

Kubernetes кластерінде Cinder CSI арқылы қолжетімді жад түрлері {var(cloud)} блоктық жадтарымен мынадай түрде сәйкес келеді:

- Ceph SSD — Cinder-де `ceph-ssd` сәйкес.
- High-IOPS SSD — Cinder-де `high-iops` сәйкес.
- High-IOPS HA SSD — Cinder-де `high-iops-ha` сәйкес.

Cinder CSI қолдану мүмкіндік береді:

- Блоктық жадтар негізінде PV-ді статикалық (static provisioning) және динамикалық (dynamic provisioning) түрде {linkto(../../reference/pvs-and-pvcs#mk8s-pvs-and-pvcs-prepare)[text=дайындауға]}.

  Томды динамикалық дайындау кезінде алдын ала бапталған жад классарын қолдануға болады.

- PV-ді автоматты түрде қайта тіркеу (перемонтирование):

  - Томды қолданатын под сәтсіздікке ұшырағанда немесе под орналасқан worker-торабы істен шыққанда (под осы немесе басқа торапта қалпына келтірілетін жағдайда).
  - Томды қолданатын под бір worker-торабынан екіншісіне көшірілгенде.

- PV қолданатын {var(cloud)} жадын басқару:
  - Том динамикалық түрде дайындалғанда {var(cloud)} қызметінде оған сәйкес диск автоматты түрде жасалады.
  - Том үшін `Delete` босату саясаты орнатылған болса, PVC жойылғаннан кейін онымен байланысты том және {var(cloud)} қызметіндегі сәйкес диск жойылады.

## {heading(Тұрақты томдарды босатудың қолжетімді саясаттары)[id=mk8s-storage-reclaim-policies]}

PV үшін осы томмен байланысты PVC жойылған кезде іске қосылатын {linkto(../../reference/pvs-and-pvcs#mk8s-pvs-and-pvcs-release)[text=босату саясатын]} (reclaim policy) орнатуға болады:

- Томды сақтау (`Retain`). PV және онымен байланысты VK Cloud сақтау қоймасы жойылмайды.

  Бұл саясат блоктық та, файлдық та сақтау қоймаларына қолданылады. Оны маңызды деректері бар PV үшін пайдаланыңыз, осылайша PVC кездейсоқ жойылған кезде деректерді қорғайсыз. Қажет болса, осы саясат орнатылған PV-лерді және олармен байланысты VK Cloud сақтау қоймаларын қолмен тазалап, жоюға болады.

- Томды жою (`Delete`). PV және онымен байланысты VK Cloud сақтау қоймасы жойылады.

  Бұл саясат тек блоктық сақтау қоймаларына қолданылады.

  {note:warn}

  Осы саясатты және оны іске асыратын сақтау кластарын абайлап пайдаланыңыз: PVC жою PV мен осы томға сәйкес келетін дискінің жойылуына әкеледі.

  {/note}

## {heading(Алдын ала бапталған сақтау сыныптары)[id=mk8s-storage-storage-classes]}

Тұрақты томның {linkto(../../reference/pvs-and-pvcs#mk8s-pvs-and-pvcs-prepare)[text=динамалық дайындауын]}} пайдаланған кезде сақтау сыныбын көрсету қажет. Managed Containers қызметінде Kubernetes кластерлері үшін әдепкі сақтау сыныбы бапталмаған. Әдепкі сыныпты өз бетінше таңдауға болады немесе PVC жасаған кезде қажетті сыныпты анық көрсетуге болады.

Managed Containers қызметінде блоктық сақтау құрылғылары үшін Cinder CSI пайдаланатын алдын ала бапталған сақтау сыныптары бар. Олар тұрақты томды динамикалық дайындау кезінде пайдалануға болатын сақтау құрылғыларының әртүрлі түрлерін ұсынады:

- Белгілі бір {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңір]}} үшін қолжетімділік аймағын көрсетумен.
- Кез келген өңір мен қолжетімділік аймағы үшін. Мұндай сақтау сыныптары көпаймақты деп аталады. Олармен жұмыс істеу туралы толығырақ {linkto(../../how-to-guides/multiaz-storage-class#mk8s-multiaz-storage-class)[text=Көпаймақты сақтау сыныптарын пайдалану]} бөлімінде.

Әр сақтау сыныбына тұрақты томдарды босату саясаты сәйкес келеді.

{tabs}

{tab(Өңір: Мәскеу)}

[cols="1,1,1,1", options="header"]
|===

| Сақтау сыныбының атауы
| Cinder CSI сақтау құрылғысының түрі
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

| csi-ceph-ssd-me1                
|`ceph-ssd`
| ME1                 
| Delete

| csi-ceph-ssd-me1-retain         
| `ceph-ssd`
| ME1                 
| Retain

| csi-ceph-ssd-pa2                
| `ceph-ssd`
| PA2                 
| Delete

| csi-ceph-ssd-pa2-retain         
| `ceph-ssd`
| PA2                 
| Retain

| csi-high-iops-gz1               
|`high-iops`
| GZ1                 
| Delete

| csi-high-iops-gz1-retain        
| `high-iops`
| GZ1                 
| Retain

| csi-high-iops-me1               
| `high-iops`
| ME1                 
| Delete

| csi-high-iops-me1-retain        
| `high-iops`
| ME1                 
| Retain

| csi-highops-ha-me1              
| `high-iops-ha`
| ME1                 
| Delete

| csi-highops-ha-me1-retain       
| `high-iops-ha`
| ME1                 
| Retain
|===

Аталған барлық сақтау сыныптары:

- Томның ұлғаюына рұқсат етеді (`allowVolumeExpansion: true`).
- Томның бірден бөлінуі және байланыстырылуын пайдаланады (`volumeBindingMode: Immediate`).

{/tab}

{tab(Кез келген өңір және қолжетімділік аймағы үшін)}

[cols="1,1,1",options="header"]
|===

| Сақтау сыныбының атауы
| Cinder CSI сақтау құрылғысының түрі
| Reclaim Policy

| csi-ceph-ssd                    
| `ceph-ssd`
| Delete

| csi-ceph-ssd-retain             
| `ceph-ssd`
| Retain

| csi-high-iops                   
| `high-iops`
| Delete

| csi-high-iops-retain            
|`high-iops`
| Retain

| csi-highops-ha                  
| `high-iops-ha`
| Delete

| csi-highops-ha-retain           
| `high-iops-ha`
| Retain
|===

Аталған барлық сақтау сыныптары:

- Томның ұлғаюына рұқсат етеді (`allowVolumeExpansion: true`).
- Томды жасау және байланыстыруды сәйкес {linkto(../../reference/pvs-and-pvcs#mk8s-pvs-and-pvcs)[text=PersistentVolumeClaim]} пайдаланатын алғашқы под жасалған сәтке дейін кейінге қалдырады (`volumeBindingMode: WaitForFirstConsumer`).

{/tab}

{/tabs}

## {heading(Сондай-ақ қараңыз)[id=mk8s-storage-see-also]}

- {linkto(../about#mk8s-about)[text=Managed Containers сервисіне шолу]}.
- {linkto(../architecture#mk8s-architecture)[text=Managed Containers сервисінің архитектурасы]}.
- {linkto(../network#mk8s-network)[text=Кластердегі желі]}.