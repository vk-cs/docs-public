# {heading(Стандартты метрикалар)[id=monitoring-mon-metrics]}

{include(/kz/_includes/_translated_by_ai.md)}

Linux виртуалды машиналарында стандартты мониторинг агенті операциялық жүйеден келесі ақпаратты жинайды:

- CPU тұтынуы (плагин [cpu](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/cpu)):

  - `usage_guest` (float, percent) — қонақ ОЖ үшін виртуалды CPU жұмыс уақытының үлесі;
  - `usage_irq` (float, percent) — аппараттық үзілістерді өңдеуге жұмсалған уақыттың үлесі;
  - `usage_iowait` (float, percent) — енгізу-шығаруды күтуге жұмсалған уақыттың үлесі;
  - `usage_system` (float, percent) — жүйелік режимдегі CPU уақытының үлесі;
  - `usage_user` (float, percent) — пайдаланушы режиміндегі CPU уақытының үлесі.

- Жад тұтынуы (плагин [mem](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mem)):

  - `available` (integer) — swap-қа жүктемей-ақ жаңа қосымшаларды іске қосуға қолжетімді жад көлемінің бағасы;
  - `available_percent` (float) — қолжетімді жадтың үлесі;
  - `cached` (integer) — дискіден оқылған файлдардың кеші (беттік кеш), `swap_cached` жадын есептемегенде;
  - `dirty` (integer) — дискіге жазылуды күтетін «лас» беттер;
  - `free` (integer) — бос жад;
  - `used` (integer) — пайдаланылатын жад;
  - `used_percent` (float) — пайдаланылатын жадтың үлесі.

- Диск туралы ақпарат (плагин [disk](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/disk)):

  - `free` (integer, bytes) — файлдық жүйедегі бос орын;
  - `inodes_free` (integer, files) — бос inode саны;
  - `used_percent` (float, percent) — пайдаланылатын орынның үлесі, `used / (used + free)` ретінде есептеледі.

- Дискілік IO туралы ақпарат (плагин [diskio](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/diskio)):

  - `io_time` (integer, counter, milliseconds) — енгізу-шығару операцияларына жұмсалған уақыт;
  - `read_bytes` (integer, counter, bytes) — оқылған байттардың саны;
  - `read_time` (integer, counter, milliseconds) — оқу операцияларына жұмсалған уақыт;
  - `reads` (integer, counter) — орындалған оқу операцияларының саны;
  - `weighted_io_time` (integer, counter, milliseconds) — операциялардың ұзақтығын да, жинақталған кезекті де қоса көрсететін өлшенген енгізу-шығару уақыты;
  - `write_bytes` (integer, counter, bytes) — жазылған байттардың саны;
  - `write_time` (integer, counter, milliseconds) — жазу операцияларына жұмсалған уақыт;
  - `writes` (integer, counter) — орындалған жазу операцияларының саны.

- ОЖ ішіндегі желілік ішкі жүйенің жұмысы туралы ақпарат (плагин [net](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/net/README.md)):

  - `bytes_recv` — желілік интерфейс қабылдаған байттардың жалпы саны;
  - `bytes_sent` — желілік интерфейс жіберген байттардың жалпы саны;
  - `drop_in` — алынып тасталған қабылданған пакеттердің жалпы саны;
  - `drop_out` — алынып тасталған жіберілген пакеттердің жалпы саны;
  - `err_in` — деректерді қабылдау кезіндегі қателердің жалпы саны;
  - `err_out` — деректерді жіберу кезіндегі қателердің жалпы саны;
  - `packets_recv` — желілік интерфейс қабылдаған пакеттердің жалпы саны;
  - `packets_sent` — желілік интерфейс жіберген пакеттердің жалпы саны.

- [NetStat](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/netstat/README.md) деректері:

  - `tcp_established` — орнатылған байланыстардың саны (ESTABLISHED).

- Графикалық процессор метрикалары (плагин [nvidia_smi](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/nvidia_smi)) — `nvidia-smi` утилитасы орнатылған болса, тек GPU бар виртуалды машиналарда жиналады:

  - `clocks_current_graphics` (integer) — графикалық ядроның ағымдағы жиілігі (МГц);
  - `clocks_current_memory` (integer) — бейне жадтың ағымдағы жиілігі (МГц);
  - `fan_speed` (float, percent) — GPU желдеткішінің айналу жылдамдығы;
  - `memory_free` (integer) — GPU-ның бос жады;
  - `memory_total` (integer) — GPU жадының жалпы көлемі;
  - `memory_used` (integer) — пайдаланылатын GPU жады;
  - `pcie_link_gen_current` (integer) — PCIe интерфейсінің ағымдағы буыны;
  - `pcie_link_width_current` (integer) — PCIe арнасының ағымдағы ені (белсенді желілердің саны);
  - `power_draw` (float) — GPU қуат тұтынуы (Вт);
  - `remapped_rows_uncorrectable` (integer) — жөндеуге келмейтін қателер салдарынан қайта тағайындалған бейне жад жолдарының саны (row remapping);
  - `retired_pages_double_bit` (integer) — қосарлы биттік қателер (ECC) салдарынан пайдаланудан шығарылған GPU жад беттерінің саны;
  - `temperature_gpu` (integer) — GPU температурасы (°C);
  - `utilization_gpu` (float, percent) — графикалық процессордың жүктелуі;
  - `utilization_memory` (float, percent) — GPU жадының жүктелуі.

