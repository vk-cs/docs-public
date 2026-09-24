# {heading(Тарифтеу)[id=mk8s-tariffication]}

{include(/kz/_includes/_translated_by_ai.md)}

Тарифтеу «pay as you go» қағидаты бойынша жүргізіледі: төлем тек тұтынылған ресурстар үшін минутқа дейінгі дәлдікпен алынады.

Сервистердің бағасы [прайс-парақта](https://cloud.vk.kz/pricelist) келтірілген. Сервистердің жалпы бағасын есептеу үшін [калькуляторды](https://cloud.vk.kz/pricing/) пайдалануға болады. Платформа сервистерінің ақысын төлеуге қатысты құралдардың қалай жұмыс істейтіні туралы [Биллинг](../../../intro/billing) бөлімінен оқыңыз.

Шығындардың егжей-тегжейі master-түйіндер мен worker-түйіндер үшін бөлек көрсетіледі. 

## {heading(Тарифтеледі)[id=mk8s-tariffication-yes]}

- CPU (vCPU) — әрбір ядро үшін. 1 vCPU виртуализация серверінің 1 физикалық ядросына сәйкес келеді.
- Жедел жад (RAM) — жедел жадтың әрбір 1 ГБ-ы үшін.
- Дискілер — дискілік кеңістіктің әрбір 1 ГБ-ы үшін, баға {linkto(../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=диск түріне]} (SSD, HDD, High-IOPS, Low Latency NVMe) байланысты.
- {linkto(../concepts/storage#mk8s-storage-pv-disks)[text=Тұрақты томдар (PV)]}.
- {linkto(../../../networks/balancing/concepts/load-balancer#balancing-load-balancer-types)[text=сервистік жүктеме теңгергіштері]}.
- {linkto(../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-мекенжайлары]}. 

## {heading(Тарифтелмейді)[id=mk8s-tariffication-no]}

- Кіріс және шығыс трафик.
- Мониторинг.
