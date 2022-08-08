## Connecting to an instance

To connect to an ADB instance, use [Instructions for connecting to a database instance](https://mcs.mail.ru/docs/ru/dbs/dbaas/dbaas-start/db-connect).

## Loading data

After the connector for connecting to the database is selected and the connection is established, you can start loading data.

The main tool for loading data into Greenplum and uploading data from Greenplum is the gpfdist utility. This is an http server that Greenplum talks to all its nodes at once, achieving high speeds for both downloading and uploading data.

Official gpfdist documentation [available at the official resource](https://gpdb.docs.pivotal.io/510/utility_guide/admin_utilities/gpfdist.html).

What is gpfdist used for? Greenplum has the concept of external table (external tables), the description of which looks almost the same as for ordinary tables, but at the end a condition like LOCATION ('gpfdist://hostname:8080/database_name/table_name.csv') is added, which indicates exactly where the file is stored, the structure of which is described in the external table. External table can be either readable or writable.

If the external table is created for reading, then, firstly, instead of the file name, you can use a mask (that is, you can read or download many files at once), and secondly, you can read from archived files (.gz, .zip or . bz2), which significantly increases the speed of reading and loading files, since reading data from disks is reduced many times compared to reading unarchived files.

External table can work with multiple instances of gpfdist running at once, even on different nodes. This further increases the performance of the system - both for loading and unloading data.
