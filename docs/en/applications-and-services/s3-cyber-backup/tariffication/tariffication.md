# {heading(Tariffication)[id=s3-cyber-backup-tariffication]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(About tariffication)[id=s3-cyber-backup-tariffication-about]}

The cost of the service depends on the complexity of the project and is comprised of the cost of the deployed infrastructure and configuration services.

To calculate the cost of service connection and configuration, contact [technical support](/en/contacts).

## {heading(Tarifficated items)[id=s3-cyber-backup-tariffication-yes]}

- vCPU — for each core. 1 vCPU corresponds to 1 physical core of the virtualization server.
- RAM — for every 1 GB of random access memory.
- Disks (SSD) — for every 1 GB of disk space.
- {linkto(../../../networks/vnet/tariffication#vnet-tariffication)[text=Public IP]}.
- Load balancer (if used).
- The volume of stored data (in GB) under the Hotbox or Icebox plan in {linkto(../../../storage/s3/tariffication#s3-tariffication)[text=VK Object Storage]}.
- Disk (SSD) for intermediate backup storage — for every 1 GB of disk space.
- Cyber Backup Cloud service license — for each device whose backup needs to be performed.

## {heading(Non-tarifficated items)[id=s3-cyber-backup-tariffication-no]}

- Performing basic operations with the service infrastructure resources: restart, deletion.
- Network traffic for maintaining the infrastructure.

## {heading(Price calculation example)[id=s3-cyber-backup-tariffication-example]}

The price of a configured fault-tolerant cluster of three servers will be calculated using the following formula:

`12 vCPU` + `24 GB RAM` + `360 GB SSD` + `1 public IP` + `1 load balancer` + `1 GB Backup` + `1 GB SSD for intermediate storage` + `1 Cyber Backup Cloud service license`