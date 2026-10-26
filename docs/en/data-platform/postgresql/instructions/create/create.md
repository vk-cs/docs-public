# {heading(Creating a service instance)[id=postgresql_create]}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference]}

1. Go to **Data Platform** → **Service Instances**.
1. Click **Create Instance**.
1. Complete the steps:

   1. {linkto(#postgresql_create_configuration)[text=Configuration]}.
   1. {linkto(#postgresql_create_parameters)[text=Parameters]}.
   1. {linkto(#postgresql_create_service)[text=Maintenance]}.
   1. {linkto(#postgresql_create_initialization)[text=Credentials]}.
   1. {linkto(#postgresql_network_access)[text=Network Accesses]}.

## {heading(Step 1. Configuration)[id=postgresql_create_configuration]}

1. Select:

   1. The `Cloud PostgreSQL` service type.
   1. The service version.
   1. The service configuration:
      
      - `Single`: a single-node configuration with the ability to scale to several additional nodes. This solution reduces the costs of deploying test infrastructure but does not provide fault tolerance: a node failure will make the entire instance unavailable. A single-node configuration is suitable for development and testing.
      - `Cluster`: a multi-node configuration. This solution is suitable for processing large volumes of data and provides high performance and fault tolerance: a failure of one node will not stop the instance from operating.

1. Click **Next Step**.

## {heading(Step 2. Parameters)[id=postgresql_create_parameters]}

1. Set the parameters:

   1. **Name**: the name of the service instance.
   1. (Optional) **Description**: the description of the service instance.
   1. **Assign external IP** (**Automatic IP assignment** for Standalone): automatic assignment of an external IP address to the service instance or selection of an existing external IP address.
   1. (Only for Standalone within {var(cloud)}, optional) Add a security group. If the required security group is not in the list, create it following the instructions in the **{var(cloud)} Administrator's Guide** → **Networks** → [Firewall configuration](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/service_management/network/network_firewall_setup).
   1. (Skip for Standalone) Select a Kubernetes cluster from the drop-down list or create a new one. A worker node will be added to this cluster to host the Cloud PostgreSQL instance.
   1. Select the `Basic` or `Advanced` option and configure the parameters:
      
      - For the **Basic** option in the `Single` service configuration, select one of the ready-made templates:

        - `Small`: contains 1 Postgres node (1 CPU, 2 GB RAM, 20 GB Data Ceph, 10 GB WAL Ceph) and 1 Bouncer node (0.5 CPU, 1 GB RAM).
        - `Medium`: contains 1 Postgres node (2 CPU, 4 GB RAM, 20 GB Data Ceph, 10 GB WAL Ceph) and 1 Bouncer node (0.5 CPU, 1 GB RAM).
        - `Large`: contains 1 Postgres node (8 CPU, 16 GB RAM, 20 GB Data Ceph, 10 GB WAL Ceph) and 1 Bouncer node (2 CPU, 4 GB RAM).

      - For the **Basic** option in the `Cluster` service configuration, select one of the ready-made templates:

        - `Small`: contains 3 Postgres nodes (1 CPU, 2 GB RAM, 20 GB Data Ceph, 10 GB WAL Ceph) and 1 Bouncer node (0.5 CPU, 1 GB RAM).
        - `Medium`: contains 3 Postgres nodes (2 CPU, 4 GB RAM, 20 GB Data Ceph, 10 GB WAL Ceph) and 1 Bouncer node (0.5 CPU, 1 GB RAM).
        - `Large`: contains 3 Postgres nodes (8 CPU, 16 GB RAM, 20 GB Data Ceph, 10 GB WAL Ceph) and 1 Bouncer node (2 CPU, 4 GB RAM).

      - For the **Advanced** option:

        1. In the **Bouncer** block, set the connection manager creation parameters: **CPU** and **RAM**. If the manager is not needed, disable it.
        1. In the **Postgres** block, set the parameters of the container that hosts the DB and the server:

           - **CPU**: the number of processors.
           - **RAM**: the amount of RAM.
           - **Data disk type**: the disk type for storing the main DB. Select a type, or it will be assigned automatically.
           - **Data disk size**: the disk size in GB.
           - **Wal disk type**: the disk type for storing the transaction log. Select a type, or it will be assigned automatically.
           - **Wal disk size**: the disk size in GB.
           - **Number of Postgres**: the total number of containers.

      {include(../../../_includes/_standalone.md)[tags=total_quotas]}

1. Click **Next Step**.

## {heading(Step 3. Maintenance)[id=postgresql_create_service]}

1. In the **Maintenance window** block, select one or more days and specify the time for maintenance work according to your time zone. Maintenance duration: 4 hours.
1. In the **Full backup** block, select the maximum backup retention period in days. The backup will be deleted after the specified number of days has elapsed.
1. In the **Differential backup** block, set the parameters:

   - **Launch schedule**: the differential backup launch schedule. Select a schedule or create a new one.

      To create a new schedule:

      1. Select **Create custom schedule** from the list.
      1. In the **Create custom schedule** block, set the launch time and frequency in the Cron expression format.

         {note:info}
         A Cron expression uses five fields separated by spaces. The field values from left to right are: minutes, hours, days of the month, months, and days of the week. The `*` symbol means all possible values for a field. For example, `0 22 * * *` means a daily launch at 22:00.
         {/note}

   - **Maximum number of differential backups**: when the maximum number is exceeded, the old backups will be overwritten.
1. In the **Incremental backup** block, set the parameters:

   - **Launch schedule**: the incremental backup launch schedule. Select a schedule or create a new one.

     To create a new schedule:

     1. Select **Create custom schedule** from the list.
     1. In the **Create custom schedule** block, set the launch time and frequency in the Cron expression format.

   - **Maximum number of incremental backups**: when the maximum number is exceeded, the old backups will be overwritten.

1. Click **Next Step**.

## {heading(Step 4. Credentials)[id=postgresql_create_initialization]}

1. In the **Account** block, set the parameters:

   1. **Login for Cloud PostgreSQL access**: the user login. Login requirements:

      - Only digits, Latin letters, and the `_` symbol are allowed.
      - The first character: a Latin letter of any case or `_`.
      - Prohibited names: `os_admin`, `root`, `dataplatform_moth`.

   1. Select a role for the account: 

      {include(../../../_includes/_data_p.md)[tags=roles_db]}

      {note:warn}
      A service instance cannot be created without a user with the Database Owner role.
      {/note}

   1. **Password for Cloud PostgreSQL access**: the user password. To set a password, click **Generate** or enter your own. Password requirements:

      - At least 16 and at most 50 characters.
      - At least one uppercase and one lowercase Latin letter.
      - At least one digit.
      - At least one of the symbols: `!`, `?`, `%`, `#`, `/`, `(`, `)`, `-`, `+`, `*`.

      {note:err}
      Save the password. A forgotten password cannot be recovered.
      {/note}

   To add another account, click **Add Account**.

1. Click **Next Step**.

## {heading(Step 5. Network Accesses)[id=postgresql_network_access]}

1. Enter the database name. Name requirements:
   - Latin letters, digits, and the `_` symbol are allowed.
   - The first character: a Latin letter of any case.
   - No more than 63 characters.

1. (Optional) Set network accesses for the accounts created in the previous step. To do this, click **Add Access**:
   1. In the **User** block, select the user account.
   1. In the **Allow connection** block, select the connection rights for the user:

      - **To all databases**: rights to access all DBs of the instance.
      - **For physical replication**: rights to replication, reading the WAL (transaction log), and making changes to the replica data.
      - **cyberbackup**: rights for connecting the Kaspersky Cyber Backup system.
      - **<DB_NAME>**: rights to access a specific DB.
   1. Select the allowed connection method:
      - **TLS encryption only**: connection with TLS encryption.
      - **Encryption not required (TLS option)**: connection without TLS encryption.

   {note:info}
   By default, the user is granted the **To all databases** access with the **Encryption not required (TLS option)** connection method.
   {/note}

1. Click **Create**.