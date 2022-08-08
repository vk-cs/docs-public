To create a database, go to the [section of your personal account "Analytical databases"](https://mcs.mail.ru/app/services/analytic-databases/), select the license version "Arenadata DB" and click "Create database".

In the next step, select the desired cluster type, ArenadataDB instance version, and instance configuration.

The Cluster configuration is a cluster with synchronous data replication. It is used when there are increased requirements for the reliability and fault tolerance of the system.

In the following steps, select the required configuration options:

| Parameter name | Description |
|------------------------------------|-------------------- ------------------------|
| Cluster name | Leave the default name or enter your name in Latin characters.|
| Amount of uncompressed clean data | The maximum size of the database. |
| Node configuration | CPU / RAM / HDD (SSD) master configuration.<br>A replica/slave will be created automatically with the same configuration. |
| Use reservation | Creation of redundant redundant nodes for fault tolerance. |
| Connect monitoring node ||
| Disk type | For best performance, we recommend choosing SSD or Hi-IOPS SSD.|
| Network | Leave as default or choose your own private network.|
| Assign external IP | Assign an external IP to the cluster to be able to connect to the cluster from external networks. |
| Accessibility zone | specify the availability zone (we recommend DP1 or MS1).|

In the next step, set the database initialization parameters:

| Parameter name | Description |
|------------------------------------|-------------------- ------------------------|
| Database name to create | You can leave the default or enter your own. |
| Username | You must specify a username for remote access. |
| User password | You must set a user password for remote access. |

The instance will be created within a few minutes. After that, information about the instance and connection methods will appear.