Windows виртуалды машиналарында агент Windows өнімділік есептегіштерінің метрикаларын жинайды (плагин [win_perf_counters](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/win_perf_counters)). Бірнеше данасы бар нысандар үшін (процессор ядролары, дискілер, желілік интерфейстер) мәндер әр дана үшін бөлек жиналады, процессор үшін қосымша жалпы мәні де жиналады (`_Total`). Есептегіштер мониторинг салалары бойынша топтастырылған:

- Процессорды пайдалану (`win_cpu` тобы):

  - `Percent_DPC_Time` — кейінге қалдырылған процедура шақыруларын (DPC) өңдеуге жұмсалған уақыттың үлесі;
  - `Percent_Idle_Time` — процессор бос тұру уақытының үлесі;
  - `Percent_Interrupt_Time` — аппараттық үзілістерді өңдеуге жұмсалған уақыттың үлесі;
  - `Percent_Privileged_Time` — привилегиялық режимде (ядрода) орындау уақытының үлесі;
  - `Percent_Processor_Time` — процессордың жүктелуі: бос тұрмайтын ағындарды орындау уақытының үлесі;
  - `Percent_User_Time` — пайдаланушы режимінде орындау уақытының үлесі.

- Логикалық дискілер (`win_disk` тобы):

  - `Current_Disk_Queue_Length` — дискіге сұрау кезегінің ұзындығы;
  - `Free_Megabytes` — дискідегі бос орын, МБ;
  - `Percent_Disk_Read_Time` — оқу операцияларын қызмет көрсету уақытының үлесі;
  - `Percent_Disk_Time` — сұрауларды дискінің қызмет көрсету уақытының үлесі;
  - `Percent_Disk_Write_Time` — жазу операцияларын қызмет көрсету уақытының үлесі;
  - `Percent_Free_Space` — дискідегі бос орынның үлесі;
  - `Percent_Idle_Time` — дискінің бос тұру уақытының үлесі.

- Физикалық дискілер (`win_diskio` тобы):

  - `Current_Disk_Queue_Length` — дискіге сұрау кезегінің ұзындығы;
  - `Disk_Read_Bytes_persec` — оқу жылдамдығы, байт/с;
  - `Disk_Reads_persec` — секундына оқу операцияларының саны;
  - `Disk_Write_Bytes_persec` — жазу жылдамдығы, байт/с;
  - `Disk_Writes_persec` — секундына жазу операцияларының саны;
  - `Percent_Disk_Read_Time` — оқу операцияларын қызмет көрсету уақытының үлесі;
  - `Percent_Disk_Time` — сұрауларды дискінің қызмет көрсету уақытының үлесі;
  - `Percent_Disk_Write_Time` — жазу операцияларын қызмет көрсету уақытының үлесі.

- Желілік интерфейстер (`win_net` тобы):

  - `Bytes_Received_persec` — деректерді қабылдау жылдамдығы, байт/с;
  - `Bytes_Sent_persec` — деректерді жіберу жылдамдығы, байт/с;
  - `Packets_Outbound_Discarded` — алынып тасталған шығыс пакеттердің саны;
  - `Packets_Outbound_Errors` — пакеттерді жіберу кезіндегі қателердің саны;
  - `Packets_Received_Discarded` — алынып тасталған қабылданған пакеттердің саны;
  - `Packets_Received_Errors` — пакеттерді қабылдау кезіндегі қателердің саны;
  - `Packets_Received_persec` — секундына қабылданған пакеттердің саны;
  - `Packets_Sent_persec` — секундына жіберілген пакеттердің саны.

- Жүйелік белсенділік (`win_system` тобы):

  - `Context_Switches_persec` — секундына контекст ауысу саны;
  - `Processor_Queue_Length` — процессордың босатылуын күтетін ағындар кезегінің ұзындығы;
  - `System_Calls_persec` — секундына жүйелік шақырулардың саны;
  - `System_Up_Time` — жүйенің жүктелген сәттен бергі жұмыс уақыты.

- Жад (`win_mem` тобы):

  - `Available_Bytes` — қолжетімді жад көлемі, байт;
  - `Cache_Faults_persec` — кештен тыс бетті іздеуді қажет еткен, секундына файлдық кеш беттеріне жүгіну саны;
  - `Demand_Zero_Faults_persec` — бет дискіден оқылмай-ақ нөлдермен толтырылатын, секундынағы page fault саны;
  - `Page_Faults_persec` — секундынағы page fault жалпы саны;
  - `Pages_persec` — page fault-ты шешу үшін дискіден оқылған немесе дискіге жазылған беттердің саны, секундына;
  - `Pool_Nonpaged_Bytes` — ядро жадысының ауыстырылмайтын пулының өлшемі, байт;
  - `Pool_Paged_Bytes` — ядро жадысының ауыстырылатын пулының өлшемі, байт;
  - `Standby_Cache_Core_Bytes` — күту кешінің (standby cache) ядро бөлігінің өлшемі, байт;
  - `Standby_Cache_Normal_Priority_Bytes` — күту кешінің қалыпты басымдықтағы бөлігінің өлшемі, байт;
  - `Standby_Cache_Reserve_Bytes` — күту кешінің резервтік бөлігінің өлшемі, байт;
  - `Transition_Faults_persec` — дискіден оқылмай шешілген (бет жадыда немесе өтпелі күйде) секундынағы page fault саны.

- Ауыстыру файлы (`win_swap` тобы):

  - `Percent_Usage` — ауыстыру файлындағы пайдаланылған орынның үлесі.
