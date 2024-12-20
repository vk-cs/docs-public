- Поиск сообщений, содержащих `internal error`:

  ```sql
  "internal error"
  ```

- Поиск сообщений, содержащих `error: "service unavailable"`:

  ```sql
  "error: \"service unavailable\""
  ```

- Использование времени, уровня логирования и `payload`:

  ```sql
  level >= debug AND (timestamp <= "2023-04-10T10:20:00Z" OR payload.code = 200)
  ```

- Использование `NOT`, `EXISTS`:

  ```sql
  service_id <> databases AND NOT message: hello AND payload.status EXISTS
  ```
