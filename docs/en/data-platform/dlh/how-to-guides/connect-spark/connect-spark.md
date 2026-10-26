# {heading(Connecting Cloud Spark as a data processing tool)[id=dlh_connect-spark]}

{include(/en/_includes/_translated_by_ai_en.md)}

Including the {linkto(../../../spark#spark)[text=Cloud Spark]} service in the {linkto(../../quick-start#dlh_quick-start)[text=basic architecture]} of a Data Lakehouse (DLH) makes it possible to perform complex data transformations before the data gets into S3 object storage, unlike [Cloud Trino](../../../trino), which can implement relatively simple scenarios.

An analytical database, such as [Cloud ClickHouse](../../../clickhouse), can additionally be used to store operational information, although such an architecture makes the solution more complex and expensive.

## {heading(Preparatory steps)[id=dlh_connect-spark_preparations]}

{linkto(../../quick-start#dlh_quick-start)[text=Deploy]} the basic architecture of the Data Lakehouse service.

## {heading(1. Deploy a Cloud Spark service instance)[id=dlh_connect-spark_create_instance]}

1. [Navigate](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
1. Select the project where you need to create a service instance.
1. Go to the **Data Platform → Service Instances** section.
1. Click the **Create Instance** button.
1. At the **Configuration** step:

   1. Select the `Cloud Spark` service type.
   1. In the **Version** field, leave the default value.

1. Click the **Next Step** button.
1. At the **Parameters** step:

   1. Set the instance parameters:

      - **Name**: specify a name for the service instance.
      - **Description**: add a description if necessary.
      - **Assign external IP**: enable this option to make the Cloud ClickHouse instance accessible via the Internet.
      - **Kubernetes cluster**: select from the drop-down list the cluster you specified when {linkto(../../quick-start#dlh_quick-start_create_iceberg_instance)[text=creating the Cloud Iceberg Metastore service instance]} at the stage of deploying the basic configuration.
   
   1. In the **Spark Connect** field, specify the number of CPU cores and the amount of RAM to be allocated for real-time data processing.
   1. In the **Spark History Server** field, specify the number of CPU cores and the amount of RAM to be allocated for logging the launches of Cloud Spark service jobs.

1. Click the **Next Step** button.
1. At the **Maintenance** step:

   1. Select the days of the week and the start time of maintenance work. During this time, maintenance work may be performed on the server, including backups — the service will be unavailable.

    {note:info}
    The duration of maintenance work is 4 hours. The time zone is determined automatically based on your current location.
    {/note}

1. Click the **Next Step** button.
1. At the **Settings** step, click the **Edit** button and select the Cloud Spark version from the list of supported ones — it will be used to run jobs.
1. Click the **Next Step** button.
1. At the **Connections** step:

    1. Add a connection to the PostgreSQL created when {linkto(../../quick-start#dlh_quick-start_create_postgresql_instance)[text=deploying]} the basic Data Lakehouse configuration:
  
        1. Click the **Add Connection** button.
        1. Select the **PostgreSQL** connection and specify:
        
            - **PostgreSQL**: come up with a connection name, for example: `postgres_spark`.
            - **Database name**: the name of the PostgreSQL source database that Cloud Spark will connect to for query execution and data integration, for example: `ad_db`. It is available on the **Database List** tab after creating the PostgreSQL instance.
            - **DB host name**: a value in the format `<IP-ADDRESS>:<PORT>`. The connection data must be copied on the PostgreSQL instance page on the **General Information** tab, from the value of the **Postgres primary connection string** field: `postgres://<user>:<password>@<IP-ADDRESS>:<PORT>/<DB_NAME>`. For example: `10.0.1.2:5432`.
            - **Username**: the login for the PostgreSQL created when deploying the basic Data Lakehouse configuration.
            - **User password**: the password of the database user account specified when creating the PostgreSQL DB instance.

   1. Add a connection to the S3 object storage created when {linkto(../../quick-start#dlh_quick-start_create_trino_instance)[text=deploying]} the basic Data Lakehouse configuration:

        1. Click the **Add Connection** button.
        1. Select the `S3 VK Cloud` connection.
        1. Specify the connection parameters:
            
            - **Internal S3 connection name**: come up with a connection name, for example: `iceberg_s3`.
            - **Bucket**: the bucket name specified when creating {var(s3)}.
            - **Path in the S3 bucket**: the address where files are located in the S3 storage. The parameter is available on the {var(s3)} instance page.

1. Click the **Next Step** button.
1. At the **Credentials** step:
   
    1. In the **Login** field, leave the default value. Write down the administrator login for accessing Cloud ClickHouse, you will need it later.
    1. In the **Password** field, click the **Generate** button to generate an administrator password. Save the password, you will need it later.

        {note:warn}
        Password recovery is not provided.
        {/note}
   
1. Click the **Create** button.

Wait for the Cloud Spark service instance creation process to complete.