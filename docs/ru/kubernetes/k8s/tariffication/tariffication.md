# {heading(Тарификация)[id=k8s-tariffication]}

Тарификация производится по принципу «pay as you go»: плата взимается только за потребляемые ресурсы с точностью до минуты.

Цена сервисов приведена в [прайс-листе](https://cloud.vk.com/pricelist). Для расчета общей цены за сервисы можно воспользоваться [калькулятором](https://cloud.vk.com/pricing/). О том, как работают инструменты, связанные с оплатой сервисов платформы, читайте в разделе [Биллинг](../../../intro/billing).

Детализация расходов отображается отдельно для master-узлов и worker-узлов. 

## {heading(Тарифицируется)[id=k8s-tariffication-yes]}

- CPU (vCPU) — за каждое ядро. 1 vCPU соответствует 1 физическому ядру сервера виртуализации.
- Оперативная память (RAM) — за каждый 1 ГБ оперативной памяти.
- Диски — за каждый 1 ГБ дискового пространства, цена зависит от {linkto(../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=типа диска]} (SSD, HDD, High-IOPS, Low Latency NVMe).
- {linkto(../concepts/storage#k8s-storage-pv-disks)[text=Постоянные тома (PV)]} (только для кластеров {linkto(../concepts/cluster-generations#k8s-cluster-generations)[text=второго поколения]}).
- {linkto(../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=сервисные балансировщики нагрузки]}.
- {linkto(../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-адреса]}. 
- {linkto(../../../computing/gpu/concepts/about#gpu-about)[text=GPU и vGPU]} (только для кластеров {linkto(../concepts/cluster-generations#k8s-cluster-generations)[text=первого поколения]}).

## {heading(Не тарифицируется)[id=k8s-tariffication-no]}

- Входящий и исходящий трафик.
- Мониторинг.