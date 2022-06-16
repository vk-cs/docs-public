
Zabbix is a monitoring software for applications, servers and network devices.

Numerous preset templates allow you to get information about the status of many services. It describes additionally installed plug-ins that expand the capabilities of the monitoring server. The solutions are compatible with Zabbix versions 3.4 and higher.

The Zabbix extension is installed on the Extensions tab of the database instance card:

![](./assets/helpjuice_production-2fuploads-2fupload-2fimage-2f7055-2fdirect-2f1621916935129-1621916935129.png)

## An example script for connecting instances to a monitoring server

1. Provide network connectivity between the instance and the monitoring server by ports for active and passive checks ([details here](https://www.zabbix.com/documentation/current/ru/manual/appendix/items/activepassive)).
2.  Decide on the method of encrypting the transmitted data (no encryption, TLS or PSK). When installing Zabbix agent, you can choose both connection security methods, in this case, during operation, the encryption method can be changed by changing the connection configuration only on the server ([more details here](https://www.zabbix.com/documentation/current/ru/manual/encryption)).
3.  Install and configure Zabbix agent on cluster instances.
4. Connect the instances to the Zabbix server in the Configuration -> Hosts -> Create Hosts section ([more details here](https://www.zabbix.com/documentation/5.4/ru/manual/config/hosts/host)).

<warn>

Use the short name of the instance (hostname -s) for the value of the Host name, PSK identity fields (if using PSK).

</warn>

5.  Assign the monitoring template(s) to the instance or to the group that the instance belongs to ([more info here](https://www.zabbix.com/documentation/5.4/ru/manual/config/templates/linking))
6.  After 10 minutes, verify that data from the agent is coming to the server under Monitoring -> Latest Data by filtering the content by instance name. You can view historical information on metrics in the same place - in the last column.

## Custom options

- server* — ip address or name of the Zabbix monitoring server.
- listen_port (default: 10050) — Zabbix agent port for passive checks.
- server_port (default: 10051) — Zabbix server port for active checks.
- b64_pkcs12_container (default: none) - a file in PKS#12 format without a password converted to base4 containing a certificate of a certification authority, a private key and a Zabbix agent certificate.
- psk (default: none) - secret key (Pre Shared Key).
- zabbix_agent_version (default: 3.4) — Zabbix agent version (possible values ​​3.4 or 5.0). The option is available for "PostgreSQL" and "PostgreSQL Pro".

You can add your parameters and their values ​​on the add Zabbix extension card:

![](./assets/helpjuice_production-2fuploads-2fupload-2fimage-2f7055-2fdirect-2f1621916984681-1621916984681.png)

## PostgreSQL monitoring

To monitor "PostgreSQL" and "PostgreSQL Pro", along with Zabbix agent version 3.4, components of the pg_monz template are installed, and version 5.0 is configured to use the "PostgreSQL" template preinstalled on the Zabbix server version 5.0 and higher.

<warn>

Installing an extension on a replica is only possible if it is installed on the master.

</warn>

## PostgreSQL monitoring

When installing agent version 3.4 on Zabbix server, you must install the template[pg_monz](https://www.google.com/url?q=https://github.com/pg-monz/pg_monz/blob/master/README-en.md&sa=D&source=docs&ust=1635767629305000&usg=AOvVaw3-3XfumQyub6xvlkGtZvjE). To do this, you need to [unzip the archive](https://github.com/pg-monz/pg_monz/archive/refs/tags/2.2.tar.gz)and import the template from the `/pg_monz-2.2/pg_monz/template/` directory on the Zabbix server. In this case, the template does not need to be customized.

For agent version 5.0, you should use the Zabbix template of the PosgreSQL Agent server. It does not require customization of the template.

For agent version 5.0v2, you should use the Zabbix template of the PosgreSQL Agent 2 server.

In the template settings you should set:

- PG.URI - tcp://127.0.0.1:5432;
- PG.DB - postgres.

## MySQL monitoring

Installing the Zabbix Agent extension for ClickHouse allows you to collect the following metrics:

<table style="border: none; border-collapse: collapse; margin-left: calc(0%); width: 100%;"><tbody><tr><td><p dir="ltr">mysql status</p></td><td><p dir="ltr">Version, ID, Status, Continuous Uptime.</p></td></tr><tr><td><p dir="ltr"><span>connections status</span></p></td><td><p dir="ltr">Communication errors and broken connections.</p></td></tr><tr><td><p dir="ltr">traffic</p></td><td><p dir="ltr">Received/sent, bytes per second.</p></td></tr><tr><td><p dir="ltr">temporary objects usage</p></td><td><p dir="ltr">Using temporary files, tables and tables on disks.</p></td></tr><tr><td><p dir="ltr">keys usage</p></td><td><p dir="ltr">Number of writes, reads, blocks and cache usage MyISAM.</p></td></tr><tr><td><p dir="ltr">operations count</p></td><td><p dir="ltr">Operations per second for begin, commit, delete, insert, rollback, select, update.</p></td></tr><tr><td><p dir="ltr">queries</p></td><td><p dir="ltr">The number of requests per second and slow requests.</p></td></tr><tr><td><p dir="ltr">table locks</p></td><td><p dir="ltr">Number of immediate and pending table locks.</p></td></tr><tr><td><p dir="ltr">threads count</p></td><td><p dir="ltr">Number of running, created connected and cached threads.</p></td></tr></tbody></table>

When choosing Zabbix agent version 3.4, template components are installed [mysbix](https://github.com/sergiotocalini/mysbix).

To get started [import](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) template [https://raw.githubusercontent.com/sergiotocalini/mysbix/master/zbx3.4_template_db_mysql.xml](https://raw.githubusercontent.com/sergiotocalini/mysbix/master/zbx3.4_template_db_mysql.xml).

<warn>

In some versions of Zabbix server, a template with the same name may already be installed. We recommend that you change the template name in the xml file to a unique one before importing to avoid collisions.

When choosing the v.5.0 agent version, use the template [Template DB MySQL by Zabbix agent](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/db/mysql_agent?at=refs%2Fheads%2Freelease%2F5.0) pre-installed on Zabbix server version 5.0 and higher.

</warn>

## Monitoring Galera

To monitor Galera, along with Zabbix agent version 3.4, the [zabbix-galera-template](https://github.com/MogiePete/zabbix-galera-template) template components are installed, which allows you to collect the following metrics:

<table border="1" cellpadding="0" cellspacing="0" width="523"><tbody><tr><td valign="bottom" width="34.41682600382409%"><p>cluster information</p></td><td valign="bottom" width="65.5831739961759%"><p>cluster ID, number of members</p></td></tr><tr><td valign="bottom" width="34.41682600382409%"><p>cluster member status</p></td><td valign="bottom" width="65.5831739961759%"><p>ready, cluster connection status, EVS protocol status, group connection ID, last transaction number</p></td></tr><tr><td valign="bottom" width="34.41682600382409%"><p>cluster member performance</p></td><td valign="bottom" width="65.5831739961759%"><p>control flow events and state of request queues</p></td></tr><tr><td valign="bottom" width="34.41682600382409%"><p>replication counters</p></td><td valign="bottom" width="65.5831739961759%"><p>metrics for replicated data and keys</p></td></tr></tbody></table>

To get started [import](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) template: [https://raw.githubusercontent.com/MogiePete/zabbix-galera-template/master/App-Galera_Cluster.xml](https://raw.githubusercontent.com/MogiePete/zabbix-galera-template/master/App-Galera_Cluster.xml).

## Monitor MongoDB

Installing the Zabbix agent extension for ClickHouse allows you to collect the following metrics:

<table><tbody><tr><td><p dir="ltr">db status</p></td><td><p dir="ltr">Readiness, status of connections.</p></td></tr><tr><td><p dir="ltr">operations count</p></td><td><p dir="ltr"><span>Commands, inserts, deletes, requests per second.</span></p></td></tr><tr><td><p dir="ltr">storage engine cache</p></td><td><p dir="ltr">Using the storage cache.</p></td></tr><tr><td><p dir="ltr">network usage</p></td><td><p dir="ltr">Network Activity Metrics.</p></td></tr><tr><td><p dir="ltr">memory usage</p></td><td><p dir="ltr">Memory usage.</p></td></tr><tr><td><p dir="ltr">per db metrics</p></td><td><p dir="ltr">Average size and number of objects, number of collections, data volume, number and size of indexes, storage size.</p></td></tr></tbody></table>

When choosing Zabbix agent version 3.4, template components are installed[zabbix-mongodb](https://github.com/omni-lchen/zabbix-mongodb).

To get started [import](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) template: [https://raw.githubusercontent.com/omni-lchen/zabbix-mongodb/master/Templates/Template_MongoDB.xml](https://raw.githubusercontent.com/omni-lchen/zabbix-mongodb/master/Templates/Template_MongoDB.xml).[](https://raw.githubusercontent.com/omni-lchen/zabbix-mongodb/master/Templates/Template_MongoDB.xml)

When choosing Zabbix agent version 5.0, a second generation agent will be installed that supports the template [Template DB MongoDB node by Zabbix Agent 2](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/db/mongodb/template_db_mongodb.xml?at=refs%2Fheads%2Freerelease%2F5.0) pre-installed on Zabbix server version 5.0 and above. Set the macro value “{$MONGODB.CONNSTRING}” to “mcs_mongodb" to authorize on the observed host.

## Clickhouse monitoring

Installing the Zabbix Agent extension for ClickHouse allows you to collect the following metrics:

<table><tbody><tr><td><p>db status</p></td><td><p>Readiness, status of connections.</p></td></tr><tr><td><p>operations count</p></td><td><p>Inserts\rows per second, queries per second.</p></td></tr><tr><td><p>query</p></td><td><p>The number of current requests, the maximum time for the execution of current requests, the number of processed requests and inserts, insert delays.</p></td></tr><tr><td><p>merge</p></td><td><p>Merges of uncompressed bytes and merges of strings per second.</p></td></tr><tr><td><p>replication</p></td><td><p>Memory usage for replication, lag, number of replication tasks in the queue.</p></td></tr><tr><td><p>memory usage</p></td><td><p>Memory usage for background merges, mutations, deliveries.</p></td></tr></tbody></table>

When choosing the version of zabbix agent 3.4, the template components are installed [clickhouse-zabbix-template](https://www.google.com/url?q=https://github.com/Altinity/clickhouse-zabbix-template/&sa=D&source=docs&ust=1635766525505000&usg=AOvVaw1EbWUEyfblJ3WnlZpK9shE).

To get started [import](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) template: [https://raw.githubusercontent.com/Altinity/clickhouse-zabbix-template/master/zbx_clickhouse_template.xml](https://raw.githubusercontent.com/Altinity/clickhouse-zabbix-template/master/zbx_clickhouse_template.xml).

If your zabbix-server version is 5.0 or higher use built-in template[Template DB ClickHouse by HTTP](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/db/clickhouse_http?at=refs%2Fheads%2Frelease%2F5.0).

When installing the extension, specify the parameters:

- source_ip_addresses - to specify allowed addresses, to connect to clickhouse-server via http in a format similar to permission settings [cllickhouse users](https://clickhouse.com/docs/en/operations/settings/settings-users/#user-namenetworks) (separator - comma).
- zabbix_clickhouse_password — to use a value in a macro “{$CLICKHOUSE.PASSWORD}”
- mcs_user - for macro {$CLICKHOUSE.USER}.

## Monitor Redis

Installing the Zabbix Agent for Redis extension allows you to collect the following metrics:

<table><tbody><tr><td><p>command statistics</p></td><td><p>Team statistics: number, delay.</p></td></tr><tr><td><p>clients</p></td><td><p>connection statistics: number, connections per second, blocked, maximum buffer and maximum output of clients.</p></td></tr><tr><td><p>performance</p></td><td><p>Memory and CPU usage.</p></td></tr><tr><td><p>keys</p></td><td><p>Key counters and database related statistics.</p></td></tr><tr><td><p>replication</p></td><td><p>Replication Status.</p></td></tr><tr><td><p>slowlog</p></td><td><p>Information about slow queries.</p></td></tr></tbody></table>

Template components are installed to monitor Redis Zabbix agent version 3.4 [zabbix-redis-template](https://github.com/pavelnemirovsky/zabbix-redis-template).

To get started [import](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) template: [https://raw.githubusercontent.com/pavelnemirovsky/zabbix-redis-template/master/zbx_template/zbx_export_templates.xml](https://raw.githubusercontent.com/pavelnemirovsky/zabbix-redis-template/master/zbx_template/zbx_export_templates.xml).

When choosing Zabbix agent version 5.0, a second generation agent will be installed that supports the template [Template DB Redis](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/db/redis?at=release/5.0) pre-installed on zabbix-server v5.0 and above.

## Пример сценария подключения инстансов к серверу мониторинга

1.  Provide network connectivity between the instance and the monitoring server by ports for active and passive checks ([more details here](https://www.zabbix.com/documentation/current/en/manual/appendix/items/activepassive)).
2. Decide on the encryption method for the transmitted data (no encryption, TLS or PSK). When installing the Zabbix agent, you can choose both connection security methods, in which case during operation the encryption method can be changed by changing the connection configuration only on the server ([more details here](https://www.zabbix.com/documentation/current/ru/manual/encryption)).
3.  Install the Zabbix agent on the instance or all instances of the cluster with the desired user settings.
4. Connect the instances to the Zabbix server in the Configuration -> Hosts -> Create Hosts section ([details here](https://www.zabbix.com/documentation/5.4/ru/manual/config/hosts/host)).

<warn>

Use the short name of the instance (hostname -s) for the value of the Host name, PSK identity fields (if using PSK).

5. Assign the monitoring template(s) to the instance or to the group that the instance belongs to ([details here](https://www.zabbix.com/documentation/5.4/ru/manual/config/templates/linking)).
6.  After 10 minutes, verify that data from the agent is coming to the server under Monitoring -> Latest Data by filtering the content by instance name. You can view historical information on metrics in the same place - in the last column.

</warn>
