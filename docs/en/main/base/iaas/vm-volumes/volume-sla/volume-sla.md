The concept of "Disk" on the VK Cloud platform is analogous to a physical storage medium, such as HDD or SSD.

A disk is a network block device that provides data storage for instances. All disks on the VK Cloud platform are network-based and are reliably protected by data replication, providing reliable storage and fault tolerance.

Advantages of network drives:

- **Flexibility**. Disks are independent resources, so they can be moved between instances in the same data center, and you can increase the size of the disk without turning off the instance to which it is connected.
- **Simplicity**. Disks function as universal block devices, so you can consider attached disks as locally connected drives. This allows you to split, format and manage disks using familiar tools and methods.
- **Application**. Disks are an independent element of the project and can exist separately from the instance. This is convenient when you need to change the disk size regardless of the configuration of the virtual machine.
- **Fault tolerance**. Disks provide reliable data storage and allow you to continuously perform read and write operations even if several physical disks fail at the same time.

<warn>

The created disk takes up space in the shared storage, so its availability is paid separately, even if it is disconnected from the instance.

</warn>

## Disk Types

| Disk type | API name | Selecting an availability zone when creating a disk | Description |
| --- | --- | --- | --- |
| Network SSD | ceph-hdd deprecated: <br> dp1, <br> ms1 | Yes | Network HDD drive with low speed. <br> Has triple replication between multiple storage servers within the availability zone. |
| Network SSD with geo-replication | ceph | Not specified due to geo-replication | Network HDD drive with low speed. <br> Has triple geo-replication between several availability zones. |
| High IOPS SSD | high-iops deprecated:<br> local-ssd, <br> ko1-local-ssd, <br> ko1-high-iops, <br> dp1-high-iops, <br> ko1-local-ssd-g2 | Yes | Network SSD drive with dual replication (both copies are on the same server Storage)<br> and increased work speed. |
| Low Latency NVME | ef-nvme | Is located on the same hypervisor with a virtual machine | Local SSD disk with dual replication (both copies are on the same hypervisor), <br> high speed and low latency. |

<warn>

Disks with Network HDD, Network SSD and High IOPS SSD types are recommended to be located in the same availability zone where the virtual machine to which they will be connected is located. Otherwise, the performance of the virtual machine will decrease because the disk will be located in a different datacenter.

</warn>

## SLA

For each type of disk, there is a performance limit necessary to guarantee the stability of the disk, regardless of its type or volume.

| Disk type | min IOPS read | min IOPS write | IOPS/GB read | IOPS/GB write | max IOPS read | max IOPS write | Tab8 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| HDD ceph (disk types ceph, ms1, dp1) | 300 | 150 | 1 | 1 | 2 400 | 800 | — |
| SSD ceph (ssd disk types, dp1-ssd, ko1-ssd) | 1 000 | 500 | 30 | 15 | 16 000 | 8 000 | — |
| SSD High IOPS | 10 000 | 5 000 | 30 | 25 | 45 000 | 30 000 | — |
| Low Latency NVME | 10 000 | 5 000 | 70 | 35 | 75 000 | 50 000 | 0,5 |

\* full specifications are given below in separate tables for each type of disk.

**HDD**

| Volume in GB | Block size | Read IOPS | Read MB/s | Block size | Write IOPS | Write MB/s |
|------------|--------------|--------------|------- ------|--------------|-------------|-------------|
| 10 | 4K | 300 | 1 | 4K | 150 | 1 |
| 10 | 64K| 300 | 9 | 64K| 150 | 5 |
| 10 | 1M | 300 | 38 | 1M | 150 | 19 |
| 50 | 4K | 300 | 1 | 4K | 150 | 1 |
| 50 | 64K| 300 | 9 | 64K| 150 | 5 |
| 50 | 1M | 300 | 38 | 1M | 150 | 19 |
| 100 | 4K | 300 | 1 | 4K | 150 | 1 |
| 100 | 64K| 300 | 9 | 64K| 150 | 5 |
| 100 | 1M | 300 | 38 | 1M | 150 | 19 |
| 250 | 4K | 300 | 1 | 4K | 250 | 1 |
| 250 | 64K| 300 | 9 | 64K| 250 | 8 |
| 250 | 1M | 300 | 38 | 1M | 250 | 31 |
| 500 | 4K | 500 | 2 | 4K | 500 | 2 |
| 500 | 64K| 500 | 16 | 64K| 500 | 16 |
| 500 | 1M | 500 | 63 | 1M | 500 | 63 |
| 1000 | 4K | 1000 | 4 | 4K | 800 | 3 |
| 1000 | 64K| 1000 | 31 | 64K| 800 | 25 |
| 1000 | 1M | 1000 | 125 | 1M | 800 | 100 |
| 1500 | 4K | 1500 | 6 | 4K | 800 | 3 |
| 1500 | 64K| 1500 | 47 | 64K| 800 | 25 |
| 1500 | 1M | 1500 | 188 | 1M | 800 | 100 |
| 2000 | 4K | 2000 | 8 | 4K | 800 | 3 |
| 2000 | 64K| 2000 | 63 | 64K| 800 | 25 |
| 2000 | 1M | 2000 | 250 | 1M | 800 | 100 |

