# {heading(A VM backup is not created when security tools are used)[id=storage-backups-unavailable-with-security-tools]}

{include(/en/_includes/_translated_by_ai_en.md)}

Security tools (antiviruses, DLP) installed inside a VM can affect backup creation if they block the file system or create a high disk load at the moment the snapshot is taken.

### {heading(Solution)[id=storage-backups-unavailable-with-security-tools-decision]}

1. [Check](/en/computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-view-logs) the VM event log to see whether security tools are blocking access to files and disks.
2. Configure exclusions for backup processes.