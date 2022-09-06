## Start cluster

one\. In the personal account section ["Databases"](https://mcs.mail.ru/app/services/databases/add/) click "**Add**"

2\. In the window that opens, select the database to run, as well as the "**Cluster**" configuration template.

![](./assets/1586421565636-1586421565636.png)

Availability of configuration templates depends on the type of DBMS selected.

- **Single** - a single DBMS instance without a replica. Recommended for use only for development and testing purposes.
- **Master-slave** (**Master-Replica**) - two DBMS instances in different data centers with master-slave (active-passive) replication. Use for industrial use.
- **Cluster** — cluster with synchronous data replication. Use if there are increased requirements for system reliability and fault tolerance.

In the second step, select the required instance settings.

![](./assets/1586421608647-1586421608647.png)

### Upload your SSH key

Please note that now you can not only generate a new one, use the old one, but also upload your SSH key

![](./assets/1552314256902-img-2019-03-11-17-15-14.png)

| Instance type | Choose from the list of proposed instance configuration (RAM size, number of CPUs).<br>You can change the hard disk size in the next paragraph. |
|-------|------|
| Disk size| By default, the volume from the configuration you choose is substituted. But you can increase or decrease the size.|
| Instance name| Leave the default name or enter your own name. Latin characters.|
| Accessibility zone| specify the availability zone (we recommend DP1 or MS1).|
| Network | Leave as default or choose your own private network. If you have not created any networks, you will be prompted to create one.|
| Internet access | Set to access the database from the Internet via a floating IP address.|
| Number of nodes | Select the number of cluster nodes you need.|
| Key for SSH access | Choose from the ones you've already created or create a new one. You will need it to connect to the server.|

In the next step, set the database initialization parameters.

![](./assets/1586421648657-1586421648657.png)

| Title | Description |
|------------------------------|-------------------- --------------------------------------------|
| Database name to create | Leave the default or enter your own. |
| Username | Specify an administrator name for remote access. |
| Administrator password | Set an administrator password for remote access. |
| Backup | The name of the backup to restore. |

<info>

For PostgreSQL in "Single" or "Master-Replica" configurations, [monitoring](../../db-monitoring/postgresql) is enabled by default. If necessary, this option can be disabled.

</info>

<warn>

The cluster is created within a few minutes. After that, information about the instance and connection methods will appear.

</warn>

Do not interrupt the creation process and do not close the browser.

![](./assets/1552314306216-img-2019-03-11-17-17-07.png)

## Connect to the cluster

You can also see connection methods by clicking on the name of a particular instance in the list or by hovering over the information icon.

![](./assets/1549891614124-img-2019-02-11-16-25-58.png)

![](./assets/1549891638364-img-2019-02-11-16-26-25.png)

See the Connection Settings from Applications section for code examples from popular languages.

![](./assets/1536330673178-img-2018-09-07-17-30-46.png)

When using examples, replace macros **<DATABASE>**, **<USERNAME>**, **<PASSWORD>** with actual values:

- <DATABASE> - the name of the database specified during creation.
- <USERNAME> - username (specified during creation).
- <PASSWORD> - user password (specified during creation).

Additional information can be found in the documentation for the used connector (application for connecting to the database).

## Patroni

### Installation

Patroni is pre-installed on your system.

Patroni is a service for creating highly available PostgreSQL clusters based on standard streaming replication. This solution is used by companies such as Red Hat, IBM Compose, Zalando and many others. It can be used to transform a system from a master and slave nodes (primary - replica) to a highly available cluster with support for automatic controlled (switchover) and emergency (failover) switching. Patroni allows you to easily add new replicas to an existing cluster, supports dynamic PostgreSQL configuration changes simultaneously on all cluster nodes, and many other features.

## Balancer

For each cluster, a TCP balancer is created, which has 3 ports. They point to:

1. \- master
2. \- synchronous replica
3. \- asynchronous replica

---

The official [Patroni documentation is here](https://patroni.readthedocs.io/en/latest/index.html).
