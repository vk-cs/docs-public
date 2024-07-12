Cloud Backup — сервис, в котором можно централизованно управлять созданием резервных копий и восстанавливать из них различные облачные объекты:

- виртуальные машины;
- инстансы баз данных;
- инстансы аналитических баз данных.

Cloud Backup позволяет:

- [запускать резервное копирование вручную](/ru/storage/backups/united-service-management/create-backup-copy), например, перед операциями, связанными с риском утраты данных;
- [создавать резервные копии автоматически](/ru/storage/backups/united-service-management/create-backup-plan) по заранее настроенному расписанию.

Для копирования по расписанию Cloud Backup предлагает выбор между двумя стратегиями создания и хранения резервных копий:

- стратегия [с ограничением по максимальному числу](/ru/storage/backups/concepts/retention-policy/forward-incremental) хранимых полных копий;
- [GFS-стратегия](/ru/storage/backups/concepts/retention-policy/gfs-backup).

Для СУБД PostgreSQL также поддерживается механизм непрерывного архивирования и восстановления на момент времени ([Point-in-Time Recovery, PITR](/ru/storage/backups/united-service-management/point-in-time-recovery-pitr)).

Резервные копии хранятся в объектном хранилище Cloud Storage с классом хранения Backup.
