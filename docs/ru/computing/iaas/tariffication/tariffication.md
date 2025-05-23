Тарификация производится по принципу «pay as you go»: плата взимается только за потребляемые ресурсы с точностью до минуты, плата за использование платных ОС взимается раз в день.

Цена сервисов приведена в [прайс-листе](https://cloud.vk.com/pricelist). Для расчета общей цены за сервисы можно воспользоваться [калькулятором](https://cloud.vk.com/pricing/). О том, как работают инструменты, связанные с оплатой сервисов платформы, читайте в разделе [Биллинг](/ru/intro/billing).

## Тарифицируется

- CPU (vCPU) — за каждое ядро. 1 vCPU соответствует 1 физическому ядру сервера виртуализации.
- Оперативная память (RAM) — за каждый 1 ГБ оперативной памяти.
- Лицензии (например, на ОС Windows).
- Диски — за каждый 1 ГБ дискового пространства, цена зависит от типа диска (SSD, HDD, High-IOPS, Low Latency NVME).
- Файловые хранилища (NFS/CIFS) — за каждый 1 ГБ дискового пространства.
- Снимки диска (резервная копия) — за каждый 1 ГБ размера снимка.
- [Публичные IP-адреса](/ru/networks/vnet/tariffication#tarificiruetsya).
- [Образы](../concepts/image-vm) диска, которые вы создали или импортировали в VK Cloud. Цена зависит от места хранения:

  - Хранение в [Cloud Storage](/ru/storage/s3) (по умолчанию) — по [тарифу Hotbox](/ru/storage/s3/tariffication) за каждый 1 ГБ объема образа и за каждый 1 ГБ скачивания образа, например при создании ВМ.
  - Хранение в [блочном хранилище](../concepts/data-storage/storage-types) — по цене HDD-диска за каждый 1 ГБ объема образа.

CPU (vCPU) и оперативная память (RAM) тарифицируются, только если виртуальная машина запущена.

Когда виртуальная машина остановлена, средства продолжают списываться:

- За использование платных лицензий (например, ОС Windows или лицензии на RDS, если эта опция была активирована).
- За аренду дискового пространства.
- За хранение имеющихся резервных копий.
- За публичные IP-адреса.

## Не тарифицируется

- Входящий и исходящий трафик.
- Мониторинг.
- Публичные преднастроенные в VK Cloud образы диска.

## Пример расчета цены

Например, цена виртуальной машины с ОС Ubuntu Linux, 4 CPU, 16 ГБ RAM, SSD-диском на 100 ГБ и публичным IP будет рассчитываться так:

`4 x цена за 1 vCPU` + `16 x цена за 1 ГБ RAM` + `100 x цена за 1 ГБ для SSD` + `1 x цена за публичный IP`
