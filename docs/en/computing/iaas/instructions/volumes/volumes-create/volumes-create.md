# {heading(Creating a disk)[id=iaas-volumes-create]}

{include(/en/_includes/_translated_by_ai_en.md)}

{ifndef(private-cert)}
To create a Low Latency NVMe disk, {ifdef(public)}contact [technical support](/en/contacts) and request access to {linkto(../../../../../computing/iaas/concepts/vm/cpu-generation#iaas-cpu-generation)[text=high-performance configurations]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}contact the administrator of {var(cloud)} and request access to high-performance configurations{/ifdef} and disks. Creating other {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=disk types]} is available by default in all configurations.
{/ifndef}

{note:info}
Creating a disk for a specific VM is described in the section {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-mount-disk)[text=Managing VMs]}.
{/note}

{tabs}

{tab(Management console)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Go to the **Cloud Computing** → **Disks** section.
1. Above the list of disks, click the **Create disk** button.

{include(../../../../../_includes/_disk_params.md)[tags=disk]}

1. Click the **Create disk** button.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=Select]} a disk type, determine its API name, and the availability zone suitable for placement.
1. View the available disk types and copy the identifier of the type corresponding to the API name.

   ```console
   openstack volume type list
   ```

1. View the availability zones and copy the name of the selected zone:

   ```console
   openstack availability zone list --volume
   ```

1. Create a disk of a specific type and size in the selected availability zone:

   ```console
   openstack volume create --type <DISK_TYPE_ID> --size <SIZE> --availability-zone <AVAILABILITY_ZONE> <NAME>
   ```

   {ifdef(public)}
   The maximum size is limited. For more information, see the section {linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-images-volumes-no-quotas-limits)[text=Quotas and limits]}.
   {/ifdef}

   Additional command parameters:

   - `--image <IMAGE_ID>` — the identifier of the image from which the disk will be created;
   - `--snapshot <SNAPSHOT_ID>` — the identifier of the snapshot from which the disk will be created;
   - `--description <DESCRIPTION>` — an arbitrary description of the disk;
   - `--property <KEY>=<VALUE>` — custom properties of the disk;
   - `--bootable` — create a bootable disk.

{/tab}

{/tabs}