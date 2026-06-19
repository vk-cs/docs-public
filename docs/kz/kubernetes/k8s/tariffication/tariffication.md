# {heading(Тарифтеу)[id=k8s-tariffication]}

{include(/kz/_includes/_translated_by_ai.md)}

Тарифтеу «pay as you go» қағидаты бойынша жүргізіледі: төлем тек тұтынылған ресурстар үшін минутқа дейінгі дәлдікпен алынады.

Сервистердің бағасы [прайс-парақта](https://cloud.vk.com/pricelist) келтірілген. Сервистердің жалпы бағасын есептеу үшін [калькуляторды](https://cloud.vk.com/pricing/) пайдалануға болады. Платформа сервистерінің ақысын төлеуге қатысты құралдардың қалай жұмыс істейтіні туралы [Биллинг](../../../intro/billing) бөлімінен оқыңыз.

Шығындардың егжей-тегжейі master-түйіндер мен worker-түйіндер үшін бөлек көрсетіледі. 

## {heading(Тарифтеледі)[id=k8s-tariffication-yes]}

- CPU (vCPU) — әрбір ядро үшін. 1 vCPU виртуализация серверінің 1 физикалық ядросына сәйкес келеді.
- Жедел жад (RAM) — жедел жадтың әрбір 1 ГБ-ы үшін.
- Дискілер — дискілік кеңістіктің әрбір 1 ГБ-ы үшін, баға {linkto(../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=диск түріне]} (SSD, HDD, High-IOPS, Low Latency NVMe) байланысты.
- {linkto(../concepts/storage#k8s-storage-pv-disks)[text=Тұрақты томдар (PV)]} ({linkto(../concepts/cluster-generations#k8s-cluster-generations)[text=екінші буындағы]} кластерлер үшін ғана).
- {linkto(../../../networks/balancing/concepts/load-balancer#balancing-load-balancer-types)[text=сервистік жүктеме теңгергіштері]}.
- {linkto(../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-мекенжайлары]}. 
- {linkto(../../../computing/gpu/concepts/about#gpu-about)[text=GPU және vGPU]} ({linkto(../concepts/cluster-generations#k8s-cluster-generations)[text=бірінші буындағы]} кластерлер үшін ғана).

## {heading(Тарифтелмейді)[id=k8s-tariffication-no]}

- Кіріс және шығыс трафик.
- Мониторинг.
