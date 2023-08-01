Чтобы просматривать логи, воспользуйтесь [методами API](/ru/additionals/api/logging).

Используйте [язык поисковых запросов](../../concepts/search-tools/), чтобы уточнить результаты поиска.

Примеры поисковых выражений:

- Сообщение содержит строку:

  ```sql
  some message
  ```

  ```sql
  message: "some message"
  ```

  ```sql
  message: "error: \"some message\"
  ```

- Использование времени, уровня логирования и `payload`:

  ```sql
  level >= debug AND (timestamp <= "2023-04-10T10:20:00Z" OR payload.code = 200)
  ```

- Использование `NOT`, `EXISTS`:

  ```sql
  service_id <> databases AND NOT message: hello AND payload.status EXISTS
  ```
