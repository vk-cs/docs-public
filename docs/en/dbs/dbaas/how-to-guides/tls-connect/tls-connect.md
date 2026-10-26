# {heading(Using the TLS protocol to connect to PostgreSQL)[id=dbaas-tls-connect]}

{include(/en/_includes/_translated_by_ai_en.md)}

The TLS (Transport Layer Security) protocol is used to protect connections between the client and the PostgreSQL server. It encrypts the transmitted data, preventing interception and unauthorized access.

PgBouncer is used to optimize connections. It manages a connection pool, reusing connections and reducing the number of active connections to PostgreSQL. This reduces the load on the server, speeds up query execution, and prevents resource overload with a large number of clients.

This instruction will help you:

- configure a secure connection to connect to the PostgreSQL server;
- run the PgBouncer extension on the PostgreSQL server to optimize connections;
- adjust the query to the PostgreSQL DB on the client;
- connect the PgBouncer load balancer extension.

## {heading(Preparation steps)[id=dbaas-tls-connect-prepare]}

1. {linkto(../../instructions/create#dbaas-create)[text=Create]} a Postgresql DB instance, if this has not been done earlier.
1. Make sure the database instance is running.

## {heading(1. Configure a secure connection on the PostgreSQL server)[id=dbaas-tls-connect-connection-set]}

1. In the [{var(cloud)} management console](https://msk.cloud.vk.ru/app), go to the **Databases → Database instances** section.
1. Click the instance name.
1. Go to the **Database parameters → Add parameter** tab
1. Select the `ssl` parameter from the list and set the parameter value to `on`.
1. Click **Save** and confirm the action.

   After that, the database instance will restart.

## {heading(2. (Optional) Connect the PgBouncer load balancer extension)[id=dbaas-tls-connect-connect-pgbouncer]}

1. Go to the **Extensions → Add** tab.
1. Select **pooler** from the drop-down list of extensions.
1. Set the main {linkto(../../extensions/postgresql#dbaas-extensions-postgresql-pgbouncer)[text=parameters]} of the extension.

    * **pool_mode**: select a connection management mode or keep the default value.
    * **max_client_conn**: set a limit on the number of client connections to prevent the load balancer from being overloaded, or keep the default value.
    * **listen_port**: specify the port for incoming connections or keep the default value.

1. Click **Save**.

    Wait for the extension parameter update process to complete.

## {heading(3. Check the ability to connect to the Postgresql instance via a secure connection)[id=dbaas-tls-connect-check-connect]}

{linkto(../../connect#dbaas-connect-postgresql)[text=Connect]} to the Postgresql DB, specifying the value `require` for the `sslmode` parameter in the query.

## {heading(Delete unused resources)[id=dbaas-tls-connect-delete-resources]}

If you no longer need the database instance, {linkto(../../instructions/manage-instance/postgresql#dbaas-postgresql-disk-delete)[text=delete]} it.