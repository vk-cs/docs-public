# {heading(Access rule specifics)[id=rbac_info]}

{include(/en/_includes/_translated_by_ai_en.md)}

In Cloud Trino, user access is managed by rules for objects: catalogs, schemas, and tables. These rules define which SQL commands a user can execute.

## {heading(How access rules are applied)[id=rbac_how_it_works]}

- Rules are applied separately for catalogs, schemas, and tables. If rules are configured only for catalogs, access to schemas and tables will be granted to all users.
- If there are no rules for an object type at all, access at that level is granted to all users.
- If at least one rule is set for an object type, Cloud Trino applies the first matching rule from top to bottom; rules below are not considered. If there are no matches, access will be denied.

## {heading(Privileges required for SQL commands)[id=rbac_sql_permissions]}

To execute SQL commands, the user needs to {linkto(../../instructions/rbac#rbac_add)[text=add an access rule]} with specific privileges (permissions) for the corresponding object type: catalog, schema, or table. The required privileges for each command are listed in the {ifdef(public)} table {/ifdef}{ifndef(public)}{linkto(#tab_trino_rbac_sql)[text=table Privileges for SQL commands]}{/ifndef}.

{ifndef(public)}
{caption(Table {counter(table)[id=numb_tab_trino_rbac_sql]} — Privileges for SQL commands)[align=right;position=above;id=tab_trino_rbac_sql;number={const(numb_tab_trino_rbac_sql)}]}
{/ifndef}

[cols="2,1,1,1,2", options="header"]
|===
|SQL command
|Catalog privilege
|Schema access
|Table privilege
|Comment

|`SHOW CATALOGS`
|Not required
|Not required
|Not required
|The command can be executed without special privileges

|`SHOW SCHEMAS`
|`Read only`
|Not required
|Any value
|Allowed if the catalog is accessible to the user

|`SHOW TABLES`
|`Read only`
|Not required
|Any value
|Allowed if the schemas are accessible to the user

|`CREATE SCHEMA`
|`Read only`
|Required
|Not required
|

|`DROP SCHEMA`
|`All`
|Required
|Not required
|

|`SHOW CREATE SCHEMA`
|`All`
|Required
|Not required
|

|`ALTER SCHEMA … RENAME TO`
|`All`
|Required
|Not required
|Access to both the old and new schemas is required

|`ALTER SCHEMA … SET AUTHORIZATION`
|`All`
|Required
|Not required
|Access to both the old and new schemas is required

|`CREATE TABLE`
|`All`
|Not required
|`OWNERSHIP`
|

|`DROP TABLE`
|`All`
|Not required
|`OWNERSHIP`
|

|`ALTER TABLE … RENAME TO`
|`All`
|Not required
|`OWNERSHIP`
|The `OWNERSHIP` privilege must be granted for both the old and new tables

|`ALTER TABLE … SET PROPERTIES`
|`All`
|Not required
|`OWNERSHIP`
|

|`CREATE VIEW`
|`All`
|Not required
|`OWNERSHIP`
|

|`DROP VIEW`
|`All`
|Not required
|`OWNERSHIP`
|

|`ALTER VIEW … RENAME TO`
|`All`
|Not required
|`OWNERSHIP`
|The `OWNERSHIP` privilege must be granted for both the old and new tables

|`REFRESH MATERIALIZED VIEW`
|`All`
|Not required
|`UPDATE`
|

|`COMMENT ON TABLE`
|`All`
|Not required
|`OWNERSHIP`
|

|`COMMENT ON COLUMN`
|`All`
|Not required
|`OWNERSHIP`
|

|`ALTER TABLE … ADD COLUMN`
|`All`
|Not required
|`OWNERSHIP`
|

|`ALTER TABLE … DROP COLUMN`
|`All`
|Not required
|`OWNERSHIP`
|

|`ALTER TABLE … RENAME COLUMN`
|`All`
|Not required
|`OWNERSHIP`
|

|`SHOW COLUMNS`
|`Read only`
|Not required
|`OWNERSHIP`
|

|`SELECT FROM table`
|`Read only`
|Not required
|`SELECT`
|

|`SELECT FROM view`
|`Read only`
|Not required
|`SELECT`
|

|`INSERT INTO`
|`All`
|Not required
|`INSERT`
|

|`DELETE FROM`
|`All`
|Not required
|`DELETE`
|

|`UPDATE`
|`All`
|Not required
|`UPDATE`
|

|===

{ifndef(public)}
{/caption}
{/ifndef}