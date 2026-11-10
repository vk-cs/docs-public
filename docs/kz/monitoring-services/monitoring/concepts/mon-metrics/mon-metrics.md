# {heading(Стандартты метрикалар)[id=monitoring-mon-metrics]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Linux бар виртуалды машиналарда стандартты мониторинг агенті операциялық жүйеден мына ақпаратты жинайды:

- CPU тұтынуы ([cpu](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/cpu) плагині):

  - `usage_guest` (float, percent) — госттік ОС үшін виртуалды CPU жұмыс уақытының үлесі;
  - `usage_irq` (float, percent) — аппараттық үзілістерді өңдеу уақытының үлесі;
  - `usage_iowait` (float, percent) — енгізу-шығаруды күту уақытының үлесі;
  - `usage_system` (float, percent) — CPU жүйелік режимдегі уақытының үлесі;
  - `usage_user` (float, percent) — CPU пайдаланушылық режимдегі уақытының үлесі.

- Жад тұтынуы ([mem](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mem) плагині):

  - `available` (integer) — swap-қа шығарусыз жаңа қосымшаларды іске қосуға қолжетімді жад көлемінің бағасы;
  - `available_percent` (float) — қолжетімді жадтың үлесі;
  - `cached` (integer) — дискіден оқылған файлдардың кеші (беттік кеш), `swap_cached` жадын есептемегенде;
  - `dirty` (integer) — дискіге жазылуды күтіп тұрған «лас» беттер;
  - `free` (integer) — бос жад;
  - `used` (integer) — пайдаланылатын жад;
  - `used_percent` (float) — пайдаланылатын жадтың үлесі.

- Диск туралы ақпарат ([disk](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/disk) плагині):

  - `free` (integer, bytes) — файлдық жүйедегі бос орын;
  - `inodes_free` (integer, files) — бос inode саны;
  - `used_percent` (float, percent) — пайдаланылатын орынның үлесі, `used / (used + free)` ретінде есептеледі.

- Дискілік IO туралы ақпарат ([diskio](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/diskio) плагині):

  - `io_time` (integer, counter, milliseconds) — енгізу-шығару операцияларына жұмсалған уақыт;
  - `read_bytes` (integer, counter, bytes) — оқылған байт саны;
  - `read_time` (integer, counter, milliseconds) — оқу операцияларына жұмсалған уақыт;
  - `reads` (integer, counter) — аяқталған оқу операцияларының саны;
  - `weighted_io_time` (integer, counter, milliseconds) — енгізу-шығарудың өлшенген уақыты, операциялардың ұзақтығын да, жинақталған кезекті де көрсетеді;
  - `write_bytes` (integer, counter, bytes) — жазылған байт саны;
  - `write_time` (integer, counter, milliseconds) — жазу операцияларына жұмсалған уақыт;
  - `writes` (integer, counter) — аяқталған жазу операцияларының саны.

- ОС ішіндегі желілік подсистема жұмысы туралы ақпарат ([net](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/net/README.md) плагині):

  - `bytes_recv` — желілік интерфейс қабылдаған байттың жалпы саны;
  - `bytes_sent` — желілік интерфейс жіберген байттың жалпы саны;
  - `drop_in` — қабылданған, алынып тасталған пакеттердің жалпы саны;
  - `drop_out` — жіберілген, алынып тасталған пакеттердің жалпы саны;
  - `err_in` — деректерді қабылдау кезіндегі қателердің жалпы саны;
  - `err_out` — деректерді жіберу кезіндегі қателердің жалпы саны;
  - `packets_recv` — желілік интерфейс қабылдаған пакеттердің жалпы саны;
  - `packets_sent` — желілік интерфейс жіберген пакеттердің жалпы саны.

- [NetStat](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/netstat/README.md) ақпараты:

  - `tcp_established` — орнатылған қосылымдар саны (ESTABLISHED).

- Графикалық процессор метрикалары ([nvidia_smi](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/nvidia_smi) плагині) — GPU бар виртуалды машиналарда ғана, `nvidia-smi` утилитасы орнатылған болса жиналады:

  - `clocks_current_graphics` (integer) — графикалық ядроның ағымдағы жиілігі (МГц);
  - `clocks_current_memory` (integer) — бейнежадтың ағымдағы жиілігі (МГц);
  - `fan_speed` (float, percent) — GPU желдеткішінің айналу жылдамдығы;
  - `memory_free` (integer) — GPU бос жады;
  - `memory_total` (integer) — GPU жадының жалпы көлемі;
  - `memory_used` (integer) — пайдаланылатын GPU жады;
  - `pcie_link_gen_current` (integer) — PCIe интерфейсінің ағымдағы буыны;
  - `pcie_link_width_current` (integer) — PCIe арнасының ағымдағы ені (белсенді желілер саны);
  - `power_draw` (float) — GPU қуат тұтынуы (Вт);
  - `remapped_rows_uncorrectable` (integer) — түзетілмейтін қателер салдарынан қайта тағайындалған бейнежад жолдарының саны (row remapping);
  - `retired_pages_double_bit` (integer) — қосарлы биттік қателер (ECC) салдарынан пайдаланудан шығарылған GPU жад беттерінің саны;
  - `temperature_gpu` (integer) — GPU температурасы (°C);
  - `utilization_gpu` (float, percent) — графикалық процессордың жүктелуі;
  - `utilization_memory` (float, percent) — GPU жадының жүктелуі.

