# {heading(Кластердегі сақтау қоймасы)[id=k8s-storage]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Kubernetes кластеріндегі деректер бірнеше тәсілмен сақталуы мүмкін: тікелей контейнерде немесе _томдарда_ (volumes). Деректерді контейнерде сақтау кезінде мынадай мәселелер туындайды:

- Контейнер істен шыққанда немесе тоқтағанда, деректер жоғалады.
- Контейнер деректері басқа контейнерлерге қолжетімсіз, тіпті барлық контейнерлер бір {linkto(../../reference/pods#k8s-pods)[text=подта]} болса да.

Осы мәселелерді шешу үшін Kubernetes томдары қолданылады. Томдардың өмірлік циклі пайдалану сценарийіне байланысты әртүрлі болады:

- _Уақытша томдардың_ (ephemeral volume, EV) өмірлік циклі подтың өмірлік циклімен сәйкес келеді. Мұндай томды пайдаланатын под өмір сүруін тоқтатқанда, том да жойылады. Уақытша томдарды тек бір под қана пайдалана алады, сондықтан томдар тікелей под манифесінде жарияланады.

- _Тұрақты томдардың_ (persistent volume, PV) подтың өмірлік цикліне тәуелді емес өз {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=өмірлік циклі]} бар. Өмірлік циклдердің бөлінуінің арқасында мұндай томдарды кейін басқа подтармен қайта пайдалануға болады. Тұрақты томдармен жұмыс істеу үшін подтар мен басқа да жүктемелер Persistent Volume Claim (PVC) пайдаланады.

Managed Containers сервисінде ReadWriteMany (RWX) режиміндегі Persistent Volume Claim қолжетімділігі іске асырылмаған. Бұл әртүрлі түйіндердегі бірнеше подтан бір PV-ге бір уақытта деректер жаза алмайтыныңызды білдіреді.

Әртүрлі түйіндердегі бірнеше подтан деректерге ортақ қолжеткізуді ұйымдастыру үшін, {linkto(../../../../computing/iaas/instructions/fs-manage#iaas-fs-manage)[text=бөлек виртуалды машинада NFS серверін өрістетіңіз]}. NFS сервері деректерге желі арқылы ортақ қолжеткізуді қамтамасыз етіп, бірнеше подқа ортақ томдағы деректерді бір уақытта оқуға және жазуға мүмкіндік береді.

PV жұмысын қамтамасыз ету үшін VK Cloud-та Kubernetes кластерлері платформамен тығыз ықпалдастырылған:

- Кластер VK Cloud платформасы ұсынатын сақтау қоймаларын {linkto(#k8s-storage-supported-storage-types)[text=қолдайды]}. Блоктық сақтау қоймаларын қолдау {linkto(#k8s-storage-csi)[text=Cinder CSI]} арқылы іске асырылған.
- Кластерде блоктық сақтау қоймасына арналған, {linkto(#k8s-storage-reclaim-policies)[text=тұрақты томдарды босату саясаттарын]} іске асыратын {linkto(#k8s-storage-storage-classes)[text=алдын ала бапталған сақтау кластары]} (storage class) қолжетімді.

PV-ні көшіруге немесе жоюға оны түйіндер тобына қоспаған жағдайда ғана болады.

## {heading(VK Cloud қолдайтын сақтау қоймаларының түрлері)[id=k8s-storage-supported-storage-types]}

- Блоктық сақтау қоймалары:

  - [Ceph](https://ceph.io/en/) негізінде. Істен шығуға төзімділікті және деректердің сақталуын қамтамасыз ету үшін сақтау қоймасы әртүрлі сервер сөрелерінде орналасқан үш репликадан тұрады. Сақтау қоймасы SSD дискілерін пайдаланады.

  - Жоғары өнімді [NVMe](https://www.snia.org/education/what-is-nvme) SSD дискілері (High-IOPS SSD) негізінде. Мұндай сақтау қоймасы [iSCSI](https://www.snia.org/education/what-is-iscsi) протоколы арқылы қосылады. Істен шығуға төзімділікті және деректердің сақталуын қамтамасыз ету үшін сақтау қоймасы деңгейінде аппараттық RAID-10 қолданылады.

- [Файлдық сақтау қоймалары](https://www.snia.org/education/what-is-nas), [NFS](https://www.ibm.com/docs/en/aix/7.1?topic=management-network-file-system) және [CIFS](https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview) протоколдары арқылы қосылады.

## {heading(Контейнерлік сақтау интерфейсімен (CSI) жұмыс істеу)[id=k8s-storage-csi]}

{var(cloud)} қызметіндегі Kubernetes кластерлері блоктық сақтау орнымен интеграция үшін [OpenStack Cinder](https://docs.openstack.org/cinder/latest/) қызметін пайдаланады.

Cinder CSI арқылы Kubernetes кластерында қолжетімді сақтау түрлері {var(cloud)} блоктық сақтау орындарымен мынадай түрде сәйкес келеді:

- Ceph SSD — Cinder-дегі `ceph-ssd` сақтау орнына сәйкес.
- High-IOPS SSD — Cinder-дегі `high-iops` сақтау орнына сәйкес.
- High-IOPS HA SSD — Cinder-дегі `high-iops-ha` сақтау орнына сәйкес.

Cinder CSI қолдану мүмкіндік береді:

- Блоктық сақтау орындарының негізінде PV-ді статикалық (static provisioning) және динамикалық (dynamic provisioning) тәсілмен {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs-prepare)[text=дайындауға]}.

  Томды динамикалық дайындау кезінде алдын ала бапталған сақтау класстарын пайдалануға болады.

- PV-ді автоматты түрде қайта тіркеуге (перемонтировать):

  - Томды пайдаланатын под сәтсіздікке ұшырағанда немесе под орналасқан worker-торапы істен шыққанда (под осы немесе басқа торапта қалпына келтірілетін жағдайда).
  - Томды пайдаланатын под бір worker-торабынан екіншісіне көшірілгенде.

- PV пайдаланатын {var(cloud)} сақтау орнын басқаруға:
  - Том динамикалық дайындалған кезде {var(cloud)} қызметінде осы томға сәйкес диск автоматты түрде жасалады.
  - Егер том үшін `Delete` босату саясаты орнатылса, PVC жойылғаннан кейін оған байланысты том және {var(cloud)} қызметіндегі осы томға сәйкес диск жойылады.

## {heading(Тұрақты томдарды босатудың қолжетімді саясаттары)[id=k8s-storage-reclaim-policies]}

PV үшін осы томмен байланысты PVC жойылған кезде іске қосылатын {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs-release)[text=босату саясатын]} (reclaim policy) орнатуға болады:

- Томды сақтау (`Retain`). PV және онымен байланысты VK Cloud сақтау қоймасы жойылмайды.

  Бұл саясат блоктық та, файлдық та сақтау қоймаларына қолданылады. Оны маңызды деректері бар PV үшін пайдаланыңыз, осылайша PVC кездейсоқ жойылған кезде деректерді қорғайсыз. Қажет болса, осы саясат орнатылған PV-лерді және олармен байланысты VK Cloud сақтау қоймаларын қолмен тазалап, жоюға болады.

- Томды жою (`Delete`). PV және онымен байланысты VK Cloud сақтау қоймасы жойылады.

  Бұл саясат тек блоктық сақтау қоймаларына қолданылады.

  {note:warn}

  Осы саясатты және оны іске асыратын сақтау кластарын абайлап пайдаланыңыз: PVC жою PV мен осы томға сәйкес келетін дискінің жойылуына әкеледі.

  {/note}

## {heading(Алдын ала бапталған сақтау сыныптары)[id=k8s-storage-storage-classes]}

Тұрақты томды {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs-prepare)[text=динамалық дайындауды]} пайдаланған кезде сақтау сыныбын көрсету қажет. Әдепкі сақтау сыныбы Managed Containers кластерлерінде бапталмаған. Әдепкі сыныпты өзіңіз таңдай аласыз немесе PVC жасаған кезде қажетті сыныпты тікелей көрсетесіз.

Managed Containers қызметінде блоктық сақтау орнына арналған Cinder CSI қолданатын алдын ала бапталған сақтау сыныптары бар. Олар белгілі бір {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймақ]} үшін қолжетімділік аймағын көрсете отырып, тұрақты томды динамалық дайындау кезінде пайдалануға болатын әртүрлі сақтау орны түрлерін ұсынады.

Әр сақтау сыныбына тұрақты томдарды босату саясаты сәйкес келеді.

{tabs}

{tab(Аймақ: Мәскеу)}

[cols="1,1,1,1", options="header"]
|===

| Сақтау сыныбының атауы
| Cinder CSI сақтау орнының түрі
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
|`ceph-ssd`
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

| csi-high-iops-pa2               
| `high-iops`
| PA2                 
| Delete

| csi-high-iops-pa2-retain        
| `high-iops`
| PA2              
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

Тізімделген барлық сақтау сыныптары:

- Томның ұлғаюына рұқсат береді (`allowVolumeExpansion: true`).
- Томды бірден бөліп беру және байланыстыруды қолданады (`volumeBindingMode: Immediate`).

{/tab}

{/tabs}

## {heading(Сондай-ақ қараңыз)[id=k8s-storage-see-also]}

- {linkto(../about#k8s-about)[text=Managed Containers сервисіне шолу]}.
- {linkto(../architecture#k8s-architecture)[text=Managed Containers сервисінің архитектурасы]}.
- {linkto(../network#k8s-network)[text=Кластердегі желі]}.