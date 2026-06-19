# {heading(Ошибка при интеграции с {var(s3)})[id=s3-error-tier-is-alredy-in-use]}

При интеграции с хранилищем {var(s3)} в MinIO появляется сообщение `Tier is already in use`.

Это означает, что конфигурация для удаленного хранилища S3 (remote tier) уже существует.

### {heading(Решение)[id=s3-error-tier-is-alredy-in-use-resolve]}

Удалите существующую конфигурацию в MinIO перед созданием новой.