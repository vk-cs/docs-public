Quick start will help you get started with the service and become familiar with its features. PostgreSQL will be used as example.

After going through all the steps of the quick start, you will:

1. Create a single host PostgreSQL DB instance.
1. Install the [TimescaleDB](https://docs.timescale.com) extension to the instance.
1. Learn how to connect to the instance for both [viewing logs](#3---optional--view-db-instance-logs) and [executing SQL queries](#5--connect-to-the-database).
1. Create test data and quieries for TimescaleDB to make sure that the extension operates correctly.

   An automatically generated test dataset will be used in this quick start. It comprises the information from the IoT sensors: temperature and CPU utilization.
   Read more about the dataset in [Timescale documentation](https://docs.timescale.com/tutorials/latest/simulate-iot-sensor-data/).

   The procedure for generating such datasets is discussed in details in [Timescale blog](https://www.timescale.com/blog/how-to-create-lots-of-sample-time-series-data-with-postgresql-generate_series/).

1. Familiarize yourself with the monitoing data collected during the operation of the DB instance.

<warn>

The DB instance is charged and consumes computational resources. After completing the quick start [delete both the instance and the floating IP address assigned to it](#delete-unused-resources) if you no longer need them.

</warn>

## Preparatory steps

1. Make sure that the `psql` utility is installed. To do this, view its version:

   ```bash
   psql --version
   ```

   If the utility is installed, its version will be displayed:

   ```text
   psql (PostgreSQL) 14.7 
   ```

   Otherwise, there will be shown a message stating that the `psql` command is not found.

1. If the `psql` utility is not installed, then install it:

   <tabs>
   <tablist>
   <tab>Linux (APT)</tab>
   <tab>Linux (RPM)</tab>
   <tab>macOS (Homebrew)</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   1. Connect the PostgreSQL repository:

      ```bash
      sudo apt install curl ca-certificates gnupg
      curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/apt.postgresql.org.gpg > /dev/null
      sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
      sudo apt update

      ```

   1. Install the `psql` utility:

      ```bash
      sudo apt install -y postgresql-client
      ```

   </tabpanel>
   <tabpanel>

   1. Connect the PostgreSQL repository:

      1. Fill in the questionnaire on [RedHat Linux PostgreSQL download page](https://www.postgresql.org/download/linux/redhat/):

         1. **Select version**: select the most current version.
         1. **Select platform**: select the operating system distribution.
         1. **Select architecture**: select the architecture. If you don't know whch architecture to choose, select `x86_64`.

         The installation script text will appear.

      1. Copy the command under the `Install the repository RPM` comment in the script.

         Its appearance depends on the selected platform:

         <tabs>
         <tablist>
         <tab>yum</tab>
         <tab>dnf</tab>
         </tablist>
         <tabpanel>

         ```bash
         sudo yum install -y https://download.postgresql.org/pub/repos/yum/...
         ```

         </tabpanel>
         <tabpanel>

         ```bash
         sudo dnf install -y https://download.postgresql.org/pub/repos/yum/...
         ```

         </tabpanel>
         </tabs>

      1. Execute the copied command.

      1. If the executed command looked like `sudo dnf...`, then disable the built-in PostgreSQL module:

         ```bash
         sudo dnf -qy module disable postgresql
         ```

   1. Install the `psql` utility:

      <tabs>
      <tablist>
      <tab>yum</tab>
      <tab>dnf</tab>
      </tablist>
      <tabpanel>

      ```bash
      sudo yum install -y postgresql
      ```

      </tabpanel>
      <tabpanel>

      ```bash
      sudo dnf install -y postgresql
      ```

      </tabpanel>
      </tabs>

   </tabpanel>
   <tabpanel>

   1. Install the `psql` utility:

      ```zsh
      brew install libpq
      ```

   1. Create the symbolic links to the `libpq` executable files:

      ```zsh
      brew link --force libpq
      ```

      This step is necessary if you want to run the `psql` utility without specifying the full path to its executable file.

   </tabpanel>
   <tabpanel>

   1. [Download the EDB installer](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) for the most current PostgreSQL version.

   1. Do the installation:

      When installing:

      1. On the **Installation Directory** step write down the path PostgreSQL will be installed to.
      1. On the **Select Components** remove the selection from all components, except **Command Line Tools**.

   1. Add the path to the PostgreSQL command line utilities executable files to the `Path` environment variable:

      1. Open **Start → This PC → Properties → Advanced system settings → Environment variables**.
      1. In the **System variables** list change the `Path` variable by adding the path to the PostgreSQL command line utilities executable files to its existing value.

         Example of the path when installing PostgreSQL with default settings:

         ```text
         C:\Program Files\PostgreSQL\15\bin\
         ```

   </tabpanel>
   </tabs>

## 1. Create PostgreSQL DB instance

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en/).
1. Select [project](/en/base/account/concepts/projects), where the instance will be placed.
1. Go to **Databases → Database instances**.
1. If there are no instances in the selected project, click the **Create database** button.

   Otherwise, click the **Add** button.

1. On the "Configuration" step select:

   - The **PostgreSQL** database type and the most current version.
   - The **Single** configuration.

1. Click the **Next step** button.

1. On the "Create instance" step set:

   - **Database instance name:** for example, `vk-cloud-dbaas-quickstart`.
   - **Type of virtual machine:** `Standard-2-8`.
   - **Availability zone:** `Moscow (GZ1)`.
   - **Disk Type:** `SSD`.
   - **Disk size, GB:** `10`.
   - **Enable volume autoscaling:** make sure that this option is disabled.
   - **Network:** `Create new network`.
   - **Subnet address:** `10.0.1.0/24`.
   - **Assign external IP:** make sure that this option is enabled.
   - **Настройки Firewall:** select `ssh` from the drop-down list.

     The resulting list of the secrity groups should look like: `default`, `ssh`.

   - **Create replica:** make sure that this option is disabled.
   - **SSH access key:** `Create a new key`.

     <info>

     With this option enabled, a private SSH key will be downloaded to your computer. Save it.

     This key is required to connect to the instance via SSH, for example, for [viewing the logs](#3---optional--view-db-instance-logs).

     </info>

   - **Backup:** `Disabled`.
   - **Enable monitoring:** make sure that this option is enabled.

1. Click the **Next step** button.

1. On the "Initialization" step set:

   - **Creation type:** `New database`.
   - **Name of database for creation:** `tsdb1`.
   - **Username:** `tsuser1`.
   - **User password:** provide a password or generate it.

     <info>

     It is recommended either to use strong and lenghty password, that comprises several types of characters,, or to generate password.

     The strong password is crucial, because this DB instance will be exposed to the internet.

     </info>

1. Click the **Create database** button.

   Wait until the creation of the DB instance is completed, this process can take a long time.

## 2. Get the external IP address of the DB instance

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en/).
1. Select the project where the DB instance is located.
1. Go to **Databases → Database instances**.
1. Click on the name of the DB instance. A page with information will open.
1. Navigate to the **Information** tab.

   The necessary address will be listed in the **External IP address** parameter.

## 3. (Optional) View DB instance logs

1. Connect to DB instace via SSH. Use private SSH key, [obtained during the instance creation](#1--create-postgresql-db-instance):

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   chmod 0600 <path/to/the/key.pem>
   ssh -i <path/to/the/key.pem> admin@<DB instance external IP address>
   
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   ssh -i <path/to/the/key.pem> admin@<DB instance external IP address>
   ```

   </tabpanel>
   </tabs>

1. View DB instance logs:

   ```bash
   journalctl -u postgresql
   ```

   <details>
   <summary>Example output fragment</summary>

   ```text
   -- Logs begin at Fri 2023-05-19 10:28:34 UTC, end at Mon 2023-05-22 06:08:42 UTC. --
   May 19 10:28:41 vk-cloud-dbaas-quickstart.novalocal systemd[1]: Starting PostgreSQL 14 database server...
   May 19 10:28:41 vk-cloud-dbaas-quickstart.novalocal postmaster[1096]: 2023-05-19 10:28:41.800 UTC [1096] LOG:  redirecting log output to logging collector process
   May 19 10:28:41 vk-cloud-dbaas-quickstart.novalocal postmaster[1096]: 2023-05-19 10:28:41.800 UTC [1096] HINT:  Future log output will appear in directory "log".
   May 19 10:28:41 vk-cloud-dbaas-quickstart.novalocal systemd[1]: Started PostgreSQL 14 database server.
   May 19 10:29:18 vk-cloud-dbaas-quickstart.novalocal systemd[1]: Stopping PostgreSQL 14 database server...
   May 19 10:29:18 vk-cloud-dbaas-quickstart.novalocal systemd[1]: postgresql.service: Succeeded.
   May 19 10:29:18 vk-cloud-dbaas-quickstart.novalocal systemd[1]: Stopped PostgreSQL 14 database server.
   May 19 10:29:33 vk-cloud-dbaas-quickstart.novalocal systemd[1]: Starting PostgreSQL 14 database server...
   May 19 10:29:33 vk-cloud-dbaas-quickstart.novalocal postmaster[1978]: 2023-05-19 10:29:33.720 GMT [1978] LOG:  starting PostgreSQL 14.7 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 8.5.0 20210514 (Red Hat 8.5.0-16), 64-bit
   May 19 10:29:33 vk-cloud-dbaas-quickstart.novalocal postmaster[1978]: 2023-05-19 10:29:33.720 GMT [1978] LOG:  listening on IPv4 address "0.0.0.0", port 5432
   May 19 10:29:33 vk-cloud-dbaas-quickstart.novalocal postmaster[1978]: 2023-05-19 10:29:33.720 GMT [1978] LOG:  listening on IPv6 address "::", port 5432
   May 19 10:29:33 vk-cloud-dbaas-quickstart.novalocal postmaster[1978]: 2023-05-19 10:29:33.725 GMT [1978] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
   May 19 10:29:33 vk-cloud-dbaas-quickstart.novalocal postmaster[1980]: 2023-05-19 10:29:33.735 GMT [1980] LOG:  database system was shut down at 2023-05-19 10:29:18 GMT
   May 19 10:29:33 vk-cloud-dbaas-quickstart.novalocal postmaster[1978]: 2023-05-19 10:29:33.828 GMT [1978] LOG:  database system is ready to accept connections
   
   ...
   ```

   </details>

   It is possible to conclude from this output that PostgreSQL is up and running and ready to accept incoming connections.

## 4. Install the TimescaleDB extension

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en/).
1. Select the project where the DB instance is located.
1. Go to **Databases → Database instances**.
1. Click on the name of the DB instance. A page with information will open.
1. Navigate to the **Extensions** tab.
1. Click the **Add** button.
1. Select `Open-source database extension for storing time-series data (timescaledb)` from the **Available extensions** drop-down list.
1. Click the **Add** button.

    Wait until the installation of the extension is completed: its status should change from `Creating` to `Active`.

## 5. Connect to the database

Connect to the `tsdb1` database via the `psql` utility:

1. Execute the command:

   ```bash
   psql -h <DB instance external IP address> -d tsdb1 -U tsuser1
   ```

1. Enter the `tsuser1` user's password, [specified during the instance creation](#1--create-postgresql-db-instance).

If the connection is successful, the following prompt will be displayed:

```bash
tsdb1=>
```

<warn>

All further steps must be performed from the `psql` command line.

</warn>

## 6. Create necessary tables

1. Activate the TimescaleDB extension:

   ```sql
   CREATE EXTENSION timescaledb;
   ```

   Wait for the `tsdb1=>` prompt to appear.

1. Create the `sensors` table:

   ```sql
   CREATE TABLE sensors(
     id SERIAL PRIMARY KEY,
     type VARCHAR(50),
     location VARCHAR(50)
   );
   ```

1. Create the `sensor_data` table:

   ```sql
   CREATE TABLE sensor_data (
     time TIMESTAMPTZ NOT NULL,
     sensor_id INTEGER,
     temperature DOUBLE PRECISION,
     cpu DOUBLE PRECISION,
     FOREIGN KEY (sensor_id) REFERENCES sensors (id)
   );
   ```

1. Make sure that the tables were created successfully:

   ```sql
   SELECT tablename
   FROM pg_catalog.pg_tables
   WHERE tablename LIKE 'sensor%';
   ```

   <details>
   <summary>Query result</summary>

   ```text
     tablename
   -------------
    sensor_data
    sensors
   (2 rows)
   ```

   </details>

1. Convert the PostgreSQL `sensor_data` table into the TimescaleDB [hypertable](https://docs.timescale.com/use-timescale/latest/hypertables/):

   ```sql
   SELECT create_hypertable('sensor_data', 'time');
   ```

1. Make sure that the `sensor_data` hypertable was created successfully:

   ```sql
   SELECT hypertable_name
   FROM timescaledb_information.hypertables;
   ```

   <details>
   <summary>Query result</summary>

   ```text
    hypertable_name
   -----------------
    sensor_data
   (1 row)
   ```

   </details>

## 7. Fill in the tables with the data

<info>

The `sensor_data` table will be filled in with the randomly generated dataset. The data in your table will differ from the shown examples.

</info>

1. Fill in the `sensors` table with data:

   ```sql
   INSERT INTO sensors (type, location) VALUES
   ('a','floor'),
   ('a', 'ceiling'),
   ('b','floor'),
   ('b', 'ceiling');
   ```

1. Make sure that the data was successfully inserted into the table:

   ```sql
   SELECT * FROM sensors;
   ```

   <details>
   <summary>Query result</summary>

   ```text
    id | type | location
   ----+------+----------
     1 | a    | floor
     2 | a    | ceiling
     3 | b    | floor
     4 | b    | ceiling
   (4 rows)  
   ```

   </details>

1. Fill in the `sensor_data` table with randomly generated data:

   ```sql
   INSERT INTO sensor_data (time, sensor_id, cpu, temperature)
   SELECT
     time,
     sensor_id,
     random() AS cpu,
     random()*100 AS temperature
   FROM generate_series(now() - interval '24 hour', now(), interval '5 minute') AS g1(time), generate_series(1,4,1) AS g2(sensor_id);
   ```

1. Make sure that the data was successfully inserted into the table by selecting a few rows from the table:

   ```sql
   SELECT * FROM sensor_data ORDER BY time LIMIT 8;
   ```

   <details>
   <summary>Example query result</summary>

   ```text
                time              | sensor_id |    temperature     |         cpu
   -------------------------------+-----------+--------------------+---------------------
    2023-05-21 07:43:52.133888+00 |         4 | 34.633736865959364 |  0.5569185687389719
    2023-05-21 07:43:52.133888+00 |         3 | 56.905440887294034 | 0.07377927779113236
    2023-05-21 07:43:52.133888+00 |         1 |  56.63560698774681 |  0.5716904026292013
    2023-05-21 07:43:52.133888+00 |         2 | 36.502832944119135 |  0.6536441978766803
    2023-05-21 07:48:52.133888+00 |         4 |   76.2173939498279 |  0.6182606187228714
    2023-05-21 07:48:52.133888+00 |         3 |  71.45127267625107 | 0.27642300219178395
    2023-05-21 07:48:52.133888+00 |         1 | 49.732367773230024 |   0.770096500403703
    2023-05-21 07:48:52.133888+00 |         2 |  31.10197931398453 |  0.8426620901373241
   (8 rows)
   ```

   </details>

## 8. Execute test queries

<info>

Earlier the `sensor_data` table was filled in with the randomly generated dataset. Your query results will differ from the shown examples.

</info>

1. Output the average temperature and CPU utilization values over thirty-minute intervals:

   ```sql
   SELECT
     time_bucket('30 minutes', time) AS period,
     AVG(temperature) AS avg_temp,
     AVG(cpu) AS avg_cpu
   FROM sensor_data
   GROUP BY period
   ORDER BY period;
   ```

   <details>
   <summary>Example query result fragment</summary>

   ```text
            period         |      avg_temp      |       avg_cpu
   ------------------------+--------------------+---------------------
    2023-05-21 07:30:00+00 |  53.61763620602069 |  0.5413570794268665
    2023-05-21 08:00:00+00 | 45.105700825199456 |  0.5967307199039785
    2023-05-21 08:30:00+00 | 49.534870531748844 |  0.5244548233136944
    2023-05-21 09:00:00+00 |  48.11141443258068 | 0.40274852600539646
    2023-05-21 09:30:00+00 | 52.020211415250266 | 0.41570437093237916
    2023-05-21 10:00:00+00 |  56.50992475543965 |  0.5744052407007274
    2023-05-21 10:30:00+00 | 46.664477309117196 |  0.6187918344821526
    2023-05-21 11:00:00+00 |  47.68186282450759 |  0.5020627643634109

   ...
   
   ```

   </details>

1. Output the average temperature and CPU utilization values over thirty-minute intervals, along with the last temperature value recorded during the interval:

   ```sql
   SELECT
     time_bucket('30 minutes', time) AS period,
     AVG(temperature) AS avg_temp,
     last(temperature, time) AS last_temp,
     AVG(cpu) AS avg_cpu
   FROM sensor_data
   GROUP BY period
   ORDER BY period;
   ```

   <details>
   <summary>Example query result fragment</summary>

   ```text
            period         |      avg_temp      |     last_temp      |       avg_cpu
   ------------------------+--------------------+--------------------+---------------------
    2023-05-21 07:30:00+00 |  53.61763620602069 | 24.940269958716854 |  0.5413570794268665
    2023-05-21 08:00:00+00 | 45.105700825199456 | 14.089769297588717 |  0.5967307199039785
    2023-05-21 08:30:00+00 | 49.534870531748844 | 15.675718258720295 |  0.5244548233136944
    2023-05-21 09:00:00+00 |  48.11141443258068 | 54.914047493504725 | 0.40274852600539646
    2023-05-21 09:30:00+00 | 52.020211415250266 |  90.50501566182483 | 0.41570437093237916
    2023-05-21 10:00:00+00 |  56.50992475543965 |  17.26290517165019 |  0.5744052407007274
    2023-05-21 10:30:00+00 | 46.664477309117196 |  58.94930860972387 |  0.6187918344821526
    2023-05-21 11:00:00+00 |  47.68186282450759 | 62.973228176266005 |  0.5020627643634109

   ... 
   ```

   </details>

Output of query results similar to the above ones indicates that PostgreSQL and TimescaleDB extension are working correctly.

## 9. (Optional) Familiarize yourself with the DB instance monitoring data

The monitoring feature [was enabled during the instance creation](#1--create-postgresql-db-instance). Familiarize yourself with gathered monitoring data:

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en/).
1. Select the project where the DB instance is located.
1. Go to **Databases → Database instances**.
1. Click on the name of the DB instance. A page with information will open.
1. Navigate to the **Monitoring** tab.
1. Select the desired time interval and look at the collected data.

## Delete unused resources

The DB instance [is charged](../tariffication) and consumes computational resources. If you no longer need it, then:

1. [Delete DB instance](../instructions/delete).
1. If necessary, [delete floating IP address](/en/networks/vnet/operations/manage-floating-ip#removing_floating_ip_address_from_the_project), that was assigned to the DB instance. Floating IP addresses, that exist in the project, [are charged](/en/networks/vnet/tariffs).
