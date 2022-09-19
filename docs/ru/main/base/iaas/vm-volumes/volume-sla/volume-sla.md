Понятие «Диск» на платформе VK Cloud является аналогом физического носителя информации, такого как HDD или SSD.

Диск — это сетевое блочное устройство, которые обеспечивает хранилище данных для инстансов. Все диски на платформе VK Cloud являются сетевыми и надежно защищены репликацией данных, обеспечивающими надежность хранения и отказоустойчивость.

Преимущества сетевых дисков:

- **Гибкость**. Диски — это независимые ресурсы, поэтому их можно перемещать между инстансами в одном центре обработки данных, и можно увеличивать размер диска, не выключая инстанс, к которому он подключен.
- **Простота**. Диски функционируют как универсальные блочные устройства, поэтому можно рассматривать присоединенные диски как локально подключенные накопители. Это позволяет разбивать, форматировать диски и управлять ими с помощью знакомых инструментов и методов.
- **Применение**. Диски является независимым элементом проекта и может существовать отдельно от инстанса. Это удобно, когда требуется изменить размер диска вне зависимости от конфигурации виртуальной машины.
- **Отказоустойчивость**. Диски обеспечивают надежное хранение данных и позволяют непрерывно выполнять операции чтения и записи даже при выходе из строя одновременно нескольких физических дисков.

<warn>

Созданный диск занимает место в общем хранилище, поэтому его наличие оплачивается отдельно, даже если он отключен от инстанса.

</warn>

## Типы дисков

| Тип диска | Название в API | Выбор зоны доступности при создании диска | Описание |
| --- | --- | --- | --- |
| Сетевой HDD | ceph-hdd deprecated: <br> dp1, <br> ms1 | Да | Сетевой HDD диск с низкой скоростью работы. <br> Обладает тройной репликацией между несколькими серверами СХД внутри зоны доступности. |
| Сетевой HDD с георепликацией | ceph | Не указывается по причине георепликации | Сетевой HDD диск с низкой скоростью работы. <br> Обладает тройной георепликацией между несколькими зонами доступности. |
| High IOPS SSD | high-iops deprecated:<br> local-ssd, <br> ko1-local-ssd, <br> ko1-high-iops, <br> dp1-high-iops, <br> ko1-local-ssd-g2 | Да | Сетевой SSD диск с двойной репликацией (обе копии находятся на одном сервере СХД)<br> и повышенной скоростью работы. |
| Low Latency NVME | ef-nvme | Располагается на одном гипервизоре с виртуальной машиной | Локальный SSD диск с двойной репликацией (обе копии находятся на одном гипервизоре), <br> высокой скоростью работы и низкими задержками. |

<warn>

Диски с типами Сетевой HDD, Сетевой SSD и High IOPS SSD рекомендуется располагать в той же зоне доступности, где находится виртуальная машина, к которой они будут подключены. В противном случае производительность виртуальной машины снизится, потому что диск будет расположен в другом датацентре.

</warn>

## SLA

Для каждого типа дисков существует ограничение по производительности, необходимое для гарантирования стабильности работы диска вне зависимости от его типа или объема.

| Тип диска | min IOPS read | min IOPS write | IOPS/GB read | IOPS/GB write | max IOPS read | max IOPS write | Tab8 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| HDD ceph (типы дисков ceph, ms1, dp1) | 300 | 150 | 1 | 1 | 2 400 | 800 | — |
| SSD ceph (типы дисков ssd, dp1-ssd, ko1-ssd) | 1 000 | 500 | 30 | 15 | 16 000 | 8 000 | — |
| SSD High IOPS | 10 000 | 5 000 | 30 | 25 | 45 000 | 30 000 | — |
| Low Latency NVME | 10 000 | 5 000 | 70 | 35 | 75 000 | 50 000 | 0,5 |

\* полные характеристики приведены ниже в отдельных таблицах для каждого типа дисков.

**HDD**

