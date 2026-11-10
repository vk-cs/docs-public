# {heading(Квоталар және шектер)[id=tools-account-concepts-quotasandlimits]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(Квоталар)[id=account-quotasandlimits-quotas]}

Квоталар — жобаға қолданылатын шектеулер:

- платформаның виртуалды есептеу ресурстарын пайдалану бойынша;
- нақты сервистерде нысандар жасау бойынша.

Мысалы, қолжетімді квоталарды тексеру жаңа виртуалды машинаны (ВМ) жасағанда жүргізіледі. Егер квоталар тағы бір ВМ жасауға мүмкіндік берсе және оны жасауға ресурстар (vCPU, жад және диск кеңістігі) жеткілікті болса, ВМ сәтті жасалады.

Квоталар бір иеленушінің бірнеше жобасы арасында бөлінбейді және бір жоба екінші жобадан мұра етпейді.

{ifdef(public)}
Квоталар тізімі әртүрлі {linkto(../regions#tools-account-concepts-regions)[text=өңірлер]} үшін әртүрлі болады.

Сервистерді белсендіргеннен кейін жобаға базалық квоталар қолжетімді болады. Олар үшін өңірдің барлық жаңа жобаларына қолданылатын әдепкі мәндер белгіленген.

Квоталарды {linkto(../../instructions/project-settings/manage#project-view-quotas)[text=көруге]} болады:

- қысқаша тізім — жеке кабинетте;
- кеңейтілген тізім — OpenStack CLI арқылы.

Ешбір тәсілмен көруге болмайтын жасырын квоталар бар, олар жаңа нысан жасауға әрекет жасағанда қате туралы хабарламалар түрінде көрінеді. Жасырын квотаның мысалы — бір пайдаланушы жасай алатын {linkto(#quotasandlimits-general)[text=жобалар санының квотасы]}.

Квоталар {linkto(#quotasandlimits-tech-limits)[text=техникалық шектермен]} тығыз байланысты.

## {heading(Техникалық шектер)[id=account-quotasandlimits-tech-limits]}

Техникалық шектер — {var(cloud)} архитектурасының ерекшеліктеріне байланысты асқылуға болмайтын шектеулер.

Басқа шектер физикалық шектеулермен байланыссыз және сервистердің пайдалану талаптарына негізделеді. Мысалы, желілердің оңтайлы өнімділігі мен олардың тұрақты жұмысын қамтамасыз ету үшін {linkto(#quotasandlimits-nets)[text=желілік шектеулер]} енгізіледі.

Кейбір техникалық шектерге сәйкес квоталар жоқ.

## {heading(Квоталар мен шектерді арттыру)[id=account-quotasandlimits-increase]}

Квоталарды техникалық шектер шегінде {linkto(../../instructions/project-settings/manage#project-increase-quota)[text=арттыруға]} болады. Әдепкі бойынша квоталарды арттыру менеджермен электрондық пошта арқылы [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru) келісуді қажет етеді, бірақ мына міндетті шарттар орындалғанда жаңа жоба үшін базалық деңгей шегін арттыруға немесе квоталардың ағымдағы мәнінен 30%-ға дейін автоматты түрде қосуға болады:

{tabs}

{tab(Жылдам арттыру)}

{include(/kz/_includes/_quotas.md)[tags=fastquota-conditions]}

{/tab}

{tab(Автоматты арттыру)}

{include(/kz/_includes/_quotas.md)[tags=autoquota-conditions]}

{/tab}

{/tabs}

Қатаң емес шектерден асқанға болады — сол сияқты менеджер арқылы немесе өз бетінше. Дегенмен, осы шектерден асу тұрақты жұмысқа теріс әсер етуі мүмкін.

Төменде Мәскеу өңірі үшін жалпы квоталар мен шектердің тізімі келтірілген. {var(cloud)} сервистерінің квоталары мен шектері туралы толығырақ — нақты сервистің **Квоталар және шектер** бөлімінде.

## {heading(Жалпы квоталар мен шектер)[id=quotasandlimits-general]}

[cols="2,1,1,1,1", options="header"]
|===
| Параметр
| Квота
| Базалық квота
| Шек
| Қатаң

| Пайдаланушыдағы жобалар саны
| ![](../../../../assets/no.svg "inline")
| 5 дана
| 100 дана
| ![](../../../../assets/check.svg "inline")

| Жобадағы әкімшілер саны
| ![](../../../../assets/no.svg "inline")
| 50 адам
| 50 адам
| ![](../../../../assets/check.svg "inline")

| SSH кілттер жұптарының саны
| CLI-дегі `key-pairs`
| 100 кілт жұбы
| шектелмеген
| ![](../../../../assets/no.svg "inline")
|===

{include(/kz/_includes/_quotasandlimits_vm.md)}

## {heading(Managed Containers (Kubernetes контейнерлері))[id=quotasandlimits-k8s]}

{include(/kz/_includes/_quotasandlimits.md)[tags=k8s; level=+1]}

| Жобадағы инстанстар саны
| **Виртуалды машиналар**
|`instances`
| 15 дана
| 1000 дана
| ![](/kz/assets/no.svg "inline")

Осы бөлімдегі шектер пайдалану талаптарына байланысты, олар желілердің тұрақты жұмысын қамтамасыз ету үшін қолданылады. Сәйкес шектерден асатын квоталарды менеджер арқылы сұрау ұсынылмайды.

{include(/kz/_includes/_quotasandlimits.md)[tags=nets1,nets2,nets3; level=+1]}

## {heading(Cloud Backup)[id=quotasandlimits-backup]}

{include(/kz/_includes/_quotasandlimits.md)[tags=backup]}

{/ifdef}

## {heading({var(s3)})[id=quotasandlimits-s3]}

{/note}

#### {heading(Квотасыз лимиттер)[id=quotasandlimits-vm-no-quotas-limits]}

[cols="3,1,1", options="header"]
|===
|Параметр
|Лимит
|Қатаң

|Бір инстанстағы vCPU саны
|32 дана
|![](../../../../assets/no.svg "inline")

|Бір инстанстағы High-Freq vCPU саны
|24 дана
|![](../../../../assets/no.svg "inline")

|Бір инстанстағы GPU саны
|4 дана

([Tesla H200](/kz/computing/gpu/concepts/about#gpu-about-flavors) үшін 8 дана)
|![](../../../../assets/check.svg "inline")

|Бір инстанстағы RAM көлемі
|1024 ГБ
|![](../../../../assets/no.svg "inline")

|===

Процессорлар (vCPU және High-Freq vCPU) саны мен жедел жад лимиттері стандартты гипервизорлардың шектеулерімен байланысты. Егер сізге көбірек vCPU немесе High-Freq vCPU қажет болса, [техникалық қолдауға](/kz/contacts) хабарласып, қажетті сипаттамалары бар бөлінген гипервизорға тапсырыс беріңіз.

Бір инстанс үшін GPU лимиті KVM технологиясының шектеуімен байланысты, ол бір виртуалды машинаға көбірек видеокарта қосуды мүмкін етпейді.

### {heading(Managed Containers (Kubernetes контейнерлері))[id=quotasandlimits-k8s]}

#### {heading(Бір жобаға арналған контейнер ресурстары)[id=quotasandlimits-k8s-one-project]}

[cols="2,2,1,1", options="header"]
|===
| Параметр
| Жеке кабинеттегі квота
| Базалық квота
| Лимит

| Kubernetes кластерлерінің саны
| **Kubernetes кластерлері**
| 2 дана
| шектелмеген

| [түйіндер](/kz/kubernetes/mk8s/concepts/architecture#mk8s-architecture-topology) саны
| **Kubernetes түйіндері**
| 10 дана
| шектелмеген

| worker-түйіндер топтарының саны
| **Kubernetes түйіндер топтары**
| 10 дана
| шектелмеген

| Барлық түйіндердегі vCPU саны
| **Kubernetes vCPU**
| 20 дана
| шектелмеген

| Барлық түйіндердегі жедел жадтың жалпы көлемі
| **Kubernetes RAM**
| 64 ГБ
| шектелмеген

| Барлық түйіндердегі дисктер саны
| **Kubernetes дисктері**
| 30 дана
| шектелмеген

| Барлық түйіндер дисктерінің жалпы көлемі
| **Kubernetes дисктер өлшемі**
| 200 ГБ
| шектелмеген

|===

#### {heading(Квотасыз лимиттер)[id=quotasandlimits-k8s-no-quotas-limits]}

Жоғарыда көрсетілген квоталардан бөлек, Managed Containers сервисін пайдалану да белгілі бір техникалық лимиттермен шектеледі.

[cols="3,1,1", options="header"]
|===
|Параметр
|Лимит
|Қатаң
|Kubernetes кластері мен түйіндер тобы атауының ұзындығы
|24 таңба
|![](/kz/assets/check.svg "inline")

|Топтағы түйіндер саны
|500 дана
|![](/kz/assets/check.svg "inline")

|Кластердегі master-түйіндер саны
|1, 3 немесе 5 дана
|![](/kz/assets/check.svg "inline")

|Бір [қолжетімділік аймағындағы](/kz/start/concepts/architecture#architecture-az) түйіндер саны
|200 дана
|![](/kz/assets/no.svg "inline")

|Кластердегі түйіндер топтарының саны
|50 дана
|![](/kz/assets/no.svg "inline")

|Кластердегі [подтар](/kz/kubernetes/mk8s/reference/pods) саны
|50000 дана
|![](/kz/assets/no.svg "inline")

|Түйіндегі подтар саны
|110 дана
|![](/kz/assets/no.svg "inline")

|Кластердегі сервистер саны
|5000 дана
|![](/kz/assets/no.svg "inline")

|Кластердегі атаулар кеңістіктерінің саны
|5000 дана
|![](/kz/assets/no.svg "inline")

|Кластердегі объектілер саны
|100000 дана
|![](/kz/assets/no.svg "inline")

|[etcd](https://etcd.io/) базасының көлемі
|6 ГБ
|![](/kz/assets/no.svg "inline")

|Бір типтегі ресурстардың көлемі
|800 МБ
|![](/kz/assets/no.svg "inline")
|===

Қатаң емес лимиттерді техникалық қолдауға жүгінбей-ақ асыруға болады. Осы және басқа параметрлер бойынша ұсынымдар [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/setup/best-practices/cluster-large/) берілген. Түйіндер тобындағы түйіндер санына арналған лимит Kubernetes талаптарына байланысты емес, шектеу {var(cloud)} деңгейінде енгізіледі.

### {heading(Дисктер мен образдар)[id=quotasandlimits-images-volumes]}

#### {heading(Дисктер көлемі)[id=quotasandlimits-images-volumes-size]}

[cols="3,2,2,1,1,1", options="header"]
|===
| Параметр
| Жеке кабинеттегі квота
| CLI-дегі квота
| Базалық квота
| Ұлғайтылған квота
| Лимит

| Жобадағы дисктердің жалпы көлемі
| **Дисктер өлшемі**
| `gigabytes`
| 400 ГБ
| 1024 ГБ
| шектелмеген

| High-IOPS SSD дисктерінің жалпы көлемі
| **High-IOPS SSD өлшемі**
| `gigabytes_high-iops`
| 400 ГБ
| 1024 ГБ
| шектелмеген

| High-IOPS HA SSD дисктерінің жалпы көлемі
| **High-IOPS HA SSD өлшемі**
| `gigabytes_high-iops-ha`
| 400 ГБ
| 1024 ГБ
| шектелмеген

| [қолжетімділік аймағындағы](/kz/start/concepts/architecture#architecture-az) GZ1 (legacy) High-IOPS SSD дисктерінің жалпы көлемі
| **Аймақтағы High-IOPS SSD өлшемі - (DP1)**
| `gigabytes_dp1-high-iops`
| 400 ГБ
| 1024 ГБ
| шектелмеген

| [қолжетімділік аймағындағы](/kz/start/concepts/architecture#architecture-az) MS1 (legacy) High-IOPS SSD дисктерінің жалпы көлемі
| **Москва аймағындағы High-IOPS SSD өлшемі (MS1) (MS1)**
| `gigabytes_ko1-high-iops`
| 400 ГБ
| 1024 ГБ
| шектелмеген

|===

Low Latency NVMe дисктерінің жалпы көлемі квоталанбайды және лимиттермен шектелмейді.

Жобадағы дисктердің жалпы көлеміне арналған квоталар дисктердің барлық түрлерін, соның ішінде High-IOPS SSD-ті де ескереді. High-IOPS SSD дисктерінің жалпы көлеміне арналған квоталар екі қолжетімділік аймағында жасалған дисктерді ескереді. Егер басқа квотаға кіретін квотаны [ұлғайтуды сұрасаңыз](/kz/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota), жоғары деңгейдегі квота пропорционалды түрде ұлғайтылады.

#### {heading(Дисктер саны)[id=quotasandlimits-images-volumes-number]}

[cols="3,2,2,1,1", options="header"]
|===
| Параметр
| Жеке кабинеттегі квота
| CLI-дегі квота
| Базалық квота
| Лимит

| Жобадағы дисктер саны
| **Дисктер**
| `volumes`
| 60 дана
| шектелмеген

| Жобадағы High-IOPS SSD дисктерінің саны
| **High-IOPS SSD дисктері**
| `volumes_high-iops`
| 60 дана
| шектелмеген

| Жобадағы High-IOPS HA SSD дисктерінің саны
| **High-IOPS HA SSD дисктері**
| `volumes_high-iops-ha`
| 60 дана
| шектелмеген

| [қолжетімділік аймағындағы](/kz/start/concepts/architecture#architecture-az) GZ1 (legacy) High-IOPS SSD дисктерінің саны
| **Аймақтағы High-IOPS SSD дисктері - (DP1)**
| `volumes_dp1-high-iops`
| 32 дана
| шектелмеген

| [қолжетімділік аймағындағы](/kz/start/concepts/architecture#architecture-az) MS1 (legacy) High-IOPS SSD дисктерінің саны
| **Москва аймағындағы High-IOPS SSD дисктері (MS1) (MS1)**
| `volumes_ko1-high-iops`
| 32 дана
| шектелмеген

|===

Low Latency NVMe дисктерінің саны квоталанбайды және лимиттермен шектелмейді.

Жобадағы дисктердің жалпы санына арналған квоталар дисктердің барлық түрлерін, соның ішінде High-IOPS SSD-ті де ескереді. High-IOPS SSD дисктерінің жалпы санына арналған квоталар екі қолжетімділік аймағында жасалған дисктерді ескереді. Егер басқа квотаға кіретін квотаны [ұлғайтуды сұрасаңыз](/kz/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota), жоғары деңгейдегі квота пропорционалды түрде ұлғайтылады.

#### {heading(Квотасыз лимиттер)[id=quotasandlimits-images-volumes-no-quotas-limits]}

[cols="2,2,3,1", options="header"]
|===
|Параметр
|Лимит
|Түсініктеме
|Қатаң

|Бір инстанстағы дисктер саны
|25 дана, егер конфигурациялық диск қосылған болса.

26 дана, егер конфигурациялық диск өшірілген болса
|Лимит PCI шинасының шектеулерімен байланысты.

Егер [виртуалды машинаны жасау](/kz/computing/iaas/instructions/vm/vm-create) кезінде жеке кабинетте **Конфигурациялық дискіні пайдалану** опциясы қосылған болса немесе OpenStack CLI-де `--use-config-drive` параметрі пайдаланылса, онда дисктердің ең көп саны — 25 дана. Конфигурациялық дискіні [DHCP-сервері](/kz/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-network-addressing) жоқ желілерде пайдаланыңыз.

Егер **Конфигурациялық дискіні пайдалану** опциясы өшірілген болса немесе `--use-config-drive` параметрі қолданылмаса, онда дисктердің ең көп саны — 26 дана
|![](/kz/assets/check.svg "inline")

|Бір HDD дискінің өлшемі
|5 ТБ жеке кабинет арқылы
(Орнатылған [антифрод-шектеулер](/kz/intro/it-security/platform-security#it-security-platform-security-attacks-countering) кезінде 1 ТБ).

100 ТБ OpenStack CLI көмегімен
|Кейбір {var(cloud)} сервистерінде диск өлшеміне жеке шектеулер орнатылуы мүмкін.

[Антифрод-шектеулер](/kz/intro/it-security/platform-security#it-security-platform-security-attacks-countering) алып тастау үшін [техникалық қолдауға](/kz/contacts) жүгінуге болады
|![](/kz/assets/check.svg "inline")

|Бір SSD дискінің өлшемі
|5 ТБ жеке кабинет арқылы
(Орнатылған [антифрод-шектеулер](/kz/intro/it-security/platform-security#it-security-platform-security-attacks-countering) кезінде 1 ТБ).

100 ТБ OpenStack CLI көмегімен
|Кейбір {var(cloud)} сервистерінде диск өлшеміне жеке шектеулер орнатылуы мүмкін.

[Антифрод-шектеулер](/kz/intro/it-security/platform-security#it-security-platform-security-attacks-countering) алып тастау үшін [техникалық қолдауға](/kz/contacts) жүгінуге болады
|![](/kz/assets/check.svg "inline")

|Бір High-IOPS SSD дискінің өлшемі
|2 ТБ жеке кабинет арқылы
(Орнатылған [антифрод-шектеулер](/kz/intro/it-security/platform-security#it-security-platform-security-attacks-countering) кезінде 1 ТБ).

10 ТБ OpenStack CLI көмегімен
|Лимиттен (10 ТБ) асатын етіп жасалған диск өнімділігі жағынан еш айырмашылығы жоқ, бірақ мұндай дискіні қалпына келтіру немесе көшіру едәуір уақыт алады және тәуекелдермен байланысты болады. Лимитті [техникалық қолдауға](/kz/contacts) хабарласу арқылы асыруға болады.

[Антифрод-шектеулер](/kz/intro/it-security/platform-security#it-security-platform-security-attacks-countering) алып тастау үшін [техникалық қолдауға](/kz/contacts) жүгінуге болады.

Кейбір {var(cloud)} сервистерінде диск өлшеміне жеке шектеулер орнатылуы мүмкін
|![](/kz/assets/no.svg "inline")

|Бір High-IOPS HA SSD дискінің өлшемі
|2 ТБ жеке кабинет арқылы
(Орнатылған [антифрод-шектеулер](/kz/intro/it-security/platform-security#it-security-platform-security-attacks-countering) кезінде 1 ТБ).

10 ТБ OpenStack CLI көмегімен
|Лимиттен (10 ТБ) асатын етіп жасалған диск өнімділігі жағынан еш айырмашылығы жоқ, бірақ мұндай дискіні қалпына келтіру немесе көшіру едәуір уақыт алады және тәуекелдермен байланысты болады. Лимитті [техникалық қолдауға](/kz/contacts) хабарласу арқылы асыруға болады.

[Антифрод-шектеулер](/kz/intro/it-security/platform-security#it-security-platform-security-attacks-countering) алып тастау үшін [техникалық қолдауға](/kz/contacts) жүгінуге болады.

Кейбір {var(cloud)} сервистерінде диск өлшеміне жеке шектеулер орнатылуы мүмкін
|![](/kz/assets/no.svg "inline")

|Бір Low Latency NVMe дискінің өлшемі
|2 ТБ жеке кабинет арқылы
(Орнатылған [антифрод-шектеулер](/kz/intro/it-security/platform-security#it-security-platform-security-attacks-countering) кезінде 1 ТБ).

10 ТБ OpenStack CLI көмегімен
|Лимитті (10 ТБ) [техникалық қолдауға](/kz/contacts) хабарласу арқылы асыруға болады.

[Антифрод-шектеулер](/kz/intro/it-security/platform-security#it-security-platform-security-attacks-countering) алып тастау үшін [техникалық қолдауға](/kz/contacts) жүгінуге болады.

Кейбір {var(cloud)} сервистерінде диск өлшеміне жеке шектеулер орнатылуы мүмкін
|![](/kz/assets/no.svg "inline")

|Бір образдың өлшемі
|100 ГБ жеке кабинет арқылы.

 500 ГБ OpenStack CLI көмегімен
|Лимит Glance сервисі үшін қатаң болып табылады.

Егер сізге көлемі үлкенірек образды жүктеу қажет болса, [нұсқаулықты](/kz/storage/s3/how-to-guides/load-large-image) пайдаланыңыз
|![](/kz/assets/no.svg "inline")

|Образдардың жалпы көлемі
|2 ТБ
|Лимитті [техникалық қолдауға](/kz/contacts) хабарласу арқылы асыруға болады
|![](/kz/assets/no.svg "inline")

|Диск снапшоттарының жалпы саны
|200 дана
|Лимитті [техникалық қолдауға](/kz/contacts) хабарласу арқылы асыруға болады
|![](/kz/assets/no.svg "inline")
|===

### {heading(Файлдық қоймалар)[id=quotasandlimits-fs]}

[cols="3,2,1,1,1", options="header"]
|===
| Параметр
| Жеке кабинеттегі квота
| Базалық квота
| Лимит
| Қатаң

| Жобадағы файлдық қоймалар саны
| **NFS/CIFS файлдық қоймалары**
| 15 дана
| шектелмеген
| ![](/kz/assets/no.svg "inline")

| Жобадағы барлық файлдық қоймалардың жалпы көлемі
| **NFS/CIFS файлдық қоймаларының өлшемі**
| 500 ГБ
| шектелмеген
| ![](/kz/assets/no.svg "inline")

| Жобадағы файлдық қойма снапшоттарының жалпы көлемі
| **NFS/CIFS файлдық қоймалары снапшоттарының өлшемі**
| 500 ГБ
| шектелмеген
| ![](/kz/assets/no.svg "inline")

| Файлдық қоймалар желілерінің саны
| **NFS/CIFS файлдық қоймаларының желілері**
| 5 дана
| шектелмеген
| ![](/kz/assets/no.svg "inline")

| Бір файлдық қойманың өлшемі
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| 50 ТБ
| ![](/kz/assets/check.svg "inline")

|===

Файлдық қоймалар желілерінің санына арналған квота (**NFS/CIFS файлдық қоймаларының желілері**) ішкі пайдалану үшін арналған квота болып табылады.

### {heading(Желілер)[id=quotasandlimits-nets]}

Бұл бөлімдегі лимиттер пайдалану талаптарына байланысты, олар желілердің тұрақты жұмысын қамтамасыз ету үшін қолданылады. Тиісті лимиттерден асатын квоталарды [техникалық қолдау](/kz/contacts) арқылы сұрату ұсынылмайды.

#### {heading(Желілер, ішкі желілер және IP-адрестер)[id=quotasandlimits-nets-subnets-ips]}

{tabs}

{tab(Sprut)}

[cols="3,2,2,1,1,1", options="header"]
|===
| Параметр
| Жеке кабинеттегі квота
| CLI-дегі квота
| Базалық квота
| Лимит
| Қатаң

| Жобадағы желілер саны
| **Sprut желілері**
| `network`
| 50 дана
| 50 дана
| ![](/kz/assets/no.svg "inline")

| Жобадағы ішкі желілер саны
| **Sprut ішкі желілері**
| `subnet`
| 50 дана
| 50 дана
| ![](/kz/assets/no.svg "inline")

| Floating IP-адрестер саны
| **Sprut IP-адрестері**
| `floatingip`
| 0 дана
| 50 дана
| ![](/kz/assets/no.svg "inline")

|===

{/tab}

{tab(Neutron)}

[cols="3,2,2,1,1,1", options="header"]
|===
| Параметр
| Жеке кабинеттегі квота
| CLI-дегі квота
| Базалық квота
| Лимит
| Қатаң

| Жобадағы желілер саны
| **Neutron желілері**
| `network`
| 15 дана
| 20 дана
| ![](/kz/assets/no.svg "inline")

| Жобадағы ішкі желілер саны
| **Neutron ішкі желілері**
| `subnet`
| 15 дана
| 20 дана
| ![](/kz/assets/no.svg "inline")

| Floating IP-адрестер саны
| **Neutron IP-адрестері**
| `floatingip`
| 6 дана
| 50 дана
| ![](/kz/assets/no.svg "inline")

|===

{/tab}

{/tabs}

Жобадағы ішкі желілердің жалпы санына арналған квота ұлғайтылған болса да, бір желіде 20-дан артық ішкі желі жасау ұсынылмайды.

#### {heading(Басқа параметрлер)[id=quotasandlimits-nets-other]}

{tabs}

{tab(Sprut)}

[cols="3,2,2,1,1,1", options="header"]
|===
| Параметр
| Жеке кабинеттегі квота
| CLI-дегі квота
| Базалық квота
| Лимит
| Қатаң

| Маршрутизаторлар саны
| **Sprut маршрутизаторлары**
| `router`
| 1 дана
| 20 дана
| ![](/kz/assets/no.svg "inline")

| Кеңейтілген маршрутизаторлар саны
| **Sprut маршрутизаторлары**
| `dc_router`
| 0 дана
| 3 дана
| ![](/kz/assets/no.svg "inline")

| Жобадағы қауіпсіздік топтарының саны
| **Sprut қауіпсіздік топтары**
| `security_group`
| 50 дана
| шектелмеген
| ![](/kz/assets/no.svg "inline")

| Жобадағы қауіпсіздік ережелерінің саны
| **Sprut қауіпсіздік ережелері**
| `security_group_rule`
| 500 дана
| шектелмеген
| ![](/kz/assets/no.svg "inline")

| Жобадағы порттар саны
| **Sprut порттары**
| `port`
| 500 дана
| 500 дана
| ![](/kz/assets/no.svg "inline")

| Жобадағы сыртқы желідегі адрестері бар порттар саны
| **Sprut сыртқы желісіндегі порттар**
| `external_port`
| 0 дана
| 12 дана
| ![](/kz/assets/no.svg "inline")

| Anycast IP-адрестер саны
| ![](/kz/assets/no.svg "inline")
| `anycastip`
| 0 дана
| 50 дана
| ![](/kz/assets/no.svg "inline")

|===

{/tab}

{tab(Neutron)}

[cols="3,2,2,1,1,1", options="header"]
|===
| Параметр
| Жеке кабинеттегі квота
| CLI-дегі квота
| Базалық квота
| Лимит
| Қатаң

| Маршрутизаторлар саны
| **Neutron маршрутизаторлары**
| `router`
| 12 дана
| 20 дана
| ![](/kz/assets/no.svg "inline")

| Кеңейтілген маршрутизаторлар саны
| **Neutron маршрутизаторлары**
| `dc_router`
| 3 дана
| 3 дана
| ![](/kz/assets/no.svg "inline")

| Жобадағы қауіпсіздік топтарының саны
| **Neutron қауіпсіздік топтары**
| `security_group`
| 24 дана
| шектелмеген
| ![](/kz/assets/no.svg "inline")

| Жобадағы қауіпсіздік ережелерінің саны
| **Neutron қауіпсіздік ережелері**
| `security_group_rule`
| 200 дана
| шектелмеген
| ![](/kz/assets/no.svg "inline")

| Жобадағы порттар саны
| **Neutron порттары**
| `port`
| 300 дана
| 500 дана
| ![](/kz/assets/no.svg "inline")

| Жобадағы сыртқы желідегі адрестері бар Neutron порттарының саны
| **Neutron сыртқы желісіндегі порттар**
| `external_port`
| 6 дана
| 6 дана
| ![](/kz/assets/no.svg "inline")

|===

{/tab}

{tab(Octavia)}

[cols="2,1,1,1,1,1", options="header"]
|===
| Параметр
| Жеке кабинеттегі квота
| CLI-дегі квота
| Базалық квота
| Лимит
| Қатаң

| Жүктеме теңгергіштерінің саны
| **Octavia жүктеме теңгергіштері**
| `load_balancers`
| 12 дана
| 20 дана
| ![](/kz/assets/no.svg "inline")

| Бір теңгергішке шаққандағы теңгерімдеу ережелерінің саны
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| Жеке кабинет арқылы 10 дана, CLI арқылы 30 дана
| ![](/kz/assets/no.svg "inline")

|===

{/tab}

{/tabs}

Бір теңгергішке шаққандағы теңгерімдеу ережелерінің сан лимитін (10 дана) техникалық қолдауға жүгінбей-ақ асыруға болады. Ол үшін ережелерді OpenStack CLI көмегімен жасаңыз. Тұрақты жұмыс үшін бір теңгергіште 30-дан артық ережені пайдалану ұсынылмайды.

Жеке кабинетте көрсетілетін **Neutron жүктеме теңгергіштері** квотасы пайдаланылмайды.

### {heading(Cloud Backup)[id=quotasandlimits-backup]}

| Параметр                                      | CLI-дегі квота | Базалық квота  | Лимит | Қатаң |
|-----------------------------------------------|---------------------------------|--------------------|--|--|
| Резервтік көшірмелер саны                    | `backup` | ![](/kz/assets/no.svg "inline") | шектелмеген | ![](/kz/assets/no.svg "inline") |
| Снапшоттар саны                            | `snapshot` | 600 дана | шектелмеген | ![](/kz/assets/no.svg "inline") |
| Бір резервтік көшірменің өлшемі                  | ![](/kz/assets/no.svg "inline") | ![](/kz/assets/no.svg "inline") | 320 ТБ        | ![](/kz/assets/no.svg "inline") |
| Образдардың жалпы көлемі                           | ![](/kz/assets/no.svg "inline") | ![](/kz/assets/no.svg "inline") | 2 ТБ          | ![](/kz/assets/no.svg "inline") |

Резервтік көшірме өлшеміне арналған лимит (320 ТБ) {var(s3)} сервисіндегі файл өлшемі лимитіне байланысты, бұл сервис резервтік көшірмелерді сақтау үшін пайдаланылады. Бұл лимитті [техникалық қолдауға](/kz/contacts) хабарласу арқылы ұлғайтуға болады.

### {heading({var(s3)})[id=quotasandlimits-s3]}

{var(s3)} сервисі үшін квоталар қарастырылмаған. Бұл сервистерді пайдалану тек техникалық лимиттермен шектеледі.

[cols="3,2,4,1", options="header"]
|===
| Параметр
| Лимит
| Түсініктеме
| Қатаң

| Аккаунттар саны
| 50 дана
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/check.svg "inline")

| Бакеттер саны
| 100 дана
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/check.svg "inline")

| Бакеттегі объектілер саны
| шектелмеген
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

| Бір файлдың өлшемі
| 32 ГБ, 320 ТБ
| 32 ГБ — кәдімгі файл үшін, 320 ТБ — құрамдас жүктеу үшін
| ![](/kz/assets/check.svg "inline")

| Бір бакеттің өлшемі
| шектелмеген
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

| Рейт-лимит: кәдімгі сұраулар
| 1000 сұрау/с
| шектелмеген, барлық жобалар арасындағы белгілі ең жоғары мән: 9000 сұрау/с
| ![](/kz/assets/no.svg "inline")

| Рейт-лимит: листингке арналған сұраулар
| 250 сұрау/с
| шектелмеген, барлық жобалар арасындағы белгілі ең жоғары мән: 500 сұрау/с
| ![](/kz/assets/no.svg "inline")

| lifecycle-ережелер саны
| 50 дана
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/check.svg "inline")

|===

Рейт-лимиттерді [техникалық қолдауға](/kz/contacts) хабарласу арқылы ұлғайтуға болады.
