Zabbix is software for monitoring applications, servers, and network devices.

To monitor database cluster instances, you can use the Zabbix monitoring system. This section does not include information about deploying the Zabbix monitoring server. It contains information about additionally installed components that extend the capabilities of the server and monitoring agents. It is assumed that you will install and configure the client part of the Zabbix agent monitoring system on DB cluster instances yourself.

Numerous pre-installed templates developed for Zabbix allow you to get information about the status of many services. The solutions are compatible with Zabbix versions 3.4 and higher.

## User parameters

- server (required parameter) — the IP address or name of the Zabbix monitoring server.
- listen_port (default: 10050) — Zabbix agent port for passive checks.
- server_port (default: 10051) — Zabbix server port for active checks.
- b64_pkcs12_container (default: none) — a file in PKS#12 format without a password converted to base4 containing the certificate of the certification authority, the private key, and the Zabbix agent certificate.
- psk (default: none) — secret key (Pre Shared Key).
- zabbix_agent_version (default: 3.4) — Zabbix agent version (possible values 3.4 or 5.0). The parameter is available for PostgreSQL and PostgreSQL Pro.
- hostname — the name of the host (case sensitive) to display on the Zabbix server. Valid characters: Latin lowercase, uppercase, numbers and symbols: '.', ' ', '_', '-'. By default, the name of the VM instance of the DBMS. Do not use DBMS for clusters.

## PostgreSQL monitoring

- server (required parameter) — the IP address or name of the Zabbix monitoring server.
- listen_port (default: 10050) — Zabbix agent port for passive checks.
- server_port (default: 10051) — Zabbix server port for active checks.
- b64_pkcs12_container (default: none) — a file in PKS#12 format without a password converted to base4 containing the certificate of the certification authority, the private key, and the Zabbix agent certificate.
- psk (default: none) — secret key (Pre Shared Key).
- zabbix_agent_version (default: 3.4) — Zabbix agent version. Possible values are 3.4 and 5.0. For PostgreSQL and PostgreSQL Pro, 5.0v2 is also available — for installing Zabbix Agent 2.
- hostname — the name of the host (case sensitive) to display on the Zabbix server. Valid characters: Latin lowercase, uppercase, numbers and symbols: '.', ' ', '_', '-'. By default, the name of the VM instance of the DBMS. Do not use DBMS for clusters.

## PostgreSQL monitoring

