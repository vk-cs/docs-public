{includetag(vm)}

## {heading(Виртуалды машиналар)[id=include-quotasandlimits-vm]}

### {heading(ВМ мен vCPU-дің жалпы саны)[id=include-quotasandlimits-vm-vcpu]}

[cols="2,1,1,1,1,1,1", options="header"]
|===
| Параметр
| ЖК-дағы квота
| CLI-дегі квота
| Базалық деңгей
| Жоғарылатылған деңгей
| Шек
| Қатаң

| Жобадағы инстанстар саны
| **Виртуалды машиналар**
|`instances`
| 2 дана
| 5 дана
| 1000 дана
| ![](../../../../assets/no.svg "inline")

| Жобадағы vCPU саны
| **vCPU**
| `cores`
| 16 дана
| 40 дана
| шектелмеген
| ![](../../../../assets/no.svg "inline")

| Жобадағы жедел жадтың жалпы көлемі
| **RAM**
| `ram`
| 64 ГБ
| 160 ГБ
| шектелмеген
| ![](../../../../assets/no.svg "inline")

| HEAVY агрегаттар
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| 0 дана
| 0 дана
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline") 
|===

Сәйкес квотаны {linkto(/kz/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota)[text=арттырсаңыз]}, жобадағы инстанстар санының шегінен асуға болады.

{note:info}
Жеке кабинетте 1000-нан аспайтын виртуалды машина көрсетілуі мүмкін.
{/note}

### {heading(Квотасыз шектер)[id=include-quotasandlimits-vm-no-quotas-limits]}

[cols="2,1,1", options="header"]
|===
| Параметр
| Шек
| Қатаң

| Бір инстанстағы vCPU саны
| 32 дана
| ![](../../../../assets/no.svg "inline")

| Бір инстанстағы High-Freq vCPU саны
| 24 дана
| ![](../../../../assets/no.svg "inline")

| Бір инстанстағы GPU саны
| 4 дана

