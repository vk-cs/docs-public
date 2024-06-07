To view the logs, use any method convenient for you:

- [Go to](https://msk.cloud.vk.com/app/en) **Monitoring** → **Logging** section of your personal account.
- Use [API methods](/ru/tools-for-using-services/api/logging "change-lang").

To refine the search results, use [search query language](../../concepts/search-tools/). Examples of search expressions:

- The message contains the line:

  ```sql
  some message
  ```

  ```sql
  message: "some message"
  ```

  ```sql
  message: "error: \"some message\"
  ```

- Using time, logging level and `payload`:

  ```sql
  level >= debug AND (timestamp <= "2023-04-10T10:20:00Z" OR payload.code = 200)
  ```

- Using `NOT`, `EXISTS`:

  ```sql
  service_id <> databases AND NOT message: hello AND payload.status EXISTS
  ```
