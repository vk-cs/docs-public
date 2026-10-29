# {heading(Quick start)[id=dlh_quick-start]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

The quick start covers a basic scenario for deploying the Data Lakehouse (DLH) service based on three components:

- {linkto(../concepts/components/s3#dlh_s3)[text=VK Object Storage]} — S3 storage used as an inexpensive, infinitely scalable storage for unstructured data received from various databases, such as PostgreSQL.
- {linkto(../concepts/components/iceberg#dlh_iceberg)[text=Cloud Iceberg Metastore]} — used to organize a metadata catalog based on Apache Iceberg. It ensures the consistency of operations between the various DLH service components.
- {linkto(../concepts/components/trino#dlh_trino)[text=Cloud Trino]} — in combination with Cloud Iceberg Metastore, provides customers with the familiar SQL interface for performing the following operations:

   - data transfer (ETL);
   - manipulation of captured data (ELT);
   - combining data from different sources (Data Mesh);
   - other operations with the catalog and data.

After completing all the quick start steps, you will:

1. Create instances of the Cloud Iceberg Metastore and Cloud Trino services.
1. Create a PostgreSQL DB instance and configure a connection to it in Cloud Trino.

The S3 storage bucket will be created automatically when configuring connections for the Cloud Trino service instance.

## {heading(1. Create an instance of the Cloud Iceberg Metastore service)[id=dlh_quick-start_create_iceberg_instance]}

1. Go to the **Data Platform → Service Instances** section.
1. Click the **Create Instance** button.
1. At the **Configuration** step:

   1. Select the `Cloud Iceberg Metastore` service type.
   1. Leave the default value in the **Version** field.
   1. Select the `Cluster` configuration.

1. Click the **Next Step** button.
1. At the **Parameters** step:

   1. Write down the database name generated automatically. You will need it to connect to Cloud Trino.
   1. Enable the **Assign External IP** option.
   1. Select the **Create a New Cluster** option.
   1. Select one of the available networks from the list or create a new one by clicking **Create a New Network**. When creating a new subnet, specify the [SDN](/en/networks/vnet/concepts/sdn) and the subnet address.
   1. Select an [availability zone](/en/start/concepts/architecture#architecture-az), for example: `Москва (ME1)`.
   1. Select the `Basic` setup option and the `Small` cluster template.

1. Click the **Next Step** button.
1. At the **Maintenance** step:

   1. Select the days of the week and the start time for maintenance. During this time, maintenance work may be performed on the server, including backup creation — the service may be temporarily unavailable.

      {note:info}
      The duration of maintenance work is 4 hours. The time zone is determined automatically based on your current location.
      {/note}

   1. Leave the default values for the remaining fields.

1. Click the **Next Step** button.
1. At the **Credentials** step:

   1. Leave the default value in the **Login** field. Write down the administrator login for accessing Cloud Iceberg Metastore; you will need it later.
   1. In the **Password** field, click the **Generate** button to create an administrator password. Save the password; you will need it later.

      {note:warn}
      A lost password cannot be recovered.
      {/note}

1. Click the **Create** button.

Wait for the Cloud Iceberg Metastore service instance creation process to complete.

## {heading(2. Create a PostgreSQL DB instance)[id=dlh_quick-start_create_postgresql_instance]}

The PostgreSQL DB in the basic DLH service configuration acts as an external data source. To deploy a PostgreSQL instance:

1. Go to the **Databases → Database Instances** section.
1. If there are no DB instances in the selected project, click the **Create Database** button.

   Otherwise, click the **Add** button.

1. At the **Configuration** step:

   1. Select the `PostgreSQL` database type.
   1. Leave the default value in the **Version** field.
   1. Select the `Single` configuration.

1. Click the **Next Step** button.
1. At the **Instance Creation** step, specify:

   - **Virtual Machine Type**: `STD3-2-8`.
   - **Availability Zone:** `Москва (ME1)`.
   - **Disk Type:** `SSD`.
   - **Disk Size, GB:** `10`.
   - **Enable Disk Autoscaling:** make sure this option is not selected.
   - **Network**: select the network you specified when [creating the Cloud Iceberg Metastore service instance](#dlh_quick-start_create_iceberg_instance) during the basic configuration deployment.
   - **Assign External IP:** make sure this option is enabled.
   - **Firewall Settings:** select `ssh` from the drop-down list.

      The resulting list of security groups should look as follows: `default`, `ssh`.

   - **Create a Replica:** make sure this option is not selected.
   - **SSH Access Key:** `Create a New Key`.

      {note:info}
      When you select this option, a private SSH key will be downloaded to your computer. Save it. This key will be needed when connecting to the instance via SSH.
      {/note}

   - **Backup:** `Disabled`.

1. Click the **Next Step** button.

1. At the **Initialization** step, specify:

   - **Creation Type:** `New Database`.
   - **Username:** leave the default value or come up with your own, for example: `tsuser1`.
   - **User Password:** generate a password.

   Save the resulting login and password values. You will need them later.

   The database name to be created will be generated automatically.

1. Click the **Create Database** button.

   Wait for the DB instance creation to complete.

## {heading(3. Create an instance of the Cloud Trino service)[id=dlh_quick-start_create_trino_instance]}

Cloud Trino is used as a horizontally scalable SQL query engine for the external data source (PostgreSQL).

To deploy a Cloud Trino service instance and configure its PostgreSQL connections:

1. Go to the **Data Platform → Service Instances** section.
1. Click the **Create Instance** button.
1. At the **Configuration** step:

   1. Select the `Cloud Trino` service type.
   1. Leave the default value in the **Version** field.
   1. Select the `Single` configuration.

1. Click the **Next Step** button.
1. At the **Parameters** step:

   1. In the **Instance Name** field, specify an instance name or use the default value.
   1. Enable the **Assign External IP** option.
   1. Select the cluster you specified when [creating the Cloud Iceberg Metastore service instance](#dlh_quick-start_create_iceberg_instance) during the basic configuration deployment.
   1. Select the `Basic` setup option and the `Small` cluster template.
   1. Click the **Next Step** button.

1. At the **Maintenance** step:

   1. **Maintenance Window**: leave the default value. During this time, maintenance work may be performed on the server, including backup creation — the service may be temporarily unavailable.

      {note:info}
      The duration of maintenance work is 4 hours. The time zone is determined automatically based on your current location.
      {/note}
   
   1. Leave the default values for the remaining fields.

1. Click the **Next Step** button.
1. At the **Connections** step:

   1. Add the PostgreSQL data source to the Cloud Trino service instance:
  
      1. Click the **Add Connection** button.
      1. Select the `PostgreSQL` connection type and specify:
         
         - **Name**: come up with a connection name, for example: `postgres_trino`.
         - **Database Name**: the name of the database inside the instance, for example: `ad_db`. It is available on the **Database List** tab after creating the PostgreSQL instance.
         - **hostname:port**: the connection address of the created PostgreSQL instance in the format: `<IP ADDRESS>:<PORT>`. For example, `10.0.1.2:5432`. You can [view](/en/dbs/dbaas/instructions/manage-instance/postgresql#dbaas-postgresql-get-info) the DB connection address in the instance card.
      
      1. **Login**: the value specified when creating the PostgreSQL DB instance. In this example: `tsuser1`.
      1. **Password**: the password of the database user account specified when creating the PostgreSQL DB instance.

   1. Add the Apache Iceberg data source with {var(s3)} to the Cloud Trino service instance:

      1. Click the **Add Connection** button.
      1. Select the `Apache Iceberg with S3 VK Cloud` connection.
      1. Specify the connection parameters:
         
         - **Name**: come up with a connection name, for example: `iceberg_s3`.
         - **hostname:port of the Iceberg Metastore service**: the connection address of the created Iceberg Metastore instance in the format `<IP ADDRESS>:<PORT>`. You can view the Iceberg Metastore service address in the instance card on the **General Information** tab in the **Postgres primary connection string** field.
         - **Iceberg Metastore Service Login**: the administrator login specified when [creating the Iceberg Metastore service instance](#dlh_quick-start_create_iceberg_instance) during the basic configuration deployment. In this example: `vkdata`.
         - **Iceberg Metastore Service Password**: the password of the database user account specified when creating the Iceberg Metastore instance.
         - **Bucket**: specify the bucket name for creating the S3 object storage, following the bucket [naming rules](/en/storage/s3/concepts/about).

1. Click the **Next Step** button.
1. At the **Credentials** step:

   1. Leave the default value in the **Login** field. Write down the administrator login for accessing Cloud Trino; you will need it later.
   1. In the **Password** field, click the **Generate** button to generate an administrator password. Save the password; you will need it later.

      {note:info}
      A lost password cannot be recovered, but it can be [changed](../../trino/instructions/management#change_password) to a new one.
      {/note}

1. Click the **Create** button.

Wait for the Cloud Trino service instance creation process to complete.

After the Trino service is deployed, two connections to virtual databases will be automatically added to the configuration for generating large volumes of synthetic data and testing: `otpcds` and `otpch`.

## {heading(What's next?)[id=dlh_quick-start_next_steps]}

1. [Connect](../how-to-guides/connect-adb) an analytical DB based on Cloud ClickHouse to perform fast processing of part of the data before it gets into S3 storage.
1. [Connect](../how-to-guides/connect-spark) the Spark service for working with complex ETL and ELT tasks.
1. [Explore](../how-to-guides/process-data) the process of loading data into the service and analyzing it.