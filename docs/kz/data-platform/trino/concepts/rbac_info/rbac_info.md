# {heading(Рұқсат ету ережелерінің жұмыс істеу ерекшеліктері)[id=rbac_info]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

Cloud Trino-да пайдаланушылардың қол жетімі нысандарға арналған ережелер арқылы басқарылады: каталогтарға, схемаларға және кестелерге. Бұл ережелер пайдаланушы қандай SQL-командаларды орындай алатынын анықтайды.

## {heading(Рұқсат ету ережелері қалай қолданылады)[id=rbac_how_it_works]}

- Ережелер каталогтарға, схемаларға және кестелерге бөлек қолданылады. Ережелер тек каталогтарға ғана бапталса, схемаларға және кестелерге қол жетім барлық пайдаланушыларға рұқсат етіледі.
- Нысан түріне бірде-бір ереже болмаса, бұл деңгейде қол жетім барлық пайдаланушыларға рұқсат етіледі.
- Нысандар түріне кем дегенде бір ереже берілген болса, Cloud Trino жоғарыдан төмен қарай бірінші сәйкес келген ережені қолданады, төмендегі ережелер ескерілмейді. Сәйкестік болмаса, қол жетімге тыйым салынады.

## {heading(SQL-командалар үшін қажетті привилегиялар)[id=rbac_sql_permissions]}

SQL-командаларды орындау үшін пайдаланушыға сәйкес нысан түріне: каталогқа, схемага және кестеге белгілі бір привилегияларымен (рұқсаттарымен) {linkto(../../instructions/rbac#rbac_add)[text=рұқсат ету ережесін қосу]} қажет. Әр команда үшін қажетті привилегиялар {ifdef(public)} кестеде {/ifdef}{ifndef(public)}{linkto(#tab_trino_rbac_sql)[text=SQL-командалар үшін привилегиялар кестесінде]}{/ifndef} көрсетілген.

{ifndef(public)}
{caption(Кесте {counter(table)[id=numb_tab_trino_rbac_sql]} — SQL-командалар үшін привилегиялар)[align=right;position=above;id=tab_trino_rbac_sql;number={const(numb_tab_trino_rbac_sql)}]}
{/ifndef}

[cols="2,1,1,1,2", options="header"]
|===
|SQL-команда
|Каталог үшін привилегия
|Схемаға қол жетім
|Кесте үшін привилегия
|Түсініктеме

|`SHOW CATALOGS`
|Қажет емес
|Қажет емес
|Қажет емес
|Команданы орындау арнайы привилегияларсыз қолжетімді

|`SHOW SCHEMAS`
|`Read only`
|Қажет емес
|Кез келген мән
|Пайдаланушыға каталог қолжетімді болса рұқсат етіледі

|`SHOW TABLES`
|`Read only`
|Қажет емес
|Кез келген мән
|Пайдаланушыға схемалар қолжетімді болса рұқсат етіледі

|`CREATE SCHEMA`
|`Read only`
|Қажет
|Қажет емес
|

|`DROP SCHEMA`
|`All`
|Қажет
|Қажет емес
|

|`SHOW CREATE SCHEMA`
|`All`
|Қажет
|Қажет емес
|

|`ALTER SCHEMA … RENAME TO`
|`All`
|Қажет
|Қажет емес
|Ескі және жаңа схемаларға қол жетім қажет

|`ALTER SCHEMA … SET AUTHORIZATION`
|`All`
|Қажет
|Қажет емес
|Ескі және жаңа схемаларға қол жетім қажет

|`CREATE TABLE`
|`All`
|Қажет емес
|`OWNERSHIP`
|

|`DROP TABLE`
|`All`
|Қажет емес
|`OWNERSHIP`
|

|`ALTER TABLE … RENAME TO`
|`All`
|Қажет емес
|`OWNERSHIP`
|`OWNERSHIP` привилегиясы ескі және жаңа кестелер үшін болуы тиіс

|`ALTER TABLE … SET PROPERTIES`
|`All`
|Қажет емес
|`OWNERSHIP`
|

|`CREATE VIEW`
|`All`
|Қажет емес
|`OWNERSHIP`
|

|`DROP VIEW`
|`All`
|Қажет емес
|`OWNERSHIP`
|

|`ALTER VIEW … RENAME TO`
|`All`
|Қажет емес
|`OWNERSHIP`
|`OWNERSHIP` привилегиясы ескі және жаңа кестелер үшін болуы тиіс

|`REFRESH MATERIALIZED VIEW`
|`All`
|Қажет емес
|`UPDATE`
|

|`COMMENT ON TABLE`
|`All`
|Қажет емес
|`OWNERSHIP`
|

|`COMMENT ON COLUMN`
|`All`
|Қажет емес
|`OWNERSHIP`
|

|`ALTER TABLE … ADD COLUMN`
|`All`
|Қажет емес
|`OWNERSHIP`
|

|`ALTER TABLE … DROP COLUMN`
|`All`
|Қажет емес
|`OWNERSHIP`
|

|`ALTER TABLE … RENAME COLUMN`
|`All`
|Қажет емес
|`OWNERSHIP`
|

|`SHOW COLUMNS`
|`Read only`
|Қажет емес
|`OWNERSHIP`
|

|`SELECT FROM table`
|`Read only`
|Қажет емес
|`SELECT`
|

|`SELECT FROM view`
|`Read only`
|Қажет емес
|`SELECT`
|

|`INSERT INTO`
|`All`
|Қажет емес
|`INSERT`
|

|`DELETE FROM`
|`All`
|Қажет емес
|`DELETE`
|

|`UPDATE`
|`All`
|Қажет емес
|`UPDATE`
|

|===

{ifndef(public)}
{/caption}
{/ifndef}