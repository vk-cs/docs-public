Не получается удалить бакет в личном кабинете или с помощью AWS CLI.

Проблема может возникать, если бакет содержит объекты.

{note:warn}
Бакет с классом хранения `Backup` удалить нельзя, но через сервис Cloud Backup можно [удалить содержащиеся в бакете объекты](/ru/storage/backups/instructions/manage-backup-copy#delete_backup_copy).
{/note}

### Решение

1. [Убедитесь](/ru/storage/s3/instructions/objects/manage-object#lock_object), что отключена блокировка удаления объектов.
1. [Удалите все объекты](/ru/storage/s3/instructions/objects/manage-object#udalenie_obektov) из бакета.
1. [Удалите незавершенные составные загрузки](/ru/storage/s3/instructions/objects/manage-object#udalenie_chastey_zagruzhennogo_obekta) из бакета, если они есть.
1. [Удалите](/ru/storage/s3/instructions/buckets/manage-bucket#bucket_delete) бакет.