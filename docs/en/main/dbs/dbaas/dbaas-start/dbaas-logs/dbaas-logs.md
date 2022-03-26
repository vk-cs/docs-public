### Важно

Логи баз данных доступны только для БД, созданных после 1 декабря 2020 года.

В настоящее время реализована возможность получения логов для следующих Баз данных:

*   MySQL
*   PostgreSQL/PostgresPro
*   ClickHouse
*   Redis
*   MongoBD

Отметим, что для реализации получения логов необходимо [подключиться к БД по SSH](https://mcs.mail.ru/help/ru_RU/dbaas-start/dbaas-connect).

Ниже представлено детальное описание получения логов из каждого типа БД.

MySQL
-----

Для получения логов необходимо подключиться по SSH и ввести следующую команду:

```
\[admin@mysql-8658 ~\]journalctl -u mysqld
```

Далее, ответом будут выведены логи:

```
\-- Logs begin at Fri 2020-12-25 08:35:15 UTC, end at Mon 2021-01-11 18:41:34 UTC. --
Dec 25 08:35:21 mysql-v5dot6-2020-11-30.novalocal systemd\[1\]: Starting MySQL Community Server...
Dec 25 08:35:25 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:25 0 \[Warning\] TIMESTAMP with implicit D
Dec 25 08:35:25 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:25 0 \[Note\] Ignoring --secure-file-priv
Dec 25 08:35:25 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:25 0 \[Note\] /usr/sbin/mysqld (mysqld 5.6
Dec 25 08:35:25 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:25 1276 \[Note\] InnoDB: Using atomics to
Dec 25 08:35:25 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:25 1276 \[Note\] InnoDB: The InnoDB memory
Dec 25 08:35:25 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:25 1276 \[Note\] InnoDB: Mutexes and rw\_lo
Dec 25 08:35:25 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:25 1276 \[Note\] InnoDB: Memory barrier is
Dec 25 08:35:25 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:25 1276 \[Note\] InnoDB: Compressed tables
Dec 25 08:35:25 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:25 1276 \[Note\] InnoDB: Using Linux nativ
Dec 25 08:35:25 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:25 1276 \[Note\] InnoDB: Using CPU crc32 i
Dec 25 08:35:25 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:25 1276 \[Note\] InnoDB: Initializing buff
Dec 25 08:35:25 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:25 1276 \[Note\] InnoDB: Completed initial
Dec 25 08:35:25 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:25 1276 \[Note\] InnoDB: The first specifi
Dec 25 08:35:25 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:25 1276 \[Note\] InnoDB: Setting file ./ib
Dec 25 08:35:25 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:25 1276 \[Note\] InnoDB: Database physical
Dec 25 08:35:25 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:25 1276 \[Note\] InnoDB: Setting log file
Dec 25 08:35:26 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:26 1276 \[Note\] InnoDB: Setting log file
Dec 25 08:35:26 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:26 1276 \[Note\] InnoDB: Renaming log file
Dec 25 08:35:26 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:26 1276 \[Warning\] InnoDB: New log files
Dec 25 08:35:26 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:26 1276 \[Note\] InnoDB: Doublewrite buffe
Dec 25 08:35:26 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:26 1276 \[Note\] InnoDB: Doublewrite buffe
Dec 25 08:35:26 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:26 1276 \[Note\] InnoDB: 128 rollback segm
Dec 25 08:35:26 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:26 1276 \[Warning\] InnoDB: Creating forei
Dec 25 08:35:26 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:26 1276 \[Note\] InnoDB: Foreign key const
Dec 25 08:35:26 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:26 1276 \[Note\] InnoDB: Creating tablespa
Dec 25 08:35:26 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:26 1276 \[Note\] InnoDB: Tablespace and da
Dec 25 08:35:26 mysql-8658.novalocal mysql-systemd-start\[867\]: 2020-12-25 08:35:26 1276 \[Note\] InnoDB: Waiting for purge
lines 1-29
```

PostgreSQL/PostgresPro
----------------------

Для получения логов необходимо подключиться по SSH и ввести следующую команду:

```
\[admin@postgresql-9641 ~\]journalctl -u postgresql
```

Далее, ответом будут выведены логи:

```
\-- Logs begin at Fri 2020-12-25 07:48:19 UTC, end at Mon 2021-01-11 18:46:16 UTC. --
Dec 25 07:48:25 postgresql-12-2020-12-11.novalocal systemd\[1\]: Starting PostgreSQL 12 database server...
Dec 25 07:48:25 postgresql-12-2020-12-11.novalocal postmaster\[883\]: 2020-12-25 07:48:25.309 UTC \[883\] LOG:  starting Pos
Dec 25 07:48:25 postgresql-12-2020-12-11.novalocal postmaster\[883\]: 2020-12-25 07:48:25.310 UTC \[883\] LOG:  listening on
Dec 25 07:48:25 postgresql-12-2020-12-11.novalocal postmaster\[883\]: 2020-12-25 07:48:25.310 UTC \[883\] LOG:  listening on
Dec 25 07:48:25 postgresql-12-2020-12-11.novalocal postmaster\[883\]: 2020-12-25 07:48:25.315 UTC \[883\] LOG:  listening on
Dec 25 07:48:25 postgresql-12-2020-12-11.novalocal postmaster\[883\]: 2020-12-25 07:48:25.364 UTC \[883\] LOG:  listening on
Dec 25 07:48:25 postgresql-12-2020-12-11.novalocal postmaster\[883\]: 2020-12-25 07:48:25.414 UTC \[883\] LOG:  redirecting
Dec 25 07:48:25 postgresql-12-2020-12-11.novalocal postmaster\[883\]: 2020-12-25 07:48:25.414 UTC \[883\] HINT:  Future log
Dec 25 07:48:25 postgresql-12-2020-12-11.novalocal systemd\[1\]: Started PostgreSQL 12 database server.
Dec 25 07:48:32 postgresql-9641.novalocal systemd\[1\]: Stopping PostgreSQL 12 database server...
Dec 25 07:48:32 postgresql-9641.novalocal systemd\[1\]: Stopped PostgreSQL 12 database server.
Dec 25 07:48:40 postgresql-9641.novalocal systemd\[1\]: Starting PostgreSQL 12 database server...
Dec 25 07:48:40 postgresql-9641.novalocal postmaster\[1660\]: 2020-12-25 07:48:40.885 GMT \[1660\] LOG:  starting PostgreSQL
Dec 25 07:48:40 postgresql-9641.novalocal postmaster\[1660\]: 2020-12-25 07:48:40.885 GMT \[1660\] LOG:  listening on IPv4 a
Dec 25 07:48:40 postgresql-9641.novalocal postmaster\[1660\]: 2020-12-25 07:48:40.885 GMT \[1660\] LOG:  listening on IPv6 a
Dec 25 07:48:40 postgresql-9641.novalocal postmaster\[1660\]: 2020-12-25 07:48:40.905 GMT \[1660\] LOG:  listening on Unix s
Dec 25 07:48:40 postgresql-9641.novalocal postmaster\[1660\]: 2020-12-25 07:48:40.962 GMT \[1662\] LOG:  database system was
Dec 25 07:48:40 postgresql-9641.novalocal postmaster\[1660\]: 2020-12-25 07:48:40.998 GMT \[1660\] LOG:  database system is
Dec 25 07:48:41 postgresql-9641.novalocal systemd\[1\]: Started PostgreSQL 12 database server.
Dec 25 07:48:41 postgresql-9641.novalocal postmaster\[1660\]: 2020-12-25 07:48:41.023 GMT \[1671\] FATAL:  role "os\_admin" d
Dec 25 07:48:41 postgresql-9641.novalocal postmaster\[1660\]: 2020-12-25 07:48:41.039 GMT \[1673\] FATAL:  role "os\_admin" d
Dec 25 07:48:41 postgresql-9641.novalocal postmaster\[1660\]: 2020-12-25 07:48:41.082 GMT \[1677\] FATAL:  role "os\_admin" d
Dec 25 13:20:10 postgresql-9641.novalocal postmaster\[1660\]: 2020-12-25 13:20:10.575 GMT \[16971\] FATAL:  unsupported fron
Dec 25 13:20:10 postgresql-9641.novalocal postmaster\[1660\]: 2020-12-25 13:20:10.833 GMT \[16972\] FATAL:  unsupported fron
Dec 25 13:20:11 postgresql-9641.novalocal postmaster\[1660\]: 2020-12-25 13:20:11.086 GMT \[16973\] FATAL:  no PostgreSQL us
Dec 25 16:16:02 postgresql-9641.novalocal postmaster\[1660\]: 2020-12-25 16:16:02.956 GMT \[19980\] FATAL:  unsupported fron
Dec 25 16:16:03 postgresql-9641.novalocal postmaster\[1660\]: 2020-12-25 16:16:03.333 GMT \[19981\] FATAL:  unsupported fron
Dec 25 16:16:03 postgresql-9641.novalocal postmaster\[1660\]: 2020-12-25 16:16:03.711 GMT \[19982\] FATAL:  no PostgreSQL us
lines 1-29
```

ClickHouse
----------

Для получения логов необходимо подключиться по SSH и ввести следующую команду:

```
\[admin@clickhouse5992 ~\]less /var/log/clickhouse-server/clickhouse-server.log
```

Далее, ответом будут выведены логи:

```
2020.12.25 20:27:13.406404 \[ 1025 \] {} <Information> SentryWriter: Sending crash reports is disabled
2020.12.25 20:27:13.433539 \[ 1025 \] {} <Trace> Pipe: Pipe capacity is 1.00 MiB
2020.12.25 20:27:13.583904 \[ 1025 \] {} <Information> : Starting ClickHouse 20.8.4.11 with revision 54438, no build id, PID 1025
2020.12.25 20:27:13.584058 \[ 1025 \] {} <Information> Application: starting up
2020.12.25 20:27:13.823630 \[ 1025 \] {} <Trace> Application: Will mlockall to prevent executable memory from being paged out. It may take a few seconds.
2020.12.25 20:27:14.690702 \[ 1025 \] {} <Trace> Application: The memory map of clickhouse executable has been mlock'ed
2020.12.25 20:27:14.691026 \[ 1025 \] {} <Debug> Application: rlimit on number of file descriptors is 500000
2020.12.25 20:27:14.691049 \[ 1025 \] {} <Debug> Application: Initializing DateLUT.
2020.12.25 20:27:14.691056 \[ 1025 \] {} <Trace> Application: Initialized DateLUT with time zone 'UTC'.
2020.12.25 20:27:14.691101 \[ 1025 \] {} <Debug> Application: Setting up /var/lib/clickhouse/tmp/ to store temporary data in it
2020.12.25 20:27:14.770070 \[ 1025 \] {} <Debug> Application: Configuration parameter 'interserver\_http\_host' doesn't exist or exists and empty. Will use 'clickhouse5992.novalocal' as replica host.
2020.12.25 20:27:14.771874 \[ 1025 \] {} <Debug> ConfigReloader: Loading config '/etc/clickhouse-server/users.xml'
2020.12.25 20:27:14.773718 \[ 1025 \] {} <Debug> ConfigReloader: Loaded config '/etc/clickhouse-server/users.xml', performing update on configuration
2020.12.25 20:27:14.774576 \[ 1025 \] {} <Debug> ConfigReloader: Loaded config '/etc/clickhouse-server/users.xml', performed update on configuration
2020.12.25 20:27:14.775142 \[ 1025 \] {} <Warning> Access(local directory): File /var/lib/clickhouse/access/users.list doesn't exist
2020.12.25 20:27:14.775180 \[ 1025 \] {} <Warning> Access(local directory): Recovering lists in directory /var/lib/clickhouse/access/
2020.12.25 20:27:14.775619 \[ 1025 \] {} <Information> Application: Uncompressed cache size was lowered to 1.85 GiB because the system has low amount of memory
2020.12.25 20:27:14.775701 \[ 1025 \] {} <Information> Application: Mark cache size was lowered to 1.85 GiB because the system has low amount of memory
2020.12.25 20:27:14.775850 \[ 1025 \] {} <Information> Application: Setting max\_server\_memory\_usage was set to 3.33 GiB (3/var/log/clickhouse-server/clickhouse-server.log
```

Redis
-----

Для получения логов необходимо подключиться по SSH и ввести следующую команду:

```
 \[admin@redis-4275 ~\]journalctl -u redis
```

Далее, ответом будут выведены логи:

```
\-- Logs begin at Mon 2021-01-11 15:45:47 UTC, end at Mon 2021-01-11 19:06:17 UTC. --
Jan 11 15:45:47 redis-4275.novalocal redis-server\[1440\]: 1440:S 11 Jan 2021 15:45:47.013 \* MASTER <-> REPLICA sync start
Jan 11 15:45:47 redis-4275.novalocal redis\[1440\]: MASTER <-> REPLICA sync started
Jan 11 15:45:47 redis-4275.novalocal redis\[1440\]: Non blocking connect for SYNC fired the event.
Jan 11 15:45:47 redis-4275.novalocal redis-server\[1440\]: 1440:S 11 Jan 2021 15:45:47.034 \* Non blocking connect for SYNC
Jan 11 15:45:47 redis-4275.novalocal redis\[1440\]: Error reply to PING from master: '-Reading from master: Resource tempo
Jan 11 15:45:47 redis-4275.novalocal redis-server\[1440\]: 1440:S 11 Jan 2021 15:45:47.050 # Error reply to PING from mast
Jan 11 15:45:48 redis-4275.novalocal redis\[1440\]: Connecting to MASTER 194.40.243.61:8886
Jan 11 15:45:48 redis-4275.novalocal redis-server\[1440\]: 1440:S 11 Jan 2021 15:45:48.016 \* Connecting to MASTER 194.40.2
Jan 11 15:45:48 redis-4275.novalocal redis-server\[1440\]: 1440:S 11 Jan 2021 15:45:48.016 \* MASTER <-> REPLICA sync start
Jan 11 15:45:48 redis-4275.novalocal redis\[1440\]: MASTER <-> REPLICA sync started
Jan 11 15:45:48 redis-4275.novalocal redis\[1440\]: Non blocking connect for SYNC fired the event.
Jan 11 15:45:48 redis-4275.novalocal redis-server\[1440\]: 1440:S 11 Jan 2021 15:45:48.035 \* Non blocking connect for SYNC
Jan 11 15:45:48 redis-4275.novalocal redis\[1440\]: Master replied to PING, replication can continue...
Jan 11 15:45:48 redis-4275.novalocal redis-server\[1440\]: 1440:S 11 Jan 2021 15:45:48.053 \* Master replied to PING, repli
Jan 11 15:45:48 redis-4275.novalocal redis\[1440\]: Partial resynchronization not possible (no cached master)
Jan 11 15:45:48 redis-4275.novalocal redis-server\[1440\]: 1440:S 11 Jan 2021 15:45:48.089 \* Partial resynchronization not
Jan 11 15:45:48 redis-4275.novalocal redis\[1440\]: Full resync from master: ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ:1
Jan 11 15:45:48 redis-4275.novalocal redis-server\[1440\]: 1440:S 11 Jan 2021 15:45:48.108 \* Full resync from master: ZZZZ
Jan 11 15:45:48 redis-4275.novalocal redis-server\[1440\]: 1440:S 11 Jan 2021 15:45:48.108 \* MASTER <-> REPLICA sync: rece
Jan 11 15:45:48 redis-4275.novalocal redis\[1440\]: MASTER <-> REPLICA sync: receiving 55648 bytes from master
Jan 11 15:45:48 redis-4275.novalocal redis\[1440\]: MASTER <-> REPLICA sync: Flushing old data
Jan 11 15:45:48 redis-4275.novalocal redis-server\[1440\]: 1440:S 11 Jan 2021 15:45:48.181 \* MASTER <-> REPLICA sync: Flus
Jan 11 15:45:48 redis-4275.novalocal redis-server\[1440\]: 1440:S 11 Jan 2021 15:45:48.182 \* MASTER <-> REPLICA sync: Load
Jan 11 15:45:48 redis-4275.novalocal redis-server\[1440\]: 1440:S 11 Jan 2021 15:45:48.182 # Wrong signature trying to loa
Jan 11 15:45:48 redis-4275.novalocal redis-server\[1440\]: 1440:S 11 Jan 2021 15:45:48.182 # Failed trying to load the MAS
Jan 11 15:45:48 redis-4275.novalocal redis\[1440\]: MASTER <-> REPLICA sync: Loading DB in memory
Jan 11 15:45:48 redis-4275.novalocal redis\[1440\]: Wrong signature trying to load DB from file
Jan 11 15:45:48 redis-4275.novalocal redis\[1440\]: Failed trying to load the MASTER synchronization DB from disk
lines 1-29
```

MongoBD
-------

Для получения логов необходимо подключиться по SSH и ввести следующую команду:

```
\[admin@mongodb-5604 ~\]$ journalctl -u mongod
```

Далее, ответом будут выведены логи:

```
\-- Logs begin at Thu 2020-12-31 03:20:03 UTC, end at Mon 2021-01-11 19:09:03 UTC. --
Dec 31 03:20:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:20:16.602+0000 I NETWORK  \[listener\] connection
Dec 31 03:20:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:20:16.602+0000 I NETWORK  \[conn49341\] received
Dec 31 03:20:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:20:16.605+0000 I NETWORK  \[listener\] connection
Dec 31 03:20:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:20:16.605+0000 I NETWORK  \[conn49342\] received
Dec 31 03:20:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:20:16.608+0000 I NETWORK  \[conn49341\] end conne
Dec 31 03:20:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:20:16.608+0000 I NETWORK  \[conn49342\] end conne
Dec 31 03:21:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:21:16.604+0000 I NETWORK  \[listener\] connection
Dec 31 03:21:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:21:16.605+0000 I NETWORK  \[conn49343\] received
Dec 31 03:21:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:21:16.606+0000 I NETWORK  \[listener\] connection
Dec 31 03:21:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:21:16.607+0000 I NETWORK  \[conn49344\] received
Dec 31 03:21:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:21:16.609+0000 I NETWORK  \[conn49343\] end conne
Dec 31 03:21:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:21:16.610+0000 I NETWORK  \[conn49344\] end conne
Dec 31 03:22:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:22:16.607+0000 I NETWORK  \[listener\] connection
Dec 31 03:22:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:22:16.608+0000 I NETWORK  \[conn49345\] received
Dec 31 03:22:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:22:16.609+0000 I NETWORK  \[listener\] connection
Dec 31 03:22:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:22:16.609+0000 I NETWORK  \[conn49346\] received
Dec 31 03:22:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:22:16.611+0000 I NETWORK  \[conn49345\] end conne
Dec 31 03:22:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:22:16.612+0000 I NETWORK  \[conn49346\] end conne
Dec 31 03:23:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:23:16.612+0000 I NETWORK  \[listener\] connection
Dec 31 03:23:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:23:16.613+0000 I NETWORK  \[conn49347\] received
Dec 31 03:23:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:23:16.613+0000 I NETWORK  \[listener\] connection
Dec 31 03:23:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:23:16.614+0000 I NETWORK  \[conn49348\] received
Dec 31 03:23:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:23:16.615+0000 I NETWORK  \[conn49347\] end conne
Dec 31 03:23:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:23:16.616+0000 I NETWORK  \[conn49348\] end conne
Dec 31 03:24:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:24:16.611+0000 I NETWORK  \[listener\] connection
Dec 31 03:24:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:24:16.611+0000 I NETWORK  \[conn49349\] received
Dec 31 03:24:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:24:16.612+0000 I NETWORK  \[listener\] connection
Dec 31 03:24:16 mongodb-5604.novalocal mongod.27017\[1718\]: 2020-12-31T03:24:16.613+0000 I NETWORK  \[conn49350\] received
lines 1-29
```

--