<table border="0" cellpadding="0" cellspacing="0" style="margin-right: calc(5%); width: 95%;" width="518"><tbody><tr><td class="xl66" height="38" rowspan="2" style="background-color: rgb(239, 239, 239); text-align: center;" width="15.057915057915057%">Объём в GB</td><td class="xl66" rowspan="2" style="background-color: rgb(239, 239, 239); text-align: center; width: 17.81%;" width="17.76061776061776%">Размер блока</td><td class="xl65" colspan="2" style="background-color: rgb(239, 239, 239); text-align: center; width: 24.6702%;" width="24.71042471042471%">Чтение</td><td class="xl67" rowspan="2" style="background-color: rgb(239, 239, 239); text-align: center;" width="17.76061776061776%">Размер блока</td><td class="xl65" colspan="2" style="background-color: rgb(239, 239, 239); text-align: center;" width="24.71042471042471%">Запись</td></tr><tr><td class="xl65" height="19" style="background-color: rgb(239, 239, 239); text-align: center; width: 12.2692%;">IOPS</td><td class="xl65" style="background-color: rgb(239, 239, 239); text-align: center;">MB/s</td><td class="xl65" style="background-color: rgb(239, 239, 239); text-align: center;">IOPS</td><td class="xl65" style="background-color: rgb(239, 239, 239); text-align: center;">MB/s</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">10</td><td style="width: 17.81%;">4K</td><td align="right" style="width: 12.2692%;">300</td><td align="right">1</td><td>4K</td><td align="right">150</td><td align="right">1</td></tr><tr><td style="width: 17.81%;">64K</td><td style="width: 12.2692%;"><br></td><td align="right">9</td><td>64K</td><td><br></td><td align="right">5</td></tr><tr><td style="width: 17.81%;">1M</td><td style="width: 12.2692%;"><br></td><td align="right">38</td><td>1M</td><td><br></td><td align="right">19</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">50</td><td style="width: 17.81%;">4K</td><td align="right" style="width: 12.2692%;">300</td><td align="right">1</td><td>4K</td><td align="right">150</td><td align="right">1</td></tr><tr><td style="width: 17.81%;">64K</td><td style="width: 12.2692%;"><br></td><td align="right">9</td><td>64K</td><td><br></td><td align="right">5</td></tr><tr><td style="width: 17.81%;">1M</td><td style="width: 12.2692%;"><br></td><td align="right">38</td><td>1M</td><td><br></td><td align="right">19</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">100</td><td style="width: 17.81%;">4K</td><td align="right" style="width: 12.2692%;">300</td><td align="right">1</td><td>4K</td><td align="right">150</td><td align="right">1</td></tr><tr><td style="width: 17.81%;">64K</td><td style="width: 12.2692%;"><br></td><td align="right">9</td><td>64K</td><td><br></td><td align="right">5</td></tr><tr><td style="width: 17.81%;">1M</td><td style="width: 12.2692%;"><br></td><td align="right">38</td><td>1M</td><td><br></td><td align="right">19</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">250</td><td style="width: 17.81%;">4K</td><td align="right" style="width: 12.2692%;">300</td><td align="right">1</td><td>4K</td><td align="right">250</td><td align="right">1</td></tr><tr><td style="width: 17.81%;">64K</td><td style="width: 12.2692%;"><br></td><td align="right">9</td><td>64K</td><td><br></td><td align="right">8</td></tr><tr><td style="width: 17.81%;">1M</td><td style="width: 12.2692%;"><br></td><td align="right">38</td><td>1M</td><td><br></td><td align="right">31</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">500</td><td style="width: 17.81%;">4K</td><td align="right" style="width: 12.2692%;">500</td><td align="right">2</td><td>4K</td><td align="right">500</td><td align="right">2</td></tr><tr><td style="width: 17.81%;">64K</td><td style="width: 12.2692%;"><br></td><td align="right">16</td><td>64K</td><td><br></td><td align="right">16</td></tr><tr><td style="width: 17.81%;">1M</td><td style="width: 12.2692%;"><br></td><td align="right">63</td><td>1M</td><td><br></td><td align="right">63</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">1000</td><td style="width: 17.81%;">4K</td><td align="right" style="width: 12.2692%;">1000</td><td align="right">4</td><td>4K</td><td align="right">800</td><td align="right">3</td></tr><tr><td style="width: 17.81%;">64K</td><td style="width: 12.2692%;"><br></td><td align="right">31</td><td>64K</td><td><br></td><td align="right">25</td></tr><tr><td style="width: 17.81%;">1M</td><td style="width: 12.2692%;"><br></td><td align="right">125</td><td>1M</td><td><br></td><td align="right">100</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">1500</td><td style="width: 17.81%;">4K</td><td align="right" style="width: 12.2692%;">1500</td><td align="right">6</td><td>4K</td><td align="right">800</td><td align="right">3</td></tr><tr><td style="width: 17.81%;">64K</td><td style="width: 12.2692%;"><br></td><td align="right">47</td><td>64K</td><td><br></td><td align="right">25</td></tr><tr><td style="width: 17.81%;">1M</td><td style="width: 12.2692%;"><br></td><td align="right">188</td><td>1M</td><td><br></td><td align="right">100</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">2000</td><td style="width: 17.81%;">4K</td><td align="right" style="width: 12.2692%;">2000</td><td align="right">8</td><td>4K</td><td align="right">800</td><td align="right">3</td></tr><tr><td style="width: 17.81%;">64K</td><td style="width: 12.2692%;"><br></td><td align="right">63</td><td>64K</td><td><br></td><td align="right">25</td></tr><tr><td style="width: 17.81%;">1M</td><td style="width: 12.2692%;"><br></td><td align="right">250</td><td>1M</td><td><br></td><td align="right">100</td></tr></tbody></table>

