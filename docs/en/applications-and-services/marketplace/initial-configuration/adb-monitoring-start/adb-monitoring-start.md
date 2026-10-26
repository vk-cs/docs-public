# {heading(Installing and configuring the Monitoring service for Arenadata DB)[id=marketplace-adb-monitoring-start]}

{include(/en/_includes/_translated_by_ai_en.md)}

Monitoring for Arenadata DB is a ready-made solution for monitoring Arenadata databases in the {var(cloud)} infrastructure. It includes a set of pre-installed tools for collecting metrics, visualization, and timely alerting on issues.

By completing all the steps of this guide, you will:

1. Enable the Monitoring for Arenadata DB service in your {var(cloud)} management console.

   Upon activation, a virtual machine will be automatically created with the following installed on it:

   - [Grafana](https://grafana.com/docs/grafana/latest/) — a service for visualizing and analyzing monitoring data;
   - [Prometheus](https://prometheus.io/) — a monitoring and alerting service;
   - ADB Exporter — a service for collecting metrics from Arenadata DB;
   - [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/) — an alert handler for alerts coming from Prometheus.

1. Prepare the Arenadata database to work with the Monitoring for Arenadata DB service.
1. Configure the ADB Exporter service.
1. Install and configure Node Exporter — an agent for collecting operating system state metrics.
1. Install and configure cAdvisor — an agent for collecting Docker container metrics.
1. Log in to the Grafana service and view dashboards with data coming from Prometheus.

## {heading(Preparation steps)[id=marketplace-adb-monitoring-start-prepare-step]}

1. Create a Telegram chat to which alerts from the Monitoring for Arenadata DB service will be sent, and save the chat ID.
1. Create a Telegram bot that will be used for sending alerts, and save the bot token.
1. {linkto(../../../../intro/onboarding/account/create-account#onboarding-create-account)[text=Register]} in {var(cloud)} if you have not done so earlier.
1. {linkto(../../../../dbs/adb/quick-start/create-adb#adb-create-adb)[text=Create]} an Arenadata DB instance. Save the data specified when creating the instance:

   - The Arenadata DB cluster name. It is also the instance name.
   - The Arenadata database name.
   - The name and password of the Arenadata database user.

   This data will be needed when connecting to and configuring the Monitoring for Arenadata DB service.

1. Go to the **Analytical DBs** → **ADB Instances** section.
1. Click the name of the desired instance.
1. On the **Information** tab, in the **Connecting settings** row, find and save the following data:

   - The IP address of the Arenadata DB host — the value of the `-h` argument in the psql command.
   - The port for connecting to Arenadata DB — the value of the `-p` argument in the psql command.

   This data will be needed when connecting to and configuring the Monitoring for Arenadata DB service.

## {heading(1. Enable the Monitoring for Arenadata DB service)[id=marketplace-adb-monitoring-start-connect]}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Create]} a network with Internet access if it has not been created earlier.
1. In the {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=subnet settings]}, where the VM of the Monitoring for Arenadata DB service will be located, disable the **Private DNS** option.
1. Go to the **Application Store** section and click the **All solutions** button on the section page.
1. On the **Monitoring for Arenadata DB** service card, click the **Learn more** button.
1. On the service description page, click the **Activate** button.
1. Enter the data on the **Server parameters** page.

   1. Specify the parameters of the virtual machine where the service instance will be deployed:

      - **Availability zone**: select the {linkto(../../../../start/concepts/architecture#architecture-az)[text=data center]} where the VM will run.
      - **Virtual machine type**: select a pre-installed {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=VM configuration]}.
      - **Network**: select a network with Internet access and a subnet for which the **Private DNS** option is disabled.

   1. Specify the parameters of the system disk and the data disk:

      - **Disk size**: specify the desired VM disk size in gigabytes.
      - **Disk type**: select {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=one of the disk types]} — `HDD`, `SSD`, or `High-IOPS SSD`.

1. Click the **Next step** button.
1. Enter the data on the **Monitoring parameters** page.

   1. Specify the previously saved data for connecting to the Arenadata database:

      - the name of the Arenadata DB cluster (instance) to be monitored;
      - the IP address of the Arenadata DB cluster host to which the Monitoring for Arenadata DB service will connect;
      - the port for connecting to Arenadata DB;
      - the login and password of the Arenadata database user;
      - the name of the database in the Arenadata DB cluster.

   1. Set the login and password of the user for logging in to Grafana. This user will have Grafana administrator rights.
   1. Specify the previously saved Telegram bot parameters for alerts.

1. Click the **Next step** button.
1. Review the tariff terms and infrastructure costs for deploying the service and click the **Activate plan** button.

   After successful deployment, messages will be sent to the email registered in {var(cloud)}:

   - a notification with a link to the service instance in the {var(cloud)} management console;
   - an email with a one-time link.

1. Follow the one-time link from the email and save the data for accessing the service:

   - `grafanaUser` and `grafanaPassword` — the login and password of the Grafana administrator;
   - `productURL` — the link to the Grafana web interface;
   - `sshUser` — the name of the administrator of the Monitoring for Arenadata DB service VM;
   - `sshKey` — the private key for connecting to the VM via SSH.

   {note:info}
   If the access data is lost, {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-update-access)[text=generate]} new ones.
   {/note}

## {heading(2. Connect to the VM of the Monitoring for Arenadata DB service)[id=marketplace-adb-monitoring-start-connect-service]}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. Go to the **Cloud Computing** → **Virtual Machines** section.
1. Click the name of the VM starting with `adb-monitoring-`.
1. On the VM page, copy and save the external IP address. It will be needed to connect to the Monitoring for Arenadata DB service VM.
1. Create a `vkc_monitoring.pem` file on your computer and copy the SSH key received in the email into it.
1. Set access to the `vkc_monitoring.pem` file so that only the owner has read and write permissions. To do this, run the command:

   ```console
   chmod 600 vkc_monitoring.pem
   ```

1. Connect to the Monitoring for Arenadata DB service VM by running the command:

   ```console
   ssh -i <KEY_PATH>/vkc_monitoring.pem <LOGIN>@<VM_IP_ADDRESS>
   ```

   Where:

   - `<KEY_PATH>` — the path to the directory with the `vkc_monitoring.pem` file.
   - `<LOGIN>` — the VM administrator name received in the email (`sshUser`).
   - `<VM_IP_ADDRESS>` — the external IP address of the Monitoring for Arenadata DB service VM saved earlier.

## {heading(3. Prepare Arenadata DB to work with the Monitoring for Arenadata DB service)[id=marketplace-adb-monitoring-start-arenadata-db]}

1. On the Monitoring for Arenadata DB service VM, connect to the Arenadata database. To do this, run the command, substituting the previously saved data:

   ```console
   psql -h <DB_IP_ADDRESS> -p <PORT> -U <LOGIN> <DB_NAME>
   ```

   Where:

   - `<DB_IP_ADDRESS>` — the IP address of the Arenadata DB cluster host.
   - `<PORT>` — the port for connecting to Arenadata DB.
   - `<LOGIN>` — the login of the Arenadata DB user.
   - `<DB_NAME>` — the name of the database in the Arenadata DB cluster.

1. Open the database initialization script `/home/almalinux/init.sql` for editing.

   {cut(Database initialization script)}

   ```console
   -- client database
   -- 1. create
   CREATE RESOURCE GROUP monitoring_group
   WITH (
   concurrency=15,
   cpu_rate_limit=1,
   memory_limit=0
   )
   ;
   CREATE USER vkc_monitoring WITH login password '<ПАРОЛЬ>' RESOURCE GROUP monitoring_group CONNECTION LIMIT 5;
   CREATE SCHEMA IF NOT EXISTS vkcloud_toolkit;
   CREATE EXTENSION gp_internal_tools;  -- crates session_state schema

   CREATE OR REPLACE FUNCTION vkcloud_toolkit.pg_stat_replication() RETURNS SETOF pg_stat_replication AS
   $$ SELECT * FROM pg_catalog.pg_stat_replication; $$
   LANGUAGE sql SECURITY definer
   ;

   CREATE OR REPLACE FUNCTION vkcloud_toolkit.pg_stat_activity() RETURNS SETOF pg_stat_activity AS
   $$ SELECT * FROM pg_catalog.pg_stat_activity; $$
   LANGUAGE sql SECURITY definer
   ;

   CREATE OR REPLACE VIEW vkcloud_toolkit.v_replication_delay
   AS SELECT pg_current_xlog_location() - ( SELECT pg_stat_replication.replay_location
            FROM vkcloud_toolkit.pg_stat_replication()) AS replication_delay_bytes
   ;

   CREATE OR REPLACE VIEW vkcloud_toolkit.v_locked_pids
   AS SELECT COALESCE(blockingl.relation::regclass::text, blockingl.locktype) AS locked_item,
      now() - blockeda.query_start AS waiting_duration,
      blockeda.pid AS blocked_pid,
      blockeda.query AS blocked_query,
      blockedl.mode AS blocked_mode,
      blockinga.pid AS blocking_pid,
      blockinga.query AS blocking_query,
      blockingl.mode AS blocking_mode
      FROM pg_locks blockedl
      JOIN vkcloud_toolkit.pg_stat_activity() blockeda ON blockedl.pid = blockeda.pid
      JOIN pg_locks blockingl ON (blockingl.transactionid = blockedl.transactionid OR (blockingl.relation = blockedl.relation AND blockingl.locktype = blockedl.locktype)) AND blockedl.pid <> blockingl.pid
      JOIN vkcloud_toolkit.pg_stat_activity() blockinga ON blockingl.pid = blockinga.pid AND blockinga.datid = blockeda.datid
   WHERE NOT blockedl.granted AND blockinga.datname = current_database()
   ;

   CREATE OR REPLACE VIEW vkcloud_toolkit.v_resgroup_slots
   AS SELECT tt.groupname,
      tt.slots_for_queries,
      tt.active_queries,
      tt.slots_for_queries - tt.active_queries AS free_slots,
      tt.waiting_queries,
      tt.max_wait_sec
      FROM ( SELECT grc.groupname,
               grc.concurrency::bigint AS slots_for_queries,
               COALESCE(act.active_queries, 0::bigint) AS active_queries,
               COALESCE(act.waiting_queries, 0::bigint) AS waiting_queries,
               date_part('epoch'::text, COALESCE(act.max_wait_time, '00:00:00'::interval)) AS max_wait_sec
            FROM gp_toolkit.gp_resgroup_config grc
               LEFT JOIN ( SELECT pg_stat_activity.rsgid,
                     count(1) AS active_queries,
                     count(pg_stat_activity.rsgqueueduration) AS waiting_queries,
                     max(pg_stat_activity.rsgqueueduration) AS max_wait_time
                     FROM vkcloud_toolkit.pg_stat_activity()
                     WHERE pg_stat_activity.rsgname IS NOT NULL AND pg_stat_activity.rsgname <> 'unknown'::text
                     GROUP BY pg_stat_activity.rsgid) act ON grc.groupid = act.rsgid) tt
   ;

   -- 2. grant
   GRANT USAGE ON SCHEMA pg_catalog, gp_toolkit, arenadata_toolkit, vkcloud_toolkit, session_state TO vkc_monitoring;
   GRANT SELECT ON ALL tables IN SCHEMA pg_catalog, gp_toolkit, arenadata_toolkit, vkcloud_toolkit, session_state TO vkc_monitoring;
   GRANT EXECUTE ON ALL functions IN SCHEMA vkcloud_toolkit TO vkc_monitoring;
   GRANT SELECT ON session_state.session_level_memory_consumption TO vkc_monitoring;
   ```

   {/cut}

1. Generate or come up with a password for the `vkc_monitoring` user of the Arenadata database, on whose behalf the Monitoring for Arenadata DB service will run.
1. Insert this password into the `/home/almalinux/init.sql` script on the line:

   ```console
   CREATE USER vkc_monitoring WITH login password `<ПАРОЛЬ>` RESOURCE GROUP monitoring_group CONNECTION LIMIT 5;
   ```

1. Save the changes.
1. Inside the `psql` terminal, run the database initialization script:

   ```console
   \i /home/almalinux/init.sql
   ```

1. Exit the `psql` terminal using the `\q` command.

## {heading(4. Configure the ADB Exporter service)[id=marketplace-adb-monitoring-start-adb-exporter]}

The ADB Exporter service is designed to export metrics from Arenadata databases to Prometheus. The service generates metrics based on descriptions in the configuration file and automatically updates their values according to a specified schedule by executing SQL queries against the database.

ADB Exporter is automatically installed and configured on the instance VM when the Monitoring for Arenadata DB service is deployed. To make ADB Exporter receive metrics from your Arenadata DB, specify the database access parameters in its configuration file:

1. On the Monitoring for Arenadata DB service VM, open the ADB Exporter service configuration file:

   ```console
   sudo nano /etc/adb_exporter/config.yml
   ```

1. Add the Arenadata database connection parameters using the previously created `vkc_monitoring` user to the configuration file:

   ```txt
   datasource:
      dsn: "postgresql://vkc_monitoring:<ПАРОЛЬ>@<IP-АДРЕС_БД>:<ПОРТ>/<ИМЯ_БД>?sslmode=disable"

   ```
   Where:

   - `<ПАРОЛЬ>` — the previously set password of the `vkc_monitoring` user.
   - `<IP-АДРЕС_БД>` — the IP address of the Arenadata DB cluster host.
   - `<ПОРТ>` — the port for connecting to Arenadata DB.
   - `<ИМЯ_БД>` — the name of the database in the Arenadata DB cluster.

1. Restart ADB Exporter:

   ```console
   sudo systemctl restart adb_exporter
   ```

1. Check the ADB Exporter status:

   ```console
   sudo systemctl status adb_exporter
   ```

   If the service has started successfully and is running, the command output will contain the line:

   ```txt
   Active: active (running)
   ```

## {heading(5. Install and configure the Node Exporter agent)[id=marketplace-adb-monitoring-start-node-exporter]}

The Node Exporter agent collects system metrics from servers, including CPU, memory, disk, file system, and network interface usage. Without installing this agent, some Grafana dashboards and Prometheus alerts will not work.

1. Install the Node Exporter agent on all nodes of the Arenadata DB cluster as described on the [product page on GitHub](https://github.com/prometheus/node_exporter/blob/master/README.md).
1. On the Monitoring for Arenadata DB service VM, open the Prometheus service configuration file:

   ```console
   sudo nano /opt/monitoring_data/prometheus/prometheus.yml
   ```

1. Add information about the metric sources to the configuration file: the cluster node IP addresses (`targets`) and metric labels (`labels`).

   Example of a Prometheus configuration:

   ```yml
   - job_name: 'node_exporter'
     static_configs:
       - targets: ['localhost:9100']
         labels:
           instance: segment-1
           adb_cluster: staging
   ```
1. Restart Prometheus.

   ```console
   sudo systemctl restart prometheus
   ```

1. Check the Prometheus status:

   ```console
   sudo systemctl status prometheus
   ```

   If the service has started successfully and is running, the command output will contain the line:

   ```txt
   Active: active (running)
   ```

## {heading(6. Install and configure the cAdvisor agent)[id=marketplace-adb-monitoring-start-cadvisor]}

The cAdvisor agent collects metrics on Docker container operation, including CPU, memory, disk I/O, and network traffic usage. Without installing this agent, some Grafana dashboards and Prometheus alerts will not work.

1. Install the cAdvisor agent on all nodes of the Arenadata DB cluster where containerized applications are running. The installation procedure is described on the [product page on GitHub](https://github.com/google/cadvisor/blob/master/README.md).
1. On the Monitoring for Arenadata DB service VM, open the Prometheus service configuration file:

   ```console
   sudo nano /opt/monitoring_data/prometheus/prometheus.yml
   ```

1. Add information about the metric sources to the configuration file: the cluster node IP addresses (`targets`) and metric labels (`labels`).

   Example of a Prometheus configuration:

   ```yml
   - job_name: 'docker_exporter'
     metrics_path: /metrics
     static_configs:
       - targets: ['localhost:8080']
         labels:
           instance: adcc-node-1
   ```
1. Restart Prometheus.

   ```console
   sudo systemctl restart prometheus
   ```

1. Check the Prometheus status:

   ```console
   sudo systemctl status prometheus
   ```

   If the service has started successfully and is running, the command output will contain the line:

   ```txt
   Active: active (running)
   ```

## {heading(7. Log in to the Grafana web interface)[id=marketplace-adb-monitoring-start-connect-grafana]}

1. Follow the `productURL` link saved earlier from the email. The Grafana web interface will open.
1. Log in using the Grafana administrator login and password received in the email (`grafanaUser` and `grafanaPassword`).
1. Review the contents of the dashboards displaying metrics collected by Prometheus.

   {note:info}
   Changing the password on the first login is optional.
   {/note}