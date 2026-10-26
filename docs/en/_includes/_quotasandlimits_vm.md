{includetag(vm)}

## {heading(Virtual machines)[id=include-quotasandlimits-vm]}

### {heading(Total number of VMs and vCPUs)[id=include-quotasandlimits-vm-vcpu]}

[cols="2,1,1,1,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Quota in CLI
| Basic tier
| Increased tier
| Limit
| Hard

| Number of instances in the project
| **Virtual machines**
|`instances`
| 2 pcs.
| 5 pcs.
| 1000 pcs.
| ![](../../../../assets/no.svg "inline")

| Number of vCPUs in the project
| **vCPU**
| `cores`
| 16 pcs.
| 40 pcs.
| not limited
| ![](../../../../assets/no.svg "inline")

| Total amount of RAM in the project
| **RAM**
| `ram`
| 64 GB
| 160 GB
| not limited
| ![](../../../../assets/no.svg "inline")

| HEAVY aggregates
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| 0 pcs.
| 0 pcs.
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline") 
|===

The limit on the number of instances in the project can be exceeded if you {linkto(/ru/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota)[text=increase]} the corresponding quota.

{note:info}
No more than 1000 virtual machines can be displayed in the management console.
{/note}

### {heading(Limits without quotas)[id=include-quotasandlimits-vm-no-quotas-limits]}

[cols="2,1,1", options="header"]
|===
| Parameter
| Limit
| Hard

| Number of vCPUs per instance
| 32 pcs.
| ![](../../../../assets/no.svg "inline")

| Number of High-Freq vCPUs per instance
| 24 pcs.
| ![](../../../../assets/no.svg "inline")

| Number of GPUs per instance
| 4 pcs.

(8 pcs. for [Tesla H200](/ru/computing/gpu/concepts/about#gpu-about-flavors))
| ![](../../../../assets/check.svg "inline")

| Amount of RAM per instance   
| 1024 GB
| ![](../../../../assets/no.svg "inline")
|===

The limits on the number of processors (vCPU and High-Freq vCPU) and RAM are related to the restrictions of standard hypervisors. If you need a larger number of vCPUs or High-Freq vCPUs, coordinate the quota increase with a manager by email at [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru) and order a dedicated hypervisor with the required specifications.

The GPU limit per instance is related to the limitation of KVM technology, which does not allow connecting more video cards to a single virtual machine.

## {heading(Disks and images)[id=include-quotasandlimits-images-volumes]}

### {heading(Disk volume)[id=include-quotasandlimits-images-volumes-size]}

[cols="3,2,2,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Quota in CLI
| Basic tier
| Increased tier
| Limit

| Total disk volume in the project
| **Disk size**
| `gigabytes`
| 400 GB
| 1000 GB
| not limited

| Total volume of High-IOPS SSD disks
| **High-IOPS SSD size**
| `gigabytes_high-iops`
| 400 GB
| 1000 GB
| not limited

| Total volume of High-IOPS HA SSD disks
| **High-IOPS HA SSD size**
| `gigabytes_high-iops-ha`
| 400 GB
| 1000 GB
| not limited

| Total volume of High-IOPS SSD disks in the {linkto(/ru/start/concepts/architecture#architecture-az)[text=availability zone]} GZ1 (legacy)
| **High-IOPS SSD size in zone - (DP1)**
| `gigabytes_dp1-high-iops`
| 400 GB
| 1000 GB
| not limited

| Total volume of High-IOPS SSD disks in the {linkto(/ru/start/concepts/architecture#architecture-az)[text=availability zone]} MS1 (legacy)
| **High-IOPS SSD size in Moscow zone (MS1)**
| `gigabytes_ko1-high-iops`
| 400 GB
| 1000 GB
| not limited
|===

The total volume of Low Latency NVMe disks is not quota-controlled and is not restricted by limits.

Quotas on the total disk volume in the project take into account disks of all types, including High-IOPS SSD. Quotas on the total volume of High-IOPS SSD disks take into account disks created in both availability zones. If you {linkto(/ru/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota)[text=request]} an increase of a quota that is included in another quota, the higher-level quota will be increased proportionally.

### {heading(Number of disks)[id=include-quotasandlimits-iv-number]}

[cols="3,2,2,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Quota in CLI
| Basic tier
| Increased tier
| Limit

| Number of disks in the project
| **Disks**
| `volumes`
| 4 pcs.
| 10 pcs.
| not limited

| Number of High-IOPS SSD disks in the project
| **High-IOPS SSD disks**
| `volumes_high-iops`
| 4 pcs.
| 10 pcs.
| not limited

| Number of High-IOPS HA SSD disks in the project
| **High-IOPS HA SSD disks**
| `volumes_high-iops-ha`
| 4 pcs.
| 10 pcs.
| not limited

| Number of High-IOPS SSD disks in the {linkto(/ru/start/concepts/architecture#architecture-az)[text=availability zone]} GZ1 (legacy)
| **High-IOPS SSD disks in zone - (DP1)**
| `volumes_dp1-high-iops`
| 4 pcs.
| 10 pcs.
| not limited

| Number of High-IOPS SSD disks in the {linkto(/ru/start/concepts/architecture#architecture-az)[text=availability zone]} MS1 (legacy)
| **High-IOPS SSD disks in Moscow zone (MS1)**
| `volumes_ko1-high-iops`
| 4 pcs.
| 10 pcs.
| not limited
|===

The number of Low Latency NVMe disks is not quota-controlled and is not restricted by limits.

Quotas on the total number of disks in the project take into account disks of all types, including High-IOPS SSD. Quotas on the total number of High-IOPS SSD disks take into account disks created in both availability zones. If you {linkto(/ru/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota)[text=request]} an increase of a quota that is included in another quota, the higher-level quota will be increased proportionally.

### {heading(Limits without quotas)[id=include-quotasandlimits-iv-no-quotas-limits]}

[cols="2,2,3,1", options="header"]
|===
|Parameter
|Limit
|Comment
|Hard

|Number of disks per instance
|25 pcs. when a configuration disk is attached.

26 pcs. if the configuration disk is disabled
|The limit is related to PCI bus restrictions.

If the **Use configuration disk** option is enabled in the management console or the `--use-config-drive` parameter is used in the OpenStack CLI when {linkto(/ru/computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=creating a virtual machine]}, the maximum number of disks is 25. Use a configuration disk in networks without a {linkto(/ru/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-network-addressing)[text=DHCP server]}.

If the **Use configuration disk** option is disabled or the `--use-config-drive` parameter is not used, the maximum number of disks is 26
|![](/ru/assets/check.svg "inline")

|Size of a single HDD disk
|5 TB via the management console

100 TB using the OpenStack CLI
|Some {var(cloud)} services may have their own restrictions on disk size.

|![](/ru/assets/check.svg "inline")

|Size of a single SSD disk
|5 TB via the management console

100 TB using the OpenStack CLI
|Some {var(cloud)} services may have their own restrictions on disk size.

|![](/ru/assets/check.svg "inline")

|Size of a single High-IOPS SSD disk
|2 TB via the management console

10 TB using the OpenStack CLI
|A disk created in excess of the limit (10 TB) does not differ in performance, but restoring or migrating such a disk will take considerable time and involve risks. The limit can be exceeded by contacting a manager by email at [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru).

Some {var(cloud)} services may have their own restrictions on disk size
|![](/ru/assets/no.svg "inline")

|Size of a single High-IOPS HA SSD disk
|2 TB via the management console

10 TB using the OpenStack CLI
|A disk created in excess of the limit (10 TB) does not differ in performance, but restoring or migrating such a disk will take considerable time and involve risks. The limit can be exceeded by contacting a manager by email at [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru).

Some {var(cloud)} services may have their own restrictions on disk size
|![](/ru/assets/no.svg "inline")

|Size of a single Low Latency NVMe disk
|2 TB via the management console

10 TB using the OpenStack CLI
|The limit (10 TB) can be exceeded by contacting a manager by email at [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru).

Some {var(cloud)} services may have their own restrictions on disk size
|![](/ru/assets/no.svg "inline")

|Size of a single image
|100 GB via the management console.

 500 GB using the OpenStack CLI
|The limit is hard for the Glance service.

If you need to upload a larger image, use the [instructions](/ru/storage/s3/how-to-guides/load-large-image)
|![](/ru/assets/no.svg "inline")

|Total volume of images
|2 TB
|The limit can be exceeded by contacting a manager by email at [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru)
|![](/ru/assets/no.svg "inline")

|Total number of disk snapshots
|200 pcs.
|The limit can be exceeded by contacting a manager by email at [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru)
|![](/ru/assets/no.svg "inline")
|===

## {heading(File storages)[id=include-quotasandlimits-fs]}

[cols="3,2,1,1,1,1", options="header"]
|===
| Parameter
| Quota in management console
| Basic tier
| Increased tier
| Limit
| Hard

| Number of file storages in the project
| **NFS/CIFS file storages**
| 0 pcs.
| 5 pcs.
| not limited
| ![](/ru/assets/no.svg "inline")

| Total volume of all file storages in the project
| **NFS/CIFS file storage size**
| 0 GB
| 100 GB
| not limited
| ![](/ru/assets/no.svg "inline")

| Total volume of file storage snapshots in the project
| **NFS/CIFS file storage snapshot size**
| 0 GB
| 100 GB
| not limited
| ![](/ru/assets/no.svg "inline")

| Number of file storage networks
| **NFS/CIFS file storage networks**
| 0 pcs.
| 2 pcs.
| not limited
| ![](/ru/assets/no.svg "inline")

| Size of a single file storage
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| 50 TB
| ![](/ru/assets/check.svg "inline")
|===

The quota on the number of file storage networks (**NFS/CIFS file storage networks**) is a quota for internal use.

{/includetag}
