{includetag(conf)}

- Single: a service instance deployed on a single server. This option is suitable for development and testing, reducing the cost of deploying test infrastructure. It does not provide fault tolerance: a node failure causes all operations to stop.
- Cluster: a fault-tolerant configuration with multiple nodes (a single node failure does not cause the Cloud Airflow instance to stop). This option provides high performance and is suitable for storing databases, including high-load projects with strict data durability requirements.

{/includetag}

<!-- Roles in Cloud Airflow -->

{includetag(roles_airflow)}
- `Administrator` — a role with the broadest set of permissions. The Administrator can create, modify, and delete any objects (DAGs, connections, pools, variables), manage users and their roles, view and modify configuration.
- `User` — a role with access to managing Cloud Airflow objects. The User can create, modify, and delete DAGs, start and stop tasks, view execution logs, manage connections, pools, and variables.
- `Operator` — a role extending the User role capabilities. The Operator can additionally clear task history, manage DAG locks, view and modify runner configuration, and manage task execution slots.
- `Observer` — a role with limited read-only access. The Observer can view DAGs, their execution status, task logs, and basic information about Cloud Airflow objects, but cannot create, modify, or delete objects, or start or stop tasks.
{/includetag}

<!-- Cloud Airflow connection parameters -->

{includetag(connections_airflow)}

{tabs}

{tab(Connection to VK Cloud S3 storage)}

- **Connection name**: the name of the connection.
- **Bucket**: the name of the bucket where DAG files or DAG logs will be stored.
- **Path to files in bucket**: the path to the bucket.

{/tab}

{tab(Connection to external S3 storage)}

- **Connection name**: the name of the connection.
- **Region**: the region where the S3 storage is located.
- **Access Key**: the public key for accessing the storage.
- **Secret Key**: the private key for accessing the storage.
- **S3 URL**: the address of the S3 storage. For example: `https://hb.ru-msk.vkcloud-storage.ru`.
- **Bucket**: the name of the bucket where DAG files or DAG logs will be stored.
- **Path to files in bucket**: the path to the bucket.

{/tab}

{/tabs}

{/includetag}
