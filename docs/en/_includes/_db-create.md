{includetag(not_db_onboarding)}
## Preparatory steps

1. Make sure the `psql` utility is installed. To do this, check the utility version:

   ```console
   psql --version
   ```

   If the utility is installed, its version will be displayed:

   ```text
   psql (PostgreSQL) 14.7
   ```

   If the utility is not installed, information will be displayed that the `psql` command was not found.

1. If the `psql` utility is not installed, install it:

   {tabs}

   {tab(Linux (APT))}

   1. Connect the PostgreSQL repository:

      ```console
      sudo apt install curl ca-certificates gnupg
      curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/apt.postgresql.org.gpg > /dev/null
      sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
      sudo apt update
      ```

   1. Install the `psql` utility:

      ```console
      sudo apt install -y postgresql-client
      ```

   {/tab}

   {tab(Linux (RPM))}

   1. Connect the PostgreSQL repository:

      1. Fill in the questionnaire on the [PostgreSQL download page for the RedHat family of Linux distributions](https://www.postgresql.org/download/linux/redhat/):

         1. **Select version**: select the most recent version.
         1. **Select platform**: select your operating system distribution.
         1. **Select architecture**: select the architecture. If you do not know which architecture to select, select `x86_64`.

         The installation script text will appear.

      1. Copy the command from the script under the `Install the repository RPM` comment. Its form depends on the selected distribution:

         {tabs}

         {tab(yum)}

         ```console
         sudo yum install -y https://download.postgresql.org/pub/repos/yum/...
         ```

         {/tab}

         {tab(dnf)}

         ```console
         sudo dnf install -y https://download.postgresql.org/pub/repos/yum/...
         ```

         {/tab}

         {/tabs}

      1. Run the copied command.

      1. If a command like `sudo dnf...` was used, disable the built-in PostgreSQL module:

         ```console
         sudo dnf -qy module disable postgresql
         ```

   1. Install the `psql` utility:

      {tabs}

      {tab(yum)}

      ```console
      sudo yum install -y postgresql
      ```

      {/tab}

      {tab(dnf)}

      ```console
      sudo dnf install -y postgresql
      ```

      {/tab}

      {/tabs}

   {/tab}

   {tab(macOS (Homebrew))}

   1. Install the `psql` utility:

      ```zsh
      brew install libpq
      ```

   1. Create symbolic links to the `libpq` executable files:

      ```zsh
      brew link --force libpq
      ```

      This is required to run the `psql` utility without specifying the full path to its executable file.

   {/tab}

   {tab(Windows)}

   1. [Download the EDB installer](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) for the most recent PostgreSQL version.

   1. Run the installation.

      During installation:
      1. At the **Installation Directory** step, note the path where the installation will be performed.
      1. At the **Select Components** step, deselect all components except **Command Line Tools**.

   1. Add the path to the PostgreSQL command line utilities executable files to the `Path` environment variable:

      1. Open **Start → This PC → Properties → Advanced system settings → Environment Variables**.
      1. In the **System variables** list, change the value of the `Path` variable by adding the path to the directory with the PostgreSQL command line utilities executable files to the existing value.

         Example path when installing PostgreSQL with default parameters:

         ```text
         C:\Program Files\PostgreSQL\15\bin\
         ```

   {/tab}

   {/tabs}

{/includetag}

## {heading({counter(db)}. Create a PostgreSQL DB instance)[id=instance_create]}

1. [Go to](https://msk.cloud.vk.ru/app/) your VK Cloud management console.
1. Select the [project](/en/tools-for-using-services/account/concepts/projects) where the DB instance will be hosted.
1. Go to the **Databases → Database instances** section.
1. If there are no DB instances in the selected project, click the **Create database** button.

   Otherwise, click the **Add** button.

1. At the **Configuration** step, select:

    - **PostgreSQL** database type and the most recent DBMS version.
    - **Single** configuration.

1. Click the **Next step** button.

1. At the **Instance creation** step, set:

    - **Database instance name:** for example, `vk-cloud-dbaas-quickstart`.
    - **Virtual machine type:** `STD3-2-8`.
    - **Availability zone:** `Moscow (ME1)`.
    - **Disk type:** `SSD`.
    - **Disk size, GB:** `10`.
    - **Enable disk autoscaling:** make sure this option is not selected.
    - **Network:** `Create a new network`.
    - **Subnet address:** `10.0.1.0/24`.
    - **Assign external IP:** make sure this option is selected.
    - **Firewall settings:** make sure only the `default` option is selected.
    - **Create replica:** make sure this option is not selected.
    - **Backup:** `Disabled`.

1. Click the **Next step** button.

1. At the **Initialization** step, set:

    - **Creation type:** `New database`.
    - **Database name to create:** `tsdb1`.
    - **User name:** `tsuser1`.
    - **User password:** set a password or generate one.

      {note:info}

      Make sure the password is sufficiently strong.

      High password strength is important, since this DB instance will be accessible from the internet.

      {/note}

1. Click the **Create database** button.

   Wait for the DB instance creation to complete; this process can take a long time.

## {heading({counter(db)}. Get the external IP address of the DB instance)[id=instance_ip]}

1. [Go to](https://msk.cloud.vk.ru/app/) your VK Cloud management console.
1. Select the project where the DB instance is located.
1. Go to the **Databases → Database instances** section.
1. Click the DB instance name. The information page will open.
1. Go to the **Information** tab.

   The required address will be specified in the **External IP address** parameter.

## {heading({counter(db)}. Install the TimescaleDB extension)[id=install_timescaledb]}

1. [Go to](https://msk.cloud.vk.ru/app/) your VK Cloud management console.
1. Select the project where the DB instance is located.
1. Go to the **Databases → Database instances** section.
1. Click the DB instance name. The information page will open.
1. Go to the **Extensions** tab.
1. Click the **Add** button.
1. In the **Available extensions** drop-down list, select `Open-source extension for storing time series data (timescaledb)`.
1. Click the **Add** button.

   Wait for the extension installation to complete: it should change from the `Creating` state to the `Active` state.

## {heading({counter(db)}. Connect to the database)[id=db_connect]}

{includetag(db_onboarding)}
1. Install the `psql` utility:

   {tabs}
   
   {tab(Linux (APT))}
   
   1. Connect the PostgreSQL repository:
   
      ```console
      sudo apt install curl ca-certificates gnupg
      curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/apt.postgresql.org.gpg > /dev/null
      sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
      sudo apt update
      ```
   
   1. Install the `psql` utility:
   
      ```console
      sudo apt install -y postgresql-client
      ```
   
   {/tab}
   
   {tab(Linux (RPM))}
   
   1. Connect the PostgreSQL repository:
   
      1. Fill in the questionnaire on the [PostgreSQL download page for the RedHat family of Linux distributions](https://www.postgresql.org/download/linux/redhat/):
   
         * **Select version**: select the most recent version.
         * **Select platform**: select your operating system distribution.
         * **Select architecture**: select the architecture. If you do not know which architecture to select, select `x86_64`.
   
         The installation script text will appear.
   
      1. Copy the command from the script under the `Install the repository RPM` comment. Its form depends on the selected distribution:
   
         {tabs}
   
         {tab(yum)}
   
         ```console
         sudo yum install -y https://download.postgresql.org/pub/repos/yum/...
         ```
   
         {/tab}
   
         {tab(dnf)}
   
         ```console
         sudo dnf install -y https://download.postgresql.org/pub/repos/yum/...
         ```
   
         {/tab}
   
         {/tabs}
   
      1. Run the copied command.
   
      1. If a command like `sudo dnf...` was used, disable the built-in PostgreSQL module:
   
         ```console
         sudo dnf -qy module disable postgresql
         ```
   
   1. Install the `psql` utility:
   
      {tabs}
   
      {tab(yum)}
   
      ```console
      sudo yum install -y postgresql
      ```
   
      {/tab}
   
      {tab(dnf)}
   
      ```console
      sudo dnf install -y postgresql
      ```
   
      {/tab}
   
      {/tabs}
   
   {/tab}
   
   {tab(macOS (Homebrew))}
   
   1. Install the `psql` utility:
   
      ```zsh
      brew install libpq
      ```
   
   1. Create symbolic links to the `libpq` executable files:
   
      ```zsh
      brew link --force libpq
      ```
   
      This is required to run the `psql` utility without specifying the full path to its executable file.
   
   {/tab}
   
   {tab(Windows)}
   
   1. [Download the EDB installer](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) for the most recent PostgreSQL version.
   
   1. Run the installation.
   
      During installation:
      1. At the **Installation Directory** step, note the path where the installation will be performed.
      1. At the **Select Components** step, deselect all components except **Command Line Tools**.
   
   1. Add the path to the PostgreSQL command line utilities executable files to the `Path` environment variable:
   
      1. Open **Start → This PC → Properties → Advanced system settings → Environment Variables**.
      1. In the **System variables** list, change the value of the `Path` variable by adding the path to the directory with the PostgreSQL command line utilities executable files to the existing value.
   
         Example path when installing PostgreSQL with default parameters:
   
         ```text
         C:\Program Files\PostgreSQL\15\bin\
         ```
   
   {/tab}
   
   {/tabs}
   {/includetag}

1. Connect to the `tsdb1` database using the `psql` utility:

   1. Run the command:

      ```console
      psql -h <DB instance external IP address> -d tsdb1 -U tsuser1
      ```

   1. Enter the password of the `tsuser1` user set when [creating the DB instance](#instance_create).

   On a successful connection, the following prompt should appear:

   ```console
   tsdb1=>
   ```

{note:warn}

All further steps must be performed in the `psql` command line.

{/note}

## {heading({counter(db)}. Create the required tables)[id=tables_create]}

1. Make sure the TimescaleDB extension is enabled:

   ```sql
   CREATE EXTENSION IF NOT EXISTS timescaledb;
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

1. Make sure the tables were created successfully:

   ```sql
   SELECT tablename
   FROM pg_catalog.pg_tables
   WHERE tablename LIKE 'sensor%';
   ```

   {cut(Query result)}

   ```text
     tablename
   -------------
    sensor_data
    sensors
   (2 rows)
   ```

   {/cut}

1. Convert the `sensor_data` PostgreSQL table into a TimescaleDB [hypertable](https://docs.timescale.com/use-timescale/latest/hypertables/):

   ```sql
   SELECT create_hypertable('sensor_data', 'time');
   ```

1. Make sure the `sensor_data` hypertable was created successfully:

   ```sql
   SELECT hypertable_name
   FROM timescaledb_information.hypertables;
   ```

   {cut(Query result)}

   ```text
    hypertable_name
   -----------------
    sensor_data
   (1 row)
   ```

   {/cut}

## {heading({counter(db)}. Populate the tables with data)[id=tables_fill]}

{note:info}

The `sensor_data` table is populated with a randomly generated data set, so the data in your table will differ from the examples given.

{/note}

1. Populate the `sensors` table with data:

   ```sql
   INSERT INTO sensors (type, location) VALUES
   ('a','floor'),
   ('a', 'ceiling'),
   ('b','floor'),
   ('b', 'ceiling');
   ```

1. Make sure the data was successfully inserted into the table:

   ```sql
   SELECT * FROM sensors;
   ```

   {cut(Query result)}

   ```text
    id | type | location
   ----+------+----------
     1 | a    | floor
     2 | a    | ceiling
     3 | b    | floor
     4 | b    | ceiling
   (4 rows)
   ```

   {/cut}

1. Populate the `sensor_data` table with randomly generated data:

   ```sql
   INSERT INTO sensor_data (time, sensor_id, cpu, temperature)
   SELECT
     time,
     sensor_id,
     random() AS cpu,
     random()*100 AS temperature
   FROM generate_series(now() - interval '24 hour', now(), interval '5 minute') AS g1(time), generate_series(1,4,1) AS g2(sensor_id);
   ```

1. Make sure the data was successfully inserted into the table by displaying the first several rows of the table:

   ```sql
   SELECT * FROM sensor_data ORDER BY time LIMIT 8;
   ```

   {cut(Example query result)}

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

   {/cut}

## {heading({counter(db)}. Run test queries)[id=db_select]}

{note:info}

The `sensor_data` table was previously populated with a randomly generated data set, so the results of queries against your table will differ from the examples given.

{/note}

1. Display the average temperature and CPU load values for thirty-minute intervals:

   ```sql
   SELECT
     time_bucket('30 minutes', time) AS period,
     AVG(temperature) AS avg_temp,
     AVG(cpu) AS avg_cpu
   FROM sensor_data
   GROUP BY period
   ORDER BY period;
   ```

   {cut(Example of part of the query result)}

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

   {/cut}

1. Display the average temperature and CPU load values for thirty-minute intervals, as well as the last temperature value recorded for the interval:

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

   {cut(Example of part of the query result)}

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

   {/cut}

Output of query results similar to those shown indicates that PostgreSQL and the TimescaleDB extension are working correctly.

## {heading({counter(db)}. (Optional) Explore the DB instance monitoring data)[id=db_monitoring]}

Monitoring is available for PostgreSQL. Explore the collected monitoring data:

1. [Go to](https://msk.cloud.vk.ru/app/) your VK Cloud management console.
1. Select the project where the DB instance is located.
1. Go to the **Databases → Database instances** section.
1. Click the DB instance name. The information page will open.
1. Go to the **Monitoring** tab.
1. Select the required time interval and view the collected data.

## {heading(Remove unused resources)[id=dbaas-quick-start-delete]}

The DB instance is [charged](/en/dbs/dbaas/tariffication) and consumes computing resources. If you no longer need it:

1. Delete the DB instance.
1. If required, [delete the Floating IP address](/en/networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete) assigned to the DB instance. Floating IP addresses present in the project are [charged](/en/networks/vnet/tariffication).
