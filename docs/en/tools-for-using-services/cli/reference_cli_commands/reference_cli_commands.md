# {heading(Openstack CLI Reference)[id=reference_cli_commands]}

{include(/en/_includes/_translated_by_ai_en.md)}

To manage {var(cloud)} using OpenStack CLI, perform the preparatory steps from the section {linkto(../openstack-cli#tools-cli-openstack)[text=%text]}, and run the commands provided below.

## {heading(Built-in Command Help)[id=cli_help]}

```console
openstack help <COMMAND>
```

Where `<COMMAND>` is the command for which you need to get help.

## {heading(Managing VM Templates (Flavors))[id=cli_flavor]}

### {heading(Getting a List of VM Templates)[id=cli_openstack_flavor_list]}

```console
openstack flavor list
      [--public | --private | --all]
      [--long]
```

Where:

- `--public` — show only public VM templates.
- `--private` — show only private VM templates.
- `--all` — show all VM templates: public and private (default).
- `--long` — display additional fields.

### {heading(Viewing Information About a VM Template)[id=cli_flavor_info]}

```console
openstack flavor show <VM_TEMPLATE>
```

Where `<VM_TEMPLATE>` is the name or ID of the VM template.

## {heading(Managing VMs)[id=cli_vm]}

### {heading(Viewing the List of VMs)[id=cli_openstack_server_list]}

```console
openstack server list
      [--reservation-id <RESERVATION>]
      [--ip <IP_ADDRESS>]
      [--name <NAME>]
      [--instance-name <INSTANCE>]
      [--status <STATUS>]
      [--flavor <VM_TEMPLATE>]
      [--image <IMAGE>]
      [--host <HOST>]
      [--all-projects]
      [--project <PROJECT>]
      [--project-domain <PROJECT_DOMAIN>]
      [--user <USER>]
      [--user-domain <USER_DOMAIN>]
      [--long]
      [--marker <MARKER>]
      [--limit <LIMIT>]
      [--deleted]
      [--changes-since <TIME>]
```

Where:

- `--reservation-id <RESERVATION>` — displays VM instances matching the reservation.
- `--ip <IP_ADDRESS>` — a regular expression to filter VMs by matching addresses.
- `--name <NAME>` — a regular expression to filter VMs by name.
- `--instance-name <INSTANCE>` — a regular expression to filter VMs by instance name.
- `--status <STATUS>` — filter VMs by the specified status.
- `--flavor <VM_TEMPLATE>` — filter VMs by the specified VM template (by name or ID).
- `--image <IMAGE>` — filter VMs by the specified image (by name or ID).
- `--host <HOST>` — filter VMs by the placement hypervisor.
- `--all-projects` — include all projects in the selection.
- `--project <PROJECT>` — filter VMs in the specified project (by name or ID).
- `--project-domain <PROJECT_DOMAIN>` — filter VMs by project domain by name or ID. This option is used in case of conflicts between project names.
- `--user <USER>` — filter VMs of the specified user (by name or ID).
- `--user-domain <USER_DOMAIN>` — filter VMs by user domain (by name or ID). This option is used in case of conflicts between user names.
- `--long` — display additional fields.
- `--marker <MARKER>` — the last VM of the previous page. Displays the entire list of VMs after `<MARKER>`, unless otherwise specified. If used with the `--deleted` option, the `<MARKER>` must be an ID, otherwise either the VM name or ID may be used.
- `--limit <LIMIT>` — the maximum number of VMs in the output list. If the value `-1` is specified, all VMs are displayed. If the specified `<LIMIT>` value exceeds the value of the `osapi_max_limit` configuration parameter, `osapi_max_limit` VMs are displayed.
- `--deleted` — display only deleted VMs.
- `--changes-since <TIME>` — displays the list of VMs changed after the specified point in time. The specified time must be in ISO 8061 format. Example: `2016-03-05T06: 27: 59Z`.

### {heading(Viewing Information About a VM)[id=cli_openstack_server_show]}

```console
openstack server show <VM>
```

Where `<VM>` is the name or ID of the VM.

### {heading(Creating a VM)[id=cli_openstack_server_create]}

```console
openstack server create
    (--image <IMAGE> | --volume <DISK>)
    --flavor <VM_TEMPLATE>
    [--security-group <SECURITY_GROUP>]
    [--key-name <KEY_PAIR>]
    [--property <KEY=VALUE>]
    [--file <DESTINATION_FILE=SOURCE_FILE>]
    [--user-data <DATA>]
    [--availability-zone <AVAILABILITY_ZONE>]
    [--block-device-mapping <DEVICE=MAPPING>]
    [--nic <net-id=NETWORK_UUID,v4-fixed-ip=IP_ADDRESS,v6-fixed-ip=IP_ADDRESS,port-id=PORT_UUID,auto,none>]
    [--hint <KEY=VALUE>]
    [--config-drive <CONFIG_DRIVE>]
    [--min <COUNT>]
    [--max <COUNT>]
    [--wait]
    <VM>
```

<!---

----
openstack server create
      (--image <IMAGE> | --volume <DISK>)
      --flavor <VM_TEMPLATE>
      [--security-group <SECURITY_GROUP>]
      [--key-name <KEY_PAIR>]
      [--property <KEY=VALUE>]
      [--file <DESTINATION_FILE=SOURCE_FILE>]
      [--user-data <DATA>]
      [--availability-zone <AVAILABILITY_ZONE>]
      [--block-device-mapping <DEVICE=MAPPING>]
      [--nic <net-id=NETWORK_UUID,v4-fixed-ip=IP_ADDRESS,v6-fixed-ip=IP_ADDRESS,port-id=PORT_UUID,auto,none>]
      [--hint <KEY=VALUE>]
      [--config-drive <CONFIG_DRIVE>]
      [--min <COUNT>]
      [--max <COUNT>]
      [--wait]
      <VM>
----
-->

Where:

- `--image <IMAGE>` — create a VM using an existing image (name or ID).
- `--volume <DISK>` — create a VM using the specified disk (name or ID). The flag automatically creates a block device mapping with boot index `0`.
- `--flavor <VM_TEMPLATE>` — create a VM using the specified VM configuration template (name or ID). For details, see the section {linkto(#cli_openstack_flavor_list)[text=%text]}.
- `--security-group <SECURITY_GROUP>` — create a VM with a security group assigned. Can be used multiple times to assign multiple security groups.
- `--key-name <KEY_PAIR>` — the key pair to use. Optional flag.
- `--property <KEY=VALUE>` — create a VM with additional properties. Can be used multiple times to set multiple properties.
- `--file <DESTINATION_FILE=SOURCE_FILE>` — the name of the file to be added to the OS image. Example: SSH keys.
- `--user-data <DATA>` — user data for the metadata server.
- `--availability-zone <AVAILABILITY_ZONE>` — create a VM in the specified availability zone.
- `--block-device-mapping <DEVICE=MAPPING>` — block device mapping.
- `--nic <net-id=NETWORK_UUID,v4-fixed-ip=IP_ADDRESS,v6-fixed-ip=IP_ADDRESS,port-id=PORT_UUID,auto,none>` — create a network adapter. Can be used multiple times to create multiple adapters. Either the network ID or the port ID must be specified, but not both:

  - `net-id` — attach the network adapter to the network with UUID `<NETWORK_UUID>`.
  - `v4-fixed-ip` — fixed IPv4 address of the network adapter. Optional flag.

   <!--- // ** `v6-fixed-ip` — fixed IPv6 address of the network adapter. Optional flag. -->

- `port-id` — attach the network adapter to the port with UUID `<PORT_UUID>`.
- `none` — no network is attached.
- `auto` — automatic network allocation.

  - `--hint <KEY=VALUE>` — additional parameters for the scheduler.
  - `--config-drive <CONFIG_DRIVE>` — use the specified disk as a configuration drive. Set the value to `True` to use an ephemeral disk.
  - `--min <COUNT>` — the minimum number of VMs to launch. The default value is `1`.
  - `--max <COUNT>` — the maximum number of VMs to launch. The default value is `1`.
  - `--wait` — wait for the VM creation to complete.
  - `<VM>` — the VM name.

### {heading(Changing VM Parameters)[id=cli_openstack_server_set]}

```console
openstack server set
      [--name <NAME>]
      [--root-password <PASSWORD>]
      [--property <KEY=VALUE>]
      [--state <STATUS>]
      <VM>
```

Where:

- `--name <NAME>` — the new VM name.
- `--root-password` — set a password for the default user to access the VM. Each VM template may have its own user name. Example: for the built-in image with CentOS 7 OS, the default user name is `centos`.
- `--property <KEY=VALUE>` — additional VM properties. Can be used multiple times to set multiple properties.
- `--state <STATUS>` — set the status for the VM.
- `<VM>` — the name or ID of the VM.

### {heading(Resizing a VM)[id=cli_openstack_server_resize]}

```console
openstack server resize
    [--flavor <VM_TEMPLATE> | --confirm | --revert]
    [--wait]
    <VM>
```

Where:

- `--flavor <VM_TEMPLATE>` — the name or ID of the VM configuration template.
- `--confirm` — confirm the VM resize.
- `--revert` — restore the VM state before the resize.
- `--wait` — wait for the VM resize to complete.
- `<VM>` — the name or ID of the VM.

### {heading(Attaching a Disk to a VM)[id=cli_openstack_server_add_volume]}

```console
openstack server add volume
      <VM>
      <DISK>
```

Where:

- `<VM>` — the name or ID of the VM.
- `<DISK>` — the name or ID of the disk for which the operation is performed.

### {heading(Detaching a Disk from a VM)[id=cli_openstack_server_remove_volume]}

```console
openstack server remove volume
      <VM>
      <DISK>
```

Where:

- `<VM>` — the name or ID of the VM.
- `<DISK>` — the name or ID of the disk for which the operation is performed.

### {heading(Starting a VM)[id=cli_openstack_server_start]}

```console
openstack server start <VM> [ <VM_2> ...]
```

Where `<VM> [ <VM_2> …]` is the name or ID of the VM. Multiple VMs must be specified separated by spaces.

### {heading(Rebooting a VM)[id=cli_openstack_server_reboot]}

```console
openstack server reboot
    [--hard | --soft]
    [--wait]
    <VM>
```

Where:

- `--hard` — a “hard” (forced) reboot.
- `--soft` — a “soft” reboot.
- `--wait` — wait for the reboot to complete.
- `<VM>` — the name or ID of the VM.

### {heading(Stopping a VM)[id=cli_openstack_server_stop]}

```console
openstack server stop <VM> [<VM_2> ...]
```
Where `<VM> [<VM_2> ...]` is the name or ID of the VM. Multiple VMs must be specified separated by spaces.

### {heading(Associating a Floating IP Address with a VM)[id=cli_openstack_server_add_floating_ip]}

```console
openstack server add floating ip <VM> <IP_ADDRESS>
```

Where:

- `<VM>` — the name or ID of the instance to which the IP address is assigned.
- `<IP_ADDRESS>` — the Floating IP address or its ID to be assigned to the VM instance.

### {heading(Disassociating a Floating IP Address from a VM)[id=cli_vm_fip_remove]}

```console
openstack server remove floating ip
    <VM>
    <IP_ADDRESS>
```

Where:

- `<VM>` — the name or ID of the instance from which the IP address is disassociated.
- `<IP_ADDRESS>` — the Floating IP address or its ID to be disassociated from the instance.

### {heading(Migrating a VM)[id=cli_openstack_server_migrate]}

```console
openstack server migrate
    [--live <HOST>]
    [--shared-migration | --block-migration]
    [--disk-overcommit | --no-disk-overcommit]
    [--wait]
    <VM>
```

Where:

- `--live` — perform a live migration of the VM to the compute host `<HOST>`.
- `--shared-migration` — perform a shared live migration (default).
- `--block-migration` — perform a block live migration.
- `--disk-overcommit` — allow disk overcommitment on the target host.
- `--no-disk-overcommit` — do not perform disk overcommitment on the target host (default).
- `--wait` — wait for the migration to complete.
- `<VM>` — the name or ID of the VM being migrated.

### {heading(Deleting a VM)[id=cli_openstack_server_delete]}

```console
openstack server delete <VM> [<VM_2> ...]
```

Where `<VM> [<VM_2> …]` is the name or ID of the VM. Multiple VMs must be specified separated by spaces.

## {heading(Managing VM Security Groups)[id=cli_vm_sec_group]}

### {heading(Assigning a Security Group to a VM)[id=cli_openstack_server_add_security_group]}

```console
openstack server add security group <VM> <SECURITY_GROUP>
```

Where:

- `<VM>` — the name or ID of the VM.
- `<SECURITY_GROUP>` — the name or ID of the security group for which the operation is performed.

### {heading(Removing a Security Group from a VM)[id=cli_openstack_server_remove_security_group]}

```console
openstack server remove security group <VM> <SECURITY_GROUP>
```

Where:

- `<VM>` — the name or ID of the VM.
- `<SECURITY_GROUP>` — the name or ID of the security group for which the operation is performed.

## {heading(Managing VM Tags)[id=cli_tag]}

### {heading(Viewing the List of VM Tags)[id=cli_openstack_server_tag_list]}

```console
openstack server show -c tags <VM>
```

Where `<VM>` is the name or ID of the VM.

### {heading(Adding a Tag to a VM)[id=cli_openstack_server_tag_add]}

```console
openstack server set --tag <TAG> [--tag <TAG_2> …] <VM>
```

Where:

- `<TAG>` — the tag name in the format `<NAME>^<COLOR>`, for example `env:prod^positive`. To add multiple tags, use the parameter multiple times.
- `<VM>` — the name or ID of the VM.

### {heading(Deleting VM Tags)[id=cli_openstack_server_tag_delete]}

```console
openstack server unset --tag <TAG> [--tag <TAG_2> …] <VM>
```

Where:

- `<TAG>` — the name of the tag to be deleted, in the format `<NAME>^<COLOR>`, for example `env:prod^positive`. To delete multiple tags, use the parameter multiple times.
- `<VM>` — the name or ID of the VM.

### {heading(Deleting All VM Tags)[id=cli_openstack_server_tag_delete_all]}

```console
openstack server unset --all-tags <VM>
```

Where `<VM>` is the name or ID of the VM.

## {heading(Managing VM Key Pairs)[id=cli_keypair]}

### {heading(Viewing the List of VM Keys)[id=cli_keypair_list]}

```console
openstack keypair list
```

### {heading(Viewing Information About a VM Key Pair)[id=cli_openstack_keypair_show]}

```console
openstack keypair show
    [--public-key]
    <KEY>
```

Where:

- `--public-key` — show only the private key in the key pair.
- `<KEY>` — the name of the key pair.

### {heading(Adding a VM Key)[id=cli_openstack_keypair_create]}

```console
openstack keypair create
    [--public-key <PATH_TO_PUBLIC_KEY_FILE>]
    <KEY_NAME>
```

Where:

- `<PATH_TO_PUBLIC_KEY_FILE>` — the absolute path to the public key file.
- `<KEY_NAME>` — the key name.

### {heading(Deleting a VM Key)[id=cli_keypair_delete]}

```console
openstack keypair delete <KEY_NAME>
```

## {heading(Managing VM Images)[id=cli_openstack_image_manage]}

### {heading(Viewing the List of VM Images)[id=cli_openstack_image_list]}

```console
openstack image list
      [--public | --private | --shared]
      [--property <KEY=VALUE>]
      [--long]
```

Where:

- `--public` — show only public images.
- `--private` — show only private images.
- `--shared` — show only shared images.
- `--property <KEY=VALUE>` — filter by image parameters.
- `--long` — display additional fields.

### {heading(Viewing Information About a VM Image)[id=cli_image_info]}

```console
openstack image show <IMAGE>
```

Where `<IMAGE>` is the name or ID of the VM disk image.

### {heading(Adding a VM Image)[id=cli_openstack_image_create]}

```console
openstack image create
      [--disk-format <DISK_FORMAT>]
      [--container-format <CONTAINER_FORMAT>]
      [--file <FILE>]
      [--volume <DISK>]
      [--protected | --unprotected]
      [--public | --private]
      [--property <KEY=VALUE> [<KEY_2=VALUE_2> ...] ]
      [--project <PROJECT>]
      [--project-domain <PROJECT_DOMAIN>]
      <IMAGE>
```

Where:

- `--disk-format <DISK_FORMAT>` — the disk format of the image. Possible values: `ami`, `ari`, `aki`, `vhd`, `vmdk`, `raw`, `qcow2`, `vhdx`, `vdi`, `iso`, `ploop`. The default value is `raw`.
- `--container-format <CONTAINER_FORMAT>` — the container format of the image. Possible values: `ami`, `ari`, `aki`, `bare` (default), `docker`, `ova`, `ovf`.
- `--file <FILE>` — the path to the image file or its archive from which the image is to be created.
- `--volume <DISK>` — the name or ID of the disk from which to create the image.
- `--protected` — protect the image from deletion.
- `--unprotected` — protect the image from deletion.
- `--public` — make the image public.
- `--private` — make the image private (default).
- `--property <KEY=VALUE>` — additional image properties. Can be used multiple times to set multiple properties.
- `--project <PROJECT>` — the name or ID of the project to which to add the image.
- `--project-domain <PROJECT_DOMAIN>` — assign the image to a project domain by name or ID. The flag is used in case of conflicts between project names.
- `<IMAGE>` — the name of the disk image.

### {heading(Changing Image Parameters)[id=cli_image_edit]}

```console
openstack image set
    [--name <NAME>]
    [--property <KEY=VALUE> [<KEY_2=VALUE_2> ...]
    [--accept | --reject | --pending]
    <IMAGE>
```

Where:

- `--name <NAME>` — the new image name.
- `--property <KEY=VALUE>` — additional image properties. Can be used multiple times to set multiple properties.
- `--accept` — add the shared image to the project.
- `--reject` — do not add the shared image to the project.
- `--pending` — reset the status of the shared image to **Pending**.
- `<IMAGE>` — the name or ID of the image.

### {heading(Exporting a VM Image)[id=cli_openstack_image_save]}

```console
openstack image save
      --file <FILE_NAME>
      <IMAGE>
```

Where:

- `<FILE_NAME>` — the name of the exported image file with the extension specified.
- `<IMAGE>` — the name or ID of the VM disk image.

### {heading(Granting Access to an Image to Another Project)[id=cli_openstack_image_share]}

```console
openstack image add project <IMAGE> <PROJECT>
```
Where:

- `<IMAGE>` — the name or ID of the VM disk image.
- `<PROJECT>` — the project ID.

### {heading(Deleting a VM Image)[id=cli_openstack_image_delete]}

```console
openstack image delete <IMAGE>
```
Where `<IMAGE>` is the name or ID of the VM disk image.

## {heading(Managing Disks)[id=cli_openstack_volume_manage]}

### {heading(Viewing the List of Disks)[id=cli_volume_list]}

```console
openstack volume list
```

### {heading(Viewing the List of Disk Types)[id=cli_openstack_volume_type_list]}

```console
openstack volume type list
    [--long]
    [--default | --public | --private]
```

Where:

- `--long` — display additional properties.
- `--default` — filter by default disk types.
- `--public` — filter by public disks.
- `--private` — filter by private disks.

### {heading(Creating a disk)[id=cli_openstack_volume_create]}

```console
openstack volume create
      [--size <DISK_SIZE>]
      [--type <DISK_TYPE>]
      [--image <IMAGE> | --snapshot <SNAPSHOT> | --source <DISK> | --source-replicated <REPLICATED_DISK>]
      [--description <DESCRIPTION>]
      [--project <PROJECT>]
      [--availability-zone <AVAILABILITY_ZONE>]
      [--consistency-group <CONSISTENCY_GROUP>]
      [--property <KEY=VALUE>]
      [--hint <KEY=VALUE>]
      [--bootable | --non-bootable]
      [--read-only | --read-write]
      <NAME>
```

Here:

- `--size <DISK_SIZE>` — disk size in GB.
- `--type <DISK_TYPE>` — name or ID of the disk type.
- `--image <IMAGE>` — name or ID of the image to create the disk from.
- `--snapshot <SNAPSHOT>` — name or ID of the snapshot to create the disk from.
- `--source <DISK>` — disk to be used as a source (cloning).
- `--source-replicated <REPLICATED_DISK>` — name or ID of the replicated disk to clone.
- `--description <DESCRIPTION>` — disk description.
- `--project <PROJECT>` — name or ID of the project to attach the disk to.
- `--availability-zone <AVAILABILITY_ZONE>` — name or ID of the availability zone where the disk should be created.
- `--consistency-group <CONSISTENCY_GROUP>` — consistency group for the disk.
- `--property <KEY=VALUE>` — additional disk properties. Can be used multiple times to set multiple properties.
- `--hint <KEY=VALUE>` — additional parameters for the scheduler.
- `--bootable` — flag used to mark the disk as bootable. VMs can be created from bootable disks.
- `--non-bootable` — flag used to mark the disk as non-bootable (used by default).
- `--read-only` — flag used to set the «read-only» mode.
- `--read-write` — flag used to set the «read-write» mode (used by default).
- `<NAME>` — disk name.

### {heading(Changing disk parameters)[id=cli_openstack_volume_set]}

```console
openstack volume set
      [--name <NAME>]
      [--size <DISK_SIZE>]
      [--description <DESCRIPTION>]
      [--type <DISK_TYPE>]
      [--retype-policy <MIGRATION_POLICY>]
      [--bootable | --non-bootable]
      [--read-only | --read-write]
      <DISK>
```

<!--- // специально убран параметр --state, т.к. он доступен только админам -->

Here:

- `--name <NAME>` — new disk name.
- `--retype-policy <MIGRATION_POLICY>` — disk migration policy during its retype. Possible values: `never` or `on-demand`. Default value is `never`. Must be specified together with the `--type` flag.

For descriptions of the other parameters, see the section {linkto(#cli_openstack_volume_create)[text=%text]}.

### {heading(Deleting a disk)[id=cli_openstack_volume_delete]}

```console
openstack volume delete
      [--force | --purge]
      <DISK> [<DISK_2> ...]
```

Here:

- `--force` — flag for forced disk deletion, regardless of state. Default value is `false`.
- `--purge` — delete all snapshots associated with the disks. Default value is `false`.
- `<DISK> [<DISK_2> …]` — name or ID of the disk. Multiple disks must be specified separated by spaces.

### {heading(Managing disk snapshots)[id=cli_openstack_volume_snapshot_manage]}

#### {heading(Viewing the list of disk snapshots)[id=cli_snapshot_list]}

```console
openstack volume snapshot list
      [--all-projects]
      [--project <PROJECT>]
      [--project-domain <PROJECT_DOMAIN>]
      [--long]
      [--name <NAME>]
      [--status <STATUS>]
      [--volume <DISK>]
```

Here:

- `--all-projects` — display snapshots of all projects. Available only to the {var(cloud)} administrator.
- `--project <PROJECT>` — filter snapshots in the specified project (by name or ID). Available only to the {var(cloud)} administrator.
- `--project-domain <PROJECT_DOMAIN>` — filter snapshots by project domain by name or ID. This option is used in case of conflicts between project names.
- `--long` — display additional properties.
- `--name <NAME>` — filter snapshots by name.
- `--status <STATUS>` — filter snapshots by status. Possible values: `available`, `error`, `creating`, `deleting`, `error-deleting`.
- `--volume <DISK>` — display snapshots for the disk `<DISK>`.

#### {heading(Viewing disk snapshot information)[id=cli_snapshot_info]}

```console
openstack volume snapshot show <DISK_SNAPSHOT>
```

Here `<DISK_SNAPSHOT>` — name or ID of the disk snapshot.

#### {heading(Creating a disk snapshot)[id=cli_openstack_volume_snapshot_create]}

```console
openstack volume snapshot create
    [--volume <DISK>]
    [--description <DESCRIPTION>]
    [--force]
    <NAME>
```

Here:

- `--volume <DISK>` — name or ID of the disk for which the snapshot is created. The default value matches `<NAME>`.
- `--description <DESCRIPTION>` — snapshot description.
- `--force` — force the operation. Required flag for attached disks.
- `<NAME>` — name of the disk snapshot.

#### {heading(Changing disk snapshot parameters)[id=cli_snapshot_edit]}

```console
openstack volume snapshot set
       [--name <NAME>]
       [--description <DESCRIPTION>]
       <SNAPSHOT>
```

Here:

- `--name <NAME>` — new name of the disk snapshot.
- `--description <DESCRIPTION>` — new description of the disk snapshot.
- `<SNAPSHOT>` — name or ID of the disk snapshot.

#### {heading(Deleting a disk snapshot)[id=cli_snapshot_delete]}

```console
openstack volume snapshot delete <DISK_SNAPSHOT> [<DISK_SNAPSHOT_2> ...]
```

Here `<DISK_SNAPSHOT> [<DISK_SNAPSHOT_2> …]` — name or ID of the disk snapshot to delete. Multiple disks are listed separated by spaces.

### {heading(Managing disk backups)[id=cli_backup]}

#### {heading(Viewing the list of backups)[id=cli_openstack_volume_backup_list]}

```console
openstack volume backup list
      [--long]
      [--name <NAME>]
      [--status <STATUS>]
      [--volume <DISK>]
      [--marker <MARKER>]
      [--limit <LIMIT>]
```

Here:

- `--long` — display additional properties.
- `--name <NAME>` — filter by backup name.
- `--status <STATUS>` — filter by backup status. Possible values: `creating`, `available`, `deleting`, `error`, `restoring`, `error_restoring`.
- `--volume <DISK>` — filter by disk name or ID.
- `--marker <MARKER>` — the last backup of the previous page (name or ID).
- `--limit <LIMIT>` — maximum number of entries to display.

#### {heading(Viewing information about a single backup)[id=cli_openstack_volume_backup_show]}

```console
openstack volume backup show <BACKUP>
```

Here `<BACKUP>` — name or ID of the backup.

#### {heading(Creating a disk backup)[id=cli_openstack_volume_backup_create]}

```console
openstack volume backup create
      [--name <NAME>]
      [--description <DESCRIPTION>]
      [--container <CONTAINER>]
      [--snapshot <SNAPSHOT>]
      [--force]
      [--incremental]
      <DISK>
```

Here:

- `--name <NAME>` — name of the backup being created.
- `--description <DESCRIPTION>` — adding a description.
- `--container <CONTAINER>` — container for the backup.
- `--snapshot <SNAPSHOT>` — name or ID of the disk snapshot.
- `--force` — allow backing up an in-use disk (attached to a VM).
- `--incremental` — incremental backup.
- `<DISK>` — name or ID of the disk to create the backup from.

#### {heading(Changing backup parameters)[id=cli_openstack_volume_backup_set]}

```console
openstack volume backup set
      [--name <NAME>]
      [--description <DESCRIPTION>]
      <BACKUP>
```

Here:

- `--name <NAME>` — set the name for the backup.
- `--description <DESCRIPTION>` — change the backup description.
- `<BACKUP>` — name or ID of the backup.

<!--- //--state <СТАТУС> только для админов Платформы -->

#### {heading(Restoring from a backup)[id=cli_openstack_volume_backup_restore]}

```console
openstack volume backup restore <BACKUP> <DISK>
```

Here:

- `<BACKUP>` — name or ID of the backup.
- `<DISK>` — name or ID of the disk to restore.

#### {heading(Deleting a backup)[id=cli_openstack_volume_backup_delete]}

```console
openstack volume backup delete [--force] <BACKUP> [<BACKUP> ...]
```

Here:

- `--force` — allow deletion in statuses other than `error` or `available`.
- `<BACKUP>` — name or ID of the backup to delete.

## {heading(Managing the VNC console)[id=cli_vnc]}

### {heading(Generating a link to the VNC console)[id=openstack_console_url_show]}

```console
openstack console url show <VM>
```

Here `<VM>` — name or ID of the VM.

### {heading(Viewing the VNC console log)[id=cli_openstack_console_log_show]}

```console
openstack console log show
      [--lines <NUMBER_OF_LINES>]
      <VM>
```

Here:

- `--lines <NUMBER_OF_LINES>` — number of lines to display from the end of the log. Default value is `all`.
- `<VM>` — name or ID of the VM.

{ifndef(private-cert)}

## {heading(Managing file storage)[id=cli_storage]}

### {heading(Viewing the list of file storages)[id=cli_manila_list]}

<!--- // выдает ошибку ERROR: 'NoneType' object has no attribute '__getitem__' на некоторые команды manila, есть задача https://jira.vk.team/browse/MCSPC-5202 -->

```console
manila list
```

### {heading(Viewing the list of file storage networks)[id=cli_manila_share_network_list]}

```console
manila share-network-list
```

### {heading(Viewing file storage information)[id=cli_manila_show]}

```console
manila show <STORAGE>
```
Here `<STORAGE>` — name or ID of the file storage.

### {heading(Creating a file storage)[id=cli_manila_create]}

```console
manila create
     [--snapshot-id <SNAPSHOT>]
     [--name <NAME>]
     [--metadata [<KEY=VALUE> [<KEY=VALUE> ...]]]
     [--share-network <NETWORK>]
     [--description <DESCRIPTION>]
     [--share-type <STORAGE_TYPE>]
     [--public]
     [--availability-zone <AVAILABILITY_ZONE>]
     <PROTOCOL>
     <STORAGE_SIZE>
```

Here:

- `--snapshot-id <SNAPSHOT>` — name or ID of the snapshot from which to create the file storage.
- `--name <NAME>` — name of the file storage.
- `--metadata [<KEY=VALUE> [<KEY=VALUE> …]]` — metadata for the storage in the **key=value** format. Default value is `Default=None`.
- `--share-network <NETWORK>` — ID of the file storage network created by the Self-Service Portal.
- `--description <DESCRIPTION>` — description for the file storage.
- `--share-type <STORAGE_TYPE>` — storage type.
- `--public` — whether the storage is public.
- `--availability-zone <AVAILABILITY_ZONE>` — availability zone for the storage.
- `<PROTOCOL>` — file storage access protocol. Possible values: `NFS`, `CIFS`.
- `<STORAGE_SIZE>` — file storage size in GB.

### {heading(Increasing the file storage size)[id=cli_manila_extend]}

```console
manila extend <STORAGE> <SIZE>
```
Here:

- `<STORAGE>` — name or ID of the file storage.
- `<SIZE>` — new file storage size in GB.

### {heading(Decreasing the file storage size)[id=cli_manila_shrink]}

```console
manila shrink <STORAGE> <SIZE>
```
Here:

- `<STORAGE>` — name or ID of the file storage.
- `<SIZE>` — new file storage size in GB.

### {heading(Deleting a file storage)[id=cli_manila_delete]}

```console
manila delete <STORAGE> [ <STORAGE_2> ...]
```
Here `<STORAGE> [ <STORAGE_2> ...]` — name or ID of the file storages.

### {heading(Access rules for file storage)[id=cli_storage_access]}

#### {heading(Viewing the list of access rules)[id=cli_manila_access_list]}

```console
manila access-list <STORAGE>
```
Here `<STORAGE>` — name or ID of the file storage.

#### {heading(Adding an access rule)[id=cli_manila_access_allow]}

```console
manila access-allow <STORAGE> ip <ADDRESS>
```

Here:

- `<STORAGE>` — name or ID of the file storage.
- `<ADDRESS>` — IP address of the access rule in CIDR format.

#### {heading(Deleting an access rule)[id=cli_manila_access_deny]}

```console
manila access-deny <STORAGE> <ADDRESS>
```
Here:

- `<STORAGE>` — name or ID of the file storage.
- `<ADDRESS>` — ID of the IP address of the access rule in CIDR format.

### {heading(File storage snapshots)[id=cli_storage_snapshot]}

### {heading(Viewing the list of snapshots)[id=cli_manila_snapshot_list]}

```console
manila snapshot-list
      [--share-id <STORAGE>]
```
Here `<STORAGE>` — name or ID of the file storage.

### {heading(Creating a file storage snapshot)[id=cli_manila_snapshot_create]}

```console
manila snapshot-create
      [--force]
      [--name <SNAPSHOT_NAME>]
      [--description <DESCRIPTION>]
      <STORAGE>
```

Here:

- `--force` — force the operation. Required flag for attached disks. Possible values: `True`, `False`.
- `<SNAPSHOT_NAME>` — name of the snapshot being created.
- `--description <DESCRIPTION>` — description for the snapshot being created.
- `<STORAGE>` — name or ID of the file storage.

### {heading(Deleting a file storage snapshot)[id=cli_manila_snapshot_delete]}

```console
manila snapshot-delete <SNAPSHOT> [<SNAPSHOT_2> ...]
```
Here `<SNAPSHOT> [<SNAPSHOT_2> ...]` — names or IDs of the snapshots.
{/ifndef}

## {heading(Managing networks)[id=cli_network]}

### {heading(Viewing the list of networks)[id=cli_openstack_network_list]}

```console
openstack network list
      [--external | --internal]
      [--long]
      [--name <NAME>]
      [--enable | --disable]
      [--project <PROJECT>]
      [--project-domain <PROJECT_DOMAIN>]
      [--share | --no-share]
      [--status <STATUS>]
      [--provider-network-type <NETWORK_TYPE>]
      [--provider-physical-network <PHYSICAL_NETWORK>]
      [--provider-segment <NETWORK_SEGMENT>]
```

Here:

* `--external` — display only external networks.
* `--internal` — display only internal networks.
* `--long` — display additional properties.
* `--name <NAME>` — display the network with the name `<NAME>`.
* `--enable` — display only networks with the `enabled` status.
* `--disable` — display only networks with the `enabled` status.
* `--project <PROJECT>` — filter networks in the specified project (by name or ID).
* `--project-domain <PROJECT_DOMAIN>` — filter networks by project domain by name or ID. This option is used in case of conflicts between project names.
* `--share` — show networks shared across multiple projects.
* `--no-share` — show networks shared with only one project.
* `--status <STATUS>` — display networks in specific statuses. Possible values:

   * `ACTIVE` — active.
   * `BUILD` — being created.
   * `DOWN` — disabled.
   * `ERROR` — operating error.

* `--provider-network-type <NETWORK_TYPE>` — display networks of a specific type. Possible values: `flat`, `geneve`, `gre`, `local`, `vlan`, `vxlan`.
* `--provider-physical-network <PHYSICAL_NETWORK>` — display the network with the physical network name `<PHYSICAL_NETWORK>`.
* `--provider-segment <NETWORK_SEGMENT>` — display the list of networks according to the VLAN ID for VLAN networks or the Tunnel ID for GENEVE/GRE/VXLAN networks.

### {heading(Viewing network information)[id=cli_network_info]}

```console
openstack network show <NETWORK>
```
Here `<NETWORK>` — name or ID of the network.

### {heading(Creating a network)[id=cli_openstack_network_create]}

```console
openstack network create
      [--share | --no-share]
      [--enable | --disable]
      [--project <PROJECT>]
      [--project-domain <PROJECT_DOMAIN>]
      [--description <DESCRIPTION>]
      [--availability-zone-hint <AVAILABILITY_ZONE>]
      [--external | --internal]
      [--default | --no-default]
      [--qos-policy <QOS_RULE>]
      [--provider-network-type <NETWORK_TYPE>]
      [--provider-physical-network <PHYSICAL_NETWORK>]
      <NETWORK>
```

Here:

- `--share` — set the network as public (available in other projects).
- `--no-share` — set the network as private (default).
- `--enable` — network availability flag (default).
- `--disable` — network unavailability flag.
- `--project <PROJECT>` — name or ID of the project to add the network to.
- `--project-domain <PROJECT_DOMAIN>` — assign the network to a project domain by name or ID. This flag is used in case of conflicts between project names.
- `--description <DESCRIPTION>` — network description.
- `--availability-zone-hint <AVAILABILITY_ZONE>` — availability zone for the network (requires the `Network Availability Zone` extension).
- `--external` — set the network as external.
- `--internal` — set the network as internal (default).
- `--default` — use as the default external network.
- `--no-default` — do not use as the default external network (default).
- `--qos-policy <QOS_RULE>` — name or ID of the QoS rule for the network.
- `--provider-network-type <NETWORK_TYPE>` — physical mechanism used to implement the virtual network. Possible values: `flat`, `geneve`, `gre`, `local`, `vlan`, `vxlan`.
- `--provider-physical-network <PHYSICAL_NETWORK>` — name of the physical network (only for an external network).
- `<NETWORK>` — network name.

### {heading(Changing a network)[id=cli_openstack_network_set]}

```console
openstack network set
      [--name <NAME>]
      [--enable | --disable]
      [--share | --no-share]
      [--description <DESCRIPTION>]
      [--external | --internal]
      [--default | --no-default]
      [--provider-network-type <NETWORK_TYPE>]
      [--provider-physical-network <PHYSICAL_NETWORK>]
      <NETWORK>
```

For parameter descriptions, see the section {linkto(#cli_openstack_network_create)[text=%text]}.

### {heading(Deleting a network)[id=cli_openstack_network_delete]}

```console
openstack network delete <NETWORK> [<NETWORK_2> ...]
```
Here `<NETWORK> [<NETWORK_2> …]` — names or IDs of the networks. Multiple values are separated from each other by a space.

## {heading(Managing subnets)[id=cli_subnet]}

### {heading(Viewing the list of subnets)[id=cli_subnet_list]}

```console
openstack subnet list
      [--ip-version <IP_VERSION>]
      [--dhcp | --no-dhcp]
      [--project <PROJECT>]
      [--project-domain <PROJECT_DOMAIN>]
      [--network <NETWORK>]
      [--gateway <GATEWAY>]
      [--name <NAME>]
      [--subnet-range <SUBNET_RANGE>]
```

Where:

- `--ip-version <IP_VERSION>` — a network of a specific version. Possible values: `4`, `6`.
- `--dhcp` — networks with DHCP.
- `--no-dhcp` — networks without DHCP.
- `--project <PROJECT>` — name or ID of the project to which the subnets are assigned.
- `--project-domain <PROJECT_DOMAIN>` — filter the subnet by project domain by name or ID. This option is used in case of conflicts between project names.
- `--network <NETWORK>` — subnets for the `<NETWORK>` network.
- `--gateway <GATEWAY>` — subnets for the `<GATEWAY>` gateway.
- `--name <NAME>` — name of the subnet.
- `--subnet-range <SUBNET_RANGE>` — weight of the subnet.

### {heading(Viewing subnet information)[id=cli_subnet_info]}

```console
openstack subnet show <SUBNET>
```

Where `<SUBNET>` — name or ID of the subnet.

### {heading(Creating subnets)[id=cli_openstack_subnet_create]}

<!---

----
openstack subnet create
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
    [--subnet-pool <ADDRESS_POOL> | --use-default-subnet-pool]
    [--subnet-range <SUBNET_RANGE>]
    [--dhcp | --no-dhcp]
    [--gateway <GATEWAY>]
    [--ip-version {4,6}]
    [--ipv6-ra-mode {dhcpv6-stateful,dhcpv6-stateless,slaac}]
    [--network-segment <NETWORK_SEGMENT>]
    --network <NETWORK>
    [--description <DESCRIPTION>]
    [--allocation-pool start=<IP_ADDRESS>,end=<IP_ADDRESS>]
    [--dns-nameserver <DNS_SERVER>]
    [--host-route destination=<SUBNET>,gateway=<IP_ADDRESS>]
    [--service-type <SERVICE_TYPE>]
    <SUBNET>
----
-->

```console
openstack subnet create
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
    [--subnet-pool <ADDRESS_POOL> | --use-default-subnet-pool]
    [--subnet-range <SUBNET_RANGE>]
    [--dhcp | --no-dhcp]
    [--gateway <GATEWAY>]
    [--ip-version 4]
    [--network-segment <NETWORK_SEGMENT>]
    --network <NETWORK>
    [--description <DESCRIPTION>]
    [--allocation-pool start=<IP_ADDRESS>,end=<IP_ADDRESS>]
    [--dns-nameserver <DNS_SERVER>]
    [--host-route destination=<SUBNET>,gateway=<IP_ADDRESS>]
    [--service-type <SERVICE_TYPE>]
    <SUBNET>
```

Where:

- `--project <PROJECT>` — name or ID of the project to which the subnet will be assigned.
- `--project-domain <PROJECT_DOMAIN>` — assign the subnet to a project domain by name or ID. This flag is used in case of conflicts between project names.
- `--subnet-pool <ADDRESS_POOL>` — address pool from which the CIDR will be obtained. The `--use-default-subnet-pool` option sets the default pool.
- `--subnet-range <SUBNET_RANGE>` — range of subnet IP addresses `<SUBNET_RANGE>` in CIDR notation. Mandatory option if `--subnet-pool` is not specified.
- `--dhcp` — use DHCP (default).
- `--no-dhcp` — do not use DHCP.
- `--gateway <GATEWAY>` — IP address of the subnet gateway.
- `--ip-version` — subnet version, default is `4`.

   <!--- // * `--ipv6-ra-mode` — RA (Router Advertisement) mode for IPv6. Possible values: `dhcpv6-stateful`,`dhcpv6-stateless`,`slaac`. -->

- `--network-segment <NETWORK_SEGMENT>` — name or ID of the network segment to associate with the current subnet.
- `--network <NETWORK>` — name or ID of the network this subnet will be part of.
- `--description <DESCRIPTION>` — description of the subnet.
- `--allocation-pool start=<IP_ADDRESS>,end=<IP_ADDRESS>` — pool of IP addresses available for allocation via DHCP.
- `--dns-nameserver <DNS_SERVER>` — DNS server for the subnet.
- `--host-route destination=<SUBNET>,gateway=<IP_ADDRESS>` — additional route for the subnet in CIDR notation.
- `<SUBNET>` — name of the subnet.
- `--service-type <SERVICE_TYPE>` — service type for the subnet. Example: `network:floatingip_agent_gateway`.

### {heading(Modifying a subnet)[id=cli_openstack_subnet_set]}

```console
openstack subnet set
      [--name <NAME>]
      [--dhcp | --no-dhcp]
      [--gateway <GATEWAY>]
      [--description <DESCRIPTION>]
      [--allocation-pool start=<IP_ADDRESS>,end=<IP_ADDRESS>]
      [--no-allocation-pool]
      [--dns-nameserver <DNS_SERVER>]
      [--no-dns-nameservers]
      [--host-route destination=<SUBNET>,gateway=<IP_ADDRESS>]
      [--no-host-route]
      [--service-type <SERVICE_TYPE>]
      <SUBNET>
```

Where:

- `--name <NAME>` — new name of the subnet.
- `--no-allocation-pool` — do not use the pool of IP addresses available for allocation via DHCP.
- `--no-dns-nameservers` — do not use a DNS server for the subnet.
- `--no-host-route` — do not use an additional route for the subnet.

The description of the remaining parameters is provided in the section {linkto(#cli_openstack_subnet_create)[text=%text]}.

### {heading(Deleting a subnet)[id=cli_openstack_subnet_delete]}

```console
openstack subnet delete <SUBNET> [<SUBNET_2> ...]
```

## {heading(Managing ports)[id=cli_port]}

### {heading(Viewing the list of ports)[id=cli_port_list]}

```console
openstack port list
      [--device-owner <PORT_OWNER>]
      [--network <NETWORK>]
      [--router <ROUTER> | --server <VM>]
      [--mac-address <MAC_ADDRESS>]
      [--long]
      [--project <PROJECT>]
      [--project-domain <PROJECT_DOMAIN>]
```

Where:

- `--device-owner <PORT_OWNER>` — name of the port owner.
- `--network <NETWORK>` — filter ports by network name or ID.
- `--router <ROUTER>` — filter ports by router name or ID.
- `--server <VM>` — filter ports by instance name or ID.
- `--mac-address <MAC_ADDRESS>` — filter ports by MAC address.
- `--long` — display additional properties.
- `--project <PROJECT>` — project for which the ports will be displayed.
- `--project-domain <PROJECT_DOMAIN>` — filter ports by project domain by name or ID. This option is used in case of conflicts between project names.

### {heading(Viewing port information)[id=cli_port_info]}

```console
openstack port show <PORT>
```

Where `<PORT>` — name or ID of the port.

### {heading(Creating a port)[id=cli_openstack_port_create]}

```console
openstack port create
      --network <NETWORK>
      [--description <DESCRIPTION>]
      [--device <DEVICE_ID>]
      [--device-owner <PORT_OWNER>]
      [--vnic-type <VNIC_TYPE>]
      [--host <NODE_ID>]
      [--dns-name <DNS_NAME>]
      [--fixed-ip subnet=<SUBNET>,ip-address=<IP_ADDRESS>]
      [--enable | --disable]
      [--mac-address <MAC_ADDRESS>]
      [--project <PROJECT>]
      [--project-domain <PROJECT_DOMAIN>]
      [--security-group <SECURITY_GROUP> | --no-security-group]
      [--enable-port-security | --disable-port-security]
      [--allowed-address ip-address=<IP_ADDRESS>[,mac-address=<MAC_ADDRESS>]]
      <PORT>
```

Where:

- `--network <NETWORK>` — name or ID of the network for which the port is created.
- `--description <DESCRIPTION>` — description for the port.
- `--device <DEVICE_ID>` — device ID of the port.
- `--device-owner <PORT_OWNER>` — name of the port owner.
- `--vnic-type <VNIC_TYPE>` — VNIC type for the port. Possible values: `direct`, `direct-physical`, `macvtap`, `normal` (default), `baremetal`.
- `--host <NODE_ID>` — ID of the node to which the port will be bound.
- `--dns-name <DNS_NAME>` — assign a DNS name to the port.
- `--fixed-ip subnet=<SUBNET>,ip-address=<IP_ADDRESS>` — IP address in the specified subnet (name or ID) for the port.
- `--enable` — make the port active (default value).
- `--disable` — make the port inactive.
- `--mac-address <MAC_ADDRESS>` — MAC address of the port.
- `--project <PROJECT>` — assign the port to a project by name or ID.
- `--project-domain <PROJECT_DOMAIN>` — assign the port to a project domain by name or ID. This flag is used in case of conflicts between project names.
- `--security-group <SECURITY_GROUP>` — security group for the port. The `--no-security-group` option does not add security groups to the port (default).
- `--enable-port-security` — enable protection for the port (default).
- `--disable-port-security` — disable protection for the port.
- `--allowed-address ip-address=<IP_ADDRESS>[,mac-address=<MAC_ADDRESS>]` — a pair of allowed addresses associated with the port.
- `<PORT>` — name of the port.

### {heading(Modifying a port)[id=cli_openstack_port_set]}

```console
openstack port set
      [--description <DESCRIPTION>]
      [--device <DEVICE_ID>]
      [--device-owner <PORT_OWNER>]
      [--vnic-type <VNIC_TYPE>]
      [--host <NODE_ID>]
      [--dns-name <DNS_NAME>]
      [--enable | --disable]
      [--name <NAME>]
      [--fixed-ip subnet=<SUBNET>,ip-address=<IP_ADDRESS>]
      [--no-fixed-ip]
      [--security-group <SECURITY_GROUP>]
      [--no-security-group]
      [--enable-port-security]
      [--disable-port-security]
      [--allowed-address ip-address=<IP_ADDRESS>[,mac-address=<MAC_ADDRESS>]]
      [--no-allowed-address]
      <PORT>
```

Where:

- `--name <NAME>` — new name of the port.
- `--no-fixed-ip` — remove all IP addresses from the port.
- `--no-allowed-address` — remove all allowed addresses from the port.

The description of the remaining parameters is provided in the section {linkto(#cli_openstack_port_create)[text=%text]}.

### {heading(Deleting a port)[id=cli_openstack_port_delete]}

```console
openstack port delete <PORT> [<PORT_2> ...]
```
Where `<PORT> [<PORT_2> ...]` — name or ID of the port. Multiple ports must be specified separated by spaces.

## {heading(Managing security groups and security group rules)[id=cli_openstack_security_group_manage]}

### {heading(Security groups)[id=cli_sec_group]}

#### {heading(Viewing the list of security groups)[id=cli_sec_group_list]}

```console
openstack security group list
      [--project <PROJECT>]
```

Where `--project <PROJECT>` — name or ID of the project to which the security group is assigned.

#### {heading(Viewing security group information)[id=cli_sec_group_info]}

```console
openstack security group show <SECURITY_GROUP>
```

Where `<SECURITY_GROUP>` — name or ID of the security group.

#### {heading(Creating a security group)[id=cli_openstack_sg_create]}

```console
openstack security group create
      [--description <DESCRIPTION>]
      [--project <PROJECT> [--project-domain <PROJECT_DOMAIN>]]
      <SECURITY_GROUP>
```

Where:

- `--description <DESCRIPTION>` — description of the security group.
- `--project <PROJECT>` — name or ID of the project in which the security group is created.
- `--project-domain <PROJECT_DOMAIN>` — assign the security group to a project domain by name or ID. This flag is used in case of conflicts between project names.
- `<SECURITY_GROUP>` — name of the security group.

#### {heading(Modifying security groups)[id=cli_sec_group_edit]}

```console
openstack security group set
      [--name <NAME> ]
      [--description <DESCRIPTION>]
      <SECURITY_GROUP>
```

Where:

- `--name <NAME>` — new name of the existing security group.
- `--description <DESCRIPTION>` — description of the security group.
- `<SECURITY_GROUP>` — name of the security group.

The description of the remaining parameters is provided in the section {linkto(#cli_openstack_sg_create)[text=%text]}.

#### {heading(Deleting security groups)[id=cli_sec_group_delete]}

```console
openstack security group delete <SECURITY_GROUP>
```
Where `<SECURITY_GROUP>` — name or ID of the security group.

### {heading(Security group rules)[id=cli_sec_rule]}

#### {heading(Viewing the list of security group rules)[id=cli_sec_rule_list]}

```console
openstack security group rule list
      [--protocol <PROTOCOL>]
      [--ingress | --egress]
      [--long]
      [<SECURITY_GROUP>]
```

Where:

- `--protocol <PROTOCOL>` — filter rules by IP protocol. Possible values: `icmp`, `tcp`, `udp`.
- `--ingress` — filter by inbound traffic rules.
- `--egress` — filter by outbound traffic rules.
- `--long` — display additional properties.
- `<SECURITY_GROUP>` — filter rules by security group name or ID.

#### {heading(Viewing security group rule information)[id=cli_sec_rule_info]}

```console
openstack security group rule show <RULE>
```

Where `<RULE>` — ID of the security group rule.

#### {heading(Creating security group rules)[id=cli_sec_rule_create]}

```console
openstack security group rule create
      [--remote-ip <IP_ADDRESS> | --remote-group <SECURITY_GROUP>]
      [--description <DESCRIPTION>]
      [--dst-port <PORT>]
      [--icmp-type <ICMP_TYPE>]
      [--icmp-code <ICMP_CODE>]
      [--protocol <PROTOCOL>]
      [--ingress | --egress]
      [--ethertype <ETHERTYPE>]
      [--project <PROJECT>]
      [--project-domain <PROJECT_DOMAIN>]
      <RULE>
```

Where:

- `--remote-ip <IP_ADDRESS>` — connection address block in CIDR notation to which the filtering will be applied. The default value is `0.0.0.0/0`.
- `--remote-group <SECURITY_GROUP>` — name or ID of the remote security group.
- `--description <DESCRIPTION>` — description of the rule.
- `--dst-port <PORT>` — destination port. Can be a single port or a range of ports (`137:139`). Required for TCP and UDP protocols. Ignored for the ICMP protocol.
- `--icmp-type <ICMP_TYPE>` — ICMP type for the ICMP IP protocol.
- `--icmp-code <ICMP_CODE>` — ICMP code for the ICMP IP protocol.
- `--protocol <PROTOCOL>` — IP protocol. Possible values: `icmp`, `tcp`, `udp`. The default value is `tcp`.
- `--ingress` — apply the rule to inbound traffic (used by default).
- `--egress` — apply the rule to outbound traffic.
- `--ethertype <ETHERTYPE>` — Ethernet frame type (a two-byte hexadecimal number).
- `--project <PROJECT>` — name or ID of the project in which the rule is created.
- `--project-domain <PROJECT_DOMAIN>` — assign the rule to a project domain by name or ID. This flag is used in case of conflicts between project names.
- `<RULE>` — name of the security group rule.

#### {heading(Deleting security group rules)[id=cli_sec_rule_delete]}

```console
openstack security group rule delete <RULE>
```
Where `<RULE>` — ID of the security group rule.

## {heading(Managing load balancers)[id=cli_loadbalancer_listener_pool_manage]}

### {heading(Load balancer)[id=cli_loadbalancer]}

#### {heading(Viewing the list of load balancers)[id=cli_loadbalancer_list]}

```console
openstack loadbalancer list
      [--name <NAME>]
      [--enable | --disable]
      [--project <PROJECT>]
      [--vip-network-id <VIP_NETWORK>]
      [--vip-subnet-id <VIP_SUBNET>]
      [--vip-qos-policy-id <VIP_QOS_POLICY>]
      [--vip-port-id <VIP_PORT>]
      [--provisioning-status {ACTIVE,DELETED,ERROR,PENDING_CREATE,PENDING_UPDATE,PENDING_DELETE}]
      [--operating-status {ONLINE,DRAINING,OFFLINE,DEGRADED,ERROR,NO_MONITOR}]
      [--provider <PROVIDER>]
      [--availability-zone <AVAILABILITY_ZONE>]
```

Where:

- `--name <NAME>` — filter by load balancer name.
- `--enable` — show enabled load balancers.
- `--disable` — show disabled load balancers.
- `--project <PROJECT>` — project for which the load balancers will be displayed.
- `--vip-network-id <VIP_NETWORK>` — filter by VIP network name or ID.
- `--vip-subnet-id <VIP_SUBNET>` — filter by subnet name or ID.
- `--vip-qos-policy-id <VIP_QOS_POLICY>` — filter by VIP QoS name or ID.
- `--vip-port-id <VIP_PORT>` — filter by port name or ID.
- `--provisioning-status` — display load balancers in a specific provisioning status. Possible values: `ACTIVE`, `DELETED`, `ERROR`, `PENDING_CREATE`, `PENDING_UPDATE`, `PENDING_DELETE`.
- `--operating-status` — display load balancers in a specific operating status. Possible values: `ONLINE`, `DRAINING`, `OFFLINE`, `DEGRADED`, `ERROR`, `NO_MONITOR`.
- `--provider <PROVIDER>` — filter by provider.
- `--availability-zone <AVAILABILITY_ZONE>` — filter by availability zone.

#### {heading(Viewing load balancer information)[id=cli_loadbalancer_info]}

```console
openstack loadbalancer show <LOAD_BALANCER>
```

Where `<LOAD_BALANCER>` — name or ID of the load balancer.

#### {heading(Creating a load balancer)[id=cli_openstack_loadbalancer_create]}

```console
openstack loadbalancer create
      [--name <NAME>]
      [--description <DESCRIPTION>]
      [--vip-address <VIP_ADDRESS>]
      [--vip-port-id <VIP_PORT>]
      [--vip-subnet-id <VIP_SUBNET>]
      [--vip-network-id <VIP_NETWORK>]
      [--vip-qos-policy-id <VIP_QOS_POLICY>]
      [--project <PROJECT>]
      [--provider <PROVIDER>]
      [--availability-zone <AVAILABILITY_ZONE>]
      [--enable | --disable]
```

Where:

- `--name <NAME>` — name of the load balancer.
- `--description <DESCRIPTION>` — description of the load balancer.
- `--vip-address <VIP_ADDRESS>` — IP address or its ID for the load balancer.
- `--vip-port-id <VIP_PORT>` — name or ID of the port for the load balancer. Cannot be used together with the `--vip-network-id` flag.
- `--vip-subnet-id <VIP_SUBNET>` — name or ID of the subnet for the load balancer.
- `--vip-network-id <VIP_NETWORK>` — name or ID of the network for the load balancer.
- `--vip-qos-policy-id <VIP_QOS_POLICY>` — name or ID of the QoS rule for the load balancer.
- `--project <PROJECT>` — project to which the load balancer is assigned.
- `--provider <PROVIDER>` — provider of the load balancer.
- `--availability-zone <AVAILABILITY_ZONE>` — availability zone for the load balancer.
- `--enable` — enable the load balancer (default).
- `--disable` — disable the load balancer.

#### {heading(Deleting a load balancer)[id=cli_loadbalancer_delete]}

```console
openstack loadbalancer delete <LOAD_BALANCER>
```
Where `<LOAD_BALANCER>` — name or ID of the load balancer.

### {heading(Load balancer listener)[id=cli_openstack_listener]}

#### {heading(Viewing the list of listeners)[id=cli_loadbalancer_listener_list]}

```console
openstack loadbalancer listener list
      [--name <NAME>]
      [--loadbalancer <LOAD_BALANCER>]
      [--enable | --disable]
      [--project <PROJECT>]
```

Where:

- `--name <NAME>` — filter listeners by name.
- `--loadbalancer <LOAD_BALANCER>` — filter listeners by load balancer name or ID.
- `--enable` — display the list of active listeners.
- `--disable` — display the list of inactive listeners.
- `--project <PROJECT>` — filter listeners by project name or ID.

#### {heading(Viewing listener information)[id=cli_loadbalancer_listener_info]}

```console
openstack loadbalancer listener show <LISTENER>
```

Where `<LISTENER>` — name or ID of the load balancer listener.

#### {heading(Create a listener)[id=cli_openstack_loadbalancer_listener_create]}

```console
openstack loadbalancer listener create
      [--name <NAME>]
      [--description <DESCRIPTION>]
      --protocol <PROTOCOL>
      [--connection-limit <LIMIT>]
      [--insert-headers <HEADER=VALUE> [, <HEADER_2=VALUE_2>, ...]]
      --protocol-port <PORT>
      [--timeout-client-data <TIMEOUT>]
      [--timeout-member-connect <TIMEOUT>]
      [--timeout-member-data <TIMEOUT>]
      [--timeout-tcp-inspect <TIMEOUT>]
      [--enable | --disable]
      [--allowed-cidr <ALLOWED_CIDR>]
      <LOADBALANCER>
```

Here:

- `--name <NAME>` — name of the load balancing rule.
- `--description <DESCRIPTION>` — description of the load balancing rule.
- `--protocol <PROTOCOL>` — load balancing protocol. Possible values: `TCP`, `HTTP`, `HTTPS`.
- `--connection-limit <LIMIT>` — maximum number of connections allowed for the load balancing rule.
- `--insert-headers <HEADER=VALUE> [, <HEADER_2=VALUE_2>, …]` — headers to be included in the request to the server.
- `--protocol-port <PORT>` — load balancing protocol port.
- `--timeout-client-data <TIMEOUT>` — frontend idle timeout in milliseconds. Default value: `50000`.
- `--timeout-member-connect <TIMEOUT>` — connection timeout to the server in milliseconds. Default value: `5000`.
- `--timeout-member-data <TIMEOUT>` — server idle timeout in milliseconds. Default value: `50000`.
- `--timeout-tcp-inspect <TIMEOUT>` — waiting for extra TCP packets for content inspection in milliseconds. Default value: `0`.
- `--enable` — enable the load balancing rule (default).
- `--disable` — disable the load balancing rule.
- `--allowed-cidr <ALLOWED_CIDR>` — allowed IP address or network mask in CIDR notation. Multiple values must be specified with a separate `--allowed-cidr` option. Example: `--allowed-cidr <ALLOWED_CIDR_1> --allowed-cidr <ALLOWED_CIDR_2>`.
- `<LOADBALANCER>` — name or ID of the load balancer.

#### {heading(Deleting a listener)[id=cli_loadbalancer_listener_delete]}

```console
openstack loadbalancer listener delete <LISTENER>
```
Here `<LISTENER>` is the name or ID of the load balancer listener.

### {heading(Load balancer server pool)[id=cli_loadbalancer_pool]}

#### {heading(Viewing the list of server pools)[id=cli_loadbalancer_pool_list]}

```console
openstack loadbalancer pool list
      [--loadbalancer <LOADBALANCER>]
```

Here `--loadbalancer <LOADBALANCER>` is filtering of server pools by the name or ID of the load balancer.

#### {heading(Viewing pool information)[id=cli_loadbalancer_pool_info]}

```console
openstack loadbalancer pool show <SERVER_POOL>
```

Here `<SERVER_POOL>` is the name or ID of the load balancer server pool.

#### {heading(Creating a server pool)[id=cli_openstack_loadbalancer_pool_create]}

```console
openstack loadbalancer pool create
      [--name <NAME>]
      [--description <DESCRIPTION>]
      --protocol <PROTOCOL>
      (--listener <RULE> | --loadbalancer <LOADBALANCER>)
      [--session-persistence <PROPERTIES>]
      --lb-algorithm <BALANCING_METHOD>
      [--enable | --disable]
      [--tls-container-ref <CONTAINER_REF>]
      [--ca-tls-container-ref <CONTAINER_REF>]
      [--crl-container-ref <CONTAINER_REF>]
      [--enable-tls | --disable-tls]
```

Here:

- `--name <NAME>` — name of the server pool.
- `--description <DESCRIPTION>` — description of the server pool.
- `--protocol <PROTOCOL>` — destination protocol. Possible values: `TCP`, `HTTP`, `PROXY`.
- `--listener <RULE>` — name or ID of the load balancing rule to be bound to the server pool.
- `--loadbalancer <LOADBALANCER>` — name or ID of the load balancer to be bound to the server pool.
- `--session-persistence <PROPERTIES>` — network persistence properties for the listener (in the **key=value** format).
- `--lb-algorithm <BALANCING_METHOD>` — load balancing method. Possible values: `SOURCE_IP`, `ROUND_ROBIN`, `LEAST_CONNECTIONS`.
- `--enable` — enable the server pool (default).
- `--disable` — disable the server pool.
- `--tls-container-ref <CONTAINER_REF>` — reference to the TLS container.
- `--ca-tls-container-ref <CONTAINER_REF>` — reference to the TLS container with the CA certificate.
- `--crl-container-ref <CONTAINER_REF>` — reference to the container with the list of revoked CA certificates.
- `--enable-tls` — enable TLS encryption.
- `--disable-tls` — disable TLS encryption.

#### {heading(Viewing the list of monitors)[id=cli_loadbalancer_healthmonitor_list]}

```console
openstack loadbalancer healthmonitor list
```

#### {heading(Viewing monitor information)[id=cli_loadbalancer_healthmonitor_info]}

```console
openstack loadbalancer healthmonitor show <MONITOR>
```
Here `<MONITOR>` is the ID of the monitor.

#### {heading(Creating a monitor)[id=cli_openstack_loadbalancer_healthmonitor_create]}

```console
openstack loadbalancer healthmonitor create
      [--name <MONITOR>]
      --delay <DELAY>
      [--domain-name <DOMAIN>]
      [--expected-codes <STATUSES>]
      [--http-method {GET,POST,DELETE,PUT,HEAD,OPTIONS,PATCH,CONNECT,TRACE}]
      [--http-version <HTTP_VERSION>]
      --timeout <TIMEOUT>
      --max-retries <NUMBER_OF_ATTEMPTS>
      [--url-path <URL>]
      --type <TYPE>
      [--max-retries-down <NUMBER_OF_ATTEMPTS>]
      [--enable | --disable]
      <SERVER_POOL>
```

Here:

- `--name <MONITOR>` — name of the monitor.
- `--delay <DELAY>` — time in seconds between sending requests to members.
- `--domain-name <DOMAIN>` — domain name to be added to the HTTP header for HTTP health checks.
- `--expected-codes <STATUSES>` — list of HTTP statuses expected to be received when healthy.
- `--http-method` — HTTP methods that the monitor can use. Possible values: `GET`, `POST`, `DELETE`, `PUT`, `HEAD`, `OPTIONS`, `PATCH`, `CONNECT`, `TRACE`.
- `--http-version <HTTP_VERSION>` — HTTP version to be used.
- `--timeout <TIMEOUT>` — maximum timeout in seconds.
- `--max-retries <NUMBER_OF_ATTEMPTS>` — number of successful reconnection attempts before changing the member's operating status to `ONLINE`.
- `--url-path <URL>` — URL to which the monitor will send health check requests.
- `--type <TYPE>` — type of the monitor. Required parameter. Possible values: `PING`, `HTTP`, `HTTPS`, `TCP`.
- `--max-retries-down <NUMBER_OF_ATTEMPTS>` — maximum number of connection attempts after which the monitor transitions to the `ERROR` state.
- `--enable` — enable the monitor (default).
- `--disable` — disable the monitor.
- `<SERVER_POOL>` — name or ID of the server pool for the monitor.

#### {heading(Deleting a server pool)[id=cli_loadbalancer_pool_delete]}

```console
openstack loadbalancer pool delete <SERVER_POOL>
```
Here `<SERVER_POOL>` is the name or ID of the load balancer server pool.

### {heading(Server in a server pool)[id=cli_loadbalancer_server]}

#### {heading(Viewing the list of servers in a server pool)[id=cli_loadbalancer_server_list]}

```console
openstack loadbalancer member list <SERVER_POOL>
```

Here `<SERVER_POOL>` is the name or ID of the load balancer server pool.

#### {heading(Viewing information about a server in a server pool)[id=cli_loadbalancer_server_info]}

```console
openstack loadbalancer member show <SERVER_POOL>
```

Here `<SERVER_POOL>` is the name or ID of the load balancer server pool.

#### {heading(Creating a server in a server pool)[id=cli_openstack_loadbalancer_member_create]}

```console
openstack loadbalancer member create
      [--name <SERVER>]
      [--disable-backup | --enable-backup]
      [--weight <WEIGHT>]
      --address <IP_ADDRESS>
      [--subnet-id <SUBNET>]
      --protocol-port <PORT>
      [--monitor-port <PORT>]
      [--monitor-address <IP_ADDRESS>]
      [--enable | --disable]
      <SERVER_POOL>
```

Here:

- `--name <SERVER>` — name of the server.
- `--disable-backup` — disable backup for the server (default).
- `--enable-backup` — enable backup for the server.
- `--weight <WEIGHT>` — weight of the server (for more details, see the section {linkto(../../../networks/balancing/concepts/about#balancing-load-balancer-instance-weight)[text=%text]}).
- `--address <IP_ADDRESS>` — IP address of the server whose traffic will be handled by the load balancer.
- `--subnet-id <SUBNET>` — ID of the subnet from which the server is accessible.
- `--protocol-port <PORT>` — port number that the server will listen on.
- `--monitor-port <PORT>` — additional port number used for server health monitoring.
- `--monitor-address <IP_ADDRESS>` — additional IP address used for server health monitoring.
- `--enable` — enable the server (default).
- `--disable` — disable the server.
- `<SERVER_POOL>` — name or ID of the server pool in which to create the server.

#### {heading(Deleting a server from a server pool)[id=cli_loadbalancer_server_delete]}

```console
openstack loadbalancer member delete <SERVER_POOL> <SERVER>
```
Here:

- `<SERVER_POOL>` — name or ID of the server pool in which to create the server.
- `<SERVER>` — name or ID of the server.

## {heading(Managing routers)[id=cli_openstack_router_manage]}

### {heading(Viewing the list of routers)[id=cli_router_list]}

```console
openstack router list
      [--name <NAME>]
      [--enable | --disable]
      [--long]
      [--project <PROJECT>]
      [--project-domain <PROJECT_DOMAIN>]
```

Here:

- `--name <NAME>` — filtering routers by name.
- `--enable` — list active routers.
- `--disable` — list inactive routers.
- `--long` — output additional properties.
- `--project <PROJECT>` — filtering routers by project name or ID.
- `--project-domain <PROJECT_DOMAIN>` — filter routers by project domain by name or ID. This option is used in case of conflicts between project names.

### {heading(Viewing router information)[id=cli_router_info]}

```console
openstack router show <ROUTER>
```

Here `<ROUTER>` is the name or ID of the router.

### {heading(Creating a router)[id=cli_openstack_router_create]}

```console
openstack router create
    [--project <PROJECT> [--project-domain <PROJECT_DOMAIN>]]
    [--enable | --disable]
    [--distributed]
    [--ha]
    [--description <DESCRIPTION>]
    [--availability-zone-hint <AVAILABILITY_ZONE>]
    <ROUTER>
```

Here:

- `--project <PROJECT> [--project-domain <PROJECT_DOMAIN>]` — name of the project and, if necessary, the domain to which the router will belong.
- `--enable` — make the router active (default value).
- `--disable` — make the router inactive.
- `--distributed` — distribution flag. The router is created only on compute nodes.
- `--ha` — high availability flag. The router is created on all nodes.

  {note:warn}
  Using the `--distributed` and `--ha` options requires support from Neutron and the corresponding settings.
  {/note}
  
- `--description <DESCRIPTION>` — description for the router.
- `--availability-zone-hint <AVAILABILITY_ZONE>` — availability zone `<AVAILABILITY_ZONE>`.
- `<ROUTER>` — name of the router.

### {heading(Changing router parameters)[id=cli_openstack_router_set]}

```console
openstack router set
      [--name <NAME>]
      [--description <DESCRIPTION>]
      [--enable | --disable]
      [--route destination=<SUBNET>,gateway=<IP_ADDRESS>]
      [--no-route]
      [--ha | --no-ha]
      [--external-gateway <NETWORK>]
      <ROUTER>
```

Here:

- `--name <NAME>` — new name of the router.
- `--route destination=<SUBNET>,gateway=<IP_ADDRESS>` — specifying a static route. Here:

  - `<SUBNET>` — destination subnet in CIDR notation.
  - `<IP_ADDRESS>` — IP address of the VM.

- `--no-route` — clear the router's static routes. To overwrite existing static routes, use both flags: `--route` and `--no-route`.
- `--external-gateway <NETWORK>` — external network (with access to networks outside {var(cloud)}. Usually the `ext-net` network is used.

For a description of the remaining parameters, see the section {linkto(#cli_openstack_router_create)[text=%text]}.

### {heading(Resetting router parameters)[id=cli_router_reset]}

```console
openstack router unset
      [--route destination=<SUBNET>,gateway=<IP_ADDRESS>]
      [--external-gateway]
      [--tag <TAG> | --all-tag]
      <ROUTER>
```

Here:

- `--tag <TAG>` — name of the tag to be removed from the router.
- `--all-tag` — remove all tags from the router.

For a description of the remaining parameters, see the section {linkto(#cli_openstack_router_set)[text=%text]}.

### {heading(Attaching a subnet to a router)[id=cli_router_subnet_add]}

```console
openstack router add subnet <ROUTER> <SUBNET>
```

Here:

- `<ROUTER>` — name or ID of the router.
- `<SUBNET>` — name or ID of the subnet for which the operation is performed.

### {heading(Detaching a subnet from a router)[id=cli_router_subnet_remove]}

```console
openstack router remove subnet <ROUTER> <SUBNET>
```

Here:

- `<ROUTER>` — name or ID of the router.
- `<SUBNET>` — name or ID of the subnet for which the operation is performed.

### {heading(Deleting a router)[id=cli_router_delete]}

```console
openstack router delete <ROUTER> [<ROUTER_2> ...]
```

Here `<ROUTER>` is the name or ID of the router. Multiple values are separated from each other by a space.

## {heading(Managing Floating IP addresses)[id=cli_openstack_floating_ip_manage]}

### {heading(Viewing the list of IP addresses)[id=cli_fip_list]}

```console
openstack floating ip list
      [--network <NETWORK>]
      [--port <PORT>]
      [--long]
      [--status <STATUS>]
      [--project <PROJECT>]
      [--project-domain <PROJECT_DOMAIN>]
      [--router <ROUTER>]
```

Here:

- `--network <NETWORK>` — filtering Floating IP addresses by network name or ID.
- `--port <PORT>` — filtering Floating IP addresses by port name or ID.
- `--long` — output additional properties.
- `--status <STATUS>` — filter by IP address status. Possible values: `ACTIVE`, `DOWN`.
- `--project <PROJECT>` — project to which the IP address is assigned.
- `--project-domain <PROJECT_DOMAIN>` — filter addresses by project domain by name or ID. This option is used in case of conflicts between project names.
- `--router <ROUTER>` — filtering Floating IP addresses by router name or ID.

### {heading(Creating an IP address)[id=cli_fip_create]}

```console
openstack floating ip create
      [--subnet <SUBNET>]
      [--port <PORT>]
      [--fixed-ip-address <IP_ADDRESS>]
      [--description <DESCRIPTION>]
      [--project <PROJECT>]
      [--project-domain <PROJECT_DOMAIN>]
      <NETWORK>
```

Here:

- `--subnet <SUBNET>` — name or ID of the subnet in which the Floating IP address will be created.
- `--port <PORT>` — name or ID of the instance port to which the Floating IP address should be bound.
- `--fixed-ip-address <IP_ADDRESS>` — IP address of the port to be mapped to the Floating IP address.
- `--description <DESCRIPTION>` — description of the Floating IP address.
- `--project <PROJECT>` — name or ID of the project to which the IP address will be assigned.
- `--project-domain <PROJECT_DOMAIN>` — assign the IP address to a project domain by name or ID. This flag is used in case of conflicts between project names.
- `<NETWORK>` — external network (usually `ext-net` is used).

### {heading(Deleting an IP address from a project)[id=cli_fip_delete]}

```console
openstack floating ip delete <IP_ADDRESS> [<IP_ADDRESS_2> ...]
```

Here `<IP_ADDRESS> [<IP_ADDRESS_2> …]` is the name or ID of the IP address. Multiple values are separated from each other by a space.

### {heading(Binding an IP address to an instance)[id=cli_fip_set]}

```console
openstack floating ip set
      [--port <PORT>]
      [--description <DESCRIPTION>]
      <FLOATING_IP>
```

Here:

- `--port <PORT>` — name or ID of the instance port to which the Floating IP address should be bound.
- `--description <DESCRIPTION>` — new description of the Floating IP address.
- `<FLOATING_IP>` — Floating IP address or its ID to be bound to the instance.