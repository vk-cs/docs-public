- Searching for messages containing `internal error`:

  ```sql
  "internal error"
  ```

- Searching for messages containing `error: "service unavailable"`:

  ```sql
  "error: \"service unavailable\""
  ```

- Using time, logging level and `payload`:

  ```sql
  level >= debug AND (timestamp <= "2023-04-10T10:20:00Z" OR payload.code = 200)
  ```

- Using `NOT`, `EXISTS`:

  ```sql
  service_id <> databases AND NOT message: hello AND payload.status EXISTS
  ```
