Введение
========

Статья приводит данные о производительности виртуальных машин с предустановленной БД PostgreSQL на разных типах дисков.

Тестирование производительности проводилось на следующей конфигурации виртуальной машины:

*   объем диска 100 ГБ 
*   конфигурация Standard-4-8 (каждая нода кластера 4 ядра и 8 ГБ RAM).

#### Глоссарий:

<table><tbody><tr><td><p><strong>Термин</strong></p></td><td><p><strong>Описание</strong></p></td></tr><tr><td>pgbench</td><td>Встроенная в PostgreSQL утилита для benchmark СУБД</td></tr><tr><td>TPS</td><td>Transactions per second (метрики, которые выдает pgbench)</td></tr><tr><td>iowait</td><td>Время (в процентах) пока CPU ожидал окончания io request</td></tr><tr><td>iostat</td><td>Утилита в Linux для получения текущего среза по IO устройств</td></tr><tr><td>atop</td><td>Утилита для сбора всех показателей производительности системы</td></tr></tbody></table>

Производительность дисков
=========================

Геораспределенные диски
-----------------------

На данный момент нельзя создать DBaaS (ВМ с предустановленной СУБД) на дисках такого типа. Они **не рекомендуются** к использованию.

HDD Ceph диски
--------------

Это диски из зоны доступности Москва-Восток (dp1) и Москва-Север (ms1). Диски данного типа не дают удовлетворительной производительности, поэтому мы **не рекомендуем** использовать такой тип дисков для создания виртуальных машин в DBaaS, особенно для прод-контура (окружения с реальными данными и реальными пользователями). 

Pgbench показывает значение TPS меньше 1, при этом диск утилизирован на 100%. iowait для CPU держится стабильно 50-90%. 

#### Рекомендуемая конфигурация ВМ при выборе этого типа дисков

Не выше, чем Basic 1-2 (1 CPU, 2 Gb RAM).

Вывод iostat:

![](./assets/helpjuice_production-2fuploads-2fupload-2fimage-2f7055-2fdirect-2f1619711351350-1619711351350.png)

SSD Ceph диски
--------------

Это диски зон доступности dp1-ssd и ko1-ssd. 100 GB диск дает лимит в 3000 IO на чтение и 1500 IO на запись (QoS от Cinder).

Тестирование дисков этого типа показывает удовлетворительную производительность. Рекомендуем к использованию для тестовых и dev-контуров.

#### Рекомендуемая конфигурация ВМ при выборе этого типа дисков

Не выше, чем Basic 2-4 (2 CPU, 4 Gb RAM).

#### Чтение по pgbench:

<table><tbody><tr><td><p>transaction type: &lt;builtin: select only&gt;</p><p>scaling factor: 1000</p><p>query mode: simple</p><p>number of clients: 95</p><p>number of threads: 8</p><p>duration: 180 s</p><p>number of transactions actually processed: 333235</p><p>latency average =" 51.381 "ms</p><p>tps =" 1848.934518 (including "connections establishing)</p><p>tps =" 1849.269173 (excluding "connections establishing)</p><p>transaction type: &lt;builtin: select only&gt;</p><p>scaling factor: 1000</p><p>query mode: simple</p><p>number of clients: 95</p><p>number of threads: 8</p><p>duration: 600 s</p><p>number of transactions actually processed: 1293395</p><p>latency average =" 44.089 "ms</p><p>tps =" 2154.740370 (including "connections establishing)</p><p>tps =" 2154.835152 (excluding "connections establishing)</p></td></tr></tbody></table>

При бенче на чтение atop показывает средний iowait 70-80%. Полезная нагрузка на CPU 20-25%, PG потребляет около 4 ГБ RAM. Читаем 3000 IO в секунду (упираемся в qos), 25 КБ один IO в среднем, в итоге скорость около 70 МБ/сек. Запись почти не задействована.

