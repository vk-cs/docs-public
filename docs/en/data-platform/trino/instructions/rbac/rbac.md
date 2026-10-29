# {heading(User access management)[id=trino_rbac]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

In Cloud Trino, user access management is performed by adding rules for actions with objects: catalogs, schemas, and tables. These rules define which SQL commands the user can execute. For more information about how rules work and the privileges for executing SQL commands, see the article {linkto(../../concepts/rbac_info#rbac_info)[text=%text]}.

## {heading(Adding an access rule)[id=rbac_add]}

{tabs}

{tab(Management console)}

{note:info}
Rules are added one at a time. Adding multiple rules simultaneously is not supported.
{/note}

{include(../../../_includes/_trino.md)[tags=open]}

1. Go to the **Accesses** tab.
1. Click the **Add rule** button.
1. Select the access type and set the rule parameters:

   {tabs}

   {tab(Catalog)}

   - **Name**: an arbitrary name for the rule.
   - **Users**: the list of users the rule applies to. By default, the rule applies to all users.
   - **Privileges**:

     - `None` — deny access.
     - `All` — full access to all operations.
     - `Read only` — read-only access.
          
     {note:info}
     Use the table from the article {linkto(../../concepts/rbac_info#rbac_sql_permissions)[text=Access rules specifics]} to choose the desired privilege.
     {/note}

    - **Catalogs**: the names of catalogs the rule applies to. By default, the rule applies to all catalogs. They are entered manually and must match the catalog names that can be {linkto(../management#trino_view-connect)[text=found]} in the connection settings or using the query:

      ```sql
      SHOW CATALOGS;
      ```
   {/tab}

   {tab(Schema)}

   - **Name**: an arbitrary name for the rule.
   - **Users**: the list of users the rule applies to. By default, the rule applies to all users.
   - **Privileges**: allows access when the value is `True` and denies it when the value is `False`.
      
     {note:info}
     Use the table from the article {linkto(../../concepts/rbac_info#rbac_sql_permissions)[text=Access rules specifics]} to choose the desired privilege.
     {/note}
      
   - **Catalogs**: the names of catalogs the rule applies to. By default, the rule applies to all catalogs. They are entered manually and must match the catalog names that can be {linkto(../management#trino_view-connect)[text=found]} in the connection settings or using the query:

     ```sql
     SHOW CATALOGS;
     ```

   - **Schemas**: the names of schemas the rule applies to. By default, the rule applies to all schemas. They are entered manually and must match the schema names in the Cloud Trino instance. You can find the schema names using the query:

     ```sql
     SHOW SCHEMAS FROM <CATALOG_NAME>;
     ```

     {note:info}
     The rule applies to all schemas with that name in all specified catalogs.
     {/note}

   {/tab}

   {tab(Table)}

   - **Name**: an arbitrary name for the rule.
   - **Users**: the list of users the rule applies to. By default, the rule applies to all users.
   - **Privileges**: privileges for actions with tables. You can select one or several. The following privileges are available:

     - `SELECT` — viewing and reading data from tables.
     - `INSERT` — adding new data to tables.
     - `DELETE` — deleting data from tables.
     - `UPDATE` — modifying data in tables.
     - `OWNERSHIP` — full control over tables, including changing the structure and managing access rights.

     {note:info}
     Use the table from the article {linkto(../../concepts/rbac_info#rbac_sql_permissions)[text=Access rules specifics]} to choose the desired privilege.
     {/note}
      
   - **Catalogs**: the names of catalogs the rule applies to. By default, the rule applies to all catalogs. They are entered manually and must match the catalog names that can be {linkto(../management#trino_view-connect)[text=found]} in the connection settings or using the query:

     ```sql
     SHOW CATALOGS;
     ```

   - **Schemas**: the names of schemas the rule applies to. By default, the rule applies to all schemas. They are entered manually and must match the schema names in the Cloud Trino instance. You can find the schema names using the query:

     ```sql
     SHOW SCHEMAS FROM <CATALOG_NAME>;
     ```

     {note:info}
     The rule applies to all schemas with that name in all specified catalogs.
     {/note}

   - **Tables**: the names of tables the rule applies to. By default, the rule applies to all tables. They are entered manually and must match the table names in the Cloud Trino instance. You can find the table names using the query:

     ```sql
     SHOW TABLES FROM <CATALOG_NAME>.<SCHEMA_NAME>;
     ```

     {note:info}
     The rule applies to all tables with that name in all specified schemas and catalogs.
     {/note}

   {/tab}

   {/tabs}

1. Click the **Add** button.

{/tab}

{/tabs}

## {heading(Viewing access rules)[id=trino_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_trino.md)[tags=open]}

1. Go to the **Accesses** tab.
1. Review the access rules for catalogs, schemas, and tables.

{/tab}

{/tabs}

## {heading(Changing the order of access rules)[id=trino_rearrange]}

Rules are applied in order from top to bottom. Place general rules higher, and more specific rules below the general ones.

{tabs}

{tab(Management console)}

{include(../../../_includes/_trino.md)[tags=open]}

1. Go to the **Accesses** tab.
1. Click the **Arrange** button.
1. Change the order of rules for catalogs, schemas, or tables.
1. Click the **Save** button.

{/tab}

{/tabs}

## {heading(Editing an access rule)[id=trino_edit]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_trino.md)[tags=open]}

1. Go to the **Accesses** tab.
1. Click **•••** to the right of the rule and select **Edit**.
1. Edit the rule and click the **Save** button.

{/tab}

{/tabs}

## {heading(Deleting an access rule)[id=trino_delete]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_trino.md)[tags=open]}

1. Go to the **Accesses** tab.
1. Click **•••** to the right of the rule and select **Delete**.
1. Confirm the rule deletion.

{/tab}

{/tabs}