# {heading(Disk goes into read-only state)[id=iaas-disk-read-only]}

{include(/en/_includes/_translated_by_ai_en.md)}

The VM disk goes into the `read-only` state.

This is an OS protection mechanism against data loss or corruption. The problem can be caused by various reasons.

### {heading(Solution)[id=iaas-disk-read-only-decision]}

1. Check the system logs for I/O errors (I/O error). Use the `dmesg` or `journalctl` commands to search for errors.
1. Check the file system integrity by running the `fsck` utility check on reboot.
1. Contact {ifdef(public)}the [technical support](/en/contacts){/ifdef}{ifdef(private,private-pg)}the {var(cloud)} administrator{/ifdef} and attach the logs with errors to the request.

If the problem is caused by a hardware failure, changing the availability zone may help.