**SSD**

<table border="0" cellpadding="0" cellspacing="0" style="margin-right: calc(5%); width: 95%;" width="518"><tbody><tr><td class="xl65" height="38" rowspan="2" style="background-color: rgb(239, 239, 239); text-align: center;" width="15.057915057915057%">Объём в GB</td><td class="xl65" rowspan="2" style="background-color: rgb(239, 239, 239); text-align: center;" width="17.76061776061776%">Размер блока</td><td class="xl65" colspan="2" style="background-color: rgb(239, 239, 239); text-align: center;" width="24.71042471042471%">Чтение</td><td class="xl65" rowspan="2" style="background-color: rgb(239, 239, 239); text-align: center;" width="17.76061776061776%">Размер блока</td><td class="xl65" colspan="2" style="background-color: rgb(239, 239, 239); text-align: center;" width="24.71042471042471%">Запись</td></tr><tr><td class="xl65" height="19" style="background-color: rgb(239, 239, 239); text-align: center;">IOPS</td><td class="xl65" style="background-color: rgb(239, 239, 239); text-align: center;">MB/s</td><td class="xl65" style="background-color: rgb(239, 239, 239); text-align: center;">IOPS</td><td class="xl65" style="background-color: rgb(239, 239, 239); text-align: center;">MB/s</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">10</td><td>4K</td><td align="right">1000</td><td align="right">4</td><td>4K</td><td align="right">500</td><td align="right">2</td></tr><tr><td>64K</td><td><br></td><td align="right">31</td><td>64K</td><td><br></td><td align="right">16</td></tr><tr><td>1M</td><td><br></td><td align="right">125</td><td>1M</td><td><br></td><td align="right">63</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">50</td><td>4K</td><td align="right">1500</td><td align="right">6</td><td>4K</td><td align="right">750</td><td align="right">3</td></tr><tr><td>64K</td><td><br></td><td align="right">47</td><td>64K</td><td><br></td><td align="right">23</td></tr><tr><td>1M</td><td><br></td><td align="right">188</td><td>1M</td><td><br></td><td align="right">94</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">100</td><td>4K</td><td align="right">3000</td><td align="right">12</td><td>4K</td><td align="right">1500</td><td align="right">6</td></tr><tr><td>64K</td><td><br></td><td align="right">94</td><td>64K</td><td><br></td><td align="right">47</td></tr><tr><td>1M</td><td><br></td><td align="right">375</td><td>1M</td><td><br></td><td align="right">188</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">250</td><td>4K</td><td align="right">7500</td><td align="right">29</td><td>4K</td><td align="right">3750</td><td align="right">15</td></tr><tr><td>64K</td><td><br></td><td align="right">234</td><td>64K</td><td><br></td><td align="right">117</td></tr><tr><td>1M</td><td><br></td><td align="right">400</td><td>1M</td><td><br></td><td align="right">400</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">500</td><td>4K</td><td align="right">15000</td><td align="right">59</td><td>4K</td><td align="right">7500</td><td align="right">29</td></tr><tr><td>64K</td><td><br></td><td align="right">400</td><td>64K</td><td><br></td><td align="right">234</td></tr><tr><td>1M</td><td><br></td><td align="right">400</td><td>1M</td><td><br></td><td align="right">400</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">1000</td><td>4K</td><td align="right">16000</td><td align="right">63</td><td>4K</td><td align="right">8000</td><td align="right">31</td></tr><tr><td>64K</td><td><br></td><td align="right">400</td><td>64K</td><td><br></td><td align="right">250</td></tr><tr><td>1M</td><td><br></td><td align="right">400</td><td>1M</td><td><br></td><td align="right">400</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">1500</td><td>4K</td><td align="right">16000</td><td align="right">63</td><td>4K</td><td align="right">8000</td><td align="right">31</td></tr><tr><td>64K</td><td><br></td><td align="right">400</td><td>64K</td><td><br></td><td align="right">250</td></tr><tr><td>1M</td><td><br></td><td align="right">400</td><td>1M</td><td><br></td><td align="right">400</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">2000</td><td>4K</td><td align="right">16000</td><td align="right">63</td><td>4K</td><td align="right">8000</td><td align="right">31</td></tr><tr><td>64K</td><td><br></td><td align="right">400</td><td>64K</td><td><br></td><td align="right">250</td></tr><tr><td>1M</td><td><br></td><td align="right">400</td><td>1M</td><td><br></td><td align="right">400</td></tr></tbody></table>

