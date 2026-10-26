# {heading(Block storage disk performance)[id=iaas-volume-sla]}

{include(/en/_includes/_translated_by_ai_en.md)}

The {var(cloud)} data storage system uses disks of various types:

- HDD;
- SSD;
- High-IOPS SSD;
- High-IOPS HA SSD;
- Low Latency NVMe.

For more information, see the section on {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=block storage disks]} in {var(cloud)}.

Each disk type is guaranteed certain performance characteristics. Quotas and limits on the number and size of disks are provided in the article {linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Quotas and limits]}.

{note:info}
The latency value is guaranteed only for Low Latency NVMe disks.<br/>
For other disk types, the latency value is approximate and provided for reference only.
{/note}

[cols="2,1,1,1,1,1", options="header"]
|===
|Disk type<br/>(API name)
|Read, IOPS<br/>min.—max.
|Read,<br/>IOPS/GB
|Write, IOPS <br/>min.—max.
|Write,<br/>IOPS/GB
|Latency, ms<br/>max.

|Network HDD disk<br/>(ceph-hdd)
|300–2400
|1
|150–800
|1
|20

|Network SSD disk<br/>(ceph-ssd)
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
|0.5
|===

{note:info}
Disk performance depends on its volume. In some cases, to increase the data processing speed, it is enough to increase the disk size.
{/note}

## {heading(Network HDD disk)[id=iaas-volume-sla-hdd]}

Below are detailed performance characteristics for network HDD disks of different volumes.

[cols="1,1,1,1,1", options="header"]
|===
|Size, GB
|Read, IOPS<br/>bs=4k,<br/>iodepth=32
|Read, MB/s<br/>bs=1M,<br/>iodepth=16
|Write, IOPS<br/>bs=4k,<br/>iodepth=32
|Write, MB/s<br/>bs=1M,<br/>iodepth=16

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

