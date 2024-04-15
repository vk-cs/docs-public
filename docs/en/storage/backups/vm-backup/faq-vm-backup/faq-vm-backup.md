## How do I make a VM backup?

You can create a VM backup manually or using a backup plan, for more information, see [Managing backups](../vm-backup-manage/).

## How many backups can be stored?

The maximum number of stored automatic backups is 200. When the storage limit is reached, old backups will be automatically deleted.

## Will the backups be lost?

Backups are stored in secure object storage, which is automatically replicated to preserve data integrity.

Backups are not deleted in case of hardware or service failures.

## How long does it take to create a backup?

The time to create a backup depends on the amount of data on the disk of the VM that is being backed up.

## How do I delete a backup?

You can delete a backup in the section **Cloud Computing → Backup**, for more information in the article [Managing backups](../vm-backup-manage#deleting_backups).

## Where is the next backup copy recorded when the limit on their number is exceeded?

If the specified number of backups is exceeded, a new one will be written to the place of the oldest copy.

## Unable to perform backup

For example, the menu item is missing or the VM is not in the list. The problem may occur if there is no QEMU guest agent in the system (`qemu guest-agent`) — [install it](https://pve.proxmox.com/wiki/Qemu-guest-agent).

After installation, you need to register additional metadata on the VM – for this [contact technical support](/en/contacts). In some cases, you may need to restart the VM.
