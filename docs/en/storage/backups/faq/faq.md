{cut(How do I make a VM backup?)}

You can create a VM backup [manually](/en/storage/backups/instructions/create-backup-copy) or [using a backup plan](/en/storage/backups/instructions/create-backup-plan).

{/cut}

{cut(How many backups can be stored?)}

The maximum number of stored automatic backups is 200. When the storage limit is reached, old backups will be automatically deleted.

{/cut}

{cut(Can the backups be lost?)}

Backups are stored in secure object storage, which is automatically replicated to preserve data integrity.

Backups are not deleted in case of hardware or service failures.

{/cut}

{cut(How long does it take to create a backup?)}

The time to create a backup depends on the amount of data on the disk of the VM that is being backed up.

{/cut}

{cut(How do I delete a backup?)}

You can delete a backup in the **Cloud Backup → Backup** section, see more in [Managing backups](/en/storage/backups/instructions/manage-backup-copy#delete_backup_copy).

{/cut}

{cut(What happens if the backup plan limit of copies is exceeded?)}

To create new copies, VK Cloud deletes old ones according to the backup plan [policy](../concepts/retention-policy).

{/cut}

{cut(Unable to perform backup of a VM)}

For example, the corresponding menu item is missing or the VM is not in the list. The problem may occur if there is no QEMU guest agent in the VM operating system (`qemu guest-agent`). If this is the case, [install it](https://pve.proxmox.com/wiki/Qemu-guest-agent).

After installation, you will need to register additional metadata on the VM. For this, [contact the technical support](mailto:support@mcs.mail.ru). In some cases, you may also need to restart the VM.

{/cut}

{cut(How to view the list of VMs that do not have a backup plan?)}

[Use](/en/computing/iaas/instructions/vm/vm-filter) the **Backup** filter to find such VMs.

{/cut}
