# {heading(Стандартные метрики)[id=monitoring-mon-metrics]}

На виртуальных машинах с Linux стандартный агент мониторинга собирает следующую информацию из операционной системы:

- Потребление CPU (плагин [cpu](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/cpu)):

  - `usage_guest` (float, percent) — доля времени работы виртуального CPU для гостевых ОС;
  - `usage_irq` (float, percent) — доля времени обработки аппаратных прерываний;
  - `usage_iowait` (float, percent) — доля времени ожидания ввода-вывода;
  - `usage_system` (float, percent) — доля времени CPU в системном режиме;
  - `usage_user` (float, percent) — доля времени CPU в пользовательском режиме.

- Потребление памяти (плагин [mem](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mem)):

  - `available` (integer) — оценка объема памяти, доступного для запуска новых приложений без выгрузки в swap;
  - `available_percent` (float) — доля доступной памяти;
  - `cached` (integer) — кеш прочитанных с диска файлов (страничный кеш) без учета памяти `swap_cached`;
  - `dirty` (integer) — «грязные» страницы, ожидающие записи на диск;
  - `free` (integer) — свободная память;
  - `used` (integer) — используемая память;
  - `used_percent` (float) — доля используемой памяти.

- Информация о диске (плагин [disk](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/disk)):

  - `free` (integer, bytes) — свободное место в файловой системе;
  - `inodes_free` (integer, files) — количество свободных inode;
  - `used_percent` (float, percent) — доля используемого места, рассчитывается как `used / (used + free)`.

- Информация о дисковом IO (плагин [diskio](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/diskio)):

  - `io_time` (integer, counter, milliseconds) — время, затраченное на операции ввода-вывода;
  - `read_bytes` (integer, counter, bytes) — количество прочитанных байт;
  - `read_time` (integer, counter, milliseconds) — время, затраченное на операции чтения;
  - `reads` (integer, counter) — количество завершенных операций чтения;
  - `weighted_io_time` (integer, counter, milliseconds) — взвешенное время ввода-вывода, отражающее одновременно длительность операций и накопившуюся очередь;
  - `write_bytes` (integer, counter, bytes) — количество записанных байт;
  - `write_time` (integer, counter, milliseconds) — время, затраченное на операции записи;
  - `writes` (integer, counter) — количество завершенных операций записи.

- Информация о работе сетевой подсистемы внутри ОС (плагин [net](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/net/README.md)):

  - `bytes_recv` — общее количество байт, полученных сетевым интерфейсом;
  - `bytes_sent` — общее количество байт, отправленных сетевым интерфейсом;
  - `drop_in` — общее количество отброшенных принятых пакетов;
  - `drop_out` — общее количество отброшенных отправленных пакетов;
  - `err_in` — общее количество ошибок при получении данных;
  - `err_out` — общее количество ошибок при отправке данных;
  - `packets_recv` — общее количество пакетов, полученных сетевым интерфейсом;
  - `packets_sent` — общее количество пакетов, отправленных сетевым интерфейсом.

- Информация из [NetStat](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/netstat/README.md):

  - `tcp_established` — количество установленных соединений (ESTABLISHED).

- Метрики графического процессора (плагин [nvidia_smi](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/nvidia_smi)) — собираются только на виртуальных машинах с GPU, если установлена утилита `nvidia-smi`:

  - `clocks_current_graphics` (integer) — текущая частота графического ядра (МГц);
  - `clocks_current_memory` (integer) — текущая частота видеопамяти (МГц);
  - `fan_speed` (float, percent) — скорость вращения вентилятора GPU;
  - `memory_free` (integer) — свободная память GPU;
  - `memory_total` (integer) — общий объем памяти GPU;
  - `memory_used` (integer) — используемая память GPU;
  - `pcie_link_gen_current` (integer) — текущее поколение интерфейса PCIe;
  - `pcie_link_width_current` (integer) — текущая ширина канала PCIe (количество активных линий);
  - `power_draw` (float) — энергопотребление GPU (Вт);
  - `remapped_rows_uncorrectable` (integer) — количество строк видеопамяти, переназначенных из-за неисправимых ошибок (row remapping);
  - `retired_pages_double_bit` (integer) — количество страниц памяти GPU, выведенных из эксплуатации из-за двойных битовых ошибок (ECC);
  - `temperature_gpu` (integer) — температура GPU (°C);
  - `utilization_gpu` (float, percent) — загрузка графического процессора;
  - `utilization_memory` (float, percent) — загрузка памяти GPU.

