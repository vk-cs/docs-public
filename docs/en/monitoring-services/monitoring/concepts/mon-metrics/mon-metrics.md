# {heading(Standard metrics)[id=monitoring-mon-metrics]}

{include(/en/_includes/_translated_by_ai.md)}

On Linux virtual machines, the standard monitoring agent collects the following information from the operating system:

- CPU consumption ([cpu](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/cpu) plugin):

  - `usage_guest` (float, percent) — the share of virtual CPU operating time for guest OSes;
  - `usage_irq` (float, percent) — the share of time spent processing hardware interrupts;
  - `usage_iowait` (float, percent) — the share of time spent waiting for I/O;
  - `usage_system` (float, percent) — the share of CPU time in system mode;
  - `usage_user` (float, percent) — the share of CPU time in user mode.

- Memory consumption ([mem](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mem) plugin):

  - `available` (integer) — an estimate of the amount of memory available for launching new applications without swapping to swap;
  - `available_percent` (float) — the share of available memory;
  - `cached` (integer) — cache of files read from disk (page cache), excluding `swap_cached` memory;
  - `dirty` (integer) — "dirty" pages waiting to be written to disk;
  - `free` (integer) — free memory;
  - `used` (integer) — used memory;
  - `used_percent` (float) — the share of used memory.

- Disk information ([disk](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/disk) plugin):

  - `free` (integer, bytes) — free space in the file system;
  - `inodes_free` (integer, files) — the number of free inodes;
  - `used_percent` (float, percent) — the share of used space, calculated as `used / (used + free)`.

- Disk I/O information ([diskio](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/diskio) plugin):

  - `io_time` (integer, counter, milliseconds) — time spent on I/O operations;
  - `read_bytes` (integer, counter, bytes) — the number of bytes read;
  - `read_time` (integer, counter, milliseconds) — time spent on read operations;
  - `reads` (integer, counter) — the number of completed read operations;
  - `weighted_io_time` (integer, counter, milliseconds) — weighted I/O time reflecting both the duration of operations and the accumulated queue;
  - `write_bytes` (integer, counter, bytes) — the number of bytes written;
  - `write_time` (integer, counter, milliseconds) — time spent on write operations;
  - `writes` (integer, counter) — the number of completed write operations.

- Information about the network subsystem within the OS ([net](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/net/README.md) plugin):

  - `bytes_recv` — the total number of bytes received by the network interface;
  - `bytes_sent` — the total number of bytes sent by the network interface;
  - `drop_in` — the total number of received packets dropped;
  - `drop_out` — the total number of sent packets dropped;
  - `err_in` — the total number of errors when receiving data;
  - `err_out` — the total number of errors when sending data;
  - `packets_recv` — the total number of packets received by the network interface;
  - `packets_sent` — the total number of packets sent by the network interface.

- Information from [NetStat](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/netstat/README.md):

  - `tcp_established` — the number of established connections (ESTABLISHED).

- GPU metrics ([nvidia_smi](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/nvidia_smi) plugin) — collected only on GPU virtual machines if the `nvidia-smi` utility is installed:

  - `clocks_current_graphics` (integer) — the current graphics core frequency (MHz);
  - `clocks_current_memory` (integer) — the current video memory frequency (MHz);
  - `fan_speed` (float, percent) — the GPU fan rotation speed;
  - `memory_free` (integer) — free GPU memory;
  - `memory_total` (integer) — total GPU memory;
  - `memory_used` (integer) — used GPU memory;
  - `pcie_link_gen_current` (integer) — the current PCIe interface generation;
  - `pcie_link_width_current` (integer) — the current PCIe link width (the number of active lanes);
  - `power_draw` (float) — GPU power consumption (W);
  - `remapped_rows_uncorrectable` (integer) — the number of video memory rows remapped due to uncorrectable errors (row remapping);
  - `retired_pages_double_bit` (integer) — the number of GPU memory pages retired due to double bit errors (ECC);
  - `temperature_gpu` (integer) — GPU temperature (°C);
  - `utilization_gpu` (float, percent) — GPU utilization;
  - `utilization_memory` (float, percent) — GPU memory utilization.

