Не получается удалить бакет в личном кабинете или с помощью AWS CLI.

Проблема может возникать, если бакет содержит объекты.

{note:warn}
Бакет с классом хранения `Backup` удалить нельзя, но через сервис Cloud Backup можно [удалить содержащиеся в бакете объекты](/ru/storage/backups/instructions/manage-backup-copy#delete_backup_copy).
{/note}

### Решение

1. [Очистите](/ru/storage/s3/instructions/buckets//manage-bucket#bucket_cleaning) бакет.

1. [Удалите](/ru/storage/s3/instructions/buckets/manage-bucket#bucket_delete) бакет.