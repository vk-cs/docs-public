# {heading(Replicating data from external Kafka clusters)[id=kafka_replication]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

In the Cloud Kafka service, data from external Kafka clusters can be replicated to the current cluster using the MirrorMaker component.

## {heading(Enabling replication)[id=kafka_replication_enable]}

{note:info}
The MirrorMaker component will be placed in one of the available zones.
{/note}

{tabs}

{tab(Personal account)}

1. Go to the **Data Platform** → **Service instances** section.
1. In the list of service instances, click the name of the desired instance.
1. Enable replication in one of the following ways:

   - On the **Architecture** tab, on the cluster node diagram, click **MirrorMaker**.
   - Go to the **Connections** tab and click the **Add connection** button.

1. Configure the replication parameters:

   - **Name**: the connection name.
   - **Password**: the password of the account for connecting to the external cluster.
   - **Username**: the login of the account for connecting to the external cluster.
   - (Optional) **TLS certificate**: the certificate for a secure connection to the external cluster. If the connection to the external cluster is made using the `SASL_SSL` protocol, attach the certificate file or specify its contents in PEM format.
   - **Kafka MirrorMaker CPU**: the number of CPUs for the MirrorMaker component. The default value is `4`.
   - **Kafka MirrorMaker RAM**: the amount of RAM for the MirrorMaker component. The default value is `4 GB`.
   - **Kafka cluster address**: the bootstrap address of the external Kafka cluster from which MirrorMaker retrieves data. The format is `host:port`.

     For fault tolerance, specify multiple brokers separated by commas. Example: `broker1:9092,broker2:9092`.

   - **Save entry to the connections directory**: enable this option to save the connection data. This allows you to add connections to other Cloud Kafka service instances without re-entering the data.

1. (Optional) Click **Show all parameters** and configure additional parameters:

   - **Certificate hostname verification**: an option to verify that the source hostname matches the TLS certificate data. Disabled by default.
   - **Security protocol**: the protocol for connecting to the external cluster. Possible values:

     - `SASL_PLAINTEXT` — no connection encryption. Data is transmitted in plain text. The default value.
     - `SASL_SSL` — with connection encryption using the SSL or TLS protocol.
     
   - **SASL mechanism**: the SASL authentication method — determines how the password is verified when connecting. Possible values:

     - `PLAIN` — in plain text.
     - `SCRAM-SHA-256` or `SCRAM-SHA-512` — with hashing. The default value is `SCRAM-SHA-512`.
     
   - **Maximum parallel tasks**: the maximum number of replication tasks run in parallel. The recommended value is twice the number of dedicated CPUs for MirrorMaker. The default value is `4`.
   - **Replication compression**: the data compression codec when writing to the target cluster. Possible values:

     - `lz4` — a high speed-to-compression ratio. Suitable for most scenarios.
     - `snappy` — maximum performance, low compression ratio. Suitable when speed is more important than saving traffic.
     - `gzip` — high compression ratio, low performance. Suitable for saving traffic when speed is not critical.
     - `zstd` — a high compression ratio at a higher speed than `gzip`. Suitable when both compression and speed matter.
     - `none` — no compression. The default value.
     
   - **List of topics for replication**: the topics of the external cluster to replicate. Listed separated by the `|` character. Example: `topic1|topic2`. If nothing is specified, all custom topics are replicated.
   - **List of topics excluded from replication**: the topics to exclude from replication. Listed separated by the `|` character. Example: `topic1|topic2`. If nothing is specified, no additional exclusions are added. Kafka and MirrorMaker service topics are excluded automatically.
   - **List of consumer groups for replication**: the consumer groups whose offsets are transferred to the target cluster. Listed separated by the `|` character. Example: `group1|group2`. If nothing is specified, all groups are transferred except those that MirrorMaker excludes by default.
   - **Topic naming policy**: the rule for forming topic names on the target cluster. Possible values:

     - `IdentityReplicationPolicy` — preserves the original name, for example, `orders` → `orders`. The default value.
     - `DefaultReplicationPolicy` — adds a prefix with the name of the external cluster, for example, `orders` → `cluster-source.orders`.
     
   - **Consumer offset reset**: determines where to start reading the topics of the external cluster if the consumer has no saved offset. Possible values:

     - `earliest` — from the beginning of the topic, all available data is replicated. The default value.
     - `latest` — only new messages from the moment of launch.
     
   - **Topic configuration synchronization**: transferring topic configurations (`retention`, `cleanup policy`, etc.) from the external cluster to the target one. Enabled by default.

1. Click the **Create** button.

{/tab}

{/tabs}

## {heading(Disabling replication)[id=kafka_replication_disable]}

{tabs}

{tab(Personal account)}

1. Go to the **Data Platform** → **Service instances** section.
1. In the list of service instances, click the name of the desired instance.
1. Go to the **Connections** tab.
1. Click the **•••** icon to the right of the MirrorMaker component connection.
1. Select the **Delete** option.
1. Confirm the deletion.

{/tab}

{/tabs}