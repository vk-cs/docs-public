
{include(/en/_includes/_translated_by_ai_en.md)}

To get more CPU performance parameters, use several testing utilities at the same time:

* [sysbench](https://github.com/akopytov/sysbench);
* [Geekbench 6](https://www.geekbench.com/);
* [7-Zip Benchmark](https://www.7-cpu.com/);
* [UnixBench](https://github.com/ProTechEx/unixbench).

## Preparatory steps

{include(/en/_includes/_testing_preparatory.md)}

## 1. Run testing with the sysbench utility

1. Install the sysbench utility on the VM:

    ```console
    sudo apt install sysbench
    ```

1. Run the single-threaded CPU performance test 5 times in a row:

    ```console
    sysbench cpu --threads=1 --time=60 run
    ```

1. Run the 16-thread CPU performance test 5 times in a row:

    ```console
    sysbench cpu --threads=16 --time=60 run
    ```

1. Record the results in the [spreadsheet](../assets/cpu_testing.xlsx "download"). The average value of the `CPU Speed (events/s)` parameter across five runs will be the most indicative.

## 2. Run testing with the Geekbench 6 utility

1. Install the Geekbench 6 utility on the VM:

    ```console
    wget https://cdn.geekbench.com/Geekbench-6.2.1-Linux.tar.gz
    tar xf Geekbench-6.2.1-Linux.tar.gz
    cd Geekbench-6.2.1-Linux
    ```

1. Run the CPU performance test 5 times in a row:

    ```console
    ./geekbench6
    ```

1. Save the resulting links to the test results, as well as the average value across 5 runs for the `Single-Core Score` and `Multi-Core Score` parameters.

## 3. Run testing with the 7-Zip Benchmark utility

1. Install the 7-Zip Benchmark utility on the VM:

    ```console
    sudo apt install p7zip-full
    ```

1. Run the single-threaded CPU performance test 5 times in a row and save the command output to a file:

    ```console
    7z b -md26 -mmt1 5
    ```

1. Run the 16-thread CPU performance test 5 times in a row and save the command output to a file:

    ```console
    7z b -md26 -mmt16 5
    ```

1. Calculate the average values of the `MIPS` parameter across five runs, separately for the single-threaded and 16-thread commands.

## 4. Run testing with the UnixBench utility

1. Install the UnixBench utility on the VM:

    ```console
    sudo snap install unixbench
    ```

1. Run the single-threaded CPU performance test 5 times in a row and save the command output to a file:

    ```console
    unixbench -c 1
    ```

1. Run the 16-thread CPU performance test 5 times in a row and save the command output to a file:

     ```console
    unixbench -c 16
    ```

1. Save the value of the `Benchmark Index Score` parameter separately for the single-threaded and 16-thread commands.

## 5. Record the testing results

Collect all the results obtained in the previous CPU performance testing steps. Now you can compare this data with the performance of other cloud platforms.

{note:warn}

For the performance comparison to be objective, use the same testing methodology on all the platforms of interest.

{/note}

## Delete unused resources

The created resources are billed. If you no longer need them, delete them:

1. [Delete](/en/computing/iaas/instructions/vm/vm-manage#delete_vm) the test VM.
1. Delete the [subnet](/en/networks/vnet/instructions/net#vnet-net-subnet-delete) and the [network](/en/networks/vnet/instructions/net#vnet-net-delete) in which the VM was hosted.