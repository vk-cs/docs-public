{include(/kz/_includes/_translated_by_ai.md)}

Сіз дискілік ішкі жүйенің өнімділігін VK Cloud дайын скриптінің көмегімен тестілей аласыз. Бұл скрипт [fio](https://fio.readthedocs.io/en/latest/fio_doc.html) құралының көмегімен бірнеше тестті орындайды, 10 ГБ пакеттермен жұмыс істейді және нәтижені шығыс файлында сақтайды.

Нәтижесінде алынған мәліметтер әртүрлі конфигурациялардағы деректерді сақтау құрылғысының өнімділік сипаттамаларын көрсетеді.

## Дайындық қадамдары

{include(/kz/_includes/_testing_preparatory.md)}

## 1. Дискілік ішкі жүйені тестілеуді орындаңыз:

1. ВМ-ге fio утилитасын орнатыңыз:

    ```console
    sudo apt install fio
    ```

1. VK Cloud ұсынған `fio.sh` скриптін өнімділікті тестілеу үшін іске қосыңыз, `<ФАЙЛ_АТАУЫ>` параметрінде тестілеу нәтижесін сақтағыңыз келетін файлды көрсетіңіз.

    {cut(fio.sh)}

    ```console
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

    {/cut}

## 2. Тестілеу нәтижелерін тіркеңіз

Тестілеу нәтижелерін файлдан [кестеге](../assets/disk_testing.xlsx "download") енгізіңіз. Енді сіз бұл деректерді басқа бұлттық платформалардың өнімділігімен салыстыра аласыз.

{note:warn}

Өнімділікті салыстыру объективті болуы үшін, сізді қызықтыратын барлық платформаларда бірдей тестілеу әдістемелерін пайдаланыңыз.

{/note}

## Пайдаланылмайтын ресурстарды жойыңыз

Жасалған ресурстар тарифтелмейді. Егер олар енді қажет болмаса, оларды жойыңыз:

1. [Жойыңыз](/kz/computing/iaas/instructions/vm/vm-manage#delete_vm) тестілік ВМ-ді.
1. ВМ орналастырылған [ішкі желіні](/kz/networks/vnet/instructions/net#ishki_zhelini_zhoyu) және [желіні](/kz/networks/vnet/instructions/net#zhelini_zhoyu) жойыңыз.