Windows бар виртуалды машиналарда агент Windows өнімділік есептегіштерінің метрикаларын жинайды ([win_perf_counters](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/win_perf_counters) плагині). Бірнеше данадан тұратын нысандар үшін (процессор ядролары, дискілер, желілік интерфейстер) мәндер әр дана үшін бөлек жиналады, процессор үшін — қосымша жиынтық түрде (`_Total`). Есептегіштер мониторинг аймақтары бойынша топтастырылған:

- Процессорды пайдалану (`win_cpu` тобы):

  - `Percent_DPC_Time` — кейінге қалдырылған процедура шақыруларын (DPC) өңдеу уақытының үлесі;
  - `Percent_Idle_Time` — процессор бос тұру уақытының үлесі;
  - `Percent_Interrupt_Time` — аппараттық үзілістерді өңдеу уақытының үлесі;
  - `Percent_Privileged_Time` — привилегиялық режимде (ядро) орындалу уақытының үлесі;
  - `Percent_Processor_Time` — процессордың жүктелуі: бос тұрмайтын ағындардың орындалу уақытының үлесі;
  - `Percent_User_Time` — пайдаланушылық режимде орындалу уақытының үлесі.

- Логикалық дискілер (`win_disk` тобы):

  - `Current_Disk_Queue_Length` — дискіге өтініштер кезегінің ұзындығы;
  - `Free_Megabytes` — дискідегі бос орын, МБ;
  - `Percent_Disk_Read_Time` — оқу операцияларына қызмет көрсету уақытының үлесі;
  - `Percent_Disk_Time` — дискінің өтініштерге қызмет көрсету уақытының үлесі;
  - `Percent_Disk_Write_Time` — жазу операцияларына қызмет көрсету уақытының үлесі;
  - `Percent_Free_Space` — дискідегі бос орынның үлесі;
  - `Percent_Idle_Time` — дискінің бос тұру уақытының үлесі.

- Физикалық дискілер (`win_diskio` тобы):

  - `Current_Disk_Queue_Length` — дискіге өтініштер кезегінің ұзындығы;
  - `Disk_Read_Bytes_persec` — оқу жылдамдығы, байт/с;
  - `Disk_Reads_persec` — секундына оқу операцияларының саны;
  - `Disk_Write_Bytes_persec` — жазу жылдамдығы, байт/с;
  - `Disk_Writes_persec` — секундына жазу операцияларының саны;
  - `Percent_Disk_Read_Time` — оқу операцияларына қызмет көрсету уақытының үлесі;
  - `Percent_Disk_Time` — дискінің өтініштерге қызмет көрсету уақытының үлесі;
  - `Percent_Disk_Write_Time` — жазу операцияларына қызмет көрсету уақытының үлесі.

- Желілік интерфейстер (`win_net` тобы):

  - `Bytes_Received_persec` — деректерді қабылдау жылдамдығы, байт/с;
  - `Bytes_Sent_persec` — деректерді жіберу жылдамдығы, байт/с;
  - `Packets_Outbound_Discarded` — алынып тасталған шығыс пакеттердің саны;
  - `Packets_Outbound_Errors` — пакеттерді жіберу кезіндегі қателердің саны;
  - `Packets_Received_Discarded` — алынып тасталған қабылданған пакеттердің саны;
  - `Packets_Received_Errors` — пакеттерді қабылдау кезіндегі қателердің саны;
  - `Packets_Received_persec` — секундына қабылданған пакеттер саны;
  - `Packets_Sent_persec` — секундына жіберілген пакеттер саны.

- Жүйелік белсенділік (`win_system` тобы):

  - `Context_Switches_persec` — секундына контекст ауыстыру саны;
  - `Processor_Queue_Length` — процессордың босатылуын күтіп тұрған ағындар кезегінің ұзындығы;
  - `System_Calls_persec` — секундына жүйелік шақырулар саны;
  - `System_Up_Time` — жүйенің жүктелген сәттен бергі жұмыс уақыты.

- Жад (`win_mem` тобы):

  - `Available_Bytes` — қолжетімді жад көлемі, байт;
  - `Cache_Faults_persec` — бетті кештен тыс іздеуді қажет еткен, секундына файлдық кеш беттеріне жүгіну саны;
  - `Demand_Zero_Faults_persec` — бет дискіден оқылмай нөлдермен толтырылатын, секундына page fault саны;
  - `Page_Faults_persec` — секундына page fault-тың жалпы саны;
  - `Page_Faults_persec` — page fault-ты шешу үшін дискіден оқылған немесе дискіге жазылған, секундына беттер саны;
  - `Pool_Nonpaged_Bytes` — ядро жадының шығарылмайтын пул өлшемі, байт;
  - `Pool_Paged_Bytes` — ядро жадының шығарылатын пул өлшемі, байт;
  - `Standby_Cache_Core_Bytes` — күту кешінің (standby cache) ядро тармағының өлшемі, байт;
  - `Standby_Cache_Normal_Priority_Bytes` — күту кешінің қалыпты басымдық тармағының өлшемі, байт;
  - `Standby_Cache_Reserve_Bytes` — күту кешінің резервтік тармағының өлшемі, байт;
  - `Transition_Faults_persec` — дискіден оқылмай шешілген (бет жадта немесе өтпелі күйде) секундына page fault саны.

- Подкачка файлы (`win_swap` тобы):

  - `Percent_Usage` — подкачка файлындағы пайдаланылған орынның үлесі.