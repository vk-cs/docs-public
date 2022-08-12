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

<table border="0" cellpadding="0" cellspacing="0" style="margin-right: calc(5%); width: 95%;" width="518"><tbody><tr><td class="xl66" height="38" rowspan="2" style="background-color: rgb(239, 239, 239); text-align: center;" width="15.057915057915057%">Volume in GB</td><td class="xl66" rowspan="2" style="background-color: rgb(239, 239, 239); text-align: center; width: 17.81%;" width="17.76061776061776%">Block size</td><td class="xl65" colspan="2" style="background-color: rgb(239, 239, 239); text-align: center; width: 24.6702%;" width="24.71042471042471%">Reading</td><td class="xl67" rowspan="2" style="background-color: rgb(239, 239, 239); text-align: center;"width="17.76061776061776%">Block size</td><td class="xl65" colspan="2" style="background-color: rgb(239, 239, 239); text-align: center;"width="24.71042471042471%">Entry</td></tr><tr><td class="xl65" height="19" style="background-color: rgb(239, 239, 239); text-align: center; width: 12.2692%;">IOPS</td><td class="xl65" style="background-color: rgb(239, 239, 239); text-align: center;">MB/s</td><td class="xl65" style="background-color: rgb(239, 239, 239); text-align: center;">IOPS</td><td class="xl65" style="background-color: rgb(239, 239, 239); text-align: center;">MB/s</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">10</td><td style="width: 17.81%;">4K</td><td align="right" style="width: 12.2692%;">300</td><td align="right">1</td><td>4K</td><td align="right">150</td><td align="right">1</td></tr><tr><td style="width: 17.81%;">64K</td><td style="width: 12.2692%;"><br></td><td align="right">9</td><td>64K</td><td><br></td><td align="right">5</td></tr><tr><td style="width: 17.81%;">1M</td><td style="width: 12.2692%;"><br></td><td align="right">38</td><td>1M</td><td><br></td><td align="right">19</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">50</td><td style="width: 17.81%;">4K</td><td align="right" style="width: 12.2692%;">300</td><td align="right">1</td><td>4K</td><td align="right">150</td><td align="right">1</td></tr><tr><td style="width: 17.81%;">64K</td><td style="width: 12.2692%;"><br></td><td align="right">9</td><td>64K</td><td><br></td><td align="right">5</td></tr><tr><td style="width: 17.81%;">1M</td><td style="width: 12.2692%;"><br></td><td align="right">38</td><td>1M</td><td><br></td><td align="right">19</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">100</td><td style="width: 17.81%;">4K</td><td align="right" style="width: 12.2692%;">300</td><td align="right">1</td><td>4K</td><td align="right">150</td><td align="right">1</td></tr><tr><td style="width: 17.81%;">64K</td><td style="width: 12.2692%;"><br></td><td align="right">9</td><td>64K</td><td><br></td><td align="right">5</td></tr><tr><td style="width: 17.81%;">1M</td><td style="width: 12.2692%;"><br></td><td align="right">38</td><td>1M</td><td><br></td><td align="right">19</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">250</td><td style="width: 17.81%;">4K</td><td align="right" style="width: 12.2692%;">300</td><td align="right">1</td><td>4K</td><td align="right">250</td><td align="right">1</td></tr><tr><td style="width: 17.81%;">64K</td><td style="width: 12.2692%;"><br></td><td align="right">9</td><td>64K</td><td><br></td><td align="right">8</td></tr><tr><td style="width: 17.81%;">1M</td><td style="width: 12.2692%;"><br></td><td align="right">38</td><td>1M</td><td><br></td><td align="right">31</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">500</td><td style="width: 17.81%;">4K</td><td align="right" style="width: 12.2692%;">500</td><td align="right">2</td><td>4K</td><td align="right">500</td><td align="right">2</td></tr><tr><td style="width: 17.81%;">64K</td><td style="width: 12.2692%;"><br></td><td align="right">16</td><td>64K</td><td><br></td><td align="right">16</td></tr><tr><td style="width: 17.81%;">1M</td><td style="width: 12.2692%;"><br></td><td align="right">63</td><td>1M</td><td><br></td><td align="right">63</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">1000</td><td style="width: 17.81%;">4K</td><td align="right" style="width: 12.2692%;">1000</td><td align="right">4</td><td>4K</td><td align="right">800</td><td align="right">3</td></tr><tr><td style="width: 17.81%;">64K</td><td style="width: 12.2692%;"><br></td><td align="right">31</td><td>64K</td><td><br></td><td align="right">25</td></tr><tr><td style="width: 17.81%;">1M</td><td style="width: 12.2692%;"><br></td><td align="right">125</td><td>1M</td><td><br></td><td align="right">100</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">1500</td><td style="width: 17.81%;">4K</td><td align="right" style="width: 12.2692%;">1500</td><td align="right">6</td><td>4K</td><td align="right">800</td><td align="right">3</td></tr><tr><td style="width: 17.81%;">64K</td><td style="width: 12.2692%;"><br></td><td align="right">47</td><td>64K</td><td><br></td><td align="right">25</td></tr><tr><td style="width: 17.81%;">1M</td><td style="width: 12.2692%;"><br></td><td align="right">188</td><td>1M</td><td><br></td><td align="right">100</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">2000</td><td style="width: 17.81%;">4K</td><td align="right" style="width: 12.2692%;">2000</td><td align="right">8</td><td>4K</td><td align="right">800</td><td align="right">3</td></tr><tr><td style="width: 17.81%;">64K</td><td style="width: 12.2692%;"><br></td><td align="right">63</td><td>64K</td><td><br></td><td align="right">25</td></tr><tr><td style="width: 17.81%;">1M</td><td style="width: 12.2692%;"><br></td><td align="right">250</td><td>1M</td><td><br></td><td align="right">100</td></tr></tbody></table>

