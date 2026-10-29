# {heading(Creating a service instance)[id=iceberg_create]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{ifdef(public)}
{include(/en/_includes/_dp_mpl_user_warn.md)}
{/ifdef}

{ifndef(public)}
{include(../../../_includes/_standalone.md)[tags=difference]}
{/ifndef}

{tabs}

{tab(Personal account)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where you need to create a service instance.
{/ifdef}

1. Go to the **Data Platform → Service Instances** section.
1. Click **Create Instance**.
1. At the **Configuration** step:

   1. Select the `Cloud Iceberg Metastore` service type.
   1. Select the service version.
   1. Select the service instance configuration:

      {include(../../../_includes/_data_p.md)[tags=configuration]}
      
   1. Click **Next Step**.

1. At the **Parameters** step:

   1. Set the instance parameters:

      - **Name**: set a name for the service instance.
      - (Optional) **Description**: add a description.
      - {ifndef(public)} (Skip for Standalone) {/ifndef} **Assign external IP**: enable the option to make the Cloud Iceberg Metastore instance accessible via the Internet.

      {ifndef(public)}
      - (Standalone only, optional) **Automatic IP assignment**: disable the option to set an IP address for the service instance from the subnet.
      - (Standalone only within {var(cloud)}, optional) Add a security group. If the required security group is not in the list, create it following the instructions in the **{var(cloud)} Administrator Guide** → **Networks** → [Firewall configuration](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/service_management/network/network_firewall_setup).
      - (Skip for Standalone) Select a Kubernetes cluster from the drop-down list or create a new one. A worker node will be added to this cluster to host the Cloud Iceberg Metastore instance.
      {/ifndef}
      {ifdef(public)}
      - **Kubernetes cluster**: select the desired cluster from the drop-down list or create a new one by selecting `Create a new cluster` from the list. When creating a new cluster, set the parameters:

      - **Network**: select the subnet where the cluster will be available from the list, or create a new one by selecting `Create a new network` from the list. When creating a new subnet, specify the [SDN](/en/networks/vnet/concepts/sdn) and the subnet address.
      - **Availability zone**: select the cluster [availability zone](/en/start/concepts/architecture#architecture-az) from the list.
      {/ifdef}
      
   1. Select the cluster configuration: `Basic` or `Advanced`.

      {tabs}

      {tab(Basic)}

      Select one of the ready-made cluster templates. The templates differ in the amount of CPU and RAM on the Postgres nodes.

      {/tab}

      {tab(Advanced)}

      1. In the **Bouncer** block, specify the amount of CPU and RAM for the {ifdef(public)} [PgBouncer](/en/dbs/dbaas/extensions/postgresql#dbaas-extensions-postgresql-pgbouncer){/ifdef}{ifndef(public)} PgBouncer{/ifndef} balancer. If the **Install** option is disabled, the balancer will not be active.

      1. In the **Postgres** block, specify the amount of CPU and RAM, the types and sizes of data and WAL disks, as well as the number of Postgres replicas.

      {/tab}

      {/tabs}
         
      {ifndef(public)}
      {include(../../../_includes/_standalone.md)[tags=total_quotas]}
      {/ifndef}
      
   1. Click **Next Step**.

1. At the **Maintenance** step:

   {include(../../../_includes/_iceberg.md)[tags=maintenance]}

   1. Click **Next Step**.

1. At the **Credentials** step, set the parameters for the database owner:

   - **Login for accessing Cloud Iceberg Metastore**. 

     {include(../../../_includes/_iceberg.md)[tags=login]}

   - **Role**: leave the value `Database Owner`. 

     A user with this role has maximum privileges on the created database. This user cannot be deleted. There can be only one user with owner privileges in the database.

   - **Password for accessing Cloud Iceberg Metastore**. To set a password, click the **Generate** button or set your own.

     {include(../../../_includes/_iceberg.md)[tags=password]}

   1. (Optional) To add another account, click the **Add Account** button.

      All subsequent accounts are created with the `Standard User` role. 

      A user with this role has privileges to create new objects (tables, schemas, functions, etc.), edit and view them. Newly created objects will be owned by this user. 

      If a user with the standard role is deleted, all objects they owned are transferred to the user with the `Database Owner` role. 

      The number of users with this role is unlimited.

   1. Click **Next Step**.

1. At the **Network Accesses** step:

   1. Specify the database name. Name requirements:
      - Latin letters, digits, and the `_` character are allowed.
      - The first character must be a Latin letter of any case.
      - No more than 63 characters.

   1. (Optional) Set network accesses for the accounts created at the previous step. To do this, click the **Add Access** button:
      1. In the **User** block, select the user account.
      1. In the **Allow Connection** block, select the connection privileges for the user:

         - **All databases** — privileges to access all databases of the instance.
         - **Physical replication** — privileges for replication, reading the WAL (transaction log), and making changes to replica data.
         - **<DB_NAME>** — privileges to access a specific database.
      1. Select the connection method:
         - **TLS encryption only** — connection with TLS encryption.
         - **Encryption not required (TLS option)** — connection without TLS encryption.

      {note:info}
      By default, the user is granted the **All databases** access with the **Encryption not required (TLS option)** connection method.
      {/note}

   1. Click **Create**.

{/tab}

{/tabs}