When installing agent version 3.4 on the Zabbix server, the template [pg_monz](https://www.google.com/url?q=https://github.com/pg-monz/pg_monz/blob/master/README-en.md&sa=D&source=docs&ust=1635767629305000&usg=AOvVaw3-3XfumQyub6xvlkGtZvjE) should be installed. To do this, you need to [unpack the archive](https://github.com/pg-monz/pg_monz/archive/refs/tags/2.2.tar.gz) and import the template from the directory `/pg_monz-2.2/pg_monz/template/` on the Zabbix server. At the same time, the template does not need to be configured.

For Agent version 5.0, the Zabbix template of the PostgreSQL Agent server should be used. At the same time, no template configuration is required.

For Agent version 5.0v2, the Zabbix template of the PostgreSQL Agent 2 server should be used.

In the template settings, you should set:

- PG.URI — tcp://127.0.0.1:5432;
- PG.DB — postgres.

## MySQL Monitoring

Installing the Zabbix Agent extension for ClickHouse allows you to collect the metrics listed below:

| Metric| Description|
|-------------------------|---------------------------------------------------------------------------------|
| mysql status | Version, ID, status, continuous operation time.                     |
| connections status | Communication errors and interrupted connections.                                           |
| traffic | Received/sent, bytes per second.                                            |
| temporary objects usage | Using temporary files, tables, and tables on disks.                      |
| keys usage | Number of records, reads, usage of blocks, and MyISAM cache.                 |
| operations count | Operations per second for begin, commit, delete, insert, rollback, select, and update. |
| queries | Number of requests per second and slow requests.                             |
| table locks | The number of immediate and expected table locks.                           |
| threads count | The number of running, created connected and cached threads.           |

When selecting Zabbix agent version 3.4, the components of the template [mysbix](https://github.com/sergiotocalini/mysbix) are installed.

To start using [import](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) [this template](https://raw.githubusercontent.com/sergiotocalini/mysbix/master/zbx3.4_template_db_mysql.xml).

<warn>

In some versions of the Zabbix server, a template with the same name may already be installed. We recommend changing the template name in the XML file to a unique one before importing to avoid collisions.

When choosing the agent version v.5.0, use the template [Template DB MySQL by Zabbix agent](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/db/mysql_agent?at=refs%2Fheads%2Frelease%2F5.0) preinstalled on Zabbix server version 5.0 and higher.

</warn>

## Galera Monitoring

To monitor Galera, the template components [zabbix-galera-template](https://github.com/MogiePete/zabbix-galera-template) are installed together with Zabbix agent version 3.4, which allows you to collect the metrics listed below:

| Metric| Description |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| cluster information | cluster id, number of members |
| cluster member status | ready, cluster connection status, EVS protocol status, group communication ID, last transaction number |
| cluster member performance | control flow events and request queue status |
| replication counters | quantitative indicators of replicated data and keys |

To start using, [import](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) [this template](https://raw.githubusercontent.com/MogiePete/zabbix-galera-template/master/App-Galera_Cluster.xml).

## MongoDB Monitoring

Installing the Zabbix agent extension for ClickHouse allows you to collect the metrics listed below:

|Metric|Description|
|----------------------|---------------------------------------------------------------------------------------------------------------------------|
| db status | Ready, connection status.                                                                                        |
| operations count | Commands, inserts, deletes, requests per second.                                                                            |
| storage engine cache | Using the storage cache.                                                                                             |
| network usage | Network activity indicators.                                                                                            |
| memory usage | Memory usage.                                                                                                     |
| per db metrics | Average size and number of objects, number of collections, amount of data, number and size of indexes, storage size. |

When selecting Zabbix agent version 3.4, the components of the template [zabbix-mongodb](https://github.com/omni-lchen/zabbix-mongodb) are installed.

To start using [import](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) [this template](https://raw.githubusercontent.com/omni-lchen/zabbix-mongodb/master/Templates/Template_MongoDB.xml).

When selecting Zabbix agent version 5.0, a second generation agent will be installed that supports the template [Template DB MongoDB node by Zabbix Agent 2](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/db/mongodb/template_db_mongodb.xml?at=refs%2Fheads%2Frelease%2F5.0) preinstalled on Zabbix server version 5.0 and higher. Set the macro value “{$MONGODB.CONNSTRING}” to “mcs_mongodb" for authorization on the monitored host.

## Clickhouse Monitoring

Installing the Zabbix Agent extension for ClickHouse allows you to collect the metrics listed below:

|Metric|Description|
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| db status | Ready, connection status.                                                                                                              |
| operations count | Inserts\rows per second, requests per second.                                                                                                    |
| query | The number of current queries, the maximum execution time of current queries, the number of processed queries and inserts, and delays during inserts. |
| merge | Merges of uncompressed bytes and merges of strings per second.                                                                                                |
| replication | Memory usage for replication, lag, number of replication tasks in the queue.                                                                |
| memory usage | Memory usage for background merges, mutations, deliveries.                                                                                    |

When selecting the zabbix agent version 3.4, the template components [clickhouse-zabbix-template](https://www.google.com/url?q=https://github.com/Altinity/clickhouse-zabbix-template/&sa=D&source=docs&ust=1635766525505000&usg=AOvVaw1EbWUEyfblJ3WnlZpK9shE) are installed.

To start using [import](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) [this template](https://raw.githubusercontent.com/Altinity/clickhouse-zabbix-template/master/zbx_clickhouse_template.xml).

If your Zabbix server is version 5.0 or higher, use the built-in template [Template DB ClickHouse by HTTP](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/db/clickhouse_http?at=refs%2Fheads%2Frelease%2F5.0).

When installing the extension, specify the parameters:

- source_ip_addresses — to specify allowed addresses, to connect to clickhouse-server via HTTP in a format similar to the permission settings [cllickhouse users](https://clickhouse.com/docs/ru/operations/settings/settings-users/#user-namenetworks) (comma delimiter).
- zabbix_clickhouse_password — to use the value in the macro “{$CLICKHOUSE.PASSWORD}”
- mcs_user — for the macro {$CLICKHOUSE.USER}.

## Redis Monitoring

Installing the Zabbix agent extension for Redis allows you to collect the metrics listed below:

|Metrics|Description|
|--------------------|---------------------------------------------------------------------------------------------------------------------------------|
| command statistics | Statistics by teams: number, delay.                                                                                   |
| clients | connection statistics: the number of connections per second, blocked, maximum buffer, and maximum client output. |
| performance | Memory and PROCESSOR usage.                                                                                              |
| keys | Key counters, and statistics related to the database.                                                                         |
| replication | Replication status.                                                                                                           |
| slowlog | Information about slow requests.                                                                                                |

To monitor the Redis Zabbix agent version 3.4, the components of the template [zabbix-redis-template](https://github.com/pavelnemirovsky/zabbix-redis-template) are installed.

To start using [import](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) [this template](https://raw.githubusercontent.com/pavelnemirovsky/zabbix-redis-template/master/zbx_template/zbx_export_templates.xml).

When selecting Zabbix agent version 5.0, a second-generation agent will be installed that supports the template [Template DB Redis](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/db/redis?at=release/5.0) preinstalled on zabbix-server v5.0 and higher.

## Example of a scenario for connecting instances to a monitoring server

1. Ensure network connectivity of the instance and the monitoring server by ports for active and passive checks ([more here](https://www.zabbix.com/documentation/current/ru/manual/appendix/items/activepassive)).
2. Decide on the encryption method of the transmitted data (without encryption, TLS, or PSK). When installing the Zabbix agent, you can choose both methods of connection protection, in this case, during operation, the encryption method can be changed by changing the connection configuration only on the server ([more here](https://www.zabbix.com/documentation/current/ru/manual/encryption)).
3. Install the Zabbix agent on an instance or all cluster instances with the desired user parameters.
4. Connect the instances to the Zabbix server in the Configuration -> Hosts -> Create Hosts section ([more details here](https://www.zabbix.com/documentation/5.4/ru/manual/config/hosts/host)).

<warn>

Use the short instance name (hostname -s) for the value of the Hostname, and PSK identity fields (if PSK is used).

5. Assign the monitoring template(s) for the instance or for the group that the instance belongs to ([more details here](https://www.zabbix.com/documentation/5.4/ru/manual/config/templates/linking)).
6. After 10 minutes, make sure that the data from the agent arrives on the server in the Monitoring -> Latest Data section by filtering the content by instance name. You can view historical information on metrics in the same place — in the last column.

</warn>
