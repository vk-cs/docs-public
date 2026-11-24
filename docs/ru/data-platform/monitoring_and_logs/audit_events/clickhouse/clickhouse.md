# {heading(Cloud ClickHouse)[id=clickhouse-audit-events]}

Cloud ClickHouse отправляет в сервис аудита события выполнения SQL-запросов и подключения пользователей. Остальные события отображаются на вкладке {linkto(../../logs_standalone#logs-standalone)[text=Логирование]}.

## {heading(Выполнение SQL-запросов)[id=clickhouse-audit-events-queries]}

ClickHouse записывает сведения о выполнении SQL-запросов в системную таблицу `system.query_log`. Сервис аудита фиксирует следующие операции:

- `SELECT` — чтение данных.
- `INSERT`, `UPDATE`, `DELETE` — добавление, обновление и удаление данных.
- `CREATE`, `ALTER`, `DROP` — создание, изменение и удаление объектов.
- `TRUNCATE` — очистка таблицы.
- `GRANT`, `REVOKE` — выдача и отзыв прав.
- `SET` — изменение настроек.

## {heading(Подключения пользователей)[id=clickhouse-audit-events-connections]}

Сервис аудита фиксирует события подключения пользователей, перечисленные в {linkto(#tab_clickhouse_audit_connections)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_clickhouse_audit_connections]} — События подключения пользователей)[align=right;position=above;id=tab_clickhouse_audit_connections;number={const(numb_tab_clickhouse_audit_connections)}]}
[cols="1,2", options="header"]
|===
|Событие
|Описание

|`LoginSuccess`
|Успешный вход в кластер

|`LoginFailure`
|Неудачная попытка входа. Уровень события — `warning`

|`Logout`
|Завершение сеанса пользователя

|===

{/caption}
