# {heading(Monitoring)[id=bare-metal-monitoring]}

{include(/en/_includes/_translated_by_ai_en.md)}

When {linkto(../instructions/os-setup#bare-metal-os-setup)[text=installing]} an OS, as well as when {linkto(../instructions/manage-service#bare-metal-manage-service-order)[text=ordering]} a new server, the **Enable monitoring** option is available. It installs the telegraf monitoring agent.

{note:info}
The monitoring agent is available only when installing an OS from {var(cloud)} images.
{/note}

The agent collects Bare Metal server metrics and sends them to the {linkto(../../../monitoring-services/monitoring#monitoring)[text=Cloud Monitoring]} service. This allows you to track CPU load, memory and disk space usage, network load, and other indicators.

You can {linkto(../instructions/manage-server#bare-metal-server-get-info)[text=view]} a minimal set of server metrics in the server card in the {var(cloud)} management console or {linkto(../../../monitoring-services/monitoring/instructions/manage-dashboards#monitoring-create-custom-chart)[text=create]} your own dashboard with charts.

## {heading(Bare Metal server metrics)[id=bare-metal-monitoring-metrics]}

The agent collects operating system metrics every 10 seconds and sends them to the `mcs/baremetal` {linkto(../../../monitoring-services/monitoring/concepts/architecture#monitoring-namespace)[text=namespace]}.

Bare Metal service {linkto(../../../monitoring-services/monitoring/concepts/architecture#monitoring-label)[text=labels]} in Cloud Monitoring:

- `service_id` — has the value `BMaaS`.
- `group_id` — has the value `Server`.
- `stream_id` — the server ID, which you can {linkto(../instructions/manage-server#bare-metal-server-get-info)[text=find out]} in the server card.

### {heading(CPU)[id=bare-metal-monitoring-metrics-cpu]}

All metrics show the current value summed across all CPU cores.

Label in Cloud Monitoring: `cpu=cpu-total`.

[cols="2,5", options="header"]
|===
|Metric
|Description

|`cpu_usage_user`
|The share of time during which the CPU processes user processes.

Used to estimate the load created by user applications.

Unit: %

|`cpu_usage_system`
|The share of time during which the CPU processes system processes at the OS kernel level.

Allows you to detect anomalies in system operation, for example, frequent system calls or intensive disk and network activity.

Unit: %

|`cpu_usage_iowait`
|The share of time during which the CPU is idle waiting for I/O operations to complete.

Used to identify delays in the storage subsystem. The causes may vary: the drive cannot cope with the load; processes compete for I/O; a driver or low-level software is malfunctioning, or the data bus or the drive itself is faulty.

Unit: %

|`cpu_usage_irq`
|The share of time during which the CPU handles hardware interrupts.

Allows you to detect high load when handling requests from hardware, for example, from network adapters under heavy traffic.

Unit: %

|`cpu_usage_guest`
|The share of time during which the CPU executes guest OS code.

Allows you to estimate resource utilization by virtual machines if a hypervisor is used on the server.

Unit: %
|===

### {heading(Memory)[id=bare-metal-monitoring-metrics-mem]}

All metrics show the current value. Cloud Monitoring labels are not used.

[cols="2,5", options="header"]
|===
|Metric
|Description

|`mem_used_percent`
|The share of used RAM relative to the total amount.

Used to estimate memory consumption.

Unit: %

|`mem_used`
|The amount of used RAM.

Used to estimate memory consumption in absolute values.

Unit: bytes

|`mem_available_percent`
|The share of available memory relative to the total amount.

Allows you to estimate the RAM available for new user applications.

Unit: %

|`mem_available`
|The amount of memory available to applications without using the swap file.

Allows you to estimate the RAM available for new user applications in absolute values.

Unit: bytes

|`mem_cached`
|The amount of memory occupied by the file system cache.

Allows you to estimate the amount of RAM used by the OS to speed up disk operations.

Unit: bytes

|`mem_dirty`
|The amount of data in memory queued for writing.

Allows you to identify delays in the storage subsystem if the value is high or grows quickly together with `cpu_usage_iowait`. Possible causes are described for the `cpu_usage_iowait` metric.

Unit: bytes

|`mem_free`
|The amount of memory that is not used in any way.

Allows you to distinguish truly free memory from other memory types.

Unit: bytes
|===

### {heading(File systems)[id=bare-metal-monitoring-metrics-fs]}

The current value is collected for each file system.

Cloud Monitoring labels:
- `device` — the device name without the `/dev/` prefix;
- `path` — the mount point;
- `fstype` — the file system type.

The system file systems `tmpfs`, `devtmpfs`, `devfs`, `iso9660`, `overlay`, `aufs`, `squashfs` are not taken into account.

[cols="2,5", options="header"]
|===
|Metric
|Description

|`disk_used_percent`
|File system usage.

Used to track drive space utilization.

Unit: %

|`disk_free`
|The amount of free space in the file system.

Used to estimate the available drive capacity in absolute values.

Unit: bytes

|`disk_inodes_free`
|The number of free index descriptors (inodes) in the file system.

Allows you to detect a shortage of index descriptors (inodes) for storing metadata. Their number is limited, and if there are many small files, inodes may run out before disk space does, which makes it impossible to create new objects.

Unit: pieces
|===

### {heading(Disk I/O)[id=bare-metal-monitoring-metrics-diskio]}

A separate value is collected for each disk. All metrics show the counter value since the OS boot.

Cloud Monitoring uses the `name` label — the device name without the `/dev/` prefix.

[cols="2,5", options="header"]
|===
|Metric
|Description

|`diskio_reads`
|The number of completed read operations.

Used to estimate the intensity of read operations (IOPS).

Unit: pieces

|`diskio_writes`
|The number of completed write operations.

Used to estimate the intensity of write operations (IOPS).

Unit: pieces

|`diskio_read_bytes`
|The amount of data read.

Used to estimate the disk read speed by comparing intermediate values.

Unit: bytes

|`diskio_write_bytes`
|The amount of data written.

Used to estimate the disk write speed by comparing intermediate values.

Unit: bytes

|`diskio_read_time`
|The total time spent on read operations.

Allows you to identify an increase in read latency by comparing intermediate values.

Unit: milliseconds

|`diskio_write_time`
|The total time spent on write operations.

Allows you to identify an increase in write latency by comparing intermediate values.

Unit: milliseconds

|`diskio_io_time`
|The time during which the disk was busy with I/O operations.

Allows you to identify an increase in the total time spent on I/O operations by comparing intermediate values.

Unit: milliseconds

|`diskio_weighted_io_time`
|The disk busy time weighted by the number of requests in the queue.

Allows you to identify disk overload: the value grows faster than `diskio_io_time` if requests are queued.

Unit: milliseconds
|===

### {heading(Network)[id=bare-metal-monitoring-metrics-net]}

A separate value is collected for each network interface. Except for `netstat_tcp_established`, all metrics show the counter value since the OS boot. For `netstat_tcp_established`, the current value is shown.

Cloud Monitoring uses the `interface` label — the network interface name used at the Linux kernel level.

[cols="2,5", options="header"]
|===
|Metric
|Description

|`net_bytes_sent`
|The amount of data sent.

Used to estimate outgoing traffic.

Unit: bytes

|`net_bytes_recv`
|The amount of data received.

Used to estimate incoming traffic.

Unit: bytes

|`net_packets_sent`
|The number of packets sent.

Used to estimate the intensity of outgoing traffic in packets.

Unit: pieces

|`net_packets_recv`
|The number of packets received.

Used to estimate the intensity of incoming traffic in packets.

Unit: pieces

|`net_err_in`
|The number of errors when receiving packets.

Allows you to identify problems with network equipment or the communication channel by an increase in the count.

Unit: pieces

|`net_err_out`
|The number of errors when sending packets.

Allows you to identify problems with network equipment or the communication channel by an increase in the count.

Unit: pieces

|`net_drop_in`
|The number of dropped incoming packets.

Allows you to identify overload of the network interface or the OS.

Unit: pieces

|`net_drop_out`
|The number of dropped outgoing packets.

Allows you to identify overload of the network interface or the OS.

Unit: pieces

|`netstat_tcp_established`
|The number of established TCP connections.

Used to estimate the number of active connections to the server.

Unit: pieces
|===

### {heading(GPU)[id=bare-metal-monitoring-metrics-gpu]}

For servers with a GPU, a separate value is collected for each device. All metrics show the current value requested using the `nvidia-smi` utility.

Cloud Monitoring uses the following labels:

- `index` — the GPU sequence number on the server, starting from `0`;
- `uuid` — the unique GPU ID;
- `name` — the GPU model.

[cols="2,5", options="header"]
|===
|Metric
|Description

|`nvidia_smi_utilization_gpu`
|GPU compute core utilization.

Used to estimate the GPU load.

Unit: %

|`nvidia_smi_utilization_memory`
|GPU memory bus utilization.

Allows you to identify performance limitations caused by VRAM access speed.

Unit: %

|`nvidia_smi_memory_used`
|The amount of used GPU memory.

Used to track VRAM utilization.

Unit: MiB

|`nvidia_smi_memory_free`
|The amount of free GPU memory.

Used to track free VRAM capacity.

Unit: MiB

|`nvidia_smi_memory_total`
|The total amount of GPU memory.

Allows you to estimate the total VRAM capacity and compare it with the `nvidia_smi_memory_used` and `nvidia_smi_memory_free` values.

Unit: MiB

|`nvidia_smi_temperature_gpu`
|GPU temperature.

Used to track temperature in order to prevent frequency throttling.

Unit: °C

|`nvidia_smi_power_draw`
|The power consumed by the GPU.

Used to estimate power consumption.

Unit: W

|`nvidia_smi_clocks_current_graphics`
|The current frequency of the graphics processor.

Allows you to track frequency throttling caused by overheating or power limits.

Unit: MHz

|`nvidia_smi_clocks_current_memory`
|The current GPU memory frequency.

Allows you to track memory frequency reduction caused by overheating or power limits.

Unit: MHz

|`nvidia_smi_fan_speed`
|The GPU fan speed as a percentage of the maximum.

Used to check the operation of the cooling system.

Unit: %

|`nvidia_smi_pcie_link_gen_current`
|The current generation of the PCIe interface through which the GPU is connected.

Allows you to analyze GPU performance taking the interface generation into account.

Unit: generation number

|`nvidia_smi_pcie_link_width_current`
|The current number of PCIe lanes through which the GPU is connected.

Allows you to analyze GPU performance taking the number of lanes into account.

Unit: number of lanes

|`nvidia_smi_retired_pages_double_bit`
|The number of GPU memory pages retired due to uncorrectable ECC errors.

Allows you to identify VRAM faults.

Unit: pieces

|`nvidia_smi_remapped_rows_uncorrectable`
|The number of GPU memory rows remapped due to uncorrectable errors.

Allows you to identify VRAM faults.

Unit: pieces
|===

## {heading(Standard dashboard charts)[id=bare-metal-monitoring-dashboard]}

[cols="2,5", options="header"]
|===
|Chart
|Description

|RAM Used
|Allows you to estimate memory consumption.

Metrics: `mem_used_percent`.

Unit: %

|Current IOWait
|Allows you to identify delays in the storage subsystem. Possible causes are described for the `cpu_usage_iowait` metric.

Metrics: `cpu_usage_iowait`.

Unit: %

|Current CPU
|Allows you to estimate the overall CPU load.

Metrics: the sum of `cpu_usage_user`, `cpu_usage_system`, `cpu_usage_iowait`, `cpu_usage_irq`, `cpu_usage_guest`.

Unit: %

|Disk Used
|Allows you to track file system space utilization.

Metrics: `disk_used_percent` (the maximum value among all file systems).

Unit: %

|CPU
|Allows you to track how the application load and I/O wait change over time.

Metrics: `cpu_usage_user` (the **User** series), `cpu_usage_iowait` (the **IO wait** series).

Unit: %

|RAM
|Allows you to track how RAM usage changes over time.

Metrics: `mem_used_percent` (the **Used** series).

Unit: %

|Disk IO
|Allows you to track how the disk read and write speed changes over time.

Metrics: `diskio_read_bytes` (the **Reads** series), `diskio_write_bytes` (the **Writes** series), as a rate of change (`rate`), summed across all disks.

Unit: bytes/s

|Disk used
|Allows you to track how the usage of each file system changes over time.

Metrics: `disk_used_percent`, one series for each file system.

Unit: %

|Network
|Allows you to track how the speed of sending and receiving data over the network changes over time.

Metrics: `net_bytes_sent` (the **Sent** series), `net_bytes_recv` (the **Received** series), as a rate of change (`rate`), summed across all network interfaces.

Unit: bytes/s
|===
