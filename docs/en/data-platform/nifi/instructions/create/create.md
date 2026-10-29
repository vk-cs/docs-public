# {heading(Creating a service instance)[id=nifi_create]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference]}

1. Go to the **Data Platform** → **Service Instances** section.
1. Click **Create Instance**.
1. Complete the steps:

   1. {linkto(#nifi_create_configuration)[text=Configuration]}.
   1. {linkto(#nifi_create_parameters)[text=Parameters]}.
   1. {linkto(#nifi_create_service)[text=Maintenance]}.
   1. {linkto(#nifi_create_initialization)[text=Credentials]}.

## {heading(Step 1. Configuration)[id=nifi_create_configuration]}

1. Select:

   1. The `NiFi` service type.
   1. The service version.
   1. The service configuration:
      
      - `Single`: a single-node configuration with the ability to scale out to several additional nodes. This solution reduces the costs of deploying a test infrastructure but does not provide fault tolerance: a node failure will make the entire instance unavailable. A single-node configuration is suitable for development and testing.
      - `Cluster`: a multi-node configuration. This solution is suitable for processing large volumes of data and provides high performance and fault tolerance: the failure of one node will not stop the instance.

1. Click **Next Step**.

## {heading(Step 2. Parameters)[id=nifi_create_parameters]}

1. Set the parameters:

   1. **Name**: the name of the service instance.
   1. (Optional) **Description**: a description of the service instance.
   1. **Assign External IP** (**Automatic IP Assignment** for Standalone): automatic assignment of an external IP address to the service instance or selection of an existing external IP address.
   1. (Only for Standalone within {var(cloud)}, optional) Add a security group. If the required security group is not in the list, create it following the instructions in the **{var(cloud)} Administrator's Guide** → **Networks** → [Firewall configuration](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/service_management/network/network_firewall_setup).
   1. (Skip for Standalone) Select a Kubernetes cluster from the drop-down list or create a new one. A worker node will be added to this cluster to host the NiFi instance.
   1. Select the `Basic` or `Advanced` option:
      
      - For the **Basic** option with the `Single` service configuration, the `Small` template is available, which contains 1 NiFi node (4 CPU, 8 GB RAM) and 1 Zookeeper node (1.5 CPU, 2 GB RAM).
      - For the **Basic** option with the `Cluster` service configuration, the `Small` template is available, which contains 3 NiFi nodes (4 CPU, 8 GB RAM) and 3 Zookeeper nodes (2 CPU, 4 GB RAM).
      - For the **Advanced** option:

        1. In the **Nifi** block, set the parameters:

           - **CPU**: the number of processors.
           - **RAM**: the amount of RAM.
           - **Disk Type**: the disk type. Select a type, or it will be assigned automatically.
           - **Disk Size**: the disk size in GB.
           - **Number of Nifi**: the total number of NiFi nodes.
            
        1. In the **Zookeeper** block, set the parameters:

           - **CPU**: the number of processors.
           - **RAM**: the amount of RAM.
           - **Disk Type**: the disk type. Select a type, or it will be assigned automatically.
           - **Disk Size**: the disk size in GB.
           - **Number of Zookeeper**: the total number of ZooKeeper nodes.

      {include(../../../_includes/_standalone.md)[tags=total_quotas]}

1. Click **Next Step**.

## {heading(Step 3. Maintenance)[id=nifi_create_service]}

1. In the **Maintenance Window** block, select one or more days and specify the time for maintenance work according to your time zone. The duration of maintenance work is 4 hours.
1. Click **Next Step**.

## {heading(Step 4. Credentials)[id=nifi_create_initialization]}

1. In the **Account** block, set the parameters:

   1. **Administrator login for NiFi access**: the administrator login. Login requirements:

      - Only digits, Latin letters, and the `_` character are allowed.
      - The first character: a Latin letter of any case or `_`.
      - The following names are not allowed: `admin`, `root`.

   1. **Administrator password for NiFi access**: the administrator password. To set a password, click the **Generate** button or enter your own. Password requirements:

      - At least 16 and at most 50 characters.
      - At least one uppercase and one lowercase Latin letter.
      - At least one digit.
      - At least one of the characters: `!`, `?`, `%`, `#`, `/`, `(`, `)`, `-`, `+`, `*`.

      {note:err}
      Save the password. A forgotten password cannot be recovered.
      {/note}

1. Click **Create**.