**High-IOPS SSD**

<table border="0" cellpadding="0" cellspacing="0" style="margin-right: calc(3%); width: 97%;" width="518"><tbody><tr><td class="xl65" height="38" rowspan="2" style="text-align: center; background-color: rgb(239, 239, 239);" width="15.057915057915057%">Объём в GB</td><td class="xl65" rowspan="2" style="text-align: center; background-color: rgb(239, 239, 239);" width="17.76061776061776%">Размер блока</td><td class="xl65" colspan="2" style="text-align: center; background-color: rgb(239, 239, 239);" width="24.71042471042471%">Чтение</td><td class="xl65" rowspan="2" style="text-align: center; background-color: rgb(239, 239, 239);" width="17.76061776061776%">Размер блока</td><td class="xl65" colspan="2" style="text-align: center; background-color: rgb(239, 239, 239);" width="24.71042471042471%">Запись</td></tr><tr><td class="xl65" height="19" style="text-align: center; background-color: rgb(239, 239, 239);">IOPS</td><td class="xl65" style="text-align: center; background-color: rgb(239, 239, 239);">MB/s</td><td class="xl65" style="text-align: center; background-color: rgb(239, 239, 239);">IOPS</td><td class="xl65" style="text-align: center; background-color: rgb(239, 239, 239);">MB/s</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">10</td><td>4K</td><td align="right">10000</td><td align="right">39</td><td>4K</td><td align="right">5000</td><td align="right">20</td></tr><tr><td>64K</td><td><br></td><td align="right">313</td><td>64K</td><td><br></td><td align="right">156</td></tr><tr><td>1M</td><td><br></td><td align="right">500</td><td>1M</td><td><br></td><td align="right">500</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">50</td><td>4K</td><td align="right">10000</td><td align="right">39</td><td>4K</td><td align="right">5000</td><td align="right">20</td></tr><tr><td>64K</td><td><br></td><td align="right">313</td><td>64K</td><td><br></td><td align="right">156</td></tr><tr><td>1M</td><td><br></td><td align="right">500</td><td>1M</td><td><br></td><td align="right">500</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">100</td><td>4K</td><td align="right">10000</td><td align="right">39</td><td>4K</td><td align="right">5000</td><td align="right">20</td></tr><tr><td>64K</td><td><br></td><td align="right">313</td><td>64K</td><td><br></td><td align="right">156</td></tr><tr><td>1M</td><td><br></td><td align="right">500</td><td>1M</td><td><br></td><td align="right">500</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">250</td><td>4K</td><td align="right">10000</td><td align="right">39</td><td>4K</td><td align="right">6250</td><td align="right">24</td></tr><tr><td>64K</td><td><br></td><td align="right">313</td><td>64K</td><td><br></td><td align="right">195</td></tr><tr><td>1M</td><td><br></td><td align="right">500</td><td>1M</td><td><br></td><td align="right">500</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">500</td><td>4K</td><td align="right">15000</td><td align="right">59</td><td>4K</td><td align="right">12500</td><td align="right">49</td></tr><tr><td>64K</td><td><br></td><td align="right">469</td><td>64K</td><td><br></td><td align="right">391</td></tr><tr><td>1M</td><td><br></td><td align="right">500</td><td>1M</td><td><br></td><td align="right">500</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">1000</td><td>4K</td><td align="right">30000</td><td align="right">117</td><td>4K</td><td align="right">25000</td><td align="right">98</td></tr><tr><td>64K</td><td><br></td><td align="right">500</td><td>64K</td><td><br></td><td align="right">500</td></tr><tr><td>1M</td><td><br></td><td align="right">500</td><td>1M</td><td><br></td><td align="right">500</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">1500</td><td>4K</td><td align="right">45000</td><td align="right">176</td><td>4K</td><td align="right">30000</td><td align="right">117</td></tr><tr><td>64K</td><td><br></td><td align="right">500</td><td>64K</td><td><br></td><td align="right">500</td></tr><tr><td>1M</td><td><br></td><td align="right">500</td><td>1M</td><td><br></td><td align="right">500</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">2000</td><td>4K</td><td align="right">45000</td><td align="right">176</td><td>4K</td><td align="right">30000</td><td align="right">117</td></tr><tr><td>64K</td><td><br></td><td align="right">500</td><td>64K</td><td><br></td><td align="right">500</td></tr><tr><td>1M</td><td><br></td><td align="right">500</td><td>1M</td><td><br></td><td align="right">500</td></tr></tbody></table>

