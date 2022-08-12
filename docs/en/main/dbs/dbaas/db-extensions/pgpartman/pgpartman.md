**pg_partman** is a manager for managing time partitions and auto—increasing columns.

Together with the extension, a `partman` scheme is created on which the installation takes place, as recommended by the extension developers.

`Pg_partman` supports two types of partitioning: based on its triggers and native — based on the functionality added in Postgresql 11. For native partitioning on Postgresql 11+, the user `partman` is configured, to which you can set your password. For partitioning based on party triggers and for older versions of Postgresql, use a root user.

You can learn more about the **pg_partman** extension from the developer documentation on [GitHub](https://github.com/pgpartman/pg_partman) or by downloading [PDF](https://access.crunchydata.com/documentation/pg-partman/4.6.0/pdf/pg_partman.pdf).

#### Parameters applicable in VK Cloud infrastructure:

|Name|Description|
|---|---|
|`database`|Databases to configure the extension for. Deleting databases from this list is not supported for the installed extension.|
|`interval`|Number, number of seconds to run the cycle once, by default 3600 = hour|
|`analyze`|Runs the analysis on the parent table, it is necessary for PG10-, for PG11+ it is not necessary to fill in (not set by default)|
