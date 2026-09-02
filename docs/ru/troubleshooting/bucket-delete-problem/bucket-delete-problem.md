# {heading(Не получается удалить бакет)[id=s3-bucket-delete-problem]}

Не получается удалить бакет в личном кабинете или с помощью AWS CLI.

Проблема может возникать, если бакет содержит объекты.

{ifdef(public)}

{note:warn}
Бакет с классом хранения `Backup` удалить нельзя, но через сервис Cloud Backup можно {linkto(../../../backups/instructions/manage-backup-copy#backup-copy-delete)[text=удалить содержащиеся в бакете объекты]}.
{/note}

{/ifdef}

### {heading(Решение)[id=s3-bucket-delete-problem-resolve]}

1. {linkto(../../instructions/objects/object-lock#s3-instructions-object-lock)[text=Убедитесь]}, что отключена блокировка удаления объектов.
1. {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Удалите все объекты]} из бакета.
1. {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-parts-delete)[text=Удалите незавершенные составные загрузки]} из бакета, если они есть.
1. {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Удалите]} бакет.