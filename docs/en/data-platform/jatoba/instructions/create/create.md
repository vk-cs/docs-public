# {heading(Creating a service instance)[id=jatoba_create]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference]}

1. Go to the **Data Platform** → **Service Instances** section.
1. Click the **Create Instance** button.
1. Complete the steps:

   1. {linkto(#jatoba_create_configuration)[text=Configuration]}.
   1. {linkto(#jatoba_create_parameters)[text=Parameters]}.
   1. {linkto(#jatoba_create_service)[text=Maintenance]}.
   1. {linkto(#jatoba_create_initialization)[text=Credentials]}.
   1. {linkto(#jatoba_network_access)[text=Network Access]}.

## {heading(Step 1. Configuration)[id=jatoba_create_configuration]}

1. Select:

   1. The `Jatoba` service type.
   1. The service version.
   1. The service configuration:
      - `Single`: a single-node configuration with the ability to expand to several additional nodes. This solution reduces the costs of deploying a test infrastructure but does not provide fault tolerance: a node failure will make the entire instance unavailable. A single-node configuration is suitable for development and testing.
      - `Cluster`: a multi-node configuration. This solution is suitable for processing large volumes of data and provides high performance and fault tolerance: the failure of one node will not stop the instance from operating.
      
1. Click the **Next Step** button.

## {heading(Step 2. Parameters)[id=jatoba_create_parameters]}

1. Set the parameters:

   1. **Name**: the name of the service instance.
   1. (Optional) **Description**: the description of the service instance.
   1. **Assign external IP** (**Automatic IP assignment** for Standalone): automatic assignment of an external IP address to the service instance or selection of an existing external IP address.
   1. (Only for Standalone within {var(cloud)}, optional) Add a security group. If the required security group is not in the list, create it following the instructions from the **{var(cloud)} Administrator Guide** → **Networks** → [Firewall configuration](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/service_management/network/network_firewall_setup).
   1. (Skip for Standalone) Select a Kubernetes cluster from the drop-down list or create a new one. A worker node will be added to this cluster to host the Jatoba instance.
   1. Select the `Basic` or `Advanced` option and configure the parameters:
         
      - For the **Basic** option in the `Single` service configuration, select one of the ready-made templates:

        - `Small`: contains 1 Jatoba node (0.5 CPU, 1 GB RAM, 20 GB Data Ceph, 10 GB WAL Ceph) and 1 Bouncer node (0.2 CPU, 1 GB RAM).
        - `Medium`: contains 1 Jatoba node (2 CPU, 4 GB RAM, 20 GB Data Ceph, 10 GB WAL Ceph) and 1 Bouncer node (0.2 CPU, 1 GB RAM).
        - `Large`: contains 1 Jatoba node (8 CPU, 16 GB RAM, 20 GB Data Ceph, 10 GB WAL Ceph) and 1 Bouncer node (0.2 CPU, 1 GB RAM).

      - For the **Basic** option in the `Cluster` service configuration, select one of the ready-made templates:

        - `Small`: contains 3 Jatoba nodes (0.5 CPU, 1 GB RAM, 20 GB Data Ceph, 10 GB WAL Ceph) and 1 Bouncer node (0.2 CPU, 1 GB RAM).
        - `Medium`: contains 3 Jatoba nodes (2 CPU, 4 GB RAM, 20 GB Data Ceph, 10 GB WAL Ceph) and 1 Bouncer node (0.2 CPU, 1 GB RAM).
        - `Large`: contains 3 Jatoba nodes (8 CPU, 16 GB RAM, 20 GB Data Ceph, 10 GB WAL Ceph) and 1 Bouncer node (0.2 CPU, 1 GB RAM).

      - For the **Advanced** option:

        1. In the **Bouncer** block, set the connection manager creation parameters: **CPU** and **RAM**. If the manager is not needed, turn it off.
        1. In the **Jatoba** block, set the parameters of the container that hosts the database and the server:

           - **CPU**: the number of processors.
           - **RAM**: the amount of RAM.
           - **Data disk type**: the disk type for storing the main database. Select a type, or it will be assigned automatically.
           - **Data disk size**: the disk size in GB.
           - **Wal disk type**: the disk type for storing the transaction log. Select a type, or it will be assigned automatically.
           - **Wal disk size**: the disk size in GB.
           - **Number of Jatoba**: the total number of containers.

      {include(../../../_includes/_standalone.md)[tags=total_quotas]}

1. Click the **Next Step** button.

## {heading(Step 3. Maintenance)[id=jatoba_create_service]}

1. In the **Maintenance window** block, select one or more days and specify the time for maintenance work according to your time zone. The maintenance work duration is 4 hours.
1. In the **Full backup** block, select the maximum backup retention time in days. The backup will be deleted after the specified number of days has elapsed.
1. Click the **Next Step** button.

## {heading(Step 4. Credentials)[id=jatoba_create_initialization]}

1. In the **Account** block, set the parameters:

   1. **Login for Jatoba access**: the user login. Login requirements:

      - Only digits, Latin letters, and the `_` character are allowed.
      - The first character must be a Latin letter of any case or `_`.
      - Invalid names: `os_admin`, `root`, `dataplatform_moth`.

   1. Select a role for the account:

      {include(../../../_includes/_data_p.md)[tags=roles_db]}

      {note:warn}
      A service instance cannot be created without a user with the Database Owner role.
      {/note}

   1. **Password for Jatoba access**: the user password. To set a password, click the **Generate** button or enter your own. Password requirements:

      - At least 16 and no more than 50 characters.
      - At least one uppercase and one lowercase Latin letter.
      - At least one digit.
      - At least one of the characters: `!`, `?`, `%`, `#`, `/`, `(`, `)`, `-`, `+`, `*`.

      {note:err}
      Save the password. A forgotten password cannot be recovered.
      {/note}

   To add another account, click the **Add Account** button.

1. Click the **Next Step** button.

## {heading(Step 5. Network Access)[id=jatoba_network_access]}

1. Specify the database name. Name requirements:

   - Latin letters, digits, and the `_` character are allowed.
   - The first character must be a Latin letter of any case.
   - No more than 63 characters.

1. (Optional) Configure network access for the accounts created in the previous step. To do this, click the **Add Access** button:
   1. In the **User** block, select the user account.
   1. In the **Allow Connection** block, select the connection rights for the user:

      - **To all databases**: rights to access all databases of the instance.
      - **For physical replication**: rights to replication, WAL (transaction log) reading, and making changes to the replica data.
      - **cyberbackup**: rights for connecting the Cyber Backup system.
      - **<DB_NAME>**: rights to access a specific database.
        
   1. Select the allowed connection method:
      
      - **TLS encryption only**: connection with TLS encryption.
      - **Encryption not required (TLS option)**: connection without TLS encryption.

   {note:info}
   By default, the user is granted the **To all databases** access with the **Encryption not required (TLS option)** connection method.
   {/note}

1. Click the **Create** button.