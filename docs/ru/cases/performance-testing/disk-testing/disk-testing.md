Вы можете протестировать производительность дисковой подсистемы с помощью готового скрипта от VK Cloud. Этот скрипт выполняет несколько тестов с помощью инструмента [fio](https://fio.readthedocs.io/en/latest/fio_doc.html), оперируя пакетами по 10 ГБ и сохраняет результат в выходном файле.

Полученные в результате сведенья показывают характеристики производительности устройства хранения данных в различных конфигурациях.

## Подготовительные шаги

{include(/ru/_includes/_testing_preparatory.md)}

## 1. Выполните тестирование дисковой подсистемы:

1. Установите на ВМ утилиту fio:

    ```bash
    sudo apt install fio
    ```

1. Запустите скрипт `fio.sh` от VK Cloud для тестирования производительности, указав в параметре `<ИМЯ_ФАЙЛА>` файл, в котором вы хотите сохранить результат тестирования.

    <details>
    <summary>fio.sh</summary>

    ```bash
    #!/bin/bash

    # List of values for bs
    bs_values=("4k" "8k" "16k" "32k" "64k" "128k" "256k")

    # List of values for iodepth
    io_values=("1" "4" "8" "16" "32" "64")

    # Output file
    output_file="<ИМЯ_ФАЙЛА>"

    # Loop through each bs value for BW tests
    for io_value in "${io_values[@]}"
    do
        for bs_value in "${bs_values[@]}"
        do
            # BW Sequental Read
            echo "BW Sequental Read (BS = $bs_value, Queue Depth = $io_value, Thread = 1)" >> "$output_file"
            fio --bs="$bs_value" --direct=1 --buffered=0 --rw=read --ioengine=libaio --iodepth="$io_value" --numjobs=1 --runtime=30 --group_reporting --name=fio --size=10g >> "$output_file"
            echo "#" >> "$output_file"
            echo "#" >> "$output_file"

            # Sequental Write
            echo "BW Sequental Write (BS = $bs_value, Queue Depth = $io_value, Thread = 1)" >> "$output_file"
            fio --bs="$bs_value" --direct=1 --buffered=0 --rw=write --ioengine=libaio --iodepth="$io_value" --numjobs=1 --runtime=30 --group_reporting --name=fio --size=10g >> "$output_file"
            echo "#" >> "$output_file"
            echo "#" >> "$output_file"
        done
    done

    # Loop through each io value for IOPS tests
    for io_value in "${io_values[@]}"
    do
        for bs_value in "${bs_values[@]}"
        do
            # IOPS Random Read
            echo "IOPS Random Read (BS = $bs_value, Thread = 1, Queue size is $io_value)" >> "$output_file"
            fio --bs="$bs_value" --direct=1 --buffered=0 --rw=randread --ioengine=libaio --iodepth="$io_value" --numjobs=1 --runtime=30 --group_reporting --name=fio --size=10g >> "$output_file"
            echo "#" >> "$output_file"
            echo "#" >> "$output_file"

            # IOPS Random Write
            echo "IOPS Random Write (BS = $bs_value, Thread = 1, Queue size is $io_value)" >> "$output_file"
            fio --bs="$bs_value" --direct=1 --buffered=0 --rw=randwrite --ioengine=libaio --iodepth="$io_value" --numjobs=1 --runtime=30 --group_reporting --name=fio --size=10g >> "$output_file"
            echo "#" >> "$output_file"
            echo "#" >> "$output_file"

            # IOPS Mixed 70% read
            echo "IOPS Mixed 70% read (BS = $bs_value, Thread = 1, Queue size is $io_value)" >> "$output_file"
            fio --bs="$bs_value" --direct=1 --buffered=0 --rw=randrw --rwmixread=70 --ioengine=libaio --iodepth="$io_value" --numjobs=1 --runtime=30 --group_reporting --name=fio --size=10g >> "$output_file"
            echo "#" >> "$output_file"
            echo "#" >> "$output_file"

            # IOPS Mixed 30% read
            echo "IOPS Mixed 30% read (BS = $bs_value, Thread = 1, Queue size is $io_value)" >> "$output_file"
            fio --bs="$bs_value" --direct=1 --buffered=0 --rw=randrw --rwmixread=30 --ioengine=libaio --iodepth="$io_value" --numjobs=1 --runtime=30 --group_reporting --name=fio --size=10g >> "$output_file"
            echo "#" >> "$output_file"
            echo "#" >> "$output_file"
        done
    done
    ```

    </details>

## 2. Зафиксируйте результаты тестирования

Внесите результаты тестирования из файла в [таблицу](../assets/disk_testing.xlsx "download"). Теперь вы можете сравнить эти данные их с производительностью других облачных платформ.

<warn>

Чтобы сравнение производительности было объективным, используйте одинаковые методики тестирования на всех интересующих платформах.

</warn>

## Удалите неиспользуемые ресурсы

Созданные ресурсы тарифицируются. Если они вам больше не нужны, удалите их:

1. [Удалите](/ru/computing/iaas/service-management/vm/vm-manage#delete_vm) тестовую ВМ.
1. Удалите [подсеть](/ru/networks/vnet/service-management/net#udalenie_podseti) и [сеть](/ru/networks/vnet/service-management/net#udalenie_seti), в которой была размещена ВМ.
