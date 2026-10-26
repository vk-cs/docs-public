# {heading(Moving a disk between projects)[id=iaas-volumes-transfer]}

{include(/en/_includes/_translated_by_ai_en.md)}

{tabs}

{tab(OpenStack CLI)}

1. Make sure that the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]}, and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Log in to the project from which you need to move the disk.
1. {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=Detach]} the disk you want to move from the VM.
1. View the list of disks:

   ```console
   openstack volume list --long
   ```

1. Make sure the disk is detached from the VM (`Status`: `available`).
1. Copy the disk ID.
1. Create a disk transfer request:

   ```console
   openstack volume transfer request create <DISK_ID>
   ```

1. Copy the authorization key `auth_key` and the request ID `id`.
1. View the list of disks and make sure the status of the disk being transferred has changed to `awaiting-transfer`:

   ```console
   openstack volume list
   ```

1. Log in to the project to which you need to move the disk.
1. Accept the disk transfer request by specifying the authorization key `auth_key` and the ID `id`:

   ```console
   openstack volume transfer request accept --auth-key <AUTH_KEY> <REQUEST_ID>
   ```

1. Make sure the disk has appeared in the project:

   ```console
   openstack volume show <DISK_ID>
   ```

**Additional commands for working with disk transfer requests**

- View the list of transfer requests:

  ```console
  openstack volume transfer request list
  ```

- Delete a transfer request:

  ```console
  openstack volume transfer request delete <REQUEST_ID>
  ```

{/tab}

{/tabs}