Here `bs` and `iodepth` are the {linkto(#iaas-volume-sla-volume-test)[text=performance testing]} parameters.

## {heading(Network SSD disk)[id=iaas-volume-sla-ssd]}

Below are detailed performance characteristics for network SDD disks of different volumes.

[cols="1,1,1,1,1", options="header"]
|===
|Size, GB 
|Read, IOPS<br/>bs=4k,<br/>iodepth=32 
|Read, MB/s<br/>bs=1M,<br/>iodepth=16 
|Write, IOPS<br/>bs=4k,<br/>iodepth=32 
|Write, MB/s<br/>bs=1M,<br/>iodepth=16

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

Here `bs` and `iodepth` are the {linkto(#iaas-volume-sla-volume-test)[text=performance testing]} parameters.

## {heading(High-IOPS SSD)[id=iaas-volume-sla-high-iops-ssd]}

Below are detailed performance characteristics for network High-IOPS SSD disks of different volumes.

[cols="1,1,1,1,1", options="header"]
|===
|Size, GB
|Read, IOPS<br/>bs=4k,<br/>iodepth=32
|Read, MB/s<br/>bs=1M,<br/>iodepth=16
|Write, IOPS<br/>bs=4k,<br/>iodepth=32
|Write, MB/s<br/>bs=1M,<br/>iodepth=16

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

Here `bs` and `iodepth` are the {linkto(#iaas-volume-sla-volume-test)[text=performance testing]} parameters.

## {heading(High-IOPS HA SSD)[id=iaas-volume-sla-high-iops-ha-ssd]}

Below are detailed performance characteristics for network High-IOPS HA SSD disks of different volumes.

[cols="1,1,1,1,1", options="header"]
|===
|Size, GB
|Read, IOPS<br/>bs=4k,<br/>iodepth=32
|Read, MB/s<br/>bs=1M,<br/>iodepth=16
|Write, IOPS<br/>bs=4k,<br/>iodepth=32
|Write, MB/s<br/>bs=1M,<br/>iodepth=16

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

Here `bs` and `iodepth` are the {linkto(#iaas-volume-sla-volume-test)[text=performance testing]} parameters.

## {heading(Low Latency NVMe)[id=iaas-volume-sla-llnvme]}

Below are detailed performance characteristics for local Low Latency NVMe disks of different volumes.

[cols="1,1,1,1,1", options="header"]
|===
|Size, GB
|Read, IOPS<br/>bs=4k,<br/>iodepth=32
|Read, MB/s<br/>bs=1M,<br/>iodepth=16
|Write, IOPS<br/>bs=4k,<br/>iodepth=32
|Write, MB/s<br/>bs=1M,<br/>iodepth=16

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

Here `bs` and `iodepth` are the {linkto(#iaas-volume-sla-volume-test)[text=performance testing]} parameters.

## {heading(Disk performance testing)[id=iaas-volume-sla-volume-test]}

1. Before testing, make sure that the following conditions are met:

   - the disk is {linkto(../../../../../computing/iaas/instructions/vm/vm-root-replace#iaas-vm-root-replace)[text=non-bootable]};
   - there is no load on the disk from the operating system.

   If these conditions are met, the IOPS measurement results should match the following values:

   [cols="3,2", options="header"]
   |===
   |Test type
   |Result, IOPS

   |Read and write with 4 KB blocks in 32 threads
   |Matches the SLA

   |Read and write with 8 KB blocks in 32 threads
   |At least 75% of the SLA

   |Read and write with 16 KB blocks in 32 threads
   |At least 50% of the SLA
   |===

1. Test the disk.

   {tabs}
   
   {tab(Windows)}
      
   To measure IOPS for reading and writing, use the DiskSpd or FIO utilities.

   {note:info}
   The measurement results obtained with DiskSpd and FIO may differ. DiskSpd is a utility created and recommended by Microsoft for testing disks in Windows OS.
   {/note}

   **DiskSpd**

   1. Run the command prompt as administrator.
   1. Create a `temp` directory and an empty file of at least 10 GB:

      ```console
      md C:\temp
      fsutil file createnew C:\temp\test.bin 10485760000
      ```

   1. [Download the utility](https://github.com/microsoft/diskspd/releases/latest) and extract it to the desired directory.
   1. Navigate to the `amd64` directory of the extracted utility.
   1. Run the `diskspd` command with parameters corresponding to the test type:

      - `-w` — percentage of write operations, `-w0` for a read test, `-w100` for a write test;
      - `-b` — block size in bytes.

      For a detailed description of all `diskspd` command parameters, see the [official documentation](https://github.com/Microsoft/diskspd/wiki/Command-line-and-parameters).

      - Random write test with 4 KB blocks:

        ```console
        diskspd -Suw -b4K -o1 -t32 -r -w100 C:\temp\test.bin > C:\temp\random_write_results.txt
        ```

      - Random read test with 4 KB blocks:

        ```console
        diskspd -Suw -b4K -o1 -t32 -r -w0 C:\temp\test.bin > C:\temp\random_read_results.txt
        ```

   **FIO**

   1. [Download](https://bsdio.com/fio/) and install FIO.
   1. Run the `fio` command with parameters corresponding to the test type:

      - `--rw` — `randread` or `randwrite`.
      - `--bs` — block size.
      - `--filename` — name of the test file.
      - `--rate_iops` — target IOPS value (optional). Use this parameter to obtain a more accurate latency value when testing the target IOPS value.

      For a detailed description of all command parameters, see the [FIO documentation](https://fio.readthedocs.io/en/latest/fio_doc.html#command-line-options).

      - Random write test with 4 KB blocks:

        {note:err}
        Do not specify the name of a file with the needed data in the `filename` parameter! During write tests, the contents of this file will be overwritten.
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
         
        {tab(Command prompt)}
         
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

      - Random read test with 4 KB blocks:

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
         
        {tab(Command prompt)}
         
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
   
   To measure IOPS for reading and writing, use the FIO utility.

   {note:info}
   This method is applicable only for testing partitions with the `ext2`, `ext3`, `ext4`, or `xfs` file system.
   {/note}

   1. Update the package list:

      ```console
      sudo apt update
      ```

   1. Install FIO:

      ```console
      sudo apt install fio
      ```

   1. Run the `fio` command with parameters corresponding to the test type:

      - `--rw` — `randread` or `randwrite`.
      - `--bs` — block size.
      - `--filename` — name of the test file. The user must have read and write permissions for `filename` to run the tests.
      - `--rate_iops` — target IOPS value (optional). Use this parameter to obtain a more accurate latency value when testing the target IOPS value.

      For a detailed description of all command parameters, see the [FIO documentation](https://fio.readthedocs.io/en/latest/fio_doc.html#command-line-options).

      - Random write test with 4 KB blocks:

        {note:err}
        Do not specify the name of a file with the needed data in the `filename` parameter! During write tests, the contents of this file will be overwritten.
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

      - Random read test with 4 KB blocks:

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

1. If, after meeting all the conditions, the test results do not match the specified values, contact [technical support](/en/contacts).
1. After testing is completed and the results are processed, delete the large test files to free up disk space. Quotas and limits on the use of {var(cloud)} resources are provided in the article {linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Quotas and limits]}.