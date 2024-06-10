To view the logs, use any method convenient for you:

- [Go to](https://msk.cloud.vk.com/app/en/services/monitoring/logging) the **Monitoring** → **Logging** section of your VK Cloud personal account.
- Use [API methods](/ru/additionals/api/logging "change-lang").

To refine the search results, use the [search query language](../../concepts/search-tools/). Examples of search expressions:

- Search for messages containing `internal error`:

  ```sql
  "internal error"
  ```

  or

  ```sql
  message: "internal error"
  ```

- Search for messages containing `error: "service unavailable"`:

  ```sql
  message: "error: \"service unavailable\""
  ```

- Using time, logging level and `payload`:

  ```sql
  level >= debug AND (timestamp <= "2023-04-10T10:20:00Z" OR payload.code = 200)
  ```

- Using `NOT`, `EXISTS`:

  ```sql
  service_id <> databases AND NOT message: hello AND payload.status EXISTS
  ```
