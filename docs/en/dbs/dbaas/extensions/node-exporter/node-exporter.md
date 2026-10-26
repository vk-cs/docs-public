## Description

Extensions increase database functionality and can be installed at any time.

Prometheus is a central server designed to collect and store data. Data elements change constantly over time (for example, disk usage level, network interface traffic, website response time). Data elements are called metrics. The Prometheus server reads metrics at a set interval and stores the collected data in a Time Series DB. A Time Series DB is a type of database designed for storing time series (values tied to a point in time). In addition, Prometheus provides an interface for running queries and visualizing the collected data. The Prometheus query language is called PromQL. Prometheus operates on a Pull model, meaning it polls endpoints itself to obtain data.

Exporters are processes that collect data and transmit it to the Prometheus server. There are many different exporters, for example:

- Node_exporter — collects system metrics (CPU, memory, etc.).
- Mysqld_exporter — collects MySQL server metrics.

## Prometheus for server metrics (node_exporter)

Collector support varies across operating systems. The tables below list some collectors and the systems they support.

| Name       | Description                                                              | OS                                         |
| ---------- | ------------------------------------------------------------------------ | ------------------------------------------ |
| cpu        | Collects CPU usage statistics                                            | Darwin, Dragonfly, FreeBSD, Linux, Solaris |
| cpufreq    | Collects CPU frequency statistics                                        | Linux, Solaris                             |
| diskstats  | Collects disk I/O statistics.                                            | Darwin, Linux, OpenBSD                     |
| filesystem | Collects file system statistics, such as disk space usage.               | Darwin, Dragonfly, FreeBSD, Linux, OpenBSD |
| meminfo    | Collects RAM usage statistics.                                           | Darwin, Dragonfly, FreeBSD, Linux, OpenBSD |
| vmstat     | Collects process statistics from /proc/vmstat.                          | Linux                                      |

You can find the full list of collectors on the [official resource via this link](https://github.com/prometheus/node_exporter#collectors).

## Installing the extension

Installing an extension is quite simple. To do this, on the virtual machine card, on the "Extensions" tab, click **Add**.
