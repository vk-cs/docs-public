
{include(/en/_includes/_translated_by_ai_en.md)}

You can test the performance of the disk subsystem using a ready-made script from VK Cloud. This script runs several tests using the [fio](https://fio.readthedocs.io/en/latest/fio_doc.html) tool, operating with 10 GB batches, and saves the result to an output file.

The resulting data shows the performance characteristics of the storage device in various configurations.

## Preparatory steps

{include(/en/_includes/_testing_preparatory.md)}

## 1. Run the disk subsystem testing:

1. Install the fio utility on the VM:

    ```console
    sudo apt install fio
    ```

1. Run the `fio.sh` script from VK Cloud to test performance, specifying in the `<FILE_NAME>` parameter the file where you want to save the testing result.

    {cut(fio.sh)}

    ```console
    #!/bin/bash

# List of values for bs
    bs_values=("4k" "8k" "16k" "32k" "64k" "128k" "256k")

# List of values for iodepth
    io_values=("1" "4" "8" "16" "32" "64")

# Output file
    output_file="<FILE_NAME>"

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

## 2. Record the testing results

Enter the testing results from the file into the [spreadsheet](../assets/disk_testing.xlsx "download"). Now you can compare this data with the performance of other cloud platforms.

{note:warn}

For the performance comparison to be objective, use the same testing methodology on all the platforms of interest.

{/note}

## Delete unused resources

The created resources are billed. If you no longer need them, delete them:

1. [Delete](/en/computing/iaas/instructions/vm/vm-manage#delete_vm) the test VM.
1. Delete the [subnet](/en/networks/vnet/instructions/net#vnet-net-subnet-delete) and the [network](/en/networks/vnet/instructions/net#vnet-net-delete) in which the VM was hosted.