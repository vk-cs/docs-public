You can download the files of VM disk backups from Cloud Backup and store them outside the {var(cloud)} platform. You may need this if your company policy requires you to keep data outside the service, or if you plan to restore the data on another platform.

You can download the copy files in two ways:

- [via the management console](/en/storage/backups/instructions/download-backup/download-backup-lk)
- [via OpenStack CLI and API](/en/storage/backups/instructions/download-backup/download-backup-cli-api)

Each VM backup run creates a checkpoint. A checkpoint holds one backup copy for each VM disk. If a VM has several disks, each disk has its own copy and its own chain of copies. The platform assembles each disk into a separate RAW file.

{note:err}
Do not delete backup copies from Cloud Backup after you download them.

VK Object Storage stores the backup copies and provides [double data replication](/en/intro/start/concepts/architecture#fault_tolerance). This keeps your data safe even after a critical infrastructure failure. Use the downloaded files as an extra safeguard. Do not treat them as a full replacement for Cloud Backup.
{/note}

## {heading(Backup structure)[id=download_features_content]}

The files of a disk backup copy are stored in the `volumebackups-<PROJECT_ID>` system [bucket](/en/storage/s3/concepts/about) under the `<COPY_ID>/` prefix. A copy has five files, and you need all of them to assemble the disk:

[cols="1,3", options="header"]
|===
| File
| Purpose

| `content`
| Disk data in segments of up to 16 MB. Each segment is compressed with the LZ4 algorithm. If compression does not reduce the size, the segment is stored as is

| `object_segments`
| A map of where each compressed segment is located in `content` (`object_offset`, `object_length`)

| `volume_segments`
| A map of where on the disk to write each decompressed segment (`volume_offset`, `volume_length`)

| `sha_list`
| SHA-256 checksums of 64 KB blocks for the entire disk. They are used for incremental copies and to check that the disk is assembled correctly

| `volume_metadata`
| Disk and copy properties: size, IDs
|===

A backup copy can be of two types:

- A full copy that contains all the disk data. Its five files are enough to assemble the disk.
- An incremental copy that contains only the disk areas that changed since the previous copy. Its `object_segments` and `volume_segments` files describe these areas. To assemble the disk, you need the whole chain: the base full copy and all incremental copies after it, up to and including the copy you need. If any copy in the chain is missing, you cannot assemble the disk.

Whether incremental copies are available depends on the [backup plan settings](/en/storage/backups/instructions/create-backup-plan). [Manual copies](/en/storage/backups/instructions/create-backup-copy) are always full.

## {heading(Backup fault tolerance)[id=download_features_lost]}

Copies are stored in two different data centers. For a copy to be lost from the {var(cloud)} storage, both data centers must fail at the same time. If this happens, your options depend on whether the copy record is saved in Cloud Backup:

- The copy record is saved in the service, and you have the downloaded files. In this case, technical support can put the files back into the system bucket, as long as the copy record and its metadata are not deleted. After that, you can restore the copy in the usual way, with the VM parameters and networks. To do this, contact [technical support](mailto:support@mcs.mail.ru).
- The copy was deleted both in the service and in the storage. For example, you deleted it yourself after you downloaded it. You cannot restore the VM with its parameters and networks from the downloaded files.

## {heading(Limitations)[id=download_features_limits]}

- You need to assemble the disk from a backup copy and deploy it outside {var(cloud)} on your own.
- The copy files do not store VM parameters, such as the configuration template, networks, and keys. When you deploy the VM outside {var(cloud)}, specify these parameters again.
- If you upload the downloaded files back to the storage, the service does not create a copy record. The copy does not appear in the management console, and you cannot restore a VM from it.
