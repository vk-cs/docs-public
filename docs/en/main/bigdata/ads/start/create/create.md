Creating an Arenadata Streaming cluster includes the following steps:

1. Selecting the Arenadata Streaming distribution version.
2. Cluster setup and selection of installed components of the Arenadata Streaming distribution.
3. Setting up cluster nodes.
4. Selection of components to be installed on cluster nodes.
5. Configuring access to selected components of the Arenadata Streaming cluster.

## Start creating an Arenadata Streaming cluster

To create an Arenadata Streaming cluster, go to Big Data → Clusters. On the Create Arenadata Streaming Cluster card, click Create Cluster.

A cluster configurator will open in a new window, consisting of several stages, as a result of which it determines the parameters of the cluster being created.

At all stages, the configurator informs about the cost of the created cluster, additional features, and also allows you to contact support in case of questions.

At the first stage of creation, you must select the desired cluster configuration. The preconfigured media types differ in scaling options and activated extensions:

- ADS Community/Enterprise
- ADS Community Test/Enterprise Test

The Community Test/Enterprise Test editions offer advanced component customization for creating dev environments and are suitable for testing. This option is recommended for advanced users only.

You can learn more about the differences between the Community and Enterprise versions in the article [Arenadata Streaming Licenses](../../concepts/types/).

After selection, click "Next Step" to proceed to the cluster network configuration and select the components of the Arenadata Streaming distribution to install.

## Network configuration and component selection

At this stage of creation, you must specify some cluster parameters. The creation wizard reflects the following configuration fields:

| Parameter | Description |
| --- | --- |
| Cluster name | The display name of the cluster. Also sets the hostname on the OS. |
| Accessibility zone | Selecting the data center where the instance will be launched. |
| Network | Create a cluster on an existing network or create a new one. When creating a new network, make sure that the “Access to access the Internet” option is enabled in the network settings. |
| Cluster setup | Selecting ADS components to install on the cluster. You can choose from pre-configured templates or manually select components. It is recommended that you choose one of the pre-configured cluster configuration templates that suits your work. During further configuration, it will be possible to change the list of components more flexibly.|

<warn>

Some templates require access to a special VM flavor. To get access, contact [support service](https://mcs.mail.ru/help/contact-us).

</warn>

Once selected, click "Next Step" to move on to configuring the virtual hardware of the cluster nodes.

## Set up the virtual hardware of the cluster

At this stage of creation, it is necessary to specify some parameters of the cluster nodes. The creation wizard reflects the following configuration fields, configured separately for the Master and Worker nodes:

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

Next, click "Next step" to proceed to the selection of components to be installed on the cluster nodes.

## Select components for Arenadata Streaming cluster nodes

At this stage of creation, the option of flexible configuration of the components that will be installed on the cluster is provided.

If you selected a template with a preinstalled list of components in the previous steps, here you can see the details of which modules will be installed.

It is also possible to manually select the components to be installed on nodes. To do this, select "Advanced" among the options for installing components, and then drag the required components from the list on the right to the nodes of your Arenadata Streaming configuration.

Once selected, click "Next Step" to move on to configuring access to the cluster.

## Configuring access to Arenadata Streaming cluster components

At this stage of creation, the account parameters are set, which will be used to gain access to the Monitoring node of the cluster.

After completing all the settings, click "Create Cluster" to create a cluster. The cluster will be created within 10-15 minutes. During this period, the operating system is deployed on the disks of the instances, as well as the system tools that provide the cluster configuration in accordance with the specified parameters.
