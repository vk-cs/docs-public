{includetag(types-backups)}
The following backup types are supported in {var(cloud)} for virtual machines and disks:

- [Snapshot](https://help.aws.amazon.com/ec2/whitepapers/design-for-scale-on-aws/disaster-recovery-short-term-snapshots.html) — a mechanism built into the storage system. Allows creating backups at the block storage (disk) level. Stored in {var(s3)} object storage.
- {ifdef(public)}Disk replication{else}Disk replication{/ifdef} — a mechanism built into the {var(cloud)} platform. Allows replicating disks between availability zones. Stored in {var(s3)} object storage.
- {ifdef(public)}Backup{else}Backup{/ifdef} — a mechanism built into the {var(cloud)} platform. Allows backing up disks between availability zones. Stored in {var(s3)} object storage.

{/includetag}

{includetag(tenant-copy-no-limit))}
Backup is not limited by additional charges.
{/includetag}