**SSD**

<table border="0" cellpadding="0" cellspacing="0" style="margin-right: calc(5%); width: 95%;" width="518"><tbody><tr><td class="xl65" height="38" rowspan="2" style="background-color: rgb(239, 239, 239); text-align: center;" width="15.057915057915057%">Volume in GB</td><td class="xl65" rowspan="2" style="background-color: rgb(239, 239, 239); text-align: center;" width="17.76061776061776%">Block size</td><td class="xl65" colspan="2" style="background-color: rgb(239, 239, 239); text-align: center;" width="24.71042471042471%">Reading</td><td class="xl65" rowspan="2" style="background-color: rgb(239, 239, 239); text-align: center;" width="17.76061776061776%">Block size</td><td class="xl65" colspan="2" style="background-color: rgb(239, 239, 239); text-align: center;"width="24.71042471042471%">Entry</td></tr><tr><td class="xl65" height="19" style="background-color: rgb(239, 239, 239); text-align: center;">IOPS</td><td class="xl65" style="background-color: rgb(239, 239, 239); text-align: center;">MB/s</td><td class="xl65" style="background-color: rgb(239, 239, 239); text-align: center;">IOPS</td><td class="xl65" style="background-color: rgb(239, 239, 239); text-align: center;">MB/s</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">10</td><td>4K</td><td align="right">1000</td><td align="right">4</td><td>4K</td><td align="right">500</td><td align="right">2</td></tr><tr><td>64K</td><td><br></td><td align="right">31</td><td>64K</td><td><br></td><td align="right">16</td></tr><tr><td>1M</td><td><br></td><td align="right">125</td><td>1M</td><td><br></td><td align="right">63</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">50</td><td>4K</td><td align="right">1500</td><td align="right">6</td><td>4K</td><td align="right">750</td><td align="right">3</td></tr><tr><td>64K</td><td><br></td><td align="right">47</td><td>64K</td><td><br></td><td align="right">23</td></tr><tr><td>1M</td><td><br></td><td align="right">188</td><td>1M</td><td><br></td><td align="right">94</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">100</td><td>4K</td><td align="right">3000</td><td align="right">12</td><td>4K</td><td align="right">1500</td><td align="right">6</td></tr><tr><td>64K</td><td><br></td><td align="right">94</td><td>64K</td><td><br></td><td align="right">47</td></tr><tr><td>1M</td><td><br></td><td align="right">375</td><td>1M</td><td><br></td><td align="right">188</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">250</td><td>4K</td><td align="right">7500</td><td align="right">29</td><td>4K</td><td align="right">3750</td><td align="right">15</td></tr><tr><td>64K</td><td><br></td><td align="right">234</td><td>64K</td><td><br></td><td align="right">117</td></tr><tr><td>1M</td><td><br></td><td align="right">400</td><td>1M</td><td><br></td><td align="right">400</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">500</td><td>4K</td><td align="right">15000</td><td align="right">59</td><td>4K</td><td align="right">7500</td><td align="right">29</td></tr><tr><td>64K</td><td><br></td><td align="right">400</td><td>64K</td><td><br></td><td align="right">234</td></tr><tr><td>1M</td><td><br></td><td align="right">400</td><td>1M</td><td><br></td><td align="right">400</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">1000</td><td>4K</td><td align="right">16000</td><td align="right">63</td><td>4K</td><td align="right">8000</td><td align="right">31</td></tr><tr><td>64K</td><td><br></td><td align="right">400</td><td>64K</td><td><br></td><td align="right">250</td></tr><tr><td>1M</td><td><br></td><td align="right">400</td><td>1M</td><td><br></td><td align="right">400</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">1500</td><td>4K</td><td align="right">16000</td><td align="right">63</td><td>4K</td><td align="right">8000</td><td align="right">31</td></tr><tr><td>64K</td><td><br></td><td align="right">400</td><td>64K</td><td><br></td><td align="right">250</td></tr><tr><td>1M</td><td><br></td><td align="right">400</td><td>1M</td><td><br></td><td align="right">400</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">2000</td><td>4K</td><td align="right">16000</td><td align="right">63</td><td>4K</td><td align="right">8000</td><td align="right">31</td></tr><tr><td>64K</td><td><br></td><td align="right">400</td><td>64K</td><td><br></td><td align="right">250</td></tr><tr><td>1M</td><td><br></td><td align="right">400</td><td>1M</td><td><br></td><td align="right">400</td></tr></tbody></table>

