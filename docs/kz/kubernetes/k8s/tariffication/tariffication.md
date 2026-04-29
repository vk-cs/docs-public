{include(/kz/_includes/_translated_by_ai.md)}

Тарифтеу «pay as you go» қағидаты бойынша жүргізіледі: төлем тек тұтынылған ресурстар үшін минутқа дейінгі дәлдікпен алынады.

Сервистердің бағасы [прайс-парақта](https://cloud.vk.com/pricelist) келтірілген. Сервистердің жалпы бағасын есептеу үшін [калькуляторды](https://cloud.vk.com/pricing/) пайдалануға болады. Платформа сервистерінің ақысын төлеуге қатысты құралдардың қалай жұмыс істейтіні туралы [Биллинг](/kz/intro/billing) бөлімінен оқыңыз.

Шығындардың егжей-тегжейі master-түйіндер мен worker-түйіндер үшін бөлек көрсетіледі. 

## Тарифтеледі

- CPU (vCPU) — әрбір ядро үшін. 1 vCPU виртуализация серверінің 1 физикалық ядросына сәйкес келеді.
- Жедел жад (RAM) — жедел жадтың әрбір 1 ГБ-ы үшін.
- Дискілер — дискілік кеңістіктің әрбір 1 ГБ-ы үшін, баға [диск түріне](/kz/computing/iaas/concepts/data-storage/disk-types#disk_types) (SSD, HDD, High-IOPS, Low Latency NVMe) байланысты.
- [Тұрақты томдар (PV)](/kz/kubernetes/k8s/concepts/storage#pv-disks) ([екінші буындағы](/kz/kubernetes/k8s/concepts/cluster-generations) кластерлер үшін ғана).
- [Сервистік жүктеме теңгергіштері](/kz/networks/balancing/concepts/load-balancer#zhukteme_tengergishterinin_turleri).
- [Floating IP-мекенжайлары](/kz/networks/vnet/concepts/ips-and-inet#floating-ip). 
- [GPU және vGPU](/kz/computing/gpu/concepts/about) ([бірінші буындағы](/kz/kubernetes/k8s/concepts/cluster-generations) кластерлер үшін ғана).

## Тарифтелмейді

- Кіріс және шығыс трафик.
- Мониторинг.
