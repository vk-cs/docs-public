# {heading(Производительность дисков блочного хранения)[id=iaas-volume-sla]}

В системе хранения данных на {var(cloud)} используются диски различных типов:

- HDD;
- SSD;
- High-IOPS SSD;
- High-IOPS HA SSD;
- Low Latency NVMe.

Подробнее — в разделе о {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=дисках блочного хранения]} в {var(cloud)}.

Для каждого типа диска гарантируются определенные характеристики производительности. Квоты и лимиты на количество и размер дисков приведены в статье {linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоты и лимиты]}.

{note:info}
Значение задержки (latency) гарантируется только для дисков Low Latency NVMe.<br/>
Для остальных типов дисков величина задержки является приблизительной и указана для справки.
{/note}

[cols="2,1,1,1,1,1", options="header"]
|===
|Тип диска<br/>(название в API)
|Чтение, IOPS<br/>мин.—макс.
|Чтение,<br/>IOPS/ГБ
|Запись, IOPS <br/>мин.—макс.
|Запись,<br/>IOPS/ГБ
|Задержка, мс<br/>макс.

|Сетевой HDD-диск<br/>(ceph-hdd)
|300–2400
|1
|150–800
|1
|20

|Сетевой SSD-диск<br/>(ceph-ssd)
|1000–16000
|30
|500–8000
|15
|3

|High-IOPS SSD<br/>(high-iops)
|10000–45000
|30
|5000–30000
|25
|1

|High-IOPS HA SSD<br/>(high-iops-ha)
|7500–35000
|25
|2000–12000
|15
|1

|Low Latency NVMe<br/>(ef-nvme)
|10000–75000
|75
|5000–50000
|35
|0,5
|===

{note:info}
Производительность диска зависит от его объема. В некоторых случаях для увеличения скорости обработки данных достаточно увеличить размер диска.
{/note}

## {heading(Сетевой HDD-диск)[id=iaas-volume-sla-hdd]}

Ниже даны подробные характеристики производительности для сетевых HDD-дисков разного объема.

[cols="1,1,1,1,1", options="header"]
|===
|Размер, ГБ
|Чтение, IOPS<br/>bs=4k,<br/>iodepth=32
|Чтение, МБ/с<br/>bs=1M,<br/>iodepth=16
|Запись, IOPS<br/>bs=4k,<br/>iodepth=32
|Запись, МБ/с<br/>bs=1M,<br/>iodepth=16

|10
|300
|38
|150
|19

|50
|300
|38
|150
|19

|100
|300
|38
|150
|19

|250
|300
|38
|250
|31

|500
|500
|63
|500
|63

|1000
|1000
|125
|800
|100

|1500
|1500
|188
|800
|100

|2000
|2000
|250
|800
|100
|===

