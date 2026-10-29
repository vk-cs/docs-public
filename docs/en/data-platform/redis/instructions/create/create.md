# {heading(Creating a service instance)[id=redis_create]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference]}

1. Go to **Data Platform** → **Service instances**.
1. Click **Create instance**.
1. Complete the steps:

   1. {linkto(#redis_create_configuration)[text=Configuration]}.
   1. {linkto(#redis_create_parameters)[text=Parameters]}.
   1. {linkto(#redis_create_service)[text=Maintenance]}.
   1. {linkto(#redis_create_user)[text=Credentials]}.

## {heading(Step 1. Configuration)[id=redis_create_configuration]}

1. Select:

   1. Service type `Redis`.
   1. Service version.
   1. Service configuration:
      
      - `Single`: a single-node configuration with the ability to scale out to several additional nodes. This solution reduces the cost of deploying a test infrastructure, but does not provide fault tolerance: a node failure will make the entire instance unavailable. A single-node configuration is suitable for development and testing.
      - `Cluster`: a multi-node configuration. This solution is suitable for processing large amounts of data and provides high performance and fault tolerance: a single node failure will not stop the instance.

1. Click **Next step**.

## {heading(Step 2. Parameters)[id=redis_create_parameters]}

1. Set the parameters:

   1. **Name**: name of the service instance.
   1. (Optional) **Description**: description of the service instance.
   1. **Database name**: name of the database.
   1. **Assign external IP** (**Automatic IP assignment** for Standalone): automatic assignment of an external IP address to the service instance or selection of an existing external IP address.
   1. (Only for Standalone as part of {var(cloud)}, optional) Add a security group. If the desired security group is not in the list, create it following the instructions in **{var(cloud)} Administrator's Guide** → **Networks** → [Firewall configuration](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/service_management/network/network_firewall_setup).
   1. (Skip for Standalone) Select a Kubernetes cluster from the drop-down list or create a new one. A worker node will be added to this cluster to host the Redis instance.
   1. Select the `Basic` or `Advanced` option and configure the cluster node parameters:
      
      - For the **Basic** option with the `Single` service configuration, select one of the ready-made templates:

        - `Small`: contains 1 Redis node (2 CPU, 8 RAM, Ceph 10 GB).
        - `Medium`: contains 1 Redis node (4 CPU, 32 RAM, Ceph 10 GB).
        - `Large`: contains 1 Redis node (16 CPU, 128 RAM, Ceph 10 GB).

      - For the **Basic** option with the `Cluster` service configuration, select one of the ready-made templates:

        - `Small with replication`: contains 3 Redis nodes (2 CPU, 8 RAM, Ceph 10 GB).
        - `Medium with replication`: contains 3 Redis nodes (4 CPU, 32 RAM, Ceph 10 GB).
        - `Large with replication`: contains 3 Redis nodes (16 CPU, 128 RAM, Ceph 10 GB).
        - `Small 3-shard with replication`: contains 2 Redis nodes (2 CPU, 8 RAM, Ceph 10 GB).
        - `Medium 3-shard with replication`: contains 2 Redis nodes (4 CPU, 32 RAM, Ceph 10 GB).
        - `Large 3-shard with replication`: contains 2 Redis nodes (16 CPU, 128 RAM, Ceph 10 GB).

      - For the **Advanced** option, in the **Redis** block, set the parameters of the container that will run the Redis server:

        - **CPU**: number of processors.
        - **RAM**: amount of RAM.
        - **Disk type**: disk type. Choose the type yourself or it will be assigned automatically.
        - **Disk size**: disk size in GB.
        - **Number of Redis**: total number of containers.

      {include(../../../_includes/_standalone.md)[tags=total_quotas]}

1. Click **Next step**.

## {heading(Step 3. Maintenance)[id=redis_create_service]}

1. In the **Maintenance window** block, select one or more days and the time for maintenance work according to your time zone. Duration of maintenance work: 4 hours.
1. In the **Full backup** block, specify the maximum number of full copies to store. When the maximum number is exceeded, old copies will be overwritten.
1. Click **Next step**.

## {heading(Step 4. Credentials)[id=redis_create_user]}

1. Set the parameters:

   1. **Administrator login for Redis access**: administrator login. Login requirements:

      - Only digits, Latin letters, and the `_` character are allowed.
      - The first character must be a Latin letter of any case or `_`.
      - Forbidden names: `os_admin`, `root`, `dataplatform_moth`, `default`.
      - No more than 50 characters.

   1. **Administrator password for Redis access**: administrator password. To set a password, click **Generate** or specify your own. Password requirements:

      - At least 8 characters.
      - At least one uppercase and one lowercase Latin letter.
      - At least one digit.
      - At least one of the characters: `!`, `?`, `%`, `#`, `/`, `(`, `)`, `-`, `+`, `*`.

      {note:err}
      Save the password. Recovery of a forgotten password is not available.
      {/note}

   To add another account, click **Add account**.

1. Click **Create**.