Лог pgbench: [pgbench\_ssd\_600\_read](https://s3.amazonaws.com/helpjuice-static/helpjuice_production%2Fuploads%2Fupload%2Fimage%2F7055%2Fdirect%2F1619711555682-pgbench_ssd_600_read)

#### Чтение-запись:

<table><tbody><tr><td><p>transaction type: &lt;builtin: TPC-B (sort of)&gt;</p><p>scaling factor: 1000</p><p>query mode: simple</p><p>number of clients: 95</p><p>number of threads: 8</p><p>duration: 180 s</p><p>number of transactions actually processed: 73299</p><p>latency average =" 233.650 "ms</p><p>tps =" 406.590560 (including "connections establishing)</p><p>tps =" 406.650782 (excluding "connections establishing)</p><p>transaction type: &lt;builtin: TPC-B (sort of)&gt;</p><p>scaling factor: 1000</p><p>query mode: simple</p><p>number of clients: 95</p><p>number of threads: 8</p><p>duration: 600 s</p><p>number of transactions actually processed: 219609</p><p>latency average =" 259.837 "ms</p><p>tps =" 365.613804 (including "connections establishing)</p><p>tps =" 365.630913 (excluding "connections establishing)</p></td></tr></tbody></table>

Здесь очень скромные цифры, но вполне приемлемые там, где производительность не так важна. iowait в пределах 25-30%, полезная нагрузка составляет 10-15%.

Чтение в среднем составляет 600 IO в секунду и 20-30 МБ, запись в пределах от 100 до 1500 IO и 10-25 МБ в сек.

Лог pgbench: [pgbench\_ssd\_600\_rw](https://s3.amazonaws.com/helpjuice-static/helpjuice_production%2Fuploads%2Fupload%2Fimage%2F7055%2Fdirect%2F1619711653580-pgbench_ssd_600_rw)

High-iops диски
---------------

На данный момент диски High-iops сегмента доступны для выбора только после [запроса в техническую поддержку](https://mcs.mail.ru/help/contact-us). После одобрения запроса в Вашем интерфейсе панели управления VK CS появятся варианты дисков dp1-high-iops и ko1-high-iops. Диск в 100 GB дает лимиты 10000 IO на чтение и 5000 на запись.

#### Рекомендуемая конфигурация ВМ при выборе этого типа дисков

Любая на Ваш выбор.

#### Чтение:

<table><tbody><tr><td><p>transaction type: &lt;builtin: select only&gt;</p><p>scaling factor: 1000</p><p>query mode: simple</p><p>number of clients: 95</p><p>number of threads: 8</p><p>duration: 180 s</p><p>number of transactions actually processed: 1205668</p><p>latency average =" 14.206 "ms</p><p>tps =" 6687.481442 (including "connections establishing)</p><p>tps =" 6688.375636 (excluding "connections establishing)</p><p>transaction type: &lt;builtin: select only&gt;</p><p>scaling factor: 1000</p><p>query mode: simple</p><p>number of clients: 95</p><p>number of threads: 8</p><p>duration: 600 s</p><p>number of transactions actually processed: 4073739</p><p>latency average =" 13.999 "ms</p><p>tps =" 6786.034529 (including "connections establishing)</p><p>tps =" 6786.416431 (excluding "connections establishing)</p></td></tr></tbody></table>

При тестировании на чтение atop показывает средний iowait 35%. Полезная нагрузка на CPU около 50%, PG потребляет около 4 ГБ RAM. Чтение составляет 10000 IO в секунду (лимит по qos), скорость около 200-230 МБ/сек. Запись в данном случае не зависит от qos.

Лог pgbench: [pgbench\_highiops\_600\_rw](https://s3.amazonaws.com/helpjuice-static/helpjuice_production%2Fuploads%2Fupload%2Fimage%2F7055%2Fdirect%2F1619711685027-pgbench_highiops_600_rw)

* * *

Также см. статью [Типы дисков и SLA](https://mcs.mail.ru/help/ru_RU/vm-volumes/volume-sla).