# {heading(Tarantool)[id=dbaas-concepts-tarantool]}

{include(/en/_includes/_translated_by_ai_en.md)}

[Tarantool](https://www.tarantool.io/ru/) is an in-memory computing platform that includes a NoSQL-type DBMS and a built-in Lua application server.

The main advantages of Tarantool:

- tolerance to write load;
- predictable query latency;
- caching with deferred writes.

Tarantool is well suited for building:

- high-load systems and OLTP systems;
- a caching proxy for data;
- a fast message queue broker.

The following configurations are available:

- Single.
- Cluster.
- Enterprise (upon request): a cluster with additional proprietary modules and official support.
- Data Grid (upon request): a cluster designed for building systems for storing and analyzing complex business objects.

For the Single and Cluster configurations, the open-source edition of Tarantool is used — [Community Edition](https://www.tarantool.io/ru/doc/latest/).

For the Enterprise configuration, [Tarantool Enterprise Edition](https://www.tarantool.io/ru/enterprise_doc/) is used, and for the Data Grid configuration — the [Tarantool Data Grid](https://www.tarantool.io/ru/datagrid/) data integration system.

## {heading(What's next)[id=dbaas-concepts-tarantool-whats-next]}

- {linkto(../../../instructions/create#dbaas-create)[text=Create]} a DBMS instance.
- {linkto(../../../connect#dbaas-connect)[text=Connect]} to the DBMS.