**High-IOPS SSD**

<table border="0" cellpadding="0" cellspacing="0" style="margin-right: calc(3%); width: 97%;" width="518"><tbody><tr><td class="xl65" height="38" rowspan="2" style="text-align: center; background-color: rgb(239, 239, 239);" width="15.057915057915057%">Volume in GB</td><td class="xl65" rowspan="2" style="text-align: center; background-color: rgb(239, 239, 239);" width="17.76061776061776%">Block size</td><td class="xl65" colspan="2" style="text-align: center; background-color: rgb(239, 239, 239);"width="24.71042471042471%">Reading</td><td class="xl65" rowspan="2" style="text-align: center; background-color: rgb(239, 239, 239);" width="17.76061776061776%">Block size</td><td class="xl65" colspan="2" style="text-align: center; background-color: rgb(239, 239, 239);"width="24.71042471042471%">Entry</td></tr><tr><td class="xl65" height="19" style="text-align: center; background-color: rgb(239, 239, 239);"> IOPS</td><td class="xl65" style="text-align: center; background-color: rgb(239, 239, 239);"> MB/s</td><td class="xl65" style="text-align: center; background-color: rgb(239, 239, 239);"> IOPS</td><td class="xl65" style="text-align: center; background-color: rgb(239, 239, 239);">MB/s</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">10</td><td>4K</td><td align="right">10000</td><td align="right">39</td><td>4K</td><td align="right">5000</td><td align="right">20</td></tr><tr><td>64K</td><td><br></td><td align="right">313</td><td>64K</td><td><br></td><td align="right">156</td></tr><tr><td>1M</td><td><br></td><td align="right">500</td><td>1M</td><td><br></td><td align="right">500</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">50</td><td>4K</td><td align="right">10000</td><td align="right">39</td><td>4K</td><td align="right">5000</td><td align="right">20</td></tr><tr><td>64K</td><td><br></td><td align="right">313</td><td>64K</td><td><br></td><td align="right">156</td></tr><tr><td>1M</td><td><br></td><td align="right">500</td><td>1M</td><td><br></td><td align="right">500</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">100</td><td>4K</td><td align="right">10000</td><td align="right">39</td><td>4K</td><td align="right">5000</td><td align="right">20</td></tr><tr><td>64K</td><td><br></td><td align="right">313</td><td>64K</td><td><br></td><td align="right">156</td></tr><tr><td>1M</td><td><br></td><td align="right">500</td><td>1M</td><td><br></td><td align="right">500</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">250</td><td>4K</td><td align="right">10000</td><td align="right">39</td><td>4K</td><td align="right">6250</td><td align="right">24</td></tr><tr><td>64K</td><td><br></td><td align="right">313</td><td>64K</td><td><br></td><td align="right">195</td></tr><tr><td>1M</td><td><br></td><td align="right">500</td><td>1M</td><td><br></td><td align="right">500</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">500</td><td>4K</td><td align="right">15000</td><td align="right">59</td><td>4K</td><td align="right">12500</td><td align="right">49</td></tr><tr><td>64K</td><td><br></td><td align="right">469</td><td>64K</td><td><br></td><td align="right">391</td></tr><tr><td>1M</td><td><br></td><td align="right">500</td><td>1M</td><td><br></td><td align="right">500</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">1000</td><td>4K</td><td align="right">30000</td><td align="right">117</td><td>4K</td><td align="right">25000</td><td align="right">98</td></tr><tr><td>64K</td><td><br></td><td align="right">500</td><td>64K</td><td><br></td><td align="right">500</td></tr><tr><td>1M</td><td><br></td><td align="right">500</td><td>1M</td><td><br></td><td align="right">500</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">1500</td><td>4K</td><td align="right">45000</td><td align="right">176</td><td>4K</td><td align="right">30000</td><td align="right">117</td></tr><tr><td>64K</td><td><br></td><td align="right">500</td><td>64K</td><td><br></td><td align="right">500</td></tr><tr><td>1M</td><td><br></td><td align="right">500</td><td>1M</td><td><br></td><td align="right">500</td></tr><tr><td align="right" height="19" rowspan="3" style="width: 15.0396%;">2000</td><td>4K</td><td align="right">45000</td><td align="right">176</td><td>4K</td><td align="right">30000</td><td align="right">117</td></tr><tr><td>64K</td><td><br></td><td align="right">500</td><td>64K</td><td><br></td><td align="right">500</td></tr><tr><td>1M</td><td><br></td><td align="right">500</td><td>1M</td><td><br></td><td align="right">500</td></tr></tbody></table>

