# {heading(Тарификация)[id=iaas-tariffication]}

Тарификация производится по принципу «pay as you go»: плата взимается только за потребляемые ресурсы с точностью до минуты, плата за использование платных ОС взимается раз в день.

{include(/ru/_includes/_tariffication.md)[tags=prices]}

{include(/ru/_includes/_tariffication.md)[tags=calculator]}

## {heading(Тарифицируется)[id=iaas-tariffication-list]}

- CPU (vCPU) — за каждое ядро. 1 vCPU соответствует 1 физическому ядру сервера виртуализации.
- Оперативная память (RAM) — за каждый 1 ГБ оперативной памяти.
- Лицензии (например, на ОС Windows).
- Диски — за каждый 1 ГБ дискового пространства, цена зависит от типа диска (SSD, HDD, High-IOPS, Low Latency NVMe).
- Файловые хранилища (NFS/CIFS) — за каждый 1 ГБ дискового пространства.
- Снимки диска — за каждый 1 ГБ размера снимка.
- {linkto(../../../networks/vnet/tariffication#vnet-tariffication-charged)[text=Публичные IP-адреса]}.
- {linkto(../../../computing/iaas/concepts/image-vm#iaas-image-vm)[text=Образы]} диска, которые вы создали или импортировали в {var(cloud)}. Цена зависит от места хранения:

  - Хранение в {linkto(../../../storage/s3#s3-main)[text=VK Object Storage]} (по умолчанию) — по тарифу {linkto(../../../storage/s3/concepts/about#s3-concepts-about-storage-class)[text=Icebox]} за каждый 1 ГБ объема образа и за каждый 1 ГБ скачивания образа, например при создании ВМ. Подробнее о тарификации классов хранения данных в разделе {linkto(../../../storage/s3/tariffication#s3-tariffication)[text=Тарификация]} сервиса VK Object Storage.
  - Хранение в {linkto(../../../computing/iaas/concepts/data-storage/storage-types#iaas-concepts-storage-types)[text=блочном хранилище]} — по цене HDD-диска за каждый 1 ГБ объема образа.

CPU (vCPU) и оперативная память (RAM) тарифицируются, только если виртуальная машина запущена.

Когда виртуальная машина остановлена, средства продолжают списываться:

- За использование платных лицензий (например, ОС Windows или лицензии на RDS, если эта опция была активирована).
- За аренду дискового пространства.
- За хранение имеющихся резервных копий.
- За публичные IP-адреса.

## {heading(Не тарифицируется)[id=iaas-tariffication-not-list]}

- Входящий и исходящий трафик.
- Мониторинг.
- Публичные преднастроенные в {var(cloud)} образы диска.

## {heading(Пример расчета цены)[id=iaas-tariffication-prices]}

Например, цена виртуальной машины с ОС Ubuntu Linux, 4 CPU, 16 ГБ RAM, SSD-диском на 100 ГБ и публичным IP-адрес будет рассчитываться так:

`4 x цена за 1 vCPU` + `16 x цена за 1 ГБ RAM` + `100 x цена за 1 ГБ для SSD` + `1 x цена за публичный IP`
