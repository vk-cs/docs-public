# {heading(Особенности работы правил доступа)[id=rbac_info]}

В Cloud Trino доступ пользователей управляется правилами для объектов: каталогов, схем и таблиц. Эти правила определяют, какие SQL-команды пользователь может выполнять.

## {heading(Как применяются правила доступа)[id=rbac_how_it_works]}

- Правила применяются отдельно для каталогов, схем и таблиц. Если настроить правила только для каталогов, то доступ к схемам и таблицам будет разрешен всем пользователям.
- Если нет ни одного правила на тип объекта, то доступ на этом уровне разрешен всем пользователям.
- Если для типа объектов задано хотя бы одно правило, Cloud Trino применяет первое совпавшее правило сверху вниз, правила ниже не учитываются. Если совпадений нет, доступ будет запрещен.

## {heading(Необходимые привилегии для SQL-команд)[id=rbac_sql_permissions]}

Для выполнения SQL-команд пользователю нужно {linkto(../../instructions/rbac#rbac_add)[text=добавить правило доступа]} с определенными привилегиями (разрешениями) для соответствующего типа объекта: каталога, схемы и таблицы. Необходимые привилегии для каждой команды указаны в {ifdef(public)} таблице {/ifdef}{ifndef(public)}{linkto(#tab_trino_rbac_sql)[text=таблице Привилегии для SQL-команд]}{/ifndef}.

{ifndef(public)}
{caption(Таблица {counter(table)[id=numb_tab_trino_rbac_sql]} — Привилегии для SQL-команд)[align=right;position=above;id=tab_trino_rbac_sql;number={const(numb_tab_trino_rbac_sql)}]}
{/ifndef}

[cols="2,1,1,1,2", options="header"]
|===
|SQL-команда
|Привилегия для каталога
|Доступ к схеме
|Привилегия для таблицы
|Комментарий

|`SHOW CATALOGS`
|Не требуется
|Не требуется
|Не требуется
|Выполнение команды доступно без специальных привилегий

|`SHOW SCHEMAS`
|`Read only`
|Не требуется
|Любое значение
|Разрешено, если каталог доступен для пользователя

|`SHOW TABLES`
|`Read only`
|Не требуется
|Любое значение
|Разрешено, если схемы доступны для пользователя

|`CREATE SCHEMA`
|`Read only`
|Требуется
|Не требуется
|

|`DROP SCHEMA`
|`All`
|Требуется
|Не требуется
|

|`SHOW CREATE SCHEMA`
|`All`
|Требуется
|Не требуется
|

|`ALTER SCHEMA … RENAME TO`
|`All`
|Требуется
|Не требуется
|Требуется доступ к старой и новой схемам

|`ALTER SCHEMA … SET AUTHORIZATION`
|`All`
|Требуется
|Не требуется
|Требуется доступ к старой и новой схемам

|`CREATE TABLE`
|`All`
|Не требуется
|`OWNERSHIP`
|

|`DROP TABLE`
|`All`
|Не требуется
|`OWNERSHIP`
|

|`ALTER TABLE … RENAME TO`
|`All`
|Не требуется
|`OWNERSHIP`
|Привилегия `OWNERSHIP` должна быть для старой и новой таблиц

|`ALTER TABLE … SET PROPERTIES`
|`All`
|Не требуется
|`OWNERSHIP`
|

|`CREATE VIEW`
|`All`
|Не требуется
|`OWNERSHIP`
|

|`DROP VIEW`
|`All`
|Не требуется
|`OWNERSHIP`
|

|`ALTER VIEW … RENAME TO`
|`All`
|Не требуется
|`OWNERSHIP`
|Привилегия `OWNERSHIP` должна быть для старой и новой таблиц

|`REFRESH MATERIALIZED VIEW`
|`All`
|Не требуется
|`UPDATE`
|

|`COMMENT ON TABLE`
|`All`
|Не требуется
|`OWNERSHIP`
|

|`COMMENT ON COLUMN`
|`All`
|Не требуется
|`OWNERSHIP`
|

|`ALTER TABLE … ADD COLUMN`
|`All`
|Не требуется
|`OWNERSHIP`
|

|`ALTER TABLE … DROP COLUMN`
|`All`
|Не требуется
|`OWNERSHIP`
|

|`ALTER TABLE … RENAME COLUMN`
|`All`
|Не требуется
|`OWNERSHIP`
|

|`SHOW COLUMNS`
|`Read only`
|Не требуется
|`OWNERSHIP`
|

|`SELECT FROM table`
|`Read only`
|Не требуется
|`SELECT`
|

|`SELECT FROM view`
|`Read only`
|Не требуется
|`SELECT`
|

|`INSERT INTO`
|`All`
|Не требуется
|`INSERT`
|

|`DELETE FROM`
|`All`
|Не требуется
|`DELETE`
|

|`UPDATE`
|`All`
|Не требуется
|`UPDATE`
|

|===

{ifndef(public)}
{/caption}
{/ifndef}