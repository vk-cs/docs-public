# {heading(Восстановление ВМ)[id=iaas-vm-rebuild]}

При восстановлении виртуальной машины из резервной копии создается новая виртуальная машина с новым IP-адресом. Если такой вариант не удобен, можно использовать {linkto(../../../instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-create)[text=созданный]} ранее снимок root-диска ВМ. Это позволит восстановить предыдущее состояние ВМ без смены ее IP-адреса.

## {heading(Восстановление ВМ из резервной копии)[id=iaas-vm-rebuild-from-backup]}

{include(../../../../../_includes/_restore-from-backup.md)[tags=restore-from-backup-iaas,restore-from-backup-vm-iaas,restore-from-backup-vm]}

## {heading(Восстановление ВМ из снимка ее root-диска)[id=iaas-vm-rebuild-from-snapshot]}

1. {linkto(../../volumes/volumes-snapshots#iaas-volumes-snapshots-disk-create)[text=Создайте]} диск из снимка.

1. {linkto(../vm-manage#iaas-vm-manage-start-stop-restart)[text=Остановите]} виртуальную машину.

1. {linkto(../vm-root-replace#iaas-vm-root-replace)[text=Замените]} root-диск виртуальной машины на диск, созданный ранее из снимка.

1. {linkto(../vm-manage#iaas-vm-manage-start-stop-restart)[text=Запустите]} виртуальную машину.