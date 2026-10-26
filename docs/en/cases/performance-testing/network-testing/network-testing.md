
{include(/en/_includes/_translated_by_ai_en.md)}

The network interface performance metrics depend on the [availability zone](/en/start/concepts/architecture#architecture-az) in which the interacting VMs are located. Therefore, you need to compare network performance parameters first between VMs within the same zone, and then between VMs in different zones.

The [iPerf](https://iperf.fr/) utility will be used for testing, and three VMs will be created:
- the main test VM — client;
- an additional VM in the same availability zone as the test VM — server;
- an additional VM in another availability zone — another server.

## Preparatory steps

{include(/en/_includes/_testing_preparatory.md)}

## 1. Create the additional VMs

When testing cross-network interaction, the additional virtual machines act as servers.

1. [Create](/en/computing/iaas/instructions/vm/vm-create) a virtual machine with the following parameters:

    * **Availability zone**: select the same availability zone as that of the main test VM.
    * **Network**: select the same SDN Sprut as that of the main test VM.

    Set the remaining parameters the same as those of the main test VM.

1. [Create](/en/computing/iaas/instructions/vm/vm-create) another virtual machine with the following parameters:

    * **Availability zone**: select a different availability zone from that of the main test VM.
    * **Network**: select the same SDN Sprut as that of the main test VM.

    Set the remaining parameters the same as those of the main test VM.

1. [Connect](/en/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) to the additional VMs.

## 2. Determine the IP addresses of all VMs

1. [Go to](https://msk.cloud.vk.ru/app/) the VK Cloud management console.
1. In the **Cloud Computing → Virtual Machines** section, click the name of the desired VM.
1. On the VM page, go to the **Networks** tab.
1. Write down the IP addresses of the main test VM and the additional VMs. You will need them later.

## 3. Prepare the VMs for testing

1. Install the iPerf utility on the test and additional virtual machines using the command:
    
    ```console
    sudo apt install iperf3
    ```

1. On the additional VMs, run the command to start the iPerf server part:

    ```console
    iperf3 -s
    ```

## 4. Perform single-thread cross-network testing

You can test single-thread cross-network interaction using the ready-made `iperf3_single` script from VK Cloud.

{cut(iperf3_single.sh)}

```console
#!/bin/bash

# List of values for bs
thread_values=(1)

# Output file
output_file="<RESULT_OUTPUT_FILE_NAME>.txt"

# Servers
sprut_vm2_AZ1=<TEST_VM_IP>
sprut_vm1_AZ2=<SERVER_VM_IP>

for thread in "${thread_values[@]}"
do

# Transmit from AZ1 to AZ2
echo "Executing transmit test from AZ1 to AZ2 in $thread thread(s)" >> "$output_file"
iperf3 -c $sprut_vm2_AZ1 -P $thread -t 10 --logfile "$output_file"
echo "#" >> "$output_file"
echo "#" >> "$output_file"
done

for thread in "${thread_values[@]}"
do

# Receive from AZ2 to AZ1
echo "Executing receive test from AZ2 to AZ1 in $thread thread(s)" >> "$output_file"
iperf3 -c $sprut_vm2_AZ1 -P $thread -t 10 -R --logfile "$output_file"
echo "#" >> "$output_file"
echo "#" >> "$output_file"
done
for thread in "${thread_values[@]}"
do

# Transmit from AZ1 to AZ2
echo "Executing transmit test from AZ1 to AZ2 in $thread thread(s)" >> "$output_file"
iperf3 -c $sprut_vm1_AZ2 -P $thread -t 10 --logfile "$output_file"
echo "#" >> "$output_file"
echo "#" >> "$output_file"
done

for thread in "${thread_values[@]}"
do

# Receive from AZ2 to AZ1
echo "Executing receive test from AZ2 to AZ1 in $thread thread(s)" >> "$output_file"
iperf3 -c $sprut_vm1_AZ2 -P $thread -t 10 -R --logfile "$output_file"
echo "#" >> "$output_file"
echo "#" >> "$output_file"
done
```
{/cut}

1. Test the interaction within a single zone. To do this, run the `iperf3_single` script on the test VM, replacing the following parameters in the script code:

    * `<RESULT_OUTPUT_FILE_NAME>` — the name of the file for saving the test result, for example `test_collection_output_single1` for a single-thread run within a single zone. By default, the file is saved in the directory where the script is run.
    * `<TEST_VM_IP>` — the IP address of the test VM on which the script is run.
    * `<SERVER_VM_IP>` — the IP address of the additional VM (in the same zone) acting as the server.

3. Test the interaction between different zones. To do this, run the `iperf3_single` script on the test VM, replacing the following parameters in the script code:

    * `<RESULT_OUTPUT_FILE_NAME>` — the name of the file for saving the test result, for example `test_collection_output_single2` for a single-thread run between different zones. By default, the file is saved in the directory where the script is run.
    * `<SERVER_VM_IP>` — the IP address of the additional VM (in another zone) acting as the server.

## 5. Perform multi-thread cross-network testing

You can test multi-thread cross-network interaction using the ready-made `iperf3_multi` script from VK Cloud.

{cut(iperf3_multi.sh)}

```console
#!/bin/bash

# List of values for bs
thread_values=(2 4 8 16)

# Output file
output_file="<RESULT_OUTPUT_FILE_NAME>.txt"

# Servers
sprut_vm2_AZ1=<TEST_VM_IP>
sprut_vm1_AZ2=<SERVER_VM_IP>

for thread in "${thread_values[@]}"
do

# Transmit from AZ1 to AZ2
echo "Executing transmit test from AZ1 to AZ2 in $thread thread(s)" >> "$output_file"
iperf3 -c $sprut_vm2_AZ1 -P $thread -t 10 --logfile "$output_file"
echo "#" >> "$output_file"
echo "#" >> "$output_file"
done

for thread in "${thread_values[@]}"
do

# Receive from AZ2 to AZ1
echo "Executing receive test from AZ2 to AZ1 in $thread thread(s)" >> "$output_file"
iperf3 -c $sprut_vm2_AZ1 -P $thread -t 10 -R --logfile "$output_file"
echo "#" >> "$output_file"
echo "#" >> "$output_file"
done
for thread in "${thread_values[@]}"
do

# Transmit from AZ1 to AZ2
echo "Executing transmit test from AZ1 to AZ2 in $thread thread(s)" >> "$output_file"
iperf3 -c $sprut_vm1_AZ2 -P $thread -t 10 --logfile "$output_file"
echo "#" >> "$output_file"
echo "#" >> "$output_file"
done

for thread in "${thread_values[@]}"
do

# Receive from AZ2 to AZ1
echo "Executing receive test from AZ2 to AZ1 in $thread thread(s)" >> "$output_file"
iperf3 -c $sprut_vm1_AZ2 -P $thread -t 10 -R --logfile "$output_file"
echo "#" >> "$output_file"
echo "#" >> "$output_file"
done
```
{/cut}

1. Test the interaction within a single zone. To do this, run the `iperf3_multi` script on the test VM, replacing the following parameters in the script code:

    * `<RESULT_OUTPUT_FILE_NAME>` — the name of the file for saving the test result, for example `test_collection_output_multi1` for a multi-thread run within a single zone. By default, the file is saved in the directory where the script is run.
    * `<TEST_VM_IP>` — the IP address of the test VM on which the script is run.
    * `<SERVER_VM_IP>` — the IP address of the additional VM (in the same zone) acting as the server.

1. Test the multi-thread interaction between different zones. To do this, run the `iperf3_multi` script on the test VM, replacing the following parameters in the script code:

    * `<RESULT_OUTPUT_FILE_NAME>` — the name of the file for saving the test result, for example `test_collection_output_multi2` for a multi-thread run between different zones. By default, the file is saved in the directory where the script is run.
    * `<SERVER_VM_IP>` — the IP address of the additional VM (in another zone) acting as the server.

## 6. Record the test results

Enter the obtained results into the [spreadsheet](../assets/network_testing.xlsx "download") and compare the data transfer rate (the `Bitrate (Gbit/s)` parameter) between two VMs in the same zone and in different zones.

Now you can compare this data with the performance of other cloud platforms.

{note:warn}

For the performance comparison to be objective, use the same testing methodology on all the platforms of interest.

{/note}

## Delete unused resources

The created resources are billed. If you no longer need them, delete them:

1. [Delete](/en/computing/iaas/instructions/vm/vm-manage#delete_vm) the test and additional VMs.
1. Delete the [subnets](/en/networks/vnet/instructions/net#vnet-net-subnet-delete) and [networks](/en/networks/vnet/instructions/net#vnet-net-delete) in which the VMs were hosted.