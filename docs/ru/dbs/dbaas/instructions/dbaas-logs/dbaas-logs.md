VK Cloud поддерживает логирование для инстансов БД:

- PostgreSQL / PostgresPro;
- MySQL;
- Redis;
- MongoDB;
- ClickHouse.

<warn>

Логи доступны только для инстансов БД, созданных после 1 декабря 2020 года.

</warn>

Чтобы вывести логи БД:

1. [Подключитесь к ВМ](/ru/base/iaas/instructions/vm/vm-connect/vm-connect-nix) по SSH под учетной записью `admin`.

   <info>

   При кластерной конфигурации подключитесь к ВМ типа `Master`.

   </info>

1. Введите команду отображения логов в зависимости от типа СУБД:

   <tabs>
   <tablist>
   <tab>PostgreSQL / PostgresPro</tab>
   <tab>MySQL</tab>
   <tab>Redis</tab>
   <tab>MongoDB</tab>
   <tab>ClickHouse</tab>
   </tablist>
   <tabpanel>

   ```bash
   journalctl -u postgresql
   ```

   <details>
    <summary>Пример вывода</summary>

   ```bash
   -- Logs begin at Wed 2023-07-12 10:04:48 UTC, end at Wed 2023-07-12 10:32:29 UTC. --
   Jul 12 10:04:55 by-postgresql-4429.novalocal systemd[1]: Starting PostgreSQL 14 database server...
   Jul 12 10:04:55 by-postgresql-4429.novalocal postmaster[994]: 2023-07-12 10:04:55.350 UTC [994] LOG:  redirecting log output to logging collector process
   Jul 12 10:04:55 by-postgresql-4429.novalocal postmaster[994]: 2023-07-12 10:04:55.350 UTC [994] HINT:  Future log output will appear in directory "log".
   Jul 12 10:04:55 by-postgresql-4429.novalocal systemd[1]: Started PostgreSQL 14 database server.
   Jul 12 10:05:32 by-postgresql-4429.novalocal systemd[1]: Stopping PostgreSQL 14 database server...
   Jul 12 10:05:32 by-postgresql-4429.novalocal systemd[1]: postgresql.service: Succeeded.
   Jul 12 10:05:32 by-postgresql-4429.novalocal systemd[1]: Stopped PostgreSQL 14 database server.
   Jul 12 10:05:46 by-postgresql-4429.novalocal systemd[1]: Starting PostgreSQL 14 database server...
   Jul 12 10:05:46 by-postgresql-4429.novalocal postmaster[1847]: 2023-07-12 10:05:46.505 GMT [1847] LOG:  starting PostgreSQL 14.8 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 8.5.0 20210514 (Red Hat 8.5>
   Jul 12 10:05:46 by-postgresql-4429.novalocal postmaster[1847]: 2023-07-12 10:05:46.505 GMT [1847] LOG:  listening on IPv4 address "0.0.0.0", port 5432
   Jul 12 10:05:46 by-postgresql-4429.novalocal postmaster[1847]: 2023-07-12 10:05:46.505 GMT [1847] LOG:  listening on IPv6 address "::", port 5432
   Jul 12 10:05:46 by-postgresql-4429.novalocal postmaster[1847]: 2023-07-12 10:05:46.510 GMT [1847] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
   Jul 12 10:05:46 by-postgresql-4429.novalocal postmaster[1848]: 2023-07-12 10:05:46.522 GMT [1848] LOG:  database system was shut down at 2023-07-12 10:05:32 GMT
   Jul 12 10:05:46 by-postgresql-4429.novalocal postmaster[1847]: 2023-07-12 10:05:46.565 GMT [1847] LOG:  database system is ready to accept connections
   Jul 12 10:05:46 by-postgresql-4429.novalocal systemd[1]: Started PostgreSQL 14 database server.
   ```

   </details>

   </tabpanel>
   <tabpanel>

   ```bash
   journalctl -u mysqld
   ```

   <details>
    <summary>Пример вывода</summary>

   ```bash
   -- Logs begin at Wed 2023-07-12 10:44:42 UTC, end at Wed 2023-07-12 10:46:52 UTC. --
   Jul 12 10:44:48 by-mysql-4691.novalocal systemd[1]: Starting MySQL Server...
   Jul 12 10:45:20 by-mysql-4691.novalocal mysqld_pre_systemd[1225]: 2023-07-12T10:45:20.775688Z 0 [System] [MY-013169] [Server] /usr/sbin/mysqld (mysqld 8.0.26) initializing of server in progress as proce>
   Jul 12 10:45:20 by-mysql-4691.novalocal mysqld_pre_systemd[1225]: 2023-07-12T10:45:20.820334Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
   Jul 12 10:45:21 by-mysql-4691.novalocal mysqld_pre_systemd[1225]: 2023-07-12T10:45:21.964529Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
   Jul 12 10:45:24 by-mysql-4691.novalocal mysqld_pre_systemd[1225]: 2023-07-12T10:45:24.148187Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1 is enabled for channel mysql_main
   Jul 12 10:45:24 by-mysql-4691.novalocal mysqld_pre_systemd[1225]: 2023-07-12T10:45:24.148576Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1.1 is enabled for channel mysql_main
   Jul 12 10:45:24 by-mysql-4691.novalocal mysqld_pre_systemd[1225]: 2023-07-12T10:45:24.260630Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: V9Gh)CQOvMCr
   Jul 12 10:45:30 by-mysql-4691.novalocal sudo[1274]:     root : TTY=unknown ; PWD=/ ; USER=root ; COMMAND=/usr/bin/cloud-init status --wait
   Jul 12 10:45:30 by-mysql-4691.novalocal sudo[1274]: pam_unix(sudo:session): session opened for user root by (uid=0)
   Jul 12 10:45:30 by-mysql-4691.novalocal sudo[1274]: pam_unix(sudo:session): session closed for user root
   Jul 12 10:45:30 by-mysql-4691.novalocal mysqld[1284]: 2023-07-12T10:45:30.957682Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.0.26) starting as process 1284
   Jul 12 10:45:30 by-mysql-4691.novalocal mysqld[1284]: 2023-07-12T10:45:30.982071Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
   Jul 12 10:45:31 by-mysql-4691.novalocal mysqld[1284]: 2023-07-12T10:45:31.476840Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
   Jul 12 10:45:31 by-mysql-4691.novalocal mysqld[1284]: 2023-07-12T10:45:31.874610Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1 is enabled for channel mysql_main
   Jul 12 10:45:31 by-mysql-4691.novalocal mysqld[1284]: 2023-07-12T10:45:31.874757Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1.1 is enabled for channel mysql_main
   Jul 12 10:45:31 by-mysql-4691.novalocal mysqld[1284]: 2023-07-12T10:45:31.875883Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
   Jul 12 10:45:31 by-mysql-4691.novalocal mysqld[1284]: 2023-07-12T10:45:31.876062Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported fo>
   Jul 12 10:45:31 by-mysql-4691.novalocal mysqld[1284]: 2023-07-12T10:45:31.903615Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.26'  socket: '/var/lib/mysql/mysq>
   Jul 12 10:45:31 by-mysql-4691.novalocal mysqld[1284]: 2023-07-12T10:45:31.903758Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Bind-address: '::' port: 33060, socket: /var/run/mysqld/>
   Jul 12 10:45:31 by-mysql-4691.novalocal systemd[1]: Started MySQL Server.
   Jul 12 10:45:32 by-mysql-4691.novalocal systemd[1]: Stopping MySQL Server...
   Jul 12 10:45:32 by-mysql-4691.novalocal mysqld[1284]: 2023-07-12T10:45:32.122896Z 0 [System] [MY-013172] [Server] Received SHUTDOWN from user <via user signal>. Shutting down mysqld (Version: 8.0.26).
   Jul 12 10:45:33 by-mysql-4691.novalocal mysqld[1284]: 2023-07-12T10:45:33.486543Z 0 [System] [MY-010910] [Server] /usr/sbin/mysqld: Shutdown complete (mysqld 8.0.26)  MySQL Community Server - GPL.
   Jul 12 10:45:33 by-mysql-4691.novalocal systemd[1]: mysqld.service: Succeeded.
   Jul 12 10:45:33 by-mysql-4691.novalocal systemd[1]: Stopped MySQL Server.
   Jul 12 10:45:40 by-mysql-4691.novalocal systemd[1]: Starting MySQL Server...
   Jul 12 10:45:42 by-mysql-4691.novalocal sudo[1557]:     root : TTY=unknown ; PWD=/ ; USER=root ; COMMAND=/usr/bin/cloud-init status --wait
   Jul 12 10:45:42 by-mysql-4691.novalocal sudo[1557]: pam_unix(sudo:session): session opened for user root by (uid=0)
   ```

   </details>

   </tabpanel>
   <tabpanel>

   ```bash
   journalctl -u redis
   ```

   <details>
    <summary>Пример вывода</summary>

   ```bash
   -- Logs begin at Wed 2023-07-12 10:54:08 UTC, end at Wed 2023-07-12 11:16:13 UTC. --
   Jul 12 10:54:11 by-redis-8145.novalocal systemd[1]: Starting Redis persistent key-value database...
   Jul 12 10:54:11 by-redis-8145.novalocal systemd[1]: Started Redis persistent key-value database.
   Jul 12 10:54:33 by-redis-8145.novalocal systemd[1]: Stopping Redis persistent key-value database...
   Jul 12 10:54:33 by-redis-8145.novalocal systemd[1]: redis.service: Succeeded.
   Jul 12 10:54:33 by-redis-8145.novalocal systemd[1]: Stopped Redis persistent key-value database.
   Jul 12 10:54:33 by-redis-8145.novalocal systemd[1]: Starting Redis persistent key-value database...
   Jul 12 10:54:33 by-redis-8145.novalocal redis-server[1355]: 1355:C 12 Jul 2023 10:54:33.384 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
   Jul 12 10:54:33 by-redis-8145.novalocal redis-server[1355]: 1355:C 12 Jul 2023 10:54:33.384 # Redis version=5.0.3, bits=64, commit=00000000, modified=0, pid=1355, just started
   Jul 12 10:54:33 by-redis-8145.novalocal redis-server[1355]: 1355:C 12 Jul 2023 10:54:33.384 # Configuration loaded
   Jul 12 10:54:33 by-redis-8145.novalocal redis-server[1355]: 1355:C 12 Jul 2023 10:54:33.384 * supervised by systemd, will signal readiness
   Jul 12 10:54:33 by-redis-8145.novalocal redis-server[1355]: oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
   Jul 12 10:54:33 by-redis-8145.novalocal redis-server[1355]: Redis version=5.0.3, bits=64, commit=00000000, modified=0, pid=1355, just started
   Jul 12 10:54:33 by-redis-8145.novalocal redis-server[1355]: Configuration loaded
   Jul 12 10:54:33 by-redis-8145.novalocal redis-server[1355]: supervised by systemd, will signal readiness
   Jul 12 10:54:33 by-redis-8145.novalocal systemd[1]: Started Redis persistent key-value database.
   Jul 12 10:54:33 by-redis-8145.novalocal redis[1355]: Running mode=standalone, port=6379.
   Jul 12 10:54:33 by-redis-8145.novalocal redis-server[1355]: 1355:M 12 Jul 2023 10:54:33.385 * Running mode=standalone, port=6379.
   Jul 12 10:54:33 by-redis-8145.novalocal redis-server[1355]: 1355:M 12 Jul 2023 10:54:33.385 # Server initialized
   ```

   </details>

   </tabpanel>
   <tabpanel>

   ```bash
   journalctl -u mongod
   ```

   <details>
    <summary>Пример вывода</summary>

   ```bash
   -- Logs begin at Wed 2023-07-12 11:23:00 UTC, end at Wed 2023-07-12 11:36:53 UTC. --
   Jul 12 11:23:07 by-mongodb-2687.novalocal systemd[1]: Starting High-performance, schema-free document-oriented database...
   Jul 12 11:23:07 by-mongodb-2687.novalocal sudo[984]:     root : TTY=unknown ; PWD=/ ; USER=root ; COMMAND=/usr/bin/cloud-init status --wait
   Jul 12 11:23:07 by-mongodb-2687.novalocal sudo[984]: pam_unix(sudo:session): session opened for user root by (uid=0)
   Jul 12 11:23:09 by-mongodb-2687.novalocal sudo[984]: pam_unix(sudo:session): session closed for user root
   Jul 12 11:23:09 by-mongodb-2687.novalocal systemd[1]: Started High-performance, schema-free document-oriented database.
   Jul 12 11:23:09 by-mongodb-2687.novalocal mongod.27017[1049]: 2023-07-12T11:23:09.719+0000 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
   Jul 12 11:23:10 by-mongodb-2687.novalocal mongod.27017[1049]: 2023-07-12T11:23:10.644+0000 I CONTROL  [initandlisten] MongoDB starting : pid=1049 port=27017 dbpath=/var/lib/mongodb 64-bit host=by-mongod>
   Jul 12 11:23:10 by-mongodb-2687.novalocal mongod.27017[1049]: 2023-07-12T11:23:10.644+0000 I CONTROL  [initandlisten] db version v4.0.28
   Jul 12 11:23:10 by-mongodb-2687.novalocal mongod.27017[1049]: 2023-07-12T11:23:10.644+0000 I CONTROL  [initandlisten] git version: af1a9dc12adcfa83cc19571cb3faba26eeddac92
   Jul 12 11:23:10 by-mongodb-2687.novalocal mongod.27017[1049]: 2023-07-12T11:23:10.644+0000 I CONTROL  [initandlisten] OpenSSL version: OpenSSL 1.1.1k  FIPS 25 Mar 2021
   Jul 12 11:23:10 by-mongodb-2687.novalocal mongod.27017[1049]: 2023-07-12T11:23:10.644+0000 I CONTROL  [initandlisten] allocator: tcmalloc
   Jul 12 11:23:10 by-mongodb-2687.novalocal mongod.27017[1049]: 2023-07-12T11:23:10.644+0000 I CONTROL  [initandlisten] modules: none
   Jul 12 11:23:10 by-mongodb-2687.novalocal mongod.27017[1049]: 2023-07-12T11:23:10.644+0000 I CONTROL  [initandlisten] build environment:
   Jul 12 11:23:10 by-mongodb-2687.novalocal mongod.27017[1049]: 2023-07-12T11:23:10.644+0000 I CONTROL  [initandlisten]     distmod: rhel80
   Jul 12 11:23:10 by-mongodb-2687.novalocal mongod.27017[1049]: 2023-07-12T11:23:10.644+0000 I CONTROL  [initandlisten]     distarch: x86_64
   Jul 12 11:23:10 by-mongodb-2687.novalocal mongod.27017[1049]: 2023-07-12T11:23:10.644+0000 I CONTROL  [initandlisten]     target_arch: x86_64
   Jul 12 11:23:10 by-mongodb-2687.novalocal mongod.27017[1049]: 2023-07-12T11:23:10.644+0000 I CONTROL  [initandlisten] options: { config: "/etc/mongod.conf", net: { bindIp: "127.0.0.1", port: 27017 }, pr>
   Jul 12 11:23:10 by-mongodb-2687.novalocal mongod.27017[1049]: 2023-07-12T11:23:10.645+0000 I STORAGE  [initandlisten] wiredtiger_open config: create,cache_size=3464M,cache_overflow=(file_max=0M),session>
   Jul 12 11:23:11 by-mongodb-2687.novalocal mongod.27017[1049]: 2023-07-12T11:23:11.487+0000 I STORAGE  [initandlisten] WiredTiger message [1689160991:487904][1049:0x7fb4fe25eb40], txn-recover: Set global>
   Jul 12 11:23:11 by-mongodb-2687.novalocal mongod.27017[1049]: 2023-07-12T11:23:11.503+0000 I RECOVERY [initandlisten] WiredTiger recoveryTimestamp. Ts: Timestamp(0, 0)
   Jul 12 11:23:11 by-mongodb-2687.novalocal mongod.27017[1049]: 2023-07-12T11:23:11.528+0000 I STORAGE  [initandlisten] Starting to check the table logging settings for existing WiredTiger tables
   ```

   </details>

   </tabpanel>
   <tabpanel>

   ```bash
   journalctl -u clickhouse-server
   ```

   <details>
    <summary>Пример вывода</summary>

   ```bash
   -- Logs begin at Tue 2023-09-12 07:16:05 UTC, end at Tue 2023-09-12 10:17:56 UTC. --
   Sep 12 07:16:14 clickhouse4030.novalocal systemd[1]: Starting ClickHouse Server (analytic DBMS for big data)...
   Sep 12 07:16:15 clickhouse4030.novalocal cloud-init[978]: .....
   Sep 12 07:16:15 clickhouse4030.novalocal cloud-init[978]: status: done
   Sep 12 07:16:15 clickhouse4030.novalocal systemd[1]: Started ClickHouse Server (analytic DBMS for big data).
   Sep 12 07:16:17 clickhouse4030.novalocal clickhouse-server[1023]: Processing configuration file '/etc/clickhouse-server>
   Sep 12 07:16:17 clickhouse4030.novalocal clickhouse-server[1023]: Logging trace to /var/log/clickhouse-server/clickhous>
   Sep 12 07:16:17 clickhouse4030.novalocal clickhouse-server[1023]: Logging errors to /var/log/clickhouse-server/clickhou>
   Sep 12 07:16:18 clickhouse4030.novalocal clickhouse-server[1052]: Processing configuration file '/etc/clickhouse-server>
   Sep 12 07:16:18 clickhouse4030.novalocal clickhouse-server[1052]: Saved preprocessed configuration to '/var/lib/clickho>
   Sep 12 07:16:18 clickhouse4030.novalocal clickhouse-server[1052]: Processing configuration file '/etc/clickhouse-server>
   Sep 12 07:16:18 clickhouse4030.novalocal clickhouse-server[1052]: Saved preprocessed configuration to '/var/lib/clickho>
   Sep 12 07:16:40 clickhouse4030.novalocal systemd[1]: Stopping ClickHouse Server (analytic DBMS for big data)...
   Sep 12 07:16:44 clickhouse4030.novalocal systemd[1]: clickhouse-server.service: Succeeded.
   Sep 12 07:16:44 clickhouse4030.novalocal systemd[1]: Stopped ClickHouse Server (analytic DBMS for big data).
   Sep 12 07:16:48 clickhouse4030.novalocal systemd[1]: Starting ClickHouse Server (analytic DBMS for big data)...
   Sep 12 07:16:49 clickhouse4030.novalocal cloud-init[1502]: status: done
   Sep 12 07:16:49 clickhouse4030.novalocal systemd[1]: Started ClickHouse Server (analytic DBMS for big data).
   Sep 12 07:16:49 clickhouse4030.novalocal clickhouse-server[1509]: Processing configuration file '/etc/clickhouse-server>
   Sep 12 07:16:49 clickhouse4030.novalocal clickhouse-server[1509]: Logging information to /var/log/clickhouse-server/cli>
   Sep 12 07:16:49 clickhouse4030.novalocal clickhouse-server[1509]: Logging errors to /var/log/clickhouse-server/clickhou>
   Sep 12 08:42:56 clickhouse4030.novalocal systemd[1]: Stopping ClickHouse Server (analytic DBMS for big data)...
   Sep 12 08:42:57 clickhouse4030.novalocal systemd[1]: clickhouse-server.service: Succeeded.
   Sep 12 08:42:57 clickhouse4030.novalocal systemd[1]: Stopped ClickHouse Server (analytic DBMS for big data).
   Sep 12 08:42:57 clickhouse4030.novalocal systemd[1]: Starting ClickHouse Server (analytic DBMS for big data)...
   Sep 12 08:42:58 clickhouse4030.novalocal cloud-init[3661]: status: done
   Sep 12 08:42:58 clickhouse4030.novalocal systemd[1]: Started ClickHouse Server (analytic DBMS for big data).
   Sep 12 08:42:58 clickhouse4030.novalocal clickhouse-server[3666]: Processing configuration file '/etc/clickhouse-server>
   Sep 12 08:42:58 clickhouse4030.novalocal clickhouse-server[3666]: Logging information to /var/log/clickhouse-server/cli>
   ```

   </details>

   </tabpanel>
   </tabs>