**LL NVME**

<table border="0" cellpadding="0" cellspacing="0" width="769"><tbody><tr><td class="xl85" height="48" rowspan="2" style="width: 15.0923%; background-color: rgb(239, 239, 239);" width="14.044213263979193%">Объём в GB</td><td class="xl84" rowspan="2" style="width: 16.4908%; background-color: rgb(239, 239, 239);" width="13.524057217165149%">Размер блока</td><td class="xl82" colspan="2" style="width: 25.7256%; background-color: rgb(239, 239, 239);" width="28.34850455136541%">Чтение</td><td class="xl84" rowspan="2" style="width: 16.095%; background-color: rgb(239, 239, 239);" width="14.694408322496749%">Размер блока</td><td class="xl82" colspan="2" style="width: 26.57%; background-color: rgb(239, 239, 239);" width="29.388816644993497%">Запись</td></tr><tr><td class="xl81" height="28" style="width: 11.7414%; background-color: rgb(239, 239, 239);">IOPS</td><td class="xl81" style="width: 13.9842%; background-color: rgb(239, 239, 239);">Mb/s</td><td class="xl81" style="width: 11.7236%; background-color: rgb(239, 239, 239);">IOPS</td><td class="xl81" style="width: 14.7553%; background-color: rgb(239, 239, 239);">Mb/s</td></tr><tr><td class="xl83" height="60" rowspan="3" style="width: 15.0923%;">10</td><td class="xl82" style="width: 16.4908%;">4K</td><td class="xl82" style="width: 11.6901%;">10000</td><td class="xl82" style="width: 13.9842%;">39,0625</td><td class="xl82" style="width: 16.095%;">4K</td><td class="xl82" style="width: 11.7236%;">5000</td><td class="xl82" style="width: 14.7553%;">19,53125</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">64K</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">350</td><td class="xl82" style="width: 16.095%;">64K</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">200</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">1M</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">500</td><td class="xl82" style="width: 16.095%;">1M</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">500</td></tr><tr><td class="xl83" height="60" rowspan="3" style="width: 15.0923%;">50</td><td class="xl82" style="width: 16.4908%;">4K</td><td class="xl82" style="width: 11.6901%;">10000</td><td class="xl82" style="width: 13.9842%;">39,0625</td><td class="xl82" style="width: 16.095%;">4K</td><td class="xl82" style="width: 11.7236%;">5000</td><td class="xl82" style="width: 14.7553%;">19,53125</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">64K</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">350</td><td class="xl82" style="width: 16.095%;">64K</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">200</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">1M</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">500</td><td class="xl82" style="width: 16.095%;">1M</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">500</td></tr><tr><td class="xl83" height="60" rowspan="3" style="width: 15.0923%;">100</td><td class="xl82" style="width: 16.4908%;">4K</td><td class="xl82" style="width: 11.6901%;">10000</td><td class="xl82" style="width: 13.9842%;">39,0625</td><td class="xl82" style="width: 16.095%;">4K</td><td class="xl82" style="width: 11.7236%;">5000</td><td class="xl82" style="width: 14.7553%;">19,53125</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">64K</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">350</td><td class="xl82" style="width: 16.095%;">64K</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">250</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">1M</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">500</td><td class="xl82" style="width: 16.095%;">1M</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">500</td></tr><tr><td class="xl83" height="60" rowspan="3" style="width: 15.0923%;">250</td><td class="xl82" style="width: 16.4908%;">4K</td><td class="xl82" style="width: 11.6901%;">18750</td><td class="xl82" style="width: 13.9842%;">73,2421875</td><td class="xl82" style="width: 16.095%;">4K</td><td class="xl82" style="width: 11.7236%;">8750</td><td class="xl82" style="width: 14.7553%;">34,1796875</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">64K</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">350</td><td class="xl82" style="width: 16.095%;">64K</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">250</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">1M</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">585,9375</td><td class="xl82" style="width: 16.095%;">1M</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">500</td></tr><tr><td class="xl83" height="60" rowspan="3" style="width: 15.0923%;">500</td><td class="xl82" style="width: 16.4908%;">4K</td><td class="xl82" style="width: 11.6901%;">37500</td><td class="xl82" style="width: 13.9842%;">146,484375</td><td class="xl82" style="width: 16.095%;">4K</td><td class="xl82" style="width: 11.7236%;">17500</td><td class="xl82" style="width: 14.7553%;">68,359375</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">64K</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">585,9375</td><td class="xl82" style="width: 16.095%;">64K</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">500</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">1M</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">1171,875</td><td class="xl82" style="width: 16.095%;">1M</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">546,875</td></tr><tr><td class="xl83" height="60" rowspan="3" style="width: 15.0923%;">1000</td><td class="xl82" style="width: 16.4908%;">4K</td><td class="xl82" style="width: 11.6901%;">75000</td><td class="xl82" style="width: 13.9842%;">292,96875</td><td class="xl82" style="width: 16.095%;">4K</td><td class="xl82" style="width: 11.7236%;">35000</td><td class="xl82" style="width: 14.7553%;">136,71875</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">64K</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">1171,875</td><td class="xl82" style="width: 16.095%;">64K</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">546,875</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">1M</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">1200</td><td class="xl82" style="width: 16.095%;">1M</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">900</td></tr><tr><td class="xl83" height="60" rowspan="3" style="width: 15.0923%;">2000</td><td class="xl82" style="width: 16.4908%;">4K</td><td class="xl82" style="width: 11.6901%;">75000</td><td class="xl82" style="width: 13.9842%;">292,96875</td><td class="xl82" style="width: 16.095%;">4K</td><td class="xl82" style="width: 11.7236%;">50000</td><td class="xl82" style="width: 14.7553%;">195,3125</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">64K</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">1171,875</td><td class="xl82" style="width: 16.095%;">64K</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">781,25</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">1M</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">1200</td><td class="xl82" style="width: 16.095%;">1M</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">900</td></tr></tbody></table>

