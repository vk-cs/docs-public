# {heading(Резервтік көшірмеден қалпына келтіру)[id=backup-restore]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(ВМ қалпына келтіру)[id=backup-restore-vm]}

{include(../../../../_includes/_restore-from-backup.md)[tags=restore-from-backup-backups,restore-from-backup-vm-backups,restore-from-backup-vm]}

## {heading(ВМ дискин қалпына келтіру)[id=backup-restore-volume]}

{include(../../../../_includes/_restore-from-backup-volume.md)[tags=restore-from-backup-volume-backups]}

{ifndef(private-cert)}

## {heading(ДБ инстансын қалпына келтіру)[id=backup-restore-db]}

{include(../../../../_includes/_restore-from-backup.md)[tags=restore-from-backup-backups,restore-from-backup-db]}
{/ifndef}

{ifndef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}

## {heading(Аналитикалық ДБ инстансын қалпына келтіру)[id=backup-restore-adb]}

{include(../../../../_includes/_restore-from-backup.md)[tags=restore-from-backup-backups,restore-from-backup-adb]}
{/ifndef}