On Windows virtual machines, the agent collects Windows performance counter metrics ([win_perf_counters](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/win_perf_counters) plugin). For objects with multiple instances (CPU cores, disks, network interfaces), values are collected for each instance separately, and for the processor they are also collected in total (`_Total`). Counters are grouped by monitoring areas:

- Processor usage (`win_cpu` group):

  - `Percent_DPC_Time` — the share of time spent processing deferred procedure calls (DPC);
  - `Percent_Idle_Time` — the share of processor idle time;
  - `Percent_Interrupt_Time` — the share of time spent processing hardware interrupts;
  - `Percent_Privileged_Time` — the share of time executing in privileged mode (kernel);
  - `Percent_Processor_Time` — processor load: the share of time executing non-idle threads;
  - `Percent_User_Time` — the share of time executing in user mode.

- Logical disks (`win_disk` group):

  - `Current_Disk_Queue_Length` — the disk request queue length;
  - `Free_Megabytes` — free disk space, MB;
  - `Percent_Disk_Read_Time` — the share of time servicing read operations;
  - `Percent_Disk_Time` — the share of time the disk services requests;
  - `Percent_Disk_Write_Time` — the share of time servicing write operations;
  - `Percent_Free_Space` — the share of free disk space;
  - `Percent_Idle_Time` — the share of disk idle time.

- Physical disks (`win_diskio` group):

  - `Current_Disk_Queue_Length` — the disk request queue length;
  - `Disk_Read_Bytes_persec` — the read speed, bytes/s;
  - `Disk_Reads_persec` — the number of read operations per second;
  - `Disk_Write_Bytes_persec` — the write speed, bytes/s;
  - `Disk_Writes_persec` — the number of write operations per second;
  - `Percent_Disk_Read_Time` — the share of time servicing read operations;
  - `Percent_Disk_Time` — the share of time the disk services requests;
  - `Percent_Disk_Write_Time` — the share of time servicing write operations.

- Network interfaces (`win_net` group):

  - `Bytes_Received_persec` — the data reception speed, bytes/s;
  - `Bytes_Sent_persec` — the data transmission speed, bytes/s;
  - `Packets_Outbound_Discarded` — the number of outbound packets discarded;
  - `Packets_Outbound_Errors` — the number of packet transmission errors;
  - `Packets_Received_Discarded` — the number of received packets discarded;
  - `Packets_Received_Errors` — the number of packet reception errors;
  - `Packets_Received_persec` — the number of packets received per second;
  - `Packets_Sent_persec` — the number of packets sent per second.

- System activity (`win_system` group):

  - `Context_Switches_persec` — the number of context switches per second;
  - `Processor_Queue_Length` — the length of the thread queue waiting for the processor to become available;
  - `System_Calls_persec` — the number of system calls per second;
  - `System_Up_Time` — the system uptime since boot.

- Memory (`win_mem` group):

  - `Available_Bytes` — the amount of available memory, bytes;
  - `Cache_Faults_persec` — the number of file cache page accesses per second that required searching for a page outside the cache;
  - `Demand_Zero_Faults_persec` — the number of page faults per second where the page is filled with zeros without reading from disk;
  - `Page_Faults_persec` — the total number of page faults per second;
  - `Pages_persec` — the number of pages read from or written to disk per second to resolve page faults;
  - `Pool_Nonpaged_Bytes` — the size of the kernel non-paged memory pool, bytes;
  - `Pool_Paged_Bytes` — the size of the kernel paged memory pool, bytes;
  - `Standby_Cache_Core_Bytes` — the size of the kernel branch of the standby cache, bytes;
  - `Standby_Cache_Normal_Priority_Bytes` — the size of the normal priority branch of the standby cache, bytes;
  - `Standby_Cache_Reserve_Bytes` — the size of the reserve branch of the standby cache, bytes;
  - `Transition_Faults_persec` — the number of page faults per second resolved without reading from disk (the page is already in memory or in a transitional state).

- Swap file (`win_swap` group):

  - `Percent_Usage` — the share of used space in the swap file.
