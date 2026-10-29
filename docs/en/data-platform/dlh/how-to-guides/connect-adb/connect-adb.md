# {heading(Connecting ClickHouse as an analytical DB)[id=dlh_connect-adb]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

Adding a separate analytical DB to the Data Lakehouse (DLH) architecture makes it possible to quickly process the incoming stream of events without the need to store data in S3 storage. Such a DB can be PostgreSQL, where operational data arrives as a message stream or in batches, or {linkto(../../../clickhouse/concepts/about#clickhouse_info)[text=Cloud ClickHouse]}.

The following describes a variant of configuring the Data Lakehouse service with an analytical database based on the ClickHouse product.

Data queries to the analytical DB are performed by the {linkto(../../../trino/concepts/about#trino_info)[text=Cloud Trino]} service, therefore deploying a Data Lakehouse configuration with an analytical DB includes pre-deploying the basic architecture of the service, as well as additionally connecting the used Cloud Trino service instance to the analytical DB.

## {heading(Preparatory steps)[id=dlh_connect-adb_preparations]}

{linkto(../../quick-start#dlh_quick-start)[text=Deploy]} the basic architecture of the Data Lakehouse service.

## {heading(1. Deploy a ClickHouse service instance)[id=dlh_connect-adb_create_instance]}

1. Go to the **Data Platform → Service instances** section.
1. Click the **Create instance** button.
1. At the **Configuration** step:

   1. Select the `Cloud ClickHouse` service type.
   1. In the **Version** field, leave the default value.
   1. Select the `Cluster` configuration.

1. Click the **Next step** button.
1. At the **Parameters** step:

   1. Set the instance parameters:

      - **Name**: specify a name for the service instance.
      - **Description**: add a description if necessary.
      - **Database name**: specify the name of the database that Cloud ClickHouse will connect to.
      - **Assign external IP**: enable the option so that the Cloud ClickHouse instance is accessible via the Internet.
      - **Kubernetes cluster**: select from the drop-down list the cluster that you specified when {linkto(../../quick-start#dlh_quick-start_create_iceberg_instance)[text=creating the Cloud Iceberg Metastore service instance]} at the stage of deploying the basic configuration.

   1. Select the `Basic` cluster configuration and specify one of the configuration templates:

      - `Small with replication` – suitable for a test configuration.
      - `Medium with replication` – for a low-load PROD cluster.
      - `2-shard with replication` – for a medium-load PROD cluster.
      - `3-shard with replication` – for a high-load PROD cluster.

1. Click the **Next step** button.
1. At the **Maintenance** step:

    {include(../../../_includes/_clickhouse.md)[tags=maintenance]}

1. Click the **Next step** button.
1. At the **Credentials** step:

   1. In the **Login** field, leave the default value. Write down the administrator login for accessing Cloud ClickHouse; you will need it later.
   1. In the **Password** field, click the **Generate** button to generate an administrator password. Save the password; you will need it later

        {note:warn}
        Password recovery is not provided.
        {/note}

1. Click the **Create** button.

Wait for the operation of creating the Cloud ClickHouse service instance to complete.

## {heading(2. Configure the connection to Cloud ClickHouse in Cloud Trino)[id=dlh_connect-adb_create_connect]}

{linkto(../../../trino/instructions/management#trino_add_connect)[text=Add]} a new connection for the `Clickhouse` source in the settings of the Cloud Trino service instance that was created when deploying the basic configuration. In the connection parameters, specify the data of the Cloud ClickHouse service instance created above.