**SSD**

| Volume in GB | Block size | Read IOPS | Read MB/s | Block size | Write IOPS | Write MB/s |
|------------|--------------|---------------|---------------|--------------|---------------|---------------|
| 10         | 4K           | 1000          | 4             | 4K           | 500           | 2             |
| 10         | 64K          | 1000          | 31            | 64K          | 500           | 16            |
| 10         | 1M           | 1000          | 125           | 1M           | 500           | 63            |
| 50         | 4K           | 1500          | 6             | 4K           | 750           | 3             |
| 50         | 64K          | 1500          | 47            | 64K          | 750           | 23            |
| 50         | 1M           | 1500          | 188           | 1M           | 750           | 94            |
| 100        | 4K           | 3000          | 12            | 4K           | 1500          | 6             |
| 100        | 64K          | 3000          | 94            | 64K          | 1500          | 47            |
| 100        | 1M           | 3000          | 375           | 1M           | 1500          | 188           |
| 250        | 4K           | 7500          | 29            | 4K           | 3750          | 15            |
| 250        | 64K          | 7500          | 234           | 64K          | 3750          | 117           |
| 250        | 1M           | 7500          | 400           | 1M           | 3750          | 400           |
| 500        | 4K           | 15000         | 59            | 4K           | 7500          | 29            |
| 500        | 64K          | 15000         | 400           | 64K          | 7500          | 234           |
| 500        | 1M           | 15000         | 400           | 1M           | 7500          | 400           |
| 1000       | 4K           | 16000         | 63            | 4K           | 8000          | 31            |
| 1000       | 64K          | 16000         | 400           | 64K          | 8000          | 250           |
| 1000       | 1M           | 16000         | 400           | 1M           | 8000          | 400           |
| 1500       | 4K           | 16000         | 63            | 4K           | 8000          | 31            |
| 1500       | 64K          | 16000         | 400           | 64K          | 8000          | 250           |
| 1500       | 1M           | 16000         | 400           | 1M           | 8000          | 400           |
| 2000       | 4K           | 16000         | 63            | 4K           | 8000          | 31            |
| 2000       | 64K          | 16000         | 400           | 64K          | 8000          | 250           |
| 2000       | 1M           | 16000         | 400           | 1M           | 8000          | 400           |

**High-IOPS SSD**

| Volume in GB | Block size | Read IOPS | Read MB/s | Block size | Write IOPS | Write MB/s |
|------------|--------------|---------------|---------------|--------------|---------------|---------------|
| 10         | 4K           | 10000         | 39            | 4K           | 5000          | 20            |
| 10         | 64K          | 10000         | 313           | 64K          | 5000          | 156           |
| 10         | 1M           | 10000         | 500           | 1M           | 5000          | 500           |
| 50         | 4K           | 10000         | 39            | 4K           | 5000          | 20            |
| 50         | 64K          | 10000         | 313           | 64K          | 5000          | 156           |
| 50         | 1M           | 10000         | 500           | 1M           | 5000          | 500           |
| 100        | 4K           | 10000         | 39            | 4K           | 5000          | 20            |
| 100        | 64K          | 10000         | 313           | 64K          | 5000          | 156           |
| 100        | 1M           | 10000         | 500           | 1M           | 5000          | 500           |
| 250        | 4K           | 10000         | 39            | 4K           | 6250          | 24            |
| 250        | 64K          | 10000         | 313           | 64K          | 6250          | 195           |
| 250        | 1M           | 10000         | 500           | 1M           | 6250          | 500           |
| 500        | 4K           | 15000         | 59            | 4K           | 12500         | 49            |
| 500        | 64K          | 15000         | 469           | 64K          | 12500         | 391           |
| 500        | 1M           | 15000         | 500           | 1M           | 12500         | 500           |
| 1000       | 4K           | 30000         | 117           | 4K           | 25000         | 98            |
| 1000       | 64K          | 30000         | 500           | 64K          | 25000         | 500           |
| 1000       | 1M           | 30000         | 500           | 1M           | 25000         | 500           |
| 1500       | 4K           | 45000         | 176           | 4K           | 30000         | 117           |
| 1500       | 64K          | 45000         | 500           | 64K          | 30000         | 500           |
| 1500       | 1M           | 45000         | 500           | 1M           | 30000         | 500           |
| 2000       | 4K           | 45000         | 176           | 4K           | 30000         | 117           |
| 2000       | 64K          | 45000         | 500           | 64K          | 30000         | 500           |
| 2000       | 1M           | 45000         | 500           | 1M           | 30000         | 500           |

**LL NVME**

