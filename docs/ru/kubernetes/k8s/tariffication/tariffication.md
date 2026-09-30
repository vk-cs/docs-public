# {heading(Тарификация)[id=k8s-tariffication]}

{include(/ru/_includes/_tariffication.md)[tags=pay]}

{include(/ru/_includes/_tariffication.md)[tags=prices]}

{include(/ru/_includes/_tariffication.md)[tags=calculator]}

Детализация расходов отображается отдельно для master-узлов и worker-узлов. 

Особенности тарификации:

- Тарификация нового кластера начинается, когда он переходит в статус `ready`.
- При запуске кластера тарификация каждого узла начинается, когда узел переходит в статус `ready`.
- При остановке кластера тарификация каждого узла прекращается, когда узел останавливается.
- Тарификация кластера прекращается, когда начинается его удаление.

## {heading(Тарифицируется)[id=k8s-tariffication-yes]}

- CPU (vCPU) — за каждое ядро. 1 vCPU соответствует 1 физическому ядру сервера виртуализации.
- Оперативная память (RAM) — за каждый 1 ГБ оперативной памяти.
- Диски — за каждый 1 ГБ дискового пространства, цена зависит от {linkto(../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=типа диска]} (SSD, HDD, High-IOPS, Low Latency NVMe).
- {linkto(../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=Сервисные балансировщики нагрузки]}.
- {linkto(../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-адреса]}. 
- {linkto(../../../computing/gpu/concepts/about#gpu-about)[text=GPU и vGPU]}.

## {heading(Не тарифицируется)[id=k8s-tariffication-no]}

- Входящий и исходящий трафик.
- Мониторинг.