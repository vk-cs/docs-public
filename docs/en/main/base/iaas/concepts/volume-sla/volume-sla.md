Various types of disks are used in the data storage system on the VK Cloud platform:

- HDD;
- SSD;
- High-IOPS SSD;
- Low Latency NVME.

Read more in the article [VK Cloud Servers overview](../vm-concept#disks).

Certain performance characteristics are guaranteed for each type of disk.

<info>

The latency value is guaranteed only for Low Latency NVME disks.<br/>
For other types of disks, the delay value is approximate and is indicated for reference.

</info>

| Disk type<br/>(name in the API) | Read, IOPS<br/>min.—max. | Read,<br/>IOPS/GB | Write, IOPS <br/>min.max. | Write,<br/>IOPS/GB | Latency, msec<br/>max.|
|----|----|----|----|----|----|
| HDD Ceph<br/>(ceph-hdd)        | 300–2400    | 1  | 150–800    | 1  | 20   |
| SSD Ceph<br/>(ceph-ssd)        | 1000–16000  | 30 | 500–8000   | 15 | 3    |
| SSD High-IOPS<br/>(high-iops)  | 10000–45000 | 30 | 5000–30000 | 25 | 1    |
| Low Latency NVME<br/>(ef-nvme) | 10000–75000 | 70 | 5000–50000 | 35 | 0,5  |

<info>

Disk performance depends on its volume. In some cases, to increase the speed of data processing, it is enough to increase the size of the disk.

</info>

## HDD

Detailed performance characteristics for network HDDs of different sizes:

<details open>
<summary><b>HDD 10 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|------------|------------|--------------|-------------|--------------|
| 4K         | 300        | 1            | 150         | 1            |
| 64K        | 300        | 9            | 150         | 5            |
| 1M         | 300        | 38           | 150         | 19           |

</details>

<details>
<summary><b>HDD 50 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 300          | 1            | 150          | 1            |
| 64K          | 300          | 9            | 150          | 5            |
| 1M           | 300          | 38           | 150          | 19           |

</details>

<details>
<summary><b>HDD 100 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 300          | 1            | 150          | 1            |
| 64K          | 300          | 9            | 150          | 5            |
| 1M           | 300          | 38           | 150          | 19           |

</details>

<details>
<summary><b>HDD 250 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 300          | 1            | 250          | 1            |
| 64K          | 300          | 9            | 250          | 8            |
| 1M           | 300          | 38           | 250          | 31           |

</details>

<details>
<summary><b>HDD 500 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 500          | 2            | 500          | 2            |
| 64K          | 500          | 16           | 500          | 16           |
| 1M           | 500          | 63           | 500          | 63           |

</details>

<details>
<summary><b>HDD 1000 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 1000         | 4            | 800          | 3            |
| 64K          | 1000         | 31           | 800          | 25           |
| 1M           | 1000         | 125          | 800          | 100          |

</details>

<details>
<summary><b>HDD 1500 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 1500         | 6            | 800          | 3            |
| 64K          | 1500         | 47           | 800          | 25           |
| 1M           | 1500         | 188          | 800          | 100          |

</details>

<details>
<summary><b>HDD 2000 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 2000         | 8            | 800          | 3            |
| 64K          | 2000         | 63           | 800          | 25           |
| 1M           | 2000         | 250          | 800          | 100          |

</details>

## SSD

Detailed performance characteristics for network SSD of different sizes:

<details open>
<summary><b>SSD 10 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 1000         | 4            | 500          | 2            |
| 64K          | 1000         | 31           | 500          | 16           |
| 1M           | 1000         | 125          | 500          | 63           |

</details>

<details>
<summary><b>SSD 50 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 1500         | 6            | 750          | 3            |
| 64K          | 1500         | 47           | 750          | 23           |
| 1M           | 1500         | 188          | 750          | 94           |

</details>

<details>
<summary><b>SSD 100 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 3000         | 12           | 1500         | 6            |
| 64K          | 3000         | 94           | 1500         | 47           |
| 1M           | 3000         | 375          | 1500         | 188          |

</details>

<details>
<summary><b>SSD 250 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 7500         | 29           | 3750         | 15           |
| 64K          | 7500         | 234          | 3750         | 117          |
| 1M           | 7500         | 400          | 3750         | 400          |

</details>

<details>
<summary><b>SSD 500 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 15000        | 59           | 7500         | 29           |
| 64K          | 15000        | 400          | 7500         | 234          |
| 1M           | 15000        | 400          | 7500         | 400          |

</details>

<details>
<summary><b>SSD 1000 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 16000        | 63           | 8000         | 31           |
| 64K          | 16000        | 400          | 8000         | 250          |
| 1M           | 16000        | 400          | 8000         | 400          |

</details>

<details>
<summary><b>SSD 1500 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 16000        | 63           | 8000         | 31           |
| 64K          | 16000        | 400          | 8000         | 250          |
| 1M           | 16000        | 400          | 8000         | 400          |

</details>

<details>
<summary><b>SSD 2000 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 16000        | 63           | 8000         | 31           |
| 64K          | 16000        | 400          | 8000         | 250          |
| 1M           | 16000        | 400          | 8000         | 400          |

</details>

## High-IOPS SSD

Detailed performance characteristics for network High-IOPS SSD of different sizes:

<details open>
<summary><b>High-IOPS SSD 10 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 10000        | 39           | 5000         | 20           |
| 64K          | 10000        | 313          | 5000         | 156          |
| 1M           | 10000        | 500          | 5000         | 500          |

</details>

<details>
<summary><b>High-IOPS SSD 50 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 10000        | 39           | 5000         | 20           |
| 64K          | 10000        | 313          | 5000         | 156          |
| 1M           | 10000        | 500          | 5000         | 500          |

</details>

<details>
<summary><b>High-IOPS SSD 100 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 10000        | 39           | 5000         | 20           |
| 64K          | 10000        | 313          | 5000         | 156          |
| 1M           | 10000        | 500          | 5000         | 500          |

</details>

<details>
<summary><b>High-IOPS SSD 250 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 10000        | 39           | 6250         | 24           |
| 64K          | 10000        | 313          | 6250         | 195          |
| 1M           | 10000        | 500          | 6250         | 500          |

</details>

<details>
<summary><b>High-IOPS SSD 500 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 15000        | 59           | 12500        | 49           |
| 64K          | 15000        | 469          | 12500        | 391          |
| 1M           | 15000        | 500          | 12500        | 500          |

</details>

<details>
<summary><b>High-IOPS SSD 1000 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 30000        | 117          | 25000        | 98           |
| 64K          | 30000        | 500          | 25000        | 500          |
| 1M           | 30000        | 500          | 25000        | 500          |

</details>

<details>
<summary><b>High-IOPS SSD 1500 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 45000        | 176          | 30000        | 117          |
| 64K          | 45000        | 500          | 30000        | 500          |
| 1M           | 45000        | 500          | 30000        | 500          |

</details>

<details>
<summary><b>High-IOPS SSD 2000 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 45000        | 176          | 30000        | 117          |
| 64K          | 45000        | 500          | 30000        | 500          |
| 1M           | 45000        | 500          | 30000        | 500          |

</details>

## Low Latency NVME

Detailed performance characteristics for local Low Latency NVME of different volumes:

<details open>
<summary><b>LL NVME 10 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 10000        | 39,0625      | 5000         | 19,53125     |
| 64K          | 10000        | 350          | 5000         | 200          |
| 1M           | 10000        | 500          | 5000         | 500          |

</details>

<details>
<summary><b>LL NVME 50 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 10000        | 39,0625      | 5000         | 19,53125     |
| 64K          | 10000        | 350          | 5000         | 200          |
| 1M           | 10000        | 500          | 5000         | 500          |

</details>

<details>
<summary><b>LL NVME 100 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 10000        | 39,0625      | 5000         | 19,53125     |
| 64K          | 10000        | 350          | 5000         | 250          |
| 1M           | 10000        | 500          | 5000         | 500          |

</details>

<details>
<summary><b>LL NVME 250 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 18750        | 73,2421875   | 8750         | 34,1796875   |
| 64K          | 18750        | 350          | 8750         | 250          |
| 1M           | 18750        | 585,9375     | 8750         | 500          |

</details>

<details>
<summary><b>LL NVME 500 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 37500        | 146,484375   | 17500        | 68,359375    |
| 64K          | 37500        | 585,9375     | 17500        | 500          |
| 1M           | 37500        | 1171,875     | 17500        | 546,875      |

</details>

<details>
<summary><b>LL NVME 1000 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 75000        | 292,96875    | 35000        | 136,71875    |
| 64K          | 75000        | 1171,875     | 35000        | 546,875      |
| 1M           | 75000        | 1200         | 35000        | 900          |

</details>

<details>
<summary><b>LL NVME 2000 GB</b></summary>

| Block Size | Read, IOPS | Read, MB/sec | Write, IOPS | Write, MB/sec |
|--------------|--------------|--------------|--------------|--------------|
| 4K           | 75000        | 292,96875    | 50000        | 195,3125     |
| 64K          | 75000        | 1171,875     | 50000        | 781,25       |
| 1M           | 75000        | 1200         | 50000        | 900          |

</details>

## Disk performance testing

1. Before testing, make sure that the following conditions are met:

   - the disk is [non-bootable](../../instructions/vm-volumes#replacing-the-root-disk);
   - there is no load on the disk from the operating system.

   When these conditions are met, the IOPS measurement results must correspond to the following values:

   | Type of testing | Result, IOPS |
   | ---- | ---- |
   | Read/write in blocks of 4 KB in 32 threads | Complies with SLA   |
   | Read/write in blocks of 8 KB in 32 threads | At least 75% of SLA |
   | Read/write in blocks of 16 KB in 32 threads | At least 50% of the SLA |

2. Test the disk.

   <tabs>
   <tablist>
   <tab>Windows</tab>
   <tab>Linux</tab>
   </tablist>

   <tabpanel>

   To measure IOPS when reading and writing, use the DiskSpd or FIO utilities.

   <info>

   The measurement results obtained using DiskSpd and FIO may differ. DiskSpd is a utility created and recommended by Microsoft for testing disks in Windows OS.

   </info>

   **DiskSpd**

   1. Run the command prompt as an administrator.
   2. Create a `temp` directory and an empty file of at least 10 GB in size:

      ```bash
      md C:\temp
      fsutil file createnew C:\temp\test.bin 10485760000
      ```

   3. [Download the utility](https://github.com/microsoft/diskspd/releases/latest) and unpack to the desired directory.
   4. Go to the `amd64` directory of the unpacked utility.
   5. Run the command `diskspd` with parameters corresponding to the type of test:

      - `-w` — percentage of write operations, `-w0` for the reading test, `-w100` for the recording test;
      - `-b` — block size in bytes.

      Detailed description of all command parameters `diskspd` — in [official documentation](https://github.com/Microsoft/diskspd/wiki/Command-line-and-parameters).

      - Random write test in blocks of 4 KB:

         ```bash
         diskspd -Suw -b4K -o1 -t32 -r -w100 C:\temp\test.bin > C:\temp\random_write_results.txt
         ```

      - Random reading test in blocks of 4 KB:

         ```bash
         diskspd -Suw -b4K -o1 -t32 -r -w0 C:\temp\test.bin > C:\temp\random_read_results.txt
         ```

   **FIO**

   1. [Download](https://bsdio.com/fio/) and install FIO.
   2. Run the `fio` command with the parameters corresponding to the type of test:

      - `--rw` — `randread` or `randwrite`.
      - `--bs` — block size.
      - `--filename` — name of the test file.
      - `--rate_iops` — IOPS target value (optional). Use this parameter to get a more accurate latency value when testing the IOPS target value.

      Detailed description of all command parameters — in [FIO documentation](https://fio.readthedocs.io/en/latest/fio_doc.html#command-line-options).

      - Random write test in blocks of 4 KB:

         <err>

         Do not specify the name of the file with the necessary data in the `filename` parameter! During write tests, the contents of this file will be overwritten.

         </err>

         <tabs>
         <tablist>
         <tab>PowerShell</tab>
         <tab>Command line</tab>
         </tablist>
         <tabpanel>

         ```powershell
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

         </tabpanel>
         <tabpanel>

         ```bash
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

         </tabpanel>
         </tabs>

      - Random reading test in blocks of 4 KB:

         <tabs>
         <tablist>
         <tab>PowerShell</tab>
         <tab>Command line</tab>
         </tablist>
         <tabpanel>

         ```powershell
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

         </tabpanel>
         <tabpanel>

         ```bash
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

         </tabpanel>
         </tabs>

   </tabpanel>

   <tabpanel>

   To measure IOPS when reading and writing, use the FIO utility.

   <info>

   This technique is only applicable for testing partitions with the file system `ext2`, `ext3`, `ext4` or `xfs`.

   </info>

   1. Update the package list:

      ```bash
      sudo apt update
      ```

   2. Install FIO:

      ```bash
      sudo apt install fio
      ```

   3. Run the `fio` command with the parameters corresponding to the type of test:

      - `--rw` — `randread` or `randwrite`.
      - `--bs` — block size.
      - `--filename` — the name of the test file. The user must have read and write permissions to the `filename` to run the tests.
      - `--rate_iops` — IOPS target value (optional). Use this parameter to get a more accurate latency value when testing the target IOPS value.

      Detailed description of all command parameters — in [FIO documentation](https://fio.readthedocs.io/en/latest/fio_doc.html#command-line-options).

      - Random write test in blocks of 4 KB:

         <err>

         Do not specify the name of the file with the necessary data in the `filename` parameter! During write tests, the contents of this file will be overwritten.

         </err>

         ```bash
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

      - Random reading test in blocks of 4 KB:

         ```bash
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

   </tabpanel>
   </tabs>

3. If, when all conditions are met, the test results do not match the specified values, [contact technical support](/en/contacts).

<warn>

After testing is completed and the results are processed, delete the large test files to free up disk space.

</warn>