Здесь `bs` и `iodepth` — параметры {linkto(#iaas-volume-sla-volume-test)[text=тестирования производительности]}.

## {heading(Сетевой SSD-диск)[id=iaas-volume-sla-ssd]}

Ниже даны подробные характеристики производительности для сетевых SDD-дисков разного объема.

[cols="1,1,1,1,1", options="header"]
|===
|Размер, ГБ 
|Чтение, IOPS<br/>bs=4k,<br/>iodepth=32 
|Чтение, МБ/с<br/>bs=1M,<br/>iodepth=16 
|Запись, IOPS<br/>bs=4k,<br/>iodepth=32 
|Запись, МБ/с<br/>bs=1M,<br/>iodepth=16 |

|10
|1000
|125
|500
|63

|50
|1500
|188
|750
|94

|100
|3000
|375
|1500
|188

|250
|7500
|400
|3750
|400

|500
|15000
|400
|7500
|400

|1000
|16000
|400
|8000
|400

|1500
|16000
|400
|8000
|400

|2000
|16000
|400
|8000
|400
|===

Здесь `bs` и `iodepth` — параметры {linkto(#iaas-volume-sla-volume-test)[text=тестирования производительности]}.

## {heading(High-IOPS SSD)[id=iaas-volume-sla-high-iops-ssd]}

Ниже даны подробные характеристики производительности для сетевых дисков High-IOPS SSD разного объема.

[cols="1,1,1,1,1", options="header"]
|===
|Размер, ГБ
|Чтение, IOPS<br/>bs=4k,<br/>iodepth=32
|Чтение, МБ/с<br/>bs=1M,<br/>iodepth=16
|Запись, IOPS<br/>bs=4k,<br/>iodepth=32
|Запись, МБ/с<br/>bs=1M,<br/>iodepth=16

|10
|10000
|500
|5000
|500

|50
|10000
|500
|5000
|500

|100
|10000
|500
|5000
|500

|250
|10000
|500
|6250
|500

|500
|15000
|500
|12500
|500

|1000
|30000
|500
|25000
|500

|1500
|45000
|500
|30000
|500

|2000
|45000
|500
|30000
|500
|===

Здесь `bs` и `iodepth` — параметры {linkto(#iaas-volume-sla-volume-test)[text=тестирования производительности]}.

## {heading(High-IOPS HA SSD)[id=iaas-volume-sla-high-iops-ha-ssd]}

Ниже даны подробные характеристики производительности для сетевых дисков High-IOPS HA SSD разного объема.

[cols="1,1,1,1,1", options="header"]
|===
|Размер, ГБ
|Чтение, IOPS<br/>bs=4k,<br/>iodepth=32
|Чтение, МБ/с<br/>bs=1M,<br/>iodepth=16
|Запись, IOPS<br/>bs=4k,<br/>iodepth=32
|Запись, МБ/с<br/>bs=1M,<br/>iodepth=16

|10
|7500
|375
|2000
|250

|50
|7500
|375
|2000
|250

|100
|7500
|375
|2000
|250

|250
|7500
|375
|3750
|300

|500
|12500
|375
|7500
|300

|1000
|25000
|375
|12000
|300

|1500
|35000
|375
|12000
|300

|2000
|35000
|375
|12000
|300
|===

Здесь `bs` и `iodepth` — параметры {linkto(#iaas-volume-sla-volume-test)[text=тестирования производительности]}.

## {heading(Low Latency NVMe)[id=iaas-volume-sla-llnvme]}

Ниже даны подробные характеристики производительности для локальных дисков Low Latency NVMe разного объема.

[cols="1,1,1,1,1", options="header"]
|===
|Размер, ГБ
|Чтение, IOPS<br/>bs=4k,<br/>iodepth=32
|Чтение, МБ/с<br/>bs=1M,<br/>iodepth=16
|Запись, IOPS<br/>bs=4k,<br/>iodepth=32
|Запись, МБ/с<br/>bs=1M,<br/>iodepth=16

|10
|10000
|500
|5000
|500

|50
|10000
|500
|5000
|500

|100
|10000
|500
|5000
|500

|250
|18750
|586
|8750
|500

|500
|37500
|1172
|17500
|547

|1000
|75000
|1200
|35000
|900

|1500
|75000
|1200
|50000
|900

|2000
|75000
|1200
|50000
|900
|===

Здесь `bs` и `iodepth` — параметры {linkto(#iaas-volume-sla-volume-test)[text=тестирования производительности]}.

## {heading(Тестирование производительности дисков)[id=iaas-volume-sla-volume-test]}

1. Перед тестированием убедитесь, что выполняются условия:

   - диск является {linkto(../../../../../computing/iaas/instructions/vm/vm-root-replace#iaas-vm-root-replace)[text=незагрузочным]};
   - отсутствует нагрузка на диск со стороны операционной системы.

   При выполнении этих условий результаты измерений IOPS должны соответствовать следующим значениям:

   [cols="3,2", options="header"]
   |===
   |Тип тестирования
   |Результат, IOPS

   |Чтение и запись блоками по 4 КБ в 32 потока
   |Соответствует SLA

   |Чтение и запись блоками по 8 КБ в 32 потока
   |Не менее 75% от SLA

   |Чтение и запись блоками по 16 КБ в 32 потока
   |Не менее 50% от SLA
   |===

1. Протестируйте диск.

   {tabs}
   
   {tab(Windows)}
      
   Чтобы измерить IOPS при чтении и записи, используйте утилиты DiskSpd или FIO.

   {note:info}
   Результаты измерений, полученные с помощью DiskSpd и FIO, могут отличаться. DiskSpd — утилита, созданная и рекомендованная Microsoft для тестирования дисков в ОС Windows.
   {/note}

   **DiskSpd**

   1. Запустите командную строку от имени администратора.
   1. Создайте директорию `temp` и пустой файл размером не менее 10 ГБ:

      ```console
      md C:\temp
      fsutil file createnew C:\temp\test.bin 10485760000
      ```

   1. [Загрузите утилиту](https://github.com/microsoft/diskspd/releases/latest) и распакуйте в нужную директорию.
   1. Перейдите в директорию `amd64` распакованной утилиты.
   1. Выполните команду `diskspd` с параметрами, соответствующими типу теста:

      - `-w` — процент операций записи, `-w0` для теста чтения, `-w100` для теста записи;
      - `-b` — размер блока в байтах.

      Подробное описание всех параметров команды `diskspd` — в [официальной документации](https://github.com/Microsoft/diskspd/wiki/Command-line-and-parameters).

      - Тест случайной записи блоками по 4 КБ:

        ```console
        diskspd -Suw -b4K -o1 -t32 -r -w100 C:\temp\test.bin > C:\temp\random_write_results.txt
        ```

      - Тест случайного чтения блоками по 4 КБ:

        ```console
        diskspd -Suw -b4K -o1 -t32 -r -w0 C:\temp\test.bin > C:\temp\random_read_results.txt
        ```

   **FIO**

   1. [Скачайте](https://bsdio.com/fio/) и установите FIO.
   1. Выполните команду `fio` с параметрами, соответствующими типу теста:

      - `--rw` — `randread` или `randwrite`.
      - `--bs` — размер блока.
      - `--filename` — имя тестового файла.
      - `--rate_iops` — целевое значение IOPS (опционально). Используйте этот параметр, чтобы при тестировании целевого значения IOPS получить более точную величину задержки (latency).

      Подробное описание всех параметров команды — в [документации FIO](https://fio.readthedocs.io/en/latest/fio_doc.html#command-line-options).

      - Тест случайной записи блоками по 4 КБ:

        {note:err}
        Не указывайте в параметре `filename` имя файла с нужными данными! При тестах записи содержимое этого файла будет перезаписано.
        {/note}

        {tabs}
         
        {tab(PowerShell)}
                  
        ```console
        fio `
           --name=randwrite `
           --iodepth=32 `
           --rw=randwrite `
           --bs=4k `
           --direct=1 `
           --size=10G `
           --numjobs=1 `
           --runtime=240 `
           --group_reporting `
           --filename=C:\Users\ADMIN\test
        ```

        {/tab}
         
        {tab(Командная строка)}
         
        ```console
        fio ^
           --name=randwrite ^
           --iodepth=32 ^
           --rw=randwrite ^
           --bs=4k ^
           --direct=1 ^
           --size=10G ^
           --numjobs=1 ^
           --runtime=240 ^
           --group_reporting ^
           --filename=C:\Users\ADMIN\test
        ```

        {/tab}

        {/tabs}

      - Тест случайного чтения блоками по 4 КБ:

        {tabs}
         
        {tab(PowerShell)}
                  
        ```console
        fio `
           --name=randread `
           --iodepth=32 `
           --rw=randread `
           --bs=4k `
           --direct=1 `
           --size=10G `
           --numjobs=1 `
           --runtime=240 `
           --group_reporting `
           --filename=C:\Users\ADMIN\test
        ```

        {/tab}
         
        {tab(Командная строка)}
         
        ```console
        fio ^
           --name=randread ^
           --iodepth=32 ^
           --rw=randread ^
           --bs=4k ^
           --direct=1 ^
           --size=10G ^
           --numjobs=1 ^
           --runtime=240 ^
           --group_reporting ^
           --filename=C:\Users\ADMIN\test
        ```

        {/tab}
         
        {/tabs}

   {/tab}

   {tab(Linux)}
   
   Чтобы измерить IOPS при чтении и записи, используйте утилиту FIO.

   {note:info}
   Эта методика применима только для тестирования разделов с файловой системой `ext2`, `ext3`, `ext4` или `xfs`.
   {/note}

   1. Обновите список пакетов:

      ```console
      sudo apt update
      ```

   1. Установите FIO:

      ```console
      sudo apt install fio
      ```

   1. Выполните команду `fio` с параметрами, соответствующими типу теста:

      - `--rw` — `randread` или `randwrite`.
      - `--bs` — размер блока.
      - `--filename` — имя тестового файла. У пользователя должны быть права на чтение и запись в `filename` для запуска тестов.
      - `--rate_iops` — целевое значение IOPS (опционально). Используйте этот параметр, чтобы при тестировании целевого значения IOPS получить более точную величину задержки (latency).

      Подробное описание всех параметров команды — в [документации FIO](https://fio.readthedocs.io/en/latest/fio_doc.html#command-line-options).

      - Тест случайной записи блоками по 4 КБ:

        {note:err}
        Не указывайте в параметре `filename` имя файла с нужными данными! При тестах записи содержимое этого файла будет перезаписано.
        {/note}

        ```console
        fio \
           --name=randwrite \
           --ioengine=libaio \
           --iodepth=32 \
           --rw=randwrite \
           --bs=4k \
           --direct=1 \
           --size=512M \
           --numjobs=1 \
           --runtime=240 \
           --group_reporting \
           --filename=/home/user/test
        ```

      - Тест случайного чтения блоками по 4 КБ:

        ```console
        fio \
           --name=randread \
           --ioengine=libaio \
           --iodepth=32 \
           --rw=randread \
           --bs=4k \
           --direct=1 \
           --size=512M \
           --numjobs=1 \
           --runtime=240 \
           --group_reporting \
           --filename=/home/user/test
        ```

   {/tab}

   {/tabs}

1. Если при выполнении всех условий результаты теста не соответствуют указанным значениям, обратитесь в [техническую поддержку](/ru/contacts).
1. После завершения тестирования и обработки результатов удалите тестовые файлы большого размера, чтобы освободить место на диске. Квоты и лимиты на использование ресурсов {var(cloud)} приведены в статье {linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоты и лимиты]}.