| Volume in GB | Block size | Read IOPS | Read MB/s | Block size | Write IOPS | Write MB/s |
|------------|--------------|---------------|---------------|--------------|---------------|---------------|
| 10         | 4K           | 10000         | 39,0625       | 4K           | 5000          | 19,53125      |
| 10         | 64K          | 10000         | 350           | 64K          | 5000          | 200           |
| 10         | 1M           | 10000         | 500           | 1M           | 5000          | 500           |
| 50         | 4K           | 10000         | 39,0625       | 4K           | 5000          | 19,53125      |
| 50         | 64K          | 10000         | 350           | 64K          | 5000          | 200           |
| 50         | 1M           | 10000         | 500           | 1M           | 5000          | 500           |
| 100        | 4K           | 10000         | 39,0625       | 4K           | 5000          | 19,53125      |
| 100        | 64K          | 10000         | 350           | 64K          | 5000          | 250           |
| 100        | 1M           | 10000         | 500           | 1M           | 5000          | 500           |
| 250        | 4K           | 18750         | 73,2421875    | 4K           | 8750          | 34,1796875    |
| 250        | 64K          | 18750         | 350           | 64K          | 8750          | 250           |
| 250        | 1M           | 18750         | 585,9375      | 1M           | 8750          | 500           |
| 500        | 4K           | 37500         | 146,484375    | 4K           | 17500         | 68,359375     |
| 500        | 64K          | 37500         | 585,9375      | 64K          | 17500         | 500           |
| 500        | 1M           | 37500         | 1171,875      | 1M           | 17500         | 546,875       |
| 1000       | 4K           | 75000         | 292,96875     | 4K           | 35000         | 136,71875     |
| 1000       | 64K          | 75000         | 1171,875      | 64K          | 35000         | 546,875       |
| 1000       | 1M           | 75000         | 1200          | 1M           | 35000         | 900           |
| 2000       | 4K           | 75000         | 292,96875     | 4K           | 50000         | 195,3125      |
| 2000       | 64K          | 75000         | 1171,875      | 64K          | 50000         | 781,25        |
| 2000       | 1M           | 75000         | 1200          | 1M           | 50000         | 900           |

<info>

Disk performance directly depends on its volume. If it is necessary to increase the data processing speed, sometimes it is enough to increase the size of the required disk.

</info>

## How to conduct testing

### For Windows**

You can use DiskSPD or Fio software to measure read/write IOPS.

**DiskSPD**

DiskPSD is an official testing tool recommended by Microsoft and [included in the developer repositories](https://aka.ms/diskspd). The following steps are required to perform testing:

1. Download the utility from the official resource and unpack it to a convenient location: [https://github.com/microsoft/diskspd/releases/latest](https://github.com/microsoft/diskspd/releases/latest)
2. Run the command prompt from the administrator and go to the directory with the unpacked DiskSpd-2.0.21a\\amd64\\ utility.
3. Pre-create an empty file with a size of at least 10GB:

```bash
fsutil file createnew C:\temp\test.bin 10485760000
```

4. To run the tests, you must apply the appropriate test type command:

- Random recording test:

```bash
diskspd -Suw -b4K -o1 -t32 -r -w100 C:\temp\test.bin > C:\temp\random_write_results.txt
```

- Random reading test:

```bash
diskspd -Suw -b4K -o1 -t32 -r -w0 C:\temp\test.bin > C:\temp\random_read_results.txt
```

**Fio**

Measurements of IOPS indicators using fio are made with the indication of the rate_iops parameter. Tests are performed with values:

-\--rw (randread or randwrite)
-\--filename (name of the device under test)
-\--iodepth (8, 16, 32 or 64)

Download and install Fio from [official resource](https://bsdio.com/fio/).

The command to run the test:

```bash
fio --name=randwrite --iodepth=32 --rw=randwrite --bs=4k --direct=1 --size=10G --numjobs=1 --runtime=240 --group_reporting --filename=C:\Users\ADMIN\test
```

<info>

The mechanics of Fio work are different from the DiskSPD tool. Fio writes to 2 files, so the measurement results may be different for both instruments. Nevertheless, Microsoft trusts its tool and recommends using DiskSPD on Windows operating systems.

</info>

### For Linux

Measurements of read/write IOPS indicators are carried out by the fio software and specifying the rate_iops parameter. Tests are performed with values:

-\--rw (randread or randwrite)
-\--filename (name of the device under test)
-\--iodepth (8, 16, 32 or 64)

Installing Fio:

```bash
sudo apt install fio
```

The command to run the test:

```bash
fio --name=randwrite --ioengine=libaio --iodepth=32 --rw=read write --bs=4k --direct=1 --size=512M --numjobs=1 --runtime=240 --group_reporting --filename=/home/user/test
```

Measurement results:

- read: IOPS
- write: IOPS

| Types of testing conducted | Test result (Number of IOPS) |
| --- | --- |
| Read/write in blocks of 4 KB in 32 threads | According to SLA values |
| Read/write in blocks of 8 KB in 32 threads | At least 75% of SLA |
| Read/write 16 KB in 32 threads | At least 50% of SLA |
