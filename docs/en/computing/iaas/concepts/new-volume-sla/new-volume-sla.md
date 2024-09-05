Various types of disks are used in the data storage system on the VK Cloud platform:

- HDD
- SSD
- High-IOPS SSD
- High-IOPS HA SSD
- Low Latency NVME

Read more in the article [Cloud Servers overview](../about#disks).

Certain performance characteristics are guaranteed for each type of disk.

<info>

The latency value is guaranteed only for Low Latency NVME disks.<br/>
For other types of disks, the delay value is approximate and is indicated for reference.

</info>

| Disk type<br/>(name in the API) | Read, IOPS<br/>min.—max. | Read,<br/>IOPS/GB | Write, IOPS <br/>min.max. | Write,<br/>IOPS/GB | Latency, msec<br/>max.|
|----|----|----|----|----|----|
| Network HDD<br/>(ceph-hdd)          | 300–2400    | 1  | 150–800    | 1  | 20   |
| Network SSD<br/>(ceph-ssd)          | 1000–16000  | 30 | 500–8000   | 15 | 3    |
| High-IOPS SSD<br/>(high-iops)       | 10000–45000 | 30 | 5000–30000 | 25 | 1    |
| High-IOPS HA SSD<br/>(high-iops-ha) | 7500–35000  | 25 | 2000–12000 | 15 | 1    |
| Low Latency NVME<br/>(ef-nvme)      | 10000–75000 | 75 | 5000–50000 | 35 | 0,5  |

<info>

Disk performance depends on its volume. In some cases, to increase the speed of data processing, it is enough to increase the size of the disk.

</info>

## Network HDD

Below are detailed performance characteristics for network HDD drives of different sizes.

| Size, GB | Read, IOPS<br/>bs=4k,<br/>iodepth=32 | Read, MB/sec<br/>bs=1M,<br/>iodepth=16 | Write, IOPS<br/>bs=4k,<br/>iodepth=32 | Write, MB/sec<br/>bs=1M,<br/>iodepth=16 |
|--------------|--------------|--------------|--------------|--------------|
| 10           | 300          | 38           | 150          | 19           |
| 50           | 300          | 38           | 150          | 19           |
| 100          | 300          | 38           | 150          | 19           |
| 250          | 300          | 38           | 250          | 31           |
| 500          | 500          | 63           | 500          | 63           |
| 1000         | 1000         | 125          | 800          | 100          |
| 1500         | 1500         | 188          | 800          | 100          |
| 2000         | 2000         | 250          | 800          | 100          |

Here, `bs` and `iodepth` are [performance testing](#disk_performance_testing) parameters.

## Network SSD

Below are detailed performance characteristics for network SSD drives of different sizes.

| Size, GB | Read, IOPS<br/>bs=4k,<br/>iodepth=32 | Read, MB/sec<br/>bs=1M,<br/>iodepth=16 | Write, IOPS<br/>bs=4k,<br/>iodepth=32 | Write, MB/sec<br/>bs=1M,<br/>iodepth=16 |
|--------------|--------------|--------------|--------------|--------------|
| 10           | 1000         | 125          | 500          | 63           |
| 50           | 1500         | 188          | 750          | 94           |
| 100          | 3000         | 375          | 1500         | 188          |
| 250          | 7500         | 400          | 3750         | 400          |
| 500          | 15000        | 400          | 7500         | 400          |
| 1000         | 16000        | 400          | 8000         | 400          |
| 1500         | 16000        | 400          | 8000         | 400          |
| 2000         | 16000        | 400          | 8000         | 400          |

Here, `bs` and `iodepth` are [performance testing](#disk_performance_testing) parameters.

## High-IOPS SSD

Below are detailed performance characteristics for network High-IOPS SSD drives of different sizes.

| Size, GB | Read, IOPS<br/>bs=4k,<br/>iodepth=32 | Read, MB/sec<br/>bs=1M,<br/>iodepth=16 | Write, IOPS<br/>bs=4k,<br/>iodepth=32 | Write, MB/sec<br/>bs=1M,<br/>iodepth=16 |
|--------------|--------------|--------------|--------------|--------------|
| 10           | 10000        | 500          | 5000         | 500          |
| 50           | 10000        | 500          | 5000         | 500          |
| 100          | 10000        | 500          | 5000         | 500          |
| 250          | 10000        | 500          | 6250         | 500          |
| 500          | 15000        | 500          | 12500        | 500          |
| 1000         | 30000        | 500          | 25000        | 500          |
| 1500         | 45000        | 500          | 30000        | 500          |
| 2000         | 45000        | 500          | 30000        | 500          |

Here, `bs` and `iodepth` are [performance testing](#disk_performance_testing) parameters.

## High-IOPS HA SSD

Below are detailed performance characteristics for network High-IOPS SSD HA drives of different sizes.

| Size, GB | Read, IOPS<br/>bs=4k,<br/>iodepth=32 | Read, MB/sec<br/>bs=1M,<br/>iodepth=16 | Write, IOPS<br/>bs=4k,<br/>iodepth=32 | Write, MB/sec<br/>bs=1M,<br/>iodepth=16 |
|--------------|--------------|--------------|--------------|--------------|
| 10           | 7500         | 375          | 2000         | 250          |
| 50           | 7500         | 375          | 2000         | 250          |
| 100          | 7500         | 375          | 2000         | 250          |
| 250          | 7500         | 375          | 3750         | 300          |
| 500          | 12500        | 375          | 7500         | 300          |
| 1000         | 25000        | 375          | 12000        | 300          |
| 1500         | 35000        | 375          | 12000        | 300          |
| 2000         | 35000        | 375          | 12000        | 300          |

Here, `bs` and `iodepth` are [performance testing](#disk_performance_testing) parameters.

## Low Latency NVME

Below are detailed performance characteristics for local Low Latency NVME drives of different sizes.

| Size, GB | Read, IOPS<br/>bs=4k,<br/>iodepth=32 | Read, MB/sec<br/>bs=1M,<br/>iodepth=16 | Write, IOPS<br/>bs=4k,<br/>iodepth=32 | Write, MB/sec<br/>bs=1M,<br/>iodepth=16 |
|--------------|--------------|--------------|--------------|--------------|
| 10           | 10000        | 500          | 5000         | 500          |
| 50           | 10000        | 500          | 5000         | 500          |
| 100          | 10000        | 500          | 5000         | 500          |
| 250          | 18750        | 586          | 8750         | 500          |
| 500          | 37500        | 1172         | 17500        | 547          |
| 1000         | 75000        | 1200         | 35000        | 900          |
| 1500         | 75000        | 1200         | 50000        | 900          |
| 2000         | 75000        | 1200         | 50000        | 900          |

Here, `bs` and `iodepth` are [performance testing](#disk_performance_testing) parameters.

## Disk performance testing

1. Before testing, make sure that the following conditions are met:

   - the disk is [non-bootable](../../service-management/volumes#replacing_the_root_disk);
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

   3. [Download the utility](https://github.com/microsoft/diskspd/releases/latest) and unpack to the required directory.
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

3. If, when all conditions are met, the test results do not match the specified values, [contact technical support](mailto:support@mcs.mail.ru).

<warn>

After testing is completed and the results are processed, delete the large test files to free up disk space.

</warn>
