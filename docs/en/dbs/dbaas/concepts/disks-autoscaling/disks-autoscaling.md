# {heading(Disk autoscaling)[id=dbaas-disks-autoscaling]}

{include(/en/_includes/_translated_by_ai_en.md)}

{var(cloud)} supports automatic scaling of database disks. When the amount of free disk space reaches a *threshold value*, the disk size is automatically increased by the *expansion step*. This increase is limited by the specified maximum disk size.

Autoscaling is supported for the following types of disks:

- Data disk — a disk with data connected to the VM in addition to the main disk.
- WAL disk — a disk storing the write-ahead log (Write-Ahead Log, WAL). Only for PostgreSQL databases in Single, Master-Replica, and Cluster configurations.

## {heading(Autoscaling parameters for different types of disks)[id=dbaas-disks-autoscaling-autoscaling-params]}

[cols="1,2,2", options="header"]
|===
|Parameter
|Data disk
|WAL disk

|Maximum disk size, GB
|{linkto(../../instructions/manage-instance/postgresql#dbaas-postgresql-disk-autoscaling)[text=Set]} manually and cannot exceed:

- 10 TB — for High-IOPS SSD;
- 10 TB — for High-IOPS HA SSD;
- 25 TB — for SSD disks
|Calculated automatically and cannot be set by the user

|Threshold value, GB
|Calculated by the formula: `2` + `current data disk size` / `25`.

If the value obtained by the formula is greater than `25`, the threshold value is set equal to 25 GB
|Calculated by the formula: `0.5` + `current WAL disk size` / `25`.

If the value obtained by the formula is greater than `2`, the threshold value is set equal to 2 GB

|Expansion step, GB
|Calculated by the formula: `2` + `current data disk size` / `25`.

If the value obtained by the formula is greater than `25`, the threshold value is set equal to 25 GB
|Calculated by the formula: `0.5` + `current WAL disk size` / `25`.

If the value obtained by the formula is greater than `2`, the threshold value is set equal to 2 GB
|===

## {heading(Autoscaling algorithm)[id=dbaas-disks-autoscaling-algorithm]}

{tabs}

{tab(Data disk)}

1. The user enables autoscaling and sets the maximum disk size: when {linkto(../../instructions/create#dbaas-create)[text=creating]} an instance or after its {linkto(../../instructions/manage-instance/postgresql#dbaas-postgresql-disk-autoscaling)[text=deployment]}.
1. The free disk space reaches the threshold value at which autoscaling should trigger.
1. The service calculates the expansion step and determines whether the disk can be scaled:

   - If the new disk size (current size + expansion step) does not exceed the specified maximum size, the disk size is increased.
   - If the new disk size exceeds the specified maximum size, autoscaling is not performed.

{/tab}

{tab(WAL disk)}

1. The user specifies the data disk size when creating a PostgreSQL instance.
1. The WAL disk size is automatically calculated as `data disk size` × `0.2`.
1. The user enables autoscaling and sets the maximum data disk size: when {linkto(../../instructions/create#dbaas-create)[text=creating]} an instance or after its {linkto(../../instructions/manage-instance/postgresql#dbaas-postgresql-disk-autoscaling)[text=deployment]}.
1. During operation, the free WAL disk space reaches the threshold value at which its autoscaling should trigger.
1. The service calculates the expansion step for the WAL disk and determines whether the disk can be scaled:

   - If the new WAL disk size (current size + expansion step) does not exceed 2048 GB, the WAL disk size is increased.
   - If the new WAL disk size exceeds 2048 GB, autoscaling is not performed.

{/tab}

{/tabs}

{note:info}
In the **Cluster** {linkto(../work-configs#dbaas-work-configs)[text=configuration]}, autoscaling settings are changed at once for all hosts in the cluster.

Autoscaling will proceed synchronously on all hosts.
{/note}

## {heading(DBMSs supporting autoscaling)[id=dbaas-disks-autoscaling-autoscaling]}

The table below shows for which {linkto(../work-configs#dbaas-work-configs)[text=configurations]} and DBMS versions disk autoscaling is supported.

[cols="2,1,1,1", options="header"]
|===
| DBMS type 
| Single 
| Master-Replica 
| Cluster

| MySQL (all versions)
| ![](../../../../assets/check.svg "inline") 
| ![](../../../../assets/check.svg "inline") 
| ![](../../../../assets/check.svg "inline") 

| PostgreSQL (all versions)
| ![](../../../../assets/check.svg "inline") 
| ![](../../../../assets/check.svg "inline") 
| ![](../../../../assets/check.svg "inline") 

| ClickHouse (all versions)
| ![](../../../../assets/check.svg "inline") 
| ![](../../../../assets/check.svg "inline") 
| ![](../../../../assets/check.svg "inline") 

| Redis 5
| ![](../../../../assets/check.svg "inline") 
| ![](../../../../assets/no.svg "inline") 
| ![](../../../../assets/no.svg "inline") 

| Redis 6
| ![](../../../../assets/no.svg "inline") 
| ![](../../../../assets/no.svg "inline") 
| ![](../../../../assets/no.svg "inline") 

| MongoDB 4.0
| ![](../../../../assets/check.svg "inline") 
| ![](../../../../assets/no.svg "inline") 
| ![](../../../../assets/no.svg "inline") 

| OpenSearch 2
| ![](../../../../assets/no.svg "inline") 
| ![](../../../../assets/no.svg "inline") 
| ![](../../../../assets/no.svg "inline")
|===