На виртуальных машинах с Windows агент собирает метрики счетчиков производительности Windows (плагин [win_perf_counters](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/win_perf_counters)). Для объектов с несколькими экземплярами (ядра процессора, диски, сетевые интерфейсы) значения собираются для каждого экземпляра отдельно, для процессора — дополнительно суммарно (`_Total`). Счетчики сгруппированы по областям мониторинга:

- Использование процессора (группа `win_cpu`):

  - `Percent_DPC_Time` — доля времени обработки отложенных вызовов процедур (DPC);
  - `Percent_Idle_Time` — доля времени простоя процессора;
  - `Percent_Interrupt_Time` — доля времени обработки аппаратных прерываний;
  - `Percent_Privileged_Time` — доля времени выполнения в привилегированном режиме (ядро);
  - `Percent_Processor_Time` — загрузка процессора: доля времени выполнения непростаивающих потоков;
  - `Percent_User_Time` — доля времени выполнения в пользовательском режиме.

- Логические диски (группа `win_disk`):

  - `Current_Disk_Queue_Length` — длина очереди запросов к диску;
  - `Free_Megabytes` — свободное место на диске, МБ;
  - `Percent_Disk_Read_Time` — доля времени обслуживания операций чтения;
  - `Percent_Disk_Time` — доля времени обслуживания запросов диском;
  - `Percent_Disk_Write_Time` — доля времени обслуживания операций записи;
  - `Percent_Free_Space` — доля свободного места на диске;
  - `Percent_Idle_Time` — доля времени простоя диска.

- Физические диски (группа `win_diskio`):

  - `Current_Disk_Queue_Length` — длина очереди запросов к диску;
  - `Disk_Read_Bytes_persec` — скорость чтения, байт/с;
  - `Disk_Reads_persec` — количество операций чтения в секунду;
  - `Disk_Write_Bytes_persec` — скорость записи, байт/с;
  - `Disk_Writes_persec` — количество операций записи в секунду;
  - `Percent_Disk_Read_Time` — доля времени обслуживания операций чтения;
  - `Percent_Disk_Time` — доля времени обслуживания запросов диском;
  - `Percent_Disk_Write_Time` — доля времени обслуживания операций записи.

- Сетевые интерфейсы (группа `win_net`):

  - `Bytes_Received_persec` — скорость приема данных, байт/с;
  - `Bytes_Sent_persec` — скорость отправки данных, байт/с;
  - `Packets_Outbound_Discarded` — количество отброшенных исходящих пакетов;
  - `Packets_Outbound_Errors` — количество ошибок при отправке пакетов;
  - `Packets_Received_Discarded` — количество отброшенных принятых пакетов;
  - `Packets_Received_Errors` — количество ошибок при приеме пакетов;
  - `Packets_Received_persec` — количество принятых пакетов в секунду;
  - `Packets_Sent_persec` — количество отправленных пакетов в секунду.

- Системная активность (группа `win_system`):

  - `Context_Switches_persec` — количество переключений контекста в секунду;
  - `Processor_Queue_Length` — длина очереди потоков, ожидающих освобождения процессора;
  - `System_Calls_persec` — количество системных вызовов в секунду;
  - `System_Up_Time` — время работы системы с момента загрузки.

- Память (группа `win_mem`):

  - `Available_Bytes` — объем доступной памяти, байт;
  - `Cache_Faults_persec` — количество обращений к страницам файлового кеша в секунду, потребовавших поиска страницы вне кеша;
  - `Demand_Zero_Faults_persec` — количество page fault в секунду, при которых страница заполняется нулями без чтения с диска;
  - `Page_Faults_persec` — общее количество page fault в секунду;
  - `Pages_persec` — количество страниц, прочитанных с диска или записанных на диск для разрешения page fault, в секунду;
  - `Pool_Nonpaged_Bytes` — размер невыгружаемого пула памяти ядра, байт;
  - `Pool_Paged_Bytes` — размер выгружаемого пула памяти ядра, байт;
  - `Standby_Cache_Core_Bytes` — размер ветви ядра кеша ожидания (standby cache), байт;
  - `Standby_Cache_Normal_Priority_Bytes` — размер ветви нормального приоритета кеша ожидания, байт;
  - `Standby_Cache_Reserve_Bytes` — размер резервной ветви кеша ожидания, байт;
  - `Transition_Faults_persec` — количество page fault в секунду, разрешенных без чтения с диска (страница уже в памяти или в переходном состоянии).

- Файл подкачки (группа `win_swap`):

  - `Percent_Usage` — доля использованного места в файле подкачки.
