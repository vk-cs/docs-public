- `internal error` қамтитын хабарларды іздеу:

  ```sql
  "internal error"
  ```

- `error: "service unavailable"` қамтитын хабарларды іздеу:

  ```sql
   "error: \"service unavailable\""
  ```

- Уақытты, логтау деңгейін және `payload` пайдалануы:

  ```sql
  level >= debug AND (timestamp <= "2023-04-10T10:20:00Z" OR payload.code = 200)
  ```

- `NOT`, `EXISTS` пайдалануы:

  ```sql
  service_id <> databases AND NOT message: hello AND payload.status EXISTS
  ```
