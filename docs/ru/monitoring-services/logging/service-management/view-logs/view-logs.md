Чтобы просматривать логи, воспользуйтесь удобным способом:

- [Перейдите](https://msk.cloud.vk.com/app/services/monitoring/logging) в раздел **Мониторинг** → **Логирование** личного кабинета.
- Используйте [методы API](/ru/tools-for-using-services/api/api-spec/logging).

Чтобы уточнить результаты поиска, используйте [язык поисковых запросов](../../concepts/search-tools/). Примеры поисковых выражений:

- Поиск сообщений, содержащих `internal error`:

  ```sql
  "internal error"
  ```

  или

  ```sql
  message: "internal error"
  ```  

- Поиск сообщений, содержащих `error: "service unavailable"`:

  ```sql
  message: "error: \"service unavailable\""
  ```

- Использование времени, уровня логирования и `payload`:

  ```sql
  level >= debug AND (timestamp <= "2023-04-10T10:20:00Z" OR payload.code = 200)
  ```

- Использование `NOT`, `EXISTS`:

  ```sql
  service_id <> databases AND NOT message: hello AND payload.status EXISTS
  ```