([Tesla H200](/kz/computing/gpu/concepts/about#gpu-about-flavors) үшін — 8 дана)
| ![](../../../../assets/check.svg "inline")

| Бір инстанстағы RAM көлемі   
| 1024 ГБ
| ![](../../../../assets/no.svg "inline")
|===

Процессорлар (vCPU және High-Freq vCPU) мен жедел жад саны бойынша шектер стандартты гипервизорлардың шектеулерімен байланысты. Егер сізге көбірек vCPU немесе High-Freq vCPU қажет болса, квоталарды арттыруды менеджермен электрондық пошта арқылы [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru) келісіп, қажетті сипаттамалары бар бөлінген гипервизорға тапсырыс беріңіз.

Бір инстанстағы GPU лимиті бір виртуалды машинаға көбірек видеокарта қосуға мүмкіндік бермейтін KVM технологиясының шектеуімен байланысты.

## {heading(Дискілер мен образдар)[id=include-quotasandlimits-images-volumes]}

### {heading(Дискілер көлемі)[id=include-quotasandlimits-images-volumes-size]}

[cols="3,2,2,1,1,1", options="header"]
|===
| Параметр
| ЖК-дағы квота
| CLI-дегі квота
| Базалық деңгей
| Жоғарылатылған деңгей
| Шек

| Жобадағы дискілердің жалпы көлемі
| **Дискілер өлшемі**
| `gigabytes`
| 400 ГБ
| 1000 ГБ
| шектелмеген

| High-IOPS SSD дискілерінің жалпы көлемі
| **High-IOPS SSD өлшемі**
| `gigabytes_high-iops`
| 400 ГБ
| 1000 ГБ
| шектелмеген

| High-IOPS HA SSD дискілерінің жалпы көлемі
| **High-IOPS HA SSD өлшемі**
| `gigabytes_high-iops-ha`
| 400 ГБ
| 1000 ГБ
| шектелмеген

| {linkto(/kz/start/concepts/architecture#architecture-az)[text=GZ1 (legacy) қолжетімділік аймағындағы]} High-IOPS SSD дискілерінің жалпы көлемі
| **High-IOPS SSD өлшемі аймақта - (DP1)**
| `gigabytes_dp1-high-iops`
| 400 ГБ
| 1000 ГБ
| шектелмеген

| {linkto(/kz/start/concepts/architecture#architecture-az)[text=MS1 (legacy) қолжетімділік аймағындағы]} High-IOPS SSD дискілерінің жалпы көлемі
| **High-IOPS SSD өлшемі Мәскеу аймағында (MS1)**
| `gigabytes_ko1-high-iops`
| 400 ГБ
| 1000 ГБ
| шектелмеген
|===

Low Latency NVMe дискілерінің жалпы көлемі квотаға жатпайды және шектермен шектелмейді.

Жобадағы дискілердің жалпы көлемі бойынша квоталар барлық түрдегі дискілерді, оның ішінде High-IOPS SSD дискілерін де ескереді. High-IOPS SSD дискілерінің жалпы көлемі бойынша квоталар екі қолжетімділік аймағында да жасалған дискілерді ескереді. Егер сіз басқа квотаға кіретін квотаны арттыруды {linkto(/kz/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota)[text=сұрасаңыз]}, жоғары деңгейдегі квота пропорционалды түрде арттырылады.

### {heading(Дискілер саны)[id=include-quotasandlimits-iv-number]}

[cols="3,2,2,1,1,1", options="header"]
|===
| Параметр
| ЖК-дағы квота
| CLI-дегі квота
| Базалық деңгей
| Жоғарылатылған деңгей
| Шек

| Жобадағы дискілер саны
| **Дискілер**
| `volumes`
| 4 дана
| 10 дана
| шектелмеген

| Жобадағы High-IOPS SSD дискілерінің саны
| **High-IOPS SSD дискілер**
| `volumes_high-iops`
| 4 дана
| 10 дана
| шектелмеген

| Жобадағы High-IOPS HA SSD дискілерінің саны
| **High-IOPS HA SSD дискілер**
| `volumes_high-iops-ha`
| 4 дана
| 10 дана
| шектелмеген

| {linkto(/kz/start/concepts/architecture#architecture-az)[text=GZ1 (legacy) қолжетімділік аймағындағы]} High-IOPS SSD дискілерінің саны
| **High-IOPS SSD дискілер аймақта - (DP1)**
| `volumes_dp1-high-iops`
| 4 дана
| 10 дана
| шектелмеген

| {linkto(/kz/start/concepts/architecture#architecture-az)[text=MS1 (legacy) қолжетімділік аймағындағы]} High-IOPS SSD дискілерінің саны
| **High-IOPS SSD дискілер Мәскеу аймағында (MS1)**
| `volumes_ko1-high-iops`
| 4 дана
| 10 дана
| шектелмеген
|===

Low Latency NVMe дискілерінің саны квотаға жатпайды және шектермен шектелмейді.

Жобадағы дискілердің жалпы саны бойынша квоталар барлық түрдегі дискілерді, оның ішінде High-IOPS SSD дискілерін де ескереді. High-IOPS SSD дискілерінің жалпы саны бойынша квоталар екі қолжетімділік аймағында да жасалған дискілерді ескереді. Егер сіз басқа квотаға кіретін квотаны арттыруды {linkto(/kz/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota)[text=сұрасаңыз]}, жоғары деңгейдегі квота пропорционалды түрде арттырылады.

### {heading(Квотасыз шектер)[id=include-quotasandlimits-iv-no-quotas-limits]}

[cols="2,2,3,1", options="header"]
|===
|Параметр
|Шек
|Түсініктеме
|Қатаң

|Бір инстанстағы дискілер саны
|Конфигурациялық диск қосылған кезде — 25 дана.

Конфигурациялық диск сөндірілген болса — 26 дана
|Шек PCI шинасының шектеулерімен байланысты.

Егер {linkto(/kz/computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=виртуалды машина жасау]} кезінде жеке кабинетте **Конфигурациялық дискіні пайдалану** опциясы қосылса немесе OpenStack CLI-де `--use-config-drive` параметрі қолданылса, дискілердің максималды саны — 25 дана. Конфигурациялық дискіні {linkto(/kz/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-network-addressing)[text=DHCP-сервері]} жоқ желілерде пайдаланыңыз.

Егер **Конфигурациялық дискіні пайдалану** опциясы сөндірілген немесе `--use-config-drive` параметрі қолданылмаса, дискілердің максималды саны — 26 дана
|![](/kz/assets/check.svg "inline")

|Бір HDD дискінің өлшемі
|Жеке кабинет арқылы — 5 ТБ

OpenStack CLI көмегімен — 100 ТБ
|{var(cloud)} кейбір сервистерінде дискілер өлшеміне меншікті шектеулер қойылуы мүмкін.

|![](/kz/assets/check.svg "inline")

|Бір SSD дискінің өлшемі
|Жеке кабинет арқылы — 5 ТБ

OpenStack CLI көмегімен — 100 ТБ
|{var(cloud)} кейбір сервистерінде дискілер өлшеміне меншікті шектеулер қойылуы мүмкін.

|![](/kz/assets/check.svg "inline")

|Бір High-IOPS SSD дискінің өлшемі
|Жеке кабинет арқылы — 2 ТБ

OpenStack CLI көмегімен — 10 ТБ
|Шектен (10 ТБ) асырып жасалған диск өнімділігі бойынша ешнәрседен ерекшеленбейді, бірақ мұндай дискіні қалпына келтіру немесе тасымалдау айтарлықтай уақытты алады және тәуекелдермен байланысты болады. Шектен [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru) электрондық поштасы арқылы менеджерге хабарласып асуға болады.

{var(cloud)} кейбір сервистерінде дискілер өлшеміне меншікті шектеулер қойылуы мүмкін
|![](/kz/assets/no.svg "inline")

|Бір High-IOPS HA SSD дискінің өлшемі
|Жеке кабинет арқылы — 2 ТБ

OpenStack CLI көмегімен — 10 ТБ
|Шектен (10 ТБ) асырып жасалған диск өнімділігі бойынша ешнәрседен ерекшеленбейді, бірақ мұндай дискіні қалпына келтіру немесе тасымалдау айтарлықтай уақытты алады және тәуекелдермен байланысты болады. Шектен [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru) электрондық поштасы арқылы менеджерге хабарласып асуға болады.

{var(cloud)} кейбір сервистерінде дискілер өлшеміне меншікті шектеулер қойылуы мүмкін
|![](/kz/assets/no.svg "inline")

|Бір Low Latency NVMe дискінің өлшемі
|Жеке кабинет арқылы — 2 ТБ

OpenStack CLI көмегімен — 10 ТБ
|Шектен (10 ТБ) [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru) электрондық поштасы арқылы менеджерге хабарласып асуға болады.

{var(cloud)} кейбір сервистерінде дискілер өлшеміне меншікті шектеулер қойылуы мүмкін
|![](/kz/assets/no.svg "inline")

|Бір образдың өлшемі
|Жеке кабинет арқылы — 100 ГБ.

OpenStack CLI көмегімен — 500 ГБ
|Шек Glance сервисі үшін қатаң болып табылады.

Үлкенірек өлшемдегі образды жүктеу қажет болса, [нұсқаулықты](/kz/storage/s3/how-to-guides/load-large-image) пайдаланыңыз
|![](/kz/assets/no.svg "inline")

|Образдардың жалпы көлемі
|2 ТБ
|Шектен [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru) электрондық поштасы арқылы менеджерге хабарласып асуға болады
|![](/kz/assets/no.svg "inline")

|Диск снимоктарының жалпы саны
|200 дана
|Шектен [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru) электрондық поштасы арқылы менеджерге хабарласып асуға болады
|![](/kz/assets/no.svg "inline")
|===

## {heading(Файлдық қоймалар)[id=include-quotasandlimits-fs]}

[cols="3,2,1,1,1,1", options="header"]
|===
| Параметр
| ЖК-дағы квота
| Базалық деңгей
| Жоғарылатылған деңгей
| Шек
| Қатаң

| Жобадағы файлдық қоймалар саны
| **NFS/CIFS файлдық қоймалары**
| 0 дана
| 5 дана
| шектелмеген
| ![](/kz/assets/no.svg "inline")

| Жобадағы барлық файлдық қоймалардың жалпы көлемі
| **NFS/CIFS файлдық қоймаларының өлшемі**
| 0 ГБ
| 100 ГБ
| шектелмеген
| ![](/kz/assets/no.svg "inline")

| Жобадағы файлдық қоймалар снимоктарының жалпы көлемі
| **NFS/CIFS файлдық қоймалары снимоктарының өлшемі**
| 0 ГБ
| 100 ГБ
| шектелмеген
| ![](/kz/assets/no.svg "inline")

| Файлдық қоймалар желілерінің саны
| **NFS/CIFS файлдық қоймаларының желілері**
| 0 дана
| 2 дана
| шектелмеген
| ![](/kz/assets/no.svg "inline")

| Бір файлдық қойманың өлшемі
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
| 50 ТБ
| ![](/kz/assets/check.svg "inline")
|===

Файлдық қоймалар желілерінің саны бойынша квота (**NFS/CIFS файлдық қоймаларының желілері**) ішкі пайдалануға арналған квота болып табылады.

{/includetag}