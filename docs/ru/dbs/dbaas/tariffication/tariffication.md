# {heading(Тарификация)[id=dbaas-tariffication]}

{include(/ru/_includes/_tariffication.md)[tags=pay]}

{include(/ru/_includes/_tariffication.md)[tags=prices]}

{include(/ru/_includes/_tariffication.md)[tags=calculator]}

## {heading(Тарифицируется)[id=dbaas-tariffication-yes]}

- CPU (vCPU) — за каждое ядро. 1 vCPU соответствует 1 физическому ядру сервера виртуализации.
- Оперативная память (RAM) — за каждый 1 ГБ оперативной памяти.
- Лицензии — за каждый день использования лицензии.
- Диски — за каждый 1 ГБ дискового пространства, цена зависит от типа диска (SSD или High-IOPS SSD).
- Снимок диска (резервная копия) — за каждый 1 ГБ размера снимка.
- IP-адреса и балансировщики нагрузки, подробнее в разделе {linkto(../../../networks/vnet/tariffication#vnet-tariffication)[text=Виртуальные сети]}.
- Системные диски.
- В зависимости от типа СУБД: диск для журнала транзакций.

## {heading(Не тарифицируется)[id=dbaas-tariffication-no]}

- Автоматическое создание резервных копий.
- Входящий и исходящий трафик.
- Мониторинг.