**LL NVME**

<table border="0" cellpadding="0" cellspacing="0" width="769"><tbody><tr><td class="xl85" height="48" rowspan="2" style="width: 15.0923%; background-color: rgb(239, 239, 239);" width="14.044213263979193%">Volume in GB</td><td class="xl84" rowspan="2" style="width: 16.4908%; background-color: rgb(239, 239, 239);" width="13.524057217165149%">Block size</td><td class="xl82" colspan="2" style="width: 25.7256%; background-color: rgb(239, 239, 239);" width="28.34850455136541%">Reading</td><td class="xl84" rowspan="2" style="width: 16.095%; background-color: rgb(239, 239, 239);" width="14.694408322496749%">Block size</td><td class="xl82" colspan="2" style="width: 26.57%; background-color: rgb(239, 239, 239);" width="29.388816644993497%">Entry</td></tr><tr><td class="xl81" height="28" style="width: 11.7414%; background-color: rgb(239, 239, 239);">IOPS</td><td class="xl81" style="width: 13.9842%; background-color: rgb(239, 239, 239);">Mb/s</td><td class="xl81" style="width: 11.7236%; background-color: rgb(239, 239, 239);">IOPS</td><td class="xl81" style="width: 14.7553%; background-color: rgb(239, 239, 239);">Mb/s</td></tr><tr><td class="xl83" height="60" rowspan="3" style="width: 15.0923%;">10</td><td class="xl82" style="width: 16.4908%;">4K</td><td class="xl82" style="width: 11.6901%;">10000</td><td class="xl82" style="width: 13.9842%;">39,0625</td><td class="xl82" style="width: 16.095%;">4K</td><td class="xl82" style="width: 11.7236%;">5000</td><td class="xl82" style="width: 14.7553%;">19,53125</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">64K</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">350</td><td class="xl82" style="width: 16.095%;">64K</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">200</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">1M</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">500</td><td class="xl82" style="width: 16.095%;">1M</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">500</td></tr><tr><td class="xl83" height="60" rowspan="3" style="width: 15.0923%;">50</td><td class="xl82" style="width: 16.4908%;">4K</td><td class="xl82" style="width: 11.6901%;">10000</td><td class="xl82" style="width: 13.9842%;">39,0625</td><td class="xl82" style="width: 16.095%;">4K</td><td class="xl82" style="width: 11.7236%;">5000</td><td class="xl82" style="width: 14.7553%;">19,53125</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">64K</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">350</td><td class="xl82" style="width: 16.095%;">64K</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">200</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">1M</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">500</td><td class="xl82" style="width: 16.095%;">1M</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">500</td></tr><tr><td class="xl83" height="60" rowspan="3" style="width: 15.0923%;">100</td><td class="xl82" style="width: 16.4908%;">4K</td><td class="xl82" style="width: 11.6901%;">10000</td><td class="xl82" style="width: 13.9842%;">39,0625</td><td class="xl82" style="width: 16.095%;">4K</td><td class="xl82" style="width: 11.7236%;">5000</td><td class="xl82" style="width: 14.7553%;">19,53125</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">64K</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">350</td><td class="xl82" style="width: 16.095%;">64K</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">250</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">1M</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">500</td><td class="xl82" style="width: 16.095%;">1M</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">500</td></tr><tr><td class="xl83" height="60" rowspan="3" style="width: 15.0923%;">250</td><td class="xl82" style="width: 16.4908%;">4K</td><td class="xl82" style="width: 11.6901%;">18750</td><td class="xl82" style="width: 13.9842%;">73,2421875</td><td class="xl82" style="width: 16.095%;">4K</td><td class="xl82" style="width: 11.7236%;">8750</td><td class="xl82" style="width: 14.7553%;">34,1796875</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">64K</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">350</td><td class="xl82" style="width: 16.095%;">64K</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">250</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">1M</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">585,9375</td><td class="xl82" style="width: 16.095%;">1M</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">500</td></tr><tr><td class="xl83" height="60" rowspan="3" style="width: 15.0923%;">500</td><td class="xl82" style="width: 16.4908%;">4K</td><td class="xl82" style="width: 11.6901%;">37500</td><td class="xl82" style="width: 13.9842%;">146,484375</td><td class="xl82" style="width: 16.095%;">4K</td><td class="xl82" style="width: 11.7236%;">17500</td><td class="xl82" style="width: 14.7553%;">68,359375</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">64K</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">585,9375</td><td class="xl82" style="width: 16.095%;">64K</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">500</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">1M</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">1171,875</td><td class="xl82" style="width: 16.095%;">1M</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">546,875</td></tr><tr><td class="xl83" height="60" rowspan="3" style="width: 15.0923%;">1000</td><td class="xl82" style="width: 16.4908%;">4K</td><td class="xl82" style="width: 11.6901%;">75000</td><td class="xl82" style="width: 13.9842%;">292,96875</td><td class="xl82" style="width: 16.095%;">4K</td><td class="xl82" style="width: 11.7236%;">35000</td><td class="xl82" style="width: 14.7553%;">136,71875</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">64K</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">1171,875</td><td class="xl82" style="width: 16.095%;">64K</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">546,875</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">1M</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">1200</td><td class="xl82" style="width: 16.095%;">1M</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">900</td></tr><tr><td class="xl83" height="60" rowspan="3" style="width: 15.0923%;">2000</td><td class="xl82" style="width: 16.4908%;">4K</td><td class="xl82" style="width: 11.6901%;">75000</td><td class="xl82" style="width: 13.9842%;">292,96875</td><td class="xl82" style="width: 16.095%;">4K</td><td class="xl82" style="width: 11.7236%;">50000</td><td class="xl82" style="width: 14.7553%;">195,3125</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">64K</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">1171,875</td><td class="xl82" style="width: 16.095%;">64K</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">781,25</td></tr><tr><td class="xl82" height="20" style="width: 16.4908%;">1M</td><td class="xl82" style="width: 11.6901%;"><br></td><td class="xl82" style="width: 13.9842%;">1200</td><td class="xl82" style="width: 16.095%;">1M</td><td class="xl82" style="width: 11.7236%;"><br></td><td class="xl82" style="width: 14.7553%;">900</td></tr></tbody></table>

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