<info>

Производительность диска напрямую зависит от его объема. При необходимости увеличить скорость обработки данных иногда достаточно увеличить размер требуемого диска.

</info>

## Как провести тестирование

### Для Windows

Для измерения показателей IOPS чтения/записи можно воспользоваться программным обеспечением DiskSPD или Fio.

**DiskSPD**

DiskPSD — официальный инструмент тестирования, рекомендованный компанией Microsoft и [включенная в репозитории разработчиков](https://aka.ms/diskspd). Следующие шаги необходимы для выполнения тестирования:

1. Загрузить утилиту с официального ресурса и распаковать ее в удобное место: [https://github.com/microsoft/diskspd/releases/latest](https://github.com/microsoft/diskspd/releases/latest).
2. Запустить командную строку от администратора и перейти в каталог с распакованной утилитой DiskSpd-2.0.21a\\amd64\\.
3. Предварительно создать пустой файл с размером не менее 10GB:

```bash
fsutil file createnew C:\temp\test.bin 10485760000
```

4.  Для выполнения тестов необходимо применить соответствующую типу теста команду:

- Тест случайной записи:

```bash
diskspd -Suw -b4K -o1 -t32 -r -w100 C:\temp\test.bin > C:\temp\random_write_results.txt
```

- Тест случайного чтения:

```bash
diskspd -Suw -b4K -o1 -t32 -r -w0 C:\temp\test.bin > C:\temp\random_read_results.txt
```

**Fio**

Измерения показателей IOPS с помощью fio производятся с указанием параметра rate_iops. Тесты выполняются со значениями:

- \--rw (randread или randwrite)
- \--filename (имя тестируемого устройства)
- \--iodepth (8, 16, 32 или 64)

Скачать и установить Fio с [официального ресурса](https://bsdio.com/fio/).

Команда для выполнения теста:

```bash
fio --name=randwrite --iodepth=32 --rw=randwrite --bs=4k --direct=1 --size=10G --numjobs=1 --runtime=240 --group_reporting --filename=C:\Users\ADMIN\test
```

<info>

Механика работы Fio отличается от инструмента DiskSPD. Fio выполняет запись в 2 файла, поэтому результаты измерения могут быть разными у обоих инструментов. Тем не менее корпорация Microsoft доверяет своему инструменту и рекомендует на операционных системах семейства Windows использовать DiskSPD.

</info>

### Для Linux

Измерения показателей IOPS чтения/записи осуществляются программным обеспечением fio и указанием параметра rate_iops. Тесты выполняются со значениями:

- \--rw (randread или randwrite)
- \--filename (имя тестируемого устройства)
- \--iodepth (8, 16, 32 или 64)

Установка Fio:

```bash
sudo apt install fio
```

Команда для выполнения теста:

```bash
fio --name=randwrite --ioengine=libaio --iodepth=32 --rw=randwrite --bs=4k --direct=1 --size=512M --numjobs=1 --runtime=240 --group_reporting --filename=/home/user/test
```

Результаты измерений:

- read: IOPS
- write: IOPS

| Типы проводимого тестирования | Результат тестирования (Количество IOPS) |
| --- | --- |
| Чтение/запись блоками по 4 КБ в 32 потока | В соответствии со значениями SLA |
| Чтение/запись блоками по 8 КБ в 32 потока | Не менее 75% от SLA |
| Чтение/запись  по 16 КБ в 32 потока | Не менее 50% от SLA |
