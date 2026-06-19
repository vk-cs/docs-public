# {heading(Восстановление из резервной копии)[id=backup-restore]}

## {heading(Восстановление ВМ)[id=backup-restore-vm]}

{include(../../../../_includes/_restore-from-backup.md)[tags=restore-from-backup-backups,restore-from-backup-vm-backups,restore-from-backup-vm]}

## {heading(Восстановление диска ВМ)[id=backup-restore-volume]}

{include(../../../../_includes/_restore-from-backup-volume.md)[tags=restore-from-backup-volume-backups]}

{ifndef(private-cert)}
## {heading(Восстановление инстанса БД)[id=backup-restore-db]}

{include(../../../../_includes/_restore-from-backup.md)[tags=restore-from-backup-backups,restore-from-backup-db]}
{/ifndef}

{ifndef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
## {heading(Восстановление инстанса аналитической БД)[id=backup-restore-adb]}

{include(../../../../_includes/_restore-from-backup.md)[tags=restore-from-backup-backups,restore-from-backup-adb]}
{/ifndef}