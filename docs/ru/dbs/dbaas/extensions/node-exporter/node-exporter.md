# {heading(Node Exporter)[id=dbaas-node-exporter]}

## {heading(Описание)[id=dbaas-node-exporter-desc]}

Расширения увеличивают функциональность баз данных и могут быть установлены в любое время.

Prometheus — центральный сервер, предназначенный для сбора и хранения данных. Данные постоянно изменяются во времени (например, уровень заполненности диска, трафик через сетевой интерфейс, время отклика сайта). Элементы данных называются метриками. Сервер Prometheus с заданной периодичностью считывает метрики и помещает полученные данные в Time Series DB.

Time Series DB — это разновидность баз данных, предназначенная для хранения временных рядов — значений с привязкой ко времени. Кроме того, Prometheus предоставляет интерфейс для выполнения запросов и визуализации полученных данных. Язык запросов Prometheus называется PromQL. Prometheus работает по модели Pull, то есть он сам опрашивает эндпоинты (endpoint) с целью получения данных.

Exporters — процессы, обеспечивающие сбор и их передачу серверу Prometheus. 
{ifdef(public)}
Существует много разных exporters, например:

- Node_exporter — сбор системных метрик (процессор, память, и т.д.).
- Mysqld_exporter — сбор метрик работы сервера MySQL.
{/ifdef}

{ifndef(public)}
После запуска exporter начинает сбор соответствующих метрик и ожидает запросов от сервера Prometheus по заданному порту (параметр `listen_port` при установке). Данные передаются в формате HTTP.
{/ifndef}

## {heading(Prometheus для серверных метрик (node_exporter))[id=dbaas-node-exporter-prometheus]}

{ifndef(public)}
Название модуля в личном кабинете: `node_exporter`.
{/ifndef}

Существует разная поддержка для сборщиков в каждой операционной системе.
{ifdef(public)}
В таблицах ниже перечислены некоторые сборщики и поддерживаемые системы.

| Name       | Description                                                               | OS                                         |
| ---------- |---------------------------------------------------------------------------| ------------------------------------------ |
| cpu        | Собирает статистику использования процессора                              | Darwin, Dragonfly, FreeBSD, Linux, Solaris |
| cpufreq    | Собирает статистику частоты процессора                                    | Linux, Solaris                             |
| diskstats  | Собирает статистику дискового ввода-вывода (I/O).                         | Darwin, Linux, OpenBSD                     |
| filesystem | Собирает статистику файловой системы, например, занятого места на дисках. | Darwin, Dragonfly, FreeBSD, Linux, OpenBSD |
| meminfo    | Собирает статистику использования оперативной памяти.                     | Darwin, Dragonfly, FreeBSD, Linux, OpenBSD |
| vmstat     | Собирает статистику процессов из /proc/vmstat.                            | Linux                                      |
{/ifdef}

Полный список всех сборщиков приведен в [официальной документации](https://github.com/prometheus/node_exporter#collectors).

{ifndef(public)}
Пример настройки мониторинга на основе Prometheus, Grafana и Node_exporter приведен в [официальной документации](https://mcs.mail.ru/docs/ru/additionals/cases/cases-monitoring/case-node-exporter) {var(cloud)}.
{/ifndef}