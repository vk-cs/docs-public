Чтобы просматривать логи, воспользуйтесь удобным способом:

- [Перейдите](https://msk.cloud.vk.com/app/) в раздел **Мониторинг** → **Логирование** личного кабинета.
- Используйте [методы API](/ru/additionals/api/logging).

Чтобы уточнить результаты поиска, используйте [язык поисковых запросов](../../concepts/search-tools/). Примеры поисковых выражений:

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
