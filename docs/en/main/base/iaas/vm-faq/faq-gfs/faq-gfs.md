### When does the "deletion" happen?

After the first successful backup.

### Can there be one backup at the same time Monthly and Weekly (or Annual and Monthly)?

No. In the current implementation of GFS, backups have unique tags "weekly", "monthly" or "annual".

### If it's 2022 now, how to save the annual backup for 2021, how much is it per annum?

Two. The current year also counts.

### Why is Weekly Backup a mandatory field?

Architectural requirement. This is necessary for the correct labeling of backups when applying the retention policy.
