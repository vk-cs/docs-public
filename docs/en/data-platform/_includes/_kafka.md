<!-- Roles for Kafka -->

{includetag(roles)}
- `Standard User`: can create, modify, and delete topics, including their settings; manage consumer groups; create and modify schemas and connectors; and read and write messages. Cannot delete schemas or connectors, run analysis, or manage other configurations. This role has read-only access in Kafka UI.
- `Observer`: can only view topics, schemas, groups, connectors and read messages. Cannot create, modify, or delete objects.
- `Security Auditor`: can view configurations of applications, clusters, ACL, as well as descriptions of topics, groups, transactions, and users. Has no access to messages or object operations.
{/includetag}

{includetag(connection-preparation)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) your {var(cloud)} account.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click the Cloud Kafka instance name.
1. On the **General information** tab, copy the connection string for the option you need:

   - **Bootstrap connection string with TLS** — for a TLS connection;
   - **Bootstrap connection string** — for a connection without TLS.

1. Download the certificate chain for a TLS connection: on the **General information** tab, click **•••** → **Download certificate chain** in the certificate card.

1. Have the username and password for your Cloud Kafka account ready. You can {linkto(/ru/data-platform/kafka/instructions/management#kafka_user-add)[text=add an account on the service instance page]}.

{/includetag}

{includetag(connection-values)}

Here:

- `<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>`: the connection string copied during preparation.
- `<USERNAME>` and `<PASSWORD>`: the Cloud Kafka user's credentials.
- `<CERTIFICATE_CHAIN_PATH>`: the path to the certificate chain file downloaded from the **General information** tab during preparation. Used only for TLS connections.

{/includetag}
