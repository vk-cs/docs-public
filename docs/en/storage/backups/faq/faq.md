<details>

<summary>How do I make a VM backup?</summary>

You can create a VM backup [manually](/en/storage/backups/service-management/create-backup-copy) or [using a backup plan](/en/storage/backups/service-management/create-backup-plan).

</details>

<details>

<summary>How many backups can be stored?</summary>

The maximum number of stored automatic backups is 200. When the storage limit is reached, old backups will be automatically deleted.

</details>

<details>

<summary>Can the backups be lost?</summary>

Backups are stored in secure object storage, which is automatically replicated to preserve data integrity.

Backups are not deleted in case of hardware or service failures.

</details>

<details>

<summary>How long does it take to create a backup?</summary>

The time to create a backup depends on the amount of data on the disk of the VM that is being backed up.

</details>

<details>

<summary>How do I delete a backup?</summary>

You can delete a backup in the **Cloud Backup → Backup** section, see more in [Managing backups](/en/storage/backups/service-management/manage-backup-copy#delete_backup_copy).

</details>

<details>

<summary>What happens if the backup plan limit of copies is exceeded?</summary>

To create new copies, VK Cloud deletes old ones according to the backup plan [policy](../concepts/retention-policy).

</details>

<details>

<summary>Unable to perform backup of a VM</summary>

For example, the corresponding menu item is missing or the VM is not in the list. The problem may occur if there is no QEMU guest agent in the VM operating system (`qemu guest-agent`). If this is the case, [install it](https://pve.proxmox.com/wiki/Qemu-guest-agent).

After installation, you will need to register additional metadata on the VM. For this, [contact the technical support](mailto:support@mcs.mail.ru). In some cases, you may also need to restart the VM.

</details>

<details>

<summary>How to view the list of VMs that do not have a backup plan?</summary>

[Use](/en/computing/iaas/service-management/vm/vm-filter) the **Backup** filter to find such VMs.

</details>
