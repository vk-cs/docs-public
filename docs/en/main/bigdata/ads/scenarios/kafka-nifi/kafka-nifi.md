To create a Kafka + NiFi cluster, go to the "Big Data" section. Click Add Cluster.

When you click on the button, a configurator will open in the window, which consists of several stages, and as a result, it determines the parameters of the created cluster. Follow the instructions to create a Kafka + NiFi cluster:

1. Select the version of the ADS distribution that will be installed on the cluster.
1. Enter a cluster name
1. Select an availability zone where the cluster will be created.
1. Select the network where the cluster will be created, or select "Create a new network" to create a cluster on a new network. When creating a new network, make sure that the "Access to access the Internet" option is enabled in the network settings.
1. If you need an external IP address to connect to the cluster from an external network, enable the "Assign external IP" setting.
1. Select "NiFi and Kafka" from the suggested cluster settings. Click Next Step.

    <warn>

    Creation of NiFi and Kafka in separate clusters is possible only in the versions of the ADS Enterprise distribution. For more information, see the [Arenadata Streaming Licenses](../../concepts/types/) section.

    </warn>

1. At the next stage, you need to specify some parameters of the cluster nodes. The creation wizard reflects the following configuration fields, configured separately for the Master and Worker nodes:

    | Field | Description |
    |-------------------------------------|---------- ------------------------------|
    | Instance type | Node configuration - amount of CPU and RAM. |
    | Number of nodes | Number of cars. Specified separately for Master and Worker nodes. |
    | Number of disks per node | The number of disks on the node. Set separately for each node. The maximum value is 8. |
    | Disk size | Disk space on nodes. The limit values ​​are from 500 to 2000 GB. |
    | Disk type | Disk type (SSD/High-IOPS SSD). |

    The following parameters are configured for the entire cluster as a whole:

    | Field | Description |
    |-------------------------------------|---------- ------------------------------|
    | Connect monitoring node | Connect the Arenadata Monitoring bundle to monitor the cluster using the Carbon, Graphana, Graphite and Diamond services. More details about the functionality can be found on the [Arenadata website](https://docs.arenadata.io/mon/en/index.html). |
    | Connect edge node | Connect a node to be able to connect to a cluster for finer tuning through the UI of the installed components. |
    | Key pair | Selecting a key pair to access the edge node. |
    | Disk autoscaling | Enabling automatic disk space expansion on cluster nodes. |

    Then click "Next Step".

1. At this stage, the option of flexible configuration of the components that will be installed on the cluster is provided.

    You can manually select the components to be installed on nodes. To do this, select "Advanced" among the options for installing components, and then drag the required components from the list on the right to the nodes of your Arenadata Streaming configuration.

    Once selected, click "Next Step" to move on to creating the cluster.

The cluster will be created within 10-15 minutes. During this period, the operating system is deployed on the disks of the instances, as well as the system tools that provide the cluster configuration in accordance with the specified parameters.
