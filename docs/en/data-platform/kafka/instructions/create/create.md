# {heading(Creating a service instance)[id=kafka_create]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}


{include(/en/_includes/_translated_by_ai.md)}

{ifdef(public)}
{include(/en/_includes/_dp_mpl_user_warn.md)}
{/ifdef}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) your {var(cloud)} management console.
1. Select the project where you want to create the service instance.
{/ifdef}

1. Go to **Data Platform → Service instances**.
1. Click **Create instance**.
1. At the **Configuration** step:

   1. Select the `Cloud Kafka` service type.
   1. Select the required service version.
   1. Select the service instance configuration:

      {include(../../../_includes/_data_p.md)[tags=configuration_atom]}

   1. Click **Next step**.

1. At the **Parameters** step:

   1. Specify the instance name and description.
   {ifdef(public)}
   1. Enable **Assign external IP** if you need to access the instance from an external network.
   {/ifdef}

   {ifndef(public)}
   1. Only for {var(data-p)} as part of {var(cloud)}:

      1. Select the network where the service instance will be deployed.
      1. (Optional) Add a security group. If the required security group is not listed, create it using **{var(cloud)} Administrator Guide** → **Networks** → [Configuring a firewall](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/service_management/network/network_firewall_setup).

   1. (Optional) Specify an IP address for the service instance from the subnet. To do this, disable **Automatic IP assignment**. By default, the instance is assigned an IP address automatically.
   {/ifndef}
   {ifdef(public)}
   1. Select a Kubernetes cluster. A [worker node](/en/kubernetes/k8s/concepts/architecture#cluster_topologies) will be added to this cluster in the [Managed Containers](/en/kubernetes/k8s) service to host the Cloud Kafka instance.

      If the required cluster is not listed:

      1. Select `Create new cluster`.
      1. Select a network and subnet for the cluster from the **Network** drop-down list.

         If the required network is not listed, select `Create`.

      1. Select the [availability zone](/en/intro/start/concepts/architecture#architecture-az) where the Kubernetes cluster node will be deployed.
   {/ifdef}

   1. Configure the cluster node parameters by selecting one of the options:

      {tabs}

      {tab(Basic)}

      Depending on the selected configuration, the preconfigured resources have different numbers of nodes:

         - in the `Single node` instance configuration: 1 Kafka broker node;
         - in the `Cluster` instance configuration: 3 Kafka broker nodes.

      {/tab}

      {tab(Advanced)}

      Configure the parameters manually:

      1. In the **Kafka broker** block, specify:

         - The number of Kafka broker nodes and their parameters: the number of CPUs, RAM, disk {ifdef(public)}[type](/ru/computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list){/ifdef}{ifndef(public)}type{/ifndef} and size.

            To create a fault-tolerant cluster, the number of nodes must be greater than `1`.

         - The **security.protocol** protocol used for authentication in Cloud Kafka:

            - `ALL`: connections both with SSL/TLS encryption and without encryption.
            - `SASL_SSL`: connections with SSL/TLS encryption only.
            - `SASL_PLAINTEXT`: connections without encryption only. Data is transmitted in plain text.

      1. (Optional) Select and configure additional components. To do this, enable **Install** and specify the number of CPUs and RAM. The following options are available:

         - Install **Kafka Bridge** to work with Cloud Kafka through the REST API.
         - Install **Kafka UI** to work with Cloud Kafka through a graphical interface.

      {ifndef(public)}
      1. Select one or three availability zones where the cluster nodes will be deployed. Kafka brokers will be distributed across the selected zones automatically.
      {/ifndef}

      {/tab}

      {/tabs}

      {ifndef(public)}
      {include(../../../_includes/_standalone.md)[tags=total_quotas]}
      {/ifndef}

   1. Click **Next step**.

1. At the **Maintenance** step:

   1. Select the days of the week and the start time for maintenance. During this time, maintenance tasks, including backups, may run on the server, and the service may be temporarily unavailable.

      {note:info}
      Maintenance lasts 4 hours. The time zone is GMT+03:00.
      {/note}

   1. Click **Next step**.

1. At the **Credentials** step:

   1. Specify the account username for accessing Kafka.
   1. Select a role:

      - `Cluster owner`: has full control over messages, analysis, transactions, and settings, and can create, modify, delete, and view all objects (topics, schemas, groups, connectors, and configurations).

      {include(../../../_includes/_kafka.md)[tags=roles]}

      {note:info}
      Users can only be managed through the {ifdef(public)}{var(cloud)}{/ifdef}{ifndef(public)}{var(data-p)}{/ifndef} management console.
      {/note}

      You can create multiple users for Cloud Kafka, but at least one must have the `Cluster owner` role.

   1. Create or generate an administrator password.

      Password requirements:

      - may contain only digits, the symbols `!`, `"`, `#`, `$`, `%`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `/`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `\\`, `]`, `^`, `_`, `` ` ``, `{`, `|`, `}`, `~`, and uppercase and lowercase Latin letters;
      - must contain at least 16 characters;
      - must contain at least one uppercase and one lowercase Latin letter, and at least one digit.

      {note:err}
      The password cannot be restored.
      {/note}

   1. (Optional) To add more users, click **Add account**.
   1. Click **Create**.

      Wait for the operation to complete. Creating a Cloud Kafka instance may take a long time.

{/tab}

{/tabs}
