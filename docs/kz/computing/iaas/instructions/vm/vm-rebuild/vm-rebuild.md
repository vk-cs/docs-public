# {heading(ВМ-ді қалпына келтіру)[id=iaas-vm-rebuild]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Виртуалды машинаға резервтік көшірмеден қалпына келтіру кезінде жаңа IP-мекенжайы бар жаңа виртуалды машина жасалады. Мұндай нұсқа ыңғайлы болмаса, ВМ-нің root-дискісінің бұрын {linkto(../../../instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-create)[text=жасалған]} суретін (снапшотын) пайдалануға болады. Бұл ВМ-нің IP-мекенжайын өзгертпей-ақ оның алдыңғы күйін қалпына келтіруге мүмкіндік береді.

## {heading(ВМ-ді резервтік көшірмеден қалпына келтіру)[id=iaas-vm-rebuild-from-backup]}

{include(../../../../../_includes/_restore-from-backup.md)[tags=restore-from-backup-iaas,restore-from-backup-vm-iaas,restore-from-backup-vm]}

## {heading(ВМ-ді оның root-дискісінің суретінен қалпына келтіру)[id=iaas-vm-rebuild-from-snapshot]}

1. Суреттен дискіні {linkto(../../volumes/volumes-snapshots#iaas-volumes-snapshots-disk-create)[text=жасаңыз]}.

1. Виртуалды машинаны {linkto(../vm-manage#iaas-vm-manage-start-stop-restart)[text=тоқтатыңыз]}.

1. Виртуалды машинаның root-дискісін бұрын суреттен жасалған дискімен {linkto(../vm-root-replace#iaas-vm-root-replace)[text=ауыстырыңыз]}.

1. Виртуалды машинаны {linkto(../vm-manage#iaas-vm-manage-start-stop-restart)[text=іске қосыңыз]}.