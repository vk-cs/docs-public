# {heading(Creating a service instance)[id=mlflow_create]}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference]}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the **Create instance** button.
1. Complete the steps:

   1. {linkto(#mlflow_create_configuration)[text=Configuration]}.
   1. {linkto(#mlflow_create_parameters)[text=Parameters]}.
   1. {linkto(#mlflow_create_service)[text=Maintenance]}.
   1. {linkto(#mlflow_create_connect)[text=Connection]}.
   1. {linkto(#mlflow_create_user)[text=Credentials]}.

## {heading(Step 1. Configuration)[id=mlflow_create_configuration]}

1. Select:

   1. The `MLflow` service type.
   1. The service version.

1. Click the **Next step** button.

## {heading(Step 2. Parameters)[id=mlflow_create_parameters]}

1. Set the parameters:

   1. **Name**: the name of the service instance.
   1. (Optional) **Description**: the description of the service instance.
   1. **Assign external IP** (**Automatic IP assignment** for Standalone): automatic assignment of an external IP address to the service instance or selection of an existing external IP address.
   1. (Skip for Standalone) Select a Kubernetes cluster from the drop-down list or create a new one. A worker node will be added to this cluster to host the MLflow instance.
   1. In the **MLflow** block, set the parameters of the application for logging model training and saving versions: **CPU** and **RAM**.

      {include(../../../_includes/_standalone.md)[tags=total_quotas]}

1. Click the **Next step** button.

## {heading(Step 3. Maintenance)[id=mlflow_create_service]}

1. In the **Maintenance window** block, select one or more days and the time for maintenance work taking into account your time zone. Maintenance duration: 4 hours.
1. Click the **Next step** button.

## {heading(Step 4. Connection)[id=mlflow_create_connect]}

{note:warn}
Creating an MLflow service instance requires configuring connections to PostgreSQL and {var(s3)}.
{/note}

1. Configure the connections:

   1. Click **Add connection**.
   1. Select the data source in the **Connection type** field and set its connection parameters:

      - `PostgreSQL`: connection to PostgreSQL.

        {cut(Connection parameters)}

        In the **Connection** block, select an existing connection or create a new one.

        To create a new connection:

        1. In the list, select `Create a new network` and set the parameters:

           - **PostgreSQL**: the connection name.
           - **Database name**: the name of the PostgreSQL database that the service instance will connect to.
           - **Database host name**: the address of the database server.
           - **Username**: the username for connecting to the database.
           - **User password**: the password of the user for connecting to the database.

        1. **Save the entry to the connection catalog**: the option to save the entry in the **Connection catalog** section. Specify the name of the catalog entry or it will be assigned automatically. The option is enabled by default.

        {/cut}    

      - `S3 VK Cloud`: connection to {var(s3)} in the same project.

        {cut(Connection parameters)}

        In the **Connection** block, select an existing connection or create a new one.

        To create a new connection:

        1. In the list, select `Create a new network` and set the parameters:

           - **S3 internal connection name**: the connection name.
           - **Bucket**: the {var(s3)} bucket where the data is stored. The bucket name must be unique.
           - **Path in the S3 bucket**: the name of the directory in the {var(s3)} bucket where the data is stored.

        1. **Save the entry to the connection catalog**: the option to save the entry in the **Connection catalog** section. Specify the name of the catalog entry or it will be assigned automatically. The option is enabled by default.

        {/cut}

      - `External S3`: connection to an external S3.

        {cut(Connection parameters)}

        In the **Connection** block, select an existing connection or create a new one.

        To create a new connection:

        1. In the list, select `Create a new network` and set the parameters:

           - **S3 external connection name**: the connection name.
           - **Region**: the region where the storage is located.
           - **Access Key**: a unique identifier used for authentication when accessing the S3 storage.
           - **Secret Key**: a secret key used together with the **Access Key** parameter value for authentication and authorization of access to the S3 storage.
           - **S3 URL**: the address of the S3 service. Example: `https://hb.ru-msk.vkcloud-storage.ru`.
           - **Bucket**: the name of the bucket for storing data. It must be unique.
           - **Path in the S3 bucket**: the name of the logical structure for organizing and grouping objects (files). It must be created in the bucket in advance.

        1. **Save the entry to the connection catalog**: the option to save the entry in the **Connection catalog** section. Specify the name of the catalog entry or it will be assigned automatically. The option is enabled by default.

        {/cut}

        To add another connection, click **Add connection**.

4. Click the **Next step** button.

## {heading(Step 5. Credentials)[id=mlflow_create_user]}

1. Set the parameters:

   1. **Administrator login for MLflow access**: the administrator login. Login requirements:

      - Only digits, Latin letters, and the `_` symbol are allowed.
      - The first character: a Latin letter of any case or `_`.
      - Invalid names: `os_admin`, `root`, `dataplatform_moth`, `default`.
      - No more than 50 characters.

   1. **Administrator password for MLflow access**: the administrator password. To set a password, click the **Generate** button or specify your own. Password requirements:

      - At least 8 characters.
      - At least one uppercase and one lowercase Latin letter.
      - At least one digit.
      - At least one of the characters: `!`, `?`, `%`, `#`, `/`, `(`, `)`, `-`, `+`, `*`.

      {note:err}
      Save the password. Recovery of a forgotten password is not available.
      {/note}

   1. **Save the account to the connection catalog**: the option to save the account in the **Connection catalog** section. Specify the name of the account in the catalog or it will be assigned automatically. The option is enabled by default.

   To add another account, click the **Add account** button.

1. Click the **Create** button.