Тарификация производится по принципу «pay as you go»: плата взимается только за потребляемые ресурсы с точностью до минуты.

Цена сервисов приведена в [прайс-листе](https://cloud.vk.com/pricelist). Для расчета общей цены за сервисы можно воспользоваться [калькулятором](https://cloud.vk.com/pricing/). О том, как работают инструменты, связанные с оплатой сервисов платформы, читайте в разделе [Биллинг](/ru/intro/billing).

Детализация расходов отображается отдельно для master-узлов и worker-узлов. 

## Тарифицируется

- CPU (vCPU) — за каждое ядро. 1 vCPU соответствует 1 физическому ядру сервера виртуализации.
- Оперативная память (RAM) — за каждый 1 ГБ оперативной памяти.
- Диски — за каждый 1 ГБ дискового пространства, цена зависит от [типа диска](/ru/computing/iaas/concepts/data-storage/disk-types#disk_types) (SSD, HDD, High-IOPS, Low Latency NVMe).
- [Постоянные тома (PV)](/ru/kubernetes/k8s/concepts/storage#pv-disks) (только для кластеров [второго поколения](/ru/kubernetes/k8s/concepts/cluster-generations)).
- [Сервисные балансировщики нагрузки](/ru/networks/balancing/concepts/load-balancer#tipy_balansirovshchikov_nagruzki).
- [Floating IP-адреса](/ru/networks/vnet/concepts/ips-and-inet#floating-ip). 
- [GPU и vGPU](/ru/computing/gpu/concepts/about) (только для кластеров [первого поколения](/ru/kubernetes/k8s/concepts/cluster-generations)).

## Не тарифицируется

- Входящий и исходящий трафик.
- Мониторинг.
