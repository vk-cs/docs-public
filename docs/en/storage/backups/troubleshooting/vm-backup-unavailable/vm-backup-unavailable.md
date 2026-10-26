# {heading(VM backup does not work)[id=backup-vm-backup-unavailable]}

{include(/en/_includes/_translated_by_ai_en.md)}

A VM backup cannot be created:

* The VM context menu has no **Create backup** option.
* When creating a backup or backup plan, the VM is missing from the list or its name is shown in gray.

The issue may occur if:

- The VM lacks the metadata required for backup. Example: the VM was created from an uploaded image or migrated using Hystax.
- The disk subsystem is under high load at the moment the backup is taken.

### {heading(Solution)[id=backup-vm-backup-unavailable-solution]}

{tabs}

{tab(The VM is not under load and can be recreated)}

1. Add metadata to the VM image:

   ```console
   openstack image set --property hw_qemu_guest_agent="yes" --property os_require_quiesce="yes" <IMAGE_ID>
   ```

1. Recreate the VM from the image.
1. Install the QEMU guest agent on the VM (the `qemu-guest-agent` package):

   {tabs}
   
   {tab(Ubuntu, Debian)}
         
   ```console
   apt-get install qemu-guest-agent
   ```
   
   {/tab}
   
   {tab(CentOS)}
      
   ```console
   yum install qemu-guest-agent
   ```
   
   {/tab}
   
   {/tabs}

1. Verify that VM backup works. If the issue persists, contact [technical support](/en/contacts).

{/tab}

{tab(The VM is under load and cannot be recreated)}

1. Add metadata to the VM disk:

   ```console
   openstack volume set --image-property hw_qemu_guest_agent="yes" --image-property os_require_quiesce="yes" <DISK_ID>
   ```

1. Contact [technical support](/en/contacts) so that specialists can add metadata to the VM itself. Wait for the request to complete.
1. Perform a hard reboot of the VM:

   1. Stop the VM:

      ```console
      openstack server stop <VM_ID>
      ```

   1. Wait for the VM to stop and reboot it:

      ```console
      openstack server reboot --hard <VM_ID>
      ```

1. Install the QEMU guest agent on the VM (the `qemu-guest-agent` package):

   {tabs}
   
   {tab(Ubuntu, Debian)}
         
   ```console
   apt-get install qemu-guest-agent
   ```
   {/tab}
   
   {tab(CentOS)}
      
   ```console
   yum install qemu-guest-agent
   ```
   {/tab}
   
   {/tabs}

1. Verify that VM backup works. If the issue persists, contact [technical support](/en/contacts).

{/tab}

{/tabs}